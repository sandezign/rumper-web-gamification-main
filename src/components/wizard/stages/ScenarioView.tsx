import React, { useState } from 'react'
import {
  HelpCircle,
  Check,
  AlertTriangle,
  XCircle,
  Info,
  ChevronRight,
  Sparkles,
} from 'lucide-react'
import type { ScenarioChoice } from '../../../store/useWizardStore'
import MobileSwipeDeck from './MobileSwipeDeck'
import BlueprintVisual from './BlueprintVisual'

export interface ScenarioMetric {
  label: string
  value: string
  subValue?: string
}

export interface ScenarioHouseOption {
  key: 'A' | 'B'
  badgeLabel: string
  title: string
  corridor: string
  price: string
  imageUrl?: string
  imageTag?: string
  metrics: ScenarioMetric[]
  akses: string
  fasilitas: string
  kompromiNyata: string
}

export interface ScenarioData {
  id: string
  stepNumber: number // e.g. 1
  totalScenarios: number // e.g. 3
  weatherTag: string
  weatherIcon: React.ElementType
  title: string
  narrative: string
  whyItMatters: string
  optionA: ScenarioHouseOption
  optionB: ScenarioHouseOption
  feedbackMap: Record<ScenarioChoice, string>
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
      <div className="hidden md:block space-y-6 animate-fadeIn">
        {/* Contextual Bridge Banner if selectedFriction is present */}
        {selectedFriction && (
          <div className="flex items-center gap-2.5 px-4 py-2.5 bg-[#DCEEE7]/70 rounded-2xl border border-[#318266]/30 text-xs text-[#004F38] font-medium shadow-2xs">
            <Sparkles size={15} className="text-[#00684A] shrink-0" />
            <span>
              <strong>Terkait kendala yang Anda pilih:</strong> &ldquo;{selectedFriction}&rdquo;
            </span>
          </div>
        )}

        {/* Situation Narrative Card - Scaled & Balanced Typography */}
        <div className="bg-white rounded-3xl p-5 md:p-6 border border-[#D7E1E5] shadow-xs space-y-3.5 relative">
        <div className="flex items-center justify-between flex-wrap gap-2">
          {/* Weather Tag Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-[#F4F7F6] text-[#001E2B] border border-[#D7E1E5]">
            <WeatherIcon size={14} className="text-[#00684A]" />
            <span>{data.weatherTag}</span>
          </div>

          {/* Why it matters button */}
          <button
            type="button"
            onClick={() => setShowWhyModal(!showWhyModal)}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#5C6C7A] hover:text-[#00684A] transition-colors cursor-pointer"
          >
            <HelpCircle size={14} />
            <span>Mengapa ini penting?</span>
          </button>
        </div>

        {/* Narrative Title & Story */}
        <div className="space-y-1.5">
          <h2 className="text-xl md:text-2xl font-extrabold text-[#001E2B] tracking-tight">
            {data.title}
          </h2>
          <p className="text-xs md:text-sm text-[#3D4F5B] leading-relaxed font-medium">
            &ldquo;{data.narrative}&rdquo;
          </p>
          <p className="text-[11px] text-[#7C8C9A] font-medium pt-0.5">
            Bayangkan Anda sedang berada di situasi ini bersama keluarga dalam kehidupan sehari-hari.
          </p>
        </div>

        {/* Expandable Why It Matters Drawer */}
        {showWhyModal && (
          <div className="p-3.5 rounded-2xl bg-[#E9F5EF] border border-[#318266]/30 text-xs text-[#004F38] font-medium space-y-1 animate-fadeIn">
            <div className="font-bold flex items-center gap-1.5">
              <Sparkles size={14} className="text-[#00684A]" />
              <span>Realita Lapangan Jabodetabek:</span>
            </div>
            <p className="leading-relaxed">{data.whyItMatters}</p>
          </div>
        )}
      </div>

      {/* Trade-off Principle Banner */}
      <div className="flex items-center gap-2.5 px-4 py-2.5 bg-[#F4F7F6] rounded-2xl border border-[#D7E1E5] text-xs font-medium text-[#3D4F5B]">
        <Info size={15} className="text-[#00684A] shrink-0" />
        <span>
          <strong>Tips Prioritas:</strong> Tidak ada pilihan yang salah. Pilih opsi yang paling masuk akal untuk rutinitas dan kenyamanan Anda.
        </span>
      </div>

