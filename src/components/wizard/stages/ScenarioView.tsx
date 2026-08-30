import React, { useState } from "react"
import {
  HelpCircle,
  Check,
  AlertTriangle,
  Scale,
  Info,
  Sparkles,
  Navigation,
  Store,
  AlertCircle,
} from "lucide-react"
import type { ScenarioChoice } from "../../../store/useWizardStore"
import MobileSwipeDeck from "./MobileSwipeDeck"

export interface ScenarioMetric {
  label: string
  value: string
  subValue?: string
}

export interface ScenarioHouseOption {
  key: "A" | "B"
  badgeLabel: string
  title: string
  corridor: string
  price: string
  imageUrl?: string
  imageTag?: string
  metrics: ScenarioMetric[]
  kelebihan?: string
  akses: string
  fasilitas: string
  kompromiNyata: string
}

export interface ScenarioData {
  id: string
  stepNumber: number
  totalScenarios: number
  weatherTag: string
  weatherIcon: React.ElementType
  title: string
  narrative: string
  whyItMatters: string
  optionA: ScenarioHouseOption
  optionB: ScenarioHouseOption
  feedbackMap: Record<ScenarioChoice, string>
}

interface ScenarioHouseCardProps {
  option: ScenarioHouseOption
  isSelected: boolean
  onSelect: () => void
}

