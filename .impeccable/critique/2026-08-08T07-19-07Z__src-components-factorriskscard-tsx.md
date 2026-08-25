---
target: src/components/FactorRisksCard.tsx
total_score: 16
max_score: 40
na_heuristics: 
p0_count: 1
p1_count: 2
timestamp: 2026-08-08T07-19-07Z
slug: src-components-factorriskscard-tsx
---
Method: dual-agent (A: f41c8f99-54a7-42bb-87b1-cabf86d4de33 · B: a286d71e-4ced-4aa0-9aa7-7970f6c5f3fc)

#### Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 2 | Missing score explanation for null state (`—`); score scale directionality ambiguous |
| 2 | Match System / Real World | 2 | Uses real terms ("Bukti", "Gap"), but 42 (Red/Low) vs 78 (Green/High) score scale causes confusion |
| 3 | User Control and Freedom | 2 | Expand toggle works; button rows and chevrons present dead click affordances |
| 4 | Consistency and Standards | 2 | 18+ hardcoded hex colors bypass Tailwind tokens; status pill colors inline in data |
| 5 | Error Prevention | 2 | Null score handles safely without crash; evidence details hidden on mobile (`<lg`) |
| 6 | Recognition Rather Than Recall | 1 | Non-interactive SVG info icon with no tooltip; 90px width forces tight tag wrapping |
| 7 | Flexibility and Efficiency | 1 | No sorting, filtering, or quick actions for power users |
| 8 | Aesthetic and Minimalist Design | 3 | Visually clean card structure, but text-[9px] micro-typography creates noise |
| 9 | Error Recovery | 1 | Identifies "1 gap" and "Perlu validasi", but offers no path to resolve or upload evidence |
| 10 | Help and Documentation | 1 | Header info icon lacks tooltip explaining score calculation methodology |
| **Total** | | **16/40** | **Poor (Major UX & Interactivity Overhaul Required)** |

#### Design Specificity Verdict

**LLM assessment**: Medium-High Specificity. The component features domain-tailored property risk categories (`"Banjir"`, `"Fasilitas"`, `"2 bukti • 1 gap"`, `"Perlu validasi"`). However, its implementation behaves like a static mock due to dead interactive button rows and missing callback integration.

**Deterministic scan**: 0 rule violations from automated detector script (no AI-slop anti-patterns). Manual code audit revealed 18+ hardcoded hex color codes, inline `style={{}}` attributes, and `text-[9px]` typography.

#### Overall Impression
A visually tidy property risk overview card that presents authentic risk metrics, but suffers from dead interactive row affordances, mobile information suppression, illegible 9px typography, WCAG AA contrast violations, and missing ARIA progress semantics.

#### What's Working
1. **Domain-Specific Framing:** Authentic data fields (`detail`, `status`, `score`, `tag`) tailored for property risk auditing.
2. **Graceful Null Data Handling:** Safe fallback (`—` and empty bar) for factors with insufficient data (`score: null`).
3. **Card Structure & Elevation:** Clean visual grouping with rounded corners (`rounded-3xl`), subtle border containment, and soft drop shadows.

#### Priority Issues

##### [P0] Dead Button Row Interactive Affordances
- **Why it matters:** Rows render as HTML `<button>` elements with hover states and chevrons, but clicking them performs no action.
- **Fix:** Add `onSelectFactor?: (factorId: string) => void` prop and trigger it on click, or render non-interactive rows as `div`s.
- **Suggested command:** `$impeccable clarify` / `$impeccable shape`

##### [P1] Mobile Evidence Context Suppression (`hidden lg:block`)
- **Why it matters:** Evidence details ("2 bukti • 1 gap") are hidden on viewports <1024px (`hidden lg:block`), stripping critical audit context on mobile devices.
- **Fix:** Refactor layout to display evidence details as a secondary line below the factor title on mobile screens.
- **Suggested command:** `$impeccable adapt`

##### [P1] WCAG AA Contrast Violation & Micro-Font Legibility
- **Why it matters:** Status text `#806600` on `#fffce0` yields 3.5:1 contrast ratio (fails WCAG AA 4.5:1); `text-[9px]` is unreadable on mobile screens.
- **Fix:** Bump tag size to `text-[11px] font-semibold` and adjust colors for >= 4.5:1 contrast.
- **Suggested command:** `$impeccable typeset` / `$impeccable colorize`

##### [P2] Missing ARIA Accessibility & Progress Semantics
- **Why it matters:** Progress bars lack `role="progressbar"`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax`; expand button lacks `aria-expanded`.
- **Fix:** Add full ARIA progressbar and toggle accessibility attributes.
- **Suggested command:** `$impeccable audit`

##### [P3] Design Token Drift & Hardcoded Hex Colors
- **Why it matters:** Over 18 hardcoded hex colors bypass Tailwind CSS design tokens and theme variables.
- **Fix:** Refactor inline hex values to Tailwind theme utility classes or CSS custom properties.
- **Suggested command:** `$impeccable extract`

#### Persona Red Flags

* 🔴 **Alex (Power User):** Cannot click risk rows to inspect evidence breakdowns or resolve gaps. Cannot sort or filter factors by risk level.
* 🔴 **Jordan (First-Timer):** Confused by score scale ("Is 42/100 high risk or low risk? 42 is red, 78 is green"). Header info icon provides no tooltip.
* 🔴 **Casey (Mobile User):** Critical evidence context ("2 bukti • 1 gap") is hidden on mobile screens (`hidden lg:block`), and `text-[9px]` tag is unreadable on mobile display.

#### Minor Observations
* Accordion toggle snaps instantly without smooth height/opacity animation.
* Inline SVG icons are embedded directly inside data objects.

#### Questions to Consider
- *What if clicking a factor row opened the detailed evidence drawer or map filter automatically?*
- *Should the score scale explicitly specify whether 100/100 represents "Highest Risk" or "Highest Safety Readiness"?*
- *How can we display evidence gap badges prominently on mobile screens without overcrowding the list row?*
