import { Briefcase, GraduationCap, Award, FileText, Globe, Eye, MessageCircle, CalendarCheck, Wallet } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { ProfileState, PersonalInfo, CompletionSection } from '@/store/profileSlice';
import type { WalletInfo } from '@/store/walletSlice';

export interface CompletionCheck {
  label: string;
  done: boolean;
}

export interface ActivityStatCard {
  label: string;
  value: string;
  change: string;
  icon: LucideIcon;
  color: string;
}

export interface RecentActivityItem {
  id: number;
  icon: LucideIcon;
  text: string;
  time: string;
}

const has = (v: string | null | undefined) => !!v && v.trim().length > 0;

function asPersonal(profile: ProfileState): PersonalInfo | null {
  return profile.personal && typeof profile.personal === 'object' && !Array.isArray(profile.personal) ? profile.personal : null;
}

const SECTION_LABELS: Record<string, string> = {
  profile: 'Personal Information',
  education: 'Education',
  certificates: 'Certifications',
  experiences: 'Experience',
  skills: 'Skills',
  languages: 'Languages',
  portfolio: 'Portfolio',
};

const SECTION_ORDER = ['profile', 'education', 'certificates', 'experiences', 'skills', 'languages', 'portfolio'];

function checksFromApi(
  sections: Record<string, CompletionSection>,
  allDone: boolean,
): CompletionCheck[] {
  const keys = [
    ...SECTION_ORDER.filter(k => k in sections),
    ...Object.keys(sections).filter(k => !SECTION_ORDER.includes(k)),
  ];
  return keys.map(key => ({
    label: SECTION_LABELS[key] || key.replace(/^\w/, c => c.toUpperCase()),
    done: allDone || !!sections[key]?.completed,
  }));
}

export function buildSectionChecks(profile: ProfileState, wallet: WalletInfo | null = null): CompletionCheck[] {
  const allDone = profile.completionCompleted || profile.completion >= 100;
  if (profile.completionSections && Object.keys(profile.completionSections).length > 0) {
    return checksFromApi(profile.completionSections, allDone);
  }

  const p = asPersonal(profile);
  const nameSet = has(p?.fullName) || (has(p?.firstname) && has(p?.surname));
  const fallback = [
    { label: 'Personal Information', done: !!p && nameSet },
    { label: 'Contact Information', done: !!p && has(p.phone) && has(p.address) && has(p.city) && has(p.state) && has(p.country) },
    { label: 'Education & Certifications', done: profile.education.length > 0 || profile.certs.length > 0 },
    { label: 'Experience & Skills', done: profile.experience.length > 0 || profile.skills.length > 0 },
    { label: 'Wallet', done: !!wallet },
  ];
  return allDone ? fallback.map(c => ({ ...c, done: true })) : fallback;
}

export const STATS_CARDS: ActivityStatCard[] = [
  { label: 'Total Listings', value: '0', change: '0', icon: Eye, color: 'bg-blue-50 border-blue-100' },
  { label: 'Active Services', value: '0', change: '0', icon: Briefcase, color: 'bg-green-50 border-green-100' },
  { label: 'Profile Views', value: '0', change: '0', icon: Eye, color: 'bg-purple-50 border-purple-100' },
  { label: 'Total Inquiries', value: '0', change: '0', icon: MessageCircle, color: 'bg-amber-50 border-amber-100' },
  { label: 'Completed Bookings', value: '0', change: '0', icon: CalendarCheck, color: 'bg-teal-50 border-teal-100' },
];

function toEpoch(input?: string | number | null): number {
  if (input === null || input === undefined || input === '') return 0;
  const n = Number(input);
  const date = Number.isFinite(n) && String(input).trim().length <= 4 ? new Date(n, 0, 1) : new Date(String(input));
  return Number.isNaN(date.getTime()) ? 0 : date.getTime();
}

function formatTime(epoch: number): string {
  if (!epoch) return 'Recently';
  return new Date(epoch).toLocaleDateString('en', { month: 'short', year: 'numeric' });
}

export function buildRecentActivities(profile: ProfileState): RecentActivityItem[] {
  const staged: Array<{ icon: LucideIcon; text: string; time: string; sortKey: number }> = [];

  const push = (icon: LucideIcon, text: string, date?: string | number | null) => {
    const epoch = toEpoch(date);
    staged.push({ icon, text, time: formatTime(epoch), sortKey: epoch });
  };

  for (const job of profile.experience) {
    if (!job.role && !job.organization) continue;
    push(Briefcase, `${job.isCurrent ? 'Working' : 'Worked'} at ${job.organization || 'a company'} as ${job.role || 'a role'}`, job.startDate);
  }
  for (const edu of profile.education) {
    if (!edu.institution && !edu.courseOfStudy) continue;
    push(GraduationCap, `Studied ${edu.courseOfStudy || 'a course'} at ${edu.institution || 'an institution'}`, edu.yearOfGraduation);
  }
  for (const cert of profile.certs) {
    if (!cert.title && !cert.issuer) continue;
    push(FileText, `Earned a certificate${cert.title ? ` in ${cert.title}` : ''}${cert.issuer ? ` from ${cert.issuer}` : ''}`, cert.year);
  }
  for (const skill of profile.skills) {
    if (!skill.name) continue;
    push(Award, `Added a new skill: ${skill.name}`);
  }
  for (const lang of profile.languages) {
    if (!lang.language) continue;
    push(Globe, `Added a new language: ${lang.language}`);
  }

  return staged
    .sort((a, b) => b.sortKey - a.sortKey)
    .slice(0, 6)
    .map((item, index) => ({ ...item, id: index + 1 }));
}