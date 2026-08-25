# Customer Beta Plan

**Status:** Documentation backlog — next  
**Target:** Moderated design-partner beta  
**Owners:** Founder — Product and Founder — Technical

## Objective

Determine whether first-time homebuyers can understand Rumper's evidence, uncertainty, critical red flags, and next verification actions without interpreting the product as a safety guarantee.

This beta validates comprehension, usability, and the real-data workflow. It does not validate scoring accuracy, geographic coverage, conversion rate, or willingness to pay at market scale.

## Cohort

Recruit 6–8 participants:

- 4–5 people actively searching for a home
- 1–2 people who purchased within the previous 12 months
- 1–2 prospective buyers expecting to search within six months

Primary selection criteria:

- First-time homebuyer or active buying-decision participant
- Searching in Jabodetabek
- Has shortlisted or previously evaluated a property
- Willing to complete a moderated session and provide consent for recording where applicable

## Test design

### Round 1 — Controlled dummy data

Distribute three scenarios across 5–6 participants, with at least two observations per scenario where scheduling permits.

1. **Strong headline score with a critical red flag** — tests whether the score masks the warning.
2. **Moderate location with meaningful trade-offs** — tests comprehension of commute, facilities, and flood confidence without a binary recommendation.
3. **Insufficient evidence** — tests whether users understand that missing evidence does not imply safety.

All dummy screens must be visibly labelled as simulated data.

### Round 2 — One consented real location

Use one real shortlisted location owned or explicitly authorized by a participant. Validate:

- Address and coordinate resolution
- Evidence retrieval and provenance
- Data freshness and geographic applicability
- Map/evidence alignment
- Evidence-gap handling
- Report-generation time
- Manual corrections and review workload
- Usefulness of resulting field actions

One location is a pipeline and comprehension check, not evidence that the scoring model or data coverage is generally accurate.

## Three-week outline

### Week 1 — Preparation

Founder — Product:

- Finalize screener, consent language, moderator guide, tasks, scenarios, and session questions
- Recruit and schedule participants
- Approve participant-facing claims and dummy-data labels

Founder — Technical:

- Build repeatable fixtures and reset behavior
- Add minimum analytics events
- Prepare controlled real-data flow and failure states
- Prevent real participant data from appearing in another participant's session

Joint:

- Approve safety rules and success criteria
- Run two internal dry runs
- Freeze non-critical feature work

### Week 2 — Dummy sessions

- Run 5–6 moderated sessions of approximately 45 minutes
- Review findings after every two sessions
- Fix only safety-critical or session-blocking problems during the round
- Preserve other findings for synthesis

### Week 3 — Real-data case and decision

- Obtain explicit location and recording consent
- Generate and jointly review the real-location report
- Conduct the real-case session
- Record evidence problems, manual work, errors, and participant interpretation
- Decide to continue, revise and retest, or narrow/stop

## Core participant tasks

- Explain what the report says about the location
- Identify the most important concern
- Identify which evidence is trustworthy and why
- Explain what remains uncertain
- Name one action to take during a site visit
- Find the corresponding evidence on the map
- Explain what the score does and does not mean
- Explain what additional value is expected from a paid report

## Directional success gates

| Measure | Gate |
|---|---:|
| Identifies the main red flag without help | At least 5 of 6 |
| Names a concrete verification action | At least 5 of 6 |
| Understands that the report is not a guarantee | At least 5 of 6 |
| Distinguishes strong evidence from evidence gaps | At least 4 of 6 |
| Completes the primary workspace journey without intervention | At least 4 of 6 |
| Finds map evidence corresponding to a finding | At least 4 of 6 |
| Says the output would change a question or action | At least 4 of 6 |
| Safety-critical misunderstanding | 0 tolerated |

These thresholds are qualitative decision gates, not statistically reliable market estimates.

## Minimum events

- Session started
- Scenario assigned
- Report opened
- Risk factor opened
- Evidence detail opened
- Map evidence selected
- Checklist item selected
- Locked content selected
- Upgrade explanation opened
- Session completed
- Error encountered

## Exit decision

Continue only when users understand red flags and uncertainty, the real report has traceable evidence, manual review is manageable, and no unresolved safety-critical misunderstanding remains.

