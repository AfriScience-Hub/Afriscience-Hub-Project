export type AuthScope = 'user' | 'admin';
export type AuthStorageKind = 'local' | 'session';

const TOKEN_KEYS: Record<AuthScope, string> = {
  user: 'afrisciencehub_token',
  admin: 'afrisciencehub_admin_token',
};

const USER_KEYS: Record<AuthScope, string> = {
  user: 'afrisciencehub_user',
  admin: 'afrisciencehub_admin',
};

function getStorage(kind: AuthStorageKind): Storage | null {
  if (typeof window === 'undefined') return null;
  return kind === 'local' ? window.localStorage : window.sessionStorage;
}

function tokenIn(scope: AuthScope, kind: AuthStorageKind): string | null {
  return getStorage(kind)?.getItem(TOKEN_KEYS[scope]) ?? null;
}

/** The storage currently holding the session for a scope, if any. */
export function getAuthStorageKind(scope: AuthScope): AuthStorageKind | null {
  if (tokenIn(scope, 'session') !== null) return 'session';
  if (tokenIn(scope, 'local') !== null) return 'local';
  return null;
}

/** Reads the access token from session storage first, then persistent storage. */
export function getStoredToken(scope: AuthScope): string | null {
  return tokenIn(scope, 'session') ?? tokenIn(scope, 'local');
}

/**
 * Saves the access token.
 *
 * `remember === true` persists it in localStorage (survives a browser restart);
 * `false` keeps it in sessionStorage (cleared when the browser session ends).
 * Omitting `remember` preserves the current storage, which is what token
 * refreshes need.
 */
export function setStoredToken(
  scope: AuthScope,
  token: string | null,
  remember?: boolean,
): void {
  const current = getAuthStorageKind(scope);
  const kind: AuthStorageKind =
    remember === undefined ? current ?? 'local' : remember ? 'local' : 'session';
  const target = getStorage(kind);
  const other = getStorage(kind === 'local' ? 'session' : 'local');
  if (!target) return;

  if (token) {
    target.setItem(TOKEN_KEYS[scope], token);
    other?.removeItem(TOKEN_KEYS[scope]);
  } else {
    target.removeItem(TOKEN_KEYS[scope]);
    other?.removeItem(TOKEN_KEYS[scope]);
  }
}

/** Reads the cached user only from the storage that owns the current token. */
export function getStoredUser(scope: AuthScope): string | null {
  const kind = getAuthStorageKind(scope);
  if (!kind) return null;
  return getStorage(kind)?.getItem(USER_KEYS[scope]) ?? null;
}

/** Saves the cached user alongside the token in the matching storage. */
export function setStoredUser(
  scope: AuthScope,
  value: string | null,
  remember?: boolean,
): void {
  const current = getAuthStorageKind(scope);
  const kind: AuthStorageKind =
    remember === undefined ? current ?? 'local' : remember ? 'local' : 'session';
  const target = getStorage(kind);
  const other = getStorage(kind === 'local' ? 'session' : 'local');
  if (!target) return;

  if (value) {
    target.setItem(USER_KEYS[scope], value);
    other?.removeItem(USER_KEYS[scope]);
  } else {
    target.removeItem(USER_KEYS[scope]);
    other?.removeItem(USER_KEYS[scope]);
  }
}

/** Removes the cached identity for a scope from both storages. */
export function clearStoredUser(scope: AuthScope): void {
  getStorage('local')?.removeItem(USER_KEYS[scope]);
  getStorage('session')?.removeItem(USER_KEYS[scope]);
}

/** Removes tokens and cached identities for one scope, or for both scopes. */
export function clearStoredAuth(scope?: AuthScope): void {
  const scopes: AuthScope[] = scope ? [scope] : ['user', 'admin'];
  for (const current of scopes) {
    getStorage('local')?.removeItem(TOKEN_KEYS[current]);
    getStorage('session')?.removeItem(TOKEN_KEYS[current]);
    clearStoredUser(current);
  }
  // Legacy key removed by older builds.
  getStorage('local')?.removeItem('afrisciencehub_refresh');
}
