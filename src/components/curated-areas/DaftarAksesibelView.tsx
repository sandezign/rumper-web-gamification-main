import React from 'react'
import {
  Bookmark,
  Sparkles,
  Scale,
  ArrowRight,
  MapPin,
  Train,
  Check,
  Clock,
  Coins,
  Mountain,
} from 'lucide-react'
import type { CuratedArea } from '../../data/mockCuratedAreas'

interface DaftarAksesibelViewProps {
  areas: CuratedArea[]
  onToggleBookmark: (id: string) => void
  onOpenDrawer: (area: CuratedArea) => void
  onEvaluateArea: (area: CuratedArea) => void
}

export default function DaftarAksesibelView({
  areas,
  onToggleBookmark,
  onOpenDrawer,
  onEvaluateArea,
}: DaftarAksesibelViewProps) {
  if (areas.length === 0) {
    return (
      <div className="p-12 text-center bg-white rounded-3xl border border-[#E1E5E8] text-[#5C6C7A] space-y-3 shadow-xs">
        <div className="w-12 h-12 rounded-2xl bg-[#E9F5EF] text-[#00684A] flex items-center justify-center mx-auto border border-[#318266]/20">
          <Sparkles size={24} />
        </div>
        <h3 className="text-base font-extrabold text-[#001E2B]">Tidak Ada Area dalam Kategori Ini</h3>
        <p className="text-xs text-[#5C6C7A] max-w-md mx-auto">
          Pilih filter kategori keselarasan lain di atas untuk meninjau opsi koridor Jabodetabek lainnya.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 animate-fadeIn pb-12">
      {areas.map((area) => {
        const isStrongFit = area.category === 'strong-fit'
        const isTradeoff = area.category === 'interesting-tradeoff'
        const dotColor = isStrongFit ? 'bg-[#00B545]' : isTradeoff ? 'bg-[#D4A017]' : 'bg-[#D9383A]'

        return (
          <div
            key={area.id}
            className="bg-white rounded-3xl p-5 md:p-6 border border-[#E1E5E8] shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between space-y-4 select-none"
          >
            {/* Card Header: Category Badge + Region + Bookmark */}
            <div className="flex items-center justify-between gap-2">
              <span
                className={`text-[10px] font-extrabold px-3 py-1 rounded-full border flex items-center gap-1.5 shrink-0 ${
                  isStrongFit
                    ? 'bg-[#DCEEE7] text-[#004F38] border-[#318266]/30'
                    : isTradeoff
                    ? 'bg-[#FFF3D6] text-[#6E4E00] border-[#D4A017]/30'
                    : 'bg-[#FFE2E0] text-[#7A1D1A] border-[#D9383A]/30'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dotColor}`} />
                <span>{area.categoryLabel}</span>
              </span>

              <div className="flex items-center gap-2 min-w-0">
                <span className="text-xs text-[#5C6C7A] font-semibold hidden sm:inline-flex items-center gap-1 truncate">
                  <MapPin size={12} className="text-[#7C8C9A] shrink-0" />
                  <span className="truncate">{area.region}</span>
                </span>
                <button
                  type="button"
                  onClick={() => onToggleBookmark(area.id)}
                  title={area.isShortlisted ? 'Hapus dari Shortlist' : 'Simpan ke Shortlist'}
                  className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all cursor-pointer shrink-0 ${
                    area.isShortlisted
                      ? 'bg-[#001E2B] text-[#00ED64] border-[#001E2B] shadow-xs'
                      : 'bg-[#F4F7F6] text-[#7C8C9A] border-[#E1E5E8] hover:text-[#001E2B] hover:bg-[#EAEFEF]'
                  }`}
                >
                  <Bookmark size={13} className={area.isShortlisted ? 'fill-[#00ED64]' : ''} />
                </button>
              </div>
            </div>

            {/* Title & Region for mobile */}
            <div>
              <h3 className="text-lg md:text-xl font-black text-[#001E2B] tracking-tight">
                {area.name}
              </h3>
              <p className="text-xs text-[#5C6C7A] font-medium mt-0.5 sm:hidden flex items-center gap-1">
                <MapPin size={11} className="text-[#7C8C9A]" />
                {area.region}
              </p>
            </div>

            {/* 3 Metrics Box Grid */}
            <div className="grid grid-cols-3 gap-1.5 text-center">
              <div className="bg-[#F4F7F8] p-2 sm:p-2.5 rounded-2xl border border-[#E1E5E8]">
                <span className="text-[9px] sm:text-[10px] font-bold text-[#7C8C9A] uppercase tracking-wider flex items-center justify-center gap-1">
                  <Clock size={11} className="shrink-0" />
                  <span>Komuter</span>
                </span>
                <span className="text-xs sm:text-sm font-black text-[#001E2B] mt-0.5 block truncate">
                  {area.commuteTime}
                </span>
              </div>
              <div className="bg-[#F4F7F8] p-2 sm:p-2.5 rounded-2xl border border-[#E1E5E8]">
                <span className="text-[9px] sm:text-[10px] font-bold text-[#7C8C9A] uppercase tracking-wider flex items-center justify-center gap-1">
                  <Coins size={11} className="shrink-0" />
                  <span>Harga</span>
                </span>
                <span className="text-xs sm:text-sm font-black text-[#001E2B] mt-0.5 block truncate">
                  {area.priceRange}
                </span>
              </div>
              <div className="bg-[#F4F7F8] p-2 sm:p-2.5 rounded-2xl border border-[#E1E5E8]">
                <span className="text-[9px] sm:text-[10px] font-bold text-[#7C8C9A] uppercase tracking-wider flex items-center justify-center gap-1">
                  <Mountain size={11} className="shrink-0" />
                  <span>Elevasi</span>
                </span>
                <span className="text-xs sm:text-sm font-black text-[#00684A] mt-0.5 block truncate">
                  {area.elevationDpl}
                </span>
              </div>
            </div>

            {/* Cocok & Trade-off Callout Boxes */}
            <div className="space-y-2 text-xs flex-1">
              <div className="p-3.5 rounded-2xl bg-[#E9F5EF] border border-[#318266]/30 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-[#004F38]">
                  <Sparkles size={13} className="text-[#00684A] shrink-0" />
                  <span>Mengapa Selaras:</span>
                </div>
                <p className="text-[#003D2E] leading-relaxed font-medium pl-4">
                  {area.cocokReason}
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#FFF9E6] border border-[#D4A017]/30 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-[#6E4E00]">
                  <Scale size={13} className="text-[#B37400] shrink-0" />
                  <span>Kompromi Nyata:</span>
                </div>
                <p className="text-[#523A00] leading-relaxed font-medium pl-4">
                  {area.tradeoffReason}
                </p>
              </div>
            </div>

            {/* Card Action Buttons */}
            <div className="pt-3 flex items-center justify-between gap-2.5 border-t border-[#F0F4F6]">
              <button
                type="button"
                onClick={() => onOpenDrawer(area)}
                className="px-3.5 py-2 rounded-full border border-[#D7E1E5] text-xs font-bold text-[#5C6C7A] hover:bg-[#F4F7F6] hover:text-[#001E2B] transition-all cursor-pointer whitespace-nowrap"
              >
                Detail Koridor
              </button>

              <button
                type="button"
                onClick={() => onEvaluateArea(area)}
                className="flex-1 py-2 px-3 rounded-full bg-[#00ED64] hover:bg-[#00B545] text-[#001E2B] font-extrabold text-xs flex items-center justify-center gap-1 shadow-sm transition-all active:scale-95 cursor-pointer whitespace-nowrap"
              >
                <span>Evaluasi Rumah Ini</span>
                <ArrowRight size={14} className="shrink-0" />
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}
