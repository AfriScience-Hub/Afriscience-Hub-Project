import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { api } from '@/lib/api';
import { resolveAvatarSrc } from '@/lib/files';

export interface AuthUser {
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  createdAt?: string;
  updatedAt?: string;
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
  hydrated: boolean;
  loading: boolean;
  error: string | null;
  accessToken: string | null;
  refreshToken: string | null;
  sessions: UserSession[];
  sessionsPagination: SessionsPagination | null;
  sessionsLoading: boolean;
  sessionsError: string | null;
}

// The refresh token is an HttpOnly cookie set/cleared by the backend
// (login sets it, /auth/refresh or /admin/auth/refresh reads it, /auth/logout
// clears it). It is sent automatically via `credentials: 'include'` and is
// NEVER visible to JS (document.cookie won't show it — that's expected).
// So we only persist the short-lived access/session token here.
function persistTokens(data: any, isAdmin = false) {
  if (typeof window === 'undefined') return;
  const access = data?.accessToken || data?.token || data?.data?.accessToken || data?.data?.token;
  if (access) localStorage.setItem(isAdmin ? 'afrisciencehub_admin_token' : 'afrisciencehub_token', access);
  localStorage.removeItem('afrisciencehub_refresh'); // legacy cleanup
}

function extractUser(data: any, fallbackIdentifier?: string): AuthUser {
  const u = data?.details || data?.user || data?.data?.user || data?.data || {};
  const isEmail = fallbackIdentifier?.includes('@');
  const profile = u?.profile || u?.personalInfo || u?.userProfile || u?.profileInfo || {};
  const rawAvatar = u.avatar || u.avatarUrl || u.displayPhotoUrl || u.displayPhoto || u.photo || u.profileImage || u.image
    || profile.displayPhoto || profile.avatar || profile.avatarUrl || profile.photo || profile.profileImage || profile.image;
  return {
    name: u.name || u.fullName || u.firstName || (fallbackIdentifier ? (isEmail ? fallbackIdentifier.split('@')[0] : 'User') : 'User'),
    email: u.email || (isEmail ? fallbackIdentifier || '' : ''),
    phone: u.phone || (!isEmail ? fallbackIdentifier || '' : ''),
    // Only accept values we can actually render: a valid signed/blob URL, or a
    // bare key whose signed URL we captured at upload time. Unresolvable
    // values (raw bucket URL, expired key) become undefined -> initials
    // fallback, never a broken image.
    avatar: resolveAvatarSrc(rawAvatar),
    createdAt: u.createdAt,
    updatedAt: u.updatedAt,
  };
}

/** The access token stored for the section currently being viewed. */
function storedToken(): string | null {
  if (typeof window === 'undefined') return null;
  const isAdmin = window.location.pathname.startsWith('/admin');
  return localStorage.getItem(isAdmin ? 'afrisciencehub_admin_token' : 'afrisciencehub_token');
}

/** Base64url-decodes a JWT's payload, or null when it can't be parsed. */
function decodeTokenPayload(token?: string | null): Record<string, any> | null {
  if (!token || typeof window === 'undefined' || typeof atob !== 'function') return null;
  try {
    const segment = token.split('.')[1];
    if (!segment) return null;
    const base64 = segment.replace(/-/g, '+').replace(/_/g, '/');
    const padded = base64 + '='.repeat((4 - (base64.length % 4)) % 4);
    const json = decodeURIComponent(
      atob(padded).split('').map((c) => '%' + ('0' + c.charCodeAt(0).toString(16)).slice(-2)).join('')
    );
    const parsed = JSON.parse(json);
    return parsed && typeof parsed === 'object' ? parsed : null;
  } catch {
    return null;
  }
}

/**
 * Fills gaps in an extracted user from the JWT claims. The token carries the
 * user's signed avatar URL (and name/email/phone), so the profile picture can
 * render immediately after login — without waiting for a profile fetch.
 */
