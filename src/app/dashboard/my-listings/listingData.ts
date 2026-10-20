import { normalizeFileSrc } from '@/lib/files';
import { fetchInnovations } from '../upload-new-listing/innovationApi';
import { statusKind } from './statusUtils';

export interface UserInnovation {
  id: string;
  name: string;
  category: string;
  status: string;
  image: string;
  views: number;
  likes: number;
  reviews: number;
}

/**
 * Fetches the user's afro-innovation listings and maps them to the shape the
 * listing/submission cards expect.
 */
export async function fetchUserInnovations(): Promise<UserInnovation[]> {
  const raw = await fetchInnovations();
  const list = Array.isArray(raw) ? raw : [];
  return list.map((l: any) => ({
    id: String(l.id),
    name: l.innovationName || l.name || 'Untitled',
    category: 'Afro-Innovation',
    status: l.status || 'PENDING',
    image: normalizeFileSrc(l.image) || '',
    views: l.views || 0,
    likes: l.likes || 0,
    reviews: l.reviews || 0,
  }));
}

/** Listings the platform has approved - these are the ones shown publicly. */
export function approvedListings(listings: UserInnovation[]): UserInnovation[] {
  return listings.filter((l) => statusKind(l.status) === 'approved');
}

/** Submissions still under review or rejected - shown on the submissions page. */
export function unapprovedListings(listings: UserInnovation[]): UserInnovation[] {
  return listings.filter((l) => statusKind(l.status) !== 'approved');
}
