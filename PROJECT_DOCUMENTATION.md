# AfriScience Hub — Full Project Documentation

## Overview

**AfriScience Hub** is a Next.js platform prototype for a pan-African science, technology, innovation, and ecosystem-discovery network. The product brings together institutions, scientists, specialist centers, Afro-Innovations, competitions, awards, voting, support programs, and dashboard-based listing management.

The current app is primarily a frontend prototype. Most public listing pages use local mock datasets, client-side filtering, and presentational interactions. The dashboard is also largely UI-first, with the upload listing flow now being expanded into category-specific forms.

---

## Tech Stack

| Technology | Purpose |
|---|---|
| **Next.js 16.2.2** | App Router framework |
| **React 19.2.4** | UI framework |
| **TypeScript** | Type safety |
| **Tailwind CSS v4** | Utility-first styling |
| **Lucide React** | Primary icon library |
| **React Icons** | Additional icons where needed |
| **ESLint + eslint-config-next** | Linting and Next.js conventions |

---

## Important Framework Note

This project has an explicit local instruction that this is **not the older Next.js shape many agents may remember**.

When changing framework-sensitive areas, read the relevant local docs first:

```text
node_modules/next/dist/docs/
```

Common references:

- Client/server component behavior: `01-app/01-getting-started/05-server-and-client-components.md`
- Project structure: `01-app/01-getting-started/02-project-structure.md`
- Layouts and pages: `01-app/01-getting-started/03-layouts-and-pages.md`
- Images: `01-app/01-getting-started/12-images.md`

Interactive components using `useState`, event handlers, file inputs, portals, dropdowns, or browser APIs must remain client components with `'use client'`.

---

## Project Structure

```text
afriscience-hub/
├── AGENTS.md                         # Local agent instructions
├── README.md                         # Contributor-facing project map
├── PROJECT_DOCUMENTATION.md          # This detailed project documentation
├── SKILL.md                          # Codex project workflow/review skill
├── package.json
├── src/
│   └── app/
│       ├── page.tsx                  # Home page
│       ├── layout.tsx                # Root layout
│       ├── globals.css
│       ├── components/               # Shared public-site components
│       ├── about/                    # Mission/about sections
│       ├── awards/                   # Awards discovery page
│       ├── centers/                  # Specialist centers discovery page
│       ├── competitions/             # Competition discovery page
│       ├── contact/                  # Contact page
│       ├── cookies/                  # Cookie policy
│       ├── dashboard/                # User workspace and listing upload flow
│       ├── faq/                      # FAQ page
│       ├── impact/                   # Impact stories page
│       ├── innovations/              # Afro-Innovations discovery page
│       ├── institutions/             # Institutions discovery page
│       ├── login/                    # Login UI
│       ├── pages/                    # Duplicate/legacy policy route copies
│       ├── privacy/                  # Privacy policy
│       ├── scientists/               # Scientists discovery page
│       ├── signup/                   # Signup UI
│       ├── support/                  # Donate/sponsor/volunteer flows
│       ├── terms/                    # Terms page
│       └── voting/                   # Voting/finalist discovery page
```

---

## Shared Public Components

Located in `src/app/components`.

| File | Purpose |
|---|---|
| `header.tsx` | Global navigation, search trigger, notification/profile UI |
| `footer.tsx` | Global footer |
| `search.tsx` | Sitewide search modal shell |
| `hero.tsx` | Home page hero |
| `categories.tsx` | Home page category navigation |
| `institutes.tsx` | Featured institutions block |
| `innovations.tsx` | Featured innovations block |
| `centers.tsx` | Featured centers block |
| `programs.tsx` | Program/support presentation |
| `partners.tsx` | Partner section |

---

## Public Route Architecture

### `/`

Main landing page.

Current sections:

- Hero
- Categories
- Featured/top institutes
- Trending innovations
- Specialist centers
- Programs
- Partners

### `/about`

Mission and organizational identity page.

Components:

- `hero.tsx`
- `purpose.tsx`
- `coreValue.tsx`
- `whatWeDo.tsx`
- `team.tsx`
- `join.tsx`

### `/contact`

Contact and communication page.

Components:

- `hero.tsx`
- `getintouch.tsx`

### `/faq`

Searchable FAQ page with grouped accordion-style content.

### `/support`

Support hub for ecosystem contribution.

Subroutes:

- `/support/donate`
- `/support/sponsor`
- `/support/volunteer`

The donate flow includes `support/donate/components/donationModal.tsx`.

### Legal / Policy Pages

Top-level routes:

- `/privacy`
- `/terms`
- `/cookies`

Duplicate or legacy-looking routes also exist:

- `/pages/privacy`
- `/pages/faq`
- `/pages/cookies`

These should be reviewed before long-term maintenance to avoid duplicate content drift.

