# Restaurant Dashboard --- Previously Agreed Product Requirements

This document captures the product scope and behavioral requirements
agreed before the wireframing stage. It is separate from the
wireframe/design specification.

## 1. Product purpose

A private dashboard for maintaining selected content on the public
restaurant website. It is a content-management tool, not a restaurant
operations platform.

## 2. In-scope content

The dashboard manages: - Menu Categories - Menu Items - Restaurant
Features - Customer Testimonials - Dashboard Admin accounts (Super Admin
only) - The current user's profile and password

## 3. Explicitly out of scope

The dashboard does not manage: - Hero section - About / Story section -
Gallery - Contact details - Opening hours - Social links -
Reservations - Orders - Customers or customer accounts - Restaurant
operations

## 4. Roles and permissions

### Super Admin

-   Represents the restaurant owner.
-   Has access to all content-management sections.
-   Can create and remove regular Admin accounts.
-   Has exclusive access to Admin Management.
-   Account is created/provisioned manually outside the dashboard.
-   Cannot be created or deleted through Admin Management.

### Admin

-   Created by the Super Admin.
-   Has the same permissions as Super Admin for Categories, Items,
    Features, and Testimonials.
-   Can access and update their own Profile/password.
-   Cannot access Admin Management.
-   Cannot self-register or create other Admin accounts.

### Authorization

-   Backend/database/API must enforce role-based authorization.
-   Frontend route guards and hidden navigation items are supplementary
    only; they are not a security boundary.

## 5. Authentication

### Login

-   Username and Password fields.
-   No public registration.
-   No forgot-password or reset-password flow.
-   Invalid login uses the generic message:
    `Username or password is incorrect.`
-   Successful login redirects to Overview.
-   Logout immediately ends the session, without a confirmation dialog.

### Session expiry

-   30 minutes of inactivity.
-   No warning modal before expiry.
-   Expiry must be enforced server-side.
-   Frontend activity tracking may improve user experience but cannot be
    the authority.
-   Meaningful user activity resets the idle timer; background polling
    and data fetching do not.
-   Protected requests must validate the session.
-   On expiry, invalidate the session and redirect to Login.
-   Requests made with an expired session return HTTP 401.

## 6. Content publishing and visibility

### Status model

-   Content records use Published or Draft.
-   New Categories, Items, Features, and Testimonials default to
    Published.
-   Editing does not expose a Status field and must preserve the current
    status.
-   Published record action: Edit and Delete.
-   Draft record action: Edit and Publish.
-   Delete is a soft-unpublish operation that changes Published to
    Draft; it is not permanent deletion.
-   Publishing a Draft is immediate and does not require confirmation.
-   Unpublishing a Published record requires confirmation.

### Menu visibility

-   An Item appears publicly only if both the Item and its Category are
    Published.
-   Draft Category hides all associated Items from the public landing
    page, even if those Items remain Published.
-   Changing a Category to Draft does not change associated Item
    statuses.
-   Republishing the Category makes its Published Items visible again.
-   Moving an Item between Categories is immediate and requires no
    confirmation. The resulting visibility follows the statuses of the
    Item and destination Category.

### Categories

-   Empty categories are allowed.
-   Empty categories do not appear on the public landing page.
-   Category status is independent from Item status.
-   If a Category with associated Items is unpublished, the confirmation
    must explain that those Items will also be hidden publicly. Only the
    Category status changes.

## 7. Menu Items data and form requirements

-   Required: Item Name, Category, Price.
-   Optional: Description and Image.
-   Description is plain multiline text.
-   One image per Item maximum.
-   Image upload supports preview, Replace, and Remove.
-   Validate image file type and maximum size.
-   Show upload/loading state.
-   Category dropdown includes all Categories.
-   `Restaurant Special Item` is preselected by default, including when
    the Add Item form is opened from a category-filtered context.
-   Price is stored as a numeric value; currency is displayed
    separately.
-   Initial currency: EUR (€). Currency was expected to be configurable
    later, but its settings location/management flow was not designed.

## 8. Features

-   Required Title.
-   Optional plain-text Description.
-   Optional Icon as text, accepting/pasting emoji.
-   No manual ordering; display in creation order.

