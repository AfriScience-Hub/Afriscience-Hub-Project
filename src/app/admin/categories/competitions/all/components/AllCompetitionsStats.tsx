import React from 'react';
import { Trophy, Hourglass, Calendar, Clock, TrendingUp } from 'lucide-react';

interface AllCompetitionsStatsProps {
  total: number;
  ongoing: number;
  upcoming: number;
  past: number;
}

const CARDS = (s: AllCompetitionsStatsProps) => [
  { label: 'Total Competitions', value: s.total, change: '↑ 14.3% this month', icon: Trophy, iconBg: 'bg-purple-100 text-purple-600' },
  { label: 'Ongoing', value: s.ongoing, sub: 'Live now', icon: Hourglass, iconBg: 'bg-orange-100 text-orange-600' },
  { label: 'Upcoming', value: s.upcoming, sub: 'Starts soon', icon: Calendar, iconBg: 'bg-blue-100 text-blue-600' },
  { label: 'Past', value: s.past, sub: 'Completed', icon: Clock, iconBg: 'bg-neutral-100 text-neutral-gray-dark' },
];

/**
 * Four summary cards for the All Competitions page.
 */
export default function AllCompetitionsStats({ total, ongoing, upcoming, past }: AllCompetitionsStatsProps) {
  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
      {CARDS({ total, ongoing, upcoming, past }).map((stat) => {
        const Icon = stat.icon;
        return (
          <div key={stat.label} className="bg-white rounded-xl border border-neutral-gray-light p-4">
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${stat.iconBg}`}>
                <Icon className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <p className="text-xl font-bold text-neutral-black leading-tight">{stat.value}</p>
                <p className="text-[11px] text-neutral-gray-medium truncate">{stat.label}</p>
              </div>
            </div>
            {stat.change && (
              <p className="text-[10px] text-green-600 mt-1.5 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" /> {stat.change.replace('↑ ', '')}
              </p>
            )}
            {stat.sub && <p className="text-[10px] text-neutral-gray-medium mt-1.5">{stat.sub}</p>}
          </div>
        );
      })}
    </div>
  );
}
