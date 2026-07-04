const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://ash-be-1.onrender.com/api/v1';

interface ApiResponse<T = unknown> {
  data?: T;
  message?: string;
  token?: string;
  user?: T;
  error?: string;
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const url = `${BASE_URL}${endpoint}`;
  const token = localStorage.getItem('afrisciencehub_token');

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const res = await fetch(url, {
    ...options,
    headers,
  });

  const data: ApiResponse<T> = await res.json();

  if (!res.ok) {
    throw new Error(data.message || data.error || 'Something went wrong');
  }

  return data;
}

export const api = {
  post<T>(endpoint: string, body: Record<string, unknown>) {
    return request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
    });
  },

  get<T>(endpoint: string) {
    return request<T>(endpoint, { method: 'GET' });
  },

  put<T>(endpoint: string, body: Record<string, unknown>) {
    return request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(body),
    });
  },

  delete<T>(endpoint: string) {
    return request<T>(endpoint, { method: 'DELETE' });
  },
};
