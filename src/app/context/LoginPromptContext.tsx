'use client';

import React, { createContext, useCallback, useContext, useState, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { LogIn, X } from 'lucide-react';
import { Button } from '@/app/components/ui/Button';
import { useAuth } from './AuthContext';

interface LoginPromptContextValue {
  /** Opens the login prompt modal. */
  promptLogin: () => void;
  /** Runs `action` if authenticated; otherwise opens the prompt and returns false. */
  requireAuth: (action: () => void) => boolean;
}

const LoginPromptContext = createContext<LoginPromptContextValue | undefined>(undefined);

export function LoginPromptProvider({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const promptLogin = useCallback(() => setOpen(true), []);

  const requireAuth = useCallback(
    (action: () => void) => {
      if (isAuthenticated) {
        action();
        return true;
      }
      setOpen(true);
      return false;
    },
    [isAuthenticated],
  );

  const goToLogin = () => {
    setOpen(false);
    const from =
      typeof window !== 'undefined' ? window.location.pathname + window.location.search : '';
    router.push(`/login?from=${encodeURIComponent(from)}`);
  };

  return (
    <LoginPromptContext.Provider value={{ promptLogin, requireAuth }}>
      {children}
      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-white shadow-2xl p-6 text-center"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <div className="flex justify-end">
              <button
                onClick={() => setOpen(false)}
                className="h-8 w-8 rounded-full hover:bg-neutral-bg-light flex items-center justify-center cursor-pointer"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="h-14 w-14 rounded-full bg-brand-red-50 flex items-center justify-center mx-auto mb-4">
              <LogIn className="h-7 w-7 text-brand-red-600" />
            </div>
            <h3 className="text-lg font-bold text-neutral-black mb-2">Login Required</h3>
            <p className="text-sm text-neutral-gray-dark mb-6">
              Please log in to view details and continue. It only takes a moment.
            </p>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button
                className="flex-1 bg-brand-red-600 hover:bg-brand-red-700"
                onClick={goToLogin}
              >
                <LogIn className="h-4 w-4 mr-2" /> Log In
              </Button>
            </div>
          </div>
        </div>
      )}
    </LoginPromptContext.Provider>
  );
}

export function useLoginPrompt() {
  const ctx = useContext(LoginPromptContext);
  if (!ctx) throw new Error('useLoginPrompt must be used within LoginPromptProvider');
  return ctx;
}
