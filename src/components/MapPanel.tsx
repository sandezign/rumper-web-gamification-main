import { useState, useRef, useEffect } from 'react'
import { MapContainer, TileLayer, Circle, Polygon, Marker, Popup, Polyline, useMap } from 'react-leaflet'
import L from 'leaflet'
import {
  AlertTriangle,
  GraduationCap,
  ShoppingBag,
  Wrench,
  Cross,
  TreePine,
  Star,
  Store,
  UtensilsCrossed,
  Zap,
  Home,
  X,
  Maximize2,
  ArrowLeft,
  type LucideIcon,
} from 'lucide-react'
import type { FacilityCategoryKey } from './FasilitasWorkspace'
import VerticalTimeline, { type TimelineNode } from './VerticalTimeline'
import { renderToStaticMarkup } from 'react-dom/server'

delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

const CENTER: [number, number] = [-6.266, 106.990]

const FLOOD_POLYGON: [number, number][] = [
  [-6.258, 106.984],[-6.255, 106.991],[-6.260, 106.997],
  [-6.269, 106.998],[-6.274, 106.991],[-6.271, 106.984],[-6.263, 106.980],
]
const LIQUEFACTION_POLYGON: [number, number][] = [
  [-6.260, 106.993],[-6.257, 106.999],[-6.262, 107.003],
  [-6.268, 107.001],[-6.267, 106.994],
]

const ROUTES = {
  krl:     { label: 'KRL',          color: '#16A34A', coords: [CENTER,[-6.264,106.998],[-6.258,107.003],[-6.248,107.004],[-6.240,106.998],[-6.231,106.992],[-6.225,106.986]] as [number,number][], endLabel: 'Stasiun Bekasi',        endPos: [-6.225,106.986] as [number,number] },
  tol:     { label: 'Tol (Mobil)',   color: '#2563EB', coords: [CENTER,[-6.270,106.996],[-6.276,106.997],[-6.280,107.001],[-6.282,107.012],[-6.278,107.022]] as [number,number][],                  endLabel: 'Pintu Tol Bekasi Timur', endPos: [-6.278,107.022] as [number,number] },
  arteri:  { label: 'Arteri (Motor)',color: '#EA580C', coords: [CENTER,[-6.263,106.984],[-6.257,106.978],[-6.252,106.970],[-6.245,106.963],[-6.238,106.956]] as [number,number][],                  endLabel: 'Jl. Ahmad Yani',         endPos: [-6.238,106.956] as [number,number] },
  sekolah: { label: 'Rute Sekolah',  color: '#7C3AED', coords: [CENTER,[-6.262,106.986],[-6.261,106.984]] as [number,number][],                                                                      endLabel: 'Sekolah terdekat',        endPos: [-6.261,106.984] as [number,number] },
}

const FACILITIES: { pos: [number,number]; Icon: LucideIcon; color: string; label: string; type: string; category: FacilityCategoryKey }[] = [
  { pos:[-6.261,106.984], Icon:GraduationCap, color:'#7C3AED', label:'SDN Grand Galaxy',      type:'Sekolah',        category:'pendidikan' },
  { pos:[-6.258,106.992], Icon:Cross,         color:'#DC2626', label:'RS Hermina Galaxy',      type:'Rumah Sakit',    category:'kesehatan'  },
  { pos:[-6.266,106.997], Icon:ShoppingBag,   color:'#0891B2', label:'Grand Galaxy Park Mall', type:'Pusat Belanja',  category:'belanja'    },
  { pos:[-6.274,106.988], Icon:TreePine,       color:'#16A34A', label:'Taman Galaxy City',     type:'Taman',          category:'belanja'    },
  { pos:[-6.269,106.981], Icon:Star,           color:'#D97706', label:'Masjid Al-Hidayah',     type:'Tempat Ibadah',  category:'belanja'    },
  { pos:[-6.255,106.985], Icon:GraduationCap, color:'#7C3AED', label:'SMP Negeri 22',          type:'Sekolah',        category:'pendidikan' },
  { pos:[-6.272,106.998], Icon:Cross,         color:'#DC2626', label:'Klinik Pratama',          type:'Klinik',         category:'kesehatan'  },
]

const ALL_TABS = ['Ringkasan', 'Faktor risiko', 'Perjalanan', 'Checklist', 'Fasilitas']

