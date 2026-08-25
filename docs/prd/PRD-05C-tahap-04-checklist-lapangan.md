# PRD-05C: Tahap 04 — Verifikasi Lapangan & Due Diligence

## Metadata

| Field | Value |
|---|---|
| **Author** | Rumper Product Agent & Senior PM |
| **Status** | Approved / Active Production Specification |
| **Created** | 2026-08-22 |
| **Version** | 2.0 |
| **Target Path** | [`docs/prd/PRD-05C-tahap-04-checklist-lapangan.md`](file:///Users/arisandy/Downloads/Rumper%20App/rumper-web-gamification-main/docs/prd/PRD-05C-tahap-04-checklist-lapangan.md) |
| **Baseline Documents** | [`PRD-00-overview-architecture.md`](file:///Users/arisandy/Downloads/Rumper%20App/rumper-web-gamification-main/docs/prd/PRD-00-overview-architecture.md), [`PRD-05-deep-dive-workspaces.md`](file:///Users/arisandy/Downloads/Rumper%20App/rumper-web-gamification-main/docs/prd/PRD-05-deep-dive-workspaces.md) |
| **Owning Workstreams** | `Product_Management`, `Due_Diligence`, `Frontend_Engineering` |

---

## 1. Summary & Purpose

**Tahap 04: Verifikasi Lapangan & Due Diligence** (`ChecklistWorkspace.tsx`) is the physical inspection management workspace. It allows homebuyers conducting on-site visits to check off structured verification tasks (drainage inspection, neighbor interviews, road width measurement, rush hour trial) and tracks completion percentage in real time.

---

## 2. Component Layout & Visual Specifications

```
 ┌─────────────────────────────────────────────────────────────────────────┐
 │ [🏷 TAHAP 04]                                                            │
 │ Verifikasi Lapangan & Due Diligence                                     │
 │ 4 verifikasi tersisa · diurutkan berdasarkan tingkat risiko             │
 ├─────────────────────────────────────────────────────────────────────────┤
 │ 3 / 7 Terverifikasi                                              [ 43% ]│
 │ [======================-----------------------------------------------] │
 ├─────────────────────────────────────────────────────────────────────────┤
 │ ☷ Filter Faktor Risiko:                           👁 Sembunyikan selesai│
 │ [Semua Kategori] [Banjir ●] [Perjalanan] [Akses fisik] [Fasilitas] [Ling]│
 ├─────────────────────────────────────────────────────────────────────────┤
 │ ┌─────────────────────────────────────────────────────────────────────┐ │
 │ │ ○  Tanyakan ke minimal 3 warga sekitar tentang riwayat banjir       │ │
 │ │    [Banjir] [Prioritas tinggi]                                      │ │
 │ │    ┌──────────────────────────────────────────────────────────────┐ │ │
 │ │    │ Tips Lapangan: Tanyakan spesifik kejadian Feb 2024 & Jan 2020│ │ │
 │ │    └──────────────────────────────────────────────────────────────┘ │ │
 │ └─────────────────────────────────────────────────────────────────────┘ │
 │ ┌─────────────────────────────────────────────────────────────────────┐ │
 │ │ ○  Inspeksi saluran drainase & got lingkungan setelah hujan deras   │ │
 │ │    [Banjir] [Prioritas tinggi]                                      │ │
 │ │    ┌──────────────────────────────────────────────────────────────┐ │ │
 │ │    │ Tips Lapangan: Lakukan kunjungan maksimal 24 jam stlh hujan   │ │ │
 │ │    └──────────────────────────────────────────────────────────────┘ │ │
 │ └─────────────────────────────────────────────────────────────────────┘ │
 └─────────────────────────────────────────────────────────────────────────┘
```

---

## 3. UI Elements & Functional Requirements

| FR-ID | Element | UI & Behavioral Specification | Priority |
|---|---|---|---|
| **FR-531** | Stage Header | Render `TAHAP 04` green pill + title `Verifikasi Lapangan & Due Diligence`. | Must Have |
| **FR-532** | Progress Gauge | Display `X / Y Terverifikasi`, horizontal blue progress bar, and circular percentage gauge (e.g. `43%`). | Must Have |
| **FR-533** | Category Filters| Filter chips for `Semua Kategori`, `Banjir`, `Perjalanan`, `Akses fisik`, `Fasilitas`, `Lingkungan`. | Must Have |
| **FR-534** | Visibility Toggle| Render `👁 Sembunyikan selesai` button toggling visibility of completed check tasks. | Must Have |
| **FR-535** | Task Card | Render checkbox circle, task title, risk category badge, priority badge (`Prioritas tinggi` in red), and yellow `Tips Lapangan` box. | Must Have |
| **FR-536** | Checkbox Toggle | Clicking checkbox marks task as verified (`isCompleted: true`), strikes through title, and increments progress gauge. | Must Have |
| **FR-537** | Local Persistence| Persist checklist completion state in localStorage keyed by active property ID. | Must Have |

---

## 4. TypeScript Contracts

```typescript
export interface ChecklistTask {
  id: string
  title: string
  category: 'Banjir' | 'Perjalanan' | 'Akses fisik' | 'Fasilitas' | 'Lingkungan'
  priority: 'Prioritas tinggi' | 'Prioritas sedang' | 'Opsional'
  fieldTips: string
  isCompleted: boolean
  completedAt?: string
}

export interface ChecklistWorkspaceProps {
  propertyId: string
  tasks: ChecklistTask[]
  onToggleTask: (taskId: string) => void
}
```

---

## 5. Acceptance Criteria (Gherkin Scenarios)

### Scenario 1: Checking Off an Inspection Task
- **Given** user has completed 3 of 7 tasks (43%)
- **When** user clicks the checkbox for `"Tanyakan ke minimal 3 warga sekitar"`
- **Then** the task marks completed, progress updates to `4 / 7 Terverifikasi` (57%), and the gauge updates dynamically.

### Scenario 2: Filtering Tasks by Category
- **Given** user is viewing all checklist tasks
- **When** user taps `"Banjir"` filter pill
- **Then** only tasks tagged with `category === 'Banjir'` remain visible in the task list.
