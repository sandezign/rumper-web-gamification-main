---
name: Rumper
description: A calm, evidence-led interface system for buyer-side location risk decisions.
colors:
  rumper-green: "#00ed64"
  rumper-green-hover: "#00b545"
  rumper-green-pressed: "#008c34"
  rumper-green-dark: "#00684a"
  rumper-green-soft: "#c3f0d2"
  deep-evidence-teal: "#001e2b"
  supporting-teal: "#003d4f"
  canvas-white: "#ffffff"
  reading-surface: "#f9fbfa"
  recessed-surface: "#f4f7f6"
  feature-mint: "#e3fcef"
  primary-ink: "#001e2b"
  secondary-ink: "#3d4f5b"
  tertiary-ink: "#5c6c7a"
  muted-ink: "#7c8c9a"
  hairline: "#e1e5e8"
  strong-border: "#c1ccd6"
  evidence-positive: "#318266"
  evidence-positive-bg: "#dceee7"
  evidence-warning: "#d79a2b"
  evidence-warning-bg: "#fff8e0"
  evidence-danger: "#c95746"
  evidence-danger-bg: "#f4ded9"
typography:
  display:
    fontFamily: "DM Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(40px, 5vw, 56px)"
    fontWeight: 500
    lineHeight: 1.15
    letterSpacing: "-1px"
  headline:
    fontFamily: "DM Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(28px, 3vw, 36px)"
    fontWeight: 500
    lineHeight: 1.25
    letterSpacing: "-0.5px"
  title:
    fontFamily: "DM Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "18px"
    fontWeight: 600
    lineHeight: 1.4
  body:
    fontFamily: "DM Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "DM Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "13px"
    fontWeight: 600
    lineHeight: 1.4
  evidence-code:
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.55
rounded:
  xs: "4px"
  sm: "6px"
  md: "8px"
  lg: "12px"
  xl: "16px"
  2xl: "24px"
  full: "9999px"
spacing:
  xxs: "4px"
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "20px"
  xl: "24px"
  2xl: "32px"
  3xl: "40px"
  section-sm: "48px"
  section: "64px"
  section-lg: "96px"
  hero: "120px"
components:
  button-primary:
    backgroundColor: "{colors.rumper-green}"
    textColor: "{colors.primary-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.full}"
    padding: "8px 24px"
    height: "44px"
  button-primary-hover:
    backgroundColor: "{colors.rumper-green-hover}"
    textColor: "{colors.canvas-white}"
    rounded: "{rounded.full}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.primary-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.full}"
    padding: "8px 24px"
    height: "44px"
  input:
    backgroundColor: "{colors.canvas-white}"
    textColor: "{colors.primary-ink}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: "8px 16px"
    height: "44px"
  card:
    backgroundColor: "{colors.canvas-white}"
    textColor: "{colors.primary-ink}"
    rounded: "{rounded.lg}"
    padding: "{spacing.xl}"
  badge-warning:
    backgroundColor: "{colors.evidence-warning-bg}"
    textColor: "#714900"
    typography: "{typography.label}"
    rounded: "{rounded.full}"
    padding: "4px 12px"
---

# Design System: Rumper

## Overview

**Creative North Star: "The Calm Evidence Map"**

Rumper should feel like a clear map of evidence laid out for a consequential decision: calm
enough to reduce anxiety, structured enough to earn trust, and humane enough to guide a
first-time buyer without pretending uncertainty has disappeared. The visual language is clear,
reassuring, and evidence-led.

The system is softly layered rather than starkly flat. White and pale reading surfaces establish
clarity, restrained borders organize dense material, and low-contrast shadows separate raised or
temporary layers. Components feel warm and reassuring while remaining precise about risk,
confidence, limitations, and next actions.

The system explicitly rejects alarmist risk-dashboard conventions and generic AI-chat styling.
AI is a supporting interaction layer; evidence and verified analysis remain visually primary.

**Key Characteristics:**

- White and near-white evidence surfaces framed by deep teal.
- Rumper Green reserved for primary action and brand recognition.
- Dense information made approachable through consistent rhythm and visible hierarchy.
- Soft elevation used to clarify layers, not decorate every container.
- Semantic risk states always reinforced with text and icons.

## Colors

