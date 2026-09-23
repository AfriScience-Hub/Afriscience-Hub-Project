'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { fetchInnovations } from '../upload-new-listing/innovationApi';
import { ListingHeader } from './components/ListingHeader';
import { ListingCard } from './components/ListingCard';

export default function MyListings() {
  const router = useRouter();
  const [listings, setListings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInnovations()
      .then(setListings)
      .catch((e: any) => toast.error(e?.message || 'Failed to load listings'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-neutral-gray-light bg-white p-6 shadow-sm">
        <ListingHeader count={listings.length} onNewListing={() => router.push('/dashboard/upload-new-listing')} />
        {loading ? (
          <p className="text-sm text-neutral-gray-medium">Loading listings...</p>
        ) : listings.length === 0 ? (
          <p className="text-sm text-neutral-gray-medium">No listings yet.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {listings.map(listing => {
              const id = String(listing.id);
              return (
                <ListingCard
                  key={id}
                  listing={{
                    id,
                    name: listing.innovationName || listing.name || 'Untitled',
                    category: 'Afro-Innovation',
                    status: listing.status || 'Pending Verification',
                    image: listing.image || '',
                    views: listing.views || 0,
                    likes: listing.likes || 0,
                    reviews: listing.reviews || 0,
                  }}
                  onEdit={() => router.push(`/dashboard/upload-new-listing?id=${id}`)}
                  onPreview={() => router.push(`/dashboard/my-listings/${id}`)}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
