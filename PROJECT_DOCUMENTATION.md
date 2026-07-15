# AfriScience Hub — Full Project Documentation

## Overview

**AfriScience Hub** is a Next.js platform prototype for a pan-African science, technology, innovation, and ecosystem-discovery network. The product brings together institutions, scientists, specialist centers, Afro-Innovations, competitions (Afri-Anime, Afri-Presentations, Afri-Memes, Afri-MySpace), awards, live voting, past competition finalists, impact stories, support programs, and a full dashboard with listing management.

The current app is a frontend prototype. Most public listing pages use local mock datasets, client-side filtering, and presentational interactions. The dashboard is largely UI-first, with 6 category-specific upload listing forms.

---

## Tech Stack

| Technology | Purpose |
|---|---|
| **Next.js 16** | App Router framework |
| **React 18/19** | UI framework |
| **TypeScript 6** | Type safety |
| **Tailwind CSS v4** | Utility-first styling |
| **shadcn/ui** (Radix primitives) | Accessible component library |
| **Lucide React** | Primary icon library |
| **Recharts** | Dashboard charts |
| **React Hook Form** | Form state management |
| **Leaflet** | Map rendering |
| **Sonner** | Toast notifications |
| **Motion (Framer Motion)** | Animations |
| **Embla Carousel** | Carousel/slider |
| **ESLint + eslint-config-next** | Linting |

---

## Important Framework Note

This project has an explicit local instruction that this is **not the older Next.js shape many agents may remember**.

When changing framework-sensitive areas, read the relevant local docs first:

```text
node_modules/next/dist/docs/
```

Interactive components using `useState`, event handlers, file inputs, portals, dropdowns, or browser APIs must remain client components with `'use client'`.

---

## Project Structure

