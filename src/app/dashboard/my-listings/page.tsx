'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { ListingHeader } from './components/ListingHeader';
import { approvedListings, fetchUserInnovations, type UserInnovation } from './listingData';
import { getCategory } from '../submissionCategories';
import ListingTabs, { type ListingTabItem } from '../components/ListingTabs';
import ListingTable, { type ListingTableRow } from '../components/ListingTable';
import {
  INSTITUTE_SUBTYPES,
  INSTITUTE_SUBTYPE_LABEL,
  type InstituteSubType,
} from '../components/InstituteTypeSelectorModal';

type ListingTabId = 'all' | 'innovation' | 'center' | 'institute' | 'scientist';

const LISTING_TABS: { id: ListingTabId; label: string }[] = [
  { id: 'all', label: 'All Listings' },
  { id: 'innovation', label: 'Afro-Innovation' },
  { id: 'center', label: 'Specialist Centers' },
  { id: 'institute', label: 'Institute' },
  { id: 'scientist', label: 'Scientists & Technologists' },
];

const SUB_TABS: ListingTabItem[] = INSTITUTE_SUBTYPES.map((type) => ({
  id: type.id,
  label: type.label,
}));

export default function MyListings() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<ListingTabId>('all');
  const [instituteSubType, setInstituteSubType] = useState<InstituteSubType>('primary-secondary');
  const [listings, setListings] = useState<UserInnovation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetchUserInnovations()
      .then((rows) => {
        if (!cancelled) setListings(rows);
      })
      .catch((e: any) => toast.error(e?.message || 'Failed to load listings'))
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // Only listings the platform has approved are shown here.
  const approved = useMemo(() => approvedListings(listings), [listings]);

  const countFor = (id: ListingTabId) =>
    id === 'all'
      ? approved.length
      : approved.filter((listing) => listing.categoryId === id).length;

  const tabs: ListingTabItem[] = LISTING_TABS.map((tab) => ({
    ...tab,
    count: countFor(tab.id),
  }));

  const visibleListings = useMemo(() => {
    if (activeTab === 'all') return approved;
    return approved.filter((listing) => listing.categoryId === activeTab);
  }, [approved, activeTab]);

  const rows: ListingTableRow[] = useMemo(
    () =>
      visibleListings.map((listing) => ({
        id: listing.id,
        name: listing.name,
        category: listing.category,
        status: listing.status,
        image: listing.image,
        submittedAt: listing.submittedAt,
        approvedAt: listing.approvedAt,
        onPreview: () => router.push(`/dashboard/my-listings/${listing.id}`),
        onEdit: () => router.push(`/dashboard/upload-new-listing?id=${listing.id}`),
      })),
    [visibleListings, router]
  );

  const activeLabel = LISTING_TABS.find((tab) => tab.id === activeTab)?.label ?? 'listings';

  let emptyDescription = 'You have not created any listings yet.';
  if (activeTab === 'institute') {
    emptyDescription = `You have no approved ${INSTITUTE_SUBTYPE_LABEL[
      instituteSubType
    ].toLowerCase()} institute listings yet.`;
  } else if (activeTab !== 'all') {
    const label = getCategory(activeTab)?.label ?? activeLabel;
    emptyDescription = `You have no approved ${label.toLowerCase()} listings yet.`;
  }

  return (
    <div className="space-y-6">
      <div className="overflow-hidden rounded-xl border border-neutral-gray-light bg-white p-6 shadow-sm">
        <ListingHeader
          count={approved.length}
          onNewListing={() => router.push('/dashboard/upload-new-listing')}
        />

        <ListingTabs
          tabs={tabs}
          active={activeTab}
          onChange={(id) => setActiveTab(id as ListingTabId)}
          ariaLabel="Listing categories"
        />

        {activeTab === 'institute' && (
          <div className="border-b border-neutral-gray-light bg-neutral-bg-light/30 px-4 py-3">
            <ListingTabs
              tabs={SUB_TABS}
              active={instituteSubType}
              onChange={(id) => setInstituteSubType(id as InstituteSubType)}
              variant="pill"
              ariaLabel="Institute types"
            />
          </div>
        )}

        <ListingTable
          rows={rows}
          loading={loading}
          showApprovedDate
          emptyTitle="No listings yet"
          emptyDescription={emptyDescription}
        />
      </div>
    </div>
  );
}
