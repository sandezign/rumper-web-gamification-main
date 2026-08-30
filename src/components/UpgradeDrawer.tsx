import { useState, useEffect, useRef } from "react"
import {
  X,
  Check,
  ShieldCheck,
  Zap,
  ArrowRight,
  BadgeCheck,
  Lock,
} from "lucide-react"
import type { PricingTierKey } from "./InAppCheckoutModal"

interface UpgradeDrawerProps {
  open: boolean
  onClose: () => void
  onProceedToCheckout: (tier: PricingTierKey) => void
  propertyName?: string
  initialTier?: PricingTierKey
}

interface TierOption {
  key: PricingTierKey
  title: string
  badgeTheme: { bg: string; text: string; border: string }
  price: string
  originalPrice: string
  discountTag?: string
  deliverableLine: string
  highlightFeatures: string[]
}

const TIERS: TierOption[] = [
  {
    key: "bundle",
    title: "Property Shortlist Bundle",
    badgeTheme: {
      bg: "bg-[#E9F5EF]",
      text: "text-[#00684A]",
      border: "border-[#318266]/25",
    },
    price: "Rp 120.000",
    originalPrice: "Rp 450.000",
    discountTag: "-73%",
    deliverableLine: "3 Properti • Komparasi side-by-side",
    highlightFeatures: [
      "Akses penuh 5 faktor risiko (Banjir, Transit, Legalitas, Fasilitas, Lingkungan) untuk 3 properti",
      "Matriks komparasi side-by-side antar kandidat properti",
      "Rute transit komuter KRL/Tol & layer banjir BNPB lengkap",
      "Ekspor PDF ringkasan due diligence seumur hidup",
      "+3 Kuota kapasitas evaluasi properti baru",
    ],
  },
  {
    key: "single",
    title: "Single Property Pass",
    badgeTheme: {
      bg: "bg-slate-100",
      text: "text-[#334155]",
      border: "border-slate-300",
    },
    price: "Rp 50.000",
    originalPrice: "Rp 150.000",
    discountTag: "-67%",
    deliverableLine: "1 Properti aktif • 5 faktor risiko",
    highlightFeatures: [
      "Akses penuh 5 faktor risiko untuk 1 properti aktif",
      "Verifikasi red flag & deteksi genangan historis BNPB",
      "Rincian timeline komuter KRL, Tol & Arteri",
      "Checklist due diligence lapangan interaktif",
      "Direktori radius fasilitas esensial terdekat",
    ],
  },
  {
    key: "analyst",
    title: "Expert Field Verification",
    badgeTheme: {
      bg: "bg-[#E9F5EF]",
      text: "text-[#00684A]",
      border: "border-[#318266]/25",
    },
    price: "Rp 350.000",
    originalPrice: "Rp 750.000",
    discountTag: "-53%",
    deliverableLine: "Verifikasi GIS & surveyor lapangan resmi",
    highlightFeatures: [
      "Seluruh fitur digital (Akses 5 Faktor Risiko untuk 3 properti)",
      "Laporan bersertifikat & verifikasi spasial resmi",
      "Lembar rekomendasi survei fisik khusus 12-titik",
      "Garansi laporan terbit dalam 24 Jam Kerja",
      "30 Menit sesi konsultasi privat via WhatsApp Call",
    ],
  },
]

