# Scenario Bridge Screen Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and integrate an empathetic, Flo-inspired "Bridge Screen" (Stage 1.5) between Friction Discovery and Scenario 1 to prime first-time homebuyers on trade-off dimensions without jargon.

**Architecture:** Create a self-contained `Stage1BridgeExplainer.tsx` component with polished typography, dynamic friction connection pill, 3 value pillars, and responsive thumb-friendly layout. Integrate it into `ResponsiveWizardShell.tsx` and update `useWizardStore.ts`, `DesktopSidebar.tsx`, `MobileHeader.tsx`, and `MobileStickyFooter.tsx` to handle the expanded flow smoothly.

**Tech Stack:** React 19, TypeScript, Tailwind CSS v4, Lucide React icons.

---

### File Structure & Responsibilities

- **Create:** `src/components/wizard/stages/Stage1BridgeExplainer.tsx` — Presents the empathetic Flo-style master intro screen with dynamic friction pill, 3 value rows, primary CTA `"Mulai Coba (2 menit)"`, and secondary skip link.
- **Modify:** `src/store/useWizardStore.ts` — Update `flowStage` range and stage transitions (Stage 1: Friction, Stage 2: Bridge Explainer, Stages 3..5: Scenarios 1..3, Stage 6: Parameter Setup).
- **Modify:** `src/components/wizard/ResponsiveWizardShell.tsx` — Mount `Stage1BridgeExplainer` at `flowStage === 2` and update navigation logic.
- **Modify:** `src/components/wizard/DesktopSidebar.tsx` — Update active stages, step counts, and scenario titles for the expanded flow.
- **Modify:** `src/components/wizard/MobileHeader.tsx` & `src/components/wizard/MobileStickyFooter.tsx` — Update stage label formatting and footer actions.

---

### Task 1: Create `Stage1BridgeExplainer.tsx` Component

**Files:**
- Create: `src/components/wizard/stages/Stage1BridgeExplainer.tsx`

- [ ] **Step 1: Write `Stage1BridgeExplainer.tsx`**

```tsx
import React from 'react'
import { Sparkles, Train, ShieldCheck, Wallet, ArrowRight } from 'lucide-react'

interface Stage1BridgeExplainerProps {
  selectedFriction?: string
  onStartScenarios: () => void
  onSkipToSetup: () => void
}

export default function Stage1BridgeExplainer({
  selectedFriction,
  onStartScenarios,
  onSkipToSetup,
}: Stage1BridgeExplainerProps) {
  return (
    <div className="text-[#001E2B] animate-fadeIn max-w-2xl mx-auto w-full">
      {/* Top Contextual Friction Bridge Pill */}
      {selectedFriction ? (
        <div className="flex items-center gap-2 px-4 py-2.5 bg-[#DCEEE7] rounded-full border border-[#318266]/30 text-xs text-[#004F38] font-semibold mb-6 shadow-2xs">
          <Sparkles size={15} className="text-[#00684A] shrink-0" />
          <span className="truncate">
            Nyambung kendalamu: <strong className="font-bold">&ldquo;{selectedFriction}&rdquo;</strong>
          </span>
        </div>
      ) : (
        <div className="flex items-center gap-2 px-4 py-2.5 bg-[#DCEEE7] rounded-full border border-[#318266]/30 text-xs text-[#004F38] font-semibold mb-6 shadow-2xs">
          <Sparkles size={15} className="text-[#00684A] shrink-0" />
          <span>Membantu mencari titik temu kompromi rumah pertamamu</span>
        </div>
      )}

      {/* Main Card Container */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-[#D7E1E5] shadow-xs space-y-6">
        
        {/* Header with Visual Mascot/Badge */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-5 text-center md:text-left">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-[#001E2B] to-[#004F38] text-white flex items-center justify-center text-3xl md:text-4xl shrink-0 shadow-md">
            ⚖️
          </div>
          <div className="space-y-1.5">
            <h2 className="text-xl md:text-2xl font-extrabold text-[#001E2B] tracking-tight leading-snug">
              Pilih rumah pertama emang penuh kompromi
            </h2>
            <p className="text-xs md:text-sm text-[#5C6C7A] leading-relaxed font-medium">
              Sebelum lanjut ke filter budget & lokasi, yuk uji prioritas aslimu lewat{' '}
              <strong className="text-[#001E2B]">3 simulasi skenario nyata</strong> di Jabodetabek:
            </p>
          </div>
        </div>

        {/* 3 Value Pillars */}
        <div className="flex flex-col gap-3 pt-2">
          {/* Pillar 1: Komuter vs Luas */}
          <div className="flex items-start gap-3.5 bg-[#F6F8F7] hover:bg-[#F0F4F2] transition-colors p-3.5 md:p-4 rounded-2xl border border-[#E1E8EC]">
            <div className="w-10 h-10 rounded-xl bg-[#EBF3FA] text-[#0284C7] flex items-center justify-center shrink-0 shadow-2xs">
              <Train size={20} className="stroke-[2.2]" />
            </div>
            <div className="space-y-0.5">
              <h3 className="text-sm font-bold text-[#001E2B]">1. Waktu Komuter vs Luas Ruang</h3>
              <p className="text-xs text-[#5C6C7A] leading-relaxed">
                Pilih hemat waktu di KRL (rumah kompak) atau punya kamar & halaman lebih luas (komut lebih panjang).
              </p>
            </div>
          </div>

          {/* Pillar 2: Banjir & Akses */}
          <div className="flex items-start gap-3.5 bg-[#F6F8F7] hover:bg-[#F0F4F2] transition-colors p-3.5 md:p-4 rounded-2xl border border-[#E1E8EC]">
            <div className="w-10 h-10 rounded-xl bg-[#E9F5EF] text-[#00684A] flex items-center justify-center shrink-0 shadow-2xs">
              <ShieldCheck size={20} className="stroke-[2.2]" />
            </div>
            <div className="space-y-0.5">
              <h3 className="text-sm font-bold text-[#001E2B]">2. Kesiapan Banjir & Akses Jalan</h3>
              <p className="text-xs text-[#5C6C7A] leading-relaxed">
                Bandingkan rasa tenang bebas genangan saat musim hujan vs kedekatan ke pusat kota dan fasilitas.
              </p>
            </div>
          </div>

          {/* Pillar 3: Finansial */}
          <div className="flex items-start gap-3.5 bg-[#F6F8F7] hover:bg-[#F0F4F2] transition-colors p-3.5 md:p-4 rounded-2xl border border-[#E1E8EC]">
            <div className="w-10 h-10 rounded-xl bg-[#FFF7ED] text-[#EA580C] flex items-center justify-center shrink-0 shadow-2xs">
              <Wallet size={20} className="stroke-[2.2]" />
            </div>
            <div className="space-y-0.5">
              <h3 className="text-sm font-bold text-[#001E2B]">3. Cicilan Riil vs Biaya Operasional</h3>
              <p className="text-xs text-[#5C6C7A] leading-relaxed">
                Hitung total pengeluaran bulanan (bensin, tol, KPR), bukan cuma harga brosur perumahan.
              </p>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="pt-4 border-t border-[#E1E8EC] flex flex-col-reverse md:flex-row items-center justify-between gap-3">
          <button
            type="button"
            onClick={onSkipToSetup}
            className="text-xs font-semibold text-[#7C8C9A] hover:text-[#001E2B] transition-colors underline cursor-pointer py-1"
          >
            Lewati langsung ke pengaturan budget
          </button>
          <button
            type="button"
            onClick={onStartScenarios}
            className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-[#00684A] hover:bg-[#004F38] text-white font-bold text-sm px-6 py-3 rounded-full shadow-md transition-all active:scale-[0.96] cursor-pointer"
          >
            <span>Mulai Coba (2 menit)</span>
            <ArrowRight size={16} />
          </button>
        </div>

      </div>
    </div>
  )
}
```

