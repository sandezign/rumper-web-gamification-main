# Rumper — Premium Commute Score & Peak Hour Intelligence

## Task

Create a high-fidelity responsive web screen for the Rumper web application.

**Screen Name:** Core Workspace — Premium Commute Score & Peak Hour Intelligence

Use the existing Rumper workspace UI as the primary visual reference.

Keep the same:
- Dark teal app header
- Workspace title and pill navigation
- Left-side continuous due-diligence timeline
- Rounded white cards
- Two-column desktop layout
- Large right-side map workspace
- Soft borders and shadows
- Spacing and typography system

Set the **Perjalanan** tab as active.

Build using:
- React
- Tailwind CSS
- Reusable components
- Lucide-style outline icons

The screen should help Premium users understand:
- Commute Score
- Off-peak travel time
- Peak-hour travel time
- Multimodal journey breakdown
- First-mile effort
- Transit route
- Field validation recommendation


## Context

Rumper is a location risk and due-diligence advisor for homebuyers.

The current user is a **Premium** subscriber reviewing:

**Grand Galaxy City Blok R, Bekasi Selatan**

Current destination:

**Sudirman CBD**

Header state:
- Plan: `Premium`
- Location usage: `2 dari 5 lokasi digunakan`

Default commute data:
- Commute Score: `55/100`
- Status: `Moderate`
- Off-peak: `~55 min`
- Morning peak: `75–85 min`
- Evening peak: `~90 min`

Default journey:

1. Grand Galaxy Block R → Bekasi Station
   - Walk
   - 1.2 km
   - 12 min

2. Bekasi Station → Manggarai
   - KRL Commuter Line
   - 28 km
   - 35 min

3. Manggarai → Sudirman
   - KRL Commuter Line
   - 5 km
   - 8 min

4. Sudirman CBD
   - Destination
   - Total ~55 min off-peak

The interface should communicate:

**Property → First Mile → Station → Transit → Transfer → Workplace → Peak-Hour Impact → Field Validation**


## Elements

### 1. App Header

Reuse the Rumper header from the reference.

Left:
- Rumper shield logo
- `Rumper`
- Green `Premium` badge

Right:
- Location selector:
  `Grand Galaxy City Blok R, Bekasi Selatan`
- Location pin icon
- Chevron down
- Quota pill:
  `2 dari 5 lokasi digunakan`
- Circular user avatar

Style:
- Dark teal background
- Compact height
- Rounded controls
- Thin muted borders


### 2. Workspace Navigation

Show title:

`Peta Risiko & Evidensi`

Tabs:
- `Ringkasan`
- `Faktor risiko`
- `Perjalanan` — active
- `Checklist`
- `Fasilitas`

Active `Perjalanan` tab:
- Dark teal filled pill
- White text

Other tabs:
- White or transparent
- Thin gray-blue outline
- Muted text

Right action:

`Tanya Asisten`

Use:
- Message icon
- Blue outlined pill


### 3. Desktop Layout

Use the same two-column Rumper workspace.

Left column:
- Approximately 50–52%
- Timeline + commute content

Right column:
- Approximately 48–50%
- Large interactive route map

Gap:
- Approximately 20–24px

Page background:
- Very light cool gray

Map stays visually anchored while left content scrolls.


### 4. Due Diligence Timeline

Use a continuous vertical timeline on the far left.

States:
- Step 1: green completed check
- Step 2: green completed check
- Step 3: green completed check
- Step 4: active purple circle with `4`
- Step 5: gray locked
- Step 6: gray locked

Step 4 represents:

`Verifikasi Akses Jalan & Commute`

Use:
- Green completed line
- Purple active node
- Muted gray future line


### 5. Destination Selector

At the top of the commute content show:

`Perjalanan ke tempat kerja`

Destination selector:

`Sudirman CBD ▾`

Available options:
- Sudirman CBD
- SCBD
- Kuningan
- TB Simatupang
- Custom office location

Optional transport mode segmented control:

- `Transportasi Publik` — active
- `Mobil`


### 6. Commute Score Card

Create a rounded white card.

Header:

`COMMUTE SCORE`

Score:

`55 /100`

Badge:

`Moderate`

Use amber for:
- Score
- Moderate status

Description:

`Total perjalanan ke Sudirman CBD: ~55 menit saat off-peak.`

`75–85 menit saat jam sibuk (07:00–09:00).`

Use:
- Large score
- Muted metadata
- Soft border
- Subtle shadow
- 20–24px radius


### 7. Journey Breakdown Card

Create a rounded white card.

Header:

`JOURNEY BREAKDOWN`

Show a vertical journey timeline.


#### Grand Galaxy Block R

Icon:
- Footprints

Mode:
`Walk`

Distance:
`1.2 km`

Duration:
`12 min`

Color:
- Purple


#### Bekasi Station

Icon:
- Train

Mode:
`KRL Commuter Line`

Distance:
`28 km`

Duration:
`35 min`

Color:
- Cyan / blue


#### Manggarai

Icon:
- Train

Mode:
`KRL Commuter Line`

Distance:
`5 km`

Duration:
`8 min`

Color:
- Cyan / blue


#### Sudirman CBD

Icon:
- Building

Secondary text:

`Destination · Total ~55 min off-peak`

Color:
- Teal

Connect the journey nodes with thin vertical lines.

Each journey row should be hoverable and clickable.


### 8. Peak Hour Impact Card

Create another rounded white card.

Header:

`PEAK HOUR IMPACT`

Rows:

#### Off-peak

`Off-peak (06:00–07:00)`

`~55 min`

Use green.


#### Morning Peak