The palette combines quiet reading neutrals, deep evidence teal, and sparse Rumper Green with
muted semantic colors for decision states.

### Primary

- **Rumper Green** (`#00ed64`): primary actions and small identity accents. Hover shifts to
  `#00b545`; pressed shifts to `#008c34`.
- **Deep Evidence Teal** (`#001e2b`): primary ink, major framing surfaces, heroes, and strong
  contrast regions.

### Secondary

- **Supporting Teal** (`#003d4f`): restrained dark panels and supporting dark emphasis.
- **Feature Mint** (`#e3fcef`): non-semantic feature emphasis; it never means safe or verified.
- **Soft Rumper Green** (`#c3f0d2`): supporting brand tint without the urgency of an action.

### Neutral

- **Canvas White** (`#ffffff`): dominant page, card, table, and evidence-reading surface.
- **Reading Surface** (`#f9fbfa`): quiet page sections and controls.
- **Recessed Surface** (`#f4f7f6`): secondary grouping and subdued states.
- **Primary Ink** (`#001e2b`): headings and essential content.
- **Secondary Ink** (`#3d4f5b`): explanations and supporting content.
- **Tertiary Ink** (`#5c6c7a`): metadata and lower-priority information.
- **Hairline** (`#e1e5e8`): default card borders and dividers.
- **Strong Border** (`#c1ccd6`): inputs and interactive boundaries.

### Named Rules

**The Action, Not Safety Rule.** Rumper Green signals identity and action. It never communicates
safe, verified, low-risk, positive evidence, or a favorable score.

**The Evidence Is Never Color Alone Rule.** Every semantic state pairs color with visible text
and an icon or another non-color cue.

## Typography

**Display Font:** DM Sans (with UI sans-serif and system fallbacks)  
**Body Font:** DM Sans (with UI sans-serif and system fallbacks)  
**Label/Mono Font:** System monospace for evidence IDs, source IDs, timestamps, and aligned
technical values only.

**Character:** A single humanist sans-serif keeps marketing, intake, analysis, and controls in
one calm voice. Moderate weights and compact negative tracking give headings authority without
turning risk information into a dramatic headline.

### Hierarchy

- **Display** (500, `clamp(40px, 5vw, 56px)`, 1.15): primary marketing or onboarding statement.
- **Headline** (500, `clamp(28px, 3vw, 36px)`, 1.25): major page and analysis section headings.
- **Title** (600, `18px`, 1.4): card and component titles.
- **Body** (400, `16px`, 1.55): explanations, evidence interpretation, and report copy.
- **Label** (600, `13px`, 1.4): controls, badges, and compact metadata labels.
- **Micro Uppercase** (600, `11px`, 1.4, `1px` tracking): rare category or eyebrow labels.
- **Evidence Code** (400, `14px`, 1.55): IDs, timestamps, and source-oriented technical values.

### Named Rules

**The Composite Type Rule.** Use the shared type-role utilities rather than assembling font size,
weight, line height, and tracking independently in each component.

## Layout

Rumper uses a 4px base with a practical 8px rhythm. Component spacing runs from 4px to 40px;
section spacing is 48px, 64px, or 96px, with 120px reserved for major hero breathing room.

The analysis workspace is evidence-first. On wide desktops it can present assistant, verified
analysis, and map as coordinated regions, with the assistant visually subordinate and the map
receiving the largest spatial share. The implemented shell uses a 340px assistant rail and a
map region sized around `min(432px, 30vw)` in the established workspace, with newer analysis
iterations allowing the map to expand while protecting a minimum readable analysis width.

On smaller screens, regions transform into task-priority views, tabs, or overlays rather than
being compressed into unusable columns. Touch targets remain at least 44px, reading order stays
logical, and evidence remains available as text when spatial or visual content cannot fit.

## Elevation & Depth

The system is **softly layered**. Borders and tonal surfaces establish most hierarchy, while
shadows help raised controls, previews, dialogs, menus, and overlays separate from evidence
content. Resting cards remain restrained; temporary layers can lift more decisively.

### Shadow Vocabulary

- **Subtle** (`0 1px 2px rgba(0, 30, 43, 0.04)`): slight separation for compact evidence cards.
- **Raised** (`0 4px 12px rgba(0, 30, 43, 0.08)`): menus, floating controls, and interactive
  layers.
