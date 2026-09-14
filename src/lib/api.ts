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

function getAccessToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('afrisciencehub_token');
}

function getRefreshToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('afrisciencehub_refresh');
}

function setTokens(access: string | null, refresh: string | null) {
  if (typeof window === 'undefined') return;
  if (access) localStorage.setItem('afrisciencehub_token', access);
  if (refresh) localStorage.setItem('afrisciencehub_refresh', refresh);
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
    credentials: 'omit',
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

    if (isExpired && !_retry && endpoint !== '/auth/refresh') {
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
      const refresh = getRefreshToken();
      try {
        const refreshRes = await fetch(`${BASE_URL}/auth/refresh`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        });
        const refreshData = await refreshRes.json().catch(() => ({}));
        const newAccess = refreshData?.accessToken || refreshData?.token || null;
        const newRefresh = refreshData?.refreshToken || null;

        if (refreshRes.ok && newAccess) {
          setTokens(newAccess, newRefresh);
          isRefreshing = false;
          onRefreshed(newAccess);
          return request<T>(endpoint, { ...options, _retry: true, headers: { ...options.headers, Authorization: `Bearer ${newAccess}` } } as any);
        }
        throw new Error(refreshData.message || 'Refresh failed');
      } catch (e) {
        isRefreshing = false;
        onRefreshed(null);
        if (typeof window !== 'undefined') {
          localStorage.removeItem('afrisciencehub_token');
          localStorage.removeItem('afrisciencehub_refresh');
          localStorage.removeItem('afrisciencehub_user');
          window.location.href = '/login?reason=session_expired';
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
