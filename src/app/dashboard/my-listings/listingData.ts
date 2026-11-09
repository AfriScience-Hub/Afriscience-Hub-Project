import { normalizeFileSrc } from '@/lib/files';
import { fetchInnovations } from '../upload-new-listing/components/afro-innovation-listing/innovationApi';
import { fetchScientistListings } from '../upload-new-listing/components/scientist-listing/scientistApi';
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
  /** true = Pro Plan, false = Free Plan. */
  payingUser: boolean;
  /** True when the platform has verified the innovation. */
  isVerified: boolean;
}

/**
 * Fetches the user's Afro-Innovation and Scientist/Technologist listings and
 * maps them to the shape the listing/submission tables expect.
 */
export async function fetchUserInnovations(): Promise<UserInnovation[]> {
  const [innovationRaw, scientistRaw] = await Promise.all([
    fetchInnovations().catch(() => []),
    fetchScientistListings().catch(() => []),
  ]);

  const innovations = (Array.isArray(innovationRaw) ? innovationRaw : []).map((l: any) => {
    const status = l.status || 'PENDING';
    return {
      id: String(l.id),
      name: l.innovationName || l.name || 'Untitled',
      category: 'Afro-Innovation',
      categoryId: 'innovation' as const,
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
      isVerified: l.isVerified === true,
    };
  });

  const scientists = (Array.isArray(scientistRaw) ? scientistRaw : []).map((l: any) => {
    const status = l.status || 'PENDING';
    return {
      id: String(l.id),
      name: l.name || l.fullName || 'Untitled',
      category: 'Scientists & Technologists',
      categoryId: 'scientist' as const,
      status,
      image: normalizeFileSrc(l.profileImage || l.image) || '',
      views: l.views || 0,
      likes: l.likes || 0,
      reviews: l.reviews || 0,
      submittedAt: l.createdAt || l.submittedAt || null,
      approvedAt:
        statusKind(status) === 'approved'
          ? l.approvedAt || l.approvalDate || l.reviewedAt || l.updatedAt || l.createdAt || null
          : null,
      payingUser: l.payingUser === true,
      isVerified: l.isVerified === true,
    };
  });

  return [...innovations, ...scientists];
}

/** Listings the platform has approved - these are the ones shown publicly. */
export function approvedListings(listings: UserInnovation[]): UserInnovation[] {
  return listings.filter((l) => statusKind(l.status) === 'approved');
}

/** Submissions still under review or rejected - shown on the submissions page. */
export function unapprovedListings(listings: UserInnovation[]): UserInnovation[] {
  return listings.filter((l) => statusKind(l.status) !== 'approved' && !isDraftStatus(l.status));
}
