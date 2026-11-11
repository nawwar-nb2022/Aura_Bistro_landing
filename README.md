# Aura Bistro

Aura Bistro is a Mediterranean bistro website with a planned private content-management dashboard. The public site introduces the restaurant and its menu to prospective diners. The dashboard is intended to let the restaurant owner and authorized staff maintain selected public-facing content without turning the site into a restaurant operations platform.

## Project status

The public landing page is implemented with locally defined content and simulated asynchronous data loading. The dashboard includes its shared layout, responsive navigation, and an Overview page with placeholder counts. A local demo authentication flow provides password verification, server-side sessions, protected routes, role-aware navigation, logout, and 30-minute idle expiration. Content persistence and content-management workflows are still in progress.

The Overview counts remain placeholders. The local demo authentication is not production-ready and is intended only for a single local development instance.

## Planned dashboard capabilities

The private dashboard is planned to manage:

- Menu categories and menu items.
- Restaurant features and customer testimonials.
- Admin accounts (Super Admin only).
- The current user's profile and password.

The dashboard will have two roles:

- **Super Admin:** Can manage all dashboard content and create or remove Admin accounts. The Super Admin account is provisioned outside the dashboard.
- **Admin:** Can manage categories, items, features, testimonials, and their own profile, but cannot manage other accounts.

Authorization must be enforced by the backend; hiding navigation or protecting frontend routes alone is not sufficient. The local demo includes reusable server-side role guards for protected operations. The planned dashboard does not manage reservations, orders, customers, restaurant operations, opening hours, contact details, social links, the hero section, the story section, or the gallery.

### Planned content behavior

- Content records use Published and Draft statuses. New records default to Published.
- Unpublishing is a confirmed soft-unpublish operation that changes Published to Draft; it does not permanently delete content. Publishing a Draft is immediate.
- A menu item appears publicly only when both the item and its category are Published.
- Content tables use 10 records per page, newest first, with search debounced by 5 seconds.
- Forms validate on submit, preserve entered values after errors, and confirm before discarding unsaved changes.
- The dashboard is responsive: navigation becomes an overlay on mobile and tables remain horizontally scrollable.

## Technology

The current application uses:

- Next.js 16 App Router
- React 19 and TypeScript
- Tailwind CSS 4
- Base UI and shared UI primitives
- Lucide React icons

The intended application structure keeps route pages and layouts in the App Router. Static display and data-oriented page content should remain Server Components by default; Client Components are reserved for interactive controls such as the mobile navigation overlay. Authentication currently uses PBKDF2-hashed fixture credentials and a local JSON session file. A production database, authentication provider, content API contract, and image storage provider remain undecided.

## Getting started

Install dependencies and run the development server:

```powershell
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Local demo sign-in

Sign in at `/login` with either demo account:

| Role | Username | Password |
| --- | --- | --- |
| Super Admin | `demo-owner` | `AuraBistroOwner!2026` |
| Admin | `demo-staff` | `AuraBistroStaff!2026` |

Only salted password hashes are stored in `data/demo-users.json`. Active sessions are written to `data/auth-sessions.local.json`, which is ignored by Git. This file-based store is for local, single-instance development only; do not deploy it as a production authentication system.

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Next.js development server |
| `npm run build` | Create a production build |
| `npm run start` | Start the production server after building |
| `npm run lint` | Run ESLint |

## Project structure

```text
app/
  (landing)/              Public restaurant site routes
  (admin)/dashboard/      Dashboard layout and Overview route
  globals.css             Global styles and design tokens
actions/                  Simulated asynchronous content actions
components/
  admin/                  Shared dashboard navigation and layout
  global/                 Public navigation and footer
  ui/                     Reusable UI primitives
data/                     Local sample content and shared types
lib/                      Shared utilities
.agent/_docs/              Product requirements, plan, and task status
```

## Product and implementation documentation

The `.agent/_docs/` directory is the source of truth for the product scope, requirements, dashboard behavior, wireframes, design system, and implementation progress. Review the relevant documents there before extending the dashboard. Product behavior should not be changed without approval.

## Current limitations

- Public menu, feature, and testimonial content is local sample data; asynchronous actions simulate delayed data loading and do not call a live API.
- The reservation form is a visual interface and does not submit or store reservations.
- The dashboard's local authentication demo is not production-ready; content data does not yet persist, and content APIs are not implemented.
- The planned database, APIs, sessions, and image uploads are not yet available.
