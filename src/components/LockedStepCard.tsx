interface LockedStepCardProps {
  onUpgrade: () => void
}

export default function LockedStepCard({ onUpgrade }: LockedStepCardProps) {
  return (
    <div
      className="bg-white p-5 opacity-70 cursor-pointer hover:opacity-80 transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#001e2b]"
      style={{ borderRadius: 24, border: "1px solid #e1e5e8" }}
      onClick={onUpgrade}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          onUpgrade()
        }
      }}
      aria-label="Tahap 4 terkunci — buka fitur premium"
    >
      {/* Lock metadata */}
      <div className="flex items-center gap-1.5 mb-3">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <rect
            x="2"
            y="5.5"
            width="8"
            height="5.5"
            rx="1"
            stroke="#94A3B8"
            strokeWidth="1.2"
          />
          <path
            d="M4 5.5V4a2 2 0 0 1 4 0v1.5"
            stroke="#94A3B8"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </svg>
        <span className="text-xs font-medium" style={{ color: "#94A3B8" }}>
          Terbuka setelah upgrade
        </span>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-sm" style={{ color: "#001e2b" }}>
            Tahap 4 · Verifikasi Red Flag
          </h3>

          <div className="flex items-center gap-2 flex-wrap">
            <span
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full"
              style={{ backgroundColor: "#f4ded9", color: "#c95746" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block" />
              High Risk
            </span>
            <span className="text-sm font-medium" style={{ color: "#3d4f5b" }}>
              Verifikasi Bukti Banjir
            </span>
          </div>
        </div>

        <button
          className="flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold shrink-0 transition-colors"
          style={{
            border: "1px solid #c1ccd6",
            color: "#7c8c9a",
            backgroundColor: "transparent",
          }}
          onClick={(e) => {
            e.stopPropagation()
            onUpgrade()
          }}
        >
          Lihat di peta
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M3.5 8.5l5-5M7 3.5h2v2"
              stroke="#7c8c9a"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}