```text
src/
├── app/
│   ├── page.tsx                          # Home page
│   ├── layout.tsx                        # Root layout
│   ├── not-found.tsx                     # 404 page
│   ├── globals.css
│   ├── components/                       # Shared public-site components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Layout.tsx
│   │   ├── SearchDirectory.tsx
│   │   ├── NotificationDropdown.tsx
│   │   ├── ScrollToTop.tsx
│   │   ├── FeedbackWidget.tsx
│   │   ├── HomeHeroSection.tsx
│   │   ├── HomeCategoriesGrid.tsx
│   │   ├── HomeInnovationsSection.tsx
│   │   ├── HomeInstitutesSection.tsx
│   │   ├── HomeSpecialistCentersSection.tsx
│   │   ├── HomeCompetitionsHallOfFame.tsx
│   │   ├── HomePartnersSlider.tsx
│   │   ├── HomeLoginPromptModal.tsx
│   │   ├── figma/ImageWithFallback.tsx
│   │   ├── modals/                       # Shared modals
│   │   │   ├── ViewWorkModal.tsx
│   │   │   ├── ShareVotingModal.tsx
│   │   │   ├── MessagingModal.tsx
│   │   │   ├── CreateInvoiceModal.tsx
│   │   │   ├── ContactServiceProviderModal.tsx
│   │   │   ├── ContactInnovatorModal.tsx
│   │   │   └── BoostVotesModal.tsx
│   │   └── ui/                           # shadcn/ui primitives (40+ files)
│   ├── about/                            # Mission, team, services
│   ├── awards/                           # Awards discovery page
│   │   └── components/
│   ├── competitions/                     # Competition hub
│   │   ├── page.tsx                      # Current competitions listing
│   │   ├── data.ts                       # Competition mock data
│   │   ├── components/
│   │   ├── [id]/
│   │   │   ├── page.tsx                  # Competition detail
│   │   │   ├── apply/page.tsx           # Application form
│   │   │   ├── submission/page.tsx      # Media upload
│   │   │   └── components/
│   │   │       ├── AfriAnime*.tsx
│   │   │       ├── AfriMemes*.tsx
│   │   │       ├── AfriMySpace*.tsx
│   │   │       ├── afripresentations/   # 6 sub-categories
│   │   │       │   ├── shared/components/
│   │   │       │   ├── lower-primary/
│   │   │       │   ├── upper-primary/
│   │   │       │   ├── junior-secondary/
│   │   │       │   ├── senior-secondary/
│   │   │       │   ├── undergraduates/
│   │   │       │   └── graduates/
│   │   │       └── PaymentModal.tsx
│   │   └── pastcompetition/              # Past finalists
│   │       ├── page.tsx
│   │       └── components/
│   ├── contact/
│   ├── context/
│   │   └── AuthContext.tsx
│   ├── cookie-policy/
│   ├── dashboard/                        # User workspace
│   │   ├── layout.tsx
│   │   ├── data.ts
│   │   ├── components/
│   │   │   ├── DashboardShell.tsx
│   │   │   └── Sidebar.tsx
│   │   ├── overview/
│   │   ├── my-profile/
│   │   ├── my-listings/
│   │   ├── upload-new-listing/          # 6 category forms
│   │   ├── my-services/
│   │   ├── messages/
│   │   ├── invoices/
│   │   ├── notifications/
│   │   ├── reviews/
│   │   ├── verification-status/
│   │   ├── settings/
│   │   ├── donations/
│   │   ├── archive/
│   │   └── awards/
│   ├── data/                             # Shared mock data
│   │   ├── mockData.ts
│   │   └── impactData.ts
│   ├── donate/
│   ├── faq/
│   ├── impact/                           # Impact stories
│   │   ├── page.tsx
│   │   ├── [id]/
│   │   └── apply/
│   ├── innovations/                      # Afro-Innovations
│   │   ├── page.tsx
│   │   └── [id]/
│   ├── institutes/                       # Institutions
│   │   ├── page.tsx
│   │   └── [id]/
│   ├── login/
│   ├── privacy-policy/
│   ├── profile/
│   ├── scientists/                       # Scientists
│   │   ├── page.tsx
│   │   └── [id]/
│   ├── signup/
│   ├── specialist-centers/               # Specialist centers
│   │   ├── page.tsx
│   │   └── [id]/
│   ├── support/                          # Support hub
│   │   ├── donate/
│   │   ├── sponsor/
│   │   └── volunteer/
│   ├── terms-of-service/
│   ├── volunteer/
│   └── voting/                           # Live voting dashboard
│       ├── page.tsx
│       ├── data.ts
│       └── components/
├── assets/                               # Static assets (images, etc.)
├── lib/
│   └── utils.ts
```

---

## Shared Public Components

Located in `src/app/components`.

| File | Purpose |
|---|---|
| `Header.tsx` | Global navigation with dropdown menus (Explore, Support), search/search trigger, notification dropdown, profile dropdown |
| `Footer.tsx` | Global footer with links and social icons |
| `Layout.tsx` | Root layout wrapper |
| `SearchDirectory.tsx` | Sitewide search modal |
| `NotificationDropdown.tsx` | Notification categories (Impact Applications, Competition Applications, Awards Given) |
| `ScrollToTop.tsx` | Scroll-to-top button |
| `FeedbackWidget.tsx` | User feedback widget |
| `HomeHeroSection.tsx` | Home page hero banner |
| `HomeCategoriesGrid.tsx` | Category navigation grid |
| `HomeInnovationsSection.tsx` | Featured innovations block |
| `HomeInstitutesSection.tsx` | Featured institutions block |
| `HomeSpecialistCentersSection.tsx` | Featured centers block |
| `HomeCompetitionsHallOfFame.tsx` | Competitions highlight section |
| `HomePartnersSlider.tsx` | Partner carousel |
| `HomeLoginPromptModal.tsx` | Login prompt modal |
| `figma/ImageWithFallback.tsx` | Image with fallback |

