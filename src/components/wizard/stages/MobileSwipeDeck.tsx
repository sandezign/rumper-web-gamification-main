import React, { useState, useRef, useEffect } from "react"
import {
  Check,
  AlertTriangle,
  Scale,
  RotateCcw,
  Sparkles,
  HelpCircle,
  ChevronRight,
  HandMetal,
  Navigation,
  Store,
  AlertCircle,
  Info,
} from "lucide-react"
import type { ScenarioChoice } from "../../../store/useWizardStore"
import type { ScenarioData, ScenarioHouseOption } from "./ScenarioView"
import BlueprintVisual from "./BlueprintVisual"

interface MobileSwipeDeckProps {
  data: ScenarioData
  selectedChoice?: ScenarioChoice
  selectedFriction?: string
  onSelectChoice: (choice: ScenarioChoice) => void
  onSkip?: () => void
}

export default function MobileSwipeDeck({
  data,
  selectedChoice,
  selectedFriction,
  onSelectChoice,
  onSkip,
}: MobileSwipeDeckProps) {
  const [activeTab, setActiveTab] = useState<"A" | "B">("A")
  const [isDragging, setIsDragging] = useState<boolean>(false)
  const [showWhyModal, setShowWhyModal] = useState<boolean>(false)
  const [swipeHintVisible, setSwipeHintVisible] = useState<boolean>(true)

  const dragStartRef = useRef<{ x: number y: number }>({ x: 0, y: 0 })
  const dragOffsetRef = useRef<{ x: number y: number }>({ x: 0, y: 0 })
  const dragFrameRef = useRef<number | null>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const stampOpacityARef = useRef<HTMLDivElement>(null)
  const stampOpacityBRef = useRef<HTMLDivElement>(null)
  const WeatherIcon = data.weatherIcon

  useEffect(() => {
    return () => {
      if (dragFrameRef.current !== null) {
        cancelAnimationFrame(dragFrameRef.current)
      }
    }
  }, [])

  // Hide swipe hint after first interaction
  useEffect(() => {
    if (selectedChoice || isDragging) {
      setSwipeHintVisible(false)
    }
  }, [selectedChoice, isDragging])

  // Current active house option & background option
  const activeHouse: ScenarioHouseOption =
    activeTab === "A" ? data.optionA : data.optionB
  const backgroundHouse: ScenarioHouseOption =
    activeTab === "A" ? data.optionB : data.optionA

  // Touch / Pointer Event Handlers
  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    setIsDragging(true)
    const clientX =
      "touches" in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX
    const clientY =
      "touches" in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY
    dragStartRef.current = { x: clientX, y: clientY }
  }

  const handleTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDragging) return
    const clientX =
      "touches" in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX
    const clientY =
      "touches" in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY

    const deltaX = clientX - dragStartRef.current.x
    const deltaY = clientY - dragStartRef.current.y

    // If movement is predominantly vertical, allow native page scroll and don't hijack
    if (Math.abs(deltaY) > Math.abs(deltaX) * 1.2 && Math.abs(deltaY) > 8) {
      return
    }

    // Lock movement strictly to horizontal axis when user swipes horizontally
    if (Math.abs(deltaX) > 6) {
      dragOffsetRef.current = { x: deltaX, y: 0 }
      if (dragFrameRef.current === null) {
        dragFrameRef.current = requestAnimationFrame(() => {
          const x = dragOffsetRef.current.x
          const rotation = Math.max(-14, Math.min(14, x / 18))

          if (cardRef.current) {
            cardRef.current.style.transform = `translate3d(${x}px, 0, 0) rotate(${rotation}deg)`
          }
          if (stampOpacityARef.current) {
            stampOpacityARef.current.style.opacity = String(
              Math.max(0, Math.min(1, -x / 60)),
            )
          }
          if (stampOpacityBRef.current) {
            stampOpacityBRef.current.style.opacity = String(
              Math.max(0, Math.min(1, x / 60)),
            )
          }
          dragFrameRef.current = null
        })
      }
    }
  }

  const handleTouchEnd = () => {
    if (!isDragging) return
    setIsDragging(false)

    const SWIPE_THRESHOLD = 75

    const finalOffset = dragOffsetRef.current

    if (finalOffset.x < -SWIPE_THRESHOLD) {
      // Swiped Left -> Choose House A
      onSelectChoice("A")
      setActiveTab("A")
    } else if (finalOffset.x > SWIPE_THRESHOLD) {
      // Swiped Right -> Choose House B
      onSelectChoice("B")
      setActiveTab("B")
    }

    // Elastic snap-back to center
    if (dragFrameRef.current !== null) {
      cancelAnimationFrame(dragFrameRef.current)
      dragFrameRef.current = null
    }
    dragOffsetRef.current = { x: 0, y: 0 }
    if (cardRef.current) {
      cardRef.current.style.transform = "translate3d(0, 0, 0) rotate(0deg)"
    }
    if (stampOpacityARef.current) stampOpacityARef.current.style.opacity = "0"
    if (stampOpacityBRef.current) stampOpacityBRef.current.style.opacity = "0"
  }

  return (
    <div className="space-y-4 text-[var(--color-primary-ink)] select-none">
      {/* Mobile Top Header: Eyebrow & Skip */}
      <div className="flex items-center justify-between px-1">
        <div className="text-xs font-bold uppercase tracking-wider text-[var(--color-rumper-green-dark)] flex items-center gap-1.5 tabular-nums">
          <span>
            Skenario 0{data.stepNumber} dari 0{data.totalScenarios}
          </span>
          <span className="text-[var(--color-quiet-ink)]">/</span>
          <span className="text-[var(--color-tertiary-ink)]">
            Uji Prioritas
          </span>
        </div>

        {onSkip && (
          <button
            type="button"
            onClick={onSkip}
            className="text-xs font-bold text-[var(--color-tertiary-ink)] hover:text-[var(--color-primary-ink)] transition-colors flex items-center gap-1 cursor-pointer"
          >
            <span>Lewati</span>
            <ChevronRight size={14} />
          </button>
        )}
      </div>

      {/* Contextual Bridge Banner */}
      {selectedFriction && (
        <div className="flex items-center gap-2 px-3 py-2 bg-[var(--color-evidence-positive-bg)]/70 rounded-xl border border-[var(--color-evidence-positive)]/30 text-xs text-[var(--color-rumper-green-deep)] font-medium">
          <Sparkles
            size={13}
            className="text-[var(--color-rumper-green-dark)] shrink-0"
          />
          <span className="line-clamp-1">
            <strong>Konteksmu:</strong> &ldquo;{selectedFriction}&rdquo;
          </span>
        </div>
      )}

      {/* Compact Situation Story Card */}
      <div className="bg-white rounded-2xl p-4 border border-[var(--color-subtle-border)] shadow-xs space-y-2 relative">
        <div className="flex items-center justify-between gap-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-[var(--color-recessed)] text-[var(--color-primary-ink)] border border-[var(--color-subtle-border)]">
            <WeatherIcon
              size={12}
              className="text-[var(--color-rumper-green-dark)]"
              aria-hidden="true"
            />
            <span>{data.weatherTag}</span>
          </div>

          <button
            type="button"
            id="mobile-why-it-matters-toggle"
            aria-expanded={showWhyModal}
            aria-controls="mobile-why-it-matters-content"
            onClick={() => setShowWhyModal(!showWhyModal)}
            className="inline-flex items-center gap-1 text-xs font-bold text-[var(--color-tertiary-ink)] hover:text-[var(--color-rumper-green-dark)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-rumper-green-dark)] rounded-md px-1 py-0.5 cursor-pointer transition-colors"
          >
            <HelpCircle size={13} aria-hidden="true" />
            <span>Kenapa penting?</span>
          </button>
        </div>

        <div>
          <h2 className="text-base font-extrabold text-[var(--color-primary-ink)] leading-snug">
            {data.title}
          </h2>
          <p className="text-xs text-[var(--color-secondary-ink)] leading-relaxed mt-0.5">
            &ldquo;{data.narrative}&rdquo;
          </p>
        </div>

        {/* Why it matters modal */}
        {showWhyModal && (
          <div
            id="mobile-why-it-matters-content"
            role="region"
            aria-labelledby="mobile-why-it-matters-toggle"
            className="p-3 rounded-xl bg-[var(--color-evidence-positive-subtle)] border border-[var(--color-evidence-positive)]/30 text-xs text-[var(--color-rumper-green-deep)] font-medium space-y-1 animate-fadeIn"
          >
            <div className="font-bold flex items-center gap-1.5">
              <Sparkles
                size={13}
                className="text-[var(--color-rumper-green-dark)]"
                aria-hidden="true"
              />
              <span>Realita Jabodetabek:</span>
            </div>
            <p className="text-xs leading-relaxed">{data.whyItMatters}</p>
          </div>
        )}
      </div>

      {/* Segmented Peek Tab Switcher */}
      <div className="flex items-center justify-center">
        <div
          role="tablist"
          aria-label="Pilihan Perbandingan Rumah"
          className="bg-[var(--color-evidence-positive-muted)] p-1 rounded-2xl border border-[var(--color-subtle-border)] inline-flex items-center gap-1 shadow-inner"
        >
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "A"}
            aria-controls="mobile-card-deck"
            onClick={() => {
              setActiveTab("A")
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-ink)] ${
              activeTab === "A"
                ? "bg-[var(--color-primary-ink)] text-white shadow-xs"
                : "text-[var(--color-tertiary-ink)] hover:text-[var(--color-primary-ink)]"
            }`}
          >
            Pilihan A: {data.optionA.title.split(" ")[0]}{" "}
            {data.optionA.title.split(" ")[1] || ""}
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "B"}
            aria-controls="mobile-card-deck"
            onClick={() => {
              setActiveTab("B")
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-ink)] ${
              activeTab === "B"
                ? "bg-[var(--color-primary-ink)] text-white shadow-xs"
                : "text-[var(--color-tertiary-ink)] hover:text-[var(--color-primary-ink)]"
            }`}
          >
            Pilihan B: {data.optionB.title.split(" ")[0]}{" "}
            {data.optionB.title.split(" ")[1] || ""}
          </button>
        </div>
      </div>

      {/* Swipe Gesture Interactive Card Deck Container */}
      <div className="relative min-h-[420px] flex items-center justify-center pt-2">
        {/* Background Peeking Card */}
        <div
          className="absolute inset-x-2 top-4 bottom-0 bg-[#F2F2F7] rounded-[26px] border border-[#E5E5EA] p-4 shadow-xs transition-transform duration-300 pointer-events-none opacity-80"
          style={{
            transform: "scale(0.95) translateY(12px)",
          }}
        >
          <div className="flex justify-between items-center opacity-60">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8E8E93]">
              {backgroundHouse.badgeLabel}
            </span>
            <span className="text-xs font-extrabold text-[#1C1C1E]">
              {backgroundHouse.price}
            </span>
          </div>
          <h3 className="text-sm font-bold text-[#8E8E93] mt-2 truncate">
            {backgroundHouse.title}
          </h3>
        </div>

        {/* Foreground Interactive Card (Draggable / Swipable with Curated Depth) */}
        <div
          id="mobile-card-deck"
          role="region"
          aria-label={`Detail ${activeHouse.title}`}
          aria-keyshortcuts="ArrowLeft ArrowRight"
          tabIndex={0}
          ref={cardRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleTouchStart}
          onMouseMove={handleTouchMove}
          onMouseUp={handleTouchEnd}
          onMouseLeave={handleTouchEnd}
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft") {
              event.preventDefault()
              onSelectChoice("A")
              setActiveTab("A")
            } else if (event.key === "ArrowRight") {
              event.preventDefault()
              onSelectChoice("B")
              setActiveTab("B")
            }
          }}
          className={`w-full bg-white rounded-[26px] p-4 sm:p-5 border relative z-10 cursor-grab active:cursor-grabbing transition-shadow shadow-[0_4px_20px_rgba(0,0,0,0.06)] touch-pan-y focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#001E2B] select-none ${
            selectedChoice === activeHouse.key
              ? "border-[#001E2B] ring-2 ring-[#001E2B]/10"
              : "border-[#E5E5EA]"
          }`}
          style={{
            transform: "translate3d(0, 0, 0) rotate(0deg)",
            transition: isDragging
              ? "none"
              : "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {/* Dynamic Drag Stamp Overlay: Swipe Left -> Stamp A */}
          <div
            ref={stampOpacityARef}
            aria-hidden="true"
            className="absolute top-4 left-4 z-30 bg-[#001E2B] text-[#00ED64] border-2 border-[#00ED64] px-3.5 py-1.5 rounded-2xl font-black text-xs uppercase tracking-wider shadow-lg rotate-[-8deg] flex items-center gap-1.5 pointer-events-none opacity-0"
          >
            <Check size={16} className="stroke-[3]" aria-hidden="true" />
            <span>PILIH RUMAH A</span>
          </div>

          {/* Dynamic Drag Stamp Overlay: Swipe Right -> Stamp B */}
          <div
            ref={stampOpacityBRef}
            aria-hidden="true"
            className="absolute top-4 right-4 z-30 bg-[#001E2B] text-[#00ED64] border-2 border-[#00ED64] px-3.5 py-1.5 rounded-2xl font-black text-xs uppercase tracking-wider shadow-lg rotate-[8deg] flex items-center gap-1.5 pointer-events-none opacity-0"
          >
            <Check size={16} className="stroke-[3]" aria-hidden="true" />
            <span>PILIH RUMAH B</span>
          </div>

          {/* ── 1. Top Visual Photo Banner (Curated Depth) ── */}
          <div className="relative w-full h-[145px] sm:h-[160px] rounded-[18px] overflow-hidden bg-[#001E2B] shadow-inner mb-3">
            {activeHouse.imageUrl ? (
              <img
                src={activeHouse.imageUrl}
                alt={activeHouse.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-[#8E8E93] bg-[#0F2B38]">
                <span className="text-xs font-semibold text-white/80">
                  Visual Simulasi
                </span>
              </div>
            )}

            {/* Vignette & Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/35 pointer-events-none" />

            {/* Floating Top Elements */}
            <div className="absolute top-2.5 left-2.5 flex items-center pointer-events-auto">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full border backdrop-blur-md flex items-center gap-1 shadow-xs bg-black/45 text-white border-white/20">
                <span className="w-1.5 h-1.5 rounded-full shrink-0 bg-[#00ED64]" />
                <span>{activeHouse.badgeLabel}</span>
              </span>
            </div>

            {/* Floating Bottom Location & Feature Tag */}
            <div className="absolute bottom-2.5 inset-x-2.5 flex items-center justify-between text-white pointer-events-none">
              <div className="flex items-center gap-1 text-xs font-medium text-white/95 drop-shadow-sm truncate">
                <Navigation size={12} className="text-[#00ED64] shrink-0" />
                <span className="truncate">{activeHouse.corridor}</span>
              </div>
              {activeHouse.imageTag && (
                <span className="text-xs font-semibold text-white/90 bg-black/40 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/15 shrink-0 tabular-nums">
                  {activeHouse.imageTag}
                </span>
              )}
            </div>
          </div>

          {/* ── 2. House Title Heading ── */}
          <div>
            <h3 className="text-base font-bold text-[#001E2B] leading-snug">
              {activeHouse.title}
            </h3>
          </div>

          {/* ── 3. Clean Price & Metric Container ── */}
          <div className="bg-[#F4F7F8] p-3 rounded-[16px] border border-[#E1E5E8] space-y-2 mt-2">
            <div className="flex items-center justify-between gap-1 flex-wrap">
              <span className="text-base font-extrabold text-[#001E2B] tabular-nums">
                {activeHouse.price}
              </span>
              <span className="text-xs font-semibold text-[#5C6C7A] bg-white px-2 py-0.5 rounded-full border border-[#E1E5E8] shadow-2xs">
                Estimasi
              </span>
            </div>

            <div className="pt-1.5 border-t border-[#E1E5E8] grid grid-cols-2 gap-2 text-xs">
              {activeHouse.metrics.map((m, idx) => (
                <div key={idx} className="flex flex-col min-w-0">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#5C6C7A] truncate">
                    {m.label}
                  </span>
                  <span className="font-bold text-[#001E2B] tabular-nums truncate text-xs mt-0.5">
                    {m.value}
                  </span>
                  {m.subValue && (
                    <span className="text-xs text-[#5C6C7A] truncate mt-0.5 font-medium">
                      {m.subValue}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* ── 4. Inset Callouts (Kelebihan & Pertimbangan) ── */}
          <div className="space-y-1.5 text-xs mt-2.5">
            {/* Kelebihan */}
            <div className="p-2.5 rounded-[14px] bg-[#E9F5EF] border border-[#318266]/25 text-[#004F38]">
              <div className="flex items-center gap-1.5 font-bold text-[#00684A] mb-0.5">
                <div className="w-3.5 h-3.5 rounded-full bg-[#00ED64] text-[#001E2B] flex items-center justify-center shrink-0">
                  <Check size={9} className="stroke-[3]" />
                </div>
                <span className="text-xs">Kelebihan:</span>
              </div>
              <p className="text-xs leading-relaxed pl-5 text-[#004F38]">
                {activeHouse.kelebihan ||
                  `${activeHouse.akses}. ${activeHouse.fasilitas}.`}
              </p>
            </div>

            {/* Pertimbangan */}
            <div className="p-2.5 rounded-[14px] bg-[#FFF8E0] border border-[#D79A2B]/25 text-[#5A4000]">
              <div className="flex items-center gap-1.5 font-bold text-[#8A5B00] mb-0.5">
                <div className="w-3.5 h-3.5 rounded-full bg-[#D79A2B] text-white flex items-center justify-center shrink-0">
                  <Scale size={9} className="stroke-[2.5]" />
                </div>
                <span className="text-xs">Pertimbangan:</span>
              </div>
              <p className="text-xs leading-relaxed pl-5 text-[#5A4000]">
                {activeHouse.kompromiNyata}
              </p>
            </div>
          </div>

          {/* Active Choice Confirmation Badge */}
          {selectedChoice === activeHouse.key && (
            <div className="mt-3 py-2 px-3.5 rounded-full bg-[#001E2B] text-white text-xs font-bold flex items-center justify-center gap-1.5 animate-fadeIn">
              <Check
                size={13}
                className="stroke-[3] text-[#00ED64]"
                aria-hidden="true"
              />
              <span>Pilihanmu ({activeHouse.badgeLabel} Terpilih)</span>
            </div>
          )}
        </div>
      </div>

      {/* Swipe Hint Animation */}
      {swipeHintVisible && !selectedChoice && (
        <div className="flex items-center justify-center gap-2 text-xs font-semibold text-[var(--color-tertiary-ink)] animate-pulse motion-reduce:animate-none">
          <HandMetal
            size={14}
            className="text-[var(--color-rumper-green-dark)]"
            aria-hidden="true"
          />
          <span>Geser kiri untuk Rumah A, geser kanan untuk Rumah B</span>
        </div>
      )}

      {/* Floating Action Bar (One-Thumb Ergonomics for Mobile) */}
      <div className="bg-white rounded-2xl p-3 border border-[var(--color-subtle-border)] shadow-sm space-y-2">
        <div className="text-xs font-extrabold uppercase tracking-wider text-[var(--color-tertiary-ink)] text-center">
          Atau Tap Langsung dengan Satu Jempol:
        </div>

        <div
          className="grid grid-cols-2 min-[380px]:grid-cols-4 gap-2"
          role="group"
          aria-label="Pilihan Kompromi Cepat"
        >
          {/* Pilih Rumah A */}
          <button
            type="button"
            onClick={() => {
              onSelectChoice("A")
              setActiveTab("A")
            }}
            aria-pressed={selectedChoice === "A"}
            className={`min-h-[46px] py-2 px-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer flex items-center min-[380px]:flex-col justify-center gap-1.5 min-[380px]:gap-0.5 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-ink)] select-none ${
              selectedChoice === "A"
                ? "border-2 border-[var(--color-primary-ink)] bg-[var(--color-primary-ink)]/5 text-[var(--color-primary-ink)] ring-2 ring-[var(--color-primary-ink)]/10 shadow-xs"
                : "border-[var(--color-subtle-border)] bg-white text-[var(--color-primary-ink)] hover:bg-[var(--color-recessed)]"
            }`}
          >
            <Check
              size={14}
              aria-hidden="true"
              className={
                selectedChoice === "A"
                  ? "text-[var(--color-rumper-green-dark)] stroke-[3]"
                  : "text-[var(--color-tertiary-ink)]"
              }
            />
            <span className="truncate text-xs">Rumah A</span>
          </button>

          {/* Pilih Rumah B */}
          <button
            type="button"
            onClick={() => {
              onSelectChoice("B")
              setActiveTab("B")
            }}
            aria-pressed={selectedChoice === "B"}
            className={`min-h-[46px] py-2 px-2.5 rounded-xl text-xs font-bold border transition-[color,background-color,border-color,transform,box-shadow] duration-150 ease-out cursor-pointer flex items-center min-[380px]:flex-col justify-center gap-1.5 min-[380px]:gap-0.5 active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-ink)] select-none ${
              selectedChoice === "B"
                ? "border-2 border-[var(--color-primary-ink)] bg-[var(--color-primary-ink)]/5 text-[var(--color-primary-ink)] ring-2 ring-[var(--color-primary-ink)]/10 shadow-xs"
                : "border-[var(--color-subtle-border)] bg-white text-[var(--color-primary-ink)] hover:bg-[var(--color-recessed)]"
            }`}
          >
            <Check
              size={14}
              aria-hidden="true"
              className={
                selectedChoice === "B"
                  ? "text-[var(--color-rumper-green-dark)] stroke-2"
                  : "text-[var(--color-tertiary-ink)] stroke-2"
              }
            />
            <span className="truncate text-xs">Rumah B</span>
          </button>

          {/* Kompromi Moderat / Jalan Tengah */}
          <button
            type="button"
            onClick={() => onSelectChoice("neither")}
            aria-pressed={selectedChoice === "neither"}
            className={`min-h-[46px] py-2 px-2.5 rounded-xl text-xs font-bold border transition-[color,background-color,border-color,transform,box-shadow] duration-150 ease-out cursor-pointer flex items-center min-[380px]:flex-col justify-center gap-1.5 min-[380px]:gap-0.5 active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-ink)] select-none ${
              selectedChoice === "neither"
                ? "border-2 border-[var(--color-primary-ink)] bg-[var(--color-primary-ink)]/5 text-[var(--color-primary-ink)] ring-2 ring-[var(--color-primary-ink)]/10 shadow-xs"
                : "border-[var(--color-subtle-border)] bg-white text-[var(--color-tertiary-ink)] hover:bg-[var(--color-recessed)]"
            }`}
          >
            <Scale
              size={14}
              aria-hidden="true"
              className={
                selectedChoice === "neither"
                  ? "text-[var(--color-primary-ink)] stroke-2"
                  : "text-[var(--color-tertiary-ink)] stroke-2"
              }
            />
            <span className="truncate text-xs">Moderat</span>
          </button>

          {/* Hard No */}
          <button
            type="button"
            onClick={() => onSelectChoice("reject")}
            aria-pressed={selectedChoice === "reject"}
            aria-label="Tolak kedua pilihan (Hard No)"
            className={`min-h-[46px] py-2 px-2.5 rounded-xl text-xs font-bold border transition-[color,background-color,border-color,transform,box-shadow] duration-150 ease-out cursor-pointer flex items-center min-[380px]:flex-col justify-center gap-1.5 min-[380px]:gap-0.5 active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-evidence-danger)] select-none ${
              selectedChoice === "reject"
                ? "border-2 border-[var(--color-evidence-danger)] bg-[var(--color-evidence-danger-subtle)] text-[var(--color-evidence-danger)] ring-2 ring-[var(--color-evidence-danger)]/10 shadow-xs"
                : "border-[var(--color-evidence-danger-bg)] bg-white text-[var(--color-evidence-danger)] hover:bg-[var(--color-evidence-danger-subtle)]"
            }`}
          >
            <AlertTriangle size={14} aria-hidden="true" className="stroke-2" />
            <span className="text-xs">Tolak · Hard No</span>
          </button>
        </div>

        {/* Dynamic Feedback Banner with appropriate semantic styling */}
        {selectedChoice && (
          <div
            role="status"
            aria-live="polite"
            className={`flex items-center justify-between pt-1 border-t text-xs ${
              selectedChoice === "reject"
                ? "text-[var(--color-evidence-danger)] border-[var(--color-evidence-danger-bg)]"
                : selectedChoice === "neither"
                  ? "text-[var(--color-primary-ink)] border-[var(--color-hairline)]"
                  : "text-[var(--color-rumper-green-dark)] border-[var(--color-hairline)]"
            }`}
          >
            <div className="flex items-center gap-1.5 truncate">
              {selectedChoice === "reject" ? (
                <AlertTriangle
                  size={12}
                  className="shrink-0 stroke-2 text-[var(--color-evidence-danger)]"
                  aria-hidden="true"
                />
              ) : selectedChoice === "neither" ? (
                <Scale
                  size={12}
                  className="shrink-0 stroke-2 text-[var(--color-rumper-green-dark)]"
                  aria-hidden="true"
                />
              ) : (
                <Info
                  size={12}
                  className="shrink-0 stroke-2 text-[var(--color-rumper-green-dark)]"
                  aria-hidden="true"
                />
              )}
              <span className="font-semibold truncate">
                {data.feedbackMap[selectedChoice]}
              </span>
            </div>
            <button
              type="button"
              onClick={() => onSelectChoice("neither")}
              className="text-[var(--color-tertiary-ink)] hover:text-[var(--color-primary-ink)] flex items-center gap-1 font-bold shrink-0 ml-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-ink)] rounded-md px-2 py-1 min-h-[44px]"
            >
              <RotateCcw size={11} aria-hidden="true" />
              <span>Ubah</span>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
