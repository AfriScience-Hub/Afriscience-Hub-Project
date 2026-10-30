'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { BadgeCheck, Search, X } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { fetchUserInnovations, type UserInnovation } from '../my-listings/listingData';
import { getCategory } from '../submissionCategories';
import ListingTabs, { type ListingTabItem } from '../components/ListingTabs';
import VerificationInfo from './components/VerificationInfo';
import VerificationList from './components/VerificationList';
import { publicListingUrl } from './listingRoutes';

type ListingTabId = 'all' | 'innovation' | 'center' | 'institute' | 'scientist';

const LISTING_TABS: { id: ListingTabId; label: string }[] = [
  { id: 'all', label: 'All Listings' },
  { id: 'innovation', label: 'Afro-Innovation' },
  { id: 'center', label: 'Specialist Centers' },
  { id: 'institute', label: 'Institute' },
  { id: 'scientist', label: 'Scientists & Technologists' },
];

export default function VerificationStatusPage() {
  const router = useRouter();
  const [verified, setVerified] = useState<UserInnovation[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState('');
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState<ListingTabId>('all');

  useEffect(() => {
    let cancelled = false;
    fetchUserInnovations()
      .then((rows) => {
        if (!cancelled) {
          setVerified(rows.filter((listing) => listing.isVerified === true));
        }
      })
      .catch((e: any) => toast.error(e?.message || 'Failed to load verified listings'))
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const searched = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return verified;
    return verified.filter(
      (listing) =>
        listing.name.toLowerCase().includes(q) ||
        listing.category.toLowerCase().includes(q),
    );
  }, [verified, query]);

  const countFor = (id: ListingTabId) =>
    id === 'all'
      ? verified.length
      : verified.filter((listing) => listing.categoryId === id).length;

  const tabs: ListingTabItem[] = LISTING_TABS.map((tab) => ({
    ...tab,
    count: countFor(tab.id),
  }));

  const visibleListings = useMemo(() => {
    if (activeTab === 'all') return searched;
    return searched.filter((listing) => listing.categoryId === activeTab);
  }, [searched, activeTab]);

  const activeLabel = LISTING_TABS.find((tab) => tab.id === activeTab)?.label ?? 'listings';
  const trimmedQuery = query.trim();
  const hasSearch = trimmedQuery.length > 0;

  const handleSearchAction = () => {
    if (hasSearch) {
      setSearchInput('');
      setQuery('');
      return;
    }
    setQuery(searchInput);
  };

  const emptyTitle = trimmedQuery
    ? 'No matching verified listings'
    : activeTab === 'all'
      ? 'No verified listings yet'
      : `No verified ${(getCategory(activeTab)?.label ?? activeLabel).toLowerCase()} listings yet`;
  const emptyDescription = trimmedQuery
    ? `No verified listings match "${trimmedQuery}".`
    : 'Only listings marked as verified will appear here. Pending listings stay out of this table.';

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-neutral-gray-light bg-white p-6 shadow-sm">
        <h2 className="mb-5 text-xl font-bold text-neutral-black">Verification Status</h2>

        <VerificationInfo />

        <div className="mt-5 flex flex-col gap-2 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-red-600" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') setQuery(searchInput);
              }}
              placeholder="Search verified listings..."
              className="w-full rounded-lg border border-brand-red-200 bg-brand-red-50/30 py-2 pl-9 pr-3 text-sm text-neutral-black outline-none placeholder:text-brand-red-400/80 focus:border-brand-red-500 focus:ring-2 focus:ring-brand-red-100"
            />
          </div>
          <button
            type="button"
            onClick={handleSearchAction}
            className={cn(
              'inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg px-5 py-2 text-sm font-semibold transition-colors',
              hasSearch
                ? 'border border-brand-red-600 bg-white text-brand-red-600 hover:bg-brand-red-50'
                : 'bg-brand-red-600 text-white hover:bg-brand-red-700',
            )}
          >
            {hasSearch ? <X className="h-4 w-4" /> : <Search className="h-4 w-4" />}
            {hasSearch ? 'Clear' : 'Search'}
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-neutral-gray-light bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-neutral-black">Verified Listings</h3>
            <p className="mt-0.5 text-sm text-neutral-gray-medium">
              {verified.length} verified listing{verified.length !== 1 ? 's' : ''}
            </p>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-green-100 px-3 py-1.5 text-xs font-bold text-green-700">
            <BadgeCheck className="h-4 w-4" />
            Verified
          </span>
        </div>

        <ListingTabs
          tabs={tabs}
          active={activeTab}
          onChange={(id) => setActiveTab(id as ListingTabId)}
          ariaLabel="Verified listing categories"
        />

        <VerificationList
          listings={visibleListings}
          loading={loading}
          onSelect={(listing) =>
            router.push(publicListingUrl(listing.categoryId, listing.id))
          }
          emptyTitle={emptyTitle}
          emptyDescription={emptyDescription}
        />
      </div>
    </div>
  );
}
