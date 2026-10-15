import { Briefcase, FlaskConical, GraduationCap, Gift } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

/** A donation-receiving program shown on the Support Programs page. */
export interface SupportProgram {
  id: string;
  name: string;
  description: string;
  targetAmount: number;
  received: number;
  iconKey: 'briefcase' | 'flask' | 'cap' | 'gift';
  /** Hidden programs do not display on the main Donations page. */
  hidden: boolean;
}

/** One row of the main donations table. */
export interface Donation {
  id: string;
  donor: string;
  /** Unsplash photo; null renders deterministic initials instead */
  avatar: string | null;
  /** Optional fixed initials color; otherwise derived from the name */
  initialsCls: string | null;
  program: string;
  currency: 'NGN' | 'USD' | 'GHS' | 'GBP';
  amount: number;
  /** USD equivalent of `amount` (for range-filtered dashboard totals) */
  usd: number;
  date: string;
  time: string;
  /** Sortable timestamp (UTC ms) for date-range filtering */
  ts: number;
}

/** Mock conversion used for USD-equivalent dashboard totals. */
const toUsd = (currency: Donation['currency'], n: number): number => {
  switch (currency) {
    case 'USD': return n;
    case 'NGN': return Math.round(n / 1500);
    case 'GHS': return Math.round(n / 13);
    case 'GBP': return Math.round(n * 1.27);
  }
};

/* ------------------------------------------------------------------ */
/* Support programs store (module-level so Hide/Create/Edit persist   */
/* across client-side navigation between the two donation pages).     */
/* ------------------------------------------------------------------ */

const SEED_PROGRAMS: SupportProgram[] = [
  {
    id: 'p-career',
    name: 'Career Support',
    description:
      'Support aspiring scientists and technologists with career development resources, training, and guidance.',
    targetAmount: 50000,
    received: 20000,
    iconKey: 'briefcase',
    hidden: false,
  },
  {
    id: 'p-research',
    name: 'Research Support',
    description:
      'Fund innovative research projects and provide grants to advance science and technology in Africa.',
    targetAmount: 70000,
    received: 18750,
    iconKey: 'flask',
    hidden: false,
  },
  {
    id: 'p-scholarship',
    name: 'Educational Scholarship',
    description:
      'Provide scholarships to outstanding students pursuing education in science, technology, and innovation.',
    targetAmount: 30000,
    received: 6500,
    iconKey: 'cap',
    hidden: false,
  },
];

let programs: SupportProgram[] = SEED_PROGRAMS.map((p) => ({ ...p }));
let programSeq = 0;

export const getPrograms = (): SupportProgram[] => programs;
export const getProgramById = (id: string): SupportProgram | undefined =>
  programs.find((p) => p.id === id);
export const setProgramHidden = (id: string, hidden: boolean): void => {
  programs = programs.map((p) => (p.id === id ? { ...p, hidden } : p));
};
export const upsertProgram = (program: SupportProgram): void => {
  const exists = programs.some((p) => p.id === program.id);
  programs = exists
    ? programs.map((p) => (p.id === program.id ? program : p))
    : [...programs, program];
};
/** Fresh id for a newly created program. */
export const nextProgramId = (): string => `p-new-${++programSeq}`;

/* --------------------------- icons & chips ------------------------- */

export const getProgramIcon = (iconKey: SupportProgram['iconKey']): LucideIcon => {
  switch (iconKey) {
    case 'briefcase': return Briefcase;
    case 'flask': return FlaskConical;
    case 'cap': return GraduationCap;
    default: return Gift;
  }
};

export const getProgramIconCls = (iconKey: SupportProgram['iconKey']): string => {
  switch (iconKey) {
    case 'briefcase': return 'bg-purple-100 text-purple-600';
    case 'flask': return 'bg-green-100 text-green-600';
    case 'cap': return 'bg-blue-100 text-blue-600';
    default: return 'bg-purple-100 text-purple-600';
  }
};

/** Chip colors for known programs in the donations table. */
const PROGRAM_CHIP: Record<string, string> = {
  'Career Support': 'bg-purple-100 text-purple-700',
  'Research Support': 'bg-green-100 text-green-700',
  'Educational Scholarship': 'bg-blue-100 text-blue-700',
};

export const getProgramChip = (name: string): string =>
  PROGRAM_CHIP[name] ?? 'bg-slate-100 text-slate-600';

/** Amounts are plain numbers, shown with thousand separators. */
export const formatAmount = (n: number): string => n.toLocaleString('en-US');
/** Program targets/received are USD. */
export const formatUsd = (n: number): string => `$${formatAmount(n)}`;

/* ------------------------------ donations --------------------------- */

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

