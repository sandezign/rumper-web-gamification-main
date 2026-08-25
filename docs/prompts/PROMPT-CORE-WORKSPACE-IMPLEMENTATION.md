# MASTER AI PROMPT: Rumper Core Workspace & Due Diligence Telemetry

Copy and paste the entire prompt below into any advanced AI coding assistant (Cursor, Claude 3.7 Sonnet / Opus, Gemini 2.0 Flash / Pro, GPT-4o, v0, Bolt, etc.) to generate or refactor the complete Rumper Core Workspace.

---

```markdown
# Role & System Directive
You are a World-Class Principal Frontend Architect, Lead Creative Technologist, and Senior UI/UX Engineer. Your mission is to build/refactor the production-ready **Core Workspace (Free Trial Gamification & Interactive Map Telemetry)** for **Rumper** — an evidence-led property location intelligence web application for first-time homebuyers in Jabodetabek.

Every visual element must look high-fidelity ("1:1 Pixel-Perfect"), every microinteraction weighted and intentional, and all data state transitions deterministic and fluid. Eradicate all generic AI templates, placeholder stubs, or unstyled elements.

---

## 1. Technical Stack & Environment
- **Framework:** React 19 + TypeScript + Vite
- **Styling:** Tailwind CSS v4 (native CSS tokens + utility classes)
- **Map Engine:** Leaflet & React-Leaflet (OpenStreetMap tiles + SVG Vector Layers)
- **Icons:** `lucide-react`
- **Typography:** `DM Sans` (UI / Headings / Body) + `DM Mono` (Tabular scores / Data telemetry)

---

## 2. Design Tokens & Color Palette
Apply these exact semantic design tokens:
- **Header Bar Background:** `#061E28` (Midnight Bar)
- **Primary Ink & High-Trust Surfaces:** `#001E2B` (Deep Evidence Teal)
- **Brand Action & Interactive Highlights:** `#00ED64` (Rumper Green — strictly for actions/buttons, NEVER for safety greenlighting)
- **Secondary Mint Surface:** `#E3FCEF` (Text: `#00684A`, Border: `#00ED64`)
- **Evidence Positive (Safe):** Background `#DCEEE7`, Ink `#318266`
- **Evidence Warning (Catatan / Hati-hati):** Background `#FFF8E0`, Ink `#D79A2B`
- **Evidence Danger (Risiko Utama / Red Flag):** Background `#F4DED9`, Ink `#C95746`
- **Page Background:** `#F6F8F7` | **Card Surface:** `#FFFFFF` | **Border:** `#D7E1E5`

---

## 3. Core Component Architecture & Layout Grid

Implement a responsive **Desktop 2-Column Split-Screen (50/50) / Mobile Bottom Sheet Layout**:

```
 ┌────────────────────────────────────────────────────────────────────────────────────────┐
 │ 1. APP HEADER (#061E28 Dark Bar)                                                      │
 │ [Shield Mark] [Free Trial] ··········· [Grand Galaxy City ▾] [2/5 lokasi] [💬 Tanya] [⬇ Unduh] [A]│
 ├────────────────────────────────────────────┬───────────────────────────────────────────┤
 │ 2. LEFT WORKSPACE PANEL (Scrollable)       │ 3. RIGHT MAP PANEL (Sticky 100vh)         │
 │                                            │                                           │
 │ • [Left Step Tabs] (Ringkasan, 🔒...)      │ • Map Header: "Peta Risiko & Evidensi"    │
 │ • [ScoreCard] (54/100, Hati-hati badge)    │   Layer Pills: [● Banjir] [🔒 Trans] [🔒] │
 │ • [Risk Breakdown] (5 progress bars)       │ • Amber Alert Banner (BNPB flood notice)  │
 │ • [FloodZoneEvidenceCard] (BNPB 95m, Feb24)│ • Map Canvas: Floating Step Bar           │
 │ • [UpgradeBanner] (Rp50.000 / Rp150.000)   │ • Leaflet Map: Flood Polygon, Radius, POIs│
 │ • [LockedStepCards] (Tahap 2 - 5)          │ • Bottom-Left Legend Card [Legenda ✕]     │
 │                                            │ • Bottom-Right: Status + [+ AI Assistant] │
 │                                            │ • Bottom Footer: "Bukti spasial tertaut"  │
 └────────────────────────────────────────────┴───────────────────────────────────────────┘
```

---

## 4. Detailed Component Specifications

### A. App Header (`AppHeader.tsx`)
- **Container:** `bg-[#061E28] text-white px-5 py-3 h-[56px] flex items-center justify-between sticky top-0 z-40`.
- **Auto-Hide Behavior:** Smooth translate up (`translate-y-[-100%] transition-transform duration-200`) when scrolled down > 20px, reappears when back at top.
- **Left Elements:**
  - **Shield Logo:** Dark container (`#001E2B`) with green stroke shield icon.
  - **Plan Badge:** Pill container displaying `"Free Trial"` (`bg-[#E3FCEF] text-[#00684A] border border-[#00ED64]`). Opens `UpgradeDrawer` on click.
