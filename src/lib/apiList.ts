/**
 * Helpers for reading list/entity payloads from the API.
 *
 * The backend wraps responses differently per endpoint (`{ data: [...] }`,
 * `{ data: { data: [...] } }`, `{ success, data: { items: [...] } }`, ...).
 * These helpers walk the envelope instead of guessing a single shape.
 */

const LIST_KEYS = [
  'data',
  'listings',
  'innovations',
  'scientists',
  'items',
  'results',
  'content',
  'records',
  'rows',
];

function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === 'object' && !Array.isArray(value);
}

/**
 * Returns the first array found while unwrapping a response envelope.
 * The search only follows nested `data` wrappers, so unrelated objects
 * (pagination, metadata) are never mistaken for the list itself.
 */
export function extractList(payload: unknown, extraKeys: string[] = []): any[] {
  const keys = extraKeys.length ? [...extraKeys, ...LIST_KEYS] : LIST_KEYS;
  let current: unknown = payload;

  for (let depth = 0; depth < 4; depth += 1) {
    if (Array.isArray(current)) return current;
    if (!isRecord(current)) return [];
    const record = current as Record<string, unknown>;

    for (const key of keys) {
      const value = record[key];
      if (Array.isArray(value)) return value;
    }

    const nested = keys.map((key) => record[key]).find(isRecord);
    if (nested) {
      current = nested;
      continue;
    }

    break;
  }

  return Array.isArray(current) ? current : [];
}

/**
 * Unwraps a single-record response. Some list/detail endpoints nest the
 * record under the resource name, so that is unwrapped as well.
 */
export function extractRecord<T = any>(payload: unknown, extraKeys: string[] = []): T {
  const keys = ['innovation', 'listing', 'scientist', 'record', ...extraKeys];
  let current: any = payload;

  for (let depth = 0; depth < 3; depth += 1) {
    if (!isRecord(current)) break;
    if (isRecord(current.data)) {
      current = current.data;
      continue;
    }
    const nested = keys.map((key) => current[key]).find(isRecord);
    if (nested) {
      current = nested;
      continue;
    }
    break;
  }

  return current as T;
}
