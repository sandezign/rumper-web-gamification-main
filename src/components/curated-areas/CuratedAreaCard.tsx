import React, { useState } from "react"
import {
  MapPin,
  Clock,
  Mountain,
  Bookmark,
  Sparkles,
  Scale,
  ArrowRight,
  ImageIcon,
  Check,
} from "lucide-react"
import type { CuratedArea } from "../../data/mockCuratedAreas"

export interface CuratedAreaCardProps {
  area: CuratedArea
  isSelected?: boolean
  onSelect?: () => void
  onToggleBookmark: (id: string) => void
  onOpenDrawer: (area: CuratedArea) => void
  onOpenQuotaModal: (area: CuratedArea) => void
  variant?: "carousel" | "grid" | "compact"
}

export default function CuratedAreaCard({
  area,
  isSelected = false,
  onSelect,
  onToggleBookmark,
  onOpenDrawer,
  onOpenQuotaModal,
  variant = "grid",
}: CuratedAreaCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)

  const isStrongFit = area.category === "strong-fit"
  const isTradeoff = area.category === "interesting-tradeoff"

  const categoryTheme = isStrongFit
    ? {
        bg: "bg-black/40 text-white border-white/20",
        dot: "bg-[#34C759]",
      }
    : isTradeoff
      ? {
          bg: "bg-black/40 text-white border-white/20",
          dot: "bg-[#FF9F0A]",
        }
      : {
          bg: "bg-black/40 text-white border-white/20",
          dot: "bg-[#FF453A]",
        }

  // ── VARIANT: "carousel" (Apple Maps Horizontal Peek Card for Map Mode) ──
  if (variant === "carousel") {
    return (
      <div
        onClick={onSelect}
        className={`group w-[88vw] max-w-[390px] sm:max-w-[420px] shrink-0 snap-center rounded-[24px] p-3 sm:p-3.5 flex flex-row items-center gap-3.5 transition-all duration-200 cursor-pointer select-none border ${
          isSelected
            ? "bg-white/98 backdrop-blur-2xl border-[#001E2B] shadow-[0_12px_32px_rgba(0,30,43,0.18)] ring-2 ring-[#001E2B]/10 scale-[1.0]"
            : "bg-white/94 backdrop-blur-xl border-[#E5E5EA] shadow-[0_4px_18px_rgba(0,0,0,0.06)] scale-[0.985] opacity-95 hover:opacity-100 hover:border-[#C7C7CC] active:scale-[0.97]"
        }`}
      >
        {/* Left: Square Rounded Photo Thumbnail (92px) */}
        <div className="relative w-[90px] h-[90px] sm:w-[98px] sm:h-[98px] rounded-[18px] overflow-hidden bg-[#001E2B] shrink-0 shadow-xs">
          {area.imageUrl && !imageError ? (
            <img
              src={area.imageUrl}
              alt={area.name}
              loading="lazy"
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
              className={`w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[#8E8E93] bg-[#0F2B38]">
              <ImageIcon size={22} className="text-[#34C759]" />
            </div>
          )}

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

          {/* Status Pill Top Left */}
          <div className="absolute top-1.5 left-1.5 flex items-center gap-1 bg-black/40 backdrop-blur-md px-1.5 py-0.5 rounded-full border border-white/20">
            <span
              className={`w-1.5 h-1.5 rounded-full shrink-0 ${categoryTheme.dot}`}
            />
            <span className="text-[9px] font-semibold text-white/90 truncate max-w-[50px]">
              {area.category === "strong-fit"
                ? "Sesuai"
                : area.category === "interesting-tradeoff"
                  ? "Moderate"
                  : "Alternatif"}
            </span>
          </div>

          {/* Elevation tag bottom */}
          <div className="absolute bottom-1.5 left-2 right-2 text-center pointer-events-none">
            <span className="text-[9px] font-bold text-white/90 bg-black/40 backdrop-blur-xs px-1.5 py-0.5 rounded-full border border-white/10 tabular-nums">
              {area.elevationDpl}
            </span>
          </div>
        </div>

        {/* Right: Content details & compact action buttons */}
        <div className="flex-1 min-w-0 flex flex-col justify-between h-[90px] sm:h-[98px] py-0.5">
          {/* Top Line: Title & Bookmark */}
          <div className="flex items-start justify-between gap-1.5">
            <div className="min-w-0">
              <h3
                className="text-sm sm:text-base font-bold text-[#1C1C1E] tracking-tight leading-tight truncate"
                title={area.name}
              >
                {area.name}
              </h3>
              <p className="text-[11px] text-[#8E8E93] font-medium truncate flex items-center gap-1 mt-0.5">
                <MapPin size={10} className="shrink-0 text-[#8E8E93]" />
                <span className="truncate">{area.region}</span>
              </p>
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                onToggleBookmark(area.id)
              }}
              className={`w-7 h-7 rounded-full flex items-center justify-center transition-all duration-150 cursor-pointer active:scale-90 shrink-0 ${
                area.isShortlisted
                  ? "bg-[#001E2B] text-[#00ED64]"
                  : "bg-[#F2F2F7] hover:bg-[#E5E5EA] text-[#636366]"
              }`}
              title={area.isShortlisted ? "Tersimpan" : "Simpan"}
              aria-label={
                area.isShortlisted
                  ? `Hapus ${area.name} dari shortlist`
                  : `Simpan ${area.name} ke shortlist`
              }
            >
              <Bookmark
                size={12}
                className={area.isShortlisted ? "fill-[#00ED64]" : ""}
              />
            </button>
          </div>

          {/* Middle Line: Clean Price & Commute Metric (No bulky box!) */}
          <div className="flex items-center gap-2 text-xs">
            <span className="font-bold text-[#1C1C1E] tracking-tight tabular-nums truncate">
              {area.priceRange}
            </span>
            <span className="text-[#C7C7CC]">•</span>
            <div className="flex items-center gap-1 text-[#636366] text-[11px] shrink-0">
              <Clock size={11} className="text-[#8E8E93]" />
              <span className="font-medium">{area.commuteTime}</span>
            </div>
          </div>

          {/* Bottom Line: Quick Action Buttons */}
          <div className="flex items-center gap-2 pt-0.5">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                onOpenDrawer(area)
              }}
              className="min-h-[28px] px-2.5 py-1 rounded-full bg-[#F2F2F7] hover:bg-[#E5E5EA] text-[#1C1C1E] text-[11px] font-semibold transition-all duration-150 active:scale-95 cursor-pointer whitespace-nowrap"
            >
              Detail
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                onOpenQuotaModal(area)
              }}
              className="min-h-[28px] flex-1 py-1 px-3 rounded-full bg-[#001E2B] hover:bg-[#0F2B38] text-white font-bold text-[11px] flex items-center justify-center gap-1 shadow-2xs transition-all duration-150 active:scale-95 cursor-pointer whitespace-nowrap"
            >
              <span>Evaluasi</span>
              <ArrowRight size={11} className="text-[#00ED64] shrink-0" />
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ── VARIANT: "grid" (Full Rich Inset Card for Daftar Mode) ──
  return (
    <div
      onClick={onSelect}
      className={`group bg-white rounded-[26px] p-4 sm:p-5 border transition-all duration-200 shadow-[0_2px_12px_rgba(0,0,0,0.04)] flex flex-col justify-between space-y-3.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] select-none active:scale-[0.99] ${
        isSelected
          ? "border-[#001E2B] bg-[#FCFDFD] shadow-[0_8px_24px_rgba(0,30,43,0.12)] ring-2 ring-[#001E2B]/10"
          : "border-[#E5E5EA] hover:border-[#C7C7CC]"
      }`}
    >
      <div className="space-y-3">
        {/* ── 1. Top Visual Photo Banner (Apple Translucent Depth) ── */}
        <div className="relative w-full h-[150px] sm:h-[165px] rounded-[20px] overflow-hidden bg-[#001E2B] shadow-inner">
          {/* Background Area Photo with Smooth Zoom */}
          {area.imageUrl && !imageError ? (
            <img
              src={area.imageUrl}
              alt={`Visual perumahan di area ${area.name}`}
              loading="lazy"
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
              className={`w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-[#8E8E93] bg-[#0F2B38] gap-1.5">
              <ImageIcon size={28} className="text-[#34C759]" />
              <span className="text-[11px] font-semibold text-white/80">
                Visual Area Terverifikasi
              </span>
            </div>
          )}

          {/* Vignette & Gradient Overlay for Legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/35 pointer-events-none" />

          {/* Floating Top Elements */}
          <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between pointer-events-auto">
            {/* Category Pill with iOS Frosted Glass */}
            <span
              className={`text-[10px] sm:text-[10.5px] font-bold px-2.5 py-1 rounded-full border backdrop-blur-md flex items-center gap-1.5 shadow-xs ${categoryTheme.bg}`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full shrink-0 shadow-xs ${categoryTheme.dot}`}
              />
              <span className="truncate tracking-tight">
                {area.categoryLabel}
              </span>
            </span>

            {/* Bookmark Action Button (44px min hit target, glassmorphic circle) */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                onToggleBookmark(area.id)
              }}
              className={`w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md border transition-all duration-150 cursor-pointer active:scale-90 ${
                area.isShortlisted
                  ? "bg-white text-[#001E2B] border-white shadow-md"
                  : "bg-black/35 text-white/90 border-white/20 hover:bg-white hover:text-[#001E2B] hover:border-white shadow-xs"
              }`}
              title={
                area.isShortlisted
                  ? "Tersimpan di shortlist"
                  : "Simpan area ke shortlist"
              }
              aria-label={
                area.isShortlisted
                  ? `Hapus ${area.name} dari shortlist`
                  : `Simpan ${area.name} ke shortlist`
              }
            >
              <Bookmark
                size={14}
                className={area.isShortlisted ? "fill-[#001E2B]" : ""}
              />
            </button>
          </div>

          {/* Floating Bottom Location Tag on Image */}
          <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white pointer-events-none">
            <div className="flex items-center gap-1 text-[11.5px] font-medium text-white/95 drop-shadow-sm truncate">
              <MapPin size={12} className="text-[#34C759] shrink-0" />
              <span className="truncate">{area.region}</span>
            </div>
            <span className="text-[10px] font-semibold text-white/90 bg-black/40 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/15 shrink-0 tabular-nums">
              {area.elevationDpl}
            </span>
          </div>
        </div>

        {/* ── 2. Area Name Heading ── */}
        <div className="pt-0.5">
          <h3
            className="text-base sm:text-lg font-bold text-[#1C1C1E] tracking-tight leading-snug [text-wrap:balance]"
            title={area.name}
          >
            {area.name}
          </h3>
        </div>

        {/* ── 3. Clean Price & Metric Hierarchy ── */}
        <div className="bg-[#F2F2F7]/70 p-3 rounded-[18px] border border-[#E5E5EA]/70 space-y-2">
          {/* Hero Price with Refined Inline Estimasi Tag */}
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <span className="text-base sm:text-lg font-bold text-[#1C1C1E] tracking-tight tabular-nums">
              {area.priceRange}
            </span>
            <span className="text-[10.5px] font-semibold text-[#8E8E93] bg-white px-2 py-0.5 rounded-full border border-black/5 shadow-2xs">
              Estimasi
            </span>
          </div>

          {/* Clean Metric Strip */}
          <div className="pt-1.5 border-t border-[#E5E5EA] flex items-center justify-between text-xs text-[#636366]">
            <div className="flex items-center gap-1.5">
              <Clock size={12} className="text-[#8E8E93] shrink-0" />
              <span className="font-semibold text-[#1C1C1E] tabular-nums">
                {area.commuteTime}
              </span>
              <span className="text-[11px] text-[#8E8E93]">ke Sudirman</span>
            </div>

            <div className="w-px h-3 bg-[#D1D1D6]" />

            <div className="flex items-center gap-1.5">
              <Mountain size={12} className="text-[#34C759] shrink-0" />
              <span className="font-semibold text-[#1C1C1E] tabular-nums">
                {area.elevationDpl}
              </span>
              <span className="text-[11px] text-[#8E8E93]">
                ({area.elevationScore})
              </span>
            </div>
          </div>
        </div>

        {/* ── 4. Pros & Cons (Kelebihan & Pertimbangan) Inset Callouts ── */}
        <div className="space-y-1.5 text-xs">
          {/* Kelebihan (Pros) */}
          <div className="p-2.5 sm:p-3 rounded-[16px] bg-[#F0FDF4] border border-[#DCFCE7] text-[#166534]">
            <div className="flex items-center gap-1.5 font-bold text-[#15803D] mb-1">
              <div className="w-4 h-4 rounded-full bg-[#22C55E] text-white flex items-center justify-center shrink-0 shadow-2xs">
                <Check size={10} className="stroke-[3]" />
              </div>
              <span className="text-[11.5px]">Kelebihan:</span>
            </div>
            <p className="text-[11.5px] sm:text-xs leading-relaxed font-normal pl-5.5 text-[#14532D] [text-wrap:pretty]">
              {area.cocokReason}
            </p>
          </div>

          {/* Pertimbangan (Cons / Trade-offs) */}
          <div className="p-2.5 sm:p-3 rounded-[16px] bg-[#FFFBEB] border border-[#FEF3C7] text-[#92400E]">
            <div className="flex items-center gap-1.5 font-bold text-[#B45309] mb-1">
              <div className="w-4 h-4 rounded-full bg-[#F59E0B] text-white flex items-center justify-center shrink-0 shadow-2xs">
                <Scale size={10} className="stroke-[2.5]" />
              </div>
              <span className="text-[11.5px]">Pertimbangan:</span>
            </div>
            <p className="text-[11.5px] sm:text-xs leading-relaxed font-normal pl-5.5 text-[#78350F] [text-wrap:pretty]">
              {area.tradeoffReason}
            </p>
          </div>
        </div>
      </div>

      {/* ── 5. Action Buttons Footer ── */}
      <div className="pt-3 mt-3 flex items-center justify-between gap-2 border-t border-[#F2F2F7]">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onOpenDrawer(area)
          }}
          className="min-h-[42px] px-4 py-2 rounded-full bg-[#F2F2F7] hover:bg-[#E5E5EA] text-[#1C1C1E] text-xs font-semibold transition-all duration-150 active:scale-95 cursor-pointer whitespace-nowrap"
        >
          Detail Area
        </button>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onOpenQuotaModal(area)
          }}
          className="min-h-[42px] flex-1 py-2 px-4 rounded-full bg-[#001E2B] hover:bg-[#0F2B38] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all duration-150 active:scale-95 cursor-pointer whitespace-nowrap group-hover:bg-[#002B3D]"
        >
          <span>Evaluasi Rumah</span>
          <ArrowRight size={13} className="text-[#00ED64] shrink-0" />
        </button>
      </div>
    </div>
  )
}
