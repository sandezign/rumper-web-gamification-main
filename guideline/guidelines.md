# Rumper UI Guidelines

## 1. Product stance

Rumper is a **calm, evidence-led property due-diligence companion** for Indonesian homebuyers. The interface should feel precise and reassuring—not alarmist, financial, or generic SaaS.

- Lead with the buyer’s real anxiety: *“Sudah suka rumahnya? Cek dulu risiko lokasinya.”*
- Turn uncertainty into a concrete next step: enter a location, review evidence, validate on-site, then decide.
- Use bright emerald only to signal progress, confirmation, or the main action. Risk states must use their own semantic colors.
- Prefer concise Bahasa Indonesia with direct, friendly phrasing. Avoid jargon unless it is paired with an explanation.

## 2. Visual language

### Core contrast

The acquisition experience uses a confident deep-teal field; the working product uses a crisp, quietly technical light canvas.

| Role | Token / value | Use |
| --- | --- | --- |
| Ink / hero canvas | `#001E2B` | Dark landing hero, headline text, core navigation |
| Deep teal | `#00684A` | Primary button on light surfaces, active controls, links |
| Signal emerald | `#00ED64` | Hero CTA, success, active confirmation, small high-attention accents |
| Pale mint | `#E3FCEF` / `#E9F5EF` | Success panels, selected locations, supportive highlights |
| Canvas | `#F6F8F7` | Light app background |
| Surface | `#FFFFFF` | Cards, drawers, input fields |
| Structural border | `#D7E1E5` / `#C1CCD6` | Inputs, quiet dividers, outlined controls |
| Supporting text | `#64748B` / `#5C6C7A` | Body copy, captions, secondary metadata |
| Muted on dark | `#A8B3BC` | Hero description and dark-surface supporting text |
| Danger | `#D92D20` | Validation errors and confirmed critical risk only |
| Warning | `#FE9A00` / `#FFF8E0` | Moderate risk and attention states |

### Ground rules

- Do not use blue as Rumper’s primary action color.
- Keep large surfaces flat: no colorful gradients, glassmorphism, or strong shadows behind every card.
- The dark hero is intentional. Keep it near-black teal, not pure black or blue-gray.
- On light screens, give content generous white space and allow a single strong emerald action to lead.

## 3. Typography

### Families

- **DM Sans** — default UI, body, controls, labels, metrics.
- **Plus Jakarta Sans** — high-impact headlines and pivotal conversion messages.
- **DM Mono** — optional for compact data labels, scores, IDs, or source timestamps only.

### Hierarchy

- **Display / landing hero:** Plus Jakarta Sans, 800, `clamp(2.5rem, 7vw, 5.6rem)`, line-height `0.98`, letter-spacing around `-0.045em`.
- **Page headline:** Plus Jakarta Sans, 700–800, line-height `1.05–1.15`, slight negative tracking only when large.
- **Section title:** DM Sans or Plus Jakarta Sans, 700.
- **Body:** DM Sans, 400, 14–16px, line-height `1.5–1.75`.
- **Eyebrow / status:** DM Sans, 700, 11–12px, uppercase, tracking `0.12–0.14em`.
- **Buttons:** DM Sans, 600–700, 14px. Do not make every label uppercase; reserve uppercase for process-level actions only.

## 4. Spacing and shape

- Base spacing rhythm: **4px** increments; common gaps: 8, 12, 16, 20, 24, 32, 40, 48px.
- Standard page padding: 20px mobile, 32px tablet, 48px+ desktop.
- Cards: 16–24px corner radius; hero preview surfaces may use 28–30px.
- Buttons: use pill shapes for primary conversion and social-auth buttons. Use 12–16px radii for standard workspace buttons.
- Inputs: minimum 48px high. Important location input should be 52px or taller.
- Hairline rules only. Borders should organize hierarchy, never dominate it.

## 5. Components

### Location input — primary acquisition control

This is the focal interaction on the landing page.

