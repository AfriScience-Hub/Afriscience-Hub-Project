'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Calendar, ChevronDown, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface DateRange {
  from: string | null;
  to: string | null;
}

interface DateRangePickerProps {
  value: DateRange;
  onChange: (range: DateRange) => void;
  /** Text shown before any range is selected */
  placeholder?: string;
}

const inputClass = 'w-full rounded-lg border border-neutral-gray-light px-2.5 py-1.5 text-xs text-neutral-gray-dark bg-white outline-none focus:border-brand-red-600';

const formatISO = (iso: string | null): string => {
  if (!iso) return '';
  const d = new Date(`${iso}T00:00:00`);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

const toISO = (d: Date): string => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
};

function getPresets(): { label: string; range: DateRange }[] {
  const today = new Date();
  const day = today.getDay();
  const startOfThisWeek = new Date(today);
  startOfThisWeek.setDate(today.getDate() - ((day + 6) % 7)); // Monday

  const startOfLastWeek = new Date(startOfThisWeek);
  startOfLastWeek.setDate(startOfThisWeek.getDate() - 7);
  const endOfLastWeek = new Date(startOfLastWeek);
  endOfLastWeek.setDate(startOfLastWeek.getDate() + 6);

  const last30 = new Date(today);
  last30.setDate(today.getDate() - 29);

  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  return [
    { label: 'This Week', range: { from: toISO(startOfThisWeek), to: toISO(today) } },
    { label: 'Last Week', range: { from: toISO(startOfLastWeek), to: toISO(endOfLastWeek) } },
    { label: 'Last 30 Days', range: { from: toISO(last30), to: toISO(today) } },
    { label: 'This Month', range: { from: toISO(startOfMonth), to: toISO(endOfMonth) } },
  ];
}

/**
 * Selectable date-range control: quick presets + native from/to date inputs.
 * Committing is explicit via the Apply button (or a preset click).
 */
export default function DateRangePicker({ value, onChange, placeholder = 'Select date range' }: DateRangePickerProps) {
  const [open, setOpen] = useState(false);
  const [draftFrom, setDraftFrom] = useState<string>(value.from || '');
  const [draftTo, setDraftTo] = useState<string>(value.to || '');
  const [error, setError] = useState<string>('');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setOpen(false);
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const openPicker = () => {
    setDraftFrom(value.from || '');
    setDraftTo(value.to || '');
    setError('');
    setOpen(!open);
  };

  const apply = () => {
    if (draftFrom && draftTo && draftFrom > draftTo) {
      setError('Start date must be before end date');
      return;
    }
    onChange({ from: draftFrom || null, to: draftTo || null });
    setOpen(false);
  };

  const clear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDraftFrom('');
    setDraftTo('');
    setError('');
    onChange({ from: null, to: null });
    setOpen(false);
  };

  const hasValue = Boolean(value.from || value.to);
  const label = hasValue
    ? `${value.from ? formatISO(value.from) : 'Any'} - ${value.to ? formatISO(value.to) : 'Any'}`
    : placeholder;

  return (
    <div className="relative" ref={containerRef}>
      <div
        onClick={openPicker}
        className={cn(
          "flex items-center gap-1.5 px-2.5 py-1.5 border rounded-lg text-xs cursor-pointer bg-white whitespace-nowrap",
          hasValue ? "border-brand-red-600 text-brand-red-600 font-medium" : "border-neutral-gray-light text-neutral-gray-dark hover:bg-neutral-bg-light"
        )}
      >
        <Calendar className="h-3.5 w-3.5 flex-shrink-0" />
        <span>{label}</span>
        {hasValue && (
          <button type="button" onClick={clear} title="Clear date range" className="hover:text-neutral-black cursor-pointer">
            <X className="h-3 w-3" />
          </button>
        )}
        <ChevronDown className={cn("h-3 w-3 transition-transform flex-shrink-0", open && "rotate-180")} />
      </div>

      {open && (
        <div className="absolute left-0 top-full mt-1 w-64 bg-white border border-neutral-gray-light rounded-lg shadow-lg p-3 z-50">
          <div className="flex flex-wrap gap-1.5 mb-3">
            {getPresets().map((preset) => (
              <button
                key={preset.label}
                type="button"
                onClick={() => onChange(preset.range)}
                className="px-2 py-1 rounded border border-neutral-gray-light text-[10px] text-neutral-gray-dark hover:border-brand-red-600 hover:text-brand-red-600 cursor-pointer"
              >
                {preset.label}
              </button>
            ))}
          </div>
          <div className="space-y-2">
            <div>
              <label className="block text-[10px] font-medium text-neutral-gray-medium mb-1">From</label>
              <input type="date" value={draftFrom} onChange={(e) => { setDraftFrom(e.target.value); setError(''); }} className={inputClass} />
            </div>
            <div>
              <label className="block text-[10px] font-medium text-neutral-gray-medium mb-1">To</label>
              <input type="date" value={draftTo} onChange={(e) => { setDraftTo(e.target.value); setError(''); }} className={inputClass} />
            </div>
          </div>
          {error && <p className="mt-2 text-[10px] text-red-500">{error}</p>}
          <div className="mt-3 flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={clear}
              className="text-[10px] text-neutral-gray-medium hover:text-neutral-black cursor-pointer"
            >
              Reset
            </button>
            <button
              type="button"
              onClick={apply}
              className="px-3 py-1.5 rounded-lg bg-[#453DD8] text-white text-[10px] font-medium hover:bg-[#3a33c0] cursor-pointer"
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
