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

let isRefreshing = false;
let failedQueue: Array<{ resolve: (v: string) => void; reject: (e: any) => void }> = [];

function onRefreshed(token: string | null) {
  failedQueue.forEach((p) => (token ? p.resolve(token) : p.reject(new Error('Refresh failed'))));
  failedQueue = [];
}

export async function refreshAccessToken(): Promise<string | null> {
  if (typeof window === 'undefined') return null;
  const refreshRes = await fetch(`${BASE_URL}/auth/refresh`, {
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
    setAccessToken(newAccess);
    onRefreshed(newAccess);
  } else {
    onRefreshed(null);
  }
  return newAccess;
}

function getAccessToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('afrisciencehub_token');
}

function setAccessToken(access: string | null) {
  if (typeof window === 'undefined') return;
  if (access) localStorage.setItem('afrisciencehub_token', access);
}

function clearAuthStorage() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('afrisciencehub_token');
  // NOTE: refresh token lives in an HttpOnly cookie — never readable/writable here.
  // It is sent automatically via `credentials: 'include'` and cleared server-side on logout.
  localStorage.removeItem('afrisciencehub_refresh'); // legacy cleanup
  localStorage.removeItem('afrisciencehub_user');
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
  const token = getAccessToken();

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
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
    const isAdminRequest = endpoint.startsWith('/admin');
    const refreshEndpoint = isAdminRequest ? '/admin/auth/refresh' : '/auth/refresh';

    if (isExpired && !_retry && endpoint !== refreshEndpoint) {
      if (isRefreshing) {
        return new Promise<ApiResponse<T>>((resolve, reject) => {
          failedQueue.push({
            resolve: (newToken) =>
              resolve(request<T>(endpoint, { ...options, _retry: true, headers: { ...options.headers, Authorization: `Bearer ${newToken}` } } as any)),
            reject,
          });
        });
      }

      isRefreshing = true;
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
          setAccessToken(newAccess);
          isRefreshing = false;
          onRefreshed(newAccess);
          return request<T>(endpoint, { ...options, _retry: true, headers: { ...options.headers, Authorization: `Bearer ${newAccess}` } } as any);
        }
        throw new Error(refreshData.message || 'Refresh failed');
      } catch (e) {
        isRefreshing = false;
        onRefreshed(null);
        if (typeof window !== 'undefined') {
          clearAuthStorage();
          const loginPath = isAdminRequest ? '/admin/login' : '/login';
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
    const token = getAccessToken();
    const headers: HeadersInit = {};
    if (token) headers['Authorization'] = `Bearer ${token}`;
    return request<T>(endpoint, {
      method: 'POST',
      headers,
      body: formData,
    });
  },

  putFormData<T>(endpoint: string, formData: FormData) {
    const token = getAccessToken();
    const headers: HeadersInit = {};
    if (token) headers['Authorization'] = `Bearer ${token}`;
    return request<T>(endpoint, {
      method: 'PUT',
      headers,
      body: formData,
    });
  },

  patchFormData<T>(endpoint: string, formData: FormData) {
    const token = getAccessToken();
    const headers: HeadersInit = {};
    if (token) headers['Authorization'] = `Bearer ${token}`;
    return request<T>(endpoint, {
      method: 'PATCH',
      headers,
      body: formData,
    });
  },
};
