'use client';

import { Award, Gift, Trophy, Medal } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { COMPETITION_TYPES } from '../data/mockData';

export const COMPETITION_LEVEL_MAP: Record<string, string[]> = {
  'Afri – Anime': ['General (18+)'],
  'Afri – Presentations': ['Lower Primary', 'Upper Primary', 'Junior Secondary', 'Senior Secondary', 'Undergraduates', 'Graduates'],
  'Afri – Memes': ['General (18+)'],
  'Afri – MySpace': ['General (18+)'],
};

export const getLevelsForCompetition = (competition: string | null): string[] => {
  if (!competition) return [];
  return COMPETITION_LEVEL_MAP[competition] || [];
};

export const getTypeIcon = (type: string): LucideIcon => {
  switch (type) {
    case 'Developers Award': return Award;
    case 'Sponsorships Award': return Gift;
    case 'Competitions Award': return Trophy;
    case 'Donations Award': return Medal;
    default: return Award;
  }
};

export const getTypeColor = (type: string) => {
  switch (type) {
    case 'Developers Award': return 'bg-blue-100 text-blue-700 border-blue-200';
    case 'Sponsorships Award': return 'bg-purple-100 text-purple-700 border-purple-200';
    case 'Competitions Award': return 'bg-amber-100 text-amber-700 border-amber-200';
    case 'Donations Award': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
    default: return 'bg-slate-100 text-slate-600 border-slate-200';
  }
};

export const getPositionStyle = (pos: number) => {
  switch (pos) {
    case 1: return 'bg-amber-500 text-white';
    case 2: return 'bg-slate-400 text-white';
    case 3: return 'bg-amber-700 text-white';
    default: return 'bg-slate-200 text-slate-600';
  }
};

export const getPositionLabel = (pos: number) => {
  if (pos === 1) return '1st';
  if (pos === 2) return '2nd';
  if (pos === 3) return '3rd';
  return `${pos}th`;
};

export const shouldHideSocialHandles = (category: string) => {
  const lower = category.toLowerCase();
  return lower.includes('primary') || lower.includes('secondary');
};

export const usesMedal = (type: string) => type === 'Competitions Award';

export const SPONSORSHIP_TIER_REWARDS: Record<string, string[]> = {
  '1st Tier': ['AfriScience Hub Sponsorship Badge', 'Certificate of Recognition', 'Web-space Marketing', 'Sponsorship Tier Benefits'],
  '2nd Tier': ['AfriScience Hub Sponsorship Badge', 'Certificate of Recognition', 'Web-space Marketing', 'Sponsorship Tier Benefits'],
  '3rd Tier': ['AfriScience Hub Sponsorship Badge', 'Certificate of Recognition', 'Web-space Marketing', 'Homepage Feature', 'Sponsorship Tier Benefits'],
  '4th Tier': ['AfriScience Hub Sponsorship Badge', 'Certificate of Recognition', 'Web-space Marketing', 'Homepage Feature', 'Sponsorship Tier Benefits'],
};
