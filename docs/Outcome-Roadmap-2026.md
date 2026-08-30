# Rumper Outcome Roadmap 2026–2027

**Status:** Initial strategy and roadmap draft  
**Date:** 2026-08-28  
**Planning model:** Now–Next–Later with evidence-based release gates  
**Primary segment:** First-time homebuyers in Jabodetabek with meaningful commute and location-risk constraints

## Executive summary

Rumper has a strong interactive prototype for location discovery and property due diligence, but it does not yet have the production data, persistence, validation, or commercial infrastructure needed to make reliable real-world claims at scale.

The roadmap should therefore not begin by adding AI search, broad alerts, or more visual scoring. It should first prove that buyers understand Rumper's evidence and uncertainty, then connect a durable buyer-priority profile to the existing property workflow, and then replace mock evidence with a narrow, traceable real-data pipeline.

The strategic sequence is:

1. **Now — prove trust and decision usefulness.**
2. **Next — make buyer priorities durable and useful across the journey.**
3. **Next — make a narrow real-location report operationally trustworthy.**
4. **Later — scale discovery, grounded assistance, and proactive intelligence.**

This sequence intentionally rejects false precision. A personalized 0–100 neighborhood score is not recommended as the core product outcome. Rumper should explain **fit, material trade-offs, critical red flags, and unknowns**. If any number is retained, it must be deterministic, inspectable, and secondary to the explanation.

---

## 1. Strategic foundation

### Vision

Help first-time homebuyers make location decisions they can explain, verify, and discuss before committing money.

Rumper should become the buyer-side decision layer between fragmented property information and a real purchasing decision. It should not make the decision for the buyer.

### Beachhead segment

**Primary:** First-time buyers or couples actively evaluating homes in Jabodetabek who have a real commute constraint and at least one shortlisted property or area.

**Core job to be done:**

> When I am comparing homes and locations using fragmented information, help me understand which trade-offs fit my daily life, identify material risks and unknowns, and turn them into concrete checks before I pay a booking fee or deposit.

**Why this segment first:**

- Commute and flood/access risk create frequent, high-consequence trade-offs.
- Buyers already combine portals, Google Maps, social content, sales claims, and site visits manually.
- A concrete shortlisted location makes Rumper's decision impact easier to observe than broad inspiration or browsing behavior.

**Critical caveat:** Segment demand and willingness to pay remain hypotheses. The current beta plan does not validate market-scale demand or pricing.

### Relative cost position

Rumper should compete on **trusted, differentiated decision value**, not lowest-cost search volume.

- Start with narrow geographic coverage and controlled or human-reviewed evidence.
- Partner for commodity data such as routing, geocoding, base maps, and official hazard sources.
- Build Rumper's differentiated layer: priority discovery, evidence interpretation, uncertainty handling, verification actions, and decision continuity.

### Value proposition

| Before | How Rumper helps | After | Current alternatives |
|---|---|---|---|
| Buyers judge locations mainly by price, distance, and sales claims. | Scenario-led priority discovery exposes real trade-offs. | Buyers can explain what they must protect, what is flexible, and why. | Spreadsheets, partner discussions, portal filters. |
| Evidence is fragmented and difficult to interpret. | Rumper connects risks, evidence strength, map context, and unknowns. | Buyers understand the most material concern and what remains uncertain. | Google Maps, government maps, social media, local anecdotes. |
| Site visits are inconsistent and easily influenced by sales pressure. | Rumper converts evidence gaps into staged verification tasks. | Buyers arrive with concrete questions and record what they learn. | Notes apps, memory, generic inspection checklists. |
| Couples compare options using different implicit priorities. | A shared decision language makes trade-offs visible. | Buyers can discuss disagreements before financial commitment. | Chat messages, informal discussion, spreadsheets. |

### Explicit trade-offs

Rumper should not prioritize the following before the core trust loop is validated:

- Becoming a property marketplace or nationwide listing portal.
- Producing “best neighborhood” rankings.
- Using opaque numeric fit or confidence scores.
- Providing “buy” or “do not buy” recommendations.
- Launching autonomous AI answers without a traceable evidence bundle.
- Monitoring every zoning, climate, crime, school, and development dataset simultaneously.
- Optimizing map infrastructure for massive listing volume that Rumper does not yet have.
- Building native mobile apps before responsive web behavior is validated.

