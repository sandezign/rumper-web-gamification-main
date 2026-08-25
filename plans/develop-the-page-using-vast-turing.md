# Context

Build the Rumper workspace — a high-fidelity property-location risk analysis interface for a Free Trial user. The task uses a detailed JSON spec (`rumper-workspace-task.json`), a design system (`DESIGN.md`), and a Figma screenshot as the visual reference. The current `App.tsx` is a blank dot-grid placeholder; it will be fully replaced with the workspace.

---

# Implementation Plan

## Font wiring
Add DM Sans variable font via Google Fonts CSS2 `@import` in `src/index.css` (before all other rules), covering axes `opsz,wght` as required by the imported fonts manifest.

## File structure

All new files go under `src/components/`. `src/App.tsx` becomes the workspace root.

```
src/
  index.css            — add DM Sans @import + body defaults
  App.tsx              — workspace root: state, layout, drawer
  components/
    AppHeader.tsx
    SubHeaderTabs.tsx
    VerticalTimeline.tsx
    ScoreCard.tsx
    FactorRisksCard.tsx
    UpgradeBanner.tsx
    LockedStepCard.tsx
    MapPanel.tsx        — react-leaflet map with overlays
    UpgradeDrawer.tsx
```

## Dependencies to install
- `leaflet` + `react-leaflet` — live interactive map
- `@types/leaflet` — TypeScript types

## State in App.tsx
```ts
upgradeDrawerOpen: boolean
factorListExpanded: boolean
mapLayers: { flood: boolean; poiMarkers: boolean; radiusCircle: boolean }
```

## Components

### AppHeader
- Dark bg `#061E28`, `h-[68px]`, flex between two groups.
- Left: Rumper shield logo (inline SVG, green/teal, white wordmark) + "Free Trial" green outlined pill badge.
- Right: location selector pill (pin icon, truncated text, chevron), "2 dari 5 lokasi digunakan" muted pill, circular profile icon button.

### SubHeaderTabs
- Below header, `pt-5`, flex between tabs (left) and assistant button (right).
- Title row above tabs: "Peta Risiko & Evidensi" in DM Sans 600 ~20px.
- Tabs: Ringkasan (active — white bg, dark border, bold), Faktor risiko / Perjalanan / Checklist (locked — dashed border, muted, lock icon). Locked tabs open UpgradeDrawer onClick.
- "Tanya Asisten" blue outlined pill with chat-bubble icon.

### VerticalTimeline
- Absolute-positioned 3px line (green for completed, slate for locked).
- 3 nodes: step 1 & 2 = green circle with checkmark; step 3 = slate circle with lock icon.
- Nodes are 38px, positioned to align vertically with ScoreCard top, FactorRisksCard top, and LockedStepCard top respectively.

### ScoreCard
- White card, `rounded-[24px]`, padding 26px, soft shadow.
- Eyebrow: "INDEKS RISIKO LOKASI" (label/mono uppercase).
- Score: "68" large + "/100" muted.
- Verdict badge: "Layak dengan catatan" amber pill.
- Description paragraph.
- Evidence row: "Data sedang" dark chip + "Berdasarkan 6 sumber data terverifikasi" muted text.
- Gauge ring (SVG circle, 86px, dark teal progress ~68%, shield icon center).

### FactorRisksCard
- White card, `rounded-[24px]`, inner bordered panel `rounded-[16px]`.
- Header: "Faktor risiko" label + info icon.
- 5 factor rows (each: colored icon circle, name, optional "RISIKO UTAMA" red badge, mini progress bar, score text, detail text, status pill, chevron-right).
  - Banjir: red, 42/100, "RISIKO UTAMA" danger badge, "Data sedang" amber pill.
  - Perjalanan: amber, 58/100, "Data sedang" amber pill.
  - Akses fisik: teal, 67/100, "Perlu validasi" yellow pill.
  - Fasilitas: green, 78/100, "Data kuat" green pill.
  - Lingkungan: gray, null→"-", "Perlu validasi" yellow pill.
- Toggle: "Tampilkan semua faktor" / "Sembunyikan faktor" with animated height; collapsed shows only first 3 rows.

### UpgradeBanner
- Dark bg `#061E28`, `rounded-[22px]`, h-[80px], flex between price block and button.
- Left: "Buka laporan lengkap" label + "Rp50.000" green + "Rp150.000" strikethrough muted.
- Right: "Upgrade" green pill button (`#00E676`, `#062B23` text, `h-[46px]`).
- Click opens UpgradeDrawer.

### LockedStepCard
- White card, `rounded-[24px]`, muted/disabled appearance.
- Top metadata: lock icon + "Terbuka setelah upgrade" muted text.
- Title: "Tahap 4 · Verifikasi Red Flag".
- Risk badge: "High Risk" pale-red pill with red dot.
- Risk label: "Verifikasi Bukti Banjir".
- Action button: "Lihat di peta" muted outlined pill, click opens UpgradeDrawer.

### MapPanel
- White card, `rounded-[24px]`, fills right column height.
- **React-Leaflet** map centered on Grand Galaxy City (~-6.266, 106.990), zoom 15, OpenStreetMap tiles.
- Floating control bar (white rounded pill, top inside map): "Map Layers" label + toggle chips for Flood / POI Markers / Radius Circle.
- Overlays (controlled by toggle state):
  - Flood polygon: red dashed `rgba(225,38,38,0.22)` fill, irregular polygon over Grand Galaxy area.
  - Radius circle: blue dashed `rgba(92,92,226,0.05)` fill, ~600m radius.
  - Property marker: blue/purple circle at center with "Grand Galaxy" tooltip.
  - POI markers: alert (red), school (purple), shop (cyan), infrastructure (blue).
- Bottom-left controls: zoom +/-, recenter buttons.
- Bottom-right: "Perluas Peta" white pill button.
- Bottom info bar: "Flood Zone Evidence / BNPB 2024 · 95m from property" with Hide toggle.

### UpgradeDrawer
- Right-side slide-in drawer (CSS translate transition).
- Dark header surface `#061E28` with "Buka laporan lengkap" title, price.
- Feature list with checkmarks: 5 unlocked features.
- "Upgrade sekarang" green primary button + "Tutup" ghost button.
- Overlay backdrop (semi-dark), click overlay to close.

## Layout (App.tsx)
```
<div bg="#F4F7F8" minH-screen>
  <AppHeader />
  <div class="px-5 py-5 flex gap-5">
    {/* Left column ~51% */}
    <div class="flex gap-4 relative" style={{width:'51%'}}>
      <VerticalTimeline />
      <div class="flex flex-col gap-4 flex-1 pl-12">
        <ScoreCard />
        <FactorRisksCard />
        <UpgradeBanner />
        <LockedStepCard />
      </div>
    </div>
    {/* Right column ~47% sticky */}
    <div style={{width:'47%'}} class="sticky top-5 self-start">
      <MapPanel />
    </div>
  </div>
  <UpgradeDrawer open={upgradeDrawerOpen} onClose={...} />
</div>
```

## Verification
1. Dev server hot-reloads; preview shows the workspace at 1536px width.
2. Tabs: Ringkasan active, locked tabs open drawer.
3. Factor list toggle animates height, map stays stable.
4. Map renders OpenStreetMap tiles with polygon, circle, and markers.
5. Upgrade button, locked tab, LockedStepCard, and "Lihat di peta" all open the same drawer.
6. Drawer slides in from right with overlay; closes on backdrop click or "Tutup".
