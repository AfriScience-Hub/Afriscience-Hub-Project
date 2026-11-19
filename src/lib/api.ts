import { isAdminPath, isProtectedPath } from './authRoutes';
import {
  clearStoredAuth,
  getStoredRefreshToken,
  getStoredToken,
  setStoredRefreshToken,
  setStoredToken,
} from './authStorage';

// Same-origin proxy configured in next.config.ts. Using a relative URL keeps
// the HttpOnly refresh cookie first-party so browsers do not block it.
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api/proxy';

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

interface RefreshOutcome {
  token: string | null;
  /**
   * True only when the server explicitly rejected the refresh session
   * (401/403). Network errors and 5xx responses are inconclusive, so the local
   * session must be kept for a later retry.
   */
  rejected: boolean;
}

let refreshPromises: Record<AuthScope, Promise<RefreshOutcome> | null> = {
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
  const scope: AuthScope = isAdminContext(endpoint) ? 'admin' : 'user';
  return getStoredToken(scope);
}

function setAccessToken(access: string | null, scope: AuthScope) {
  if (typeof window === 'undefined') return;
  setStoredToken(scope, access);
}

function clearAuthStorage(scope: AuthScope) {
  if (typeof window === 'undefined') return;
  // Only the affected scope. A dead user session must never wipe an admin
  // session (or vice versa) — both are stored independently.
  clearStoredAuth(scope);
  window.dispatchEvent(
    new CustomEvent('auth:session-expired', { detail: { scope } }),
  );
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

function extractToken(payload: any): string | null {
  const token =
    payload?.accessToken ||
    payload?.token ||
    payload?.data?.accessToken ||
    payload?.data?.token ||
    null;
  return typeof token === 'string' && token ? token : null;
}

async function performRefresh(scope: AuthScope): Promise<RefreshOutcome> {
  if (typeof window === 'undefined') return { token: null, rejected: false };
  const endpoint = scope === 'admin' ? '/admin/auth/refresh' : '/auth/refresh';
  const refreshToken = getStoredRefreshToken(scope);

  try {
    // The HttpOnly refresh cookie is sent automatically via `credentials:
    // include`. If the backend also returned a refresh token in the login body,
    // send it as a fallback for deployments that do not use the cookie.
    const refreshRes = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: refreshToken ? JSON.stringify({ refreshToken }) : undefined,
      credentials: 'include',
    });
    const refreshData = await refreshRes.json().catch(() => ({}));
    const newAccess = extractToken(refreshData);
    const newRefresh =
      (refreshData as any)?.refreshToken ||
      (refreshData as any)?.data?.refreshToken ||
      null;

    if (refreshRes.ok && newAccess) {
      setAccessToken(newAccess, scope);
      if (typeof newRefresh === 'string' && newRefresh) {
        setStoredRefreshToken(scope, newRefresh);
      }
      return { token: newAccess, rejected: false };
    }

    // An explicit 401/403 means the refresh session itself is gone (expired,
    // revoked, or never established). Anything else is transient.
    const rejected = refreshRes.status === 401 || refreshRes.status === 403;
    return { token: null, rejected };
  } catch {
    // Network failure: keep the stored session so a later request can retry.
    return { token: null, rejected: false };
  }
}

/** Refreshes an access token, sharing one in-flight refresh per scope. */
function refreshTokens(scope: AuthScope): Promise<RefreshOutcome> {
  if (!refreshPromises[scope]) {
    refreshPromises[scope] = performRefresh(scope).finally(() => {
      refreshPromises[scope] = null;
    });
  }
  return refreshPromises[scope]!;
}

export async function refreshAccessToken(isAdmin = false): Promise<string | null> {
  const result = await refreshTokens(isAdmin ? 'admin' : 'user');
  return result.token;
}

