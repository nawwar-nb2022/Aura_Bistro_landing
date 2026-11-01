# Aura Bistro

Aura Bistro is a responsive restaurant landing page for a fictional Mediterranean bistro. It gives prospective diners a single place to explore the restaurant’s story, featured dining experience, sample menu, guest testimonials, and contact and reservation information.

## What’s included

- Restaurant hero, about, and feature sections
- Menu organized into starters, mains, and desserts
- Guest testimonials
- Contact details and a reservation-request form UI
- Responsive navigation and a shared footer
- Loading skeletons and asynchronous data-result handling for feature and menu sections

> **Current scope:** Menu, feature, and testimonial content comes from local static data. The asynchronous actions simulate delayed data fetching; they do not call a live API. The reservation form is a visual interface only and does not submit or store reservations.

## Tech stack

- [Next.js](https://nextjs.org/) 16 App Router
- React 19 and TypeScript
- Tailwind CSS 4
- Shadcn UI components and Base UI primitives
- Lucide React icons

The page is composed from section components. Typed static content lives in `data/`, while asynchronous functions in `actions/` return success-or-error results. The app does not currently include a database or external API integration.

## Getting started

Install dependencies and start the development server:

````powershell
npm install
npm run dev
````

Open [http://localhost:3000](http://localhost:3000).

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Next.js development server |
| `npm run build` | Create a production build |
| `npm run start` | Start the production server (run after `npm run build`) |
| `npm run lint` | Run ESLint |

## Project structure

````text
app/
  globals.css          Global styles
  layout.tsx           Root layout, fonts, navigation, and footer
  loading.tsx          Page loading skeleton
  page.tsx             Home page and section composition
  favicon.ico
actions/
  Features.tsx         Feature data action
  Menu.tsx             Menu data action
  Testimonials.tsx     Testimonial data action
data/
  static.ts            Local menu, feature, and testimonial data
  types.ts             Shared data types
components/
  about.tsx
  ContactSection.tsx
  feature.tsx
  hero.tsx
  menu_section.tsx
  Testimonials.tsx
  global/
    footer.tsx
    navbar.tsx
  loading/
  ui/                  Shared button, skeleton, and spinner components
lib/
  utils.ts             Shared utility functions
public/                Static assets
````

## Project status

This repository currently provides the restaurant landing-page experience and simulated local data loading. Real reservation submission, persistent storage, and live menu or testimonial services are not implemented.
