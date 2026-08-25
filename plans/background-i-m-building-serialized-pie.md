# Plan: Map Panel Improvements + Mobile Bottom Sheet

## Reference analysis (`src/imports/image.png`)
The reference shows a mobile layout with:
- **Header**: Property name + confidence badge at top
- **Scrollable filter pills**: "Semua 8", "Banjir & Cuaca 2", "Akses Transportasi…" — horizontal scroll, active pill is dark green filled
- **Map**: Fills ~55% of screen height with markers (property pin, flood, nature, nav)
- **Bottom sheet**: Draggable panel below map
  - Drag handle (dot grid) + "Tarik untuk penuh" hint
  - "8 data ditemukan · 0/7 terverifikasi · 0%" header + "Tutup" button
  - List of evidence cards: colored icon, title, risk badge (Low/Medium Risk), description, category label, "Tandai" action button
  - Cards scroll within the sheet; sheet can be pulled full-screen

---

## Context
Current layout: sticky right column at `47%` width. On small screens the control bar wraps/stacks. User wants:
1. **Desktop**: 50:50, map NOT sticky
2. **Mobile/tablet (<768px)**: map full width on top, bottom sheet drawer for all left-column content + tab navigation
3. **Map Layers filter**: right-aligned in control bar
4. **Info bar**: consolidated into bottom strip with "Perluas Peta"
5. **Perluas Peta**: full-page CSS-fixed overlay (no remount)

---

## Files to modify
- `src/App.tsx` — layout switch at `md` breakpoint, mobile bottom sheet state
- `src/components/MapPanel.tsx` — control bar alignment, info bar, fullscreen, mobile filter pills
- `src/components/MobileBottomSheet.tsx` — **new component**

---

## Implementation

### 1. Desktop layout: 50:50 not sticky (`src/App.tsx`)
```jsx
// Left column
<div style={{ width: '50%', minWidth: 0 }}>

// Right column — remove sticky
<div style={{ width: '50%', minWidth: 0 }}>
```
MapPanel height: `calc(100vh - 100px)` (no sticky offset needed).

### 2. Mobile layout: stacked + bottom sheet (`src/App.tsx`)

Below `md` (768px), render a completely different shell:
```jsx
{/* Desktop: side-by-side */}
<div className="hidden md:flex gap-5 px-5 py-5 items-start">
  <div style={{ width:'50%' }}>…left sections…</div>
  <div style={{ width:'50%' }}>…MapPanel…</div>
</div>

{/* Mobile: map + bottom sheet */}
<div className="flex flex-col md:hidden" style={{ height: 'calc(100vh - 68px)' }}>
  <MapPanel … mobileMode />
  <MobileBottomSheet
    activeStep={activeStep}
    onStepChange={navigateToStep}
    isPremium={isPremium}
    onUpgrade={() => setUpgradeOpen(true)}
  >
    {/* all workspace sections rendered here */}
  </MobileBottomSheet>
</div>
```

### 3. MobileBottomSheet component (`src/components/MobileBottomSheet.tsx`)

Three snap states: `peek` (120px, shows handle + header), `half` (~45% viewport), `full` (90% viewport).

Structure:
```
┌────────────────────────────────┐
│  ·· (drag handle)              │
│  ↑ Tarik untuk penuh           │
├────────────────────────────────┤
│  [Scrollable tab pills]        │  ← SubHeaderTabs in horizontal scroll mode
├────────────────────────────────┤
│  {children}  ← workspace       │  ← overflow-y: auto
│  sections rendered here        │
└────────────────────────────────┘
```

Touch drag logic: `onTouchStart` / `onTouchMove` / `onTouchEnd` on the handle to snap between heights.
Click "Tarik untuk penuh" → snap to `full`.

### 4. Map Layers → right-aligned (MapPanel control bar)
```jsx
<div className="flex items-center gap-2 px-4 py-2.5">
  {/* Label stays left */}
  <div className="flex items-center gap-1.5 shrink-0">…icon + label…</div>
  {/* Filter pills pushed right */}
  <div className="flex items-center gap-1.5 ml-auto flex-wrap justify-end">
    …toggle pills…
  </div>
</div>
```

