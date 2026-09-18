import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { api } from '@/lib/api';

export interface AuthUser {
  name: string;
  email: string;
  phone: string;
  avatar: string;
  role?: string;
}

export interface UserSession {
  id: string;
  userId?: string;
  deviceName?: string | null;
  ipAddress?: string;
  userAgent?: string;
  role?: string;
  lastActive?: string | null;
  expiresAt?: string;
  revokedAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
  current?: boolean;
}

export interface SessionsPagination {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
  nextPage: number | null;
  previousPage: number | null;
}

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  accessToken: string | null;
  refreshToken: string | null;
  sessions: UserSession[];
  sessionsPagination: SessionsPagination | null;
  sessionsLoading: boolean;
  sessionsError: string | null;
}

const DEFAULT_AVATAR = 'https://images.unsplash.com/photo-1670881391783-9c55ba592f93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwcHJvZmVzc2lvbmFsJTIwcG9ydHJhaXQlMjBoZWFkc2hvdHxlbnwxfHx8fDE3NzIzODM4NjZ8MA&ixlib=rb-4.1.0&q=80&w=1080';

// The refresh token is an HttpOnly cookie set/cleared by the backend
// (login sets it, /auth/refresh reads it, /auth/logout clears it).
// It is sent automatically via `credentials: 'include'` and is NEVER
// visible to JS (document.cookie won't show it — that's expected).
// So we only persist the short-lived access/session token here.
function persistTokens(data: any) {
  if (typeof window === 'undefined') return;
  const access = data?.accessToken || data?.token || data?.data?.accessToken;
  if (access) localStorage.setItem('afrisciencehub_token', access);
  localStorage.removeItem('afrisciencehub_refresh'); // legacy cleanup
}

function extractUser(data: any, fallbackIdentifier?: string): AuthUser {
  const u = data?.details || data?.user || data?.data?.user || data?.data || {};
  const isEmail = fallbackIdentifier?.includes('@');
  return {
    name: u.name || u.fullName || u.firstName || (fallbackIdentifier ? (isEmail ? fallbackIdentifier.split('@')[0] : 'User') : 'User'),
    email: u.email || (isEmail ? fallbackIdentifier || '' : ''),
    phone: u.phone || (!isEmail ? fallbackIdentifier || '' : ''),
    avatar: u.avatar || DEFAULT_AVATAR,
    role: u.role,
  };
}

// --- User thunks ---

