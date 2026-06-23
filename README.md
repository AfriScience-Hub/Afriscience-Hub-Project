# AfriScience Hub

A Next.js platform prototype for a pan-African science, technology, innovation, and ecosystem-discovery network. Browse institutions, scientists, Afro-Innovations, specialist centers, competitions, awards, and voting — plus a full dashboard for listing management.

## Tech Stack

| Technology | Purpose |
|---|---|
| **Next.js 16** | App Router framework |
| **React 18/19** | UI framework |
| **TypeScript 6** | Type safety |
| **Tailwind CSS v4** | Utility-first styling |
| **shadcn/ui** (Radix-based) | Accessible component primitives |
| **Lucide React** | Icon library |
| **Recharts** | Dashboard charts |
| **React Hook Form** | Form state management |
| **Leaflet** | Map rendering |

## Quick Start

```bash
npm install
npm run dev        # → http://localhost:3000
npx tsc --noEmit   # Type check
npm run lint       # Lint (use npm.cmd on Windows if PS policy blocks npm)
npm run build      # Production build
```

## Routes

| Route | Description |
|---|---|
| `/` | Landing page with hero, categories, featured sections |
| `/about` | Mission, values, team, services |
| `/contact` | Contact form and information |
| `/competitions` | Browse current competitions (Afri-Anime, Afri-Presentations, Afri-Memes, Afri-MySpace) |
| `/competitions/[id]` | Competition detail with apply flow |
| `/competitions/[id]/apply` | Multi-step application form |
| `/competitions/[id]/submission` | Post-application media upload |
| `/competitions/pastcompetition` | Browse past competition finalists |
| `/voting` | Live voting dashboard with persistent votes |
| `/awards` | Browse awards and fellowships with certificate preview |
| `/innovations` | Afro-Innovations directory with advanced filtering |
| `/innovations/[id]` | Innovation detail page |
| `/institutes` | Institutions directory |
| `/institutes/[id]` | Institution detail (overview, academics, gallery, etc.) |
| `/scientists` | Scientists and technologists directory |
| `/scientists/[id]` | Scientist detail page |
| `/specialist-centers` | Specialist centers directory |
| `/specialist-centers/[id]` | Center detail page |
| `/impact` | Impact stories directory |
| `/impact/[id]` | Impact story detail with timeline and gallery |
| `/impact/apply` | Apply for impact support |
| `/faq` | Searchable FAQ |
| `/support` | Support hub |
| `/support/donate` | Donation flow |
| `/support/sponsor` | Sponsor opportunities |
| `/support/volunteer` | Volunteer opportunities |
| `/login` | Login UI |
| `/signup` | Signup UI |
| `/profile` | User profile |
| `/privacy-policy` | Privacy policy |
| `/terms-of-service` | Terms of service |
| `/cookie-policy` | Cookie policy |

### Dashboard Routes

| Route | Description |
|---|---|
| `/dashboard/overview` | Stats and recent activity |
| `/dashboard/my-profile` | Profile editing (personal, professional, education, etc.) |
| `/dashboard/my-listings` | CRUD for user's submitted listings |
| `/dashboard/upload-new-listing` | Multi-type listing upload (6 categories) |
| `/dashboard/my-services` | Service offerings |
| `/dashboard/messages` | Inbox |
| `/dashboard/invoices` | Invoice tracking |
| `/dashboard/notifications` | Notification center |
| `/dashboard/reviews` | Reviews and ratings |
| `/dashboard/verification-status` | Verification tracking |
| `/dashboard/settings` | Account settings |
| `/dashboard/donations` | Donation history |
| `/dashboard/archive` | Archived items |
| `/dashboard/awards` | User's awards |

## Competition Types

- **Afri – Anime** (18+) — Anime-themed competition
- **Afri – Presentations** — 6 categories: Lower Primary, Upper Primary, Junior Secondary, Senior Secondary, Undergraduates, Graduates
- **Afri – Memes** (18+) — Meme creation competition
- **Afri – MySpace** (18+) — Personal space design competition

## Key Features

- **Live voting** — Track votes in real time with localStorage persistence, one-vote-per-category enforcement
- **Competition submission flow** — Multi-step: details → application (with payment modal) → media upload
- **Afri-Presentations** — Full per-category details, apply, and submission pages with shared components
- **Past competitions** — Browse concluded finalists with filtering and work preview modals
- **Awards with preview** — Certificate and badge preview modal
- **Dashboard upload listing** — 6 category-specific listing forms (Afro-Innovation is the most customized, with dedicated form sections)
- **Shared UI library** — 40+ shadcn/ui-style components built on Radix primitives

## Data

All listing pages currently use local mock datasets and client-side filtering. No backend API layer is connected. Dashboard forms collect data in the browser UI but do not persist to a server.

## Documentation

- `PROJECT_DOCUMENTATION.md` — Full architectural reference
- `SKILL.md` — Workflow and review checklist
- `AGENTS.md` — Agent rules (Next.js version warnings, code limits)
- `ATTRIBUTIONS.md` — Third-party attributions
