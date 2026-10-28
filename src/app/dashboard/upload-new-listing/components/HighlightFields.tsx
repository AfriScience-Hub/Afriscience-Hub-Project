'use client';

import { useId } from 'react';
import { RESPONSE_TIMES, WORK_DAYS } from './highlightOptions';
import WorkHoursSelector from './WorkHoursSelector';

export interface HighlightValues {
  responseTime: string;
  workDays: string[];
  workHours: string[];
}

interface HighlightFieldsProps {
  highlight: HighlightValues;
  onChange: (patch: Partial<HighlightValues>) => void;
  responseHint: string;
  workDaysHint: string;
  workHoursHint: string;
}

/** Response time, work days and work hours fields, styled like the school highlight. */
export default function HighlightFields({
  highlight, onChange, responseHint, workDaysHint, workHoursHint,
}: HighlightFieldsProps) {
  const radioName = useId();

  return (
    <div className="space-y-6">
      {/* Response time */}
      <div>
        <label className="block text-sm font-medium text-neutral-black mb-2">
          Response time <span className="text-[10px] font-normal text-neutral-gray-medium">(1 selection max.)</span>
        </label>
        <p className="text-xs text-neutral-gray-medium mb-2">{responseHint}</p>
        <div className="grid gap-2 sm:grid-cols-3">
          {RESPONSE_TIMES.map(option => (
            <label
              key={option}
              className={`
                flex items-center gap-2 rounded-lg border p-2.5 text-sm transition-colors cursor-pointer
                ${highlight.responseTime === option
                  ? 'border-brand-red-600 bg-brand-red-50 text-neutral-black'
                  : 'border-neutral-gray-light text-neutral-gray-dark hover:border-brand-red-200'
                }
              `}
            >
              <input
                type="radio"
                name={radioName}
                checked={highlight.responseTime === option}
                onChange={() => onChange({ responseTime: option })}
                className="h-3.5 w-3.5 border-neutral-gray-light text-brand-red-600 focus:ring-brand-red-600"
              />
              {option}
            </label>
          ))}
        </div>
      </div>

      {/* Work days */}
      <div>
        <label className="block text-sm font-medium text-neutral-black mb-2">
          Work days <span className="text-[10px] font-normal text-neutral-gray-medium">(multiple selections allowed)</span>
        </label>
        <p className="text-xs text-neutral-gray-medium mb-2">{workDaysHint}</p>
        <div className="grid gap-2 sm:grid-cols-4">
          {WORK_DAYS.map(day => (
            <label
              key={day}
              className={`
                flex items-center gap-2 rounded-lg border p-2.5 text-sm transition-colors cursor-pointer
                ${highlight.workDays.includes(day)
                  ? 'border-brand-red-600 bg-brand-red-50 text-neutral-black'
                  : 'border-neutral-gray-light text-neutral-gray-dark hover:border-brand-red-200'
                }
              `}
            >
              <input
                type="checkbox"
                checked={highlight.workDays.includes(day)}
                onChange={() => onChange({
                  workDays: highlight.workDays.includes(day)
                    ? highlight.workDays.filter(d => d !== day)
                    : [...highlight.workDays, day],
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
        <label className="block text-sm font-medium text-neutral-black mb-2">
          Work hours <span className="text-[10px] font-normal text-neutral-gray-medium">(multiple selections allowed)</span>
        </label>
        <p className="text-xs text-neutral-gray-medium mb-2">{workHoursHint}</p>
        <WorkHoursSelector
          entries={highlight.workHours}
          onChange={(workHours) => onChange({ workHours })}
        />
      </div>
    </div>
  );
}
