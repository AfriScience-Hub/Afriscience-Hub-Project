import { Banknote, FileText, Users, GraduationCap, Trophy, Award, Medal, Star, ScrollText, HandCoins, Clock } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

/** One line in the Rewards section. Cash prizes store their amount (USD) in detail. */
export interface AwardRewardRow {
  type: string;
  detail: string;
}

/** One line in the Honorary Awards section. */
export interface HonoraryAwardRow {
  type: string;
  detail: string;
  /** Optional attached image (file name once picked) */
  image?: string | null;
}

export interface AdminAward {
  id: number;
  type: string;
  category: string;
  level: string;
  year: string;
  recipientType: 'Individual' | 'Team' | 'Organization';
  recipient: string;
  email: string;
  country: string;
  avatar: string;
  /** '' when not position-based */
  position: string;
  summary: string;
  workLink: string;
  socials: { linkedin: string; twitter: string; instagram: string; facebook: string };
  rewards: AwardRewardRow[];
  honorary: HonoraryAwardRow[];
}

export const AWARD_TYPES = [
  'Scientists Award',
  'Developers Award',
  'Innovation Award',
  'Academic Institution Award',
  'Community Impact Award',
  'Environmental Award',
  'Education Award',
  'Technology Award',
  'Young Researcher Award',
  'Afro-Innovation Award',
];

export const COUNTRIES = [
  'Nigeria', 'Kenya', 'Ghana', 'South Africa', 'Egypt',
  'Rwanda', 'Uganda', 'Tanzania', 'Ethiopia', 'Morocco',
];

/** Chip colors for the Type column (matches the design mockup). */
export const TYPE_CHIP: Record<string, string> = {
  'Scientists Award': 'bg-purple-100 text-purple-700',
  'Developers Award': 'bg-blue-100 text-blue-700',
  'Innovation Award': 'bg-amber-100 text-amber-700',
  'Academic Institution Award': 'bg-green-100 text-green-700',
  'Community Impact Award': 'bg-rose-100 text-rose-700',
  'Environmental Award': 'bg-emerald-100 text-emerald-700',
  'Education Award': 'bg-indigo-100 text-indigo-700',
  'Technology Award': 'bg-red-100 text-red-700',
  'Young Researcher Award': 'bg-purple-100 text-purple-700',
  'Afro-Innovation Award': 'bg-amber-100 text-amber-700',
};

/** Icon per reward/honorary type (shared by the create form, table and view modal). */
export const getRewardIcon = (type: string): LucideIcon => {
  switch (type) {
    case 'Cash Prize': return Banknote;
    case 'Certificate': return FileText;
    case 'Mentorship': return Users;
    case 'Grant': return HandCoins;
    case 'Scholarship': return GraduationCap;
    case 'Trophy': return Trophy;
    case 'Plaque': return Trophy;
    case 'Special Mention': return Medal;
    case 'Hall of Fame Feature': return Star;
    case 'Letter of Commendation': return ScrollText;
    default: return Award;
  }
};

export const getRewardIconCls = (type: string): string => {
  switch (type) {
    case 'Cash Prize': return 'bg-green-100 text-green-600';
    case 'Certificate': return 'bg-blue-100 text-blue-600';
    case 'Mentorship': return 'bg-purple-100 text-purple-600';
    case 'Grant': return 'bg-emerald-100 text-emerald-600';
    case 'Scholarship': return 'bg-indigo-100 text-indigo-600';
    case 'Trophy': return 'bg-amber-100 text-amber-600';
    case 'Plaque': return 'bg-amber-100 text-amber-600';
    case 'Special Mention': return 'bg-red-100 text-red-500';
    case 'Hall of Fame Feature': return 'bg-purple-100 text-purple-600';
    case 'Letter of Commendation': return 'bg-blue-100 text-blue-600';
    default: return 'bg-slate-100 text-slate-600';
  }
};

/** Cash prizes are stored as plain amounts and always shown in USD. */
export const formatCash = (amount: string): string => {
  const n = Number(amount);
  if (!amount || Number.isNaN(n)) return '$0';
  return `$${n.toLocaleString('en-US')}`;
};

