'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export type SubmissionsTab = 'Ongoing' | 'Past';

interface SubmissionsTabsProps {
  active: SubmissionsTab;
  onChange: (tab: SubmissionsTab) => void;
  counts: Record<SubmissionsTab, number>;
}

const TAB_ORDER: SubmissionsTab[] = ['Ongoing', 'Past'];

/**
 * Ongoing / Past tabs with live counts for the competition submissions.
 */
export default function SubmissionsTabs({ active, onChange, counts }: SubmissionsTabsProps) {
  return (
    <div className="border-b border-neutral-gray-light">
      <div className="flex gap-0 overflow-x-auto">
        {TAB_ORDER.map((tab) => (
          <button
            key={tab}
            onClick={() => onChange(tab)}
            className={cn(
              'px-4 py-2.5 text-xs font-medium whitespace-nowrap border-b-2 transition-colors cursor-pointer',
              active === tab
                ? 'border-[#453DD8] text-[#453DD8]'
                : 'border-transparent text-neutral-gray-medium hover:text-neutral-black'
            )}
          >
            {tab} ({counts[tab]})
          </button>
        ))}
      </div>
    </div>
  );
}
