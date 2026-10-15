'use client';

import React, { useState } from 'react';
import { Calendar, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';

/** ISO 'yyyy-mm-dd' bounds used by native date inputs. */
export interface DateRange {
  from: string;
  to: string;
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** '2025-01-01' → 'Jan 1, 2025' */
export const formatRangeDate = (iso: string): string => {
  const [y, m, d] = iso.split('-').map(Number);
  return `${MONTHS[m - 1]} ${d}, ${y}`;
};

/** Inclusive UTC bounds for an ISO date ('to' covers the whole day). */
export const rangeBounds = (range: DateRange): { fromTs: number; toTs: number } => {
  const [fy, fm, fd] = range.from.split('-').map(Number);
  const [ty, tm, td] = range.to.split('-').map(Number);
  return {
    fromTs: Date.UTC(fy, fm - 1, fd),
    toTs: Date.UTC(ty, tm - 1, td, 23, 59, 59, 999),
  };
};

interface DateRangePickerProps {
  /** Applied range; null means no range selected (show all data). */
  range: DateRange | null;
  onApply: (range: DateRange | null) => void;
}

/**
 * Date-range selector chip: shows a placeholder until a range is picked,
 * then opens a popover with From/To date inputs plus Apply and Reset
 * buttons. Reset clears the range so the dashboard shows all data.
 */
export default function DateRangePicker({ range, onApply }: DateRangePickerProps) {
  const [open, setOpen] = useState(false);
  const [from, setFrom] = useState(range?.from ?? '');
  const [to, setTo] = useState(range?.to ?? '');

  const toggle = () => {
    if (!open) {
      setFrom(range?.from ?? '');
      setTo(range?.to ?? '');
    }
    setOpen((o) => !o);
  };

  const apply = () => {
    if (!from || !to) {
      toast.error('Please select both a start and an end date.');
      return;
    }
    if (from > to) {
      toast.error('The start date must be before the end date.');
      return;
    }
    onApply({ from, to });
    setOpen(false);
    toast.success(`Showing data from ${formatRangeDate(from)} to ${formatRangeDate(to)}.`);
  };

  const reset = () => {
    setFrom('');
    setTo('');
    onApply(null);
    setOpen(false);
    toast.success('Date range cleared. Showing all data.');
  };

  const inputCls =
    'w-full px-2.5 py-2 text-xs text-neutral-black rounded-lg border border-neutral-gray-light bg-white outline-none focus:border-[#453DD8]';

  return (
    <div className="relative">
      <button
        type="button"
        onClick={toggle}
        aria-expanded={open}
        className={`flex items-center gap-1.5 px-3 py-2 border border-neutral-gray-light bg-white rounded-lg text-xs font-medium cursor-pointer whitespace-nowrap ${range ? 'text-neutral-gray-dark' : 'text-neutral-gray-medium'}`}
      >
        <Calendar className="h-3.5 w-3.5" />
        {range ? `${formatRangeDate(range.from)} – ${formatRangeDate(range.to)}` : 'Select date range'}
      </button>

      {open && (
        <>
          {/* Invisible backdrop closes the popover on outside clicks. */}
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} aria-hidden="true" />
          <div className="absolute right-0 z-50 mt-2 w-72 rounded-xl border border-neutral-gray-light bg-white shadow-lg p-4">
            <p className="text-xs font-bold text-neutral-black mb-3">Select date range</p>
            <div className="grid grid-cols-2 gap-3">
              <label className="space-y-1">
                <span className="text-[11px] font-semibold text-neutral-gray-dark">From</span>
                <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} className={inputCls} />
              </label>
              <label className="space-y-1">
                <span className="text-[11px] font-semibold text-neutral-gray-dark">To</span>
                <input type="date" value={to} onChange={(e) => setTo(e.target.value)} className={inputCls} />
              </label>
            </div>
            <div className="flex items-center justify-between gap-2 mt-4">
              <button
                type="button"
                onClick={reset}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-neutral-gray-light text-xs font-medium text-neutral-gray-dark hover:bg-neutral-bg-light cursor-pointer"
              >
                <RotateCcw className="h-3.5 w-3.5" /> Reset
              </button>
              <button
                type="button"
                onClick={apply}
                className="px-5 py-2 rounded-lg bg-[#453DD8] text-white text-xs font-semibold hover:bg-[#3a33c0] cursor-pointer"
              >
                Apply
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
