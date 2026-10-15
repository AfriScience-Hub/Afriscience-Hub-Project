import type { ImpactProgram, ImpactStory } from '@/app/data/impactData';

export type ApplicationStatus = 'Pending' | 'Published' | 'Rejected' | 'Concluded';

/** An impact aid application; `story` holds the published story draft. */
export interface ImpactApplication {
  id: string;
  idTag: string;
  name: string;
  username: string;
  email: string;
  program: ImpactProgram;
  avatar: string | null;
  initialsCls: string | null;
  date: string;
  time: string;
  /** Sortable submitted timestamp (UTC ms) */
  ts: number;
  status: ApplicationStatus;
  publishedOn: string | null;
  publishedTs: number | null;
  story: ImpactStory | null;
}

export const SUPPORT_PROGRAMS: ImpactProgram[] = ['Career Support', 'Research Support', 'Educational Scholarship'];

const PROGRAM_CODE: Record<ImpactProgram, string> = {
  'Career Support': 'CS',
  'Research Support': 'RS',
  'Educational Scholarship': 'ES',
};

export const STATUS_CHIP: Record<ApplicationStatus, string> = {
  Pending: 'bg-amber-100 text-amber-700',
  Published: 'bg-green-100 text-green-700',
  Rejected: 'bg-red-100 text-red-600',
  Concluded: 'bg-blue-100 text-blue-700',
};

const PROGRAM_CHIP: Record<string, string> = {
  'Career Support': 'bg-purple-100 text-purple-700',
  'Research Support': 'bg-green-100 text-green-700',
  'Educational Scholarship': 'bg-blue-100 text-blue-700',
};

export const getProgramChip = (name: string): string => PROGRAM_CHIP[name] ?? 'bg-slate-100 text-slate-600';

/** Deterministic initials color for applicants without a fixed one. */
export const initialsForName = (name: string): string => {
  const sum = name.split(/\s+/).join('').split('').reduce((s, c) => s + c.charCodeAt(0), 0);
  return INITIALS_CLS[sum % INITIALS_CLS.length];
};

export const initialsText = (name: string): string =>
  name.split(/\s+/).slice(0, 2).map((w) => w[0]?.toUpperCase() ?? '').join('');

const img = (id: string) =>
  `https://images.unsplash.com/${id}?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200`;

const AVATAR_IDS = [
  'photo-1494790108377-be9c29b29330',
  'photo-1507003211169-0a1dd7228f2d',
  'photo-1573496359142-b8d87734a5a2',
  'photo-1560250097-0b93528c311a',
  'photo-1580489944761-15a19d654956',
  'photo-1519085360753-af0119f7cbe7',
  'photo-1544005313-94ddf0286df2',
  'photo-1506794778202-cad84cf45f1d',
];
const INITIALS_CLS = ['bg-purple-100 text-purple-600', 'bg-blue-100 text-blue-600', 'bg-green-100 text-green-700', 'bg-amber-100 text-amber-700'];

/* UTC-based formatting so server and client render identically. */
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export const fmtUtcDate = (ts: number): string => {
  const d = new Date(ts);
  return `${MONTHS[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`;
};
const CYCLE_TIMES = ['10:24 AM', '04:15 PM', '02:30 PM', '11:10 AM', '09:45 AM', '03:20 PM', '01:18 PM', '08:18 PM', '12:14 PM', '05:50 PM'];
const DAY = 86400000;

