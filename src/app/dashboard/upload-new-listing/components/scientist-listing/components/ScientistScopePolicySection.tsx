'use client';

import { Flag, FileText } from 'lucide-react';
import CollapsibleSection from '../../CollapsibleSection';
import EntryList from '../../EntryList';

interface ScientistScopePolicySectionProps {
  scopes: string[];
  setScopes: (v: string[]) => void;
  policies: string[];
  setPolicies: (v: string[]) => void;
}

export default function ScientistScopePolicySection({ scopes, setScopes, policies, setPolicies }: ScientistScopePolicySectionProps) {
  return (
    <CollapsibleSection title="Scopes & Engagement Policies" icon={<Flag className="h-5 w-5 text-brand-navy-900" />} defaultOpen={false}>
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Flag className="h-4 w-4 text-brand-navy-900" />
          <h4 className="text-sm font-bold uppercase tracking-wide text-neutral-black">Scopes</h4>
        </div>
        <EntryList
          label="Scopes"
          hint="expertise areas: tests, topics, techniques, tools, instrumentation, multiple entries allowed"
          placeholder="e.g. AI Model Training"
          entries={scopes}
          onChange={setScopes}
        />

        <div className="flex items-center gap-2 border-t border-neutral-gray-light pt-6">
          <FileText className="h-4 w-4 text-brand-red-600" />
          <h4 className="text-sm font-bold uppercase tracking-wide text-neutral-black">Engagement Policies</h4>
        </div>
        <EntryList
          label="Engagement Policies"
          hint="guidelines for clients when requesting services, multiple entries allowed"
          placeholder="e.g. All consultations must be booked 48 hours in advance"
          entries={policies}
          onChange={setPolicies}
        />
      </div>
    </CollapsibleSection>
  );
}
