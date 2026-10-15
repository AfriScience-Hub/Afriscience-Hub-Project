'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import CollapsibleSection from './CollapsibleSection';
import NumberInput from './NumberInput';
import { AWARD_CATEGORIES, AWARD_LEVELS, isValidYear, type AwardFormState } from '../data';
import { AWARD_TYPES } from '../../data';

interface BasicInfoSectionProps {
  value: AwardFormState;
  onChange: (patch: Partial<AwardFormState>) => void;
}

const selectCls = 'w-full px-3 py-2 text-xs text-neutral-black rounded-lg border border-neutral-gray-light bg-white outline-none focus:border-[#453DD8] cursor-pointer appearance-none';

/**
 * Section 1 — Basic Information: award type, category, level and year.
 */
export default function BasicInfoSection({ value, onChange }: BasicInfoSectionProps) {
  const yearInvalid = value.year !== '' && !isValidYear(value.year);

  return (
    <CollapsibleSection number={1} title="Basic Information" subtitle="Provide the main details for this award.">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="award-type" className="text-xs font-medium text-neutral-black block mb-1.5">
            Award Type <span className="text-brand-red-600">*</span>
          </label>
          <select id="award-type" value={value.awardType} onChange={(e) => onChange({ awardType: e.target.value })} className={selectCls}>
            <option value="">Select award type</option>
            {AWARD_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="award-category" className="text-xs font-medium text-neutral-black block mb-1.5">
            Category <span className="text-brand-red-600">*</span>
          </label>
          <select id="award-category" value={value.category} onChange={(e) => onChange({ category: e.target.value })} className={selectCls}>
            <option value="">Select category</option>
            {AWARD_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="award-level" className="text-xs font-medium text-neutral-black block mb-1.5">
            Level <span className="text-brand-red-600">*</span>
          </label>
          <select id="award-level" value={value.level} onChange={(e) => onChange({ level: e.target.value })} className={selectCls}>
            <option value="">Select level</option>
            {AWARD_LEVELS.map((l) => <option key={l} value={l}>{l}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="award-year" className="text-xs font-medium text-neutral-black block mb-1.5">
            Year <span className="text-brand-red-600">*</span>
          </label>
          <NumberInput
            id="award-year"
            value={value.year}
            onChange={(v) => onChange({ year: v })}
            placeholder="e.g. 2025"
            ariaLabel="Award year"
            invalid={yearInvalid}
          />
          {yearInvalid && <p className="text-[11px] text-brand-red-600 mt-1">Enter a valid year (e.g. 2025).</p>}
        </div>
      </div>
    </CollapsibleSection>
  );
}
