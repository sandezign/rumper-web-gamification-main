import { useState, useEffect } from "react"
import {
  CheckCircle2,
  Circle,
  Plus,
  Layers,
  FileText,
  AlertCircle,
} from "lucide-react"
import Card from "./ui/Card"
import SectionHeader from "./ui/SectionHeader"

interface DeepDiveEvidenceWorkspaceProps {
  activeCategory?: string
  onSelectCategory?: (catId: string) => void
  onSwitchToChecklist: () => void
  onOpenAssistant?: (
    category: "banjir" | "perjalanan" | "fasilitas" | "checklist" | "negosiasi",
    score?: number,
    summary?: string
  ) => void
}

interface CategoryConfig {
  id: string
  label: string
  score: number | null
  tag: string | null
  detail: string
  iconBg: string
  iconColor: string
  icon: React.ReactNode
}

const categories: CategoryConfig[] = [
  {
    id: "banjir",
    label: "Banjir",
    score: 42,
    tag: "RISIKO UTAMA",
    detail: "2 bukti",
    iconBg: "#FEE2E2",
    iconColor: "#DC2626",
    icon: (
      <svg
        width="15"
        height="15"
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M8 2.5c-3 0-5.5 2.5-5.5 5.5 0 2.5 1.5 4.5 3.5 5"
          stroke="#DC2626"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M4 10c1-1 2.5-1.5 4-1.5s3 .5 4 1.5"
          stroke="#DC2626"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M6 12c.5-.5 1.2-.8 2-.8s1.5.3 2 .8"
          stroke="#DC2626"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    id: "perjalanan",
    label: "Perjalanan",
    score: 58,
    tag: null,
    detail: "1 bukti",
    iconBg: "#FEF3C7",
    iconColor: "#D97706",
    icon: (
      <svg
        width="15"
        height="15"
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden="true"
      >
        <rect
          x="2"
          y="5"
          width="12"
          height="7"
          rx="1.5"
          stroke="#D97706"
          strokeWidth="1.5"
        />
        <path
          d="M5 5V4a1.5 1.5 0 0 1 3 0v1M8 5V4a1.5 1.5 0 0 1 3 0v1"
          stroke="#D97706"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path d="M2 8h12" stroke="#D97706" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    id: "akses",
    label: "Akses fisik",
    score: 67,
    tag: null,
    detail: "1 bukti",
    iconBg: "#E0F2FE",
    iconColor: "#0284C7",
    icon: (
      <svg
        width="15"
        height="15"
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M2 13L6 4l2.5 5 2-2.5L14 13"
          stroke="#0284C7"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: "lingkungan",
    label: "Lingkungan",
    score: null,
    tag: null,
    detail: "1 bukti",
    iconBg: "#F1F5F9",
    iconColor: "#64748B",
    icon: (
      <svg
        width="15"
        height="15"
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="8" cy="8" r="6" stroke="#64748B" strokeWidth="1.5" />
        <path
          d="M8 5v4l2.5 1.5"
          stroke="#64748B"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    id: "fasilitas",
    label: "Fasilitas",
    score: 78,
    tag: null,
    detail: "1 bukti",
    iconBg: "#DCFCE7",
    iconColor: "#16A34A",
    icon: (
      <svg
        width="15"
        height="15"
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden="true"
      >
        <rect
          x="2"
          y="6"
          width="12"
          height="8"
          rx="1"
          stroke="#16A34A"
          strokeWidth="1.5"
        />
        <path
          d="M5 6V4.5a3 3 0 0 1 6 0V6"
          stroke="#16A34A"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
]

interface EvidenceItem {
  id: string
  number: number
  title: string
  description: string
  status: string
  source: string
  type: string
  reviewed: boolean
  iconBg: string
  iconColor: string
}

interface EvidenceGap {
  id: string
  title: string
  description: string
  addedToChecklist: boolean
}

const evidenceByCategory: Record<string, {
  items: EvidenceItem[]
  gaps: EvidenceGap[]
}> = {
  banjir: {
    items: [
      {
        id: "ev_01",
        number: 1,
        title: "Zona bahaya banjir BNPB",
        description:
          "Lokasi berada dalam zona bahaya banjir sedang–tinggi berdasarkan model hazard BNPB.",
        status: "Data sedang",
        source: "BNPB · 2024",
        type: "Model hazard banjir",
        reviewed: true,
        iconBg: "#FEE2E2",
        iconColor: "#DC2626",
      },
      {
        id: "ev_02",
        number: 2,
        title: "Riwayat banjir Februari 2024",
        description:
          "Area sekitar tercatat mengalami genangan pada Februari 2024.",
        status: "Data sedang",
        source: "BPBD Kota Bekasi · 2024",
        type: "Laporan kejadian",
        reviewed: false,
        iconBg: "#E0E7FF",
        iconColor: "#4F46E5",
      },
    ],
    gaps: [
      {
        id: "gap_01",
        title: "Elevasi jalan masuk & kondisi drainase lokal",
        description:
          "Tidak ada data publik yang cukup untuk memastikan elevasi jalan masuk dan kualitas drainase lokal.",
        addedToChecklist: false,
      },
    ],
  },
  perjalanan: {
    items: [
      {
        id: "ev_tr_01",
        number: 1,
        title: "Aksesibilitas KRL Commuter Line",
        description:
          "Jarak 1.2 km ke Stasiun Bekasi dengan waktu tempuh ~12 min via jalan lokal.",
        status: "Data sedang",
        source: "KAI Commuter · 2024",
        type: "Transit data",
        reviewed: true,
        iconBg: "#FEF3C7",
        iconColor: "#D97706",
      },
    ],
    gaps: [],
  },
  akses: {
    items: [
      {
        id: "ev_ak_01",
        number: 1,
        title: "Lebar badan jalan & perkerasan",
        description:
          "Jalan depan lokasi memiliki lebar 5.5m perkerasan aspal dalam kondisi baik.",
        status: "Data sedang",
        source: "Survei Lapangan · 2024",
        type: "Aksesibilitas fisik",
        reviewed: false,
        iconBg: "#E0F2FE",
        iconColor: "#0284C7",
      },
    ],
    gaps: [],
  },
  lingkungan: {
    items: [
      {
        id: "ev_lg_01",
        number: 1,
        title: "Tingkat kebisingan & polusi industri",
        description: "Lokasi berada 800m dari zona industri ringan Pekayon.",
        status: "Perlu validasi",
        source: "KLHK · 2023",
        type: "Kualitas lingkungan",
        reviewed: false,
        iconBg: "#F1F5F9",
        iconColor: "#64748B",
      },
    ],
    gaps: [],
  },
  fasilitas: {
    items: [
      {
        id: "ev_fas_01",
        number: 1,
        title: "Jangkauan fasilitas kesehatan & retail",
        description:
          "Terdapat 3 fasilitas kesehatan dan 2 pusat perbelanjaan dalam radius 1 km.",
        status: "Data kuat",
        source: "OpenStreetMap · 2024",
        type: "POI Fasilitas",
        reviewed: true,
        iconBg: "#DCFCE7",
        iconColor: "#16A34A",
      },
    ],
    gaps: [],
  },
}

export default function DeepDiveEvidenceWorkspace({
  activeCategory = "banjir",
  onSelectCategory,
  onSwitchToChecklist,
  onOpenAssistant,
}: DeepDiveEvidenceWorkspaceProps) {
  const [selectedCat, setSelectedCat] = useState<string>(activeCategory)
  const [reviewState, setReviewState] = useState<Record<string, boolean>>({})
  const [checklistMap, setChecklistMap] = useState<Record<string, boolean>>({})

  useEffect(() => {
    if (activeCategory) setSelectedCat(activeCategory)
  }, [activeCategory])

  const handleSelect = (catId: string) => {
    setSelectedCat(catId)
    onSelectCategory?.(catId)
  }

  const toggleReview = (id: string, defaultState: boolean) => {
    setReviewState((prev) => ({
      ...prev,
      [id]: prev[id] !== undefined ? !prev[id] : !defaultState,
    }))
  }

  const isReviewed = (id: string, defaultState: boolean) => {
    return reviewState[id] !== undefined ? reviewState[id] : defaultState
  }

  const addToChecklist = (gapId: string) => {
    setChecklistMap((prev) => ({ ...prev, [gapId]: true }))
    onSwitchToChecklist()
  }

  const cat = categories.find((c) => c.id === selectedCat) || categories[0]
  const data = evidenceByCategory[selectedCat] || { items: [], gaps: [] }

  return (
    <Card
      variant="default"
      padding="lg"
      className="flex flex-col gap-4 sm:gap-5"
    >
      {/* ── Section Header ── */}
      <SectionHeader
        stepNumber={2}
        stepLabel="TAHAP"
        icon={<Layers size={12} className="text-emerald-400" />}
        title="Faktor Risiko & Evidensi"
        subtitle="Tinjau bukti spasial & kesenjangan data per faktor risiko biar kamu punya pegangan fakta saat survei."
      />

      {/* ── Category Pill Tabs Bar (Clean, no extra labels on pills as requested) ── */}
      <div
        className="w-full overflow-x-auto pb-1 -mb-1"
        role="tablist"
        aria-label="Kategori Faktor Risiko"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <div className="flex items-center gap-2.5 min-w-max px-0.5">
          {categories.map((c) => {
            const isActive = c.id === selectedCat
            const evidenceCount = evidenceByCategory[c.id]?.items.length || 0

            return (
              <button
                key={c.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => handleSelect(c.id)}
                className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl transition-all duration-150 ease-out-decel cursor-pointer min-h-[46px] active:scale-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0F2B38] ${
                  isActive
                    ? "bg-white border-2 border-[#0F2B38] shadow-2xs"
                    : "bg-slate-50/80 border border-slate-200/90 hover:bg-white hover:border-slate-300"
                }`}
              >
                {/* Circular Icon Wrapper */}
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-2xs"
                  style={{ backgroundColor: c.iconBg }}
                >
                  {c.icon}
                </div>

                <div className="flex flex-col text-left">
                  {/* Category Title */}
                  <span className="font-bold text-xs sm:text-sm text-slate-900 leading-tight">
                    {c.label}
                  </span>

                  {/* Score & Evidence Count Line */}
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span
                      className={`text-xs font-bold tabular-nums ${
                        c.score !== null && c.score < 50
                          ? "text-red-600"
                          : "text-slate-700"
                      }`}
                    >
                      {c.score !== null ? `${c.score}/100` : "—"}
                    </span>
                    <span className="text-[11px] text-slate-500 font-normal tabular-nums">
                      {evidenceCount} bukti
                    </span>
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* ── Active Category Subheader ── */}
      <div className="flex items-center justify-between gap-2 my-0.5 flex-wrap">
        <div className="flex items-center gap-2">
          <h3 className="text-base sm:text-lg font-bold text-slate-900">
            {cat.label}
          </h3>
          {cat.tag && (
            <span className="bg-rose-100 text-rose-700 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              {cat.tag}
            </span>
          )}
        </div>
        {onOpenAssistant && (
          <button
            type="button"
            onClick={() =>
              onOpenAssistant(
                (selectedCat as any) || "banjir",
                cat.score ?? 42,
                `Analisis bukti spasial kategori ${cat.label}`
              )
            }
            className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800 border border-emerald-200 hover:bg-emerald-100 transition-colors shadow-2xs"
          >
            <span className="size-1.5 rounded-full bg-[#00A65A] animate-pulse" />
            Tanya AI tentang {cat.label}
          </button>
        )}
      </div>

      {/* ── Evidence & Gap Items ── */}
      <div className="flex flex-col gap-4">
        {/* ── BUKTI TERDAFTAR Section ── */}
        {data.items.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-2.5">
              <FileText size={16} className="text-slate-800" />
              <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                Bukti terdaftar (
                <span className="tabular-nums">{data.items.length}</span>)
              </h4>
            </div>

            <div className="flex flex-col gap-3">
              {data.items.map((item) => {
                const reviewed = isReviewed(item.id, item.reviewed)
                return (
                  <Card
                    key={item.id}
                    variant="bordered"
                    padding="none"
                    className="p-4 sm:p-4.5 bg-white border-slate-200/90 rounded-2xl"
                  >
                    <div className="flex flex-col gap-3">
                      {/* Top Row: Icon + (Title, Badge, Description Column) + Action Button */}
                      <div className="flex items-start justify-between gap-3 w-full">
                        <div className="flex items-start gap-3 min-w-0 flex-1">
                          {/* Circular Document Icon */}
                          <div
                            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full shrink-0 flex items-center justify-center shadow-2xs mt-0.5"
                            style={{ backgroundColor: item.iconBg }}
                          >
                            <FileText
                              size={18}
                              style={{ color: item.iconColor }}
                            />
                          </div>

                          {/* Text Column: Title line + Description directly below */}
                          <div className="flex flex-col gap-1 min-w-0 flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h5 className="font-bold text-xs sm:text-sm text-slate-900 leading-snug">
                                {item.title}
                              </h5>
                              <span className="bg-amber-100/90 text-amber-900 px-2.5 py-0.5 rounded-full text-[10px] font-semibold shrink-0">
                                {item.status}
                              </span>
                            </div>

                            {/* Caption / Description tightly coupled under Title */}
                            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed text-wrap-pretty mt-0.5">
                              {item.description}
                            </p>
                          </div>
                        </div>

                        {/* Action Button: Flush Right */}
                        <div className="shrink-0">
                          {reviewed ? (
                            <button
                              onClick={() =>
                                toggleReview(item.id, item.reviewed)
                              }
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#E6F4EA] border border-[#34A853] text-[#137333] text-xs font-semibold hover:bg-[#d4edd9] transition-colors cursor-pointer"
                            >
                              <CheckCircle2
                                size={14}
                                className="text-[#34A853]"
                              />
                              <span>Ditinjau</span>
                            </button>
                          ) : (
                            <button
                              onClick={() =>
                                toggleReview(item.id, item.reviewed)
                              }
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors cursor-pointer"
                            >
                              <Circle size={14} className="text-slate-400" />
                              <span>Tinjau</span>
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Metadata Footer Bar */}
                      <div className="flex items-center gap-2 text-xs text-slate-500 font-medium pl-12 sm:pl-13 pt-2.5 border-t border-slate-100">
                        <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md text-[10px] sm:text-[11px] font-semibold tabular-nums">
                          {item.source}
                        </span>
                        <span className="text-slate-300">•</span>
                        <span className="text-slate-600 font-medium text-[11px] sm:text-xs">
                          {item.type}
                        </span>
                      </div>
                    </div>
                  </Card>
                )
              })}
            </div>
          </div>
        )}

        {/* ── CATATAN EVIDEN GAP Section ── */}
        {data.gaps.length > 0 && (
          <div className="mt-2">
            <div className="flex items-center gap-2 mb-2.5">
              <AlertCircle size={16} className="text-amber-600" />
              <h4 className="text-xs sm:text-sm font-bold text-amber-950">
                Catatan eviden gap (
                <span className="tabular-nums">{data.gaps.length}</span>)
              </h4>
            </div>

            <div className="flex flex-col gap-3">
              {data.gaps.map((gap) => {
                const added = checklistMap[gap.id] || false
                return (
                  <Card
                    key={gap.id}
                    variant="bordered"
                    padding="none"
                    className="p-4 sm:p-4.5 bg-white border-slate-200/90 rounded-2xl"
                  >
                    <div className="flex flex-col gap-2.5">
                      {/* Top Header Row: Title + Badge (Left) vs Checklist Button (Flush Right) */}
                      <div className="flex items-start justify-between gap-3 w-full">
                        <div className="flex flex-col gap-1 min-w-0 flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h5 className="font-bold text-xs sm:text-sm text-slate-900 leading-snug">
                              {gap.title}
                            </h5>
                            <span className="bg-amber-100/90 text-amber-900 px-2.5 py-0.5 rounded-full text-[10px] font-semibold shrink-0">
                              Perlu validasi
                            </span>
                          </div>
                        </div>

                        {/* Vibrant Neon Green Checklist Button: Flush Right */}
                        <div className="shrink-0">
                          {added ? (
                            <button
                              disabled
                              className="flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-bold cursor-default"
                            >
                              <CheckCircle2
                                size={14}
                                className="text-emerald-700"
                              />
                              <span>Ditambahkan</span>
                            </button>
                          ) : (
                            <button
                              onClick={() => addToChecklist(gap.id)}
                              className="flex items-center gap-1 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-[#00E676] text-[#062B23] text-xs font-bold hover:opacity-90 transition-all active:scale-95 cursor-pointer shadow-2xs"
                            >
                              <Plus
                                size={13}
                                strokeWidth={2.5}
                                className="text-[#062B23]"
                              />
                              <span>Checklist</span>
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed text-wrap-pretty">
                        {gap.description}
                      </p>
                    </div>
                  </Card>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}
