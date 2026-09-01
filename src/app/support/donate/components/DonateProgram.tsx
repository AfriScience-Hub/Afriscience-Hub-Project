'use client';

import { Target } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { CAUSES } from '../data';

interface DonateCausesProps {
  onDonate: (causeId: string) => void;
}

export function DonatePrograms({ onDonate }: DonateCausesProps) {
  const afriScienceCause = CAUSES.find(c => c.id === 'afriScience-support');
  const otherCauses = CAUSES.filter(c => c.id !== 'afriScience-support');

  return (
    <section id="current-programs" className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h2 className="text-2xl font-bold text-neutral-black mb-2">Current Programs</h2>
        <p className="text-slate-500">Select a program to support. Every contribution counts.</p>
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-6">
        {otherCauses.map((cause) => {
          const percentage = Math.round((cause.raised / cause.target) * 100);
          return (
            <div key={cause.id} className={`rounded-2xl border-2 p-6 ${cause.color} flex flex-col`}>
              <div className="flex flex-col items-start gap-4 flex-1">
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
              <Button onClick={() => onDonate(cause.id)} className="w-full h-11 bg-brand-red-600 hover:bg-brand-red-700 text-white font-bold shadow-sm mt-4">
                Donate to this Program
              </Button>
            </div>
          );
        })}
      </div>

      {afriScienceCause && (
        <div className={`rounded-2xl border-2 p-6 ${afriScienceCause.color} flex flex-col`}>
          <div className="flex flex-col items-start gap-4 flex-1">
            <div className="text-4xl">{afriScienceCause.emoji}</div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-neutral-black mb-1">{afriScienceCause.title}</h3>
              <p className="text-sm text-slate-500 mb-4">{afriScienceCause.description}</p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600 font-medium">${afriScienceCause.raised.toLocaleString()} raised</span>
                  <span className="text-slate-400">of ${afriScienceCause.target.toLocaleString()}</span>
                </div>
                <div className="h-2.5 bg-white rounded-full overflow-hidden">
                  <div className="h-full bg-brand-red-600 rounded-full transition-all duration-500" style={{ width: `${Math.round((afriScienceCause.raised / afriScienceCause.target) * 100)}%` }} />
                </div>
                <div className="flex items-center gap-1 text-xs text-slate-400">
                  <Target className="h-3 w-3" />
                  {Math.round((afriScienceCause.raised / afriScienceCause.target) * 100)}% of goal reached
                </div>
              </div>
            </div>
          </div>
          <Button onClick={() => onDonate(afriScienceCause.id)} className="w-full h-11 bg-brand-red-600 hover:bg-brand-red-700 text-white font-bold shadow-sm mt-4">
            Donate to this Program
          </Button>
        </div>
      )}
    </section>
  );
}
