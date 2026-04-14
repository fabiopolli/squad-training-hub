---
applyTo: '**/*Test.java,**/*Test.ts,**/*Test.tsx,**/src/test/**,**/tests/**'
---

# Squad Testing Requirements

> Untested code is broken code. Coverage gates prevent regressions.

## Coverage (Enforced)

> Build fails if thresholds drop. No manual overrides.

- **Overall**: ≥75% line coverage (JaCoCo)
- **Critical paths** (payment, auth): ≥90%

## Test Pyramid

```
    E2E (10%)
  Integration (30%)
  Unit (60%)
```

| Type | Tool | Speed | Example |
|------|------|-------|---------|
| **Unit** | JUnit 5 + Mockito | <100ms | Email validation |
| **Integration** | Testcontainers | <1s | User → DB → retrieve |
| **E2E** | REST Assured | <5s | Signup → login → action |

## Test Naming

> Test names document intent. No ambiguity.

✅ `testCreateUserWithValidEmail_ReturnsStatusCreated()`
❌ `test1()`

## Best Practices

- **AAA Pattern**: Arrange → Act → Assert
- **Fixtures**: Builders (not copy-paste); `TestFixtures` class
- **No Flakiness**: No random seeds, no `Thread.sleep()`, fixed clocks
- **Independence**: Each test runs standalone
- **CI**: Tests run on every PR; build fails if coverage <75%