### Shared Modals (`src/app/components/modals/`)

| File | Purpose |
|---|---|
| `ViewWorkModal.tsx` | View finalist/contestant work |
| `ShareVotingModal.tsx` | Share voting link |
| `BoostVotesModal.tsx` | Boost votes for a contestant |
| `MessagingModal.tsx` | Send message to user |
| `CreateInvoiceModal.tsx` | Create new invoice |
| `ContactServiceProviderModal.tsx` | Contact a service provider |
| `ContactInnovatorModal.tsx` | Contact an innovator |

### UI Library (`src/app/components/ui/`)

40+ shadcn/ui-style component files built on Radix primitives, including: accordion, alert, alert-dialog, avatar, badge, breadcrumb, Button, calendar, card, carousel, chart, checkbox, collapsible, command, context-menu, dialog, drawer, dropdown-menu, form, hover-card, input, input-otp, label, menubar, navigation-menu, pagination, popover, progress, radio-group, resizable, scroll-area, select, separator, sheet, sidebar, skeleton, slider, sonner, switch, table, tabs, textarea, toggle, toggle-group, tooltip.

---

## Header Component

The global header at `src/app/components/Header.tsx` (587 lines) provides:

**Desktop Navigation:**

| Menu | Type | Links |
|---|---|---|
| Home | Direct link | `/` |
| Explore | Dropdown (4 groups) | **Knowledge & Institutions:** `/institutes`, `/specialist-centers` |
| | | **Experts & Professionals:** `/scientists` |
| | | **Innovation Ecosystem:** `/innovations` |
| | | **Programs & Engagement:** `/competitions`, `/voting`, `/awards` |
| About | Direct link | `/about` |
| Contact | Direct link | `/contact` |
| Impact | Direct link | `/impact` |
| Support | Dropdown (3 items) | `/support/sponsor`, `/support/donate`, `/support/volunteer` |

**Right Actions:** Search toggle, NotificationDropdown (if authenticated), ProfileDropdown (My Profile, My Dashboard, Settings, Support, Log Out), or Login button.

---

## Public Route Architecture

### `/`

Landing page with sections: Hero, Categories Grid, Featured Institutes, Trending Innovations, Specialist Centers, Competitions Hall of Fame, Partners Slider, Login Prompt Modal.

### `/about`

Mission page with: HeroSection, MissionVision, CoreValues, ServicesSection, TeamSection, CTASection.

### `/contact`

Contact with hero and get-in-touch form.

### `/faq`

Searchable FAQ with grouped accordion content.

### `/support`

Hub with subroutes: `/support/donate`, `/support/sponsor`, `/support/volunteer`.

### `/support/sponsor`

**Sponsor landing page** — Hero, "Why Sponsor" (6 benefits), sponsorship tiers ($2.5K–$500K) with "Get Started" linking to apply form with tier pre-selected, Corporate CTA (stats removed per spec).

### `/support/sponsor/all`

**Sponsor directory** — Sidebar filters (Industry radio, Status radio, Country dropdown with full global list), search with icon, responsive grid. Sponsor cards show name+location on image overlay, status badge, industry tags, description.

### `/support/sponsor/apply`

**Sponsorship application form** — 10-section form: YourInfo (auto-populated), TierSelection (radio cards with info modals), CompanyInfo (industry multi-select capped by tier), LocationContact, Catalog (by industry with currency/ASH discount/specs/images), Licenses, Awards, Policies, MediaGallery, Undertaking checkbox.

### `/support/sponsor/[id]`

**Sponsor detail** — Sidebar with industries, status, address/state separated, Preview button on image, interactive Contact Information/Social toggles. Catalog section with clickable industry filter buttons.

### Legal Pages

`/privacy-policy`, `/terms-of-service`, `/cookie-policy`.

---

## Discovery Listing Pages

Shared pattern: `page.tsx` with mock data, filter state, sidebar, cards, active chips, reset. Accordion sidebars (opening one closes others).