---

## Discovery Listing Pages

The main discovery pages share a consistent pattern:

- `page.tsx` contains local mock data and filter/search state
- local `components/filterSidebar.tsx`
- local card/list component
- client-side filtering
- active filter chips
- reset/clear behavior
- sticky desktop filter sidebar
- mobile filter toggle where implemented

### `/institutions`

Purpose:

- browse schools, universities, and institutions
- filter by class, ownership, gender, services, status, and location
- sort by recommendation/review quality

Key files:

```text
src/app/institutions/page.tsx
src/app/institutions/components/filterSidebar.tsx
src/app/institutions/components/instituteCards.tsx
src/app/institutions/components/institutesheader.tsx
```

### `/scientists`

Purpose:

- discover scientists, technologists, and experts
- filter by field, profession, service, status, country, and region

Key files:

```text
src/app/scientists/page.tsx
src/app/scientists/components/filterSidebar.tsx
src/app/scientists/components/scientistsCards.tsx
```

### `/innovations`

Purpose:

- showcase African-built innovations and products
- filter by field, interests, ownership, stage, SDGs, and country

Key files:

```text
src/app/innovations/page.tsx
src/app/innovations/components/filterSidebar.tsx
src/app/innovations/components/innovationCards.tsx
```

Current filter behavior:

| Filter | Selection Rule |
|---|---|
| Fields | Single selection |
| Interests | Multiple selections |
| Ownership | Single selection |
| Stage | Multiple selections |
| SDGs | Multiple selections |
| Country | Single select dropdown |

Interest and stage options include info tooltips. Tooltips that might be clipped by scroll containers use body-level portals.

### `/centers`

Purpose:

- browse specialist scientific/technical centers
- filter by field, category, services, ownership, status, country, and region

Key files:

```text
src/app/centers/page.tsx
src/app/centers/components/filterSidebar.tsx
src/app/centers/components/centerCards.tsx
```

### `/competitions`

Purpose:

- browse competitions and challenges
- filter by type, category, and country

Key files:

```text
src/app/competitions/page.tsx
src/app/competitions/components/filterSidebar.tsx
src/app/competitions/components/conpetitionCards.tsx
```

Note: `conpetitionCards.tsx` appears to contain a typo in the filename, but it is the current import target.

### `/voting`

Purpose:

- showcase finalists
- filter by type, competition, category, year, and country
- present vote counts and ranking information

Key files:

```text
src/app/voting/page.tsx
src/app/voting/components/filterSidebar.tsx
src/app/voting/components/votingCards.tsx
```

### `/awards`

Purpose:

- showcase awards and recognitions
- filter by type, category, level, year, and country
- support certificate preview modal behavior

Key files:

```text
src/app/awards/page.tsx
src/app/awards/components/filterSidebar.tsx
src/app/awards/components/awardCards.tsx
```

### `/impact`

Purpose:

- present impact stories and support outcomes
- filter by cause, country, and year

Key files:

```text
src/app/impact/page.tsx
src/app/impact/components/filterSidebar.tsx
src/app/impact/components/impartCards.tsx
```

Note: `impartCards.tsx` appears to contain a typo in the filename, but it is the current import target.

---

## Filter Sidebar Behavior

All requested public listing sidebars currently use accordion behavior:

- opening one section closes the others
- clicking an open section collapses it
- reset clears filters

Affected sidebars:

- awards
- centers
- competitions
- impact
- innovations
- institutions
- scientists
- voting

Implementation note:

- Most sidebars use `openSections` object state.
- Toggle logic maps all section keys, leaving only the clicked section open when appropriate.

---

## Dashboard Architecture

Dashboard routes live under `src/app/dashboard`.

Key files:

```text
src/app/dashboard/layout.tsx
src/app/dashboard/components/dashboard-shell.tsx
src/app/dashboard/components/sidebar.tsx
```

Dashboard sections:

- Overview
- My Profile
- My Listings
- Upload New Listing
- My Services
- Messages
- Invoices
- Notifications
- Reviews
- Verification Status
- Settings
- Donations

The dashboard uses a persistent sidebar pattern with responsive/mobile behavior.

---

## Dashboard Routes

### `/dashboard`

Dashboard root route. The route structure includes a dashboard layout and child pages.

### `/dashboard/overview`

Main dashboard summary page with stats, profile completion framing, and recent activity UI.

### `/dashboard/my-profile`

Profile management route.

Components:

```text
EducationTab.tsx
InterestsTab.tsx
PersonalTab.tsx
ProfessionalTab.tsx
ProfileHeader.tsx
SecurityTab.tsx
```

### `/dashboard/my-listings`

User listing management page.

### `/dashboard/upload-new-listing`

Category-driven listing upload flow.

Current categories:

