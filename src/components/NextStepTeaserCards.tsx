import { Lock, ArrowUpRight } from "lucide-react"

const steps = [
  {
    id: 4,
    teaser: "Lihat commute score & peak hour",
    hint: "Terbuka setelah tahap sebelumnya selesai",
    badgeLabel: "Low Risk",
    badgeBg: "#dcfce7",
    badgeColor: "#166534",
    badgeDot: "#22c55e",
    actionLabel: "Verifikasi Akses Jalan",
    showMapLink: true,
  },
  {
    id: 5,
    teaser: "Lihat daftar checklist field verification",
    hint: "Terbuka setelah tahap sebelumnya selesai",
    badgeLabel: "0/7",
    badgeBg: "#f1f5f9",
    badgeColor: "#475569",
    badgeDot: "#94a3b8",
    actionLabel: "Verifikasi Bukti Banjir",
    showMapLink: false,
  },
  {
    id: 6,
    teaser: "Lihat daftar fasilitas sekitar",
    hint: "Terbuka setelah tahap sebelumnya selesai",
    badgeLabel: "80",
    badgeBg: "#e0f2fe",
    badgeColor: "#0369a1",
    badgeDot: "#38bdf8",
    actionLabel: "Lihat fasilitas dalam radius ±3 km.",
    showMapLink: true,
  },
]

export default function NextStepTeaserCards() {
  return (
    <div className="flex flex-col gap-3">
      {steps.map((step) => (
        <div
          key={step.id}
          className="bg-white p-4"
          style={{
            borderRadius: 20,
            border: "1px solid #E4EAED",
            boxShadow: "0 2px 8px rgba(15,42,51,0.05)",
          }}
        >
          {/* Lock hint row */}
          <div className="flex items-center gap-1.5 mb-2">
            <Lock size={11} color="#94A3B8" />
            <span className="text-xs" style={{ color: "#94A3B8" }}>
              {step.hint}
            </span>
          </div>

          {/* Content row */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex flex-col gap-1.5">
              <p className="text-xs font-medium" style={{ color: "#64748B" }}>
                {step.teaser}
              </p>
              <div className="flex items-center gap-2">
                <span
                  className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full"
                  style={{
                    backgroundColor: step.badgeBg,
                    color: step.badgeColor,
                  }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ backgroundColor: step.badgeDot }}
                  />
                  {step.badgeLabel}
                </span>
                <span
                  className="text-xs font-medium"
                  style={{ color: "#3d4f5b" }}
                >
                  {step.actionLabel}
                </span>
              </div>
            </div>

            {step.showMapLink && (
              <button
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-colors hover:bg-slate-50"
                style={{ border: "1px solid #C1CCD6", color: "#7c8c9a" }}
              >
                Lihat di peta
                <ArrowUpRight size={11} />
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
