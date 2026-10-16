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
      // The avatar comes from the login response / the token's own claims
      // (see applyTokenClaims in authSlice), so it renders immediately —
      // no profile fetch is needed just to show the picture.
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
