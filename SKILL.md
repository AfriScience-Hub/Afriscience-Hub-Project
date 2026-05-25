---
name: afriscience-hub
description: "**WORKFLOW SKILL** - AfriScience Hub project review, implementation, and architecture checklist. Use when modifying or reviewing this Next.js 16.2.2 + React 19 app, especially for listing pages, filter sidebars, dashboard upload listing forms, Afro-Innovation form sections, responsive UI, file organization, TypeScript safety, README updates, and pre-merge validation. Enforces local Next.js docs awareness, component-size limits, existing design language, client-side mock-data realities, accordion filter behavior, upload form structure, and required validation commands."
---

# AfriScience Hub Review And Implementation Skill

Use this skill to make, review, or validate changes in the AfriScience Hub codebase.

AfriScience Hub is a Next.js App Router product prototype for a pan-African science and technology ecosystem. Most listing and dashboard flows are currently frontend-driven with mock data, local state, and static UI. Changes should preserve the current interaction language while keeping the codebase easy to split into backend-connected flows later.

## First Steps For Any Task

1. Read the affected files before editing.
2. If the task touches Next.js framework behavior, read the relevant guide in `node_modules/next/dist/docs/` first.
3. Prefer local patterns already used in the matching route or component folder.
4. Keep user-visible behavior scoped to the request.
5. Run validation before finishing:

```bash
npx.cmd tsc --noEmit
npm.cmd run lint
```

Use `npm.cmd` on Windows if `npm` is blocked by PowerShell execution policy.

## Project Stack

- Next.js `16.2.2`
- React `19.2.4`
- TypeScript
- Tailwind CSS `v4`
- `lucide-react` icons
- App Router under `src/app`
- Client-heavy interactive pages with `'use client'`

## Non-Negotiable Next.js Rule

This project has an explicit agent rule:

- Treat this as a newer Next.js version with possible breaking changes.
- Before framework-sensitive edits, read the relevant docs under `node_modules/next/dist/docs/`.
- Do not rely on older Pages Router assumptions.
- Preserve `'use client'` on components using `useState`, event handlers, portals, file inputs, dropdown state, modals, or browser APIs.

Useful docs to read based on task:

- Client state or event handlers: `01-app/01-getting-started/05-server-and-client-components.md`
- Images: `01-app/01-getting-started/12-images.md`
- Layout/page structure: `01-app/01-getting-started/02-project-structure.md`
- Route/page behavior: `01-app/01-getting-started/03-layouts-and-pages.md`

## Current Product Areas

### Public Discovery Routes

Routes:

- `/institutions`
- `/scientists`
- `/innovations`
- `/centers`
- `/competitions`
- `/voting`
- `/awards`

Common pattern:

- route-level `page.tsx`
- local mock data array
- local search state
- local filter state
- `components/filterSidebar.tsx`
- result cards component
- active filter chips
- reset/clear actions
- responsive desktop sidebar and mobile filter toggle

Preserve this pattern unless the task explicitly asks for architectural consolidation.

### Dashboard Routes

Dashboard lives under `src/app/dashboard`.

Important pieces:

- `layout.tsx`
- `components/sidebar.tsx`
- `components/dashboard-shell.tsx`
- `/dashboard/upload-new-listing`
- profile, overview, reviews, verification, notifications, and other workspace pages

Dashboard UI should feel operational, compact, and work-focused. Avoid marketing-page layouts inside the dashboard.

## Listing Filter Sidebars

Filter sidebars are client components and must preserve existing page-specific filter contracts.

Current standard behavior:

- Opening one filter section collapses other open sections.
- Clicking the currently open section collapses it.
- Reset action clears filters.
- Desktop sidebars are sticky.
- Mobile pages use a show/hide filter button where already implemented.

When editing sidebars:

- Update both UI and filtering logic in the route page.
- Update active filter tags and tag removal logic.
- Keep filter key unions synchronized across sidebar, page, and cards.
- Do not add a filter UI without adding predicate support.
- Use `lucide-react` icons when adding icon buttons.

Innovation listing specifics:

