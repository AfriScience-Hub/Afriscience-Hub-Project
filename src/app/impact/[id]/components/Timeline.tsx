'use client';

import { cn } from '@/lib/utils';
import type { TimelinePhase } from '@/app/data/impactData';

const circleColors = [
  'bg-red-600',
  'bg-blue-600',
  'bg-green-600',
  'bg-amber-600',
  'bg-purple-600',
];

const chipColors = [
  'bg-red-100 text-red-700',
  'bg-blue-100 text-blue-700',
  'bg-green-100 text-green-700',
  'bg-amber-100 text-amber-700',
  'bg-purple-100 text-purple-700',
];

export default function Timeline({ timeline }: { timeline: TimelinePhase[] }) {
  if (!timeline.length) return null;

  return (
    <div className="p-6 sm:p-8 border-b border-neutral-gray-light">
      <h2 className="text-xl font-bold text-neutral-black mb-6">Timeline</h2>
      <div className="space-y-6">
        {timeline.map((item, idx) => (
          <div key={idx} className="flex gap-4 sm:gap-6">
            <div className="flex flex-col items-center flex-shrink-0">
              <div
                className={cn(
                  'h-10 w-10 sm:h-12 sm:w-12 rounded-full flex items-center justify-center font-bold text-white text-sm',
                  circleColors[idx % circleColors.length]
                )}
              >
                {idx + 1}
              </div>
              {idx < timeline.length - 1 && (
                <div className="w-0.5 flex-1 bg-neutral-gray-light mt-2 min-h-[2rem]" />
              )}
            </div>
            <div className="flex-1 pb-2">
              {(item.phase || item.interval) && (
                <div className="flex flex-wrap items-center gap-2.5 mb-2">
                  {item.phase && (
                    <span
                      className={cn(
                        'inline-flex px-3 py-1 rounded-full text-xs font-bold',
                        chipColors[idx % chipColors.length]
                      )}
                    >
                      {item.phase}
                    </span>
                  )}
                  {item.interval && (
                    <span className="text-sm text-neutral-gray-medium">{item.interval}</span>
                  )}
                </div>
              )}
              {item.title && <h3 className="font-bold text-neutral-black mb-2">{item.title}</h3>}
              <ul className="list-disc pl-5 space-y-1">
                {item.bullets.map((b) => (
                  <li key={b} className="text-sm text-neutral-gray-dark leading-relaxed">
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
