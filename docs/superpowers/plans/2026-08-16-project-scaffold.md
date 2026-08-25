# Project Scaffold Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert the working Rumper prototype into an incremental feature-oriented scaffold without changing visible product behavior or product rules.

**Architecture:** Keep `src/main.tsx` as the browser entrypoint and make `src/app/App.tsx` a thin composition root. Move domain-owned components, fixtures, and types into `src/features/*`; keep responsive page composition in `src/pages/workspace`; keep reusable UI and runtime Figma assets in `src/shared`. Preserve unused generated exports under `reference/figma` so they cannot become accidental runtime dependencies.

**Tech Stack:** React 19, TypeScript 5.7 strict mode, Vite 8, Tailwind CSS v4, Leaflet, Vitest, Testing Library, oxfmt, pnpm

**Spec:** `docs/PROJECT_SCAFFOLD_SPEC.md`

**Reference inputs:** `/Users/arisandy/Downloads/rumper/AGENTS.md`, `/Users/arisandy/Downloads/rumper/ARCHITECTURE.md`, `/Users/arisandy/Downloads/rumper/context.md`, `/Users/arisandy/Downloads/rumper/README.md`, and `/Users/arisandy/Downloads/rumper/docs/03-project-structure.md`

## Global Constraints

- Preserve React 19, React DOM 19, Vite 8, TypeScript 5.7, Tailwind CSS v4, Leaflet, and the Figma Make Vite plugins.
- Preserve the root route and existing responsive desktop/mobile behavior.
- Do not change scoring, pricing, entitlement, quota, evidence, or red-flag rules during relocation.
- Use default exports for components, matching `AGENTS.md`.
- Keep CSS `@import` statements first in `src/index.css`.
- Use `git mv` for every tracked relocation.
- Do not modify or reorganize `old docs/`.
- Do not introduce a router, global state package, API client, backend, or payment integration.
- Do not create `frontend/` or `backend/` directories in this frontend-only repository; that boundary requires a separate approved plan.
- Do not copy parallel `V2`/`V3` component generations from the reference repository.
- Components must not call external providers directly; a future API implementation must use typed modules under `src/lib/api/`.
- Do not retain empty directories with `.gitkeep`.

---

## Current-state analysis

The production build currently passes, but the JavaScript bundle is 666.21 kB minified and produces Vite's chunk-size warning. The source contains approximately 4,814 lines across the active application files; `src/App.tsx` is 685 lines, `MapPanel.tsx` is 604 lines, and four additional feature files exceed 300 lines. There are no test or typecheck scripts.

The main structural issue is not the number of directories. It is that ownership is ambiguous:

- `src/App.tsx` owns state, business simulation, scrolling, navigation, and layout.
- `src/components` contains domain features and shared primitives at the same level.
- map, checklist, evidence, facilities, and commute fixtures are embedded in components.
- generated reference components coexist with active source.
- `tsconfig.json` excludes `src/imports`, although active components import three path maps from it.

The migration therefore starts with tests and contracts, then moves files in dependency order. A single bulk move would be faster but would make regressions difficult to isolate.

The reference repository demonstrates the intended long-term full-stack separation (`frontend/`, `backend/`, and contract-driven `docs/`), but it also shows the cost of keeping multiple component generations in parallel. This plan adopts its boundary rules and safety guardrails while retaining the current repository as one deployable SPA. Backend scaffolding is intentionally excluded until the controlled real-data beta clarifies the required API and provider contracts.

## Locked file map

### Application and page composition

- `src/main.tsx` — browser bootstrap only.
- `src/app/App.tsx` — thin composition root; renders `WorkspacePage`.
- `src/pages/workspace/WorkspacePage.tsx` — owns the workspace controller and overlay composition.
- `src/pages/workspace/DesktopWorkspace.tsx` — desktop analysis/map composition.
- `src/pages/workspace/MobileWorkspace.tsx` — mobile workspace, map-panel, and bottom-sheet composition.

### Workspace coordination

- `src/features/workspace/model/workspace.types.ts` — `WorkspaceStep`, `MobileView`, `SheetSnap`, and controller interface.
- `src/features/workspace/model/workspace.config.ts` — immutable step metadata and tab mapping.
- `src/features/workspace/model/useWorkspaceController.ts` — navigation, entitlement simulation, selected factor, facility visibility, and overlay state.
- `src/features/workspace/components/*` — timeline, tabs, bottom navigation, bottom sheet, and locked-section teaser.

### Domain features

