'use client';

import { useState, useEffect, useCallback } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === 'undefined') return initialValue;
    try {
      const stored = window.localStorage.getItem(key);
      return stored ? (JSON.parse(stored) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setStoredValue = useCallback((next: T | ((prev: T) => T)) => {
    setValue(prev => {
      const resolved = typeof next === 'function' ? (next as (p: T) => T)(prev) : next;
      try {
        window.localStorage.setItem(key, JSON.stringify(resolved));
      } catch {
        // storage unavailable; keep in-memory state only
      }
      return resolved;
    });
  }, [key]);

  useEffect(() => {
    const onChange = () => {
      try {
        setStoredValue(prev => {
          const stored = window.localStorage.getItem(key);
          return stored ? (JSON.parse(stored) as T) : prev;
        });
      } catch {
        // ignore
      }
    };
    window.addEventListener('storage', onChange);
    return () => window.removeEventListener('storage', onChange);
  }, [key, setStoredValue]);

  return [value, setStoredValue] as const;
}