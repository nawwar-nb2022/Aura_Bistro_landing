# Dashboard Functional Requirements

## 1. Project Scope

The dashboard manages selected content displayed on the NOIR restaurant website.

### Managed sections

1. Categories.
2. Menu Items.
3. Features.
4. Testimonials.
5. Admin Accounts.
6. User Profile.

### Out of scope

The dashboard does not manage:

- Hero section.
- About / Story section.
- Gallery.
- Contact information.
- Opening hours.
- Social media links.
- Reservations.
- Orders.
- Customers.
- Restaurant operations.

Do not add these features without explicit approval.

## 2. User Roles and Permissions

There are two user roles.

### 2.1 Super Admin

The restaurant owner.

Permissions:

- Manage Categories.
- Manage Items.
- Manage Features.
- Manage Testimonials.
- Access Admin Management.
- Create Admin accounts.
- Remove Admin accounts.
- Access Profile.
- Change password.

The Super Admin account is created manually outside the dashboard.

It cannot be created or deleted through Admin Management.

### 2.2 Admin

Selected restaurant staff.

Permissions:

- Manage Categories.
- Manage Items.
- Manage Features.
- Manage Testimonials.
- Access Profile.
- Change password.

Restrictions:

- Cannot access Admin Management.
- Cannot create other Admin accounts.
- Cannot remove Admin accounts.

### 2.3 Authorization

- Both roles have identical content-management permissions.
- Only Super Admin can manage Admin accounts.
- Backend authorization is mandatory.
- Hiding UI elements is not sufficient authorization.
- Protected backend operations must verify the authenticated user's role.

## 3. Authentication and Session Management

### 3.1 Login

Fields:

- Username.
- Password.

Requirements:

- No public registration.
- No forgot-password functionality.
- No password-reset flow.
- Invalid credentials display:

`Username or password is incorrect.`

- Use a generic error message.
- Successful login redirects to Overview.
- Logout immediately terminates the session without confirmation.

### 3.2 Session Expiration

- Session expires after 30 minutes of inactivity.
- No expiration warning modal.
- Session expiration is enforced by the server.
- Frontend activity tracking may support UX but is not a security mechanism.
- Meaningful user activity resets the idle timer.
- Background polling and data fetching must not reset the idle timer.
- Protected requests must validate the session.
- Expired sessions return HTTP 401.
- Expired sessions are invalidated and the user is redirected to Login.

## 4. Shared Dashboard Layout

### 4.1 Sidebar

Persistent desktop sidebar with icons and labels.

Navigation:

- Overview.
- Menu.
  - Categories.
  - Items.
- Features.
- Testimonials.
- Admin Management (Super Admin only).

Profile is not in the sidebar.

### 4.2 Top Navbar

Contains:

- Breadcrumbs.
- Profile icon and username.
- Logout action.

Do not duplicate page titles or user information.

### 4.3 Mobile Behavior

- Sidebar initially displays icons only.
- Expanding opens the sidebar as an overlay.
- Main content does not resize.
- Selecting a section closes the sidebar.
- Clicking outside closes the sidebar.
- Tables support horizontal scrolling.
- Do not hide important columns on mobile.

## 5. Overview

Title:

`Overview`

Description:

`Manage your restaurant website content.`

### Layout

- Two-column grid on desktop.
- One-column grid on mobile.

Cards:

- Menu.
- Features.
- Testimonials.
- Admin Management (Super Admin only).

Each card displays:

- Icon.
- Section name.
- Short description.
- Total record count.

Counts include Published and Draft records.

Navigation:

- Menu → Categories.
- Features → Features table.
- Testimonials → Testimonials table.
- Admin Management → Admin accounts table.

Cards are clickable.

## 6. Shared Content Management Behavior

Applies to:

- Categories.
- Items.
- Features.
- Testimonials.

### 6.1 Page Structure

Each page includes:

- Page title.
- Short description.
- Search and applicable filters.
- Add button.
- Data table.
- Pagination.

### 6.2 Table Rules

- 10 records per page.
- Newest records first (`createdAt DESC`).
- No manual sorting.
- Previous and Next navigation.
- Display current page and total pages.
- Reset pagination to page 1 when search or filters change.

### 6.3 Search

- Search uses a 5-second debounce.
- Reset the timer whenever the user types.
- Execute only after 5 seconds without typing.
- Continuous typing must prevent the previous search from executing.
- Search and filters work together where applicable.

