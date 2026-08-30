import { useState } from "react"
import Card from "./ui/Card"
import Badge from "./ui/Badge"
import Button from "./ui/Button"
import ProgressBar from "./ui/ProgressBar"

const factors = [
  {
    id: "banjir",
    name: "Banjir",
    score: 42,
    tag: "Risiko utama",
    detail: "2 bukti · 1 gap",
    status: "Data sedang",
    iconBgClass: "bg-rose-100/80",
    progressVariant: "danger" as const,
    badgeVariant: "warning" as const,
    icon: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M7 2v1M4.5 4.5L3.5 3.5M9.5 4.5l1-1M2 7h1M11 7h1M4.5 9.5C4.5 8.12 5.62 7 7 7s2.5 1.12 2.5 2.5"
          className="stroke-rose-800"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M3.5 10.5C3.5 9.67 5.07 9 7 9s3.5.67 3.5 1.5"
          className="stroke-rose-800"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    id: "perjalanan",
    name: "Perjalanan",
    score: 58,
    tag: null,
    detail: "1 bukti belum ditinjau",
    status: "Data sedang",
    iconBgClass: "bg-amber-100/80",
    progressVariant: "warning" as const,
    badgeVariant: "warning" as const,
    icon: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        aria-hidden="true"
      >
        <rect
          x="1.5"
          y="4"
          width="11"
          height="7"
          rx="1.5"
          className="stroke-amber-800"
          strokeWidth="1.5"
        />
        <path
          d="M4.5 4V3a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v1"
          className="stroke-amber-800"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path d="M1.5 7h11" className="stroke-amber-800" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    id: "akses",
    name: "Akses fisik",
    score: 67,
    tag: null,
    detail: "Belum ditinjau",
    status: "Perlu validasi",
    iconBgClass: "bg-sky-100/80",
    progressVariant: "info" as const,
    badgeVariant: "warning" as const,
    icon: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M2 11L6 3l2 4 2-2 2 6"
          className="stroke-sky-700"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: "fasilitas",
    name: "Fasilitas",
    score: 78,
    tag: null,
    detail: "Belum ditinjau",
    status: "Data kuat",
    iconBgClass: "bg-emerald-100/80",
    progressVariant: "success" as const,
    badgeVariant: "success" as const,
    icon: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        aria-hidden="true"
      >
        <rect
          x="1.5"
          y="5"
          width="11"
          height="7.5"
          rx="1"
          className="stroke-emerald-800"
          strokeWidth="1.5"
        />
        <path
          d="M4.5 5V3.5a2.5 2.5 0 0 1 5 0V5"
          className="stroke-emerald-800"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    id: "lingkungan",
    name: "Lingkungan",
    score: null,
    tag: null,
    detail: "Bukti belum mencukupi",
    status: "Perlu validasi",
    iconBgClass: "bg-slate-100",
    progressVariant: "neutral" as const,
    badgeVariant: "warning" as const,
    icon: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        aria-hidden="true"
      >
        <circle
          cx="7"
          cy="7"
          r="5.5"
          className="stroke-slate-600"
          strokeWidth="1.5"
        />
        <path
          d="M7 4.5v3l2 1"
          className="stroke-slate-600"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
]

interface FactorRisksCardProps {
  onSelectFactor?: (factorId: string) => void
  onOpenAssistant?: (category: "banjir" | "perjalanan" | "fasilitas" | "checklist" | "negosiasi", score?: number, summary?: string) => void
}

export default function FactorRisksCard({
  onSelectFactor,
  onOpenAssistant,
}: FactorRisksCardProps) {
  const [expanded, setExpanded] = useState(false)
  const visibleFactors = expanded ? factors : factors.slice(0, 3)

  return (
    <Card
      variant="default"
      padding="none"
      className="flex flex-col bg-white overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 sm:px-5 py-4 border-b border-slate-200/80 bg-slate-50/50 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <h3 className="font-bold text-sm text-slate-900">
            Ringkasan 5 Faktor Risiko Lokasi
          </h3>
          <span
            className="cursor-help text-slate-400 hover:text-slate-600 transition-colors"
            title="Ringkasan 5 faktor risiko utama lokasi properti"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              aria-hidden="true"
            >
              <circle
                cx="7"
                cy="7"
                r="6"
                className="stroke-current"
                strokeWidth="1.5"
              />
              <path
                d="M7 6.5v4M7 4.5v.5"
                className="stroke-current"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </div>
        <div className="flex items-center gap-2.5">
          {onOpenAssistant && (
            <button
              type="button"
              onClick={() => onOpenAssistant("banjir", 42, "Risiko paparan genangan air & banjir di sekitar anak Kali")}
              className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-800 border border-rose-200 hover:bg-rose-100 transition-colors shadow-2xs"
            >
              <span className="size-1.5 rounded-full bg-rose-600 animate-pulse" />
              Tanya AI Risiko
            </button>
          )}
          <span className="text-xs text-slate-500 font-semibold tabular-nums">
            {factors.length} faktor dipantau
          </span>
        </div>
      </div>

      {/* Factor Rows */}
      <div className="divide-y divide-slate-100">
        {visibleFactors.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => onSelectFactor?.(f.id)}
            className="w-full text-left flex items-center justify-between gap-2 sm:gap-4 px-4 sm:px-5 py-3.5 min-h-[54px] transition-all duration-150 ease-out-decel hover:bg-slate-50/80 active:scale-[0.98] group focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0F2B38] cursor-pointer"
          >
            {/* 1. Factor Identity: Icon + Name + Tag (Responsive) */}
            <div className="flex items-center gap-2.5 min-w-0 flex-1 sm:flex-none sm:w-52 shrink-0">
              <div
                className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center shrink-0 shadow-2xs ${f.iconBgClass}`}
                aria-hidden="true"
              >
                {f.icon}
              </div>
              <div className="flex items-center gap-1.5 flex-wrap min-w-0">
                <span className="font-bold text-sm text-slate-900 whitespace-nowrap">
                  {f.name}
                </span>
                {f.tag && (
                  <Badge
                    variant="danger"
                    size="sm"
                    className="shrink-0 text-[10px]"
                  >
                    {f.tag}
                  </Badge>
                )}
              </div>
            </div>

            {/* 2. Progress Bar Chart (Hidden on mobile < sm; balanced fixed width on desktop) */}
            <div className="hidden sm:block w-28 md:w-36 lg:w-44 shrink-0">
              <ProgressBar
                value={f.score}
                variant={f.progressVariant}
                size="md"
              />
            </div>

            {/* 3. Score Column (Tabular nums) */}
            <div className="shrink-0 text-right tabular-nums ml-auto sm:ml-0">
              {f.score !== null ? (
                <span className="text-xs font-bold whitespace-nowrap">
                  <span className="text-[#0F2B38] font-extrabold text-sm">
                    {f.score}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-400">
                    /100
                  </span>
                </span>
              ) : (
                <span className="text-xs font-bold text-slate-400">—</span>
              )}
            </div>

            {/* 4. Detail Metadata Column (Hidden on < xl screens to prevent badge overlap) */}
            <div className="hidden xl:block w-40 shrink-0 text-right pr-1">
              <span className="text-xs font-medium text-slate-500 truncate block">
                {f.detail}
              </span>
            </div>

            {/* 5. Status Badge & Action Chevron */}
            <div className="shrink-0 flex items-center justify-end gap-1.5 min-w-[90px] sm:min-w-[110px]">
              <Badge
                variant={f.badgeVariant}
                pulse
                size="sm"
                className="shrink-0 text-[10px] sm:text-[11px]"
              >
                {f.status}
              </Badge>
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                className="shrink-0 opacity-40 group-hover:opacity-80 transition-opacity text-slate-600"
                aria-hidden="true"
              >
                <path
                  d="M5.5 3.5L9 7l-3.5 3.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </button>
        ))}
      </div>

      {/* Expand / Collapse Footer */}
      <div className="p-3 bg-slate-50/40 border-t border-slate-100 flex items-center justify-center">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
          className="text-slate-600 hover:text-slate-900 font-semibold"
        >
          <span>
            {expanded ? "Sembunyikan faktor" : "Tampilkan semua faktor"}
          </span>
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            aria-hidden="true"
            className={`shrink-0 transition-transform duration-200 ${
              expanded ? "rotate-180" : ""
            }`}
          >
            <path
              d="M3.5 5.5L7 9l3.5-3.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Button>
      </div>
    </Card>
  )
}
