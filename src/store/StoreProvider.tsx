'use client';
import { Provider } from 'react-redux';
import { store } from './index';
import { useEffect } from 'react';
import { hydrateFromStorage } from './authSlice';

function Hydrator({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    store.dispatch(hydrateFromStorage());
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
