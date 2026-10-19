'use client';

import React from 'react';
import { Trophy, Plus, Trash2, Lightbulb, Medal } from 'lucide-react';
import { cn } from '@/lib/utils';
import CollapsibleSection from './CollapsibleSection';

export interface AwardEntry {
  id: string;
  position: string;
  /** Reward items, comma separated */
  items: string;
}

interface RewardsSectionProps {
  type: string;
  category: string;
  awards: AwardEntry[];
  onChange: (awards: AwardEntry[]) => void;
}

const MEDAL_STYLES = [
  'bg-amber-100 text-amber-600',
  'bg-slate-100 text-slate-500',
  'bg-orange-100 text-orange-600',
];
const EXTRA_STYLE = 'bg-[#453DD8]/10 text-[#453DD8]';

let nextId = 1;
const makeAward = (position = '', items = ''): AwardEntry => ({ id: `a${nextId++}`, position, items });

/**
 * Section 6 — Rewards and Prizes: editable position rows pre-filled with the
 * standard rewards for the selected competition type (and category for
 * Afri-Presentations). Every row stays editable, and extra positions can be
 * added or removed.
 */
export default function RewardsSection({ type, category, awards, onChange }: RewardsSectionProps) {
  const update = (id: string, patch: Partial<Omit<AwardEntry, 'id'>>) =>
    onChange(awards.map((a) => (a.id === id ? { ...a, ...patch } : a)));

  const add = () => onChange([...awards, makeAward()]);
  const remove = (id: string) => onChange(awards.filter((a) => a.id !== id));

  const scope = type === 'Afri-Presentations' && category ? `${type} — ${category}` : type;

  return (
    <CollapsibleSection
      number={6}
      title="Rewards and Prizes"
      subtitle="Define the rewards for winners. The standard rewards for the selected competition are pre-filled — edit them freely."
    >
      <div className="space-y-3">
        {scope && (
          <div className="flex items-start gap-2.5 rounded-xl bg-[#453DD8]/5 border border-[#453DD8]/10 px-4 py-3">
            <Lightbulb className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
            <p className="text-[11px] text-neutral-gray-dark leading-relaxed">
              Rewards below were pre-filled for <span className="font-bold text-neutral-black">{scope}</span>.
              Adjust any position name, reward item or points value — the rows are fully editable.
            </p>
          </div>
        )}

        {awards.length === 0 ? (
          <p className="text-xs text-neutral-gray-medium">
            No rewards yet. Select a competition type to load the standard rewards, or add a position below.
          </p>
        ) : (
          <div className="rounded-xl border border-neutral-gray-light bg-white divide-y divide-neutral-gray-light/70">
            {awards.map((award, index) => (
              <div key={award.id} className="flex items-start gap-3 p-3">
                <span
                  className={cn(
                    'h-8 w-8 rounded-lg grid place-items-center flex-shrink-0',
                    index < MEDAL_STYLES.length ? MEDAL_STYLES[index] : EXTRA_STYLE
                  )}
                >
                  {index < 3 ? <Medal className="h-4 w-4" /> : <Trophy className="h-4 w-4" />}
                </span>

                <div className="flex-1 min-w-0 grid sm:grid-cols-[180px_1fr] gap-2">
                  <input
                    type="text"
                    value={award.position}
                    onChange={(e) => update(award.id, { position: e.target.value })}
                    placeholder={`e.g. ${index + 1}${index === 0 ? 'st' : index === 1 ? 'nd' : index === 2 ? 'rd' : 'th'} Position`}
                    aria-label={`Position ${index + 1} name`}
                    className="w-full px-3 py-2 text-xs font-bold text-neutral-black rounded-lg border border-neutral-gray-light bg-white outline-none focus:border-[#453DD8]"
                  />
                  <input
                    type="text"
                    value={award.items}
                    onChange={(e) => update(award.id, { items: e.target.value })}
                    placeholder="e.g. Gold Medal, $1,000 cash prize, certificate of recognition"
                    aria-label={`Position ${index + 1} rewards`}
                    className="w-full min-w-0 px-3 py-2 text-xs text-neutral-black rounded-lg border border-neutral-gray-light bg-white outline-none focus:border-[#453DD8]"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => remove(award.id)}
                  aria-label={`Remove ${award.position || 'award'}`}
                  className="h-8 w-8 rounded-lg grid place-items-center text-brand-red-600 hover:bg-brand-red-100/50 cursor-pointer flex-shrink-0"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}

        <button
          type="button"
          onClick={add}
          className="flex items-center gap-1.5 px-3 py-1.5 border border-[#453DD8]/40 bg-white rounded-lg text-xs font-medium text-[#453DD8] hover:bg-[#453DD8]/5 cursor-pointer"
        >
          <Plus className="h-3.5 w-3.5" /> Add Award
        </button>
      </div>
    </CollapsibleSection>
  );
}