### Strategy coherence

The segment, value proposition, and capabilities reinforce one another only if Rumper remains narrow and evidence-led. Expanding coverage too early weakens the central promise because incomplete or stale data can look authoritative even when the interface is careful.

### Growth approach

Rumper should begin with **research-led product growth**, then move toward product-led growth only after the real-data workflow and decision value are repeatable.

- **Initial acquisition:** founder-led recruitment, homebuyer communities, educational content about commute/flood/access trade-offs, and referrals from recent buyers.
- **Activation:** a buyer evaluates one genuine shortlist decision and leaves with a changed question or verification action.
- **Retention:** the buyer returns with a second property, revises priorities, or completes field-verification tasks.
- **Monetization test:** a clearly scoped per-location or human-reviewed report before considering subscription economics.
- **Later channels:** mortgage advisors, buyer agents, inspectors, and relocation partners only if buyer-side independence and disclosure rules are protected.

Unit economics are currently unknown. Provider costs, human-review time, support burden, refund exposure, and repeat-location behavior must be measured before selecting a scalable commercial model.

---

## 2. What Rumper has now

The current implementation is evidence of prototype behavior, not proof of production capability.

### Capability status labels

Use two labels together. **Delivery status** describes what exists today; **roadmap horizon** describes when the next meaningful capability improvement is expected.

#### Delivery status

| Label | Meaning |
|---|---|
| `BUILT — PROTOTYPE` | The user-facing flow works in the current application, but this does not imply production data, persistence, scale, or validation. |
| `PARTIAL — PROTOTYPE` | Some interface or workflow exists, but a defining capability is missing. |
| `UI ONLY` | The interface exists, but the underlying service, intelligence, or enforcement does not. |
| `NOT STARTED` | No meaningful implementation evidence exists. |
| `PRODUCTION READY` | Live, governed, monitored, and validated for its stated scope. No current capability receives this label yet. |

#### Roadmap horizon

| Label | Meaning |
|---|---|
| `NOW` | Validation, decisions, and safety work in the current 0–8 week horizon. |
| `NEXT 1` | Personalized decision continuity after the Now release gate. |
| `NEXT 2` | Trusted real-location evidence after personalization foundations and governance decisions. |
| `LATER` | Scale or expansion only after narrow real-data quality and demand are demonstrated. |
| `NOT PRIORITIZED` | Intentionally outside the current strategy. |

### Capability status register

