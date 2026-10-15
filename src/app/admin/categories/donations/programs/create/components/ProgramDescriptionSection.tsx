'use client';

import React from 'react';
import CollapsibleSection from './CollapsibleSection';
import { DESCRIPTION_MAX, type ProgramFormState } from '../data';

interface ProgramDescriptionSectionProps {
  value: ProgramFormState;
  onChange: (patch: Partial<ProgramFormState>) => void;
}

/**
 * Section 2 — Program Description: the 0/500 textarea plus the
 * example-note helper line from the design.
 */
export default function ProgramDescriptionSection({ value, onChange }: ProgramDescriptionSectionProps) {
  return (
    <CollapsibleSection number={2} title="Program Description">
      <div>
        <label htmlFor="program-description" className="text-xs font-medium text-neutral-black block mb-1.5">
          Description <span className="text-brand-red-600">*</span>
        </label>
        <textarea
          id="program-description"
          rows={4}
          value={value.description}
          onChange={(e) => onChange({ description: e.target.value.slice(0, DESCRIPTION_MAX) })}
          maxLength={DESCRIPTION_MAX}
          placeholder="Describe what this program does, who it supports, and how donations will be used..."
          className="w-full px-3 py-2.5 text-xs text-neutral-black rounded-lg border border-neutral-gray-light bg-white outline-none focus:border-[#453DD8] resize-y min-h-[96px]"
        />
        <div className="flex items-start justify-between gap-3 mt-1">
          <p className="text-[10px] text-neutral-gray-light leading-relaxed">
            <span className="font-semibold text-neutral-gray-medium">e.g.</span>{' '}
            This program supports innovative research projects by African scientists and provides grants, resources and mentorship to advance science and technology in Africa.
          </p>
          <p className="text-[10px] text-neutral-gray-medium whitespace-nowrap">{value.description.length} / {DESCRIPTION_MAX}</p>
        </div>
      </div>
    </CollapsibleSection>
  );
}
