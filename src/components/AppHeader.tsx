import { useState, useEffect } from 'react'
import svgPaths from "../imports/Header/svg-n4hssipkeg"

interface AppHeaderProps {
  isPremium: boolean
  onUpgrade: () => void
  activePropertyName: string
  activePropertySubdistrict: string
  remainingQuota: number
  totalQuota: number
  onOpenPropertyModal: () => void
  onOpenWizard?: () => void
}

function RumperMark() {
  return (
    <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#001E2B]" aria-hidden="true">
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
        <path d={svgPaths.p187fc900} stroke="#00ED64" strokeWidth="2" />
        <path d={svgPaths.p38875b00} fill="#5085FF" />
      </svg>
    </span>
  )
}

function LocationIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d={svgPaths.p3d095780} stroke="#00ED64" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
      <path d={svgPaths.p26d22700} stroke="#00ED64" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
    </svg>
  )
}

function ProfileIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d={svgPaths.p32d71800} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
      <path d={svgPaths.p205a5680} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
    </svg>
  )
}

export default function AppHeader({
  isPremium,
  onUpgrade,
  activePropertyName,
  activePropertySubdistrict,
  remainingQuota,
  totalQuota,
  onOpenPropertyModal,
  onOpenWizard,
}: AppHeaderProps) {
  const planLabel = isPremium ? "Premium" : "Free Trial"
  const fullLocationLabel = `${activePropertyName}, ${activePropertySubdistrict}`
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Disappear when scrolled down (> 20px), reappear when back at top (<= 20px)
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="sticky top-0 z-50 flex flex-col w-full">
      {/* Primary Header Bar */}
      <header className="flex min-h-[52px] shrink-0 items-center justify-between border-b border-white/20 bg-[#001E2B] px-4 sm:px-5 py-2">
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-2">
            <RumperMark />
            <span
              className="whitespace-nowrap text-lg font-bold leading-tight text-white"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Rumper
            </span>
          </div>
          <button
            type="button"
            onClick={isPremium ? undefined : onUpgrade}
            className="flex h-8 items-center rounded-full border border-[rgba(1,237,100,0.5)] bg-[rgba(1,237,100,0.1)] px-3 text-xs font-semibold leading-none text-[#00ED64] transition-colors hover:bg-[rgba(1,237,100,0.18)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#00ED64] cursor-pointer shrink-0"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {planLabel}
          </button>
        </div>

        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          {/* Location Selector Pill Button */}
          <button
            type="button"
            onClick={onOpenPropertyModal}
            className="flex h-8 items-center justify-center gap-1.5 rounded-full border border-white/20 bg-white/5 px-3 hover:bg-white/10 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-white cursor-pointer active:scale-[0.98] shrink-0"
            aria-label={`Pilih lokasi: ${fullLocationLabel}`}
          >
            <LocationIcon />
            <span
              className="hidden max-w-[200px] md:max-w-[260px] lg:max-w-[320px] truncate text-xs font-semibold leading-none text-white sm:block"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {fullLocationLabel}
            </span>
            <svg className="shrink-0" width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M4 6L8 10L12 6" stroke="#A8B3BC" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
            </svg>
          </button>

          {/* Onboarding Wizard Setup Button */}
          {onOpenWizard && (
            <button
              type="button"
              onClick={onOpenWizard}
              className="flex h-8 items-center justify-center gap-1.5 rounded-full border border-[#00E599]/40 bg-[#00E599]/10 px-3 hover:bg-[#00E599]/20 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#00E599] cursor-pointer active:scale-[0.98] text-[#00E599] text-xs font-bold shrink-0"
              aria-label="Buka Profil Pembeli"
            >
              <span>Profil Pembeli</span>
            </button>
          )}

          {/* Quota Badge ("1 lokasi tersisa") */}
          <span
            className="hidden h-8 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 text-xs font-semibold leading-none text-[#00ED64] lg:inline-flex items-center gap-1.5 shrink-0"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#00ED64] animate-pulse shrink-0" />
            {remainingQuota > 0 ? `${remainingQuota} lokasi tersisa` : `Kuota penuh (${totalQuota}/${totalQuota})`}
          </span>

          {/* Profile Icon (Hidden on mobile <sm to eliminate redundancy with bottom navigation bar) */}
          <button
            type="button"
            className="hidden sm:flex size-8 shrink-0 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white cursor-pointer"
            aria-label="Profil"
          >
            <ProfileIcon />
          </button>
        </div>
      </header>

      {/* Mobile Subheader Bar (collapses smoothly on scroll down, expands on scroll to top) */}
      <div
        className={`sm:hidden overflow-hidden transition-all duration-300 ease-in-out bg-white ${
          isScrolled
            ? 'max-h-0 opacity-0 py-0 border-b-0 pointer-events-none'
            : 'max-h-16 opacity-100 py-2.5 px-4 border-b border-slate-200'
        }`}
      >
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 min-w-0">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="shrink-0 text-sky-600" aria-hidden="true">
              <path d="M8 2c-3 0-5.5 2.5-5.5 5.5 0 3.5 5.5 7.5 5.5 7.5s5.5-4 5.5-7.5C13.5 4.5 11 2 8 2z" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="8" cy="7.5" r="2" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            <span className="font-semibold text-slate-800 truncate">{fullLocationLabel}</span>
          </div>
          <button
            type="button"
            onClick={onOpenPropertyModal}
            className="text-sky-600 font-bold hover:underline shrink-0 ml-2 cursor-pointer"
          >
            Ganti
          </button>
        </div>
      </div>
    </div>
  )
}
