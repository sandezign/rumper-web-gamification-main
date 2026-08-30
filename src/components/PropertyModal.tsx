import { useState } from "react"
import {
  X,
  Plus,
  Lock,
  AlertTriangle,
  CheckCircle2,
  OctagonAlert,
  Map,
  MapPin,
  ArrowRight,
  Sparkles,
} from "lucide-react"
import Badge from "./ui/Badge"
import Button from "./ui/Button"
import { PropertyLocation } from "../data/mockProperties"

interface PropertyModalProps {
  isOpen: boolean
  onClose: () => void
  properties: PropertyLocation[]
  activePropertyId: string
  onSelectProperty: (id: string) => void
  onAddProperty: (name: string, location: string) => void
  totalQuota: number
  remainingQuota: number
  onOpenUpgrade: () => void
  onOpenZeroQuotaModal?: () => void
  onOpenCuratedAreas?: () => void
}

function StatusBadge({ status }: { status: string }) {
  if (status === "LANJUTKAN") {
    return (
      <span className="text-[9px] sm:text-[10px] font-black uppercase px-2 py-0.5 rounded-full border bg-emerald-50 text-[#00684A] border-emerald-200 shrink-0 flex items-center gap-1">
        <CheckCircle2 size={11} className="text-[#00684A] shrink-0" />
        Lanjutkan
      </span>
    )
  }
  if (status === "TUNDA") {
    return (
      <span className="text-[9px] sm:text-[10px] font-black uppercase px-2 py-0.5 rounded-full border bg-rose-50 text-rose-800 border-rose-200 shrink-0 flex items-center gap-1">
        <OctagonAlert size={11} className="text-rose-600 shrink-0" />
        Tunda
      </span>
    )
  }
  return (
    <span className="text-[9px] sm:text-[10px] font-black uppercase px-2 py-0.5 rounded-full border bg-amber-50 text-amber-800 border-amber-200 shrink-0 flex items-center gap-1">
      <AlertTriangle size={11} className="text-amber-600 shrink-0" />
      Investigasi
    </span>
  )
}

function ScoreBadge({ score }: { score: number }) {
  const colorClass =
    score >= 80
      ? "bg-emerald-100 text-[#00684A] border-emerald-200"
      : score >= 65
        ? "bg-amber-100 text-amber-900 border-amber-200"
        : "bg-rose-100 text-rose-800 border-rose-200"

  return (
    <div
      className={`w-9 h-9 sm:w-10 sm:h-10 rounded-2xl border flex items-center justify-center shrink-0 font-mono font-black text-xs sm:text-sm ${colorClass}`}
    >
      {score}
    </div>
  )
}

