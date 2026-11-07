# Dashboard Wireframe Specification

## 1. Shared Dashboard Shell

### Sidebar

- Overview.
- Menu (collapsible).
  - Categories.
  - Items.
- Features.
- Testimonials.
- Admin Management (Super Admin only).

Profile is accessed through the top navbar.

### Top Navbar

- Breadcrumbs.
- Profile icon and username.
- Logout.

### Mobile

- Sidebar initially displays icons only.
- Expanding opens it as an overlay.
- Selecting a navigation item closes it.
- Clicking outside closes it.
- Main content does not resize.

## 2. Overview

Title: Overview.

Description: Manage your restaurant website content.

Two-column desktop grid and one-column mobile grid.

Cards:

- Menu.
- Features.
- Testimonials.
- Admin Management (Super Admin only).

Each card includes icon, name, description, and record count.

## 3. Categories

Title: Categories.

Description: Manage your restaurant menu categories.

Toolbar:

- Search category name.
- Add Category.

Table:

- Name.
- Status.
- Actions.

Each row includes View Items.

View Items navigates to Items with the relevant category filter selected.

Add/Edit Category modal:

- Category Name (required).

Published category actions: Edit and Delete.

Draft category actions: Edit and Publish.

## 4. Items

Title: Items.

Description: Manage your restaurant menu items.

Toolbar:

- Search item name.
- Category filter.
- Add Item.

Table:

- Item Name.
- Category.
- Price.
- Status.
- Actions.

Add/Edit Item modal:

- Item Name.
- Category.
- Price.
- Description.
- Image.

Image supports preview, Replace, and Remove.

Published item actions: Edit and Delete.

Draft item actions: Edit and Publish.

## 5. Features

Title: Features.

Description: Manage restaurant features.

Toolbar:

- Search.
- Add Feature.

Table:

- Title.
- Icon.
- Status.
- Actions.

Add/Edit Feature modal:

- Title.
- Description.
- Icon.

## 6. Testimonials

Title: Testimonials.

Description: Manage customer testimonials.

Toolbar:

- Search.
- Add Testimonial.

Table:

- Quote.
- Author.
- Status.
- Actions.

Long quotes display shortened previews.

Read More expands the quote inside the table.

Show Less collapses it.

Add/Edit Testimonial modal:

- Quote.
- Author.

## 7. Admin Management

Super Admin only.

Title: Admin Management.

Description: Manage authorized dashboard accounts.

Toolbar:

- Add Admin.

Table:

- Username.
- Actions.

Each row has Delete only.

Add Admin opens a separate page.

Breadcrumb: Admin Management / Add Admin.

Fields:

- Username.
- Password.

Password is hidden by default and includes Show/Hide.

Password requirements are displayed and updated dynamically.

## 8. Profile

Accessible through the top navbar.

Title: Profile.

Description: Manage your account settings.

Sections:

### Account Information

- Username (read-only).

### Change Password

- Current Password.
- New Password.
- Confirm New Password.

Super Admin additionally sees a read-only Admin Accounts table listing other Admin usernames.

## 9. Shared Interaction Patterns

- Search debounce: 5 seconds.
- Pagination: 10 records per page.
- Sorting: newest first.
- Loading: skeleton table rows.
- Empty data: standard table headers and empty body.
- No search results: section-specific message and Clear Search.
- Add/Edit: shared modal structure.
- Validation: inline errors.
- Unsaved changes: confirmation dialog.
- Success: Toast, refresh, remain on current page.
- Published records: Edit and Delete.
- Draft records: Edit and Publish.
- Delete: soft-delete/unpublish, not permanent deletion.
- Publish: immediate without confirmation.

## 10. Responsive Behavior

- Desktop sidebar is persistent.
- Mobile sidebar is an overlay.
- Tables scroll horizontally.
- Cards stack vertically on mobile.
- Modals adapt to mobile width.
- Do not hide important information on mobile.

## 11. Source of Truth

This document defines the approved dashboard page structures and interactions.

If an implementation decision conflicts with this document, stop and clarify before changing the approved behavior.