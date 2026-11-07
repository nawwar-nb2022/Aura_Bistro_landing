# Dashboard Implementation Plan

## 1. Project Overview

Build a content-management dashboard for the NOIR restaurant website.

The dashboard will allow authorized users to manage selected restaurant website content through a secure, responsive administrative interface.

The implementation must follow the approved requirements, information architecture, user flows, wireframes, and design system.

## 2. Implementation Principles

- Implement incrementally.
- Inspect the existing project before making architectural decisions.
- Reuse existing project conventions and dependencies.
- Prioritize security and maintainability.
- Build reusable components for repeated UI patterns.
- Avoid unnecessary abstractions and dependencies.
- Preserve all previously approved product decisions.
- Do not introduce additional features without approval.

## 3. Implementation Phases

### Phase 1 — Project Inspection and Technical Analysis

Before writing implementation code:

1. Inspect the existing project structure.
2. Identify the installed Next.js version and dependencies.
3. Inspect existing styling and UI component conventions.
4. Review existing backend/API integration.
5. Identify the authentication and session mechanisms.
6. Identify database and image-storage capabilities.
7. Review all dashboard documentation.
8. Identify conflicts, missing information, and technical risks.

**Deliverable:** A technical implementation proposal covering architecture, authentication, database structure, API contracts, image storage, and unresolved decisions.

Do not start major implementation until the proposal has been reviewed.

### Phase 2 — Design Foundation

Implement the shared design system:

1. Color tokens.
2. Typography.
3. Spacing.
4. Border radius.
5. Buttons.
6. Form inputs.
7. Cards.
8. Tables.
9. Status badges.
10. Dropdowns and action menus.
11. Modals and confirmation dialogs.
12. Toast notifications.
13. Loading skeletons.

Use reusable components and centralized design tokens.

### Phase 3 — Dashboard Shell

Implement:

1. Sidebar navigation.
2. Top navigation bar.
3. Breadcrumbs.
4. Main content layout.
5. Role-based navigation visibility.
6. Responsive sidebar behavior.
7. Mobile overlay behavior.

Verify desktop and mobile layouts before proceeding.

### Phase 4 — Authentication and Authorization

Implement:

1. Login page.
2. Server-side authentication.
3. Secure session management.
4. 30-minute inactivity expiration.
5. Logout.
6. Protected dashboard routes.
7. Role-based authorization.
8. Unauthorized and expired-session handling.

Test authentication and permissions before building content-management pages.

### Phase 5 — Shared Content Management Infrastructure

Implement reusable infrastructure:

1. Data table.
2. Search with 5-second debounce.
3. Combined filters.
4. Pagination.
5. Loading states.
6. Empty states.
7. No-results states.
8. Add/Edit modal structure.
9. Form validation.
10. Unsaved-changes confirmation.
11. Publish/Unpublish actions.
12. Confirmation dialogs.
13. Toast notifications.

Avoid implementing the same behavior separately for each content section.

### Phase 6 — Content Management Pages

Implement in the following order:

1. Categories.
2. Items.
3. Features.
4. Testimonials.

For each page:

- Follow its approved wireframe.
- Reuse shared components.
- Implement its specific fields and table columns.
- Connect the required API operations.
- Verify publishing behavior.
- Verify validation and error handling.
- Verify responsive behavior.

Complete and test each page before moving to the next.

### Phase 7 — Account Management

Implement:

1. Admin Management.
2. Add Admin page.
3. Admin removal and session revocation.
4. Profile page.
5. Change Password functionality.
6. Super Admin-only Admin Accounts section.

Verify role restrictions and backend authorization.

### Phase 8 — Overview Page

Implement:

1. Overview layout.
2. Content summary cards.
3. Record counts.
4. Role-based Admin Management card visibility.
5. Navigation to the corresponding sections.

### Phase 9 — Integration and Validation

Perform comprehensive testing.

Verify:

- Authentication and logout.
- Session expiration.
- Role-based permissions.
- CRUD operations.
- Publishing and unpublishing.
- Category and item visibility dependencies.
- Search debounce.
- Combined filters.
- Pagination.
- Image uploads.
- Form validation.
- Unsaved changes.
- Error handling.
- Responsive behavior.
- Keyboard accessibility.

### Phase 10 — Final Review

Review:

- Code quality.
- Component reuse.
- TypeScript correctness.
- Security.
- Responsive design.
- Performance.
- Documentation accuracy.
- Outstanding issues.

Do not consider the dashboard complete until its main workflows have been tested.

## 4. Implementation Rules

- Follow the existing project architecture.
- Do not replace existing working implementations without justification.
- Follow the installed Next.js version and its documentation.
- Keep business logic separate from presentation where appropriate.
- Enforce authorization on the backend.
- Validate data on both client and server.
- Use consistent error handling.
- Avoid unnecessary dependencies.
- Do not introduce product behavior that has not been approved.

## 5. Technical Decisions to Resolve

During Phase 1, investigate:

- Database schema.
- Backend API contracts.
- Authentication mechanism.
- Session storage and expiration.
- Password hashing.
- Image storage provider.
- Image file types and maximum size.
- Currency configuration.
- Duplicate category-name policy.
- API error conventions.
- Login rate limiting.
- Deployment configuration.

Document the proposed solutions and obtain approval for decisions that affect product behavior or architecture.

## 6. Completion Criteria

Each implementation phase must be verified before moving to the next.

At the end of each task, report:

- What was implemented.
- Which files were changed.
- What was tested.
- Any unresolved issues.
- The recommended next task.