export default function PropertyModal({
  isOpen,
  onClose,
  properties,
  activePropertyId,
  onSelectProperty,
  onAddProperty,
  totalQuota,
  remainingQuota,
  onOpenUpgrade,
  onOpenZeroQuotaModal,
  onOpenCuratedAreas,
}: PropertyModalProps) {
  const [isAdding, setIsAdding] = useState(false)
  const [newName, setNewName] = useState("")
  const [newLocation, setNewLocation] = useState("")

  if (!isOpen) return null

  const activeProperty =
    properties.find((p) => p.id === activePropertyId) || properties[0]
  const savedProperties = properties.filter((p) => p.id !== activePropertyId)

  const handleSelect = (id: string) => {
    onSelectProperty(id)
    onClose()
  }

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newName.trim()) return
    onAddProperty(newName.trim(), newLocation.trim() || "Indonesia")
    setNewName("")
    setNewLocation("")
    setIsAdding(false)
  }

  const handleZeroQuotaPaywall = () => {
    onClose()
    if (onOpenZeroQuotaModal) {
      onOpenZeroQuotaModal()
    } else {
      onOpenUpgrade()
    }
  }

  return (
    <div
      className="fixed inset-0 z-[3000] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="w-full max-w-xl bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[88vh] sm:max-h-[85vh] animate-in slide-in-from-bottom-6 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile handle indicator */}
        <div className="w-12 h-1.5 bg-slate-300 rounded-full mx-auto mt-2.5 mb-1 sm:hidden shrink-0" />

        {/* Modal Header */}
        <div className="flex items-start justify-between px-5 sm:px-6 py-3.5 sm:py-4 border-b border-slate-100 shrink-0">
          <div className="flex flex-col gap-1 min-w-0 pr-2">
            <h2
              id="modal-title"
              className="text-base sm:text-lg font-bold text-slate-900 leading-tight"
            >
              Pilih Properti Aktif
            </h2>
            <div className="flex items-center gap-2 mt-0.5">
              <Badge
                variant={remainingQuota > 0 ? "success" : "danger"}
                size="sm"
                className="text-[10px] sm:text-xs"
              >
                {remainingQuota > 0
                  ? `${remainingQuota} dari ${totalQuota} kuota lokasi tersisa`
                  : `Kuota lokasi penuh (${totalQuota}/${totalQuota})`}
              </Badge>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-900 transition-colors shrink-0 cursor-pointer"
            aria-label="Tutup"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-4 sm:p-6 overflow-y-auto flex flex-col gap-5 sm:gap-6">
          {/* Section 1: SEDANG AKTIF */}
          <div>
            <h3 className="text-[11px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              SEDANG AKTIF
            </h3>
            {activeProperty && (
              <div className="p-3.5 sm:p-4 rounded-[22px] border-2 border-[#001E2B] bg-white shadow-md ring-2 ring-[#001E2B]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3 min-w-0 flex-1">
                  <ScoreBadge score={activeProperty.score} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-extrabold text-xs sm:text-sm text-[#001E2B] truncate leading-snug">
                        {activeProperty.name}
                      </h4>
                      <StatusBadge status={activeProperty.status} />
                      <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-[#001E2B] text-[#00ED64]">
                        Aktif di Workspace
                      </span>
                    </div>
                    <p className="text-[11px] sm:text-xs text-[#5C6C7A] truncate mt-1 flex items-center gap-1">
                      <MapPin size={11} className="text-[#00684A] shrink-0" />
                      <span>
                        {activeProperty.subdistrict}, {activeProperty.city}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                  <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#001E2B] text-[#00ED64] flex items-center gap-1.5">
                    <span>Sedang Dibuka</span>
                    <ArrowRight size={13} />
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Section 2: PROPERTI TERSIMPAN */}
          <div>
            <h3 className="text-[11px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              PROPERTI TERSIMPAN ({savedProperties.length})
            </h3>
            {savedProperties.length > 0 ? (
              <div className="flex flex-col gap-2.5">
                {savedProperties.map((prop) => (
                  <div
                    key={prop.id}
                    className="p-3.5 sm:p-4 rounded-[22px] border border-[#E5E5EA] bg-white hover:border-[#CBD5E1] hover:bg-slate-50/70 transition-all duration-150 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
                  >
                    <div className="flex items-start gap-3 min-w-0 flex-1">
                      <ScoreBadge score={prop.score} />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-extrabold text-xs sm:text-sm text-[#001E2B] group-hover:text-[#00684A] truncate leading-snug">
                            {prop.name}
                          </h4>
                          <StatusBadge status={prop.status} />
                        </div>
                        <p className="text-[11px] sm:text-xs text-[#5C6C7A] truncate mt-1 flex items-center gap-1">
                          <MapPin size={11} className="text-[#00684A] shrink-0" />
                          <span>
                            {prop.subdistrict}, {prop.city}
                          </span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                      <button
                        type="button"
                        onClick={() => handleSelect(prop.id)}
                        className="min-h-[36px] px-3.5 py-1.5 rounded-full text-xs font-bold bg-slate-100 hover:bg-[#001E2B] hover:text-[#00ED64] text-[#001E2B] flex items-center gap-1.5 transition-all cursor-pointer active:scale-95"
                      >
                        <span>Buka di Workspace</span>
                        <ArrowRight size={13} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Scenario 1: Encouraging empty callout when user only has 1 property */
              <div className="p-4 rounded-2xl border border-dashed border-emerald-300 bg-emerald-50/60 flex flex-col gap-2.5 animate-in fade-in duration-150">
                <div className="flex items-center gap-2 text-emerald-900 font-bold text-xs sm:text-sm">
                  <Sparkles size={16} className="text-emerald-600 shrink-0" />
                  <span>Kamu punya {remainingQuota} kuota audit lokasi gratis tersisa</span>
                </div>
                <p className="text-[11px] sm:text-xs text-emerald-800 leading-relaxed">
                  Tambahkan kandidat properti berikutnya untuk membandingkan skor risiko BNPB, elevasi banjir, dan estimasi waktu komut secara berdampingan.
                </p>
              </div>
            )}
          </div>

          {/* Section 3: Add New Property Form / CTA */}
          {isAdding ? (
            <form
              onSubmit={handleAddSubmit}
              className="p-4 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col gap-3"
            >
              <h4 className="font-bold text-xs sm:text-sm text-slate-900">
                Tambah Properti Baru
              </h4>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nama Properti
                </label>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="cth. Cluster Villa Serpong"
                  required
                  className="w-full px-3.5 py-2.5 text-base sm:text-sm bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#001E2B]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Kota / Wilayah
                </label>
                <input
                  type="text"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  placeholder="cth. Tangerang Selatan"
                  className="w-full px-3.5 py-2.5 text-base sm:text-sm bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#001E2B]"
                />
              </div>
              <div className="flex items-center justify-end gap-2 mt-2">
                <Button
                  variant="ghost"
                  size="sm"
                  type="button"
                  onClick={() => setIsAdding(false)}
                >
                  Batal
                </Button>
                <Button variant="primary" size="sm" type="submit">
                  Simpan & Analisis
                </Button>
              </div>
            </form>
          ) : (
            <div className="flex flex-col gap-2 pt-1 pb-2 sm:pb-0">
              {onOpenCuratedAreas && (
                <button
                  type="button"
                  onClick={() => {
                    onClose()
                    onOpenCuratedAreas()
                  }}
                  className="w-full py-3 px-4 rounded-2xl border border-emerald-500/30 bg-emerald-50 hover:bg-emerald-100/80 text-emerald-900 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-[0.98] min-h-[44px]"
                >
                  <Map size={16} className="text-emerald-700 shrink-0" aria-hidden="true" />
                  <span>Jelajahi Peta 8 Wilayah Jabodetabek</span>
                </button>
              )}

              {remainingQuota > 0 ? (
                <button
                  type="button"
                  onClick={() => setIsAdding(true)}
                  className="w-full py-3.5 px-4 rounded-2xl border-2 border-dashed border-slate-300 hover:border-slate-400 hover:bg-slate-50/80 text-slate-700 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-[0.98] min-h-[48px]"
                >
                  <Plus size={18} className="text-slate-500" />
                  <span>Tambah Properti Manual</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleZeroQuotaPaywall}
                  className="w-full py-3.5 px-4 rounded-2xl border border-amber-300 bg-amber-50/80 hover:bg-amber-100 text-amber-900 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-[0.98] min-h-[48px]"
                >
                  <Lock size={16} className="text-amber-700 shrink-0" />
                  <span>
                    Kuota lokasi penuh (5/5). Upgrade untuk tambah lokasi
                  </span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
