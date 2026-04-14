---
title: "Squad: Design Review"
description: "Get architect validation before implementation; LGPD/BC compliance gates; approve or request revisions"
mode: "squad-tech-lead"
input: "Feature name, proposed design, integration points, constraints, compliance requirements"
references:
  - "docs/MIGRATION_SCENARIO_CREDIT_SCORE.md"
  - ".github/INTEGRATION_GUIDE.md"
---

**Context**: Credit Score API must include security + LGPD audit trail + fallback to Cobol.

Seek architect approval on design:

1. **Gather Design Input** — Feature: Credit Score v1.0. Architecture: Spring Boot 3.5 + PostgreSQL + Firestore audit. Constraints: <300ms latency, 99.95% uptime, 5K-vector regression tests, LGPD compliance, fallback to Cobol.
2. **Invoke Architect** — Run `#runSubagent SquadArchitect` to review: patterns, SOLID compliance, security (encryption, JWT, rate limiting), LGPD audit trail design, disaster recovery (RTO 4h, RPO 1h).
3. **Compliance Check** — Verify: PII encryption at rest + TLS in transit? Audit log immutable? Fallback strategy? Rate limiting (fraud prevention)?
4. **Evaluate Feedback** — Check: patterns appropriate? SOLID + security respected? Scalability + compliance addressed? Risk gaps closed?
5. **Iterate if Needed** — If feedback requires changes, revise design and resubmit until approved.
6. **Document Decisions** — Create ADR: Why Spring Boot? Why PostgreSQL? Why Firestore audit? Why fallback to Cobol? Document performance SLAs + security decisions.
7. **Update Confluence** — Confluence page: Add decision log entries. Add compliance matrix (LGPD § + BC § requirement → design component).
8. **Notify Team** — Approve design for implementation. Lock down compliance gates before dev starts.

Deliver: ADR + integration diagram + compliance matrix, architecture approved, compliance gates validated, team ready to implement with zero surprises.
