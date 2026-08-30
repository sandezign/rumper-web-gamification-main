# Rumper Active Documentation

**Status:** Active working set  
**Established:** 2026-08-16  
**Owners:** Founder — Product and Founder — Technical

This directory contains the current working documentation for the Rumper prototype and customer-beta preparation.

The [`old docs/`](../old%20docs/) directory is historical source material. A document in that archive does not control current product or implementation decisions unless it is explicitly adopted through the active decision register.

## Current documents

| Document | Purpose | Status |
|---|---|---|
| [PRD-00: Master Overview & Central Requirements Specification](prd/PRD-00-overview-architecture.md) | Centralized baseline of all implemented product requirements, architecture, and telemetry | Approved / Active |
| [Documentation Backlog](DOCUMENTATION_BACKLOG.md) | Prioritized documentation work and completion gates | Active |
| [Customer Beta Plan](CUSTOMER_BETA_PLAN.md) | Moderated dummy-data and real-location beta plan | Backlog — next |
| [Old Documentation Reconciliation Plan](OLD_DOCS_RECONCILIATION_PLAN.md) | Time-boxed recovery of useful historical decisions | Backlog — supporting |
| [Project Scaffold Specification](PROJECT_SCAFFOLD_SPEC.md) | Target frontend boundaries and quality gates | Proposed |
| [Project Scaffold Implementation Plan](superpowers/plans/2026-08-16-project-scaffold.md) | Incremental, test-first folder migration | Ready for execution |
| [PRD-11: Personalized Buyer Decision Journey](prd/PRD-11-personalized-buyer-decision-journey.md) | Connects scenario-led priority discovery to explainable area and property evaluation | Proposed — Next Improvement |
| [PRD-13: Quota Lifecycle, Multi-Tier Pricing & Account Hub](prd/PRD-13-quota-pricing-account-management.md) | Upfront social login, quota lifecycle, 3-tier monetization, and account settings | Approved / Target Spec |
| [PRD-14: Multi-Property Switcher & Location Scenarios](prd/PRD-14-property-modal-location-switcher.md) | Multi-property switcher modal, quota telemetry, 1-location/multi-location/zero-quota scenarios, and GIS workspace sync | Approved / Active |

## Authority rule

Until a new decision register is approved, use this order when sources disagree:

1. A new decision jointly approved by both founders
2. Current active documentation in this directory
3. Current implementation as evidence of prototype behavior, not product policy
4. Explicitly adopted material from `old docs/`
5. Other archived proposals, plans, prompts, and templates
