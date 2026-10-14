/**
 * Helpers for mapping the innovation API response into display-ready values.
 * The API returns enum strings and arrays of objects; these utilities flatten
 * them into the strings the preview UI renders.
 */

/** Reverse map of API enum values to human-readable labels. */
const ENUM_LABELS: Record<string, string> = {
  // Ownership
  PRIVATE: 'Private',
  GOVERNMENT_PUBLIC: 'Government | Public',
  ACADEMIC: 'Academic',
  MISSION: 'Mission',
  CORPORATE: 'Corporate',
  INTER_GOVERNMENT: 'Inter-Government',
  NGO_CHARITY: 'NGO | Charity',
  OTHER: 'Other',
  // Stage
  IDEATION: 'Ideation',
  RESEARCH_AND_DEVELOPMENT: 'Research & Development',
  PROTOTYPE: 'Prototype',
  MVP: 'MVP',
  SCALE_UP: 'Scale-Up',
  COMMERCIALIZATION: 'Commercialization',
  // Media category
  WORKING_MATERIALS: 'Working Materials',
  WORK_IN_PROGRESS: 'Work-in-Progress',
  FINISHED_WORK: 'Finished Work',
  // Status
  PENDING_REVIEW: 'Pending Review',
  APPROVED: 'Approved',
  REJECTED: 'Rejected',
  PENDING: 'Pending Review',
};

/** Converts an enum value like "GOVERNMENT_PUBLIC" to "Government | Public". */
export function enumLabel(value?: string | null): string {
  if (!value) return '\u2014';
  return ENUM_LABELS[value] ?? value;
}

/**
 * Extracts a display string from an array item.
 * Items may be plain strings or objects like `{ field: 'Hybrid' }`.
 * `preferredKeys` lists the property names to check first (in order).
 */
export function pickValue(item: unknown, preferredKeys: string[]): string {
  if (typeof item === 'string') return item.trim();
  if (!item || typeof item !== 'object') return '';
  const obj = item as Record<string, unknown>;
  for (const key of preferredKeys) {
    const v = obj[key];
    if (typeof v === 'string' && v.trim()) return v.trim();
    if (typeof v === 'number') return String(v);
  }
  // Fallback: first meaningful string/number that isn't an id or timestamp.
  for (const [k, v] of Object.entries(obj)) {
    if (['id', 'createdAt', 'updatedAt', 'userId', 'profileId', 'listingId'].includes(k)) continue;
    if (typeof v === 'string' && v.trim()) return v.trim();
    if (typeof v === 'number') return String(v);
  }
  return '';
}

/** Maps an array of mixed string/object items to `string[]` using `preferredKeys`. */
export function toStringArray(arr: unknown, preferredKeys: string[]): string[] {
  if (!Array.isArray(arr)) return [];
  return arr.map(item => pickValue(item, preferredKeys)).filter(Boolean);
}

/** Splits a newline-separated string (or array) into trimmed, non-empty lines. */
export function splitLines(value: unknown): string[] {
  if (typeof value === 'string') return value.split('\n').map(s => s.trim()).filter(Boolean);
  if (Array.isArray(value)) return value.map(v => String(v).trim()).filter(Boolean);
  return [];
}
