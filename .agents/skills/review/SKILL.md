---
name: review
description: Review Red Power dashboard changes for product correctness, migration safety, RTL usability, and maintainability.
---

# Review Changes

Review in this order:

1. Scope: does it match the active migration phase and domain?
2. Rules: does it preserve full customer history and prevent closing a maintenance card with unfinished required work?
3. Data: are required fields, statuses, ownership, and failure states explicit?
4. UX: does Arabic RTL work on mobile and desktop with clear Red Power hierarchy?
5. Architecture: are generic foundations kept generic and domain boundaries respected?
6. Verification: are checks proportional and passing?

Report actionable findings first, with file/line references where possible. Do not propose unrelated rewrites.
