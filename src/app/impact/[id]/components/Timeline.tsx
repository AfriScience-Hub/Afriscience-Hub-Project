'use client';

import { cn } from '@/lib/utils';

interface TimelineItem {
  phase: 'Before' | 'During' | 'After';
  date: string;
  description: string;
  image?: string;
}

interface TimelineProps {
  timeline: TimelineItem[];
}

export default function Timeline({ timeline }: TimelineProps) {
  return (
    <div className="p-8">
      <h2 className="text-xl font-bold text-neutral-black mb-6">Timeline</h2>

      <div className="space-y-6">
        {timeline.map((item, idx) => (
          <div key={idx} className="flex gap-6">
            <div className="flex flex-col items-center flex-shrink-0">
              <div className={cn(
                "h-12 w-12 rounded-full flex items-center justify-center font-bold text-white",
                item.phase === 'Before' ? 'bg-red-600' :
                item.phase === 'During' ? 'bg-blue-600' :
                'bg-green-600'
              )}>
                {idx + 1}
              </div>
              {idx < timeline.length - 1 && (
                <div className="w-0.5 h-full bg-neutral-gray-light mt-2" />
              )}
            </div>

            <div className="flex-1 pb-8">
              <div className="flex items-center gap-3 mb-2">
                <span className={cn(
                  "inline-flex px-3 py-1 rounded-full text-xs font-bold",
                  item.phase === 'Before' ? 'bg-red-100 text-red-700' :
                  item.phase === 'During' ? 'bg-blue-100 text-blue-700' :
                  'bg-green-100 text-green-700'
                )}>
                  {item.phase}
                </span>
                <span className="text-sm text-neutral-gray-medium">{item.date}</span>
              </div>
              <p className="text-sm text-neutral-gray-dark leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