### 5. Info bar → bottom strip with Perluas Peta (MapPanel)
Replace separate `absolute bottom-4 left-4` info bar + `absolute bottom-4 right-4` expand button with one row:
```jsx
<div className="absolute bottom-4 left-4 right-4 z-[900] flex items-center gap-2">
  {/* Info chip */}
  <div className="flex-1 flex items-center gap-2 px-3 py-2 bg-white rounded-xl shadow text-xs truncate">
    <span dot style={{ color: tabCfg.infoColor }} />
    <span className="font-semibold truncate">{tabCfg.infoLabel}</span>
    <span className="text-slate-400 truncate hidden sm:block">{tabCfg.infoSub}</span>
  </div>
  {/* Perluas Peta */}
  <button onClick={() => setFullscreen(true)} className="shrink-0 …">
    ⤢ Perluas Peta
  </button>
</div>
```
Move ZoomControls from `bottom-14` to `bottom-[72px]` to clear the new strip.

### 6. Perluas Peta fullscreen (CSS fixed, no remount) (MapPanel)
```jsx
const [fullscreen, setFullscreen] = useState(false)

// Escape key
useEffect(() => {
  if (!fullscreen) return
  const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') setFullscreen(false) }
  window.addEventListener('keydown', fn)
  return () => window.removeEventListener('keydown', fn)
}, [fullscreen])

// Wrapper style toggle
<div
  className="bg-white flex flex-col overflow-hidden transition-all"
  style={fullscreen
    ? { position:'fixed', inset:0, zIndex:9999, borderRadius:0, height:'100vh', width:'100vw' }
    : { borderRadius:24, height:'calc(100vh - 100px)', minHeight:500, position:'relative' }
  }
>
  {/* Fullscreen-only: floating top tab bar */}
  {fullscreen && (
    <div className="absolute top-4 left-4 right-16 z-[1001]">
      <SubHeaderTabs … />
    </div>
  )}

  {/* Close button (fullscreen only) */}
  {fullscreen && (
    <button onClick={() => setFullscreen(false)}
      className="absolute top-4 right-4 z-[1002] …">
      <X size={16}/> Tutup
    </button>
  )}

  {/* existing map + controls */}
  …
</div>
```
MapPanel needs `onTabChange` prop added (pass `navigateToStep` from App.tsx) for the floating tab bar.

---

## Verification
1. Desktop ≥768px: 50:50 side-by-side, map not sticky, scrolls with page
2. Mobile <768px: map fills top, bottom sheet shows with tab navigation and workspace sections
3. Bottom sheet drags between peek/half/full; "Tarik untuk penuh" snaps to full
4. Layer filter pills align right of control bar label
5. Info bar + Perluas Peta form a single bottom row; zoom controls don't overlap
6. Perluas Peta expands map to full viewport with tab bar + close button floating
7. Escape key closes fullscreen
8. `pnpm tsc --noEmit 2>&1 | grep -v pasted_text` → no errors

---

# Plan: Updated Core Workspace PRD

## Context
The MapPanel sits in a `sticky top-5` right column at `width:47%`. The user wants:
1. **Responsive 50:50 layout** — both columns equal width, map NOT sticky (scrolls naturally with page)
2. **Map Layers control bar** — filter pill group right-aligned instead of left-packed
3. **Info bar consolidated** — move the floating "Flood Zone" info bar to the bottom strip alongside "Perluas Peta" to stop conflicting with zoom controls
4. **Perluas Peta fullscreen** — clicking expand opens a full-page overlay with the map + layer controls + tab navigation floating on top; Escape or close button dismisses it

---

## Files to modify
- `src/App.tsx` — layout column widths + sticky removal + pass `expanded` state to MapPanel
- `src/components/MapPanel.tsx` — control bar alignment, info bar position, fullscreen overlay logic

---

## Implementation

### 1. Layout: 50:50, not sticky (`src/App.tsx`)

Change the right column wrapper from:
```jsx
<div className="sticky top-5 self-start" style={{ width: '47%', minWidth: 0 }}>
```
to:
```jsx
<div style={{ width: '50%', minWidth: 0 }}>
```
Change the left column from `width: '51%'` to `width: '50%'`.

The MapPanel height should fill the viewport naturally. Change `height: 'calc(100vh - 140px)'` inside MapPanel to `height: 'calc(100vh - 100px)'` (no offset needed since non-sticky). Optionally add `min-height: 500px`.

