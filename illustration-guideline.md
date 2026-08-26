# Rumper Illustration Style

## Style name

**The Calm Location Scout**

A friendly, evidence-led illustration system that turns complicated location risks into simple visual signals. It should feel approachable without making home-buying risks look trivial or game-like.

## 1. Core visual language

- Geometric with subtly softened shapes
- Primarily flat 2D
- Representational but highly simplified
- Calm, practical, and location-oriented
- Medium visual density with one clear subject per illustration
- No decorative detail that disappears at small sizes

The system uses two distinct tiers:

### Tier 1 — Functional spot icons

Used inside option cards, checklists, evidence summaries, navigation, and compact UI.

- Strictly flat 2D
- No bevels, gloss, extrusion, or perspective
- One primary object or one simple object pair
- Recognizable at 24–64 px
- Consistent stroke and visual weight

### Tier 2 — Rumper mascot

Used for onboarding introductions, empty states, educational explanations, and major transitions.

- May retain limited dimensional rendering
- Never placed inside ordinary option-card icon containers
- Must remain secondary to the page heading or decision content
- Use no more than once per screen

A simplified flat mascot variant should eventually be created for compact product contexts. Do not shrink the detailed mascot into an icon.

## 2. Color system

### Primary illustration colors

- Deep Evidence Teal: `#001E2B`
- Supporting Teal: `#003D4F`
- Rumper Green: `#00ED64`
- Rumper Green Dark: `#00684A`
- Feature Mint: `#E3FCEF`
- Soft Green: `#C3F0D2`

### Supporting colors

- Location Blue: approximately `#2583E8`
- Water Blue: approximately `#4CA7D8`
- Quiet Sage: approximately `#DDECE2`
- Explorer Amber: approximately `#D79A2B`
- Warm Sand: approximately `#F3D18A`
- Neutral Gray: `#7C8C9A`
- White: `#FFFFFF`

### Usage rules

- Deep teal forms the structural base of icons.
- Green highlights one important feature or interaction.
- Blue is reserved for maps, water, routes, and location markers.
- Amber is reserved for cost, attention, or the mascot’s explorer equipment.
- Pale mint may be used as an icon-container background.
- Brand Green communicates identity, selection, or action—not safety.
- Risk meaning must never depend on color alone.

## 3. Spot-icon construction

### Geometry

- Build icons from circles, rounded rectangles, arcs, and simple polygons.
- Prefer frontal or slightly elevated views.
- Avoid dramatic perspective and isometric construction.
- Use rounded corners and endpoints.
- Keep the silhouette readable before adding interior detail.

### Stroke

- Medium, consistent stroke
- Rounded caps and joins
- Deep teal by default
- Approximate stroke-to-artboard ratio: 4–6%
- Reduce internal strokes before reducing the outer silhouette

### Fill

- Use two or three solid colors per icon.
- Allow one small accent color.
- Avoid gradients inside functional icons.
- Avoid semi-realistic lighting and cast shadows.
- Do not mix outlined and highly rendered objects in one icon.

### Icon containers

- Circular or softly rounded-square container
- Very pale mint or sage background
- No visible border unless required for contrast
- No more than one extremely subtle tonal layer
- Icon occupies approximately 58–68% of its container
- Maintain at least 16% breathing room on all sides

## 4. Icon metaphor library

### Flood risk

Cloud, three drops, and two horizontal water lines.

Do not use disaster imagery, submerged houses, or alarming red symbols.

### Commute

Compact vehicle paired with a clock or route line.

Avoid speed effects that imply guaranteed travel performance.

### Location comparison

Two simplified homes connected by a balanced scale or split route.

Keep both alternatives visually neutral.

### Facilities

Small storefront or clinic symbol paired with a water drop or distance marker.

Limit the composition to two supporting signals.

### Research burden

Map panel, location pin, and magnifying glass.

Avoid browser-logo references or branded map interfaces.

### Budget

Calculator or document paired with a small rupiah marker.

Use amber as the secondary accent; do not use green to imply affordability.

### Other concern

Speech bubble with three dots or a simple question marker.

Keep it neutral and inviting.

## 5. Mascot rules

### Recognizable features

- Shield-shaped body
- Central location pin
- Explorer helmet
- Magnifying glass
- Navy or deep-teal base
- Green outer trim
- Blue location accent

### Personality

The mascot is a careful investigator, not a superhero or judge. It helps users examine evidence and ask better questions.

