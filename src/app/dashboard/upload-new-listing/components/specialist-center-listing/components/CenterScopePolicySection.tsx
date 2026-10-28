'use client';

import { Flag, FileText } from 'lucide-react';
import EntryList from '../../EntryList';

interface CenterScopePolicySectionProps {
  scopes: string[];
  setScopes: (v: string[]) => void;
  policies: string[];
  setPolicies: (v: string[]) => void;
}

export default function CenterScopePolicySection({ scopes, setScopes, policies, setPolicies }: CenterScopePolicySectionProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Flag className="h-4 w-4 text-brand-navy-900" />
        <h4 className="text-sm font-bold uppercase tracking-wide text-neutral-black">Scopes</h4>
      </div>
      <p className="text-xs text-neutral-gray-medium">
        List other specific areas of expertise that your establishment is equipped to handle – e.g. tests, topics, techniques, tools, instrumentations, etc.
      </p>
      <EntryList
        label="Scopes"
        hint="multiple entries allowed"
        placeholder="e.g. PCR & Genetic Sequencing"
        entries={scopes}
        onChange={setScopes}
      />

      <div className="flex items-center gap-2 border-t border-neutral-gray-light pt-6">
        <FileText className="h-4 w-4 text-brand-red-600" />
        <h4 className="text-sm font-bold uppercase tracking-wide text-neutral-black">Engagement Policies</h4>
      </div>
      <p className="text-xs text-neutral-gray-medium">
        Mention important guidelines that clients must adhere to when requesting the services of your establishment.
      </p>
      <EntryList
        label="Engagement Policies"
        hint="multiple entries allowed"
        placeholder="e.g. All test results are delivered within 24-48 hours"
        entries={policies}
        onChange={setPolicies}
      />
    </div>
  );
}