- [ ] **Step 2: Verify component compiles with Vite**

Run: `npm run build` or inspect typescript.

---

### Task 2: Update Wizard Store & Stage Transitions

**Files:**
- Modify: `src/store/useWizardStore.ts`

- [ ] **Step 1: Update `useWizardStore.ts` for 6 flow stages**

Update `nextStage`, `prevStage`, `skipToParameterSetup`, and `goToFlowStage` to support:
- `flowStage === 1`: Stage 1 Friction Discovery
- `flowStage === 2`: Stage 1.5 Bridge Explainer
- `flowStage === 3`: Scenario 1 (`transit-vs-space`)
- `flowStage === 4`: Scenario 2 (`flood-vs-design` / Stage 3)
- `flowStage === 5`: Scenario 3 (`established-vs-quiet` / Stage 4)
- `flowStage === 6`: Parameter Setup (Steps 1..4)

- [ ] **Step 2: Update `skipToParameterSetup` to target `flowStage = 6`**

---

### Task 3: Update `ResponsiveWizardShell.tsx` and Sidebar Components

**Files:**
- Modify: `src/components/wizard/ResponsiveWizardShell.tsx`
- Modify: `src/components/wizard/DesktopSidebar.tsx`
- Modify: `src/components/wizard/MobileHeader.tsx`
- Modify: `src/components/wizard/MobileStickyFooter.tsx`

- [ ] **Step 1: Render `Stage1BridgeExplainer` inside `ResponsiveWizardShell.tsx` at `flowStage === 2`**
- [ ] **Step 2: Update progress calculations (total 9 display steps)**
- [ ] **Step 3: Update `DesktopSidebar.tsx` badge and phase indicators for the bridge screen and 3 scenarios**
- [ ] **Step 4: Update `MobileHeader.tsx` and `MobileStickyFooter.tsx` labels**

---

### Task 4: End-to-End Verification

- [ ] **Step 1: Verify full flow in browser: Stage 1 (Friction) -> Stage 2 (Bridge Explainer) -> Scenario 1 -> Scenario 2 -> Scenario 3 -> Parameter Setup**
- [ ] **Step 2: Verify "Lewati langsung ke pengaturan budget" skip route**
- [ ] **Step 3: Verify back button navigation**
- [ ] **Step 4: Run Vite build check (`npm run build`)**