const WALKABILITY_POIS = [
  { pos:[-6.264,106.987] as [number,number], Icon:Store,           color:'#0891B2', label:'Indomaret Galaxy'     },
  { pos:[-6.268,106.993] as [number,number], Icon:UtensilsCrossed, color:'#D97706', label:'Warung Makan Bu Sari' },
  { pos:[-6.263,106.994] as [number,number], Icon:Star,            color:'#16A34A', label:'Masjid Al-Hidayah'    },
  { pos:[-6.261,106.984] as [number,number], Icon:GraduationCap,   color:'#7C3AED', label:'SDN Grand Galaxy'     },
]

const TAB_CONFIG: Record<string, { center:[number,number]; zoom:number; infoLabel:string; infoSub:string; infoColor:string }> = {
  Ringkasan:       { center:CENTER,              zoom:15, infoLabel:'Flood Zone Evidence',     infoSub:'BNPB 2024 · 95m from property',         infoColor:'#E12626' },
  'Faktor risiko': { center:[-6.263,106.990],    zoom:14, infoLabel:'Zona Risiko Aktif',       infoSub:'2 layer risiko terdeteksi',              infoColor:'#EA580C' },
  Perjalanan:      { center:[-6.255,106.985],    zoom:12, infoLabel:'4 rute tersedia',         infoSub:'KRL · Tol · Arteri · Sekolah',           infoColor:'#2563EB' },
  Checklist:       { center:CENTER,              zoom:15, infoLabel:'Radius Jalan Kaki 500m',  infoSub:'4 fasilitas esensial terjangkau',        infoColor:'#16A34A' },
  Fasilitas:       { center:[-6.263,106.990],    zoom:13, infoLabel:'7 fasilitas ditemukan',   infoSub:'Sekolah · RS · Mall · Taman · Ibadah',  infoColor:'#7C3AED' },
}

const ICON_CACHE = new Map<string, L.DivIcon>()

