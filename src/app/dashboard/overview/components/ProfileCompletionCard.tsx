'use client';

import { GraduationCap, Check } from 'lucide-react';

interface ProfileCompletionCardProps {
  completion: { pct: number; checks: { label: string; done: boolean }[] };
}

export function ProfileCompletionCard({ completion }: ProfileCompletionCardProps) {
  return (
    <div className="rounded-xl border border-neutral-gray-light bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold text-neutral-black flex items-center gap-2">
          <GraduationCap className="h-5 w-5 text-brand-red-600" /> Profile Completion
        </h3>
        <span className="text-sm font-bold text-brand-red-600">{completion.pct}%</span>
      </div>
      <div className="h-2.5 rounded-full bg-neutral-bg-light overflow-hidden mb-4">
        <div className="h-full rounded-full bg-gradient-to-r from-brand-red-600 to-brand-red-400 transition-all duration-500" style={{ width: `${completion.pct}%` }} />
      </div>
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {completion.checks.map(check => (
          <div key={check.label} className="flex items-center gap-2 text-sm">
            {check.done ? (
              <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
            ) : (
              <div className="h-4 w-4 rounded border-2 border-neutral-gray-light flex-shrink-0" />
            )}
            <span className={check.done ? 'text-neutral-gray-dark line-through' : 'text-neutral-black font-medium'}>{check.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
