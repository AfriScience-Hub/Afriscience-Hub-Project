'use client';

import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  SUBMISSION_CATEGORIES,
  type SubmissionCategory,
  type SubmissionCategoryId,
} from '../submissionCategories';

interface CategoryCardGridProps {
  /** Currently selected category - highlighted on the card. */
  selected?: SubmissionCategoryId | null;
  onSelect: (id: SubmissionCategoryId) => void;
  /** Which categories to show. Defaults to all of them. */
  categories?: SubmissionCategory[];
  /** Optional heading shown above the grid. */
  title?: string;
  subtitle?: string;
  /** Shows a back button that calls this handler. */
  onBack?: () => void;
  backLabel?: string;
}

/**
 * Grid of category cards, matching the "Upload New Listing" category picker.
 */
export default function CategoryCardGrid({
  selected = null,
  onSelect,
  categories = SUBMISSION_CATEGORIES,
  title,
  subtitle,
  onBack,
  backLabel = 'Back',
}: CategoryCardGridProps) {
  return (
    <div>
      {onBack && (
        <button
          onClick={onBack}
          className="mb-4 inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-gray-dark hover:text-brand-red-600 transition-colors cursor-pointer"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> {backLabel}
        </button>
      )}

      {title && (
        <>
          <h2 className="text-xl font-bold text-neutral-black mb-1">{title}</h2>
          {subtitle && <p className="text-sm text-neutral-gray-medium mb-6">{subtitle}</p>}
        </>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat) => {
          const isActive = selected === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelect(cat.id)}
              className={cn(
                'group flex cursor-pointer flex-col items-center gap-3 rounded-xl border-2 p-6 text-center transition-all focus:outline-none',
                isActive
                  ? 'border-brand-red-600 bg-brand-red-50/40 shadow-md'
                  : 'border-neutral-gray-light hover:border-brand-red-600 hover:shadow-md focus:border-brand-red-600'
              )}
            >
              <div
                className={cn(
                  'flex h-14 w-14 items-center justify-center rounded-full transition-colors',
                  isActive ? 'bg-brand-red-100' : 'bg-brand-red-50 group-hover:bg-brand-red-100'
                )}
              >
                <cat.icon className="h-7 w-7 text-brand-red-600" />
              </div>
              <div>
                <p className="font-bold text-neutral-black">{cat.label}</p>
                <p className="text-xs text-neutral-gray-medium mt-1">{cat.description}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
