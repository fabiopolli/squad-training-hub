---
applyTo: '**/*.yml,**/README.md'
---

# Squad Deployment Policy

> Deployments are reversible and evidence-driven. Every production deployment requires explicit approval.

## Versioning

**Format**: `v{MAJOR}.{MINOR}.{PATCH}` (e.g., v1.0.0, v1.1.0, v2.0.0)

## Deployment Stages

| Stage | Trigger | Approval | Duration |
|-------|---------|----------|----------|
| **Dev** | `git push` main | Automatic | Immediate |
| **Staging** | Tag `v*.*.*-rc*` | Tech-lead | 24-48h bake-in |
| **Prod** | Tag `v*.*.*` | Tech-manager + lead | Manual |

## Gates Before Deployment

> No exceptions. All gates must pass.

**Staging**: Tests ✓ | Coverage ≥75% ✓ | CodeQL ✓ | Release notes ✓

**Prod**: Staging complete ✓ | Perf baseline OK ✓ | Logs clean ✓ | Rollback tested ✓

## Rollback (SLA: <5 minutes)

**Trigger**: Error rate >10% | Latency p95 >2000ms | Data corruption

```bash
gcloud run deploy squad-service --image gcr.io/project/squad-service:v[PREVIOUS]
```

Keep 3 previous versions available. Post-mortem within 24h.
