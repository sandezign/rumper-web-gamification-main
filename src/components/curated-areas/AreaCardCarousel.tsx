import React, { useRef, useEffect, useCallback } from "react"
import { Bookmark, ChevronLeft, ChevronRight } from "lucide-react"
import type { CuratedArea, FitCategory } from "../../data/mockCuratedAreas"
import CuratedAreaCard from "./CuratedAreaCard"

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
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none touch-pan-x scroll-smooth">
          <button
            type="button"
            onClick={() => onCategoryFilterChange("all")}
            className={`min-h-[34px] px-3.5 py-1 rounded-full text-xs font-semibold shrink-0 transition-all duration-150 cursor-pointer active:scale-[0.96] whitespace-nowrap backdrop-blur-xl ${
              categoryFilter === "all"
                ? "bg-[#001E2B] text-white shadow-sm font-bold"
                : "bg-white/85 text-[#1C1C1E] border border-black/8 hover:bg-white shadow-xs"
            }`}
          >
            Semua (<span className="tabular-nums">{counts.all}</span>)
          </button>

          <button
            type="button"
            onClick={() =>
              onCategoryFilterChange(
                categoryFilter === "strong-fit" ? "all" : "strong-fit",
              )
            }
            className={`min-h-[34px] px-3.5 py-1 rounded-full text-xs font-semibold shrink-0 transition-all duration-150 cursor-pointer active:scale-[0.96] whitespace-nowrap flex items-center gap-1.5 backdrop-blur-xl ${
              categoryFilter === "strong-fit"
                ? "bg-[#001E2B] text-white shadow-sm font-bold"
                : "bg-white/85 text-[#1C1C1E] border border-black/8 hover:bg-white shadow-xs"
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#34C759]" />
            <span>
              Paling Sesuai (
              <span className="tabular-nums">{counts.strongFit}</span>)
            </span>
          </button>

          <button
            type="button"
            onClick={() =>
              onCategoryFilterChange(
                categoryFilter === "interesting-tradeoff"
                  ? "all"
                  : "interesting-tradeoff",
              )
            }
            className={`min-h-[34px] px-3.5 py-1 rounded-full text-xs font-semibold shrink-0 transition-all duration-150 cursor-pointer active:scale-[0.96] whitespace-nowrap flex items-center gap-1.5 backdrop-blur-xl ${
              categoryFilter === "interesting-tradeoff"
                ? "bg-[#001E2B] text-white shadow-sm font-bold"
                : "bg-white/85 text-[#1C1C1E] border border-black/8 hover:bg-white shadow-xs"
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#FF9F0A]" />
            <span>
              Moderate (<span className="tabular-nums">{counts.tradeoff}</span>)
            </span>
          </button>

          <button
            type="button"
            onClick={() =>
              onCategoryFilterChange(
                categoryFilter === "challenge-assumptions"
                  ? "all"
                  : "challenge-assumptions",
              )
            }
            className={`min-h-[34px] px-3.5 py-1 rounded-full text-xs font-semibold shrink-0 transition-all duration-150 cursor-pointer active:scale-[0.96] whitespace-nowrap flex items-center gap-1.5 backdrop-blur-xl ${
              categoryFilter === "challenge-assumptions"
                ? "bg-[#001E2B] text-white shadow-sm font-bold"
                : "bg-white/85 text-[#1C1C1E] border border-black/8 hover:bg-white shadow-xs"
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#FF453A]" />
            <span>
              Alternatif (
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
            className={`min-h-[34px] px-3.5 py-1 rounded-full text-xs font-semibold shrink-0 transition-all duration-150 cursor-pointer active:scale-[0.96] whitespace-nowrap flex items-center gap-1.5 backdrop-blur-xl ${
              categoryFilter === "shortlisted"
                ? "bg-[#001E2B] text-white shadow-sm font-bold"
                : "bg-white/85 text-[#1C1C1E] border border-black/8 hover:bg-white shadow-xs"
            }`}
          >
            <Bookmark
              size={12}
              className={
                categoryFilter === "shortlisted"
                  ? "fill-[#00ED64] text-[#00ED64]"
                  : "text-[#34C759] fill-[#34C759]"
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
            {areas.map((area) => {
              const isSelected = area.id === selectedAreaId

              return (
                <div
                  key={area.id}
                  ref={(el) => {
                    if (el) cardRefs.current.set(area.id, el)
                    else cardRefs.current.delete(area.id)
                  }}
                  className="shrink-0"
                >
                  <CuratedAreaCard
                    area={area}
                    isSelected={isSelected}
                    variant="carousel"
                    onSelect={() => {
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
                    onToggleBookmark={onToggleBookmark}
                    onOpenDrawer={onOpenDrawer}
                    onOpenQuotaModal={onOpenQuotaModal}
                  />
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
