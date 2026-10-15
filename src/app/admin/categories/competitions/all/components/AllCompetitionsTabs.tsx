'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export type AllCompetitionsTab = 'All Competitions' | 'Ongoing' | 'Upcoming' | 'Past';

interface AllCompetitionsTabsProps {
  active: AllCompetitionsTab;
  onChange: (tab: AllCompetitionsTab) => void;
  counts: Record<AllCompetitionsTab, number>;
}

const TAB_ORDER: AllCompetitionsTab[] = ['All Competitions', 'Ongoing', 'Upcoming', 'Past'];

/**
 * Status tabs with live counts (All / Ongoing / Upcoming / Past).
 */
export default function AllCompetitionsTabs({ active, onChange, counts }: AllCompetitionsTabsProps) {
  return (
    <div className="border-b border-neutral-gray-light">
      <div className="flex gap-0 overflow-x-auto">
        {TAB_ORDER.map((tab) => (
          <button
            key={tab}
            onClick={() => onChange(tab)}
            className={cn(
              "px-4 py-2.5 text-xs font-medium whitespace-nowrap border-b-2 transition-colors cursor-pointer",
              active === tab
                ? "border-[#453DD8] text-[#453DD8]"
                : "border-transparent text-neutral-gray-medium hover:text-neutral-black"
            )}
          >
            {tab} ({counts[tab]})
          </button>
        ))}
      </div>
    </div>
  );
}
