import React, { useState, useEffect } from "react"
import {
  X,
  QrCode,
  Building2,
  Wallet,
  Copy,
  Check,
  ShieldCheck,
  Clock,
  Sparkles,
  ArrowRight,
  Download,
  ChevronRight,
  Smartphone,
} from "lucide-react"

export type PricingTierKey = "single" | "bundle" | "analyst"

interface InAppCheckoutModalProps {
  isOpen: boolean
  onClose: () => void
  onPaymentSuccess: (tier: PricingTierKey) => void
  tier?: PricingTierKey
  propertyName?: string
}

const TIER_DETAILS: Record<
  PricingTierKey,
  {
    name: string
    priceRp: number
    priceFormatted: string
    originalPriceFormatted: string
    subtitle: string
  }
> = {
  single: {
    name: "Single Property Pass",
    priceRp: 50000,
    priceFormatted: "Rp 50.000",
    originalPriceFormatted: "Rp 150.000",
    subtitle: "Akses penuh Tahap 2–5 untuk 1 properti",
  },
  bundle: {
    name: "Property Shortlist Bundle",
    priceRp: 120000,
    priceFormatted: "Rp 120.000",
    originalPriceFormatted: "Rp 450.000",
    subtitle: "Akses 3 properti + matriks komparasi",
  },
  analyst: {
    name: "Expert Field Verification",
    priceRp: 350000,
    priceFormatted: "Rp 350.000",
    originalPriceFormatted: "Rp 750.000",
    subtitle: "Verifikasi GIS + laporan bersertifikat + konsultasi WA 30 min",
  },
}

type PaymentTab = "qris" | "va" | "ewallet"
type BankKey = "bca" | "mandiri" | "bri" | "bni"

const VA_ACCOUNTS: Record<BankKey, { bankName: string; vaNumber: string }> = {
  bca: { bankName: "BCA Virtual Account", vaNumber: "8801 2893 4109 4432" },
  mandiri: { bankName: "Mandiri Virtual Account", vaNumber: "8930 1198 4402 7819" },
  bri: { bankName: "BRI Virtual Account", vaNumber: "1098 4432 9901 2341" },
  bni: { bankName: "BNI Virtual Account", vaNumber: "9880 1289 4401 5567" },
}

