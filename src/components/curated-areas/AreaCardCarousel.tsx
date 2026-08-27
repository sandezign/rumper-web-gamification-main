import React, { useRef, useEffect, useCallback } from "react"
import {
  MapPin,
  Clock,
  Coins,
  Mountain,
  Sparkles,
  Bookmark,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import type { CuratedArea, FitCategory } from "../../data/mockCuratedAreas"

interface AreaCardCarouselProps {
  areas: CuratedArea[]
  allAreasCount: number
  selectedAreaId: string
  onSelectArea: (id: string) => void
  onOpenDrawer: (area: CuratedArea) => void
  onOpenQuotaModal: (area: CuratedArea) => void
  onToggleBookmark: (id: string) => void
  categoryFilter: "all" | FitCategory | "shortlisted"
  onCategoryFilterChange: (cat: "all" | FitCategory | "shortlisted") => void
  counts: {
    all: number
    strongFit: number
    tradeoff: number
    challenge: number
    shortlisted: number
  }
}

export default function AreaCardCarousel({
  areas,
  allAreasCount,
  selectedAreaId,
  onSelectArea,
  onOpenDrawer,
  onOpenQuotaModal,
  onToggleBookmark,
  categoryFilter,
  onCategoryFilterChange,
  counts,
}: AreaCardCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null)
  const cardRefs = useRef<Map<string, HTMLDivElement>>(new Map())
  const isProgrammaticScroll = useRef(false)
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Scroll active card into view when selectedAreaId changes externally (e.g. user clicked a map pin)
  useEffect(() => {
    if (!selectedAreaId || isProgrammaticScroll.current) return

    const cardEl = cardRefs.current.get(selectedAreaId)
    const container = scrollContainerRef.current
    if (cardEl && container) {
      isProgrammaticScroll.current = true
      cardEl.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      })

      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current)
      scrollTimeoutRef.current = setTimeout(() => {
        isProgrammaticScroll.current = false
      }, 500)
    }
  }, [selectedAreaId])

  // Handle user scroll snap to update active card
  const handleScroll = useCallback(() => {
    if (isProgrammaticScroll.current) return

    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current)
    scrollTimeoutRef.current = setTimeout(() => {
      const container = scrollContainerRef.current
      if (!container) return

      const containerCenter =
        container.getBoundingClientRect().left + container.offsetWidth / 2
      let closestId = ""
      let minDistance = Infinity

      cardRefs.current.forEach((cardEl, id) => {
        if (!cardEl) return
        const cardRect = cardEl.getBoundingClientRect()
        const cardCenter = cardRect.left + cardRect.width / 2
        const dist = Math.abs(containerCenter - cardCenter)
        if (dist < minDistance) {
          minDistance = dist
          closestId = id
        }
      })

      if (closestId && closestId !== selectedAreaId) {
        onSelectArea(closestId)
      }
    }, 100)
  }, [selectedAreaId, onSelectArea])

  const currentIndex = areas.findIndex((a) => a.id === selectedAreaId)
  const activeIndex = currentIndex >= 0 ? currentIndex : 0

  const handleStep = (direction: "prev" | "next") => {
    if (areas.length === 0) return
    const nextIdx =
      direction === "next"
        ? (activeIndex + 1) % areas.length
        : (activeIndex - 1 + areas.length) % areas.length
    const nextArea = areas[nextIdx]
    if (nextArea) {
      onSelectArea(nextArea.id)
      const cardEl = cardRefs.current.get(nextArea.id)
      if (cardEl) {
        cardEl.scrollIntoView({
          behavior: "smooth",
          inline: "center",
          block: "nearest",
        })
      }
    }
  }

  return (
    <div className="absolute bottom-0 inset-x-0 z-20 pointer-events-none pb-2 sm:pb-4 flex flex-col justify-end">
      {/* ── 1. Floating Category Selection Chips ── */}
      <div className="pointer-events-auto px-4 mb-2">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none touch-pan-x scroll-smooth drop-shadow-md">
          <button
            type="button"
            onClick={() => onCategoryFilterChange("all")}
            className={`min-h-[34px] px-3.5 py-1 rounded-full text-[11px] font-bold shrink-0 transition-transform transition-colors cursor-pointer active:scale-[0.96] whitespace-nowrap backdrop-blur-md ${
              categoryFilter === "all"
                ? "bg-[#0F2B38] text-white border border-[#0F2B38] shadow-sm"
                : "bg-white/90 text-[#3D4F5B] border border-[#C1CCD6] hover:bg-white"
            }`}
          >
            Semua (<span className="tabular-nums">{counts.all}</span>)
          </button>

          <button
            type="button"
            onClick={() => onCategoryFilterChange("strong-fit")}
            className={`min-h-[34px] px-3.5 py-1 rounded-full text-[11px] font-bold shrink-0 transition-transform transition-colors cursor-pointer active:scale-[0.96] whitespace-nowrap flex items-center gap-1.5 backdrop-blur-md ${
              categoryFilter === "strong-fit"
                ? "bg-[#0F2B38] text-white border border-[#0F2B38] shadow-sm"
                : "bg-white/90 text-[#3D4F5B] border border-[#C1CCD6] hover:bg-white"
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                categoryFilter === "strong-fit"
                  ? "bg-[#00ED64]"
                  : "bg-[#00B545]"
              }`}
            />
            <span>
              Kesesuaian Kuat (
              <span className="tabular-nums">{counts.strongFit}</span>)
            </span>
          </button>

          <button
            type="button"
            onClick={() => onCategoryFilterChange("interesting-tradeoff")}
            className={`min-h-[34px] px-3.5 py-1 rounded-full text-[11px] font-bold shrink-0 transition-transform transition-colors cursor-pointer active:scale-[0.96] whitespace-nowrap flex items-center gap-1.5 backdrop-blur-md ${
              categoryFilter === "interesting-tradeoff"
                ? "bg-[#0F2B38] text-white border border-[#0F2B38] shadow-sm"
                : "bg-white/90 text-[#3D4F5B] border border-[#C1CCD6] hover:bg-white"
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                categoryFilter === "interesting-tradeoff"
                  ? "bg-[#00ED64]"
                  : "bg-[#D4A017]"
              }`}
            />
            <span>
              Kompromi Menarik (
              <span className="tabular-nums">{counts.tradeoff}</span>)
            </span>
          </button>

          <button
            type="button"
            onClick={() => onCategoryFilterChange("challenge-assumptions")}
            className={`min-h-[34px] px-3.5 py-1 rounded-full text-[11px] font-bold shrink-0 transition-transform transition-colors cursor-pointer active:scale-[0.96] whitespace-nowrap flex items-center gap-1.5 backdrop-blur-md ${
              categoryFilter === "challenge-assumptions"
                ? "bg-[#0F2B38] text-white border border-[#0F2B38] shadow-sm"
                : "bg-white/90 text-[#3D4F5B] border border-[#C1CCD6] hover:bg-white"
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                categoryFilter === "challenge-assumptions"
                  ? "bg-[#00ED64]"
                  : "bg-[#D9383A]"
              }`}
            />
            <span>
              Opsi Alternatif (
              <span className="tabular-nums">{counts.challenge}</span>)
            </span>
          </button>

          <button
            type="button"
            onClick={() =>
              onCategoryFilterChange(
                categoryFilter === "shortlisted" ? "all" : "shortlisted",
              )
            }
            className={`min-h-[34px] px-3.5 py-1 rounded-full text-[11px] font-bold shrink-0 transition-transform transition-colors cursor-pointer active:scale-[0.96] whitespace-nowrap flex items-center gap-1.5 backdrop-blur-md ${
              categoryFilter === "shortlisted"
                ? "bg-[#001E2B] text-[#00ED64] border border-[#00ED64] shadow-sm"
                : "bg-white/90 text-[#3D4F5B] border border-[#C1CCD6] hover:bg-white"
            }`}
          >
            <Bookmark
              size={12}
              className={
                categoryFilter === "shortlisted"
                  ? "fill-[#00ED64] text-[#00ED64]"
                  : "text-[#00B545] fill-[#00B545]"
              }
            />
            <span>
              Area Tersimpan (
              <span className="tabular-nums">{counts.shortlisted}</span>)
            </span>
          </button>
        </div>
      </div>

      {/* ── 2. Carousel Track with Card Peek Behavior ── */}
      {areas.length > 0 ? (
        <div className="relative w-full overflow-hidden">
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex items-stretch overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-none px-[7vw] sm:px-[12vw] gap-3 pb-2 touch-pan-x pointer-events-auto"
            style={{
              scrollPaddingLeft: "7vw",
              scrollPaddingRight: "7vw",
            }}
          >
            {areas.map((area, index) => {
              const isSelected = area.id === selectedAreaId

              const categoryTheme =
                area.category === "strong-fit"
                  ? {
                      bg: "bg-[#DCEEE7]",
                      text: "text-[#004F38]",
                      border: "border-[#318266]/30",
                      dot: "bg-[#00B545]",
                    }
                  : area.category === "interesting-tradeoff"
                    ? {
                        bg: "bg-[#FFF3D6]",
                        text: "text-[#6E4E00]",
                        border: "border-[#D4A017]/30",
                        dot: "bg-[#D4A017]",
                      }
                    : {
                        bg: "bg-[#FFE2E0]",
                        text: "text-[#7A1D1A]",
                        border: "border-[#D9383A]/30",
                        dot: "bg-[#D9383A]",
                      }

              return (
                <div
                  key={area.id}
                  ref={(el) => {
                    if (el) cardRefs.current.set(area.id, el)
                    else cardRefs.current.delete(area.id)
                  }}
                  onClick={() => {
                    if (!isSelected) {
                      onSelectArea(area.id)
                      const cardEl = cardRefs.current.get(area.id)
                      if (cardEl) {
                        cardEl.scrollIntoView({
                          behavior: "smooth",
                          inline: "center",
                          block: "nearest",
                        })
                      }
                    }
                  }}
                  className={`w-[86vw] max-w-[370px] sm:max-w-[400px] shrink-0 snap-center rounded-3xl p-4 sm:p-4.5 flex flex-col justify-between transition-transform duration-200 cursor-pointer ${
                    isSelected
                      ? "bg-white/98 backdrop-blur-2xl border-2 border-[#001E2B] shadow-[0_16px_36px_rgba(0,30,43,0.18)] scale-[1.0]"
                      : "bg-white/92 backdrop-blur-md border border-[#E1E5E8] shadow-[0_8px_24px_rgba(0,30,43,0.08)] scale-[0.98] opacity-90 hover:opacity-100"
                  }`}
                >
                  <div className="space-y-2.5">
                    {/* Header Row: Category Badge + Region + Stepper Badge & Bookmark */}
                    <div className="flex items-center justify-between gap-1.5">
                      <div className="flex items-center gap-1.5 min-w-0 flex-wrap">
                        <span
                          className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border flex items-center gap-1.5 ${categoryTheme.bg} ${categoryTheme.text} ${categoryTheme.border}`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full shrink-0 ${categoryTheme.dot}`}
                          />
                          <span className="truncate">{area.categoryLabel}</span>
                        </span>

                        <span className="text-[11px] text-[#5C6C7A] font-semibold flex items-center gap-0.5 shrink-0">
                          <MapPin size={11} className="text-[#7C8C9A]" />
                          {area.region}
                        </span>
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        {/* Stepper counter indicator */}
                        <span className="text-[10px] font-bold text-[#5C6C7A] bg-[#F4F7F8] px-2 py-0.5 rounded-full border border-[#E1E5E8] tabular-nums">
                          {index + 1}/{areas.length}
                        </span>

                        {/* Bookmark Button (44px min hit area with active feedback) */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation()
                            onToggleBookmark(area.id)
                          }}
                          className={`min-w-[36px] min-h-[36px] rounded-full flex items-center justify-center transition-transform transition-colors cursor-pointer active:scale-[0.96] ${
                            area.isShortlisted
                              ? "text-[#00ED64] bg-[#001E2B]"
                              : "text-[#7C8C9A] hover:text-[#001E2B] hover:bg-[#F4F7F8]"
                          }`}
                          title={
                            area.isShortlisted
                              ? "Tersimpan di shortlist"
                              : "Simpan ke shortlist"
                          }
                          aria-label={
                            area.isShortlisted
                              ? `Hapus ${area.name} dari shortlist`
                              : `Simpan ${area.name} ke shortlist`
                          }
                        >
                          <Bookmark
                            size={14}
                            className={
                              area.isShortlisted ? "fill-[#00ED64]" : ""
                            }
                          />
                        </button>
                      </div>
                    </div>

                    {/* Area Name Heading */}
                    <div className="flex items-baseline justify-between gap-2">
                      <h3
                        className="text-base sm:text-lg font-black text-[#001E2B] tracking-tight leading-snug [text-wrap:balance] truncate"
                        title={area.name}
                      >
                        {area.name}
                      </h3>
                    </div>

                    {/* 3 Metrics Box Grid (Concentric rounded-2xl inside rounded-3xl card) */}
                    <div className="grid grid-cols-3 gap-1.5 text-center text-xs">
                      {/* Metric 1: Komuter */}
                      <div className="bg-[#F4F7F8] p-2 sm:p-2.5 rounded-2xl border border-[#E1E5E8] flex flex-col justify-center">
                        <span className="text-[9px] font-bold uppercase text-[#7C8C9A] flex items-center justify-center gap-1">
                          <Clock size={10} />
                          Komuter
                        </span>
                        <span className="text-xs font-black text-[#001E2B] mt-0.5 block tabular-nums">
                          {area.commuteTime}
                        </span>
                      </div>

                      {/* Metric 2: Harga */}
                      <div className="bg-[#F4F7F8] p-2 sm:p-2.5 rounded-2xl border border-[#E1E5E8] flex flex-col justify-center">
                        <span className="text-[9px] font-bold uppercase text-[#7C8C9A] flex items-center justify-center gap-1">
                          <Coins size={10} />
                          Harga
                        </span>
                        <span
                          className="text-[11px] sm:text-xs font-black text-[#001E2B] mt-0.5 block tabular-nums tracking-tight whitespace-nowrap overflow-hidden text-ellipsis"
                          title={area.priceRange}
                        >
                          {area.priceRange}
                        </span>
                      </div>

                      {/* Metric 3: Elevasi */}
                      <div className="bg-[#F4F7F8] p-2 sm:p-2.5 rounded-2xl border border-[#E1E5E8] flex flex-col justify-center">
                        <span className="text-[9px] font-bold uppercase text-[#7C8C9A] flex items-center justify-center gap-1">
                          <Mountain size={10} />
                          Elevasi
                        </span>
                        <span className="text-xs font-black text-[#00684A] mt-0.5 block tabular-nums">
                          {area.elevationDpl}
                        </span>
                      </div>
                    </div>

                    {/* Quick Reason Highlight */}
                    <div className="p-2 rounded-xl bg-[#E9F5EF] border border-[#318266]/20 text-[#003D2E] text-[11px] leading-tight flex items-start gap-1.5">
                      <Sparkles
                        size={12}
                        className="text-[#00684A] shrink-0 mt-0.5"
                      />
                      <p className="line-clamp-2 [text-wrap:pretty]">
                        {area.cocokReason}
                      </p>
                    </div>
                  </div>

                  {/* Actions Row (Reference 2 Inspired) */}
                  <div className="pt-2.5 mt-2 flex items-center gap-2 border-t border-[#F0F4F6]">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        onOpenDrawer(area)
                      }}
                      className="min-h-[40px] px-3.5 py-1.5 rounded-full border border-[#D7E1E5] text-xs font-bold text-[#5C6C7A] hover:bg-[#F4F7F6] hover:text-[#001E2B] transition-transform transition-colors active:scale-[0.96] cursor-pointer shrink-0"
                    >
                      Detail Koridor
                    </button>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        onOpenQuotaModal(area)
                      }}
                      className="min-h-[40px] flex-1 py-1.5 px-3.5 rounded-full bg-[#00ED64] hover:bg-[#00B545] text-[#001E2B] font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-transform transition-colors active:scale-[0.96] cursor-pointer"
                    >
                      <span>Evaluasi Rumah Ini</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Stepper Navigation Buttons (Prev / Next floating arrows) */}
          {areas.length > 1 && (
            <div className="hidden sm:flex items-center justify-between absolute inset-y-0 inset-x-2 pointer-events-none">
              <button
                type="button"
                onClick={() => handleStep("prev")}
                className="pointer-events-auto w-9 h-9 rounded-full bg-white/90 backdrop-blur-md border border-[#E1E5E8] shadow-md flex items-center justify-center text-[#001E2B] hover:bg-white active:scale-[0.96] transition-transform transition-colors cursor-pointer"
                title="Wilayah Sebelumnya"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                type="button"
                onClick={() => handleStep("next")}
                className="pointer-events-auto w-9 h-9 rounded-full bg-white/90 backdrop-blur-md border border-[#E1E5E8] shadow-md flex items-center justify-center text-[#001E2B] hover:bg-white active:scale-[0.96] transition-transform transition-colors cursor-pointer"
                title="Wilayah Selanjutnya"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="pointer-events-auto mx-4 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-[#E1E5E8] shadow-lg text-center text-xs text-[#5C6C7A]">
          Tidak ada wilayah yang cocok dengan filter.
        </div>
      )}
    </div>
  )
}
