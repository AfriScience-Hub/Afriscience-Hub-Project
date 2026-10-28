import { DEFAULT_JUDGING_CRITERIA, getRewardSuggestion, type JudgingCriterion } from '../create/data';

export type AllCompetitionStatus = 'Ongoing' | 'Upcoming' | 'Past';

export interface CompetitionAward {
  position: string;
  items: string[];
}

export interface AllCompetition {
  id: number;
  name: string;
  type: string;
  category: string;
  country: string;
  /** Registration fee in USD (0 renders as "Free") */
  regFee: number;
  /** ISO date YYYY-MM-DD */
  createdISO: string;
  /** ISO date YYYY-MM-DD */
  startISO: string;
  /** ISO date YYYY-MM-DD — submission deadline */
  submissionISO: string;
  /** ISO date YYYY-MM-DD — voting deadline */
  deadlineISO: string;
  participants: number;
  cover: string;
  shortDescription: string;
  description: string;
  mediaTypes: string[];
  requirements: string[];
  rules: string[];
  screening: string[];
  awards: CompetitionAward[];
  criteria: JudgingCriterion[];
}

const DAY_MS = 24 * 60 * 60 * 1000;

const startOfToday = (): Date => {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
};

const toISO = (d: Date): string =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

/** ISO date for a day offset relative to today. */
const offsetISO = (days: number): string => {
  const d = startOfToday();
  d.setDate(d.getDate() + days);
  return toISO(d);
};

const parseISO = (iso: string): Date => new Date(`${iso}T00:00:00`);