| Capability | Delivery status now | Data/service maturity | Next roadmap label | Main gap or next outcome |
|---|---|---|---|---|
| Scenario-based onboarding | `BUILT — PROTOTYPE` | Local state and scripted scenarios | `NEXT 1` | Persist an inspectable priority profile and carry it into evaluation. |
| Buyer Priority / Location DNA profile | `PARTIAL — PROTOTYPE` | Inputs exist; durable profile does not | `NEXT 1` | Confirm, edit, version, recover, and explain inferred priorities. |
| Curated area map | `BUILT — PROTOTYPE` | Mock curated area dataset | `NEXT 1 → NEXT 2` | Personalize fit first, then replace decision-critical area evidence with governed data. |
| Area shortlist | `BUILT — PROTOTYPE` | Local session state | `NEXT 1` | Persist shortlist state and connect it to the confirmed profile. |
| Side-by-side area comparison | `BUILT — PROTOTYPE` | Mock corridor comparison | `NEXT 1` | Compare fit, trade-offs, red flags, and unknowns against confirmed priorities. |
| Property risk summary | `BUILT — PROTOTYPE` | Predominantly fixture scores and evidence | `NEXT 2` | Use traceable real evidence while preserving visible uncertainty. |
| Risk-factor breakdown | `BUILT — PROTOTYPE` | Predominantly fixture evidence | `NEXT 2` | Define deterministic scoring contracts, provenance, freshness, and review rules. |
| Interactive evidence map | `BUILT — PROTOTYPE` | Leaflet works; most analytical layers are fixtures | `NEXT 2` | Connect selected live evidence sources and verify finding-to-map alignment. |
| Commute analysis / validator | `PARTIAL — PROTOTYPE` | Fixed routes, destinations, and times | `NEXT 2` | Add user anchors, live peak-time routing, thresholds, provenance, and fallback states. |
| Facilities view | `BUILT — PROTOTYPE` | Mock POIs and fixed categories | `NEXT 2` | Introduce licensed, fresh POI retrieval for decision-critical categories. |
| Verification checklist | `BUILT — PROTOTYPE` | Local interaction; limited continuity | `NEXT 1` | Personalize task priority and persist field findings across the decision journey. |
| AI assistant (Rumper Advisor) | `PARTIAL — PROTOTYPE` | UI shell built; contextual in-line card triggers & bidirectional action chips in design | `NEXT 1 → LATER` | **Phase 1 (Next 1):** In-line card triggers, 5-domain spatial prompt library, typewriter streaming simulator, and bidirectional action chips (`Sorot di Peta`, `Tambah ke Checklist`). <br>**Phase 2 (Later):** Report-grounded RAG backend with BNPB/InaRISK spatial telemetry and strict score-guardrails. |
| Entitlements and quota | `UI ONLY` | Local UI state; no payment or backend enforcement | `NOW → NEXT 2` | Resolve commercial terms now; implement governed enforcement only for a paid beta. |
| Responsive web experience | `BUILT — PROTOTYPE` | Functional responsive UI | `NOW` | Validate usability, accessibility, and safety comprehension with target users. |
| Risk and material-change alerts | `NOT STARTED` | No monitoring or notification service | `LATER` | Start with one or two reliable monitored sources in a narrow geography. |
| Advanced school and crime intelligence | `NOT STARTED` | Basic school POIs only; no deep dataset | `LATER` | Resolve relevance, bias, source quality, granularity, licensing, and freshness. |
| POI heatmaps and large-result map optimization | `NOT STARTED` | Basic pins and filters exist | `LATER` | Build only when measured data volume or usability evidence justifies it. |
| Couple or household collaboration | `NOT STARTED` | No shared account or decision state | `LATER` | Add shared priorities, shortlist, disagreements, and verification history. |

**Important:** A `BUILT — PROTOTYPE` label must never be shortened to “built” in stakeholder reporting because that would hide the mock-data and validation gap.

### Current strategic assets

- A coherent buyer-side due-diligence workflow.
- An explainable evidence pattern: claim or finding → evidence → limitation → action.
- A differentiated scenario-led approach to discovering priorities.
- Map and workspace interactions that can be tested with users now.
- Clear safety principles around critical red flags and unknown evidence.

### Current strategic liabilities

- Mock data can be mistaken for real intelligence.
- Conflicting score philosophy exists across documents.
- No durable buyer profile or cross-session continuity.
- No production evidence pipeline, provenance model, or freshness enforcement.
- No validated willingness to pay.
- No current defensibility beyond product concept and execution quality.

---

## 3. Gap map for proposed capabilities

| Capability | Have now | Gap to close next | Later expansion |
|---|---|---|---|
| Personalized neighborhood fit | Qualitative area categories, fixed scores, onboarding inputs | Persistent confirmed priority profile; explainable fit/trade-off/unknown output; safety-independent red flags | Broader area coverage and household/couple profiles |
| Commute validation | Fixed route cards, warnings, and map polylines | Custom anchors, live routing, peak-time scenarios, thresholds, provenance and fallback states | Multi-day reliability ranges, disruption patterns, cost and multimodal optimization |
| Risk intelligence | Flood/liquefaction fixtures, evidence labels, red flags | Narrow official-source ingestion, source dates, geographic applicability, human-review workflow | Zoning, planned infrastructure, development, climate change, and notification monitoring |
| Conversational experience (Rumper Advisor) | Assistant UI drawer & static example messages | Contextual in-line card buttons, 5-domain prompt library, typewriter streaming simulator, and bidirectional action chips (`Sorot di Peta`, `Tambah ke Checklist`) | Report-grounded RAG backend with strict BNPB context isolation, citations, and natural-language area discovery |
| Map performance | Leaflet map, layers, filters, full-screen modes | Measure real bottlenecks; improve only where beta evidence shows friction | Clustering, vector tiles, density layers, and heatmaps when dataset volume warrants them |
| School and crime depth | Basic school POIs; no meaningful crime dataset | Define decision relevance, source licensing, granularity, freshness, and ethical presentation | Trends, boundaries, reviews, and street-level data only where source quality is defensible |
| Side-by-side comparison | Working area matrix | Tie comparison rows to confirmed priorities; foreground material differences and unknowns | Collaborative comparison and partner decision history |

