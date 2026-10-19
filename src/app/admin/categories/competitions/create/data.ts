/** Competition types (from the main competitions pages). */
import { AFRICAN_COUNTRIES } from '@/app/data/mockData';

export const COMPETITION_TYPES = ['Afri-Anime', 'Afri-Presentations', 'Afri-Memes', 'Afri-MySpace'];

/** Fixed category for the non-presentation types. */
export const GENERAL_CATEGORY = 'General (18+)';

/** Afri-Presentations categories — the user picks one from the dropdown. */
export const PRESENTATION_CATEGORIES = [
  'Lower Primary',
  'Upper Primary',
  'Junior Secondary',
  'Senior Secondary',
  'Undergraduates',
  'Graduates',
];

/**
 * Categories available per type. Every type except Afri-Presentations is
 * locked to General (18+); Afri-Presentations exposes the level dropdown.
 */
export const CATEGORIES_BY_TYPE: Record<string, string[]> = {
  'Afri-Anime': [GENERAL_CATEGORY],
  'Afri-Memes': [GENERAL_CATEGORY],
  'Afri-MySpace': [GENERAL_CATEGORY],
  'Afri-Presentations': PRESENTATION_CATEGORIES,
};

/** Whether the category select is locked (auto General 18+) for a type. */
export const isCategoryLocked = (type: string) =>
  Boolean(type) && type !== 'Afri-Presentations';

/** Media types participants may submit (multi-select). */
export const MEDIA_TYPE_OPTIONS = ['Image', 'Video', 'Audio', 'Document'];

/** All African countries a competition may be hosted in. */
export const COUNTRIES = AFRICAN_COUNTRIES;

/** One judging criterion: the criterion text plus the points it is worth. */
export interface JudgingCriterion {
  criterion: string;
  /** Maximum points awarded for this criterion */
  score: string;
}

/** Default judging criteria (the platform's Screening & Selection set). */
export const DEFAULT_JUDGING_CRITERIA: JudgingCriterion[] = [
  { criterion: 'Accuracy of Information', score: '20' },
  { criterion: 'Data & Research Quality', score: '20' },
  { criterion: 'Depth of Knowledge', score: '20' },
  { criterion: 'Concept Clarity', score: '20' },
  { criterion: 'Presentation Skill', score: '10' },
  { criterion: 'Audience Engagement', score: '10' },
];

/** One prize tier: a position label plus its reward items (one per line). */
export interface AwardSuggestion {
  position: string;
  items: string[];
}

/**
 * Dummy reward data per competition kind, lifted from the public
 * competition detail pages (AfriAnime/AfriMemes/AfriMySpaceDetails and the
 * per-level Afri-Presentations data files).
 */
const ANIME_REWARDS: AwardSuggestion[] = [
  { position: '1st Position', items: ['Gold Medal', '$1,000 Grand Prize', 'Certificate of Recognition', 'Possible Feature in Hall of Fame', 'Work Publication across AfriScience Hub Platforms'] },
  { position: '2nd Position', items: ['Silver Medal', '$800 Prize Money', 'Certificate of Recognition', 'Work Publication across AfriScience Hub Platforms'] },
  { position: '3rd Position', items: ['Bronze Medal', '$500 Prize Money', 'Certificate of Recognition', 'Work Publication across AfriScience Hub Platforms'] },
];

const MEMES_REWARDS: AwardSuggestion[] = [
  { position: '1st Position', items: ['Gold Medal', '$800 Grand Prize', 'Certificate of Recognition', 'Possible Feature in Hall of Fame', 'Work Publication across AfriScience Hub Platforms'] },
  { position: '2nd Position', items: ['Silver Medal', '$500 Prize Money', 'Certificate of Recognition', 'Work Publication across AfriScience Hub Platforms'] },
  { position: '3rd Position', items: ['Bronze Medal', '$300 Prize Money', 'Certificate of Recognition', 'Work Publication across AfriScience Hub Platforms'] },
];

const MYSPACE_REWARDS: AwardSuggestion[] = [
  { position: '1st Position', items: ['Gold Medal', '$500 Grand Prize', 'Certificate of Recognition', 'Possible Feature in Hall of Fame', 'Work Publication across AfriScience Hub Platforms'] },
  { position: '2nd Position', items: ['Silver Medal', '$350 Prize Money', 'Certificate of Recognition', 'Work Publication across AfriScience Hub Platforms'] },
  { position: '3rd Position', items: ['Bronze Medal', '$250 Prize Money', 'Certificate of Recognition', 'Work Publication across AfriScience Hub Platforms'] },
];

const LOWER_PRIMARY_REWARDS: AwardSuggestion[] = [
  { position: '1st Position', items: ['Gold Medal', 'Educational Tablet', 'Advanced School Kit', '$300 Prize Money for Parent/Guardian', 'Certificate of Recognition', 'Possible Feature in Hall of Fame', 'Work Publication across AfriScience Hub Platforms', 'Developmental project in enrolled school'] },
  { position: '2nd Position', items: ['Silver Medal', 'Advanced School Kit', '$300 Prize Money for Parent/Guardian', 'Certificate of Recognition', 'Work Publication across AfriScience Hub Platforms', 'Developmental project in enrolled school'] },
  { position: '3rd Position', items: ['Bronze Medal', 'Basic School Kit', '$300 Prize Money for Parent/Guardian', 'Certificate of Recognition', 'Work Publication across AfriScience Hub Platforms', 'Developmental project in enrolled school'] },
];