- Fields: single selection.
- Interests: multiple selections.
- Ownership: single selection.
- Stage: multiple selections on public listing filters.
- SDGs: multiple selections.
- Interest and stage tooltips should render outside clipped containers when needed.

Tooltip rule:

- If a tooltip is inside any container with `overflow-y-auto`, use a body-level portal with `position: fixed`.
- Do not rely on `z-index` alone to escape overflow clipping.
- Use `createPortal(..., document.body)` only inside client components.

## Upload New Listing Architecture

Route:

- `src/app/dashboard/upload-new-listing/page.tsx`

Responsibilities:

- show six category cards
- store selected listing type
- render the selected listing form component

Do not put large form implementations back into `page.tsx`.

Category entry points:

- `components/instituteListingForm.tsx`
- `components/scientistListingForm.tsx`
- `components/centerListingForm.tsx`
- `components/afroInnovationListingForm.tsx`
- `components/competitionListingForm.tsx`
- `components/awardListingForm.tsx`

Shared current scaffold:

- `components/listingFormScaffold.tsx`
- Used by categories that have not yet been customized.

Shared listing metadata:

- `components/listingTypes.ts`

Afro-Innovation custom form folder:

```text
src/app/dashboard/upload-new-listing/components/afroInnovationListing/
  afroInnovationForm.tsx
  constants.ts
  repeatableInputs.tsx
  sections.tsx
  selectFields.tsx
  sharedFields.tsx
```

Rules:

- Keep `afroInnovationListingForm.tsx` as the small public wrapper.
- Put new Afro-Innovation form work inside `afroInnovationListing/`.
- Keep every file under 500 lines.
- Split again before a file approaches 500 lines.
- Preserve the current form card and accordion visual style.

Check line counts after large edits:

```powershell
Get-ChildItem -Path src/app/dashboard/upload-new-listing/components/afroInnovationListing -File | ForEach-Object { "$($_.Name): $((Get-Content -Path $_.FullName).Count)" }
```

## Afro-Innovation Form Current Sections

### Innovation Identity

Required fields:

- Profile Image: file input, image formats only.
- Innovation Name: text input.
- Country: Africa-only searchable country dropdown.
- Short Bio / Description: textarea, 500-word limit.

### Innovation Details

Required fields:

- Innovation Field: multi-select, max 3.
- Interests: multi-select, max 3, with info tooltips.
- Ownership: single-select.
- Stage: single-select, with info tooltips.
- SDGs: multi-select, max 5.
- Specifications:
  - repeatable materials entries
  - repeatable dimension rows with length, width, height, and unit
  - repeatable weight rows with unit
- User Groups: repeatable bullet inputs, max 10.
- Applications and Impact: repeatable bullet inputs.
- Recommendations: repeatable bullet inputs.
- Cautions: repeatable bullet inputs.
- Licenses and Certifications: repeatable uploads with title captions.
- Honorary Awards: repeatable uploads with title captions.
- Media Gallery:
  - Working Materials
  - Work-In-Progress
  - Finished Work
  - max 3 uploads per group
  - image or video formats

### Inventor's Information

Required fields:

- Inventor's Name
- Phone Number
- Email Address
- Social Media Handles: LinkedIn, Twitter, Instagram, Facebook

Optional:

- Website

## Component Size And Organization

Hard guardrail:

- No file over 500 lines.

Preferred guardrail:

- Start splitting before 400 lines when a component has multiple responsibilities.

Split by responsibility:

- constants and option lists
- shared field controls
- select/dropdown controls
- repeatable inputs/uploads
- section composition
- top-level form shell

Reject patterns:

- giant `page.tsx` files containing all form internals
- duplicated dropdown logic across sections
- new listing-category form code placed in the shared scaffold when it is category-specific
- unrelated refactors bundled with a feature request

## UI And Design Rules

Use the existing design language:

- white cards
- subtle gray borders
- red accent for primary highlights and required labels
- compact dashboard form fields
- Tailwind utilities
- `lucide-react` icons
- rounded cards around `rounded-lg` or `rounded-2xl` depending on local context
- small labels using `text-[11px]` or `text-xs`
- dashboard controls should be dense and scannable

Avoid:

