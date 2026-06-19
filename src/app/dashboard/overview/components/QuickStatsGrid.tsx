'use client';

import { cn } from '@/lib/utils';
import { ArrowUpRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface QuickStatsGridProps {
  cards: { label: string; value: string; change: string; icon: LucideIcon; color: string }[];
}

export function QuickStatsGrid({ cards }: QuickStatsGridProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
      {cards.map(card => (
        <div key={card.label} className={cn("rounded-xl border p-4 shadow-sm", card.color)}>
          <div className="flex items-center justify-between mb-2">
            <card.icon className="h-5 w-5" />
            {card.change !== '0' && (
              <span className="flex items-center gap-0.5 text-[10px] font-bold text-green-600">
                <ArrowUpRight className="h-3 w-3" /> {card.change}
              </span>
            )}
          </div>
          <p className="text-xl font-bold text-neutral-black">{card.value}</p>
          <p className="text-[11px] text-neutral-gray-medium mt-0.5">{card.label}</p>
        </div>
      ))}
    </div>
  );
}