      {/* Comparison Cards Grid (2 Column Desktop, Stacked Mobile) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* House Option A */}
        <div
          onClick={() => onSelectChoice('A')}
          className={`bg-white rounded-3xl p-5 md:p-6 border-2 transition-all duration-200 cursor-pointer flex flex-col justify-between space-y-4 relative select-none ${
            selectedChoice === 'A'
              ? 'border-[#001E2B] shadow-md bg-[#F9FBFA]'
              : 'border-[#D7E1E5] hover:border-[#A8B8C6] shadow-xs hover:shadow-md'
          }`}
        >
          {/* Header & Price */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span
                className={`w-6 h-6 rounded-full font-extrabold text-xs flex items-center justify-center transition-colors ${
                  selectedChoice === 'A'
                    ? 'bg-[#001E2B] text-white'
                    : 'bg-[#F4F7F6] border border-[#D7E1E5] text-[#001E2B]'
                }`}
              >
                A
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-[#5C6C7A]">
                PILIHAN A
              </span>
            </div>
            <span className="text-xs font-extrabold text-[#001E2B] bg-[#F4F7F6] px-3 py-1 rounded-full border border-[#D7E1E5]">
              {data.optionA.price}
            </span>
          </div>

          {/* Title & Corridor */}
          <div>
            <h3 className="text-base md:text-lg font-extrabold text-[#001E2B] leading-snug">
              {data.optionA.title}
            </h3>
            <p className="text-xs text-[#5C6C7A] font-medium mt-0.5">{data.optionA.corridor}</p>
          </div>

          {/* Relevant Context Image Photo */}
          {data.optionA.imageUrl && (
            <div className="w-full h-32 md:h-36 rounded-2xl overflow-hidden relative border border-[#D7E1E5] shadow-xs group bg-[#001E2B]">
              <img
                src={data.optionA.imageUrl}
                alt={data.optionA.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
              {data.optionA.imageTag && (
                <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
                  <span className="text-[11px] font-bold text-white bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/20 truncate">
                    {data.optionA.imageTag}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* 4 Metric Boxes Grid */}
          <div className="grid grid-cols-2 gap-2">
            {data.optionA.metrics.map((m, idx) => (
              <div key={idx} className="bg-[#F4F7F6] rounded-xl p-2.5 border border-[#E1E5E8]">
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#7C8C9A]">
                  {m.label}
                </div>
                <div className="text-xs md:text-sm font-extrabold text-[#001E2B] mt-0.5">
                  {m.value}
                </div>
                {m.subValue && (
                  <div className="text-[10px] text-[#5C6C7A] font-medium truncate">
                    {m.subValue}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Bullets */}
          <div className="text-xs text-[#3D4F5B] space-y-1.5 pt-1">
            <p><strong>Akses:</strong> {data.optionA.akses}</p>
            <p><strong>Fasilitas:</strong> {data.optionA.fasilitas}</p>
          </div>

          {/* Real Compromise Box */}
          <div className="bg-[#FFF8E0] border border-[#D79A2B]/40 rounded-2xl p-3 text-xs text-[#001E2B]">
            <span className="font-bold text-[#8A5B00] block mb-0.5">Kompromi Nyata:</span>
            <span className="font-medium text-[#5A4000]">{data.optionA.kompromiNyata}</span>
          </div>

          {/* Active Select Indicator */}
          {selectedChoice === 'A' ? (
            <div className="flex items-center gap-1.5 text-xs font-bold text-white bg-[#001E2B] py-2 px-3 rounded-full justify-center shadow-xs animate-fadeIn">
              <Check size={14} className="stroke-[3] text-[#00ED64]" />
              <span>Pilihan Anda (Rumah A Terpilih)</span>
            </div>
          ) : (
            <div className="text-center text-xs font-bold text-[#5C6C7A] py-1.5">
              Klik untuk memilih Rumah A
            </div>
          )}
        </div>

        {/* House Option B */}
        <div
          onClick={() => onSelectChoice('B')}
          className={`bg-white rounded-3xl p-5 md:p-6 border-2 transition-all duration-200 cursor-pointer flex flex-col justify-between space-y-4 relative select-none ${
            selectedChoice === 'B'
              ? 'border-[#001E2B] shadow-md bg-[#F9FBFA]'
              : 'border-[#D7E1E5] hover:border-[#A8B8C6] shadow-xs hover:shadow-md'
          }`}
        >
          {/* Header & Price */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span
                className={`w-6 h-6 rounded-full font-extrabold text-xs flex items-center justify-center transition-colors ${
                  selectedChoice === 'B'
                    ? 'bg-[#001E2B] text-white'
                    : 'bg-[#F4F7F6] border border-[#D7E1E5] text-[#001E2B]'
                }`}
              >
                B
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-[#5C6C7A]">
                PILIHAN B
              </span>
            </div>
            <span className="text-xs font-extrabold text-[#001E2B] bg-[#F4F7F6] px-3 py-1 rounded-full border border-[#D7E1E5]">
              {data.optionB.price}
            </span>
          </div>

          {/* Title & Corridor */}
          <div>
            <h3 className="text-base md:text-lg font-extrabold text-[#001E2B] leading-snug">
              {data.optionB.title}
            </h3>
            <p className="text-xs text-[#5C6C7A] font-medium mt-0.5">{data.optionB.corridor}</p>
          </div>

          {/* Relevant Context Image Photo */}
          {data.optionB.imageUrl && (
            <div className="w-full h-32 md:h-36 rounded-2xl overflow-hidden relative border border-[#D7E1E5] shadow-xs group bg-[#001E2B]">
              <img
                src={data.optionB.imageUrl}
                alt={data.optionB.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
              {data.optionB.imageTag && (
                <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
                  <span className="text-[11px] font-bold text-white bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/20 truncate">
                    {data.optionB.imageTag}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* 4 Metric Boxes Grid */}
          <div className="grid grid-cols-2 gap-2">
            {data.optionB.metrics.map((m, idx) => (
              <div key={idx} className="bg-[#F4F7F6] rounded-xl p-2.5 border border-[#E1E5E8]">
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#7C8C9A]">
                  {m.label}
                </div>
                <div className="text-xs md:text-sm font-extrabold text-[#001E2B] mt-0.5">
                  {m.value}
                </div>
                {m.subValue && (
                  <div className="text-[10px] text-[#5C6C7A] font-medium truncate">
                    {m.subValue}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Bullets */}
          <div className="text-xs text-[#3D4F5B] space-y-1.5 pt-1">
            <p><strong>Akses:</strong> {data.optionB.akses}</p>
            <p><strong>Fasilitas:</strong> {data.optionB.fasilitas}</p>
          </div>

          {/* Real Compromise Box */}
          <div className="bg-[#FFF8E0] border border-[#D79A2B]/40 rounded-2xl p-3 text-xs text-[#001E2B]">
            <span className="font-bold text-[#8A5B00] block mb-0.5">Kompromi Nyata:</span>
            <span className="font-medium text-[#5A4000]">{data.optionB.kompromiNyata}</span>
          </div>

          {/* Active Select Indicator */}
          {selectedChoice === 'B' ? (
            <div className="flex items-center gap-1.5 text-xs font-bold text-white bg-[#001E2B] py-2 px-3 rounded-full justify-center shadow-xs animate-fadeIn">
              <Check size={14} className="stroke-[3] text-[#00ED64]" />
              <span>Pilihan Anda (Rumah B Terpilih)</span>
            </div>
          ) : (
            <div className="text-center text-xs font-bold text-[#5C6C7A] py-1.5">
              Klik untuk memilih Rumah B
            </div>
          )}
        </div>
      </div>

      {/* Decision Toolbar Component - Dynamic 3-Option Layout & Dark Blue Outline Selection */}
      <div className="bg-white rounded-3xl p-5 md:p-6 border border-[#D7E1E5] shadow-sm space-y-3.5">
        <div className="flex items-center justify-between">
          <label className="text-xs font-extrabold uppercase tracking-wider text-[#5C6C7A]">
            Kompromi yang Paling Rasional Bagi Anda:
          </label>
        </div>

        {/* Dynamic 3-Slot Option Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 items-stretch">
          {/* Slot 1: Dynamic Selected House (A / B) or Dual Quick Pick */}
          {selectedChoice === 'A' ? (
            <button
              type="button"
              onClick={() => onSelectChoice('A')}
              className="min-h-[48px] px-4 py-2.5 rounded-2xl text-xs md:text-sm font-bold border-2 border-[#001E2B] bg-[#001E2B]/5 text-[#001E2B] ring-2 ring-[#001E2B]/10 shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer select-none"
            >
              <Check size={16} className="text-[#00684A] stroke-[3]" />
              <span className="truncate">Pilihan: Rumah A (Kompak KRL)</span>
            </button>
          ) : selectedChoice === 'B' ? (
            <button
              type="button"
              onClick={() => onSelectChoice('B')}
              className="min-h-[48px] px-4 py-2.5 rounded-2xl text-xs md:text-sm font-bold border-2 border-[#001E2B] bg-[#001E2B]/5 text-[#001E2B] ring-2 ring-[#001E2B]/10 shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer select-none"
            >
              <Check size={16} className="text-[#00684A] stroke-[3]" />
              <span className="truncate">Pilihan: Rumah B (Lapang)</span>
            </button>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => onSelectChoice('A')}
                className="min-h-[48px] px-2 py-2 rounded-2xl text-xs font-bold border border-[#D7E1E5] bg-white text-[#001E2B] hover:border-[#001E2B] hover:bg-[#F4F7F6] transition-all cursor-pointer"
              >
                Pilih Rumah A
              </button>
              <button
                type="button"
                onClick={() => onSelectChoice('B')}
                className="min-h-[48px] px-2 py-2 rounded-2xl text-xs font-bold border border-[#D7E1E5] bg-white text-[#001E2B] hover:border-[#001E2B] hover:bg-[#F4F7F6] transition-all cursor-pointer"
              >
                Pilih Rumah B
              </button>
            </div>
          )}

          {/* Slot 2: Fixed Option - Kompromi Moderat (Keduanya Kurang Cocok) */}
          <button
            type="button"
            onClick={() => onSelectChoice('neither')}
            className={`min-h-[48px] px-4 py-2.5 rounded-2xl text-xs md:text-sm font-bold border transition-all cursor-pointer flex items-center justify-center gap-2 select-none active:scale-[0.98] ${
              selectedChoice === 'neither'
                ? 'border-2 border-[#001E2B] bg-[#001E2B]/5 text-[#001E2B] ring-2 ring-[#001E2B]/10 shadow-xs'
                : 'border border-[#D7E1E5] bg-white text-[#5C6C7A] hover:border-[#C1CCD6] hover:bg-[#F4F7F6]'
            }`}
          >
            <XCircle size={16} className={selectedChoice === 'neither' ? 'text-[#001E2B]' : 'text-[#7C8C9A]'} />
            <span className="truncate">Kompromi Moderat</span>
          </button>

          {/* Slot 3: Fixed Option - Hard No (Tolak Skenario) */}
          <button
            type="button"
            onClick={() => onSelectChoice('reject')}
            className={`min-h-[48px] px-4 py-2.5 rounded-2xl text-xs md:text-sm font-bold border transition-all cursor-pointer flex items-center justify-center gap-2 select-none active:scale-[0.98] ${
              selectedChoice === 'reject'
                ? 'border-2 border-[#C95746] bg-[#FFF5F5] text-[#C95746] ring-2 ring-[#C95746]/10 shadow-xs'
                : 'border border-[#F4DED9] bg-white text-[#C95746] hover:border-[#C95746] hover:bg-[#FFF5F5]'
            }`}
          >
            <AlertTriangle size={16} />
            <span className="truncate">Hard No (Tolak)</span>
          </button>
        </div>

        {/* Dynamic Outline Feedback Banner */}
        {selectedChoice && data.feedbackMap[selectedChoice] && (
          <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-[#004F38] bg-[#E9F5EF] px-4 py-2.5 rounded-xl border border-[#318266]/30 animate-fadeIn">
            <Check size={14} className="stroke-[3] text-[#00684A] shrink-0" />
            <span>{data.feedbackMap[selectedChoice]}</span>
          </div>
        )}
      </div>
      </div>
    </div>
  )
}