### 6.4 Loading

Display skeleton table rows during loading.

### 6.5 Empty States

When no records exist:

- Keep table headers.
- Display an empty table body.
- Keep the Add button visible.
- Do not introduce unnecessary illustrations or extra CTAs.

When search returns no results:

- Display a section-specific message.
- Provide a Clear Search action.

Examples:

- No categories found.
- No items found.
- No features found.
- No testimonials found.

### 6.6 Mobile

Tables use horizontal scrolling.

All columns and actions remain available.

## 7. Publishing System

Content records use:

- Published.
- Draft.

### 7.1 New Records

New records default to Published unless otherwise specified.

### 7.2 Published Records

Available actions:

- Edit.
- Delete.

Delete is a soft-delete/unpublish operation.

It changes status from Published to Draft.

It does not permanently delete the record.

Confirmation is required.

### 7.3 Draft Records

Available actions:

- Edit.
- Publish.

Publishing is immediate and does not require confirmation.

### 7.4 Editing

- Edit forms are prepopulated.
- Status is not exposed.
- Editing preserves the existing status.

### 7.5 Successful Actions

After successful operations:

1. Close the modal if applicable.
2. Display success Toast.
3. Refresh the table.
4. Stay on the current page.

## 8. Shared Forms and Modals

Add and Edit use the same modal structure.

### Validation

- Validate on submission.
- Display errors beside fields.
- Keep the modal open after validation failure.
- Preserve entered values.

### Unsaved Changes

When closing or cancelling after changes, display:

`You have unsaved changes. Are you sure you want to discard them?`

Actions:

- Keep Editing.
- Discard Changes.

Without changes, close immediately.

### Feedback

Use consistent success and error Toasts across all pages.

## 9. Categories

Title:

`Categories`

Description:

`Manage your restaurant menu categories.`

### Table

Columns:

- Name.
- Status.
- Actions.

Each row includes a dedicated View Items action.

View Items:

- Opens Items page.
- Preselects the relevant category filter.
- Allows clearing the category filter.

### Add / Edit

Fields:

- Category Name (required).

No description or status field.

New categories default to Published.

### Category Behavior

- Category status is independent of item status.
- Empty categories are allowed.
- Empty categories do not appear on the public landing page.
- Draft categories hide all associated items.
- Publishing a category makes its Published items visible again.
- Changing a category to Draft does not change associated item statuses.

### Unpublishing a Category

If the category contains dishes, confirmation must explain that the dishes will also become hidden from the public landing page.

Confirming changes the category status to Draft only.

Associated item records and statuses remain unchanged.

## 10. Menu Items

Title:

`Items`

Description:

`Manage your restaurant menu items.`

### Table

Columns:

- Item Name.
- Category.
- Price.
- Status.
- Actions.

Category column is not clickable.

### Toolbar

Desktop:

- Search input on the left.
- Category filter beside it.
- Add Item button aligned right.

Mobile:

- Responsive wrapping.
- Preserve the order.

### Search and Filtering

- Search by item name.
- Category filter.
- Both work together.
- Changing one does not clear the other.
- Clearing search preserves category filter.
- Clearing category preserves search.
- Reset pagination when either changes.

### Add / Edit Item

Fields:

1. Item Name (required).
2. Category (required dropdown).
3. Price (required numeric input).
4. Description (optional multiline textarea).
5. Image (one image only).

### Default Category

`Restaurant Special Item`

This category is preselected by default, including when opening Add Item from a filtered category context.

### Price

- Store as a numeric value.
- Initial currency is EUR (€).
- Currency is displayed separately from the input.
- Currency configuration is a future implementation decision.

### Image

- Exactly one image per item.
- Display thumbnail preview.
- Replace and Remove actions.
- Validate file type and maximum size.
- Display upload/loading state.

Allowed file types and maximum size require a technical decision.

### Visibility

An item is visible only when:

`Item.status === Published && Category.status === Published`

A Draft category hides all associated items regardless of item status.

Publishing the category makes its Published items visible again.

Moving a Published item:

- To a Published category: immediately visible.
- To a Draft category: immediately hidden.

No confirmation is required for moving items between categories.

### Unpublishing an Item

Confirmation displays item name and category.

Example:

`Are you sure you want to unpublish "Ribeye Steak" from "Steak"? This item will be unpublished and removed from the public menu.`

