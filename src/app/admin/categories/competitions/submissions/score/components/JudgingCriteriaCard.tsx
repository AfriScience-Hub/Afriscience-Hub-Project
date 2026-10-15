'use client';

import React from 'react';
import CriterionIcon from './CriterionIcon';
import { SCORE_CRITERIA } from '../data';

/**
 * Judging Criteria card — the weighted criteria list (name, weight and
 * hint per row), shown under the optional comments.
 */
export default function JudgingCriteriaCard() {
  return (
    <div className="rounded-xl border border-neutral-gray-light bg-white shadow-sm p-4">
      <h2 className="text-sm font-bold text-neutral-black mb-3">Judging Criteria</h2>
      <ul className="space-y-3">
        {SCORE_CRITERIA.map((criterion) => (
          <li key={criterion.id} className="flex items-start gap-3">
            <CriterionIcon name={criterion.icon} size="sm" />
            <div className="min-w-0">
              <p className="text-xs text-neutral-black">
                <span className="font-bold">{criterion.weight}%</span>{' '}
                <span className="font-semibold">{criterion.name}</span>
              </p>
              <p className="text-[11px] text-neutral-gray-medium mt-0.5">{criterion.hint}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
