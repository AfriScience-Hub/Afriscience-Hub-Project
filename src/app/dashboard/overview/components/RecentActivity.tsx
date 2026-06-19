'use client';

import { Clock, ChevronRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface RecentActivityProps {
  activities: { id: number; icon: LucideIcon; text: string; time: string }[];
}

export function RecentActivity({ activities }: RecentActivityProps) {
  return (
    <div className="rounded-xl border border-neutral-gray-light bg-white shadow-sm">
      <div className="flex items-center justify-between p-5 border-b border-neutral-gray-light">
        <h2 className="font-bold text-neutral-black flex items-center gap-2">
          <Clock className="h-5 w-5 text-brand-red-600" /> Recent Activity
        </h2>
        <button className="text-xs text-brand-red-600 hover:underline font-medium">View All</button>
      </div>
      <div className="divide-y divide-neutral-gray-light">
        {activities.map(activity => (
          <div key={activity.id} className="flex items-center gap-4 px-5 py-3.5 hover:bg-neutral-bg-light transition-colors">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-bg-light flex-shrink-0">
              <activity.icon className="h-4 w-4 text-brand-navy-900" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-neutral-gray-dark truncate">{activity.text}</p>
              <p className="text-xs text-neutral-gray-medium mt-0.5">{activity.time}</p>
            </div>
            <ChevronRight className="h-4 w-4 text-neutral-gray-light flex-shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
}
