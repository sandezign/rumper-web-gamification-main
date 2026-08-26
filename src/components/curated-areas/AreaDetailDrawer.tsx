import React from "react"
import {
  X,
  MapPin,
  Train,
  Building2,
  Sparkles,
  ArrowRight,
  Hospital,
  GraduationCap,
  Store,
  Compass,
  Scale,
  Clock,
  Coins,
  Mountain,
} from "lucide-react"
import type { CuratedArea } from "../../data/mockCuratedAreas"

interface AreaDetailDrawerProps {
  isOpen: boolean
  area: CuratedArea | null
  onClose: () => void
  onSelectForEvaluation: (area: CuratedArea) => void
}

export default function AreaDetailDrawer({
  isOpen,
  area,
  onClose,
  onSelectForEvaluation,
}: AreaDetailDrawerProps) {
  if (!isOpen || !area) return null

  return (
    <div
      className="fixed inset-0 z-[9999] overflow-hidden bg-[#001E2B]/60 backdrop-blur-sm animate-fadeIn select-none flex flex-col justify-end md:justify-center md:items-end p-0 md:p-6"
      onClick={onClose}
    >
      {/* Responsive Bottom Sheet Container (Mobile: Slides up from bottom | Desktop: Right side / floating drawer) */}
      <div
        className="w-full max-h-[88dvh] md:max-h-[92dvh] md:w-[480px] bg-white rounded-t-[28px] md:rounded-3xl border border-[#E1E5E8] shadow-2xl flex flex-col justify-between text-[#001E2B] animate-slideUp overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="area-detail-title"
      >
        {/* Drawer Header (Deep Teal with Emerald Glow & Mobile Bottom Sheet Handle) */}
        <div className="p-5 pt-3 md:pt-5 bg-[#001E2B] text-white flex flex-col relative overflow-hidden shrink-0 border-b border-white/10">
          {/* Mobile Bottom Sheet Grab Handle */}
          <div className="w-12 h-1.5 bg-white/30 rounded-full mx-auto mb-3 shrink-0 md:hidden" />

          <div className="flex items-start justify-between">
            {/* Subtle background glow */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#00ED64]/10 rounded-full blur-2xl pointer-events-none" />

            <div className="space-y-1.5 pr-4 relative z-10">
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                    area.category === "strong-fit"
                      ? "bg-[#003D4F] text-[#00ED64] border-[#00ED64]/30"
                      : area.category === "interesting-tradeoff"
                        ? "bg-[#FFF3D6] text-[#6E4E00] border-[#D4A017]/30"
                        : "bg-[#FFE2E0] text-[#7A1D1A] border-[#D9383A]/30"
                  }`}
                >
                  {area.categoryLabel}
                </span>
                <span className="text-xs text-[#A8B3BC] font-semibold flex items-center gap-1">
                  <MapPin size={12} className="text-[#00ED64]" />
                  {area.region}
                </span>
              </div>
              <h2
                id="area-detail-title"
                className="text-xl font-black tracking-tight text-white leading-tight"
              >
                {area.name}
              </h2>
              <p className="text-xs text-[#A8B3BC] leading-relaxed line-clamp-2 sm:line-clamp-none">
                {area.summaryNarrative}
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Tutup detail area"
              className="text-[#A8B3BC] hover:text-white min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full hover:bg-white/10 transition-colors cursor-pointer relative z-10 shrink-0 -mr-2 -mt-1 active:scale-95"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Drawer Scrollable Body Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 sm:p-6 space-y-5">
          {/* Quick Metrics Strip */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            <div className="bg-[#F4F7F8] p-3 rounded-2xl border border-[#E1E5E8] text-center flex flex-col justify-center">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#7C8C9A] flex items-center justify-center gap-1">
                <Clock size={11} />
                Komuter
              </span>
              <span className="text-xs sm:text-sm font-black text-[#001E2B] mt-0.5 block truncate">
                {area.commuteTime}
              </span>
              <span className="text-[10px] text-[#5C6C7A] font-medium">
                ke Sudirman
              </span>
            </div>

            <div className="bg-[#F4F7F8] p-3 rounded-2xl border border-[#E1E5E8] text-center flex flex-col justify-center">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#7C8C9A] flex items-center justify-center gap-1">
                <Mountain size={11} />
                Elevasi
              </span>
              <span className="text-xs sm:text-sm font-black text-[#00684A] mt-0.5 block truncate">
                {area.elevationDpl}
              </span>
              <span className="text-[10px] text-[#00684A] font-bold">
                {area.elevationScore}
              </span>
            </div>

            <div className="bg-[#F4F7F8] p-3 rounded-2xl border border-[#E1E5E8] text-center flex flex-col justify-center">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#7C8C9A] flex items-center justify-center gap-1">
                <Coins size={11} />
                Kisaran Harga
              </span>
              <span className="text-xs sm:text-sm font-black text-[#001E2B] mt-0.5 block truncate">
                {area.priceRange}
              </span>
              <span className="text-[10px] text-[#5C6C7A] font-medium truncate">
                Tipe 2 Lantai
              </span>
            </div>
          </div>

          {/* Callout Boxes: Mengapa Selaras & Kompromi Nyata */}
          <div className="space-y-3">
            <div className="p-3.5 sm:p-4 rounded-2xl bg-[#E9F5EF] border border-[#318266]/30 space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-[#004F38]">
                <Sparkles size={14} className="text-[#00684A] shrink-0" />
                <span>Mengapa Selaras:</span>
              </div>
              <p className="text-xs text-[#003D2E] leading-relaxed font-medium pl-5">
                {area.cocokReason}
              </p>
            </div>

            <div className="p-3.5 sm:p-4 rounded-2xl bg-[#FFF9E6] border border-[#D4A017]/30 space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-[#6E4E00]">
                <Scale size={14} className="text-[#B37400] shrink-0" />
                <span>Kompromi Nyata:</span>
              </div>
              <p className="text-xs text-[#523A00] leading-relaxed font-medium pl-5">
                {area.tradeoffReason}
              </p>
            </div>
          </div>

          {/* 1. Akses Transit & Mobilitas */}
          <div className="space-y-3 pt-1">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#001E2B]">
              <Train size={15} className="text-[#00684A] shrink-0" />
              <span>1. Mobilitas & Akses Transit Riil</span>
            </div>
            <div className="space-y-2">
              {area.transitOptions.map((opt, idx) => (
                <div
                  key={idx}
                  className="p-3 sm:p-3.5 rounded-2xl bg-[#F4F7F8] border border-[#E1E5E8] flex items-center justify-between gap-2 text-xs"
                >
                  <div className="min-w-0 flex-1">
                    <span className="font-bold text-[#001E2B] block truncate">
                      {opt.label}
                    </span>
                    <span className="text-[#5C6C7A] text-[11px] font-medium block truncate">
                      {opt.interval}
                    </span>
                  </div>
                  <span className="font-bold text-[#00684A] bg-white px-2.5 py-1 rounded-lg border border-[#E1E5E8] shadow-2xs shrink-0 whitespace-nowrap">
                    {opt.distance}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 2. Fasilitas Esensial Radius 1–3 km */}
          <div className="space-y-3 pt-1">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#001E2B]">
              <Building2 size={15} className="text-[#00684A] shrink-0" />
              <span>2. Fasilitas Esensial Sekitar</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-3 rounded-2xl bg-[#F4F7F8] border border-[#E1E5E8] space-y-1">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#5C6C7A]">
                  <Hospital size={12} className="text-[#DC2626] shrink-0" />
                  <span>Rumah Sakit:</span>
                </div>
                <span className="font-bold text-[#001E2B] block leading-tight truncate">
                  {area.essentialFacilities.hospital}
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-[#F4F7F8] border border-[#E1E5E8] space-y-1">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#5C6C7A]">
                  <GraduationCap
                    size={12}
                    className="text-[#7C3AED] shrink-0"
                  />
                  <span>Pendidikan:</span>
                </div>
                <span className="font-bold text-[#001E2B] block leading-tight truncate">
                  {area.essentialFacilities.school}
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-[#F4F7F8] border border-[#E1E5E8] space-y-1">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#5C6C7A]">
                  <Store size={12} className="text-[#0891B2] shrink-0" />
                  <span>Belanja / Pasar:</span>
                </div>
                <span className="font-bold text-[#001E2B] block leading-tight truncate">
                  {area.essentialFacilities.market}
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-[#F4F7F8] border border-[#E1E5E8] space-y-1">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#5C6C7A]">
                  <Compass size={12} className="text-[#16A34A] shrink-0" />
                  <span>Jarak Stasiun:</span>
                </div>
                <span className="font-bold text-[#00684A] block leading-tight truncate">
                  {area.essentialFacilities.transitKm}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Sticky Bottom Sheet Footer */}
        <div className="p-4 sm:p-5 bg-white border-t border-[#E1E5E8] flex items-center justify-between gap-3 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="min-h-[44px] px-5 py-2.5 rounded-full border border-[#D7E1E5] text-xs font-bold text-[#5C6C7A] hover:text-[#001E2B] hover:bg-[#F4F7F6] transition-all cursor-pointer active:scale-95 shrink-0"
          >
            Tutup
          </button>

          <button
            type="button"
            onClick={() => {
              onClose()
              onSelectForEvaluation(area)
            }}
            className="min-h-[44px] flex-1 py-2.5 px-4 sm:px-5 rounded-full bg-[#00ED64] hover:bg-[#00B545] text-[#001E2B] font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-md transition-all active:scale-95 cursor-pointer"
          >
            <span>Evaluasi Rumah di Koridor Ini</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </div>
  )
}