export const formatDate = (iso: string): string =>
  parseISO(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

/**
 * Status is derived from the dates:
 * - Upcoming: the start date is still ahead
 * - Ongoing: the start date has been reached (deadline not yet passed)
 * - Past: the voting deadline has passed
 */
export function getStatus(row: AllCompetition): AllCompetitionStatus {
  const today = startOfToday();
  if (today < parseISO(row.startISO)) return 'Upcoming';
  if (today > parseISO(row.deadlineISO)) return 'Past';
  return 'Ongoing';
}

/** Registration fee as a plain amount (the table header states the currency). */
export const formatRegFee = (fee: number): string => (fee > 0 ? fee.toLocaleString() : 'Free');

const img = (id: string) =>
  `https://images.unsplash.com/${id}?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800`;

const COVER_POOL = [
  img('photo-1509391366360-2e959784a276'),
  img('photo-1497486751825-1233686d5d80'),
  img('photo-1532094349884-543bc11b234d'),
  img('photo-1466611653911-95081537e5b7'),
  img('photo-1500382017468-9049fed747ef'),
  img('photo-1507525428034-b723cf961d3e'),
];

/** Per-type media defaults and short blurbs for the mock records. */
const TYPE_DEFAULTS: Record<string, { mediaTypes: string[]; blurb: string }> = {
  'Afri-Anime': {
    mediaTypes: ['Video'],
    blurb: 'Create an animated video that explains a scientific concept of your choice — engaging, educating and original.',
  },
  'Afri-Presentations': {
    mediaTypes: ['Video'],
    blurb: 'Give an audio-visual presentation tackling a persisting African problem and offer science-based solutions.',
  },
  'Afri-Memes': {
    mediaTypes: ['Image'],
    blurb: 'Create a science-themed meme that is both comic and informative — humour that makes science easier to understand.',
  },
  'Afri-MySpace': {
    mediaTypes: ['Image'],
    blurb: 'Showcase your working environment — station, lab, workshop, studio or hub — from where you provide scientific solutions.',
  },
};

const TYPE_CONTENT: Record<string, { description: string; requirements: string[]; rules: string[]; screening: string[] }> = {
  'Afri-Anime': {
    description: 'Afri-Anime challenges young African creatives to explain complex scientific concepts through animation and storytelling. Participants must produce a short animated video that breaks down a scientific principle in an engaging, entertaining and educational manner. The best entries are screened at the AfriScience Hub Annual Summit.',
    requirements: ['Must be a registered AfriScience Hub member', 'Must fall within the specified age category', 'Valid school/institution ID for verification', 'Registration fee must be paid before the deadline'],
    rules: ['Screen time of 5 minutes max.', 'Animation must be original work created by the contestant.', 'All content must be scientifically accurate.', 'No copyrighted music or third-party assets without license.', 'Language must be English, French, or any African language with English subtitles.'],
    screening: ['All entries reviewed by a panel of judges comprising scientists, animators and educators', 'Entries scored on scientific accuracy, creativity, storytelling and technical quality', 'Top 10 finalists announced two weeks after the deadline'],
  },
  'Afri-Presentations': {
    description: 'Afri-Presentations offers African brilliant minds an opportunity to look into the prominent problems that challenge the African continent at different levels. Participants use research-backed information to critically analyze these problems and offer practical science-based solutions. Take the global stage with other African great minds.',
    requirements: ['Must be registered with AfriScience Hub', 'Must be currently enrolled in a science related field', 'Valid school/institution ID', 'Any valid government issued ID Card'],
    rules: ['Presentation screen time of 10 minutes max.', 'Cut-screens are not allowed during presentations', 'Video format only (MP4, WebM, MOV, AVI)', 'All information presented must be data-based and scientifically accurate', 'Must use at least 3 African countries as case-study'],
    screening: ['Initial screening by the AfriScience Hub team', 'Evaluation by a panel of expert judges', 'Top 30 finalists listed under the Voting section four weeks after the submission deadline', 'Public votes determine the final performance of finalists'],
  },
  'Afri-Memes': {
    description: 'Afri-Memes invites creative minds to produce original, science-themed memes that are funny, factually accurate and culturally relevant to Africa. Entries should make science accessible and entertaining while maintaining accuracy.',
    requirements: ['Must be a registered AfriScience Hub member', 'Must be 18 years or older', 'Registration fee must be paid before the deadline'],
    rules: ['Image format only (JPEG, PNG, or GIF).', 'Meme must be original — no reposting existing memes.', 'Content must be scientifically accurate.', 'No offensive, discriminatory, or politically charged content.', 'Maximum of 3 entries per contestant.'],
    screening: ['Community voting (40%) combined with panel judging (60%)', 'Panel scores humour, scientific accuracy and creativity/originality'],
  },
  'Afri-MySpace': {
    description: 'Afri-MySpace celebrates the diverse spaces where African scientists, students and innovators work. Submit a photo of your personal workspace — whether it is a home lab, university bench, study desk or field station.',
    requirements: ['Must be a registered AfriScience Hub member', 'Must be 18 years or older', 'Registration fee must be paid before the deadline'],
    rules: ['Image format only (JPEG or PNG, minimum 1080px width).', 'Photo must be of your actual workspace — no stock photos.', 'Include a short caption (max 200 words) describing your space.', 'Maximum of 2 entries per contestant.'],
    screening: ['Panel of scientists and designers judge entries on creativity, story/caption, aesthetic quality and inspiration value'],
  },
};

const make = (
  id: number,
  name: string,
  type: string,
  category: string,
  country: string,
  regFee: number,
  createdISO: string,
  startDays: number,
  deadlineDays: number,
  participants: number
): AllCompetition => {
  const defaults = TYPE_DEFAULTS[type] ?? TYPE_DEFAULTS['Afri-Anime'];
  const content = TYPE_CONTENT[type] ?? TYPE_CONTENT['Afri-Anime'];
  const rewardCategory = category;
  return {
    id,
    name,
    type,
    category,
    country,
    regFee,
    createdISO,
    startISO: offsetISO(startDays),
    submissionISO: offsetISO(deadlineDays - 14),
    deadlineISO: offsetISO(deadlineDays),
    participants,
    cover: COVER_POOL[id % COVER_POOL.length],
    shortDescription: defaults.blurb,
    description: content.description,
    mediaTypes: defaults.mediaTypes,
    requirements: content.requirements,
    rules: content.rules,
    screening: content.screening,
    awards: (getRewardSuggestion(type, rewardCategory) ?? []).map((a) => ({ position: a.position, items: [...a.items] })),
    criteria: DEFAULT_JUDGING_CRITERIA.map((c) => ({ ...c })),
  };
};

export const ALL_COMPETITIONS: AllCompetition[] = [
  // Ongoing (8) — start reached, deadline ahead
  make(1, 'Afri-Anime: Climate Heroes', 'Afri-Anime', 'General (18+)', 'Nigeria', 20, '2025-02-12', -45, 30, 428),
  make(2, 'Robotics Africa Cup 2025', 'Afri-Presentations', 'Undergraduates', 'Kenya', 50, '2025-03-03', -20, 45, 312),
  make(3, 'AgriTech Solutions Africa', 'Afri-Presentations', 'Graduates', 'Ghana', 30, '2025-04-18', -10, 60, 186),
  make(4, 'Young Innovators Africa', 'Afri-MySpace', 'General (18+)', 'Nigeria', 15, '2025-05-02', -6, 24, 96),
  make(5, 'Solar Power Africa Challenge', 'Afri-Presentations', 'Undergraduates', 'South Africa', 40, '2025-06-11', -30, 15, 274),
  make(6, 'Digital Health Hackathon', 'Afri-Memes', 'General (18+)', 'Egypt', 25, '2025-07-09', -12, 7, 341),
  make(7, 'Clean Water Innovation Prize', 'Afri-Presentations', 'Senior Secondary', 'Uganda', 10, '2025-08-21', -3, 52, 158),
  make(8, 'Youth Coding Tournament', 'Afri-Anime', 'General (18+)', 'Tanzania', 0, '2025-09-30', -18, 40, 503),
  // Upcoming (6) — start date still ahead
  make(9, 'Healthcare Innovation Challenge', 'Afri-Memes', 'General (18+)', 'South Africa', 0, '2025-04-25', 16, 90, 0),
  make(10, 'Space Explorers Animation', 'Afri-Anime', 'General (18+)', 'Rwanda', 20, '2026-01-14', 8, 75, 0),
  make(11, 'Climate-Smart Agriculture', 'Afri-Presentations', 'Undergraduates', 'Ethiopia', 35, '2026-02-02', 30, 120, 0),
  make(12, 'Meme Science Challenge', 'Afri-Memes', 'General (18+)', 'Morocco', 5, '2026-03-19', 21, 50, 0),
  make(13, 'Young Scientists MySpace', 'Afri-MySpace', 'General (18+)', 'Ghana', 10, '2026-04-07', 45, 100, 0),
  make(14, 'Robotics Lab Showcase', 'Afri-Presentations', 'Undergraduates', 'Kenya', 45, '2026-05-26', 60, 135, 0),
  // Past (10) — voting deadline passed
  make(15, 'Save Our Oceans', 'Afri-Memes', 'General (18+)', 'Egypt', 25, '2025-01-10', -260, -150, 510),
  make(16, 'African Research Excellence', 'Afri-Presentations', 'Graduates', 'Kenya', 0, '2024-11-28', -300, -200, 284),
  make(17, 'Tech for a Better Africa', 'Afri-MySpace', 'General (18+)', 'Rwanda', 30, '2024-12-14', -330, -240, 367),
  make(18, 'Water Preservation Memes', 'Afri-Memes', 'General (18+)', 'Nigeria', 10, '2025-01-22', -280, -180, 445),
  make(19, 'Primary Science Fair', 'Afri-MySpace', 'General (18+)', 'Uganda', 5, '2025-02-28', -230, -130, 192),
  make(20, 'Astronomy Picture Day', 'Afri-Anime', 'General (18+)', 'South Africa', 15, '2025-03-15', -200, -110, 378),
  make(21, 'Green Energy Pitch', 'Afri-Presentations', 'Undergraduates', 'Ghana', 35, '2025-04-02', -180, -95, 264),
  make(22, 'Biotech Breakthroughs', 'Afri-Presentations', 'Graduates', 'Kenya', 40, '2025-05-19', -150, -70, 305),
  make(23, 'Wildlife Heroes Animation', 'Afri-Anime', 'General (18+)', 'Tanzania', 20, '2025-06-25', -120, -45, 487),
  make(24, 'Digital Divide Stories', 'Afri-MySpace', 'General (18+)', 'Ethiopia', 10, '2025-08-05', -90, -20, 221),
];
