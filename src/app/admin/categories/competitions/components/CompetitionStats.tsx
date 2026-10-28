import React from 'react';
import { Trophy, Calendar, Play, CheckCircle, Users, Star, Zap } from 'lucide-react';
import { STATS } from '../data';

const STAT_ICONS: Record<string, React.ElementType> = {
  trophy: Trophy,
  calendar: Calendar,
  play: Play,
  check: CheckCircle,
  users: Users,
  star: Star,
  boost: Zap,
};

/**
 * The summary stat cards on the Competitions overview page.
 */
export default function CompetitionStats() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-7 gap-3">
      {STATS.map((stat) => {
        const Icon = STAT_ICONS[stat.icon] || Trophy;
        return (
          <div key={stat.label} className="bg-white rounded-lg border border-neutral-gray-light p-3 flex items-start gap-2.5">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${stat.iconBg}`}>
              <Icon className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] text-neutral-gray-medium truncate">{stat.label}</p>
              <p className="text-lg font-bold text-neutral-black leading-tight">{stat.value}</p>
              {stat.change && <p className={`text-[10px] mt-0.5 ${stat.positive ? 'text-green-600' : 'text-red-500'}`}>{stat.change}</p>}
              {stat.sub && <p className="text-[10px] text-neutral-gray-medium mt-0.5">{stat.sub}</p>}
            </div>
          </div>
        );
      })}
    </div>
  );
}