const UPPER_PRIMARY_REWARDS: AwardSuggestion[] = [
  { position: '1st Position', items: ['Gold Medal', '$100 Prize Money', 'Educational Tablet', 'Advanced School Kit', '$300 Prize Money for Parent/Guardian', 'Certificate of Recognition', 'Possible Feature in Hall of Fame', 'Work Publication across AfriScience Hub Platforms', 'Developmental project in enrolled school'] },
  { position: '2nd Position', items: ['Silver Medal', 'Educational Tablet', 'Advanced School Kit', '$300 Prize Money for Parent/Guardian', 'Certificate of Recognition', 'Work Publication across AfriScience Hub Platforms', 'Developmental project in enrolled school'] },
  { position: '3rd Position', items: ['Bronze Medal', 'Advanced School Kit', '$300 Prize Money for Parent/Guardian', 'Certificate of Recognition', 'Work Publication across AfriScience Hub Platforms', 'Developmental project in enrolled school'] },
];

const JUNIOR_SECONDARY_REWARDS: AwardSuggestion[] = [
  { position: '1st Position', items: ['Gold Medal', '$200 Prize Money', 'Educational Tablet', 'Premium School Kit', '$500 Prize Money for Parent/Guardian', 'Certificate of Recognition', 'Possible Feature in Hall of Fame', 'Work Publication across AfriScience Hub Platforms', 'Developmental project in enrolled school'] },
  { position: '2nd Position', items: ['Silver Medal', 'Educational Tablet', 'Premium School Kit', '$500 Prize Money for Parent/Guardian', 'Certificate of Recognition', 'Work Publication across AfriScience Hub Platforms', 'Developmental project in enrolled school'] },
  { position: '3rd Position', items: ['Bronze Medal', 'Premium School Kit', '$500 Prize Money for Parent/Guardian', 'Certificate of Recognition', 'Work Publication across AfriScience Hub Platforms', 'Developmental project in enrolled school'] },
];

const SENIOR_SECONDARY_REWARDS: AwardSuggestion[] = [
  { position: '1st Position', items: ['Gold Medal', '$500 Grand Prize', 'Educational Tablet', 'Premium School Kit', '$500 Prize Money for Parent/Guardian', 'Certificate of Recognition', 'Possible Feature in Hall of Fame', 'Work Publication across AfriScience Hub Platforms', 'Developmental project in enrolled school'] },
  { position: '2nd Position', items: ['Silver Medal', '$300 Prize Money', 'Educational Tablet', 'Premium School Kit', '$500 Prize Money for Parent/Guardian', 'Certificate of Recognition', 'Work Publication across AfriScience Hub Platforms', 'Developmental project in enrolled school'] },
  { position: '3rd Position', items: ['Bronze Medal', 'Educational Tablet', 'Premium School Kit', '$500 Prize Money for Parent/Guardian', 'Certificate of Recognition', 'Work Publication across AfriScience Hub Platforms', 'Developmental project in enrolled school'] },
];

const UNDERGRADUATES_REWARDS: AwardSuggestion[] = [
  { position: '1st Position', items: ['Gold Medal', '$1,500 Grand Prize', 'Laptop PC', 'Educational Tablet', 'Certificate of Recognition', 'Possible Feature in Hall of Fame', 'Work Publication across AfriScience Hub Platforms'] },
  { position: '2nd Position', items: ['Silver Medal', '$1,000 Prize Money', 'Laptop PC', 'Educational Tablet', 'Certificate of Recognition', 'Work Publication across AfriScience Hub Platforms'] },
  { position: '3rd Position', items: ['Bronze Medal', '$500 Prize Money', 'Laptop PC', 'Certificate of Recognition', 'Work Publication across AfriScience Hub Platforms'] },
];

const GRADUATES_REWARDS: AwardSuggestion[] = [
  { position: '1st Position', items: ['Gold Medal', '$2,500 Grand Prize', 'Laptop PC', 'Educational Tablet', 'Certificate of Recognition', 'Possible Feature in Hall of Fame', 'Work Publication across AfriScience Hub Platforms'] },
  { position: '2nd Position', items: ['Silver Medal', '$1,500 Prize Money', 'Laptop PC', 'Educational Tablet', 'Certificate of Recognition', 'Work Publication across AfriScience Hub Platforms'] },
  { position: '3rd Position', items: ['Bronze Medal', '$1,000 Prize Money', 'Laptop PC', 'Educational Tablet', 'Certificate of Recognition', 'Work Publication across AfriScience Hub Platforms'] },
];

const PRESENTATION_REWARDS_BY_CATEGORY: Record<string, AwardSuggestion[]> = {
  'Lower Primary': LOWER_PRIMARY_REWARDS,
  'Upper Primary': UPPER_PRIMARY_REWARDS,
  'Junior Secondary': JUNIOR_SECONDARY_REWARDS,
  'Senior Secondary': SENIOR_SECONDARY_REWARDS,
  Undergraduates: UNDERGRADUATES_REWARDS,
  Graduates: GRADUATES_REWARDS,
};

const TYPE_REWARDS: Record<string, AwardSuggestion[]> = {
  'Afri-Anime': ANIME_REWARDS,
  'Afri-Memes': MEMES_REWARDS,
  'Afri-MySpace': MYSPACE_REWARDS,
};

/**
 * Reward suggestions for the selected type (and category for
 * Afri-Presentations). Returns null when nothing usable is selected.
 */
export function getRewardSuggestion(type: string, category: string): AwardSuggestion[] | null {
  if (!type) return null;
  if (type === 'Afri-Presentations') {
    return PRESENTATION_REWARDS_BY_CATEGORY[category] ?? null;
  }
  return TYPE_REWARDS[type] ?? null;
}
