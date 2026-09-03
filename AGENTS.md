# Red Power Dashboard — Agent Instructions

Before planning, editing, reviewing, or recovering work in this repository, read the applicable project skill(s) in `.agents/skills/`.

## Required skill routing

| Situation | Read first |
| --- | --- |
| Any implementation or refactor | `clean-architecture` and `clean-code` |
| UI, copy, or visual-system work | `imprint` |
| Pull-request, diff, or quality review | `review` |
| Undoing, restoring, or diagnosing damaged work | `recover` |
| Starting a task, finishing a task, or discovering project context | `remember` |

## Project constraints

- Preserve reusable shared components, UI primitives, layouts, form helpers, API utilities, and generic hooks unless a replacement is deliberately planned.
- Build the product in Arabic first with RTL support; do not hard-code direction-sensitive layout assumptions.
- Treat Red Power as a workshop-management product, not an e-commerce delivery product.
- Do not delete existing modules simply because they are currently unused. Deprecate and migrate them through the plan in `docs/RED_POWER_MIGRATION_PLAN.md`.
- Keep implementation changes scoped to the active phase in the migration plan.
