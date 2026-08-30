import React, { useState, useEffect, useRef } from "react"
import {
  X,
  ShieldCheck,
  Check,
  Smartphone,
  Sparkles,
  ArrowRight,
  RefreshCw,
  Lock,
} from "lucide-react"

export interface UserProfile {
  name: string
  email: string
  phone: string
  avatarInitials: string
  isAuthenticated: boolean
}

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  onLoginSuccess: (user: UserProfile) => void
  initialPhone?: string
}

export default function AuthModal({
  isOpen,
  onClose,
  onLoginSuccess,
  initialPhone = "081234567890",
}: AuthModalProps) {
  const [step, setStep] = useState<"social" | "otp">("social")
  const [phone, setPhone] = useState(initialPhone)
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [countdown, setCountdown] = useState(58)
  const [isVerifying, setIsVerifying] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const otpInputsRef = useRef<(HTMLInputElement | null)[]>([])

  // Timer for OTP countdown
  useEffect(() => {
    if (step !== "otp") return
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(timer)
  }, [step])

  // Auto-focus first input when entering OTP step
  useEffect(() => {
    if (step === "otp") {
      setTimeout(() => {
        otpInputsRef.current[0]?.focus()
      }, 100)
    }
  }, [step])

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return

    const newOtp = [...otp]
    newOtp[index] = value.slice(-1)
    setOtp(newOtp)

    // Move to next cell if typed
    if (value && index < 5) {
      otpInputsRef.current[index + 1]?.focus()
    }
  }

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpInputsRef.current[index - 1]?.focus()
    }
  }

  const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6)
    if (!pasted) return

    const newOtp = [...otp]
    for (let i = 0; i < 6; i++) {
      newOtp[i] = pasted[i] || ""
    }
    setOtp(newOtp)
    const targetIdx = Math.min(pasted.length, 5)
    otpInputsRef.current[targetIdx]?.focus()
  }

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault()
    if (!phone || phone.length < 8) return
    setStep("otp")
    setCountdown(58)
  }

  const handleVerifyOtp = () => {
    setIsVerifying(true)
    setTimeout(() => {
      setIsVerifying(false)
      setIsSuccess(true)
      setTimeout(() => {
        setIsSuccess(false)
        onLoginSuccess({
          name: "Andi Wijaya",
          email: "andi.wijaya@gmail.com",
          phone: phone.startsWith("0") ? `+62 ${phone.slice(1)}` : phone,
          avatarInitials: "AW",
          isAuthenticated: true,
        })
        onClose()
      }, 1200)
    }, 800)
  }

  const handleGoogleSignIn = () => {
    setIsVerifying(true)
    setTimeout(() => {
      setIsVerifying(false)
      setIsSuccess(true)
      setTimeout(() => {
        setIsSuccess(false)
        onLoginSuccess({
          name: "Andi Wijaya",
          email: "andi.wijaya@gmail.com",
          phone: "+62 812-3456-7890",
          avatarInitials: "AW",
          isAuthenticated: true,
        })
        onClose()
      }, 1200)
    }, 900)
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[3000] flex items-center justify-center p-4 bg-[#001E2B]/60 backdrop-blur-md animate-fadeIn select-none"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md bg-[#F9FBFA] rounded-[32px] border border-black/10 shadow-2xl overflow-hidden p-6 md:p-8 animate-scaleUp text-[#001E2B]"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Masuk ke Akun Rumper"
      >
        {/* Success Overlay Animation */}
        {isSuccess && (
          <div className="absolute inset-0 z-50 bg-[#001E2B] text-white flex flex-col items-center justify-center p-8 text-center animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-[#00ED64]/20 border-2 border-[#00ED64] flex items-center justify-center text-[#00ED64] mb-4 animate-bounce">
              <Check size={32} className="stroke-[3]" />
            </div>
            <span className="text-xs font-black uppercase tracking-wider text-[#00ED64] mb-1">
              Verifikasi Berhasil
            </span>
            <h3 className="text-2xl font-black text-white mb-2 tracking-tight">
              Selamat Datang Kembali! 🎉
            </h3>
            <p className="text-xs text-[#A8B3BC] max-w-xs leading-relaxed">
              Preferensi pencarian dan kuota lokasimu telah terhubung aman.
            </p>
          </div>
        )}

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center text-[#5C6C7A] hover:text-[#001E2B] transition-all cursor-pointer active:scale-95"
          aria-label="Tutup modal autentikasi"
        >
          <X size={18} />
        </button>

        {/* ═══════════════════════════════════════════════════════════════════
            STEP 1: SOCIAL & PHONE SELECTION
           ═══════════════════════════════════════════════════════════════════ */}
        {step === "social" && (
          <div className="space-y-5 animate-fadeIn">
            <div>
              <div className="flex items-center gap-1.5 mb-2">
                <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#00ED64]/15 border border-[#00ED64]/30 text-[#00684A]">
                  Akun Rumper
                </span>
              </div>
              <h2 className="text-xl md:text-2xl font-black text-[#001E2B] tracking-tight leading-tight">
                Simpan & Sinkronkan Properti
              </h2>
              <p className="text-xs text-[#5C6C7A] mt-1 leading-relaxed">
                Masuk untuk menyimpan seluruh 5 kuota investigasi, skor risiko BNPB, dan checklist fisik di cloud.
              </p>
            </div>

            {/* Google One-Tap Social Button */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="w-full h-12 rounded-2xl bg-white hover:bg-[#F4F7F6] border border-[#CBD5E1] shadow-xs flex items-center justify-center gap-3 transition-all active:scale-[0.98] cursor-pointer text-xs font-extrabold text-[#001E2B]"
            >
              {/* Google G Logo SVG */}
              <svg viewBox="0 0 24 24" width="18" height="18">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.04 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                />
              </svg>
              <span>Lanjutkan dengan Google</span>
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-[#E5E5EA]" />
              <span className="text-[11px] text-[#8E8E93] font-semibold">atau WhatsApp OTP</span>
              <div className="flex-1 h-px bg-[#E5E5EA]" />
            </div>

            {/* WhatsApp Phone Form */}
            <form onSubmit={handleSendOtp} className="space-y-3">
              <div>
                <label className="text-[11px] font-bold text-[#5C6C7A] block mb-1.5">
                  Nomor WhatsApp
                </label>
                <div className="flex items-center rounded-2xl border border-[#CBD5E1] bg-white overflow-hidden focus-within:ring-2 focus-within:ring-[#00684A] shadow-xs">
                  <span className="px-3.5 py-3 text-xs font-black text-[#5C6C7A] bg-[#F4F7F6] border-r border-[#E5E5EA]">
                    +62
                  </span>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                    placeholder="812 3456 7890"
                    className="w-full px-3.5 py-3 text-xs font-bold text-[#001E2B] focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full h-12 rounded-2xl bg-[#001E2B] hover:bg-[#061E28] text-white font-extrabold text-xs flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer shadow-md border border-white/10"
              >
                <span>Kirim Kode OTP WhatsApp</span>
                <ArrowRight size={15} className="text-[#00ED64]" />
              </button>
            </form>

            {/* Reassurance Footer */}
            <div className="p-3 bg-white rounded-2xl border border-[#E5E5EA] flex items-center gap-2 text-[11px] text-[#5C6C7A]">
              <ShieldCheck size={14} className="text-[#00684A] shrink-0" />
              <span>Privasi terjamin. Bebas spam & tanpa kata sandi rumit.</span>
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════════════
            STEP 2: WHATSAPP 6-DIGIT OTP ENTRY
           ═══════════════════════════════════════════════════════════════════ */}
        {step === "otp" && (
          <div className="space-y-5 animate-fadeIn">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#00ED64]/15 border border-[#00ED64]/30 text-[#00684A]">
                  Verifikasi 6 Digit
                </span>
                <button
                  type="button"
                  onClick={() => setStep("social")}
                  className="text-xs font-bold text-[#00684A] hover:underline cursor-pointer"
                >
                  Ubah Nomor
                </button>
              </div>
              <h2 className="text-xl md:text-2xl font-black text-[#001E2B] tracking-tight leading-tight">
                Masukkan Kode OTP
              </h2>
              <p className="text-xs text-[#5C6C7A] mt-1 leading-relaxed">
                Kode verifikasi 6 digit telah dikirimkan via WhatsApp ke <strong>+62 {phone}</strong>
              </p>
            </div>

            {/* 6-Cell Interactive PIN Input */}
            <div className="flex justify-between gap-2 my-4">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  ref={(el) => {
                    otpInputsRef.current[idx] = el
                  }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(idx, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                  onPaste={handleOtpPaste}
                  className={`w-11 h-14 rounded-2xl border text-center text-lg font-black font-mono transition-all focus:outline-none ${
                    digit
                      ? "border-[#001E2B] bg-white shadow-xs"
                      : "border-[#CBD5E1] bg-white hover:border-[#94A3B8]"
                  } focus:ring-2 focus:ring-[#00684A]`}
                />
              ))}
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                type="button"
                disabled={isVerifying || otp.some((d) => !d)}
                onClick={handleVerifyOtp}
                className={`w-full h-12 rounded-2xl font-extrabold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md ${
                  otp.every((d) => d)
                    ? "bg-[#00684A] hover:bg-[#00523A] text-white active:scale-[0.98]"
                    : "bg-slate-200 text-slate-400 cursor-not-allowed"
                }`}
              >
                <span>{isVerifying ? "Memverifikasi..." : "Verifikasi & Masuk"}</span>
              </button>

              {/* Resend Timer */}
              <div className="text-center">
                {countdown > 0 ? (
                  <span className="text-xs text-[#8E8E93] font-medium">
                    Kirim ulang kode dalam <strong className="font-mono text-[#001E2B]">{countdown}s</strong>
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => setCountdown(58)}
                    className="text-xs font-bold text-[#00684A] hover:underline inline-flex items-center gap-1 cursor-pointer"
                  >
                    <RefreshCw size={12} />
                    <span>Kirim Ulang Kode OTP</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
