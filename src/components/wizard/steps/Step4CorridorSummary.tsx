import { useState, useRef, useEffect } from "react"
import {
  Compass,
  CheckCircle2,
  Check,
  Train,
  Home,
  ShieldCheck,
  Sparkles,
  AlertTriangle,
  MapPin,
  Trees,
  Search,
  ChevronDown,
  X,
  Plus,
} from "lucide-react"
import type { WizardFormData } from "../../../store/useWizardStore"

interface Step4Props {
  formData: WizardFormData
  onToggleCorridor: (corridor: string) => void
}

const CORRIDOR_OPTIONS = [
  "Tangerang Selatan (Bintaro, BSD, Serpong)",
  "Depok (Margonda, Sawangan, GDC)",
  "Bekasi (Barat, Summarecon, Timur)",
  "Bogor & Cibubur (Cibinong, Sentul, LRT)",
  "Jakarta Timur / Perbatasan",
  "Jakarta Barat / Tangerang Kota",
]

interface LocationGroup {
  region: string
  items: string[]
}

const LOCATION_GROUPS: LocationGroup[] = [
  {
    region: "Jakarta Selatan & Pusat",
    items: [
      "Sudirman / SCBD (Jaksel)",
      "Mega Kuningan / Rasuna Said (Jaksel)",
      "Gatot Subroto / Slipi (Jaksel/Jakbar)",
      "TB Simatupang / Cilandak (Jaksel)",
      "Kuningan / Setiabudi (Jaksel)",
      "Tebet / Pancoran (Jaksel)",
      "Kemang / Bangka / Ampera (Jaksel)",
      "Pasar Minggu / Pejaten (Jaksel)",
      "Menteng / Thamrin (Jakpus)",
      "Tanah Abang / Kebon Sirih (Jakpus)",
    ],
  },
  {
    region: "Jakarta Barat & Utara",
    items: [
      "Puri Indah / Kembangan (Jakbar)",
      "Kebon Jeruk / Meruya (Jakbar)",
      "Tanjung Duren / Grogol (Jakbar)",
      "Kelapa Gading / Sunter (Jakut)",
      "Pantai Indah Kapuk (PIK / Pluit)",
      "Pademangan / Ancol (Jakut)",
    ],
  },
  {
    region: "Jakarta Timur",
    items: [
      "Rawamangun / Pulomas (Jaktim)",
      "Cakung / Pulo Gebang (Jaktim)",
      "Duren Sawit / Klender (Jaktim)",
      "Ciracas / Cibubur (Jaktim)",
      "Pasar Rebo / Cijantung (Jaktim)",
    ],
  },
  {
    region: "Tangerang & Tangerang Selatan",
    items: [
      "Serpong / BSD City (Tangerang Selatan)",
      "Bintaro Jaya (Tangerang Selatan)",
      "Alam Sutera (Tangerang / Tangsel)",
      "Gading Serpong / Kelapa Dua (Tangerang)",
      "Pamulang / Ciputat (Tangerang Selatan)",
      "Cisauk / Suradita (Kab. Tangerang)",
      "Tangerang Kota / Cipondoh (Tangerang)",
      "Karawaci / Lippo Karawaci (Tangerang)",
      "Cikupa / Citra Raya (Kab. Tangerang)",
    ],
  },
  {
    region: "Depok & Bogor",
    items: [
      "Margonda / UI (Depok)",
      "Sawangan / Bojongsari (Depok)",
      "Grand Depok City / Cilodong (Depok)",
      "Cinere / Limo (Depok)",
      "Cimanggis / Tapos (Depok)",
      "Sentul & Babakan Madang (Bogor)",
      "Cibinong / Bojonggede (Bogor)",
      "Bogor Kota / Baranangsiang (Bogor)",
      "Cileungsi / Kota Wisata (Bogor)",
      "Parung Panjang / Tenjo (Bogor)",
    ],
  },
  {
    region: "Bekasi",
    items: [
      "Bekasi Barat / Summarecon (Bekasi)",
      "Bekasi Timur / Tambun (Bekasi)",
      "Harapan Indah / Medan Satria (Bekasi)",
      "Jatiasih / Pondok Gede (Bekasi)",
      "Grand Galaxy / Pekayon (Bekasi)",
      "Cikarang / Lippo Cikarang (Kab. Bekasi)",
    ],
  },
]