/** The ten rows from the design mockup, newest first. */
const SEEDS: { name: string; username: string; email: string; program: ImpactProgram; avatarIdx: number | null; initialsCls: string | null; ts: number; time: string; status: ApplicationStatus }[] = [
  { name: 'Chidera Okafor', username: '@chideraoko', email: 'chidera@gmail.com', program: 'Research Support', avatarIdx: 0, initialsCls: null, ts: Date.UTC(2026, 8, 28), time: '10:24 AM', status: 'Published' },
  { name: 'Daniel Tetteh', username: '@danielt', email: 'daniel.t@gmail.com', program: 'Educational Scholarship', avatarIdx: null, initialsCls: 'bg-green-100 text-green-700', ts: Date.UTC(2026, 8, 27), time: '04:15 PM', status: 'Pending' },
  { name: 'Amina Yusuf', username: '@amina_y', email: 'amina.yusuf@gmail.com', program: 'Career Support', avatarIdx: 2, initialsCls: null, ts: Date.UTC(2026, 8, 25), time: '02:30 PM', status: 'Published' },
  { name: 'Emeka Daniel', username: '@emeka_dev', email: 'emeka.d@gmail.com', program: 'Research Support', avatarIdx: 1, initialsCls: null, ts: Date.UTC(2026, 8, 24), time: '11:10 AM', status: 'Rejected' },
  { name: 'Grace Bello', username: '@gracebello', email: 'grace.b@gmail.com', program: 'Educational Scholarship', avatarIdx: 4, initialsCls: null, ts: Date.UTC(2026, 8, 22), time: '09:45 AM', status: 'Pending' },
  { name: 'Favour Uchenna', username: '@favouru', email: 'favour.u@gmail.com', program: 'Career Support', avatarIdx: null, initialsCls: 'bg-purple-100 text-purple-600', ts: Date.UTC(2026, 8, 21), time: '03:20 PM', status: 'Published' },
  { name: 'Susan Adeyemi', username: '@susani', email: 'susan.a@gmail.com', program: 'Research Support', avatarIdx: null, initialsCls: 'bg-green-100 text-green-700', ts: Date.UTC(2026, 8, 20), time: '01:18 PM', status: 'Concluded' },
  { name: 'David Nnaji', username: '@davidnnaji', email: 'david.n@gmail.com', program: 'Career Support', avatarIdx: 3, initialsCls: null, ts: Date.UTC(2026, 8, 18), time: '08:18 PM', status: 'Pending' },
  { name: 'Ikenna Obi', username: '@ikennaobi', email: 'ikenna.o@gmail.com', program: 'Educational Scholarship', avatarIdx: 5, initialsCls: null, ts: Date.UTC(2026, 8, 17), time: '12:14 PM', status: 'Pending' },
  { name: 'Ngozi Eze', username: '@ngozi_ez', email: 'ngozi.e@gmail.com', program: 'Research Support', avatarIdx: 6, initialsCls: null, ts: Date.UTC(2026, 8, 15), time: '05:50 PM', status: 'Published' },
];

const EXTRA_NAMES = [
  'Adebayo Balogun', 'Fatima Zahra', 'Kwesi Asante', 'Ngozi Chukwu', 'Samuel Mwangi',
  'Hannah Tadesse', 'Omar El-Sayed', 'Chinelo Eze', 'Peter Mugisha', 'Zainab Abubakar',
  'Tobi Adeleke', 'Maryam Cisse',
];

/**
 * 120 applications: the 10 mockup rows first, then deterministic history.
 * Totals land on 77 Pending / 21 Published / 18 Rejected / 4 Concluded,
 * so the published tab (published + concluded) shows 25.
 */
const buildApplications = (): ImpactApplication[] => {
  const rows: ImpactApplication[] = SEEDS.map((s, i) => ({
    id: `app-${i + 1}`,
    idTag: `ASH-${PROGRAM_CODE[s.program]}-2026-${String(i + 1).padStart(3, '0')}`,
    name: s.name,
    username: s.username,
    email: s.email,
    program: s.program,
    avatar: s.avatarIdx === null ? null : img(AVATAR_IDS[s.avatarIdx]),
    initialsCls: s.initialsCls,
    date: fmtUtcDate(s.ts),
    time: s.time,
    ts: s.ts,
    status: s.status,
    publishedOn: s.status === 'Published' || s.status === 'Concluded' ? fmtUtcDate(s.ts) : null,
    publishedTs: s.status === 'Published' || s.status === 'Concluded' ? s.ts : null,
    story: null,
  }));

  const EXTRA = 120 - SEEDS.length;
  const statuses: ApplicationStatus[] = [
    ...Array<ApplicationStatus>(73).fill('Pending'),
    ...Array<ApplicationStatus>(17).fill('Published'),
    ...Array<ApplicationStatus>(17).fill('Rejected'),
    ...Array<ApplicationStatus>(3).fill('Concluded'),
  ];
  const startTs = Date.UTC(2026, 8, 14);
  for (let i = 0; i < EXTRA; i++) {
    const n = SEEDS.length + i;
    // 37 is coprime with 110, so this interleaves the pool deterministically.
    const status = statuses[(i * 37) % EXTRA];
    const name = EXTRA_NAMES[i % EXTRA_NAMES.length];
    const [first, last] = name.split(' ');
    const program = SUPPORT_PROGRAMS[i % SUPPORT_PROGRAMS.length];
    const ts = startTs - i * DAY;
    const published = status === 'Published' || status === 'Concluded';
    rows.push({
      id: `app-${n + 1}`,
      idTag: `ASH-${PROGRAM_CODE[program]}-2026-${String(n + 1).padStart(3, '0')}`,
      name,
      username: `@${first.toLowerCase()}${String(n).slice(-2)}`,
      email: `${first.toLowerCase()}.${last[0].toLowerCase()}@gmail.com`,
      program,
      avatar: i % 3 === 0 ? null : img(AVATAR_IDS[(i + 2) % AVATAR_IDS.length]),
      initialsCls: i % 3 === 0 ? INITIALS_CLS[i % INITIALS_CLS.length] : null,
      date: fmtUtcDate(ts),
      time: CYCLE_TIMES[i % CYCLE_TIMES.length],
      ts,
      status,
      publishedOn: published ? fmtUtcDate(ts) : null,
      publishedTs: published ? ts : null,
      story: null,
    });
  }
  return rows;
};

