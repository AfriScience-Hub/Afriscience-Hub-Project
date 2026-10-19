'use client';

import React, { useState } from 'react';
import { GripVertical, Trash2, Plus, Target } from 'lucide-react';
import CollapsibleSection from './CollapsibleSection';
import { cn } from '@/lib/utils';
import type { JudgingCriterion } from '../data';

interface CriteriaSectionProps {
  number: number;
  title: string;
  subtitle: string;
  items: JudgingCriterion[];
  onChange: (items: JudgingCriterion[]) => void;
  addLabel: string;
  placeholder: string;
}

/**
 * Judging Criteria section: each row pairs a criterion with the number of
 * points it is worth. Rows can be reordered by dragging and removed
 * individually; a running total of the points is shown in the header.
 */
export default function CriteriaSection({
  number, title, subtitle, items, onChange, addLabel, placeholder,
}: CriteriaSectionProps) {
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [overIndex, setOverIndex] = useState<number | null>(null);

  const update = (index: number, patch: Partial<JudgingCriterion>) =>
    onChange(items.map((item, i) => (i === index ? { ...item, ...patch } : item)));

  const add = () => onChange([...items, { criterion: '', score: '' }]);
  const remove = (index: number) => onChange(items.filter((_, i) => i !== index));

  const handleDrop = (targetIndex: number) => {
    if (dragIndex === null || dragIndex === targetIndex) return;
    const next = [...items];
    const [moved] = next.splice(dragIndex, 1);
    next.splice(targetIndex, 0, moved);
    onChange(next);
  };

  const total = items.reduce((sum, item) => sum + (Number(item.score) || 0), 0);

  return (
    <CollapsibleSection number={number} title={title} subtitle={subtitle}>
      {items.length === 0 ? (
        <p className="text-xs text-neutral-gray-medium mb-3">Nothing here yet — add your first criterion below.</p>
      ) : (
        <>
          <div className="hidden sm:grid grid-cols-[1fr_110px_36px] gap-2 px-1 mb-1.5">
            <span className="text-[10px] font-semibold uppercase tracking-wide text-neutral-gray-medium">Criterion</span>
            <span className="text-[10px] font-semibold uppercase tracking-wide text-neutral-gray-medium">Max Score</span>
            <span />
          </div>
          <ul className="space-y-2">
            {items.map((item, index) => (
              <li
                key={index}
                draggable={dragIndex === index}
                onDragStart={() => setDragIndex(index)}
                onDragEnd={() => { setDragIndex(null); setOverIndex(null); }}
                onDragOver={(e) => { e.preventDefault(); setOverIndex(index); }}
                onDrop={(e) => { e.preventDefault(); handleDrop(index); setOverIndex(null); }}
                className={cn(
                  'grid grid-cols-1 sm:grid-cols-[1fr_110px_36px] gap-2 items-center rounded-lg',
                  overIndex === index && dragIndex !== index && 'ring-1 ring-[#453DD8]/40'
                )}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span
                    onMouseDown={() => setDragIndex(index)}
                    className="text-neutral-gray-light hover:text-neutral-gray-medium cursor-grab flex-shrink-0"
                    aria-hidden="true"
                  >
                    <GripVertical className="h-4 w-4" />
                  </span>
                  <input
                    type="text"
                    value={item.criterion}
                    onChange={(e) => update(index, { criterion: e.target.value })}
                    placeholder={placeholder}
                    aria-label={`Criterion ${index + 1}`}
                    className="flex-1 min-w-0 px-3 py-2 text-xs text-neutral-black rounded-lg border border-neutral-gray-light bg-white outline-none focus:border-[#453DD8]"
                  />
                </div>
                <div className="flex items-center gap-1.5 pl-6 sm:pl-0">
                  <input
                    type="number"
                    min={0}
                    value={item.score}
                    onChange={(e) => update(index, { score: e.target.value })}
                    placeholder="0"
                    aria-label={`Maximum score for criterion ${index + 1}`}
                    className="w-full px-3 py-2 text-xs text-neutral-black rounded-lg border border-neutral-gray-light bg-white outline-none focus:border-[#453DD8]"
                  />
                  <span className="text-[10px] text-neutral-gray-medium flex-shrink-0">pts</span>
                </div>
                <button
                  type="button"
                  onClick={() => remove(index)}
                  aria-label={`Remove criterion ${index + 1}`}
                  className="h-8 w-8 rounded-lg grid place-items-center text-brand-red-600 hover:bg-brand-red-100/50 cursor-pointer flex-shrink-0"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-3 flex items-center gap-1.5 rounded-lg bg-[#453DD8]/5 border border-[#453DD8]/10 px-3 py-2">
            <Target className="h-3.5 w-3.5 text-[#453DD8] flex-shrink-0" />
            <span className="text-[11px] text-neutral-gray-dark">
              Total points across all criteria: <span className="font-bold text-neutral-black">{total}</span>
            </span>
          </div>
        </>
      )}
      <button
        type="button"
        onClick={add}
        className="mt-3 flex items-center gap-1.5 px-3 py-1.5 border border-[#453DD8]/40 bg-white rounded-lg text-xs font-medium text-[#453DD8] hover:bg-[#453DD8]/5 cursor-pointer"
      >
        <Plus className="h-3.5 w-3.5" /> {addLabel}
      </button>
    </CollapsibleSection>
  );
}
