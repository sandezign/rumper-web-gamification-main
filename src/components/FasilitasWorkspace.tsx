import { useState } from 'react'
import svgPaths from '@/imports/TabPanel/svg-uizybifeh6'
import Card from './ui/Card'
import Badge from './ui/Badge'
import SectionHeader from './ui/SectionHeader'
import { MapPin } from 'lucide-react'

// ── Types ─────────────────────────────────────────────────────────────────────

export type FacilityCategoryKey = 'kesehatan' | 'pendidikan' | 'belanja' | 'stasiun'

interface FacilityItem {
  name: string
  distance: string
}

interface FacilityCategory {
  key: FacilityCategoryKey
  label: string
  count: number
  proximityLabel: string
  proximityVariant: 'success' | 'warning' | 'danger' | 'info' | 'neutral'
  nearestKm: string
  iconBg: string
  iconBorder: string
  icon: React.ReactNode
  items: FacilityItem[]
}

interface FasilitasWorkspaceProps {
  visible: Record<FacilityCategoryKey, boolean>
  onToggle: (key: FacilityCategoryKey) => void
}

// ── Category icon SVGs ────────────────────────────────────────────────────────

function KesehatanIcon() {
  return (
    <svg fill="none" height="18" viewBox="0 0 18 18" width="18" aria-hidden="true">
      <path d={svgPaths.p36149d00} stroke="#E11D48" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
      <path d={svgPaths.p37de9020} stroke="#E11D48" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
    </svg>
  )
}

function PendidikanIcon() {
  return (
    <svg fill="none" height="18" viewBox="0 0 18 18" width="18" aria-hidden="true">
      <path d={svgPaths.p3c7a6100} stroke="#615FFF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
      <path d="M16.5 7.5V12" stroke="#615FFF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
      <path d={svgPaths.p33836100} stroke="#615FFF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
    </svg>
  )
}

function BelanjaIcon() {
  return (
    <svg fill="none" height="18" viewBox="0 0 18 18" width="18" aria-hidden="true">
      <g clipPath="url(#clip-belanja)">
        <path d={svgPaths.p61f9880} stroke="#FE9A00" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        <path d={svgPaths.p266da370} stroke="#FE9A00" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        <path d={svgPaths.p12d64e80} stroke="#FE9A00" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
      </g>
      <defs><clipPath id="clip-belanja"><rect fill="white" height="18" width="18" /></clipPath></defs>
    </svg>
  )
}

function StasiunIcon() {
  return (
    <svg fill="none" height="18" viewBox="0 0 18 18" width="18" aria-hidden="true">
      <path d="M9 9.75V15.75" stroke="#0092B8" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
      <path d="M9 2.25V4.5" stroke="#0092B8" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
      <path d={svgPaths.p24d66280} stroke="#0092B8" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
    </svg>
  )
}

// ── Data ──────────────────────────────────────────────────────────────────────

const CATEGORIES: FacilityCategory[] = [
  {
    key: 'kesehatan',
    label: 'Kesehatan',
    count: 3,
    proximityLabel: 'Sangat Dekat',
    proximityVariant: 'success',
    nearestKm: '0.19 km',
    iconBg: '#FFF1F2',
    iconBorder: 'rgba(254,202,202,0.6)',
    icon: <KesehatanIcon />,
    items: [
      { name: 'Klinik Pratama Galaxy', distance: '0.19 km' },
      { name: 'Apotek K-24 Galaxy', distance: '0.22 km' },
      { name: 'RS Hermina Galaxy', distance: '0.48 km' },
    ],
  },
  {
    key: 'pendidikan',
    label: 'Pendidikan',
    count: 1,
    proximityLabel: 'Cukup Jauh',
    proximityVariant: 'warning',
    nearestKm: '1.62 km',
    iconBg: '#EEF2FF',
    iconBorder: 'rgba(198,210,255,0.6)',
    icon: <PendidikanIcon />,
    items: [
      { name: 'SDN Grand Galaxy', distance: '1.62 km' },
    ],
  },
  {
    key: 'belanja',
    label: 'Belanja Harian',
    count: 2,
    proximityLabel: 'Sangat Dekat',
    proximityVariant: 'success',
    nearestKm: '0.04 km',
    iconBg: '#FFFBEB',
    iconBorder: 'rgba(254,230,133,0.6)',
    icon: <BelanjaIcon />,
    items: [
      { name: 'Indomaret Galaxy', distance: '0.04 km' },
      { name: 'Grand Galaxy Park Mall', distance: '0.38 km' },
    ],
  },
  {
    key: 'stasiun',
    label: 'Stasiun & Feeder',
    count: 2,
    proximityLabel: 'Dekat',
    proximityVariant: 'success',
    nearestKm: '1.20 km',
    iconBg: '#E0F2FE',
    iconBorder: 'rgba(186,230,253,0.6)',
    icon: <StasiunIcon />,
    items: [
      { name: 'Halte Feeder Pekayon', distance: '0.35 km' },
      { name: 'Stasiun Bekasi (KRL)', distance: '1.20 km' },
    ],
  },
]

// ── Accessible Toggle Switch ──────────────────────────────────────────────────

function Toggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={onToggle}
      className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out active:scale-[0.96] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0F2B38] ${
        on ? 'bg-[#0F2B38]' : 'bg-slate-300'
      }`}
      aria-label="Tampilkan di peta"
    >
      <span
        className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
          on ? 'translate-x-4' : 'translate-x-0'
        }`}
      />
    </button>
  )
}