export default function InAppCheckoutModal({
  isOpen,
  onClose,
  onPaymentSuccess,
  tier = "single",
  propertyName = "Grand Galaxy City Block R",
}: InAppCheckoutModalProps) {
  const [activeTab, setActiveTab] = useState<PaymentTab>("qris")
  const [selectedBank, setSelectedBank] = useState<BankKey>("bca")
  const [copied, setCopied] = useState(false)
  const [timeLeft, setTimeLeft] = useState(879) // ~14:39 in seconds
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const currentTier = TIER_DETAILS[tier] || TIER_DETAILS.single

  // Countdown timer for payment expiry
  useEffect(() => {
    if (!isOpen) return
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(timer)
  }, [isOpen])

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleCopyVA = () => {
    navigator.clipboard?.writeText(VA_ACCOUNTS[selectedBank].vaNumber.replace(/\s+/g, ""))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSimulateSuccess = () => {
    setIsProcessing(true)
    setTimeout(() => {
      setIsProcessing(false)
      setIsSuccess(true)
      setTimeout(() => {
        setIsSuccess(false)
        onPaymentSuccess(tier)
        onClose()
      }, 1400)
    }, 800)
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[3000] flex items-end sm:items-center justify-center sm:p-4 bg-[#001E2B]/60 backdrop-blur-md animate-fadeIn select-none"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-[#F9FBFA] rounded-t-[32px] sm:rounded-[32px] border border-black/10 shadow-[0_-12px_40px_rgba(0,30,43,0.2)] sm:shadow-[0_24px_60px_rgba(0,30,43,0.18)] overflow-hidden flex flex-col max-h-[92dvh] sm:max-h-[88vh] animate-slideUp text-[#001E2B]"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Midtrans Snap Checkout"
      >
        {/* Success Overlay Animation */}
        {isSuccess && (
          <div className="absolute inset-0 z-50 bg-[#001E2B] text-white flex flex-col items-center justify-center p-8 text-center animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-[#00ED64]/20 border-2 border-[#00ED64] flex items-center justify-center text-[#00ED64] mb-4 animate-bounce">
              <Check size={32} className="stroke-[3]" />
            </div>
            <span className="text-xs font-black uppercase tracking-wider text-[#00ED64] mb-1">
              Pembayaran Terverifikasi
            </span>
            <h3 className="text-2xl font-black text-white mb-2 tracking-tight">
              Analisis Lengkap Berhasil Dibuka!
            </h3>
            <p className="text-xs text-[#A8B3BC] max-w-sm leading-relaxed">
              Seluruh Tahap 2–5 untuk <strong>{propertyName}</strong> telah aktif. Membuka workspace...
            </p>
          </div>
        )}

        {/* Apple HIG Modal Header / Sheet Top */}
        <div className="px-5 pt-3 pb-5 sm:p-6 bg-[#001E2B] text-white shrink-0 relative overflow-hidden border-b border-white/10">
          {/* iOS Bottom Sheet Drag Handle (Mobile Only) */}
          <div className="w-10 h-1.5 rounded-full bg-white/25 mx-auto mb-3 sm:hidden shrink-0" />

          {/* Ambient Lighting Glow */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#00ED64]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex items-start justify-between gap-4 mb-3 relative z-10">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#00ED64]/15 border border-[#00ED64]/30 text-[#00ED64]">
                  Midtrans Snap
                </span>
                <span className="text-xs text-[#A8B3BC] font-mono tabular-nums flex items-center gap-1 bg-white/10 px-2.5 py-0.5 rounded-full border border-white/10">
                  <Clock size={11} className="text-[#00ED64]" /> {formatTimer(timeLeft)}
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight leading-tight">
                {currentTier.name}
              </h2>
              <p className="text-xs text-[#A8B3BC] truncate max-w-xs">
                Target: {propertyName}
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer shrink-0 active:scale-90"
              aria-label="Tutup checkout"
            >
              <X size={18} />
            </button>
          </div>

          {/* Amount Badge */}
          <div className="flex items-baseline justify-between pt-3 border-t border-white/10 relative z-10">
            <span className="text-xs font-medium text-[#A8B3BC]">Total Pembayaran:</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-[#00ED64] font-mono tabular-nums tracking-tight">
                {currentTier.priceFormatted}
              </span>
              <span className="text-xs text-white/40 line-through font-mono tabular-nums">
                {currentTier.originalPriceFormatted}
              </span>
            </div>
          </div>
        </div>

        {/* iOS-Style Segmented Tab Navbar */}
        <div className="p-3 bg-white border-b border-[#E5E5EA] shrink-0">
          <div className="bg-[#EBECEF] p-1 rounded-2xl flex gap-1 select-none">
            <button
              type="button"
              onClick={() => setActiveTab("qris")}
              className={`flex-1 min-h-[40px] py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all duration-150 cursor-pointer active:scale-[0.96] ${
                activeTab === "qris"
                  ? "bg-white text-[#001E2B] shadow-xs"
                  : "text-[#5C6C7A] hover:text-[#001E2B]"
              }`}
            >
              <QrCode size={15} className={activeTab === "qris" ? "text-[#00684A]" : ""} />
              <span>QRIS (Instant)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("va")}
              className={`flex-1 min-h-[40px] py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all duration-150 cursor-pointer active:scale-[0.96] ${
                activeTab === "va"
                  ? "bg-white text-[#001E2B] shadow-xs"
                  : "text-[#5C6C7A] hover:text-[#001E2B]"
              }`}
            >
              <Building2 size={15} className={activeTab === "va" ? "text-[#00684A]" : ""} />
              <span>Virtual Account</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("ewallet")}
              className={`flex-1 min-h-[40px] py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all duration-150 cursor-pointer active:scale-[0.96] ${
                activeTab === "ewallet"
                  ? "bg-white text-[#001E2B] shadow-xs"
                  : "text-[#5C6C7A] hover:text-[#001E2B]"
              }`}
            >
              <Wallet size={15} className={activeTab === "ewallet" ? "text-[#00684A]" : ""} />
              <span>E-Wallet</span>
            </button>
          </div>
        </div>

        {/* Tab Content Body (Scrollable Inset Grouped Content) */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4">
          {/* TAB 1: QRIS */}
          {activeTab === "qris" && (
            <div className="flex flex-col items-center text-center space-y-4 animate-fadeIn">
              {/* Apple-style Inset White QR Card */}
              <div className="w-full max-w-[320px] p-5 bg-white rounded-[24px] border border-[#E5E5EA] shadow-xs flex flex-col items-center">
                {/* QRIS Official Logo Header Simulation */}
                <div className="flex items-center justify-between w-full mb-3 pb-2 border-b border-[#E5E5EA]">
                  <div className="flex items-center gap-1">
                    <span className="font-bold text-xs text-[#DC2626] tracking-tighter">QRIS</span>
                    <span className="text-[9px] text-[#5C6C7A] font-semibold">GPN</span>
                  </div>
                  <span className="text-[10px] font-semibold text-[#8E8E93]">Rumper Verified</span>
                </div>

                {/* High-Fidelity Crisp QR Matrix Canvas */}
                <div className="w-48 h-48 bg-[#001E2B] rounded-2xl p-3 flex items-center justify-center relative overflow-hidden shadow-inner">
                  <svg viewBox="0 0 100 100" className="w-full h-full text-white fill-current">
                    {/* Position Detection Squares */}
                    <rect x="0" y="0" width="30" height="30" fill="white" />
                    <rect x="5" y="5" width="20" height="20" fill="#001E2B" />
                    <rect x="10" y="10" width="10" height="10" fill="white" />

                    <rect x="70" y="0" width="30" height="30" fill="white" />
                    <rect x="75" y="5" width="20" height="20" fill="#001E2B" />
                    <rect x="80" y="10" width="10" height="10" fill="white" />

                    <rect x="0" y="70" width="30" height="30" fill="white" />
                    <rect x="5" y="75" width="20" height="20" fill="#001E2B" />
                    <rect x="10" y="80" width="10" height="10" fill="white" />

                    {/* Data Matrix Elements */}
                    <rect x="35" y="10" width="10" height="10" fill="white" />
                    <rect x="50" y="10" width="10" height="10" fill="white" />
                    <rect x="35" y="25" width="25" height="10" fill="white" />
                    <rect x="35" y="45" width="30" height="10" fill="white" />
                    <rect x="10" y="45" width="15" height="10" fill="white" />
                    <rect x="75" y="45" width="15" height="10" fill="white" />
                    <rect x="45" y="65" width="15" height="15" fill="white" />
                    <rect x="70" y="70" width="20" height="20" fill="white" />
                  </svg>
                  {/* Center Mark */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="px-2 py-0.5 rounded-md bg-[#00ED64] text-[#001E2B] font-bold text-[9px] shadow-xs uppercase tracking-tighter">
                      Rumper
                    </div>
                  </div>
                </div>

                <span className="text-[10px] font-mono tabular-nums text-[#8E8E93] mt-2.5">
                  NMID: ID102039481920
                </span>
              </div>

              {/* Supported Apps Text */}
              <div className="text-xs text-[#5C6C7A] max-w-sm space-y-1">
                <p className="font-bold text-[#1C1C1E]">Bisa di-scan dengan seluruh aplikasi pembayaran:</p>
                <p className="text-[11px] text-[#8E8E93]">
                  BCA Mobile, Mandiri Livin, GoPay, OVO, ShopeePay, Dana, LinkAja
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: VIRTUAL ACCOUNT */}
          {activeTab === "va" && (
            <div className="space-y-4 animate-fadeIn">
              {/* Apple Segmented Bank Selector */}
              <div className="grid grid-cols-4 gap-2">
                {(["bca", "mandiri", "bri", "bni"] as BankKey[]).map((bank) => (
                  <button
                    key={bank}
                    type="button"
                    onClick={() => setSelectedBank(bank)}
                    className={`min-h-[42px] py-2 px-1 rounded-2xl text-xs font-bold uppercase transition-all duration-150 cursor-pointer active:scale-[0.96] border ${
                      selectedBank === bank
                        ? "bg-[#001E2B] text-[#00ED64] border-[#001E2B] shadow-xs"
                        : "bg-white text-[#5C6C7A] border-[#E5E5EA] hover:bg-[#F4F7F6]"
                    }`}
                  >
                    {bank}
                  </button>
                ))}
              </div>

              {/* Inset VA Number Card */}
              <div className="p-4 bg-white rounded-[22px] border border-[#E5E5EA] shadow-xs space-y-2">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#7C8C9A] block">
                  {VA_ACCOUNTS[selectedBank].bankName}
                </span>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-lg md:text-xl font-bold font-mono tabular-nums text-[#001E2B] tracking-wider">
                    {VA_ACCOUNTS[selectedBank].vaNumber}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyVA}
                    className="min-h-[38px] px-3.5 py-1.5 rounded-full bg-[#00684A] hover:bg-[#00523A] text-white text-xs font-bold flex items-center gap-1.5 transition-all duration-150 active:scale-95 cursor-pointer shadow-xs"
                  >
                    {copied ? <Check size={14} /> : <Copy size={14} />}
                    <span>{copied ? "Tersalin!" : "Salin"}</span>
                  </button>
                </div>
              </div>

              {/* Instructions Accordion */}
              <div className="p-4 bg-white rounded-[22px] border border-[#E5E5EA] text-xs text-[#5C6C7A] space-y-2">
                <p className="font-bold text-[#1C1C1E]">Cara Pembayaran:</p>
                <ol className="list-decimal list-inside space-y-1.5 text-[11px] leading-relaxed text-[#3A3A3C]">
                  <li>Buka Mobile Banking Anda & pilih menu <strong>Transfer Virtual Account</strong>.</li>
                  <li>Masukkan nomor Virtual Account di atas & verifikasi nominal {currentTier.priceFormatted}.</li>
                  <li>Selesaikan pembayaran; sistem akan membuka laporan secara otomatis.</li>
                </ol>
              </div>
            </div>
          )}

          {/* TAB 3: E-WALLET */}
          {activeTab === "ewallet" && (
            <div className="space-y-3 animate-fadeIn">
              <button
                type="button"
                onClick={handleSimulateSuccess}
                className="w-full min-h-[56px] p-4 rounded-[22px] bg-white hover:bg-[#F9FBFA] border border-[#E5E5EA] shadow-xs flex items-center justify-between transition-all duration-150 cursor-pointer active:scale-[0.97]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#00AED6]/10 flex items-center justify-center font-bold text-[#00AED6] text-xs">
                    GoPay
                  </div>
                  <div className="text-left">
                    <span className="text-sm font-bold text-[#1C1C1E] block">GoPay Deeplink</span>
                    <span className="text-xs text-[#8E8E93]">Buka aplikasi Gojek otomatis</span>
                  </div>
                </div>
                <ChevronRight size={18} className="text-[#8E8E93]" />
              </button>

              <button
                type="button"
                onClick={handleSimulateSuccess}
                className="w-full min-h-[56px] p-4 rounded-[22px] bg-white hover:bg-[#F9FBFA] border border-[#E5E5EA] shadow-xs flex items-center justify-between transition-all duration-150 cursor-pointer active:scale-[0.97]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#EE4D2D]/10 flex items-center justify-center font-bold text-[#EE4D2D] text-xs">
                    Shopee
                  </div>
                  <div className="text-left">
                    <span className="text-sm font-bold text-[#1C1C1E] block">ShopeePay Direct</span>
                    <span className="text-xs text-[#8E8E93]">Pembayaran instan via Shopee</span>
                  </div>
                </div>
                <ChevronRight size={18} className="text-[#8E8E93]" />
              </button>
            </div>
          )}
        </div>

        {/* Apple-Style Docked Bottom Sheet Navbar & Action Bar (Thumb Zone) */}
        <div className="p-4 sm:p-5 bg-white/95 backdrop-blur-xl border-t border-[#E5E5EA] flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <div className="flex items-center gap-1.5 text-xs text-[#8E8E93]">
            <ShieldCheck size={14} className="text-[#34C759]" />
            <span>Enkripsi 256-bit SSL Terjamin</span>
          </div>

          {/* Primary Action Button in Easy Thumb Reach */}
          <button
            type="button"
            disabled={isProcessing}
            onClick={handleSimulateSuccess}
            className="w-full sm:w-auto min-h-[48px] px-7 py-3 rounded-full bg-[#00684A] hover:bg-[#00523A] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-transform duration-100 active:scale-[0.96] cursor-pointer shadow-md"
          >
            <Sparkles size={15} className="text-[#00ED64]" />
            <span>{isProcessing ? "Memverifikasi..." : "Simulasikan Pembayaran Berhasil"}</span>
          </button>
        </div>
      </div>
    </div>
  )
}
