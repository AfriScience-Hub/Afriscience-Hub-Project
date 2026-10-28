'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ClipboardList } from 'lucide-react';
import { toast } from 'sonner';
import ListingTabs, { type ListingTabItem } from '../components/ListingTabs';
import ListingTable, { type ListingTableRow } from '../components/ListingTable';
import {
  INSTITUTE_SUBTYPES,
  INSTITUTE_SUBTYPE_LABEL,
  type InstituteSubType,
} from '../components/InstituteTypeSelectorModal';
import { MOCK_SUBMISSIONS, type Submission } from '../data';
import { getCategory } from '../submissionCategories';
import {
  fetchUserInnovations,
  unapprovedListings,
  type UserInnovation,
} from '../my-listings/listingData';

type SubmissionTabId =
  | 'all'
  | 'innovation'
  | 'center'
  | 'institute'
  | 'scientist'
  | 'sponsor'
  | 'competition'
  | 'volunteer';

const SUBMISSION_TABS: { id: SubmissionTabId; label: string }[] = [
  { id: 'all', label: 'All Submissions' },
  { id: 'innovation', label: 'Afro-Innovation' },
  { id: 'center', label: 'Specialist Centers' },
  { id: 'institute', label: 'Institute' },
  { id: 'scientist', label: 'Scientists & Technologists' },
  { id: 'sponsor', label: 'Sponsor' },
  { id: 'competition', label: 'Competition' },
  { id: 'volunteer', label: 'Volunteer' },
];

const SUB_TABS: ListingTabItem[] = INSTITUTE_SUBTYPES.map((type) => ({
  id: type.id,
  label: type.label,
}));

/** Rebuilds the payload the competition submission page expects. */
function storeCompetitionApplication(sub: Submission) {
  sessionStorage.setItem(
    'comp_application',
    JSON.stringify({
      refNo: sub.refNo,
      compId: sub.compId,
      compTitle: sub.compTitle,
      compType: sub.compType,
      category: sub.category,
      country: sub.country,
      deadline: sub.deadline,
      topic: sub.topic || '',
      schoolName: sub.schoolName || '',
      schoolAddress: sub.schoolAddress || '',
      applicationDate: sub.applicationDate,
      mediaType: sub.mediaType,
    })
  );
}

export default function DashboardSubmissions() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<SubmissionTabId>('all');
  const [instituteSubType, setInstituteSubType] = useState<InstituteSubType>('primary-secondary');
  const [listings, setListings] = useState<UserInnovation[]>([]);
  const [loading, setLoading] = useState(true);

  // Keep old category links (e.g. /dashboard/submissions/institute?type=...)
  // working by reading the tab from the query string.
  useEffect(() => {
    const tab = new URLSearchParams(window.location.search).get('tab');
    if (tab && SUBMISSION_TABS.some((item) => item.id === tab)) {
      setActiveTab(tab as SubmissionTabId);
    }
    const type = new URLSearchParams(window.location.search).get('type');
    if (type === 'primary-secondary' || type === 'university') {
      setInstituteSubType(type);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    fetchUserInnovations()
      .then((rows) => {
        if (!cancelled) setListings(rows);
      })
      .catch((e: any) => toast.error(e?.message || 'Failed to load submissions'))
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // Approved listings live on the listings page - only pending/rejected here.
  const pending = useMemo(() => unapprovedListings(listings), [listings]);

  const openCompetition = useCallback(
    (sub: Submission) => {
      storeCompetitionApplication(sub);
      router.push(`/competitions/${sub.compId}/submission`);
    },
    [router]
  );

  const innovationRows: ListingTableRow[] = useMemo(
    () =>
      pending.map((listing) => ({
        id: `innovation-${listing.id}`,
        name: listing.name,
        category: listing.category,
        status: listing.status,
        image: listing.image,
        submittedAt: listing.submittedAt,
        payingUser: listing.payingUser,
        onPreview: () => router.push(`/dashboard/my-listings/${listing.id}`),
        onEdit: () => router.push(`/dashboard/upload-new-listing?id=${listing.id}`),
        onUpgrade: () =>
          router.push(`/dashboard/upload-new-listing?id=${listing.id}&upgrade=pro`),
      })),
    [pending, router]
  );

  const competitionRows: ListingTableRow[] = useMemo(
    () =>
      MOCK_SUBMISSIONS.map((sub) => ({
        id: `competition-${sub.id}`,
        name: sub.compTitle,
        category: sub.compType,
        status: sub.status,
        submittedAt: sub.submissionDate,
        onPreview: () => openCompetition(sub),
        onEdit: () => openCompetition(sub),
      })),
    [openCompetition]
  );

  const allRows = useMemo(
    () => [...innovationRows, ...competitionRows],
    [innovationRows, competitionRows]
  );

  const countFor = (id: SubmissionTabId) => {
    if (id === 'all') return allRows.length;
    if (id === 'innovation') return innovationRows.length;
    if (id === 'competition') return competitionRows.length;
    return 0;
  };

  const tabs: ListingTabItem[] = SUBMISSION_TABS.map((tab) => ({
    ...tab,
    count: countFor(tab.id),
  }));

  const rows = useMemo(() => {
    if (activeTab === 'all') return allRows;
    if (activeTab === 'innovation') return innovationRows;
    if (activeTab === 'competition') return competitionRows;
    return [];
  }, [activeTab, allRows, innovationRows, competitionRows]);

  const activeLabel = SUBMISSION_TABS.find((tab) => tab.id === activeTab)?.label ?? 'submissions';

  let emptyDescription = 'You have not made any submissions yet.';
  if (activeTab === 'institute') {
    emptyDescription = `You have no ${INSTITUTE_SUBTYPE_LABEL[
      instituteSubType
    ].toLowerCase()} institute submissions yet.`;
  } else if (activeTab !== 'all') {
    const label = getCategory(activeTab)?.label ?? activeLabel;
    emptyDescription = `You have no ${label.toLowerCase()} submissions yet.`;
  }

  return (
    <div className="space-y-6">
      <div className="overflow-hidden rounded-xl border border-neutral-gray-light bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center gap-3">
          <ClipboardList className="h-6 w-6 text-brand-red-600" />
          <div>
            <h1 className="text-2xl font-bold text-neutral-black">Submissions</h1>
            <p className="text-sm text-neutral-gray-medium">
              All submissions to AfriScience Hub.
            </p>
          </div>
        </div>

        <ListingTabs
          tabs={tabs}
          active={activeTab}
          onChange={(id) => setActiveTab(id as SubmissionTabId)}
          ariaLabel="Submission categories"
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
          loading={loading && activeTab !== 'competition'}
          emptyTitle="No submissions yet"
          emptyDescription={emptyDescription}
        />
      </div>
    </div>
  );
}
