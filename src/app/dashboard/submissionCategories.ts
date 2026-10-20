import {
  Building2, Beaker, Microscope, Lightbulb, Trophy, HandCoins, Users,
  type LucideIcon,
} from 'lucide-react';

/**
 * The kinds of submissions a user can make on the platform.
 *
 * The first four are the "main" listing categories (also used when uploading
 * a new listing). Sponsor, Competition and Volunteer are submission-only.
 */
export type SubmissionCategoryId =
  | 'institute'
  | 'innovation'
  | 'scientist'
  | 'center'
  | 'sponsor'
  | 'competition'
  | 'volunteer';

export interface SubmissionCategory {
  id: SubmissionCategoryId;
  label: string;
  icon: LucideIcon;
  description: string;
  /** True when a real backend endpoint exists for this category. */
  hasEndpoint: boolean;
}

export const SUBMISSION_CATEGORIES: SubmissionCategory[] = [
  {
    id: 'institute',
    label: 'Institute',
    icon: Building2,
    description: 'University, school, or research institute',
    hasEndpoint: false,
  },
  {
    id: 'innovation',
    label: 'Afro-Innovation',
    icon: Lightbulb,
    description: 'African-born innovation or product',
    hasEndpoint: true,
  },
  {
    id: 'scientist',
    label: 'Scientist / Technologist',
    icon: Beaker,
    description: 'Individual scientist, researcher, or technologist',
    hasEndpoint: false,
  },
  {
    id: 'center',
    label: 'Specialist Center',
    icon: Microscope,
    description: 'Specialized research or innovation center',
    hasEndpoint: false,
  },
  {
    id: 'sponsor',
    label: 'Sponsor',
    icon: HandCoins,
    description: 'Sponsor an innovation, competition or program',
    hasEndpoint: false,
  },
  {
    id: 'competition',
    label: 'Competition',
    icon: Trophy,
    description: 'Enter an AfriScience Hub competition',
    hasEndpoint: false,
  },
  {
    id: 'volunteer',
    label: 'Volunteer',
    icon: Users,
    description: 'Volunteer your time and expertise',
    hasEndpoint: false,
  },
];

export function getCategory(id: string): SubmissionCategory | undefined {
  return SUBMISSION_CATEGORIES.find((c) => c.id === id);
}

/**
 * The categories a user can create a *listing* under. Sponsor, Competition and
 * Volunteer are submission-only, so they never appear on the listings page.
 */
export const LISTING_CATEGORIES: SubmissionCategory[] = SUBMISSION_CATEGORIES.filter(
  (c) => c.id === 'institute' || c.id === 'innovation' || c.id === 'scientist' || c.id === 'center'
);
