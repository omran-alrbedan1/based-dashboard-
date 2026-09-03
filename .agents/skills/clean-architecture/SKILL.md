---
name: clean-architecture
description: Plan or implement Red Power dashboard features with clear domain boundaries, reusable layers, and migration-safe dependencies.
---

# Clean Architecture

Use this skill for every feature, refactor, or API integration.

- Keep domains in `src/features/<domain>/`; keep shared components, UI primitives, hooks, constants, and API utilities domain-agnostic.
- A feature owns its pages, components, types, services, validation, and fixtures. Pages compose components; UI does not consume raw API responses.
- Do not import one feature's internals from another. Extract a generic shared primitive when behavior is genuinely reusable.
- Preserve existing infrastructure. Replace old e-commerce behavior incrementally only after a Red Power replacement is available.

Before implementation, identify the feature owner, route, data model, validation boundary, and reusable base component to adopt.
