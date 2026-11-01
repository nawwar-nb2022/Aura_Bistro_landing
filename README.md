Aura Bistro | Modern Restaurant Landing Page

1. Project Context & High-Level Purpose

Problem & Value Proposition

Many local restaurants suffer from slow, non-responsive templates or clunky third-party widgets that degrade brand identity and create unnecessary friction for prospective diners. Aura Bistro solves this by delivering a high-performance, responsive single-page storefront. It showcases artisanal culinary offerings, brand philosophy, and reservation capabilities with zero backend bloat while maintaining modern production standards.

Target Audience & Major User-Facing Capabilities

Target Audience: Local diners, food critics, and patrons seeking artisanal Mediterranean cuisine, operating schedules, and table reservations.

User-Facing Capabilities:

Interactive Navigation: Sticky, responsive header with smooth section jumping.

Immersive Hero & Value Pillars: Dynamic hero presentation paired with core experience highlights (Farm-to-Table, Master Chefs, Artisanal Drinks).

Asynchronous Menu Showcase: Categorized seasonal menu (Starters, Mains, Desserts) backed by simulated server data layers and error fallbacks.

Social Proof & Testimonials: Highlighted guest and critic reviews.

Reservation Interface: Accessible reservation form equipped with date selection, guest controls, and special request options.

Streaming Skeleton States: Instant, flicker-free initial loads leveraging Next.js streaming and Shadcn UI skeleton loaders.

2. Production Architecture & Tech Stack Choices

Tech Stack

Framework: Next.js 15+ (App Router) — Selected for native React Server Component support, streaming SSR, and SEO metadata configuration.

Language: TypeScript — Ensures end-to-end type safety across server actions, datasets, and component props.

Styling & Components: Tailwind CSS & Shadcn UI — Used for accessible UI primitives (Button, Spinner, Skeleton) and neutral-dark mode aesthetics.

Data Layer: Asynchronous server actions (actions/) consuming typed static datasets (data/) with built-in try/catch error handling and safe fallbacks.

Project Directory Structure

aura-bistro/
├── actions/                  # Server action handlers & async data fetchers
│   ├── feature.ts
│   ├── menu.ts
│   └── testimonials.ts
├── app/
│   ├── globals.css           # Tailwind directives & smooth-scroll rules
│   ├── layout.tsx            # Root layout wrapping Navbar & Footer
│   ├── loading.tsx           # Full-page streaming skeleton fallbacks
│   └── page.tsx              # Main root page assembling sections
├── components/
│   ├── global/               # Persistent global layout components
│   │   ├── Footer.tsx        # Suspense-wrapped dynamic footer
│   │   └── Navbar.tsx        # Site navigation header
│   ├── sections/             # Modular landing page sections
│   │   ├── About.tsx
│   │   ├── Contact.tsx
│   │   ├── Features.tsx
│   │   ├── Hero.tsx
│   │   ├── Menu.tsx
│   │   └── Testimonials.tsx
│   └── ui/                   # Shadcn UI primitives & loaders
│       ├── button.tsx
│       ├── skeleton.tsx
│       └── spinner.tsx
├── data/                     # Centralized static datasets & TypeScript interfaces
│   ├── featureData.ts
│   ├── menuData.ts
│   └── testimonialsData.ts
├── lib/
│   └── utils.ts              # Class merging helper (clsx + tailwind-merge)
└── public/                   # Static brand assets


3. Getting Started & Development

Clone the repository:

git clone https://github.com/nawwar-nb2022/aura-bistro.git
cd aura-bistro


Install dependencies:

npm install


Run the development server:

npm run dev


Build and test for production performance:

npm run build
npm run start


Open http://localhost:3000 in your browser to view the application.