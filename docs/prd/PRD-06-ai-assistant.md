# PRD-06: AI Location Assistant

## Metadata

| Field | Value |
|---|---|
| **Author** | Rumper Product Agent & Senior PM |
| **Status** | Approved / Active Production Specification |
| **Created** | 2026-08-22 |
| **Version** | 2.0 |
| **Target Path** | [`docs/prd/PRD-06-ai-assistant.md`](file:///Users/arisandy/Downloads/Rumper%20App/rumper-web-gamification-main/docs/prd/PRD-06-ai-assistant.md) |
| **Baseline Documents** | [`PRD-00-overview-architecture.md`](file:///Users/arisandy/Downloads/Rumper%20App/rumper-web-gamification-main/docs/prd/PRD-06-ai-assistant.md) |
| **Owning Workstreams** | `Product_Management`, `AI_Engineering`, `Frontend_Engineering` |

---

## 1. Summary

The **AI Location Assistant** (`"Tanya Asisten"`) provides an interactive side-drawer interface for instant, context-aware answers regarding location risks, commute patterns, flood history, and surrounding facilities.

---

## 2. Product Objective

- **Report-Grounded Spatial Q&A**: Provide instant advice for qualitative location questions grounded strictly in active property data telemetry.
- **Low-Friction Preset Prompts**: Offer one-tap quick prompt chips so users can ask common questions without typing manually.
- **Strict Guardrail Boundaries**: Ensure AI acts as an advisory assistant and **never** overrides deterministic risk scores or alters safety ratings.

---

## 3. User Outcome (Component Goals)

| Component Element | User Goal | Interaction / View |
|---|---|---|
| Trigger Button (`SubHeaderTabs.tsx`) | Open AI Assistant drawer anytime during workspace evaluation. | Light blue pill button (`#EBF3FF`, `#1A60F5`) with message icon. |
| Preset Chips (`AssistantDrawer.tsx`) | Submit common location questions with one tap. | 3 prompt chips (Flood history, Commute duration, Accredited schools). |
| Chat Feed (`AssistantDrawer.tsx`) | Read context-aware answers attached to property telemetry. | Scrollable user vs assistant message list with attached location context chip. |

---

## 4. Functional Requirements

| FR-ID | Category | Requirement Description | Priority |
|---|---|---|---|
| **FR-601** | Trigger Pill | Render light blue pill button `"Tanya Asisten"` in `SubHeaderTabs.tsx`. | Must Have |
| **FR-602** | Drawer Panel | Render slide-in right drawer panel (`w-[420px] bg-white shadow-2xl z-50`). | Must Have |
| **FR-603** | Header Bar | Render blue header bar (`bg-[#1A60F5] text-white`) with title, subtitle, and close button (`X`). | Must Have |
| **FR-604** | Context Chip | Display active property context chip (`Location: Grand Galaxy City Block R, Score: 68/100`). | Must Have |
| **FR-605** | Preset Chips | Display 3 preset prompt chips; submit question to chat feed on click. | Must Have |
| **FR-606** | Text Input | Render text input area with send button (`Send` icon). | Must Have |

---

## 5. Current vs. Planned Implementation State

| Feature | Built Prototype State (Current) | Planned Target State |
|---|---|---|
| Trigger Button | Built in `SubHeaderTabs.tsx` and `MobileBottomNav.tsx`. | Keyboard shortcut trigger (`Cmd + K`). |
| `AssistantDrawer.tsx` | Built with slide-in drawer, preset prompt chips, context banner, chat feed. | Streaming response animation & voice input. |
| AI Integration | Mock response generator using active property context. | Grounded RAG backend using BNPB & Jabodetabek spatial data. |

---

## 6. Technical Specs & TypeScript Interfaces

```typescript
export interface Message {
  id: string
  sender: 'user' | 'assistant'
  text: string
  timestamp: string
}

export interface AssistantDrawerProps {
  isOpen: boolean
  onClose: () => void
  activePropertyName: string
  activePropertySubdistrict: string
  score: number
}
```

---

## 7. Acceptance Criteria

- [x] Clicking `"Tanya Asisten"` in `SubHeaderTabs` smoothly opens `AssistantDrawer`.
- [x] Tapping preset prompt chips posts question to chat feed and generates contextual response.
- [x] Assistant responses incorporate active property location name, subdistrict, and score.
- [x] Drawer closes cleanly when clicking close button or clicking outside panel backdrop.
