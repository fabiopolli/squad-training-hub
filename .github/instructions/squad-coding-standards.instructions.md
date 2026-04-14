---
applyTo: '**/*.java,**/pom.xml'
---

# Squad JAVA Coding Standards

> All JAVA code must be production-grade, follow SOLID principles, and pass security/coverage gates before merging.

## Core Requirements

- **Java**: 21 LTS | **Framework**: Spring Boot 3.5+ | **Build**: Maven 3.8+
- **SOLID**: Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion
- **Testing**: 75% coverage (JaCoCo enforced), 90%+ for critical paths (payment, auth)
- **Tests**: JUnit 5 + Mockito (unit) | Testcontainers (integration) | REST Assured (E2E)
- **Database**: Spring Data JPA with `@EntityGraph` for N+1 prevention
- **Security**: OAuth2/JWT, GCP Secret Manager (never hardcode secrets)
- **Logging**: SLF4J + Logback with MDC for correlation IDs

## Code Organization

```
src/main/java/com/squad/module/
├── controller/  ├── service/  ├── repository/  ├── entity/  ├── dto/
├── exception/  ├── config/  └── util/
```

## Code Review Checklist

> All items must pass. No exceptions.

- [ ] SOLID principles enforced
- [ ] Coverage ≥75% (90%+ critical paths)
- [ ] No hardcoded secrets, API keys, or PII
- [ ] `@EntityGraph` used for related entities
- [ ] Tests pass locally and in CI
- [ ] JavaDoc for public APIs
- [ ] No deprecated APIs