### 2. Layer controls right-aligned (MapPanel control bar)

The control bar is `flex items-center gap-2 px-4 py-2.5 flex-wrap`. The label group (icon + "Map Layers" text) stays left; add `ml-auto` to the filter pills wrapper so they push to the right:

```jsx
{/* Label — stays left */}
<div className="flex items-center gap-1.5">…icon + label…</div>

{/* Filter pills — pushed right */}
<div className="flex items-center gap-1.5 ml-auto flex-wrap justify-end">
  {/* toggle pills */}
</div>
```

### 3. Info bar → bottom strip (MapPanel)

**Remove** the existing `absolute bottom-4 left-4` info bar.

**Add** a bottom bar row at `absolute bottom-4 left-4 right-4 z-[900]`:
```jsx
<div className="absolute bottom-4 left-4 right-4 z-[900] flex items-center justify-between gap-2">
  {/* Info label chip (left) */}
  <div className="flex items-center gap-2 px-3 py-2 bg-white rounded-xl shadow text-xs …">
    <span colored-dot /> <span>{tabCfg.infoLabel}</span> <span muted>{tabCfg.infoSub}</span>
  </div>

  {/* Perluas Peta button (right) */}
  <button onClick={() => setFullscreen(true)} …>expand icon + "Perluas Peta"</button>
</div>
```

Move ZoomControls up to avoid overlap: change `bottom-14` to `bottom-16` or adjust so the 3-button stack clears the bottom bar (approx 56px bar height → `bottom-[72px]`).

### 4. Perluas Peta fullscreen overlay (MapPanel)

Add local state: `const [fullscreen, setFullscreen] = useState(false)`

When `fullscreen === true`, render a **portal** (`ReactDOM.createPortal`) into `document.body`:

```jsx
{fullscreen && createPortal(
  <div style={{ position:'fixed', inset:0, zIndex:9999, background:'#000' }}>
    {/* Full map */}
    <MapContainer … style={{ width:'100%', height:'100%' }}>
      {/* same layers, camera, markers */}
      
      {/* Floating top bar: tab navigation */}
      <div style={{ position:'absolute', top:16, left:16, right:16, zIndex:1001 }}>
        <SubHeaderTabs … /> {/* receives same props — needs to be passed down */}
      </div>

      {/* Floating layer controls */}
      <div style={{ position:'absolute', top:72, left:16, right:16, zIndex:1001 }}>
        {/* layer toggle pills */}
      </div>

      {/* Close button */}
      <button onClick={() => setFullscreen(false)} style={{ position:'absolute', top:16, right:16, zIndex:1002 }}>
        <X size={20} /> Tutup
      </button>

      {/* Bottom strip: info bar */}
      <div style={{ position:'absolute', bottom:16, left:16, right:16, zIndex:1001 }}>
        {/* info label chip */}
      </div>
    </MapContainer>
  </div>,
  document.body
)}
```

Add `Escape` key listener: `useEffect(() => { const fn = (e) => { if (e.key==='Escape') setFullscreen(false) }; window.addEventListener('keydown',fn); return ()=>window.removeEventListener('keydown',fn) }, [fullscreen])`

**Props to thread**: MapPanel needs `activeTab`, `facilityVisible`, `onTabChange`, `onUpgrade` — `onTabChange` is new (so the tab bar in the overlay works). Add it to `MapPanelProps` and pass `navigateToStep` from App.tsx.

Because `MapContainer` cannot be remounted (Leaflet loses state), the fullscreen overlay must instantiate a **second `MapContainer`** with the same center/zoom, or use a different approach: CSS `transform`/`position:fixed` on the existing map wrapper. The CSS approach is simpler and avoids double-mounting:

**CSS-only expand approach** (preferred — no double mount):
```jsx
<div
  style={fullscreen ? {
    position: 'fixed', inset: 0, zIndex: 9999,
    borderRadius: 0, height: '100vh', width: '100vw'
  } : {
    borderRadius: 24, height: 'calc(100vh - 100px)', minHeight: 500, position: 'relative'
  }}
  className="bg-white flex flex-col overflow-hidden"
>
  {/* existing content unchanged */}
</div>
```
This reuses the live map instance. No portal needed. The overlay floating elements (tab bar, close button) are rendered inside this div with `position:absolute`.