Actions:

- Cancel.
- Unpublish Item.

Confirming changes item status to Draft.

Draft item actions are Edit and Publish only.

## 11. Features

Title:

`Features`

Description:

`Manage restaurant features.`

### Table

Columns:

- Title.
- Icon.
- Status.
- Actions.

Do not display descriptions in the table.

### Add / Edit

Fields:

- Title (required).
- Description (optional multiline textarea).
- Icon (optional text input accepting emoji).

New features default to Published.

Features display in creation order.

No manual reordering.

## 12. Testimonials

Title:

`Testimonials`

Description:

`Manage customer testimonials.`

### Table

Columns:

- Quote.
- Author.
- Status.
- Actions.

### Quote Display

- Display shortened preview with ellipsis.
- If truncated, show Read More.
- Read More expands the full quote directly inside the table.
- Show Less collapses it.

### Add / Edit

Fields:

- Quote (required multiline plain text).
- Author (required plain text).

New testimonials default to Published.

No separate customer entity is required.

Author names are entered manually.

Testimonials display in creation order.

No manual reordering.

## 13. Admin Management

Accessible only to Super Admin.

Title:

`Admin Management`

Description:

`Manage authorized dashboard accounts.`

### Table

Columns:

- Username.
- Actions.

Each row has a Delete action only.

### Add Admin

Opens a separate page, not a modal.

Breadcrumb:

`Admin Management / Add Admin`

Fields:

- Username (required).
- Password (required).

Password hidden by default with Show/Hide control.

### Password Policy

- Minimum 8 characters.
- At least one uppercase letter.
- At least one lowercase letter.
- At least one number.
- No mandatory special character.

Display requirements below the field from the beginning.

Update each requirement dynamically while typing.

Invalid passwords cannot be submitted.

Backend enforces the same policy.

### Successful Creation

- Create Admin account.
- Grant dashboard access.
- Redirect to Admin Management.
- Display success Toast.
- Refresh table.

### Remove Admin

Requires confirmation.

Dialog title:

`Remove Admin`

Example:

`Are you sure you want to remove "admin_john"?`

`This account will immediately lose dashboard access, and all active sessions will end.`

Actions:

- Cancel.
- Remove Admin.

Confirming:

- Revokes authorization.
- Immediately invalidates active sessions.
- Displays success Toast.
- Refreshes the table.
- Keeps the user on Admin Management.

Super Admin cannot be created or deleted here.

## 14. Profile

Accessible by both roles through the top navbar.

Title:

`Profile`

Description:

`Manage your account settings.`

### Sections

1. Account Information.
2. Change Password.

### Account Information

Display username.

Username is not editable.

### Change Password

Fields:

- Current Password.
- New Password.
- Confirm New Password.

Requirements:

- Validate current password.
- Validate confirmation match.
- Apply the same password policy as Add Admin.
- Display requirements dynamically.
- Enforce password policy on the backend.

After successful password change:

- Keep current session active.
- Display success Toast.
- Stay on Profile.

### Super Admin Only

Display a read-only section:

`Admin Accounts`

List usernames of other Admin accounts.

No actions are available.

Admin deletion remains in Admin Management only.

## 15. Security Requirements

- Backend authorization is mandatory.
- Protect all dashboard APIs.
- Validate input on the server.
- Use secure password hashing.
- Prevent unauthorized Admin account operations.
- Invalidate sessions when an Admin is removed.
- Do not expose sensitive account data.
- Protect against duplicate usernames.
- Apply appropriate login protection and rate limiting.

Specific technical mechanisms must be decided after project inspection.

## 16. Accessibility and Responsiveness

- Support desktop and mobile layouts.
- Preserve important table information on mobile.
- Provide visible focus states.
- Support keyboard navigation.
- Associate form labels with their fields.
- Display validation errors clearly.
- Maintain readable contrast.
- Respect reduced-motion preferences.

## 17. Unresolved Technical Decisions

The following are not yet confirmed product decisions:

- Database schema.
- API contracts.
- Authentication implementation.
- Session storage strategy.
- Password hashing mechanism.
- Image storage provider.
- Allowed image formats.
- Maximum image size.
- Currency configuration mechanism.
- Duplicate category-name policy.
- API error conventions.
- Login rate limiting.
- Deployment configuration.

Do not invent these details or treat them as approved requirements.