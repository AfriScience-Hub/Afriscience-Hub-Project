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
    const item = recordOf(l);
    const status = statusText(item.status);
    return {
      id: String(item.id),
      name: item.innovationName || item.name || 'Untitled',
      category: 'Afro-Innovation',
      categoryId: 'innovation' as const,
      status,
      image: normalizeFileSrc(item.image) || '',
      views: item.views || 0,
      likes: item.likes || 0,
      reviews: item.reviews || 0,
      submittedAt: item.createdAt || item.submittedAt || null,
      approvedAt:
        statusKind(status) === 'approved'
          ? item.approvedAt || item.approvalDate || item.reviewedAt || item.updatedAt || item.createdAt || null
          : null,
      payingUser: item.payingUser === true,
      isVerified: item.isVerified === true,
    };
  });

  const scientists = (Array.isArray(scientistRaw) ? scientistRaw : []).map((l: any) => {
    const item = recordOf(l);
    const status = statusText(item.status);
    return {
      id: String(item.id),
      name: item.name || item.fullName || 'Untitled',
      category: 'Scientists & Technologists',
      categoryId: 'scientist' as const,
      status,
      image: normalizeFileSrc(item.profileImage || item.image) || '',
      views: item.views || 0,
      likes: item.likes || 0,
      reviews: item.reviews || 0,
      submittedAt: item.createdAt || item.submittedAt || null,
      approvedAt:
        statusKind(status) === 'approved'
          ? item.approvedAt || item.approvalDate || item.reviewedAt || item.updatedAt || item.createdAt || null
          : null,
      payingUser: item.payingUser === true,
      isVerified: item.isVerified === true,
    };
  });

  return [...innovations, ...scientists];
}

/**
 * Some list endpoints wrap each row (`{ innovation: {...} }`) or return the
 * status as an object (`{ name: 'APPROVED' }`). Normalise both so every row
 * reaches the table with a usable record and status string.
 */
function recordOf(value: any): any {
  if (!value || typeof value !== 'object') return {};
  return value.innovation ?? value.listing ?? value.scientist ?? value.record ?? value;
}

function statusText(value: unknown): string {
  if (typeof value === 'string') return value;
  if (value && typeof value === 'object') {
    const record = value as Record<string, unknown>;
    const nested = record.name ?? record.status ?? record.value ?? record.label;
    if (typeof nested === 'string') return nested;
  }
  return '';
}

/** Listings the platform has approved - these are the ones shown publicly. */
export function approvedListings(listings: UserInnovation[]): UserInnovation[] {
  return listings.filter((l) => statusKind(l.status) === 'approved');
}

/** Submissions still under review or rejected - shown on the submissions page. */
export function unapprovedListings(listings: UserInnovation[]): UserInnovation[] {
  return listings.filter((l) => statusKind(l.status) !== 'approved' && !isDraftStatus(l.status));
}
