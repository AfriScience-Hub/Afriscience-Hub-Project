'use client';

import { cn } from '@/lib/utils';

export interface ListingTabItem {
  id: string;
  label: string;
  count?: number;
}

interface ListingTabsProps {
  tabs: ListingTabItem[];
  active: string;
  onChange: (id: string) => void;
  /** `underline` is the primary row of category tabs; `pill` is used for sub-tabs. */
  variant?: 'underline' | 'pill';
  className?: string;
  ariaLabel?: string;
}

/**
 * Category tabs for the user-side listings/submissions tables. The underline
 * variant matches the admin table tabs while using the red brand colour.
 */
export default function ListingTabs({
  tabs,
  active,
  onChange,
  variant = 'underline',
  className,
  ariaLabel = 'Categories',
}: ListingTabsProps) {
  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className={cn(
        variant === 'underline'
          ? 'flex gap-0 overflow-x-auto border-b border-neutral-gray-light'
          : 'flex flex-wrap gap-2',
        className
      )}
    >
      {tabs.map((tab) => {
        const isActive = active === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.id)}
            className={cn(
              'whitespace-nowrap text-xs font-semibold transition-colors cursor-pointer focus:outline-none',
              variant === 'underline'
                ? cn(
                    'border-b-2 px-4 py-2.5',
                    isActive
                      ? 'border-brand-red-600 text-brand-red-600'
                      : 'border-transparent text-neutral-gray-medium hover:text-neutral-black'
                  )
                : cn(
                    'inline-flex items-center gap-2 rounded-lg border px-3.5 py-2',
                    isActive
                      ? 'border-brand-red-600 bg-brand-red-50 text-brand-red-700'
                      : 'border-neutral-gray-light bg-white text-neutral-gray-medium hover:text-neutral-black'
                  )
            )}
          >
            {tab.label}
            {typeof tab.count === 'number' && (
              <span
                className={cn(
                  'ml-1.5 rounded-full px-1.5 py-0.5 text-[10px] font-bold',
                  isActive
                    ? 'bg-brand-red-100 text-brand-red-700'
                    : 'bg-neutral-bg-light text-neutral-gray-medium'
                )}
              >
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
