'use client';

import { FileText } from 'lucide-react';
import CollapsibleSection from './CollapsibleSection';

interface PoliciesSectionProps {
  policies: string;
  setPolicies: (v: string) => void;
}

export default function PoliciesSection({ policies, setPolicies }: PoliciesSectionProps) {
  return (
    <CollapsibleSection title="Policies / Rules / Terms of Engagement" icon={<FileText className="h-5 w-5 text-brand-red-600" />} defaultOpen={false}>
      <div>
        <textarea
          value={policies}
          onChange={e => setPolicies(e.target.value)}
          rows={5}
          className="w-full rounded-lg border border-neutral-gray-light px-4 py-2.5 text-sm focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600 resize-none"
          placeholder="Define your terms of engagement, rules, service conditions, or any policies you'd like visitors to know about..."
        />
      </div>
    </CollapsibleSection>
  );
}