/* Module-level store so Publish/Reject/Conclude persist across the
   dashboard and applications pages during a session. */
let applications: ImpactApplication[] = buildApplications();

export const getApplications = (): ImpactApplication[] => applications;

export const updateApplication = (id: string, patch: Partial<ImpactApplication>): void => {
  applications = applications.map((a) => (a.id === id ? { ...a, ...patch } : a));
};

export interface ApplicationCounts {
  total: number;
  pending: number;
  published: number;
  rejected: number;
  concluded: number;
  /** Published tab shows published + concluded */
  publishedTab: number;
}

export const getCounts = (): ApplicationCounts => countApplications(applications);

/** Counts for an arbitrary application list (e.g. date-range filtered). */
export function countApplications(list: ImpactApplication[]): ApplicationCounts {
  const total = list.length;
  const count = (s: ApplicationStatus) => list.filter((a) => a.status === s).length;
  const published = count('Published');
  const concluded = count('Concluded');
  return { total, pending: count('Pending'), published, rejected: count('Rejected'), concluded, publishedTab: published + concluded };
}

/** Application with the most recent publish date, if any. */
export const getLatestPublished = (): ImpactApplication | null =>
  applications.reduce<ImpactApplication | null>((latest, a) => {
    if (a.publishedTs === null) return latest;
    return !latest || a.publishedTs > (latest.publishedTs ?? 0) ? a : latest;
  }, null);

/**
 * Seed the edit modal with the applicant's details (or their previous
 * edits) so the admin completes the story fields before publishing.
 */
export function appToDraft(app: ImpactApplication): ImpactStory {
  if (app.story) return { ...app.story };
  return {
    id: `story-${app.id}`,
    program: app.program,
    status: 'Active',
    idTag: app.idTag,
    image: '',
    year: app.date.slice(-4),
    location: { stateRegion: '', country: '' },
    summary: '',
    fundsUtilized: '',
    beneficiaries: 0,
    story: '',
    people: [{ name: app.name, image: app.avatar ?? '', role: '', socials: {} }],
    timeline: [{ title: '', bullets: [''] }],
    mediaGallery: [],
    careerPath: '',
    companyName: '',
    noOfOwners: 1,
    researchTitle: '',
    researchLevel: '',
    noOfResearchers: 1,
    scholarshipLevel: '',
    departmentName: '',
    initialCgpa: '',
  };
}

/* ------------------------------ dashboard --------------------------- */

/** Country counts for the Geographic Distribution card (no map). */
export const GEO_COUNTRIES: { country: string; count: number }[] = [
  { country: 'Nigeria', count: 42 },
  { country: 'Kenya', count: 18 },
  { country: 'Ghana', count: 14 },
  { country: 'South Africa', count: 12 },
  { country: 'Uganda', count: 9 },
];
export const GEO_OTHERS = 25;

/** Static headline metrics for the Key Impact Metrics card. */
export const KEY_IMPACT_METRICS = [
  { label: 'Lives Impacted', value: 25, trend: '+ 32%', iconCls: 'bg-purple-100 text-purple-600' },
  { label: 'Institutions Supported', value: 12, trend: '↑ 20%', iconCls: 'bg-blue-100 text-blue-600' },
  { label: 'Research Projects Initiated', value: 8, trend: '↑ 60%', iconCls: 'bg-green-100 text-green-600' },
  { label: 'Scholarships Awarded', value: 6, trend: '↑ 50%', iconCls: 'bg-amber-100 text-amber-600' },
];