- **Preview** (`0 12px 24px -4px rgba(0, 30, 43, 0.12)`): report previews and prominent panels.
- **Overlay** (`0 16px 48px -8px rgba(0, 30, 43, 0.16)`): dialogs and modal-level surfaces.

### Named Rules

**The Softly Layered Rule.** Begin with surface contrast and borders. Add the smallest shadow
that correctly explains the layer's behavior.

## Shapes

Corners are compact and friendly: 8px for inputs, 12px for standard cards, 16px for major
panels, and 24px for large shells. Pills and circular controls use a full radius. Hairline
borders keep information-rich surfaces legible without making the interface feel boxed in.

Avoid arbitrary corner values when a radius token exists. Map markers may use circular geometry
for location semantics, but decorative blobs and ornamental loops are not part of the system.

## Components

Components are warm and reassuring in tone, but unambiguous in state and hierarchy.

### Buttons

- **Shape:** pill by default (`9999px`); some composed hero actions use a 12px contextual shape.
- **Primary:** Rumper Green with deep-teal text, minimum 44px height, and 24px horizontal padding.
- **Hover / Focus:** darker green hover, pressed green active state, and a visible 2px dark-green
  focus ring with offset.
- **Secondary / Outline:** transparent canvas, strong neutral border, primary ink, and soft
  surface hover.
- **Ghost:** no resting fill; soft surface appears on hover.
- **Destructive:** semantic danger only for genuinely destructive actions.

### Chips

- **Style:** full-radius compact controls using neutral borders or semantic background/text pairs.
- **State:** selected state must be visible through border, fill, weight, or icon—not hue alone.
- **Usage:** suggestion and filter chips remain concise and should not compete with the main
  action.

### Cards / Containers

- **Corner Style:** standard 12px radius; 16–24px for larger shells.
- **Background:** Canvas White for evidence and reading; pale surfaces for quiet grouping.
- **Shadow Strategy:** softly layered, following the elevation vocabulary.
- **Border:** 1px Hairline by default.
- **Internal Padding:** commonly 16px or 24px; 32px for major report surfaces.

### Inputs / Fields

- **Style:** white background, 1px Strong Border, 8px radius, 16px horizontal padding, and at
  least 44px height.
- **Focus:** focused border plus a visible 2px dark-green ring.
- **Error / Disabled:** semantic danger border for invalid input; reduced opacity and explicit
  disabled affordance for unavailable controls.

### Navigation

Navigation uses compact DM Sans labels, 44px minimum targets, visible focus rings, and neutral
resting states. Tabs use a hairline baseline with an emphasized active label and a 2px active
rule. Floating or overlay navigation receives Raised elevation rather than a permanent heavy
shadow.

### Evidence Badges

Evidence and risk badges are compact pills with text and, where state is consequential, a dot or
icon. Confidence communicates evidence strength, never location quality. Warning, danger,
positive, and unknown each have dedicated muted background and readable text pairs.

### Evidence and Map Coordination

Evidence cards expose claim, source, confidence, limitation, and validation action. Map markers
and layers reflect confidence through stroke, opacity, and line style, while synchronized
selection connects spatial proof to the corresponding report finding. Empty spatial evidence is
shown as a visible gap rather than a blank or implied-safe map.

## Do's and Don'ts

### Do:

- **Do** place critical red flags and material limitations before scores.
- **Do** use Rumper Green sparsely for primary action and identity.
- **Do** keep evidence surfaces light, readable, and softly separated.
- **Do** pair semantic color with visible text and an icon or equivalent cue.
- **Do** preserve 44px touch targets, visible focus states, and reduced-motion behavior.
- **Do** keep assistant UI subordinate to verified analysis and source-backed evidence.

### Don't:

- **Don't** use Rumper Green for score rings, safe states, verified evidence, or low-risk claims.
- **Don't** create an alarmist command-center aesthetic with oversized danger colors or dramatic
  warning theatre.
- **Don't** make the product look like a generic AI chat interface where conversation replaces
  the report.
- **Don't** hide safety-critical limitations behind tabs, hover, accordions, or payment.
- **Don't** invent unsupported visual proof, customer data, map precision, or confidence.
- **Don't** use arbitrary hex colors, spacing, radii, shadows, or type combinations when an
  established token or composite utility exists.
