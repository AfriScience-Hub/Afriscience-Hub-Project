import { api } from '@/lib/api';

export interface AdminUserProfile {
  id: string;
  userId: string;
  firstname: string | null;
  middlename: string | null;
  surname: string | null;
  username: string | null;
  gender: string | null;
  dateOfBirth: string | null;
  bio: string | null;
  phone: string | null;
  alternativePhone: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  lga: string | null;
  country: string | null;
  postalCode: string | null;
  idCardType: string | null;
  idCardTypeOther: string | null;
  idCardNumber: string | null;
  website: string | null;
  employmentStatus: string | null;
}

export interface AdminUser {
  id: string;
  email: string;
  fullName: string;
  phone: string | null;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  /** Set by the API when an account is suspended. Older responses may use one of the other keys. */
  suspensionReason?: string | null;
  suspendReason?: string | null;
  deletedReason?: string | null;
  deletionReason?: string | null;
  reason?: string | null;
  metadata?: { reason?: string | null } | null;
  profile: AdminUserProfile | null;
}

export interface UsersPagination {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
  nextPage: number | null;
  previousPage: number | null;
  nextLink: string | null;
  previousLink: string | null;
}

export interface UsersListResult {
  message: string;
  data: AdminUser[];
  pagination: UsersPagination | null;
}

export interface UserFetchOptions {
  /** Bypass the short-lived cache (manual refresh or after a mutation). */
  force?: boolean;
}

type CacheEntry<T> = {
  value?: T;
  promise?: Promise<T>;
  expiresAt: number;
};

/**
 * User-management screens are mounted more than once by React's development
 * double-effect and by the admin shell hydrating. A short-lived request cache
 * plus in-flight promise sharing keeps each endpoint to one network call while
 * the same data is being viewed.
 */
const requestCache = new Map<string, CacheEntry<unknown>>();
const REQUEST_CACHE_TTL_MS = 10_000;

function cachedRequest<T>(
  key: string,
  request: () => Promise<T>,
  force = false
): Promise<T> {
  const now = Date.now();

  if (!force) {
    const entry = requestCache.get(key) as CacheEntry<T> | undefined;
    if (entry) {
      if (entry.promise) return entry.promise;
      if (entry.value !== undefined && entry.expiresAt > now) {
        return Promise.resolve(entry.value);
      }
    }
  }

  const promise = request()
    .then((value) => {
      requestCache.set(key, {
        value,
        expiresAt: Date.now() + REQUEST_CACHE_TTL_MS,
      });
      return value;
    })
    .catch((error) => {
      requestCache.delete(key);
      throw error;
    });

  requestCache.set(key, {
    promise,
    expiresAt: now + REQUEST_CACHE_TTL_MS,
  });
  return promise;
}

/** Clears cached user lists after a suspend/restore mutation. */
function invalidateUserCache(): void {
  for (const key of requestCache.keys()) {
    if (key.startsWith('users:')) requestCache.delete(key);
  }
}

function normalizeList(body: any): UsersListResult {
  const b = body?.data && !Array.isArray(body.data) && Array.isArray(body.data?.data) ? body.data : body;
  const data = Array.isArray(b?.data) ? b.data : Array.isArray(b) ? b : [];
  const pagination = b?.pagination ?? null;
  return { message: b?.message ?? '', data, pagination };
}

export function userDisplayName(user: AdminUser): string {
  if (user.fullName) return user.fullName;
  const p = user.profile;
  if (p && (p.firstname || p.surname)) return `${p.firstname ?? ''} ${p.surname ?? ''}`.trim() || user.email;
  return user.email;
}

export function userCountry(user: AdminUser): string {
  return user.profile?.country || '\u2014';
}

export function userCityLocation(user: AdminUser): string {
  const p = user.profile;
  if (!p) return '\u2014';
  const parts = [p.city, p.state || p.lga, p.country].filter(Boolean);
  return parts.length ? parts.join(', ') : '\u2014';
}

export function formatISODate(value?: string | null): string {
  if (!value) return '\u2014';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: 'numeric' }).format(d);
}

export function displayUserId(user: AdminUser): string {
  return user.id ? `USR-${user.id.slice(0, 8).toUpperCase()}` : '\u2014';
}

/** Reads the suspension reason regardless of which field the API version returns. */
export function userSuspensionReason(user: AdminUser): string {
  return (
    user.suspensionReason ||
    user.suspendReason ||
    user.reason ||
    user.deletedReason ||
    user.deletionReason ||
    user.metadata?.reason ||
    '\u2014'
  );
}

export const DEFAULT_PAGE_SIZE = 10;

export async function fetchAllUsers(
  params: { page?: number; limit?: number } = {},
  options: UserFetchOptions = {}
): Promise<UsersListResult> {
  const page = params.page || 1;
  const limit = params.limit || DEFAULT_PAGE_SIZE;
  return cachedRequest(`users:list:${page}:${limit}`, async () => {
    const res: any = await api.get(`/admin/users?page=${page}&limit=${limit}`);
    return normalizeList(res);
  }, options.force);
}

export async function fetchSuspendedUsers(options: UserFetchOptions = {}): Promise<UsersListResult> {
  return cachedRequest('users:suspended', async () => {
    const res: any = await api.get('/admin/users/suspended');
    return normalizeList(res);
  }, options.force);
}

export async function fetchAdminUser(id: string): Promise<AdminUser | null> {
  const res: any = await api.get(`/admin/users/details/${id}`);
  const b = res?.data && !Array.isArray(res.data) && res.data?.id ? res.data : res;
  return b?.id ? b as AdminUser : (b?.details?.id ? b?.details as AdminUser : null);
}

export async function suspendUser(id: string, reason: string): Promise<string> {
  const res: any = await api.post(`/admin/users/suspend/${id}`, { reason: reason.trim() });
  invalidateUserCache();
  const b = res?.data && !Array.isArray(res.data) ? res.data : res;
  return b?.message || 'User suspended successfully';
}

export async function restoreUser(id: string): Promise<string> {
  const res: any = await api.post(`/admin/users/restore/${id}`);
  invalidateUserCache();
  const b = res?.data && !Array.isArray(res.data) ? res.data : res;
  return b?.message || 'User restored successfully';
}