import { uploadFile } from '@/lib/upload';
import type { BasicInfoState } from './components/BasicInfoSection';
import type { AboutState } from './components/AboutSection';
import type { AwardEntry } from './components/RewardsSection';
import { GENERAL_CATEGORY, isCategoryLocked, type JudgingCriterion } from './data';
import type { AllCompetition } from '../all/data';
import {
  CATEGORY_API, COMPETITION_TYPE_API, MEDIA_TYPE_API,
  updateCompetitionAbout, updateCompetitionMediaSettings, updateCompetitionPrizes,
  updateCompetitionRequirements, updateCompetitionRules, updateCompetitionScoringCriteria,
  updateCompetitionScreening,
  type CreateCompetitionPayload,
} from './api';

/** Everything the create/edit form collects across its seven sections. */
export interface CompetitionFormState {
  basic: BasicInfoState;
  about: AboutState;
  requirements: string[];
  rules: string[];
  screening: string[];
  awards: AwardEntry[];
  criteria: JudgingCriterion[];
}

export const EMPTY_BASIC: BasicInfoState = {
  cover: null,
  coverUrl: null,
  type: '',
  category: '',
  entryFee: '',
  year: '',
  country: '',
  mediaTypes: [],
  maxFiles: '3',
  maxFileSizeMB: '5',
  maxVideoDurationSeconds: '',
  start: '',
  submissionDeadline: '',
  votingDeadline: '',
};

/** datetime-local value (YYYY-MM-DDTHH:mm) from a date-only ISO string. */
export const toLocalValue = (iso: string, time: string): string => `${iso}T${time}`;

/** The API wants a plain date (YYYY-MM-DD), the form holds a date & time. */
export const toApiDate = (value: string): string => (value ? value.split('T')[0] : '');

/** Key that identifies the current type (+ category) combination. */
export const suggestionKeyFor = (type: string, category: string): string =>
  `${type}::${type === 'Afri-Presentations' ? category : ''}`;

/**
 * The draft response nests the competition under `data`, e.g.
 * `{ data: { id, status: 'DRAFT', ... }, message, success }`. Be lenient about
 * the shape so an already-unwrapped response still works.
 */
export const draftIdOf = (created: unknown): string => {
  const r = created as { id?: unknown; data?: { id?: unknown } } | null | undefined;
  const id = r?.id ?? r?.data?.id;
  return id == null ? '' : String(id);
};

/**
 * Turn reward suggestions into editable prize rows. The first money amount in
 * the suggestion becomes the prize amount; the full list becomes the
 * description.
 */
export const toAwardEntries = (suggestions: { position: string; items: string[] }[]): AwardEntry[] =>
  suggestions.map((s, i) => {
    const joined = s.items.join(', ');
    const match = joined.match(/\$\s?([\d,]+(?:\.\d+)?)/);
    return {
      id: `sug-${i}-${s.position.replace(/\s+/g, '-')}`,
      position: s.position,
      amount: match ? match[1].replace(/,/g, '') : '',
      description: joined,
    };
  });

/**
 * Copy every field of an existing competition into the form state so the
 * create page can be reused as an edit/reuse form.
 */
export function prefillFrom(comp: AllCompetition): CompetitionFormState {
  return {
    basic: {
      ...EMPTY_BASIC,
      coverUrl: comp.cover,
      type: comp.type,
      category: comp.category,
      entryFee: String(comp.regFee),
      year: String(new Date(comp.startISO).getFullYear() || ''),
      country: comp.country,
      mediaTypes: [...comp.mediaTypes],
      start: toLocalValue(comp.startISO, '09:00'),
      submissionDeadline: toLocalValue(comp.submissionISO, '17:00'),
      votingDeadline: toLocalValue(comp.deadlineISO, '23:59'),
    },
    about: { shortDescription: comp.shortDescription, description: comp.description },
    requirements: [...comp.requirements],
    rules: [...comp.rules],
    screening: [...comp.screening],
    awards: toAwardEntries(comp.awards),
    criteria: comp.criteria.map((c) => ({ ...c })),
  };
}

