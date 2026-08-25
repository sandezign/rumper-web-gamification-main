# PRD-10: Cross-Tab Card & Map Spatial Correlation Specification

## Metadata

| Field | Value |
|---|---|
| **Author** | Rumper Product Agent & Senior PM |
| **Status** | Approved / Active Production Specification |
| **Created** | 2026-08-22 |
| **Version** | 2.0 |
| **Target Path** | [`docs/prd/PRD-10-cross-tab-map-correlation-matrix.md`](file:///Users/arisandy/Downloads/Rumper%20App/rumper-web-gamification-main/docs/prd/PRD-10-cross-tab-map-correlation-matrix.md) |
| **Baseline Documents** | [`PRD-00-overview-architecture.md`](file:///Users/arisandy/Downloads/Rumper%20App/rumper-web-gamification-main/docs/prd/PRD-00-overview-architecture.md), [`PRD-03-interactive-map-panel.md`](file:///Users/arisandy/Downloads/Rumper%20App/rumper-web-gamification-main/docs/prd/PRD-03-interactive-map-panel.md), [`PRD-05-deep-dive-workspaces.md`](file:///Users/arisandy/Downloads/Rumper%20App/rumper-web-gamification-main/docs/prd/PRD-05-deep-dive-workspaces.md) |
| **Owning Workstreams** | `Product_Management`, `GIS_Telemetry`, `Frontend_Engineering` |

---

## 1. Summary & Core Principle

The fundamental architectural principle of Rumper is **"Visual Proof Telemetry"**:
> **Rule of Spatial Correlation:** Every analytical claim, risk factor score, commute duration, and amenity inventory presented in the left workspace **MUST** be visually reinforced by synchronized spatial overlays on the right-side Leaflet map panel in real time.

When the user switches tabs or selects specific cards on the left, the map panel dynamically animates its camera (`map.flyTo`), swaps top layer controls, activates contextual GIS vector overlays (polygons, polylines, circles), renders categorical pins, and updates bottom telemetry badges.

---

## 2. Master End-to-End Correlation Matrix (5 Stages)

```
 ┌────────────────────────────────────────────────────────────────────────────────────────────────────────┐
 │ LEFT WORKSPACE CARD CONTENT                                  RIGHT MAP PANEL SPATIAL TELEMETRY         │
 ├────────────────────────────────────────────────────────────┬───────────────────────────────────────────┤
 │ 1. Ringkasan (Overview Score 68/100)                       │ • Top: [Map Layers] [● Banjir] [POI] [Rad]│
 │    • Primary risk teaser: Flood 42/100                     │ • Overlays: Red flood polygon + 1km circle│
 │    • Verified sources count: 6                             │ • Info Bar: "Flood Zone Evidence • 95m"   │
 ├────────────────────────────────────────────────────────────┼───────────────────────────────────────────┤
 │ 2. Faktor Risiko (Deteksi Red Flag & Bukti)                │ • Top: [Map Layers] [● Banjir] [POI] [Rad]│
 │    • Active Category: Banjir RISIKO UTAMA                  │ • Overlays: Flood (Red) + Liquefaction(Or)│
 │    • Evidence: BNPB 2024 (✓ Ditinjau), Feb 2024 Genangan   │ • Pins: ⚠ Flood Alert Pin + ⚡ Sesar Pin   │
 │    • Gap: Elevasi jalan masuk (✓ Ditambahkan)              │ • Info Bar: "Zona Risiko Aktif • 2 layer" │
 ├────────────────────────────────────────────────────────────┼───────────────────────────────────────────┤
 │ 3. Perjalanan (Mobilitas & Waktu Tempuh)                   │ • Top: [Rute] [● KRL] [● Tol] [● Arteri]  │
 │    • KRL Commuter Line: 45 min (Stn Bekasi➔Sudirman)       │ • Polylines: 🟢 KRL, 🔵 Tol, 🟠 Arteri,   │
 │    • Tol Jakarta-Cikampek: 55 min                          │              🟣 Rute Sekolah             │
 │    • Rute Arteri Motor: 40 min                             │ • Info Bar: "4 rute tersedia • KRL · Tol" │
 ├────────────────────────────────────────────────────────────┼───────────────────────────────────────────┤
 │ 4. Checklist (Verifikasi Lapangan & Due Diligence)         │ • Top: [Jangkauan] [● Radius 500m]        │
 │    • 3/7 Terverifikasi (43% progress)                      │ • Overlays: 🟢 Green Dashed 500m Circle   │
 │    • Active Filter: Banjir                                 │ • Pins: 4 Walk Pins (🎓 🛒 🍽️ 🕌)          │
 │    • Tips: Kunjungan <24 jam setelah hujan                 │ • Info Bar: "Radius Jalan Kaki 500m • 4"  │
 ├────────────────────────────────────────────────────────────┼───────────────────────────────────────────┤
 │ 5. Fasilitas (Fasilitas Terdekat & POI)                    │ • Top: [Fasilitas] [● Sekolah] [● RS] ... │
 │    • Kesehatan (3): 0.19 km • PETA switch [ON]             │ • Pins: 7 Categorized POI Pins (🎓🏥🛒🌳🕌│
 │    • Pendidikan (1): 1.62 km • PETA switch [OFF]           │ • View: Regional overview (zoom 13)       │
 │    • Belanja (2): 0.04 km • PETA switch [OFF]              │ • Info Bar: "7 fasilitas ditemukan • RS"  │
 └────────────────────────────────────────────────────────────┴───────────────────────────────────────────┘
```

---

## 3. Detailed Per-Stage Correlation Specifications

### 3.1 Stage 1: Ringkasan ➔ Flood Proof Telemetry
- **Left Action**: User views `ScoreCard` (68/100) and `FactorRisksCard` with Flood 42/100 highlighted as `Risiko utama`.
- **Right Map Behavior**:
  - **Camera**: `center: [-6.266, 106.990]`, `zoom: 15`.
  - **Top Bar**: `[Map Layers] [● Banjir] [● POI] [● Radius]`.
  - **Overlays**: Red dashed BNPB flood polygon (`#C95746`, `fillOpacity: 0.25`) + Blue 1km radius circle.
  - **Bottom Info Bar**: `"Flood Zone Evidence • BNPB 2024 • 95m from property"` (Red `#E12626`).

---

### 3.2 Stage 2: Faktor Risiko ➔ Active Hazard Overlays
- **Left Action**: User inspects `DeepDiveEvidenceWorkspace` with active category `Banjir`. Evidence gaps marked `✓ Ditambahkan` to checklist.
- **Right Map Behavior**:
  - **Camera**: `center: [-6.263, 106.990]`, `zoom: 14` (Slight zoom out to display multiple risk zones).
  - **Top Bar**: `[Map Layers] [● Banjir] [● POI] [● Radius]`.
  - **Overlays**:
    1. **Red Polygon**: BNPB moderate–high flood zone.
    2. **Orange Polygon**: Liquefaction hazard zone (`#EA580C`, `dashArray: '5, 5'`).
    3. **Hazard Markers**: `⚠` Red alert pin on flood boundary + `⚡` Orange pin on liquefaction zone.
  - **Bottom Info Bar**: `"Zona Risiko Aktif • 2 layer risiko terdeteksi"` (Orange `#EA580C`).

---

### 3.3 Stage 3: Perjalanan ➔ Transit Corridor Polyline Routing
- **Left Action**: User evaluates `CommuteWorkspace` route cards (`KRL 45 min`, `Tol 55 min`, `Motor 40 min`).
- **Right Map Behavior**:
  - **Camera**: `center: [-6.255, 106.985]`, `zoom: 12` (Regional transit corridor scale).
  - **Top Bar**: `[Rute] [● KRL] [● Tol (Mobil)] [● Arteri (Motor)] [● Rute Sekolah]`.
  - **Polylines Rendered**:
    1. 🟢 **KRL Line (`#16A34A`, width 4)**: From Property ➔ Halte ➔ `Stasiun Bekasi` (green pin).
    2. 🔵 **Tol Line (`#2563EB`, width 4)**: From Property ➔ `Pintu Tol Bekasi Timur` (blue pin).
    3. 🟠 **Arteri Line (`#EA580C`, width 4)**: Along `Jl. Kalimalang ➔ MT Haryono` (orange pin).
    4. 🟣 **Sekolah Line (`#7C3AED`, width 3)**: Direct route to nearest school (purple pin).
  - **Card Selection Effect**: Clicking a specific route card (e.g. `KRL Commuter Line`) highlights that polyline (stroke width `6`, opacity `1.0`) while dimming other routes (opacity `0.35`).
  - **Bottom Info Bar**: `"4 rute tersedia • KRL · Tol · Arteri · Sekolah"` (Blue `#2563EB`).

---

### 3.4 Stage 4: Checklist ➔ 500m Walkability Radius & Essential POIs
- **Left Action**: User checks off physical due-diligence items in `ChecklistWorkspace` (`3 / 7 Terverifikasi`, `43%`).
- **Right Map Behavior**:
  - **Camera**: `center: [-6.266, 106.990]`, `zoom: 15` (Pedestrian scale).
  - **Top Bar**: `[Jangkauan] [● Radius 500m]`.
  - **Overlays**: Green dashed 500m walkability boundary circle (`#16A34A`, `dashArray: '6, 6'`).
  - **Essential Walk Pins**:
    - 🎓 `SDN Grand Galaxy` (Pendidikan pin inside radius).
    - 🛒 `Indomaret Galaxy` (Minimarket pin inside radius).
    - 🍽️ `Warung Makan Bu Sari` (Food pin inside radius).
    - 🕌 `Masjid Al-Hidayah` (Mosque pin inside radius).
  - **Bottom Info Bar**: `"Radius Jalan Kaki 500m • 4 fasilitas esensial terjangkau"` (Green `#16A34A`).

---

### 3.5 Stage 5: Fasilitas ➔ Categorized POI Inventory & Inline Switches
- **Left Action**: User inspects `FasilitasWorkspace` category cards and toggles inline `PETA` switches.
- **Right Map Behavior**:
  - **Camera**: `center: [-6.263, 106.990]`, `zoom: 13` (3km radius neighborhood scale).
  - **Top Bar**: `[Fasilitas] [● Sekolah] [● Kesehatan] [● Belanja] [● Ibadah]`.
  - **Inline Switch Real-Time Sync**:
    - `Kesehatan` switch ON ➔ Renders Red Cross pins (RS Hermina, Klinik Pratama, Apotek K-24).
    - `Pendidikan` switch ON ➔ Renders Purple GraduationCap pins (SDN Galaxy, SMPN 22).
    - `Belanja` switch ON ➔ Renders Cyan ShoppingBag pins (Grand Galaxy Park Mall, Pasar).
  - **Row Click Interaction**: Clicking a facility row (e.g. `RS Hermina Galaxy · 0.48 km`) animates map camera (`flyTo`) directly to that pin and opens a Leaflet tooltip.
  - **Bottom Info Bar**: `"7 fasilitas ditemukan • Sekolah · RS · Mall · Taman · Ibadah"` (Purple `#7C3AED`).

---

## 4. State Synchronization Data Contract

```typescript
export interface WorkspaceToMapCorrelationState {
  activeTab: 'Ringkasan' | 'Faktor risiko' | 'Perjalanan' | 'Checklist' | 'Fasilitas'
  selectedRouteId?: 'krl' | 'tol' | 'arteri' | 'sekolah'
  selectedFactorId?: 'banjir' | 'perjalanan' | 'akses' | 'lingkungan' | 'fasilitas'
  activeFacilityCategories: Record<'kesehatan' | 'pendidikan' | 'belanja' | 'stasiun', boolean>
  selectedFacilityId?: string
}

export function computeMapConfig(state: WorkspaceToMapCorrelationState): TabMapConfig {
  switch (state.activeTab) {
    case 'Faktor risiko':
      return {
        center: [-6.263, 106.990],
        zoom: 14,
        showFloodZone: true,
        showLiquefactionZone: true,
        showRiskAlertPins: true,
        topBarMode: 'layers',
        infoBar: { text: 'Zona Risiko Aktif', sub: '2 layer risiko terdeteksi', color: '#EA580C' },
      }
    case 'Perjalanan':
      return {
        center: [-6.255, 106.985],
        zoom: 12,
        showPolylines: true,
        highlightedRouteId: state.selectedRouteId || 'krl',
        topBarMode: 'routes',
        infoBar: { text: '4 rute tersedia', sub: 'KRL · Tol · Arteri · Sekolah', color: '#2563EB' },
      }
    case 'Checklist':
      return {
        center: [-6.266, 106.990],
        zoom: 15,
        show500mWalkCircle: true,
        showWalkabilityPOIs: true,
        topBarMode: 'walk-radius',
        infoBar: { text: 'Radius Jalan Kaki 500m', sub: '4 fasilitas esensial terjangkau', color: '#16A34A' },
      }
    case 'Fasilitas':
      return {
        center: [-6.263, 106.990],
        zoom: 13,
        showCategorizedPOIs: true,
        activeCategories: state.activeFacilityCategories,
        topBarMode: 'facilities',
        infoBar: { text: '7 fasilitas ditemukan', sub: 'Sekolah · RS · Mall · Taman · Ibadah', color: '#7C3AED' },
      }
    default:
      return {
        center: [-6.266, 106.990],
        zoom: 15,
        showFloodZone: true,
        show1kmRadius: true,
        topBarMode: 'layers',
        infoBar: { text: 'Flood Zone Evidence', sub: 'BNPB 2024 · 95m from property', color: '#E12626' },
      }
  }
}
```

---

## 5. Acceptance Criteria

- [x] Switching from `Faktor risiko` to `Perjalanan` animates camera to zoom 12 and replaces hazard polygons with 4 transit polylines.
- [x] Switching from `Perjalanan` to `Checklist` animates camera to zoom 15 and displays green dashed 500m walk circle with 4 essential walk pins.
- [x] Toggling `PETA` switch for `Kesehatan` in `Fasilitas` dynamically shows/hides healthcare pins on the map in real time.
- [x] Bottom telemetry bar label and color dynamically match the active stage correlation specification.
