import { useState, useMemo } from 'react'
import { Check, ShieldAlert, Car, MapPin, Building2, Trees, SlidersHorizontal, ClipboardCheck, Eye, EyeOff } from 'lucide-react'
import Card from './ui/Card'
import Badge from './ui/Badge'
import SectionHeader from './ui/SectionHeader'
import ProgressBar from './ui/ProgressBar'

// ── Types ────────────────────────────────────────────────────────────────────

export type ChecklistCategory = 'banjir' | 'perjalanan' | 'akses' | 'fasilitas' | 'lingkungan' | 'all'
type Priority = 'high' | 'medium' | 'low'

export interface ChecklistItemData {
  id: string
  text: string
  category: Exclude<ChecklistCategory, 'all'>
  priority: Priority
  tip?: string
  defaultChecked?: boolean
}

interface ChecklistWorkspaceProps {
  activeCategory?: string
  onSelectCategory?: (category: string) => void
}

// ── Data (Indonesian Localized & Rumper Risk Aligned) ──────────────────────

const CHECKLIST_ITEMS: ChecklistItemData[] = [
  {
    id: 'flood-1',
    text: 'Tanyakan ke minimal 3 warga sekitar tentang riwayat banjir 5 tahun terakhir',
    category: 'banjir',
    priority: 'high',
    tip: 'Tanyakan spesifik kejadian banjir Feb 2024 dan Jan 2020.',
  },
  {
    id: 'flood-2',
    text: 'Inspeksi saluran drainase & got lingkungan setelah hujan deras',
    category: 'banjir',
    priority: 'high',
    tip: 'Lakukan kunjungan maksimal 24 jam setelah hujan deras.',
  },
  {
    id: 'travel-1',
    text: 'Survei lokasi pada jam puncak kemacetan pagi (07:00–09:00)',
    category: 'perjalanan',
    priority: 'medium',
    defaultChecked: true,
    tip: 'Uji estimasi waktu tempuh riil ke stasiun / pintu tol.',
  },
  {
    id: 'access-1',
    text: 'Uji ketiga rute akses jalan utama dan gang sekunder dengan kendaraan',
    category: 'akses',
    priority: 'medium',
    defaultChecked: true,
    tip: 'Pastikan lebar jalan muat 2 mobil berpapasan.',
  },
  {
    id: 'access-2',
    text: 'Cek opsi jalan alternatif saat ada penutupan jalan atau jam sibuk',
    category: 'akses',
    priority: 'medium',
    defaultChecked: true,
  },
  {
    id: 'env-1',
    text: 'Kunjungi lokasi malam hari untuk cek kebisingan kawasan industri',
    category: 'lingkungan',
    priority: 'low',
    tip: 'Hari kerja jam 21:00–23:00 adalah waktu paling ideal untuk observasi.',
  },
  {
    id: 'facilities-1',
    text: 'Verifikasi sumber air bersih dan keandalan suplai PDAM ke pengembang',
    category: 'fasilitas',
    priority: 'low',
    tip: 'Minta tagihan atau rekam jejak suplai air 6 bulan terakhir.',
  },
]

// ── Category config ───────────────────────────────────────────────────────────

const CATEGORY_CONFIG: Record<Exclude<ChecklistCategory, 'all'>, { label: string; badgeVariant: 'danger' | 'warning' | 'info' | 'success' | 'neutral'; icon: typeof ShieldAlert }> = {
  banjir: {
    label: 'Banjir',
    badgeVariant: 'danger',
    icon: ShieldAlert,
  },
  perjalanan: {
    label: 'Perjalanan',
    badgeVariant: 'warning',
    icon: Car,
  },
  akses: {
    label: 'Akses fisik',
    badgeVariant: 'info',
    icon: MapPin,
  },
  fasilitas: {
    label: 'Fasilitas',
    badgeVariant: 'success',
    icon: Building2,
  },
  lingkungan: {
    label: 'Lingkungan',
    badgeVariant: 'neutral',
    icon: Trees,
  },
}

const PRIORITY_CONFIG: Record<Priority, { label: string; badgeVariant: 'danger' | 'warning' | 'neutral' }> = {
  high:   { label: 'Prioritas tinggi', badgeVariant: 'danger' },
  medium: { label: 'Sedang',           badgeVariant: 'warning' },
  low:    { label: 'Rendah',           badgeVariant: 'neutral' },
}