- `src/features/properties/*` — property type, fixtures, location modal, and property-selection state.
- `src/features/report-overview/*` — score, factor summary, locked-step, and next-step cards.
- `src/features/evidence/*` — evidence category models, fixtures, and deep-dive workspace.
- `src/features/commute/*` — commute models, fixtures, and workspace.
- `src/features/checklist/*` — checklist models, fixtures, and workspace.
- `src/features/facilities/*` — facility models, fixtures, and workspace.
- `src/features/map/*` — Leaflet map, map fixtures, layer types, and icon helpers.
- `src/features/assistant/*` — assistant drawer and local message state.
- `src/features/entitlements/*` — upgrade banner, drawer, and entitlement types.

### Shared and reference content

- `src/shared/components/ui/*` — reusable UI primitives.
- `src/shared/assets/figma/*` — only generated path maps imported by runtime code.
- `src/shared/test/setup.ts` — Vitest DOM setup.
- `src/lib/README.md` — reserves the cross-cutting runtime boundary and documents the no-direct-provider rule; no API implementation is added in this plan.
- `reference/figma/*` — preserved unused Figma exports and images.
- `docs/archive/figma-make-plans/*` — historical generated implementation plans.

---

### Task 1: Add the quality harness before moving files

**Files:**
- Modify: `package.json`
- Modify: `pnpm-lock.yaml`
- Modify: `vite.config.ts`
- Create: `src/shared/test/setup.ts`
- Create: `src/App.test.tsx`

**Interfaces:**
- Consumes: Current `src/App.tsx` default export.
- Produces: `pnpm typecheck`, `pnpm test`, `pnpm test:watch`, and `pnpm format:check` quality commands.

- [ ] **Step 1: Add test dependencies**

Run:

```bash
pnpm add -D vitest jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

Expected: `package.json` and `pnpm-lock.yaml` include the six development dependencies.

- [ ] **Step 2: Add quality scripts**

Add these keys under `scripts` in `package.json`:

```json
{
  "typecheck": "tsc --noEmit",
  "test": "vitest run",
  "test:watch": "vitest",
  "format:check": "oxfmt --check ."
}
```

- [ ] **Step 3: Configure Vitest through Vite**

Add the Vitest reference and a `test` key to `vite.config.ts` without altering existing Figma plugins:

```ts
/// <reference types="vitest/config" />

// inside the returned config object
test: {
  environment: 'jsdom',
  setupFiles: ['./src/shared/test/setup.ts'],
  css: true,
},
```

- [ ] **Step 4: Create the DOM test setup**

Create `src/shared/test/setup.ts`:

```ts
import '@testing-library/jest-dom/vitest'

class ResizeObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
}

Object.defineProperty(globalThis, 'ResizeObserver', {
  value: ResizeObserverStub,
  writable: true,
})
```

- [ ] **Step 5: Write the first characterization test**

Create `src/App.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('App', () => {
  it('renders the active property and free-trial workspace', () => {
    render(<App />)

    expect(screen.getAllByText(/Grand Galaxy City Block R/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Ringkasan/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Free Trial/i).length).toBeGreaterThan(0)
  })
})
```

- [ ] **Step 6: Run the baseline quality commands**

Run:

```bash
pnpm typecheck
pnpm test
pnpm build
```

Expected: all commands exit successfully; retain the bundle-size warning as the measured baseline.

- [ ] **Step 7: Commit the harness**

```bash
git add package.json pnpm-lock.yaml vite.config.ts src/shared/test/setup.ts src/App.test.tsx
git commit -m "test: add scaffold regression harness"
```

---

### Task 2: Introduce workspace contracts without changing rendering

**Files:**
- Create: `src/features/workspace/model/workspace.types.ts`
- Create: `src/features/workspace/model/workspace.config.ts`
- Create: `src/features/workspace/model/workspace.config.test.ts`
- Modify: `src/App.tsx`

**Interfaces:**
- Consumes: Existing step IDs and tab labels from `src/App.tsx`.
- Produces: `WorkspaceStep`, `WorkspaceStepConfig`, `MobileView`, `SheetSnap`, `WORKSPACE_STEPS`, `TAB_TO_STEP`, and `isWorkspaceStepLocked`.

- [ ] **Step 1: Write the workspace contract test**

Create `src/features/workspace/model/workspace.config.test.ts`:

```ts
import { describe, expect, it } from 'vitest'
import { isWorkspaceStepLocked, WORKSPACE_STEPS } from './workspace.config'

