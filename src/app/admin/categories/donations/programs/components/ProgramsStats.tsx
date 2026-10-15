'use client';

import React from 'react';
import { Gift, Target, Heart } from 'lucide-react';
import { formatUsd, type SupportProgram } from '../../data';

/**
 * Summary cards: Total Programs, Total Target Amount and Total
 * Received (all programs, hidden included).
 */
export default function ProgramsStats({ programs }: { programs: SupportProgram[] }) {
  const totalTarget = programs.reduce((sum, p) => sum + p.targetAmount, 0);
  const totalReceived = programs.reduce((sum, p) => sum + p.received, 0);
  const cards = [
    { label: 'Total Programs', value: String(programs.length), icon: Gift, iconCls: 'bg-purple-100 text-purple-600' },
    { label: 'Total Target Amount', value: formatUsd(totalTarget), icon: Target, iconCls: 'bg-green-100 text-green-600' },
    { label: 'Total Received (USD)', value: formatUsd(totalReceived), icon: Heart, iconCls: 'bg-red-100 text-red-500' },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
      {cards.map((stat) => {
        const Icon = stat.icon;
        return (
          <div key={stat.label} className="rounded-xl border border-neutral-gray-light bg-white p-4 shadow-sm flex items-center gap-3">
            <span className={`w-10 h-10 rounded-lg grid place-items-center flex-shrink-0 ${stat.iconCls}`}>
              <Icon className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <p className="text-xl font-bold text-neutral-black leading-tight truncate">{stat.value}</p>
              <p className="text-[11px] text-neutral-gray-medium truncate">{stat.label}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