/** Like refreshAccessToken, but tells the caller whether the server rejected the session. */
export function refreshSession(isAdmin = false): Promise<RefreshOutcome> {
  return refreshTokens(isAdmin ? 'admin' : 'user');
}

/** Login/signup/verification calls never carry a session to refresh. */
function isCredentialEndpoint(endpoint: string): boolean {
  return /\/auth\/(login|signup|register|verify|forgot-password|reset-password|google)/.test(
    endpoint,
  );
}

/**
 * Whether the current request expects a signed-in session. `auth: 'required'`
 * always does; optional requests only do on a page the app guards.
 */
function requiresSession(
  auth: AuthMode,
  endpoint: string,
  options: ApiRequestOptions,
): boolean {
  if (isCredentialEndpoint(endpoint)) return false;
  if (auth === 'required') return true;
  if (options.suppressAuthRedirect || typeof window === 'undefined') return false;
  return scopeFor(endpoint) === 'admin'
    ? isAdminPath(window.location.pathname)
    : isProtectedPath(window.location.pathname);
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
  clearAuthStorage(scope);
  redirectToLogin(scope, options);
}

function requestError(data: ApiResponse<unknown>, status: number): Error {
  const details = (data as any)?.errors || (data as any)?.error;
  const error = new Error(
    Array.isArray(details)
      ? details.join('\n')
      : data.message || data.error || `Request failed (${status})`,
  ) as Error & { status?: number; details?: unknown; payload?: unknown };
  error.status = status;
  // Keep the machine-readable details (e.g. wallet required/available) so
  // callers can show a useful message before redirecting.
  error.details = (data as any)?.details;
  error.payload = data;
  return error;
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
  const needsSession = requiresSession(auth, endpoint, options);

  let token = auth === 'none' ? null : getAccessToken(endpoint, overrideToken);

  // Never send a JWT we already know is expired. Ask for a fresh one first.
  if (token && isTokenExpired(token) && !_retry) {
    const refresh = await refreshTokens(scope);
    if (refresh.token) {
      token = refresh.token;
    } else {
      token = null;
      if (needsSession && refresh.rejected) {
        // The server explicitly rejected the refresh session. Only now is it
        // safe to treat the session as dead — and only for this scope.
        handleAuthFailure(scope, options);
        throw new Error('Session expired, please sign in again');
      }
      // Transient refresh failure: keep the stored session for a later retry.
      // Continue without a bearer token so public/optional requests still work.
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
      !isCredentialEndpoint(endpoint) &&
      (res.status === 401 ||
        ((res.status === 400 || res.status === 403) &&
          (msg.includes('expired') ||
            msg.includes('token') ||
            msg.includes('unauthorized'))));

    if (auth !== 'none' && isTokenError) {
      if (!_retry) {
        // Covers both "expired/invalid token" and "no token provided". The
        // latter happens when local storage lost the access token but the
        // refresh session is still valid, so never give up before trying.
        const refresh = await refreshTokens(scope);
        if (refresh.token) {
          return request<T>(endpoint, { ...options, _retry: true, token: refresh.token });
        }

        if (needsSession) {
          if (refresh.rejected) {
            handleAuthFailure(scope, options);
            throw new Error('Session expired, please sign in again');
          }
          // Transient failure: keep the session and surface the original error.
        } else if (token && !_anonymousRetry) {
          // Public page with a rejected token: render as a guest instead of
          // logging the visitor out or redirecting to the login page.
          return request<T>(endpoint, {
            ...options,
            _retry: true,
            _anonymousRetry: true,
            auth: 'none',
          });
        }
      } else if (token && !_anonymousRetry) {
        // A freshly-refreshed token was rejected. This is a real dead session;
        // optional requests on public pages still get one anonymous retry.
        if (needsSession) {
          handleAuthFailure(scope, options);
          throw new Error('Session expired, please sign in again');
        }
        return request<T>(endpoint, {
          ...options,
          _anonymousRetry: true,
          auth: 'none',
        });
      }
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
