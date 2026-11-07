<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Project Agent Instructions

## 1. Project Documentation

Before making implementation decisions, read the relevant project documentation.

### General documentation

- `.agent/_docs/plan.md` — Project goals, scope, phases, and implementation direction.
- `.agent/_docs/requirements.md` — Functional and non-functional requirements and acceptance criteria.
- `.agent/_docs/task.md` — Current implementation tasks, priorities, and progress.

### Dashboard documentation

For tasks involving the dashboard, also read:

- `.agent/_docs/dashboard/product-decisions.md` — Confirmed product decisions, business rules, and behavior.
- `.agent/_docs/dashboard/wireframe-specification.md` — Dashboard structure, layouts, components, and interaction behavior.
- `.agent/_docs/dashboard/design-system.md` — Visual design rules, typography, colors, spacing, and component styling.

Do not read every document blindly for unrelated tasks. Read all documentation relevant to the task being performed.

### Documentation authority

- Product requirements and confirmed decisions must not be changed without explicit approval.
- The requirements and product-decision documents define expected behavior.
- The wireframe specification defines intended layout and interactions.
- The design system defines visual consistency.
- The task document defines current implementation priorities, not new product requirements.
- If documents conflict, identify the conflict instead of silently choosing one.

## 2. Project Rules

Before writing or modifying code:

- Read all applicable rules from `.agent/rules/`.
- Rules are mandatory unless they conflict with higher-priority project requirements or installed framework documentation.
- Apply only rules relevant to the current task.
- Do not invent requirements that are not documented or explicitly approved.

## 3. Next.js

Follow the Next.js instructions in this file.

For Next.js APIs, conventions, and behavior:

- Prefer documentation available in the installed Next.js package over assumptions from model knowledge.
- Read the relevant documentation under `node_modules/next/dist/docs/` before using unfamiliar or potentially changed APIs.
- Respect deprecation notices and version-specific conventions.
- Do not assume that APIs from previous Next.js versions are still valid.

## 4. Before Implementation

For every non-trivial task:

1. Read the relevant project documentation and rules.
2. Inspect the existing project structure and related implementation.
3. Identify conflicts, missing requirements, and unclear behavior.
4. Check whether the requested change affects other features or existing functionality.
5. Create a concise implementation plan.
6. State any assumptions that need to be made.
7. Implement only after the plan is consistent with the project requirements.

For minor tasks, avoid unnecessary planning overhead.

## 5. Requirements Discipline

- Do not silently change product requirements.
- Do not add features that are outside the documented scope.
- If a requirement is ambiguous, contradictory, or missing and the decision materially affects implementation, ask for clarification before coding.
- If the ambiguity is minor and a safe default exists, state the assumption and proceed.
- If implementation reveals that a documented requirement is technically problematic, explain the issue and propose alternatives before changing it.

## 6. Code Quality

- Prefer simple solutions appropriate for the current project stage and MVP.
- Reuse existing project patterns when appropriate.
- Avoid unnecessary dependencies, services, abstractions, and infrastructure.
- Keep components focused and maintainable.
- Consider accessibility, responsive behavior, and error handling where relevant.
- Avoid unrelated refactoring.

## 7. Task Completion

After implementation:

1. Verify the implementation against relevant acceptance criteria.
2. Run appropriate checks, such as linting, type checking, and tests when available.
3. Check for regressions in related functionality.
4. Update `.agent/_docs/task.md` when task progress or completion changes.
5. Update other documentation only when explicitly required or when an approved decision changes.
6. Report:
   - What was implemented.
   - Which files were changed.
   - What verification was performed.
   - Any assumptions, limitations, or unresolved issues.