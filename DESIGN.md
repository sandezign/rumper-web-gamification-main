---
name: Rumper Location Intelligence
description: Gamified property location intelligence with live interactive map telemetry and structured risk factor scoring.
colors:
  primary: "#00684a"
  primary-foreground: "#ffffff"
  rumper-green: "#00ed64"
  rumper-green-hover: "#00b545"
  deep-teal: "#001e2b"
  supporting-teal: "#003d4f"
  secondary: "#e9f5ef"
  secondary-foreground: "#004f38"
  background: "#f6f8f7"
  card: "#ffffff"
  muted-foreground: "#5c6c7a"
  border: "#d7e1e5"
  evidence-positive: "#318266"
  evidence-positive-bg: "#dceee7"
  evidence-warning: "#d79a2b"
  evidence-warning-bg: "#fff8e0"
  evidence-danger: "#c95746"
  evidence-danger-bg: "#f4ded9"
typography:
  display:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "clamp(1.75rem, 4vw, 2.5rem)"
    fontWeight: 700
    lineHeight: "1.2"
  headline:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: "1.3"
  title:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "1rem"
    fontWeight: 600
    lineHeight: "1.4"
  body:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: "1.5"
  label:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 500
    letterSpacing: "0.025em"
  caption:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 600
  micro:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "0.625rem"
    fontWeight: 700
  mono:
    fontFamily: "DM Mono, monospace"
    fontSize: "0.75rem"
    fontWeight: 500
rounded:
  sm: "12px"
  md: "14px"
  lg: "16px"
  xl: "20px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "24px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    rounded: "{rounded.lg}"
    padding: "10px 20px"
  button-accent:
    backgroundColor: "{colors.rumper-green}"
    textColor: "{colors.deep-teal}"
    rounded: "{rounded.lg}"
    padding: "10px 20px"
  card-surface:
    backgroundColor: "{colors.card}"
    textColor: "{colors.deep-teal}"
    rounded: "{rounded.lg}"
    padding: "16px"
---

# Design System: Rumper Location Intelligence

## Overview

**Creative North Star: "The Emerald Navigator"**

Rumper provides a friendly, gamified property discovery and location verification interface designed for Indonesian home buyers, renters, and property seekers. The system blends live interactive Leaflet map telemetry with structured risk factor scoring, commute planning, facility filters, and step-by-step verification checklists.

The visual language is modern, vibrant, and highly interactive. It uses deep teal (`#001e2b`) for structural framing and typography, rich emerald green (`#00684a`) and electric mint (`#00ed64`) for key highlights and gamified score badges, and clean off-white surfaces (`#f6f8f7`) to maintain legibility across dense spatial data.

**Key Characteristics:**
- **Gamified Telemetry:** Vibrant score badges, risk factor tags, and interactive map filter chips.
- **Tonal & Floating Depth:** Flat card surfaces at rest with subtle hairlines (`#d7e1e5`), soft ambient shadows on hover, and smooth floating drawer overlays.
- **Tactile & Energetic:** Pill/rounded corners (16px default radius) paired with spring transitions and micro-interaction pops on interactive actions.
- **Bilingual & Scannable:** Clear Indonesian-first copy with structured typography hierarchy and color-coded evidence indicators (Positive Green, Warning Amber, Danger Coral).

## Colors

The color palette centers around deep ocean teal anchors and energetic emerald mint accents, balanced by crisp off-white canvas backgrounds.

### Primary
- **Deep Emerald Primary** (`#00684a`): Used for primary action buttons, key brand headers, and high-trust interactive elements.
- **Electric Mint Accent** (`#00ed64`): Used for gamified score badges, primary CTAs, sidebar highlights, and high-energy reward states.

### Secondary
- **Soft Mint Tint** (`#e9f5ef`): Used for secondary button backgrounds, selected chip fills, and active tab highlights.

### Neutral
- **Deep Teal Ink** (`#001e2b`): Primary typography color, sidebar background, and deep structural container boundaries.
- **Supporting Slate** (`#3d4f5b` / `#5c6c7a`): Secondary text labels, subtitle descriptions, and muted icon fills.
- **Canvas White** (`#ffffff`): Pure white card backgrounds, popover surfaces, and modal containers.
- **Light Reading Surface** (`#f6f8f7` / `#f9fbfa`): App background canvas color providing subtle contrast against white cards.
- **Hairline Border** (`#d7e1e5`): Clean, neutral dividing lines and card borders.

### Evidence & Risk Colors
- **Evidence Positive** (`#318266` text, `#dceee7` bg): Low-risk signals, verified checklist items, and favorable commute routes.
- **Evidence Warning** (`#d79a2b` text, `#fff8e0` bg): Moderate-risk factors, caution notes, and pending verification items.
- **Evidence Danger** (`#c95746` text, `#f4ded9` bg): High-risk location factors, missing documents, and severe constraints.

### Named Rules