/** Display line for one reward row. */
export const rewardLabel = (row: AwardRewardRow): string =>
  row.type === 'Cash Prize' ? formatCash(row.detail) : row.detail || row.type;

const img = (id: string) =>
  `https://images.unsplash.com/${id}?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800`;

const AVATAR_IDS = [
  'photo-1494790108377-be9c29b29330',
  'photo-1507003211169-0a1dd7228f2d',
  'photo-1573496359142-b8d87734a5a2',
  'photo-1560250097-0b93528c311a',
  'photo-1580489944761-15a19d654956',
  'photo-1519085360753-af0119f7cbe7',
  'photo-1544005313-94ddf0286df2',
  'photo-1506794778202-cad84cf45f1d',
  'photo-1562774053-701939374585',
  'photo-1472099645785-5658abf4ff4e',
  'photo-1438761681033-6461ffad8d80',
  'photo-1500648767791-00dcc994a43e',
];

const DEFAULT_CATEGORY: Record<string, string> = {
  'Scientists Award': 'Science & Research',
  'Developers Award': 'Technology & Engineering',
  'Innovation Award': 'Technology & Engineering',
  'Academic Institution Award': 'Education & Youth',
  'Community Impact Award': 'Social Impact & Community',
  'Environmental Award': 'Environment & Climate',
  'Education Award': 'Education & Youth',
  'Technology Award': 'Technology & Engineering',
  'Young Researcher Award': 'Science & Research',
  'Afro-Innovation Award': 'Technology & Engineering',
};

const make = (
  id: number,
  type: string,
  recipient: string,
  email: string,
  country: string,
  avatarIndex: number,
  year: string,
  opts: Partial<AdminAward> = {}
): AdminAward => ({
  id,
  type,
  category: DEFAULT_CATEGORY[type] ?? 'Science & Research',
  level: 'All Levels',
  year,
  recipientType: 'Individual',
  recipient,
  email,
  country,
  avatar: img(AVATAR_IDS[avatarIndex % AVATAR_IDS.length]),
  position: '',
  summary: `${recipient} received the ${type} in ${year} for outstanding contributions and measurable impact in their field.`,
  workLink: '',
  socials: { linkedin: '', twitter: '', instagram: '', facebook: '' },
  rewards: [
    { type: 'Cash Prize', detail: '200000' },
    { type: 'Certificate', detail: "Winner's Certificate" },
  ],
  honorary: [],
  ...opts,
});

