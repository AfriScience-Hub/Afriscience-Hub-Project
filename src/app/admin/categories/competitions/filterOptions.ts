import {
  COMPETITION_TYPES,
  COUNTRIES,
  GENERAL_CATEGORY,
  PRESENTATION_CATEGORIES,
} from './create/data';

export const TYPE_FILTER_OPTIONS = ['All Types', ...COMPETITION_TYPES];
export const COUNTRY_FILTER_OPTIONS = ['All Countries', ...COUNTRIES];
export const ALL_CATEGORY_FILTER_OPTIONS = ['All Categories', GENERAL_CATEGORY, ...PRESENTATION_CATEGORIES];

/** Categories shown in the filter for the selected competition type. */
export function categoryOptionsForType(type: string): string[] {
  if (!type || type === 'All Types') return ALL_CATEGORY_FILTER_OPTIONS;
  if (type === 'Afri-Presentations') return ['All Categories', ...PRESENTATION_CATEGORIES];
  return [GENERAL_CATEGORY];
}

/** Category automatically selected when the type changes. */
export function categoryForType(type: string): string {
  if (!type || type === 'All Types' || type === 'Afri-Presentations') return 'All Categories';
  return GENERAL_CATEGORY;
}

/** Categories can only be chosen after a type is selected, and only for Afri-Presentations. */
export function isCategoryLockedForType(type: string): boolean {
  return type !== 'Afri-Presentations';
}