- White or translucent-dark surface with a search / pin icon at the leading edge.
- Placeholder: **“Masukkan alamat atau paste link Google Maps...”**
- Accept normal address text, cluster names, listing URLs, and Google Maps links.
- Focus: deep-teal / emerald outline plus a soft translucent ring.
- Empty submit: retain focus and show inline red text: **“Masukkan lokasi terlebih dahulu.”**
- Submit: CTA changes to a spinner and **“Memindai lokasi...”** for approximately 1–2 seconds.
- Save the submitted value before opening the auth gate so the assessment survives a return visit.

### Primary CTA

- Hero CTA: signal emerald `#00ED64` with deep-teal text, pill radius, 48px minimum height.
- App CTA: deep teal `#00684A` with white text.
- Use one primary CTA per visual section. Make labels specific: “Cek risiko properti ini”, “Buat akun & lanjutkan”, “Konfirmasi titik pin”.
- Include loading feedback and disable repeated submits while processing.

### Auth drawer

- Present after location scanning as a bottom drawer on mobile and centered modal on larger screens.
- Scrim: dark teal at ~55% opacity with a restrained blur.
- Drawer: white, top corners 30px on mobile, max height 92dvh, internal vertical scrolling.
- Always show the selected location in a pale-mint context card with a map-pin icon.
- Primary route: “Lanjutkan dengan Google”. Secondary route: email + password.
- Include close affordance, Sign Up / Login toggle, inline validation, and loading states.

### Cards and evidence panels

- Default: white surface, `#D7E1E5` border or a very soft low-opacity navy shadow.
- Use colored fills sparingly to group a semantic message, such as pale mint for completed checks or pale amber for an attention state.
- Scores should pair a number with a label and a written interpretation; never rely on red/amber/green alone.

### Navigation

- Dark landing header: white Rumper mark with a small emerald shield accent.
- Workspace navigation: dark ink text on white or canvas, active element in deep teal.
- Mobile bottom navigation: maximum four clearly distinct destinations; do not compete with the primary property-analysis task.

## 6. Responsive behavior

- Design mobile-first. The key input and action must be visible or reachable without layout breakage at 320px width.
- Public acquisition screens must provide their own vertical scroll container when embedded in a code layer.
- Keep the location input before decorative preview cards in visual priority. Hide or defer nonessential previews on the smallest screens.
- At desktop, use an intentional asymmetrical hero grid: copy and input on the left, risk-preview evidence on the right.
- Auth stays a bottom drawer on mobile and becomes a centered, contained modal on larger screens.

## 7. Motion and feedback

- Use `motion/react` for page-to-drawer, drawers, and meaningful transition states only.
- Modal/drawer: fade scrim + spring upward panel; no exaggerated bounce.
- Input: ring transition around 150–200ms. Invalid state is communicated with copy and color.
- Scanning/auth: small spinner plus explicit status text. Avoid indefinite motion without a label.
- Respect reduced visual noise: do not animate static dashboard cards merely for decoration.

## 8. Accessibility and content safeguards

- Maintain AA contrast for standard text. Emerald on white is not suitable for small body text—use deep teal for copy and action labels on light surfaces.
- Every icon-only button requires an accessible label.
- Modal dialogs need `role="dialog"`, `aria-modal="true"`, and reliable close behavior.
- Inputs require labels or explicit `aria-label`s; placeholder text is not a label.
- Risk statements must include both a level and a plain-language reason, e.g. “Moderate–High Risk — historical flood signal detected.”

## 9. Do / do not

**Do**
- Use calm, evidence-based copy and clean hierarchy.
- Carry the entered location through landing, auth, and onboarding.
- Make one decisive, emerald action obvious on dark acquisition surfaces.
- Use soft but deliberate corners and shadows.

**Do not**
- Replace the deep teal / emerald system with generic SaaS blue.
- Use sharp, square inputs or buttons in the acquisition flow.
- Let decorative hero content push the location input out of reach on mobile.
- Show a risk color without textual explanation.
- Modify files under `src/imports/`; adapt them in app components instead.