- Institute
- Scientist / Technologist
- Specialist Center
- Afro-Innovation
- Competition
- Award

### Other Dashboard Routes

```text
/dashboard/my-services
/dashboard/messages
/dashboard/invoices
/dashboard/notifications
/dashboard/reviews
/dashboard/verification-status
/dashboard/settings
/dashboard/donations
```

These are currently UI/dashboard pages and should be treated as frontend prototype surfaces unless backend integration is explicitly added.

---

## Upload New Listing Flow

Route:

```text
src/app/dashboard/upload-new-listing/page.tsx
```

Responsibilities:

- display six listing category cards
- store `selectedType`
- render the matching category form
- stay small and orchestration-focused

Category form entry points:

```text
src/app/dashboard/upload-new-listing/components/instituteListingForm.tsx
src/app/dashboard/upload-new-listing/components/scientistListingForm.tsx
src/app/dashboard/upload-new-listing/components/centerListingForm.tsx
src/app/dashboard/upload-new-listing/components/afroInnovationListingForm.tsx
src/app/dashboard/upload-new-listing/components/competitionListingForm.tsx
src/app/dashboard/upload-new-listing/components/awardListingForm.tsx
```

Shared files:

```text
src/app/dashboard/upload-new-listing/components/listingTypes.ts
src/app/dashboard/upload-new-listing/components/listingFormScaffold.tsx
```

The non-Afro-Innovation categories currently render the shared scaffold. They are intended to be customized one by one.

---

## Afro-Innovation Listing Form

The Afro-Innovation form is the most customized listing form so far.

Wrapper:

```text
src/app/dashboard/upload-new-listing/components/afroInnovationListingForm.tsx
```

Implementation folder:

```text
src/app/dashboard/upload-new-listing/components/afroInnovationListing/
├── afroInnovationForm.tsx       # Top-level form shell
├── constants.ts                 # Countries, fields, interests, SDGs, units
├── repeatableInputs.tsx         # Specifications, bullet inputs, document/media uploads
├── sections.tsx                 # Identity, Details, Inventor sections
├── selectFields.tsx             # Single/multi select dropdowns and portal tooltips
└── sharedFields.tsx             # Accordion, basic inputs, country search, bio field
```

Current line counts:

| File | Lines |
|---|---:|
| `afroInnovationForm.tsx` | 62 |
| `constants.ts` | 152 |
| `repeatableInputs.tsx` | 360 |
| `sections.tsx` | 149 |
| `selectFields.tsx` | 199 |
| `sharedFields.tsx` | 153 |

Project rule:

- no file should exceed 500 lines
- split components before they become monolithic

### Afro-Innovation Form Sections

#### 1. Innovation Identity

Fields:

- Profile Image
  - image-only file input
  - accepts JPG, PNG, WEBP, GIF
- Innovation Name
- Country
  - Africa-only searchable dropdown
- Short Bio / Description
  - 500-word limit

#### 2. Innovation Details

Fields:

- Innovation Field
  - multi-select
  - max 3 selections
- Interests
  - multi-select
  - max 3 selections
  - info tooltips
- Ownership
  - single-select
- Stage
  - single-select
  - info tooltips
- SDGs
  - multi-select
  - max 5 selections
- Specifications
  - repeatable materials inputs
  - repeatable dimension rows with length, width, height, and unit
  - repeatable weight rows with unit
- User Groups
  - repeatable bullet inputs
  - max 10 entries
- Applications and Impact
  - repeatable bullet inputs
- Recommendations
  - repeatable bullet inputs
- Cautions
  - repeatable bullet inputs
- Licenses and Certifications
  - repeatable document uploads
  - title caption required for each document
  - text or picture formats
- Honorary Awards
  - repeatable document uploads
  - title caption required for each document
- Media Gallery
  - Working Materials
  - Work-In-Progress
  - Finished Work
  - max 3 uploads per group
  - image or video formats

#### 3. Inventor's Information

Fields:

- Inventor's Name
- Phone Number
- Email Address
- Website, optional
- Social Media Handles
  - LinkedIn
  - Twitter
  - Instagram
  - Facebook

---

## Form Interaction Patterns

### Accordions

Upload form sections are collapsible accordion cards.

Shared dashboard form style:

- white cards
- gray borders
- red required labels/accent icons
- compact labels and text inputs
- dashed upload boxes
- small add buttons for repeatable rows

### Select Controls

Custom dropdown controls exist for:

- multi-select with max-selection limit
- single-select
- tooltip-enhanced options

Tooltips:

- render via `createPortal(..., document.body)`
- use `position: fixed`
- avoid layout shift
- avoid clipping inside scroll/overflow containers

### Repeatable Inputs

Repeatable sections use local state arrays.

Patterns:

