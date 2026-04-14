# 📚 Squad Framework — Complete Guide

Welcome to the Agentified JAVA Squad Framework! This directory contains everything you need to run a developer squad using Copilot Agents, structured workflows, and GCP deployment.

---

## 🚀 Quick Start (5 Minutes)

1. **Setup environment**: Read [docs/SETUP.md](docs/SETUP.md)
   ```bash
   cd squad-service
   ./scripts/setup.sh  # or follow SETUP.md step-by-step
   ```

2. **Verify installation**:
   ```bash
   java -version  # Should be 21+
   mvn --version  # Should be 3.8+
   ```

3. **Read the framework**: [SQUAD_FRAMEWORK.md](SQUAD_FRAMEWORK.md)

4. **Start learning**: Attend [training](docs/TRAINING_AGENDA.md)

---

## 📖 Documentation Map

### Core Framework
- **[SQUAD_FRAMEWORK.md](SQUAD_FRAMEWORK.md)** — Complete 300+ line blueprint
  - Vision: Agentic retail platform
  - Architecture: 5 agents, 4 pillars
  - Delivery pipeline: Monday–Friday workflow
  - MCP integration & autonomy

### Getting Started
- **[docs/SETUP.md](docs/SETUP.md)** — First-time installation & environment setup
  - Prerequisites (Java 21, Maven, GCP)
  - JDK installation guide
  - GCP authentication
  - Local development environment
  - VS Code configuration

- **[docs/TROUBLESHOOTING.md](docs/TROUBLESHOOTING.md)** — Common issues & solutions
  - Java/Maven problems
  - Testing failures
  - GCP authentication
  - CI/CD issues
  - Performance troubleshooting

### Integration & Tools
- **[docs/MCP_INTEGRATION.md](docs/MCP_INTEGRATION.md)** — MCP server setup
  - GitHub MCP (built-in)
  - Jira MCP (setup required)
  - Confluence MCP (setup required)
  - Custom MCP creation
  - OAuth 2.0 for production

### Training & Implementation
- **[docs/TRAINING_AGENDA.md](docs/TRAINING_AGENDA.md)** — 4-day hands-on training
  - Day 1: Foundations (4 pillars, 5 roles)
  - Day 2: Rules & Standards (coding, testing, deployment)
  - Day 3: Workflows & Agents (prompts, CI/CD)
  - Day 4: Hands-on project (build feature end-to-end)

- **[NEXT_STEPS.md](NEXT_STEPS.md)** — Implementation phases & checklist
  - Phase 1: Environment setup (Week 1)
  - Phase 2: Training (4 days)
  - Phase 3: Hands-on with real features (Week 2)
  - Phase 4: MCP integration (Week 3)
  - Phase 5: Autonomy & scaling (Week 4+)

- **[PRACTICAL_EXAMPLES.md](PRACTICAL_EXAMPLES.md)** — Real-world walkthroughs
  - Example 1: Build User API feature (full cycle)
  - Example 2: Emergency hotfix
  - Example 3: Tech debt refactoring
  - Example 4: Create custom agent
  - Example 5: Setup MCP for team

### Configuration
- **[squad-config.json](squad-config.json)** — Agent configuration
  - Enable/disable agents
  - Prompt registry
  - Workflow list
  - MCP server settings
  - Quality gates
  - Delivery pipeline stages

- **[.github/agents/data/squad-team-mapping.md](.github/agents/data/squad-team-mapping.md)** — Team registry
  - Agent hierarchy
  - Communication patterns
  - Availability matrix

---

## 🎯 The 5 Squad Roles

| Role | Responsibility | Key Prompts | Agent Location |
|------|-----------------|-------------|-----------------|
| **Tech Manager** | Orchestration, sprint planning, escalations | `/plan-sprint`, `/escalate-blocker` | `.github/agents/squad-tech-manager.agent.md` |
| **Tech Lead** | Planning, design review, task decomposition | `/squad-feature-kickoff`, `/squad-design-review` | `.github/agents/squad-tech-lead.agent.md` |
| **Architect** | System design, ADRs, pattern validation | `#runSubagent squad-architect` | `.github/agents/squad-architect.agent.md` |
| **JAVA Developer** | Backend implementation, testing, GCP deployment | `/squad-dev-task-handoff` | `.github/agents/squad-java-developer.agent.md` |
| **QA Engineer** | Test planning, coverage validation, sign-off | `/squad-qa-validation` | `.github/agents/squad-qa-engineer.agent.md` |

---

## 🏗️ The 4 Pillars

```
┌──────────────────────────────────────────────────────┐
│  USER INTERACTION                                    │
│  ↓                                                   │
├──────────────────────────────────────────────────────┤
│                                                      │
│  INSTRUCTIONS (Laws)           PROMPTS (Workflows)   │
│  `.github/instructions/`       `.github/prompts/`    │
│  Applied to every file         Manual `/` commands   │
│                                                      │
│  AGENTS (Personas)             WORKFLOWS (CI/CD)     │
│  `.github/agents/`             `.github/workflows/`  │
│  Autonomous reasoning          Automatic execution   │
│                                                      │
└──────────────────────────────────────────────────────┘
```

