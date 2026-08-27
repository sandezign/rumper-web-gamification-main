import React, { useState, useMemo, useRef, useEffect } from "react"
import {
  Map,
  List,
  Bookmark,
  Search,
  Plus,
  Minus,
  RotateCcw,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  MapPin,
  Train,
  Check,
  ChevronRight,
  ChevronLeft,
  Layers,
  Filter,
  ArrowLeft,
  Compass,
  Zap,
  Info,
  Clock,
  Coins,
  Navigation,
  Eye,
  AlertTriangle,
  Scale,
  Mountain,
  X,
} from "lucide-react"
import {
  MapContainer,
  TileLayer,
  Circle,
  Polygon,
  Marker,
  Popup,
  Polyline,
  useMap,
} from "react-leaflet"
import L from "leaflet"
import svgPaths from "../../imports/Header/svg-n4hssipkeg"
import {
  initialCuratedAreas,
  SUDIRMAN_GRAVITY_CENTER,
  type CuratedArea,
  type FitCategory,
} from "../../data/mockCuratedAreas"
import DaftarAksesibelView from "./DaftarAksesibelView"
import ShortlistAreasView from "./ShortlistAreasView"
import AreaDetailDrawer from "./AreaDetailDrawer"
import UnlockAreaQuotaModal from "./UnlockAreaQuotaModal"
import AreaComparisonModal from "./AreaComparisonModal"
import AreaCardCarousel from "./AreaCardCarousel"

type ViewMode = "peta" | "daftar"
type DaftarSubTab = "semua" | "shortlist"
type CategoryFilter = "all" | FitCategory | "shortlisted"

interface CuratedAreasMapScreenProps {
  onUnlockArea: (area: CuratedArea) => void
  onCancel?: () => void
  userRemainingQuota?: number
  isPremium?: boolean
}

// ── Leaflet Default Icons Fix ──────────────────────────────────────────────
delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)
  ._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
})

// ── Map Constants ─────────────────────────────────────────────────────────
const JABODETABEK_CENTER: [number, number] = [-6.295, 106.85]
const JABODETABEK_DEFAULT_ZOOM = 11

// High-Risk Flood Floodplain Polygons across river basin corridors
const FLOOD_CORRIDOR_POLYGONS: [number, number][][] = [
  // Ciliwung Basin (Bidara Cina / Kampung Melayu flood trace)
  [
    [-6.23, 106.86],
    [-6.24, 106.868],
    [-6.255, 106.862],
    [-6.245, 106.852],
  ],
  // Kali Bekasi Basin (Bekasi Timur / Babelan floodplain)
  [
    [-6.22, 106.995],
    [-6.235, 107.015],
    [-6.25, 107.008],
    [-6.238, 106.985],
  ],
  // Cisadane Low Basin (Tangerang Utara / Teluknaga)
  [
    [-6.16, 106.63],
    [-6.18, 106.65],
    [-6.2, 106.635],
    [-6.175, 106.615],
  ],
]

// ── Custom Leaflet Icons Cache & Builders ──────────────────────────────────
const ICON_CACHE: Record<string, L.DivIcon> = {}

function makeSudirmanMarkerIcon() {
  const cacheKey = "sudirman-center-marker"
  if (ICON_CACHE[cacheKey]) return ICON_CACHE[cacheKey]

  const icon = L.divIcon({
    className: "leaflet-custom-marker",
    html: `
      <div style="position:relative;display:flex;align-items:center;cursor:pointer;">
        <!-- Pulsing Radar Glow Ring -->
        <div style="position:absolute;width:48px;height:48px;border-radius:50%;background:rgba(0,237,100,0.35);top:50%;left:50%;transform:translate(-50%,-50%);animation:pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;"></div>
        
        <!-- Main Core Pill Badge -->
        <div style="position:relative;z-index:10;display:flex;align-items:center;gap:6px;background:#001E2B;color:white;padding:5px 12px;border-radius:9999px;border:2px solid #00ED64;box-shadow:0 4px 14px rgba(0,30,43,0.4);font-family:'DM Sans',sans-serif;">
          <div style="width:8px;height:8px;border-radius:50%;background:#00ED64;"></div>
          <span style="font-size:11px;font-weight:900;letter-spacing:-0.01em;white-space:nowrap;">Sudirman (Pusat Aktivitas)</span>
        </div>
      </div>
    `,
    iconSize: [180, 40],
    iconAnchor: [90, 20],
  })

  ICON_CACHE[cacheKey] = icon
  return icon
}

function makeCorridorMarkerIcon(area: CuratedArea, isSelected: boolean) {
  const cacheKey = `corridor-${area.id}-${isSelected}`
  if (ICON_CACHE[cacheKey]) return ICON_CACHE[cacheKey]

  const isStrongFit = area.category === "strong-fit"
  const isTradeoff = area.category === "interesting-tradeoff"

  const dotColor = isStrongFit ? "#00B545" : isTradeoff ? "#D4A017" : "#D9383A"
  const bgStyle = isSelected
    ? "background:#001E2B;color:white;border:2.5px solid #00ED64;box-shadow:0 6px 20px rgba(0,237,100,0.45);transform:scale(1.08);"
    : "background:rgba(255,255,255,0.96);color:#001E2B;border:1.5px solid rgba(193,204,214,0.9);box-shadow:0 3px 10px rgba(0,0,0,0.15);"

  const commuteBadgeStyle = isSelected
    ? "background:rgba(0,237,100,0.25);color:#00ED64;"
    : "background:#F4F7F8;color:#5C6C7A;"

  const shortName = area.name.split("&")[0].trim()
  const shortCommute = area.commuteTime.replace("Menit", "m").trim()

  const icon = L.divIcon({
    className: "leaflet-custom-marker",
    html: `
      <div style="position:relative;display:flex;align-items:center;cursor:pointer;transition:all 0.2s ease-out;">
        <div style="display:flex;align-items:center;gap:6px;padding:4px 10px;border-radius:9999px;font-family:'DM Sans',sans-serif;backdrop-filter:blur(8px);${bgStyle}">
          <span style="width:8px;height:8px;border-radius:50%;background:${dotColor};flex-shrink:0;"></span>
          <span style="font-size:11px;font-weight:800;white-space:nowrap;">${shortName}</span>
          <span style="font-size:9.5px;font-weight:700;padding:1px 5px;border-radius:6px;${commuteBadgeStyle}">${shortCommute}</span>
        </div>
      </div>
    `,
    iconSize: [140, 36],
    iconAnchor: [70, 18],
  })

  ICON_CACHE[cacheKey] = icon
  return icon
}

