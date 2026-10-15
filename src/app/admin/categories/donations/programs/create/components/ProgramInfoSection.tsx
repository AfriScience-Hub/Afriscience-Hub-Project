'use client';

import React from 'react';
import NumberInput from '@/app/admin/components/NumberInput';
import CollapsibleSection from './CollapsibleSection';
import { isValidTarget, type ProgramFormState } from '../data';

interface ProgramInfoSectionProps {
  value: ProgramFormState;
  onChange: (patch: Partial<ProgramFormState>) => void;
}

/**
 * Section 1 — Program Information: name and USD target amount only
 * (created programs use the default gift icon).
 */
export default function ProgramInfoSection({ value, onChange }: ProgramInfoSectionProps) {
  const amountInvalid = value.targetAmount !== '' && !isValidTarget(value.targetAmount);

  return (
    <CollapsibleSection number={1} title="Program Information">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="program-name" className="text-xs font-medium text-neutral-black block mb-1.5">
            Program Name <span className="text-brand-red-600">*</span>
          </label>
          <input
            id="program-name"
            type="text"
            value={value.name}
            onChange={(e) => onChange({ name: e.target.value })}
            placeholder="e.g. Career Support"
            className="w-full px-3 py-2 text-xs text-neutral-black rounded-lg border border-neutral-gray-light bg-white outline-none focus:border-[#453DD8]"
          />
        </div>
        <div>
          <label htmlFor="program-target" className="text-xs font-medium text-neutral-black block mb-1.5">
            Target Amount (USD) <span className="text-brand-red-600">*</span>
          </label>
          <div className="flex items-stretch">
            <span className="w-9 rounded-l-lg border border-r-0 border-neutral-gray-light bg-neutral-bg-light grid place-items-center text-xs font-semibold text-neutral-gray-dark" aria-hidden="true">
              $
            </span>
            <NumberInput
              id="program-target"
              value={value.targetAmount}
              onChange={(v) => onChange({ targetAmount: v })}
              placeholder="e.g. 50,000"
              ariaLabel="Target amount in USD"
              invalid={amountInvalid}
              className="rounded-l-none"
            />
          </div>
          {amountInvalid && <p className="text-[11px] text-brand-red-600 mt-1">Enter a target amount greater than 0.</p>}
        </div>
      </div>
    </CollapsibleSection>
  );
}
