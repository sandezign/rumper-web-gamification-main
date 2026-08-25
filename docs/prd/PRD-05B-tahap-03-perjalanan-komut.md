# PRD-05B: Tahap 03 — Mobilitas & Waktu Tempuh Perjalanan

## Metadata

| Field | Value |
|---|---|
| **Author** | Rumper Product Agent & Senior PM |
| **Status** | Approved / Active Production Specification |
| **Created** | 2026-08-22 |
| **Version** | 2.0 |
| **Target Path** | [`docs/prd/PRD-05B-tahap-03-perjalanan-komut.md`](file:///Users/arisandy/Downloads/Rumper%20App/rumper-web-gamification-main/docs/prd/PRD-05B-tahap-03-perjalanan-komut.md) |
| **Baseline Documents** | [`PRD-00-overview-architecture.md`](file:///Users/arisandy/Downloads/Rumper%20App/rumper-web-gamification-main/docs/prd/PRD-00-overview-architecture.md), [`PRD-05-deep-dive-workspaces.md`](file:///Users/arisandy/Downloads/Rumper%20App/rumper-web-gamification-main/docs/prd/PRD-05-deep-dive-workspaces.md) |
| **Owning Workstreams** | `Product_Management`, `Transit_Routing`, `Frontend_Engineering` |

---

## 1. Summary & Purpose

**Tahap 03: Mobilitas & Waktu Tempuh Perjalanan** (`CommuteWorkspace.tsx`) provides multi-modal commute telemetry comparing transit options (KRL Commuter Line, Toll Road, Arterial Motorbike route) from the property location to primary commercial centers (Sudirman, Semanggi, MT Haryono).

---

## 2. Component Layout & Visual Specifications

```
 ┌─────────────────────────────────────────────────────────────────────────┐
 │ [🏷 TAHAP 03]                                                            │
 │ Mobilitas & Waktu Tempuh Perjalanan                                     │
 │ Analisis aksesibilitas transportasi, rute utama, dan estimasi...        │
 ├─────────────────────────────────────────────────────────────────────────┤
 │ ┌─────────────────────┐ ┌─────────────────────┐ ┌─────────────────────┐ │
 │ │ Transit [Tertinggi] │ │ Mobil / Taxi        │ │ Motor    [Tercepat] │ │
 │ │ KRL Commuter Line   │ │ Tol Jakarta-Cikampek│ │ Rute Arteri / Motor │ │
 │ │ Stn Bekasi➔Sudirman │ │ Tol Bks Brt➔Semanggi│ │ Kalimalang➔MT Haryo │ │
 │ │ 45 min              │ │ 55 min              │ │ 40 min              │ │
 │ │ [Waktu sibuk tinggi]│ │ [Potensi macet Cik] │ │ [Sensitif cuaca]    │ │
 │ └─────────────────────┘ └─────────────────────┘ └─────────────────────┘ │
 ├─────────────────────────────────────────────────────────────────────────┤
 │ ✈ Detail Rute: KRL Commuter Line                  Total estimasi ~45 min│
 │ ┌─────────────────────────────────────────────────────────────────────┐ │
 │ │ (1) Jalan Kaki  •  Ke Halte Galaxy                            5 min │ │
 │ │ (2) Angkot K05  •  Ke Stasiun Bekasi                         15 min │ │
 │ │ (3) KRL Commuter Line  •  Bekasi ➔ Manggarai                 25 min │ │
 │ └─────────────────────────────────────────────────────────────────────┘ │
 ├─────────────────────────────────────────────────────────────────────────┤
 │ 🛡 Rekomendasi verifikasi lapangan rute perjalanan                      │
 │ Lakukan uji coba perjalanan (KRL Commuter Line) pada hari kerja...      │
 │                                                            [+ Checklist]│
 └─────────────────────────────────────────────────────────────────────────┘
```

---

## 3. UI Elements & Functional Requirements

| FR-ID | Element | UI & Behavioral Specification | Priority |
|---|---|---|---|
| **FR-521** | Stage Header | Render `TAHAP 03` green pill + title `Mobilitas & Waktu Tempuh Perjalanan`. | Must Have |
| **FR-522** | Mode Cards | Render 3 route cards (Transit, Car/Taxi, Motorbike) with route title, endpoints, large duration numeral, and condition pill. | Must Have |
| **FR-523** | Mode Selector | Clicking a route card selects it as active route, updates `Detail Rute` timeline, and synchronizes the highlighted polyline on `MapPanel`. | Must Have |
| **FR-524** | Leg Breakdown | Render numbered step timeline with mode icon, leg description, and individual duration in minutes. | Must Have |
| **FR-525** | Rush Hour Warning| Display peak hour friction warning badges (`Waktu tempuh jam sibuk tinggi`, `Potensi macet titik Cikunir`). | Must Have |
| **FR-526** | Field Test CTA | Render field test recommendation box with `+ Checklist` button injecting commute test task into Tahap 04. | Must Have |

---

## 4. TypeScript Contracts

```typescript
export interface CommuteLeg {
  stepNumber: number
  mode: 'walk' | 'angkot' | 'krl' | 'toll' | 'arterial'
  description: string
  durationMinutes: number
}

export interface CommuteOption {
  id: string
  modeCategory: 'Transit' | 'Mobil / Taxi' | 'Motor'
  modeBadge?: 'Tertinggi' | 'Tercepat' | 'Ekonomis'
  title: string
  routeEndpoints: string
  totalDurationMinutes: number
  conditionBadgeText: string
  conditionBadgeVariant: 'warning' | 'danger' | 'info'
  legs: CommuteLeg[]
  fieldRecommendation: string
}
```

---

## 5. Acceptance Criteria (Gherkin Scenarios)

### Scenario 1: Selecting Commute Mode
- **Given** user is on Tahap 03
- **When** user clicks the `"Mobil / Taxi (Tol Jakarta–Cikampek)"` card
- **Then** the card displays an active border `#0F2B38`, the route breakdown updates to toll legs (55 min), and the blue toll polyline is highlighted on the map.

### Scenario 2: Adding Commute Test to Checklist
- **Given** user reads the commute recommendation box
- **When** user clicks `"+ Checklist"`
- **Then** the commute test task is added to Tahap 04 and the app auto-navigates to `ChecklistWorkspace`.
