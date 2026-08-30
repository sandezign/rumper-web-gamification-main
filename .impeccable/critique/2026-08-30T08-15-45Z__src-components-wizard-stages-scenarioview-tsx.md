---
target: src/components/wizard/stages/ScenarioView.tsx
total_score: 29
max_score: 40
na_heuristics: 
p0_count: 1
p1_count: 2
timestamp: 2026-08-30T08-15-45Z
slug: src-components-wizard-stages-scenarioview-tsx
---
# Design Critique: Onboarding Compromise Selection (`ScenarioView.tsx`)

Method: dual-agent (A: 50607d3f-377c-4113-81a5-53c870a9b53b · B: 416c4683-ba00-41f2-8bc9-b401c283bd47)

### Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|:-----:|-----------|
| 1 | Visibility of System Status | 3/4 | Active selection is immediate, but selecting "Hard No" shows an incongruous green success banner with a checkmark. |
| 2 | Match System / Real World | 4/4 | Exemplary; authentic Jabodetabek commuter & housing trade-offs (*"Kompromi Nyata"*). |
| 3 | User Control and Freedom | 3/4 | Easy toggle between choices; missing an explicit reset state on desktop. |
| 4 | Consistency and Standards | 2/4 | Double checkmark visual glitch (`✓ ✓ Prioritas dicatat`), `XCircle` icon used for neutral "Moderat" option. |
| 5 | Error Prevention | 3/4 | Distinct warning styling for "Hard No", but filtering consequences are not explained before clicking. |
| 6 | Recognition Rather Than Recall | 3/4 | Side-by-side comparison is great, but bottom toolbar buttons duplicate card choices without keeping context attached. |
| 7 | Flexibility and Efficiency | 3/4 | Keyboard accessible (`Enter`/`Space`), but competing clickable elements increase interactive clutter. |
| 8 | Aesthetic and Minimalist Design | 2/4 | Excessive container nesting (cards inside cards); button text clipped to `"Kompromi Mode..."`. |
| 9 | Error Recovery | 3/4 | Seamless non-destructive choice toggling. |
| 10 | Help and Documentation | 3/4 | Expandable "Kenapa ini penting?" drawer provides high-value contextual rationale. |
| **Total** | | **29/40** | **Good (72.5%)** |

---

### Design Specificity Verdict

**LLM Assessment:** The concept and copywriting are outstandingly product-grounded. Rumper avoids generic property filter jargon in favor of hyper-localized Indonesian realities (*"Siap komut lebih panjang"*, *"Bahan dapur mendadak"*). However, the interface execution suffers from container fatigue, split-attention between the cards and the bottom toolbar, and a few visual/string glitches that break immersion.

**Deterministic Scan:** `0` generic anti-pattern violations in AST rules. Deep inspection revealed 3 active structural/layout defects:
1. Double checkmark rendering & icon conflict in `feedbackMap` (`<Check />` icon + string `"✓ "` / `"⚠️ "`).
2. Fixed 4-column button grid forcing label clipping (`"Kompromi Moderat"` → `"Kompromi Mode..."`).
3. Design token fragmentation (hardcoded hex colors in `ScenarioView.tsx` vs. CSS variables in `MobileSwipeDeck.tsx`).

---

### Overall Impression
The trade-off onboarding mechanic is Rumper's strongest product differentiator—it builds radical trust by forcing honest property compromises. However, the decision panel currently feels like two disconnected UIs glued together (the comparison cards above and a separate 4-button toolbar below), marred by truncation and icon duplication.

---

### What's Working
1. **Unvarnished Honesty (*"Kompromi Nyata"*):** Highlighting the explicit drawback of each house creates unprecedented buyer trust.
2. **Context-Rich Scenarios:** Tying abstract specs (e.g. Row 6m vs 8m) to real-life scenes (weekend grocery trips, rain commutes).
3. **Inclusive Keyboard Accessibility:** Clean keyboard navigation, ARIA live regions, and semantic roles already baked into the markup.

---

### Priority Issues

