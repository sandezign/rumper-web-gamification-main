import { useState } from 'react'
import { Car, Clock, Navigation, CheckCircle2, ShieldCheck, Plus } from 'lucide-react'
import Card from './ui/Card'
import Badge from './ui/Badge'
import SectionHeader from './ui/SectionHeader'

interface RouteOption {
  id: string
  title: string
  destination: string
  duration: string
  mode: string
  riskBadge: 'warning' | 'success' | 'danger' | 'info'
  riskText: string
  recommendedTag?: string
  legs: { mode: string; detail: string; time: string }[]
}

const routes: RouteOption[] = [
  {
    id: 'r1',
    title: 'KRL Commuter Line',
    destination: 'Stasiun Bekasi ➔ Sudirman',
    duration: '45 min',
    mode: 'Transit',
    riskBadge: 'warning',
    riskText: 'Waktu tempuh jam sibuk tinggi',
    recommendedTag: 'Tertinggi',
    legs: [
      { mode: 'Jalan Kaki', detail: 'Ke Halte Galaxy', time: '5 min' },
      { mode: 'Angkot K05', detail: 'Ke Stasiun Bekasi', time: '15 min' },
      { mode: 'KRL Commuter Line', detail: 'Bekasi ➔ Manggarai', time: '25 min' },
    ],
  },
  {
    id: 'r2',
    title: 'Tol Jakarta–Cikampek',
    destination: 'Pintu Tol Bekasi Barat ➔ Semanggi',
    duration: '55 min',
    mode: 'Mobil / Taxi',
    riskBadge: 'danger',
    riskText: 'Potensi macet titik Cikunir',
    legs: [
      { mode: 'Mobil', detail: 'Jalan Raya Pekayon ➔ Tol Japek', time: '15 min' },
      { mode: 'Tol Utama', detail: 'Bekasi Barat ➔ Halim ➔ Semanggi', time: '40 min' },
    ],
  },
  {
    id: 'r3',
    title: 'Rute Arteri / Sepeda Motor',
    destination: 'Jl. Kalimalang ➔ MT Haryono',
    duration: '40 min',
    mode: 'Motor',
    riskBadge: 'info',
    riskText: 'Sensitif terhadap cuaca hujan',
    recommendedTag: 'Tercepat',
    legs: [
      { mode: 'Motor', detail: 'Jl. KH Noer Ali Kalimalang', time: '25 min' },
      { mode: 'Arteri Utama', detail: 'Cawang ➔ Pancoran', time: '15 min' },
    ],
  },
]

interface CommuteWorkspaceProps {
  onSwitchToChecklist?: () => void
}

