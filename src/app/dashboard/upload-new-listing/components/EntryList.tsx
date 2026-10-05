'use client';

import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { Button } from '@/app/components/ui/Button';
import { toast } from 'sonner';

interface EntryListProps {
  label: string;
  hint: string;
  placeholder: string;
  entries: string[];
  onChange: (entries: string[]) => void;
}

export default function EntryList({ label, hint, placeholder, entries, onChange }: EntryListProps) {
  const [draft, setDraft] = useState('');
  const inputClass = 'w-full rounded-lg border border-neutral-gray-light px-4 py-2.5 text-sm focus:border-brand-red-600 focus:ring-1 focus:ring-brand-red-600';

  const add = () => {
    const value = draft.trim();
    if (!value) return toast.error('Please enter a value first');
    if (entries.includes(value)) return toast.error('This entry already exists');
    onChange([...entries, value]);
    setDraft('');
  };

  return (
    <div>
      <label className="block text-sm font-medium text-neutral-black mb-1">{label} <span className="text-red-500">*</span> <span className="text-[10px] font-normal text-neutral-gray-medium">({hint})</span></label>
      <div className="flex gap-2">
        <input
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); add(); } }}
          className={inputClass}
          placeholder={placeholder}
        />
        <Button type="button" size="sm" className="flex-shrink-0 bg-brand-red-600 hover:bg-brand-red-700" onClick={add}>
          <Plus className="mr-1 h-4 w-4" /> Add
        </Button>
      </div>
      {entries.length > 0 && (
        <ul className="mt-3 space-y-2">
          {entries.map((entry, idx) => (
            <li key={`${entry}-${idx}`} className="flex items-center justify-between gap-2 rounded-lg border border-neutral-gray-light bg-neutral-bg-light px-3 py-2">
              <div className="flex min-w-0 items-center gap-2">
                <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-brand-navy-900 text-[10px] font-bold text-white">{idx + 1}</span>
                <span className="truncate text-sm text-neutral-black">{entry}</span>
              </div>
              <button
                type="button"
                onClick={() => onChange(entries.filter((_, i) => i !== idx))}
                className="flex-shrink-0 cursor-pointer text-red-400 hover:text-red-600"
              >
                <X className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