#### 🔴 [P0] Double Checkmark Icon Glitch & Semantic Banner Mismatch
- **What:** The feedback banner renders `✓ ✓ Prioritas dicatat...` for choices A/B, and `<Check /> ⚠️ Toleransi isolasi...` inside a green container for the `reject` state.
- **Why:** `ScenarioView.tsx` unconditionally prepends a `<Check />` icon to `feedbackMap[selectedChoice]`, which already contains hardcoded `"✓ "` or `"⚠️ "` strings.
- **Fix:** Strip unicode symbols from `feedbackMap` in data definitions, and dynamically swap both the icon (`Check`, `HelpCircle`, `AlertTriangle`) and banner color scheme (`green`, `blue`, `amber/rose`) based on selection.
- **Suggested command:** `/impeccable polish`

#### 🟠 [P1] Button Label Truncation (`Kompromi Mode...`)
- **What:** The 3rd button label in the 4-column toolbar gets cut off with an ellipsis on desktop viewports.
- **Why:** `grid-cols-4` with `px-3.5` padding and `<span>Kompromi Moderat</span>` lacks sufficient horizontal width.
- **Fix:** Change label to `"Jalan Tengah"` or `"Moderat"`, relax horizontal padding, or adopt a 2-tier action layout (Direct Choices vs Meta-Actions).
- **Suggested command:** `/impeccable layout`

#### 🟠 [P1] Dual Competing Click Targets (Card vs Toolbar)
- **What:** Clicking Card A selects House A, but there is also a redundant "Pilih Rumah A" button in the bottom toolbar.
- **Why:** The cards act as clickable buttons (`role="button"`), yet the toolbar duplicates the exact same options alongside meta-controls ("Moderat", "Hard No").
- **Fix:** Embed the primary "Pilih Rumah A/B" trigger directly into the card footers, and present meta-actions ("Jalan Tengah", "Tolak Skenario") as secondary utility controls below.
- **Suggested command:** `/impeccable distill`

#### 🟡 [P2] Visual Over-Nesting & Container Fatigue
- **What:** Heavy visual clutter from nested boxes: Weather tag, Tips banner, House Card, Photo tag, 4 Metric boxes, Bullets, Compromise warning, Selection pill, and Toolbar.
- **Why:** Over-use of background fills (`#F4F7F6`, `#FFF8E0`) and borders creates visual vibration.
- **Fix:** Simplify metric cards into a clean 2-column typographic list and reserve colored card fills strictly for the high-priority "Kompromi Nyata" box.
- **Suggested command:** `/impeccable quieter`

---

### Persona Red Flags

- **Alex (Power User):** Sees redundant clicks—why click a card *and* a button that do the same thing? Also wants to know what mathematical threshold "Kompromi Moderat" applies to the search algorithm.
- **Jordan (First-Time Buyer):** Sees `"Kompromi Mode..."` cut off and hesitates. Fears clicking "Hard No (Tolak)" might cancel their entire account setup rather than just skipping this specific scenario.
- **Sam (Accessibility User):** Screen readers announce two separate interactive elements for "Pilih Rumah A" (the card and the button). The amber compromise box text contrast must be verified for WCAG AA compliance.
- **Casey (Distracted Mobile User):** The small button targets in the bottom dock on mobile risk mis-taps between "Moderat" and "Hard No".

---

### Minor Observations
- Unused imports in `ScenarioView.tsx` (`ChevronRight`, `BlueprintVisual`).
- `XCircle` icon feels overly negative/punitive for selecting a moderate compromise. A neutral icon like `Scale` or `MinusCircle` is more appropriate.
- Lack of smooth height transition when expanding the "Kenapa ini penting?" drawer.

---

### Questions to Consider
1. *Are "Kompromi Moderat" and "Hard No" real property choices, or meta-controls? Should they be separated from the primary House A / House B actions?*
2. *Can the selection CTA live directly inside each property card to eliminate the redundant bottom toolbar?*
3. *How can we make "Hard No" reassuring so users know it refines their preferences rather than breaking the wizard?*
