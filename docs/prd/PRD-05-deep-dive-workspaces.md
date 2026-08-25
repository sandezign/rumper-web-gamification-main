# PRD-05: Unlocked Stage Workspaces (Tahap 2–5)

## Metadata

| Field | Value |
|---|---|
| **Author** | Rumper Product Agent & Senior PM |
| **Status** | Approved / Active Production Specification |
| **Created** | 2026-08-22 |
| **Version** | 2.0 |
| **Target Path** | [`docs/prd/PRD-05-deep-dive-workspaces.md`](file:///Users/arisandy/Downloads/Rumper%20App/rumper-web-gamification-main/docs/prd/PRD-05-deep-dive-workspaces.md) |
| **Baseline Documents** | [`PRD-00-overview-architecture.md`](file:///Users/arisandy/Downloads/Rumper%20App/rumper-web-gamification-main/docs/prd/PRD-00-overview-architecture.md) |
| **Owning Workstreams** | `Product_Management`, `Frontend_Engineering`, `GIS_Telemetry` |

---

## 1. Summary

Once unlocked via Premium Pass (`isTier2Unlocked = true`), Tahap 2 through Tahap 5 replace locked teasers with fully interactive domain workspaces: `DeepDiveEvidenceWorkspace` (Tahap 2), `CommuteWorkspace` (Tahap 3), `ChecklistWorkspace` (Tahap 4), and `FasilitasWorkspace` (Tahap 5).

---

## 2. Product Objective

- **Granular Due Diligence**: Provide deep-dive risk factor evidence, multi-modal commute travel duration calculators, physical site visit inspection checklists, and categorized amenity directories.
- **Cross-Tab Correlations**: Enable seamless item addition from evidence gap cards and commute cards directly to the field checklist tab (`ChecklistWorkspace`).

---

## 3. User Outcome (Per-Stage Goals)

| Stage Tab | Primary User Goal | Deliverable / Component |
|---|---|---|
| **Tahap 2: Faktor Risiko** | Inspect evidence records, confidence ratings, and red flag warnings. | `DeepDiveEvidenceWorkspace.tsx` (Evidence cards, red flag alerts, data gaps). |
| **Tahap 3: Perjalanan** | Evaluate travel durations across KRL, Toll, Arteri, and School routes. | `CommuteWorkspace.tsx` (4 route cards, route detail timeline, checklist CTA). |
| **Tahap 4: Checklist** | Perform physical site visit inspection and track verification progress. | `ChecklistWorkspace.tsx` (Categorized inspection items, verification status). |
| **Tahap 5: Fasilitas** | Inspect nearby essential amenities (schools, hospitals, malls, parks, mosques). | `FasilitasWorkspace.tsx` (Category tabs, POI directory, map pins). |

---

## 4. Scope Boundaries

### In Scope
- **4 Unlocked Workspaces**: Full UI specifications for Tahap 2, 3, 4, and 5.
- **Cross-Tab Auto-Nav**: Clicking `Tambahkan ke checklist` in `CommuteWorkspace` or `DeepDiveEvidenceWorkspace` auto-navigates to `Checklist` tab (600ms delay).
- **Checklist State Persistence**: Interactive task toggling (`Pending` | `Verified` | `Issue Found`).
- **Facility Map Sync**: Selecting facility category filter updates POI pins on `MapPanel`.

### Out of Scope
- **Live GPS Navigation**: Turn-by-turn live navigation during physical site visits.
- **PDF Report Generation**: Exporting static PDF summaries (handled in separate export engine).

---

## 5. Functional Requirements

| FR-ID | Category | Requirement Description | Priority |
|---|---|---|---|
| **FR-501** | Evidence Cards| Render raw evidence source documents with confidence ratings (`Data Kuat`, `Data Sedang`, `Perlu Validasi`). | Must Have |
| **FR-502** | Red Flags | Render highlighted red flag alerts for critical hazard findings (e.g. BNPB flood zone). | Must Have |
| **FR-503** | Route Options | Render 4 commute route cards (KRL, Tol, Arteri, Sekolah) with peak vs off-peak timing metrics. | Must Have |
| **FR-504** | Checklist Progress| Render progress bar showing completed inspection items (e.g. `3 / 10 terverifikasi`). | Must Have |
| **FR-505** | Facility Filters| Render category filter buttons for Kesehatan, Pendidikan, Belanja, Stasiun. | Must Have |
| **FR-506** | Cross-Tab Nav | Trigger auto-navigation to Checklist tab when `Tambahkan ke checklist` CTA is clicked. | Must Have |
| **FR-507** | Analyst Consult| Render `Minta tinjauan analis` CTA routing to Rumper Analyst WhatsApp template (`https://wa.me/...`). | Should Have |

---

## 6. Current vs. Planned Implementation State

| Workspace Tab | Built Prototype State (Current) | Planned Target State |
|---|---|---|
| `DeepDiveEvidenceWorkspace.tsx` | Built with evidence confidence ratings, red flag detector, and gap cards. | Document PDF download links. |
| `CommuteWorkspace.tsx` | Built with 4 route cards, route detail timeline, and checklist CTA. | Live OSRM / Transit API integration. |
| `ChecklistWorkspace.tsx` | Built with inspection checklist items, progress bar, and task toggles. | Analyst consultation WhatsApp routing & photo upload. |
| `FasilitasWorkspace.tsx` | Built with category filter buttons and POI cards. | Distance sorting API & POI detail expansion. |

---

## 7. Technical Specs & TypeScript Interfaces

```typescript
export interface DeepDiveWorkspaceProps {
  propertyId: string
  onSelectEvidence: (id: string) => void
}

export interface CommuteWorkspaceProps {
  originCoords: [number, number]
  destinationName: string
}

export interface ChecklistItem {
  id: string
  category: 'drainage' | 'structure' | 'access' | 'legal'
  question: string
  isChecked: boolean
  notes?: string
}

export type FacilityCategoryKey = 'kesehatan' | 'pendidikan' | 'belanja' | 'stasiun'
```

---

## 8. Acceptance Criteria

- [x] Unlocked stages render full workspace components instead of `LockedStepCard`.
- [x] `ChecklistWorkspace` updates verification progress state dynamically when items are toggled.
- [x] `FasilitasWorkspace` updates category filter tabs and syncs POI markers on `MapPanel`.
- [x] Clicking `Tambahkan ke checklist` from Commute or Evidence cards auto-navigates to `Checklist` tab after 600ms.