---

## 📋 Rules & Standards

All code is governed by 5 instruction files:

1. **[.github/instructions/squad-coding-standards.instructions.md](.github/instructions/squad-coding-standards.instructions.md)**
   - Java 21 LTS, Spring Boot 3.5+
   - SOLID principles, dependency management
   - Testing: 75%+ coverage (enforced by JaCoCo)

2. **[.github/instructions/squad-gcp-guidelines.instructions.md](.github/instructions/squad-gcp-guidelines.instructions.md)**
   - Cloud Run (preferred compute)
   - Firestore (flexible) / Cloud SQL (relational)
   - Secret Manager for credentials

3. **[.github/instructions/squad-testing-requirements.instructions.md](.github/instructions/squad-testing-requirements.instructions.md)**
   - Test pyramid: 60% unit, 30% integration, 10% e2e
   - Naming: `testFeatureScenarioExpectedResult`
   - AAA pattern (Arrange, Act, Assert)

4. **[.github/instructions/squad-architecture-patterns.instructions.md](.github/instructions/squad-architecture-patterns.instructions.md)**
   - Catalog: Repository, Service, Factory, Strategy, Observer
   - Anti-patterns: God Service, N+1 queries, Circular dependencies

5. **[.github/instructions/squad-deployment-policy.instructions.md](.github/instructions/squad-deployment-policy.instructions.md)**
   - Semantic versioning: v1.2.3
   - Stages: dev (auto) → staging (manual) → prod (approval)
   - Rollback SLA: <5 minutes

---

## 🔄 Delivery Pipeline

```
Monday Morning (Planning)
    ↓
Tech Manager: `/plan-sprint`
    ↓
Tech Lead: `/squad-feature-kickoff`
    ↓
Monday PM (Design)
    ↓
Architect: `#runSubagent squad-architect`
    ↓
Tue–Thu (Implementation)
    ↓
Developer: `/squad-dev-task-handoff`
QA: `/squad-qa-validation`
    ↓
Friday (Deployment)
    ↓
Tech Manager: `/squad-deployment-checklist`
    ↓
Friday PM (Reflection)
    ↓
Team: `/squad-retrospective`
```

---

## ⚙️ Workflows (CI/CD)

5 GitHub Actions workflows automate the pipeline:

| Workflow | Trigger | Purpose |
|----------|---------|---------|
| `.github/workflows/squad-ci-lint-test.yml` | Every PR + main | Lint, tests, coverage check |
| `.github/workflows/squad-security-scan.yml` | Every PR + main | CodeQL + dependency check |
| `.github/workflows/squad-deploy-gcp-dev.yml` | Push to main | Auto-deploy to Cloud Run dev |
| `.github/workflows/squad-deploy-gcp-prod.yml` | Release tag (v*.*.*) | Manual deploy to prod (blue-green) |
| `.github/workflows/squad-notification.yml` | Workflow completion | Slack notifications |

---

## 🧠 MCP Integration

Three MCP servers connect agents to external tools:

1. **GitHub** (built-in)
   - Read/write repository files
   - Create/update issues and PRs
   - Merge pull requests

2. **Jira** (setup required)
   - Create/update tickets
   - Transition workflow
   - Query sprint backlog
   - See [docs/MCP_INTEGRATION.md](docs/MCP_INTEGRATION.md) for setup

3. **Confluence** (setup required)
   - Search documentation
   - Create/update pages
   - Publish ADRs
   - See [docs/MCP_INTEGRATION.md](docs/MCP_INTEGRATION.md) for setup

---

## 🎓 Training

**When**: This week (4 consecutive days)  
**Duration**: 4 hours/day  
**Audience**: Development teams (5-8 people)

See [docs/TRAINING_AGENDA.md](docs/TRAINING_AGENDA.md) for detailed schedule:
- **Day 1**: Foundations (4 pillars, 5 roles, local setup)
- **Day 2**: Rules & Standards (coding, testing, deployment guidelines)
- **Day 3**: Workflows & Agents (prompts, CI/CD, MCPs)
- **Day 4**: Hands-on project (build a feature end-to-end)

---

## 📁 Directory Structure

```
novos/                             ← Complete Squad Framework (ready to migrate)
├── README.md                       ← This file (quick start & index)
├── SQUAD_FRAMEWORK.md              ← Main blueprint document
├── NEXT_STEPS.md                   ← Implementation phases & checklist
├── PRACTICAL_EXAMPLES.md           ← Real-world walkthroughs
├── squad-config.json               ← Central configuration
│
├── .github/                        ← VS Code Copilot integrations
│   ├── agents/                     ← 5 squad agents
│   │   ├── squad-tech-manager.agent.md
│   │   ├── squad-tech-lead.agent.md
│   │   ├── squad-architect.agent.md
│   │   ├── squad-java-developer.agent.md
│   │   ├── squad-qa-engineer.agent.md
│   │   └── data/
│   │       └── squad-team-mapping.md
│   │
│   ├── instructions/               ← 5 rule files (always-on)
│   │   ├── squad-coding-standards.instructions.md
│   │   ├── squad-gcp-guidelines.instructions.md
│   │   ├── squad-testing-requirements.instructions.md
│   │   ├── squad-architecture-patterns.instructions.md
│   │   └── squad-deployment-policy.instructions.md
│   │
│   ├── prompts/                    ← 6 workflow templates
│   │   ├── squad-feature-kickoff.prompt.md
│   │   ├── squad-design-review.prompt.md
│   │   ├── squad-dev-task-handoff.prompt.md
│   │   ├── squad-qa-validation.prompt.md
│   │   ├── squad-deployment-checklist.prompt.md
│   │   └── squad-retrospective.prompt.md
│   │
│   └── workflows/                  ← 5 CI/CD automations
│       ├── squad-ci-lint-test.yml
│       ├── squad-security-scan.yml
│       ├── squad-deploy-gcp-dev.yml
│       ├── squad-deploy-gcp-prod.yml
│       └── squad-notification.yml
│
├── docs/                           ← Documentation guides
│   ├── SETUP.md                    ← Installation (5 steps)
│   ├── TROUBLESHOOTING.md          ← 30+ solutions
│   ├── MCP_INTEGRATION.md          ← Jira/Confluence setup
│   └── TRAINING_AGENDA.md          ← 4-day curriculum
│
└── examples/                       ← Practical examples (TBD)
    ├── feature-example/
    ├── bug-fix-example/
    └── refactoring-example/
