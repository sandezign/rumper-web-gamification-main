import React from "react"
import {
  X,
  Check,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  MapPin,
  Clock,
  Coins,
  Mountain,
  Scale,
  Train,
  Building2,
} from "lucide-react"
import type { CuratedArea } from "../../data/mockCuratedAreas"

interface AreaComparisonModalProps {
  isOpen: boolean
  areas: CuratedArea[]
  onClose: () => void
  onSelectArea: (area: CuratedArea) => void
}

export default function AreaComparisonModal({
  isOpen,
  areas,
  onClose,
  onSelectArea,
}: AreaComparisonModalProps) {
  if (!isOpen || areas.length === 0) return null

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col justify-end md:justify-center md:items-center p-0 md:p-8 bg-[#001E2B]/75 backdrop-blur-md animate-fadeIn select-none"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl max-h-[92dvh] md:max-h-[90vh] bg-white rounded-t-[28px] md:rounded-3xl border-t md:border border-[#E1E5E8] shadow-2xl flex flex-col overflow-hidden text-[#001E2B] animate-slideUp md:animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Top Header */}
        <div className="p-5 pt-3 md:p-6 bg-[#001E2B] text-white flex flex-col relative overflow-hidden border-b border-white/10 shrink-0">
          {/* Mobile Bottom Sheet Grab Handle */}
          <div className="w-12 h-1.5 bg-white/30 rounded-full mx-auto mb-3 shrink-0 md:hidden" />

          {/* Subtle glow */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#00ED64]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex items-center justify-between relative z-10">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#00ED64]/20 text-[#00ED64] border border-[#00ED64]/30">
                  Matriks Perbandingan
                </span>
                <span className="text-xs text-[#A8B3BC] font-semibold">
                  {areas.length} Area Terpilih
                </span>
              </div>
              <h2 className="text-lg md:text-xl font-black text-white tracking-tight">
                Perbandingan Side-by-Side Area
              </h2>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer relative z-10 shrink-0"
              aria-label="Tutup"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Scrollable Matrix Table Content */}
        <div className="flex-1 overflow-auto custom-scrollbar p-6">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-[#E1E5E8]">
                <th className="p-4 pl-0 font-extrabold text-[#7C8C9A] uppercase tracking-wider w-44">
                  Parameter
                </th>
                {areas.map((area) => {
                  const isStrongFit = area.category === "strong-fit"
                  const isTradeoff = area.category === "interesting-tradeoff"
                  const dotColor = isStrongFit
                    ? "bg-[#00B545]"
                    : isTradeoff
                      ? "bg-[#D4A017]"
                      : "bg-[#D9383A]"

                  return (
                    <th
                      key={area.id}
                      className="p-4 font-black text-[#001E2B] min-w-[240px]"
                    >
                      <div className="space-y-2">
                        {area.imageUrl && (
                          <div className="relative w-full h-24 rounded-xl overflow-hidden shadow-2xs border border-[#E1E5E8] bg-[#001E2B]">
                            <img
                              src={area.imageUrl}
                              alt={area.name}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                          </div>
                        )}
                        <span
                          className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full border inline-flex items-center gap-1 ${
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
                        <h4 className="text-base font-black text-[#001E2B] leading-tight">
                          {area.name}
                        </h4>
                        <span className="text-[11px] font-semibold text-[#7C8C9A] flex items-center gap-1">
                          <MapPin size={10} />
                          {area.region}
                        </span>
                      </div>
                    </th>
                  )
                })}
              </tr>
            </thead>

            <tbody className="divide-y divide-[#E1E5E8]">
              {/* Row: Waktu Komuter */}
              <tr>
                <td className="p-4 pl-0 font-extrabold text-[#001E2B] bg-[#F9FBFA]">
                  <div className="flex items-center gap-2">
                    <Clock size={15} className="text-[#00684A]" />
                    <span>Waktu Komuter (ke Sudirman)</span>
                  </div>
                </td>
                {areas.map((area) => (
                  <td
                    key={area.id}
                    className="p-4 font-black text-sm text-[#001E2B]"
                  >
                    {area.commuteTime}
                    <span className="block text-[11px] font-medium text-[#5C6C7A] mt-0.5">
                      {area.commuteMode}
                    </span>
                  </td>
                ))}
              </tr>

              {/* Row: Harga */}
              <tr>
                <td className="p-4 pl-0 font-extrabold text-[#001E2B] bg-[#F9FBFA]">
                  <div className="flex items-center gap-2">
                    <Coins size={15} className="text-[#00684A]" />
                    <span>Kisaran Harga Rumah</span>
                  </div>
                </td>
                {areas.map((area) => (
                  <td
                    key={area.id}
                    className="p-4 font-black text-sm text-[#001E2B]"
                  >
                    {area.priceRange}
                    <span className="block text-[11px] font-normal text-[#5C6C7A] mt-0.5">
                      Tipe 2 Lantai
                    </span>
                  </td>
                ))}
              </tr>

              {/* Row: Elevasi */}
              <tr>
                <td className="p-4 pl-0 font-extrabold text-[#001E2B] bg-[#F9FBFA]">
                  <div className="flex items-center gap-2">
                    <Mountain size={15} className="text-[#00684A]" />
                    <span>Elevasi & Drainase</span>
                  </div>
                </td>
                {areas.map((area) => (
                  <td key={area.id} className="p-4 font-bold text-[#00684A]">
                    {area.elevationDpl} ({area.elevationScore})
                    <span className="block text-[11px] font-normal text-[#5C6C7A] mt-0.5">
                      Drainase gravitasi alami
                    </span>
                  </td>
                ))}
              </tr>

              {/* Row: Cocok */}
              <tr>
                <td className="p-4 pl-0 font-extrabold text-[#004F38] bg-[#E9F5EF]/40">
                  <div className="flex items-center gap-2">
                    <Sparkles size={15} className="text-[#00684A]" />
                    <span>Kelebihan</span>
                  </div>
                </td>
                {areas.map((area) => (
                  <td
                    key={area.id}
                    className="p-4 text-[#003D2E] font-medium leading-relaxed"
                  >
                    {area.cocokReason}
                  </td>
                ))}
              </tr>

              {/* Row: Trade-off */}
              <tr>
                <td className="p-4 pl-0 font-extrabold text-[#6E4E00] bg-[#FFF9E6]/40">
                  <div className="flex items-center gap-2">
                    <Scale size={15} className="text-[#B37400]" />
                    <span>Pertimbangan</span>
                  </div>
                </td>
                {areas.map((area) => (
                  <td
                    key={area.id}
                    className="p-4 text-[#523A00] font-medium leading-relaxed"
                  >
                    {area.tradeoffReason}
                  </td>
                ))}
              </tr>

              {/* Row: Akses Transit Terdekat */}
              <tr>
                <td className="p-4 pl-0 font-extrabold text-[#001E2B] bg-[#F9FBFA]">
                  <div className="flex items-center gap-2">
                    <Train size={15} className="text-[#00684A]" />
                    <span>Akses Transit Terdekat</span>
                  </div>
                </td>
                {areas.map((area) => (
                  <td key={area.id} className="p-4 text-[#3D4F5B]">
                    {area.transitOptions.map((opt, i) => (
                      <div key={i} className="mb-1 last:mb-0">
                        <span className="font-bold text-[#001E2B]">
                          {opt.label}:
                        </span>{" "}
                        <span className="text-[#5C6C7A]">{opt.distance}</span>
                      </div>
                    ))}
                  </td>
                ))}
              </tr>

              {/* Row: Fasilitas RS & Sekolah */}
              <tr>
                <td className="p-4 pl-0 font-extrabold text-[#001E2B] bg-[#F9FBFA]">
                  <div className="flex items-center gap-2">
                    <Building2 size={15} className="text-[#00684A]" />
                    <span>Fasilitas Utama Sekitar</span>
                  </div>
                </td>
                {areas.map((area) => (
                  <td key={area.id} className="p-4 text-[#3D4F5B] space-y-1">
                    <div>
                      <span className="font-bold text-[#001E2B]">RS:</span>{" "}
                      <span className="text-[#5C6C7A]">
                        {area.essentialFacilities.hospital}
                      </span>
                    </div>
                    <div>
                      <span className="font-bold text-[#001E2B]">Sekolah:</span>{" "}
                      <span className="text-[#5C6C7A]">
                        {area.essentialFacilities.school}
                      </span>
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Modal Bottom Actions */}
        <div className="p-4 sm:p-5 bg-[#F9FBFA] border-t border-[#E1E5E8] flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-3 shrink-0 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:pb-5">
          <button
            type="button"
            onClick={onClose}
            className="min-h-[44px] sm:min-h-[38px] px-5 py-2 rounded-full border border-[#D7E1E5] text-xs font-bold text-[#5C6C7A] hover:bg-white hover:text-[#001E2B] transition-all cursor-pointer flex items-center justify-center"
          >
            Tutup Perbandingan
          </button>

          <div className="flex items-center justify-end gap-3">
            <span className="text-xs text-[#5C6C7A] font-semibold hidden sm:inline">
              Pilih satu area untuk dievaluasi dengan kuota
            </span>
            {areas.length > 0 && (
              <button
                type="button"
                onClick={() => onSelectArea(areas[0])}
                className="w-full sm:w-auto min-h-[44px] sm:min-h-[38px] px-5 py-2.5 rounded-full bg-[#00ED64] hover:bg-[#00B545] text-[#001E2B] font-extrabold text-xs flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95 cursor-pointer"
              >
                <span>Evaluasi {areas[0].name.split("&")[0]}</span>
                <ArrowRight size={14} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
