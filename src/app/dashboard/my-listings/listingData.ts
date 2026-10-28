import { normalizeFileSrc } from '@/lib/files';
import { fetchInnovations } from '../upload-new-listing/innovationApi';
import type { SubmissionCategoryId } from '../submissionCategories';
import { statusKind, isDraftStatus } from './statusUtils';

export interface UserInnovation {
  id: string;
  name: string;
  category: string;
  categoryId: SubmissionCategoryId;
  status: string;
  image: string;
  views: number;
  likes: number;
  reviews: number;
  /** ISO date the record was created / submitted. */
  submittedAt: string | null;
  /** ISO date the listing was approved - only set for approved records. */
  approvedAt: string | null;
  /** true = Paid Plan, false = Free Plan. */
  payingUser: boolean;
}

/**
 * Fetches the user's afro-innovation listings and maps them to the shape the
 * listing/submission tables expect.
 */
export async function fetchUserInnovations(): Promise<UserInnovation[]> {
  const raw = await fetchInnovations();
  const list = Array.isArray(raw) ? raw : [];
  return list.map((l: any) => {
    const status = l.status || 'PENDING';
    return {
      id: String(l.id),
      name: l.innovationName || l.name || 'Untitled',
      category: 'Afro-Innovation',
      categoryId: 'innovation',
      status,
      image: normalizeFileSrc(l.image) || '',
      views: l.views || 0,
      likes: l.likes || 0,
      reviews: l.reviews || 0,
      submittedAt: l.createdAt || l.submittedAt || null,
      approvedAt:
        statusKind(status) === 'approved'
          ? l.approvedAt || l.approvalDate || l.reviewedAt || l.updatedAt || l.createdAt || null
          : null,
      payingUser: l.payingUser === true,
    };
  });
}

/** Listings the platform has approved - these are the ones shown publicly. */
export function approvedListings(listings: UserInnovation[]): UserInnovation[] {
  return listings.filter((l) => statusKind(l.status) === 'approved');
}

/** Submissions still under review or rejected - shown on the submissions page. */
export function unapprovedListings(listings: UserInnovation[]): UserInnovation[] {
  return listings.filter((l) => statusKind(l.status) !== 'approved' && !isDraftStatus(l.status));
}