- `Add` button appends a new row
- optional max-entry limit disables add button
- bullet-display sections use bullet dot + input row
- upload sections include title/caption inputs

---

## Data Model Reality

Most of the app currently uses local mock data and local state.

Implications:

- no central API layer yet
- no real persistence for listing submissions
- upload inputs are UI-only unless backend integration is added later
- filter/search behavior is client-side only
- dashboard pages are mostly presentational

When backend work begins, likely needed additions include:

- API client layer
- server response types
- validation schemas
- upload handling/storage rules
- auth/session integration
- submission status workflow
- error and success feedback patterns

---

## Styling System

The project uses Tailwind utility classes directly.

Common visual language:

- public listing pages: pale gray/blue backgrounds, white cards, navy/dark text, red actions where appropriate
- dashboard: compact operational layout, white panels, gray borders, red accents, navy submit buttons
- card radius generally small-to-medium (`rounded-lg`, `rounded-xl`, `rounded-2xl`)
- lucide icons inside buttons and section headers

Avoid:

- oversized marketing hero patterns inside dashboard
- decorative blobs/orbs
- deeply nested cards unless representing repeated items or grouped upload/form surfaces
- hard-to-scan dashboard forms
- tooltips that change layout height

---

## Current Validation Commands

Run from the project root:

```bash
npx.cmd tsc --noEmit
npm.cmd run lint
```

Development:

```bash
npm.cmd run dev
```

Production:

```bash
npm.cmd run build
npm.cmd run start
```

PowerShell note:

- `npm run lint` may be blocked by Windows execution policy through `npm.ps1`
- use `npm.cmd run lint` instead

---

## Known Current Warnings

`npm.cmd run lint` currently passes with warnings in unrelated files:

```text
src/app/impact/components/impartCards.tsx
  shareOpen assigned but unused
  selectedStory assigned but unused

src/app/impact/page.tsx
  SlidersHorizontal defined but unused
  setShowMobileFilters assigned but unused

src/app/login/page.tsx
  err defined but unused

src/app/signup/page.tsx
  err defined but unused
```

These are existing warnings and not caused by the recent upload-listing work.

---

## Known Issues And Cleanup Candidates

1. Some filenames appear typo-like:
   - `conpetitionCards.tsx`
   - `impartCards.tsx`
2. Duplicate/legacy policy routes exist under `/pages/*` alongside top-level policy routes.
3. Most flows are UI prototypes without backend submission or persistence.
4. Upload controls currently collect files in the browser UI but do not submit to storage.
5. Some copied text in older files may contain encoding artifacts.
6. `README.md` and this documentation should be kept synchronized when major flows change.

---

## Development Guidelines

### When Adding Listing Filters

Update all connected areas:

- sidebar UI
- filter state type
- default filter values
- predicate logic
- search text fields if relevant
- active tags
- remove tag logic
- card display if the new field is shown

Do not add a filter UI without filtering behavior.

### When Editing Sidebars

Preserve:

- reset behavior
- accordion behavior
- mobile/desktop expectations
- correct single vs multi-select behavior

### When Editing Afro-Innovation Forms

Work inside:

```text
src/app/dashboard/upload-new-listing/components/afroInnovationListing/
```

Do not grow the wrapper file.

Before finishing:

```powershell
Get-ChildItem -Path src/app/dashboard/upload-new-listing/components/afroInnovationListing -File | ForEach-Object { "$($_.Name): $((Get-Content -Path $_.FullName).Count)" }
```

No file should exceed 500 lines.

### When Adding New Category-Specific Listing Forms

Recommended pattern:

```text
components/<category>ListingForm.tsx
components/<category>Listing/
  <category>Form.tsx
  constants.ts
  sections.tsx
  sharedFields.tsx
```

Keep the entry file small and let the folder hold the implementation.

---

## Pre-Merge Checklist

Before merging or handing off:

- [ ] `npx.cmd tsc --noEmit` passes
- [ ] `npm.cmd run lint` passes with no new errors
- [ ] no new file exceeds 500 lines
- [ ] changed UI is wired to state and behavior
- [ ] dropdowns/tooltips do not cause layout shifts
- [ ] file inputs include appropriate `accept` values
- [ ] responsive layout is checked mentally or visually
- [ ] README/documentation updated for major architectural changes
- [ ] no unrelated user changes were reverted

---

## Quick Start

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm.cmd run dev
```

Run type check:

```bash
npx.cmd tsc --noEmit
```

Run lint:

```bash
npm.cmd run lint
```

Build:

```bash
npm.cmd run build
```

---

## Related Documentation

- `README.md` — contributor-friendly project map
- `SKILL.md` — Codex workflow/review skill for this project
- `AGENTS.md` — local agent rules, including the Next.js docs warning
- `node_modules/next/dist/docs/` — local Next.js documentation for this installed version
