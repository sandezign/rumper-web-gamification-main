# MASTER AI PROMPT: Rumper Mobile Full-Screen Map Experience & Telemetry

Copy and paste the entire prompt below into any AI coding assistant (Cursor, Claude 3.7 Sonnet / Opus, ChatGPT / GPT-4o, Gemini 2.0, v0, Bolt, etc.) to generate or refactor the complete **Mobile Full-Screen Map Experience**.

---

```markdown
# Role & System Directive
You are a Principal Mobile Frontend Architect, Lead Spatial GIS Engineer, and Senior UI/UX Creative Technologist. Your task is to build a production-ready, high-fidelity **Mobile Full-Screen Map Experience & Telemetry System** for **Rumper** — an evidence-backed property due-diligence web app for homebuyers in Jabodetabek.

The output must deliver a smooth 60fps native-feeling mobile GIS interface with touch gestures, floating control overlays, contextual layer filter bars, and seamless transitions between risk, transit, and facility modes.

---

## 1. Technical Stack & Environment
- **Framework:** React 19 + TypeScript + Vite
- **Styling:** Tailwind CSS v4 (Mobile-first utility classes + CSS safe-area insets)
- **Map Engine:** Leaflet & React-Leaflet (`react-leaflet` components with custom Leaflet DivIcons)
- **Icons:** `lucide-react` (Map, Navigation, Cross, GraduationCap, ShoppingBag, TreePine, Star, AlertTriangle, Zap, Plus, Minus, LocateFixed, X)
- **Typography:** `DM Sans` (UI / Labels) + `DM Mono` (Distance / Coordinates)

---

## 2. Design Tokens & Visual Hierarchy
- **Primary Ink / High-Trust Dark:** `#001E2B` (Deep Evidence Teal) & `#061E28` (Midnight Bar)
- **Property Marker Pin:** `#5B5CE2` (Purple house marker with 40px circular pin & ripple drop-shadow)
- **Flood Hazard Polygon:** Border `#C95746` (dashed `5, 5`), Fill `#C95746` (`opacity: 0.25`)
- **Liquefaction Hazard Zone:** Border `#EA580C` (dashed `5, 5`), Fill `#EA580C` (`opacity: 0.20`)
- **Transit Polylines:**
  - 🚆 KRL Line: `#16A34A` (Stroke width `4px`) ➔ Endpoint badge: `Stasiun Bekasi`
  - 🚗 Tol Line: `#2563EB` (Stroke width `4px`) ➔ Endpoint badge: `Pintu Tol Bekasi Timur`
  - 🏍️ Arteri Line: `#EA580C` (Stroke width `4px`) ➔ Endpoint badge: `Jl. Ahmad Yani`
  - 🏫 Sekolah Line: `#7C3AED` (Stroke width `3px`) ➔ Endpoint badge: `Sekolah terdekat`
- **POI Category Markers:**
  - 🎓 Sekolah (Education): `#7C3AED` (Purple)
  - 🏥 Kesehatan (Healthcare): `#DC2626` (Red)
  - 🛒 Belanja (Shopping / Malls): `#0891B2` (Cyan)
  - 🌳 Taman (Green Spaces): `#16A34A` (Green)
  - 🕌 Ibadah (Places of Worship): `#D97706` (Amber)

---

## 3. Mobile Layout Architecture (ASCII Viewport Grid)

```
 ┌─────────────────────────────────────────────────────────────┐ ── Top Safe Area (env(safe-area-inset-top))
 │ 📍 Grand Galaxy City Block R, Bekasi Selatan         Ganti │ ── Sticky Top Location Bar (44px)
 ├─────────────────────────────────────────────────────────────┤
 │                                                             │
 │   ┌─────────────────────────────────────────────────────┐   │ ── Floating Step Pill Bar (Top 16px)
 │   │ [Ringkasan] [Faktor risiko ●] [Perjalanan]    [ ✕ ] │   │    (Auto-scrolls active pill, '✕' closes)
 │   └─────────────────────────────────────────────────────┘   │
 │                                                             │
 │                                                             │
 │                 [Leaflet Full-Bleed Map Canvas]             │
 │                                                             │
 │                 • Property Marker (#5B5CE2 House Pin)       │
 │                 • Red Dashed BNPB Flood Hazard Polygon      │
 │                 • Orange Liquefaction Hazard Zone           │
 │                 • 4 Multi-Modal Transit Polylines           │
 │                 • Categorized POI Pins (🎓 🏥 🛒 🌳 🕌)      │
 │                                                             │
 │                                                   ┌─────┐   │ ── Floating Zoom Controls (Bottom-Right)
 │                                                   │ [+] │   │    (40x40px rounded-full white buttons)
 │                                                   │ [-] │   │
 │                                                   │ [⌖] │   │
 │                                                   └─────┘   │
 │                                                             │
 │   ┌─────────────────────────────────────────────────────┐   │ ── Floating Contextual Layer Bar (Bottom 16px)
 │   │ [Map Layers ▾]  [● Banjir]  [● POI]  [● Radius]     │   │    (Swaps dynamically per active step tab)
 │   └─────────────────────────────────────────────────────┘   │
 └─────────────────────────────────────────────────────────────┘ ── Bottom Safe Area (env(safe-area-inset-bottom))
```

---

