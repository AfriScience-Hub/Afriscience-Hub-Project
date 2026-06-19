'use client';

import { Target } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { CAUSES } from '../data';

interface DonateCausesProps {
  onDonate: (causeId: string) => void;
}

export function DonateCauses({ onDonate }: DonateCausesProps) {
  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h2 className="text-2xl font-bold text-neutral-black mb-2">Current Causes</h2>
        <p className="text-slate-500">Select a cause to support. Every contribution counts.</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {CAUSES.map((cause) => {
          const percentage = Math.round((cause.raised / cause.target) * 100);
          return (
            <div key={cause.id} className={`rounded-2xl border-2 p-6 ${cause.color}`}>
              <div className="flex items-start gap-4 mb-4">
                <div className="text-4xl">{cause.emoji}</div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-neutral-black mb-1">{cause.title}</h3>
                  <p className="text-sm text-slate-500 mb-4">{cause.description}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600 font-medium">${cause.raised.toLocaleString()} raised</span>
                      <span className="text-slate-400">of ${cause.target.toLocaleString()}</span>
                    </div>
                    <div className="h-2.5 bg-white rounded-full overflow-hidden">
                      <div className="h-full bg-brand-red-600 rounded-full transition-all duration-500" style={{ width: `${percentage}%` }} />
                    </div>
                    <div className="flex items-center gap-1 text-xs text-slate-400">
                      <Target className="h-3 w-3" />
                      {percentage}% of goal reached
                    </div>
                  </div>
                </div>
              </div>
              <Button onClick={() => onDonate(cause.id)} variant="outline" className="w-full">
                Donate to this Cause
              </Button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