export default function Step4CorridorSummary({
  formData,
  onToggleCorridor,
}: Step4Props) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Handle click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false)
      }
    }
    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isDropdownOpen])

  // Custom selected locations (any selected corridor that is not in CORRIDOR_OPTIONS)
  const customSelectedLocations = formData.selectedCorridors.filter(
    (c) => !CORRIDOR_OPTIONS.includes(c),
  )
  const hasCustomLocations = customSelectedLocations.length > 0

  // Filter groups by search query
  const filteredGroups = LOCATION_GROUPS.map((group) => ({
    region: group.region,
    items: group.items.filter((item) =>
      item.toLowerCase().includes(searchQuery.toLowerCase()),
    ),
  })).filter((group) => group.items.length > 0)

  const isExactMatch = LOCATION_GROUPS.some((g) =>
    g.items.some((item) => item.toLowerCase() === searchQuery.trim().toLowerCase()),
  )

  const handleAddCustom = (locName: string) => {
    const trimmed = locName.trim()
    if (!trimmed) return
    if (!formData.selectedCorridors.includes(trimmed)) {
      onToggleCorridor(trimmed)
    }
    setSearchQuery("")
  }

  const formatRupiah = (valInMillions: number) => {
    if (valInMillions >= 1000) {
      return `Rp ${(valInMillions / 1000).toFixed(1).replace(".0", "")} Miliar`
    }
    return `Rp ${valInMillions} Juta`
  }

  const householdLabelMap = {
    single: "Lajang / Mandiri",
    pasangan: "Pasangan",
    "keluarga-muda": "Keluarga dengan Anak",
  }

  const workLabelMap = {
    wfo: "WFO Penuh",
    hybrid: "Hybrid (2–3 Hari)",
    remote: "Remote Penuh",
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Step Header */}
      <div>
        <div className="text-xs font-bold uppercase tracking-wider text-[#00684A] mb-2 flex items-center gap-1.5">
          <span>Ringkasan Profil</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-[#001E2B] tracking-tight">
          Wilayah Incaran & Ringkasan Profilmu
        </h2>
        <p className="text-sm md:text-base text-[#5C6C7A] mt-1">
          Pilih wilayah Jabodetabek yang lagi kamu lirik dan cek ringkasan
          preferensimu sebelum mulai riset.
        </p>
      </div>

      {/* Main Container Card: Corridor Selectors */}
      <div className="bg-white rounded-3xl p-5 md:p-8 border border-[#D7E1E5] shadow-sm space-y-4">
        <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#5C6C7A]">
          <Compass size={16} className="text-[#001E2B]" />
          <span>Pilih Wilayah Incaran (Bisa Lebih Dari Satu):</span>
        </label>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {CORRIDOR_OPTIONS.map((corridor) => {
            const isChecked = formData.selectedCorridors.includes(corridor)

            return (
              <div
                key={corridor}
                onClick={() => onToggleCorridor(corridor)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between min-h-[56px] select-none ${
                  isChecked
                    ? "border-[#001E2B] bg-white text-[#001E2B] shadow-xs font-bold ring-2 ring-[#001E2B]/5"
                    : "border-[#D7E1E5] bg-white text-[#3D4F5B] hover:border-[#C1CCD6] font-semibold"
                }`}
              >
                <span className="text-xs md:text-sm leading-snug">
                  {corridor}
                </span>

                <div
                  className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                    isChecked
                      ? "bg-[#00ED64] border-[#00ED64] text-[#001E2B]"
                      : "border-[#D7E1E5] bg-[#F4F7F6]"
                  }`}
                >
                  {isChecked && <Check size={14} className="stroke-[3]" />}
                </div>
              </div>
            )
          })}

          {/* New Option: Lokasi lainnya with Search Dropdown */}
          <div className="relative col-span-1 md:col-span-2" ref={dropdownRef}>
            <div
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between min-h-[56px] select-none ${
                hasCustomLocations || isDropdownOpen
                  ? "border-[#001E2B] bg-white text-[#001E2B] shadow-xs font-bold ring-2 ring-[#001E2B]/5"
                  : "border-[#D7E1E5] bg-white text-[#3D4F5B] hover:border-[#C1CCD6] font-semibold"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                    hasCustomLocations || isDropdownOpen
                      ? "bg-[#001E2B] text-white"
                      : "bg-[#F4F7F6] text-[#7C8C9A]"
                  }`}
                >
                  <Search size={15} />
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs md:text-sm leading-snug">
                    Lokasi lainnya
                  </span>
                  {hasCustomLocations ? (
                    <span className="text-[11px] font-bold text-[#004F38] bg-[#E9F5EF] px-2.5 py-0.5 rounded-full border border-[#00ED64]/40">
                      {customSelectedLocations.length} area dipilih
                    </span>
                  ) : (
                    <span className="text-xs text-[#7C8C9A] font-normal hidden sm:inline">
                      — Cari atau tambah area spesifik
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                {hasCustomLocations && (
                  <div className="w-6 h-6 rounded-full border flex items-center justify-center shrink-0 transition-colors bg-[#00ED64] border-[#00ED64] text-[#001E2B]">
                    <Check size={14} className="stroke-[3]" />
                  </div>
                )}
                <ChevronDown
                  size={18}
                  className={`text-[#7C8C9A] transition-transform duration-200 ${
                    isDropdownOpen ? "rotate-180 text-[#001E2B]" : ""
                  }`}
                />
              </div>
            </div>

            {/* Floating Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 z-50 bg-white rounded-2xl border border-[#D7E1E5] shadow-xl overflow-hidden py-2 animate-fadeIn flex flex-col max-h-80">
                {/* Quick Search Bar */}
                <div className="px-3 pb-2 pt-1 border-b border-[#E1E5E8]">
                  <div className="flex items-center gap-2 px-3 py-2 bg-[#F4F7F6] rounded-xl border border-[#D7E1E5] focus-within:border-[#001E2B] focus-within:bg-white transition-all">
                    <Search size={14} className="text-[#7C8C9A] shrink-0" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && searchQuery.trim()) {
                          handleAddCustom(searchQuery)
                        }
                      }}
                      placeholder="Ketik area atau kota..."
                      className="w-full text-xs font-semibold bg-transparent text-[#001E2B] placeholder-[#7C8C9A] outline-none"
                      autoFocus
                    />
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() => setSearchQuery("")}
                        className="text-[#7C8C9A] hover:text-[#001E2B] cursor-pointer"
                      >
                        <X size={12} />
                      </button>
                    )}
                  </div>
                </div>

                {/* Grouped Options List */}
                <div className="overflow-y-auto max-h-60 py-1 space-y-2">
                  {/* Option to add custom location if search query is typed */}
                  {searchQuery.trim() && !isExactMatch && (
                    <div className="px-2 pt-1">
                      <div
                        onClick={() => handleAddCustom(searchQuery)}
                        className="px-3 py-2.5 rounded-xl text-xs md:text-sm cursor-pointer transition-all flex items-center justify-between bg-[#E9F5EF] text-[#004F38] hover:bg-[#D4EFE3] font-bold border border-[#00ED64]/40 select-none"
                      >
                        <span className="flex items-center gap-1.5 truncate">
                          <Plus size={14} className="stroke-[3] shrink-0" />
                          <span>Tambahkan &quot;{searchQuery.trim()}&quot;</span>
                        </span>
                        <span className="text-[10px] uppercase font-extrabold text-[#00684A] bg-white px-2 py-0.5 rounded-md shrink-0">
                          Tambah
                        </span>
                      </div>
                    </div>
                  )}

                  {filteredGroups.length === 0 && !searchQuery.trim() ? (
                    <div className="p-4 text-center text-xs text-[#7C8C9A] font-medium">
                      Ketik nama area atau kota untuk mencari.
                    </div>
                  ) : filteredGroups.length === 0 && searchQuery.trim() && isExactMatch ? (
                    <div className="p-4 text-center text-xs text-[#7C8C9A] font-medium">
                      Lokasi &quot;{searchQuery}&quot; tidak ditemukan.
                    </div>
                  ) : (
                    filteredGroups.map((group) => (
                      <div key={group.region} className="px-2">
                        <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#7C8C9A]">
                          {group.region}
                        </div>
                        {group.items.map((item) => {
                          const isSelected =
                            formData.selectedCorridors.includes(item)
                          return (
                            <div
                              key={item}
                              onClick={() => onToggleCorridor(item)}
                              className={`px-3 py-2.5 rounded-xl text-xs md:text-sm cursor-pointer transition-all flex items-center justify-between select-none ${
                                isSelected
                                  ? "bg-[#E9F5EF] text-[#004F38] font-bold"
                                  : "text-[#001E2B] hover:bg-[#F4F7F6] font-medium"
                              }`}
                            >
                              <span>{item}</span>
                              {isSelected && (
                                <Check
                                  size={16}
                                  className="text-[#00ED64] stroke-[3]"
                                />
                              )}
                            </div>
                          )
                        })}
                      </div>
                    ))
                  )}
                </div>

                {/* Footer action */}
                <div className="px-3 pt-2 pb-1 border-t border-[#E1E5E8] flex items-center justify-between text-xs">
                  <span className="text-[11px] text-[#7C8C9A] font-medium">
                    {formData.selectedCorridors.length} total wilayah dipilih
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen(false)}
                    className="px-3 py-1 rounded-lg bg-[#001E2B] hover:bg-[#003D4F] text-white text-xs font-bold transition-colors cursor-pointer"
                  >
                    Selesai
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Selected Custom Locations Chips (Lokasi Tambahan) */}
          {hasCustomLocations && (
            <div className="col-span-1 md:col-span-2 pt-2 flex flex-wrap gap-2 items-center">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#7C8C9A] mr-1">
                Lokasi Tambahan:
              </span>
              {customSelectedLocations.map((loc) => (
                <span
                  key={loc}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#E9F5EF] text-[#004F38] text-xs font-bold border border-[#00ED64]/40 animate-fadeIn"
                >
                  <MapPin size={12} className="text-[#00684A] shrink-0" />
                  <span>{loc}</span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      onToggleCorridor(loc)
                    }}
                    className="w-4 h-4 rounded-full hover:bg-[#00ED64]/30 flex items-center justify-center text-[#004F38] transition-colors ml-0.5 cursor-pointer"
                    title="Hapus lokasi"
                  >
                    <X size={12} className="stroke-[3]" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Summary Card: Deep Teal Container */}
      <div className="bg-[#001E2B] rounded-3xl p-6 md:p-7 text-white shadow-xl space-y-5 border border-[#003D4F]">
        <div className="flex items-center justify-between border-b border-[#003D4F] pb-4">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 size={18} className="text-[#00ED64]" />
            <h3 className="text-sm md:text-base font-bold text-white tracking-wide">
              Ringkasan Profil Pencarianmu
            </h3>
          </div>
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#00ED64] bg-[#003D4F] px-2.5 py-1 rounded-md border border-[#00475B]">
            PROFIL TERCATAT
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs md:text-sm">
          <div>
            <span className="text-[#A8B3BC] font-medium block">
              Rumah Tangga & Pola Kerja:
            </span>
            <span className="font-bold text-white mt-0.5 block">
              {householdLabelMap[formData.householdType]} ·{" "}
              {workLabelMap[formData.workPattern]}
            </span>
          </div>

          <div>
            <span className="text-[#A8B3BC] font-medium block">
              Rentang Budget:
            </span>
            <span className="font-extrabold text-[#00ED64] mt-0.5 block">
              {formatRupiah(formData.budgetMin)} —{" "}
              {formatRupiah(formData.budgetMax)}
            </span>
          </div>

          <div>
            <span className="text-[#A8B3BC] font-medium block">
              Lokasi Kantor Utama:
            </span>
            <span className="font-bold text-white mt-0.5 block truncate">
              {formData.mainAnchor || "-"}
            </span>
          </div>

          <div>
            <span className="text-[#A8B3BC] font-medium block">
              Lokasi Kantor Pasangan / Lainnya:
            </span>
            <span className="font-bold text-white mt-0.5 block truncate">
              {formData.secondAnchor || "-"}
            </span>
          </div>
        </div>

        {/* Calibrated Scenario Preferences (Toleransi Kompromi) */}
        {Object.keys(formData.scenarioResponses).length > 0 && (
          <div className="pt-3 border-t border-[#003D4F] space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#A8B3BC] block">
              Kalibrasi Toleransi Kompromi (Hasil Simulasi Skenario):
            </span>
            <div className="flex flex-wrap gap-2">
              {formData.scenarioResponses["transit-vs-space"] === "A" && (
                <span className="text-xs font-bold text-[#00ED64] bg-[#003D4F] px-3 py-1 rounded-full border border-[#00475B] inline-flex items-center gap-1.5">
                  <Train size={13} className="shrink-0" aria-hidden="true" />
                  <span>Prioritas Transit KRL</span>
                </span>
              )}
              {formData.scenarioResponses["transit-vs-space"] === "B" && (
                <span className="text-xs font-bold text-[#E1E5E8] bg-[#003D4F] px-3 py-1 rounded-full border border-[#00475B] inline-flex items-center gap-1.5">
                  <Home size={13} className="shrink-0" aria-hidden="true" />
                  <span>Prioritas Luas Ruang</span>
                </span>
              )}
              {formData.scenarioResponses["flood-vs-aesthetic"] === "A" && (
                <span className="text-xs font-bold text-[#00ED64] bg-[#003D4F] px-3 py-1 rounded-full border border-[#00475B] inline-flex items-center gap-1.5">
                  <ShieldCheck size={13} className="shrink-0" aria-hidden="true" />
                  <span>Toleransi Banjir: Nol (Topografi Aman)</span>
                </span>
              )}
              {formData.scenarioResponses["flood-vs-aesthetic"] === "B" && (
                <span className="text-xs font-bold text-[#E1E5E8] bg-[#003D4F] px-3 py-1 rounded-full border border-[#00475B] inline-flex items-center gap-1.5">
                  <Sparkles size={13} className="shrink-0" aria-hidden="true" />
                  <span>Prioritas Estetika & Fasilitas</span>
                </span>
              )}
              {formData.scenarioResponses["flood-vs-aesthetic"] ===
                "reject" && (
                <span className="text-xs font-bold text-[#FF8E7A] bg-[#381612] px-3 py-1 rounded-full border border-[#5C231D] inline-flex items-center gap-1.5">
                  <AlertTriangle size={13} className="shrink-0" aria-hidden="true" />
                  <span>Filter Keras: Anti-Banjir Kritis</span>
                </span>
              )}
              {formData.scenarioResponses["established-vs-quiet"] === "A" && (
                <span className="text-xs font-bold text-[#00ED64] bg-[#003D4F] px-3 py-1 rounded-full border border-[#00475B] inline-flex items-center gap-1.5">
                  <MapPin size={13} className="shrink-0" aria-hidden="true" />
                  <span>Akses Fasilitas Jalan Kaki</span>
                </span>
              )}
              {formData.scenarioResponses["established-vs-quiet"] === "B" && (
                <span className="text-xs font-bold text-[#E1E5E8] bg-[#003D4F] px-3 py-1 rounded-full border border-[#00475B] inline-flex items-center gap-1.5">
                  <Trees size={13} className="shrink-0" aria-hidden="true" />
                  <span>Prioritas Ketenangan & Privasi</span>
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