export default function CommuteWorkspace({ onSwitchToChecklist }: CommuteWorkspaceProps) {
  const [selectedRouteId, setSelectedRouteId] = useState<string>('r1')
  const [addedToChecklist, setAddedToChecklist] = useState<boolean>(false)
  const selectedRoute = routes.find((r) => r.id === selectedRouteId) || routes[0]

  const handleChecklistClick = () => {
    setAddedToChecklist(true)
    onSwitchToChecklist?.()
  }

  return (
    <Card variant="default" padding="lg" className="flex flex-col gap-6">
      {/* ── Section Header ── */}
      <SectionHeader
        stepNumber={3}
        stepLabel="TAHAP"
        icon={<Car size={12} className="text-emerald-400" />}
        title="Mobilitas & Waktu Tempuh Perjalanan"
        subtitle="Analisis aksesibilitas transportasi, rute utama, dan estimasi waktu tempuh komut."
      />

      {/* ── Route Selection Grid Cards ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4">
        {routes.map((r) => {
          const isSelected = r.id === selectedRouteId
          return (
            <button
              key={r.id}
              type="button"
              onClick={() => setSelectedRouteId(r.id)}
              className={`p-4 rounded-2xl text-left transition-all duration-150 ease-out-decel flex flex-col justify-between gap-3 cursor-pointer active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0F2B38] ${
                isSelected
                  ? 'bg-white border-2 border-[#0F2B38] shadow-2xs'
                  : 'bg-slate-50/80 border border-slate-200 hover:bg-white hover:border-slate-300'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="text-xs font-semibold text-slate-500">{r.mode}</span>
                  {r.recommendedTag && (
                    <Badge variant={r.recommendedTag === 'Tercepat' ? 'success' : 'info'} size="sm">
                      {r.recommendedTag}
                    </Badge>
                  )}
                </div>

                <h4 className="font-bold text-sm sm:text-base text-slate-900 leading-snug">
                  {r.title}
                </h4>
                <p className="text-xs text-slate-500 mt-0.5 truncate">{r.destination}</p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <div className="flex items-center gap-1 text-slate-900 font-extrabold text-base sm:text-lg tabular-nums">
                  <Clock size={15} className="text-slate-400" />
                  <span>{r.duration}</span>
                </div>
                <Badge variant={r.riskBadge} size="sm">
                  {r.riskText}
                </Badge>
              </div>
            </button>
          )
        })}
      </div>

      {/* ── Active Route Leg Breakdown Details ── */}
      <Card variant="bordered" padding="md" className="bg-slate-50/60">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between gap-2 flex-wrap pb-2 border-b border-slate-200/80">
            <div className="flex items-center gap-2">
              <Navigation size={16} className="text-[#0F2B38]" />
              <h4 className="font-bold text-sm text-slate-900">
                Detail Rute: {selectedRoute.title}
              </h4>
            </div>
            <span className="text-xs font-semibold text-slate-500 tabular-nums">
              Total estimasi ~{selectedRoute.duration}
            </span>
          </div>

          <div className="flex flex-col divide-y divide-slate-200/60">
            {selectedRoute.legs.map((leg, i) => (
              <div key={i} className="py-2.5 flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 font-bold flex items-center justify-center text-[10px] tabular-nums shrink-0">
                    {i + 1}
                  </span>
                  <span className="font-bold text-slate-900 shrink-0">{leg.mode}</span>
                  <span className="text-slate-400 hidden sm:inline">•</span>
                  <span className="text-slate-600 truncate">{leg.detail}</span>
                </div>
                <span className="font-bold text-slate-900 tabular-nums shrink-0 bg-white px-2 py-0.5 rounded-md border border-slate-200/80">
                  {leg.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* ── Field Verification Recommendation Banner ── */}
      <Card variant="bordered" padding="md" className="bg-[#fffdf5] border-amber-200/90 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <ShieldCheck size={20} className="text-amber-700 shrink-0 mt-0.5" />
          <div>
            <h5 className="text-xs font-bold text-slate-900 tracking-wide">
              Rekomendasi verifikasi lapangan rute perjalanan
            </h5>
            <p className="text-xs text-slate-600 leading-relaxed mt-1 text-wrap-pretty">
              Lakukan uji coba perjalanan ({selectedRoute.title}) pada hari kerja jam 07:15–08:00 WIB untuk mengonfirmasi durasi riil dan kondisi lalu lintas sebelum menyelesaikan komitmen hunian.
            </p>
          </div>
        </div>

        <div className="shrink-0">
          {addedToChecklist ? (
            <button
              disabled
              className="flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-bold cursor-default"
            >
              <CheckCircle2 size={14} className="text-emerald-700" />
              <span>Ditambahkan</span>
            </button>
          ) : (
            <button
              onClick={handleChecklistClick}
              className="flex items-center gap-1 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-[#00E676] text-[#062B23] text-xs font-bold hover:opacity-90 transition-all active:scale-95 cursor-pointer shadow-2xs"
            >
              <Plus size={13} strokeWidth={2.5} className="text-[#062B23]" />
              <span>Checklist</span>
            </button>
          )}
        </div>
      </Card>
    </Card>
  )
}
