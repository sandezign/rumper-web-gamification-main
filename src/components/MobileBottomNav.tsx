import { LayoutGrid, Map, MessageSquare, User } from "lucide-react"

export type MobileTab = "workspace" | "map-panel" | "ai-assistant" | "profile"

interface MobileBottomNavProps {
  activeTab: MobileTab
  onTabSelect: (tab: MobileTab) => void
}

export default function MobileBottomNav({
  activeTab,
  onTabSelect,
}: MobileBottomNavProps) {
  const items: { id: MobileTab label: string icon: typeof LayoutGrid }[] = [
    { id: "workspace", label: "Workspace", icon: LayoutGrid },
    { id: "map-panel", label: "Map Panel", icon: Map },
    { id: "ai-assistant", label: "AI Assistant", icon: MessageSquare },
    { id: "profile", label: "Profile", icon: User },
  ]

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-[60] flex h-[60px] items-center justify-around border-t border-[#E2E8F0] bg-white px-2 lg:hidden"
      style={{ boxShadow: "0 -4px 16px rgba(0, 30, 43, 0.08)" }}
    >
      {items.map((item) => {
        const Icon = item.icon
        const isActive = activeTab === item.id

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onTabSelect(item.id)}
            aria-label={item.label}
            aria-current={isActive ? "page" : undefined}
            className="flex flex-col items-center justify-center gap-1 flex-1 py-1 transition-all hover:bg-slate-50 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0F2B38] rounded-xl cursor-pointer"
          >
            <Icon
              size={20}
              color={isActive ? "#0F2B38" : "#64748B"}
              strokeWidth={isActive ? 2.2 : 1.8}
            />
            <span
              className={`text-[11px] leading-none ${
                isActive ? "font-bold" : "font-medium"
              }`}
              style={{ color: isActive ? "#0F2B38" : "#64748B" }}
            >
              {item.label}
            </span>
          </button>
        )
      })}
    </nav>
  )
}
