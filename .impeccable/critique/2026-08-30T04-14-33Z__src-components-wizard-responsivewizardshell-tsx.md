---
target: onboarding flow
total_score: 38
max_score: 40
na_heuristics: 
p0_count: 0
p1_count: 1
timestamp: 2026-08-30T04-14-33Z
slug: src-components-wizard-responsivewizardshell-tsx
---
# Design Critique: Rumper Onboarding & Discovery Flow

**Target:** `src/components/wizard/ResponsiveWizardShell.tsx` (Onboarding Flow)  
**Method:** dual-agent (A: a54548a7-d041-4d09-90ab-eac7df4191e1 · B: 71c7f91a-5073-44ea-bafc-d3c0175deb96)

---

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 4 | Real-time progress bar, sidebar timeline, responsive scenario tags, and telemetry loader. |
| 2 | Match System / Real World | 4 | Authentic Indonesian housing context (banjir dpl, KRL Parung vs Jurangmangu, IPL pompa, KPR). |
| 3 | User Control and Freedom | 3 | Step undo & skip options available, but mobile vertical swipe threshold conflicts with page scrolling. |
| 4 | Consistency and Standards | 4 | Standardized pill badges, tokenized typography, and uniform dual-scenario layouts. |
| 5 | Error Prevention | 4 | Smart pre-selected defaults and robust dual-handle budget slider constraints (`min < max`). |
| 6 | Recognition Rather Than Recall | 4 | Initial friction choice is persistently reflected across subsequent scenario banners and summary cards. |
| 7 | Flexibility and Efficiency | 4 | Dual-mode inputs (swipe physics vs thumb buttons on mobile; quick presets vs granular sliders on budget). |
| 8 | Aesthetic and Minimalist Design | 3 | High craft overall, but Stage 1 friction list (7 options) creates initial visual density. |
| 9 | Error Recovery | 4 | Inline "Ubah" card triggers and robust empty-state recovery in search dropdown. |
| 10 | Help and Documentation | 4 | Contextual "Kenapa ini penting?" progressive disclosure cards explain real-world spatial nuances. |
| **Total** | | **38/40** | **Excellent (95%)** |

---

## Design Specificity Verdict

- **LLM Assessment (Deeply Grounded):** The onboarding flow completely rejects generic real estate filter forms. It grounds user discovery in high-stakes Indonesian housing realities: KRL commute friction, gravity drainage vs polder pump maintenance, and isolated vs established neighborhood access.
- **Deterministic Scan:** 7 advisory findings in `src/components/wizard` (CAD blueprint grid color `#38BDF8` and `text-[9px]` type ramp drift in `BlueprintVisual.tsx`). Zero critical or error-level issues. Zero AI-slop patterns.
- **Visual Overlays:** Not active (pure deterministic code and structural review).

---

## Overall Impression

An exceptionally well-crafted, empathetic onboarding experience that reframes cold search filters into interactive trade-off calibration. It builds high buyer trust through relatable Indonesian microcopy, fluid mobile ergonomics, and smooth transitions into the curated area map.

---

## What's Working

1. **Psychological Staging over Data Extraction:** Primes users through 3 relatable life scenarios before demanding hard financial and location bounds.
2. **Context Continuity & Working Memory Offloading:** Selected friction from Stage 1 dynamically tailors subsequent scenario narratives.
3. **Mobile-First Dual Interaction Model:** Flawless dual-input support (tappable thumb action bar alongside gesture card swipe).

---

## Priority Issues

- **[P1] Mobile Swipe Deck Vertical Scroll Gesture Collision**
  - **Why it matters:** In `MobileSwipeDeck.tsx`, vertical swipe down (`>90px`) commits a compromise choice (`neither`). When users try to scroll down the card on smaller mobile screens, it accidentally registers a decision.
  - **Fix:** Constrain gesture detection strictly to horizontal displacement ($|\Delta X| > 75\text{px}$ and $|\Delta X| > |\Delta Y| \times 1.5$). Keep "Moderat" selectable via the bottom button bar.
  - **Suggested command:** `/impeccable adapt`

- **[P2] Stage 1 Cognitive Choice Density**
  - **Why it matters:** 7 full-width options in a single vertical list breaches the $\le 4$ working memory heuristic and causes entry friction.
  - **Fix:** Group options into 3 paired categories (*Akses & Komuter*, *Banjir & Lingkungan*, *Budget & Legalitas*) or a 2×2 grid with a *"Lainnya"* trigger.
  - **Suggested command:** `/impeccable layout`

- **[P3] Missing Monthly KPR Cashflow Telemetry in Budget Step**
  - **Why it matters:** Indonesian first-time buyers think in terms of monthly salary installment capacity (`Rp/bulan`), not just total property price.
  - **Fix:** Add a dynamic telemetry badge in `Step3BudgetRange.tsx` displaying estimated monthly KPR installments (e.g. `Est. Cicilan KPR: ~Rp 5.8 Jt – 8.7 Jt/bln (DP 10%, 20 Thn)`).
  - **Suggested command:** `/impeccable clarify`

- **[P3] Step 1 Dual-Decision Cognitive Load**
  - **Why it matters:** `Step1HouseholdWork.tsx` asks for Household Type and Work Pattern at the same time on one screen.
  - **Fix:** Add a progressive auto-focus scroll transition to Section B once Household Type is selected.
  - **Suggested command:** `/impeccable delight`

---

## Persona Red Flags

- **Casey (Distracted Mobile User):** High risk of accidental downward swipe triggers when trying to scroll text on long scenario cards.
- **Jordan (Confused First-Timer):** Lacks an instant reference for how Rp 800 Jt translates to monthly KPR installments.
- **Alex (Impatient Power User):** Cannot bypass the Stage 1 friction step with a single keyboard shortcut on desktop.
- **Sam (Accessibility-Dependent):** Range slider in budget step lacks descriptive ARIA value text labels (`aria-valuetext="Rp 800 Juta"`).

---

## Minor Observations

1. Dropdown search in `Step2LocationAnchors.tsx` includes keyboard shortcut `/` support.
2. `DesktopSidebar.tsx` has clickable scenario jump-pills that allow rapid revision.
3. Loading radar animation duration (~2.5s) strikes the perfect balance between anticipation and swift feedback.

---

## Questions to Consider

- *Could Rumper offer a "Pasangan Mode" (Co-Pilot Onboarding) where two partners answer scenarios independently and view the overlap corridor?*
- *Can the radar loading animation zoom straight into the primary anchor coordinate on the Leaflet map upon completion?*