const FILTER_TABS: { id: ChecklistCategory; label: string }[] = [
  { id: 'all',        label: 'Semua Kategori' },
  { id: 'banjir',     label: 'Banjir' },
  { id: 'perjalanan', label: 'Perjalanan' },
  { id: 'akses',      label: 'Akses fisik' },
  { id: 'fasilitas',  label: 'Fasilitas' },
  { id: 'lingkungan', label: 'Lingkungan' },
]

// ── Sub-components ────────────────────────────────────────────────────────────

function CategoryBadge({ category }: { category: Exclude<ChecklistCategory, 'all'> }) {
  const cfg = CATEGORY_CONFIG[category]
  if (!cfg) return null
  const Icon = cfg.icon
  return (
    <Badge variant={cfg.badgeVariant} size="sm" icon={<Icon size={11} />}>
      {cfg.label}
    </Badge>
  )
}

function PriorityBadge({ priority }: { priority: Priority }) {
  const cfg = PRIORITY_CONFIG[priority]
  return (
    <Badge variant={cfg.badgeVariant} size="sm">
      {cfg.label}
    </Badge>
  )
}

// ── Checklist Row Component ───────────────────────────────────────────────────

function ChecklistRow({
  item,
  checked,
  onToggle,
}: {
  item: ChecklistItemData
  checked: boolean
  onToggle: () => void
}) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onToggle}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onToggle()
        }
      }}
      className={`group flex items-start gap-3 p-3.5 sm:p-4 transition-all duration-150 ease-out-decel cursor-pointer min-h-[44px] active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0F2B38] ${
        checked ? 'bg-slate-50/70' : 'hover:bg-slate-50/50'
      }`}
    >
      {/* Accessible Minimum 44px Hit Target Checkbox */}
      <div className="pt-0.5 shrink-0 flex items-center justify-center min-w-[24px] min-h-[24px]">
        <button
          type="button"
          role="checkbox"
          aria-checked={checked}
          onClick={(e) => {
            e.stopPropagation()
            onToggle()
          }}
          className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-150 ease-out-decel cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0F2B38] ${
            checked
              ? 'bg-[#0F2B38] border-[#0F2B38] text-white shadow-2xs'
              : 'border-slate-300 bg-white hover:border-slate-400'
          }`}
          aria-label={item.text}
        >
          {checked && <Check size={12} strokeWidth={2.5} />}
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p
          className={`text-xs sm:text-sm font-semibold transition-all duration-150 text-wrap-pretty ${
            checked ? 'line-through text-slate-400' : 'text-slate-900'
          }`}
        >
          {item.text}
        </p>

        {/* Category + Priority row */}
        <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
          <CategoryBadge category={item.category} />
          <PriorityBadge priority={item.priority} />
        </div>

        {/* Tip */}
        {item.tip && !checked && (
          <div className="mt-2 text-xs leading-relaxed px-3 py-1.5 rounded-lg bg-amber-50/70 border border-amber-200/60 text-amber-900 w-full text-wrap-pretty">
            <span className="font-bold text-amber-900">Tips Lapangan: </span>
            <span className="text-amber-900/90">{item.tip}</span>
          </div>
        )}
      </div>
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

export default function ChecklistWorkspace({ activeCategory = 'all', onSelectCategory }: ChecklistWorkspaceProps) {
  const [checked, setChecked] = useState<Record<string, boolean>>(
    () => Object.fromEntries(CHECKLIST_ITEMS.map(i => [i.id, i.defaultChecked ?? false]))
  )
  const [filterCategory, setFilterCategory] = useState<ChecklistCategory>('all')
  const [hideCompleted, setHideCompleted] = useState(false)

  // Sync external category filter if passed
  const currentCategory = useMemo(() => {
    if (activeCategory && activeCategory !== 'all') {
      const mapped = activeCategory.toLowerCase() as ChecklistCategory
      if (['banjir', 'perjalanan', 'akses', 'fasilitas', 'lingkungan'].includes(mapped)) {
        return mapped
      }
    }
    return filterCategory
  }, [activeCategory, filterCategory])

  const handleCategorySelect = (cat: ChecklistCategory) => {
    setFilterCategory(cat)
    onSelectCategory?.(cat)
  }

  const toggle = (id: string) => setChecked(prev => ({ ...prev, [id]: !prev[id] }))

  const filteredItems = useMemo(() => {
    return CHECKLIST_ITEMS.filter(item => {
      if (currentCategory !== 'all' && item.category !== currentCategory) return false
      if (hideCompleted && checked[item.id]) return false
      return true
    })
  }, [currentCategory, hideCompleted, checked])

  const total = CHECKLIST_ITEMS.length
  const done = CHECKLIST_ITEMS.filter(i => checked[i.id]).length
  const pct = Math.round((done / total) * 100)
  const remaining = total - done

  // SVG Gauge Calculations
  const radius = 20
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (pct / 100) * circumference

  return (
    <Card variant="default" padding="none" className="w-full bg-white overflow-hidden flex flex-col">
      {/* ── Grouped Section Header & Progress Overview ── */}
      <div className="p-4 sm:p-5 flex flex-col gap-3 border-b border-slate-100 bg-white">
        <SectionHeader
          stepNumber={4}
          stepLabel="TAHAP"
          icon={<ClipboardCheck size={12} className="text-emerald-400" />}
          title="Verifikasi Lapangan & Due Diligence"
          subtitle={
            remaining > 0
              ? `${remaining} verifikasi tersisa · diurutkan berdasarkan tingkat risiko`
              : '🎉 Semua langkah verifikasi lapangan telah selesai!'
          }
        />

        <div className="flex items-center justify-between gap-3 pt-0.5">
          <div className="flex items-baseline gap-1.5">
            <span className="font-extrabold text-2xl sm:text-3xl text-slate-900 leading-none tabular-nums">{done}</span>
            <span className="font-bold text-sm sm:text-base text-slate-400 tabular-nums">/ {total}</span>
            <span className="text-xs font-semibold text-slate-700 ml-1">Terverifikasi</span>
          </div>

          {/* SVG Circular Progress Gauge */}
          <div className="relative shrink-0 flex items-center justify-center" style={{ width: 48, height: 48 }}>
            <svg width="48" height="48" viewBox="0 0 50 50" className="transform -rotate-90" aria-hidden="true">
              <circle
                cx="25"
                cy="25"
                r={radius}
                fill="none"
                stroke="#E2E8F0"
                strokeWidth="4.5"
              />
              <circle
                cx="25"
                cy="25"
                r={radius}
                fill="none"
                stroke="#0F2B38"
                strokeWidth="4.5"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                className="transition-all duration-500 ease-out"
              />
            </svg>
            <span className="absolute font-bold text-[11px] text-[#0F2B38] tabular-nums">
              {pct}%
            </span>
          </div>
        </div>

        <ProgressBar value={done} max={total} variant="info" size="md" />
      </div>

      {/* ── Category Segmented Filter & Hide Completed Toolbar ── */}
      <div className="p-3 sm:p-3.5 bg-slate-50/80 border-b border-slate-100 flex flex-col gap-2.5">
        {/* Toolbar Header Row */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
            <SlidersHorizontal size={13} className="text-slate-500" />
            <span>Filter Faktor Risiko:</span>
          </div>

          {/* Distinct Toggle Switch UI Button */}
          <button
            type="button"
            onClick={() => setHideCompleted(!hideCompleted)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-semibold transition-all duration-150 ease-out-decel cursor-pointer min-h-[32px] active:scale-[0.96] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0F2B38] ${
              hideCompleted
                ? 'bg-[#0F2B38] text-white border-[#0F2B38] shadow-2xs'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
            }`}
          >
            {hideCompleted ? (
              <EyeOff size={13} className="text-emerald-400 shrink-0" />
            ) : (
              <Eye size={13} className="text-slate-500 shrink-0" />
            )}
            <span>Sembunyikan selesai</span>
          </button>
        </div>

        {/* Compact Segmented Tab Strip for Category Selection */}
        <div
          className="bg-slate-200/60 p-0.5 rounded-xl flex items-center gap-0.5 overflow-x-auto"
          role="tablist"
          aria-label="Filter Kategori Checklist"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {FILTER_TABS.map(tab => {
            const active = currentCategory === tab.id
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => handleCategorySelect(tab.id)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold whitespace-nowrap transition-all duration-150 ease-out-decel cursor-pointer min-h-[28px] shrink-0 active:scale-[0.96] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0F2B38] ${
                  active
                    ? 'bg-white text-slate-900 font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                }`}
              >
                {tab.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* ── Item Rows ── */}
      <div className="divide-y divide-slate-100">
        {filteredItems.length > 0 ? (
          filteredItems.map(item => (
            <ChecklistRow
              key={item.id}
              item={item}
              checked={checked[item.id]}
              onToggle={() => toggle(item.id)}
            />
          ))
        ) : (
          <div className="py-6 px-4 text-center flex flex-col items-center justify-center gap-1 text-slate-500">
            <p className="text-xs sm:text-sm font-semibold text-slate-700">Tidak ada verifikasi untuk kategori ini.</p>
            <p className="text-xs text-slate-400">Coba pilih filter kategori lain di atas.</p>
          </div>
        )}
      </div>
    </Card>
  )
}
