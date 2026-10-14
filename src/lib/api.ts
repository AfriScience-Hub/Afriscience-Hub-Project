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

let isRefreshing = { admin: false, user: false };
let failedQueue: { admin: Array<{ resolve: (v: string) => void; reject: (e: any) => void }>, user: Array<{ resolve: (v: string) => void; reject: (e: any) => void }> } = { admin: [], user: [] };

function onRefreshed(token: string | null, scope: 'admin' | 'user') {
  failedQueue[scope].forEach((p) => (token ? p.resolve(token) : p.reject(new Error('Refresh failed'))));
  failedQueue[scope] = [];
}

/** Determines whether we're operating in admin context based on endpoint or current page. */
function isAdminContext(endpoint?: string): boolean {
  if (endpoint?.startsWith('/admin')) return true;
  if (typeof window !== 'undefined' && window.location.pathname.startsWith('/admin')) return true;
  return false;
}

export async function refreshAccessToken(isAdmin = false): Promise<string | null> {
  if (typeof window === 'undefined') return null;
  const scope = isAdmin ? 'admin' : 'user';
  const endpoint = isAdmin ? '/admin/auth/refresh' : '/auth/refresh';
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
    onRefreshed(newAccess, scope);
  } else {
    onRefreshed(null, scope);
  }
  return newAccess;
}

function getAccessToken(endpoint?: string): string | null {
  if (typeof window === 'undefined') return null;
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
}

function decodeJwtExp(token: string): number | null {
  try {
    const payload = token.split('.')[1];
    if (!payload) return null;
    const normalized = payload.replace(/-/g, '+').replace(/_/g, '/');
    const json = JSON.parse(atob(normalized));
    return typeof json.exp === 'number' ? json.exp * 1000 : null;
  } catch {
    return null;
  }
}

/**
 * True when the stored access token is missing or expired (with a small buffer).
 * Opaque (non-JWT) tokens are treated as valid and left to the server to reject.
 */
export function isAccessTokenExpired(bufferMs = 30_000): boolean {
  const token = getAccessToken();
  if (!token) return true;
  const exp = decodeJwtExp(token);
  if (exp === null) return false;
  return Date.now() >= exp - bufferMs;
}

async function request<T>(
  endpoint: string,
  options: RequestInit & { _retry?: boolean } = {}
): Promise<ApiResponse<T>> {
  const url = `${BASE_URL}${endpoint}`;
  const scope: 'admin' | 'user' = isAdminContext(endpoint) ? 'admin' : 'user';
  const token = getAccessToken(endpoint);

  const isFormData = options.body instanceof FormData;
  const headers: HeadersInit = {
    ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const { _retry, ...fetchOpts } = options;

  const res = await fetch(url, {
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
    const isExpired = (res.status === 401 || res.status === 400) && (msg.includes('expired') || msg.includes('token'));
    const isAdminNotVerified = res.status === 403 && msg.includes('not verified');
    const isAdminRequest = scope === 'admin';
    const refreshEndpoint = isAdminRequest ? '/admin/auth/refresh' : '/auth/refresh';

    if ((isExpired || isAdminNotVerified) && !_retry && endpoint !== refreshEndpoint) {
      if (isRefreshing[scope]) {
        return new Promise<ApiResponse<T>>((resolve, reject) => {
          failedQueue[scope].push({
            resolve: (newToken) =>
              resolve(request<T>(endpoint, { ...options, _retry: true, headers: { ...options.headers, Authorization: `Bearer ${newToken}` } } as any)),
            reject,
          });
        });
      }

      isRefreshing[scope] = true;
      try {
        // No body needed: the HttpOnly refresh cookie is sent automatically
        // because of `credentials: 'include'`. Never read it from JS.
        // Admin requests refresh via the admin endpoint so admin sessions
        // are not terminated by the user-session refresh flow (and vice versa).
        const refreshRes = await fetch(`${BASE_URL}${refreshEndpoint}`, {
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
          setAccessToken(newAccess, isAdminRequest);
          isRefreshing[scope] = false;
          onRefreshed(newAccess, scope);
          return request<T>(endpoint, { ...options, _retry: true, headers: { ...options.headers, Authorization: `Bearer ${newAccess}` } } as any);
        }
        throw new Error(refreshData.message || 'Refresh failed');
      } catch (e) {
        isRefreshing[scope] = false;
        onRefreshed(null, scope);
        if (typeof window !== 'undefined') {
          clearAuthStorage();
          // Check both the failed request endpoint AND the current page location
          // to ensure admin users are redirected to admin login even if the
          // expired request was to a non-admin endpoint (e.g., /auth/me).
          const isAdminPage = window.location.pathname.startsWith('/admin');
          const loginPath = (isAdminRequest || isAdminPage) ? '/admin/login' : '/login';
          // Remember where the user was so a successful re-login returns them
          // to the same page instead of the default landing page.
          const from = window.location.pathname + window.location.search;
          const query = `reason=session_expired${from ? `&from=${encodeURIComponent(from)}` : ''}`;
          window.location.href = `${loginPath}?${query}`;
        }
        throw new Error('Session expired, please sign in again');
      }
    }

    const details = (data as any)?.errors || (data as any)?.error;
    if (Array.isArray(details)) throw new Error(details.join('\n'));
    throw new Error(data.message || data.error || `Request failed (${res.status})`);
  }

  return data;
}

export const api = {
  post<T>(endpoint: string, body?: Record<string, unknown>) {
    return request<T>(endpoint, {
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    });
  },

  get<T>(endpoint: string) {
    return request<T>(endpoint, { method: 'GET' });
  },

  put<T>(endpoint: string, body?: Record<string, unknown>) {
    return request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(body),
    });
  },

  delete<T>(endpoint: string) {
    return request<T>(endpoint, { method: 'DELETE' });
  },

  patch<T>(endpoint: string, body?: Record<string, unknown>) {
    return request<T>(endpoint, {
      method: 'PATCH',
      body: body ? JSON.stringify(body) : undefined,
    });
  },

  postFormData<T>(endpoint: string, formData: FormData) {
    const token = getAccessToken(endpoint);
    const headers: HeadersInit = {};
    if (token) headers['Authorization'] = `Bearer ${token}`;
    return request<T>(endpoint, {
      method: 'POST',
      headers,
      body: formData,
    });
  },

  putFormData<T>(endpoint: string, formData: FormData) {
    const token = getAccessToken(endpoint);
    const headers: HeadersInit = {};
    if (token) headers['Authorization'] = `Bearer ${token}`;
    return request<T>(endpoint, {
      method: 'PUT',
      headers,
      body: formData,
    });
  },

  patchFormData<T>(endpoint: string, formData: FormData) {
    const token = getAccessToken(endpoint);
    const headers: HeadersInit = {};
    if (token) headers['Authorization'] = `Bearer ${token}`;
    return request<T>(endpoint, {
      method: 'PATCH',
      headers,
      body: formData,
    });
  },
};