---

## 4. Outcome roadmap

Roadmap windows are intentionally flexible. Progression depends on meeting release gates, not merely completing feature output.

| Horizon | Primary customer outcome | Business learning/outcome | Release gate |
|---|---|---|---|
| **Now: 0–8 weeks** | Understand the main concern, uncertainty, and next action | Decide whether the core proposition merits further investment | Comprehension and safety gates pass; one real-location workflow is credible |
| **Next 1: 2–4 months** | Carry confirmed priorities into evaluation | Demonstrate that personalization changes investigation behavior | Profile is durable and inspectable; safety invariants pass |
| **Next 2: 4–8 months** | Evaluate a real location with traceable evidence | Establish a viable limited-beta operating and payment model | Evidence quality, manual effort, governance, and paid-test gates pass |
| **Later: 8–14+ months** | Receive grounded guidance and material-change intelligence | Expand qualified coverage and repeat use without weakening trust | Narrow real-data quality and demand are demonstrated first |

### NOW — Prove trust and decision usefulness

**Indicative window:** 0–8 weeks  
**Strategic intent:** Establish whether Rumper's core evidence-and-verification proposition helps real buyers without creating false confidence.

#### Outcome statement

Enable first-time Jabodetabek buyers to identify the most material location concern, distinguish evidence from uncertainty, and name a concrete verification action so that Rumper can justify further investment in real-data and personalization capabilities.

#### Existing outputs to use

- Current five-stage due-diligence workspace.
- Controlled dummy-data scenarios.
- Existing risk, commute, facilities, map, and checklist prototype.
- Curated area shortlist and comparison.

#### Work that may support the outcome

- Resolve the product decision register: product stage, scoring authority, review model, AI scope, geography, commercial terms, and data freshness.
- Label all simulated data unambiguously.
- Add the minimum beta analytics events.
- Prepare repeatable scenario resets and failure states.
- Run moderated sessions with 6–8 target participants.
- Test one consented real location with traceable evidence and record manual effort.
- Validate responsive usability, evidence/map alignment, and safety interpretation.

#### Success gates

- At least 5 of 6 participants identify the main red flag without help.
- At least 5 of 6 name a concrete verification action.
- At least 5 of 6 understand that the report is not a guarantee.
- At least 4 of 6 distinguish strong evidence from evidence gaps.
- At least 4 of 6 complete the primary journey without intervention.
- Zero safety-critical misunderstandings tolerated.
- One real-location report has traceable sources, visible uncertainty, documented manual corrections, and an acceptable generation workflow.

#### Decision at the end of Now

- **Continue:** comprehension gates pass and the real-location workflow is credible.
- **Revise and retest:** value is visible but users misunderstand evidence, scoring, or navigation.
- **Narrow or stop:** users do not change questions/actions, or the real-data workflow is too unreliable or expensive.

---

### NEXT 1 — Create personalized decision continuity

**Indicative window:** 2–4 months after the Now gate  
**Strategic intent:** Turn disconnected onboarding and property evaluation into one inspectable decision journey.

#### Outcome statement

Enable buyers to carry confirmed daily-life priorities into area and property evaluation so that Rumper produces explanations and verification tasks that feel personally relevant without hiding absolute safety risks.

#### Candidate outputs

- Durable, versioned Buyer Priority Profile.
- Scenario-to-priority mapping with visible reasoning.
- Confirm, edit, remove, and dealbreaker controls.
- Personalized property summary: what fits, material trade-off, unknowns, critical red flags.
- Anchor-aware commute emphasis.
- Checklist ordering based on confirmed priorities.
- Personalized side-by-side area comparison.
- Generic fallback when no profile exists.

#### Success indicators