function applyTokenClaims(user: AuthUser, token?: string | null): AuthUser {
  const claims = decodeTokenPayload(token);
  if (!claims) return user;
  const nameIsPlaceholder = !user.name || user.name === 'User';
  return {
    ...user,
    name: nameIsPlaceholder ? (claims.name || claims.fullName || user.name) : user.name,
    email: user.email || claims.email || '',
    phone: user.phone || claims.phone || '',
    avatar: user.avatar ?? resolveAvatarSrc(claims.avatar),
    createdAt: user.createdAt ?? (typeof claims.createdAt === 'string' ? claims.createdAt : undefined),
    updatedAt: user.updatedAt ?? (typeof claims.updatedAt === 'string' ? claims.updatedAt : undefined),
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
      const data = await api.post('/admin/auth/register', payload as any);
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
      persistTokens(data as any, true);
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
      persistTokens(data as any, true);
      return { data, email: payload.email };
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

// --- Refresh (user and admin have SEPARATE endpoints) ---

function createRefreshThunk(typePrefix: string, endpoint: string, isAdmin = false) {
  return createAsyncThunk(
    typePrefix,
    async (_, { rejectWithValue }) => {
      try {
        const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
        const res = await fetch(`${BASE_URL}${endpoint}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data.message || 'Refresh failed');
        persistTokens(data, isAdmin);
        return data;
      } catch (err: any) {
        return rejectWithValue(err.message);
      }
    }
  );
}

// User session refresh — POST /api/v1/auth/refresh
export const refreshUserToken = createRefreshThunk('auth/refreshUser', '/auth/refresh');

// Admin session refresh — POST /api/v1/admin/auth/refresh (not shared with users)
export const refreshAdminToken = createRefreshThunk('auth/refreshAdmin', '/admin/auth/refresh', true);

export const fetchCurrentUser = createAsyncThunk(
  'auth/fetchCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      const data = await api.get('/auth/me');
      // /auth/me may omit the avatar — the JWT claims carry it, so the
      // picture stays available without a separate profile fetch.
      return applyTokenClaims(extractUser(data), storedToken());
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
    localStorage.removeItem('afrisciencehub_admin_token');
    localStorage.removeItem('afrisciencehub_refresh'); // legacy cleanup
    localStorage.removeItem('afrisciencehub_user');
    localStorage.removeItem('afrisciencehub_admin');
  }
});

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  hydrated: false,
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
      // Normalize on the way in so a raw storage key, an expired signed URL or
      // the legacy placeholder avatar can never be persisted again.
      const payload = action.payload
        ? { ...action.payload, avatar: resolveAvatarSrc(action.payload.avatar) }
        : action.payload;
      state.user = payload;
      state.isAuthenticated = !!payload;
      if (typeof window !== 'undefined') {
        if (payload) localStorage.setItem('afrisciencehub_user', JSON.stringify(payload));
        else localStorage.removeItem('afrisciencehub_user');
      }
    },
    hydrateFromStorage(state) {
      state.hydrated = true;
      if (typeof window === 'undefined') return;
      try {
        const isAdmin = window.location.pathname.startsWith('/admin');
        const userKey = isAdmin ? 'afrisciencehub_admin' : 'afrisciencehub_user';
        const tokenKey = isAdmin ? 'afrisciencehub_admin_token' : 'afrisciencehub_token';
        const stored = localStorage.getItem(userKey);
        if (stored) {
          const parsed = JSON.parse(stored);
          // Re-normalize anything an older build persisted: drops the hard-coded
          // placeholder avatar. If normalization returns undefined (expired cache),
          // keep the raw key so Avatar can at least show initials.
          if (parsed && typeof parsed.avatar === 'string') {
            const normalized = resolveAvatarSrc(parsed.avatar);
            parsed.avatar = normalized ?? parsed.avatar;
          }
          // Fill any gaps (e.g. avatar) from the token's claims so the profile
          // picture renders immediately on reload too.
          state.user = parsed ? applyTokenClaims(parsed, tokenKey ? localStorage.getItem(tokenKey) : null) : parsed;
          state.isAuthenticated = true;
        }
        state.accessToken = localStorage.getItem(tokenKey);
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
        const resp = a.payload.data as any;
        const token = resp?.accessToken || resp?.token || null;
        // The JWT carries the user's signed avatar URL — surface it right away
        // so the picture shows across the platform without visiting the profile.
        s.user = applyTokenClaims(extractUser(a.payload.data, a.payload.identifier), token);
        s.isAuthenticated = true;
        s.accessToken = token;
        s.refreshToken = resp?.refreshToken || null;
        if (typeof window !== 'undefined') localStorage.setItem('afrisciencehub_user', JSON.stringify(s.user));
      })
      .addCase(loginUser.rejected, (s, a) => { s.loading = false; s.error = a.payload as string; })
      // verifyUser
      .addCase(verifyUserEmail.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(verifyUserEmail.fulfilled, (s, a) => {
        s.loading = false;
        const resp = a.payload.data as any;
        const token = resp?.token || resp?.accessToken || null;
        const maybeUser = applyTokenClaims(extractUser(a.payload.data, a.payload.email), token);
        // only set user if response contains token/user
        if (resp?.token || resp?.accessToken || resp?.user) {
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
        const resp = a.payload.data as any;
        const token = resp?.accessToken || resp?.token || null;
        // Same as users: pull the avatar from the JWT claims when the
        // response body doesn't include the user object.
        s.user = applyTokenClaims(extractUser(a.payload.data, a.payload.identifier), token);
        s.isAuthenticated = true;
        s.accessToken = token;
        s.refreshToken = resp?.refreshToken || null;
        if (typeof window !== 'undefined') localStorage.setItem('afrisciencehub_admin', JSON.stringify(s.user));
      })
      .addCase(loginAdmin.rejected, (s, a) => { s.loading = false; s.error = a.payload as string; })
      .addCase(signupAdmin.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(signupAdmin.fulfilled, (s) => { s.loading = false; })
      .addCase(signupAdmin.rejected, (s, a) => { s.loading = false; s.error = a.payload as string; })
      .addCase(verifyAdminEmail.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(verifyAdminEmail.fulfilled, (s) => { s.loading = false; })
      .addCase(verifyAdminEmail.rejected, (s, a) => { s.loading = false; s.error = a.payload as string; })
      .addCase(refreshUserToken.fulfilled, (s, a) => {
        s.accessToken = (a.payload as any)?.accessToken || (a.payload as any)?.token || (a.payload as any)?.data?.accessToken || (a.payload as any)?.data?.token || s.accessToken;
      })
      .addCase(refreshAdminToken.fulfilled, (s, a) => {
        s.accessToken = (a.payload as any)?.accessToken || (a.payload as any)?.token || (a.payload as any)?.data?.accessToken || (a.payload as any)?.data?.token || s.accessToken;
      })
      .addCase(logoutThunk.fulfilled, (s) => {
        s.user = null; s.isAuthenticated = false; s.accessToken = null; s.refreshToken = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (s, a) => {
        // /auth/me may omit the avatar — keep the one we already have in that case.
        // If it provides one, normalize it (resolve keys, drop legacy placeholders).
        // IMPORTANT: Never overwrite a valid avatar with undefined.
        const incoming = a.payload;
        const normalizedAvatar = incoming.avatar ? resolveAvatarSrc(incoming.avatar) : undefined;
        const merged = !normalizedAvatar && s.user?.avatar
          ? { ...incoming, avatar: s.user.avatar }
          : { ...incoming, avatar: normalizedAvatar ?? s.user?.avatar };
        s.user = merged;
        s.isAuthenticated = true;
        if (typeof window !== 'undefined') localStorage.setItem('afrisciencehub_user', JSON.stringify(s.user));
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
