'use client';

import { User } from 'lucide-react';
import CollapsibleSection from '../../CollapsibleSection';

export interface YourInformation {
  fullName: string;
  phone: string;
  email: string;
  idTag: string;
}

interface YourInformationSectionProps {
  info: YourInformation;
}

export default function YourInformationSection({ info }: YourInformationSectionProps) {
  const fields: { label: string; value: string; placeholder: string }[] = [
    { label: 'Full Name', value: info.fullName, placeholder: 'Auto-populated by platform' },
    { label: 'Phone Number', value: info.phone, placeholder: 'Auto-populated by platform' },
    { label: 'E-mail Address', value: info.email, placeholder: 'Auto-populated by platform' },
    { label: 'ID Tag', value: info.idTag, placeholder: 'Auto-populated by platform' },
  ];

  return (
    <CollapsibleSection title="Your Information" icon={<User className="h-5 w-5 text-brand-red-600" />} badge="Auto-populated by platform" defaultOpen={false}>
      <div className="space-y-4">
        <p className="text-xs text-neutral-gray-medium">These details are provided by the platform and cannot be edited here.</p>
        <div className="grid gap-4 sm:grid-cols-2">
          {fields.map(field => (
            <div key={field.label}>
              <label className="block text-sm font-medium text-neutral-black mb-1">{field.label}</label>
              <input
                type="text"
                value={field.value}
                readOnly
                placeholder={field.placeholder}
                className="w-full cursor-not-allowed rounded-lg border border-neutral-gray-light bg-neutral-bg-light px-4 py-2.5 text-sm text-neutral-gray-dark"
              />
            </div>
          ))}
        </div>
      </div>
    </CollapsibleSection>
  );
}
