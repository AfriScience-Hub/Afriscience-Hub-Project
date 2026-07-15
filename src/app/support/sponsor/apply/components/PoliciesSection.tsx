'use client';

import { Plus, X } from 'lucide-react';
import { Input } from '../../../../components/ui/input';
import { Button } from '../../../../components/ui/Button';

interface PoliciesSectionProps {
  policies: string[];
  onAddPolicy: () => void;
  onRemovePolicy: (index: number) => void;
  onUpdatePolicy: (index: number, value: string) => void;
}

export function PoliciesSection({ policies, onAddPolicy, onRemovePolicy, onUpdatePolicy }: PoliciesSectionProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-neutral-gray-light p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-neutral-black">Engagement Policies</h2>
        <Button type="button" variant="outline" size="sm" onClick={onAddPolicy} className="flex items-center gap-1">
          <Plus className="h-4 w-4" /> Add Policy
        </Button>
      </div>
      <p className="text-xs text-neutral-gray-medium mb-4">List the policies of your organization that are vital to it.</p>
      <div className="space-y-3">
        {policies.map((policy, idx) => (
          <div key={idx} className="flex gap-2 items-start">
            <div className="flex-1">
              <Input value={policy} onChange={e => onUpdatePolicy(idx, e.target.value)} placeholder="Enter a policy or guideline" />
            </div>
            {policies.length > 1 && (
              <button type="button" onClick={() => onRemovePolicy(idx)} className="cursor-pointer mt-1 text-slate-400 hover:text-red-500">
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
