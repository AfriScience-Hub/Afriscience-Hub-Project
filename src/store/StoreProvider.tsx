'use client';
import { Provider } from 'react-redux';
import { store } from './index';
import { useEffect, useRef } from 'react';
import { hydrateFromStorage, fetchCurrentUser } from './authSlice';
import { useAppSelector } from './hooks';

function Hydrator({ children }: { children: React.ReactNode }) {
  const hydrated = useAppSelector((s) => s.auth.hydrated);
  const isAuthenticated = useAppSelector((s) => s.auth.isAuthenticated);
  const loadedForSession = useRef(false);

  useEffect(() => {
    store.dispatch(hydrateFromStorage());
  }, []);

  // Load the full user (GET /auth/me, falling back to GET /profile for the
  // display picture) once per signed-in session. This runs on every page and
  // again right after login, so the avatar is available platform-wide without
  // the user ever visiting their profile page.
  useEffect(() => {
    if (!hydrated) return;
    const isAdmin = window.location.pathname.startsWith('/admin');
    const hasToken = !!localStorage.getItem(isAdmin ? 'afrisciencehub_admin_token' : 'afrisciencehub_token');
    if (!isAuthenticated && !hasToken) {
      loadedForSession.current = false;
      return;
    }
    if (loadedForSession.current) return;
    loadedForSession.current = true;
    store.dispatch(fetchCurrentUser());
  }, [hydrated, isAuthenticated]);

  return <>{children}</>;
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <Hydrator>{children}</Hydrator>
    </Provider>
  );
}
