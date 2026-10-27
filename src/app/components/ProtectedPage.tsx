'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/app/context/AuthContext';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { logoutLocal } from '@/store/authSlice';
import { isAccessTokenExpired, refreshAccessToken } from '@/lib/api';

interface ProtectedPageProps {
  children: React.ReactNode;
}

/**
 * Guards a detail page that must not be viewed by signed-out visitors.
 *
 * The API layer handles expired sessions; this guard handles the simpler case
 * of no session at all, validates an expired access token against the refresh
 * cookie, and gives the hydrator time to restore a valid session.
 */
export default function ProtectedPage({ children }: ProtectedPageProps) {
  const { isAuthenticated } = useAuth();
  const hydrated = useAppSelector((s) => s.auth.hydrated);
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (!hydrated) return;
    const from = pathname + (typeof window !== 'undefined' ? window.location.search : '');

    if (!isAuthenticated) {
      setChecking(false);
      router.replace(`/login?from=${encodeURIComponent(from)}`);
      return;
    }

    if (!isAccessTokenExpired()) {
      setChecking(false);
      return;
    }

    let active = true;
    setChecking(true);
    refreshAccessToken().then((token) => {
      if (!active) return;
      if (!token) {
        dispatch(logoutLocal());
        router.replace(`/login?reason=session_expired&from=${encodeURIComponent(from)}`);
        return;
      }
      setChecking(false);
    });

    return () => {
      active = false;
    };
  }, [hydrated, isAuthenticated, pathname, router, dispatch]);

  if (!hydrated || !isAuthenticated || checking) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-neutral-bg-light">
        <Loader2 className="h-8 w-8 animate-spin text-brand-red-600" />
      </div>
    );
  }

  return <>{children}</>;
}