- **Right Elements:**
  - **Location Selector:** Pill button `Grand Galaxy City ▾` (`bg-[#002D3D] text-xs px-3 py-1.5 rounded-full border border-slate-700`). Opens `PropertyModal`.
  - **Quota Telemetry:** Pill badge `2 dari 5 lokasi digunakan` (`bg-[#00382B] text-emerald-400 text-xs px-3 py-1.5 rounded-full`).
  - **Action Button 1 (Assistant):** Blue pill `💬 Tanya Asisten` (`bg-[#0B3558] text-[#5096FF] hover:bg-[#0E426E] text-xs font-semibold px-3 py-1.5 rounded-full`).
  - **Action Button 2 (Download):** Bright green pill `⬇ Unduh laporan` (`bg-[#00ED64] text-[#001E2B] hover:bg-[#00B545] text-xs font-bold px-3.5 py-1.5 rounded-full`).
  - **Profile Avatar:** Circular avatar circle with initial `A` (`w-8 h-8 rounded-full bg-[#00384D] text-white font-bold text-xs flex items-center justify-center`).

### B. Left Workspace Step Tabs (`SubHeaderTabs.tsx`)
- **Pill Tab Bar:** Embedded at the top of the Left Workspace container:
  - `Ringkasan` (Active: `bg-[#0F2B38] text-white font-bold`).
  - `Faktor risiko 🔒` (Locked: `bg-[#F8FAFC] border border-dashed border-[#B9C8D2] text-[#475569]`).
  - `Perjalanan 🔒`, `Checklist 🔒`, `Fasilitas 🔒`.
- **Click Behavior:** Free users clicking locked tabs trigger `setUpgradeOpen(true)`.

### C. Indeks Risiko Lokasi (`ScoreCard.tsx`)
- **Card Container:** White rounded-2xl card (`border border-slate-200 p-6 shadow-xs`).
- **Header:** `INDEKS RISIKO LOKASI` uppercase label.
- **Score Banner:**
  - Large tabular numeral: `54` (`text-4xl font-extrabold text-[#0F2B38]`) with `/100` (`text-slate-400 text-sm`).
  - Radial SVG gauge ring (68px) with filled green stroke offset & checkmark shield icon centered.
  - Verdict Badge: Amber pill `Hati-hati` (`bg-[#FFF8E0] text-[#D79A2B] font-bold text-xs px-3 py-1 rounded-full border border-[#FFE7A3]`).
- **Narrative Text:** *"Skor keseluruhan berada pada band Layak dengan catatan, tetapi critical red flag banjir dan evidence gap lingkungan tetap harus ditindaklanjuti."*
- **Footer Pill:** `● Perlu validasi | Berdasarkan 6 sumber data terverifikasi` (`bg-slate-100 text-slate-600 text-xs px-3 py-1.5 rounded-xl flex items-center gap-2`).

### D. Risk Breakdown (`FactorRisksCard.tsx`)
- **Header:** `RISK BREAKDOWN` (`text-xs font-bold text-slate-500 uppercase tracking-wider`).
- **5 Factor Progress Rows (Color-Coded with Right Numeric Badges):**
  1. **Flood:** Red bar (`#E12626`, 24% width), right badge `24` (red text).
  2. **Commute:** Orange bar (`#F59E0B`, 50% width), right badge `50` (amber text).
  3. **Road Access:** Teal bar (`#0D9488`, 64% width), right badge `64` (teal text).
  4. **Facilities:** Deep Green bar (`#059669`, 100% width), right badge `100` (green text).
  5. **Environment:** Slate bar (`#64748B`, 64% width), right badge `64` (slate text).

### E. Flood Zone Evidence Card (`FloodZoneEvidenceCard.tsx`)
- **Container:** Rounded-2xl card (`border border-red-200 bg-white p-5`).
- **Header:** Fire/Hazard icon (`text-red-500`) + `Flood Zone Evidence` + subtitle `BNPB 2024 · 95m from property` + toggle `Hide ∧`.
- **Bullet 1:** *"Satellite imagery and BNPB flood mapping confirm this parcel falls within the moderate–high flood hazard zone for Kali Bekasi tributary overflow events."*
- **Bullet 2:** *"Historical record: Feb 2024. Flood depth 40–60cm · Duration 3 days"*
- **Data Confidence Box:** Gray container (`bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-600`): *"Data confidence: Medium. BNPB flood maps use 10m resolution; local topography variations may alter actual risk. Field verification is recommended."*

### F. Upgrade Banner & Drawer (`UpgradeBanner.tsx` & `UpgradeDrawer.tsx`)
- **Banner:** Dark container (`bg-[#061E28] text-white p-5 rounded-2xl flex items-center justify-between`).
  - Text: `Buka laporan lengkap`, Price: `Rp50.000` (green) / `Rp150.000` (strikethrough).
  - Button: `Upgrade` green pill (`bg-[#00ED64] text-[#001E2B] font-bold px-5 py-2.5 rounded-full hover:bg-[#00B545]`).