## 9. Testimonials

-   Required Quote.
-   Required Author name.
-   Author is plain text, entered manually.
-   No separate customer account/entity.
-   Long quotes should be expandable in the dashboard table.
-   No manual ordering; display in creation order.

## 10. Admin account management

-   Super Admin creates Admin accounts.
-   Admin creation uses Username and Password.
-   Password requirements:
    -   Minimum 8 characters.
    -   At least one uppercase letter.
    -   At least one lowercase letter.
    -   At least one number.
    -   No special character is mandatory.
-   Requirements should be visible from the start and update dynamically
    as the password is typed.
-   Backend must enforce the password policy.
-   Removing an Admin revokes access and ends that Admin's active
    sessions immediately.

## 11. Profile

-   Both roles can access Profile.
-   Username is displayed but is not editable.
-   Both roles can change their own password.
-   Change-password form includes Current Password, New Password,
    Confirm New Password.
-   Validate current password and matching confirmation.
-   Use the same password policy as Admin creation.
-   Successful password change keeps the current session active.
-   Super Admin sees a read-only list/table of other Admin usernames in
    Profile; no management actions are provided there.

## 12. Shared content-management behavior

-   Content lists use 10 records per page.
-   Default ordering is newest first (`createdAt DESC`).
-   No manual sorting.
-   Previous/Next pagination with current page and total pages.
-   Search debounce is 5 seconds after the last keystroke.
-   If the user continues typing, no search request is sent until typing
    stops for 5 seconds.
-   Search/filter changes reset pagination to page 1.
-   Loading uses skeleton table rows.
-   Empty datasets retain the normal table headers with an empty body;
    no extra empty-state message or CTA.
-   Search with no matches displays a section-specific `No ... found.`
    message and `Clear Search`.
-   Mobile tables use horizontal scrolling; do not hide columns.
-   Successful create/edit/publish/unpublish actions show a Toast,
    refresh the table, and keep the user on the same page.
-   Form validation occurs on submit; errors appear beside fields,
    entered values are preserved, and the modal remains open.
-   Closing/canceling a modified form asks for confirmation:
    `You have unsaved changes. Are you sure you want to discard them?`
    Options: `Keep Editing` and `Discard Changes`.
-   If there are no changes, close immediately.

## 13. Dashboard navigation and layout requirements

-   Persistent desktop sidebar with icons and labels.
-   Sidebar entries: Overview; Menu (collapsible) with Categories and
    Items; Features; Testimonials; Admin Management (Super Admin only).
-   Top bar: breadcrumbs, Profile access, Logout.
-   Profile is not a sidebar entry.
-   Mobile sidebar starts icon-only; expands as an overlay without
    resizing content; closes after selecting a section or clicking
    outside.
-   Overview uses two columns on desktop and one column on mobile.
-   Overview cards navigate to the relevant section.
-   Overview counts include Draft records.
-   Admin Management Overview card is visible only to Super Admin.

## 14. Section-specific list and form definitions

  -----------------------------------------------------------------------
  Section                 List columns            Add/Edit fields
  ----------------------- ----------------------- -----------------------
  Categories              Name, Status, Actions   Category Name
                                                  (required)

  Items                   Item Name, Category,    Item Name*, Category*,
                          Price, Status, Actions  Price\*, Description,
                                                  Image

  Features                Title, Icon, Status,    Title\*, Description,
                          Actions                 Icon

  Testimonials            Quote, Author, Status,  Quote*, Author*
                          Actions                 

  Admin Management        Username, Actions       Separate Add Admin
                                                  page: Username*,
                                                  Password*
  -----------------------------------------------------------------------

`*` indicates required.

## 15. Decisions not yet specified

These were not fully defined in the pre-wireframe requirements and
should not be invented as settled product decisions: - Exact accepted
image formats and maximum file size. - Duplicate-name rules and exact
validation/error messages. - Exact username uniqueness policy and error
copy. - Where currency is configured and whether changing it affects
existing menu prices. - Exact visual design tokens, fonts, breakpoints,
and final high-fidelity styling. - Whether Admin account tables need
pagination at larger account counts (reuse the shared table pattern
unless decided otherwise).
