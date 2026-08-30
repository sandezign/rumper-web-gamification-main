import { useState, useEffect, useRef, type FormEvent } from "react"
import {
  MapPin,
  Plus,
  Send,
  X,
  RotateCcw,
  Sparkles,
  ArrowRightLeft,
  CheckCircle2,
} from "lucide-react"
import {
  type AssistantContextPayload,
  type AssistantMessage,
  type AssistantActionChip,
  DOMAIN_PROMPT_LIBRARIES,
  generateAssistantResponse,
} from "../data/aiAssistantKnowledge"

interface AssistantDrawerProps {
  open: boolean
  onClose: () => void
  context: AssistantContextPayload
  onHighlightMap?: (layerId?: string, coords?: [number, number]) => void
  onAddChecklistItem?: (item: {
    title: string
    category: "banjir" | "perjalanan" | "akses" | "fasilitas" | "lingkungan"
    priority: "high" | "medium" | "low"
    tip: string
  }) => void
  onNavigateTab?: (tabId: string) => void
}

export default function AssistantDrawer({
  open,
  onClose,
  context,
  onHighlightMap,
  onAddChecklistItem,
  onNavigateTab,
}: AssistantDrawerProps) {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<AssistantMessage[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [addedChipIds, setAddedChipIds] = useState<Record<string, boolean>>({})
  const chatScrollRef = useRef<HTMLDivElement>(null)
  const streamingTimerRef = useRef<NodeJS.Timeout | null>(null)

  // Current domain config based on context
  const currentDomain =
    DOMAIN_PROMPT_LIBRARIES[context.activeCategory] ||
    DOMAIN_PROMPT_LIBRARIES.overview

  // Initialize or update conversation seed when drawer opens or context changes
  useEffect(() => {
    if (!open) {
      if (streamingTimerRef.current) {
        clearInterval(streamingTimerRef.current)
      }
      return
    }

    const instantSummary = currentDomain.instantSummary(context)
    const initialPrompts = currentDomain.prompts

    const initialMessages: AssistantMessage[] = [
      {
        id: `seed-intro-${context.activeCategory}`,
        sender: "assistant",
        text: `Halo! Aku **Rumper Advisor** untuk **${context.propertyName}** (${context.subdistrict}).\n\n${instantSummary}\n\nPilih pertanyaan cepat di bawah atau ketik langsung hal yang ingin kamu tanyakan sebelum survei lokasi.`,
        timestamp: "Baru saja",
        contextCategory: context.activeCategory,
        actionChips:
          initialPrompts[0]?.response(context).actionChips.slice(0, 1) || [],
      },
    ]

    setMessages(initialMessages)
    setIsTyping(false)
  }, [open, context.activeCategory, context.propertyName])

  // Scroll to bottom on message update
  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight
    }
  }, [messages, isTyping])

  // Handle ESC key
  useEffect(() => {
    if (!open) return
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [open, onClose])

  if (!open) return null

  // Function to simulate streaming token typewriter
  const simulateStreaming = (
    fullText: string,
    actionChips: AssistantActionChip[],
    category = context.activeCategory
  ) => {
    setIsTyping(true)
    const messageId = `asst-${Date.now()}`

    // Insert placeholder empty message
    setMessages((prev) => [
      ...prev,
      {
        id: messageId,
        sender: "assistant",
        text: "",
        timestamp: "Baru saja",
        contextCategory: category,
        actionChips: [],
        isStreaming: true,
      },
    ])

    let currentIndex = 0
    const chunkSize = 3
    const intervalMs = 25

    if (streamingTimerRef.current) {
      clearInterval(streamingTimerRef.current)
    }

    streamingTimerRef.current = setInterval(() => {
      currentIndex += chunkSize
      if (currentIndex >= fullText.length) {
        if (streamingTimerRef.current) {
          clearInterval(streamingTimerRef.current)
        }
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === messageId
              ? {
                  ...msg,
                  text: fullText,
                  actionChips,
                  isStreaming: false,
                }
              : msg
          )
        )
        setIsTyping(false)
      } else {
        const partialText = fullText.slice(0, currentIndex)
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === messageId ? { ...msg, text: partialText } : msg
          )
        )
      }
    }, intervalMs)
  }

  // Handle Quick Prompt Click
  const handleQuickPrompt = (promptItem: {
    question: string
    response: (ctx: AssistantContextPayload) => {
      text: string
      actionChips: AssistantActionChip[]
    }
  }) => {
    if (isTyping) return

    const userMsg: AssistantMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: promptItem.question,
      timestamp: "Baru saja",
    }
    setMessages((prev) => [...prev, userMsg])

    const res = promptItem.response(context)
    setTimeout(() => {
      simulateStreaming(res.text, res.actionChips)
    }, 200)
  }

  // Handle Form Submit
  const handleSendMessage = (event: FormEvent) => {
    event.preventDefault()
    const trimmed = message.trim()
    if (!trimmed || isTyping) return

    const userMsg: AssistantMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: trimmed,
      timestamp: "Baru saja",
    }
    setMessages((prev) => [...prev, userMsg])
    setMessage("")

    const res = generateAssistantResponse(trimmed, context)
    setTimeout(() => {
      simulateStreaming(res.text, res.actionChips)
    }, 250)
  }

  // Reset conversation
  const handleReset = () => {
    if (streamingTimerRef.current) {
      clearInterval(streamingTimerRef.current)
    }
    const instantSummary = currentDomain.instantSummary(context)
    setMessages([
      {
        id: `seed-intro-reset-${Date.now()}`,
        sender: "assistant",
        text: `Percakapan dimulai ulang untuk **${context.propertyName}**.\n\n${instantSummary}`,
        timestamp: "Baru saja",
        contextCategory: context.activeCategory,
        actionChips: [],
      },
    ])
    setIsTyping(false)
  }

  // Handle Action Chip Click
  const handleActionClick = (chip: AssistantActionChip) => {
    if (chip.actionType === "HIGHLIGHT_MAP") {
      onHighlightMap?.(chip.payload.mapLayerId, chip.payload.coordinates)
      setAddedChipIds((prev) => ({ ...prev, [chip.id]: true }))
    } else if (chip.actionType === "ADD_CHECKLIST" && chip.payload.checklistItem) {
      onAddChecklistItem?.(chip.payload.checklistItem)
      setAddedChipIds((prev) => ({ ...prev, [chip.id]: true }))
    } else if (chip.actionType === "NAVIGATE_TAB" && chip.payload.targetTab) {
      onNavigateTab?.(chip.payload.targetTab)
      onClose()
    }
  }

  return (
    <div
      className="fixed inset-0 z-[1200] flex justify-end bg-black/40 backdrop-blur-xs transition-opacity duration-200"
      role="dialog"
      aria-modal="true"
      aria-label="Rumper Advisor"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      {/* Drawer Shell */}
      <div className="flex h-dvh w-full max-w-[480px] flex-col bg-[#F9FBFA] shadow-2xl transition-transform duration-300 ease-out animate-in slide-in-from-right">
        {/* Top Header Bar */}
        <header className="sticky top-0 z-20 flex items-center justify-between border-b border-[#E1E5E8] bg-white px-4 py-3 sm:px-5 shadow-2xs">
          <div className="flex min-w-0 items-center gap-3">
            <span
              className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#001E2B] text-[#00ED64] shadow-xs"
              aria-hidden="true"
            >
              <Sparkles size={18} />
            </span>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="truncate text-base font-bold text-[#001E2B]">
                  Rumper Advisor
                </h2>
                <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 border border-emerald-200">
                  Spatial AI
                </span>
              </div>
              <p className="truncate text-xs text-[#5C6C7A]">
                Teman diskusi risiko spasial & panduan survei fisik
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={handleReset}
              title="Mulai ulang percakapan"
              className="flex size-8 shrink-0 items-center justify-center rounded-full text-[#5C6C7A] hover:bg-[#F4F7F6] hover:text-[#001E2B] transition-colors"
              aria-label="Mulai ulang percakapan"
            >
              <RotateCcw size={16} />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex size-8 shrink-0 items-center justify-center rounded-full text-[#3D4F5B] hover:bg-[#F4F7F6] hover:text-[#001E2B] transition-colors"
              aria-label="Tutup asisten"
            >
              <X size={18} />
            </button>
          </div>
        </header>

        {/* Dynamic Context Telemetry Badge Banner */}
        <div className="border-b border-[#E1E5E8] bg-[#F1F5F9] px-4 py-2 text-xs flex items-center justify-between">
          <div className="flex items-center gap-1.5 min-w-0">
            <MapPin size={13} className="text-[#00A65A] shrink-0" />
            <span className="font-semibold text-[#001E2B] truncate">
              {context.propertyName}
            </span>
            <span className="text-[#94A3B8]">•</span>
            <span className="text-[#5C6C7A] truncate text-[11px]">
              {context.subdistrict}
            </span>
          </div>
          <span
            className={`shrink-0 rounded-md px-2 py-0.5 text-[11px] font-semibold border ${currentDomain.badgeColor}`}
          >
            {currentDomain.title}
            {context.categoryScore ? `: ${context.categoryScore}/100` : ""}
          </span>
        </div>

        {/* Main Chat Feed */}
        <main
          ref={chatScrollRef}
          className="flex min-h-0 flex-1 flex-col overflow-y-auto px-4 py-5 sm:px-5 space-y-4"
        >
          {messages.map((msg) => {
            const isUser = msg.sender === "user"

            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}
              >
                <div
                  className={`max-w-[90%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-2xs ${
                    isUser
                      ? "rounded-br-xs bg-[#003D4F] text-white"
                      : "rounded-tl-xs border border-[#E1E5E8] bg-white text-[#1E293B]"
                  }`}
                >
                  {/* Message Text with simple bold/markdown formatting */}
                  <div className="whitespace-pre-wrap space-y-2">
                    {msg.text.split("\n\n").map((para, pIdx) => (
                      <p key={pIdx}>
                        {para.split("**").map((chunk, cIdx) =>
                          cIdx % 2 === 1 ? (
                            <strong key={cIdx} className="font-bold text-[#001E2B]">
                              {chunk}
                            </strong>
                          ) : (
                            chunk
                          )
                        )}
                      </p>
                    ))}
                  </div>

                  {/* Typing cursor when streaming */}
                  {msg.isStreaming && (
                    <span className="inline-block size-2 ml-1 animate-pulse rounded-full bg-[#00A65A]" />
                  )}
                </div>

                {/* Interactive Action Chips embedded in Assistant responses */}
                {!isUser && msg.actionChips && msg.actionChips.length > 0 && (
                  <div className="mt-2.5 flex flex-wrap gap-2 max-w-[90%]">
                    {msg.actionChips.map((chip) => {
                      const isAdded = addedChipIds[chip.id]

                      return (
                        <button
                          key={chip.id}
                          type="button"
                          disabled={isAdded}
                          onClick={() => handleActionClick(chip)}
                          className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all shadow-2xs ${
                            isAdded
                              ? "bg-emerald-100 text-emerald-800 border border-emerald-300 cursor-default"
                              : chip.actionType === "ADD_CHECKLIST"
                              ? "bg-[#00ED64] text-[#001E2B] hover:bg-[#00D972] border border-[#00C962]"
                              : chip.actionType === "HIGHLIGHT_MAP"
                              ? "bg-sky-50 text-sky-800 hover:bg-sky-100 border border-sky-200"
                              : "bg-purple-50 text-purple-800 hover:bg-purple-100 border border-purple-200"
                          }`}
                        >
                          {isAdded ? (
                            <CheckCircle2 size={13} className="text-emerald-700" />
                          ) : chip.icon === "map-pin" ? (
                            <MapPin size={13} />
                          ) : chip.icon === "plus-checklist" ? (
                            <Plus size={13} />
                          ) : (
                            <ArrowRightLeft size={13} />
                          )}
                          <span>{isAdded ? "Sudah Ditambahkan" : chip.label}</span>
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </main>

        {/* Fixed Bottom Input Area & Quick Prompts */}
        <footer className="border-t border-[#E1E5E8] bg-white px-4 py-3 sm:px-5 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
          <div className="flex flex-col gap-2.5">
            {/* Quick Prompt Chips (Category Filtered) */}
            <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
              {currentDomain.prompts.map((prompt) => (
                <button
                  key={prompt.label}
                  type="button"
                  disabled={isTyping}
                  onClick={() => handleQuickPrompt(prompt)}
                  className="shrink-0 rounded-full border border-[#CBD5E1] bg-[#F8FAFC] px-3.5 py-1.5 text-xs font-medium text-[#334155] transition-colors hover:bg-white hover:border-[#00A65A] hover:text-[#001E2B] disabled:opacity-50"
                >
                  {prompt.label}
                </button>
              ))}
            </div>

            {/* Input Form */}
            <form onSubmit={handleSendMessage} className="flex items-center gap-2">
              <label className="sr-only" htmlFor="assistant-input">
                Tanyakan tentang lokasi ini
              </label>
              <input
                id="assistant-input"
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={`Tanyakan seputar ${currentDomain.title.toLowerCase()}…`}
                disabled={isTyping}
                className="min-h-11 min-w-0 flex-1 rounded-full border border-[#CBD5E1] bg-[#F8FAFC] px-4 text-sm text-[#001E2B] placeholder:text-[#94A3B8] outline-none transition-shadow focus:border-[#00A65A] focus:bg-white focus:ring-2 focus:ring-[#00ED64]/30 disabled:bg-[#F1F5F9]"
              />
              <button
                type="submit"
                disabled={!message.trim() || isTyping}
                className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#00ED64] text-[#001E2B] transition-colors hover:bg-[#00D972] disabled:cursor-not-allowed disabled:bg-[#E2E8F0] disabled:text-[#94A3B8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00A65A]"
                aria-label="Kirim pertanyaan"
              >
                <Send size={17} />
              </button>
            </form>
          </div>
        </footer>
      </div>
    </div>
  )
}
