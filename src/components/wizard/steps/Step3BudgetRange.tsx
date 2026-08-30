import React from "react"
import { Wallet, Sliders, Calculator, Info } from "lucide-react"

interface Step3Props {
  budgetPreset: string
  budgetMin: number
  budgetMax: number
  onChange: (fields: {
    budgetPreset?: string
    budgetMin?: number
    budgetMax?: number
  }) => void
}

const PRESETS_ROW_1 = [
  { id: "under-500", label: "< Rp 500 Jt", min: 300, max: 500 },
  { id: "500-800", label: "Rp 500 – 800 Jt", min: 500, max: 800 },
  { id: "800-1200", label: "Rp 800 Jt – 1,2 M", min: 800, max: 1200 },
]

const PRESETS_ROW_2 = [
  { id: "1200-1800", label: "Rp 1,2 – 1,8 M", min: 1200, max: 1800 },
  { id: "above-1800", label: "> Rp 1,8 M", min: 1800, max: 3000 },
]

export default function Step3BudgetRange({
  budgetPreset,
  budgetMin,
  budgetMax,
  onChange,
}: Step3Props) {
  const formatRupiah = (valInMillions: number) => {
    if (valInMillions >= 1000) {
      const inM = (valInMillions / 1000)
        .toFixed(1)
        .replace(".", ",")
        .replace(",0", "")
      return `Rp ${inM} Miliar`
    }
    return `Rp ${valInMillions} Juta`
  }

  // Monthly KPR estimation formula:
  // Loan principal: 90% (DP 10%), 7% p.a. fixed interest, 20-year tenor (240 months)
  const calcCicilan = (valInMillions: number) => {
    const loanPrincipal = valInMillions * 0.9
    const totalLoanWithInterest = loanPrincipal * (1 + 0.07 * 20)
    const monthly = totalLoanWithInterest / 240
    return monthly.toFixed(1).replace(".", ",").replace(",0", "")
  }

  const minCicilan = calcCicilan(budgetMin)
  const maxCicilan = calcCicilan(budgetMax)

  const handleSelectPreset = (preset: typeof PRESETS_ROW_1[number]) => {
    onChange({
      budgetPreset: preset.id,
      budgetMin: preset.min,
      budgetMax: preset.max,
    })
  }

  const renderPresetButton = (p: typeof PRESETS_ROW_1[number]) => {
    const isSelected = budgetPreset === p.id
    return (
      <button
        key={p.id}
        type="button"
        onClick={() => handleSelectPreset(p)}
        className={`min-h-[46px] px-2.5 sm:px-4 py-2.5 rounded-[16px] border text-xs sm:text-sm font-bold transition-all duration-150 cursor-pointer select-none active:scale-[0.97] flex items-center justify-center text-center whitespace-nowrap ${
          isSelected
            ? "border-[#15803D] bg-[#F0FDF4] text-[#14532D] shadow-xs ring-2 ring-[#22C55E]/25 font-extrabold"
            : "border-[#E5E5EA] bg-white text-[#1C1C1E] hover:border-[#C7C7CC] hover:bg-[#F2F2F7]/50"
        }`}
      >
        <span>{p.label}</span>
      </button>
    )
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Step Header */}
      <div>
        <div className="text-xs font-bold uppercase tracking-wider text-[#15803D] mb-2 flex items-center gap-1.5">
          <span>Batas Budget</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-[#001E2B] tracking-tight text-balance">
          Batas Anggaran & Estimasi Cicilan KPR
        </h2>
        <p className="text-sm md:text-base text-[#5C6C7A] mt-1.5 text-pretty leading-relaxed">
          Agar cash flow tetap aman, tentukan rentang harga yang realistis
          sesuai kapasitas cicilan bulananmu.
        </p>
      </div>

      {/* Main Container Card */}
      <div className="bg-white rounded-[26px] p-5 md:p-7 border border-[#E5E5EA] shadow-xs space-y-6">
        {/* Preset Selection (2 clean rows guaranteeing 1-line button labels) */}
        <div className="space-y-3.5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#636366]">
              <Wallet size={15} className="text-[#15803D]" />
              <span>Pilihan Rentang Anggaran:</span>
            </label>
            <span className="inline-flex items-center gap-1.5 text-xs font-extrabold text-white bg-[#001E2B] px-3.5 py-1 rounded-full border border-white/30 shadow-[0_4px_18px_rgba(0,30,43,0.35)] ring-2 ring-[#00ED64]/25 tabular-nums">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00ED64] shadow-[0_0_6px_#00ED64] shrink-0" />
              <span>
                {formatRupiah(budgetMin)} — {formatRupiah(budgetMax)}
              </span>
            </span>
          </div>

          <div className="space-y-2.5">
            {/* Row 1: 3 Presets */}
            <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
              {PRESETS_ROW_1.map((p) => renderPresetButton(p))}
            </div>

            {/* Row 2: 2 Presets */}
            <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
              {PRESETS_ROW_2.map((p) => renderPresetButton(p))}
            </div>
          </div>
        </div>

        {/* Dynamic KPR Cashflow Telemetry Card (Styled after Kelebihan Card) */}
        <div className="bg-[#F0FDF4] rounded-[20px] p-4 sm:p-5 border border-[#DCFCE7] flex flex-col gap-3.5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-[14px] bg-[#15803D] text-white flex items-center justify-center shrink-0 shadow-2xs">
                <Calculator size={20} />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#15803D] block">
                  Estimasi Beban Bulanan
                </span>
                <p className="text-base sm:text-lg md:text-xl font-extrabold text-[#14532D] tabular-nums tracking-tight mt-0.5">
                  Rp {minCicilan} Jt — Rp {maxCicilan} Jt{" "}
                  <span className="text-xs font-semibold text-[#5C6C7A]">
                    / bulan
                  </span>
                </p>
              </div>
            </div>

            {/* Info Pill: Strictly 1 line on desktop & mobile */}
            <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-[#5C6C7A] bg-white px-3.5 py-2 rounded-full border border-[#E5E5EA] shadow-2xs whitespace-nowrap shrink-0">
              <Info size={14} className="shrink-0 text-[#15803D]" />
              <span className="whitespace-nowrap">
                Asumsi DP 10%, tenor 20 thn, suku bunga KPR ~7% p.a.
              </span>
            </div>
          </div>
        </div>

        <hr className="border-[#F2F2F7]" />

        {/* Flexible Range Sliders (Styled after Curated Inset Box) */}
        <div className="bg-[#F2F2F7]/60 rounded-[20px] p-4 md:p-6 border border-[#E5E5EA] space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1C1C1E]">
              <Sliders size={15} className="text-[#15803D]" />
              <span>Kustomisasi Anggaran Fleksibel</span>
            </div>
            <span className="text-xs text-[#8E8E93] font-medium hidden sm:inline">
              Geser untuk batas spesifik
            </span>
          </div>

          <div className="space-y-4 pt-1">
            <div>
              <div className="flex justify-between text-xs font-bold text-[#636366] mb-1.5">
                <span>Batas Minimum Properti:</span>
                <span className="text-[#1C1C1E] font-extrabold tabular-nums">
                  {formatRupiah(budgetMin)}
                </span>
              </div>
              <input
                type="range"
                aria-label="Batas Minimum Anggaran Properti"
                aria-valuemin={300}
                aria-valuemax={Math.min(budgetMax - 100, 3000)}
                aria-valuenow={budgetMin}
                aria-valuetext={formatRupiah(budgetMin)}
                min={300}
                max={Math.min(budgetMax - 100, 3000)}
                step={50}
                value={budgetMin}
                onChange={(e) =>
                  onChange({
                    budgetMin: Number(e.target.value),
                    budgetPreset: "custom",
                  })
                }
                className="w-full accent-[#001E2B] cursor-pointer h-2 bg-[#E5E5EA] rounded-lg touch-action-none"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-[#636366] mb-1.5">
                <span>Batas Maksimum Properti:</span>
                <span className="text-[#1C1C1E] font-extrabold tabular-nums">
                  {formatRupiah(budgetMax)}
                </span>
              </div>
              <input
                type="range"
                aria-label="Batas Maksimum Anggaran Properti"
                aria-valuemin={Math.max(budgetMin + 100, 400)}
                aria-valuemax={4000}
                aria-valuenow={budgetMax}
                aria-valuetext={formatRupiah(budgetMax)}
                min={Math.max(budgetMin + 100, 400)}
                max={4000}
                step={50}
                value={budgetMax}
                onChange={(e) =>
                  onChange({
                    budgetMax: Number(e.target.value),
                    budgetPreset: "custom",
                  })
                }
                className="w-full accent-[#001E2B] cursor-pointer h-2 bg-[#E5E5EA] rounded-lg touch-action-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