- decorative hero sections inside dashboard pages
- nested cards inside cards unless framing a repeated item, modal, upload row, or grouped form control
- one-off palettes that drift from the current red/gray/navy dashboard language
- visible explanatory text about how UI controls work unless the form content itself requires it
- layout shifts from hover content

For upload controls:

- Preserve dashed border affordance.
- Use `accept` attributes for file-type constraints.
- Keep captions/title inputs where uploaded documents/media need titles.
- Make repeatable controls explicit with a small `Add` button using `Plus`.

## TypeScript Rules

- Type component props.
- Keep union types synchronized across page, sidebar, and cards.
- Prefer explicit string arrays or records for option lists.
- Avoid `any`.
- Use `type` imports where appropriate.
- For event handlers, rely on inference when local and obvious; type explicitly when passed across components.

## State Rules

Current forms and listing pages are local-state prototypes.

Use local state for:

- selected listing category
- open/closed accordions
- dropdown selection state
- repeatable rows
- tooltip positions
- client-side filters and search

Do not introduce global state or API layers unless the task asks for real data integration.

## Validation Checklist

Before finishing any implementation:

- `npx.cmd tsc --noEmit` passes.
- `npm.cmd run lint` passes, or only pre-existing unrelated warnings remain.
- No new file over 500 lines.
- The requested UI is wired to actual state/predicate behavior.
- No clipped tooltip or dropdown caused by parent overflow.
- No unrelated user changes were reverted.
- README is updated when architecture, route responsibilities, or major form flows change.

## Review Checklist For PRs

### Architecture

- [ ] New code follows the route/folder pattern already used nearby.
- [ ] Dashboard upload forms are not rebuilt inside `page.tsx`.
- [ ] Category-specific form logic lives in the category component/folder.
- [ ] Files stay under 500 lines.
- [ ] Large option lists live in constants.
- [ ] Shared controls are reused where practical.

### Listing Filters

- [ ] Sidebar UI and route filtering logic both changed when filters changed.
- [ ] Active tags and remove-tag logic support new filters.
- [ ] Single-select vs multi-select rules match the product request.
- [ ] Accordion behavior remains intact.
- [ ] Tooltips are not clipped by scroll containers.

### Forms

- [ ] Required fields are marked visually and with `required` where native input supports it.
- [ ] File inputs include useful `accept` filters.
- [ ] Repeatable fields have clear add behavior and limits where specified.
- [ ] Dropdown max-selection limits are enforced in state.
- [ ] Searchable dropdowns handle empty and no-match states.

### UX

- [ ] Layout works at mobile and desktop widths.
- [ ] Text fits inside buttons, tags, cards, and dropdown rows.
- [ ] Tooltips do not push layout.
- [ ] Hover/focus states remain visible.
- [ ] Form sections are collapsible and consistent.

### Reliability

- [ ] No TypeScript errors.
- [ ] No new ESLint errors.
- [ ] No console-only debugging left behind.
- [ ] No destructive git or filesystem operations.

## README Update Rules

Update `README.md` when:

- adding a new route
- changing the dashboard upload listing architecture
- adding a major form section
- changing filter behavior shared across listing pages
- splitting or moving major components
- converting placeholder flows into functional UI

Keep README updates concise and factual. It is a product/code map, not a changelog.

## Commands Reference

Use these from the project root:

```bash
npx.cmd tsc --noEmit
npm.cmd run lint
npm.cmd run dev
```

Use `rg` for discovery:

```bash
rg -n "pattern" src/app
rg --files src/app/dashboard/upload-new-listing
```

## Critical Issues To Reject

Reject or fix changes that:

1. Put large form implementations back into `page.tsx`.
2. Create files over 500 lines without splitting.
3. Add filter UI without updating filtering predicates.
4. Break accordion behavior in filter sidebars.
5. Use clipped in-container tooltips where body-level portals are needed.
6. Ignore the local Next.js docs rule for framework-sensitive changes.
7. Add untyped broad `any` usage.
8. Introduce unrelated rewrites or revert user changes.
9. Leave TypeScript errors or ESLint errors.
10. Drift away from the existing dashboard/listing visual language.