function ScenarioHouseCard({
  option,
  isSelected,
  onSelect,
}: ScenarioHouseCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)

  return (
    <div
      role="button"
      tabIndex={0}
      aria-pressed={isSelected}
      aria-label={`Pilih ${option.title}, harga ${option.price}`}
      onClick={onSelect}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          onSelect()
        }
      }}
      className={`group bg-white rounded-[26px] p-5 border transition-all duration-200 shadow-xs flex flex-col justify-between space-y-4 select-none cursor-pointer active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#001E2B] focus-visible:ring-offset-2 ${
        isSelected
          ? "border-[#001E2B] bg-[#FCFDFD] shadow-[0_8px_28px_rgba(0,30,43,0.12)] ring-2 ring-[#001E2B]/15"
          : "border-[#E1E5E8] hover:border-[#A8B8C6] hover:shadow-[0_6px_20px_rgba(0,0,0,0.06)] hover:bg-[#FAFBFB]"
      }`}
    >
      <div className="space-y-3.5">
        {/* ── 1. Top Visual Photo Banner (Cleaned Overlay, No Duplicate Price) ── */}
        <div className="relative w-full h-[160px] sm:h-[175px] rounded-[18px] overflow-hidden bg-[#001E2B] shadow-inner">
          {option.imageUrl && !imageError ? (
            <img
              src={option.imageUrl}
              alt={option.title}
              loading="lazy"
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
              className={`w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-[#8E8E93] bg-[#0F2B38] gap-1.5">
              <span className="text-xs font-semibold text-white/80">
                Visual Simulasi Skenario
              </span>
            </div>
          )}

          {/* Vignette & Gradient Overlay for Legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/35 pointer-events-none" />

          {/* Floating Top Left Badge (Single Dominant Pill) */}
          <div className="absolute top-2.5 left-2.5 flex items-center pointer-events-auto">
            <span className="text-xs font-bold px-3 py-1 rounded-full border backdrop-blur-md flex items-center gap-1.5 shadow-xs bg-black/45 text-white border-white/20">
              <span className="w-1.5 h-1.5 rounded-full shrink-0 shadow-xs bg-[#00ED64]" />
              <span className="tracking-tight">{option.badgeLabel}</span>
            </span>
          </div>

          {/* Floating Bottom Corridor & Feature Tag */}
          <div className="absolute bottom-2.5 inset-x-2.5 flex items-center justify-between text-white pointer-events-none">
            <div className="flex items-center gap-1.5 text-xs font-medium text-white/95 drop-shadow-sm truncate">
              <Navigation size={12} className="text-[#00ED64] shrink-0" />
              <span className="truncate">{option.corridor}</span>
            </div>
            {option.imageTag && (
              <span className="text-xs font-semibold text-white/90 bg-black/40 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/15 shrink-0 tabular-nums">
                {option.imageTag}
              </span>
            )}
          </div>
        </div>

        {/* ── 2. House Title Heading ── */}
        <div className="pt-0.5">
          <h3
            className="text-base sm:text-lg font-bold text-[#001E2B] tracking-tight leading-snug [text-wrap:balance]"
            title={option.title}
          >
            {option.title}
          </h3>
        </div>

        {/* ── 3. High-Contrast Price & Metric Hierarchy ── */}
        <div className="bg-[#F4F7F8] p-3.5 rounded-[18px] border border-[#E1E5E8] space-y-2.5">
          {/* Price with Inline Estimasi Tag */}
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <span className="text-lg font-extrabold text-[#001E2B] tracking-tight tabular-nums">
              {option.price}
            </span>
            <span className="text-xs font-semibold text-[#5C6C7A] bg-white px-2.5 py-0.5 rounded-full border border-[#E1E5E8] shadow-2xs">
              Estimasi Skenario
            </span>
          </div>

          {/* Metric Comparison 2x2 Grid */}
          <div className="pt-2 border-t border-[#E1E5E8] grid grid-cols-2 gap-3 text-xs">
            {option.metrics.map((m, idx) => (
              <div key={idx} className="flex flex-col min-w-0">
                <span className="text-xs font-bold uppercase tracking-wider text-[#5C6C7A] truncate">
                  {m.label}
                </span>
                <span className="font-bold text-[#001E2B] tabular-nums truncate text-sm mt-0.5">
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
        <div className="space-y-2 text-xs">
          {/* Kelebihan (Pros) */}
          <div className="p-3 rounded-[16px] bg-[#E9F5EF] border border-[#318266]/25 text-[#004F38]">
            <div className="flex items-center gap-1.5 font-bold text-[#00684A] mb-1">
              <div className="w-4 h-4 rounded-full bg-[#00ED64] text-[#001E2B] flex items-center justify-center shrink-0 shadow-2xs">
                <Check size={11} className="stroke-[3]" />
              </div>
              <span className="text-xs">Kelebihan:</span>
            </div>
            <p className="text-xs leading-relaxed font-normal pl-5.5 text-[#004F38] [text-wrap:pretty]">
              {option.kelebihan || `${option.akses}. ${option.fasilitas}.`}
            </p>
          </div>

          {/* Pertimbangan (Cons / Real Compromise) */}
          <div className="p-3 rounded-[16px] bg-[#FFF8E0] border border-[#D79A2B]/25 text-[#5A4000]">
            <div className="flex items-center gap-1.5 font-bold text-[#8A5B00] mb-1">
              <div className="w-4 h-4 rounded-full bg-[#D79A2B] text-white flex items-center justify-center shrink-0 shadow-2xs">
                <Scale size={11} className="stroke-[2.5]" />
              </div>
              <span className="text-xs">Pertimbangan:</span>
            </div>
            <p className="text-xs leading-relaxed font-normal pl-5.5 text-[#5A4000] [text-wrap:pretty]">
              {option.kompromiNyata}
            </p>
          </div>
        </div>
      </div>

      {/* ── 5. Integrated Selection State Footer (Non-redundant) ── */}
      <div className="pt-3 mt-1 border-t border-[#E1E5E8] flex items-center justify-between">
        <span className="text-xs font-semibold text-[#5C6C7A]">
          {isSelected ? "Status Pilihan" : "Klik kartu untuk memilih"}
        </span>
        {isSelected ? (
          <div className="h-8 px-3.5 rounded-full bg-[#001E2B] text-white font-bold text-xs flex items-center gap-1.5 shadow-2xs animate-fadeIn">
            <Check size={13} className="text-[#00ED64] stroke-[3] shrink-0" />
            <span>Terpilih (Pilihan {option.key})</span>
          </div>
        ) : (
          <div className="h-8 px-3.5 rounded-full bg-[#F4F7F8] group-hover:bg-[#E1E5E8] text-[#001E2B] font-semibold text-xs flex items-center gap-1.5 transition-colors">
            <span>Pilih Rumah {option.key}</span>
          </div>
        )}
      </div>
    </div>
  )
}

interface ScenarioViewProps {
  data: ScenarioData
  selectedChoice?: ScenarioChoice
  selectedFriction?: string
  onSelectChoice: (choice: ScenarioChoice) => void
  onSkip?: () => void
}

export default function ScenarioView({
  data,
  selectedChoice,
  selectedFriction,
  onSelectChoice,
  onSkip,
}: ScenarioViewProps) {
  const [showWhyModal, setShowWhyModal] = useState(false)
  const WeatherIcon = data.weatherIcon

  return (
    <div className="text-[#001E2B]">
      {/* Mobile Swipe Deck View (< md) */}
      <div className="block md:hidden">
        <MobileSwipeDeck
          data={data}
          selectedChoice={selectedChoice}
          selectedFriction={selectedFriction}
          onSelectChoice={onSelectChoice}
          onSkip={onSkip}
        />
      </div>

      {/* Desktop 2-Column Comparison View (>= md) */}
      <div className="hidden md:block space-y-5 animate-fadeIn">
        {/* Contextual Bridge Banner if selectedFriction is present */}
        {selectedFriction && (
          <div className="flex items-center gap-2.5 px-4 py-2.5 bg-[#DCEEE7]/80 rounded-2xl border border-[#318266]/30 text-xs text-[#004F38] font-medium shadow-2xs">
            <Sparkles size={15} className="text-[#00684A] shrink-0" />
            <span>
              <strong>Nyambung sama kendala yang kamu pilih:</strong> &ldquo;
              {selectedFriction}&rdquo;
            </span>
          </div>
        )}

        {/* Situation Narrative Card - Scaled & Balanced Typography */}
        <div className="bg-white rounded-3xl p-5 md:p-6 border border-[#D7E1E5] shadow-xs space-y-3.5 relative">
          <div className="flex items-center justify-between flex-wrap gap-2">
            {/* Weather Tag Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-[#F4F7F6] text-[#001E2B] border border-[#D7E1E5]">
              <WeatherIcon
                size={14}
                className="text-[#00684A]"
                aria-hidden="true"
              />
              <span>{data.weatherTag}</span>
            </div>

            {/* Why it matters button */}
            <button
              type="button"
              id="desktop-why-it-matters-toggle"
              aria-expanded={showWhyModal}
              aria-controls="desktop-why-it-matters-content"
              onClick={() => setShowWhyModal(!showWhyModal)}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#5C6C7A] hover:text-[#00684A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00684A] rounded-md px-1.5 py-0.5 transition-colors cursor-pointer"
            >
              <HelpCircle size={14} aria-hidden="true" />
              <span>Kenapa ini penting?</span>
            </button>
          </div>

          {/* Narrative Title & Story */}
          <div className="space-y-1.5">
            <h2 className="text-xl md:text-2xl font-extrabold text-[#001E2B] tracking-tight text-balance">
              {data.title}
            </h2>
            <p className="text-xs md:text-sm text-[#3D4F5B] leading-relaxed font-medium">
              &ldquo;{data.narrative}&rdquo;
            </p>
            <p className="text-xs text-[#5C6C7A] font-medium pt-0.5">
              Bayangkan kamu lagi ngalamin situasi ini sehari-hari bareng
              keluarga.
            </p>
          </div>

          {/* Expandable Why It Matters Drawer */}
          {showWhyModal && (
            <div
              id="desktop-why-it-matters-content"
              role="region"
              aria-labelledby="desktop-why-it-matters-toggle"
              className="p-3.5 rounded-2xl bg-[#E9F5EF] border border-[#318266]/30 text-xs text-[#004F38] font-medium space-y-1 animate-fadeIn"
            >
              <div className="font-bold flex items-center gap-1.5">
                <Sparkles
                  size={14}
                  className="text-[#00684A]"
                  aria-hidden="true"
                />
                <span>Realita Lapangan Jabodetabek:</span>
              </div>
              <p className="leading-relaxed">{data.whyItMatters}</p>
            </div>
          )}
        </div>

        {/* Trade-off Principle Banner */}
        <div className="flex items-center gap-2.5 px-4 py-2.5 bg-[#F4F7F6] rounded-2xl border border-[#D7E1E5] text-xs font-medium text-[#3D4F5B]">
          <Info
            size={15}
            className="text-[#00684A] shrink-0"
            aria-hidden="true"
          />
          <span>
            <strong>Tips Rumper:</strong> Gak ada pilihan yang mutlak salah.
            Pilih opsi yang paling masuk akal buat rutinitas dan kenyamanan
            hidupmu.
          </span>
        </div>

        {/* Comparison Cards Grid (2 Column Desktop with Curated Card layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4.5 items-stretch">
          <ScenarioHouseCard
            option={data.optionA}
            isSelected={selectedChoice === "A"}
            onSelect={() => onSelectChoice("A")}
          />
          <ScenarioHouseCard
            option={data.optionB}
            isSelected={selectedChoice === "B"}
            onSelect={() => onSelectChoice("B")}
          />
        </div>

        {/* Decision Toolbar Component - Restructured with Visual Hierarchy */}
        <div className="bg-white rounded-3xl p-4 md:p-5 border border-[#D7E1E5] shadow-xs space-y-3.5">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#5C6C7A]">
              Kompromi yang Paling Masuk Akal Buat Kamu:
            </h3>
          </div>

          {/* Grouped Decision Toolbar: 3 Clear Options (Selected House | Jalan Tengah | Hard No) */}
          <div
            className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 w-full"
            role="group"
            aria-label="Pilihan Kompromi"
          >
            {/* Option 1: Selected House Choice */}
            <button
              type="button"
              onClick={() => onSelectChoice(selectedChoice === "B" ? "B" : "A")}
              aria-pressed={selectedChoice === "A" || selectedChoice === "B"}
              className={`min-h-[46px] px-3.5 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-[color,background-color,border-color,transform,box-shadow] duration-150 ease-out cursor-pointer flex items-center justify-center gap-2 select-none active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#001E2B] focus-visible:ring-offset-2 ${
                selectedChoice === "A" || selectedChoice === "B"
                  ? "bg-[#001E2B] text-white shadow-sm ring-2 ring-[#001E2B]/10"
                  : "border border-[#D7E1E5] bg-white text-[#001E2B] hover:border-[#001E2B] hover:bg-[#F4F7F6]"
              }`}
            >
              <Check
                size={16}
                aria-hidden="true"
                className={
                  selectedChoice === "A" || selectedChoice === "B"
                    ? "text-[#00ED64] stroke-[3]"
                    : "text-[#5C6C7A] stroke-2"
                }
              />
              <span className="truncate">
                {selectedChoice === "A"
                  ? "Pilih Rumah A"
                  : selectedChoice === "B"
                    ? "Pilih Rumah B"
                    : "Pilih Rumah A / B"}
              </span>
            </button>

            {/* Option 2: Kompromi Moderat / Jalan Tengah */}
            <button
              type="button"
              onClick={() => onSelectChoice("neither")}
              aria-pressed={selectedChoice === "neither"}
              className={`min-h-[46px] px-3.5 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-[color,background-color,border-color,transform,box-shadow] duration-150 ease-out cursor-pointer flex items-center justify-center gap-2 select-none active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#001E2B] focus-visible:ring-offset-2 ${
                selectedChoice === "neither"
                  ? "border-2 border-[#001E2B] bg-[#001E2B]/5 text-[#001E2B] ring-2 ring-[#001E2B]/10 shadow-xs"
                  : "border border-[#D7E1E5] bg-white text-[#5C6C7A] hover:border-[#C1CCD6] hover:bg-[#F4F7F6] hover:text-[#001E2B]"
              }`}
            >
              <Scale
                size={16}
                aria-hidden="true"
                className={
                  selectedChoice === "neither"
                    ? "text-[#001E2B] stroke-2"
                    : "text-[#5C6C7A] stroke-2"
                }
              />
              <span className="truncate">Jalan Tengah</span>
            </button>

            {/* Option 3: Hard No (Tolak Skenario) */}
            <button
              type="button"
              onClick={() => onSelectChoice("reject")}
              aria-pressed={selectedChoice === "reject"}
              className={`min-h-[46px] px-3.5 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-[color,background-color,border-color,transform,box-shadow] duration-150 ease-out cursor-pointer flex items-center justify-center gap-2 select-none active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C95746] focus-visible:ring-offset-2 ${
                selectedChoice === "reject"
                  ? "border-2 border-[#C95746] bg-[#FFF5F5] text-[#C95746] ring-2 ring-[#C95746]/10 shadow-xs"
                  : "border border-[#F4DED9] bg-white text-[#C95746] hover:border-[#C95746] hover:bg-[#FFF5F5]"
              }`}
            >
              <AlertTriangle
                size={16}
                aria-hidden="true"
                className="stroke-2 shrink-0"
              />
              <span className="truncate">Hard No (Tolak)</span>
            </button>
          </div>

          {/* Dynamic Feedback Banner */}
          {selectedChoice && data.feedbackMap[selectedChoice] && (
            <div
              role="status"
              aria-live="polite"
              className={`pt-2 flex items-center gap-2 text-xs font-semibold px-4 py-2.5 rounded-xl border animate-fadeIn transition-colors ${
                selectedChoice === "reject"
                  ? "bg-[#FFF5F5] border-[#C95746]/30 text-[#8F2E20]"
                  : selectedChoice === "neither"
                    ? "bg-[#EBF3F5] border-[#28515E]/20 text-[#001E2B]"
                    : "bg-[#E9F5EF] border-[#318266]/30 text-[#004F38]"
              }`}
            >
              {selectedChoice === "reject" ? (
                <AlertTriangle
                  size={14}
                  className="stroke-2 text-[#C95746] shrink-0"
                  aria-hidden="true"
                />
              ) : selectedChoice === "neither" ? (
                <Scale
                  size={14}
                  className="stroke-2 text-[#00684A] shrink-0"
                  aria-hidden="true"
                />
              ) : (
                <Info
                  size={14}
                  className="stroke-2 text-[#00684A] shrink-0"
                  aria-hidden="true"
                />
              )}
              <span>{data.feedbackMap[selectedChoice]}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
