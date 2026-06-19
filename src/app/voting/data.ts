"use client"

export const getVoteCategoryKey = (competition: string, category: string) =>
  `${competition}::${category}`;

export const getCompetitionColor = (comp: string) => {
  switch (comp) {
    case 'Afri – Anime': return 'bg-purple-100 text-purple-700 border-purple-200';
    case 'Afri – Presentations': return 'bg-blue-100 text-blue-700 border-blue-200';
    case 'Afri – Memes': return 'bg-amber-100 text-amber-700 border-amber-200';
    case 'Afri – MySpace': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
    default: return 'bg-neutral-bg-light text-neutral-gray-dark border-neutral-gray-light';
  }
};

export const getPositionStyle = (pos: number) => {
  switch (pos) {
    case 1: return 'bg-gradient-to-br from-amber-400 to-amber-600 text-white shadow-lg';
    case 2: return 'bg-gradient-to-br from-slate-300 to-slate-500 text-white shadow-lg';
    case 3: return 'bg-gradient-to-br from-amber-600 to-amber-800 text-white shadow-lg';
    default: return 'bg-neutral-bg-light text-neutral-gray-dark border border-neutral-gray-light';
  }
};

export const getPositionLabel = (pos: number) => {
  if (pos === 1) return '1st';
  if (pos === 2) return '2nd';
  if (pos === 3) return '3rd';
  return `${pos}th`;
};
