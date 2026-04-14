---
title: "Squad: Dev Task Handoff"
description: "Assign Java task to developer with AC, pattern guidance, audit/compliance expectations, and test requirements"
mode: "squad-tech-lead"
input: "Jira task ID, acceptance criteria, linked ADR, security/audit requirements"
references:
  - "docs/MIGRATION_SCENARIO_CREDIT_SCORE.md"
  - ".github/INTEGRATION_GUIDE.md"
---

**Context**: Task: SQUAD-200-1 (Build Credit Score API). Dev must include audit logging + regression tests vs Cobol.

Brief developer on task:

1. **Fetch Context** — Jira: SQUAD-200-1 description, AC, ADR link. Confluence: compliance matrix, security checklist. GitHub: feature/cobol-score-migration branch.
2. **Create Task Brief** — Task: "Build GET /api/scores/calculate/{cpf}". Patterns: Repository (PostgreSQL), Service (score logic), AuditService (LGPD), Controller (JWT auth). Tech: Spring Boot 3.5, PostgreSQL, Firestore (audit), JWT. Non-functional: <300ms, 99.95% uptime, 5K regression tests (bit-for-bit match vs Cobol), zero PII in logs.
3. **Compliance Checklist** — Include in brief: (1) Encrypt PII at rest, (2) Log EVERY score calculation (LGPD), (3) JWT auth enforced, (4) Rate limiting enabled, (5) Fallback to Cobol if DB down, (6) 5K regression vectors automated.
4. **Delegate to Developer** — Invoke `#runSubagent SquadJavaDeveloper` with full brief + GitHub PR template (see INTEGRATION_GUIDE § GitHub). Expect: PR with tests passing (80%+ coverage, 100% critical path), audit log validated, security review approved, regression tests 100% pass.
5. **Monitor Progress** — Daily standup. If stuck >2h, tech-lead helps. If blocked by security/compliance, escalate to architect.
6. **Review & Merge** — GitHub: Code review + compliance checklist. QA: regression tests + security scan. Merge if all pass + compliance signed off. Jira: move "QA Passed" → "Done".

Deliver: PR with tests (80%+ coverage, 100% critical), audit logging complete, security review passed, 5K regression tests passing, ready for production deployment.