describe('workspace configuration', () => {
  it('keeps five ordered steps and only exposes ringkasan to free users', () => {
    expect(WORKSPACE_STEPS.map((step) => step.id)).toEqual([
      'ringkasan',
      'faktor-risiko',
      'perjalanan',
      'checklist',
      'fasilitas',
    ])
    expect(isWorkspaceStepLocked('ringkasan', false)).toBe(false)
    expect(isWorkspaceStepLocked('faktor-risiko', false)).toBe(true)
    expect(isWorkspaceStepLocked('faktor-risiko', true)).toBe(false)
  })
})
```

- [ ] **Step 2: Verify the contract test fails**

Run:

```bash
pnpm test -- src/features/workspace/model/workspace.config.test.ts
```

Expected: failure because `workspace.config.ts` does not exist.

- [ ] **Step 3: Define workspace types**

Create `workspace.types.ts`:

```ts
export type WorkspaceStep =
  | 'ringkasan'
  | 'faktor-risiko'
  | 'perjalanan'
  | 'checklist'
  | 'fasilitas'

export type MobileView = 'workspace' | 'map-panel' | 'full-map'
export type SheetSnap = 'peek' | 'compact' | 'half' | 'full'

export interface WorkspaceStepConfig {
  id: WorkspaceStep
  step: number
  label: string
  tabLabel: string
}
```

- [ ] **Step 4: Define immutable workspace configuration**

Create `workspace.config.ts`:

```ts
import type { WorkspaceStep, WorkspaceStepConfig } from './workspace.types'

export const WORKSPACE_STEPS: readonly WorkspaceStepConfig[] = [
  { id: 'ringkasan', step: 1, label: 'Ringkasan', tabLabel: 'Ringkasan' },
  { id: 'faktor-risiko', step: 2, label: 'Faktor Risiko', tabLabel: 'Faktor risiko' },
  { id: 'perjalanan', step: 3, label: 'Perjalanan', tabLabel: 'Perjalanan' },
  { id: 'checklist', step: 4, label: 'Checklist', tabLabel: 'Checklist' },
  { id: 'fasilitas', step: 5, label: 'Fasilitas', tabLabel: 'Fasilitas' },
]

export const TAB_TO_STEP = Object.fromEntries(
  WORKSPACE_STEPS.map((step) => [step.tabLabel, step.id]),
) as Record<string, WorkspaceStep>