### `/institutes`

Browse institutions. Filter by class, ownership, gender, services, status, location. Dynamic route `[id]` with tabs: Overview, Academics, Gallery, Achievements, Reviews, Contact.

### `/scientists`

Discover scientists. Filter by field, profession, service, status, country, region. Dynamic `[id]`.

### `/innovations`

Afro-Innovations showcase (531 lines — exceeds 350-line limit). Filter by field, interests, ownership, stage, SDGs, country. Dynamic `[id]`.

### `/specialist-centers`

Browse centers. Filter by field, category, services, ownership, status, country, region. Dynamic `[id]`.

---

## Competition System

### `/competitions`

Four types: **Afri-Anime** (18+), **Afri-Presentations** (6 categories), **Afri-Memes** (18+), **Afri-MySpace** (18+). Filter by type, category, country.

### `/competitions/[id]`

Detail page with type-specific components (AfriAnimeDetails, AfriMemesDetails, AfriMySpaceDetails, AfriPresentationsDetails).

### `/competitions/[id]/apply`

Multi-step application. Auto-filled fields, school info for Afri-Presentations, PaymentModal, redirect to submission.

### `/competitions/[id]/submission`

Media upload with preview and submit.

### `/competitions/pastcompetition`

Browse concluded finalists. Filter by type, category, position, year, country. Tab switcher (Current/Past). ViewWorkModal.

---

## Afri-Presentations (6 Categories)

Each category (Lower Primary, Upper Primary, Junior Secondary, Senior Secondary, Undergraduates, Graduates) has 3 files + data:
- **Details** — Description, rules, requirements, consent, rewards, topics
- **Apply** — Language, school info, parent name, summary, social handles, profile/ID upload
- **Submission** — Media upload, summary editor, success banner

**Shared components** (`afripresentations/shared/components/`): DetailsSections, ApplyFormSections, UploadSections, SubmissionSections.

**Competition-specific:** AfriAnime* (3), AfriMemes* (3), AfriMySpace* (3), PaymentModal.

---

## Voting Page

**Route:** `/voting` (274 lines)

Live voting dashboard:
- Top 10 finalists per category
- localStorage persistence, one-vote-per-category
- Boost votes, share, view work
- Components: VotingHeader, VotingBanner, FilterSidebar, FinalistCard
- Filter by competition, category, year, country

---

## Awards Page

**Route:** `/awards` (142 lines)

Browse awards/fellowships. Filter by type, competition, level, year, country. Preview badges/certificates. Components: AwardsHeader, AwardsFilterSidebar, AwardCard, PreviewModal.

---

## Impact Page

**Route:** `/impact` with `[id]` (Timeline, MediaGallery, ImpactBreakdown) and `/impact/apply` (SelectCauseStep, ApplicationFormStep, ReviewRequirementsStep).

---

## Dashboard Architecture

Dashboard at `src/app/dashboard` with 14 sidebar tabs:

| Tab | Route |
|---|---|
| Overview | `/dashboard/overview` |
| My Profile | `/dashboard/my-profile` |
| My Listings | `/dashboard/my-listings` |
| Upload New Listing | `/dashboard/upload-new-listing` |
| My Services | `/dashboard/my-services` |
| Messages | `/dashboard/messages` |
| Invoices | `/dashboard/invoices` |
| Notifications | `/dashboard/notifications` |
| Reviews | `/dashboard/reviews` |
| Verification Status | `/dashboard/verification-status` |
| Settings | `/dashboard/settings` |
| Donations | `/dashboard/donations` |
| Archive | `/dashboard/archive` |
| Awards | `/dashboard/awards` |

**Upload New Listing:** 6 category-specific forms: afro-innovation, award, competition, institute, scientist, specialist-center. Afro-Innovation is the most customized with dedicated form sections.

---

## Validation Commands

