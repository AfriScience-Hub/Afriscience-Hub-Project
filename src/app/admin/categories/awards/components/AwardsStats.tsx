'use client';

import React from 'react';
import { AWARD_STATS } from '../data';

/**
 * Four summary cards: Total Awards, Total Recipients, Upcoming and Announced.
 */
export default function AwardsStats() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {AWARD_STATS.map((stat) => {
        const Icon = stat.icon;
        return (
          <div key={stat.label} className="rounded-xl border border-neutral-gray-light bg-white p-4 shadow-sm flex items-center gap-3">
            <span className={`w-10 h-10 rounded-lg grid place-items-center flex-shrink-0 ${stat.iconCls}`}>
              <Icon className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <p className="text-xl font-bold text-neutral-black leading-tight">{stat.value}</p>
              <p className="text-[11px] text-neutral-gray-medium truncate">{stat.label}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
