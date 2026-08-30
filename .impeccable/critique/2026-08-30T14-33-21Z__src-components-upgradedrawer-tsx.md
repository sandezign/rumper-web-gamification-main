---
target: src/components/UpgradeDrawer.tsx
total_score: 34
max_score: 40
na_heuristics: 
p0_count: 0
p1_count: 1
timestamp: 2026-08-30T14-33-21Z
slug: src-components-upgradedrawer-tsx
---
# Upgrade Drawer UI Critique (`src/components/UpgradeDrawer.tsx`)

Method: dual-agent (A: 3c66e130-1d3f-48b0-bdf3-fbd75d7b4749 · B: detector-cli)

### Design Health Score

| # | Heuristic | Score | Key Issue |
|---|---|:---:|---|
| 1 | Visibility of System Status | 4 | Real-time card selection & dynamic sticky CTA button updates |
| 2 | Match System / Real World | 4 | Authentic Indonesian property due diligence terminology (BNPB, Dishub, survei fisik) |
| 3 | User Control and Freedom | 3 | Modal dismissible via X, backdrop & Escape; lacks touch swipe-down on mobile |
| 4 | Consistency and Standards | 3 | Clean iOS-inspired card hierarchy; mathematical discrepancy in discount tags |
| 5 | Error Prevention | 4 | Single-select radio pattern, clear "Sekali bayar • Tanpa langganan" guardrail |
| 6 | Recognition Rather Than Recall | 3 | Accordion hides unselected tier features, hindering direct comparison |
| 7 | Flexibility and Efficiency | 3 | Pre-selected default tier and fast-path payment trigger |
| 8 | Aesthetic and Minimalist Design | 4 | Deep navy header with emerald ambient glow, crisp contrast, refined typography |
| 9 | Error Recovery | 3 | Standard payment trigger flow, no in-drawer network retry state |
| 10 | Help and Documentation | 3 | Institutional trust badges & WhatsApp expert consultation details |
| **Total** | | **34/40** | **Good (85%)** |

### Priority Issues
- **[P1] Blind Accordion Comparison**: Unselected cards hide their feature lists completely, requiring multi-tap recall to compare packages.
- **[P2] Ambiguous "Tahap 2–5" Terminology**: Unexplained phase numbers instead of explicit risk factor categories (Banjir, Akses, Legalitas).
- **[P3] Missing Swipe-to-Dismiss Touch Physics**: Visual iOS drag handle without downward gesture support on mobile touch devices.
- **[P3] Discount Math Inconsistency**: Rp 450k -> Rp 120k is 73% discount labeled as 60%.
- **[P3] Type-Ramp Inconsistency**: Literal `text-[9px]` on discount badges is off the documented DESIGN.md typography scale.
