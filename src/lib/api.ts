import { isAdminPath, isProtectedPath } from './authRoutes';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

interface ApiResponse<T = unknown> {
  data?: T;
  message?: string;
  token?: string;
  accessToken?: string;
  refreshToken?: string;
  user?: T;
  error?: string;
}

export type AuthMode = 'required' | 'optional' | 'none';

export interface ApiRequestOptions extends RequestInit {
  /** How this request should use the signed-in session. Defaults to optional. */
  auth?: AuthMode;
  /** Prevents the global handler from navigating to login. */
  suppressAuthRedirect?: boolean;
  /** Explicit bearer token, useful when local storage has already been cleared. */
  token?: string;
  _retry?: boolean;
  _anonymousRetry?: boolean;
}

type AuthScope = 'admin' | 'user';

let refreshPromises: Record<AuthScope, Promise<string | null> | null> = {
  admin: null,
  user: null,
};

/** Determines whether we're operating in admin context based on endpoint or current page. */
function isAdminContext(endpoint?: string): boolean {
  if (endpoint?.startsWith('/admin')) return true;
  if (typeof window !== 'undefined' && isAdminPath(window.location.pathname)) return true;
  return false;
}

function scopeFor(endpoint?: string): AuthScope {
  return isAdminContext(endpoint) ? 'admin' : 'user';
}

function getAccessToken(endpoint?: string, override?: string): string | null {
  if (typeof window === 'undefined') return null;
  if (override !== undefined) return override || null;
  const admin = isAdminContext(endpoint);
  return localStorage.getItem(admin ? 'afrisciencehub_admin_token' : 'afrisciencehub_token');
}

function setAccessToken(access: string | null, isAdmin = false) {
  if (typeof window === 'undefined') return;
  if (access) localStorage.setItem(isAdmin ? 'afrisciencehub_admin_token' : 'afrisciencehub_token', access);
}

function clearAuthStorage() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('afrisciencehub_token');
  localStorage.removeItem('afrisciencehub_admin_token');
  // NOTE: refresh token lives in an HttpOnly cookie — never readable/writable here.
  // It is sent automatically via `credentials: 'include'` and cleared server-side on logout.
  localStorage.removeItem('afrisciencehub_refresh'); // legacy cleanup
  localStorage.removeItem('afrisciencehub_user');
  localStorage.removeItem('afrisciencehub_admin');
  // Let Redux clear the in-memory session as well. This is important on public
  // pages where we continue as a guest instead of doing a hard redirect.
  window.dispatchEvent(new Event('auth:session-expired'));
}

function decodeJwtExp(token: string): number | null {
  try {
    const payload = token.split('.')[1];
    if (!payload) return null;
    const normalized = payload.replace(/-/g, '+').replace(/_/g, '/');
    const padded = normalized + '='.repeat((4 - (normalized.length % 4)) % 4);
    const json = JSON.parse(atob(padded));
    return typeof json.exp === 'number' ? json.exp * 1000 : null;
  } catch {
    return null;
  }
}

function isTokenExpired(token: string, bufferMs = 30_000): boolean {
  const exp = decodeJwtExp(token);
  if (exp === null) return false;
  return Date.now() >= exp - bufferMs;
}

/**
 * True when the stored access token is missing or expired (with a small buffer).
 * Opaque (non-JWT) tokens are treated as valid and left to the server to reject.
 */
export function isAccessTokenExpired(bufferMs = 30_000): boolean {
  const token = getAccessToken();
  if (!token) return true;
  return isTokenExpired(token, bufferMs);
}

async function performRefresh(scope: AuthScope): Promise<string | null> {
  if (typeof window === 'undefined') return null;
  const isAdmin = scope === 'admin';
  const endpoint = isAdmin ? '/admin/auth/refresh' : '/auth/refresh';

  try {
    // No body needed: the HttpOnly refresh cookie is sent automatically
    // because of `credentials: 'include'`. Never read it from JS.
    const refreshRes = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });
    const refreshData = await refreshRes.json().catch(() => ({}));
    const newAccess =
      refreshData?.accessToken ||
      refreshData?.token ||
      (refreshData as any)?.data?.accessToken ||
      (refreshData as any)?.data?.token ||
      null;

    if (refreshRes.ok && newAccess) {
      setAccessToken(newAccess, isAdmin);
      return newAccess;
    }
  } catch {
    // Network failure or invalid refresh response. Caller decides what to do.
  }

  return null;
}

/** Refreshes an access token, sharing one in-flight refresh per scope. */
function refreshTokens(scope: AuthScope): Promise<string | null> {
  if (!refreshPromises[scope]) {
    refreshPromises[scope] = performRefresh(scope).finally(() => {
      refreshPromises[scope] = null;
    });
  }
  return refreshPromises[scope]!;
}

export async function refreshAccessToken(isAdmin = false): Promise<string | null> {
  return refreshTokens(isAdmin ? 'admin' : 'user');
}

