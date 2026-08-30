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
  SlidersHorizontal,
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
import CuratedAreaCard from "./CuratedAreaCard"

type ViewMode = "peta" | "daftar"
type DaftarSubTab = "semua" | "shortlist"
type CategoryFilter = "all" | FitCategory | "shortlisted"

interface CuratedAreasMapScreenProps {
  onUnlockArea: (area: CuratedArea) => void
  onCancel?: () => void
  onEditPreferences?: (targetStep?: number, targetStage?: number) => void
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
      <div style="position:relative;display:inline-flex;align-items:center;cursor:pointer;transform:translate(-50%,-50%);">
        <!-- Pulsing Radar Glow Ring -->
        <div style="position:absolute;width:44px;height:44px;border-radius:50%;background:rgba(0,237,100,0.25);top:50%;left:50%;transform:translate(-50%,-50%);animation:pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;pointer-events:none;"></div>
        
        <!-- Main Apple Core Pill Badge -->
        <div style="position:relative;z-index:10;display:inline-flex;align-items:center;gap:6px;background:#001E2B;color:#FFFFFF;padding:5px 12px;border-radius:9999px;border:1.5px solid rgba(255,255,255,0.3);box-shadow:0 4px 18px rgba(0,30,43,0.35), 0 0 0 3px rgba(0,237,100,0.25);font-family:'DM Sans',-apple-system,BlinkMacSystemFont,sans-serif;white-space:nowrap;">
          <div style="width:7px;height:7px;border-radius:50%;background:#00ED64;box-shadow:0 0 6px #00ED64;"></div>
          <span style="font-size:11.5px;font-weight:800;letter-spacing:-0.01em;white-space:nowrap;">Sudirman (Pusat SCBD)</span>
        </div>
      </div>
    `,
    iconSize: [0, 0],
    iconAnchor: [0, 0],
  })

  ICON_CACHE[cacheKey] = icon
  return icon
}

function makeCorridorMarkerIcon(area: CuratedArea, isSelected: boolean) {
  const cacheKey = `corridor-${area.id}-${isSelected}`
  if (ICON_CACHE[cacheKey]) return ICON_CACHE[cacheKey]

  const isStrongFit = area.category === "strong-fit"
  const isTradeoff = area.category === "interesting-tradeoff"

  const dotColor = isStrongFit ? "#34C759" : isTradeoff ? "#FF9F0A" : "#FF453A"
  const shortName = area.name.split("&")[0].trim()
  const cleanCommute = area.commuteTime.replace("Menit", "mnt").trim()

  const pillStyle = isSelected
    ? "background:#001E2B;color:#FFFFFF;border:1.5px solid rgba(255,255,255,0.3);box-shadow:0 8px 24px rgba(0,30,43,0.4), 0 0 0 3px rgba(0,237,100,0.35);transform:scale(1.08) translateY(-2px);"
    : "background:rgba(255,255,255,0.92);color:#1C1C1E;border:1px solid rgba(0,0,0,0.08);box-shadow:0 3px 12px rgba(0,0,0,0.12);"

  const commuteBadgeStyle = isSelected
    ? "background:rgba(0,237,100,0.2);color:#00ED64;"
    : "background:rgba(120,120,128,0.12);color:#636366;"

  const icon = L.divIcon({
    className: "leaflet-custom-marker",
    html: `
      <div style="position:relative;display:inline-flex;align-items:center;cursor:pointer;transform:translate(-50%,-50%);transition:transform 0.15s cubic-bezier(0.2,0,0,1);">
        <div style="display:inline-flex;align-items:center;gap:6px;padding:4.5px 10px;border-radius:9999px;font-family:'DM Sans',-apple-system,BlinkMacSystemFont,sans-serif;backdrop-filter:blur(16px);white-space:nowrap;${pillStyle}">
          <span style="width:7px;height:7px;border-radius:50%;background:${dotColor};flex-shrink:0;box-shadow:0 0 5px ${dotColor}80;"></span>
          <span style="font-size:11.5px;font-weight:700;letter-spacing:-0.01em;white-space:nowrap;">${shortName}</span>
          <span style="font-size:10px;font-weight:700;padding:1.5px 6px;border-radius:9999px;white-space:nowrap;letter-spacing:0.01em;${commuteBadgeStyle}">${cleanCommute}</span>
        </div>
      </div>
    `,
    iconSize: [0, 0],
    iconAnchor: [0, 0],
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
  onEditPreferences,
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
  const [mapZoomTarget, setMapZoomTarget] = useState<number>(12)

  // GIS Map Layer Toggles
  const [showTransitRoutes, setShowTransitRoutes] = useState<boolean>(true)
  const [showRadiusCircles, setShowRadiusCircles] = useState<boolean>(true)
  const [showFloodZones, setShowFloodZones] = useState<boolean>(false)

  // Modals & Drawers state
  const [drawerArea, setDrawerArea] = useState<CuratedArea | null>(null)
  const [quotaModalArea, setQuotaModalArea] = useState<CuratedArea | null>(null)
  const [isConfirmResetOpen, setIsConfirmResetOpen] = useState<boolean>(false)
  const [selectedForComparison, setSelectedForComparison] = useState<string[]>(
    [],
  )
  const [isComparisonModalOpen, setIsComparisonModalOpen] =
    useState<boolean>(false)

  // Keyboard shortcut (Cmd+K / Ctrl+K / /) to focus search input & Escape to close modals
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
      } else if (e.key === "Escape") {
        if (isConfirmResetOpen) {
          setIsConfirmResetOpen(false)
        } else if (drawerArea !== null) {
          setDrawerArea(null)
        } else if (quotaModalArea !== null) {
          setQuotaModalArea(null)
        } else if (isComparisonModalOpen) {
          setIsComparisonModalOpen(false)
        } else if (document.activeElement === searchInputRef.current) {
          if (searchQuery) {
            setSearchQuery("")
          } else {
            searchInputRef.current?.blur()
          }
        }
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [
    searchQuery,
    isConfirmResetOpen,
    drawerArea,
    quotaModalArea,
    isComparisonModalOpen,
  ])

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
    // Auto-scroll sidebar item into view on desktop
    const sidebarEl = document.getElementById(`sidebar-area-${id}`)
    if (sidebarEl) {
      sidebarEl.scrollIntoView({ behavior: "smooth", block: "nearest" })
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
    drawerArea !== null ||
    quotaModalArea !== null ||
    isComparisonModalOpen ||
    isConfirmResetOpen

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

        {/* Right: Only Single Action CTA to Revert/Change Data from Onboarding Flow */}
        <div className="flex min-w-0 items-center">
          {onEditPreferences && (
            <button
              type="button"
              onClick={() => setIsConfirmResetOpen(true)}
              className="flex min-h-[38px] items-center justify-center gap-1.5 rounded-full border border-white/20 bg-white/5 px-3.5 hover:bg-white/10 hover:border-white/30 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-white cursor-pointer active:scale-[0.98] shrink-0 text-white shadow-xs"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
              aria-label="Ubah parameter prioritas dan lokasi pencarian"
              title="Ubah parameter prioritas dan lokasi pencarian"
            >
              <MapPin size={14} className="text-[#00ED64] shrink-0" />
              <span className="text-xs font-semibold leading-none text-white">
                Ubah Lokasi
              </span>
            </button>
          )}
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

        {/* Layer 2 (Mobile Line 2): Unified iOS Segmented Control */}
        <div className="flex items-center w-full sm:w-auto bg-[#767680]/12 p-1 rounded-full border border-black/5 shrink-0 select-none">
          {/* Mode 1: Peta Interaktif */}
          <button
            type="button"
            onClick={() => setViewMode("peta")}
            className={`flex-1 sm:flex-initial justify-center min-h-[36px] px-4 py-1.5 rounded-full text-xs transition-all duration-150 flex items-center gap-1.5 cursor-pointer active:scale-[0.96] whitespace-nowrap ${
              viewMode === "peta"
                ? "bg-white text-[#1C1C1E] shadow-sm font-bold"
                : "text-[#636366] hover:text-[#1C1C1E] font-medium"
            }`}
          >
            <Map
              size={14}
              className={
                viewMode === "peta" ? "text-[#001E2B]" : "text-[#8E8E93]"
              }
            />
            <span>Peta Interaktif</span>
          </button>

          {/* Mode 2: Daftar Area (With Shortlist Counter Badge Inside) */}
          <button
            type="button"
            onClick={() => setViewMode("daftar")}
            className={`flex-1 sm:flex-initial justify-center min-h-[36px] px-4 py-1.5 rounded-full text-xs transition-all duration-150 flex items-center gap-1.5 cursor-pointer active:scale-[0.96] whitespace-nowrap ${
              viewMode === "daftar"
                ? "bg-white text-[#1C1C1E] shadow-sm font-bold"
                : "text-[#636366] hover:text-[#1C1C1E] font-medium"
            }`}
          >
            <List
              size={14}
              className={
                viewMode === "daftar" ? "text-[#001E2B]" : "text-[#8E8E93]"
              }
            />
            <span>Daftar Area</span>
            {shortlistedAreas.length > 0 && (
              <span className="ml-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-[#34C759] text-white shadow-2xs tabular-nums">
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
                    Kesesuaian Wilayah
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] text-[#5C6C7A] font-semibold">
                      {categoryFilter === "all"
                        ? `${areas.length} Wilayah`
                        : `${filteredAreas.length} dari ${areas.length}`}
                    </span>
                    {categoryFilter !== "all" && (
                      <button
                        type="button"
                        onClick={() => setCategoryFilter("all")}
                        className="text-[10px] font-bold text-[#00684A] hover:text-[#001E2B] underline decoration-[#00684A]/40 hover:decoration-[#001E2B] ml-1 cursor-pointer transition-colors"
                      >
                        Reset
                      </button>
                    )}
                  </div>
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
                    title="Filter: Paling Sesuai"
                    className={`p-2.5 rounded-2xl text-left border-2 transition-all cursor-pointer active:scale-[0.97] select-none ${
                      categoryFilter === "strong-fit"
                        ? "bg-white border-[#001E2B] text-[#001E2B] shadow-xs ring-2 ring-[#001E2B]/10 font-bold"
                        : "bg-white border-[#E1E5E8] text-[#5C6C7A] hover:border-[#CBD5E1] hover:bg-[#F4F7F6] font-medium"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`w-2 h-2 rounded-full bg-[#00B545] ${
                          categoryFilter === "strong-fit"
                            ? "ring-2 ring-[#00B545]/30 shadow-[0_0_6px_rgba(0,181,69,0.5)]"
                            : ""
                        }`}
                      />
                      <span
                        className={`text-[10px] ${
                          categoryFilter === "strong-fit"
                            ? "font-black text-[#001E2B]"
                            : "font-bold text-[#7C8C9A]"
                        }`}
                      >
                        {strongFitCount}
                      </span>
                    </div>
                    <span
                      className={`text-[11px] block mt-1 leading-tight whitespace-nowrap ${
                        categoryFilter === "strong-fit"
                          ? "font-extrabold text-[#001E2B]"
                          : "font-bold text-[#3D4F5B]"
                      }`}
                    >
                      Paling Sesuai
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
                    title="Filter: Moderate"
                    className={`p-2.5 rounded-2xl text-left border-2 transition-all cursor-pointer active:scale-[0.97] select-none ${
                      categoryFilter === "interesting-tradeoff"
                        ? "bg-white border-[#001E2B] text-[#001E2B] shadow-xs ring-2 ring-[#001E2B]/10 font-bold"
                        : "bg-white border-[#E1E5E8] text-[#5C6C7A] hover:border-[#CBD5E1] hover:bg-[#F4F7F6] font-medium"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`w-2 h-2 rounded-full bg-[#D4A017] ${
                          categoryFilter === "interesting-tradeoff"
                            ? "ring-2 ring-[#D4A017]/30 shadow-[0_0_6px_rgba(212,160,23,0.5)]"
                            : ""
                        }`}
                      />
                      <span
                        className={`text-[10px] ${
                          categoryFilter === "interesting-tradeoff"
                            ? "font-black text-[#001E2B]"
                            : "font-bold text-[#7C8C9A]"
                        }`}
                      >
                        {tradeoffCount}
                      </span>
                    </div>
                    <span
                      className={`text-[11px] block mt-1 leading-tight whitespace-nowrap ${
                        categoryFilter === "interesting-tradeoff"
                          ? "font-extrabold text-[#001E2B]"
                          : "font-bold text-[#3D4F5B]"
                      }`}
                    >
                      Moderate
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
                    title="Filter: Alternatif"
                    className={`p-2.5 rounded-2xl text-left border-2 transition-all cursor-pointer active:scale-[0.97] select-none ${
                      categoryFilter === "challenge-assumptions"
                        ? "bg-white border-[#001E2B] text-[#001E2B] shadow-xs ring-2 ring-[#001E2B]/10 font-bold"
                        : "bg-white border-[#E1E5E8] text-[#5C6C7A] hover:border-[#CBD5E1] hover:bg-[#F4F7F6] font-medium"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`w-2 h-2 rounded-full bg-[#D9383A] ${
                          categoryFilter === "challenge-assumptions"
                            ? "ring-2 ring-[#D9383A]/30 shadow-[0_0_6px_rgba(217,56,58,0.5)]"
                            : ""
                        }`}
                      />
                      <span
                        className={`text-[10px] ${
                          categoryFilter === "challenge-assumptions"
                            ? "font-black text-[#001E2B]"
                            : "font-bold text-[#7C8C9A]"
                        }`}
                      >
                        {challengeCount}
                      </span>
                    </div>
                    <span
                      className={`text-[11px] block mt-1 leading-tight whitespace-nowrap ${
                        categoryFilter === "challenge-assumptions"
                          ? "font-extrabold text-[#001E2B]"
                          : "font-bold text-[#3D4F5B]"
                      }`}
                    >
                      Alternatif
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
                      id={`sidebar-area-${area.id}`}
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

                      {/* Selected Quick Action Buttons inside Sidebar */}
                      {isSelected && (
                        <div className="flex items-center gap-2 pt-2 border-t border-[#E1E5E8] animate-fadeIn">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation()
                              setDrawerArea(area)
                            }}
                            className="flex-1 py-1.5 px-3 rounded-full bg-[#F2F2F7] hover:bg-[#E5E5EA] text-[#1C1C1E] text-xs font-semibold transition-all active:scale-95 cursor-pointer text-center"
                          >
                            Detail Area
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation()
                              setQuotaModalArea(area)
                            }}
                            className="flex-1 py-1.5 px-3 rounded-full bg-[#001E2B] hover:bg-[#0F2B38] text-white text-xs font-bold flex items-center justify-center gap-1 shadow-2xs transition-all active:scale-95 cursor-pointer text-center"
                          >
                            <span>Evaluasi</span>
                            <ArrowRight size={12} className="text-[#00ED64]" />
                          </button>
                        </div>
                      )}
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
                  8 Area Terverifikasi
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
                      setMapZoomTarget(13)
                    },
                  }}
                >
                  <Popup className="leaflet-custom-popup" closeButton={true}>
                    <div
                      className="p-4 max-w-[260px] text-[#001E2B] flex flex-col gap-3"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      <div className="flex items-center gap-1.5 pr-8">
                        <span className="w-2 h-2 rounded-full bg-[#00ED64]" />
                        <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#00684A]">
                          Lokasi Kantor
                        </span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <p className="text-sm font-extrabold text-[#001E2B] leading-tight">
                          Sudirman / SCBD
                        </p>
                        <p className="text-xs text-[#5C6C7A] leading-relaxed">
                          Rute komuter KRL & estimasi waktu tempuh seluruh area
                          dihitung dari titik ini.
                        </p>
                      </div>
                      {onEditPreferences && (
                        <div className="pt-3 border-t border-[#E5E5EA]">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation()
                              onEditPreferences(2, 6)
                            }}
                            className="w-full min-h-[36px] py-2 px-3 rounded-full bg-[#001E2B] hover:bg-[#0F2B38] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer shadow-xs"
                          >
                            <SlidersHorizontal
                              size={13}
                              className="text-[#00ED64]"
                            />
                            <span>Ganti Lokasi</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </Popup>
                </Marker>

                {/* 8 Curated Corridor Markers with Apple-Style Contextual Popups */}
                {filteredAreas.map((area) => {
                  const isSelected = area.id === selectedArea?.id

                  return (
                    <Marker
                      key={area.id}
                      position={area.latLng}
                      icon={makeCorridorMarkerIcon(area, isSelected)}
                      eventHandlers={{
                        click: () => handleSelectArea(area.id),
                      }}
                    >
                      <Popup
                        className="leaflet-apple-popup"
                        closeButton={true}
                        autoPan={true}
                        offset={[0, -18]}
                      >
                        <div
                          className="p-4 w-[290px] sm:w-[310px] text-[#1C1C1E] select-none flex flex-col gap-3"
                          style={{
                            fontFamily: "'DM Sans', -apple-system, sans-serif",
                          }}
                        >
                          {/* Row 1: Category Tag (Left) + Clear Space for Close Button (Right) */}
                          <div className="flex items-center justify-between pr-8">
                            <span
                              className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1.5 shrink-0 ${
                                area.category === "strong-fit"
                                  ? "bg-[#E9F5EF] text-[#00684A] border border-[#318266]/20"
                                  : area.category === "interesting-tradeoff"
                                    ? "bg-[#FFF9E6] text-[#B45309] border border-[#D4A017]/20"
                                    : "bg-[#FFEBEB] text-[#DC2626] border border-[#DC2626]/20"
                              }`}
                            >
                              <span
                                className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                                  area.category === "strong-fit"
                                    ? "bg-[#34C759]"
                                    : area.category === "interesting-tradeoff"
                                      ? "bg-[#FF9F0A]"
                                      : "bg-[#FF453A]"
                                }`}
                              />
                              <span className="whitespace-nowrap">
                                {area.categoryLabel}
                              </span>
                            </span>
                          </div>

                          {/* Row 2: Area Title + Location Subtitle Underneath */}
                          <div className="flex flex-col gap-1">
                            <h4 className="text-[15px] font-bold text-[#1C1C1E] leading-snug tracking-tight truncate m-0 p-0">
                              {area.name}
                            </h4>
                            <div className="text-xs text-[#8E8E93] font-medium flex items-center gap-1.5 truncate leading-none m-0 p-0">
                              <MapPin
                                size={12}
                                className="text-[#8E8E93] shrink-0"
                              />
                              <span className="truncate">{area.region}</span>
                            </div>
                          </div>

                          {/* Row 3: Inset Price & Commute Strip */}
                          <div className="bg-[#F2F2F7] px-3.5 py-2 rounded-xl flex items-center justify-between text-xs border border-black/5">
                            <span className="font-bold text-[#1C1C1E] tracking-tight tabular-nums">
                              {area.priceRange}
                            </span>
                            <div className="flex items-center gap-1.5 text-[#636366] text-[11px] font-medium shrink-0">
                              <Clock size={12} className="text-[#8E8E93]" />
                              <span>{area.commuteTime}</span>
                            </div>
                          </div>

                          {/* Row 4: Action Buttons with dedicated line divider space */}
                          <div className="pt-3 border-t border-[#E5E5EA] flex items-center gap-2">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation()
                                setDrawerArea(area)
                              }}
                              className="flex-1 min-h-[36px] py-1.5 px-3 rounded-full bg-[#F2F2F7] hover:bg-[#E5E5EA] text-[#1C1C1E] text-xs font-semibold transition-all active:scale-95 cursor-pointer text-center"
                            >
                              Detail
                            </button>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation()
                                setQuotaModalArea(area)
                              }}
                              className="flex-1 min-h-[36px] py-1.5 px-3.5 rounded-full bg-[#001E2B] hover:bg-[#0F2B38] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-all active:scale-95 cursor-pointer text-center"
                            >
                              <span>Evaluasi</span>
                              <ArrowRight
                                size={12}
                                className="text-[#00ED64] shrink-0"
                              />
                            </button>
                          </div>
                        </div>
                      </Popup>
                    </Marker>
                  )
                })}

                {/* Map Zoom Controls Widget */}
                <div className="absolute top-28 sm:top-auto sm:bottom-4 right-3 sm:right-4 z-10 pointer-events-auto">
                  <MapZoomControls onRecenter={handleRecenterAll} />
                </div>
              </MapContainer>

              {/* Floating Top Map Search & Layer Controls Overlay */}
              <div className="absolute top-3 left-3 right-3 sm:left-4 sm:right-4 z-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 pointer-events-none">
                {/* Left: Search & Layer Filter Pills */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pointer-events-auto w-full sm:w-auto">
                  {/* Enhanced Search Bar Component */}
                  <div className="group relative flex items-center h-11 bg-white/92 backdrop-blur-xl rounded-2xl sm:rounded-full border border-black/8 px-3.5 shadow-sm hover:border-[#CBD5E1] focus-within:border-[#001E2B] focus-within:ring-2 focus-within:ring-[#001E2B]/10 focus-within:shadow-md transition-all w-full sm:w-64">
                    <Search
                      size={16}
                      className="text-[#7C8C9A] group-focus-within:text-[#001E2B] transition-colors shrink-0 mr-2.5"
                      aria-hidden="true"
                    />
                    <input
                      ref={searchInputRef}
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Cari nama area atau wilayah..."
                      className="text-sm font-medium text-[#001E2B] placeholder:text-[#8E9CA8] placeholder:font-normal outline-none bg-transparent w-full transition-all"
                      aria-label="Cari nama area atau wilayah"
                    />
                    {searchQuery ? (
                      <button
                        type="button"
                        onClick={() => {
                          setSearchQuery("")
                          searchInputRef.current?.focus()
                        }}
                        className="ml-2 size-6 rounded-full bg-[#F4F7F8] hover:bg-[#E1E5E8] text-[#5C6C7A] hover:text-[#001E2B] flex items-center justify-center transition-all cursor-pointer active:scale-90 shrink-0"
                        title="Hapus pencarian (Esc)"
                        aria-label="Hapus pencarian"
                      >
                        <X size={13} />
                      </button>
                    ) : (
                      <kbd className="ml-2 hidden sm:inline-flex items-center px-1.5 py-0.5 rounded bg-[#F4F7F8] border border-[#E1E5E8] text-[10px] font-bold text-[#8E9CA8] select-none pointer-events-none">
                        ⌘K
                      </kbd>
                    )}
                  </div>

                  {/* Map Layer Filter Pills — Single-tier Touch-Friendly Rail */}
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 sm:pb-0 scrollbar-none touch-pan-x">
                    {/* Banjir Layer Pill */}
                    <button
                      type="button"
                      onClick={() => setShowFloodZones((prev) => !prev)}
                      className={`flex items-center gap-2 h-9 px-3.5 rounded-full text-xs font-semibold backdrop-blur-xl transition-all cursor-pointer active:scale-95 shrink-0 shadow-xs border ${
                        showFloodZones
                          ? "bg-[#E3FCEF] text-[#00684A] border-[#00ED64]/60 shadow-[#00ED64]/10 font-bold"
                          : "bg-white/85 text-[#5C6C7A] border-black/8 hover:bg-white hover:text-[#001E2B]"
                      }`}
                      title="Toggle Layer Riwayat Genangan / Banjir BNPB"
                    >
                      <span
                        className={`w-2 h-2 rounded-full shrink-0 transition-colors ${
                          showFloodZones
                            ? "bg-[#00D972] shadow-[0_0_6px_#00ED64]"
                            : "bg-[#C1CCD6]"
                        }`}
                      />
                      <span>Banjir</span>
                    </button>

                    {/* Transit Layer Pill */}
                    <button
                      type="button"
                      onClick={() => setShowTransitRoutes((prev) => !prev)}
                      className={`flex items-center gap-2 h-9 px-3.5 rounded-full text-xs font-semibold backdrop-blur-xl transition-all cursor-pointer active:scale-95 shrink-0 shadow-xs border ${
                        showTransitRoutes
                          ? "bg-[#E3FCEF] text-[#00684A] border-[#00ED64]/60 shadow-[#00ED64]/10 font-bold"
                          : "bg-white/85 text-[#5C6C7A] border-black/8 hover:bg-white hover:text-[#001E2B]"
                      }`}
                      title="Toggle Jalur Rute Transit KRL & Tol"
                    >
                      <span
                        className={`w-2 h-2 rounded-full shrink-0 transition-colors ${
                          showTransitRoutes
                            ? "bg-[#00D972] shadow-[0_0_6px_#00ED64]"
                            : "bg-[#C1CCD6]"
                        }`}
                      />
                      <span>Transit</span>
                    </button>

                    {/* Radius Layer Pill */}
                    <button
                      type="button"
                      onClick={() => setShowRadiusCircles((prev) => !prev)}
                      className={`flex items-center gap-2 h-9 px-3.5 rounded-full text-xs font-semibold backdrop-blur-xl transition-all cursor-pointer active:scale-95 shrink-0 shadow-xs border ${
                        showRadiusCircles
                          ? "bg-[#E3FCEF] text-[#00684A] border-[#00ED64]/60 shadow-[#00ED64]/10 font-bold"
                          : "bg-white/85 text-[#5C6C7A] border-black/8 hover:bg-white hover:text-[#001E2B]"
                      }`}
                      title="Toggle Radius Jarak 10-35km dari Sudirman"
                    >
                      <span
                        className={`w-2 h-2 rounded-full shrink-0 transition-colors ${
                          showRadiusCircles
                            ? "bg-[#00D972] shadow-[0_0_6px_#00ED64]"
                            : "bg-[#C1CCD6]"
                        }`}
                      />
                      <span>Radius</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* ── MOBILE & TABLET CORRIDOR CARD CAROUSEL (lg:hidden) ── */}
              {!isAnyOverlayOpen && (
                <div className="lg:hidden">
                  <AreaCardCarousel
                    areas={filteredAreas}
                    allAreasCount={areas.length}
                    selectedAreaId={selectedArea?.id || ""}
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
                  className={`min-h-[34px] px-4 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-all duration-150 cursor-pointer active:scale-[0.96] whitespace-nowrap ${
                    daftarSubTab === "semua" && categoryFilter === "all"
                      ? "bg-[#001E2B] text-white shadow-xs font-bold"
                      : "bg-[#F2F2F7] text-[#1C1C1E] hover:bg-[#E5E5EA] border border-black/5"
                  }`}
                >
                  Semua (<span className="tabular-nums">{areas.length}</span>)
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setDaftarSubTab("semua")
                    setCategoryFilter(
                      categoryFilter === "strong-fit" ? "all" : "strong-fit",
                    )
                  }}
                  className={`min-h-[34px] px-4 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-all duration-150 cursor-pointer active:scale-[0.96] whitespace-nowrap flex items-center gap-2 ${
                    daftarSubTab === "semua" && categoryFilter === "strong-fit"
                      ? "bg-[#001E2B] text-white shadow-xs font-bold"
                      : "bg-[#F2F2F7] text-[#1C1C1E] hover:bg-[#E5E5EA] border border-black/5"
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-[#34C759]" />
                  <span>
                    Paling Sesuai (
                    <span className="tabular-nums">{strongFitCount}</span>)
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setDaftarSubTab("semua")
                    setCategoryFilter(
                      categoryFilter === "interesting-tradeoff"
                        ? "all"
                        : "interesting-tradeoff",
                    )
                  }}
                  className={`min-h-[34px] px-4 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-all duration-150 cursor-pointer active:scale-[0.96] whitespace-nowrap flex items-center gap-2 ${
                    daftarSubTab === "semua" &&
                    categoryFilter === "interesting-tradeoff"
                      ? "bg-[#001E2B] text-white shadow-xs font-bold"
                      : "bg-[#F2F2F7] text-[#1C1C1E] hover:bg-[#E5E5EA] border border-black/5"
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-[#FF9F0A]" />
                  <span>
                    Moderate (
                    <span className="tabular-nums">{tradeoffCount}</span>)
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setDaftarSubTab("semua")
                    setCategoryFilter(
                      categoryFilter === "challenge-assumptions"
                        ? "all"
                        : "challenge-assumptions",
                    )
                  }}
                  className={`min-h-[34px] px-4 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-all duration-150 cursor-pointer active:scale-[0.96] whitespace-nowrap flex items-center gap-2 ${
                    daftarSubTab === "semua" &&
                    categoryFilter === "challenge-assumptions"
                      ? "bg-[#001E2B] text-white shadow-xs font-bold"
                      : "bg-[#F2F2F7] text-[#1C1C1E] hover:bg-[#E5E5EA] border border-black/5"
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-[#FF453A]" />
                  <span>
                    Alternatif (
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
                  className={`min-h-[34px] px-4 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-all duration-150 flex items-center gap-1.5 cursor-pointer active:scale-[0.96] whitespace-nowrap ${
                    daftarSubTab === "shortlist"
                      ? "bg-[#001E2B] text-white shadow-xs font-bold"
                      : "bg-[#F2F2F7] text-[#1C1C1E] hover:bg-[#E5E5EA] border border-black/5"
                  }`}
                >
                  <Bookmark
                    size={13}
                    className={
                      daftarSubTab === "shortlist"
                        ? "text-[#00ED64] fill-[#00ED64]"
                        : shortlistedAreas.length > 0
                          ? "text-[#34C759] fill-[#34C759]"
                          : "text-[#8E8E93]"
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

      {/* Confirmation Dialog Modal / Mobile Bottom Sheet: Ubah Lokasi (z-[9999] High-Priority Overlay) */}
      {isConfirmResetOpen && (
        <div
          className="fixed inset-0 z-[9999] overflow-hidden bg-[#001E2B]/70 backdrop-blur-md animate-fadeIn select-none flex flex-col justify-end sm:justify-center sm:items-center p-0 sm:p-4"
          onClick={() => setIsConfirmResetOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="confirm-reset-title"
        >
          <div
            className="w-full max-h-[90dvh] sm:max-w-md bg-white rounded-t-[28px] sm:rounded-3xl border-t sm:border border-[#E1E5E8] shadow-2xl overflow-hidden flex flex-col animate-slideUp text-[#001E2B]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-[#001E2B] text-white p-5 pt-3 sm:pt-5 flex flex-col relative overflow-hidden border-b border-white/10 shrink-0">
              {/* Mobile Bottom Sheet Grab Handle */}
              <div className="w-12 h-1.5 bg-white/30 rounded-full mx-auto mb-3 shrink-0 sm:hidden" />

              <div className="absolute top-0 right-0 w-36 h-36 bg-[#00ED64]/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-start justify-between relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#003D4F] flex items-center justify-center text-[#00ED64] border border-[#00ED64]/30 shadow-xs shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h3
                      id="confirm-reset-title"
                      className="text-base sm:text-lg font-black tracking-tight text-white leading-tight"
                    >
                      Ubah Lokasi Pencarian?
                    </h3>
                    <p className="text-xs text-[#A8B3BC] mt-0.5 font-medium leading-normal">
                      Kalibrasi ulang preferensi hunian
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsConfirmResetOpen(false)}
                  aria-label="Tutup konfirmasi"
                  className="text-[#A8B3BC] hover:text-white min-w-[36px] min-h-[36px] flex items-center justify-center rounded-full hover:bg-white/10 transition-colors cursor-pointer relative z-10 shrink-0 active:scale-95"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-5 space-y-4 text-xs sm:text-sm text-[#5C6C7A] leading-relaxed overflow-y-auto custom-scrollbar">
              <p>
                Kamu akan kembali ke langkah penentuan preferensi untuk
                menyesuaikan kriteria hunian, titik kantor/aktivitas, atau
                rentang budget.
              </p>
              <div className="p-3.5 rounded-2xl bg-[#F4F7F8] border border-[#E1E5E8] flex items-start gap-2.5 text-xs text-[#001E2B] font-semibold">
                <Sparkles
                  size={16}
                  className="text-[#00684A] shrink-0 mt-0.5"
                />
                <span>
                  Peta rekomendasi wilayah akan dikalibrasi ulang otomatis
                  setelah kamu selesai mengubah preferensi.
                </span>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="p-4 sm:p-5 bg-[#F9FBFA] border-t border-[#E1E5E8] flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2.5 shrink-0 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:pb-5">
              <button
                type="button"
                onClick={() => setIsConfirmResetOpen(false)}
                className="min-h-[44px] sm:min-h-[42px] px-5 rounded-full border border-[#D7E1E5] text-xs font-bold text-[#5C6C7A] hover:bg-[#F4F7F6] hover:text-[#001E2B] transition-all active:scale-95 cursor-pointer flex items-center justify-center"
              >
                Batal
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsConfirmResetOpen(false)
                  onEditPreferences?.(1, 6)
                }}
                className="min-h-[44px] sm:min-h-[42px] px-6 rounded-full bg-[#00ED64] hover:bg-[#00B545] text-[#001E2B] font-black text-xs flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95 cursor-pointer ring-2 ring-[#00ED64]/20"
              >
                <MapPin size={14} className="stroke-[2.5]" />
                <span>Ya, Ubah Lokasi</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