// ── Map Camera FlyTo Controller ────────────────────────────────────────────
function MapCamera({
  center,
  zoom,
}: {
  center: [number, number]
  zoom: number
}) {
  const map = useMap()
  const prevKey = useRef<string>("")
  const currentKey = `${center[0]},${center[1]},${zoom}`

  useEffect(() => {
    if (prevKey.current !== currentKey) {
      prevKey.current = currentKey
      if (map && map.getSize && map.getSize().x > 0) {
        try {
          map.flyTo(center, zoom, {
            duration: 0.85,
            easeLinearity: 0.25,
          })
        } catch (_) {}
      }
    }
  }, [center, zoom, currentKey, map])

  return null
}

// ── Map Floating Zoom Controls ────────────────────────────────────────────
function MapZoomControls({ onRecenter }: { onRecenter: () => void }) {
  const map = useMap()

  return (
    <div className="flex flex-col gap-1 bg-white/95 backdrop-blur-md p-1.5 rounded-2xl border border-[#E1E5E8] shadow-lg">
      <button
        type="button"
        onClick={() => map.zoomIn()}
        title="Perbesar Peta"
        className="w-8 h-8 rounded-xl flex items-center justify-center text-[#001E2B] hover:bg-[#F4F7F8] active:scale-95 transition-all cursor-pointer font-bold"
      >
        <Plus size={16} />
      </button>
      <button
        type="button"
        onClick={() => map.zoomOut()}
        title="Perkecil Peta"
        className="w-8 h-8 rounded-xl flex items-center justify-center text-[#001E2B] hover:bg-[#F4F7F8] active:scale-95 transition-all cursor-pointer font-bold"
      >
        <Minus size={16} />
      </button>
      <button
        type="button"
        onClick={onRecenter}
        title="Reset Tampilan Jabodetabek"
        className="w-8 h-8 rounded-xl flex items-center justify-center text-[#001E2B] hover:bg-[#F4F7F8] active:scale-95 transition-all border-t border-[#E1E5E8] cursor-pointer"
      >
        <RotateCcw size={13} />
      </button>
    </div>
  )
}

// Canonical Rumper Logo Mark
function RumperMark() {
  return (
    <span
      className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#001E2B]"
      aria-hidden="true"
    >
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
        <path d={svgPaths.p187fc900} stroke="#00ED64" strokeWidth="2" />
        <path d={svgPaths.p38875b00} fill="#5085FF" />
      </svg>
    </span>
  )
}

function LocationIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d={svgPaths.p3d095780}
        stroke="#00ED64"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.33333"
      />
      <path
        d={svgPaths.p26d22700}
        stroke="#00ED64"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.33333"
      />
    </svg>
  )
}

function ProfileIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <path
        d={svgPaths.p32d71800}
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.66667"
      />
      <path
        d={svgPaths.p205a5680}
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.66667"
      />
    </svg>
  )
}

