import React, { useState } from 'react'
import { Search, ShieldAlert, Train, Compass, Check, AlertTriangle, Calculator, FileCheck } from 'lucide-react'

interface Stage1Props {
  onSelect: (friction: string) => void
}

const FRICTION_OPTIONS = [
  {
    id: 'flood-access',
    label: 'Khawatir risiko banjir & jalan akses tergenang saat musim hujan',
    icon: ShieldAlert,
  },
  {
    id: 'commute-discrepancy',
    label: 'Waktu tempuh komuter riil meleset jauh dari klaim brosur marketing',
    icon: Train,
  },
  {
    id: 'tradeoff-confusion',
    label: 'Bingung membandingkan trade-off lokasi di antara banyak pilihan rumah',
    icon: Compass,
  },
  {
    id: 'essential-facilities',
    label: 'Sulit memastikan keandalan air bersih, RS terdekat, & transportasi umum',
    icon: FileCheck,
  },
  {
    id: 'research-overload',
    label: 'Menghabiskan banyak waktu menyatukan data peta, forum warga, & berita',
    icon: Search,
  },
  {
    id: 'budget-kpr',
    label: 'Menyeimbangkan batas cicilan KPR dengan kenyamanan mobilitas harian',
    icon: Calculator,
  },
  {
    id: 'something-else',
    label: 'Pertimbangan atau kendala penting lainnya',
    icon: AlertTriangle,
  },
]

export default function Stage1FrictionDiscovery({ onSelect }: Stage1Props) {
  const [selectedId, setSelectedId] = useState<string>('flood-access')

  React.useEffect(() => {
    const defaultOption = FRICTION_OPTIONS.find((opt) => opt.id === 'flood-access')
    if (defaultOption) {
      onSelect(defaultOption.label)
    }
  }, [onSelect])

  const handleSelect = (id: string, label: string) => {
    setSelectedId(id)
    onSelect(label)
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Title */}
      <div>
        <div className="text-xs font-bold uppercase tracking-wider text-[#00684A] mb-2 flex items-center gap-1.5">
          <span>01</span>
          <span className="text-[#A8B3BC]">/</span>
          <span>Kendala Pencarian</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-[#001E2B] tracking-tight">
          Apa tantangan terbesar Anda saat mencari rumah?
        </h2>
        <p className="text-sm md:text-base text-[#5C6C7A] mt-1">
          Pilih kendala utama agar kami dapat memprioritaskan analisis risiko yang paling relevan.
        </p>
      </div>

      {/* Selectable List Options */}
      <div className="space-y-3">
        {FRICTION_OPTIONS.map((opt) => {
          const isSelected = selectedId === opt.id
          const Icon = opt.icon

          return (
            <div
              key={opt.id}
              onClick={() => handleSelect(opt.id, opt.label)}
              className={`p-4 md:p-4.5 rounded-2xl border cursor-pointer transition-all duration-200 flex items-center justify-between min-h-[56px] select-none ${
                isSelected
                  ? 'border-[#001E2B] bg-white shadow-sm ring-2 ring-[#001E2B]/5 font-bold text-[#001E2B]'
                  : 'border-[#D7E1E5] bg-white text-[#3D4F5B] hover:border-[#C1CCD6] hover:bg-[#F9FBFA] font-semibold'
              }`}
            >
              <div className="flex items-center gap-3.5 pr-2">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                    isSelected ? 'bg-[#001E2B] text-white' : 'bg-[#F4F7F6] text-[#5C6C7A]'
                  }`}
                >
                  <Icon size={18} />
                </div>
                <span className="text-xs md:text-sm leading-snug">{opt.label}</span>
              </div>

              {isSelected && (
                <div className="w-6 h-6 rounded-full bg-[#00ED64] text-[#001E2B] flex items-center justify-center shrink-0 shadow-xs">
                  <Check size={14} className="stroke-[3]" />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
