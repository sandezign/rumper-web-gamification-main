# Old Documentation Reconciliation Plan

**Status:** Documentation backlog — supporting  
**Priority:** P1; must not block customer-beta preparation  
**Owners:** Founder — Product and Founder — Technical

## Decision

Retain the previous organization plan, but reduce it to a time-boxed reconciliation of decision-shaping sources. Do not organize, rename, or rewrite the entire archive.

The [`old docs/`](../old%20docs/) directory remains unchanged as historical evidence.

## Scope

Review approximately 15–20 documents that can materially change:

- Product positioning and target customer
- Prototype versus customer-facing operating model
- Human-review boundary
- Evidence and scoring safeguards
- Authentication and data handling
- Workspace structure
- Free/premium entitlements
- Pricing status
- Report lifecycle and freshness
- Real-data beta safety

Start with the archive's current-product context, reconciliation notes, validation assumptions, decision records, scoring specification, data model, workspace PRDs, entitlement model, pricing specifications, lifecycle model, and risk register.

## Outputs

### 1. Source disposition table

For each selected source, record:

- Source and date
- Claimed status
- Topic
- Current relevance
- Conflicts
- Disposition: `adopt`, `revise`, `reference`, `supersede`, or `archive`
- Content to extract
- Decision owner

### 2. Decision register

Record one controlling decision for every material conflict. Each entry must include:

- Decision
- Owner
- Date
- Rationale
- Product and technical consequences
- Historical sources superseded
- Review trigger

### 3. Adoption links

Move no historical file. Link adopted material from the new active document and state exactly which sections remain applicable.

## Time box

- Initial triage: 0.5 working day
- Joint conflict review: 0.5 working day
- Decision and adoption pass: 1 working day
- Maximum initial investment: 2 working days

If unresolved decisions exceed the time box, log them with an owner and continue beta preparation using explicit temporary assumptions that do not create safety or participant-data risk.

## Completion criteria

- No historical document silently controls current scope
- Build-blocking conflicts are in the decision register
- The lean product brief and MVP PRD have identifiable source lineage
- Placeholder files are ignored rather than rewritten
- `old docs/` remains recoverable and unchanged
- Beta preparation was not delayed by archive cleanup

## Deferred archive work

A complete 245-file inventory, folder cleanup, duplicate removal, or production governance migration remains deferred until the project commits to a public beta or adds contributors who need a broader shared knowledge base.

