import { useState, useEffect, type FormEvent } from "react"
import { MapPin, Plus, Send, X } from "lucide-react"
import svgPaths from "../imports/Sidebar/svg-yz7dulupdq"

interface AssistantDrawerProps {
  open: boolean
  onClose: () => void
}

const QUICK_PROMPTS = [
  "Apakah commute ke SCBD realistis?",
  "Apa risiko banjir utamanya?",
]

/** Full page Rumper advisor screen. Imported sidebar assets remain untouched. */
export default function AssistantDrawer({ open, onClose }: AssistantDrawerProps) {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<string[]>([])

  useEffect(() => {
    if (!open) return
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [open, onClose])

  if (!open) return null

  const sendMessage = (event: FormEvent) => {
    event.preventDefault()
    const nextMessage = message.trim()
    if (!nextMessage) return
    setMessages((current) => [...current, nextMessage])
    setMessage("")
  }

  return (
    <div
      className="fixed inset-0 z-[1200] flex flex-col bg-[#F9FBFA] h-dvh w-full overflow-hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Rumper Advisor"
    >
      {/* Top Header */}
      <header className="sticky top-0 z-20 flex items-center justify-between border-b border-[#E1E5E8] bg-white px-4 py-3 sm:px-6 shadow-2xs">
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#001E2B]" aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d={svgPaths.p15ab3e60} stroke="#00ED64" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
              <path d={svgPaths.p22966600} stroke="#00ED64" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
            </svg>
          </span>
          <div className="min-w-0">
            <h2 className="truncate text-base font-bold text-[#001E2B]">Rumper Advisor</h2>
            <p className="truncate text-xs text-[#5C6C7A]">Evidence-linked, never blind trust</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="flex size-9 shrink-0 items-center justify-center rounded-full text-[#3D4F5B] transition-colors hover:bg-[#F4F7F6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00A65A]"
          aria-label="Tutup asisten"
        >
          <X size={20} />
        </button>
      </header>

      {/* Main Chat Stream Container (Max Width centered for desktop, 100% on mobile) */}
      <main className="flex min-h-0 flex-1 flex-col overflow-y-auto px-4 py-6 sm:px-6">
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-4">
          <section className="rounded-2xl rounded-tl-sm border border-[#E1E5E8] bg-white p-4 text-sm leading-6 text-[#3D4F5B] shadow-[0_1px_2px_rgba(0,30,43,0.04)]">
            Halo! Saya advisor lokasi Rumper untuk Grand Galaxy City — Blok R. Indikasi utama di sini adalah paparan banjir dekat anak Kali Bekasi. Tanyakan apa pun, atau gunakan saran di bawah untuk mengubah bukti menjadi tindakan.
          </section>

          <section className="self-end max-w-[88%] sm:max-w-[80%] rounded-2xl rounded-br-sm bg-[#003D4F] px-4 py-3 text-sm leading-6 text-white shadow-[0_4px_12px_rgba(0,30,43,0.12)]">
            Apa yang perlu ditanyakan kepada developer tentang riwayat banjir?
          </section>

          <section className="rounded-2xl rounded-tl-sm border border-[#E1E5E8] bg-white p-4 text-sm leading-6 text-[#3D4F5B] shadow-[0_1px_2px_rgba(0,30,43,0.04)]">
            <p>Tanyakan langsung kepada sales: “Berdasarkan data InaRISK BNPB 2024, blok ini sekitar 100 m dari anak Kali Bekasi dengan riwayat genangan 30–60 cm. Sistem drainase dan pompa apa yang sudah dipasang sejak 2024, dan berapa elevasi jalan Blok R?”</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-sky-200 bg-sky-50 px-3 py-1.5 text-xs font-semibold text-sky-800">
                <MapPin size={13} /> <span className="truncate">Kali Bekasi Tributary Drainage</span>
              </span>
              <button
                type="button"
                className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-[#00ED64] px-3 py-2 text-xs font-bold text-[#001E2B] transition-colors hover:bg-[#00D972] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00A65A]"
              >
                <Plus size={14} /> Tambah ke checklist kunjungan
              </button>
            </div>
          </section>

          {messages.map((item, index) => (
            <p key={`${item}-${index}`} className="self-end max-w-[88%] sm:max-w-[80%] rounded-2xl rounded-br-sm bg-[#003D4F] px-4 py-3 text-sm leading-6 text-white shadow-[0_2px_8px_rgba(0,30,43,0.1)]">
              {item}
            </p>
          ))}
        </div>
      </main>

      {/* Fixed Bottom Input Area */}
      <div className="border-t border-[#E1E5E8] bg-white px-4 py-3 sm:px-6 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-2.5">
          <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
            {QUICK_PROMPTS.map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => setMessage(prompt)}
                className="shrink-0 rounded-full border border-[#C1CCD6] bg-white px-3.5 py-2 text-xs font-medium text-[#3D4F5B] transition-colors hover:bg-[#F4F7F6] hover:border-[#94A3B8]"
              >
                {prompt}
              </button>
            ))}
          </div>
          <form onSubmit={sendMessage} className="flex items-center gap-2">
            <label className="sr-only" htmlFor="assistant-message">Tanyakan tentang lokasi ini</label>
            <input
              id="assistant-message"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Tanyakan tentang lokasi ini…"
              className="min-h-11 min-w-0 flex-1 rounded-full border border-[#C1CCD6] bg-[#F9FBFA] px-4 text-sm text-[#001E2B] placeholder:text-[#7C8C9A] outline-none transition-shadow focus:border-[#00A65A] focus:ring-2 focus:ring-[#00ED64]/30"
            />
            <button
              type="submit"
              disabled={!message.trim()}
              className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#00ED64] text-[#001E2B] transition-colors hover:bg-[#00D972] disabled:cursor-not-allowed disabled:bg-[#C3F0D2] disabled:text-[#5C6C7A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00A65A]"
              aria-label="Kirim pesan"
            >
              <Send size={17} />
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
