'use client';

import Image from 'next/image';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Listing } from '../../data';

interface VerificationListProps {
  listings: Listing[];
}

export default function VerificationList({ listings }: VerificationListProps) {
  return (
    <div className="space-y-4">
      {listings.map(listing => (
        <div key={listing.id} className="flex items-center gap-4 p-4 rounded-lg border border-neutral-gray-light">
          <Image src={listing.image} alt={listing.name} width={56} height={56} className="rounded-lg object-cover flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="font-bold text-neutral-black truncate">{listing.name}</p>
            <p className="text-xs text-neutral-gray-medium">{listing.category}</p>
          </div>
          <span className={cn(
            "px-3 py-1.5 rounded-full text-xs font-bold flex-shrink-0",
            listing.status === 'Verified' ? "bg-green-100 text-green-700" :
              listing.status === 'Pending Verification' ? "bg-amber-100 text-amber-700" :
                "bg-red-100 text-red-700"
          )}>
            {listing.status === 'Verified' && <Check className="h-3 w-3 inline mr-1" />}
            {listing.status}
          </span>
        </div>
      ))}
    </div>
  );
}
