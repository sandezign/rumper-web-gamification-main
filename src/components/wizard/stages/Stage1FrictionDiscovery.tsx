import React, { useState } from "react"
import { Check, ChevronDown, Sparkles } from "lucide-react"
import mascotRumper from "../../../../mascott-rumper.webp"
import floodIcon from "../../../assets/illustrations/onboarding/rumper-icon-flood.svg"
import commuteIcon from "../../../assets/illustrations/onboarding/rumper-icon-commute.svg"
import budgetIcon from "../../../assets/illustrations/onboarding/rumper-icon-budget.svg"
import otherIcon from "../../../assets/illustrations/onboarding/rumper-icon-other.svg"

interface Stage1Props {
  onSelect: (friction: string) => void
}

interface ThematicCategory {
  id: string
  category: string
  title: string
  description: string
  tags: string[]
  icon: string
  defaultLabel: string
}

const THEMATIC_CATEGORIES: ThematicCategory[] = [
  {
    id: "flood-environment",
    category: "Banjir & Lingkungan",
    title: "Takut drama banjir & akses jalan tergenang",
    description:
      "Khawatir elevasi tanah rendah, drainase mampet, air tanah keruh, atau beban IPL pompa yang mahal.",
    tags: ["Banjir Musiman", "Elevasi Tanah", "Kualitas Air"],
    icon: floodIcon,
    defaultLabel:
      "Takut drama banjir & jalan akses tergenang pas puncak musim hujan",
  },
  {
    id: "commute-access",
    category: "Akses & Komuter",
    title: "Waktu komut meleset jauh dari brosur",
    description:
      "Klaim '15 menit ke stasiun' ternyata macet parah saat jam sibuk dan bikin stamina habis di jalan.",
    tags: ["KRL / MRT", "Macet Jam Sibuk", "Akses Tol"],
    icon: commuteIcon,
    defaultLabel:
      "Waktu komut riil meleset jauh dari klaim manis brosur marketing",
  },
  {
    id: "budget-transparency",
    category: "Budget & Transparansi",
    title: "Takut boncos di cicilan KPR & biaya tak terduga",
    description:
      "Pusing hitung cicilan bulanan yang aman, biaya renovasi awal, dan takut salah pilih di antara puluhan opsi.",
    tags: ["Cicilan KPR", "Biaya Tak Terduga", "Trade-Off Harga"],
    icon: budgetIcon,
    defaultLabel:
      "Takut boncos di cicilan KPR dan biaya tak terduga pas udah nempatin",
  },
]

