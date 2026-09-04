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

async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const url = `${BASE_URL}${endpoint}`;
  const token = typeof window !== 'undefined' ? localStorage.getItem('afrisciencehub_token') : null;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const res = await fetch(url, {
    ...options,
    headers,
    // FIX: was `credentials: 'include'` — this is `fetch` equivalent of axios `withCredentials: true`.
    // It forces browser to send cookies and requires backend to return
    // `Access-Control-Allow-Origin: <specific-origin>` + `Access-Control-Allow-Credentials: true`.
    // Backend currently returns `Access-Control-Allow-Origin: *` which is rejected when credentials is 'include'.
    // Since auth uses Bearer token in Authorization header (localStorage), we don't need cookies.
    // Use 'omit' to avoid CORS preflight failure. If backend later requires httpOnly cookies,
    // keep 'include' BUT backend must fix CORS: origin: ['http://localhost:3000', 'https://yourdomain.com'], credentials: true
    credentials: 'omit',
  });

  let data: ApiResponse<T>;
  try {
    data = await res.json();
  } catch {
    data = {} as ApiResponse<T>;
  }

  if (!res.ok) {
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
};
