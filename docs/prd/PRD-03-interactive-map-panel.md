# PRD-03: Interactive Map Panel & Telemetry

## Metadata

| Field | Value |
|---|---|
| **Author** | Rumper Product Agent & Senior PM |
| **Status** | Approved / Active Production Specification |
| **Created** | 2026-08-22 |
| **Version** | 2.0 |
| **Target Path** | [`docs/prd/PRD-03-interactive-map-panel.md`](file:///Users/arisandy/Downloads/Rumper%20App/rumper-web-gamification-main/docs/prd/PRD-03-interactive-map-panel.md) |
| **Baseline Documents** | [`PRD-00-overview-architecture.md`](file:///Users/arisandy/Downloads/Rumper%20App/rumper-web-gamification-main/docs/prd/PRD-00-overview-architecture.md) |
| **Owning Workstreams** | `Product_Management`, `GIS_Telemetry`, `Frontend_Engineering` |

---

## 1. Summary

The **Interactive Map Panel** provides real-time spatial telemetry synchronized with the property risk workspace. It renders OpenStreetMap tiles centered on the active location (Bekasi / Grand Galaxy City), layered with flood hazard polygons (BNPB 2024 data), liquefaction risk zones, transit route polylines, commute radius boundaries, candidate property pins, and surrounding points of interest (POIs).

---

## 2. Product Objective

- **Contextual Spatial Verification**: Adapt Leaflet map viewport, overlays, and telemetry labels dynamically based on the user's active workspace tab (`Ringkasan`, `Faktor risiko`, `Perjalanan`, `Checklist`, `Fasilitas`).
- **Visual Proof Loop**: Provide immediate visual evidence for every analytical score claim (e.g. red dashed flood polygon for BNPB 95m flood hazard).
- **Interactive Telemetry**: Allow layer filtering (Banjir, POI, Radius, Rute, Walkability) and full-screen map expansion.

---

## 3. User Outcome (Per-Tab Map Modes)

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

---

## 4. Map Interaction & Tab-Aware Layer Specification (`TAB_CONFIG`)

| Step Tab | Camera Center | Zoom | Overlays & Markers | Info Bar Content | Layer Controls |
|---|---|---|---|---|---|
| **Ringkasan** | `[-6.266, 106.990]` | `15` | Property pin, red flood polygon, 1km dashed radius, POI pins. | `"Flood Zone Evidence • BNPB 2024 • 95m from property"` | Banjir, POI, Radius |
| **Faktor risiko** | `[-6.263, 106.990]` | `14` | High-opacity flood polygon, orange liquefaction polygon, 2 risk pins. | `"Zona Risiko Aktif • 2 layer risiko terdeteksi"` | Flood & Liquefaction |
| **Perjalanan** | `[-6.255, 106.985]` | `12` | 4 color-coded polylines (KRL green, Tol blue, Arteri orange, Sekolah purple), endpoints. | `"4 rute tersedia • KRL · Tol · Arteri · Sekolah"` | Route Selector |
| **Checklist** | `[-6.266, 106.990]` | `15` | 500m walkability circle, 4 nearby essential walk pins. | `"Radius Jalan Kaki 500m • 4 fasilitas esensial terjangkau"` | Walk Toggles |
| **Fasilitas** | `[-6.263, 106.990]` | `13` | Categorized facility pins (GraduationCap 🎓, Cross 🏥, ShoppingBag 🛒, TreePine 🌳, Star 🕌). | `"7 fasilitas ditemukan • Sekolah · RS · Mall · Taman · Ibadah"` | Facility Filters |

---

## 5. Functional Requirements

| FR-ID | Category | Requirement Description | Priority |
|---|---|---|---|
| **FR-301** | Base Map | Render OpenStreetMap tiles with custom zoom controls (`+`, `-`, Recentering). | Must Have |
| **FR-302** | Tab Sync | Execute `map.flyTo` camera animation (0.75s duration) on active workspace tab change. | Must Have |
| **FR-303** | Flood Layer | Render `FLOOD_POLYGON` vector (`fillColor: #C95746`, `fillOpacity: 0.25`, `dashArray: '5, 5'`). | Must Have |
| **FR-304** | Transit Routes| Render 4 color-coded polyline routes: KRL (`#16A34A`), Tol (`#2563EB`), Arteri (`#EA580C`), Sekolah (`#7C3AED`). | Must Have |
| **FR-305** | POI Pins | Render cached SVG divIcons for amenities (Schools, Hospitals, Malls, Parks, Mosques). | Must Have |
| **FR-306** | Info Bar | Render bottom telemetry pill displaying active tab evidence context and `"Perluas Peta"` CTA. | Must Have |
| **FR-307** | Map Modal | Expand map into full-bleed modal overlay when `"Perluas Peta"` is clicked. | Must Have |

---

## 6. Current vs. Planned Implementation State

| Feature | Built Prototype State (Current) | Planned Target State |
|---|---|---|
| Map Canvas | Built with Leaflet OSM, dynamic camera center, zoom controls. | Vector tile base map for faster rendering. |
| Overlays | Built with BNPB flood polygon, liquefaction polygon, radius circles, POI pins. | Real-time river water level telemetry layers. |
| Routes | Built with mock polyline coordinates for 4 transit routes. | Live OSRM / Google Directions API routing integration. |
| Map Modal | Built with full-bleed expand mode. | Multi-property side-by-side map comparison view. |

---

## 7. Technical Specs & Props Interface

```typescript
export interface MapPanelProps {
  activeTab?: string
  isPremium?: boolean
  onUpgrade?: () => void
  activePropertyId?: string
}
```

---

## 8. Acceptance Criteria

- [x] Leaflet map renders centered on Grand Galaxy City (`-6.266, 106.990`).
- [x] Switching workspace tabs triggers camera `flyTo` transition and updates telemetry info bar.
- [x] Red dashed flood polygon accurately overlays BNPB flood hazard zone.
- [x] Clicking `"Perluas Peta"` opens full-screen map modal view.
