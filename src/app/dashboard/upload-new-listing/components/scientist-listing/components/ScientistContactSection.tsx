'use client';

import { Globe } from 'lucide-react';
import CollapsibleSection from '../../CollapsibleSection';
import type { ScientistContact } from '../types';

const SOCIAL_PLATFORMS = ['LinkedIn', 'Twitter', 'Instagram', 'Facebook'] as const;

interface ScientistContactSectionProps {
  contact: ScientistContact;
  onChange: (patch: Partial<ScientistContact>) => void;
  /**
   * Approved / Pro-upgrade edits: handles already filled in are locked, but
   * empty platforms can still be filled in.
   */
  approvedEditMode?: boolean;
}

export default function ScientistContactSection({ contact, onChange, approvedEditMode = false }: ScientistContactSectionProps) {
  const inputClass = 'w-full rounded-lg border border-neutral-gray-light px-4 py-2.5 text-sm focus:border-brand-red-600 focus:ring-1 focus:ring-brand-red-600 disabled:cursor-not-allowed disabled:bg-neutral-bg-light disabled:text-neutral-gray-medium';

  return (
    <CollapsibleSection title="Contact information" icon={<Globe className="h-5 w-5 text-brand-red-600" />} defaultOpen={false}>
      <div>
        <label className="block text-sm font-medium text-neutral-black mb-2">
          Social Handles <span className="text-red-500">*</span>{' '}
          <span className="text-[10px] font-normal text-neutral-gray-medium">(provide at least one)</span>
        </label>
        <div className="grid gap-3 sm:grid-cols-2">
          {SOCIAL_PLATFORMS.map((platform) => {
            // Restricted edits: a handle that already has a value is locked,
            // while empty platforms can still be filled in.
            const locked = approvedEditMode && contact.socials[platform].trim().length > 0;
            return (
              <div key={platform}>
                <label className="mb-1 block text-[11px] font-medium text-neutral-gray-medium">{platform}</label>
                <input
                  type="text"
                  value={contact.socials[platform]}
                  onChange={(e) => onChange({ socials: { ...contact.socials, [platform]: e.target.value } })}
                  className={inputClass}
                  placeholder={`@your${platform.toLowerCase()}handle`}
                  disabled={locked}
                />
              </div>
            );
          })}
        </div>
      </div>
    </CollapsibleSection>
  );
}
