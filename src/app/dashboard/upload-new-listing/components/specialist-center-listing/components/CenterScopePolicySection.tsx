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
      <EntryList
        label="Engagement Policies"
        hint="important guidelines for client requests, multiple entries allowed"
        placeholder="e.g. All test results are delivered within 24-48 hours"
        entries={policies}
        onChange={setPolicies}
      />
    </div>
  );
}
