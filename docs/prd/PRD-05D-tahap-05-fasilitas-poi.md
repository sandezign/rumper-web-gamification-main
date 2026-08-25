# PRD-05D: Tahap 05 — Fasilitas Terdekat & POI

## Metadata

| Field | Value |
|---|---|
| **Author** | Rumper Product Agent & Senior PM |
| **Status** | Approved / Active Production Specification |
| **Created** | 2026-08-22 |
| **Version** | 2.0 |
| **Target Path** | [`docs/prd/PRD-05D-tahap-05-fasilitas-poi.md`](file:///Users/arisandy/Downloads/Rumper%20App/rumper-web-gamification-main/docs/prd/PRD-05D-tahap-05-fasilitas-poi.md) |
| **Baseline Documents** | [`PRD-00-overview-architecture.md`](file:///Users/arisandy/Downloads/Rumper%20App/rumper-web-gamification-main/docs/prd/PRD-00-overview-architecture.md), [`PRD-05-deep-dive-workspaces.md`](file:///Users/arisandy/Downloads/Rumper%20App/rumper-web-gamification-main/docs/prd/PRD-05-deep-dive-workspaces.md) |
| **Owning Workstreams** | `Product_Management`, `GIS_Telemetry`, `Frontend_Engineering` |

---

## 1. Summary & Purpose

**Tahap 05: Fasilitas Terdekat & POI** (`FasilitasWorkspace.tsx`) provides an categorized inventory of essential facilities (healthcare, schools, markets/malls, transit stations) located within a $\pm 3\text{km}$ radius. Users can expand category accordions to view specific amenity names and distances, and toggle inline `PETA` switches to render pins dynamically on the Leaflet map.

---

## 2. Component Layout & Visual Specifications

```
 ┌─────────────────────────────────────────────────────────────────────────┐
 │ [🏷 TAHAP 05]                                           [4 layer aktif] │
 │ Fasilitas Terdekat & POI                                                │
 │ 8 fasilitas dalam radius ±3 km · aktifkan sakelar untuk menampilkan...  │
 ├─────────────────────────────────────────────────────────────────────────┤
 │ ┌─────────────────────────────────────────────────────────────────────┐ │
 │ │ [🏥] Kesehatan  [ 3 ]                                               │ │
 │ │     [Sangat Dekat • terdekat 0.19 km]                 PETA [●═]  ▲  │ │
 │ ├─────────────────────────────────────────────────────────────────────┤ │
 │ │ • Klinik Pratama Galaxy                                     0.19 km │ │
 │ │ • Apotek K-24 Galaxy                                        0.22 km │ │
 │ │ • RS Hermina Galaxy                                         0.48 km │ │
 │ └─────────────────────────────────────────────────────────────────────┘ │
 │ ┌─────────────────────────────────────────────────────────────────────┐ │
 │ │ [🎓] Pendidikan  [ 1 ]                                              │ │
 │ │     [Cukup Jauh • terdekat 1.62 km]                   PETA [═○]  ▼  │ │
 │ └─────────────────────────────────────────────────────────────────────┘ │
 │ ┌─────────────────────────────────────────────────────────────────────┐ │
 │ │ [🛒] Belanja Harian  [ 2 ]                                          │ │
 │ │     [Sangat Dekat • terdekat 0.04 km]                 PETA [═○]  ▼  │ │
 │ └─────────────────────────────────────────────────────────────────────┘ │
 │ ┌─────────────────────────────────────────────────────────────────────┐ │
 │ │ [🚉] Stasiun & Feeder  [ 2 ]                                        │ │
 │ │     [Dekat • terdekat 1.20 km]                        PETA [═○]  ▼  │ │
 │ └─────────────────────────────────────────────────────────────────────┘ │
 └─────────────────────────────────────────────────────────────────────────┘
```

---

## 3. UI Elements & Functional Requirements

| FR-ID | Element | UI & Behavioral Specification | Priority |
|---|---|---|---|
| **FR-541** | Stage Header | Render `TAHAP 05` green pill + title `Fasilitas Terdekat & POI` + badge `X layer aktif`. | Must Have |
| **FR-542** | Category Header| Display category icon (Kesehatan 🏥, Pendidikan 🎓, Belanja 🛒, Stasiun 🚉), count badge, proximity pill (`Sangat Dekat`, `Dekat`, `Cukup Jauh`), and nearest distance. | Must Have |
| **FR-543** | Inline Map Switch| Render `PETA` toggle switch; toggling ON displays that category's POI pins on `MapPanel`. | Must Have |
| **FR-544** | Accordion Expand| Clicking category row or arrow expands/collapses list of individual facility items with smooth height transition. | Must Have |
| **FR-545** | Facility List Item| Display bullet item name (e.g. `Klinik Pratama Galaxy`) with right-aligned tabular distance in km (`0.19 km`). | Must Have |
| **FR-546** | Map FlyTo On Pin| Clicking a facility row animates Leaflet map camera directly to that POI coordinate and opens popup. | Should Have |

---

## 4. TypeScript Contracts

```typescript
export interface FacilityItem {
  id: string
  name: string
  distanceKm: number
  lat: number
  lng: number
}

export interface FacilityCategory {
  key: 'kesehatan' | 'pendidikan' | 'belanja' | 'stasiun'
  title: string
  count: number
  proximityLabel: 'Sangat Dekat' | 'Dekat' | 'Cukup Jauh'
  proximityVariant: 'success' | 'warning' | 'info'
  nearestDistanceKm: number
  isMapLayerActive: boolean
  isExpanded: boolean
  items: FacilityItem[]
}

export interface FasilitasWorkspaceProps {
  categories: FacilityCategory[]
  onToggleMapLayer: (categoryKey: string) => void
  onSelectFacility: (facility: FacilityItem) => void
}
```

---

## 5. Acceptance Criteria (Gherkin Scenarios)

### Scenario 1: Toggling Category Map Layer Switch
- **Given** the `"Kesehatan"` category PETA switch is OFF
- **When** the user clicks the `PETA` switch
- **Then** the switch toggles to ON (`bg-[#0F2B38]`) and 3 medical POI markers appear on the Leaflet map.

### Scenario 2: Expanding Category Accordion
- **Given** the `"Kesehatan"` category accordion is collapsed
- **When** the user taps the category card
- **Then** the list smoothly expands revealing the 3 clinics/hospitals with individual distance tags.
