'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { PackageOpen } from 'lucide-react';
import { ListingHeader } from './components/ListingHeader';
import { ListingCard } from './components/ListingCard';
import CategoryCardGrid from '../components/CategoryCardGrid';
import { approvedListings, fetchUserInnovations, type UserInnovation } from './listingData';
import { getCategory, LISTING_CATEGORIES, type SubmissionCategoryId } from '../submissionCategories';

export default function MyListings() {
  const router = useRouter();
  const [selected, setSelected] = useState<SubmissionCategoryId | null>(null);
  const [listings, setListings] = useState<UserInnovation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetchUserInnovations()
      .then((rows) => { if (!cancelled) setListings(rows); })
      .catch((e: any) => toast.error(e?.message || 'Failed to load listings'))
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  // Only listings the platform has approved are shown here.
  const approved = approvedListings(listings);
  const category = selected ? getCategory(selected) : undefined;
  const isInnovation = selected === 'innovation';

  const handleSelect = useCallback((id: SubmissionCategoryId) => {
    setSelected(id);
  }, []);

  const emptyState = (
    <div className="flex flex-col items-center justify-center py-14 text-center rounded-xl border-2 border-dashed border-neutral-gray-light bg-neutral-bg-light/30">
      <div className="h-16 w-16 rounded-full bg-white flex items-center justify-center mb-4">
        <PackageOpen className="h-8 w-8 text-neutral-gray-light" />
      </div>
      <h3 className="text-lg font-medium text-neutral-black">No listings yet</h3>
      <p className="text-neutral-gray-medium max-w-sm mt-1">
        {category
          ? `You have not created any ${category.label.toLowerCase()} listings yet.`
          : 'You have not created any listings yet.'}
      </p>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-neutral-gray-light bg-white p-6 shadow-sm">
        {selected ? (
          <div className="space-y-4">
            <button
              onClick={() => setSelected(null)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-gray-dark hover:text-brand-red-600 transition-colors cursor-pointer"
            >
              ‹ All categories
            </button>

            {isInnovation ? (
              loading ? (
                <p className="text-sm text-neutral-gray-medium">Loading listings...</p>
              ) : approved.length === 0 ? emptyState : (
                <div className="grid gap-4 sm:grid-cols-2">
                  {approved.map((listing) => (
                    <ListingCard
                      key={listing.id}
                      listing={listing}
                      onEdit={() => router.push(`/dashboard/upload-new-listing?id=${listing.id}`)}
                      onPreview={() => router.push(`/dashboard/my-listings/${listing.id}`)}
                    />
                  ))}
                </div>
              )
            ) : (
              <>
                <p className="text-sm text-neutral-gray-medium">
                  Showing <span className="font-semibold text-neutral-black">{category?.label}</span> listings
                </p>
                {emptyState}
              </>
            )}
          </div>
        ) : (
          <>
            <ListingHeader
              count={approved.length}
              onNewListing={() => router.push('/dashboard/upload-new-listing')}
            />
            <CategoryCardGrid
              onSelect={handleSelect}
              categories={LISTING_CATEGORIES}
              subtitle="Select a category to see the listings you have created under it."
            />
          </>
        )}
      </div>
    </div>
  );
}
