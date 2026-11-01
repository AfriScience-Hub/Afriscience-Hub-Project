'use client';

import WorkHoursSelector from '../../WorkHoursSelector';
import { WORK_DAYS } from '../data';
import type { SchoolHighlight } from '../types';

interface SchoolHighlightSectionProps {
  highlight: SchoolHighlight;
  onChange: (patch: Partial<SchoolHighlight>) => void;
}

export default function SchoolHighlightSection({ highlight, onChange }: SchoolHighlightSectionProps) {
  const inputClass = 'w-full rounded-lg border border-neutral-gray-light px-4 py-2.5 text-sm focus:border-brand-red-600 focus:ring-1 focus:ring-brand-red-600';

  return (
    <div className="space-y-6">
      {/* Work days */}
      <div>
        <label className="block text-sm font-medium text-neutral-black mb-2">Work days <span className="text-[10px] font-normal text-neutral-gray-medium">(multiple selections allowed)</span></label>
        <p className="text-xs text-neutral-gray-medium mb-2">Indicate the days the school operates in a week</p>
        <div className="grid gap-2 sm:grid-cols-4">
          {WORK_DAYS.map(day => (
            <label key={day} className={`
              flex items-center gap-2 rounded-lg border p-2.5 text-sm transition-colors cursor-pointer
              ${highlight.workDays.includes(day)
                ? 'border-brand-red-600 bg-brand-red-50 text-neutral-black'
                : 'border-neutral-gray-light text-neutral-gray-dark hover:border-brand-red-200'
              }
            `}>
              <input
                type="checkbox"
                checked={highlight.workDays.includes(day)}
                onChange={() => onChange({
                  workDays: highlight.workDays.includes(day)
                    ? highlight.workDays.filter(d => d !== day)
                    : [...highlight.workDays, day]
                })}
                className="rounded border-neutral-gray-light text-brand-red-600 focus:ring-brand-red-600 h-3.5 w-3.5"
              />
              {day}
            </label>
          ))}
        </div>
        <p className="mt-1.5 text-[11px] text-neutral-gray-medium">{highlight.workDays.length} selected</p>
      </div>

      {/* Work hours */}
      <div>
        <label className="block text-sm font-medium text-neutral-black mb-2">Work hours</label>
        <p className="text-xs text-neutral-gray-medium mb-2">Indicate the time interval for school activities in a day</p>
        <WorkHoursSelector
          entries={highlight.workHours}
          onChange={(entries) => onChange({ workHours: entries })}
          single
        />
      </div>

      {/* Active students */}
      <div>
        <label className="block text-sm font-medium text-neutral-black mb-1">Active students <span className="text-[10px] font-normal text-neutral-gray-medium">(1 entry max.)</span></label>
        <p className="text-xs text-neutral-gray-medium mb-2">Enter the number of students the school currently has</p>
        <input
          type="number"
          value={highlight.activeStudents}
          onChange={(e) => onChange({ activeStudents: e.target.value })}
          className={inputClass}
          placeholder="e.g. 1500"
          min="0"
        />
      </div>
    </div>
  );
}
