'use client';

import React from 'react';
import { Trophy, Plus, Trash2, Lightbulb } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import CollapsibleSection from './CollapsibleSection';
import { getRewardSuggestion } from '../data';

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

const POSITION_ICONS = ['text-amber-500', 'text-slate-400', 'text-orange-600'];
const EXTRA_ICON = 'text-[#453DD8]';

let nextId = 1;
const makeAward = (position = '', items = ''): AwardEntry => ({ id: `a${nextId++}`, position, items });

/**
 * Section 6 — Rewards and Prizes: editable position rows with the
 * Use Suggestion bar below. Suggestions prefill the standard rewards for
 * the selected competition type (and category for Afri-Presentations).
 */
export default function RewardsSection({ type, category, awards, onChange }: RewardsSectionProps) {
  const update = (id: string, patch: Partial<Omit<AwardEntry, 'id'>>) =>
    onChange(awards.map((a) => (a.id === id ? { ...a, ...patch } : a)));

  const add = () => onChange([...awards, makeAward()]);
  const remove = (id: string) => onChange(awards.filter((a) => a.id !== id));

  const useSuggestion = () => {
    const suggestion = getRewardSuggestion(type, category);
    if (!suggestion) {
      toast.error('Select a competition type (and category for Afri-Presentations) first');
      return;
    }
    onChange(suggestion.map((s) => makeAward(s.position, s.items.join(', '))));
    toast.success(`Rewards prefilled for ${type}${type === 'Afri-Presentations' && category ? ` — ${category}` : ''}`);
  };

  return (
    <CollapsibleSection
      number={6}
      title="Rewards and Prizes"
      subtitle="Define the rewards for winners. You can edit the position names and rewards."
    >
      <div className="space-y-2">
        {awards.map((award, index) => (
          <div key={award.id} className="flex items-center gap-3">
            <Trophy className={cn('h-4 w-4 flex-shrink-0', index < POSITION_ICONS.length ? POSITION_ICONS[index] : EXTRA_ICON)} />
            <input
              type="text"
              value={award.position}
              onChange={(e) => update(award.id, { position: e.target.value })}
              placeholder={`e.g. ${index + 1}${index === 0 ? 'st' : index === 1 ? 'nd' : index === 2 ? 'rd' : 'th'} Position`}
              aria-label={`Position ${index + 1} name`}
              className="w-36 flex-shrink-0 px-3 py-2 text-xs font-bold text-neutral-black rounded-lg border border-neutral-gray-light bg-white outline-none focus:border-[#453DD8]"
            />
            <input
              type="text"
              value={award.items}
              onChange={(e) => update(award.id, { items: e.target.value })}
              placeholder="e.g. $1,000 cash prize, certificate, mentorship"
              aria-label={`Position ${index + 1} rewards`}
              className="flex-1 min-w-0 px-3 py-2 text-xs text-neutral-black rounded-lg border border-neutral-gray-light bg-white outline-none focus:border-[#453DD8]"
            />
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
        <button
          type="button"
          onClick={add}
          className="mt-1 flex items-center gap-1.5 px-3 py-1.5 border border-[#453DD8]/40 bg-white rounded-lg text-xs font-medium text-[#453DD8] hover:bg-[#453DD8]/5 cursor-pointer"
        >
          <Plus className="h-3.5 w-3.5" /> Add Award
        </button>

        <div className="mt-3 flex flex-wrap items-center gap-3 rounded-xl bg-[#453DD8]/5 border border-[#453DD8]/10 px-4 py-3">
          <Lightbulb className="h-4 w-4 text-amber-500 flex-shrink-0" />
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold text-neutral-black">Suggested Rewards</p>
            <p className="text-[11px] text-neutral-gray-dark">
              Cash prize, certificate, mentorship, internship opportunity, gadgets, featured on the platform
            </p>
          </div>
          <button
            type="button"
            onClick={useSuggestion}
            className="px-3 py-1.5 border border-[#453DD8]/40 bg-white rounded-lg text-xs font-medium text-[#453DD8] hover:bg-[#453DD8]/5 cursor-pointer whitespace-nowrap"
          >
            Use Suggestion
          </button>
        </div>
      </div>
    </CollapsibleSection>
  );
}