export function isWorkspaceStepLocked(step: WorkspaceStep, isPremium: boolean): boolean {
  return !isPremium && step !== 'ringkasan'
}
```

- [ ] **Step 5: Replace local declarations in `src/App.tsx`**

Import the new contract and remove local `WorkspaceStep`, `STEPS`, and `TAB_TO_STEP` declarations:

```ts
import { TAB_TO_STEP, WORKSPACE_STEPS } from '@/features/workspace/model/workspace.config'
import type {
  MobileView,
  SheetSnap,
  WorkspaceStep,
} from '@/features/workspace/model/workspace.types'
```

Replace `STEPS` references with `WORKSPACE_STEPS`, and use `MobileView` and `SheetSnap` in the existing state declarations.

- [ ] **Step 6: Verify behavior and types**

Run:

```bash
pnpm typecheck
pnpm test
pnpm build
```

Expected: all commands pass with no visual behavior changes.

- [ ] **Step 7: Commit the contracts**

```bash
git add src/App.tsx src/features/workspace/model
git commit -m "refactor: define workspace contracts"
```

---

### Task 3: Move shared primitives and active Figma assets

**Files:**
- Move: `src/components/ui/*` → `src/shared/components/ui/*`
- Move: `src/imports/Header/svg-n4hssipkeg.ts` → `src/shared/assets/figma/header-paths.ts`
- Move: `src/imports/Sidebar/svg-yz7dulupdq.ts` → `src/shared/assets/figma/sidebar-paths.ts`
- Move: `src/imports/TabPanel/svg-uizybifeh6.ts` → `src/shared/assets/figma/tab-panel-paths.ts`
- Modify: all runtime imports that reference the moved files
- Modify: `tsconfig.json`

**Interfaces:**
- Consumes: Existing default exports from UI primitives and generated SVG path maps.
- Produces: Stable `@/shared/components/ui/*` and `@/shared/assets/figma/*` runtime imports.

- [ ] **Step 1: Move tracked UI primitives with history**

Run one `git mv` per tracked file:

```bash
mkdir -p src/shared/components/ui
git mv src/components/ui/Badge.tsx src/shared/components/ui/Badge.tsx
git mv src/components/ui/Button.tsx src/shared/components/ui/Button.tsx
git mv src/components/ui/Card.tsx src/shared/components/ui/Card.tsx
git mv src/components/ui/ProgressBar.tsx src/shared/components/ui/ProgressBar.tsx
git mv src/components/ui/SectionHeader.tsx src/shared/components/ui/SectionHeader.tsx
git mv src/components/ui/Skeleton.tsx src/shared/components/ui/Skeleton.tsx
git rm src/components/ui/.gitkeep
```

- [ ] **Step 2: Rewrite UI imports mechanically**

Replace imports such as:

```ts
import Card from './ui/Card'
```

with:

```ts
import Card from '@/shared/components/ui/Card'
```

Apply the same alias pattern for `Badge`, `Button`, `ProgressBar`, `SectionHeader`, and `Skeleton`.

- [ ] **Step 3: Move the three runtime path maps**

```bash
mkdir -p src/shared/assets/figma
git mv src/imports/Header/svg-n4hssipkeg.ts src/shared/assets/figma/header-paths.ts
git mv src/imports/Sidebar/svg-yz7dulupdq.ts src/shared/assets/figma/sidebar-paths.ts
git mv src/imports/TabPanel/svg-uizybifeh6.ts src/shared/assets/figma/tab-panel-paths.ts
```

- [ ] **Step 4: Update runtime asset imports**

Use:

```ts
import headerPaths from '@/shared/assets/figma/header-paths'
import sidebarPaths from '@/shared/assets/figma/sidebar-paths'
import tabPanelPaths from '@/shared/assets/figma/tab-panel-paths'
```

Rename local `svgPaths` references in each consuming component to match its imported identifier.

- [ ] **Step 5: Stop excluding runtime source**

Remove this entry from `tsconfig.json` after no runtime imports resolve into `src/imports`:

```json
"exclude": ["src/imports"]
```

Do not add a replacement exclusion; unused generated exports will move outside `src` in Task 8.

- [ ] **Step 6: Verify no old runtime paths remain**

Run:

```bash
rg "components/ui|src/imports|@/imports|\.\./imports" src --glob '*.ts' --glob '*.tsx'
pnpm typecheck
pnpm test
pnpm build
```

Expected: `rg` returns no runtime references to the old paths; all quality commands pass.

- [ ] **Step 7: Commit shared infrastructure**

```bash
git add src tsconfig.json
git commit -m "refactor: establish shared runtime modules"
```

---

### Task 4: Extract property ownership and fixtures

**Files:**
- Move: `src/data/mockProperties.ts` → `src/features/properties/fixtures/property-fixtures.ts`
- Move: `src/components/PropertyModal.tsx` → `src/features/properties/components/PropertyModal.tsx`
- Create: `src/features/properties/model/property.types.ts`
- Create: `src/features/properties/model/property.factory.ts`
- Create: `src/features/properties/model/property.factory.test.ts`
- Modify: `src/App.tsx`

**Interfaces:**
- Consumes: Existing `PropertyLocation` shape and sample properties.
- Produces: `PropertyLocation`, `createFixtureProperty(name, location, id)`, and `INITIAL_PROPERTY_FIXTURES`.

- [ ] **Step 1: Write the property factory test**

Create `property.factory.test.ts`:

```ts
import { describe, expect, it } from 'vitest'
import { createFixtureProperty } from './property.factory'

describe('createFixtureProperty', () => {
  it('labels newly created prototype locations as investigation fixtures', () => {
    expect(createFixtureProperty('Rumah Uji', 'Depok', 'prop-test')).toMatchObject({
      id: 'prop-test',
      name: 'Rumah Uji',
      subdistrict: 'Depok',
      status: 'INVESTIGASI',
      score: 72,
    })
  })
})
```

- [ ] **Step 2: Verify the factory test fails**

Run:

```bash
pnpm test -- src/features/properties/model/property.factory.test.ts
```

Expected: module-not-found failure.

- [ ] **Step 3: Move the type into `property.types.ts`**

Move the existing interface unchanged and add an explicit fixture marker:

```ts
export interface PropertyLocation {
  id: string
  name: string
  subdistrict: string
  city: string
  status: 'INVESTIGASI' | 'LANJUTKAN' | 'TUNDA'
  statusBadge: 'warning' | 'success' | 'danger'
  score: number
  riskSummary: string
  evidenceCount: number
  gapCount: number
  active?: boolean
  dataMode: 'dummy' | 'real-review'
}
```

- [ ] **Step 4: Move fixtures and add the marker**

Move the file with `git mv`, rename `initialProperties` to `INITIAL_PROPERTY_FIXTURES`, import `PropertyLocation`, and add `dataMode: 'dummy'` to every fixture.

- [ ] **Step 5: Implement the fixture factory**

Create `property.factory.ts`:

```ts
import type { PropertyLocation } from './property.types'

export function createFixtureProperty(
  name: string,
  location: string,
  id: string,
): PropertyLocation {
  return {
    id,
    name,
    subdistrict: location || 'Indonesia',
    city: 'Kota Baru',
    status: 'INVESTIGASI',
    statusBadge: 'warning',
    score: 72,
    riskSummary: 'Perlu analisis faktor risiko awal lokasi baru',
    evidenceCount: 2,
    gapCount: 1,
    dataMode: 'dummy',
  }
}
```

- [ ] **Step 6: Move `PropertyModal` and update `App.tsx`**

Use alias imports:

```ts
import PropertyModal from '@/features/properties/components/PropertyModal'
import { INITIAL_PROPERTY_FIXTURES } from '@/features/properties/fixtures/property-fixtures'
import { createFixtureProperty } from '@/features/properties/model/property.factory'
import type { PropertyLocation } from '@/features/properties/model/property.types'
```

Replace the inline new-property object with:

```ts
const newProperty = createFixtureProperty(name, location, `prop-${Date.now()}`)
```

- [ ] **Step 7: Verify and commit**

Run:

```bash
pnpm typecheck
pnpm test
pnpm build
git add src
git commit -m "refactor: isolate property fixtures and model"
```

Expected: quality commands pass and the property modal retains current prototype behavior.

---

### Task 5: Move feature components into owned modules

**Files:**
- Move: overview, evidence, commute, checklist, facilities, assistant, entitlement, and workspace-shell components from `src/components/` into their target `src/features/*/components/` directories
- Create: feature fixture and model files listed below
- Modify: imports in `src/App.tsx` and moved components

**Interfaces:**
- Consumes: Existing component props and visual behavior.
- Produces: Feature-local component imports and separately exported fixture arrays.

- [ ] **Step 1: Move report-overview components**

Use `git mv` for:

```text
ScoreCard.tsx              → features/report-overview/components/ScoreCard.tsx
FactorRisksCard.tsx        → features/report-overview/components/FactorRisksCard.tsx
LockedStepCard.tsx         → features/report-overview/components/LockedStepCard.tsx
NextStepTeaserCards.tsx    → features/report-overview/components/NextStepTeaserCards.tsx
```

Move the factor array from `FactorRisksCard.tsx` into `features/report-overview/fixtures/factor-risk-fixtures.ts` and export it as `FACTOR_RISK_FIXTURES`.

- [ ] **Step 2: Move evidence components and fixtures**

Move `DeepDiveEvidenceWorkspace.tsx` to `features/evidence/components/DeepDiveEvidenceWorkspace.tsx`. Move category configuration and evidence records into:

```text
features/evidence/model/evidence.types.ts
features/evidence/fixtures/evidence-category-fixtures.tsx
features/evidence/fixtures/evidence-item-fixtures.ts
```

Preserve the current IDs because selection state depends on them.

- [ ] **Step 3: Move commute components and fixtures**

Move `CommuteWorkspace.tsx` to `features/commute/components/CommuteWorkspace.tsx`. Move its route array to `features/commute/fixtures/commute-route-fixtures.ts` and export `COMMUTE_ROUTE_FIXTURES`.

- [ ] **Step 4: Move checklist components, types, and fixtures**

Move `ChecklistWorkspace.tsx` to `features/checklist/components/ChecklistWorkspace.tsx`. Move public types to `features/checklist/model/checklist.types.ts`, checklist records to `features/checklist/fixtures/checklist-item-fixtures.ts`, and category/priority configuration to `features/checklist/fixtures/checklist-config.ts`.

- [ ] **Step 5: Move facility components, types, and fixtures**

Move `FasilitasWorkspace.tsx` to `features/facilities/components/FasilitasWorkspace.tsx`. Move `FacilityCategoryKey` and item interfaces to `features/facilities/model/facility.types.ts`; move `CATEGORIES` to `features/facilities/fixtures/facility-fixtures.tsx`.

- [ ] **Step 6: Move assistant and entitlement components**

Use `git mv`:

```text
AssistantDrawer.tsx → features/assistant/components/AssistantDrawer.tsx
UpgradeBanner.tsx   → features/entitlements/components/UpgradeBanner.tsx
UpgradeDrawer.tsx   → features/entitlements/components/UpgradeDrawer.tsx
```

Move `FEATURES` from `UpgradeDrawer.tsx` to `features/entitlements/fixtures/premium-feature-fixtures.ts`.

- [ ] **Step 7: Move workspace shell components**

Use `git mv`:

```text
AppHeader.tsx         → features/workspace/components/AppHeader.tsx
SubHeaderTabs.tsx     → features/workspace/components/SubHeaderTabs.tsx
MobileBottomNav.tsx   → features/workspace/components/MobileBottomNav.tsx
MobileBottomSheet.tsx → features/workspace/components/MobileBottomSheet.tsx
VerticalTimeline.tsx  → features/workspace/components/VerticalTimeline.tsx
```

Move `MobileTab` and timeline public types into `workspace.types.ts` and import them from the model in consuming components.

- [ ] **Step 8: Normalize runtime imports**

Use `@/features/...` for cross-folder imports and `@/shared/...` for primitives. Keep relative imports only within the same feature folder.

- [ ] **Step 9: Verify every move as one review gate**

Run:

```bash
pnpm typecheck
pnpm test
pnpm build
```

Expected: all commands pass and `src/components` contains only `MapPanel.tsx` before Task 6.

- [ ] **Step 10: Commit feature ownership**

```bash
git add src
git commit -m "refactor: group components by product feature"
```

---

### Task 6: Split map data from Leaflet rendering and lazy-load the map

**Files:**
- Move: `src/components/MapPanel.tsx` → `src/features/map/components/MapPanel.tsx`
- Create: `src/features/map/model/map.types.ts`
- Create: `src/features/map/fixtures/map-layer-fixtures.ts`
- Create: `src/features/map/lib/create-leaflet-icon.tsx`
- Create: `src/features/map/components/LazyMapPanel.tsx`
- Modify: workspace compositions that render the map

**Interfaces:**
- Consumes: `FacilityCategoryKey`, workspace timeline types, and current `MapPanel` props.
- Produces: `MapLayerState`, `RouteKey`, `MAP_ROUTE_FIXTURES`, `createLeafletIcon`, and default `LazyMapPanel`.

- [ ] **Step 1: Move map types and static records**

Move `MapLayerState`, route keys, route configuration, POI configuration, polygons, radii, and fixed coordinates into the model and fixture files. Preserve coordinates and IDs exactly.

- [ ] **Step 2: Extract Leaflet icon rendering**

Move the `renderToStaticMarkup` and `L.divIcon` helper into `create-leaflet-icon.tsx` with this signature:

```ts
import type { ReactElement } from 'react'
import type L from 'leaflet'

