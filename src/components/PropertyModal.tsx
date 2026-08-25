import { useState } from 'react'
import { X, Plus, Lock, AlertTriangle, CheckCircle2, OctagonAlert } from 'lucide-react'
import Badge from './ui/Badge'
import Button from './ui/Button'
import { PropertyLocation } from '../data/mockProperties'

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
}

function StatusBadge({ status }: { status: string }) {
  if (status === 'LANJUTKAN') {
    return (
      <Badge
        variant="success"
        size="sm"
        icon={<CheckCircle2 size={13} className="text-emerald-600 shrink-0" />}
        className="shrink-0 font-bold text-[10px] sm:text-xs px-2.5 py-0.5 whitespace-nowrap"
      >
        Lanjutkan
      </Badge>
    )
  }
  if (status === 'TUNDA') {
    return (
      <Badge
        variant="danger"
        size="sm"
        icon={<OctagonAlert size={13} className="text-rose-600 shrink-0" />}
        className="shrink-0 font-bold text-[10px] sm:text-xs px-2.5 py-0.5 whitespace-nowrap"
      >
        Tunda
      </Badge>
    )
  }
  return (
    <Badge
      variant="warning"
      size="sm"
      icon={<AlertTriangle size={13} className="text-amber-600 shrink-0" />}
      className="shrink-0 font-bold text-[10px] sm:text-xs px-2.5 py-0.5 whitespace-nowrap"
    >
      Investigasi
    </Badge>
  )
}

function RadioButton({ selected }: { selected: boolean }) {
  return (
    <div
      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
        selected ? 'border-[#0F2B38] bg-[#0F2B38]' : 'border-slate-300 bg-white group-hover:border-slate-400'
      }`}
    >
      {selected && <div className="w-2 h-2 rounded-full bg-white" />}
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
}: PropertyModalProps) {
  const [isAdding, setIsAdding] = useState(false)
  const [newName, setNewName] = useState('')
  const [newLocation, setNewLocation] = useState('')

  if (!isOpen) return null

  const activeProperty = properties.find((p) => p.id === activePropertyId) || properties[0]
  const savedProperties = properties.filter((p) => p.id !== activePropertyId)

  const handleSelect = (id: string) => {
    onSelectProperty(id)
    onClose()
  }

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newName.trim()) return
    onAddProperty(newName.trim(), newLocation.trim() || 'Indonesia')
    setNewName('')
    setNewLocation('')
    setIsAdding(false)
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
        className="w-full max-w-lg bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[88vh] sm:max-h-[85vh] animate-in slide-in-from-bottom-6 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile handle indicator */}
        <div className="w-12 h-1.5 bg-slate-300 rounded-full mx-auto mt-2.5 mb-1 sm:hidden shrink-0" />

        {/* Modal Header */}
        <div className="flex items-start justify-between px-5 sm:px-6 py-3.5 sm:py-4 border-b border-slate-100 shrink-0">
          <div className="flex flex-col gap-1 min-w-0 pr-2">
            <h2 id="modal-title" className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
              Pilih Properti Aktif
            </h2>
            <div className="flex items-center gap-2 mt-0.5">
              <Badge variant={remainingQuota > 0 ? 'success' : 'danger'} size="sm" className="text-[10px] sm:text-xs">
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
            <div className="p-3.5 sm:p-4 rounded-2xl border-2 border-[#0F2B38] bg-slate-50/90 flex items-center justify-between gap-3 shadow-xs min-h-[52px]">
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <RadioButton selected={true} />
                <div className="min-w-0 flex-1">
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900 truncate leading-snug">
                    {activeProperty.name}
                  </h4>
                  <p className="text-[11px] sm:text-xs text-slate-500 truncate mt-0.5">
                    {activeProperty.subdistrict}, {activeProperty.city}
                  </p>
                </div>
              </div>
              <StatusBadge status={activeProperty.status} />
            </div>
          </div>

          {/* Section 2: PROPERTI TERSIMPAN */}
          {savedProperties.length > 0 && (
            <div>
              <h3 className="text-[11px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                PROPERTI TERSIMPAN
              </h3>
              <div className="flex flex-col gap-2 sm:gap-2.5">
                {savedProperties.map((prop) => (
                  <button
                    key={prop.id}
                    type="button"
                    onClick={() => handleSelect(prop.id)}
                    className="w-full text-left p-3.5 sm:p-4 rounded-2xl border border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/80 transition-all duration-150 ease-out-decel active:scale-[0.98] flex items-center justify-between gap-3 cursor-pointer group min-h-[52px]"
                  >
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <RadioButton selected={false} />
                      <div className="min-w-0 flex-1">
                        <h4 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-[#0F2B38] truncate leading-snug">
                          {prop.name}
                        </h4>
                        <p className="text-[11px] sm:text-xs text-slate-500 truncate mt-0.5">
                          {prop.subdistrict}, {prop.city}
                        </p>
                      </div>
                    </div>
                    <StatusBadge status={prop.status} />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Section 3: Add New Property Form / CTA */}
          {isAdding ? (
            <form onSubmit={handleAddSubmit} className="p-4 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col gap-3">
              <h4 className="font-bold text-xs sm:text-sm text-slate-900">Tambah Properti Baru</h4>
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
                  className="w-full px-3.5 py-2.5 text-base sm:text-sm bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0F2B38]"
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
                  className="w-full px-3.5 py-2.5 text-base sm:text-sm bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0F2B38]"
                />
              </div>
              <div className="flex items-center justify-end gap-2 mt-2">
                <Button variant="ghost" size="sm" type="button" onClick={() => setIsAdding(false)}>
                  Batal
                </Button>
                <Button variant="primary" size="sm" type="submit">
                  Simpan & Analisis
                </Button>
              </div>
            </form>
          ) : (
            <div className="pt-1 pb-2 sm:pb-0">
              {remainingQuota > 0 ? (
                <button
                  type="button"
                  onClick={() => setIsAdding(true)}
                  className="w-full py-3.5 px-4 rounded-2xl border-2 border-dashed border-slate-300 hover:border-slate-400 hover:bg-slate-50/80 text-slate-700 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-[0.98] min-h-[48px]"
                >
                  <Plus size={18} className="text-slate-500" />
                  <span>Tambah Properti Baru</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    onClose()
                    onOpenUpgrade()
                  }}
                  className="w-full py-3.5 px-4 rounded-2xl border border-amber-300 bg-amber-50/80 hover:bg-amber-100 text-amber-900 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-[0.98] min-h-[48px]"
                >
                  <Lock size={16} className="text-amber-700 shrink-0" />
                  <span>Kuota lokasi penuh (5/5). Upgrade untuk tambah lokasi</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
