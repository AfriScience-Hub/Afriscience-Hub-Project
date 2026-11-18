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
 * Statuses that mean the record is live. `UPDATED` / `PENDING_UPDATE` are
 * approved listings whose latest edits are being reviewed - they still belong
 * on My Listings, otherwise an edited listing disappears until re-approval.
 */
const APPROVED_STATUSES = new Set([
  'approved',
  'verified',
  'published',
  'online',
  'active',
  'updated',
  'pending_update',
  'update_pending',
]);

/**
 * Classifies a listing status. Anything that is not explicitly approved or
 * rejected (including unknown values) counts as still under review.
 */
export function statusKind(status?: string | null): ListingStatusKind {
  const s = normalize(status);
  if (APPROVED_STATUSES.has(s)) return 'approved';
  if (s === 'rejected' || s === 'declined' || s === 'disapproved') return 'rejected';
  return 'pending';
}

/** True for saved drafts, which belong in the drafts view, not submissions. */
export function isDraftStatus(status?: string | null): boolean {
  return normalize(status) === 'draft';
}

/** Edit + Preview for pending and approved listings; rejected listings are preview-only. */
export function isEditable(status?: string | null): boolean {
  const kind = statusKind(status);
  return kind === 'pending' || kind === 'approved';
}

/** Human label for any status value the API may return. */
export function statusLabel(status?: string | null): string {
  const kind = statusKind(status);
  const s = normalize(status);
  if (s) {
    if (s === 'updated' || s === 'pending_update' || s === 'update_pending') return 'Updated';
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
