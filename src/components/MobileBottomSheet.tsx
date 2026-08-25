import { useState, useRef, useCallback, useEffect, type ReactNode } from 'react'
import { Lock } from 'lucide-react'

type SnapPoint = 'peek' | 'compact' | 'half' | 'full'

const SNAP_HEIGHTS: Record<SnapPoint, number> = {
  peek: 120,
  compact: 0.28, // ~28% fraction of window.innerHeight (1:3.5 - 1:4 ratio)
  half: 0.50,    // 50% fraction of window.innerHeight
  full: 0.90,    // 90% fraction of window.innerHeight
}

function snapPx(snap: SnapPoint): number {
  if (snap === 'peek') return SNAP_HEIGHTS.peek
  return Math.round(window.innerHeight * (SNAP_HEIGHTS[snap] as number))
}

const ALL_TABS = ['Ringkasan', 'Faktor risiko', 'Perjalanan', 'Checklist', 'Fasilitas']
const FREE_TABS = new Set(['Ringkasan'])

interface MobileBottomSheetProps {
  activeTab: string
  isPremium: boolean
  onTabChange: (tab: string) => void
  onUpgrade: () => void
  onHeightChange?: (height: number) => void
  onSnapChange?: (snap: SnapPoint) => void
  snap?: SnapPoint
  bottomOffset?: number
  children: ReactNode
}

export default function MobileBottomSheet({
  activeTab,
  isPremium,
  onTabChange,
  onUpgrade,
  onHeightChange,
  onSnapChange,
  snap: externalSnap,
  bottomOffset = 0,
  children,
}: MobileBottomSheetProps) {
  const [snap, setSnap] = useState<SnapPoint>(externalSnap || 'compact')
  const [dragging, setDragging] = useState(false)
  const [dragHeight, setDragHeight] = useState<number | null>(null)

  const startY = useRef(0)
  const startHeight = useRef(0)
  const sheetRef = useRef<HTMLDivElement>(null)
  const tabScrollRef = useRef<HTMLDivElement>(null)

  const currentHeight = dragging && dragHeight !== null ? dragHeight : snapPx(snap)

  useEffect(() => {
    if (externalSnap && externalSnap !== snap) {
      setSnap(externalSnap)
    }
  }, [externalSnap])

  useEffect(() => {
    onHeightChange?.(currentHeight)
  }, [currentHeight, onHeightChange])

  useEffect(() => {
    onSnapChange?.(snap)
  }, [snap, onSnapChange])

  useEffect(() => {
    const el = tabScrollRef.current
    if (!el) return
    const activeBtn = el.querySelector('[aria-selected="true"]') as HTMLElement
    if (activeBtn) {
      activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
    }
  }, [activeTab])

  // ── Touch drag ────────────────────────────────────────────────────────────

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    startY.current = e.touches[0].clientY
    startHeight.current = snapPx(snap)
    setDragging(true)
  }, [snap])

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    if (!dragging) return
    const dy = startY.current - e.touches[0].clientY
    const next = Math.max(SNAP_HEIGHTS.peek, Math.min(snapPx('full'), startHeight.current + dy))
    setDragHeight(next)
  }, [dragging])

  const onTouchEnd = useCallback(() => {
    setDragging(false)
    const h = dragHeight ?? snapPx(snap)
    const peekH = SNAP_HEIGHTS.peek
    const compactH = snapPx('compact')
    const halfH = snapPx('half')
    const fullH = snapPx('full')
    // Snap to nearest
    const distances: [number, SnapPoint][] = [
      [Math.abs(h - peekH), 'peek'],
      [Math.abs(h - compactH), 'compact'],
      [Math.abs(h - halfH), 'half'],
      [Math.abs(h - fullH), 'full'],
    ]
    distances.sort((a, b) => a[0] - b[0])
    setSnap(distances[0][1])
    setDragHeight(null)
  }, [dragHeight, snap])

  const fullH = snapPx('full')
  const offsetY = Math.max(0, fullH - currentHeight)

  return (
    <div
      ref={sheetRef}
      role="region"
      aria-label="Panel Laporan Lokasi Seluler"
      className="fixed left-0 right-0 z-[1050] flex flex-col bg-white"
      style={{
        bottom: bottomOffset,
        height: fullH,
        transform: `translateY(${offsetY}px)`,
        borderRadius: '20px 20px 0 0',
        boxShadow: '0 -4px 32px rgba(0,30,43,0.14)',
        transition: dragging ? 'none' : 'transform 0.28s cubic-bezier(0.32,0.72,0,1)',
      }}
    >
      {/* ── Drag handle ── */}
      <div
        className="flex flex-col items-center pt-3 pb-2 cursor-grab active:cursor-grabbing shrink-0 touch-none group"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div className="w-9 group-active:w-12 h-1 rounded-full transition-all duration-200 bg-slate-300" />
        {snap !== 'full' && (
          <button
            className="flex min-h-[44px] items-center justify-center gap-1.5 px-3 text-xs font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0F2B38]"
            style={{ color: '#475569' }}
            onClick={() => setSnap('full')}
            aria-label="Buka panel penuh"
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M2 6.5L5 3.5L8 6.5" stroke="#475569" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Tarik untuk penuh
          </button>
        )}
        {snap === 'full' && (
          <button
            className="flex min-h-[44px] items-center justify-center gap-1.5 px-3 text-xs font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0F2B38]"
            style={{ color: '#475569' }}
            onClick={() => setSnap('compact')}
            aria-label="Perkecil panel"
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M2 3.5L5 6.5L8 3.5" stroke="#475569" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Perkecil
          </button>
        )}
      </div>

      {/* ── Scrollable tab pills ── */}
      <div
        ref={tabScrollRef}
        className="flex items-center gap-2 px-4 pb-2 shrink-0"
        style={{ overflowX: 'auto', scrollbarWidth: 'none', flexWrap: 'nowrap' }}
      >
        {ALL_TABS.map(tab => {
          const isLocked = !isPremium && !FREE_TABS.has(tab)
          const isActive = tab === activeTab && !isLocked

          if (isLocked) {
            return (
              <button
                key={tab}
                role="tab"
                aria-selected={false}
                onClick={onUpgrade}
                className="flex min-h-[34px] items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap shrink-0 cursor-pointer"
                style={{ border: '1px dashed #CBD5E1', backgroundColor: '#F8FAFC', color: '#94A3B8' }}
              >
                <Lock size={10} color="#94A3B8" />
                {tab}
              </button>
            )
          }

          return (
            <button
              key={tab}
              role="tab"
              aria-selected={isActive}
              onClick={() => {
                if (snap === 'peek' || snap === 'compact') {
                  setSnap('full')
                }
                onTabChange(tab)
              }}
              className="min-h-[34px] px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer"
              style={
                isActive
                  ? { backgroundColor: '#0F2B38', color: '#fff', border: '1.5px solid #0F2B38' }
                  : { backgroundColor: 'transparent', border: '1px solid #C1CCD6', color: '#3d4f5b' }
              }
            >
              {tab}
            </button>
          )
        })}
      </div>

      {/* ── Divider ── */}
      <div style={{ height: 1, backgroundColor: '#F0F4F6', flexShrink: 0 }} />

      {/* ── Scrollable content body ── */}
      <div className="flex-1 overflow-y-auto px-4 py-4" style={{ scrollbarWidth: 'none' }}>
        {children}
      </div>
    </div>
  )
}
