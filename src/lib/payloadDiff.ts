/**
 * Payload diffing for PATCH requests.
 *
 * Listing edit endpoints should only receive the fields the user actually
 * changed. Comparing the freshly built payload with the payload captured when
 * the record was loaded gives us exactly that set.
 */

type Diffable = Record<string, unknown>;

function isPlainObject(value: unknown): value is Diffable {
  return !!value && typeof value === 'object' && !Array.isArray(value);
}

function sameValue(a: unknown, b: unknown): boolean {
  if (a === b) return true;
  if (a == null || b == null) return false;

  if (Array.isArray(a) && Array.isArray(b)) {
    return JSON.stringify(a) === JSON.stringify(b);
  }

  if (isPlainObject(a) && isPlainObject(b)) {
    const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
    return [...keys].every((key) => sameValue(a[key], b[key]));
  }

  return false;
}

/**
 * Returns only the entries in `current` that differ from `baseline`.
 * Each top-level field is sent whole when it changed (arrays/objects are
 * compared by value), matching how the listing endpoints replace fields.
 * Returns `current` unchanged when there is no baseline (creating a record).
 */
export function diffPayload<T extends object>(
  baseline: T | null | undefined,
  current: T,
): Partial<T> {
  if (!baseline) return current;

  const base = baseline as Diffable;
  const changes: Diffable = {};

  for (const [key, value] of Object.entries(current as Diffable)) {
    if (!sameValue(base[key], value)) changes[key] = value;
  }

  return changes as Partial<T>;
}

/** True when `current` has at least one field that differs from `baseline`. */
export function hasPayloadChanges<T extends object>(
  baseline: T | null | undefined,
  current: T,
): boolean {
  if (!baseline) return true;
  return Object.keys(diffPayload(baseline, current)).length > 0;
}
