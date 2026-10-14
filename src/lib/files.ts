const S3_BASE = 'https://afriscience-buckset.s3.eu-north-1.amazonaws.com';

// key -> { url, at } map of what POST /upload returned, so a bare storage key
// (what the profile endpoints persist) can be turned back into a viewable URL.
const URL_CACHE_KEY = 'afrisciencehub_file_urls';
// Signed URLs are issued with X-Amz-Expires=3600 (1h). Stop using them a few
// minutes early so nothing ever renders as an expired/broken image.
const URL_TTL_MS = 55 * 60 * 1000;
const MAX_CACHED_URLS = 40;

type CachedUrl = { url: string; at: number };

function readCache(): Record<string, CachedUrl> {
  if (typeof window === 'undefined') return {};
  try {
    const parsed = JSON.parse(localStorage.getItem(URL_CACHE_KEY) || '{}');
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}

function writeCache(cache: Record<string, CachedUrl>) {
  try {
    const trimmed = Object.fromEntries(
      Object.entries(cache)
        .sort((a, b) => b[1].at - a[1].at)
        .slice(0, MAX_CACHED_URLS)
    );
    localStorage.setItem(URL_CACHE_KEY, JSON.stringify(trimmed));
  } catch {}
}

/**
 * Remembers the signed URL returned by POST /upload for a storage key.
 * Called on every upload -- this is the only place a viewable URL exists,
 * because the key alone 403s (the bucket is private).
 */
export function rememberFileUrl(key?: string | null, url?: string | null): void {
  if (typeof window === 'undefined') return;
  if (!key || !url || !/^https?:\/\//i.test(url)) return;
  const cache = readCache();
  cache[key.replace(/^\/+/, '')] = { url, at: Date.now() };
  writeCache(cache);
}

/** Signed URL captured at upload time for `key`, or undefined if unknown/expired. */
function cachedUrlFor(key: string): string | undefined {
  const hit = readCache()[key.replace(/^\/+/, '')];
  if (!hit?.url) return undefined;
  return Date.now() - hit.at < URL_TTL_MS ? hit.url : undefined;
}

/**
 * True once a presigned URL is past `X-Amz-Date + X-Amz-Expires`.
 * Malformed/unsigned URLs count as "not expired" (we don't guess).
 */
function signedUrlExpired(url: string): boolean {
  const stamp = /X-Amz-Date=(\d{8}T\d{6}Z)/i.exec(url)?.[1];
  if (!stamp) return false;
  const expires = Number(/X-Amz-Expires=(\d+)/i.exec(url)?.[1] ?? 3600);
  const started = Date.parse(
    `${stamp.slice(0, 4)}-${stamp.slice(4, 6)}-${stamp.slice(6, 8)}T` +
      `${stamp.slice(9, 11)}:${stamp.slice(11, 13)}:${stamp.slice(13, 15)}Z`
  );
  if (Number.isNaN(started)) return false;
  return Date.now() > started + expires * 1000;
}

/** Storage key inside one of our bucket URLs, or null for other hosts. */
function bucketKeyOf(url: string): string | null {
  if (!url.startsWith(`${S3_BASE}/`)) return null;
  return url.slice(S3_BASE.length + 1).split(/[?#]/)[0];
}

/**
 * Normalizes a stored file value into something an <img>/<Image> can render.
 *
 * - Full, still-valid URLs (including signed S3 URLs) are used as-is.
 * - Local previews created with URL.createObjectURL (blob:) and data: URIs are used as-is.
 * - Bare object keys ("uploads/photo.jpg") and unsigned bucket links resolve to
 *   the signed URL captured at upload time. They are NEVER turned into a raw
 *   bucket URL -- the bucket is private, so that 403s.
 * - The stock placeholder avatar older builds hard-coded is dropped so the
 *   user's real upload (or the initials fallback) shows instead.
 * - Anything empty/unknown/expired returns undefined so callers show initials.
 */
export function normalizeFileSrc(value?: string | null): string | undefined {
  if (!value) return undefined;
  const v = value.trim();
  if (!v) return undefined;

  // Legacy dummy avatar (hard-coded in older builds) is not a real upload.
  if (/images\.unsplash\.com|default.?avatar/i.test(v)) return undefined;

  // Fix malformed URLs from old bug: "https://uploads/..." -> proper S3 URL
  if (/^https?:\/\/uploads\//i.test(v)) {
    return v.replace(/^https?:\/\/uploads\//i, `${S3_BASE}/uploads/`);
  }

  if (/^(blob:|data:)/i.test(v)) return v;

  if (/^https?:\/\//i.test(v)) {
    const key = bucketKeyOf(v);
    if (/X-Amz-/i.test(v)) {
      // Signed -> use it, but never hand out an expired one (it would just 403).
      // If expired, fall back to the raw key so callers can attempt to load it.
      if (!signedUrlExpired(v)) return v;
      return key ? `${S3_BASE}/${key}` : v;
    }
    // Unsigned bucket link is really just the storage key.
    if (key) return cachedUrlFor(key) ?? `${S3_BASE}/${key}`;
    return v;
  }

  // Bare object key -> the signed URL from the upload response (if we still have it).
  // If no cached URL, return the raw key so callers can attempt to load it.
  return cachedUrlFor(v.replace(/^\/+/, '')) ?? `${S3_BASE}/${v.replace(/^\/+/, '')}`;
}

/** True when the value points at a real remote/preview image (not a bare key). */
export function isRenderableSrc(value?: string | null): boolean {
  return !!value && /^(https?:|blob:|data:)/i.test(value.trim());
}