**The 10% Mint Highlight Rule.** Electric Mint (`#00ed64`) is reserved strictly for score telemetry, main action triggers, and active status indicators. Its high contrast demands limited surface area.

**The Risk Color Contract Rule.** Risk colors (Positive Green, Warning Amber, Danger Coral) must always be accompanied by descriptive text labels and icons to guarantee accessibility.

## Typography

**Display Font:** DM Sans (with ui-sans-serif, system-ui fallback)
**Body Font:** DM Sans (with ui-sans-serif, system-ui fallback)
**Label/Mono Font:** DM Mono (for numerical scores, coordinates, and telemetry readings)

**Character:** Friendly, geometric, and highly readable across compact mobile cards and expansive desktop map layouts.

### Hierarchy
- **Display** (Bold 700, `clamp(1.75rem, 4vw, 2.5rem)`, line-height 1.2): Main property title and score hero callouts.
- **Headline** (SemiBold 600, `1.25rem` / 20px, line-height 1.3): Workspace tab titles, drawer section headers, and modal headings.
- **Title** (SemiBold 600, `1rem` / 16px, line-height 1.4): Card titles, risk factor item names, and facility category headers.
- **Body** (Regular 400, `0.875rem` / 14px, line-height 1.5): Descriptive text, risk rationale, checklist guidance, and AI assistant chat messages.
- **Label** (Medium 500, `0.75rem` / 12px, letter-spacing 0.025em): Micro-badges, map category pills, telemetry meta tags, and timestamp indicators.
- **Caption** (SemiBold 600, `0.6875rem` / 11px): Secondary badge indicators, sub-labels, and compact table captions.
- **Micro** (Bold 700, `0.625rem` / 10px): High-density risk tags and telemetry status pills.

### Named Rules

**The Numeric Clarity Rule.** Tabular numbers (`font-variant-numeric: tabular-nums`) or `DM Mono` must be used for score values, commute durations, and monetary estimates to prevent layout jitter during data updates.

## Layout

Rumper uses a dynamic dual-pane responsive layout system:

- **Desktop (md+):** Split screen with a fixed or collapsible left workspace panel (420px to 480px width) and a full-height interactive Leaflet map panel on the right.
- **Mobile (<md):** Map-first canvas with a floating sticky header, bottom navigation bar, and expandable bottom sheet drawers for workspace tabs.
- **Container Rhythm:** 16px (`1rem`) default padding inside cards and drawers; 8px (`0.5rem`) gap spacing between filter chips and tag groups.

## Elevation & Depth

Rumper prioritizes flat surfaces with tonal contrast at rest, rising to soft ambient shadows on user interaction.

### Shadow Vocabulary
- **Card Rest:** No heavy drop-shadows; relies on 1px `#d7e1e5` border and `#ffffff` background against `#f6f8f7` canvas.
- **Hover Lift:** `box-shadow: 0 4px 20px -2px rgba(0, 30, 43, 0.08)` for cards and interactive list items.
- **Floating Overlay:** `box-shadow: 0 12px 32px -4px rgba(0, 30, 43, 0.16)` for bottom sheets, popovers, and assistant drawers.

### Named Rules

**The Flat-Rest Floating-Action Rule.** Cards and containers rest flat with hairline borders. Drop shadows are reserved exclusively for floating drawers, active popovers, and elevated hover states.

## Shapes

- **Corner Radius Strategy:** Rounded form language using 16px (`1rem` / `rounded-2xl`) for cards, drawers, and main container panels; 12px (`0.75rem` / `rounded-xl`) for buttons and inputs; full rounded pills (`rounded-full`) for score chips and category filter badges.
- **Borders:** Crisp 1px hairline strokes (`#d7e1e5` in light mode, `#28515e` in dark mode).

## Components

### Buttons
- **Shape:** Rounded-xl (12px) or full pill (9999px)
- **Primary:** Background `#00684a`, text `#ffffff`, hover background `#004f38`, padding `10px 20px`, font-weight 600.
- **Accent/Gamified:** Background `#00ed64`, text `#001e2b`, hover background `#00b545`, padding `10px 20px`, font-weight 700.
- **Secondary/Ghost:** Background `#e9f5ef`, text `#004f38`, hover background `#dcfce7`, border transparent.

### Cards / Containers
- **Corner Style:** 16px (`rounded-2xl` / `rounded-[20px]`) up to 26px (`rounded-[26px]`) for primary wizard cards.
- **Background:** `#ffffff` (`var(--card)`)
- **Border:** 1px solid `#d7e1e5` or `#e5e5ea` (`var(--border)`)
- **Padding:** 16px (`p-4`), 20px (`p-5`), or 28px (`p-7`)

