import { Check, Lock, X } from "lucide-react"

export type TimelineNodeStatus = "completed" | "active" | "future" | "locked"

export interface TimelineNode {
  status: TimelineNodeStatus
  top: number
  stepNumber: number
  label: string
  onClick?: () => void
}

interface VerticalTimelineProps {
  nodes: TimelineNode[]
  onClose: () => void
}

/** Full-map navigation overlay. It is intentionally not rendered in the normal report layout. */
export default function VerticalTimeline({
  nodes,
  onClose,
}: VerticalTimelineProps) {
  return (
    <aside
      className="flex h-full w-[280px] flex-col overflow-hidden rounded-2xl border border-[#E1E5E8] bg-white shadow-[0_16px_48px_-8px_rgba(0,30,43,0.22)]"
      aria-label="Navigasi tahap analisis"
    >
      <div className="flex items-center justify-between border-b border-[#E1E5E8] px-4 py-3">
        <div>
          <p className="text-sm font-semibold text-[#001E2B]">Tahap analisis</p>
          <p className="mt-0.5 text-xs text-[#5C6C7A]">
            Pilih untuk mengubah konteks peta
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="flex size-9 items-center justify-center rounded-full text-[#3D4F5B] transition-colors hover:bg-[#F4F7F6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00A65A]"
          aria-label="Tutup navigasi tahap"
        >
          <X size={17} />
        </button>
      </div>

      <ol className="flex flex-1 flex-col gap-1 overflow-y-auto p-3">
        {nodes.map((node) => {
          const isCompleted = node.status === "completed"
          const isActive = node.status === "active"
          const isLocked = node.status === "locked"
          const isClickable = !!node.onClick && !isLocked
          const indicatorClass = isCompleted
            ? "border-[#00A65A] bg-[#00E676] text-[#062B23]"
            : isActive
              ? "border-[#5A2FCC] bg-[#6C3FE0] text-white shadow-[0_0_0_4px_rgba(108,63,224,0.16)]"
              : isLocked
                ? "border-[#CBD5E1] bg-[#F1F5F9] text-[#94A3B8]"
                : "border-[#CBD5E1] bg-white text-[#64748B]"

          return (
            <li key={node.stepNumber}>
              <button
                type="button"
                onClick={() => {
                  node.onClick?.()
                  onClose()
                }}
                disabled={!isClickable}
                className={`flex min-h-12 w-full items-center gap-3 rounded-xl px-2.5 text-left transition-colors ${
                  isActive
                    ? "bg-[#F4F1FF]"
                    : isLocked
                      ? "cursor-not-allowed"
                      : "hover:bg-[#F4F7F6]"
                } focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00A65A]`}
                title={isLocked ? "Upgrade untuk membuka" : node.label}
                aria-current={isActive ? "step" : undefined}
              >
                <span
                  className={`flex size-8 shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold ${indicatorClass}`}
                >
                  {isCompleted ? (
                    <Check size={15} strokeWidth={2.6} />
                  ) : isLocked ? (
                    <Lock size={12} />
                  ) : (
                    node.stepNumber
                  )}
                </span>
                <span
                  className={`text-sm ${
                    isActive
                      ? "font-semibold text-[#001E2B]"
                      : isLocked
                        ? "text-[#94A3B8]"
                        : "font-medium text-[#3D4F5B]"
                  }`}
                >
                  {node.label}
                </span>
              </button>
            </li>
          )
        })}
      </ol>
    </aside>
  )
}
