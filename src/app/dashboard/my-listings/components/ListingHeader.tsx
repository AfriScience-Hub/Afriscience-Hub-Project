'use client';

import { Plus } from 'lucide-react';
import { Button } from '@/app/components/ui/Button';

interface ListingHeaderProps {
  count: number;
  onNewListing: () => void;
}

export function ListingHeader({ count, onNewListing }: ListingHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h2 className="text-xl font-bold text-neutral-black">My Listings</h2>
        <p className="text-sm text-neutral-gray-medium mt-0.5">{count} listings created</p>
      </div>
      <Button size="sm" className="bg-brand-red-600 hover:bg-brand-red-700" onClick={onNewListing}>
        <Plus className="h-4 w-4 mr-1" /> New Listing
      </Button>
    </div>
  );
}
