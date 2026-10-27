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
  // display picture) once per signed-in session. Admin has no equivalent /me
  // endpoint yet, so admin pages must use the cached admin identity and never
  // call the user endpoints.
  useEffect(() => {
    if (!hydrated) return;
    const isAdmin = window.location.pathname.startsWith('/admin');
    if (isAdmin) {
      loadedForSession.current = false;
      return;
    }

    const hasToken = !!localStorage.getItem('afrisciencehub_token');
    if (!isAuthenticated || !hasToken) {
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