Targets require a measured baseline. Initial directional indicators:

- Priority-discovery completion rate.
- Priority-profile confirmation and edit rates.
- Percentage of property evaluations using a confirmed profile.
- At least 4 of 6 moderated users can explain why a result fits or conflicts with their priorities.
- At least 4 of 6 say personalization changes what they investigate or compare.
- Critical red-flag suppression incidents: zero.
- Unknown evidence rendered as safe: zero.
- Profile persistence or migration data loss: zero in release testing.

#### Dependencies and gates

- Scenario mappings approved through research, not generated by AI.
- Persistence scope decided: local prototype, account, or backend.
- Absolute risk severity remains independent of preference weights.
- The 0–100 fit-score conflict is resolved. Recommended decision: use qualitative fit categories and explanations; retain numbers only for transparent absolute measurements.

---

### NEXT 2 — Operationalize trusted real-location evidence

**Indicative window:** 4–8 months after the Now gate  
**Strategic intent:** Replace the most decision-critical fixtures with a narrow production-quality evidence pipeline.

#### Outcome statement

Enable buyers to evaluate a real shortlisted location using fresh, traceable commute, hazard, and facility evidence so that Rumper can run a trustworthy limited beta and test willingness to pay.

#### Candidate outputs

- Address and coordinate resolution with correction workflow.
- Source registry with owner, license, coverage, update cadence, and permitted claims.
- Live commute routing for user-defined anchors and selected peak times.
- Saved commute thresholds and clear “within/outside your tolerance” explanations.
- Narrow flood and access-risk ingestion for selected Jabodetabek coverage.
- Facility retrieval for decision-critical categories.
- Evidence provenance, freshness labels, geographic applicability, and missing-data states.
- Human-review queue for ambiguous or high-impact evidence.
- Secure report persistence and participant-data separation.
- Limited paid or concierge beta only after commercial terms and governance are approved.

#### Success indicators

- Real-location reports meet an agreed completeness threshold for the selected coverage area.
- Every material claim has a traceable source or is explicitly marked unknown.
- Unsupported critical-claim rate: zero in the reviewed release set.
- Address/coordinate correction rate is measured and declines across iterations.
- Report turnaround and manual-review minutes are low enough to support the chosen business model.
- A majority of beta users say the report changes a question, site-visit action, or comparison decision.
- Willingness-to-pay is tested separately; prototype upgrade clicks are not treated as purchase intent.

#### Dependencies and gates

- Data licensing and terms of use.
- Privacy, security, retention, and incident requirements.
- Provider cost and rate-limit model.
- Human-review ownership and service-level expectation.
- Clear refund, support, access-duration, and per-location pricing scope.

---

### LATER — Scale grounded discovery and proactive intelligence

**Indicative window:** 8–14+ months; only after narrow real-data quality and demand are demonstrated  
**Strategic intent:** Expand the decision system without weakening trust.

#### Outcome 1: Grounded conversational guidance

Enable buyers to ask natural-language questions about an active property or curated area and receive evidence-linked answers so that they can investigate complex trade-offs without manually navigating every report section.

Possible outputs:

- Report-grounded assistant with citations and source dates.
- Active-property and active-profile context isolation.
- Reviewed evaluation set for unsupported claims and safe uncertainty handling.
- Suggested actions that add directly to the verification checklist.

Natural-language listing or neighborhood search should come later than report-grounded Q&A because it requires broader, normalized inventory and ranking-quality evidence.

#### Outcome 2: Proactive material-change awareness

Enable buyers with shortlisted areas or properties to learn when a material external condition changes so that they can revisit a decision before financial commitment.

Possible outputs:

- Zoning and planned-development monitoring.
- Infrastructure project timelines.
- Selected climate-hazard changes.
- Plain-language impact summaries.
- Alert subscriptions with relevance and confidence controls.

This should start with one or two reliable sources and a narrow geography. “All risk alerts” is not a credible first release.

#### Outcome 3: Better household decisions

Enable couples to compare priorities, disagreements, and unresolved questions in one shared workspace so that they can reach decision readiness with fewer hidden assumptions.

Possible outputs:

