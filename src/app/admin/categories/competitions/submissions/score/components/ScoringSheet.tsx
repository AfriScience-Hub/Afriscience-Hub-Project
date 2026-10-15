'use client';

import React from 'react';
import { ClipboardCheck, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import CriterionIcon from './CriterionIcon';
import { SCORE_CRITERIA, TOTAL_MAX, TOTAL_WEIGHT, isValidScore, scoreRating } from '../data';

interface ScoringSheetProps {
  /** criterion id -> raw input value */
  scores: Record<string, string>;
  onScore: (id: string, value: string) => void;
  /** Sum of all valid entered scores */
  total: number;
  /** True once every criterion has a valid score */
  complete: boolean;
  onSave: () => void;
}

/**
 * The scoring sheet: one row per judging criterion (icon, name, hint,
 * weight, score input with its cap and a valid marker) plus a total row.
 * The Save Score action sits directly under the sheet.
 */
export default function ScoringSheet({ scores, onScore, total, complete, onSave }: ScoringSheetProps) {
  const rating = scoreRating(total);

  return (
    <div className="space-y-3">
      <div className="rounded-xl border border-neutral-gray-light bg-white shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-neutral-gray-light flex items-center gap-2">
          <h2 className="text-sm font-bold text-neutral-black">Judging Criteria</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-xs">
            <thead>
              <tr className="border-b border-neutral-gray-light bg-neutral-bg-light/60 text-neutral-gray-medium">
                <th className="px-4 py-2.5 text-left font-semibold">Criteria</th>
                <th className="px-4 py-2.5 text-left font-semibold whitespace-nowrap">Weight</th>
                <th className="px-4 py-2.5 text-left font-semibold whitespace-nowrap">Your Score</th>
                <th className="px-4 py-2.5 w-10" />
              </tr>
            </thead>
            <tbody>
              {SCORE_CRITERIA.map((criterion) => {
                const value = scores[criterion.id] ?? '';
                const valid = isValidScore(value, criterion.max);
                return (
                  <tr key={criterion.id} className="border-b border-neutral-gray-light/60">
                    <td className="px-4 py-3">
                      <div className="flex items-start gap-3">
                        <CriterionIcon name={criterion.icon} />
                        <div className="min-w-0">
                          <p className="text-xs font-semibold text-neutral-black">{criterion.name}</p>
                          <p className="text-[11px] text-neutral-gray-medium mt-0.5">{criterion.hint}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs text-neutral-gray-dark whitespace-nowrap align-middle">
                      {criterion.weight}%
                    </td>
                    <td className="px-4 py-3 align-middle">
                      <div className="flex items-center gap-1.5">
                        <input
                          type="number"
                          min={0}
                          max={criterion.max}
                          aria-label={`${criterion.name} score out of ${criterion.max}`}
                          value={value}
                          onChange={(e) => onScore(criterion.id, e.target.value)}
                          placeholder="—"
                          className={cn(
                            'w-16 px-2 py-1.5 text-xs text-center rounded-lg border bg-white outline-none',
                            valid || value === ''
                              ? 'border-neutral-gray-light focus:border-[#453DD8]'
                              : 'border-brand-red-600'
                          )}
                        />
                        <span className="text-xs text-neutral-gray-medium whitespace-nowrap">/ {criterion.max}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 align-middle">
                      {valid && <CheckCircle2 className="h-4.5 w-4.5 text-green-500" aria-label="Scored" />}
                    </td>
                  </tr>
                );
              })}
              <tr className="bg-[#453DD8]/5">
                <td className="px-4 py-3 text-xs font-bold text-neutral-black">Total Score</td>
                <td className="px-4 py-3 text-xs font-semibold text-neutral-gray-dark whitespace-nowrap">{TOTAL_WEIGHT}%</td>
                <td className="px-4 py-3 text-xs font-bold text-neutral-black whitespace-nowrap">
                  {total} / {TOTAL_MAX}
                </td>
                <td className="px-4 py-3">
                  {complete && (
                    <span className={cn('px-2 py-0.5 rounded text-[11px] font-semibold whitespace-nowrap', rating.cls)}>
                      {rating.label}
                    </span>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={onSave}
          className="flex items-center gap-1.5 px-4 py-2 bg-[#453DD8] text-white rounded-lg text-xs font-medium hover:bg-[#3a33c0] cursor-pointer"
        >
          <ClipboardCheck className="h-3.5 w-3.5" /> Save Score
        </button>
      </div>
    </div>
  );
}
