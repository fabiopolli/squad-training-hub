---
title: "Squad: Deployment Checklist"
description: "Pre-prod validation, blue-green deploy, compliance gates, monitoring, fallback to Cobol if critical issues"
mode: "squad-tech-manager"
input: "Version tag (e.g., v1.0.0) and deployment target (staging/prod)"
references:
  - "docs/MIGRATION_SCENARIO_CREDIT_SCORE.md"
  - ".github/INTEGRATION_GUIDE.md"
---

**Context**: Credit Score API migration. Prod deployment requires: compliance sign-off, fallback plan to Cobol, 24h monitoring.

Validate and deploy to production:

1. **Pre-Deployment Gate** — Check:
   - CI green? QA approved (5K regression 100% pass)? Code review approved? Security scan clear (zero critical)?
   - Release notes + Jira epic SQUAD-200 closed?
   - Rollback plan documented (SLA <30s back to Cobol)?
   - Database backups tested? RTO 4h, RPO 1h?
   - Compliance sign-off: LGPD audit log + BC latency <300ms confirmed?
   - Monitoring alerts configured (error rate >1%, latency p95 >500ms)?
   - If ANY fails: stop. Escalate to architect.

2. **Staging Validation** — Tag v1.0.0-rc1. Deploy to staging (blue-green). Run:
   - 100 sample scores vs Cobol (bit-for-bit match)
   - Load test: 1000 concurrent requests (measure latency p95, p99)
   - Audit log verification (sample entries)
   - Fallback test (kill DB, verify automatic rollover to Cobol)
   - 24-48h soak (monitor error rate, latency, DB connections)
   - Compliance checklist final review (LGPD, BC, security)
   - If issues found, fix + re-test in staging. No fast-track to prod.

3. **Production Deploy** — Tag v1.0.0. Requires: Tech Manager + Tech Lead approval. Steps:
   - Blue-green setup: Route 0% traffic to v1.0.0 (green) initially
   - Canary: 10% traffic → v1.0.0 for 15m (monitor error rate, latency)
   - If OK: 50% traffic for 30m
   - If OK: 100% traffic (all traffic to v1.0.0)
   - Rollback trigger: Error rate >5% OR latency p95 >500ms OR audit log gaps → auto-rollback to v0.x (Cobol fallback) within 30s
   - Slack notifications at each step

4. **Health Checks + Monitoring (24 hours)** — Post-deploy:
   - Error rate <1% (target: <0.5%)
   - Latency p95 <400ms, p99 <600ms
   - Database responding (connection pool healthy)
   - Audit log ingestion: 100% of scores logged to Firestore
   - PII: Zero PII in logs (random sample audit)
   - Zero fallback events (Cobol not triggered)
   - Slack hourly updates (first 4h), then 6-hourly

5. **Beyond 24 Hours** — If no issues:
   - Update Jira SQUAD-200 "Deployed to Prod"
   - Publish metrics to stakeholders (Serasa, BC, Compliance)
   - Schedule retrospective (48h post-deploy)
   - Documentation: Runbook updated + known issues + next improvements

6. **Rollback if Needed** — Trigger conditions:
   - Error rate >5% for >5 min → auto-rollback to v0.x + alert team
   - Audit log gaps (scores not logged) → manual alert (may need data recovery)
   - Latency p95 >500ms sustained → investigate (may be expected under load)
   - Critical security finding → immediate rollback + investigation
   - SLA: Rollback execution <30s, team notification <1 min

7. **Post-Mortem** — If rollback occurred:
   - Root cause analysis (48h deadline)
   - Fix + regression tests + staging validation
   - Deploy v1.0.1 (or stay on v0.x longer)
   - Lessons learned: update deployment checklist

8. **Success Report** — If no rollback:
   - Email stakeholders: v1.0.0 live, metrics nominal, compliance signed off
   - Confluence: Update deployment log + decision rationale
   - Jira: Close epic SQUAD-200
   - Team: Celebrate! 🎉

Deliver: Service live in production (v1.0.0 or rolled back with root cause), team notified, compliance validated, metrics published, runbook updated.