/** Builds the POST /admin/competitions body from the form state. */
export async function buildCreatePayload(state: CompetitionFormState): Promise<CreateCompetitionPayload> {
  const { basic, about, requirements, rules, screening, awards, criteria } = state;
  const category = isCategoryLocked(basic.type) ? GENERAL_CATEGORY : basic.category;

  // The cover image is uploaded first so the payload can carry its key.
  let displayImage = basic.coverUrl || '';
  if (basic.cover) {
    const uploaded = await uploadFile(basic.cover);
    displayImage = uploaded.key || uploaded.url;
  }

  return {
    ...(displayImage ? { displayImage } : {}),
    type: COMPETITION_TYPE_API[basic.type] || basic.type,
    country: basic.country,
    category: CATEGORY_API[category] || category,
    year: Number(basic.year) || 0,
    fee: Number(basic.entryFee) || 0,
    startDate: toApiDate(basic.start),
    submissionDeadline: toApiDate(basic.submissionDeadline),
    votingDeadline: toApiDate(basic.votingDeadline),
    about: { shortDescription: about.shortDescription.trim(), description: about.description.trim() },
    requirements: requirements.filter((r) => r.trim()).map((content) => ({ content: content.trim() })),
    rules: rules.filter((r) => r.trim()).map((content) => ({ content: content.trim() })),
    screening: screening.filter((s) => s.trim()).map((content) => ({ content: content.trim() })),
    prizes: awards
      .filter((a) => a.description.trim() || a.amount)
      .map((a) => ({ amount: Number(a.amount) || 0, description: a.description.trim() })),
    mediaSettings: {
      allowedMediaTypes: basic.mediaTypes.map((m) => MEDIA_TYPE_API[m] || m),
      maxFiles: Number(basic.maxFiles) || 1,
      maxFileSizeMB: Number(basic.maxFileSizeMB) || 1,
    },
    scoringCriteria: criteria
      .filter((c) => c.criterion.trim())
      .map((c) => ({ name: c.criterion.trim(), weight: Number(c.score) || 0 })),
  };
}

/**
 * Editing uses a separate endpoint per section, so each one is PUT in turn.
 * The basic details (type, country, category, year, fee and the dates) have no
 * edit endpoint yet.
 */
export async function updateCompetitionSections(id: string, state: CompetitionFormState): Promise<void> {
  const { basic, about, requirements, rules, screening, awards, criteria } = state;

  // A plain function (not an arrow) so the generic is not parsed as JSX.
  function ordered<T extends { content: string }>(items: T[]) {
    return items
      .filter((i) => i.content.trim())
      .map((i, idx) => ({ ...i, content: i.content.trim(), order: idx + 1 }));
  }

  await updateCompetitionAbout(id, {
    shortDescription: about.shortDescription.trim(),
    description: about.description.trim(),
  });
  await updateCompetitionRequirements(id, { requirements: ordered(requirements.map((content) => ({ content }))) });
  await updateCompetitionRules(id, { rules: ordered(rules.map((content) => ({ content }))) });
  await updateCompetitionScreening(id, { screeningItems: ordered(screening.map((content) => ({ content }))) });
  await updateCompetitionPrizes(id, {
    prizes: awards
      .filter((a) => a.description.trim() || a.amount)
      .map((a, idx) => ({
        position: idx + 1,
        amount: Number(a.amount) || 0,
        description: a.description.trim(),
      })),
  });
  await updateCompetitionMediaSettings(id, {
    allowedMediaTypes: basic.mediaTypes.map((m) => MEDIA_TYPE_API[m] || m),
    maxFiles: Number(basic.maxFiles) || 1,
    maxFileSizeMB: Number(basic.maxFileSizeMB) || 1,
    ...(basic.maxVideoDurationSeconds
      ? { maxVideoDurationSeconds: Number(basic.maxVideoDurationSeconds) }
      : {}),
  });
  await updateCompetitionScoringCriteria(id, {
    criteria: criteria
      .filter((c) => c.criterion.trim())
      .map((c, idx) => ({
        name: c.criterion.trim(),
        description: '',
        weight: Number(c.score) || 0,
        order: idx + 1,
      })),
  });
}
