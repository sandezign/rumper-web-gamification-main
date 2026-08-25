# Documentation Backlog

**Status:** Active  
**Created:** 2026-08-16  
**Review cadence:** Weekly founder review

## Prioritization rule

Documentation is prioritized by whether it enables a product decision, protects beta participants, or removes a delivery blocker. Documentation completeness is not an outcome by itself.

Do not run more than two documentation tasks concurrently. The customer-beta preparation is the primary stream; historical-document reconciliation is a supporting stream and must not delay recruitment or usability preparation.

## Active backlog

| ID | Priority | Task | Accountable owner | Supporting owner | Dependency | Done when | Status |
|---|---|---|---|---|---|---|---|
| DOC-001 | P0 | Resolve build-blocking product decisions | Founder — Product | Founder — Technical | None | One decision register resolves product stage, report authority, human review, workspace stages, free/paid boundary, pricing status, quota, access duration, auth, AI scope, freshness, PDF, geography, and comparison scope | Not started |
| BETA-001 | P0 | Prepare and run the moderated customer beta | Founder — Product | Founder — Technical | DOC-001 decisions needed for participant-facing claims | Beta brief approved; 3 dummy scenarios ready; 6–8 participants targeted; one consented real-location run completed; findings and continue/revise/stop decision recorded | Backlog — next |
| DOC-002 | P1 | Reconcile the decision-shaping subset of `old docs/` | Founder — Product | Founder — Technical | Can begin alongside BETA-001 but cannot block it | Approximately 15–20 high-value sources classified; adopted decisions extracted; conflicts entered in the decision register; archive remains unchanged | Backlog — supporting |
| DOC-003 | P1 | Produce the lean requirements baseline | Founder — Product | Founder — Technical | DOC-001 and relevant DOC-002 findings | One-page product brief, lean MVP PRD, safety/scoring appendix, and prototype gap backlog are approved | Not started |
| BETA-002 | P1 | Instrument and technically prepare beta scenarios | Founder — Technical | Founder — Product | Customer beta brief and scenario definitions | Repeatable fixtures, session reset, dummy-data labels, minimum events, controlled real-data path, and failure states are verified | Not started |
| ENG-001 | P1 | Implement the feature-oriented frontend scaffold | Founder — Technical | Founder — Product | `PROJECT_SCAFFOLD_SPEC.md`; coordinate timing with BETA-002 | Characterization tests protect current behavior; feature, page, shared, fixture, and reference boundaries pass all scaffold quality gates | Planned |
| DOC-004 | P2 | Create full production governance documentation | Joint | Joint | Triggered by public beta, real PII, payments, real scoring, or a sold human-reviewed service | Legal, privacy, security, operations, data licensing, analytics, launch, and incident requirements meet the selected release gate | Deferred |

## Recommended sequence

1. Time-box `DOC-001` to one or two working days.
2. Start `BETA-001` and `BETA-002` preparation.
3. Run `DOC-002` as a bounded supporting pass while recruitment is in progress.
4. Complete `DOC-003` using only decisions and historical material that survived reconciliation.
5. Run the beta and record the resulting product decision.

## Explicit non-goals

- Classifying all 245 archived files before beta preparation
- Rewriting empty placeholders
- Treating historical `approved` labels as current approval
- Creating a complete production operating manual for a dummy-data prototype
- Using RICE before reach, impact, confidence, and effort inputs are measured