/** The ten rows shown in the design mockup, in order. */
const SEED_DONATIONS: Omit<Donation, 'id' | 'usd'>[] = [
  { donor: 'Chidera Okafor', avatar: img(AVATAR_IDS[0]), initialsCls: null, program: 'Career Support', currency: 'NGN', amount: 200000, date: 'May 27, 2025', time: '10:24 AM', ts: Date.UTC(2025, 4, 27) },
  { donor: 'Amina Yusuf', avatar: img(AVATAR_IDS[2]), initialsCls: null, program: 'Research Support', currency: 'USD', amount: 500, date: 'May 26, 2025', time: '02:15 PM', ts: Date.UTC(2025, 4, 26) },
  { donor: 'Daniel Tetteh', avatar: null, initialsCls: 'bg-green-100 text-green-700', program: 'Educational Scholarship', currency: 'GHS', amount: 1000, date: 'May 25, 2025', time: '04:30 PM', ts: Date.UTC(2025, 4, 25) },
  { donor: 'Grace Bello', avatar: img(AVATAR_IDS[4]), initialsCls: null, program: 'Career Support', currency: 'NGN', amount: 150000, date: 'May 24, 2025', time: '11:10 AM', ts: Date.UTC(2025, 4, 24) },
  { donor: 'Emeka Daniel', avatar: img(AVATAR_IDS[1]), initialsCls: null, program: 'Research Support', currency: 'NGN', amount: 300000, date: 'May 23, 2025', time: '09:45 AM', ts: Date.UTC(2025, 4, 23) },
  { donor: 'Favour Uchenna', avatar: null, initialsCls: 'bg-purple-100 text-purple-600', program: 'Educational Scholarship', currency: 'USD', amount: 250, date: 'May 22, 2025', time: '03:20 PM', ts: Date.UTC(2025, 4, 22) },
  { donor: 'David Nnaji', avatar: img(AVATAR_IDS[3]), initialsCls: null, program: 'Career Support', currency: 'NGN', amount: 100000, date: 'May 21, 2025', time: '01:18 PM', ts: Date.UTC(2025, 4, 21) },
  { donor: 'Susan Adeyemi', avatar: null, initialsCls: 'bg-green-100 text-green-700', program: 'Research Support', currency: 'GBP', amount: 400, date: 'May 20, 2025', time: '05:50 PM', ts: Date.UTC(2025, 4, 20) },
  { donor: 'Ikenna Obi', avatar: img(AVATAR_IDS[5]), initialsCls: null, program: 'Educational Scholarship', currency: 'NGN', amount: 250000, date: 'May 19, 2025', time: '01:14 PM', ts: Date.UTC(2025, 4, 19) },
  { donor: 'Ngozi Eze', avatar: img(AVATAR_IDS[6]), initialsCls: null, program: 'Career Support', currency: 'NGN', amount: 500000, date: 'May 18, 2025', time: '08:30 AM', ts: Date.UTC(2025, 4, 18) },
];

const EXTRA_DONORS = [
  'Adebayo Balogun', 'Fatima Zahra', 'Kwesi Asante', 'Ngozi Chukwu', 'Samuel Mwangi',
  'Hannah Tadesse', 'Omar El-Sayed', 'Chinelo Eze', 'Peter Mugisha', 'Zainab Abubakar',
];
const CYCLE_PROGRAMS = ['Career Support', 'Research Support', 'Educational Scholarship'];
const CYCLE_CURRENCIES: Donation['currency'][] = ['NGN', 'NGN', 'USD', 'NGN', 'GHS', 'NGN', 'GBP', 'USD'];
const AMOUNTS_BY_CURRENCY: Record<Donation['currency'], number[]> = {
  NGN: [50000, 75000, 100000, 120000, 150000, 200000, 250000, 400000],
  USD: [100, 150, 250, 300, 500, 750],
  GHS: [500, 800, 1000, 1500, 2000],
  GBP: [100, 200, 300, 400, 500],
};
const CYCLE_TIMES = ['10:24 AM', '02:15 PM', '04:30 PM', '11:10 AM', '09:45 AM', '03:20 PM', '01:18 PM', '05:50 PM', '12:14 PM', '08:30 AM'];
const INITIALS_CLS = ['bg-purple-100 text-purple-600', 'bg-blue-100 text-blue-600', 'bg-green-100 text-green-700', 'bg-amber-100 text-amber-700'];

/* UTC-based formatting so server and client always render identically. */
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const seedTime = Date.UTC(2025, 4, 17); // May 17, 2025 — day after the last mockup row
const fmtUtcDate = (ts: number): string => {
  const d = new Date(ts);
  return `${MONTHS[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`;
};

/** 248 donations: the 10 mockup rows first, then deterministic history. */
const buildDonations = (): Donation[] => {
  const rows: Donation[] = SEED_DONATIONS.map((row, i) => ({
    ...row,
    id: `DON-${String(i + 1).padStart(4, '0')}`,
    usd: toUsd(row.currency, row.amount),
  }));
  const EXTRA = 248 - SEED_DONATIONS.length;
  for (let i = 0; i < EXTRA; i++) {
    const n = SEED_DONATIONS.length + i;
    const currency = CYCLE_CURRENCIES[i % CYCLE_CURRENCIES.length];
    const amounts = AMOUNTS_BY_CURRENCY[currency];
    const amount = amounts[i % amounts.length];
    const name = EXTRA_DONORS[i % EXTRA_DONORS.length];
    rows.push({
      id: `DON-${String(n + 1).padStart(4, '0')}`,
      donor: name,
      avatar: i % 3 === 0 ? null : img(AVATAR_IDS[(i + 2) % AVATAR_IDS.length]),
      initialsCls: i % 3 === 0 ? INITIALS_CLS[i % INITIALS_CLS.length] : null,
      program: CYCLE_PROGRAMS[i % CYCLE_PROGRAMS.length],
      currency,
      amount,
      usd: toUsd(currency, amount),
      date: fmtUtcDate(seedTime - i * 86400000),
      time: CYCLE_TIMES[i % CYCLE_TIMES.length],
      ts: seedTime - i * 86400000,
    });
  }
  return rows;
};

export const DONATIONS: Donation[] = buildDonations();

/** Deterministic initials color when the donor has no fixed one. */
export const initialsFor = (donation: Donation): string => {
  const sum = donation.donor.split(/\s+/).join('').split('').reduce((s, c) => s + c.charCodeAt(0), 0);
  return INITIALS_CLS[sum % INITIALS_CLS.length];
};

export const initialsText = (name: string): string =>
  name.split(/\s+/).slice(0, 2).map((w) => w[0]?.toUpperCase() ?? '').join('');