function makeLucideIcon(Icon: LucideIcon, bgColor: string, size = 36, iconSize = 16) {
  const cacheKey = `${Icon.name}-${bgColor}-${size}-${iconSize}`
  if (ICON_CACHE.has(cacheKey)) return ICON_CACHE.get(cacheKey)!

  const svg = renderToStaticMarkup(<Icon width={iconSize} height={iconSize} color="white" strokeWidth={2} />)
  const icon = L.divIcon({
    className: '',
    html: `<div style="width:${size}px;height:${size}px;border-radius:50%;background:${bgColor};border:2.5px solid white;box-shadow:0 3px 10px rgba(0,0,0,0.22);display:flex;align-items:center;justify-content:center;">${svg}</div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -(size / 2 + 4)],
  })
  ICON_CACHE.set(cacheKey, icon)
  return icon
}

let cachedPropertyIcon: L.DivIcon | null = null

function makePropertyIcon() {
  if (cachedPropertyIcon) return cachedPropertyIcon

  const svg = renderToStaticMarkup(<Home width={14} height={14} color="white" strokeWidth={2.2} />)
  cachedPropertyIcon = L.divIcon({
    className: '',
    html: `<div style="position:relative;display:flex;flex-direction:column;align-items:center;"><div style="width:40px;height:40px;border-radius:50%;background:#5B5CE2;border:3px solid white;box-shadow:0 4px 14px rgba(91,92,226,0.45);display:flex;align-items:center;justify-content:center;">${svg}</div><svg width="12" height="8" viewBox="0 0 12 8" style="margin-top:-2px;"><polygon points="0,0 12,0 6,8" fill="#5B5CE2" /></svg></div>`,
    iconSize: [40, 48],
    iconAnchor: [20, 48],
    popupAnchor: [0, -50],
  })
  return cachedPropertyIcon
}

function makeRouteEndIcon(color: string, label: string) {
  const cacheKey = `route-${color}-${label}`
  if (ICON_CACHE.has(cacheKey)) return ICON_CACHE.get(cacheKey)!

  const icon = L.divIcon({
    className: '',
    html: `<div style="background:${color};color:white;padding:4px 10px;border-radius:20px;font-size:10px;font-weight:700;letter-spacing:0.01em;white-space:nowrap;box-shadow:0 2px 8px rgba(0,0,0,0.25);border:2px solid white;">${label}</div>`,
    iconSize: [0, 0],
    iconAnchor: [0, 0],
  })
  ICON_CACHE.set(cacheKey, icon)
  return icon
}

function MapCamera({ center, zoom }: { center:[number,number]; zoom:number }) {
  const map = useMap()
  const prevKey = useRef<string>('')
  const centerKey = `${center[0]},${center[1]},${zoom}`
  if (prevKey.current !== centerKey) {
    prevKey.current = centerKey
    if (map && map.getSize && map.getSize().x > 0) {
      try { map.flyTo(center, zoom, { duration: 0.75 }) } catch (_) {}
    }
  }
  return null
}

function ZoomControls({ recenterTarget, bottomOffset, side = 'left', fullscreen = false }: { recenterTarget:{ center:[number,number]; zoom:number }; bottomOffset?: number; side?: 'left' | 'right'; fullscreen?: boolean }) {
  const map = useMap()
  const bottom = bottomOffset ?? 76
  const zIndexClass = fullscreen ? 'z-[1100]' : 'z-[1060]'

  return (
    <div className={`absolute ${side === 'right' ? 'right-4' : 'left-4'} ${zIndexClass} flex flex-col gap-1.5`} style={{ bottom }}>
      {[
        { label: '+', title: 'Zoom in', fn: () => map.zoomIn() },
        { label: '−', title: 'Zoom out', fn: () => map.zoomOut() },
        {
          label: (
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <circle cx="6.5" cy="6.5" r="2.5" stroke="#001e2b" strokeWidth="1.3"/>
              <path d="M6.5 1v2M6.5 10v2M1 6.5h2M10 6.5h2" stroke="#001e2b" strokeWidth="1.3" strokeLinecap="round"/>
            </svg>
          ),
          title: 'Recenter',
          fn: () => map.flyTo(recenterTarget.center, recenterTarget.zoom, { duration: 0.5 }),
        },
      ].map((ctrl, i) => (
        <button
          key={i}
          onClick={ctrl.fn}
          title={ctrl.title}
          className="w-9 h-9 bg-white rounded-xl flex items-center justify-center font-bold text-base transition-colors hover:bg-gray-50 cursor-pointer"
          style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.12)', color: '#001e2b', border: '1px solid #e1e5e8' }}
        >
          {ctrl.label}
        </button>
      ))}
    </div>
  )
}

type RouteKey = keyof typeof ROUTES

interface MapLayerState {
  flood: boolean
  poiMarkers: boolean
  radiusCircle: boolean
}

interface MapPanelProps {
  isPremium?: boolean
  activeTab?: string
  facilityVisible?: Record<FacilityCategoryKey, boolean>
  onUpgrade: () => void
  onTabChange?: (tab: string) => void
  onBack?: () => void
  /** height override (px string), e.g. "100%" for mobile */
  heightOverride?: string
  /** hide border radius + shadow for embedded mobile use */
  flat?: boolean
  /** Shared workspace stages, available only through the fullscreen map overlay. */
  timelineNodes?: TimelineNode[]
  fullscreen?: boolean
  onFullscreenChange?: (fullscreen: boolean) => void
  /** Bottom overlay offset (px) used on mobile so the strip stays above the bottom sheet drawer. */
  sheetInset?: number
  /** Hide floating map buttons (e.g. Kembali & Perluas Peta) when bottom sheet drawer is maximized. */
  hideFloatingControls?: boolean
  /** Hide top floating map layer selector bar */
  hideMapLayers?: boolean
  /** Hide bottom-left info chip legend */
  hideInfoChip?: boolean
  /** Custom callback for expand map button */
  onExpandMap?: () => void
}

export default function MapPanel({
  activeTab = 'Ringkasan',
  facilityVisible,
  isPremium,
  onUpgrade,
  onTabChange,
  onBack,
  heightOverride,
  flat,
  timelineNodes = [],
  fullscreen: fullscreenProp,
  onFullscreenChange,
  sheetInset = 0,
  hideFloatingControls = false,
  hideMapLayers = false,
  hideInfoChip = false,
  onExpandMap,
}: MapPanelProps) {
  const [layers, setLayers] = useState<MapLayerState>({ flood: true, poiMarkers: true, radiusCircle: true })
  const [activeRoutes, setActiveRoutes] = useState<Set<RouteKey>>(new Set(['krl', 'tol', 'arteri', 'sekolah']))
  const [internalFullscreen, setInternalFullscreen] = useState(fullscreenProp ?? false)
  const [stepperOpen, setStepperOpen] = useState(false)

  useEffect(() => {
    if (fullscreenProp !== undefined) {
      setInternalFullscreen(fullscreenProp)
    }
  }, [fullscreenProp])

  const fullscreen = fullscreenProp !== undefined ? fullscreenProp : internalFullscreen

  const setFullscreen = (val: boolean) => {
    setInternalFullscreen(val)
    onFullscreenChange?.(val)
  }

  const tabCfg = TAB_CONFIG[activeTab] ?? TAB_CONFIG['Ringkasan']

  const toggle = (key: keyof MapLayerState) => setLayers(prev => ({ ...prev, [key]: !prev[key] }))
  const toggleRoute = (key: RouteKey) =>
    setActiveRoutes(prev => { const n = new Set(prev); n.has(key) ? n.delete(key) : n.add(key); return n })

  const propertyIcon = makePropertyIcon()
  const alertIcon    = makeLucideIcon(AlertTriangle, '#E12626', 36, 16)
  const schoolIcon   = makeLucideIcon(GraduationCap, '#7C3AED', 36, 16)
  const shopIcon     = makeLucideIcon(ShoppingBag,   '#0891B2', 36, 16)
  const infraIcon    = makeLucideIcon(Wrench,         '#169BD5', 36, 16)
  const zapIcon      = makeLucideIcon(Zap,            '#EA580C', 36, 16)

  const isRingkasan  = activeTab === 'Ringkasan'
  const isRisiko     = activeTab === 'Faktor risiko'
  const isPerjalanan = activeTab === 'Perjalanan'
  const isChecklist  = activeTab === 'Checklist'
  const isFasilitas  = activeTab === 'Fasilitas'

  // Escape closes fullscreen
  useEffect(() => {
    if (!fullscreen) return
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') setFullscreen(false) }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [fullscreen])

  const [isMobileScreen, setIsMobileScreen] = useState(typeof window !== 'undefined' ? window.innerWidth < 640 : false)

  useEffect(() => {
    const check = () => setIsMobileScreen(window.innerWidth < 640)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    if (!fullscreen) setStepperOpen(false)
  }, [fullscreen])

  const defaultHeight = heightOverride ?? 'calc(100vh - 100px)'
  const topOffset = isMobileScreen ? 94 : 52

  const wrapperStyle: React.CSSProperties = fullscreen
    ? {
        position: 'fixed',
        top: topOffset,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 40,
        borderRadius: 0,
        height: `calc(100vh - ${topOffset}px)`,
        width: '100vw',
      }
    : {
        borderRadius: flat ? 0 : 24,
        boxShadow: flat ? 'none' : '0 8px 24px rgba(15,42,51,0.1)',
        height: defaultHeight,
        minHeight: flat ? 0 : 500,
        position: 'relative',
      }

  // ── Layer pill group ──────────────────────────────────────────────────────

  function LayerPills() {
    return (
      <>
        {(isRingkasan || isRisiko) && (
          ([ { key: 'flood', label: 'Banjir' }, { key: 'poiMarkers', label: 'POI' }, { key: 'radiusCircle', label: 'Radius' } ] as { key: keyof MapLayerState; label: string }[])
            .map(({ key, label }) => (
              <button
                key={key}
                onClick={() => toggle(key)}
                className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition-all whitespace-nowrap"
                style={{ backgroundColor: layers[key] ? '#e3fcef' : '#f4f7f6', color: layers[key] ? '#00684a' : '#7c8c9a', border: `1px solid ${layers[key] ? '#00ed64' : '#e1e5e8'}` }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: layers[key] ? '#00D972' : '#c1ccd6' }} />
                {label}
              </button>
            ))
        )}

        {isPerjalanan && (
          (Object.entries(ROUTES) as [RouteKey, typeof ROUTES[RouteKey]][]).map(([key, r]) => {
            const on = activeRoutes.has(key)
            return (
              <button
                key={key}
                onClick={() => toggleRoute(key)}
                className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition-all whitespace-nowrap"
                style={{ backgroundColor: on ? `${r.color}18` : '#f4f7f6', color: on ? r.color : '#7c8c9a', border: `1px solid ${on ? r.color : '#e1e5e8'}` }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: on ? r.color : '#c1ccd6' }} />
                {r.label}
              </button>
            )
          })
        )}

        {isChecklist && (
          <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap" style={{ backgroundColor: '#e3fcef', color: '#00684a', border: '1px solid #00ed64' }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#00D972' }} />
            Radius 500m
          </span>
        )}

        {isFasilitas && (
          [{ label: 'Sekolah', color: '#7C3AED' }, { label: 'Kesehatan', color: '#DC2626' }, { label: 'Belanja', color: '#0891B2' }, { label: 'Ibadah', color: '#D97706' }]
            .map(({ label, color }) => (
              <span key={label} className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap" style={{ backgroundColor: `${color}15`, color, border: `1px solid ${color}40` }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
                {label}
              </span>
            ))
        )}
      </>
    )
  }

  function FullscreenStageBar() {
    const tabScrollRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
      const el = tabScrollRef.current
      if (!el) return
      const activeBtn = el.querySelector('[aria-current="step"]') as HTMLElement
      if (activeBtn) {
        activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
      }
    }, [activeTab])

    return (
      <nav
        className="absolute left-4 right-4 top-3 sm:top-4 z-[1002] flex min-w-0 items-center justify-between gap-2 rounded-2xl border border-[#E1E5E8] bg-white/95 backdrop-blur-md px-3.5 py-2 shadow-lg"
        aria-label="Navigasi lima langkah"
      >
        <div ref={tabScrollRef} className="flex items-center gap-1.5 overflow-x-auto no-scrollbar" style={{ scrollbarWidth: 'none' }}>
          {ALL_TABS.map((tab) => {
            const locked = !isPremium && tab !== 'Ringkasan'
            const active = tab === activeTab
            return (
              <button
                key={tab}
                type="button"
                onClick={() => { if (locked) { onUpgrade(); return } onTabChange?.(tab) }}
                className="shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer"
                style={{
                  backgroundColor: active ? '#0F2B38' : locked ? '#F8FAFC' : 'transparent',
                  color: active ? '#fff' : locked ? '#94A3B8' : '#3D4F5B',
                  border: active ? '1.5px solid #0F2B38' : locked ? '1px dashed #CBD5E1' : '1px solid #C1CCD6',
                }}
                aria-current={active ? 'step' : undefined}
              >
                {tab}
              </button>
            )
          })}
        </div>
        <button
          type="button"
          onClick={() => setFullscreen(false)}
          className="flex size-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer"
          aria-label="Tutup peta full view"
        >
          <X size={16} />
        </button>
      </nav>
    )
  }

  const controlsZIndexClass = fullscreen ? 'z-[1100]' : 'z-[1060]'

  return (
    <div className="bg-white flex flex-col overflow-hidden transition-all duration-300 relative" style={wrapperStyle}>

      {/* ── Fullscreen: five-step navigation replaces the workspace header ── */}
      {fullscreen && !stepperOpen && <FullscreenStageBar />}

      {/* ── Fullscreen: optional stage navigation overlay ── */}
      {fullscreen && stepperOpen && (
        <div className="absolute bottom-4 left-4 top-4 z-[1010]">
          <VerticalTimeline nodes={timelineNodes} onClose={() => setStepperOpen(false)} />
        </div>
      )}

      {/* ── Normal mode top controls / Kembali button ── */}
      {!fullscreen && !hideFloatingControls && onBack && (
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            onBack()
          }}
          className={`absolute left-4 top-4 ${controlsZIndexClass} flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white text-slate-800 font-semibold text-xs shadow-md border border-slate-200 hover:bg-slate-50 active:scale-95 transition-all cursor-pointer pointer-events-auto`}
        >
          <ArrowLeft size={14} />
          Kembali
        </button>
      )}

      {!fullscreen && !hideFloatingControls && !hideMapLayers && !onBack && (
        <div
          className={`absolute top-4 left-4 right-4 ${controlsZIndexClass} flex items-center gap-2 px-4 py-2.5 pointer-events-auto`}
          style={{ backgroundColor: 'white', borderRadius: 18, boxShadow: '0 2px 12px rgba(0,0,0,0.1)', minHeight: 44 }}
        >
          {/* Label — left */}
          <div className="flex items-center gap-1.5 shrink-0">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1.5 4.5l5.5 2 5.5-2M1.5 9.5l5.5 2 5.5-2M7 2.5l5.5 2-5.5 2-5.5-2L7 2.5z" stroke="#3d4f5b" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-xs font-semibold" style={{ color: '#3d4f5b' }}>
              {isPerjalanan ? 'Rute' : isFasilitas ? 'Fasilitas' : isChecklist ? 'Jangkauan' : 'Map Layers'}
            </span>
          </div>

          {/* Filter pills — right */}
          <div className="flex items-center gap-1.5 ml-auto flex-wrap justify-end">
            <LayerPills />
          </div>
        </div>
      )}

      {/* ── Fullscreen: floating layer controls ── */}
      {fullscreen && !stepperOpen && (
        <div
          className="absolute z-[1100] flex items-center gap-2 overflow-x-auto px-3 py-2 no-scrollbar pointer-events-auto"
          style={{ bottom: 16, right: 68, maxWidth: 'calc(100vw - 132px)', background: 'rgba(255,255,255,0.96)', borderRadius: 14, boxShadow: '0 2px 8px rgba(0,0,0,0.1)', scrollbarWidth: 'none' }}
        >
          <div className="flex items-center gap-1.5 shrink-0 pr-1">
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
              <path d="M1.5 4.5l5.5 2 5.5-2M1.5 9.5l5.5 2 5.5-2M7 2.5l5.5 2-5.5 2-5.5-2L7 2.5z" stroke="#3d4f5b" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-xs font-semibold" style={{ color: '#3d4f5b' }}>
              {isPerjalanan ? 'Rute' : isFasilitas ? 'Fasilitas' : isChecklist ? 'Jangkauan' : 'Map Layers'}
            </span>
          </div>
          <div className="flex min-w-max items-center gap-1.5">
            <LayerPills />
          </div>
        </div>
      )}

      {/* ── Leaflet map ── */}
      <div className="flex-1 relative" style={{ zIndex: 0 }}>
        <MapContainer
          center={tabCfg.center}
          zoom={tabCfg.zoom}
          style={{ width: '100%', height: '100%' }}
          zoomControl={false}
          attributionControl={false}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <MapCamera center={tabCfg.center} zoom={tabCfg.zoom} />

          {/* RINGKASAN */}
          {isRingkasan && layers.radiusCircle && <Circle center={CENTER} radius={600} pathOptions={{ color:'#5C5CE2', weight:2, dashArray:'6 5', fillColor:'rgba(92,92,226,0.06)', fillOpacity:1 }} />}
          {isRingkasan && layers.flood        && <Polygon positions={FLOOD_POLYGON} pathOptions={{ color:'#E12626', weight:2, dashArray:'6 4', fillColor:'rgba(225,38,38,0.18)', fillOpacity:1 }} />}
          {isRingkasan && layers.poiMarkers   && (<>
            <Marker position={[-6.258,106.993]} icon={alertIcon}><Popup>Zona banjir terdeteksi</Popup></Marker>
            <Marker position={[-6.261,106.984]} icon={schoolIcon}><Popup>Sekolah terdekat</Popup></Marker>
            <Marker position={[-6.266,106.997]} icon={shopIcon}><Popup>Fasilitas belanja</Popup></Marker>
            <Marker position={[-6.272,106.985]} icon={infraIcon}><Popup>Infrastruktur</Popup></Marker>
          </>)}

          {/* FAKTOR RISIKO */}
          {isRisiko && (<>
            {layers.flood        && <Polygon positions={FLOOD_POLYGON} pathOptions={{ color:'#E12626', weight:2.5, fillColor:'rgba(225,38,38,0.30)', fillOpacity:1 }} />}
            {layers.flood        && <Polygon positions={LIQUEFACTION_POLYGON} pathOptions={{ color:'#EA580C', weight:2, dashArray:'5 4', fillColor:'rgba(234,88,12,0.18)', fillOpacity:1 }} />}
            {layers.radiusCircle && <Circle center={CENTER} radius={800} pathOptions={{ color:'#2563EB', weight:1.5, dashArray:'4 5', fillColor:'rgba(37,99,235,0.05)', fillOpacity:1 }} />}
            {layers.poiMarkers   && (<>
              <Marker position={[-6.258,106.993]} icon={alertIcon}><Popup>Zona banjir terdeteksi — Tinggi</Popup></Marker>
              <Marker position={[-6.262,106.999]} icon={zapIcon}><Popup>Risiko likuifaksi — Sedang</Popup></Marker>
            </>)}
          </>)}

          {/* PERJALANAN */}
          {isPerjalanan && (<>
            {(Object.entries(ROUTES) as [RouteKey, typeof ROUTES[RouteKey]][]).map(([key, r]) =>
              activeRoutes.has(key) ? <Polyline key={key} positions={r.coords} pathOptions={{ color:r.color, weight:4.5, opacity:0.88, lineCap:'round', lineJoin:'round' }} /> : null
            )}
            {(Object.entries(ROUTES) as [RouteKey, typeof ROUTES[RouteKey]][]).map(([key, r]) =>
              activeRoutes.has(key) ? <Marker key={`end-${key}`} position={r.endPos} icon={makeRouteEndIcon(r.color, r.endLabel)}><Popup>{r.label}: {r.endLabel}</Popup></Marker> : null
            )}
          </>)}

          {/* CHECKLIST */}
          {isChecklist && (<>
            <Circle center={CENTER} radius={500} pathOptions={{ color:'#16A34A', weight:2, dashArray:'6 5', fillColor:'rgba(22,163,74,0.07)', fillOpacity:1 }} />
            {WALKABILITY_POIS.map((poi, i) => <Marker key={i} position={poi.pos} icon={makeLucideIcon(poi.Icon, poi.color, 32, 14)}><Popup>{poi.label}</Popup></Marker>)}
          </>)}

          {/* FASILITAS */}
          {isFasilitas && FACILITIES.filter(f => !facilityVisible || facilityVisible[f.category]).map((f, i) => (
            <Marker key={i} position={f.pos} icon={makeLucideIcon(f.Icon, f.color, 38, 17)}>
              <Popup><strong>{f.label}</strong><br />{f.type}</Popup>
            </Marker>
          ))}

          {/* Property pin — always */}
          <Marker position={CENTER} icon={propertyIcon}>
            <Popup><strong>Grand Galaxy City</strong><br />Lokasi properti</Popup>
          </Marker>

          {!hideFloatingControls && (
            <ZoomControls
              recenterTarget={{ center: tabCfg.center, zoom: tabCfg.zoom }}
              bottomOffset={fullscreen ? 16 : (sheetInset > 0 ? sheetInset + 116 : 76)}
              side={fullscreen ? 'right' : 'left'}
              fullscreen={fullscreen}
            />
          )}
        </MapContainer>
      </div>

      {/* ── Bottom strip: info chip + Perluas Peta (normal map only) ── */}
      {!fullscreen && !hideFloatingControls && (
        <div
          className={`absolute ${controlsZIndexClass} flex items-center gap-2 pointer-events-auto ${
            hideInfoChip ? 'right-3 bottom-3' : 'left-4 right-4'
          }`}
          style={hideInfoChip ? undefined : { bottom: sheetInset > 0 ? sheetInset + 56 : 12 }}
        >
          {/* Info chip */}
          {!hideInfoChip && (
            <div
              className="flex-1 flex items-center gap-2 px-3 py-2 rounded-xl min-w-0"
              style={{ background: 'rgba(255,255,255,0.96)', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', border: '1px solid #e1e5e8' }}
            >
              <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: tabCfg.infoColor }} />
              <p className="text-xs font-semibold truncate" style={{ color: '#001e2b' }}>{tabCfg.infoLabel}</p>
              <p className="text-xs truncate hidden sm:block" style={{ color: '#7c8c9a' }}>{tabCfg.infoSub}</p>
            </div>
          )}

          {/* Perluas Peta */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              if (onExpandMap) {
                onExpandMap()
              } else {
                setFullscreen(true)
                onFullscreenChange?.(true)
              }
            }}
            className="shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold transition-all hover:bg-blue-50 active:scale-95 cursor-pointer shadow-md pointer-events-auto"
            style={{ background: 'white', color: '#2563EB', border: '1px solid #93C5FD' }}
          >
            <Maximize2 size={13} color="#2563EB" />
            Perluas Peta
          </button>
        </div>
      )}

    </div>
  )
}
