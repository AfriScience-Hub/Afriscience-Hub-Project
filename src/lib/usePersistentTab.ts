'use client';

import { useCallback, useEffect, useState } from 'react';

/**
 * Keeps a manage-options tab selected across refreshes by storing it in
 * localStorage. A stored value is only restored when it is still a valid tab.
 */
export function usePersistentTab<T extends string>(
  storageKey: string,
  validTabs: readonly T[],
  fallback: T,
) {
  const [tab, setTab] = useState<T>(fallback);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(storageKey) as T | null;
      if (stored && validTabs.includes(stored)) setTab(stored);
    } catch {
      // localStorage can be blocked (private mode); keep the fallback.
    }
  }, [storageKey, validTabs]);

  const selectTab = useCallback((next: T) => {
    setTab(next);
    try {
      window.localStorage.setItem(storageKey, next);
    } catch {
      // Persisting is best-effort only.
    }
  }, [storageKey]);

  return [tab, selectTab] as const;
}
