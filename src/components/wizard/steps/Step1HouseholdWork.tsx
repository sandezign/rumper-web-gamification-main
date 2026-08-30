import React, { useRef } from "react"
import {
  User,
  Heart,
  Users,
  Briefcase,
  Building2,
  Laptop,
  Check,
} from "lucide-react"
import type { HouseholdType, WorkPattern } from "../../../store/useWizardStore"

interface Step1Props {
  householdType: HouseholdType
  workPattern: WorkPattern
  onChange: (fields: {
    householdType?: HouseholdType
    workPattern?: WorkPattern
  }) => void
}

const HOUSEHOLD_OPTIONS: {
  id: HouseholdType
  title: string
  subtitle: string
  icon: React.ElementType
  isDefault?: boolean
}[] = [
  {
    id: "single",
    title: "Lajang / Mandiri",
    subtitle: "Ruang ringkas & akses transit",
    icon: User,
  },
  {
    id: "pasangan",
    title: "Pasangan (Default)",
    subtitle: "Dua titik kerja & ruang bersama",
    icon: Heart,
    isDefault: true,
  },
  {
    id: "keluarga-muda",
    title: "Keluarga dengan Anak",
    subtitle: "Fasilitas kesehatan & sekolah",
    icon: Users,
  },
]

const WORK_OPTIONS: {
  id: WorkPattern
  title: string
  subtitle: string
  icon: React.ElementType
}[] = [
  {
    id: "wfo",
    title: "WFO Penuh (5 Hari)",
    subtitle: "Komuter jam sibuk setiap hari",
    icon: Building2,
  },
  {
    id: "hybrid",
    title: "Hybrid (2–3 Hari WFO)",
    subtitle: "Keseimbangan komuter & WFH",
    icon: Briefcase,
  },
  {
    id: "remote",
    title: "Remote Penuh (WFH)",
    subtitle: "Bebas mobilitas harian kantor",
    icon: Laptop,
  },
]

export default function Step1HouseholdWork({
  householdType,
  workPattern,
  onChange,
}: Step1Props) {
  const sectionBRef = useRef<HTMLDivElement>(null)

  const handleSelectHousehold = (id: HouseholdType) => {
    onChange({ householdType: id })
    // Smooth progressive focus transition to section B
    setTimeout(() => {
      sectionBRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      })
    }, 120)
  }

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Step Header */}
      <div>
        <div className="text-xs font-bold uppercase tracking-wider text-[#00684A] mb-2 flex items-center gap-1.5">
          <span>Profil & Pola Kerja</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-[#001E2B] tracking-tight text-balance">
          Siapa Saja yang Tinggal & Pola Kerjamu?
        </h2>
        <p className="text-sm md:text-base text-[#5C6C7A] mt-1 text-pretty">
          Pilih yang paling pas dengan rencana tempat tinggal dan rutinitas
          mobilitas harianmu.
        </p>
      </div>

      {/* Section A: Tipe Rumah Tangga */}
      <fieldset className="space-y-3">
        <legend className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#5C6C7A]">
          <Users size={16} className="text-[#00684A]" />
          <span>TIPE RUMAH TANGGA</span>
        </legend>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {HOUSEHOLD_OPTIONS.map((opt) => {
            const isSelected = householdType === opt.id
            const Icon = opt.icon

            return (
              <label
                key={opt.id}
                className={`relative p-4 md:p-5 rounded-2xl border cursor-pointer transition-[transform,border-color,background-color,box-shadow] duration-150 flex flex-col justify-between min-h-[110px] select-none active:scale-[0.96] has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-[#00684A] ${
                  isSelected
                    ? "border-[#001E2B] bg-white shadow-sm ring-2 ring-[#001E2B]/10"
                    : "border-[#D7E1E5] bg-white hover:border-[#5C6C7A] hover:bg-[#F6F8F7]"
                }`}
              >
                <input
                  type="radio"
                  name="household-type"
                  value={opt.id}
                  checked={isSelected}
                  onChange={() => handleSelectHousehold(opt.id)}
                  className="sr-only"
                />

                <div className="flex items-start justify-between">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                      isSelected
                        ? "bg-[#001E2B] text-white"
                        : "bg-[#F4F7F6] text-[#5C6C7A]"
                    }`}
                  >
                    <Icon size={18} />
                  </div>

                  {isSelected && (
                    <div className="w-6 h-6 rounded-full bg-[#00ED64] text-[#001E2B] flex items-center justify-center shadow-xs">
                      <Check size={14} className="stroke-[3]" />
                    </div>
                  )}
                </div>

                <div className="mt-3">
                  <h3
                    className={`text-sm md:text-base font-bold ${
                      isSelected ? "text-[#001E2B]" : "text-[#3D4F5B]"
                    }`}
                  >
                    {opt.title}
                  </h3>
                  <p className="text-xs text-[#5C6C7A] font-medium mt-0.5 text-pretty">
                    {opt.subtitle}
                  </p>
                </div>
              </label>
            )
          })}
        </div>
      </fieldset>

      {/* Section B: Pola Bekerja Harian */}
      <fieldset ref={sectionBRef} className="space-y-3 pt-2">
        <legend className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#5C6C7A]">
          <Briefcase size={16} className="text-[#00684A]" />
          <span>POLA BEKERJA HARIAN</span>
        </legend>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {WORK_OPTIONS.map((opt) => {
            const isSelected = workPattern === opt.id
            const Icon = opt.icon

            return (
              <label
                key={opt.id}
                className={`relative p-4 md:p-5 rounded-2xl border cursor-pointer transition-[transform,border-color,background-color,box-shadow] duration-150 flex flex-col justify-between min-h-[110px] select-none active:scale-[0.96] has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-[#00684A] ${
                  isSelected
                    ? "border-[#001E2B] bg-white shadow-sm ring-2 ring-[#001E2B]/10"
                    : "border-[#D7E1E5] bg-white hover:border-[#5C6C7A] hover:bg-[#F6F8F7]"
                }`}
              >
                <input
                  type="radio"
                  name="work-pattern"
                  value={opt.id}
                  checked={isSelected}
                  onChange={() => onChange({ workPattern: opt.id })}
                  className="sr-only"
                />

                <div className="flex items-start justify-between">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                      isSelected
                        ? "bg-[#001E2B] text-white"
                        : "bg-[#F4F7F6] text-[#5C6C7A]"
                    }`}
                  >
                    <Icon size={18} />
                  </div>

                  {isSelected && (
                    <div className="w-6 h-6 rounded-full bg-[#00ED64] text-[#001E2B] flex items-center justify-center shadow-xs">
                      <Check size={14} className="stroke-[3]" />
                    </div>
                  )}
                </div>

                <div className="mt-3">
                  <h3
                    className={`text-sm md:text-base font-bold ${
                      isSelected ? "text-[#001E2B]" : "text-[#3D4F5B]"
                    }`}
                  >
                    {opt.title}
                  </h3>
                  <p className="text-xs text-[#5C6C7A] font-medium mt-0.5 text-pretty">
                    {opt.subtitle}
                  </p>
                </div>
              </label>
            )
          })}
        </div>
      </fieldset>
    </div>
  )
}