export function createLeafletIcon(
  element: ReactElement,
  className: string,
  size: [number, number],
): L.DivIcon
```

- [ ] **Step 3: Move `MapPanel` and repair imports**

Use `git mv`, then import workspace and facility types from their feature models. The component remains the only file that directly imports `react-leaflet`, Leaflet CSS behavior, and map rendering primitives.

- [ ] **Step 4: Add a lazy wrapper**

Create `LazyMapPanel.tsx`:

```tsx
import { lazy, Suspense, type ComponentProps } from 'react'
import Skeleton from '@/shared/components/ui/Skeleton'

const MapPanel = lazy(() => import('./MapPanel'))

export default function LazyMapPanel(props: ComponentProps<typeof MapPanel>) {
  return (
    <Suspense fallback={<Skeleton className="h-full min-h-[320px] w-full" />}>
      <MapPanel {...props} />
    </Suspense>
  )
}
```

- [ ] **Step 5: Replace direct map imports**

Import `LazyMapPanel` from page compositions and replace every `<MapPanel>` instance with `<LazyMapPanel>` while preserving props.

- [ ] **Step 6: Verify lazy chunking**

Run:

```bash
pnpm typecheck
pnpm test
pnpm build
find dist/assets -maxdepth 1 -type f -name '*.js' -print
```

Expected: build passes and emits a separate map-related JavaScript chunk. Record before/after sizes in the commit body; do not raise `chunkSizeWarningLimit` to hide the result.

- [ ] **Step 7: Commit map isolation**

```bash
git add src/features/map src/pages src/App.tsx
git commit -m "perf: isolate and lazy-load map feature"
```

---

### Task 7: Extract the workspace controller and responsive page compositions

**Files:**
- Create: `src/features/workspace/model/useWorkspaceController.ts`
- Create: `src/features/workspace/model/useWorkspaceController.test.tsx`
- Create: `src/pages/workspace/DesktopWorkspace.tsx`
- Create: `src/pages/workspace/MobileWorkspace.tsx`
- Create: `src/pages/workspace/WorkspacePage.tsx`
- Create: `src/app/App.tsx`
- Modify: `src/main.tsx`
- Delete after parity: `src/App.tsx`

**Interfaces:**
- Consumes: Feature components and contracts created in Tasks 2–6.
- Produces: `WorkspaceController` and a thin application root.

- [ ] **Step 1: Define the controller interface**

Add to `workspace.types.ts`:

```ts
import type { PropertyLocation } from '@/features/properties/model/property.types'
import type { FacilityCategoryKey } from '@/features/facilities/model/facility.types'

