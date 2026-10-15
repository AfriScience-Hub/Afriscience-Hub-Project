'use client';

import React from 'react';
import CollapsibleSection from './CollapsibleSection';

export interface AboutState {
  shortDescription: string;
  description: string;
}

interface AboutSectionProps {
  value: AboutState;
  onChange: (patch: Partial<AboutState>) => void;
}

const SHORT_MAX = 200;

/**
 * Section 2 — About the Competition: a short description (card summary,
 * max 200 characters) and the full competition description in a rich
 * text editor.
 */
export default function AboutSection({ value, onChange }: AboutSectionProps) {
  return (
    <CollapsibleSection
      number={2}
      title="About the Competition"
      subtitle="Provide detailed information about the competition."
    >
      <div className="space-y-4">
        <div>
          <label htmlFor="short-desc" className="text-xs font-medium text-neutral-black block mb-1.5">
            Short Description <span className="text-brand-red-600">*</span>
          </label>
          <textarea
            id="short-desc"
            rows={3}
            maxLength={SHORT_MAX}
            value={value.shortDescription}
            onChange={(e) => onChange({ shortDescription: e.target.value })}
            placeholder="A brief summary that will appear on the competition card (max 200 characters)."
            className="w-full px-3 py-2 text-xs text-neutral-black rounded-lg border border-neutral-gray-light bg-white outline-none focus:border-[#453DD8] resize-none"
          />
          <p className="text-[10px] text-neutral-gray-medium text-right mt-1">
            {value.shortDescription.length}/{SHORT_MAX}
          </p>
        </div>
        <div>
          <label htmlFor="comp-desc" className="text-xs font-medium text-neutral-black block mb-1.5">
            Competition Description <span className="text-brand-red-600">*</span>
          </label>
          <textarea
            id="comp-desc"
            rows={6}
            value={value.description}
            onChange={(e) => onChange({ description: e.target.value })}
            placeholder="Provide a detailed description of the competition, its purpose, objectives and expected impact."
            className="w-full px-3 py-2 text-xs text-neutral-black rounded-lg border border-neutral-gray-light bg-white outline-none focus:border-[#453DD8] resize-none"
          />
        </div>
      </div>
    </CollapsibleSection>
  );
}
