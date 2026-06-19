'use client';

import { useState } from 'react';
import { INNOVATION_INTERESTS_EMOJI } from '@/app/data/mockData';

export default function InterestEmoji({ interest }: { interest: string }) {
  const [showLabel, setShowLabel] = useState(false);
  const data = INNOVATION_INTERESTS_EMOJI[interest];
  if (!data) return null;
  return (
    <span
      className="relative cursor-default select-none inline-flex items-center gap-1 rounded-full bg-amber-50 border border-amber-200 px-2.5 py-1"
      onMouseEnter={() => setShowLabel(true)}
      onMouseLeave={() => setShowLabel(false)}
      onTouchStart={() => setShowLabel(prev => !prev)}
    >
      <span className="text-base">{data.emoji}</span>
      <span className="text-xs text-amber-700 font-medium">{data.label}</span>
    </span>
  );
}