### Interactive Selection Cards (Radio / Checkbox Cards)
Used for profiling options, household selection, friction discovery, and area shortlist cards.
- **Resting State:** `bg-white border-[#d7e1e5] text-[#3d4f5b] hover:border-[#5c6c7a] hover:bg-[#f6f8f7]`
- **Selected State:** `border-[#001e2b] bg-white text-[#001e2b] shadow-xs ring-2 ring-[#001e2b]/10 font-bold`
- **Selection Indicator:** 24px circular badge `bg-[#00ed64] text-[#001e2b]` with check icon (`stroke-[3]`).

### Tonal Segmented / Preset Filter Buttons
Used for compact budget presets, price filters, category chips, and range selectors.
- **Shape & Layout:** Rounded 16px (`rounded-[16px]`), `whitespace-nowrap`, single-line text constraint.
- **Resting State:** `bg-white border-[#e5e5ea] text-[#1c1c1e] hover:border-[#c7c7cc] hover:bg-[#f2f2f7]/50`
- **Selected State:** `bg-[#f0fdf4] border-[#15803d] text-[#14532d] ring-2 ring-[#22c55e]/25 font-extrabold shadow-xs`

### Dynamic Telemetry & Calculation Banners
Used for real-time financial estimates (KPR burden), score telemetry, and simulation results.
- **Surface:** Evidence positive tint `bg-[#f0fdf4]` with subtle border `border-[#dcfce7]`.
- **Corner Radius:** 20px (`rounded-[20px]`).
- **Telemetry Metric:** Sans-serif bold/extrabold tabular numbers (`font-extrabold text-[#14532d] tabular-nums`), avoiding raw monospaced fonts for clean typographic spacing.
- **Inline Disclaimer/Assumption Pill:** Single-line rounded full badge `bg-white px-3.5 py-2 rounded-full border border-[#e5e5ea] text-[11px] sm:text-xs text-[#5c6c7a] whitespace-nowrap shadow-2xs`.

### Inset Control Boxes
Used for range sliders, parameter fine-tuning, and secondary calculators.
- **Surface:** Subordinate recessed background `bg-[#f2f2f7]/60` with hairline border `border-[#e5e5ea]`.
- **Corner Radius:** 20px (`rounded-[20px]`).
- **Sliders:** 2px track `bg-[#e5e5ea]` with deep teal thumb/accent (`accent-[#001e2b]`).

### Score Chips & Risk Badges
- **Style:** Full pill (`rounded-full`), flex row inline-align.
- **Positive:** Background `#dceee7`, text `#318266`, icon emerald.
- **Warning:** Background `#fff8e0`, text `#d79a2b`, icon amber.
- **Danger:** Background `#f4ded9`, text `#c95746`, icon coral.

### Drawers & Bottom Sheets
- **Corner Style:** Top-left & top-right 24px (`rounded-t-3xl`), border-t 1px `#d7e1e5`.
- **Overlay:** Backdrop blur `backdrop-blur-sm` with dark tint overlay `bg-black/30`.

## Named Design System Rules

**The 10% Mint Highlight Rule.** Electric Mint (`#00ed64`) is reserved strictly for score telemetry, main action triggers, and active status indicators. Its high contrast demands limited surface area.

**The Single-Line Preset Rule.** Actionable segment and preset buttons (such as budget ranges) must keep their label text on a single line (`whitespace-nowrap`) to prevent awkward line breaks. If items exceed screen width, structure them into clean multi-row grids (e.g. 3 items in Row 1, 2 items in Row 2).

**The Indonesian Currency & Decimal Rule.** Follow standard Indonesian financial notation:
- Use comma (`,`) as decimal separator: `Rp 1,8 Miliar`, `Rp 16,2 Jt` (never `1.8`).
- For ranges, provide a single leading currency prefix: `Rp 500 – 800 Jt`, `Rp 1,2 – 1,8 M`.
- Contextual Icon: Use `Wallet` or `Banknote`, avoiding US Dollar (`$`) signs.

**The Risk Color Contract Rule.** Risk colors (Positive Green, Warning Amber, Danger Coral) must always be accompanied by descriptive text labels and icons to guarantee accessibility.

## Do's and Don'ts

### Do:
- **Do** maintain high contrast ratio for all text on emerald and teal backgrounds.
- **Do** use rounded pill badges (`rounded-full`) for all risk score and facility category indicators.
- **Do** use `whitespace-nowrap` on compact status tags and assumption pills to avoid uneven two-line wrapping.
- **Do** provide clear Indonesian microcopy for all verification checklist items and risk descriptions.
- **Do** apply smooth spring transitions (`transition-all duration-200 ease-out`) for drawer slide-ins and modal popups.

### Don't:
- **Don't** use raw harsh red `#ff0000` or neon red for risk items; use curated evidence danger coral `#c95746`.
- **Don't** apply heavy dark drop-shadows on resting cards; keep cards flat with subtle 1px border strokes.
- **Don't** use raw monospace (`font-mono`) for primary financial numbers when tabular sans-serif (`tabular-nums`) gives more natural letter spacing.
- **Don't** clutter the Leaflet map panel; keep facility controls in clean floating glassmorphic pills.
