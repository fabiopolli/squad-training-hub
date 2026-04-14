# Squad Registry & Team Mapping

## Agent Team Composition

```markdown
| Role | Agent File | Expertise | Tools | Invocation |
|------|-----------|-----------|-------|-----------|
| Tech Manager | squad-tech-manager.agent.md | Sprint planning, escalations, status reports | read, edit, search, web, agent | `/plan-sprint`, `/escalate-blocker` |
| Tech Lead | squad-tech-lead.agent.md | Planning, design review, task decomposition | read, edit, search, web, agent | `/squad-feature-kickoff`, `#runSubagent` |
| Architect | squad-architect.agent.md | Architecture decisions, ADRs, patterns | read, edit, search, web, agent | `#runSubagent squad-architect` (via tech-lead) |
| JAVA Developer | squad-java-developer.agent.md | Implementation, testing, code quality | execute, read, edit, search, web, agent | `/squad-dev-task-handoff`, `#runSubagent` |
| QA Engineer | squad-qa-engineer.agent.md | Test planning, coverage, QA validation | execute, read, edit, search, web, agent | `/squad-qa-validation`, `#runSubagent` |
```

## Agent Hierarchy

```
Tech Manager (Strategy)
    ↓
Tech Lead (Planning + Design)
    ├─ Architect (Deep Design)
    ├─ JAVA Developer (Implementation)
    └─ QA Engineer (Quality)
```

## Communication Patterns

### Synchronous (Direct prompts)
- User → Tech Manager: `/plan-sprint`
- Tech Lead → Developer: `/squad-dev-task-handoff`
- Developer → QA: PR link

### Asynchronous (Agent-to-agent)
- Tech Lead → Architect: `#runSubagent squad-architect`
- Developer → QA: `#runSubagent squad-qa-engineer`
- Tech Manager → Team: Slack notification via workflow

## Availability

- **Tech Manager**: Full-time (orchestrates sprints)
- **Tech Lead**: Full-time (plans & decomposes daily)
- **Architect**: Full-time (design reviews during planning phase)
- **JAVA Developer**: Full-time (dev work, mostly Tuesday–Thursday)
- **QA Engineer**: Full-time (test planning, validation)

---
