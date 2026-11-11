# Dashboard Implementation Tasks

## Status Legend

- [ ] Not started
- [~] In progress
- [x] Completed
- [!] Blocked

## Phase 1 — Project Inspection

- [x] Inspect project structure.
- [x] Inspect Next.js version and dependencies.
- [x] Review existing UI and styling conventions.
- [x] Review backend and API integration.
- [x] Inspect authentication implementation.
- [x] Inspect database structure.
- [x] Inspect image storage capabilities.
- [x] Identify technical conflicts.
- [x] Prepare technical implementation proposal.
- [x] Review unresolved decisions.

## Phase 2 — Design Foundation

- [x] Define design tokens.
- [x] Configure Inter typography.
- [x] Implement color system.
- [x] Implement spacing system.
- [x] Implement shared button components.
- [x] Implement form inputs.
- [x] Implement cards.
- [x] Implement tables.
- [x] Implement status badges.
- [x] Implement dropdowns.
- [x] Implement action menus.
- [x] Implement modals.
- [x] Implement confirmation dialogs.
- [x] Implement Toast notifications.
- [x] Implement loading skeletons.

## Phase 3 — Dashboard Shell

- [x] Implement sidebar.
- [x] Implement top navbar.
- [x] Implement breadcrumbs.
- [x] Implement main content layout.
- [x] Implement role-based navigation visibility.
- [x] Implement mobile sidebar overlay.
- [x] Verify desktop layout.
- [x] Verify mobile layout.

## Phase 4 — Authentication and Authorization

- [x] Implement Login UI and credential verification using local demo accounts.
- [x] Implement secure session handling with hashed tokens and local JSON persistence.
- [x] Implement 30-minute inactivity expiration with server-side validation and meaningful-activity refresh.
- [x] Implement logout and session revocation.
- [x] Implement protected dashboard routes.
- [x] Implement reusable server-side role authorization and role-aware dashboard access.
- [x] Implement expired-session handling with HTTP 401 responses and login redirect.
- [x] Test password verification, session expiration, and role permissions.

## Phase 5 — Shared Content Infrastructure

- [x] Implement reusable data table.
- [x] Implement search.
- [x] Implement 5-second debounce.
- [x] Implement combined filters.
- [x] Implement pagination.
- [x] Implement loading states.
- [x] Implement empty states.
- [x] Implement no-results states.
- [x] Implement shared Add/Edit modal.
- [x] Implement form validation.
- [x] Implement unsaved-changes confirmation.
- [x] Implement Publish/Unpublish actions.
- [x] Implement shared Toast behavior.

## Phase 6 — Content Pages

### Categories

- [x] Implement Categories page structure and metadata.
- [x] Implement category table structure.
- [x] Implement category search.
- [~] Implement Add Category form UI (persistence blocked pending content API).
- [~] Implement Edit Category form UI (category records unavailable pending content API).
- [x] Implement View Items navigation link with a category filter query.
- [~] Implement category unpublishing confirmation UI (mutation blocked pending content API).
- [!] Verify category/item visibility behavior (requires persisted category and item data).

### Items

- [ ] Implement Items page.
- [ ] Implement item table.
- [ ] Implement item search.
- [ ] Implement category filter.
- [ ] Implement combined filtering.
- [ ] Implement Add Item.
- [ ] Implement Edit Item.
- [ ] Implement image upload.
- [ ] Implement image preview.
- [ ] Implement image replacement.
- [ ] Implement image removal.
- [ ] Implement item unpublishing.
- [ ] Implement item publishing.
- [ ] Verify item/category visibility rules.

### Features

- [ ] Implement Features page.
- [ ] Implement feature table.
- [ ] Implement feature search.
- [ ] Implement Add Feature.
- [ ] Implement Edit Feature.
- [ ] Implement feature publishing.
- [ ] Implement feature unpublishing.

### Testimonials

- [ ] Implement Testimonials page.
- [ ] Implement testimonial table.
- [ ] Implement quote preview.
- [ ] Implement Read More / Show Less.
- [ ] Implement testimonial search.
- [ ] Implement Add Testimonial.
- [ ] Implement Edit Testimonial.
- [ ] Implement testimonial publishing.
- [ ] Implement testimonial unpublishing.

## Phase 7 — Account Management

