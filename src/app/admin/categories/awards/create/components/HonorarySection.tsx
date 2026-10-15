'use client';

import React, { useRef, useState } from 'react';
import { GripVertical, X, Plus, ImagePlus } from 'lucide-react';
import { cn } from '@/lib/utils';
import CollapsibleSection from './CollapsibleSection';
import { HONORARY_TYPES, newRowId, type AwardFormState, type HonoraryDraft } from '../data';
import { getRewardIcon, getRewardIconCls } from '../../data';

interface HonorarySectionProps {
  value: AwardFormState;
  onChange: (patch: Partial<AwardFormState>) => void;
}

const selectCls = 'px-2.5 py-2 text-xs text-neutral-black rounded-lg border border-neutral-gray-light bg-white outline-none focus:border-[#453DD8] cursor-pointer appearance-none flex-shrink-0 w-40';

/**
 * Section 5 — Honorary Awards: one row per honorary recognition (type,
 * detail and an optional attached image) with drag handles, a remove
 * button and the add button below the rows.
 */
export default function HonorarySection({ value, onChange }: HonorarySectionProps) {
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [overIndex, setOverIndex] = useState<number | null>(null);
  const fileInputs = useRef<Record<string, HTMLInputElement | null>>({});
  const honorary = value.honorary;

  const patchRows = (rows: HonoraryDraft[]) => onChange({ honorary: rows });
  const update = (index: number, patch: Partial<HonoraryDraft>) =>
    patchRows(honorary.map((row, i) => (i === index ? { ...row, ...patch } : row)));
  const add = () => patchRows([...honorary, { id: newRowId('hn'), type: 'Plaque', detail: '', image: null }]);
  const remove = (index: number) => patchRows(honorary.filter((_, i) => i !== index));

  const handleDrop = (targetIndex: number) => {
    if (dragIndex === null || dragIndex === targetIndex) return;
    const next = [...honorary];
    const [moved] = next.splice(dragIndex, 1);
    next.splice(targetIndex, 0, moved);
    patchRows(next);
  };

  const pickImage = (index: number, file: File | undefined | null) => {
    if (file) update(index, { image: file.name });
  };

  return (
    <CollapsibleSection
      number={5}
      title="Honorary Awards (Optional)"
      subtitle="Add honorary recognitions for this award. You can add multiple honorary awards (e.g. plaque, special mention, etc.)."
    >
      {honorary.length === 0 ? (
        <p className="text-xs text-neutral-gray-medium mb-3">No honorary awards yet — add the first one below.</p>
      ) : (
        <ul className="space-y-2">
          {honorary.map((row, index) => {
            const Icon = getRewardIcon(row.type);
            return (
              <li
                key={row.id}
                draggable={dragIndex === index}
                onDragStart={() => setDragIndex(index)}
                onDragEnd={() => { setDragIndex(null); setOverIndex(null); }}
                onDragOver={(e) => { e.preventDefault(); setOverIndex(index); }}
                onDrop={(e) => { e.preventDefault(); handleDrop(index); setOverIndex(null); }}
                className={cn(
                  'flex flex-wrap items-center gap-2 rounded-lg border border-neutral-gray-light px-2.5 py-2',
                  overIndex === index && dragIndex !== index && 'ring-1 ring-[#453DD8]/40'
                )}
              >
                <span
                  onMouseDown={() => setDragIndex(index)}
                  className="text-neutral-gray-light hover:text-neutral-gray-medium cursor-grab flex-shrink-0"
                  aria-hidden="true"
                >
                  <GripVertical className="h-4 w-4" />
                </span>
                <span className={cn('w-8 h-8 rounded-lg grid place-items-center flex-shrink-0', getRewardIconCls(row.type))}>
                  <Icon className="h-4 w-4" />
                </span>
                <select
                  aria-label={`Honorary award type ${index + 1}`}
                  value={row.type}
                  onChange={(e) => update(index, { type: e.target.value })}
                  className={selectCls}
                >
                  {HONORARY_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
                <input
                  type="text"
                  value={row.detail}
                  onChange={(e) => update(index, { detail: e.target.value })}
                  placeholder="e.g. Award Plaque"
                  aria-label={`Honorary award detail ${index + 1}`}
                  className="flex-1 min-w-[160px] px-3 py-2 text-xs text-neutral-black rounded-lg border border-neutral-gray-light bg-white outline-none focus:border-[#453DD8]"
                />

                <input
                  ref={(el) => { fileInputs.current[row.id] = el; }}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => pickImage(index, e.target.files?.[0])}
                />
                {row.image ? (
                  <span className="flex items-center gap-1.5 max-w-[140px] px-2.5 py-1.5 rounded-lg border border-neutral-gray-light bg-neutral-bg-light text-[11px] text-neutral-gray-dark">
                    <ImagePlus className="h-3.5 w-3.5 flex-shrink-0" />
                    <span className="truncate">{row.image}</span>
                    <button
                      type="button"
                      onClick={() => update(index, { image: null })}
                      aria-label={`Remove attached image ${index + 1}`}
                      className="text-neutral-gray-medium hover:text-brand-red-600 cursor-pointer flex-shrink-0"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => fileInputs.current[row.id]?.click()}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-neutral-gray-light bg-white text-[11px] font-medium text-neutral-gray-dark hover:bg-neutral-bg-light cursor-pointer flex-shrink-0"
                  >
                    <ImagePlus className="h-3.5 w-3.5" /> Add Image
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => remove(index)}
                  aria-label={`Remove honorary award ${index + 1}`}
                  className="h-8 w-8 rounded-lg grid place-items-center text-neutral-gray-medium hover:text-brand-red-600 hover:bg-brand-red-100/50 cursor-pointer flex-shrink-0"
                >
                  <X className="h-4 w-4" />
                </button>
              </li>
            );
          })}
        </ul>
      )}
      <button
        type="button"
        onClick={add}
        className="mt-3 flex items-center gap-1.5 px-3 py-1.5 border border-[#453DD8]/40 bg-white rounded-lg text-xs font-medium text-[#453DD8] hover:bg-[#453DD8]/5 cursor-pointer"
      >
        <Plus className="h-3.5 w-3.5" /> Add Honorary Award
      </button>
    </CollapsibleSection>
  );
}
