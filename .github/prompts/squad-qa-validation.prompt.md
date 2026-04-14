---
title: "Squad: QA Validation"
description: "Validate PR acceptance criteria, 5K regression tests, audit logging, security + LGPD compliance; approve or reject"
mode: "squad-qa-engineer"
input: "GitHub PR link or Jira ticket ID"
references:
  - "docs/MIGRATION_SCENARIO_CREDIT_SCORE.md"
  - ".github/INTEGRATION_GUIDE.md"
---

**Context**: Credit Score API must pass 5K regression vectors vs Cobol + LGPD audit logging validation.

Validate PR for merge readiness:

1. **Fetch PR Context** — GitHub PR (feature/cobol-score-migration), code changes, test results (unit + regression), JaCoCo report, Jira AC, security scan results.
2. **Validate Acceptance Criteria** — Check Jira SQUAD-200-1 AC against code: (1) API responds <300ms? (2) Regression vectors 5K pass? (3) Audit log complete (no missing scores)? (4) PII encrypted? (5) Fallback to Cobol works?
3. **Regression Testing** — Run 5K test vectors vs Cobol output. MUST: 100% match (bit-for-bit). Any mismatch → REVISIONS REQUESTED with root cause analysis.
4. **Analyze Coverage** — Overall coverage ≥80%? Critical path (score calculation, audit logging) 100%? If below, request tests. Flag any untested error paths.
5. **Audit Log Validation** — Sample audit log entries: (1) Score requested? (2) CPF masked? (3) Timestamp + scope recorded? (4) No PII in logs?
6. **Review Security Scans** — CodeQL + SAST: No secrets, SQL injection, XSS, insecure deserialization? JWT implementation correct? Rate limiting active? Flag critical findings.
7. **Compliance Checklist** — LGPD: Consentimento logged? BC: Latency <300ms confirmed? Fallback tested? Disaster recovery runbook updated?
8. **Sign-Off or Request Revisions** — All AC met + regression 100% pass + coverage OK + security/audit clear + compliance checklist signed → APPROVE. Else → REVISIONS REQUESTED with blocking items.
9. **Final Approval** — Once resolved: approve PR in GitHub, add label `qa-validated`, update Jira "QA Passed", notify TechLead + Manager for deployment decision.

Deliver: QA sign-off (APPROVED/REVISIONS REQUESTED) + regression test report (5K pass rate) + coverage + security + compliance matrix. NO EXCEPTIONS: must have 100% regression pass before prod deployment.