---

## Verification
1. At normal viewport: both columns are 50% wide, map is not sticky (scrolls with left column)
2. Layer filter pills align to the right of the control bar
3. Info bar and "Perluas Peta" button form a single bottom row; zoom controls don't overlap
4. Clicking "Perluas Peta" expands the map to full screen with tab navigation + layer controls visible
5. Pressing Escape or clicking "Tutup" collapses back to 50:50 layout
6. No TypeScript errors (`pnpm tsc --noEmit | grep -v pasted_text`)

---

# Plan: Updated Core Workspace PRD

## Context
The existing PRD (`prd-core-workspace-gamificatio.md`) was written before several features were built: the tab-aware Leaflet map, CommuteWorkspace, DeepDiveEvidenceWorkspace, Fasilitas tab, and the step-prerequisite gating system. The user wants a new PRD that accurately reflects the current prototype AND captures planned state for unbuilt sections (Checklist workspace, Fasilitas workspace), while documenting cross-tab feature correlations and map interactions.

## Output file
Save updated PRD as:
`src/imports/pasted_text/prd-core-workspace-v2.md`

## PRD structure to produce

1. **Summary** — Updated metadata, v2, scope of all 5 tabs
2. **Product Objective** — Free trial gamification + due diligence stepper + conversion
3. **User Outcome** — Per-tab user goals
4. **Scope** — In scope: all 5 tabs + map sync + step gating. Out of scope: mobile, AI overlay, backend
5. **Functional Requirements table** — One table covering all 5 tabs + map + gating + inter-tab correlation flows (FR-IDs)
6. **Business/Product Rules** — Premium gate, step prerequisite chain, Decision Safety Rule STD-SCR-001 §7, quota badge
7. **Cross-tab feature correlations** — Explicit table: which action in tab X triggers state change or navigation in tab Y, plus map sync events
8. **Map interaction spec** — Per-tab map mode (from TAB_CONFIG), layer controls, flyTo behavior, info bar, per-tab content
9. **Current vs. Planned state** — Two-column table for Checklist and Fasilitas tabs
10. **Design References** — Link to component files
11. **Technical/Integration Notes** — Component file paths, state ownership, props chain
12. **Acceptance Criteria** — Per tab + global
13. **Risks & Open Questions**

## Key facts to include (from prototype analysis)

### Tab gating matrix
| Tab | Free user | Premium + step requirement |
|---|---|---|
| Ringkasan | Full access | — |
| Faktor risiko | Upgrade prompt | None after premium |
| Perjalanan | Upgrade prompt | Requires 'Faktor risiko' completed |
| Checklist | Upgrade prompt | Requires 'Perjalanan' completed |
| Fasilitas | Upgrade prompt | Requires 'Checklist' completed |

### Current state by tab
- **Ringkasan**: ScoreCard (68/100, hardcoded) + FactorRisksCard (5 factors, expand toggle) + UpgradeBanner/LockedStepCard (free) or DeepDiveEvidenceWorkspace (premium) + NextStepTeaserCards (premium only)
- **Faktor risiko**: No dedicated workspace — same card column as Ringkasan after premium unlock; DeepDiveEvidenceWorkspace is the main premium content
- **Perjalanan**: CommuteWorkspace — 4 route cards (KRL, Tol, Arteri, Sekolah), route detail panel, leg timeline, add-to-checklist CTA that auto-navigates to Checklist tab
- **Checklist**: Tab exists, step-gated — NO workspace component built yet
- **Fasilitas**: Tab exists, step-gated — NO workspace component built yet

### Map sync per tab (built)
- Ringkasan: flood polygon + 600m radius + 4 Lucide POI markers, zoom 15
- Faktor risiko: stronger flood + liquefaction polygon + 800m radius + 2 risk markers, zoom 14
- Perjalanan: 4 color-coded polylines + labeled endpoints + route toggles, zoom 12
- Checklist: 500m walkability circle + 4 walkability POIs, zoom 15
- Fasilitas: 7 facility markers (GraduationCap, Cross, ShoppingBag, TreePine, Star), zoom 13
- Camera flyTo animates (0.75s) on every tab switch

