# Plan: Simulated Upgrade Flow

## Context

The Rumper workspace has a Free Trial state with locked sections gated behind upgrade prompts. When the user clicks "Upgrade sekarang" in the `UpgradeDrawer`, nothing currently happens — the button has no handler and there is no post-upgrade state. The user wants a simulated upgrade: clicking "Upgrade sekarang" and confirming immediately switches the whole app to Premium state.

## Approach

Lift a single `isPremium: boolean` state into `App.tsx`. When `true`, unlock all previously locked UI and replace the upgrade prompts with premium-state content.

### What changes per component

**`App.tsx`**
- Add `const [isPremium, setIsPremium] = useState(false)` alongside existing `upgradeOpen` state.
- Add `handleUpgradeConfirm` that sets `isPremium(true)` and `setUpgradeOpen(false)`.
- Pass `isPremium` and `onUpgradeConfirm` as props down to `UpgradeDrawer`.
- Pass `isPremium` to `AppHeader`, `SubHeaderTabs`, `UpgradeBanner`, `LockedStepCard`, `MapPanel`, `VerticalTimeline`.

**`UpgradeDrawer.tsx`**
- Wire `onUpgradeConfirm` prop to the "Upgrade sekarang" button's `onClick`.
- Optionally show a brief success animation/message before closing (a simple 500ms "Berhasil diupgrade!" flash inside the drawer before calling `onUpgradeConfirm`).

**`AppHeader.tsx`**
- When `isPremium`: replace the "Free Trial" badge with a "Premium" badge (emerald/green variant). Hide or disable the upgrade CTA in the header if any.

**`SubHeaderTabs.tsx`**
- When `isPremium`: remove lock icons from "Faktor risiko", "Perjalanan", and "Checklist" tabs. Make them fully clickable (no `onUpgrade` call, tabs become active/navigable).

**`UpgradeBanner.tsx`**
- When `isPremium`: hide the banner entirely (return `null`) — it's no longer needed.

**`LockedStepCard.tsx`**
- When `isPremium`: render an unlocked version of "Tahap 4 · Verifikasi Red Flag" — show actual content instead of the lock overlay. Can be a simplified "unlocked" card with the red flag detail visible and no lock icon.

**`VerticalTimeline.tsx`**
- When `isPremium`: change node 3 from `status: 'locked'` to `status: 'active'` or `'complete'`.

**`MapPanel.tsx`**
- When `isPremium`: unlock any map features previously gated; remove any upgrade prompts inside the panel.

## Files to Modify

- `src/App.tsx` — state lift, prop passing
- `src/components/UpgradeDrawer.tsx` — wire button + success flash
- `src/components/AppHeader.tsx` — badge swap
- `src/components/SubHeaderTabs.tsx` — unlock tabs
- `src/components/UpgradeBanner.tsx` — hide when premium
- `src/components/LockedStepCard.tsx` — unlocked variant
- `src/components/VerticalTimeline.tsx` — unlock node 3
- `src/components/MapPanel.tsx` — unlock map gates (if any)

## Prop contract additions

```ts
// shared across components
isPremium: boolean

// UpgradeDrawer only
onUpgradeConfirm: () => void
```

## Verification

1. Load the app in preview — confirm it renders in Free Trial state (locks, banner, locked tab icons all visible).
2. Click any upgrade trigger (UpgradeBanner CTA, LockedStepCard, locked tab) → UpgradeDrawer opens.
3. Click "Upgrade sekarang" → drawer shows success flash then closes; app switches to Premium.
4. Confirm: "Free Trial" badge → "Premium", all tabs unlocked, UpgradeBanner gone, LockedStepCard shows content, timeline node 3 unlocked.
5. No regressions on free-trial visible content (ScoreCard, FactorRisksCard, MapPanel base layers).
