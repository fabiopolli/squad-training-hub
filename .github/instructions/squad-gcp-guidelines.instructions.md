---
applyTo: '**/*.tf,**/*gcp*.yml,**/Dockerfile,**/app.yaml'
---

# Squad GCP Deployment Guidelines

> GCP resources must follow least privilege principle. All decisions require architectural review.

## Choose Resources (Priority Order)

1. **Cloud Run** — Stateless microservices (preferred)
2. **Cloud Functions** — Event-driven, pay-per-invocation
3. **Cloud SQL** — Relational DB (PostgreSQL/MySQL)
4. **Firestore** — Document DB (flexible schema)
5. **GKE** — Only with architectural approval (complex orchestration)

## Security

> Never commit secrets. If leaked, rotate immediately and file incident.

- **Secrets**: Use GCP Secret Manager + Service Account bindings
- **Network**: VPC isolates dev/staging/prod environments
- **Load Secrets at Runtime**: Never hardcode in code

## Observability (Required)

> Without monitoring, you're blind. Validate before prod deployment.

- [ ] Health endpoint (`/health` → 200)
- [ ] Error rate alerts (>5%)
- [ ] Latency alerts (p95 >1000ms)
- [ ] Deployment notifications (Slack/email)

## Rollback (SLA: <5 minutes)

```bash
gcloud run deploy SERVICE --image gcr.io/project/SERVICE:v[PREVIOUS]
```

Keep 3 previous versions. Post-incident analysis: 24h.
