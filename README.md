# AfriScience Hub

AfriScience Hub is a Next.js platform prototype for a pan-African science and technology ecosystem. The product is designed to bring together institutions, scientists, specialist centers, innovations, competitions, voting, awards, support programs, and public-facing informational content in one place.

This README is meant to give collaborators fast context:

- what the project is trying to do
- how the user moves through the product
- what each page is responsible for
- how the current frontend is structured
- which areas are complete, active, or still placeholders

This document should evolve as the product grows.

## Product Goal

The platform presents AfriScience Hub as a central discovery and engagement layer for African science.

At a high level, users should be able to:

- discover institutions, scientists, innovations, and specialist centers
- explore competitions and recognize winners
- participate in voting and public engagement flows
- support the ecosystem through sponsorship, donation, and volunteering
- understand the mission, team, policies, and contact paths behind the platform

## Current App Flow

The current product flow is mostly public-facing and discovery-driven.

1. A user lands on the home page and is introduced to the ecosystem.
2. From there, they can navigate into major content categories such as institutions, innovations, centers, competitions, scientists, voting, and awards.
3. Most listing pages follow the same UX model:
   - page intro/header
   - search input
   - sticky filter sidebar on desktop
   - mobile filter toggle
   - filtered result cards
   - active filter chips with clear/reset actions
4. Users can then move into support-oriented pages such as sponsorship, donation, and volunteering.
5. Informational pages like About, FAQ, Contact, Privacy, Terms, and Cookies provide trust, orientation, and operational context.

## Design Pattern Used Across Listing Pages

Several routes share a common structure and should continue to feel visually related:

- `institutions`
- `scientists`
- `innovations`
- `centers`
- `competitions`
- `voting`
- `awards`

Shared interaction pattern:

- `Header` and `Footer`
- `SearchModal` available from the global header
- page-specific introductory copy
- client-side dummy/mock dataset stored in the page component
- `useState` for search and filters
- `useMemo` or inline filtering for computed results
- left filter sidebar with reset action
- responsive card grids

This is one of the strongest current UI conventions in the codebase and should stay consistent as more directory-style pages are added.

## Route Breakdown

### Core Discovery Pages

#### `/`
Home page. This is the main entry point into the ecosystem.

Current sections:

- hero
- categories
- top-rated institutes
- trending innovations
- specialist centers
- programs
- partners

Purpose:

- introduce AfriScience Hub
- surface major content types
- guide users deeper into the ecosystem

#### `/institutions`
Institution discovery page for schools and academic institutes.

Purpose:

- help users browse schools/institutions
- filter by status, class, gender, ownership, services, country, and region
- sort institutions by recommendation/review quality

Notable UI behavior:

- custom institutions header
- searchable/sortable listing results
- filter sidebar with multiple dimensions

#### `/scientists`
Scientist and technologist directory.

Purpose:

- connect users with experts across fields
- expose professional services, status, ratings, and regions
- support browsing by field, profession, service, status, country, and region

#### `/innovations`
Innovation showcase for African-built products and solutions.

Purpose:

- display inventions and applied solutions
- support discovery by field, interest type, ownership, SDGs, and country
- highlight creators and innovation metadata

#### `/centers`
Specialist center directory.

Purpose:

- list scientific/technical service centers and labs
- support filtering by field, category, services, ownership, availability status, country, and region
- present cards with richer establishment metadata such as ratings and engagement stats

#### `/competitions`
Competition discovery page.

Purpose:

- surface open or sample competition opportunities
- help users browse competitions by type, category, and country
- present entry details like registration fee, deadline, and participant count

#### `/voting`
Voting interface for finalists.

Purpose:

- showcase competition finalists
- support filtering by type, competition, category, year, and country
- present vote counts and rank positions
- support sharing flows for the voting page and specific contestants

Notable UI behavior:

- includes a share modal
- communicates voting rules inline

#### `/awards`
Awards showcase page.

Purpose:

- display recognition across developer, sponsorship, competition, and donation award types
- support filtering by type, year, country, and competition-only category/level fields
- allow users to open a certificate preview modal from each award card

Notable UI behavior:

- uses generated dummy award and certificate visuals
- follows the same grid-based listing structure as the other discovery pages

### Brand / Mission Pages

#### `/about`
About page for organizational context.

Current sections:

- hero
- purpose
- core values
- what we do
- team
- join

Purpose:

- explain the platform's mission
- frame AfriScience Hub as a movement and organization, not just a directory

#### `/impactStories`
Currently a placeholder page.

Intended purpose:

- highlight real outcomes, testimonials, and ecosystem success stories

### Support and Ecosystem Contribution Pages

#### `/support`
Main support landing page.

Purpose:

- route users into sponsorship, donation, and volunteering
- explain why support matters
- show ecosystem-level impact framing

#### `/support/sponsor`
Sponsorship detail page.

Purpose:

- present sponsorship value proposition
- explain benefits for sponsors
- show sponsorship tiers
- encourage organizational partnership conversations

#### `/support/donate`
Donation-focused page.