export const signupUser = createAsyncThunk(
  'auth/signupUser',
  async (payload: { fullName: string; email: string; phone: string; password: string; confirmPassword: string }, { rejectWithValue }) => {
    try {
      const data = await api.post('/auth/signup', payload as any);
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (payload: { identifier: string; password: string }, { rejectWithValue }) => {
    try {
      const isEmail = payload.identifier.includes('@');
      const body: Record<string, string> = { password: payload.password };
      if (isEmail) body.email = payload.identifier;
      else body.phone = payload.identifier;
      const data = await api.post('/auth/login', body);
      persistTokens(data as any);
      return { data, identifier: payload.identifier };
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const verifyUserEmail = createAsyncThunk(
  'auth/verifyUserEmail',
  async (payload: { email: string; otp: string }, { rejectWithValue }) => {
    try {
      const data = await api.post('/auth/verify', payload);
      persistTokens(data as any);
      return { data, email: payload.email };
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

// --- Admin thunks ---

export const signupAdmin = createAsyncThunk(
  'auth/signupAdmin',
  async (payload: { firstName: string; lastName: string; email: string; password: string; confirmPassword: string }, { rejectWithValue }) => {
    try {
      const data = await api.post('/admin/register', payload as any);
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const loginAdmin = createAsyncThunk(
  'auth/loginAdmin',
  async (payload: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const data = await api.post('/admin/auth/login', payload);
      persistTokens(data as any);
      return { data, identifier: payload.email };
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const verifyAdminEmail = createAsyncThunk(
  'auth/verifyAdminEmail',
  async (payload: { email: string; otp: string }, { rejectWithValue }) => {
    try {
      const data = await api.post('/admin/verify', payload);
      persistTokens(data as any);
      return { data, email: payload.email };
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

// --- Shared ---

export const refreshTokenThunk = createAsyncThunk(
  'auth/refresh',
  async (_, { rejectWithValue }) => {
    try {
      const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
      const res = await fetch(`${BASE_URL}/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.message || 'Refresh failed');
      persistTokens(data);
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchSessions = createAsyncThunk(
  'auth/fetchSessions',
  async (params: { page?: number; limit?: number } | undefined, { rejectWithValue }) => {
    try {
      const page = params?.page || 1;
      const limit = params?.limit || 5;
      const res: any = await api.get(`/auth/sessions?page=${page}&limit=${limit}`);
      const list = res?.data || [];
      const pagination = res?.pagination || null;
      return { sessions: Array.isArray(list) ? list : [], pagination };
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const logoutThunk = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  try {
    // credentials:'include' (set in lib/api) sends the HttpOnly refresh cookie
    // so the backend can clear it. Still clear local state even on failure.
    await api.post('/auth/logout');
  } catch (err: any) {
    // still clear locally even if server fails
  }
  if (typeof window !== 'undefined') {
    localStorage.removeItem('afrisciencehub_token');
    localStorage.removeItem('afrisciencehub_refresh'); // legacy cleanup
    localStorage.removeItem('afrisciencehub_user');
  }
});

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  accessToken: null,
  refreshToken: null,
  sessions: [],
  sessionsPagination: null,
  sessionsLoading: false,
  sessionsError: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<AuthUser | null>) {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
      if (typeof window !== 'undefined') {
        if (action.payload) localStorage.setItem('afrisciencehub_user', JSON.stringify(action.payload));
        else localStorage.removeItem('afrisciencehub_user');
      }
    },
    hydrateFromStorage(state) {
      if (typeof window === 'undefined') return;
      try {
        const stored = localStorage.getItem('afrisciencehub_user');
        if (stored) {
          state.user = JSON.parse(stored);
          state.isAuthenticated = true;
        }
        state.accessToken = localStorage.getItem('afrisciencehub_token');
        state.refreshToken = localStorage.getItem('afrisciencehub_refresh');
      } catch {}
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // loginUser
      .addCase(loginUser.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(loginUser.fulfilled, (s, a) => {
        s.loading = false;
        s.user = extractUser(a.payload.data, a.payload.identifier);
        s.isAuthenticated = true;
        const resp = a.payload.data as any;
        s.accessToken = resp?.accessToken || resp?.token || null;
        s.refreshToken = resp?.refreshToken || null;
        if (typeof window !== 'undefined') localStorage.setItem('afrisciencehub_user', JSON.stringify(s.user));
      })
      .addCase(loginUser.rejected, (s, a) => { s.loading = false; s.error = a.payload as string; })
      // verifyUser
      .addCase(verifyUserEmail.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(verifyUserEmail.fulfilled, (s, a) => {
        s.loading = false;
        const maybeUser = extractUser(a.payload.data, a.payload.email);
        // only set user if response contains token/user
        if ((a.payload.data as any)?.token || (a.payload.data as any)?.accessToken || (a.payload.data as any)?.user) {
          s.user = maybeUser;
          s.isAuthenticated = true;
          if (typeof window !== 'undefined') localStorage.setItem('afrisciencehub_user', JSON.stringify(s.user));
        }
      })
      .addCase(verifyUserEmail.rejected, (s, a) => { s.loading = false; s.error = a.payload as string; })
      // signupUser
      .addCase(signupUser.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(signupUser.fulfilled, (s) => { s.loading = false; })
      .addCase(signupUser.rejected, (s, a) => { s.loading = false; s.error = a.payload as string; })
      // admin
      .addCase(loginAdmin.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(loginAdmin.fulfilled, (s, a) => {
        s.loading = false;
        s.user = extractUser(a.payload.data, a.payload.identifier);
        s.isAuthenticated = true;
        const resp = a.payload.data as any;
        s.accessToken = resp?.accessToken || resp?.token || null;
        s.refreshToken = resp?.refreshToken || null;
        if (typeof window !== 'undefined') localStorage.setItem('afrisciencehub_user', JSON.stringify(s.user));
      })
      .addCase(loginAdmin.rejected, (s, a) => { s.loading = false; s.error = a.payload as string; })
      .addCase(signupAdmin.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(signupAdmin.fulfilled, (s) => { s.loading = false; })
      .addCase(signupAdmin.rejected, (s, a) => { s.loading = false; s.error = a.payload as string; })
      .addCase(verifyAdminEmail.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(verifyAdminEmail.fulfilled, (s) => { s.loading = false; })
      .addCase(verifyAdminEmail.rejected, (s, a) => { s.loading = false; s.error = a.payload as string; })
      .addCase(refreshTokenThunk.fulfilled, (s, a) => {
        s.accessToken = (a.payload as any)?.accessToken || (a.payload as any)?.token || s.accessToken;
      })
      .addCase(logoutThunk.fulfilled, (s) => {
        s.user = null; s.isAuthenticated = false; s.accessToken = null; s.refreshToken = null;
      })
      .addCase(fetchSessions.pending, (s) => { s.sessionsLoading = true; s.sessionsError = null; })
      .addCase(fetchSessions.fulfilled, (s, a) => {
        s.sessionsLoading = false;
        s.sessions = a.payload.sessions as UserSession[];
        s.sessionsPagination = a.payload.pagination as SessionsPagination | null;
      })
      .addCase(fetchSessions.rejected, (s, a) => { s.sessionsLoading = false; s.sessionsError = a.payload as string; });
  },
});

export const { setUser, hydrateFromStorage, clearError } = authSlice.actions;
export default authSlice.reducer;
