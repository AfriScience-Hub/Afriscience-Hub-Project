'use client';

import React from 'react';
import { Lightbulb, Target, Settings, BarChart3, Users, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { CriterionIconKey } from '../data';

const ICONS: Record<CriterionIconKey, { icon: LucideIcon; box: string }> = {
  innovation: { icon: Lightbulb, box: 'bg-purple-100 text-purple-600' },
  impact: { icon: Target, box: 'bg-blue-100 text-blue-600' },
  technical: { icon: Settings, box: 'bg-green-100 text-green-600' },
  scalability: { icon: BarChart3, box: 'bg-amber-100 text-amber-600' },
  team: { icon: Users, box: 'bg-red-100 text-red-500' },
};

interface CriterionIconProps {
  name: CriterionIconKey;
  /** md = scoring-sheet rows, sm = judging criteria list */
  size?: 'md' | 'sm';
}

/** Colored rounded-square icon badge for a judging criterion. */
export default function CriterionIcon({ name, size = 'md' }: CriterionIconProps) {
  const entry = ICONS[name] ?? ICONS.innovation;
  const Icon = entry.icon;
  return (
    <span
      className={cn(
        'rounded-lg grid place-items-center flex-shrink-0',
        entry.box,
        size === 'md' ? 'h-9 w-9' : 'h-8 w-8'
      )}
    >
      <Icon className={size === 'md' ? 'h-4.5 w-4.5' : 'h-4 w-4'} />
    </span>
  );
}
