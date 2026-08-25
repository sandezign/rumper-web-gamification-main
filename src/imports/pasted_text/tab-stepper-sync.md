# Tab Navigation & Vertical Stepper Synchronization

## Task

Synchronize the top workspace tabs, left vertical stepper, and left-column scroll position.

The horizontal tabs and vertical due-diligence stepper must represent the same workflow.

Use this fixed mapping:

| Step | Tab | Section |
|---|---|---|
| 1 | Ringkasan | Scoring Risk + Overview Risiko |
| 2 | Faktor Risiko | Detailed Risk Factors & Evidence |
| 3 | Perjalanan | Commute Score & Journey Analysis |
| 4 | Checklist | Field Verification Checklist |
| 5 | Fasilitas | Nearby Facilities Analysis |

Each tab represents exactly one vertical step.

Do not create separate or conflicting navigation states between the tab bar and stepper.


## Context

The workspace supports two access modes:

- Free
- Premium

The step sequence remains identical in both modes.

Access level only determines which steps can be opened.

The map workspace on the right must remain sticky while navigation and scrolling happen inside the left report workspace.


## Elements

### 1. Ringkasan — Step 1

`Ringkasan` is always the first section.

It contains only two primary components:

#### Scoring Risk

Show the overall location score:

- `INDEKS RISIKO LOKASI`
- `68 /100`
- Verdict
- Evidence strength
- Supporting description
- Circular score gauge

#### Overview Risiko

Rename the current top-level `Faktor Risiko` summary card to:

`Overview Risiko`

This is a compact overview only.

Show summarized rows such as:

- Banjir
- Perjalanan
- Akses fisik
- Fasilitas
- Lingkungan

Include:
- Score
- Small progress bar
- Status
- Risk badge where relevant

Do not show detailed evidence cards inside Ringkasan.

The purpose of `Overview Risiko` is to provide a quick summary before the user enters the detailed `Faktor Risiko` section.


### 2. Faktor Risiko — Step 2

Move the detailed risk-factor workspace into this section.

This includes the larger component currently displayed below the risk summary:

- Risk-factor sidebar
- Selected factor
- Evidence cards
- Evidence strength
- Evidence gaps
- Validation recommendations
- Checklist actions

For example, when `Banjir` is selected:

- Banjir detail header
- Score `42/100`
- Evidence `2/3`
- Gap `1`
- Checklist count
- Evidence cards
- Evidence gap
- Recommended next action

This content belongs only to the `Faktor Risiko` tab and Step 2.

Do not duplicate it inside Ringkasan.


### 3. Perjalanan — Step 3

Contains the commute analysis experience:

- Destination selector
- Commute Score
- Journey Breakdown
- Peak Hour Impact
- Field validation recommendation
- Commute route on the map


### 4. Checklist — Step 4

Contains field verification and due-diligence checklist tasks.


### 5. Fasilitas — Step 5

Contains nearby facility analysis and map context.


## Free Mode

In Free mode, only Step 1 is available by default.

Active tab:

`Ringkasan`

Visible Ringkasan content:

1. Scoring Risk
2. Overview Risiko

The detailed risk-factor evidence workspace must NOT appear underneath Ringkasan.

Tabs for later steps may remain visible as locked navigation:

- Faktor Risiko
- Perjalanan
- Checklist
- Fasilitas

Their corresponding vertical stepper nodes must use the same locked state.

Example:

- Step 1: Active / available
- Step 2: Locked
- Step 3: Locked
- Step 4: Locked
- Step 5: Locked

The lock state shown in the horizontal tabs and vertical stepper must always be consistent.

Clicking a locked tab or locked step should trigger the existing Free → Premium upgrade behaviour.

Do not scroll into locked content.


## Premium Mode

In Premium mode, all tabs and all corresponding steps are unlocked.

Default state may begin at:

`Ringkasan`

or at the section currently selected by the user.

Use the same mapping:

- Ringkasan → Step 1
- Faktor Risiko → Step 2
- Perjalanan → Step 3
- Checklist → Step 4
- Fasilitas → Step 5


## Behaviour

### Tab Click → Scroll + Stepper Update

When a Premium user clicks a tab:

1. Immediately set that tab as the active tab.
2. Immediately change the active vertical stepper node to the matching step.
3. Smoothly scroll the LEFT content column to the top of that section.
4. Keep the RIGHT map workspace sticky and stationary.
5. Do not reload the page.
6. Do not replace the entire workspace.

Example:

User is on:

`Ringkasan / Step 1`

User clicks:

`Faktor Risiko`

Result:

- Faktor Risiko tab becomes active
- Step 2 becomes active
- Left column smoothly scrolls down to the Faktor Risiko section
- Map remains fixed on the right


### Moving Forward

Example:

`Faktor Risiko → Perjalanan`

Behaviour:

- Active tab changes directly to `Perjalanan`
- Stepper jumps directly to Step 3
- Left content smoothly scrolls to Perjalanan
- Map remains sticky


### Moving Backward

Example:

`Checklist → Faktor Risiko`

Behaviour:

- Active tab changes directly from Checklist to Faktor Risiko
- Stepper jumps directly from Step 4 to Step 2
- Do NOT animate through Step 3
- Left column smoothly scrolls upward to the Faktor Risiko section

The scroll is smooth, but the active step state changes directly.


### Manual Scroll → Tab + Stepper Sync

The synchronization must also work in reverse.

When the Premium user manually scrolls the left column:

- Detect which section is currently active/in view
- Update the horizontal active tab automatically
- Update the active vertical stepper node automatically

Example:

User manually scrolls from Faktor Risiko into Perjalanan.

When the Perjalanan section reaches the defined activation threshold:

- `Perjalanan` becomes the active tab
- Step 3 becomes active

When the user scrolls upward back into Faktor Risiko:

- `Faktor Risiko` becomes active
- Step 2 becomes active


### Section Activation Threshold

Use Intersection Observer or equivalent scroll-spy behaviour.

Recommended activation rule:

A section becomes active when its top crosses approximately 25–35% from the top of the scrollable left workspace.

Avoid switching tabs repeatedly when the user is close to a section boundary.

Use a stable threshold / root margin so navigation does not flicker.


### Sticky Map Behaviour

On desktop:

The right-side map panel must remain sticky.

Only the left content workspace scrolls between sections.

Recommended layout:

```css
workspace:
  display: grid

left-content:
  overflow-y: auto

right-map:
  position: sticky
  top: headerOffset