export default function UpgradeDrawer({
  open,
  onClose,
  onProceedToCheckout,
  propertyName = "Grand Galaxy City Block R",
  initialTier = "bundle",
}: UpgradeDrawerProps) {
  const [selectedTier, setSelectedTier] = useState<PricingTierKey>(initialTier)
  const [dragY, setDragY] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const touchStartY = useRef(0)

  useEffect(() => {
    if (initialTier) setSelectedTier(initialTier)
  }, [initialTier])

  // Listen to Escape key to dismiss drawer
  useEffect(() => {
    if (!open) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [open, onClose])

  // Reset drag state when open changes
  useEffect(() => {
    if (!open) {
      setDragY(0)
      setIsDragging(false)
    }
  }, [open])

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY
    setIsDragging(true)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return
    const currentY = e.touches[0].clientY
    const deltaY = currentY - touchStartY.current
    if (deltaY > 0) {
      setDragY(deltaY)
    } else {
      setDragY(0)
    }
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
    if (dragY > 85) {
      onClose()
    } else {
      setDragY(0)
    }
  }

  const activeTierConfig = TIERS.find((t) => t.key === selectedTier) || TIERS[0]

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[1999] flex items-end sm:items-center justify-end select-none animate-fadeIn">
      {/* Apple-style Frosted Backdrop */}
      <div
        className="fixed inset-0 bg-[#001E2B]/50 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Responsive Inset Drawer Surface */}
      <aside
        className={`fixed bottom-0 left-0 right-0 z-[2000] flex flex-col bg-[#F9FBFA] shadow-2xl rounded-t-[32px] max-h-[92dvh] sm:top-0 sm:right-0 sm:left-auto sm:bottom-0 sm:h-full sm:w-[480px] sm:max-h-none sm:rounded-t-none sm:rounded-l-[32px] overflow-hidden border-l border-black/5 ${
          isDragging
            ? "transition-none"
            : "transition-transform duration-300 ease-out"
        } ${
          open
            ? "translate-y-0 sm:translate-x-0"
            : "translate-y-full sm:translate-y-0 sm:translate-x-full"
        }`}
        style={
          dragY > 0
            ? { transform: `translateY(${dragY}px)` }
            : undefined
        }
        role="dialog"
        aria-modal="true"
        aria-label="Pilih Paket Upgrade Rumper"
      >
        {/* Apple Human Interface Navigation Header */}
        <header
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="relative bg-[#001E2B] px-6 pt-3 pb-5 shrink-0 border-b border-white/10 text-white overflow-hidden cursor-grab active:cursor-grabbing sm:cursor-default"
        >
          {/* iOS Grab Handle for Mobile Bottom Sheet */}
          <div
            className="flex justify-center pt-1 pb-3 sm:hidden"
            aria-hidden="true"
          >
            <div className="w-12 h-1.5 rounded-full bg-white/30" />
          </div>

          {/* Ambient Lighting Glow */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#00ED64]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex items-start justify-between gap-4 relative z-10">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#00ED64]/15 border border-[#00ED64]/30 text-[#00ED64] text-[10px] font-extrabold uppercase tracking-wider">
                  <Zap size={11} className="fill-current" /> Paket Akses
                </span>
                <span className="text-[11px] text-[#A8B3BC] font-medium">
                  {propertyName}
                </span>
              </div>
              <h2 className="text-xl md:text-2xl font-black text-white tracking-tight leading-tight">
                Buka Analisis & Due Diligence
              </h2>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer shrink-0 active:scale-95"
              aria-label="Tutup modal upgrade"
            >
              <X size={18} />
            </button>
          </div>
        </header>

        {/* Scrollable Body: Inset Grouped Cards */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4">
          <div className="flex items-center justify-between px-1">
            <span className="text-[11px] font-black uppercase tracking-wider text-[#7C8C9A]">
              Pilihan Paket Akses
            </span>
            <span className="text-[11px] text-[#5C6C7A] font-medium">
              Sekali bayar • Tanpa langganan
            </span>
          </div>

          {/* 3 Selectable Tier Cards (Apple Inset Native Rows) */}
          <div className="space-y-3">
            {TIERS.map((tier) => {
              const isSelected = selectedTier === tier.key

              return (
                <div
                  key={tier.key}
                  onClick={() => setSelectedTier(tier.key)}
                  className={`rounded-[20px] p-3.5 sm:p-4 transition-all duration-200 cursor-pointer relative border select-none ${
                    isSelected
                      ? "bg-white border-[#001E2B] shadow-[0_8px_24px_rgba(0,30,43,0.08)] ring-2 ring-[#001E2B]/10"
                      : "bg-white/90 border-[#E5E5EA] hover:border-[#CBD5E1] hover:bg-white active:scale-[0.985]"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {/* Apple Style Selection Indicator */}
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center transition-all shrink-0 mt-0.5 ${
                        isSelected
                          ? "bg-[#001E2B] text-[#00ED64]"
                          : "border-2 border-[#CBD5E1] bg-white"
                      }`}
                    >
                      {isSelected && (
                        <Check size={12} className="stroke-[3]" />
                      )}
                    </div>

                    {/* Main Content Area: 2 Clean Rows */}
                    <div className="flex-1 min-w-0">
                      {/* Row 1: Title on Left | Price & Discount Tag on Right */}
                      <div className="flex items-baseline justify-between gap-2">
                        <span className="text-sm font-extrabold text-[#001E2B] tracking-tight truncate">
                          {tier.title}
                        </span>

                        {/* Price + Discount Tag (DM Sans Font) */}
                        <div className="flex items-center gap-1.5 shrink-0 pl-1">
                          <span className="text-sm sm:text-base font-black text-[#001E2B] tracking-tight leading-none">
                            {tier.price}
                          </span>
                          {tier.discountTag && (
                            <span
                              className={`text-[10px] font-black uppercase px-1.5 py-0.5 rounded-md border leading-none ${tier.badgeTheme.bg} ${tier.badgeTheme.text} ${tier.badgeTheme.border}`}
                            >
                              {tier.discountTag}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Row 2: Sub-Deliverables on Left | Strikethrough on Right */}
                      <div className="flex items-center justify-between gap-2 mt-1">
                        <p className="text-[11px] sm:text-xs text-[#5C6C7A] font-medium">
                          {tier.deliverableLine}
                        </p>

                        <div className="shrink-0 pl-1">
                          <span className="text-[11px] text-[#8E8E93] line-through">
                            {tier.originalPrice}
                          </span>
                        </div>
                      </div>

                      {/* In-Card Feature Expansion for Active Selection */}
                      {isSelected && (
                        <div className="mt-3.5 pt-3.5 border-t border-[#E5E5EA] space-y-2 animate-fadeIn">
                          <span className="text-[10px] font-black uppercase tracking-wider text-[#7C8C9A] block">
                            Fitur yang kamu buka:
                          </span>
                          <ul className="space-y-1.5">
                            {tier.highlightFeatures.map((feature, idx) => (
                              <li
                                key={idx}
                                className="flex items-start gap-2 text-xs text-[#1C1C1E] font-medium leading-relaxed"
                              >
                                <BadgeCheck
                                  size={15}
                                  className="text-[#00684A] shrink-0 mt-0.5"
                                />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Apple-style Data Provenance Footnote */}
          <div className="pt-2 px-2 flex items-center justify-center gap-2 text-center text-xs text-[#636366]">
            <ShieldCheck size={14} className="text-[#34C759] shrink-0" />
            <span>Data spasial deterministik terverifikasi BNPB, BIG & Dishub</span>
          </div>
        </div>

        {/* Apple-Style Floating Sticky Footer */}
        <footer className="p-4 sm:p-5 bg-white/95 backdrop-blur-md border-t border-[#E5E5EA] shrink-0 space-y-2">
          <button
            type="button"
            onClick={() => {
              onClose()
              onProceedToCheckout(selectedTier)
            }}
            className="w-full min-h-[50px] px-6 py-3 rounded-full bg-[#001E2B] hover:bg-[#061E28] text-white font-extrabold text-sm flex items-center justify-between transition-all active:scale-[0.98] cursor-pointer shadow-lg group border border-white/10"
          >
            <div className="flex items-center gap-2">
              <span>Lanjutkan Pembayaran</span>
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform text-[#00ED64]"
              />
            </div>
            <span className="text-[#00ED64] font-black text-base tracking-tight">
              {activeTierConfig.price}
            </span>
          </button>
          <p className="text-[10px] text-center text-[#8E8E93] flex items-center justify-center gap-1">
            <Lock size={11} className="text-slate-400" aria-hidden="true" />
            <span>Pembayaran instan via Midtrans (QRIS, BCA, Mandiri, BRI, BNI)</span>
          </p>
        </footer>
      </aside>
    </div>
  )
}


