import { useRef, useState, useEffect } from "react"
import { MessageSquare, Lock, ChevronRight } from "lucide-react"
import Button from "./ui/Button"

interface SubHeaderTabsProps {
  isPremium: boolean
  activeTab: string
  onTabChange: (tab: string) => void
  onUpgrade: () => void
  onAssistant?: () => void
  showAssistant?: boolean
}

const ALL_TABS = [
  "Ringkasan",
  "Faktor risiko",
  "Perjalanan",
  "Checklist",
  "Fasilitas",
]
const FREE_TABS = new Set(["Ringkasan"])

export default function SubHeaderTabs({
  isPremium,
  activeTab,
  onTabChange,
  onUpgrade,
  onAssistant,
  showAssistant = true,
}: SubHeaderTabsProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollRight, setCanScrollRight] = useState(false)

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const check = () =>
      setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4)
    check()
    el.addEventListener("scroll", check)
    window.addEventListener("resize", check)
    return () => {
      el.removeEventListener("scroll", check)
      window.removeEventListener("resize", check)
    }
  }, [isPremium])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const activeBtn = el.querySelector('[aria-selected="true"]') as HTMLElement
    if (activeBtn) {
      activeBtn.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      })
    }
  }, [activeTab])

  const scrollRight = () =>
    scrollRef.current?.scrollBy({ left: 120, behavior: "smooth" })

  return (
    <div className="flex items-center justify-between gap-1.5 min-w-0">
      <div className="relative flex-1 min-w-0">
        {/* Fade + arrow indicator */}
        {canScrollRight && (
          <button
            type="button"
            onClick={scrollRight}
            className="absolute right-0 top-0 bottom-0 z-10 flex items-center pr-1 pl-6 transition-opacity duration-150 cursor-pointer"
            style={{
              background: "linear-gradient(to right, transparent, #F4F7F8 60%)",
              border: "none",
            }}
            aria-label="Scroll tabs right"
          >
            <ChevronRight size={15} className="text-slate-500" />
          </button>
        )}
        {/* Scrollable tab row — compact size */}
        <div
          ref={scrollRef}
          role="tablist"
          aria-label="Navigasi Tahap Laporan"
          className="flex items-center gap-1.5"
          style={{
            overflowX: "auto",
            flexWrap: "nowrap",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {ALL_TABS.map((tab) => {
            const isLocked = !isPremium && !FREE_TABS.has(tab)
            const isActive = !isLocked && tab === activeTab
            const tabId = `tab-${tab.toLowerCase().replace(/\s+/g, "-")}`
            const panelId = `workspace-${tab.toLowerCase().replace(/\s+/g, "-")}`

            if (isLocked) {
              return (
                <button
                  key={tab}
                  id={tabId}
                  role="tab"
                  aria-selected={false}
                  aria-disabled="true"
                  onClick={onUpgrade}
                  className="flex min-h-[36px] items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-150 ease-out-decel hover:bg-white/80 active:scale-[0.96] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0F2B38] whitespace-nowrap cursor-pointer shrink-0"
                  style={{
                    border: "1px dashed #B9C8D2",
                    backgroundColor: "#F8FAFC",
                    color: "#475569",
                  }}
                >
                  <Lock size={12} className="text-slate-500" />
                  {tab}
                </button>
              )
            }

            if (isActive) {
              return (
                <button
                  key={tab}
                  id={tabId}
                  role="tab"
                  aria-selected={true}
                  aria-controls={panelId}
                  onClick={() => onTabChange(tab)}
                  className="min-h-[36px] px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-150 ease-out-decel active:scale-[0.96] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F2B38] whitespace-nowrap cursor-pointer shadow-2xs shrink-0"
                  style={{
                    backgroundColor: "#0F2B38",
                    color: "#FFFFFF",
                    border: "1.5px solid #0F2B38",
                  }}
                >
                  {tab}
                </button>
              )
            }

            return (
              <button
                key={tab}
                id={tabId}
                role="tab"
                aria-selected={false}
                aria-controls={panelId}
                onClick={() => onTabChange(tab)}
                className="min-h-[36px] px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-150 ease-out-decel hover:bg-slate-100/80 active:scale-[0.96] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0F2B38] whitespace-nowrap cursor-pointer shrink-0"
                style={{
                  backgroundColor: "transparent",
                  border: "1px solid #C1CCD6",
                  color: "#3d4f5b",
                }}
              >
                {tab}
              </button>
            )
          })}
        </div>
      </div>

      {showAssistant && onAssistant && (
        <button
          type="button"
          onClick={onAssistant}
          className="hidden lg:inline-flex min-h-[36px] items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-150 ease-out-decel active:scale-[0.96] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B66FF] whitespace-nowrap cursor-pointer shrink-0 border border-[#3B66FF] text-[#3B66FF] bg-white hover:bg-blue-50/80 shadow-2xs"
        >
          <MessageSquare size={14} className="text-[#3B66FF] shrink-0" />
          <span>Tanya Asisten</span>
        </button>
      )}
    </div>
  )
}
