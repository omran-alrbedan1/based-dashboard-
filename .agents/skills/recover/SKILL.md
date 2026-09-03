---
name: recover
description: Safely inspect, undo, or restore Red Power dashboard work while preserving user changes and reusable infrastructure.
---

# Recover Work Safely

1. Inspect `git status`, relevant diffs, and exact paths before changing files.
2. Identify user work, agent work, generated output, and tracked baseline.
3. Prefer restoring named paths over broad resets or whole-tree restores.
4. Never delete shared infrastructure simply because a feature is currently unused.
5. Run a focused verification and report the exact recovered or removed paths.

When recovery scope is unclear, state the affected paths and request direction before irreversible overwrite.
