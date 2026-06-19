'use client';

import { useRouter } from 'next/navigation';
import { MOCK_LISTINGS } from '../data';
import { ListingHeader } from './components/ListingHeader';
import { ListingCard } from './components/ListingCard';

export default function MyListings() {
  const router = useRouter();

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-neutral-gray-light bg-white p-6 shadow-sm">
        <ListingHeader count={MOCK_LISTINGS.length} onNewListing={() => router.push('/dashboard/upload-new-listing')} />
        <div className="grid gap-4 sm:grid-cols-2">
          {MOCK_LISTINGS.map(listing => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </div>
    </div>
  );
}
