'use client';

import React from 'react';
import { Users, CircleDollarSign, Heart } from 'lucide-react';

interface DonationsStatsProps {
  totalDonations: number;
  /** Count of programs currently visible on this page */
  visiblePrograms: number;
}

/** NGN total is a fixed headline figure from the design mockup. */
const TOTAL_AMOUNT_NGN = '₦12,450,000';

/**
 * Three summary cards: Total Donations, Total Amount (NGN) and the
 * number of support programs currently visible on the Donations page.
 */
export default function DonationsStats({ totalDonations, visiblePrograms }: DonationsStatsProps) {
  const cards = [
    { label: 'Total Donations', value: String(totalDonations), icon: Users, iconCls: 'bg-purple-100 text-purple-600' },
    { label: 'Total Amount (NGN)', value: TOTAL_AMOUNT_NGN, icon: CircleDollarSign, iconCls: 'bg-green-100 text-green-600' },
    { label: 'Support Programs', value: String(visiblePrograms), icon: Heart, iconCls: 'bg-red-100 text-red-500' },
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