- Couple or household profile linking.
- Shared shortlist and comparison.
- Priority-conflict explanations.
- Shared verification tasks and notes.

#### Outcome 4: Deeper area intelligence where it changes decisions

Enable buyers to understand school, safety, amenity, and neighborhood-change evidence at an appropriate geographic level so that important quality-of-life factors are not reduced to nearby POI counts.

Possible outputs:

- School boundaries and enrollment trends where licensed and reliable.
- Multi-year safety or incident trends with careful normalization.
- POI density layers and access-time surfaces.
- Neighborhood development and infrastructure context.

Crime and school data require special care. Granularity, bias, incomplete reporting, and licensing can make superficially detailed data misleading.

#### Later-stage success indicators

- Grounded-answer success rate on a human-reviewed test set.
- Unsupported material claims: zero release-blocking incidents.
- Percentage of assistant sessions that produce a useful evidence view or verification action.
- Alert relevance rate and mute/unsubscribe rate.
- Household comparison completion and resolved-unknown rate.
- Expansion in qualified area coverage without degradation in evidence completeness or freshness.

---

## 5. Outcome-to-output traceability

This table prevents feature completion from being mistaken for success.

| Requested output | Underlying outcome | Earliest roadmap horizon | Why not earlier |
|---|---|---|---|
| Personalized fit score | Buyers understand why an option fits and what it compromises | Next 1 | Requires a durable, confirmed profile and a scoring-policy decision. |
| Live commute validator | Buyers test whether daily travel remains within their tolerance | Next 2 | Requires live providers, custom anchors, failure handling, and cost controls. |
| Risk and change alerts | Buyers notice material external changes before commitment | Later | Requires reliable monitored sources, relevance logic, and notification governance. |
| AI conversational search | Buyers investigate complex preferences with less navigation effort | Later | Requires grounded evidence and normalized searchable inventory first. |
| POI heatmaps | Buyers understand access patterns beyond individual pins | Later | Current data volume does not justify this before core map usability is validated. |
| Deep school and crime data | Buyers evaluate quality-of-life factors with appropriate context | Later | Source quality, bias, licensing, and granularity remain unresolved. |
| Weighted side-by-side comparison | Buyers compare options against their own priorities | Next 1 | Basic comparison already exists; personalization is the missing layer. |

---

## 6. Metrics framework

### North Star Metric

**Location Discovery Readiness Rate**  
The percentage of qualified users who finish with:

1. a confirmed, explainable priority profile;
2. at least one area or property they understand well enough to investigate seriously; and
3. at least one material verification action or explicitly accepted trade-off.

This definition should be operationalized only after event instrumentation and baseline observation.

### Current One Metric That Matters

**Material Decision Impact Rate**  
The percentage of moderated beta users who can name a question, comparison, or field action they would change because of Rumper.

This is more appropriate now than conversion because the current beta cannot establish market demand or pricing at scale.

### Guardrail metrics

- Safety-critical misunderstanding: zero tolerated.
- Critical red flag hidden by personalization: zero.
- Missing evidence presented as safe: zero.
- Unsupported material AI claim: zero at release gate.
- Cross-property or cross-user context leakage: zero.
- Stale evidence shown without a freshness warning: zero for material claims.

### Business learning metrics

- Qualified beta recruitment and completion.
- Percentage of participants willing to submit a real shortlisted location.
- Repeat use for a second property or area.
- Report generation and review cost per location.
- Paid-intent interview evidence followed by an actual payment experiment.
- Refund, support, and unclear-scope rates during paid testing.

---

## 7. Capabilities required to win

### Build as Rumper's core

- Scenario design and priority-inference logic.
- Explainable profile and fit/trade-off/unknown model.
- Evidence interpretation and materiality rules.
- Decision-readiness and verification-task engine.
- Safety guardrails and uncertainty presentation.
- Cross-journey continuity from priority → area → property → verification.
- Local editorial and research expertise for Jabodetabek buyer decisions.

### Partner or license

- Base maps and geocoding.
- Routing and traffic estimates.
- Official hazard and planning datasets.
- POI and transit data.
- Payments, authentication, notifications, and analytics infrastructure.

### Operate deliberately

