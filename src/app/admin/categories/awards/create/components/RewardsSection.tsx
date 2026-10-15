'use client';

import React, { useState } from 'react';
import { GripVertical, X, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import CollapsibleSection from './CollapsibleSection';
import NumberInput from './NumberInput';
import { REWARD_TYPES, newRowId, type AwardFormState, type RewardDraft } from '../data';
import { getRewardIcon, getRewardIconCls } from '../../data';

interface RewardsSectionProps {
  value: AwardFormState;
  onChange: (patch: Partial<AwardFormState>) => void;
}

const selectCls = 'px-2.5 py-2 text-xs text-neutral-black rounded-lg border border-neutral-gray-light bg-white outline-none focus:border-[#453DD8] cursor-pointer appearance-none flex-shrink-0 w-32';

/**
 * Section 4 — Rewards: one row per reward (type select, detail input,
 * cash prizes as a USD amount only) with drag handles, a remove button
 * and the add button below the rows.
 */
export default function RewardsSection({ value, onChange }: RewardsSectionProps) {
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [overIndex, setOverIndex] = useState<number | null>(null);
  const rewards = value.rewards;

  const patchRows = (rows: RewardDraft[]) => onChange({ rewards: rows });
  const update = (index: number, patch: Partial<RewardDraft>) =>
    patchRows(rewards.map((row, i) => (i === index ? { ...row, ...patch } : row)));
  const add = () => patchRows([...rewards, { id: newRowId('rw'), type: 'Certificate', detail: '' }]);
  const remove = (index: number) => patchRows(rewards.filter((_, i) => i !== index));

  const handleDrop = (targetIndex: number) => {
    if (dragIndex === null || dragIndex === targetIndex) return;
    const next = [...rewards];
    const [moved] = next.splice(dragIndex, 1);
    next.splice(targetIndex, 0, moved);
    patchRows(next);
  };

  return (
    <CollapsibleSection
      number={4}
      title="Rewards"
      subtitle="Add all rewards for this position. You can add multiple rewards (e.g. cash prize, certificate, mentorship, etc.)."
    >
      {rewards.length === 0 ? (
        <p className="text-xs text-neutral-gray-medium mb-3">No rewards yet — add your first reward below.</p>
      ) : (
        <ul className="space-y-2">
          {rewards.map((row, index) => {
            const Icon = getRewardIcon(row.type);
            const isCash = row.type === 'Cash Prize';
            const cashInvalid = isCash && row.detail !== '' && Number(row.detail) <= 0;
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
                  aria-label={`Reward type ${index + 1}`}
                  value={row.type}
                  onChange={(e) => update(index, { type: e.target.value })}
                  className={selectCls}
                >
                  {REWARD_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>

                {isCash ? (
                  <div className="flex items-center gap-2 flex-1 min-w-[180px]">
                    <NumberInput
                      value={row.detail}
                      onChange={(v) => update(index, { detail: v })}
                      placeholder="Amount"
                      ariaLabel={`Cash prize amount ${index + 1}`}
                      invalid={cashInvalid}
                      className="w-32"
                    />
                    <span className="px-3 py-2 text-xs font-semibold text-neutral-black rounded-lg border border-neutral-gray-light bg-neutral-bg-light grid place-items-center flex-shrink-0">
                      USD
                    </span>
                  </div>
                ) : (
                  <input
                    type="text"
                    value={row.detail}
                    onChange={(e) => update(index, { detail: e.target.value })}
                    placeholder="e.g. Winner's Certificate"
                    aria-label={`Reward detail ${index + 1}`}
                    className="flex-1 min-w-[180px] px-3 py-2 text-xs text-neutral-black rounded-lg border border-neutral-gray-light bg-white outline-none focus:border-[#453DD8]"
                  />
                )}

                <button
                  type="button"
                  onClick={() => remove(index)}
                  aria-label={`Remove reward ${index + 1}`}
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
        <Plus className="h-3.5 w-3.5" /> Add Reward
      </button>
    </CollapsibleSection>
  );
}