// ── Category Row Component ────────────────────────────────────────────────────

function CategoryRow({
  cat,
  visible,
  expanded,
  onToggleMap,
  onToggleExpand,
}: {
  cat: FacilityCategory
  visible: boolean
  expanded: boolean
  onToggleMap: () => void
  onToggleExpand: () => void
}) {
  return (
    <div className="flex flex-col border-b border-slate-100 last:border-b-0">
      {/* Header row */}
      <div className="flex items-center justify-between w-full min-h-[52px] px-3.5 sm:px-4 py-3">
        {/* Icon + label button */}
        <button
          type="button"
          onClick={onToggleExpand}
          className="flex items-center gap-2.5 sm:gap-3 flex-1 min-w-0 text-left hover:bg-slate-50/70 transition-all duration-150 ease-out-decel rounded-xl p-1 sm:p-1.5 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0F2B38] cursor-pointer"
        >
          {/* Category icon */}
          <div
            className="shrink-0 flex items-center justify-center rounded-xl shadow-2xs"
            style={{ width: 36, height: 36, background: cat.iconBg, border: `1px solid ${cat.iconBorder}` }}
          >
            {cat.icon}
          </div>

          {/* Name + proximity metadata */}
          <div className="flex flex-col items-start min-w-0 flex-1">
            <div className="flex items-center gap-1.5 flex-wrap min-w-0">
              <span className="font-bold text-xs sm:text-sm text-slate-900 leading-snug truncate">
                {cat.label}
              </span>
              <Badge variant="info" size="sm" className="tabular-nums shrink-0 text-[10px]">
                {cat.count}
              </Badge>
            </div>
            <div className="flex items-center gap-1 mt-0.5 text-xs flex-wrap min-w-0">
              <Badge variant={cat.proximityVariant} size="sm" className="whitespace-nowrap text-[10px] sm:text-xs py-0 px-1.5 font-bold shrink-0">
                {cat.proximityLabel}
              </Badge>
              <span className="text-slate-400 font-medium text-xs whitespace-nowrap">
                · terdekat <strong className="tabular-nums font-semibold text-slate-600 whitespace-nowrap">{cat.nearestKm}</strong>
              </span>
            </div>
          </div>
        </button>

        {/* Map toggle + chevron */}
        <div className="flex items-center gap-2 sm:gap-3 pl-2 shrink-0">
          <div className="flex items-center gap-1.5">
            <span className="hidden sm:inline-block text-[10px] font-bold text-slate-400 uppercase tracking-wider">PETA</span>
            <Toggle on={visible} onToggle={onToggleMap} />
          </div>
          <button
            type="button"
            onClick={onToggleExpand}
            className="flex items-center justify-center rounded-lg p-1.5 transition-transform duration-200 hover:bg-slate-100 text-slate-500 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0F2B38]"
            style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
            aria-label={expanded ? 'Sembunyikan detail' : 'Tampilkan detail'}
          >
            <svg fill="none" height="14" viewBox="0 0 14 14" width="14" aria-hidden="true">
              <path d="M3.5 5.25L7 8.75L10.5 5.25" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            </svg>
          </button>
        </div>
      </div>

      {/* Expanded sub-list */}
      {expanded && (
        <div className="w-full flex flex-col px-4 pb-3 bg-slate-50/70 border-t border-slate-100">
          {cat.items.map((item, i) => (
            <div
              key={i}
              className="flex items-center justify-between w-full py-2.5 border-b border-slate-200/50 last:border-b-0 min-h-[36px]"
            >
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <div className="w-1.5 h-1.5 rounded-full shrink-0 bg-slate-400" />
                <span className="truncate text-xs sm:text-sm font-medium text-slate-800">
                  {item.name}
                </span>
              </div>
              <span className="shrink-0 ml-3 px-2 py-0.5 rounded-full font-bold text-xs text-slate-600 bg-slate-200/70 tabular-nums whitespace-nowrap">
                {item.distance}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

export default function FasilitasWorkspace({ visible, onToggle }: FasilitasWorkspaceProps) {
  const [expanded, setExpanded] = useState<Record<FacilityCategoryKey, boolean>>({
    kesehatan: true,
    pendidikan: false,
    belanja: false,
    stasiun: false,
  })

  const toggleExpand = (key: FacilityCategoryKey) =>
    setExpanded(prev => ({ ...prev, [key]: !prev[key] }))

  const totalVisible = Object.values(visible).filter(Boolean).length

  return (
    <Card variant="default" padding="lg" className="flex flex-col gap-4 w-full">
      {/* Section header */}
      <SectionHeader
        stepNumber={5}
        stepLabel="TAHAP"
        icon={<MapPin size={12} className="text-emerald-400" />}
        title="Fasilitas Terdekat & POI"
        subtitle="8 fasilitas dalam radius ±3 km · aktifkan sakelar untuk menampilkan di peta"
        action={
          <Badge variant={totalVisible > 0 ? 'info' : 'neutral'} size="md" className="tabular-nums">
            {totalVisible} layer aktif
          </Badge>
        }
      />

      {/* Category card */}
      <Card variant="bordered" padding="none" className="w-full bg-white overflow-hidden">
        {CATEGORIES.map((cat) => (
          <CategoryRow
            key={cat.key}
            cat={cat}
            visible={visible[cat.key]}
            expanded={expanded[cat.key]}
            onToggleMap={() => onToggle(cat.key)}
            onToggleExpand={() => toggleExpand(cat.key)}
          />
        ))}
      </Card>
    </Card>
  )
}