- Source registry and licensing review.
- Data freshness and geographic coverage monitoring.
- Human review for ambiguous material evidence.
- Privacy, consent, retention, and incident response.
- Moderated research and continuous claim-comprehension testing.

---

## 8. Defensibility: honest assessment

Rumper does **not yet have a durable moat**. The current interface, map interactions, and feature concepts can be copied.

Potential defensibility can emerge from:

- A longitudinal buyer-priority model linked to real decisions and revisions.
- A structured local evidence graph connecting claims, sources, limitations, and actions.
- A growing library of Jabodetabek-specific decision patterns and verification outcomes.
- Trust earned through consistent uncertainty handling and buyer-side independence.
- Workflow switching costs when couples maintain priorities, shortlists, evidence, and verification history in one place.

These become defensible only through real usage, reliable data operations, and accumulated structured learning—not through adding AI alone.

---

## 9. Critical hypotheses and low-cost experiments

| Hypothesis that must be true | Confidence | Low-cost experiment | Decision signal |
|---|---|---|---|
| Buyers understand and value evidence gaps rather than seeing them as product failure. | Medium | Moderated dummy scenarios with explicit unknowns. | At least 4 of 6 correctly distinguish gaps and still find the report useful. |
| Scenario-led discovery reveals priorities better than a conventional preference form. | Medium | Compare scenario flow with a short direct-weight form in interviews. | Scenario users articulate more specific trade-offs without materially worse completion. |
| A personalized explanation changes investigation behavior. | Medium | Show generic versus personalized summaries for the same property. | At least 4 of 6 choose different questions, evidence, or comparisons after personalization. |
| Commute is a strong enough beachhead pain to drive repeated use or payment. | Low–Medium | Concierge rush-hour commute report for real shortlisted homes. | Users request another location or complete a real payment test. |
| A narrow real-data report can be produced at acceptable cost and reliability. | Low | Process five consented locations manually with time tracking and error logs. | Coverage, review time, and correction rates meet an agreed service model. |
| Buyers will pay for decision confidence before booking fee or deposit. | Low | Offer a clearly scoped paid concierge report after free preview. | Completed payments, not stated interest, justify commercial investment. |
| Proactive change alerts are materially useful during the buying window. | Low | Manual weekly digest for a small shortlist cohort. | Users open alerts and take a documented follow-up action. |

---

## 10. Sequencing principles

1. Validate the decision outcome before scaling data coverage.
2. Validate the data workflow before automating it.
3. Ground AI in reviewed evidence before using AI for discovery or ranking.
4. Preserve absolute risk independently of buyer preference.
5. Add dataset breadth only when it changes a real buyer decision.
6. Use release gates instead of feature-completion deadlines.
7. Do not infer market demand from prototype engagement.
8. Revisit this roadmap after every beta round and major source-integration test.

---

## 11. Immediate decisions required

The founders should resolve these before Next 1 begins:

1. Is Rumper's primary entry point priority discovery, a real property check, or both with separate paths?
2. Will personalized fit use qualitative categories only, or a transparent numeric score as secondary information?
3. Which three evidence categories are mandatory for the first real-location report?
4. What geographic boundary defines the initial supported area?
5. Is the initial service self-serve software, a human-reviewed report, or a hybrid?
6. What does payment unlock: one location, a time-limited pass, a subscription, or analyst review?
7. What persistence model is appropriate before account authentication exists?
8. Who is accountable for approving a material evidence claim and its freshness?

---

## 12. Source basis

This roadmap prioritizes the active documentation and treats implementation as prototype evidence in accordance with [docs/README.md](README.md).

Primary inputs:

- [Product definition](../PRODUCT.md)
- [Customer beta plan](CUSTOMER_BETA_PLAN.md)
- [Documentation backlog](DOCUMENTATION_BACKLOG.md)
- [Core workspace architecture](prd/PRD-00-overview-architecture.md)
- [Personalized buyer decision journey](prd/PRD-11-personalized-buyer-decision-journey.md)
- [Curated areas, shortlist, and comparison](prd/PRD-12-curated-areas-map-and-shortlist.md)
- Current React implementation under `src/`

The broader MVP and solution documents in the companion documentation repository informed strategic hypotheses but do not override the active-document authority rule.
