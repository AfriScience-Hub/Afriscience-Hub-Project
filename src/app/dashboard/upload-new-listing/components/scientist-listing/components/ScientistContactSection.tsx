'use client';

import { Phone } from 'lucide-react';
import CollapsibleSection from '../../CollapsibleSection';

const SOCIAL_PLATFORMS = ['LinkedIn', 'Twitter', 'Instagram', 'Facebook'] as const;

interface ScientistContactSectionProps {
  contact: {
    phone: string;
    email: string;
    website: string;
    socials: Record<(typeof SOCIAL_PLATFORMS)[number], string>;
  };
  onChange: (patch: Partial<{ phone: string; email: string; website: string; socials: Record<(typeof SOCIAL_PLATFORMS)[number], string> }>) => void;
}

export default function ScientistContactSection({ contact, onChange }: ScientistContactSectionProps) {
  const inputClass = 'w-full rounded-lg border border-neutral-gray-light px-4 py-2.5 text-sm focus:border-brand-red-600 focus:ring-1 focus:ring-brand-red-600';

  return (
    <CollapsibleSection title="Contact Information" icon={<Phone className="h-5 w-5 text-brand-red-600" />} defaultOpen={false}>
      <div className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-neutral-black mb-1">Phone Number <span className="text-red-500">*</span></label>
            <input type="tel" value={contact.phone} onChange={(e) => onChange({ phone: e.target.value })} className={inputClass} placeholder="+234 800 000 0000" />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-black mb-1">E-mail <span className="text-red-500">*</span></label>
            <input type="email" value={contact.email} onChange={(e) => onChange({ email: e.target.value })} className={inputClass} placeholder="you@example.com" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-black mb-1">Website</label>
          <input type="url" value={contact.website} onChange={(e) => onChange({ website: e.target.value })} className={`${inputClass} flex items-center`} placeholder="https://www.example.com (optional)" />
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-black mb-2">
            Social Handles <span className="text-red-500">*</span> <span className="text-[10px] font-normal text-neutral-gray-medium">(provide at least one)</span>
          </label>
          <div className="grid gap-3 sm:grid-cols-2">
            {SOCIAL_PLATFORMS.map(platform => (
              <div key={platform}>
                <label className="mb-1 block text-[11px] font-medium text-neutral-gray-medium">{platform}</label>
                <input
                  type="text"
                  value={contact.socials[platform]}
                  onChange={(e) => onChange({ socials: { ...contact.socials, [platform]: e.target.value } })}
                  className={inputClass}
                  placeholder={`@your${platform.toLowerCase()}handle`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </CollapsibleSection>
  );
}
