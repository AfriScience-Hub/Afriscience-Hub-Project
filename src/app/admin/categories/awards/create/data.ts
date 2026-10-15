import { User, Users, Building2 } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { COUNTRIES, type AdminAward, type AwardRewardRow, type HonoraryAwardRow } from '../data';

export const AWARD_CATEGORIES = [
  'Science & Research',
  'Technology & Engineering',
  'Health & Medicine',
  'Environment & Climate',
  'Education & Youth',
  'Social Impact & Community',
  'Agriculture & Food Security',
];

export const AWARD_LEVELS = ['Primary', 'Secondary', 'Undergraduate', 'Graduate', 'Professional', 'All Levels'];

/** Section 3 — the award level/position dropdown. */
export const POSITION_OPTIONS = ['1st Place', '2nd Place', '3rd Place'];

export const REWARD_TYPES = ['Cash Prize', 'Certificate', 'Mentorship', 'Grant', 'Scholarship', 'Trophy'];

export const HONORARY_TYPES = ['Plaque', 'Special Mention', 'Hall of Fame Feature', 'Letter of Commendation'];

export const COUNTRY_OPTIONS = COUNTRIES;

export const RECIPIENT_TYPES: { value: 'Individual' | 'Team' | 'Organization'; hint: string; icon: LucideIcon }[] = [
  { value: 'Individual', hint: 'A single person', icon: User },
  { value: 'Team', hint: 'A group of people', icon: Users },
  { value: 'Organization', hint: 'An institution or company', icon: Building2 },
];

/** A rewards row while editing (row identity for React keys/dragging). */
export interface RewardDraft extends AwardRewardRow {
  id: string;
}

/** A honorary-awards row while editing. */
export interface HonoraryDraft extends HonoraryAwardRow {
  id: string;
  image: string | null;
}

export interface AwardFormState {
  // 1 — Basic Information
  awardType: string;
  category: string;
  level: string;
  year: string;
  // 2 — Recipient Information
  recipientType: 'Individual' | 'Team' | 'Organization';
  searchUser: string;
  fullName: string;
  email: string;
  country: string;
  profileFile: File | null;
  /** Existing remote image shown until replaced (edit/reuse prefill) */
  profileUrl: string | null;
  // 3 — Award Details
  position: string;
  summary: string;
  workLink: string;
  socials: { linkedin: string; twitter: string; instagram: string; facebook: string };
  // 4 / 5 — Rewards & Honorary Awards
  rewards: RewardDraft[];
  honorary: HonoraryDraft[];
}

export const EMPTY_AWARD_FORM: AwardFormState = {
  awardType: '',
  category: '',
  level: '',
  year: '',
  recipientType: 'Individual',
  searchUser: '',
  fullName: '',
  email: '',
  country: '',
  profileFile: null,
  profileUrl: null,
  position: '',
  summary: '',
  workLink: '',
  socials: { linkedin: '', twitter: '', instagram: '', facebook: '' },
  rewards: [],
  honorary: [],
};

let rowSeq = 0;
/** Stable id for a freshly added rewards/honorary row. */
export const newRowId = (prefix: string): string => `${prefix}-${++rowSeq}`;

export const isValidEmail = (value: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

/** Links are valid when they parse as an http(s) URL with a dotted host. */
export const isValidLink = (value: string): boolean => {
  try {
    const url = new URL(value.trim());
    return (url.protocol === 'http:' || url.protocol === 'https:') && url.hostname.includes('.');
  } catch {
    return false;
  }
};

export const isValidYear = (value: string): boolean => /^\d{4}$/.test(value.trim());

/**
 * Required-field and format checks run on submit; link/email format
 * problems only apply once the user has typed something.
 */
export function validateAwardForm(form: AwardFormState): string[] {
  const problems: string[] = [];
  if (!form.awardType) problems.push('select an award type');
  if (!form.category) problems.push('select a category');
  if (!form.level) problems.push('select a level');
  if (!form.year) problems.push('set the year');
  else if (!isValidYear(form.year)) problems.push('enter a valid year (e.g. 2025)');
  if (!form.fullName.trim()) problems.push("enter the recipient's full name");
  if (!form.email.trim()) problems.push("add the recipient's email address");
  else if (!isValidEmail(form.email)) problems.push('enter a valid email address');
  if (!form.country) problems.push('select a country');

  if (form.workLink.trim() && !isValidLink(form.workLink)) problems.push('fix the work link');
  const socialInvalid = Object.values(form.socials).some((v) => v.trim() !== '' && !isValidLink(v));
  if (socialInvalid) problems.push('fix the social media links');

  if (form.rewards.length === 0) problems.push('add at least one reward');
  const rewardsBroken = form.rewards.some((row) =>
    row.type === 'Cash Prize'
      ? !row.detail || Number(row.detail) <= 0
      : row.detail.trim() === ''
  );
  if (rewardsBroken) problems.push('complete every reward row with a valid amount or detail');
  const honoraryBroken = form.honorary.some((row) => row.detail.trim() === '');
  if (honoraryBroken) problems.push('complete every honorary award row');

  return Array.from(new Set(problems));
}

/** Copy every field of an existing award into the create form. */
export function prefillAward(award: AdminAward): AwardFormState {
  return {
    ...EMPTY_AWARD_FORM,
    awardType: award.type,
    category: award.category,
    level: award.level,
    year: award.year,
    recipientType: award.recipientType,
    fullName: award.recipient,
    email: award.email,
    country: award.country,
    profileUrl: award.avatar,
    position: award.position,
    summary: award.summary,
    workLink: award.workLink,
    socials: { ...award.socials },
    rewards: award.rewards.map((r) => ({ ...r, id: newRowId('rw') })),
    honorary: (award.honorary ?? []).map((h) => ({ ...h, id: newRowId('hn'), image: h.image ?? null })),
  };
}