### Admin Management

- [ ] Implement Admin Management page.
- [ ] Implement Admin accounts table.
- [ ] Implement Add Admin page.
- [ ] Implement password policy validation.
- [ ] Implement dynamic password requirements.
- [ ] Implement Admin removal confirmation.
- [ ] Implement immediate session invalidation.
- [ ] Verify Super Admin-only access.

### Profile

- [ ] Implement Profile page.
- [ ] Implement Account Information section.
- [ ] Implement Change Password form.
- [ ] Implement password confirmation.
- [ ] Implement password policy validation.
- [ ] Implement dynamic password requirements.
- [ ] Implement Super Admin-only Admin Accounts section.

## Phase 8 — Overview

- [ ] Implement Overview page.
- [ ] Implement summary cards.
- [ ] Implement record counts.
- [ ] Implement role-based card visibility.
- [ ] Implement section navigation.

## Phase 9 — Testing

- [ ] Test authentication.
- [ ] Test session expiration.
- [ ] Test logout.
- [ ] Test role-based permissions.
- [ ] Test CRUD operations.
- [ ] Test publishing rules.
- [ ] Test category/item visibility.
- [ ] Test search debounce.
- [ ] Test combined filters.
- [ ] Test pagination.
- [ ] Test image uploads.
- [ ] Test form validation.
- [ ] Test unsaved changes.
- [ ] Test API error handling.
- [ ] Test mobile responsiveness.
- [ ] Test keyboard accessibility.

## Phase 10 — Final Review

- [ ] Review component reusability.
- [ ] Review TypeScript correctness.
- [ ] Review security.
- [ ] Review responsive behavior.
- [ ] Review performance.
- [ ] Review documentation.
- [ ] Resolve outstanding issues.
- [ ] Confirm completion criteria.

## Current Progress

Current stage: Phase 6 in progress — Categories page structure, shared table/search, and the Add Category form UI are implemented. Phase 4 local-demo authentication is complete using hashed fixture credentials and local JSON session persistence. Production authentication and content data loading/mutations remain outside this local demo and require a production backend/database decision.

Technical proposal summary:

- The repository is currently a landing-page application, not a dashboard implementation.
- The project is built with Next.js 16 App Router, React 19, TypeScript, and Tailwind-based styling.
- Public landing-page routes and components already exist and should remain intact for now.
- The dashboard will be introduced as a separate admin route and should not modify the current landing-page flow.
- The local authentication demo connects credential verification, a JSON-backed session store, protected dashboard pages, role guards, logout, and server-enforced 30-minute idle expiration. It is intentionally limited to local, single-instance development and is not production-ready.
- The project is ready for dashboard frontend work, but backend and data-layer requirements must be approved before moving into full feature implementation.

Phase 2 status:

- Dashboard tokens and shared UI primitives were aligned with the approved light palette, 8px radius, spacing, table, and status badge specifications.
- Reusable UI primitives for cards, badges, inputs, and tables were created in `components/ui/`.
- A reusable, keyboard-accessible select dropdown was added in `components/ui/select.tsx` using the existing Base UI dependency.
- A reusable keyboard-accessible content action menu was added in `components/ui/action-menu.tsx`; published records expose Edit/Delete and drafts expose Edit/Publish.
- Delete remains a caller-provided action so the content workflow can confirm and soft-unpublish as specified; this primitive does not implement record mutation.
- Shared responsive dialog primitives were added in `components/ui/dialog.tsx`, with labelled title/description, optional close control, scrollable content, and an adaptive footer.
- Reusable confirmation dialogs were added in `components/ui/confirmation-dialog.tsx`, including the exact unsaved-changes warning and Keep Editing / Discard Changes actions.
- React Toastify is mounted in the admin layout through `components/ui/toast-provider.tsx`, with shared success, error, and info helpers for dashboard workflows.
- Phase 5 shared content UI includes a Zod/React Hook Form Add/Edit dialog, accessible inline field errors, unsaved-change protection, and status actions with confirmed unpublishing and immediate publishing. Content pages supply their own Zod schema and mutation callback; those callbacks must validate again on the server and refresh the table after success.

Next task: connect Categories loading and CRUD/publishing operations to an approved local or hosted content API, then verify category/item visibility behavior.