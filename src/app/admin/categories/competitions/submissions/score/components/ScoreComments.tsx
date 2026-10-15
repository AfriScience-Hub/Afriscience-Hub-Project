'use client';

import React from 'react';

const MAX_LENGTH = 1000;

interface ScoreCommentsProps {
  value: string;
  onChange: (value: string) => void;
}

/**
 * Optional Comments card — feedback visible to organizers only, with a
 * character counter, placed under the scoring sheet.
 */
export default function ScoreComments({ value, onChange }: ScoreCommentsProps) {
  return (
    <div className="rounded-xl border border-neutral-gray-light bg-white shadow-sm p-4">
      <p className="text-xs font-semibold text-neutral-black mb-2">
        Optional Comments <span className="font-normal text-neutral-gray-medium">(Visible to organizers only)</span>
      </p>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value.slice(0, MAX_LENGTH))}
        maxLength={MAX_LENGTH}
        rows={4}
        placeholder="Add your feedback and comments about this submission..."
        className="w-full px-3 py-2.5 text-xs text-neutral-black rounded-lg border border-neutral-gray-light bg-white outline-none focus:border-[#453DD8] resize-y min-h-[96px]"
      />
      <p className="text-[10px] text-neutral-gray-medium text-right mt-1">{value.length} / {MAX_LENGTH}</p>
    </div>
  );
}
