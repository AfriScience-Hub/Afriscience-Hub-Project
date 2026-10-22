'use client';

import { useCallback, useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import {
  ClipboardList, Calendar, Clock, CheckCircle, XCircle,
  Video, Image as ImageIcon, ExternalLink, PackageOpen,
} from 'lucide-react';
import { MOCK_SUBMISSIONS, type Submission } from '../../data';
import { cn } from '@/lib/utils';
import { ListingCard } from '../../my-listings/components/ListingCard';
import { unapprovedListings, fetchUserInnovations, type UserInnovation } from '../../my-listings/listingData';
import { getCategory } from '../../submissionCategories';
import InstituteTypeSelectorModal, {
  INSTITUTE_SUBTYPE_LABEL,
  isInstituteSubType,
  type InstituteSubType,
} from '../../components/InstituteTypeSelectorModal';

export default function SubmissionCategoryPage() {
  const router = useRouter();
  const { category: categoryId } = useParams<{ category: string }>();
  const category = getCategory(categoryId || '');

  const [listings, setListings] = useState<UserInnovation[]>([]);
  const [loading, setLoading] = useState(true);
  // Institute is split into two sub-types, chosen in the selector modal.
  const [instituteSubType, setInstituteSubType] = useState<InstituteSubType | null>(null);
  const [showInstituteModal, setShowInstituteModal] = useState(false);

  // The sub-type travels in the query string so a refresh keeps the selection.
  // Arriving without one reopens the selector instead of guessing.
  useEffect(() => {
    const t = new URLSearchParams(window.location.search).get('type');
    if (isInstituteSubType(t)) {
      setInstituteSubType(t);
      setShowInstituteModal(false);
    } else if (categoryId === 'institute') {
      setShowInstituteModal(true);
    }
  }, [categoryId]);

  const handleInstituteTypeSelect = useCallback((type: InstituteSubType) => {
    setInstituteSubType(type);
    router.replace(`/dashboard/submissions/institute?type=${type}`);
  }, [router]);

  useEffect(() => {
    if (categoryId !== 'innovation') { setLoading(false); return; }
    let cancelled = false;
    fetchUserInnovations()
      .then((rows) => { if (!cancelled) setListings(rows); })
      .catch((e: any) => toast.error(e?.message || 'Failed to load submissions'))
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [categoryId]);

  // Approved listings live on the listings page - only pending/rejected here.
  const pending = unapprovedListings(listings);

  const handleSubmissionClick = useCallback((sub: Submission) => {
    sessionStorage.setItem('comp_application', JSON.stringify({
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
    }));
    router.push(`/competitions/${sub.compId}/submission`);
  }, [router]);

  // Institute shows the sub-type picked in the modal; other categories use
  // their own label.
  const effectiveLabel =
    category?.id === 'institute' && instituteSubType
      ? INSTITUTE_SUBTYPE_LABEL[instituteSubType]
      : category?.label;

  const emptyState = (
    <div className="flex flex-col items-center justify-center py-14 text-center rounded-xl border-2 border-dashed border-neutral-gray-light bg-white">
      <div className="h-16 w-16 rounded-full bg-neutral-bg-light flex items-center justify-center mb-4">
        <PackageOpen className="h-8 w-8 text-neutral-gray-light" />
      </div>
      <h3 className="text-lg font-medium text-neutral-black">No submissions yet</h3>
      <p className="text-neutral-gray-medium max-w-sm mt-1">
        You have not made any {effectiveLabel?.toLowerCase() ?? ''} submissions yet.
      </p>
    </div>
  );

  const renderContent = () => {
    if (!category) return emptyState;

    // Competition submissions still use the existing dummy data.
    if (category.id === 'competition') {
      if (MOCK_SUBMISSIONS.length === 0) return emptyState;
      return (
        <div className="space-y-4">
          {MOCK_SUBMISSIONS.map((sub) => {
            const isActive = sub.status === 'active';
            return (
              <div
                key={sub.id}
                className={cn(
                  'p-4 rounded-xl border transition-all',
                  isActive
                    ? 'border-neutral-gray-light bg-white hover:shadow-md hover:border-brand-red-200 cursor-pointer'
                    : 'border-neutral-gray-light/60 bg-neutral-bg-light opacity-75'
                )}
                onClick={() => isActive && handleSubmissionClick(sub)}
              >
                <div className="flex items-center gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-neutral-black">{sub.compTitle}</p>
                      {isActive ? (
                        <span className="flex items-center gap-1 text-[10px] font-bold text-green-700 bg-green-50 px-1.5 py-0.5 rounded border border-green-200">
                          <CheckCircle className="h-2.5 w-2.5" /> Active
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-[10px] font-bold text-red-700 bg-red-50 px-1.5 py-0.5 rounded border border-red-200">
                          <XCircle className="h-2.5 w-2.5" /> Inactive
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-neutral-gray-medium mt-1 flex-wrap">
                      <span className="flex items-center gap-1">
                        {sub.mediaType === 'video' ? <Video className="h-3 w-3" /> : <ImageIcon className="h-3 w-3" />}
                        {sub.mediaType === 'video' ? 'Video' : 'Image'}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(sub.applicationDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        Deadline: {new Date(sub.deadline).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                      <span className="text-[10px] font-mono text-neutral-gray-medium bg-neutral-bg-light px-1.5 py-0.5 rounded">
                        {sub.refNo}
                      </span>
                    </div>
                  </div>
                  {isActive && (
                    <div className="flex items-center gap-1 text-brand-red-600 flex-shrink-0">
                      <ExternalLink className="h-4 w-4" />
                      <span className="text-[11px] font-bold">Edit</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      );
    }

    if (category.id === 'innovation') {
      if (loading) return <p className="text-sm text-neutral-gray-medium">Loading submissions...</p>;
      if (pending.length === 0) return emptyState;
      return (
        <div className="grid gap-4 sm:grid-cols-2">
          {pending.map((listing) => (
            <ListingCard
              key={listing.id}
              listing={listing}
              onEdit={() => router.push(`/dashboard/upload-new-listing?id=${listing.id}`)}
              onPreview={() => router.push(`/dashboard/my-listings/${listing.id}`)}
            />
          ))}
        </div>
      );
    }

    // No endpoint for this category yet.
    return emptyState;
  };

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-neutral-gray-light bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            {category && <category.icon className="h-6 w-6 text-brand-red-600" />}
            <div>
              <h1 className="text-2xl font-bold text-neutral-black">
                {category?.label ?? 'Submissions'}
              </h1>
              <p className="text-sm text-neutral-gray-medium">
                Your {effectiveLabel?.toLowerCase() ?? ''} submissions
              </p>
            </div>
          </div>
          <button
            onClick={() => router.push('/dashboard/submissions')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-gray-dark hover:text-brand-red-600 transition-colors cursor-pointer"
          >
            ‹ All categories
          </button>
        </div>

        {renderContent()}
      </div>

      <InstituteTypeSelectorModal
        isOpen={showInstituteModal}
        onClose={() => setShowInstituteModal(false)}
        onSelectInstituteType={handleInstituteTypeSelect}
        title="Select institute type"
        subtitle="Choose the kind of institute these submissions belong to"
      />
    </div>
  );
}
