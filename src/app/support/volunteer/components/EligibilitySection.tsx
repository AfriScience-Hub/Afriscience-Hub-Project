'use client';

import { CheckCircle2 } from 'lucide-react';

const ELIGIBILITY = [
  'Passion for African science & innovation',
  'Reliable and committed to schedules',
  'Good communication skills',
  'Willingness to learn and collaborate',
  'Minimum age: 18 years',
  'Access to reliable internet (for remote roles)',
];

export function EligibilitySection() {
  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-neutral-black mb-2">Eligibility</h2>
          <p className="text-slate-500">We welcome volunteers from all backgrounds. Here's what we look for:</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {ELIGIBILITY.map((item, idx) => (
            <div key={idx} className="flex items-center gap-3 p-4 bg-neutral-bg-light rounded-xl">
              <CheckCircle2 className="h-5 w-5 text-brand-red-600 flex-shrink-0" />
              <span className="text-sm text-neutral-black">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