export default function Stage1FrictionDiscovery({ onSelect }: Stage1Props) {
  const [selectedId, setSelectedId] = useState<string>("flood-environment")
  const [isOtherOpen, setIsOtherOpen] = useState(false)
  const [customFriction, setCustomFriction] = useState("")

  React.useEffect(() => {
    const defaultCategory = THEMATIC_CATEGORIES[0]
    if (defaultCategory) {
      onSelect(defaultCategory.defaultLabel)
    }
  }, [])

  const handleSelectCategory = (cat: ThematicCategory) => {
    setSelectedId(cat.id)
    setIsOtherOpen(false)
    onSelect(cat.defaultLabel)
  }

  const handleSelectOther = () => {
    setSelectedId("something-else")
    setIsOtherOpen(true)
    onSelect(
      customFriction.trim() ||
        "Ada pertimbangan atau kekhawatiran spesifik lainnya",
    )
  }

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setCustomFriction(val)
    if (selectedId === "something-else") {
      onSelect(
        val.trim() || "Ada pertimbangan atau kekhawatiran spesifik lainnya",
      )
    }
  }

  return (
    <div className="space-y-6">
      {/* Title with Mascot */}
      <div>
        <div className="grid grid-cols-[minmax(0,1fr)_clamp(4.5rem,18vw,6rem)] items-start gap-x-3 sm:grid-cols-[minmax(0,1fr)_7rem] sm:gap-x-5 md:grid-cols-[minmax(0,1fr)_9rem] lg:grid-cols-[minmax(0,1fr)_10rem] lg:gap-x-6">
          <div className="min-w-0 flex-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#E9F5EF] text-[#00684A] text-[11px] font-bold uppercase tracking-wider mb-2">
              <Sparkles size={13} className="text-[#00684A]" />
              <span>Langkah Awal Prioritas</span>
            </div>
            <h2 className="text-2xl font-extrabold leading-tight tracking-tight text-[#001E2B] md:text-3xl text-balance">
              Apa hal yang paling bikin kamu cemas pas cari rumah?
            </h2>
            <p className="text-sm md:text-base text-[#5C6C7A] mt-1 text-pretty">
              Pilih fokus utamamu agar Rumper bisa memprioritaskan penyaringan
              risiko yang paling relevan.
            </p>
          </div>
          <img
            src={mascotRumper}
            alt="Mascot Rumper"
            aria-hidden="true"
            className="h-auto w-full justify-self-end object-contain"
          />
        </div>
      </div>

      {/* Thematic 3-Category Cards */}
      <fieldset className="space-y-3.5">
        <legend className="sr-only">
          Kategori kendala utama mencari rumah
        </legend>
        {THEMATIC_CATEGORIES.map((cat) => {
          const isSelected = selectedId === cat.id

          return (
            <label
              key={cat.id}
              className={`group relative w-full p-4.5 md:p-5 rounded-2xl border cursor-pointer transition-[transform,border-color,background-color,box-shadow] duration-150 flex flex-col gap-3 min-h-[96px] select-none text-left active:scale-[0.98] has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-[#00684A] ${
                isSelected
                  ? "border-[#001E2B] bg-white shadow-sm ring-2 ring-[#001E2B]/5"
                  : "border-[#D7E1E5] bg-white hover:border-[#5C6C7A] hover:bg-[#F6F8F7]"
              }`}
            >
              <input
                type="radio"
                name="friction-category"
                value={cat.id}
                checked={isSelected}
                onChange={() => handleSelectCategory(cat)}
                className="sr-only"
              />

              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3.5 min-w-0">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isSelected
                        ? "bg-[#E9F5EF] scale-105"
                        : "bg-[#F6F8F7] group-hover:scale-105"
                    }`}
                  >
                    <img
                      src={cat.icon}
                      alt=""
                      aria-hidden="true"
                      className="h-7 w-7 object-contain"
                    />
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#00684A] bg-[#E9F5EF] px-2 py-0.5 rounded-full">
                        {cat.category}
                      </span>
                    </div>
                    <h3 className="text-sm md:text-base font-bold text-[#001E2B] leading-snug">
                      {cat.title}
                    </h3>
                    <p className="text-xs md:text-sm text-[#5C6C7A] mt-1 leading-relaxed text-pretty">
                      {cat.description}
                    </p>
                  </div>
                </div>

                <div className="shrink-0 pt-0.5">
                  <div
                    aria-hidden="true"
                    className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                      isSelected
                        ? "bg-[#00ED64] text-[#001E2B] shadow-xs"
                        : "border border-[#D7E1E5] bg-white"
                    }`}
                  >
                    {isSelected && <Check size={14} className="stroke-[3]" />}
                  </div>
                </div>
              </div>

              {/* Keyword Badges */}
              <div className="flex flex-wrap items-center gap-1.5 pl-[62px]">
                {cat.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`text-[11px] font-medium px-2 py-0.5 rounded-md border ${
                      isSelected
                        ? "border-[#00684A]/20 bg-[#E9F5EF]/60 text-[#004F38]"
                        : "border-[#D7E1E5] bg-[#F6F8F7] text-[#5C6C7A]"
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </label>
          )
        })}

        {/* 4th Item: Pertimbangan Lainnya */}
        <div
          className={`rounded-2xl border transition-[border-color,background-color] duration-150 ${
            selectedId === "something-else"
              ? "border-[#001E2B] bg-white shadow-xs"
              : "border-[#D7E1E5] bg-white hover:border-[#5C6C7A]"
          }`}
        >
          <button
            type="button"
            onClick={handleSelectOther}
            className="w-full p-4 flex items-center justify-between min-h-[56px] text-left cursor-pointer active:scale-[0.99] transition-transform"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-9 h-9 rounded-lg bg-[#F6F8F7] flex items-center justify-center shrink-0">
                <img
                  src={otherIcon}
                  alt=""
                  aria-hidden="true"
                  className="h-5 w-5 object-contain"
                />
              </div>
              <div>
                <p className="text-xs md:text-sm font-bold text-[#001E2B]">
                  Ada pertimbangan atau kekhawatiran spesifik lainnya
                </p>
                <p className="text-[11px] text-[#5C6C7A]">
                  Tulis catatan keresahanmu secara mandiri
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div
                aria-hidden="true"
                className={`w-5 h-5 rounded-full flex items-center justify-center ${
                  selectedId === "something-else"
                    ? "bg-[#00ED64] text-[#001E2B]"
                    : "border border-[#D7E1E5]"
                }`}
              >
                {selectedId === "something-else" && (
                  <Check size={12} className="stroke-[3]" />
                )}
              </div>
              <ChevronDown
                size={16}
                className={`text-[#5C6C7A] transition-transform duration-200 ${
                  isOtherOpen ? "rotate-180" : ""
                }`}
              />
            </div>
          </button>

          {isOtherOpen && (
            <div className="px-4 pb-4 pt-1 animate-fadeIn">
              <input
                type="text"
                value={customFriction}
                onChange={handleCustomChange}
                placeholder="Contoh: Takut sengketa tanah, dekat makam, dsb."
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#D7E1E5] text-sm text-[#001E2B] placeholder:text-[#5C6C7A]/60 focus:outline-none focus:border-[#00684A] focus:ring-1 focus:ring-[#00684A] bg-[#F6F8F7]"
              />
            </div>
          )}
        </div>
      </fieldset>
    </div>
  )
}