Purpose:

- present supportable causes
- show progress toward donation goals
- explain impact of donations at different giving levels

#### `/support/volunteer`
Volunteer recruitment page.

Purpose:

- explain volunteer roles
- outline eligibility and benefits
- provide a structured application form

Notable behavior:

- includes role cards, country/region selection, task selection, and compensation preferences
- currently behaves like a mock application flow rather than a connected backend submission

#### `/donate`
Currently a placeholder donation route outside the `/support` tree.

This appears separate from `/support/donate` and should either be built out or consolidated later.

### Engagement / Trust / Utility Pages

#### `/contact`
Contact page with a hero and "get in touch" section.

Purpose:

- provide direct communication paths
- support support/sales/general inquiries

#### `/faq`
Frequently asked questions page.

Purpose:

- explain how the platform works
- answer questions about institutions, scientists, centers, innovations, competitions, voting, awards, sponsors, volunteering, donations, accounts, and technical support

Notable behavior:

- searchable FAQ content
- grouped accordion layout by category

#### `/signup`
Currently a lightweight route and likely intended for future auth onboarding.

#### `/terms`
Terms of Service page.

Purpose:

- set platform usage rules
- establish legal expectations and account responsibilities

#### `/privacy`
Privacy Policy page.

Purpose:

- explain data collection, use, sharing, storage, and rights

#### `/cookies`
Cookie Policy page.

Purpose:

- explain browser cookie usage and preferences

### Duplicate or Legacy-Looking Routes

These routes exist and should be reviewed:

- `/pages/privacy`
- `/pages/faq`
- `/pages/cookies`

They appear to duplicate top-level content pages and may be leftovers, temporary placeholders, or alternate routing experiments. Collaborators should be careful not to maintain both versions unintentionally.

## Shared Components

Some important shared components in `src/app/components`:

- `header.tsx`: global top navigation and search trigger
- `footer.tsx`: global footer
- `search.tsx`: sitewide search modal shell
- `hero.tsx`: home page hero
- `categories.tsx`: home page category navigation block
- `institutes.tsx`: home page featured institutions
- `innovations.tsx`: home page featured innovations
- `centers.tsx`: home page featured centers
- `programs.tsx`: home page programs section
- `partners.tsx`: home page partners section

## Current Data Model Reality

At the moment, most major listing pages are powered by hardcoded sample arrays inside the route component.

That means:

- there is no backend integration yet for these resources
- filters/search are currently client-side only
- the app is functioning as a UI/product prototype or static data-driven frontend

This is good for rapid design iteration, but collaborators should know that many flows are presentational rather than production-integrated.

## Technical Stack

- Next.js `16.2.2`
- React `19.2.4`
- TypeScript
- Tailwind CSS `v4`
- `lucide-react` for icons
- `react-icons` used in some places

## Important Next.js Note

This repository includes an agent instruction warning that this is not a standard older Next.js setup.

If you are making framework-sensitive changes:

- check `node_modules/next/dist/docs/`
- do not assume older Next.js conventions still apply
- pay attention to breaking changes and deprecations

## Project Structure

High-level structure:

```text
src/app/
  components/              # shared sitewide components
  about/                   # about page and sections
  awards/                  # awards listing flow
  centers/                 # specialist centers discovery flow
  competitions/            # competition listing flow
  contact/                 # contact page
  faq/                     # FAQ page
  innovations/             # innovation directory
  institutions/            # institution directory
  scientists/              # scientist directory
  support/                 # support hub + subpages
  voting/                  # finalist voting flow
  privacy/                 # privacy policy
  terms/                   # terms of service
  cookies/                 # cookie policy
```

Most feature directories follow this pattern:

- `page.tsx`
- `components/filterSidebar.tsx`
- `components/*Cards.tsx`

## What Is Already Strong

- consistent listing-page layout language
- good use of reusable search/filter/result patterns
- broad ecosystem coverage across science-related entities
- clear separation between mission pages, discovery pages, and support pages

## What Still Needs Attention

- several routes still look like placeholders or partial mocks
- some content contains encoding issues in copied text
- some routes overlap in purpose (`/donate` vs `/support/donate`, duplicated `/pages/*` routes)
- there is no centralized data layer yet
- interactive flows like voting, donating, volunteering, and signup are not fully connected to real backend logic

## Running the Project

Install dependencies:

```bash
npm install
```

Start the dev server:

```bash
npm run dev
```

Run linting:

```bash
npm run lint
```

## Collaboration Notes

When adding new pages or expanding existing ones:

- preserve the existing design language for similar page types
- keep discovery/listing pages structurally consistent
- document new routes and feature flows in this README
- call out placeholders clearly so future collaborators know what is real vs mock
- avoid creating duplicate routes for the same content unless there is a clear migration plan

## Recommended README Update Habit

As the app grows, this file should be updated whenever:

- a new route is added
- a placeholder becomes a real page
- a major user flow changes
- shared architecture patterns shift
- backend integrations replace static mock data

That way, the README stays a working map of the product instead of drifting into boilerplate.
