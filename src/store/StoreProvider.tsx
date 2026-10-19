'use client';
import { Provider } from 'react-redux';
import { store } from './index';
import { useEffect } from 'react';
import { hydrateFromStorage, fetchCurrentUser } from './authSlice';

function Hydrator({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    store.dispatch(hydrateFromStorage());
    const isAdmin = typeof window !== 'undefined' && window.location.pathname.startsWith('/admin');
    const userToken = typeof window !== 'undefined' && localStorage.getItem('afrisciencehub_token');
    const adminToken = typeof window !== 'undefined' && localStorage.getItem('afrisciencehub_admin_token');
    const hasToken = isAdmin ? adminToken : userToken;
    if (hasToken) {
      // GET /auth/me returns the current user (including the avatar when set),
      // so the display picture renders immediately on load — no need to visit
      // the profile page first.
      store.dispatch(fetchCurrentUser());
    }
  }, []);

  return <>{children}</>;
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <Hydrator>{children}</Hydrator>
    </Provider>
  );
}
