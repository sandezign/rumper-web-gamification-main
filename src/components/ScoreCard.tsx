import { Layers, ShieldCheck } from "lucide-react"
import Card from "./ui/Card"
import Badge from "./ui/Badge"
import SectionHeader from "./ui/SectionHeader"

interface ScoreCardProps {
  score?: number
  statusText?: string
  description?: string
  verifiedSourcesCount?: number
}

export default function ScoreCard({
  score = 68,
  statusText = "Layak dengan catatan",
  description = "Grand Galaxy City Block R (Bekasi Selatan) — Risiko banjir sedang & waktu tempuh komut 45 min.",
  verifiedSourcesCount = 6,
}: ScoreCardProps) {
  const radius = 30
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / 100) * circumference

  return (
    <Card
      variant="default"
      padding="none"
      className="p-4 sm:p-6 flex flex-col gap-4 sm:gap-5 bg-white"
    >
      {/* ── Section Header ── */}
      <SectionHeader
        stepNumber={1}
        stepLabel="TAHAP"
        icon={<Layers size={12} className="text-emerald-400" />}
        title="Ringkasan & Indeks Risiko Lokasi"
      />

      {/* ── Hero Score Banner (Side-by-Side Flex Row on both Mobile & Desktop) ── */}
      <div className="bg-slate-50/80 p-4 sm:p-5 rounded-2xl border border-slate-200/70 flex items-center justify-between gap-3 shadow-xs">
        {/* Left: Score & Status */}
        <div className="flex flex-col gap-2 min-w-0 flex-1">
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-500">
            Indeks Keselarasan Lokasi (Mini Check)
          </span>
          <div className="flex items-baseline gap-1.5">
            <span className="font-extrabold text-3xl sm:text-4xl text-[#0F2B38] leading-none tabular-nums tracking-tight">
              {score}
            </span>
            <span className="font-bold text-xs sm:text-sm text-slate-400 tabular-nums">
              /100
            </span>
          </div>
          <div>
            <Badge
              variant={
                score >= 80 ? "success" : score >= 60 ? "warning" : "danger"
              }
              pulse
              size="sm"
              className="font-bold text-[10px] sm:text-xs"
            >
              {statusText}
            </Badge>
          </div>
        </div>

        {/* Right: Radial Ring Gauge (Side-by-side alignment on Mobile & Desktop) */}
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center shrink-0">
          <svg
            width="68"
            height="68"
            viewBox="0 0 72 72"
            aria-hidden="true"
            className="drop-shadow-2xs"
          >
            <circle
              cx="36"
              cy="36"
              r={radius}
              fill="none"
              stroke="#E2E8F0"
              strokeWidth="6"
            />
            <circle
              cx="36"
              cy="36"
              r={radius}
              fill="none"
              stroke="#0F2B38"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              transform="rotate(-90 36 36)"
              className="transition-all duration-500 ease-out"
            />
          </svg>
          <div
            className="absolute inset-0 flex items-center justify-center"
            aria-hidden="true"
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#0F2B38] text-white flex items-center justify-center shadow-2xs">
              <ShieldCheck size={14} className="text-emerald-400" />
            </div>
          </div>
        </div>
      </div>

      {/* ── Description Paragraph ── */}
      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal text-wrap-pretty">
        {description}
      </p>

      {/* ── Bottom Data Provenance Separator Footer ── */}
      <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap text-xs text-slate-500 font-medium">
          <Badge
            variant="neutral"
            pulse
            size="sm"
            className="text-[10px] sm:text-xs font-bold"
          >
            Kekuatan Bukti: Data Sedang
          </Badge>
          <span className="text-slate-300">•</span>
          <span className="text-slate-600 font-medium text-xs">
            Disintesis dari{" "}
            <strong className="font-bold text-[#0F2B38] tabular-nums">
              {verifiedSourcesCount}
            </strong>{" "}
            sumber data spasial resmi
          </span>
        </div>
        <p className="text-[11px] text-slate-500 leading-normal bg-slate-50 p-2.5 rounded-xl border border-slate-200/60">
          💡 <strong>Tips Rumper:</strong> Mini Check awal berbasis data spasial
          & publik — bukan sertifikat final. Wajib cek fisik langsung sebelum
          kamu transfer booking fee atau DP.
        </p>
      </div>
    </Card>
  )
}
