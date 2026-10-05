'use client';

import { User } from 'lucide-react';
import CollapsibleSection from '../../CollapsibleSection';

export interface YourInformation {
  fullName: string;
  phone: string;
  email: string;
  username: string;
}

interface YourInformationSectionProps {
  info: YourInformation;
}

export default function YourInformationSection({ info }: YourInformationSectionProps) {
  const fields: { label: string; value: string }[] = [
    { label: 'Full Name', value: info.fullName },
    { label: 'Phone Number', value: info.phone },
    { label: 'E-mail Address', value: info.email },
    { label: 'Username', value: info.username },
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
                className="w-full cursor-not-allowed rounded-lg border border-neutral-gray-light bg-neutral-bg-light px-4 py-2.5 text-sm text-neutral-gray-dark"
              />
            </div>
          ))}
        </div>
      </div>
    </CollapsibleSection>
  );
}