## 4. Mode-Dependent Bottom Floating Bar Matrix

The bottom floating bar dynamically swaps its filter pills based on the active top tab:

| Active Tab Mode | Left Header Label | Dynamic Layer Filter Pills | Displayed Spatial Layers |
|---|---|---|---|
| **Faktor risiko** | `Map Layers` | `● Banjir` (Active green), `● POI`, `● Radius` | Red flood polygon + Orange liquefaction polygon + `⚠` & `⚡` alert pins. |
| **Perjalanan** | `Rute` | `● KRL` (`#16A34A`), `● Tol (Mobil)` (`#2563EB`), `● Arteri` (`#EA580C`) | 4 colored polyline routes with station/gate endpoint label pills. |
| **Fasilitas** | `Fasilitas` | `● Sekolah` (Purple), `● Kesehatan` (Red), `● Belanja` (Cyan), `● Ibadah` (Amber) | Categorized POI markers with distance labels. |

---

## 5. Detailed Component Specifications

### A. Top Sticky Location Bar
- **Container:** `h-[44px] bg-white border-b border-slate-200 px-4 flex items-center justify-between text-xs font-semibold text-[#0F2B38] z-30`.
- **Content:** Pin icon (`MapPin` in blue) + truncated address `Grand Galaxy City Block R, Bekasi Selatan` + right action link `"Ganti"` (`text-[#1A60F5] font-bold`). Tapping opens `PropertyModal`.

### B. Floating Top Step Selector Bar
- **Container:** `absolute top-3 left-3 right-3 z-[400] bg-white/95 backdrop-blur-md rounded-full shadow-lg border border-slate-200/80 p-1.5 flex items-center justify-between gap-1.5`.
- **Tabs Row:** Horizontally scrollable pill tabs (`Ringkasan`, `Faktor risiko`, `Perjalanan`, `Checklist`, `Fasilitas`).
  - Active tab style: `bg-[#0F2B38] text-white font-bold px-3 py-1.5 rounded-full text-xs`.
  - Inactive tab style: `text-[#3D4F5B] hover:bg-slate-100 font-semibold px-3 py-1.5 rounded-full text-xs`.
- **Close Action (`✕`):** Round button `w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 shrink-0`. Tapping closes full map mode and restores `MobileBottomSheet`.

### C. Floating Zoom & GPS Recenter Controls (Bottom-Right)
- **Container:** `absolute bottom-20 right-4 z-[400] flex flex-col gap-2`.
- **Buttons:** 3 circular white cards (`w-10 h-10 rounded-full bg-white shadow-md border border-slate-200 flex items-center justify-center text-[#0F2B38] active:scale-90 transition-transform`):
  1. `+` (Zoom In: `map.zoomIn()`)
  2. `-` (Zoom Out: `map.zoomOut()`)
  3. `⌖` (Recenter: `map.flyTo(propertyCoords, 15, { duration: 0.5 })`)

### D. Floating Bottom Layer Control Bar
- **Container:** `absolute bottom-4 left-3 right-3 z-[400] bg-white/95 backdrop-blur-md rounded-full shadow-lg border border-slate-200/80 px-3.5 py-2 flex items-center gap-2 overflow-x-auto scrollbar-none`.
- **Pills:** Toggling a pill toggles that specific layer's visibility on the map and toggles active green dot (`●`).

---

## 6. Microinteractions & Touch Physics Specifications
1. **Camera Transitions:**
   - Tab change triggers smooth camera flight: `map.flyTo(center, zoom, { duration: 0.75, easeLinearity: 0.25 })`.
2. **Touch Gestures:**
   - Smooth two-finger pinch zoom and one-finger momentum pan.
   - Passive event listeners for zero scroll-blocking overhead (60fps guaranteed).
3. **Tactile Button Feedback:**
   - All floating buttons apply `active:scale-[0.92]` on touch down (`100ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`).
4. **Ergonomic Touch Targets:**
   - All interactive controls have minimum `40x40px` touch bounding boxes.
   - Respects safe area bottom padding: `bottom: calc(1rem + env(safe-area-inset-bottom))`.

---

## 7. TypeScript Contracts & Interfaces

```typescript
export type MobileMapMode = 'ringkasan' | 'faktor-risiko' | 'perjalanan' | 'checklist' | 'fasilitas';

export interface MobileFullMapExperienceProps {
  activeTab: MobileMapMode;
  onTabChange: (tab: MobileMapMode) => void;
  onClose: () => void;
  propertyCoords: [number, number];
  propertyName: string;
  propertySubdistrict: string;
  onOpenLocationModal: () => void;
}

export interface MapLayerState {
  floodZone: boolean;
  liquefaction: boolean;
  transitRoutes: boolean;
  facilities: boolean;
  walkRadius: boolean;
}
```

---

## 8. Quality Guardrails & Definition of Done
- [ ] Leaflet default icon URL bug must be patched with custom `L.divIcon` using `renderToStaticMarkup`.
- [ ] No layout overflow or horizontal screen wobble on mobile touch devices.
- [ ] Floating top bar automatically centers the active tab pill on tab switch via `scrollIntoView({ inline: 'center', behavior: 'smooth' })`.
- [ ] Tapping `✕` cleanly triggers `onClose()` to restore the workspace view.

Generate the clean, complete TypeScript React code fulfilling these exact mobile map requirements.
```
