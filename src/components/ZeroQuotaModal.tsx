import React from "react"
import { AlertCircle, Zap, ShieldCheck, X, Sparkles, ArrowRight, Bookmark, Check } from "lucide-react"

interface ZeroQuotaModalProps {
  isOpen: boolean
  onClose: () => void
  onSelectTier: (tier: "single" | "bundle") => void
  onOpenArchive?: () => void
  auditedCount?: number
}

export default function ZeroQuotaModal({
  isOpen,
  onClose,
  onSelectTier,
  onOpenArchive,
  auditedCount = 5,
}: ZeroQuotaModalProps) {
  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[2999] flex items-center justify-center p-4 bg-[#001E2B]/50 backdrop-blur-md animate-fadeIn select-none"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-white/95 backdrop-blur-2xl rounded-[30px] border border-black/10 shadow-[0_24px_60px_rgba(0,30,43,0.18)] overflow-hidden p-6 sm:p-7 animate-slideUp text-[#001E2B]"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Batas Kuota Gratis Tercapai"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center text-[#5C6C7A] hover:text-[#001E2B] transition-all cursor-pointer active:scale-90"
          aria-label="Tutup"
        >
          <X size={16} />
        </button>

        {/* Top Status Pill */}
        <div className="flex items-center gap-2 mb-2.5">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-800 text-[11px] font-semibold tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            Kuota Gratis Selesai ({auditedCount}/{auditedCount})
          </span>
        </div>

        {/* Title & Body */}
        <h3 className="text-xl sm:text-2xl font-bold text-[#001E2B] tracking-tight leading-tight mb-1.5">
          Buka Investigasi Lokasi Baru
        </h3>
        <p className="text-xs sm:text-sm text-[#5C6C7A] leading-relaxed mb-6">
          Semua {auditedCount} data properti kamu tersimpan aman di arsip. Pilih paket akses untuk evaluasi lokasi berikutnya:
        </p>

        {/* Action Choices - 2 Column Cards (Title under Icon) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {/* Single Pass Card */}
          <button
            type="button"
            onClick={() => {
              onClose()
              onSelectTier("single")
            }}
            className="w-full p-4 rounded-[22px] bg-[#F8F9FA] hover:bg-[#F2F4F5] border border-[#E5E5EA] shadow-xs flex flex-col justify-between transition-all duration-200 active:scale-[0.97] cursor-pointer text-left group relative"
          >
            <div>
              {/* Icon */}
              <div className="w-10 h-10 rounded-2xl bg-white border border-black/5 flex items-center justify-center text-[#001E2B] shadow-xs group-hover:scale-105 transition-transform">
                <Zap size={18} className="text-[#001E2B]" />
              </div>

              {/* Title under icon */}
              <h4 className="text-sm sm:text-base font-bold text-[#001E2B] mt-3">
                Single Pass
              </h4>
              <p className="text-xs text-[#5C6C7A] mt-0.5">
                Akses penuh 1 rumah
              </p>
            </div>

            {/* Price & Action */}
            <div className="mt-4 pt-3 border-t border-black/5">
              <div className="flex items-baseline gap-1.5">
                <span className="text-base sm:text-lg font-bold text-[#001E2B] font-mono tabular-nums">
                  Rp 50.000
                </span>
                <span className="text-[10px] text-[#8E8E93] line-through font-mono">
                  Rp 150.000
                </span>
              </div>
              <div className="mt-2.5 w-full py-1.5 px-2.5 rounded-xl bg-white text-[#001E2B] border border-black/5 text-[11px] font-semibold text-center group-hover:bg-[#E5E5EA] transition-colors">
                Pilih 1 Lokasi
              </div>
            </div>
          </button>

          {/* Bundle Choice Card (Best Value / Recommended) */}
          <button
            type="button"
            onClick={() => {
              onClose()
              onSelectTier("bundle")
            }}
            className="w-full p-4 rounded-[22px] bg-white border-2 border-[#001E2B] shadow-[0_8px_24px_rgba(0,30,43,0.08)] flex flex-col justify-between transition-all duration-200 active:scale-[0.97] cursor-pointer text-left group relative overflow-hidden"
          >
            <div>
              {/* Top Row: Icon + Discount Badge */}
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-[#001E2B] flex items-center justify-center text-[#00ED64] shadow-xs group-hover:scale-105 transition-transform">
                  <Sparkles size={18} />
                </div>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-[#E9F5EF] text-[#00684A] border border-[#318266]/20">
                  HEMAT 73%
                </span>
              </div>

              {/* Title under icon */}
              <h4 className="text-sm sm:text-base font-bold text-[#001E2B] mt-3">
                Shortlist Bundle
              </h4>
              <p className="text-xs text-[#5C6C7A] mt-0.5">
                3 Properti + Komparasi
              </p>
            </div>

            {/* Price & Action */}
            <div className="mt-4 pt-3 border-t border-black/5">
              <div className="flex items-baseline justify-between">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-base sm:text-lg font-bold text-[#001E2B] font-mono tabular-nums">
                    Rp 120.000
                  </span>
                  <span className="text-[10px] text-[#8E8E93] line-through font-mono">
                    Rp 450.000
                  </span>
                </div>
                <span className="text-[10px] font-semibold text-[#00684A]">
                  40rb/rumah
                </span>
              </div>
              <div className="mt-2.5 w-full py-1.5 px-2.5 rounded-xl bg-[#001E2B] text-[#00ED64] text-[11px] font-bold text-center flex items-center justify-center gap-1 group-hover:bg-[#003D4F] transition-colors">
                <span>Pilih Bundle</span>
                <ArrowRight size={12} />
              </div>
            </div>
          </button>
        </div>

        {/* Reassurance & Bottom Archive Link */}
        <div className="mt-5 pt-4 border-t border-black/5 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-[#5C6C7A] text-[11px]">
            <ShieldCheck size={14} className="text-[#00684A] shrink-0" />
            <span>Aktivasi otomatis & instan</span>
          </div>

          {onOpenArchive && (
            <button
              type="button"
              onClick={() => {
                onClose()
                onOpenArchive()
              }}
              className="text-[11px] sm:text-xs font-semibold text-[#00684A] hover:text-[#001E2B] hover:underline inline-flex items-center gap-1 cursor-pointer active:scale-95 transition-all"
            >
              <Bookmark size={12} />
              <span>Buka Arsip ({auditedCount})</span>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
