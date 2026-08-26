# Scenario Bridge Screen Design Spec

## Context & Motivation
In the Rumper gamification wizard, users transition from selecting their primary homebuying pain point in **Stage 1 (Kendala Utama)** directly into **Stage 2 (Skenario 1: Transit Cepat vs Luas Tanah)**. In Stage 2, users are immediately presented with dense real estate metrics (e.g., Transit-Oriented corridor, Row 6m, KRL commuter times, mortgage breakdown, and real trade-offs). 

To prevent cognitive overload and decision paralysis for first-time homebuyers, we introduce an empathetic, Flo-inspired **Bridge Screen** ("Stage 1.5") that primes users on *why* they are testing real-world scenarios and demystifies key trade-off dimensions before they interact with detailed comparison cards.

---

## User Flow & State Integration

1. **Step Position:**
   * Located immediately after Stage 1 (Friction Discovery) and before Stage 2 (Value Proof Scenario 1).
   * Displayed inside the standard responsive wizard shell (`ResponsiveWizardShell.tsx`).
   * Represented in the step progress calculation smoothly (`15% Selesai`).

2. **Navigation Actions:**
   * **Primary CTA:** `"Mulai Coba (2 menit) →"` — advances the wizard to Scenario 1 (`transit-vs-space`).
   * **Secondary Escape Route:** `"Lewati langsung ke pengaturan budget"` — invokes `skipToParameterSetup()` to jump directly to Stage 5 parameter profiling.
   * **Back Navigation:** Returns to Stage 1 with previously selected friction preserved.

---

## Content & Copywriting Specification (Indonesian)

### 1. Contextual Bridge Pill
* **Badge Text:** `✨ Nyambung kendalamu: "[Dynamic Friction Selected from Stage 1]"`
* **Fallback:** `✨ Membantu mencari titik temu kompromi rumah pertamamu`

### 2. Header & Empathetic Narrative
* **Title:** `Pilih rumah pertama emang penuh kompromi`
* **Subtitle:** `Sebelum lanjut ke filter budget & lokasi, yuk uji prioritas aslimu lewat 3 simulasi skenario nyata di Jabodetabek:`

### 3. Three Core Trade-Off Value Pillars
1. **🚆 1. Waktu Komuter vs Luas Ruang**
   * *Description:* `Pilih hemat waktu di KRL (rumah kompak) atau punya kamar & halaman lebih luas (komut lebih panjang).`
   * *Icon:* Lucide `Train` / `Clock`
   * *Background Accent:* `#EBF3FA` (Soft Sky Blue)

2. **🛡️ 2. Kesiapan Banjir & Akses Jalan**
   * *Description:* `Bandingkan rasa tenang bebas genangan saat musim hujan vs kedekatan ke pusat kota dan fasilitas.`
   * *Icon:* Lucide `ShieldCheck` / `Umbrella`
   * *Background Accent:* `#E9F5EF` (Soft Emerald)

3. **💳 3. Cicilan Riil vs Biaya Operasional**
   * *Description:* `Hitung total pengeluaran bulanan (bensin, tol, KPR), bukan cuma harga brosur perumahan.`
   * *Icon:* Lucide `Wallet` / `Coins`
   * *Background Accent:* `#FFF7ED` (Soft Amber)

### 4. CTAs
* **Primary Button:** `Mulai Coba (2 menit) →` (`bg-[#00684A]` hover `bg-[#004F38]`, text white, pill-shaped)
* **Secondary Link:** `Lewati langsung ke pengaturan budget` (`text-[#7C8C9A]`, underline on hover)

---

## Component Architecture & Responsive Design

### New Component
* **Path:** `src/components/wizard/stages/Stage1BridgeExplainer.tsx`
* **Props Interface:**
  ```typescript
  interface Stage1BridgeExplainerProps {
    selectedFriction?: string
    onStartScenarios: () => void
    onSkipToSetup: () => void
  }
  ```

### Responsive Breakpoints
* **Mobile (< 768px):**
  * Centered mascot/balance scale icon badge (72x72px).
  * Stacked value cards with compact padding (10-12px) and 12px body text.
  * Sticky or full-width primary button at the bottom for effortless thumb reach.
* **Desktop / Tablet (>= 768px):**
  * Horizontal header layout with large 84x84px mascot badge.
  * Spacious value cards with generous whitespace, subtle border hover state, and clear typography hierarchy.
  * Action row with secondary skip on the left and primary CTA on the right.

---

## Verification & Testing Criteria

1. **Flow Transition Verification:**
   * Selecting a friction in Stage 1 and tapping Next navigates directly into `Stage1BridgeExplainer`.
   * Tapping `"Mulai Coba (2 menit)"` transitions to Scenario 1 (`Stage2ValueProof`).
   * Tapping `"Lewati langsung ke pengaturan budget"` navigates straight to Stage 5 Step 1.
2. **Dynamic Context Verification:**
   * The top pill accurately reflects whatever friction string was chosen in Stage 1.
3. **Accessibility & Design Tokens:**
   * Text contrast meets WCAG AA standards (all body copy >= 4.5:1 against surfaces).
   * All interactive elements have touch targets >= 44x44px.
   * Lucide vector icons used throughout (no raw emojis as UI icons).
