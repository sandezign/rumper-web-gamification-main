interface UpgradeDrawerProps {
  open: boolean
  onClose: () => void
  onUpgradeConfirm: () => void
}

import { useState, useEffect } from 'react'
import { X, Check, ShieldCheck, Zap } from 'lucide-react'

const FEATURES = [
  'Akses penuh seluruh faktor risiko',
  'Verifikasi red flag & deteksi banjir',
  'Rincian bukti dan evidence gap',
  'Checklist due diligence lengkap',
  'Rekomendasi tindakan lapangan',
]

export default function UpgradeDrawer({ open, onClose, onUpgradeConfirm }: UpgradeDrawerProps) {
  const [success, setSuccess] = useState(false)

  // Listen to Escape key to dismiss drawer
  useEffect(() => {
    if (!open) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open, onClose])

  function handleConfirm() {
    setSuccess(true)
    setTimeout(() => {
      setSuccess(false)
      onUpgradeConfirm()
    }, 900)
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[1999] flex items-end sm:items-center justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#001E2B]/50 backdrop-blur-[2px] transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Responsive Container: Bottom Sheet on Mobile (<sm), Sidebar Drawer on Desktop (>=sm) */}
      <aside
        className={`fixed bottom-0 left-0 right-0 z-[2000] flex flex-col bg-white shadow-2xl rounded-t-[28px] max-h-[90vh] sm:top-0 sm:right-0 sm:left-auto sm:bottom-0 sm:h-full sm:w-[400px] sm:max-h-none sm:rounded-t-none sm:rounded-l-[28px] overflow-hidden transition-transform duration-300 ease-out ${
          open ? 'translate-y-0 sm:translate-x-0' : 'translate-y-full sm:translate-y-0 sm:translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Upgrade laporan lengkap"
      >
        {/* Header Section */}
        <header className="relative bg-[#001E2B] px-6 pt-3 pb-6 shrink-0 border-b border-white/10">
          {/* Mobile Drag Indicator Handle */}
          <div className="flex justify-center pt-1 pb-3 sm:hidden" aria-hidden="true">
            <div className="w-10 h-1 rounded-full bg-white/30" />
          </div>

          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#00ED64]/15 border border-[#00ED64]/40 text-[#00ED64] text-[11px] font-bold uppercase tracking-wider mb-2">
                <Zap size={11} className="fill-current" /> Premium Pass
              </span>
              <h2 className="font-bold text-xl text-white leading-tight">
                {success ? 'Berhasil diupgrade! 🎉' : 'Buka laporan lengkap'}
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="w-11 h-11 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
              aria-label="Tutup modal upgrade"
            >
              <X size={18} />
            </button>
          </div>

          <div className="flex items-baseline gap-2.5">
            <span className="font-extrabold text-3xl text-[#00ED64] tracking-tight">Rp50.000</span>
            <span className="text-sm font-medium line-through text-white/40">Rp150.000</span>
          </div>
          <p className="text-xs text-slate-300 mt-1 font-medium">
            Bayar sekali, akses penuh untuk lokasi ini
          </p>
        </header>

        {/* Feature List */}
        <div className="flex-1 px-6 py-6 overflow-y-auto space-y-5">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-[#7C8C9A] mb-3">
              Yang akan terbuka
            </p>
            <ul className="space-y-3">
              {FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#DCEEE7] flex items-center justify-center shrink-0 mt-0.5">
                    <Check size={11} className="text-[#318266]" strokeWidth={2.5} />
                  </div>
                  <span className="text-sm font-semibold text-[#001E2B] leading-snug">{f}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Trust Note */}
          <div className="flex items-start gap-3 p-4 rounded-2xl bg-[#F9FBFA] border border-[#E1E5E8] text-xs text-[#5C6C7A] leading-relaxed">
            <ShieldCheck size={18} className="text-[#318266] shrink-0 mt-0.5" />
            <p>
              Analisis menggunakan data terverifikasi dan metodologi deterministik — bukan rekomendasi otomatis dari AI.
            </p>
          </div>
        </div>

        {/* Action Footer */}
        <footer className="px-6 pb-6 pt-4 bg-white border-t border-[#E1E5E8] flex flex-col gap-3 shrink-0">
          <button
            type="button"
            onClick={handleConfirm}
            disabled={success}
            className="w-full min-h-[48px] rounded-full font-bold text-sm transition-all flex items-center justify-center gap-2 bg-[#00ED64] hover:bg-[#00D972] active:scale-[0.98] text-[#001E2B] shadow-md shadow-[#00ED64]/20 disabled:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#00A65A]"
          >
            {success ? (
              <>
                <Check size={18} strokeWidth={2.5} />
                Upgrade berhasil!
              </>
            ) : (
              'Upgrade sekarang'
            )}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="w-full min-h-[44px] rounded-full font-semibold text-sm border border-[#C1CCD6] text-[#3D4F5B] hover:bg-slate-50 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#001E2B]"
          >
            Tutup
          </button>
        </footer>
      </aside>
    </div>
  )
}
