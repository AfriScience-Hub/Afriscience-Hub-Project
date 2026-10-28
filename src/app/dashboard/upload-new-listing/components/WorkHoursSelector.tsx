'use client';

import { useState } from 'react';
import { Clock3, Plus, X } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/app/components/ui/Button';

interface WorkHoursSelectorProps {
  entries: string[];
  onChange: (entries: string[]) => void;
}

const inputClass =
  'w-full rounded-lg border border-neutral-gray-light px-4 py-2.5 text-sm focus:border-brand-red-600 focus:ring-1 focus:ring-brand-red-600';

/** Converts a 24-hour input value (e.g. 14:30) into a readable label. */
function formatTime(value: string): string {
  const [hourString, minute = '00'] = value.split(':');
  const hour = Number(hourString);
  const suffix = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${minute} ${suffix}`;
}

/**
 * Collects a work interval using separate opening and closing time inputs,
 * so users cannot type malformed or reversed time ranges.
 */
export default function WorkHoursSelector({ entries, onChange }: WorkHoursSelectorProps) {
  const [opening, setOpening] = useState('');
  const [closing, setClosing] = useState('');

  const add = () => {
    if (!opening) return toast.error('Please select an opening time');
    if (!closing) return toast.error('Please select a closing time');
    if (closing <= opening) return toast.error('Closing time must be after opening time');

    const range = `${formatTime(opening)} – ${formatTime(closing)}`;
    if (entries.includes(range)) return toast.error('This work-hour range already exists');

    onChange([...entries, range]);
    setOpening('');
    setClosing('');
  };

  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto] sm:items-end">
        <div>
          <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wide text-neutral-gray-medium">
            Opening time
          </label>
          <input
            type="time"
            value={opening}
            onChange={(e) => setOpening(e.target.value)}
            className={inputClass}
            aria-label="Opening time"
          />
        </div>

        <span className="hidden pb-3 text-xs font-medium text-neutral-gray-medium sm:block">to</span>

        <div>
          <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wide text-neutral-gray-medium">
            Closing time
          </label>
          <input
            type="time"
            value={closing}
            onChange={(e) => setClosing(e.target.value)}
            className={inputClass}
            aria-label="Closing time"
          />
        </div>

        <Button type="button" size="sm" className="h-[42px] flex-shrink-0 bg-brand-red-600 hover:bg-brand-red-700" onClick={add}>
          <Plus className="mr-1 h-4 w-4" /> Add
        </Button>
      </div>

      {entries.length > 0 && (
        <ul className="mt-4 space-y-2">
          {entries.map((entry, idx) => (
            <li key={`${entry}-${idx}`} className="flex items-center justify-between gap-2 rounded-lg border border-neutral-gray-light bg-neutral-bg-light px-3 py-2">
              <div className="flex min-w-0 items-center gap-2">
                <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-brand-navy-900 text-[10px] font-bold text-white">{idx + 1}</span>
                <Clock3 className="h-3.5 w-3.5 flex-shrink-0 text-neutral-gray-medium" />
                <span className="truncate text-sm text-neutral-black">{entry}</span>
              </div>
              <button
                type="button"
                onClick={() => onChange(entries.filter((_, i) => i !== idx))}
                aria-label={`Remove ${entry}`}
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
