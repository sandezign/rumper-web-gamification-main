# PRD-09: Mobile Full-Screen Map Experience & Telemetry

## Metadata

| Field | Value |
|---|---|
| **Author** | Rumper Product Agent & Senior PM |
| **Status** | Approved / Active Production Specification |
| **Created** | 2026-08-22 |
| **Version** | 2.0 |
| **Target Path** | [`docs/prd/PRD-09-mobile-full-map-experience.md`](file:///Users/arisandy/Downloads/Rumper%20App/rumper-web-gamification-main/docs/prd/PRD-09-mobile-full-map-experience.md) |
| **Baseline Documents** | [`PRD-00-overview-architecture.md`](file:///Users/arisandy/Downloads/Rumper%20App/rumper-web-gamification-main/docs/prd/PRD-00-overview-architecture.md), [`PRD-03-interactive-map-panel.md`](file:///Users/arisandy/Downloads/Rumper%20App/rumper-web-gamification-main/docs/prd/PRD-03-interactive-map-panel.md) |
| **Owning Workstreams** | `Product_Management`, `GIS_Telemetry`, `Mobile_UX`, `Frontend_Engineering` |

---

## 1. Summary

The **Mobile Full-Screen Map Experience** specifies the full-bleed spatial investigation mode on mobile viewports (`<1024px`). Triggered by tapping `"Perluas Peta"` or switching to the Map tab, this view expands the Leaflet canvas across the entire screen while providing floating top step selectors, contextual layer filter bars, route polylines, and touch-optimized zoom/recenter controls.

---

## 2. Product Objective

- **Maximized Spatial Clarity**: Eliminate visual clutter so mobile users can inspect flood risk boundaries and transit routes with maximum screen real estate.
- **Contextual Step Browsing on Map**: Allow users to switch between evaluation modes (`Faktor risiko`, `Perjalanan`, `Fasilitas`) directly from a floating top tab bar inside the map.
- **Dynamic Bottom Layer Bars**: Automatically adapt the bottom filter pills to the active mode (Hazard Layers → Transit Routes → Amenity Categories).

---

## 3. Mobile Full Map Modes & UI Architecture

```
 ┌─────────────────────────────────────────────────────────────┐
 │ Top Location Bar: 📍 Grand Galaxy City Block R...     Ganti │
 ├─────────────────────────────────────────────────────────────┤
 │                                                             │
 │   ┌─────────────────────────────────────────────────────┐   │ ── Floating Top Tab Bar
 │   │ [Ringkasan] [Faktor risiko] [Perjalanan]     [✕]   │   │    (Dismiss back to sheet)
 │   └─────────────────────────────────────────────────────┘   │
 │                                                             │
 │                                                             │
 │                 [Leaflet Full-Bleed Map Canvas]             │
 │                                                             │
 │                 • Flood Polygon (Red Dashed)                │
 │                 • 4 Commute Polylines (KRL / Tol / Arteri)  │
 │                 • POI Category Pins (🎓 🏥 🛒 🌳 🕌)         │
 │                 • Property Pin (Centered Blue House)        │
 │                                                             │
 │                                                   [+]       │ ── Floating Zoom Controls
 │                                                   [-]       │
 │                                                   [⌖]       │
 │                                                             │
 │   ┌─────────────────────────────────────────────────────┐   │ ── Floating Context Bar
 │   │ [Map Layers] [● Banjir] [● POI] [● Radius]          │   │    (Mode-dependent pills)
 │   └─────────────────────────────────────────────────────┘   │
 └─────────────────────────────────────────────────────────────┘
```

---

## 4. Mode-Dependent Bottom Floating Bars

The bottom floating bar dynamically swaps its filter pills based on the active top tab:

| Active Tab Mode | Left Header Label | Dynamic Layer Filter Pills | Displayed Spatial Features |
|---|---|---|---|
| **Faktor risiko** | `Map Layers` | `● Banjir`, `● POI`, `● Radius` | BNPB flood polygon (red), liquefaction zone (orange), risk pins. |
| **Perjalanan** | `Rute` | `● KRL` (green), `● Tol (Mobil)` (blue), `● Arteri` (orange) | 4 color-coded route polylines with station/gate endpoint pills. |
| **Fasilitas** | `Fasilitas` | `● Sekolah` (purple), `● Kesehatan` (red), `● Belanja` (cyan) | POI category markers (schools, hospitals, malls, parks, mosques). |

---

## 5. Scope Boundaries

### In Scope
- **Full-Bleed Map Canvas**: 100% viewport height and width rendering.
- **Top Floating Step Bar**: Pill tab list with active tab highlight and right `✕` close button.
- **Bottom Floating Layer Bar**: Pill bar with active layer toggle states.
- **Bottom-Right Zoom / Recenter Controls**: Floating `+`, `-`, and GPS recenter buttons (`40x40px`).
- **Touch Gesture Handling**: Two-finger pinch zoom, one-finger pan, and marker tap popups.

### Out of Scope
- **Offline Map Tile Caching**: Offline PWA raster tile caching (requires local IndexedDB tile store).

---

## 6. Functional Requirements

| FR-ID | Category | Requirement Description | Priority |
|---|---|---|---|
| **FR-901** | Full Map Trigger | Expand map to full-screen when `"Perluas Peta"` or Map bottom tab is clicked. | Must Have |
| **FR-902** | Top Tab Bar | Render floating pill row (`Ringkasan`, `Faktor risiko`, `Perjalanan`, `Checklist`, `Fasilitas`) with `✕` dismiss button. | Must Have |
| **FR-903** | Close Action | Clicking `✕` dismisses full map mode and returns to bottom sheet view. | Must Have |
| **FR-904** | Route Polylines| In `Perjalanan` mode, render 4 color-coded polylines with station labels (`Stasiun Bekasi`, `Pintu Tol`). | Must Have |
| **FR-905** | POI Category Pins| In `Fasilitas` mode, render custom SVG pins for schools, hospitals, malls, parks, mosques. | Must Have |
| **FR-906** | Layer Toggles | Bottom floating pills independently toggle spatial layer visibility. | Must Have |
| **FR-907** | Camera Recenter| Tapping recenter button (`⌖`) animates camera to active property coordinates with 0.5s duration. | Must Have |

---

## 7. Technical Specs & Props Interfaces

```typescript
export interface MobileFullMapProps {
  activeTab: string
  onTabChange: (tab: string) => void
  onClose: () => void
  propertyCoords: [number, number]
  activeLayers: {
    flood: boolean
    liquefaction: boolean
    routes: boolean
    facilities: boolean
    radius: boolean
  }
  onToggleLayer: (layerKey: string) => void
}
```

---

## 8. Acceptance Criteria (Gherkin Scenarios)

### Scenario 1: Switching to Transit Route Mode
- **Given** user is in mobile full-screen map mode
- **When** user taps `"Perjalanan"` on the top floating tab bar
- **Then** the map camera flies to corridor zoom (`zoom: 12`), renders the 4 transit polylines, and updates the bottom bar to `"Rute | ● KRL | ● Tol (Mobil) | ● Arteri"`.

### Scenario 2: Dismissing Full Map Mode
- **Given** user is viewing the full-screen map
- **When** user taps the `✕` close button on the top floating bar
- **Then** the view transitions back to the default workspace view with `MobileBottomSheet`.

---

## 9. Mobile Touch Ergonomics
- All floating buttons (zoom, close, layer toggles) maintain minimum `40x40px` touch targets.
- Touch panning operates with passive touch listeners to ensure 60fps frame rate.
- Bottom floating bar positioned `16px` above the bottom safe area inset.
