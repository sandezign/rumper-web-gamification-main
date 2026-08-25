# Project Scaffold Specification

**Status:** Proposed  
**Created:** 2026-08-16  
**Owners:** Founder — Product and Founder — Technical

## Problem

The current prototype builds successfully, but its source structure no longer communicates ownership:

- `src/App.tsx` contains application state, navigation rules, scrolling behavior, entitlement simulation, property mutation, and three responsive compositions.
- `src/components/` mixes domain features, shell navigation, overlays, map behavior, and shared UI primitives.
- Large feature files contain both data fixtures and rendering logic.
- Generated Figma references live in root `imports/`, `src/imports/`, and root `plans/`; three generated SVG path maps are runtime dependencies even though `src/imports` is excluded in `tsconfig.json`.
- There is no automated test command or typecheck command in `package.json`.
- The production build succeeds but emits a chunk-size warning for a 666.21 kB JavaScript bundle.

## Goal

Create an incremental feature-oriented scaffold that makes ownership explicit, preserves current behavior, supports characterization tests, and creates safe seams for dummy scenarios, real-data adapters, and later backend integration.

## Reference interpretation

This scaffold is tailored from the earlier Rumper repository's `AGENTS.md`, `ARCHITECTURE.md`, `context.md`, `README.md`, and `docs/03-project-structure.md`.

Adopt these reference principles:

- Specs-driven development: active `docs/` defines what and why; code implements approved scope.
- Rumper remains a buyer-side location-risk advisor for first-time homebuyers in Jabodetabek.
- Scores and recommendations are deterministic product rules; AI does not own them.
- Every material finding has evidence and confidence or is an explicit evidence gap.
- Critical red flags remain visible regardless of total score or entitlement.
- Components do not call external providers directly; future network access must pass through a typed API or provider adapter.
- User-facing language remains calm, evidence-based Bahasa Indonesia.
- Tests and fixtures contain fictional data only unless an explicitly consented beta record is handled outside the repository.

Do not copy these reference implementation choices into the current prototype:

- Do not add `backend/` or wrap the current app in `frontend/` before a backend implementation is approved.
- Do not copy the reference repository's parallel `V2` and `V3` component generations.
- Do not adopt the vision-tier 1–5 scoring formula; the archived deterministic 0–100 specification supersedes it and still requires current founder approval.
- Do not add auth, payments, autonomous chat, PDF generation, or production API infrastructure as part of a folder reorganization.

If a backend becomes an approved workstream, perform that as a separate repository-boundary plan: move this SPA into `frontend/`, create `backend/`, and define the shared API contract before integration.

## Non-goals

- Redesigning the current user interface
- Changing scoring, entitlement, quota, pricing, or safety rules
- Adding a router, global state library, backend, payment gateway, or API client
- Rewriting generated Figma reference components
- Reorganizing `old docs/`
- Treating folder movement as evidence that prototype behavior is production-ready

## Target structure

```text
src/
  app/
    App.tsx
  pages/
    workspace/
      WorkspacePage.tsx
      DesktopWorkspace.tsx
      MobileWorkspace.tsx
  features/
    assistant/
      components/
    checklist/
      components/
      fixtures/
      model/
    commute/
      components/
      fixtures/
    entitlements/
      components/
      model/
    evidence/
      components/
      fixtures/
      model/
    facilities/
      components/
      fixtures/
      model/
    map/
      components/
      fixtures/
      model/
    properties/
      components/
      fixtures/
      model/
    report-overview/
      components/
      fixtures/
    workspace/
      components/
      model/
  shared/
    assets/
      figma/
    components/
      ui/
    test/
  lib/
    README.md
  main.tsx
  index.css
reference/
  figma/
docs/
  archive/
  superpowers/
    plans/
```

## Dependency rules

1. `app` may import `pages`, `features`, and `shared`.
2. `pages` may compose `features` and `shared`.
3. A feature may import its own files and `shared`.
4. Cross-feature behavior must pass through typed props or `features/workspace/model`; feature components must not import sibling feature components to mutate their state.
5. `shared` must not import from `features`, `pages`, or `app`.
6. Runtime source must not import from `reference/`, `old docs/`, or `docs/`.
7. Fixtures must be visibly separate from production adapters and must not be labelled as live data.
8. Components must not call `fetch` or external SDKs directly. Future network access belongs in `src/lib/api/`; external map/data SDK wrappers belong in feature-local adapters.
9. `src/lib` is reserved for implemented cross-cutting runtime infrastructure. It must not become a miscellaneous utility dump.
10. Active implementation documentation belongs in `docs/`; implementation-specific rebuild notes may live next to the relevant code only when they are kept current.

## Naming rules

- React component files use `PascalCase.tsx`.
- Hooks use `useName.ts`.
- Model and fixture files use lowercase dash-case, such as `workspace.types.ts` or `property-fixtures.ts`.
- Every scaffolded directory must contain a real source file or README; do not retain empty directories with `.gitkeep`.
- Use `git mv` for tracked relocations.

## Quality gates

- `pnpm typecheck` passes.
- `pnpm test` passes.
- `pnpm format:check` passes.
- `pnpm build` passes.
- Existing responsive workspace behavior remains available at the root route.
- Dummy data remains explicitly represented as fixtures.
- No runtime import resolves into `reference/`, `docs/`, or `old docs/`.
- No component contains a direct `fetch(` call.
- The initial bundle no longer eagerly includes the Leaflet workspace when the map is not rendered, or the remaining bundle warning is documented with measured before/after sizes.
