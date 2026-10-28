'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { SUBMISSION_TYPE_TABS, type SubmissionTypeTab } from '../data';

interface SubmissionsTypeTabsProps {
  active: SubmissionTypeTab;
  onChange: (tab: SubmissionTypeTab) => void;
}

/**
 * Competition-type tabs above the Ongoing/Past phase tabs.
 */
export default function SubmissionsTypeTabs({ active, onChange }: SubmissionsTypeTabsProps) {
  return (
    <div className="border-b border-neutral-gray-light">
      <div className="flex gap-0 overflow-x-auto">
        {SUBMISSION_TYPE_TABS.map((tab) => (
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
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
}
