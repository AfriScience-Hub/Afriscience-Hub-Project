'use client';

import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/app/components/ui/Button';
import CurrencySelect from '../../CurrencySelect';
import { ALL_CURRENCIES } from '../data';

type TuitionEntry = { level: string; fee: string; currency: string };
type OtherFeeEntry = { name: string; description: string; cost: string; currency: string };

const inputClass = 'w-full rounded-lg border border-neutral-gray-light px-3 py-2.5 text-sm focus:border-brand-red-600 focus:ring-1 focus:ring-brand-red-600';
const rowClass = 'grid gap-2 sm:grid-cols-[minmax(0,1fr)_120px_120px_auto] sm:items-center';

export function TuitionFeeList({ entries, onChange }: { entries: TuitionEntry[]; onChange: (entries: TuitionEntry[]) => void }) {
  const [draft, setDraft] = useState<TuitionEntry>({ level: '', fee: '', currency: 'USD' });

  const formatFee = (value: string) => {
    const digits = value.replace(/\D/g, '');
    return digits.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const add = () => {
    if (!draft.level.trim() || !draft.fee.trim()) return toast.error('Please fill in all fields');
    onChange([...entries, { ...draft }]);
    setDraft({ level: '', fee: '', currency: 'USD' });
  };

  const update = (idx: number, patch: Partial<TuitionEntry>) => {
    onChange(entries.map((entry, i) => (i === idx ? { ...entry, ...patch } : entry)));
  };

  return (
    <div className="space-y-2">
      {entries.map((entry, idx) => (
        <div key={idx} className={`${rowClass} rounded-lg border border-neutral-gray-light bg-neutral-bg-light/50 p-2.5`}>
          <input type="text" value={entry.level} onChange={(e) => update(idx, { level: e.target.value })} className={inputClass} placeholder="Level" />
          <input
            type="text"
            inputMode="numeric"
            value={entry.fee}
            onChange={(e) => update(idx, { fee: formatFee(e.target.value) })}
            className={inputClass}
            placeholder="Tuition fee"
          />
          <CurrencySelect value={entry.currency} onChange={(currency) => update(idx, { currency })} className={`${inputClass} cursor-pointer`} />
          <button type="button" onClick={() => onChange(entries.filter((_, i) => i !== idx))} aria-label="Remove tuition fee" className="cursor-pointer text-red-400 hover:text-red-600 justify-self-start sm:justify-self-center">
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
      <div className={`${rowClass} rounded-lg border border-dashed border-neutral-gray-light p-2.5`}>
        <input type="text" value={draft.level} onChange={(e) => setDraft(prev => ({ ...prev, level: e.target.value }))} className={inputClass} placeholder="Level" />
        <input
          type="text"
          inputMode="numeric"
          value={draft.fee}
          onChange={(e) => setDraft(prev => ({ ...prev, fee: formatFee(e.target.value) }))}
          className={inputClass}
          placeholder="Tuition fee"
        />
        <CurrencySelect value={draft.currency} onChange={(currency) => setDraft(prev => ({ ...prev, currency }))} className={`${inputClass} cursor-pointer`} />
        <Button type="button" size="sm" className="bg-brand-red-600 hover:bg-brand-red-700 flex-shrink-0" onClick={add}>
          <Plus className="mr-1 h-4 w-4" /> Add
        </Button>
      </div>
    </div>
  );
}

export function OtherFeeList({ entries, onChange }: { entries: OtherFeeEntry[]; onChange: (entries: OtherFeeEntry[]) => void }) {
  const [draft, setDraft] = useState<OtherFeeEntry>({ name: '', description: '', cost: '', currency: 'USD' });

  const add = () => {
    if (!draft.name.trim() || !draft.cost.trim()) return toast.error('Please fill in Fee Name and Cost');
    if (draft.description.split(/\s+/).filter(Boolean).length > 20) return toast.error('Description must be 20 words max.');
    onChange([...entries, { ...draft }]);
    setDraft({ name: '', description: '', cost: '', currency: 'USD' });
  };

  const update = (idx: number, patch: Partial<OtherFeeEntry>) => {
    onChange(entries.map((entry, i) => (i === idx ? { ...entry, ...patch } : entry)));
  };

  return (
    <div className="space-y-3">
      {entries.map((entry, idx) => (
        <div key={idx} className="rounded-lg border border-neutral-gray-light p-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-neutral-gray-medium">
              Fee {idx + 1}
            </span>
            <button type="button" onClick={() => onChange(entries.filter((_, i) => i !== idx))} className="cursor-pointer text-red-400 hover:text-red-600">
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="space-y-2">
            <input type="text" value={entry.name} onChange={(e) => update(idx, { name: e.target.value })} className={inputClass} placeholder="Fee Name" />
            <input type="text" value={entry.description} onChange={(e) => update(idx, { description: e.target.value })} className={inputClass} placeholder="Description (20 words max.)" />
            <div className="grid grid-cols-3 gap-2">
              <input type="text" value={entry.cost} onChange={(e) => update(idx, { cost: e.target.value })} className={`${inputClass} col-span-2`} placeholder="Cost" />
              <select value={entry.currency} onChange={(e) => update(idx, { currency: e.target.value })} className={`${inputClass} cursor-pointer`}>
                {ALL_CURRENCIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
        </div>
      ))}
      <div className="rounded-lg border border-dashed border-neutral-gray-light p-4 space-y-2">
        <p className="text-xs font-bold text-neutral-gray-medium uppercase tracking-wider">Add Fee</p>
        <input type="text" value={draft.name} onChange={(e) => setDraft(prev => ({ ...prev, name: e.target.value }))} className={inputClass} placeholder="Fee Name" />
        <input type="text" value={draft.description} onChange={(e) => setDraft(prev => ({ ...prev, description: e.target.value }))} className={inputClass} placeholder="Description (20 words max.)" />
        <div className="grid grid-cols-3 gap-2">
          <input type="text" value={draft.cost} onChange={(e) => setDraft(prev => ({ ...prev, cost: e.target.value }))} className={`${inputClass} col-span-2`} placeholder="Cost" />
          <select value={draft.currency} onChange={(e) => setDraft(prev => ({ ...prev, currency: e.target.value }))} className={`${inputClass} cursor-pointer`}>
            {ALL_CURRENCIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <Button type="button" size="sm" className="bg-brand-red-600 hover:bg-brand-red-700 flex-shrink-0" onClick={add}>
          <Plus className="mr-1 h-4 w-4" /> Add
        </Button>
      </div>
    </div>
  );
}
