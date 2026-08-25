# PRD-00: Core Workspace V2 (Gamification, Due Diligence Stepper & Tab-Aware Workspace)

## Metadata

| Field | Value |
|---|---|
| **Author** | Rumper Product Agent & Senior PM |
| **Status** | Approved / Active Production Specification |
| **Created** | 2026-08-22 |
| **Version** | 2.0 |
| **Target Path** | [`docs/prd/PRD-00-overview-architecture.md`](file:///Users/arisandy/Downloads/Rumper%20App/rumper-web-gamification-main/docs/prd/PRD-00-overview-architecture.md) |
| **Baseline Documents** | [`PRODUCT.md`](file:///Users/arisandy/Downloads/Rumper%20App/rumper-web-gamification-main/PRODUCT.md), [`DESIGN.md`](file:///Users/arisandy/Downloads/Rumper%20App/rumper-web-gamification-main/DESIGN.md), [`docs/PROJECT_SCAFFOLD_SPEC.md`](file:///Users/arisandy/Downloads/Rumper%20App/rumper-web-gamification-main/docs/PROJECT_SCAFFOLD_SPEC.md) |
| **Owning Workstreams** | `Product_Management`, `Design_System`, `Frontend_Engineering`, `GIS_Telemetry` |

---

## 1. Summary

This V2 specification unifies the **Rumper Core Workspace** architecture with the **Free Trial Gamification & Due Diligence Readiness Stepper**. It details all 5 workspace tabs (`Ringkasan`, `Faktor risiko`, `Perjalanan`, `Checklist`, `Fasilitas`), step-prerequisite gating, tab-aware Leaflet map rendering, and cross-tab correlation flows.

It establishes both the **Current State** (built prototype elements) and **Planned State** (unbuilt workspace tabs, live transit APIs, and analyst consultation hooks) while ensuring strict alignment with Rumper's core guardrails: preliminary Mini Check status, deterministic scoring (STD-SCR-001), and non-hidden Critical Red Flags.

---

## 2. Product Objective

- **Engage & Educate First-Time Homebuyers**: Provide a structured, 5-step Due Diligence Readiness Stepper to help buyers digest complex geospatial risks (flood hazard polygons, liquefaction, commute friction, facility gaps) in Jabodetabek.
- **Drive Free-to-Paid Conversion**: Offer high-perceived-value triggers (*Rp50.000* promotional anchor from *Rp150.000* regular price) to unlock deep-dive risk factor breakdowns, field inspection checklists, and expert analyst consultations.
- **Contextual Spatial Verification**: Dynamically adapt the Leaflet map workspace per active tab, maintaining an immediate visual proof loop for every analytical claim.

---

## 3. User Outcome (Per-Tab Goals)

| Tab | Primary User Goal | Primary Deliverable / View |
|---|---|---|
| **1. Ringkasan** | Get an immediate high-level summary of property suitability, overall score (68/100), critical red flags, and 5 risk factor teasers. | `ScoreCard`, `FactorRisksCard`, `UpgradeBanner`, Stepper Nodes 1–2. |
| **2. Faktor risiko** | Deep-dive into granular evidence, risk scores, and evidence confidence levels (`Data Kuat`, `Data Sedang`, `Perlu Validasi`). | `DeepDiveEvidenceWorkspace` (5 risk categories, inline map layer toggles). |
| **3. Perjalanan** | Evaluate transit convenience, commute route options (KRL, Toll, Arterial, School), travel times, and leg details. | `CommuteWorkspace` (4 route cards, route detail timeline, checklist CTA). |
| **4. Checklist** | Conduct structured field inspection, verify physical property conditions, and track due diligence completion. | `ChecklistWorkspace` (categorized inspection items, verification status). |
| **5. Fasilitas** | Inspect nearby essential amenities (schools, hospitals, malls, parks, places of worship) within defined radii. | `FasilitasWorkspace` (categorized POI directory, distance sorting, map pins). |

---

## 4. Scope Boundaries

### In Scope
- **5 Workspace Tabs**: Complete specification for `Ringkasan`, `Faktor risiko`, `Perjalanan`, `Checklist`, and `Fasilitas`.
- **Tab-Aware Map Sync**: Dynamic Leaflet map modes (`TAB_CONFIG`), camera `flyTo` transitions, contextual layer toggles, polylines, and POI markers.
- **Step Prerequisite Gating**: Sequential tab unlocking based on previous tab completion.
- **Cross-Tab Feature Correlations**: Auto-navigation flows (e.g., adding commute/gap items directly to Checklist tab).
- **Paywall & Quota Hooks**: Transparent quota badge (`1 lokasi tersisa` of 5) and upgrade drawers.

### Out of Scope
- **Standalone Mobile Native UI**: Mobile-specific responsive adaptations handled under separate mobile views.
- **Backend Scoring Logic**: Score formulas remain pure code per deterministic rules; AI never owns final scores.
- **Autonomous AI Recommendations**: AI assistant remains strictly report-grounded QA; AI never alters risk scores.

---

## 5. Functional Requirements

| FR-ID | Category | Requirement Description | Priority |
|---|---|---|---|
| **FR-001** | Header | Surface active location picker, pill badge `Free Trial`, quota counter (`1 lokasi tersisa`), and avatar. | Must Have |
| **FR-002** | Stepper | Render left-side continuous vertical timeline linking completed check nodes (`[✓]`) and locked nodes (`[🔒]`). | Must Have |
| **FR-003** | Ringkasan | Display circular gauge meter `68/100`, verdict badge (`Layak dengan catatan`), and 5-factor risk teaser with `Tampilkan semua faktor ▾` toggle. | Must Have |
| **FR-004** | Ringkasan | Display dark floating upgrade banner (`bg-[#061E28]`, promo `Rp50.000` / strike `Rp150.000`) and Locked Step cards with `Buka` action. | Must Have |
| **FR-005** | Faktor risiko | Surface deep-dive category cards (Banjir, Perjalanan, Akses, Fasilitas, Lingkungan) with evidence confidence badges. | Must Have |
| **FR-006** | Perjalanan | Render 4 commute route options (KRL, Tol, Arteri, Sekolah), leg timelines, travel times, and `Tambahkan ke checklist` CTA. | Must Have |
| **FR-007** | Checklist | Render field verification items categorized by risk factor with checkbox toggles and `Minta tinjauan analis` CTA. | Should Have |
| **FR-008** | Fasilitas | Render categorized POI list (Schools, Hospitals, Malls, Parks, Mosques) sorted by proximity. | Should Have |
| **FR-009** | Step Gating | Enforce prerequisite chain: Ringkasan → Faktor risiko → Perjalanan → Checklist → Fasilitas. | Must Have |
| **FR-010** | Map FlyTo | Animate Leaflet camera (`map.flyTo`) with `duration: 0.75s` on every active tab change. | Must Have |
| **FR-011** | Map Overlays | Render tab-specific overlays (flood polygon on Ringkasan/Faktor risiko, route polylines on Perjalanan, 500m circle on Checklist, POI pins on Fasilitas). | Must Have |
| **FR-012** | Cross-Tab Nav | Trigger auto-navigation to Checklist tab (600ms delay) when user clicks `Tambahkan ke checklist` from Commute or Evidence gap cards. | Must Have |
| **FR-013** | Red Flag Link | Click `Perluas Peta` / Red Flag cards to center map and highlight hazard polygon. | Must Have |
| **FR-014** | Paywall Drawer | Open Paywall Drawer whenever free users click a locked tab (`🔒`) or locked card element. | Must Have |
| **FR-015** | AI Overlay | Slide in right AI Assistant drawer (~420px) when `[💬 Tanya Asisten]` is clicked. | Must Have |

---

## 6. Business & Product Rules

### 6.1 Tab Entitlement Matrix & Step Prerequisites

```mermaid
flowchart LR
    Tab1[1. Ringkasan\n(Free Full Access)] -->|Complete Step 1| Tab2[2. Faktor risiko\n(Premium + Step Gate)]
    Tab2 -->|Complete Step 2| Tab3[3. Perjalanan\n(Premium + Step Gate)]
    Tab3 -->|Complete Step 3| Tab4[4. Checklist\n(Premium + Step Gate)]
    Tab4 -->|Complete Step 4| Tab5[5. Fasilitas\n(Premium + Step Gate)]
```

| Tab Name | Free User Access | Premium User Access | Step Prerequisite |
|---|---|---|---|
| **Ringkasan** | Full Access | Full Access | None (Starting point) |
| **Faktor risiko** | Upgrade Drawer Prompt | Full Access | Step 1 Completed |
| **Perjalanan** | Upgrade Drawer Prompt | Full Access | Requires `Faktor risiko` completed |
| **Checklist** | Upgrade Drawer Prompt | Full Access | Requires `Perjalanan` completed |
| **Fasilitas** | Upgrade Drawer Prompt | Full Access | Requires `Checklist` completed |

### 6.2 Decision Safety Rule (STD-SCR-001 §7)
- **Non-Negotiable Red Flag Exposure**: Critical Red Flags (e.g., severe flood zone, active fault line, liquefaction) **must remain visible** in Tahap 1 `Ringkasan`.
- High overall scores cannot mask critical red flags. Red pill tags (`RISIKO UTAMA`) and red map polygons must be rendered regardless of subscription state.

### 6.3 Quota Discipline & Price Anchoring
- **Quota Limit**: Free trial users are capped at 5 audited locations. Quota badge (`1 lokasi tersisa`) updates dynamically.
- **Price Anchor**: Single unlock payment of **Rp50.000** (promotional anchor against **Rp150.000** regular price).

---

## 7. Cross-Tab Feature Correlations

| Source Action | Source Tab | Target Tab | Trigger Condition | Resulting State & Map Action |
|---|---|---|---|---|
| `Tambahkan ke checklist` | `Perjalanan` (CommuteWorkspace) | `Checklist` | User clicks CTA on a route card | Item marked as added; auto-navigates to `Checklist` tab after 600ms; Map flies to Checklist 500m walk circle (zoom 15). |
| `Tambahkan ke checklist` | `Faktor risiko` (DeepDive) | `Checklist` | User clicks CTA on evidence gap card | Gap item appended to field checklist; auto-navigates to `Checklist` tab; Map updates walkability circle. |
| `Perluas Peta` | `Ringkasan` / Map Bar | Map Modal | User clicks CTA on evidence bar | Map expands to full-screen modal backdrop. |
| `Tab Header Switch` | Header Sub-Tabs | Target Tab | User clicks unlocked tab pill | `handleTabChange` marks previous tab as completed; unlocks next step; triggers Map camera `flyTo`. |

---

## 8. Map Interaction & Tab-Aware Layer Specification

Map behavior is governed by `TAB_CONFIG` inside `<MapPanel activeTab={activeTab} />`. Every tab switch executes a camera `flyTo` transition (0.75s duration).

```
┌─────────────────────────────────────────────────────────────────┐
│ Map Panel Overlay Bar                                           │
│ [Map Layers]  [Banjir: ON]  [POI: ON]  [Radius: ON]              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│                 [Leaflet Canvas - Tab Mode]                     │
│                                                                 │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ Info Bar: "Flood Zone Evidence • BNPB 2024 • 95m from prop" │ │
│ └─────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

### Tab Map Configuration Matrix (`TAB_CONFIG`)

| Tab Name | Camera Center | Zoom | Key Overlays & Layers | Info Bar Content | Controls Bar |
|---|---|---|---|---|---|
| **Ringkasan** | `[-6.266, 106.990]` | `15` | Property pin, red flood polygon, 1km dashed radius, POI pins. | `"Flood Zone Evidence • BNPB 2024 • 95m from property"` | Banjir, POI, Radius Toggles |
| **Faktor risiko** | `[-6.263, 106.990]` | `14` | High-opacity flood polygon, orange liquefaction polygon, 2 risk pins. | `"Zona Risiko Aktif • 2 layer risiko terdeteksi"` | Flood & Liquefaction Toggles |
| **Perjalanan** | `[-6.255, 106.985]` | `12` | 4 color-coded polylines (KRL green, Tol blue, Arteri orange, Sekolah purple), endpoints. | `"4 rute tersedia • KRL · Tol · Arteri · Sekolah"` | Route Selector (KRL / Tol / Arteri / Sekolah) |
| **Checklist** | `[-6.266, 106.990]` | `15` | 500m walkability circle, 4 nearby essential walk pins. | `"Radius Jalan Kaki 500m • 4 fasilitas esensial terjangkau"` | Walk Filter Toggles |
| **Fasilitas** | `[-6.263, 106.990]` | `13` | Categorized facility pins (GraduationCap 🎓, Cross 🏥, ShoppingBag 🛒, TreePine 🌳, Star 🕌). | `"7 fasilitas ditemukan • Sekolah · RS · Mall · Taman · Ibadah"` | Facility Category Filter |

---

## 9. Current vs. Planned Implementation State

| Workspace Tab | Built Prototype Components (Current State) | Unbuilt / Planned Components (Target State) |
|---|---|---|
| **Ringkasan** | `ScoreCard.tsx` (68/100), `FactorRisksCard.tsx` (5 factors + expand toggle), `UpgradeBanner.tsx`, `LockedStepCard.tsx`. | Direct event bus wiring for map polygon highlight on click. |
| **Faktor risiko** | `DeepDiveEvidenceWorkspace.tsx` exists with evidence confidence breakdown. | Category filter tabs and gap resolution cards. |
| **Perjalanan** | `CommuteWorkspace.tsx` built with 4 route cards, route detail timeline, leg items, and auto-nav checklist CTA. | Live OSRM / Transit API integration (currently mock spatial polylines). |
| **Checklist** | `ChecklistWorkspace.tsx` built with inspection checklist items, progress bar, and status toggles. | Analyst consultation WhatsApp routing (`https://wa.me/...`) and backend persistence. |
| **Fasilitas** | `FasilitasWorkspace.tsx` built with category filter buttons and POI cards. | Distance sorting API and POI detail expansion drawer. |
| **Map Sync** | Tab-aware layer configs defined (`TAB_CONFIG`), camera `flyTo` active, POI pins active. | Live OSRM polyline routing engine. |

---

## 10. Design & Code References

- **Root Shell & State**: [`src/App.tsx`](file:///Users/arisandy/Downloads/Rumper%20App/rumper-web-gamification-main/src/App.tsx)
- **App Header**: [`src/components/AppHeader.tsx`](file:///Users/arisandy/Downloads/Rumper%20App/rumper-web-gamification-main/src/components/AppHeader.tsx)
- **Sub-Header Tabs**: [`src/components/SubHeaderTabs.tsx`](file:///Users/arisandy/Downloads/Rumper%20App/rumper-web-gamification-main/src/components/SubHeaderTabs.tsx)
- **Score Card**: [`src/components/ScoreCard.tsx`](file:///Users/arisandy/Downloads/Rumper%20App/rumper-web-gamification-main/src/components/ScoreCard.tsx)
- **Factor Risks Card**: [`src/components/FactorRisksCard.tsx`](file:///Users/arisandy/Downloads/Rumper%20App/rumper-web-gamification-main/src/components/FactorRisksCard.tsx)
- **Map Panel**: [`src/components/MapPanel.tsx`](file:///Users/arisandy/Downloads/Rumper%20App/rumper-web-gamification-main/src/components/MapPanel.tsx)
- **Upgrade Drawer**: [`src/components/UpgradeDrawer.tsx`](file:///Users/arisandy/Downloads/Rumper%20App/rumper-web-gamification-main/src/components/UpgradeDrawer.tsx)
- **Assistant Drawer**: [`src/components/AssistantDrawer.tsx`](file:///Users/arisandy/Downloads/Rumper%20App/rumper-web-gamification-main/src/components/AssistantDrawer.tsx)

---

## 11. Technical & Integration Specifications

```
<App>
  ├── <AppHeader activePropertyName={prop.name} remainingQuota={1} totalQuota={5} />
  ├── <SubHeaderTabs activeTab={activeTab} onTabChange={setActiveTab} isPremium={isPremium} />
  ├── <Workspace Column>
  │     ├── <VerticalTimeline />
  │     ├── <ScoreCard score={68} />
  │     ├── <FactorRisksCard factors={5} />
  │     ├── <UpgradeBanner price="Rp50.000" />
  │     └── <LockedStepCard step={2..5} /> (if Free Trial)
  │     └── <DeepDiveWorkspace /> | <CommuteWorkspace /> | <ChecklistWorkspace /> | <FasilitasWorkspace /> (if Premium)
  ├── <AssistantDrawer isOpen={assistantOpen} />
  └── <MapPanel activeTab={activeTab} isPremium={isPremium} />
```

---

## 12. Acceptance Criteria

- [x] UI renders clean split-column layout with fixed top navigation header.
- [x] Quota badge (`1 lokasi tersisa`) updates dynamically.
- [x] Stepper vertical timeline displays checkmark nodes (`[✓]`) and locked nodes (`[🔒]`).
- [x] Clicking any locked tab (`🔒`) or card triggers Paywall Upgrade Drawer with Rp50.000 price anchor.
- [x] Switching tabs triggers Leaflet map camera `flyTo` (0.75s animation) to target coordinates and zoom level.
- [x] `Perjalanan` tab renders 4 distinct color-coded route polylines.

---

## 13. Risks & Open Questions

| # | Risk / Question | Impact | Mitigation Strategy |
|---|---|---|---|
| **R1** | **Leaflet Polyline Performance**: Rendering 4 complex polylines simultaneously on mobile devices might cause frame drops. | Medium | Simplify polyline waypoints (max 15 coordinates per route) and lazy-load route layers. |
| **R2** | **Analyst Review Integration**: "Minta tinjauan analis" CTA needs clear backend endpoint or WhatsApp routing. | Low | Route CTA directly to Rumper Analyst WhatsApp template (`https://wa.me/...`). |