export interface WorkspaceController {
  activeProperty: PropertyLocation
  activePropertyId: string
  activeStep: WorkspaceStep
  assistantOpen: boolean
  facilityVisible: Record<FacilityCategoryKey, boolean>
  isPremium: boolean
  mapFullscreen: boolean
  mobileView: MobileView
  properties: PropertyLocation[]
  propertyModalOpen: boolean
  remainingQuota: number
  selectedFactorId: string
  sheetSnap: SheetSnap
  upgradeOpen: boolean
  addProperty(name: string, location: string): void
  closeAssistant(): void
  closePropertyModal(): void
  closeUpgrade(): void
  confirmUpgrade(): void
  navigateToStep(step: WorkspaceStep): void
  openAssistant(): void
  openPropertyModal(): void
  openUpgrade(): void
  selectFactor(id: string): void
  selectProperty(id: string): void
  setFacilityVisible(key: FacilityCategoryKey, visible: boolean): void
  setMapFullscreen(value: boolean): void
  setMobileView(view: MobileView): void
  setSheetSnap(snap: SheetSnap): void
}
```

- [ ] **Step 2: Write controller state tests**

Create `useWorkspaceController.test.tsx` using `renderHook` and `act`:

```tsx
import { act, renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { useWorkspaceController } from './useWorkspaceController'

describe('useWorkspaceController', () => {
  it('opens upgrade instead of navigating a free user to a locked step', () => {
    const { result } = renderHook(() => useWorkspaceController())

    act(() => result.current.navigateToStep('faktor-risiko'))

    expect(result.current.activeStep).toBe('ringkasan')
    expect(result.current.upgradeOpen).toBe(true)
  })

  it('creates new locations as dummy fixtures and selects them', () => {
    const { result } = renderHook(() => useWorkspaceController())

    act(() => result.current.addProperty('Rumah Uji', 'Depok'))

    expect(result.current.activeProperty.name).toBe('Rumah Uji')
    expect(result.current.activeProperty.dataMode).toBe('dummy')
  })
})
```

- [ ] **Step 3: Implement state transitions in the controller**

Move non-layout state and handlers from `src/App.tsx` into `useWorkspaceController.ts`. Keep DOM refs, scroll measurement, and intersection observers in `WorkspacePage`, because they coordinate rendered sections rather than domain state.

- [ ] **Step 4: Extract desktop composition**

Move the current `hidden lg:flex` branch into `DesktopWorkspace.tsx`. Define an explicit prop interface containing `WorkspaceController`, timeline nodes, node positions, section refs, and navigation callbacks. Copy JSX first; simplify only after parity tests pass.

- [ ] **Step 5: Extract mobile composition**

Move the current mobile full-map, workspace, and map-panel branches into `MobileWorkspace.tsx`. Define an explicit prop interface rather than passing an untyped object spread.

- [ ] **Step 6: Create `WorkspacePage`**

`WorkspacePage.tsx` must:

```tsx
export default function WorkspacePage() {
  const controller = useWorkspaceController()

  // retain section refs, ResizeObserver, scroll navigation, and IntersectionObserver here
  // compose AppHeader, DesktopWorkspace, MobileWorkspace, and the three drawers/modals
}
```

Implement the retained behavior by moving the existing code verbatim, then update imports to feature paths.

- [ ] **Step 7: Create the thin app root**

Create `src/app/App.tsx`:

```tsx
import WorkspacePage from '@/pages/workspace/WorkspacePage'

export default function App() {
  return <WorkspacePage />
}
```

Update `src/main.tsx`:

```ts
import App from '@/app/App'
```

- [ ] **Step 8: Move the app characterization test**

Use `git mv src/App.test.tsx src/app/App.test.tsx`, update its import to `./App`, and retain all assertions.

- [ ] **Step 9: Remove the superseded root component**

After tests and build pass against `src/app/App.tsx`:

```bash
git rm src/App.tsx
```

- [ ] **Step 10: Verify the complete composition**

Run:

```bash
pnpm typecheck
pnpm test
pnpm format:check
pnpm build
```

Expected: all commands pass, the root route renders the same workspace, and no file under `src/app` or `src/pages` contains embedded report fixture arrays.

- [ ] **Step 11: Commit page composition**

```bash
git add src
git commit -m "refactor: split workspace state and responsive composition"
```

---

### Task 8: Move generated references out of runtime source and document the scaffold

**Files:**
- Move: remaining `src/imports/*` → `reference/figma/src-imports/*`
- Move: root `imports/*` → `reference/figma/root-imports/*`
- Move: root `plans/*` → `docs/archive/figma-make-plans/*`
- Create: `reference/figma/README.md`
- Create: `src/lib/README.md`
- Modify: `README.md`
- Modify: `AGENTS.md`
- Modify: `docs/README.md`

**Interfaces:**
- Consumes: Runtime asset moves completed in Task 3.
- Produces: A runtime/reference boundary and documented source map.

- [ ] **Step 1: Prove generated files are no longer runtime dependencies**

Run:

```bash
rg "src/imports|@/imports|\.\./imports|from './imports" src --glob '*.ts' --glob '*.tsx'
```

Expected: no matches. Stop this task if any runtime match remains and repair the consuming import before moving references.

- [ ] **Step 2: Move tracked generated references with history**

Create destination directories, then use `git mv` for every tracked file under root `imports/`, remaining `src/imports/`, and root `plans/`. Preserve their internal relative layout under the destination roots.

- [ ] **Step 3: Write the reference boundary README**

Create `reference/figma/README.md`:

```md
# Figma Reference Exports

These files are preserved design and generation references. Runtime application code must not import from this directory. Promote a required asset into `src/shared/assets/figma/` with a descriptive filename and update its consuming feature explicitly.
```

- [ ] **Step 4: Update project documentation**

Update `README.md`, `AGENTS.md`, and `docs/README.md` so the canonical structure points to:

```text
src/app
src/pages
src/features
src/shared
reference/figma
docs
old docs
```

State that `old docs/` is historical, `reference/` is non-runtime, and `docs/` is the active product/project documentation set.

- [ ] **Step 5: Reserve the future integration boundary**

Create `src/lib/README.md`:

```md
# Runtime Integration Boundary

This directory is reserved for implemented cross-cutting runtime infrastructure.

- Future HTTP access belongs under `api/` and must use typed request/response contracts.
- Feature-specific external SDK wrappers belong inside the owning feature's `adapters/` directory.
- React components must not call `fetch` or external data providers directly.
- Do not add speculative clients or utilities before a consuming feature exists.
```

- [ ] **Step 6: Verify the final scaffold**

Run:

```bash
rg "from ['\"].*(reference|docs|old docs)" src --glob '*.ts' --glob '*.tsx'
rg "fetch\(" src/features src/pages src/app --glob '*.ts' --glob '*.tsx'
find src -name '.gitkeep' -print
pnpm typecheck
pnpm test
pnpm format:check
pnpm build
```

Expected: all three searches return no matches, no empty source scaffolds remain, and all quality commands pass.

- [ ] **Step 7: Commit reference cleanup and documentation**

```bash
git add -A README.md AGENTS.md docs reference src imports plans
git commit -m "docs: finalize project scaffold boundaries"
```

---

## Final verification checklist

- [ ] `src/app/App.tsx` is a thin composition root.
- [ ] Responsive layout composition lives under `src/pages/workspace`.
- [ ] Domain components, fixtures, and types live in their owning features.
- [ ] Shared UI has no imports from features or pages.
- [ ] Runtime Figma assets use descriptive filenames under `src/shared/assets/figma`.
- [ ] Unused generated exports live under `reference/figma`.
- [ ] Dummy property data carries `dataMode: 'dummy'`.
- [ ] `pnpm typecheck`, `pnpm test`, `pnpm format:check`, and `pnpm build` pass.
- [ ] Bundle sizes are recorded before and after lazy-loading the map.
- [ ] `old docs/` remains unchanged.