export const ADMIN_AWARDS: AdminAward[] = [
  make(1, 'Scientists Award', 'Dr. Tunde Adebayo', 'tunde.adebayo@gmail.com', 'Nigeria', 0, '2025', {
    level: 'Professional', position: '1st Place',
    honorary: [{ type: 'Plaque', detail: 'Award Plaque' }],
    workLink: 'https://researchgate.net/profile/tunde-adebayo',
    socials: { linkedin: 'https://linkedin.com/in/tunde-adebayo', twitter: '', instagram: '', facebook: '' },
  }),
  make(2, 'Developers Award', 'Grace Bello', 'grace.bello@gmail.com', 'Rwanda', 1, '2025', {
    level: 'Undergraduate', position: '1st Place',
    rewards: [{ type: 'Cash Prize', detail: '500000' }, { type: 'Certificate', detail: "Winner's Certificate" }],
  }),
  make(3, 'Innovation Award', 'Solar Kids', 'hello@solarkids.org', 'Ghana', 2, '2025', {
    recipientType: 'Team', category: 'Environment & Climate', level: 'Secondary', position: '2nd Place',
    rewards: [{ type: 'Cash Prize', detail: '300000' }, { type: 'Certificate', detail: 'Certificate of Merit' }],
    honorary: [{ type: 'Special Mention', detail: 'Community Choice Mention' }],
  }),
  make(4, 'Academic Institution Award', 'University of Nairobi', 'awards@uonbi.ac.ke', 'Kenya', 8, '2025', {
    recipientType: 'Organization',
    rewards: [{ type: 'Cash Prize', detail: '1000000' }],
    honorary: [{ type: 'Plaque', detail: 'Institutional Excellence Plaque' }],
  }),
  make(5, 'Community Impact Award', 'Clean Water Initiative', 'team@cleanwaterinitiative.org', 'South Africa', 3, '2025', {
    recipientType: 'Organization', category: 'Social Impact & Community',
    honorary: [{ type: 'Letter of Commendation', detail: 'Ministry Commendation Letter' }],
  }),
  make(6, 'Environmental Award', 'Amina Yusuf', 'amina.yusuf@gmail.com', 'Egypt', 4, '2025', {
    category: 'Environment & Climate', level: 'Graduate', position: '1st Place',
  }),
  make(7, 'Education Award', 'Prof. Daniel Okafor', 'daniel.okafor@gmail.com', 'Nigeria', 5, '2025', {
    category: 'Education & Youth', level: 'Professional',
    rewards: [{ type: 'Cash Prize', detail: '200000' }, { type: 'Certificate', detail: 'Certificate of Recognition' }],
    socials: { linkedin: 'https://linkedin.com/in/daniel-okafor', twitter: 'https://x.com/danielokafor', instagram: '', facebook: '' },
  }),
  make(8, 'Technology Award', 'HealthTrack Africa', 'info@healthtrack.africa', 'Rwanda', 9, '2025', {
    recipientType: 'Organization',
  }),
  make(9, 'Young Researcher Award', 'Susan Adeyemi', 'susan.adeyemi@gmail.com', 'Uganda', 6, '2025', {
    level: 'Undergraduate', position: '3rd Place',
    rewards: [{ type: 'Cash Prize', detail: '500000' }, { type: 'Certificate', detail: "Winner's Certificate" }],
    honorary: [{ type: 'Special Mention', detail: 'Rising Star Mention' }],
  }),
  make(10, 'Afro-Innovation Award', 'David Nnaji', 'david.nnaji@gmail.com', 'Nigeria', 7, '2025', {
    position: '2nd Place',
    rewards: [{ type: 'Cash Prize', detail: '500000' }, { type: 'Certificate', detail: "Winner's Certificate" }],
  }),
  make(11, 'Scientists Award', 'Dr. Fatima Bello', 'fatima.bello@gmail.com', 'Egypt', 10, '2026', {
    level: 'Professional',
    rewards: [{ type: 'Cash Prize', detail: '250000' }, { type: 'Certificate', detail: 'Certificate of Recognition' }],
    honorary: [{ type: 'Plaque', detail: 'Award Plaque' }],
  }),
  make(12, 'Innovation Award', 'Kwame Mensah', 'kwame.mensah@gmail.com', 'Ghana', 11, '2026', {
    level: 'Graduate', position: '1st Place',
    rewards: [{ type: 'Cash Prize', detail: '350000' }, { type: 'Certificate', detail: "Winner's Certificate" }],
    honorary: [{ type: 'Hall of Fame Feature', detail: 'AfriScience Hub Hall of Fame' }],
  }),
];

export const AWARD_YEARS = Array.from(new Set(ADMIN_AWARDS.map((a) => a.year))).sort();
export const AWARD_COUNTRIES = Array.from(new Set(ADMIN_AWARDS.map((a) => a.country)));

export const getAwardById = (id: number): AdminAward | undefined =>
  ADMIN_AWARDS.find((a) => a.id === id);

export const AWARD_STATS = [
  { label: 'Total Awards', value: String(ADMIN_AWARDS.length), icon: Trophy, iconCls: 'bg-blue-100 text-blue-600' },
  { label: 'Total Recipients', value: '30', icon: Users, iconCls: 'bg-purple-100 text-purple-600' },
  { label: 'Upcoming', value: '3', icon: Clock, iconCls: 'bg-amber-100 text-amber-600' },
  { label: 'Announced', value: '27', icon: Award, iconCls: 'bg-red-100 text-red-600' },
];