function shouldRedirectToLogin(scope: AuthScope, options: ApiRequestOptions): boolean {
  if (options.suppressAuthRedirect || typeof window === 'undefined') return false;
  if (options.auth === 'required') return true;
  if (scope === 'admin') return isAdminPath(window.location.pathname);
  return isProtectedPath(window.location.pathname);
}

function redirectToLogin(scope: AuthScope, options: ApiRequestOptions) {
  if (!shouldRedirectToLogin(scope, options) || typeof window === 'undefined') return;

  const loginPath = scope === 'admin' ? '/admin/login' : '/login';
  const from = window.location.pathname + window.location.search;
  const query = `reason=session_expired${from ? `&from=${encodeURIComponent(from)}` : ''}`;
  window.location.href = `${loginPath}?${query}`;
}

function handleAuthFailure(scope: AuthScope, options: ApiRequestOptions) {
  clearAuthStorage();
  redirectToLogin(scope, options);
}

function requestError(data: ApiResponse<unknown>, status: number): Error {
  const details = (data as any)?.errors || (data as any)?.error;
  if (Array.isArray(details)) return new Error(details.join('\n'));
  return new Error(data.message || data.error || `Request failed (${status})`);
}

async function request<T>(
  endpoint: string,
  options: ApiRequestOptions = {},
): Promise<ApiResponse<T>> {
  const auth = options.auth ?? 'optional';
  const scope = scopeFor(endpoint);
  const {
    _retry,
    _anonymousRetry,
    auth: _auth,
    suppressAuthRedirect,
    token: overrideToken,
    ...fetchOpts
  } = options;
  const pageProtected =
    typeof window !== 'undefined' && isProtectedPath(window.location.pathname);

  let token = auth === 'none' ? null : getAccessToken(endpoint, overrideToken);

  // Do not send a JWT we already know is expired. Try the refresh cookie first.
  if (token && isTokenExpired(token) && !_retry) {
    token = await refreshTokens(scope);
    if (!token) {
      clearAuthStorage();
      if (auth === 'required' || pageProtected) {
        redirectToLogin(scope, options);
        throw new Error('Session expired, please sign in again');
      }
      // Public optional request: continue anonymously rather than redirecting.
    }
  }

  const headers: HeadersInit = {
    ...(fetchOpts.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...fetchOpts.headers,
  };

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...fetchOpts,
    headers,
    // Must be 'include' so the browser sends/stores the HttpOnly refresh-token
    // cookie (login sets it, /auth/refresh reads it, /auth/logout clears it).
    // document.cookie will NEVER show it — that is expected for HttpOnly cookies.
    credentials: 'include',
  });

  let data: ApiResponse<T>;
  try {
    data = await res.json();
  } catch {
    data = {} as ApiResponse<T>;
  }

  if (!res.ok) {
    const msg = (data.message || data.error || '').toLowerCase();
    const isTokenError =
      (res.status === 401 || res.status === 400) &&
      (msg.includes('expired') || msg.includes('token'));

    if (auth !== 'none' && isTokenError && !_retry) {
      if (token) {
        const newToken = await refreshTokens(scope);
        if (newToken) {
          return request<T>(endpoint, { ...options, _retry: true, token: newToken });
        }

        handleAuthFailure(scope, options);

        // A public/optional request should still render as a guest if its
        // endpoint allows anonymous access. Never hard-redirect the listing.
        if (
          auth !== 'required' &&
          !pageProtected &&
          !_anonymousRetry
        ) {
          return request<T>(endpoint, {
            ...options,
            _retry: true,
            _anonymousRetry: true,
            auth: 'none',
          });
        }
      }
      // No token was sent at all. That is a guest request to a public page —
      // never attempt refresh or redirect from it.
    } else if (isTokenError && _retry && token) {
      // A freshly-refreshed token was rejected. Treat the session as dead.
      handleAuthFailure(scope, options);
    }

    throw requestError(data, res.status);
  }

  return data;
}

export const api = {
  post<T>(endpoint: string, body?: Record<string, unknown>, options?: ApiRequestOptions) {
    return request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    });
  },

  get<T>(endpoint: string, options?: ApiRequestOptions) {
    return request<T>(endpoint, { ...options, method: 'GET' });
  },

  put<T>(endpoint: string, body?: Record<string, unknown>, options?: ApiRequestOptions) {
    return request<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(body),
    });
  },

  delete<T>(endpoint: string, options?: ApiRequestOptions) {
    return request<T>(endpoint, { ...options, method: 'DELETE' });
  },

  patch<T>(endpoint: string, body?: Record<string, unknown>, options?: ApiRequestOptions) {
    return request<T>(endpoint, {
      ...options,
      method: 'PATCH',
      body: body ? JSON.stringify(body) : undefined,
    });
  },

  postFormData<T>(endpoint: string, formData: FormData, options?: ApiRequestOptions) {
    return request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: formData,
    });
  },

  putFormData<T>(endpoint: string, formData: FormData, options?: ApiRequestOptions) {
    return request<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: formData,
    });
  },

  patchFormData<T>(endpoint: string, formData: FormData, options?: ApiRequestOptions) {
    return request<T>(endpoint, {
      ...options,
      method: 'PATCH',
      body: formData,
    });
  },
};