- **Drawer:** Slide-in right panel (`w-full sm:w-[480px] bg-white z-50 shadow-2xl`):
  - Dark header (`bg-[#061E28]`), `PREMIUM PASS` pill, `Rp50.000` price.
  - 5 Unlocked Checklist Items (Akses penuh risiko, Deteksi banjir red flag, Rincian bukti & gap, Checklist due diligence, Rekomendasi lapangan).
  - Methodology Trust Note: *"Analisis menggunakan data terverifikasi dan metodologi deterministik — bukan rekomendasi otomatis dari AI."*
  - CTA Button: `Upgrade sekarang` full-width green button.

### G. Right Interactive Map Panel (`MapPanel.tsx`)
- **Top Map Header Bar:** Title `Peta Risiko & Evidensi` + Layer Pills (`● Banjir` active, `Transportasi 🔒`, `Fasilitas 🔒`, `Lingkungan 🔒`).
- **Amber Alert Banner:** `⚠ Sinyal banjir penting dan langkah validasinya tetap terbuka. Layer non-kritis tersedia dalam simulasi Pro.`
- **Top Floating Step Bar (inside map canvas):** Floating pill row: `Ringkasan`, `Risiko`, `Perjalanan`, `Fasilitas`, `Tol & akses`.
- **Leaflet Map Overlays:**
  - Centered at `[-6.266, 106.990]` (Grand Galaxy City).
  - **Flood Hazard Polygon:** Red dashed polygon vector (`#C95746`, `fillOpacity: 0.25`, `dashArray: '5, 5'`).
  - **Survey Radius Circle:** Blue dashed circle (`#2563EB`, `radius: 3000m`).
  - **Property Pin:** Centered blue house icon pin with ripple drop shadow.
- **Bottom-Left Floating Legend Card (`Legenda ✕`):** Dismissible card showing `Rumah Kandidat` (blue pin) & `Radius Survei 3km` (blue circle).
- **Bottom-Right Floating Telemetry:** Status pill `Layak dengan catatan · 1 sinyal penting` + `+ AI Assistant` button + `+` / `-` zoom controls.
- **Bottom Spatial Link Footer:** Green icon footer: `Bukti spasial tertaut` · `Pilih titik di peta untuk menghubungkan data spasial dengan temuan riset.`

---

## 5. Microinteractions & Motion Specifications (`SPEC-NAV-01`)
1. **Tactile Button/Tab Feedback:**
   - Active press scale: `active:scale-[0.96]` (`100ms`, `cubic-bezier(0.25, 0.46, 0.45, 0.94)`).
   - Hover transition: `150ms ease-out`.
2. **Programmatic Smooth Scroll Math:**
   - Sticky clearance: `STICKY_OFFSET = 184px`.
   - Formula: `y = ref.current.getBoundingClientRect().top + window.scrollY - 184`.
   - Scroll lock guard: Set `isNavigating.current = true` for `900ms` to prevent `IntersectionObserver` scroll-spy jitter.
3. **Bi-Directional Scroll Spy:**
   - `IntersectionObserver` with `rootMargin: '-20% 0px -55% 0px'`.
   - Updates `activeStep` dynamically, which auto-scrolls the active tab pill into center view via `activeBtn.scrollIntoView({ behavior: 'smooth', inline: 'center' })`.
4. **Map Camera Sync (`map.flyTo`):**
   - On tab change, execute `map.flyTo(center, zoom, { duration: 0.75, easeLinearity: 0.25 })`.
   - Coordinates: `Ringkasan: [-6.266, 106.990], zoom 15`, `Faktor risiko: [-6.263, 106.990], zoom 14`, `Perjalanan: [-6.255, 106.985], zoom 12`.
5. **Timeline Node Height Recalculation:**
   - Observe container via `ResizeObserver` and compute top offsets (`getBoundingClientRect().top - parentTop + 16`).

---

## 6. TypeScript Data Models
```typescript
export type WorkspaceStep = 'ringkasan' | 'faktor-risiko' | 'perjalanan' | 'checklist' | 'fasilitas';

export interface PropertyLocation {
  id: string;
  name: string;
  subdistrict: string;
  city: string;
  status: string;
  statusBadge: 'success' | 'warning' | 'danger';
  score: number;
  riskSummary: string;
  evidenceCount: number;
  gapCount: number;
}

export interface RiskFactorItem {
  id: string;
  name: string;
  score: number;
  color: string;
  barColor: string;
  statusText: string;
}
```

---

## 7. Quality Checklist & Guardrails
- [ ] No missing imports or placeholder `// TODO` stubs.
- [ ] Leaflet default icon URL bug must be resolved with `delete L.Icon.Default.prototype._getIconUrl` and custom DivIcons.
- [ ] Ensure all touch targets meet WCAG 2.2 AA (minimum 44x44px clickable area).
- [ ] Strings with apostrophes must use double quotes or proper escaping.
- [ ] Strict adherence to Bahasa Indonesia for domain terms (*Layak dengan catatan*, *Hati-hati*, *Risiko utama*, *Bukti spasial tertaut*).

Generate the clean, complete TypeScript React code fulfilling these exact requirements.
```