export default function CuratedAreasMapScreen({
  onUnlockArea,
  onCancel,
  userRemainingQuota = 1,
  isPremium = false,
}: CuratedAreasMapScreenProps) {
  // View State
  const [viewMode, setViewMode] = useState<ViewMode>("peta")
  const [daftarSubTab, setDaftarSubTab] = useState<DaftarSubTab>("semua")
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("all")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const searchInputRef = useRef<HTMLInputElement>(null)
  const [areas, setAreas] = useState<CuratedArea[]>(initialCuratedAreas)
  const [selectedAreaId, setSelectedAreaId] = useState<string>("area-bintaro")

  // Keyboard shortcut (Cmd+K / Ctrl+K / /) to focus search input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.key === "k" && (e.metaKey || e.ctrlKey)) ||
        (e.key === "/" &&
          document.activeElement?.tagName !== "INPUT" &&
          document.activeElement?.tagName !== "TEXTAREA")
      ) {
        e.preventDefault()
        searchInputRef.current?.focus()
      } else if (
        e.key === "Escape" &&
        document.activeElement === searchInputRef.current
      ) {
        if (searchQuery) {
          setSearchQuery("")
        } else {
          searchInputRef.current?.blur()
        }
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [searchQuery])

  // GIS Map Layer Toggles
  const [showTransitRoutes, setShowTransitRoutes] = useState<boolean>(true)
  const [showRadiusCircles, setShowRadiusCircles] = useState<boolean>(true)
  const [showFloodZones, setShowFloodZones] = useState<boolean>(false)

  // Modals & Drawers state
  const [drawerArea, setDrawerArea] = useState<CuratedArea | null>(null)
  const [quotaModalArea, setQuotaModalArea] = useState<CuratedArea | null>(null)
  const [selectedForComparison, setSelectedForComparison] = useState<string[]>(
    [],
  )
  const [isComparisonModalOpen, setIsComparisonModalOpen] =
    useState<boolean>(false)

  // Counts
  const strongFitCount = useMemo(
    () => areas.filter((a) => a.category === "strong-fit").length,
    [areas],
  )
  const tradeoffCount = useMemo(
    () => areas.filter((a) => a.category === "interesting-tradeoff").length,
    [areas],
  )
  const challengeCount = useMemo(
    () => areas.filter((a) => a.category === "challenge-assumptions").length,
    [areas],
  )
  const shortlistedAreas = useMemo(
    () => areas.filter((a) => a.isShortlisted),
    [areas],
  )

  // Filtered areas
  const filteredAreas = useMemo(() => {
    return areas.filter((area) => {
      const matchCategory =
        categoryFilter === "all"
          ? true
          : categoryFilter === "shortlisted"
            ? area.isShortlisted
            : area.category === categoryFilter
      const matchQuery =
        searchQuery.trim() === ""
          ? true
          : area.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            area.region.toLowerCase().includes(searchQuery.toLowerCase())
      return matchCategory && matchQuery
    })
  }, [areas, categoryFilter, searchQuery])

  // Selected area object
  const selectedArea =
    areas.find((a) => a.id === selectedAreaId) || filteredAreas[0] || areas[0]

  // Active Index among filtered areas
  const currentAreaIndex = useMemo(() => {
    const idx = filteredAreas.findIndex((a) => a.id === selectedArea.id)
    return idx >= 0 ? idx : 0
  }, [filteredAreas, selectedArea])

  // Map Camera Target
  const mapCenterTarget: [number, number] = useMemo(() => {
    if (selectedArea && selectedArea.latLng) {
      return selectedArea.latLng
    }
    return JABODETABEK_CENTER
  }, [selectedArea])

  const [mapZoomTarget, setMapZoomTarget] = useState<number>(12)

  // Comparison areas objects
  const comparisonAreaObjects = useMemo(() => {
    return areas.filter((a) => selectedForComparison.includes(a.id))
  }, [areas, selectedForComparison])

  // Handlers
  const handleSelectArea = (id: string) => {
    setSelectedAreaId(id)
    const target = areas.find((a) => a.id === id)
    if (target) {
      setMapZoomTarget(12)
    }
  }

  const handleStepArea = (direction: "prev" | "next") => {
    if (filteredAreas.length === 0) return
    const nextIdx =
      direction === "next"
        ? (currentAreaIndex + 1) % filteredAreas.length
        : (currentAreaIndex - 1 + filteredAreas.length) % filteredAreas.length
    const nextArea = filteredAreas[nextIdx]
    if (nextArea) {
      handleSelectArea(nextArea.id)
    }
  }

  const handleRecenterAll = () => {
    setMapZoomTarget(JABODETABEK_DEFAULT_ZOOM)
    setSelectedAreaId("")
  }

  const handleToggleBookmark = (id: string) => {
    setAreas((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, isShortlisted: !a.isShortlisted } : a,
      ),
    )
  }

  const handleToggleComparison = (id: string) => {
    setSelectedForComparison((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id)
      }
      if (prev.length >= 3) {
        alert("Maksimal 3 area untuk perbandingan side-by-side.")
        return prev
      }
      return [...prev, id]
    })
  }

  const handleRemoveFromShortlist = (id: string) => {
    setAreas((prev) =>
      prev.map((a) => (a.id === id ? { ...a, isShortlisted: false } : a)),
    )
    setSelectedForComparison((prev) => prev.filter((item) => item !== id))
  }

  const handleConfirmQuotaUnlock = (area: CuratedArea) => {
    setQuotaModalArea(null)
    onUnlockArea(area)
  }

  const isAnyOverlayOpen =
    drawerArea !== null || quotaModalArea !== null || isComparisonModalOpen

  return (
    <div className="h-screen h-[100dvh] max-h-screen bg-[#F4F7F8] text-[#001E2B] flex flex-col overflow-hidden antialiased font-sans select-none relative">
      {/* ── 1. Top Branded Navigation Bar (Sticky Deep Teal Header) ── */}
      <header className="shrink-0 bg-[#001E2B] text-white border-b border-white/20 px-4 sm:px-5 py-2 min-h-[52px] flex items-center justify-between gap-3 shadow-sm z-30">
        {/* Left: Brand Identity & Subscription Type Chip */}
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-2">
            <RumperMark />
            <span
              className="whitespace-nowrap text-lg font-bold leading-tight text-white"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Rumper
            </span>
          </div>

          <div
            className="flex h-8 items-center rounded-full border border-[rgba(1,237,100,0.5)] bg-[rgba(1,237,100,0.1)] px-3 text-xs font-semibold leading-none text-[#00ED64] shrink-0"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {isPremium ? "Premium" : "Free Trial"}
          </div>
        </div>

        {/* Right: Workspace Action Button, Quota Badge & Profile Button */}
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          {/* Action to Workspace */}
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="flex h-8 items-center justify-center gap-1.5 rounded-full border border-white/20 bg-white/5 px-3 hover:bg-white/10 hover:border-white/30 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-white cursor-pointer active:scale-[0.98] shrink-0 text-white"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
              aria-label="Lanjut ke Workspace"
            >
              <LocationIcon />
              <span className="text-xs font-semibold leading-none text-white hidden sm:inline">
                Lanjut ke Workspace
              </span>
              <svg
                className="shrink-0"
                width="14"
                height="14"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M6 12L10 8L6 4"
                  stroke="#A8B3BC"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.33333"
                />
              </svg>
            </button>
          )}

          {/* Quota Badge */}
          <span
            className="hidden sm:inline-flex h-8 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 text-xs font-semibold leading-none text-[#00ED64] items-center gap-1.5 shrink-0"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#00ED64] animate-pulse shrink-0" />
            <span>{userRemainingQuota} lokasi tersisa</span>
          </span>

          {/* Profile Icon */}
          <button
            type="button"
            className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white cursor-pointer"
            aria-label="Profil"
          >
            <ProfileIcon />
          </button>
        </div>
      </header>

      {/* ── 2. Sticky Sub-Header Bar with 2 Main Modes (Peta vs Daftar Area) ── */}
      <div className="shrink-0 bg-white border-b border-[#E1E5E8] px-4 sm:px-6 py-2.5 sm:py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5 sm:gap-3 shadow-xs z-20">
        {/* Layer 1 (Mobile Line 1): Title & Explanatory Tagline */}
        <div className="space-y-0.5 min-w-0">
          <div className="flex items-center justify-between sm:justify-start gap-2">
            <h1 className="text-base sm:text-lg font-extrabold text-[#001E2B] tracking-tight [text-wrap:balance]">
              Peta Rekomendasi Wilayah
            </h1>
            <span className="text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-md bg-[#F4F7F8] text-[#5C6C7A] border border-[#E1E5E8] shrink-0">
              Jabodetabek
            </span>
          </div>
          <p className="text-xs text-[#5C6C7A] font-medium hidden sm:block">
            Dikelompokkan berdasarkan keselarasan kompromi hidup nyata, bukan
            skor fiktif.
          </p>
        </div>

        {/* Layer 2 (Mobile Line 2): 2 Main View Mode Selection Segmented Control */}
        <div className="flex items-center gap-1.5 w-full sm:w-auto bg-[#F4F7F8] sm:bg-transparent p-1 sm:p-0 rounded-full sm:rounded-none border border-[#E1E5E8] sm:border-none shrink-0 overflow-x-auto scrollbar-none">
          {/* Mode 1: Peta Interaktif */}
          <button
            type="button"
            onClick={() => setViewMode("peta")}
            className={`flex-1 sm:flex-initial justify-center min-h-[44px] sm:min-h-[36px] px-3.5 sm:px-4 py-2 sm:py-1.5 rounded-full text-xs font-bold transition-transform transition-colors flex items-center gap-1.5 cursor-pointer active:scale-[0.96] whitespace-nowrap ${
              viewMode === "peta"
                ? "bg-[#0F2B38] text-white border border-[#0F2B38] shadow-2xs"
                : "bg-white sm:bg-transparent text-[#3D4F5B] border border-[#C1CCD6] hover:bg-slate-100/80"
            }`}
          >
            <Map
              size={14}
              className={
                viewMode === "peta" ? "text-[#00ED64]" : "text-[#7C8C9A]"
              }
            />
            <span>Peta Interaktif</span>
          </button>

          {/* Mode 2: Daftar Area (With Shortlist Counter Badge Inside) */}
          <button
            type="button"
            onClick={() => setViewMode("daftar")}
            className={`flex-1 sm:flex-initial justify-center min-h-[44px] sm:min-h-[36px] px-3.5 sm:px-4 py-2 sm:py-1.5 rounded-full text-xs font-bold transition-transform transition-colors flex items-center gap-1.5 cursor-pointer active:scale-[0.96] whitespace-nowrap ${
              viewMode === "daftar"
                ? "bg-[#0F2B38] text-white border border-[#0F2B38] shadow-2xs"
                : "bg-white sm:bg-transparent text-[#3D4F5B] border border-[#C1CCD6] hover:bg-slate-100/80"
            }`}
          >
            <List
              size={14}
              className={
                viewMode === "daftar" ? "text-[#00ED64]" : "text-[#7C8C9A]"
              }
            />
            <span>Daftar Area</span>
            {shortlistedAreas.length > 0 && (
              <span className="ml-1 px-1.5 py-0.5 rounded-full text-[10px] font-black bg-[#00ED64] text-[#001E2B] shadow-2xs tabular-nums">
                {shortlistedAreas.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* ── 3. Main Content Viewport (Fluid Responsive) ── */}
      <main className="flex-1 min-h-0 flex flex-col overflow-hidden relative z-0">
        {/* ========================================================
            VIEW MODE 1: PETA INTERAKTIF (Leaflet GIS Real Map)
            ======================================================== */}
        {viewMode === "peta" && (
          <div className="flex-1 min-h-0 flex flex-col lg:flex-row overflow-hidden relative">
            {/* DESKTOP PANEL KIRI (1/3 Width): Visible only on Desktop (lg:) */}
            <aside className="hidden lg:flex lg:w-[380px] xl:w-[420px] bg-white border-r border-[#E1E5E8] flex-col h-full shrink-0 z-10 shadow-xs overflow-hidden">
              {/* Category Filter Pills Top Bar (Fixed within Sidebar) */}
              <div className="shrink-0 p-3.5 sm:p-4 border-b border-[#E1E5E8] bg-[#F9FBFA] space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#7C8C9A]">
                    Kategori Keselarasan (Non-Ranking)
                  </span>
                  <span className="text-[11px] text-[#5C6C7A] font-semibold">
                    {filteredAreas.length} Wilayah
                  </span>
                </div>

                {/* 3 Interactive Filter Selection Chips */}
                <div className="grid grid-cols-3 gap-1.5">
                  <button
                    type="button"
                    onClick={() =>
                      setCategoryFilter(
                        categoryFilter === "strong-fit" ? "all" : "strong-fit",
                      )
                    }
                    className={`p-2.5 rounded-2xl text-left border transition-all cursor-pointer active:scale-[0.97] ${
                      categoryFilter === "strong-fit"
                        ? "bg-[#0F2B38] text-white border-[#0F2B38] shadow-2xs"
                        : "bg-white border-[#C1CCD6] text-[#3D4F5B] hover:bg-[#F4F7F6]"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          categoryFilter === "strong-fit"
                            ? "bg-[#00ED64]"
                            : "bg-[#00B545]"
                        }`}
                      />
                      <span className="text-[10px] font-black">
                        {strongFitCount}
                      </span>
                    </div>
                    <span className="text-[11px] font-bold block mt-1 leading-tight truncate">
                      Kesesuaian Kuat
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setCategoryFilter(
                        categoryFilter === "interesting-tradeoff"
                          ? "all"
                          : "interesting-tradeoff",
                      )
                    }
                    className={`p-2.5 rounded-2xl text-left border transition-all cursor-pointer active:scale-[0.97] ${
                      categoryFilter === "interesting-tradeoff"
                        ? "bg-[#0F2B38] text-white border-[#0F2B38] shadow-2xs"
                        : "bg-white border-[#C1CCD6] text-[#3D4F5B] hover:bg-[#F4F7F6]"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          categoryFilter === "interesting-tradeoff"
                            ? "bg-[#00ED64]"
                            : "bg-[#D4A017]"
                        }`}
                      />
                      <span className="text-[10px] font-black">
                        {tradeoffCount}
                      </span>
                    </div>
                    <span className="text-[11px] font-bold block mt-1 leading-tight truncate">
                      Kompromi Menarik
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setCategoryFilter(
                        categoryFilter === "challenge-assumptions"
                          ? "all"
                          : "challenge-assumptions",
                      )
                    }
                    className={`p-2.5 rounded-2xl text-left border transition-all cursor-pointer active:scale-[0.97] ${
                      categoryFilter === "challenge-assumptions"
                        ? "bg-[#0F2B38] text-white border-[#0F2B38] shadow-2xs"
                        : "bg-white border-[#C1CCD6] text-[#3D4F5B] hover:bg-[#F4F7F6]"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          categoryFilter === "challenge-assumptions"
                            ? "bg-[#00ED64]"
                            : "bg-[#D9383A]"
                        }`}
                      />
                      <span className="text-[10px] font-black">
                        {challengeCount}
                      </span>
                    </div>
                    <span className="text-[11px] font-bold block mt-1 leading-tight truncate">
                      Opsi Alternatif
                    </span>
                  </button>
                </div>
              </div>

              {/* Scrollable Compact Feed of Areas */}
              <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar p-3 space-y-2">
                {filteredAreas.map((area) => {
                  const isSelected = area.id === selectedArea.id
                  const isStrongFit = area.category === "strong-fit"
                  const isTradeoff = area.category === "interesting-tradeoff"
                  const dotColor = isStrongFit
                    ? "bg-[#00B545]"
                    : isTradeoff
                      ? "bg-[#D4A017]"
                      : "bg-[#D9383A]"

                  return (
                    <div
                      key={area.id}
                      onClick={() => handleSelectArea(area.id)}
                      className={`p-3.5 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between space-y-2 select-none relative ${
                        isSelected
                          ? "border-[#001E2B] bg-[#FBFDFC] shadow-sm ring-2 ring-[#001E2B]/10"
                          : "border-[#E1E5E8] bg-white hover:border-[#A8B8C6] hover:bg-[#F9FBFA]"
                      }`}
                    >
                      {/* Active Indicator Bar */}
                      {isSelected && (
                        <div className="absolute left-0 top-3 bottom-3 w-1 bg-[#00ED64] rounded-r-full" />
                      )}

                      {/* Top Row: Category Tag + Bookmark */}
                      <div className="flex items-center justify-between pl-1">
                        <span
                          className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border flex items-center gap-1.5 ${
                            isStrongFit
                              ? "bg-[#DCEEE7] text-[#004F38] border-[#318266]/30"
                              : isTradeoff
                                ? "bg-[#FFF3D6] text-[#6E4E00] border-[#D4A017]/30"
                                : "bg-[#FFE2E0] text-[#7A1D1A] border-[#D9383A]/30"
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full shrink-0 ${dotColor}`}
                          />
                          <span>{area.categoryLabel}</span>
                        </span>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleToggleBookmark(area.id)
                          }}
                          className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                            area.isShortlisted
                              ? "text-[#00ED64] bg-[#001E2B]"
                              : "text-[#A8B3BC] hover:text-[#001E2B] hover:bg-[#F4F7F6]"
                          }`}
                          title={
                            area.isShortlisted
                              ? "Tersimpan di shortlist"
                              : "Simpan ke shortlist"
                          }
                        >
                          <Bookmark
                            size={13}
                            className={
                              area.isShortlisted ? "fill-[#00ED64]" : ""
                            }
                          />
                        </button>
                      </div>

                      {/* Corridor Title & Region */}
                      <div className="pl-1">
                        <h4 className="text-sm font-extrabold text-[#001E2B] leading-tight">
                          {area.name}
                        </h4>
                        <span className="text-[11px] text-[#7C8C9A] font-medium flex items-center gap-1 mt-0.5">
                          <MapPin size={11} className="text-[#7C8C9A]" />
                          {area.region}
                        </span>
                      </div>

                      {/* Quick Metrics Row with Vector Icons */}
                      <div className="flex items-center justify-between text-[11px] pt-2 border-t border-[#F0F4F6] text-[#5C6C7A] pl-1">
                        <span className="font-extrabold text-[#001E2B] flex items-center gap-1">
                          <Clock size={12} className="text-[#7C8C9A]" />
                          {area.commuteTime}
                        </span>
                        <span className="font-semibold flex items-center gap-1">
                          <Coins size={12} className="text-[#7C8C9A]" />
                          {area.priceRange}
                        </span>
                        <span className="text-[#00684A] font-bold bg-[#E9F5EF] px-1.5 py-0.5 rounded border border-[#318266]/20 flex items-center gap-1">
                          <Mountain size={11} className="text-[#00684A]" />
                          {area.elevationDpl}
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Sidebar Verified Synthesis Footer */}
              <div className="shrink-0 px-4 py-2.5 bg-[#F9FBFA] border-t border-[#E1E5E8] flex items-center justify-between text-[11px] text-[#5C6C7A]">
                <div className="flex items-center gap-1.5 font-semibold text-[#001E2B]">
                  <span className="w-2 h-2 rounded-full bg-[#00ED64] animate-pulse shrink-0" />
                  <span>Sintesis BNPB & BIG 2024</span>
                </div>
                <span className="text-[10px] font-extrabold px-2 py-0.5 bg-[#E9F5EF] text-[#004F38] rounded-full border border-[#318266]/20">
                  8 Koridor Terverifikasi
                </span>
              </div>
            </aside>

            {/* FULL MAP VIEWPORT (Occupies 100% on Mobile, 2/3 on Desktop) */}
            <div className="flex-1 min-w-0 h-full relative overflow-hidden bg-slate-100">
              <MapContainer
                center={mapCenterTarget}
                zoom={mapZoomTarget}
                zoomControl={false}
                scrollWheelZoom={true}
                style={{ height: "100%", width: "100%" }}
                className="w-full h-full z-0"
              >
                {/* Carto Voyager Baseline Tiles */}
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
                  url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                  maxZoom={19}
                />

                {/* Map Camera Controller */}
                <MapCamera center={mapCenterTarget} zoom={mapZoomTarget} />

                {/* Commute Radius Circles from Sudirman SCBD */}
                {showRadiusCircles && (
                  <>
                    {/* 10km Commute Ring */}
                    <Circle
                      center={SUDIRMAN_GRAVITY_CENTER.latLng}
                      radius={10000}
                      pathOptions={{
                        color: "#00ED64",
                        weight: 1.5,
                        dashArray: "6, 6",
                        fillColor: "#00ED64",
                        fillOpacity: 0.03,
                      }}
                    />
                    {/* 20km Commute Ring */}
                    <Circle
                      center={SUDIRMAN_GRAVITY_CENTER.latLng}
                      radius={20000}
                      pathOptions={{
                        color: "#3B82F6",
                        weight: 1.2,
                        dashArray: "4, 6",
                        fillColor: "#3B82F6",
                        fillOpacity: 0.02,
                      }}
                    />
                    {/* 35km Outer Commute Ring */}
                    <Circle
                      center={SUDIRMAN_GRAVITY_CENTER.latLng}
                      radius={35000}
                      pathOptions={{
                        color: "#94A3B8",
                        weight: 1,
                        dashArray: "4, 8",
                        fillColor: "transparent",
                        fillOpacity: 0,
                      }}
                    />
                  </>
                )}

                {/* Flood Zone Hazard Polygon Overlays (Toggleable) */}
                {showFloodZones &&
                  FLOOD_CORRIDOR_POLYGONS.map((coords, i) => (
                    <Polygon
                      key={i}
                      positions={coords}
                      pathOptions={{
                        color: "#DC2626",
                        weight: 1.5,
                        dashArray: "4, 4",
                        fillColor: "#DC2626",
                        fillOpacity: 0.18,
                      }}
                    />
                  ))}

                {/* Active Corridor Route Transit Polyline to Sudirman Center */}
                {selectedArea && showTransitRoutes && (
                  <Polyline
                    positions={[...selectedArea.latLngRoute]}
                    pathOptions={{
                      color: "#00684A",
                      weight: 4,
                      dashArray: "8, 6",
                      opacity: 0.9,
                    }}
                  />
                )}

                {/* Sudirman (Titik Gravitasi Kerja) Center Marker */}
                <Marker
                  position={SUDIRMAN_GRAVITY_CENTER.latLng}
                  icon={makeSudirmanMarkerIcon()}
                  eventHandlers={{
                    click: () => {
                      setMapZoomTarget(14)
                    },
                  }}
                />

                {/* 8 Curated Corridor Markers */}
                {filteredAreas.map((area) => {
                  const isSelected = area.id === selectedArea.id

                  return (
                    <Marker
                      key={area.id}
                      position={area.latLng}
                      icon={makeCorridorMarkerIcon(area, isSelected)}
                      eventHandlers={{
                        click: () => handleSelectArea(area.id),
                      }}
                    />
                  )
                })}

                {/* Map Zoom Controls Widget */}
                <div className="absolute top-16 sm:top-auto sm:bottom-4 right-3 sm:right-4 z-10 pointer-events-auto">
                  <MapZoomControls onRecenter={handleRecenterAll} />
                </div>
              </MapContainer>

              {/* Floating Top Map Search & Layer Controls Overlay */}
              <div className="absolute top-3 left-3 right-3 sm:left-4 sm:right-4 z-10 flex items-center justify-between gap-2 pointer-events-none">
                {/* Left: Search & Layer Filter Pills */}
                <div className="flex items-center gap-2 flex-wrap pointer-events-auto">
                  {/* Enhanced Search Bar Component */}
                  <div className="group relative flex items-center h-[38px] bg-white/95 backdrop-blur-md rounded-full border border-[#E1E5E8] px-3 shadow-sm hover:border-[#CBD5E1] focus-within:border-[#001E2B] focus-within:ring-2 focus-within:ring-[#001E2B]/10 focus-within:shadow-md transition-all">
                    <Search
                      size={14}
                      className="text-[#7C8C9A] group-focus-within:text-[#001E2B] transition-colors shrink-0 mr-2"
                      aria-hidden="true"
                    />
                    <input
                      ref={searchInputRef}
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Cari koridor..."
                      className="text-xs font-semibold text-[#001E2B] placeholder:text-[#8E9CA8] placeholder:font-normal outline-none bg-transparent w-28 xs:w-36 sm:w-44 transition-all"
                      aria-label="Cari nama koridor atau wilayah"
                    />
                    {searchQuery ? (
                      <button
                        type="button"
                        onClick={() => {
                          setSearchQuery("")
                          searchInputRef.current?.focus()
                        }}
                        className="ml-1.5 size-5 rounded-full bg-[#F4F7F8] hover:bg-[#E1E5E8] text-[#5C6C7A] hover:text-[#001E2B] flex items-center justify-center transition-all cursor-pointer active:scale-90 shrink-0"
                        title="Hapus pencarian (Esc)"
                        aria-label="Hapus pencarian"
                      >
                        <X size={11} />
                      </button>
                    ) : (
                      <kbd className="ml-1.5 hidden sm:inline-flex items-center px-1.5 py-0.5 rounded bg-[#F4F7F8] border border-[#E1E5E8] text-[9.5px] font-bold text-[#8E9CA8] select-none pointer-events-none">
                        ⌘K
                      </kbd>
                    )}
                  </div>

                  {/* Map Layer Filter Component (Core Workspace Parity) */}
                  <div className="flex items-center gap-2 h-[38px] bg-white/95 backdrop-blur-md rounded-full border border-[#E1E5E8] px-3.5 shadow-sm hover:border-[#CBD5E1] transition-all shrink-0">
                    {/* Label — left */}
                    <div className="flex items-center gap-1.5 shrink-0 pr-0.5">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                        <path
                          d="M1.5 4.5l5.5 2 5.5-2M1.5 9.5l5.5 2 5.5-2M7 2.5l5.5 2-5.5 2-5.5-2L7 2.5z"
                          stroke="#3d4f5b"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span className="text-xs font-semibold text-[#3D4F5B] hidden xs:inline">
                        Map Layers
                      </span>
                    </div>

                    {/* Filter pills — right */}
                    <div className="flex items-center gap-1.5">
                      {/* Banjir Layer Pill */}
                      <button
                        type="button"
                        onClick={() => setShowFloodZones((prev) => !prev)}
                        className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition-all whitespace-nowrap cursor-pointer active:scale-95"
                        style={{
                          backgroundColor: showFloodZones ? "#e3fcef" : "#f4f7f6",
                          color: showFloodZones ? "#00684a" : "#7c8c9a",
                          border: `1px solid ${showFloodZones ? "#00ed64" : "#e1e5e8"}`,
                        }}
                        title="Toggle Layer Riwayat Genangan / Banjir BNPB"
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full shrink-0"
                          style={{
                            backgroundColor: showFloodZones ? "#00D972" : "#c1ccd6",
                          }}
                        />
                        Banjir
                      </button>

                      {/* Transit Layer Pill */}
                      <button
                        type="button"
                        onClick={() => setShowTransitRoutes((prev) => !prev)}
                        className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition-all whitespace-nowrap cursor-pointer active:scale-95"
                        style={{
                          backgroundColor: showTransitRoutes ? "#e3fcef" : "#f4f7f6",
                          color: showTransitRoutes ? "#00684a" : "#7c8c9a",
                          border: `1px solid ${showTransitRoutes ? "#00ed64" : "#e1e5e8"}`,
                        }}
                        title="Toggle Jalur Rute Transit KRL & Tol"
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full shrink-0"
                          style={{
                            backgroundColor: showTransitRoutes ? "#00D972" : "#c1ccd6",
                          }}
                        />
                        Transit
                      </button>

                      {/* Radius Layer Pill */}
                      <button
                        type="button"
                        onClick={() => setShowRadiusCircles((prev) => !prev)}
                        className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition-all whitespace-nowrap cursor-pointer active:scale-95"
                        style={{
                          backgroundColor: showRadiusCircles ? "#e3fcef" : "#f4f7f6",
                          color: showRadiusCircles ? "#00684a" : "#7c8c9a",
                          border: `1px solid ${showRadiusCircles ? "#00ed64" : "#e1e5e8"}`,
                        }}
                        title="Toggle Radius Jarak 10-35km dari Sudirman"
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full shrink-0"
                          style={{
                            backgroundColor: showRadiusCircles ? "#00D972" : "#c1ccd6",
                          }}
                        />
                        Radius
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right: Floating Provenance Pill on Desktop (Never collides with bottom card) */}
                <div className="hidden xl:flex items-center gap-2 bg-[#001E2B]/90 backdrop-blur-md text-white px-3.5 py-1.5 rounded-full border border-white/15 text-xs font-semibold shadow-md pointer-events-auto shrink-0">
                  <span className="w-2 h-2 rounded-full bg-[#00ED64] animate-pulse" />
                  <span>Sintesis Spasial BNPB & BIG 2024 · 8 Koridor</span>
                </div>
              </div>

              {/* DESKTOP Floating Selected Area Detail Pop-up Card (lg:block, bottom-4 left-4) */}
              {selectedArea && !isAnyOverlayOpen && (
                <div className="hidden lg:block absolute bottom-4 left-4 z-20 max-w-md w-[390px] max-h-[calc(100%-80px)] overflow-y-auto bg-white/98 backdrop-blur-xl rounded-3xl border border-[#E1E5E8] shadow-[0_16px_36px_rgba(0,30,43,0.14)] p-4 sm:p-5 space-y-3 animate-slideUp text-[#001E2B] pointer-events-auto">
                  {/* Tag & Region + Bookmark */}
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border flex items-center gap-1.5 ${
                        selectedArea.category === "strong-fit"
                          ? "bg-[#DCEEE7] text-[#004F38] border-[#318266]/30"
                          : selectedArea.category === "interesting-tradeoff"
                            ? "bg-[#FFF3D6] text-[#6E4E00] border-[#D4A017]/30"
                            : "bg-[#FFE2E0] text-[#7A1D1A] border-[#D9383A]/30"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                          selectedArea.category === "strong-fit"
                            ? "bg-[#00B545]"
                            : selectedArea.category === "interesting-tradeoff"
                              ? "bg-[#D4A017]"
                              : "bg-[#D9383A]"
                        }`}
                      />
                      <span>{selectedArea.categoryLabel}</span>
                    </span>

                    <div className="flex items-center gap-2">
                      <span className="text-xs text-[#5C6C7A] font-semibold flex items-center gap-1">
                        <MapPin size={12} className="text-[#7C8C9A]" />
                        {selectedArea.region}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleToggleBookmark(selectedArea.id)}
                        className={`min-w-[36px] min-h-[36px] rounded-full flex items-center justify-center transition-transform transition-colors active:scale-[0.96] cursor-pointer ${
                          selectedArea.isShortlisted
                            ? "text-[#00ED64] bg-[#001E2B]"
                            : "text-[#A8B3BC] hover:text-[#001E2B] hover:bg-[#F4F7F6]"
                        }`}
                        title={
                          selectedArea.isShortlisted
                            ? "Tersimpan di shortlist"
                            : "Simpan ke shortlist"
                        }
                        aria-label={
                          selectedArea.isShortlisted
                            ? `Hapus ${selectedArea.name} dari shortlist`
                            : `Simpan ${selectedArea.name} ke shortlist`
                        }
                      >
                        <Bookmark
                          size={14}
                          className={
                            selectedArea.isShortlisted ? "fill-[#00ED64]" : ""
                          }
                        />
                      </button>
                    </div>
                  </div>

                  {/* Title */}
                  <div>
                    <h3 className="text-base sm:text-lg font-black tracking-tight text-[#001E2B] [text-wrap:balance]">
                      {selectedArea.name}
                    </h3>
                  </div>

                  {/* 3 Metrics Box Grid */}
                  <div className="grid grid-cols-3 gap-1.5 text-center text-xs">
                    <div className="bg-[#F4F7F8] p-2 sm:p-2.5 rounded-2xl border border-[#E1E5E8] flex flex-col justify-center">
                      <span className="text-[9px] font-bold uppercase text-[#7C8C9A] flex items-center justify-center gap-1">
                        <Clock size={10} />
                        Komuter
                      </span>
                      <span className="text-xs font-black text-[#001E2B] mt-0.5 block tabular-nums">
                        {selectedArea.commuteTime}
                      </span>
                    </div>
                    <div className="bg-[#F4F7F8] p-2 sm:p-2.5 rounded-2xl border border-[#E1E5E8] flex flex-col justify-center">
                      <span className="text-[9px] font-bold uppercase text-[#7C8C9A] flex items-center justify-center gap-1">
                        <Coins size={10} />
                        Harga
                      </span>
                      <span
                        className="text-[11px] sm:text-xs font-black text-[#001E2B] mt-0.5 block tabular-nums tracking-tight whitespace-nowrap overflow-hidden text-ellipsis"
                        title={selectedArea.priceRange}
                      >
                        {selectedArea.priceRange}
                      </span>
                    </div>
                    <div className="bg-[#F4F7F8] p-2 sm:p-2.5 rounded-2xl border border-[#E1E5E8] flex flex-col justify-center">
                      <span className="text-[9px] font-bold uppercase text-[#7C8C9A] flex items-center justify-center gap-1">
                        <Mountain size={10} />
                        Elevasi
                      </span>
                      <span className="text-xs font-black text-[#00684A] mt-0.5 block tabular-nums">
                        {selectedArea.elevationDpl}
                      </span>
                    </div>
                  </div>

                  {/* Cocok & Trade-off Compact Text with Vector Icons */}
                  <div className="space-y-1.5 text-xs">
                    <div className="p-2.5 rounded-2xl bg-[#E9F5EF] border border-[#318266]/20 text-[#003D2E] font-medium leading-snug">
                      <div className="flex items-center gap-1.5 font-bold text-[#004F38] mb-0.5">
                        <Sparkles
                          size={13}
                          className="text-[#00684A] shrink-0"
                        />
                        <span>Mengapa Selaras:</span>
                      </div>
                      <p className="text-[#003D2E] pl-4 [text-wrap:pretty]">
                        {selectedArea.cocokReason}
                      </p>
                    </div>
                    <div className="p-2.5 rounded-2xl bg-[#FFF9E6] border border-[#D4A017]/20 text-[#523A00] font-medium leading-snug">
                      <div className="flex items-center gap-1.5 font-bold text-[#6E4E00] mb-0.5">
                        <Scale size={13} className="text-[#B37400] shrink-0" />
                        <span>Kompromi Nyata:</span>
                      </div>
                      <p className="text-[#523A00] pl-4 [text-wrap:pretty]">
                        {selectedArea.tradeoffReason}
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-2 flex items-center justify-between gap-2.5 border-t border-[#F0F4F6]">
                    <button
                      type="button"
                      onClick={() => setDrawerArea(selectedArea)}
                      className="min-h-[40px] px-4 py-2 rounded-full border border-[#D7E1E5] text-xs font-bold text-[#5C6C7A] hover:bg-[#F4F7F6] hover:text-[#001E2B] transition-transform transition-colors active:scale-[0.96] cursor-pointer"
                    >
                      Detail Koridor
                    </button>

                    <button
                      type="button"
                      onClick={() => setQuotaModalArea(selectedArea)}
                      className="min-h-[40px] flex-1 py-2 px-4 rounded-full bg-[#00ED64] hover:bg-[#00B545] text-[#001E2B] font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-transform transition-colors active:scale-[0.96] cursor-pointer"
                    >
                      <span>Evaluasi Rumah Ini</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              )}

              {/* ── MOBILE & TABLET CORRIDOR CARD CAROUSEL (lg:hidden) ── */}
              {!isAnyOverlayOpen && (
                <div className="lg:hidden">
                  <AreaCardCarousel
                    areas={filteredAreas}
                    allAreasCount={areas.length}
                    selectedAreaId={selectedArea.id}
                    onSelectArea={handleSelectArea}
                    onOpenDrawer={(area) => setDrawerArea(area)}
                    onOpenQuotaModal={(area) => setQuotaModalArea(area)}
                    onToggleBookmark={handleToggleBookmark}
                    categoryFilter={categoryFilter}
                    onCategoryFilterChange={setCategoryFilter}
                    counts={{
                      all: areas.length,
                      strongFit: strongFitCount,
                      tradeoff: tradeoffCount,
                      challenge: challengeCount,
                      shortlisted: shortlistedAreas.length,
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================================
            VIEW MODE 2: DAFTAR AREA (With Internal Shortlist Sub-tabs)
            ======================================================== */}
        {viewMode === "daftar" && (
          <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar p-4 md:p-6 max-w-7xl 2xl:max-w-[1536px] mx-auto w-full">
            {/* Clean Seamless Single-Layer Swipable Selection Chips Filter */}
            <div className="mb-6 w-full overflow-hidden">
              <div className="flex items-center gap-2 overflow-x-auto pb-1.5 scrollbar-none touch-pan-x scroll-smooth -mx-4 px-4 sm:mx-0 sm:px-0">
                <button
                  type="button"
                  onClick={() => {
                    setDaftarSubTab("semua")
                    setCategoryFilter("all")
                  }}
                  className={`min-h-[36px] px-4 py-1.5 rounded-full text-xs font-bold shrink-0 transition-all cursor-pointer active:scale-[0.96] whitespace-nowrap ${
                    daftarSubTab === "semua" && categoryFilter === "all"
                      ? "bg-[#0F2B38] text-white border border-[#0F2B38] shadow-2xs"
                      : "bg-transparent text-[#3D4F5B] border border-[#C1CCD6] hover:bg-slate-100/80"
                  }`}
                >
                  Semua (<span className="tabular-nums">{areas.length}</span>)
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setDaftarSubTab("semua")
                    setCategoryFilter("strong-fit")
                  }}
                  className={`min-h-[36px] px-4 py-1.5 rounded-full text-xs font-bold shrink-0 transition-all cursor-pointer active:scale-[0.96] whitespace-nowrap flex items-center gap-2 ${
                    daftarSubTab === "semua" && categoryFilter === "strong-fit"
                      ? "bg-[#0F2B38] text-white border border-[#0F2B38] shadow-2xs"
                      : "bg-transparent text-[#3D4F5B] border border-[#C1CCD6] hover:bg-slate-100/80"
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      daftarSubTab === "semua" &&
                      categoryFilter === "strong-fit"
                        ? "bg-[#00ED64]"
                        : "bg-[#00B545]"
                    }`}
                  />
                  <span>
                    Kesesuaian Kuat (
                    <span className="tabular-nums">{strongFitCount}</span>)
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setDaftarSubTab("semua")
                    setCategoryFilter("interesting-tradeoff")
                  }}
                  className={`min-h-[36px] px-4 py-1.5 rounded-full text-xs font-bold shrink-0 transition-all cursor-pointer active:scale-[0.96] whitespace-nowrap flex items-center gap-2 ${
                    daftarSubTab === "semua" &&
                    categoryFilter === "interesting-tradeoff"
                      ? "bg-[#0F2B38] text-white border border-[#0F2B38] shadow-2xs"
                      : "bg-transparent text-[#3D4F5B] border border-[#C1CCD6] hover:bg-slate-100/80"
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      daftarSubTab === "semua" &&
                      categoryFilter === "interesting-tradeoff"
                        ? "bg-[#00ED64]"
                        : "bg-[#D4A017]"
                    }`}
                  />
                  <span>
                    Kompromi Menarik (
                    <span className="tabular-nums">{tradeoffCount}</span>)
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setDaftarSubTab("semua")
                    setCategoryFilter("challenge-assumptions")
                  }}
                  className={`min-h-[36px] px-4 py-1.5 rounded-full text-xs font-bold shrink-0 transition-all cursor-pointer active:scale-[0.96] whitespace-nowrap flex items-center gap-2 ${
                    daftarSubTab === "semua" &&
                    categoryFilter === "challenge-assumptions"
                      ? "bg-[#0F2B38] text-white border border-[#0F2B38] shadow-2xs"
                      : "bg-transparent text-[#3D4F5B] border border-[#C1CCD6] hover:bg-slate-100/80"
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      daftarSubTab === "semua" &&
                      categoryFilter === "challenge-assumptions"
                        ? "bg-[#00ED64]"
                        : "bg-[#D9383A]"
                    }`}
                  />
                  <span>
                    Opsi Alternatif (
                    <span className="tabular-nums">{challengeCount}</span>)
                  </span>
                </button>

                {/* Area Tersimpan (Shortlist) Chip in same horizontal layer */}
                <button
                  type="button"
                  onClick={() =>
                    setDaftarSubTab(
                      daftarSubTab === "shortlist" ? "semua" : "shortlist",
                    )
                  }
                  className={`min-h-[36px] px-4 py-1.5 rounded-full text-xs font-bold shrink-0 transition-all flex items-center gap-1.5 cursor-pointer active:scale-[0.96] whitespace-nowrap ${
                    daftarSubTab === "shortlist"
                      ? "bg-[#0F2B38] text-white border border-[#0F2B38] shadow-2xs"
                      : "bg-transparent text-[#3D4F5B] border border-[#C1CCD6] hover:bg-slate-100/80"
                  }`}
                >
                  <Bookmark
                    size={13}
                    className={
                      daftarSubTab === "shortlist"
                        ? "text-[#00ED64] fill-[#00ED64]"
                        : shortlistedAreas.length > 0
                          ? "text-[#00B545] fill-[#00B545]"
                          : "text-[#7C8C9A]"
                    }
                  />
                  <span>
                    Area Tersimpan (
                    <span className="tabular-nums">
                      {shortlistedAreas.length}
                    </span>
                    )
                  </span>
                </button>
              </div>
            </div>

            {/* Sub-tab Content: Semua Area Grid vs Shortlist */}
            {daftarSubTab === "semua" ? (
              <DaftarAksesibelView
                areas={filteredAreas}
                onToggleBookmark={handleToggleBookmark}
                onOpenDrawer={(area) => setDrawerArea(area)}
                onEvaluateArea={(area) => setQuotaModalArea(area)}
              />
            ) : (
              <ShortlistAreasView
                shortlistedAreas={shortlistedAreas}
                selectedForComparison={selectedForComparison}
                onToggleComparison={handleToggleComparison}
                onRemoveFromShortlist={handleRemoveFromShortlist}
                onOpenDrawer={(area) => setDrawerArea(area)}
                onEvaluateArea={(area) => setQuotaModalArea(area)}
                onOpenComparisonModal={() => setIsComparisonModalOpen(true)}
                onBackToMap={() => {
                  setDaftarSubTab("semua")
                  setViewMode("peta")
                }}
              />
            )}
          </div>
        )}
      </main>

      {/* Slide-over Deep-Dive Corridor Drawer (z-[9999] High-Priority Overlay) */}
      <AreaDetailDrawer
        isOpen={drawerArea !== null}
        area={drawerArea}
        onClose={() => setDrawerArea(null)}
        onSelectForEvaluation={(area) => setQuotaModalArea(area)}
      />

      {/* Quota Unlock Confirmation Modal Dialog (z-[9999] High-Priority Overlay) */}
      <UnlockAreaQuotaModal
        isOpen={quotaModalArea !== null}
        area={quotaModalArea}
        remainingQuota={userRemainingQuota}
        totalQuota={5}
        onClose={() => setQuotaModalArea(null)}
        onConfirm={handleConfirmQuotaUnlock}
      />

      {/* Side-by-Side Area Comparison Matrix Modal (z-[9999] High-Priority Overlay) */}
      <AreaComparisonModal
        isOpen={isComparisonModalOpen}
        areas={comparisonAreaObjects}
        onClose={() => setIsComparisonModalOpen(false)}
        onSelectArea={(area) => {
          setIsComparisonModalOpen(false)
          setQuotaModalArea(area)
        }}
      />
    </div>
  )
}