```
---

## 🔗 Quick Links

- **Setup**: [docs/SETUP.md](docs/SETUP.md) → 5-step installation
- **Troubleshooting**: [docs/TROUBLESHOOTING.md](docs/TROUBLESHOOTING.md) → Common problems
- **MCP Setup**: [docs/MCP_INTEGRATION.md](docs/MCP_INTEGRATION.md) → Jira + Confluence
- **Training**: [docs/TRAINING_AGENDA.md](docs/TRAINING_AGENDA.md) → 4-day plan
- **Next Steps**: [NEXT_STEPS.md](NEXT_STEPS.md) → Implementation phases
- **Examples**: [PRACTICAL_EXAMPLES.md](PRACTICAL_EXAMPLES.md) → Real walkthroughs
- **Config**: [squad-config.json](squad-config.json) → All settings
- **Framework**: [SQUAD_FRAMEWORK.md](SQUAD_FRAMEWORK.md) → Complete blueprint
- **Agents**: [.github/agents/](.github/agents/) → All agent definitions
- **Instructions**: [.github/instructions/](.github/instructions/) → Rule files
- **Prompts**: [.github/prompts/](.github/prompts/) → Workflow templates
- **Workflows**: [.github/workflows/](.github/workflows/) → CI/CD automation
---

## ✅ Validation Checklist

Before starting work:

- [ ] Java 21 installed (`java -version`)
- [ ] Maven 3.8+ installed (`mvn --version`)
- [ ] GCP authentication works (`gcloud auth list`)
- [ ] Project cloned (`git clone ...`)
- [ ] Dependencies installed (`mvn clean install`)
- [ ] Service runs locally (`mvn spring-boot:run`)
- [ ] VS Code Chat ready (Copilot extension installed)
- [ ] Agents visible (`.github/agents/` folder exists)

---

## 🚀 First Steps

1. **[Read SETUP.md](docs/SETUP.md)** (10 min) — Local environment setup
2. **Clone & install** (5 min) — `git clone ... && mvn clean install`
3. **Verify locally** (5 min) — `mvn spring-boot:run && curl http://localhost:8080/health`
4. **[Read SQUAD_FRAMEWORK.md](SQUAD_FRAMEWORK.md)** (15 min) — Understand the architecture
5. **[Check PRACTICAL_EXAMPLES.md](PRACTICAL_EXAMPLES.md)** (10 min) — See real walkthroughs
6. **[Review NEXT_STEPS.md](NEXT_STEPS.md)** (10 min) — Implementation phases
7. **Attend training** (4 days) — See [docs/TRAINING_AGENDA.md](docs/TRAINING_AGENDA.md)

---

## 🤝 Support

- **Questions**: Check [docs/TROUBLESHOOTING.md](docs/TROUBLESHOOTING.md)
- **Setup help**: See [docs/SETUP.md](docs/SETUP.md)
- **Training**: See [docs/TRAINING_AGENDA.md](docs/TRAINING_AGENDA.md)
- **MCP issues**: See [docs/MCP_INTEGRATION.md](docs/MCP_INTEGRATION.md)

---

**Framework Version**: 1.0  
**Last Updated**: 2024  
**Tech Stack**: Java 21, Spring Boot 3.5+, GCP, GitHub, Copilot Agents
