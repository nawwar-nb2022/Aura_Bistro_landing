<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->



# Project Agent Instructions

## Project documentation

Before making implementation decisions, read the relevant files in:

- `.agent/_docs/plan.md` — project goals, scope, phases, and implementation direction.
- `.agent/_docs/requirements.md` — functional and non-functional requirements and acceptance criteria.
- `.agent/_docs/tasks.md` — current implementation tasks and priorities.

These documents are the source of truth for the project's product requirements.

## Project rules

Before writing or modifying code:

- Read all applicable rules from `.agent/rules/`.
- Rules are mandatory unless they conflict with a higher-priority requirement or the installed Next.js documentation.
- Apply only rules relevant to the current task.
- Do not invent requirements that are not present in the project documentation.

## Next.js

Follow the Next.js instructions in this file.

For Next.js APIs, conventions, and behavior, prefer the documentation available in the installed Next.js package over assumptions from model knowledge.

## Before implementation

For every non-trivial task:

1. Read the relevant documentation and rules.
2. Inspect the existing project structure and related implementation.
3. Identify any conflicts, missing requirements, or unclear behavior.
4. Create a concise implementation plan.
5. Implement only after the plan is consistent with the project requirements.
6. Verify the implementation against the relevant acceptance criteria.

## Requirements discipline

Do not silently change product requirements.

If a requirement is ambiguous, contradictory, or missing and the decision would materially affect the implementation, ask for clarification before coding.

If the ambiguity is minor and a safe default exists, state the assumption and proceed.

## Code quality

Prefer simple solutions appropriate for the MVP.

Do not introduce additional libraries, services, abstractions, or infrastructure unless they solve an actual project requirement.

Reuse existing project patterns when they are appropriate.

## Task completion

After implementation:

- Check the relevant acceptance criteria.
- Check for regressions in related functionality.
- Report what was changed.
- Report any assumptions or unresolved issues.