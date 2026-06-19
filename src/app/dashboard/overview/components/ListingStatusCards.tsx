'use client';

import { cn } from '@/lib/utils';

interface ListingStatusCardsProps {
  cards: { label: string; value: number; color: string }[];
}

export function ListingStatusCards({ cards }: ListingStatusCardsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {cards.map(card => (
        <div key={card.label} className={cn("rounded-xl border p-5 shadow-sm text-center", card.color)}>
          <p className="text-3xl font-bold">{card.value}</p>
          <p className="text-sm font-medium mt-1">{card.label}</p>
        </div>
      ))}
    </div>
  );
}
