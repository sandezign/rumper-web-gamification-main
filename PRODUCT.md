# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

React 19 + Vite + Tailwind CSS v4 + Leaflet (TypeScript)

## Users

Primary users: Indonesian home buyers, property seekers, and renters evaluating neighborhood safety, commute ease, and nearby facilities.

## Product Purpose

Rumper provides gamified location intelligence and property verification tools, enabling users to evaluate real estate options through interactive risk factor scoring, commute planning, facility mapping, and guided checklists.

## Positioning

Gamified property location intelligence with live interactive map telemetry, structured risk factor scoring, and step-by-step verification tools tailored for the Indonesian property market.

## Operating Context

Home buyers, renters, and seekers reviewing properties on mobile or desktop, evaluating neighborhood liveability, checking commute routes, scanning local facilities (health, education, shopping, stations), and conducting step-by-step property site visits using interactive checklists.

## Capabilities and Constraints

- **Buyer Priority Discovery & Onboarding:**
  - 3-stage cognitive friction discovery (Akses & Komuter, Banjir & Lingkungan, Budget & Legalitas) to avoid entry cognitive overload.
  - Scenario-led trade-off calibration engine simulating realistic Jabodetabek housing dilemmas (flood elevations, KRL commute frictions, cluster access).
  - Mobile gesture safety: horizontal swipe physics locked exclusively to the X-axis ($|\Delta X| > |\Delta Y| \times 1.5$) to prevent vertical page scroll collisions.
  - Dynamic financial telemetry in budget selection displaying estimated monthly KPR cashflow ranges alongside total property price.
  - Progressive disclosure with auto-focus transitions across multi-question steps.
- **Interactive Spatial Telemetry & Workspaces:**
  - Interactive Leaflet map panel with facility filters (kesehatan, pendidikan, belanja, stasiun).
  - 5-step property verification workspace (Ringkasan, Faktor Risiko, Perjalanan, Checklist, Fasilitas).
  - Curated areas map and shortlist with suitability clustering.
  - Tiered feature access with Upgrade Teasers & Drawers for premium unlocked insights.
  - AI Assistant drawer for deep-dive location questions.
  - Bilingual / Indonesian primary interface text.

## Brand Commitments

- Product Name: Rumper
- Clean, modern, accessible interface with emerald/slate accent highlights and electric mint telemetry anchors.
- Clear, gamified scoring and visual risk telemetry with empathetic, relatable Indonesian copy.

## Evidence on Hand

- Runnable React + Vite application with Leaflet map integration (`src/App.tsx`, `src/components/*`).
- Documented product requirements in `docs/prd/*` and design system in `DESIGN.md`.

## Product Principles

1. **Clarity First**: Transform complex spatial, environmental, and financial risk data into intuitive, actionable scores and visual indicators.
2. **Progressive Disclosure**: Guide users through logical step-by-step evaluation flows without cognitive overload ($\le 4$ working memory options per stage).
3. **Interactive Telemetry**: Pair list-based workspace insights directly with live map visualization and dynamic financial calculations.
4. **Trust & Precision**: Provide transparent risk factor explanations, explainable recommendations, and customizable verification checklists.

## Accessibility & Inclusion

- Ensure high contrast ratios (WCAG 2.2 AA compliant: $\ge 4.5:1$ for body text, $\ge 3:1$ for UI components).
- Accessible form controls: explicit `aria-label`, `aria-valuemin`, `aria-valuemax`, `aria-valuenow`, and `aria-valuetext` on custom range sliders.
- Touch ergonomics: minimum $44\times 44\text{px}$ touch target hit areas across all interactive buttons and preset pills.
- Dynamic layout stability: tabular numbers (`tabular-nums font-mono`) for numerical scores and monetary estimates to prevent layout shift during state changes.
- Responsive mobile & desktop drawer support, keyboard navigation focus indicators (`focus-visible:ring-2`), and screen reader status announcements.
