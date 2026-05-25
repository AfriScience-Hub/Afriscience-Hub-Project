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
- left filter sidebar with reset action and accordion section behavior
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
- support discovery by field, interest type, ownership, development stage, SDGs, and country
- highlight creators and innovation metadata

Notable UI behavior:

- filter sidebar uses accordion behavior, so opening one filter section collapses the others
- fields and ownership filters are single-select
- interests, stage, and SDGs support multiple selections
- interest and stage options include hover tooltips for explanation

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

## User Dashboard Pages

The dashboard provides authenticated users with a personal workspace to manage their profile, listings, services, and account activity.

### Dashboard Navigation Structure

The dashboard uses a persistent sidebar (on desktop) and mobile-friendly menu with the following sections:

- **Overview** - User statistics and recent activity
- **My Profile** - User profile information and management
- **My Listings** - Browse and manage created listings
- **Upload New Listing** - Create new listings and services
- **My Services** - Manage offered services
- **Messages** - Inbox and messaging system
- **Invoices** - Financial records and billing
- **Notifications** - System notifications and alerts
- **Reviews** - User ratings and feedback
- **Verification Status** - Account verification progress
- **Settings** - Account preferences and configuration

### Dashboard Routes

#### `/dashboard`
Root dashboard route that redirects to overview.

#### `/dashboard/overview`
Main dashboard landing page showing:

- Profile completion status with progress tracking
- Key statistics (views, likes, shares, active listings)
- Recent activity feed
- Account status indicators

Purpose:

- provide quick overview of account health and activity
- show profile completion progress
- display recent interactions and notifications

#### `/dashboard/my-profile`
User profile management page.

Purpose:

- edit personal information
- upload profile photo
- manage contact details
- view profile completeness

#### `/dashboard/my-listings`
Browse and manage all user listings.

Purpose:

- list all created listings
- filter by status (active, pending, archived)
- provide quick actions (edit, delete, promote)
- show listing performance metrics

#### `/dashboard/upload-new-listing`
Form to create new listings and services.

Purpose:

- collect listing/service details
- support file uploads (images, documents)
- provide validation and preview
- submit to platform

Current implementation:

- starts with a six-category picker: Institute, Scientist / Technologist, Specialist Center, Afro-Innovation, Competition, and Award
- each category renders through its own file in `src/app/dashboard/upload-new-listing/components`
- the non-Afro-Innovation categories currently share the original scaffolded form layout
- the Afro-Innovation listing form has its own dedicated component folder and is being customized section by section

Afro-Innovation form status:

- `Innovation Identity`: profile image upload, innovation name, Africa-only searchable country input, and 500-word short bio
- `Innovation Details`: field, interests, ownership, stage, SDGs, specifications, user groups, applications/impact, recommendations, cautions, document uploads, awards uploads, and media gallery uploads
- `Inventor's Information`: inventor name, phone, email, optional website, and social media handles
- interest and stage option descriptions use body-level portal tooltips so they do not shift layout or get clipped by containers

#### `/dashboard/my-services`
Manage offered services and service details.

Purpose:

- list all active services
- edit service offerings
- manage pricing
- track service requests

#### `/dashboard/messages`
Inbox and messaging interface.

Purpose:

- display user conversations
- enable direct messaging with other users
- show message history
- manage conversation threads

#### `/dashboard/invoices`
Financial records and billing history.

Purpose:

- display all invoices and transactions
- show payment status
- enable invoice downloads
- track financial activity

#### `/dashboard/notifications`
Notifications management page.

Purpose:

- display all system notifications
- filter notifications by type
- mark as read/unread
- manage notification preferences

#### `/dashboard/reviews`
User ratings and feedback management.

Purpose:

- display received reviews
- show rating distribution
- enable response to reviews
- manage review reputation

#### `/dashboard/verification-status`
Account verification progress tracking.

Purpose:

- show verification requirements
- display verification progress
- provide verification status updates
- show required documents

#### `/dashboard/settings`
Account preferences and configuration.

Purpose:

- manage account settings
- update security preferences
- configure notifications
- manage privacy settings

### Header Updates

The application header now includes:

- **Notification Icon** - With dropdown showing recent notifications and link to full notifications page
- **Profile Dropdown** - Shows user info and quick links to profile, dashboard, and settings
- Maintains existing navigation for non-authenticated state

### Dashboard Layout Components

#### Sidebar Component (`/dashboard/components/sidebar.tsx`)
Persistent sidebar navigation:

- Lists all dashboard sections with icons
- Highlights current active page
- Responsive behavior (hidden on mobile, toggled via button)
- Smooth transitions and hover states

Features:
- Icon + label for each section
- Active state styling with red highlight and border
- Mobile menu toggle button (fixed position on mobile)
- Overlay when mobile menu is open

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

- `header.tsx`: global top navigation with search, notifications dropdown, and profile dropdown (authenticated state)
- `footer.tsx`: global footer
- `search.tsx`: sitewide search modal shell
- `hero.tsx`: home page hero
- `categories.tsx`: home page category navigation block
- `institutes.tsx`: home page featured institutions
- `innovations.tsx`: home page featured innovations
- `centers.tsx`: home page featured centers
- `programs.tsx`: home page programs section
- `partners.tsx`: home page partners section

Dashboard-specific components in `src/app/dashboard/components`:

- `sidebar.tsx`: persistent sidebar navigation with all dashboard sections, responsive mobile toggle, and active page highlighting

Upload listing components in `src/app/dashboard/upload-new-listing/components`:

- `listingTypes.ts`: listing category metadata and shared listing types
- `listingFormScaffold.tsx`: shared temporary scaffold used by the non-customized listing categories
- `instituteListingForm.tsx`, `scientistListingForm.tsx`, `centerListingForm.tsx`, `competitionListingForm.tsx`, and `awardListingForm.tsx`: category-specific entry points that currently render the shared scaffold
- `afroInnovationListingForm.tsx`: small wrapper that renders the customized Afro-Innovation form
- `afroInnovationListing/`: focused components for the Afro-Innovation listing flow, split into constants, shared fields, select controls, repeatable upload/list inputs, sections, and the form shell

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
  dashboard/               # authenticated workspace and listing upload flow
  privacy/                 # privacy policy
  terms/                   # terms of service
  cookies/                 # cookie policy
```

Most feature directories follow this pattern:

- `page.tsx`
- `components/filterSidebar.tsx`
- `components/*Cards.tsx`

The upload listing flow follows a slightly different pattern:

- `dashboard/upload-new-listing/page.tsx` handles category selection
- `dashboard/upload-new-listing/components/*ListingForm.tsx` contains one entry point per listing category
- `dashboard/upload-new-listing/components/afroInnovationListing/` contains the split Afro-Innovation form implementation

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
