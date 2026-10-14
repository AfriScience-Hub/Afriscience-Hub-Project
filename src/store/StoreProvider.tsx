'use client';
import { Provider } from 'react-redux';
import { store } from './index';
import { useEffect } from 'react';
import { hydrateFromStorage, fetchCurrentUser, setUser } from './authSlice';
import { fetchFullProfile } from './profileSlice';

function Hydrator({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    store.dispatch(hydrateFromStorage());
    const isAdmin = typeof window !== 'undefined' && window.location.pathname.startsWith('/admin');
    const userToken = typeof window !== 'undefined' && localStorage.getItem('afrisciencehub_token');
    const adminToken = typeof window !== 'undefined' && localStorage.getItem('afrisciencehub_admin_token');
    const hasToken = isAdmin ? adminToken : userToken;
    if (hasToken) {
      // Fetch current user first, then fetch full profile to get the proper avatar
      store.dispatch(fetchCurrentUser()).then((result) => {
        if (fetchCurrentUser.fulfilled.match(result)) {
          store.dispatch(fetchFullProfile());
        }
      });
    }
  }, []);

  // Sync avatar from profile to auth user when profile loads
  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      const state = store.getState();
      const profile = state.profile.personal;
      const authUser = state.auth.user;
      if (profile?.avatar && authUser && authUser.avatar !== profile.avatar) {
        store.dispatch(setUser({ name: authUser.name, email: authUser.email, phone: authUser.phone, avatar: profile.avatar }));
      }
    });
    return unsubscribe;
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
