---
target: src/components/FactorRisksCard.tsx
total_score: 38
max_score: 40
na_heuristics: 
p0_count: 0
p1_count: 0
timestamp: 2026-08-08T07-27-47Z
slug: src-components-factorriskscard-tsx
---
Method: dual-agent (Post-Refactor Verification)

#### Design Health Score

| # | Heuristic | Score | Key Improvement |
|---|-----------|-------|-----------------|
| 1 | Visibility of System Status | 4 | Clean progress bar with ARIA progressbar roles and tabular score counts |
| 2 | Match System / Real World | 3 | Real-world evidence terminology with WCAG-compliant status color indicators |
| 3 | User Control and Freedom | 4 | Interactive factor row buttons trigger smooth navigation to Faktor Risiko workspace |
| 4 | Consistency and Standards | 4 | 100% refactored to standard Tailwind CSS design tokens (`bg-red-100`, `text-amber-900`, etc.) |
| 5 | Error Prevention | 4 | Responsive layout reveals evidence details ("2 bukti • 1 gap") on mobile screens (`hidden sm:block`) |
| 6 | Recognition Rather Than Recall | 3 | Explicit tooltip and clear metadata counts ("5 faktor dipantau") |
| 7 | Flexibility and Efficiency | 4 | Direct row navigation allows one-click jump to evidence details |
| 8 | Aesthetic and Minimalist Design | 4 | Clean typography scale with bold tags (`text-[10px] font-bold tracking-wider`) |
| 9 | Error Recovery | 4 | Clear status pills (`Data sedang`, `Data kuat`, `Perlu validasi`) with contrasting indicators |
| 10 | Help and Documentation | 4 | Interactive help tooltip on header info icon |
| **Total** | | **38/40** | **Excellent (Production-Ready)** |

#### Design Specificity Verdict

**LLM assessment**: High Specificity. High-craft, production-ready component with full keyboard focus management, ARIA progressbar semantics, and interactive workspace step navigation callbacks.

**Deterministic scan**: `0` detector issues (`[]`). Completely free of hardcoded hex magic values and inline style objects.

#### Overall Impression
An exemplary, high-accessibility property risk overview card that seamlessly combines interactive row navigation, responsive mobile display, WCAG AA color contrast, and 100% Tailwind design token compliance.