```bash
npx.cmd tsc --noEmit
npm.cmd run lint
npm.cmd run dev
npm.cmd run build
npm.cmd run start
```

Use `npm.cmd` on Windows if `npm.ps1` is blocked by execution policy.

---

## Sponsor Module Architecture

The sponsor feature under `src/app/support/sponsor/` consists of 4 page routes with 18+ components:

### Page Routes
| Route | File | Purpose |
|---|---|---|
| `/support/sponsor` | `page.tsx` | Marketing landing with tiers and CTA |
| `/support/sponsor/all` | `all/page.tsx` | Filterable sponsor directory |
| `/support/sponsor/apply` | `apply/page.tsx` | Sponsorship application form |
| `/support/sponsor/[id]` | `[id]/page.tsx` | Sponsor detail/profile view |

### Form Structure (`apply/components/`)
The sponsorship form is split into focused section components (all under 350 lines):
- `YourInfoSection.tsx` — Auto-populated name, email, ID Tag
- `TierSelectionSection.tsx` — Radio card selection with info modals showing tier benefits
- `CompanyInfoSection.tsx` — Name, motto, industry multi-select (capped by tier), display picture, description (1000 words max)
- `LocationContactSection.tsx` — Address, country (global list), state, phone, email, website, social handles
- `CatalogSection.tsx` — Product catalog grouped by industry, each entry with currency (local/USD), price, ASH discount price (or N/A), specifications (10 max), images (5 max)
- `LicensesSection.tsx` — Dynamic license entries with name, issuer, year, document upload
- `AwardsSection.tsx` — Dynamic award entries with name, org, year, document upload
- `PoliciesSection.tsx` — Dynamic policy text entries
- `MediaSection.tsx` — Media gallery upload (10 files max, pics & video), undertaking checkbox, closing remark info
- `SponsorshipForm.tsx` — Coordinates all sections, manages form state, reads `?tier=` from URL params

### Data Flow
- `apply/data.ts` — Tier benefits, tier definitions, industries, countries (global), CatalogEntry/LicenseEntry/AwardEntry types
- `all/data.ts` — Sponsor type with `industries[]`, full country list, mock sponsors
- `[id]/data.ts` — Mock sponsor detail with catalog grouped by industry

### UI/UX Patterns
- All interactive elements (buttons, icons, selects, file upload labels) use `cursor-pointer`
- Tier "Get Started" buttons hover to brand-red-600
- Sponsor detail: industry filter tabs in catalog, "Contact" toggles contact info panel, "Social Media Handles" toggle
- Thumbnails: name+location on image overlay (bottom-left), status badge (bottom-right)

## Known Issues and Cleanup Candidates

1. **Files exceeding 350-line limit** (per AGENTS.md code-rules):
   - `src/app/components/Header.tsx` — 587 lines
   - `src/app/innovations/page.tsx` — 531 lines
2. Typo filenames: `conpetitionCards.tsx`, `impartCards.tsx`
3. Duplicate policy routes under `/pages/*` alongside top-level routes
4. Most flows are UI prototypes without backend persistence
5. `SKILL.md` references 500-line limit vs `AGENTS.md` 350-line limit — needs reconciliation

---

## Pre-Merge Checklist

- [ ] `npx.cmd tsc --noEmit` passes
- [ ] `npm.cmd run lint` passes with no new errors
- [ ] No new file exceeds 350 lines
- [ ] Changed UI is wired to state and behavior
- [ ] Dropdowns/tooltips do not cause layout shifts
- [ ] File inputs include appropriate `accept` values
- [ ] README/documentation updated for major changes

---

## Related Documentation

- `README.md` — Contributor-friendly project map
- `SKILL.md` — Workflow and review skill
- `AGENTS.md` — Local agent rules
- `ATTRIBUTIONS.md` — Attributions (shadcn/ui, Unsplash)
- `node_modules/next/dist/docs/` — Local Next.js docs
