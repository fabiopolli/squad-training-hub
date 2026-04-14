---
applyTo: '**/*.java,**/*.ts,**/*.tsx,**/*.js,**/*.jsx'
---

# Squad Architecture Patterns

When integrating components into the broader system, respect established boundaries:
- New modules respect architecture boundaries
- Event-driven patterns align with event schema conventions
- Cross-cutting concerns (security, observability) correctly propagated
- Architectural decision records (ADRs) and constraints honoured

> Consult architecture specialist agent. Load `.github/agents/data/squad-team-mapping.md` for repo-specific boundaries, ADR constraints, and integration patterns.

## Priority Patterns (In Order)

1. **Repository** — Database abstraction (Spring Data JPA)
2. **Service** — Business logic orchestration (@Service)
3. **Strategy** — Multiple implementations (payments, delivery)
4. **Factory** — Complex object creation
5. **Decorator** — Cross-cutting concerns (logging, caching, validation)
6. **Observer** — Event-driven integration (Pub/Sub)

## Anti-Patterns to Eliminate

> Violations cause technical debt and code review rejection.

- **God Service** — Doing too much; violates SRP
- **Anemic Model** — No behavior; logic in service layer
- **N+1 Queries** — Missing `@EntityGraph` for eager loading
- **Leaky Abstractions** — Repository exposes DB-specific queries
- **Circular Dependencies** — Service A calls B which calls A
