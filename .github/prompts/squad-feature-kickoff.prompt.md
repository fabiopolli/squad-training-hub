---
title: "Squad: Feature Kickoff"
description: "Orchestrate feature planning with architect, decompose into tasks, create Jira epic + GitHub branch + Confluence page"
mode: "squad-tech-lead"
input: "Feature description, business context, scope, compliance requirements"
references:
  - "docs/MIGRATION_SCENARIO_CREDIT_SCORE.md"
  - ".github/INTEGRATION_GUIDE.md"
---

**Context**: Use MIGRATION_SCENARIO_CREDIT_SCORE.md for example + INTEGRATION_GUIDE.md for API patterns.

Orchestrate feature kickoff (Credit Score v1.0 migration):

1. **Restate Business Context** — Problem? Metric? Scope? Compliance gates (LGPD/BC)? In/Out boundaries?
2. **GitHub Integration** (see INTEGRATION_GUIDE § GitHub) — Create branch: `feature/cobol-score-migration` from main
3. **Jira Integration** (see INTEGRATION_GUIDE § Jira) — Create Epic SQUAD-200 with description, compliance tags, estimate (13-16 pts)
4. **Architect Review** — Invoke `#runSubagent SquadArchitect` to design system, data models, security, audit log, LGPD compliance. Wait ~30 min for ADR.
5. **Confluence Integration** (see INTEGRATION_GUIDE § Confluence) — Create page: "Credit Score v1.0 — Architecture & Design" + compliance matrix
6. **Decompose Tasks** — Create table: task ID, title, estimate, dependencies, AC, owner. Include audit/security AC.
7. **Validate Compliance** — Ensure LGPD audit trail requirements mapped to tasks. Security review gates in place.
8. **Create Subtasks** — For each task, create Jira sub-task with AC + acceptance criteria
9. **Notify Team** — Confluence: Update Decision Log. GitHub: Add PR template with compliance checklist.

Deliver: Jira epic + subtasks, ADR, GitHub branch, Confluence pages (design + compliance), team aligned.