`Peak (07:00–09:00)`

`~80 min`

Use orange.


#### Evening Peak

`Evening (17:00–19:00)`

`~90 min`

Use red.


Below the comparison show:

`Waktu perjalanan dapat bertambah sekitar 25–35 menit pada jam sibuk dibanding kondisi off-peak.`


### 9. Field Recommendation

Show a soft recommendation section.

Title:

`Rekomendasi verifikasi lapangan`

Text:

`Kunjungi properti dan berjalan ke Stasiun Bekasi antara pukul 07:30–08:00 untuk merasakan kondisi perjalanan aktual saat jam sibuk sebelum mengambil keputusan.`

Primary action:

`Tambahkan rekomendasi ke checklist +`

After adding, change state to:

`Ditambahkan ke checklist`

Use:
- Pale green or pale blue background
- Compact green CTA
- Checklist / plus icon


### 10. Future Timeline Cards

Continue the due-diligence timeline below the commute section.

Use muted locked cards.

Example:

`Terbuka setelah tahap sebelumnya selesai`

`Verifikasi checklist lapangan`

Next:

`Terbuka setelah tahap sebelumnya selesai`

`Evaluasi fasilitas sekitar`

Do not show an upgrade banner.


### 11. Map Workspace

Keep the same large right-side Rumper map panel.

The map should now focus on the commute route rather than flood evidence.

Visualize:

`Grand Galaxy → Bekasi Station → Manggarai → Sudirman CBD`

Show:
- Property marker
- Walking route
- Bekasi Station
- KRL route
- Manggarai transfer
- Sudirman destination
- Traffic conditions


### 12. Map Layer Controls

Top floating controls:

`Map Layers`

Toggle chips:
- `Transit Routes`
- `Traffic`
- `POI Markers`
- `Radius Circle`

Default:
- Transit Routes: ON
- Traffic: ON
- POI Markers: ON
- Radius Circle: OFF

Enabled chips:
- Green outline
- Pale green fill


### 13. Route Styling

Walking route:
- Purple dashed line

KRL route:
- Cyan / blue solid line

Property marker:
- `Grand Galaxy`

Station markers:
- `Bekasi`
- `Manggarai`

Destination:
- `Sudirman CBD`

Destination marker:
- Teal
- Building icon

Match route colors with Journey Breakdown colors.


### 14. Route Summary Panel

At the bottom of the map show a floating white summary card.

Title:

`Perjalanan ke Sudirman CBD`

Secondary:

`34.2 km · ~55 min off-peak`

Optional details:
- Walk: `12 min`
- KRL: `43 min`
- Transfer: `1`
- Peak: `~80 min`


## Behaviour

Default state:
- Plan: Premium
- Active tab: Perjalanan
- Active timeline step: 4
- Destination: Sudirman CBD
- Transport mode: Transportasi Publik
- Commute Score: 55
- Commute status: Moderate

### Destination

Clicking `Sudirman CBD ▾` opens a destination selector.

Selecting another destination updates:
- Commute Score
- Journey duration
- Journey breakdown
- Map route
- Route summary


### Journey Breakdown

Hovering a journey leg:
- Highlight matching route segment on map
- Slightly dim unrelated route segments

Clicking a journey leg:
- Keep route segment highlighted
- Focus map on that segment


### Peak Hour

Clicking a time row updates the map traffic visualization.

Example:

Selecting:

`Peak (07:00–09:00)`

should emphasize morning congestion.


### Transport Mode

Switch between:

`Transportasi Publik`

and

`Mobil`

Changing mode updates:
- Journey breakdown
- Duration
- Route
- Map styling
- Commute Score if needed


### Recommendation

Clicking:

`Tambahkan rekomendasi ke checklist +`

should:
1. Add the field task to Checklist
2. Change button to `Ditambahkan ke checklist`
3. Automatically switch active tab to `Checklist`

Task added:

`Survey jam sibuk 07:30–08:00 di Stasiun Bekasi`


### AI Assistant

Clicking:

`Tanya Asisten`

opens the existing assistant drawer.

Provide context:
- Property
- Destination
- Commute Score
- Journey breakdown
- Peak-hour difference
- First-mile distance


### Map

Users can:
- Toggle map layers
- Zoom
- Recenter route
- Inspect stations
- Inspect destination
- Inspect journey segments


## Constraints

- Match the existing Rumper workspace UI.
- Do not create a separate dashboard.
- Keep the same header, navigation, timeline, cards, and map structure.
- Keep `Perjalanan` active.
- User is Premium.
- Do not show Free Trial locks in navigation.
- Do not show an upgrade banner.
- Use React + Tailwind CSS.
- Use reusable components.
- Use Lucide-style icons.
- Use subtle shadows and thin borders.
- Use 20–24px rounded cards.
- Keep the map approximately half of the desktop workspace.
- Use Indonesian interface copy except:
  - `COMMUTE SCORE`
  - `JOURNEY BREAKDOWN`
  - `PEAK HOUR IMPACT`
- Use purple for walking.
- Use cyan / blue for KRL.
- Use teal for destination.
- Use amber for Moderate.
- Use green / orange / red for peak-hour time comparison.
- Do not describe Commute Score as AI-generated.
- Do not show only one average travel time.
- Always show peak-hour variability.
- Keep field-validation recommendation visible.
- Avoid gradients, glassmorphism, heavy shadows, and excessive animation.

### Responsive

For screens below `1024px`:
- Switch to single-column layout
- Convert vertical timeline to horizontal progress
- Stack commute cards
- Hide persistent right map
- Add action:
  `Lihat rute di peta`
- Open map in full-screen sheet or overlay