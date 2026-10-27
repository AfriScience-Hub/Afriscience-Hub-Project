/**
 * Shared status helpers for the user's innovation listings.
 *
 * The API returns enum-ish status strings (PENDING_REVIEW, PENDING,
 * APPROVED, REJECTED) and older records used values like
 * "Pending_Verification" / "Verified" — matching here is done on a
 * normalized form so every casing/separator variant is covered.
 */

export type ListingStatusKind = 'pending' | 'approved' | 'rejected';

const normalize = (status?: string | null): string =>
  (status ?? '').trim().toLowerCase().replace(/[\s-]+/g, '_');

/**
 * Classifies a listing status. Anything that is not explicitly approved or
 * rejected (including unknown values) counts as still under review.
 */
export function statusKind(status?: string | null): ListingStatusKind {
  const s = normalize(status);
  if (s === 'approved' || s === 'verified') return 'approved';
  if (s === 'rejected' || s === 'declined' || s === 'disapproved') return 'rejected';
  return 'pending';
}

/** True for saved drafts, which belong in the drafts view, not submissions. */
export function isDraftStatus(status?: string | null): boolean {
  return normalize(status) === 'draft';
}

/** Edit + Preview while under review; approved/rejected listings are preview-only. */
export function isEditable(status?: string | null): boolean {
  return statusKind(status) === 'pending';
}

/** Human label for any status value the API may return. */
export function statusLabel(status?: string | null): string {
  const kind = statusKind(status);
  const s = normalize(status);
  if (s) {
    if (kind === 'approved') return 'Approved';
    if (kind === 'rejected') return 'Rejected';
    if (s.startsWith('pending')) return 'Pending Review';
  }
  const raw = (status ?? '').trim();
  return raw
    .replace(/[_-]+/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase()) || 'Pending Review';
}

/** Chip classes for each status kind. */
export const STATUS_CHIP: Record<ListingStatusKind, string> = {
  pending: 'bg-amber-100 text-amber-700',
  approved: 'bg-green-100 text-green-700',
  rejected: 'bg-red-100 text-red-700',
};
