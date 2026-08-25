# PRD-08: Mobile Workspace Bottom Sheet Experience

## Metadata

| Field | Value |
|---|---|
| **Author** | Rumper Product Agent & Senior PM |
| **Status** | Approved / Active Production Specification |
| **Created** | 2026-08-22 |
| **Version** | 2.0 |
| **Target Path** | [`docs/prd/PRD-08-mobile-bottom-sheet-workspace.md`](file:///Users/arisandy/Downloads/Rumper%20App/rumper-web-gamification-main/docs/prd/PRD-08-mobile-bottom-sheet-workspace.md) |
| **Baseline Documents** | [`PRD-00-overview-architecture.md`](file:///Users/arisandy/Downloads/Rumper%20App/rumper-web-gamification-main/docs/prd/PRD-00-overview-architecture.md), [`PRD-02-location-risk-workspace.md`](file:///Users/arisandy/Downloads/Rumper%20App/rumper-web-gamification-main/docs/prd/PRD-02-location-risk-workspace.md) |
| **Owning Workstreams** | `Product_Management`, `Mobile_UX`, `Frontend_Engineering` |

---

## 1. Summary

The **Mobile Workspace Bottom Sheet** (`MobileBottomSheet.tsx`) provides an interactive, swipeable drawer overlay over the mobile map view. It allows users to fluidly transition between map exploration and deep-dive analytical reading through tactile touch dragging and 4 discrete snap points.

---

## 2. Product Objective

- **Fluid Multitasking**: Allow users to inspect map spatial context while reading score summaries and risk factors simultaneously.
- **Natural Touch Physics**: Support spring dragging, fast-flick gesture snapping, and clear expand/collapse affordances.
- **Contextual Step Browsing**: Provide a sticky horizontal tab bar inside the bottom sheet to quickly jump across evaluation stages without collapsing the sheet.

---

## 3. Snap Points & Height Architecture

```
 ┌─────────────────────────────────────────────────────────────┐ ── 100% vh (Top of Screen)
 │                                                             │
 │                                                             │ ── Full Snap: 90% vh
 │ ┌─────────────────────────────────────────────────────────┐ │    (Deep analytical reading)
 │ │ [═ Drag Handle] ∨ Perkecil                              │ │
 │ │ [Ringkasan] [Faktor risiko] [Perjalanan] [Checklist]    │ │
 │ │                                                         │ │ ── Half Snap: 50% vh
 │ │ ScoreCard (68/100) / FactorRisksCard / Evidence         │ │    (50/50 split view)
 │ │                                                         │ │
 │ │                                                         │ │ ── Compact Snap: 28% vh
 │ │                                                         │ │    (Quick card teaser)
 │ └─────────────────────────────────────────────────────────┘ │
 │ [Leaflet Map Canvas visible underneath]                     │ ── Peek Snap: 120px
 └─────────────────────────────────────────────────────────────┘ ── 0px (Bottom of Screen)
```

### Snap Height Definitions (`SNAP_HEIGHTS`)

| Snap Point | Height Specification | Visual State & Purpose |
|---|---|---|
| **`peek`** | `120px` (Fixed) | Minimal bottom bar showing only sheet handle and active step pill. |
| **`compact`** | `28%` of `window.innerHeight` (Ratio ~1:3.5) | Displays drag handle, step tabs, and the top score teaser card. |
| **`half`** | `50%` of `window.innerHeight` | Balanced 50/50 split view between map investigation and score summary. |
| **`full`** | `90%` of `window.innerHeight` | Deep-reading mode for complete risk breakdown, evidence, and checklists. |

---

## 4. Scope Boundaries

### In Scope
- **Touch Gesture Physics**: `onTouchStart`, `onTouchMove`, `onTouchEnd` with velocity calculation.
- **Drag Handle Controls**: Pill indicator bar + dynamic text button (`"∨ Perkecil"` in full mode / `"^ Tarik untuk penuh"` in compact/half mode).
- **Internal Content Scroll**: Seamless vertical scrolling inside sheet body when snapped to `full` height.
- **Horizontal Step Tabs**: Sticky tab row (`Ringkasan`, `Faktor risiko`, `Perjalanan`, `Checklist`, `Fasilitas`).

### Out of Scope
- **Complete Sheet Dismissal**: The sheet always remains docked at minimum `peek` (120px) to prevent losing workspace state.

---

## 5. Functional Requirements

| FR-ID | Category | Requirement Description | Priority |
|---|---|---|---|
| **FR-801** | Snap Physics | Support 4 snap heights (`peek` 120px, `compact` 28% vh, `half` 50% vh, `full` 90% vh). | Must Have |
| **FR-802** | Gesture Drag | Track touch delta $Y$ in real-time; update height with `requestAnimationFrame`. | Must Have |
| **FR-803** | Flick Snap | Snap to next height if swipe velocity exceeds $0.5\text{px/ms}$ or distance $> 40\text{px}$. | Must Have |
| **FR-804** | Toggle Button | Tapping `"^ Tarik untuk penuh"` expands to `full`; tapping `"∨ Perkecil"` collapses to `compact`. | Must Have |
| **FR-805** | Sticky Tabs | Render horizontal step tabs with lock icons; auto-center active tab on step change. | Must Have |
| **FR-806** | Scroll Seam | Allow internal card scrolling in `full` mode only when sheet is fully expanded. | Must Have |

---

## 6. Technical Specs & TypeScript Interfaces

```typescript
export type SnapPoint = 'peek' | 'compact' | 'half' | 'full'

export interface MobileBottomSheetProps {
  activeTab: string
  isPremium: boolean
  onTabChange: (tab: string) => void
  onUpgrade: () => void
  onHeightChange?: (height: number) => void
  onSnapChange?: (snap: SnapPoint) => void
  snap?: SnapPoint
  bottomOffset?: number
  children: React.ReactNode
}
```

---

## 7. Acceptance Criteria (Gherkin Scenarios)

### Scenario 1: Expanding Bottom Sheet via Button
- **Given** bottom sheet is in `compact` (28% vh) snap mode
- **When** user taps `"^ Tarik untuk penuh"`
- **Then** bottom sheet animates to `full` (90% vh) height with spring transition (`0.3s cubic-bezier(0.16, 1, 0.3, 1)`).

### Scenario 2: Dragging Down to Collapse
- **Given** bottom sheet is in `full` snap mode
- **When** user drags the handle downward past the 40px threshold
- **Then** sheet snaps down to `compact` or `half` based on release position.

---

## 8. Mobile Ergonomics & Microinteractions
- Drag handle touch area extends to `44px` height around the visual pill.
- Transition easing: `cubic-bezier(0.16, 1, 0.3, 1)` (spring-like deceleration).
- Sheet border radius: `rounded-t-[28px]` with shadow `0 -8px 32px rgba(0, 30, 43, 0.12)`.