### Approved poses

- Observing through the magnifying glass
- Pointing toward a checklist
- Holding a map
- Taking notes
- Indicating missing information
- Calmly welcoming the user

### Avoid

- Celebrating scores
- Thumbs-up approval of a property
- Warning sirens or panic expressions
- Competitive poses
- Coins, trophies, badges, or XP mechanics
- Gestures that imply a location is certified safe

## 6. Illustration applications

### Compact UI icon

- Display size: 24–32 px
- Flat monochrome or two-color treatment
- No background scene
- No mascot

### Option-card spot icon

- Display size: 48–64 px
- Circular mint container
- Two or three flat colors
- One clear metaphor

### Empty state

- Display size: approximately 160–240 px
- Flat mascot or simple mascot-and-object composition
- Large surrounding whitespace
- One supporting action

### Onboarding illustration

- Display size: approximately 180–320 px
- Mascot with one environmental object or evidence tool
- May use restrained dimensional treatment
- Must not compete with the primary question

### Hero or educational scene

- Display size: 320 px and above
- Simple environment assembled from reusable houses, roads, routes, water, facilities, and map markers
- Limited depth and atmospheric layers
- Never portray unsupported conclusions as factual conditions

## 7. Depth and effects

### Functional illustrations

- No gradients
- No highlights or bevels
- No cast shadows within the icon
- Optional container shadow: `0 1px 2px rgba(0,30,43,0.04)`

### Mascot illustrations

- Controlled gradients are permitted
- Highlights should remain broad and illustrative
- Use one consistent upper-left light source
- Avoid metallic photorealism
- Reduce outline heaviness when the mascot appears below 180 px

## 8. Composition

- One dominant idea per illustration
- Keep important details away from crop edges
- Prefer balanced, centered spot icons
- Mascot compositions may be asymmetrical
- Preserve open space around text
- Never place detailed artwork behind essential copy
- UI illustrations support comprehension; they do not replace labels

## 9. Motion

### Spot icons

- 120–180 ms
- Small scale or opacity response on selection
- Route lines may draw once
- Water or clock elements may shift subtly
- Respect reduced-motion settings

### Mascot

- 250–500 ms
- Gentle magnifying-glass movement
- Small helmet or body settle
- Occasional blink if a face is introduced
- Avoid looping bounce, celebration, or attention-seeking motion

## 10. Accessibility

- Every functional illustration must have an adjacent text label.
- Decorative illustrations should use empty alternative text.
- Informative illustrations require concise alternative text.
- Never communicate risk, selection, or confidence through color alone.
- Test functional icons at their smallest intended size.
- Maintain adequate contrast between icon, container, and page background.

## 11. Asset production

### Master format

Create illustration masters as SVG whenever possible.

### Product delivery

- Functional UI icons: SVG preferred
- Mascot and complex scenes: transparent WebP
- Transparent PNG only as a compatibility fallback
- Never export artwork with a baked white, green, or checkerboard background

### Transparent WebP requirements

- RGBA transparency preserved
- Tight but non-clipping canvas
- Approximately 4–8% transparent padding
- No colored matte around antialiased edges
- Export at 2× intended display size
- Verify all four corner pixels are fully transparent
- Test on white, mint, and deep-teal surfaces

### Naming convention

- `rumper-icon-flood.svg`
- `rumper-icon-commute.svg`
- `rumper-icon-compare.svg`
- `rumper-icon-facilities.svg`
- `rumper-icon-research.svg`
- `rumper-icon-budget.svg`
- `rumper-icon-other.svg`
- `rumper-mascot-observing.webp`
- `rumper-mascot-checklist.webp`
- `rumper-empty-no-results.webp`

## 12. Do and don’t

### Do

- Use flat, solid-color icons for functional decisions.
- Repeat the shield, pin, route, map, and magnifying-glass vocabulary.
- Keep metaphors understandable without decorative detail.
- Use pale mint containers and deep-teal silhouettes.
- Reserve the mascot for guidance and storytelling.

### Don’t

- Mix glossy 3D icons with flat icons in the same component family.
- Use generic emoji or clip-art styles.
- Add gradients to ordinary card icons.
- Use green to claim a property is safe.
- Turn evidence collection into achievements or rewards.
- Use the detailed mascot as a tiny navigation icon.
- introduce health, anatomy, or wellness-specific imagery.