### Cross-tab correlation flows (built)
- CommuteWorkspace "Tambahkan ke checklist" → marks added → after 600ms navigates to Checklist tab
- DeepDiveEvidenceWorkspace gap cards "Tambahkan ke checklist" → navigates to Checklist tab
- LockedStepCard "Lihat di peta" button → intended to highlight flood polygon on map (not yet wired)
- NextStepTeaserCards steps 4/5/6 "Lihat di peta" buttons → not yet wired
- handleTabChange marks previous tab as completed → unlocks next step-gated tab

## Verification
- PRD is saved to `src/imports/pasted_text/prd-core-workspace-v2.md`
- All 5 tabs are documented with current + planned state
- Map interaction spec covers all 5 tab modes
- Cross-tab correlation table is present
- No design spec details are duplicated — component file paths are referenced instead

---

# Plan: Tab-Aware Map Content

## Context
The MapPanel currently renders identically regardless of which tab is active. The user wants the map to show contextually relevant overlays, markers, and camera positions for each of the 5 workspace tabs: Ringkasan, Faktor risiko, Perjalanan, Checklist, and Fasilitas.

## Approach

### 1. Thread `activeTab` into MapPanel

**`src/App.tsx`** — add `activeTab={activeTab}` to the `<MapPanel>` JSX (it already passes `isPremium` and `onUpgrade`).

**`src/components/MapPanel.tsx`** — extend the props interface to accept `activeTab: string`.

### 2. Define per-tab layer configs inside MapPanel

Create a `TAB_MAP_CONFIG` constant (or derived object) keyed by tab name with:
- `center: [lat, lng]` and `zoom: number` — camera position
- `showFloodZone: boolean`
- `showRiskOverlays: boolean` (liquefaction polygon, etc.)
- `showRoutes: boolean` — Perjalanan polylines
- `showFacilities: boolean` — categorized POI markers
- `showWalkRadius: boolean` — Checklist 500m circle
- `infoBarContent` — bottom info bar label override

### 3. Tab → Map Mode details

| Tab | Zoom | Key overlays |
|---|---|---|
| Ringkasan | 15 | Property pin, flood polygon (red), 4 POI markers, 600m radius |
| Faktor risiko | 14 | Flood polygon (stronger fill), liquefaction zone (orange polygon), road density circle (blue dashed), risk-focused info bar |
| Perjalanan | 12 | 4 route polylines (KRL green, Tol blue, Arteri orange, Sekolah purple), labeled endpoint markers, no risk overlays |
| Checklist | 15 | 500m walkability circle, nearby essentials markers (warung, minimarket, mosque, school) |
| Fasilitas | 13 | Categorized facility markers: schools 🎓, hospitals 🏥, malls 🛒, parks 🌳, mosques 🕌 |

### 4. Animated camera transition on tab switch

Use a `MapFlyTo` child component (uses `useMap()` inside the Leaflet context) that calls `map.flyTo(center, zoom, { duration: 0.8 })` whenever `activeTab` changes.

### 5. Route polylines for Perjalanan

Use realistic multi-waypoint coordinates approximating:
- **KRL** — property → Bekasi Timur station → Manggarai (green)
- **Tol via Mobil** — property → Tol Bekasi–Jakarta interchange (blue)
- **Jalur Arteri via Motor** — property → Jl. Ahmad Yani arterial route (orange)
- **Rute Sekolah** — property → nearest school POI (purple, short radius)

### 6. Layer toggle bar

The existing layer toggles (Banjir, Titik POI, Radius) remain for Ringkasan and Faktor risiko tabs. For Perjalanan, Checklist, and Fasilitas, replace the toggle bar with tab-specific controls (e.g., route selector for Perjalanan, category filter for Fasilitas).

## Critical files to modify

- `src/App.tsx` — pass `activeTab` prop to MapPanel
- `src/components/MapPanel.tsx` — full tab-aware refactor of layer rendering and camera logic

## Verification

1. Switch tabs and confirm the map camera flies to the correct zoom/center
2. Verify Perjalanan shows route polylines and hides risk overlays
3. Verify Fasilitas shows facility markers at wider zoom
4. Confirm existing layer toggles still work on Ringkasan tab
5. No TypeScript errors (`pnpm tsc --noEmit`)
