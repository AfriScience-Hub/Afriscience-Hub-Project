'use client';

import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import AdminSidebar from './AdminSidebar';
import MobileSidebar from './MobileSidebar';
import AdminHeader from './AdminHeader';
import { useAppSelector } from '@/store/hooks';
import { Loader2 } from 'lucide-react';

const NO_SHELL_ROUTES = ['/admin/login', '/admin/signup', '/admin/verify', '/admin/forgot-password'];

interface AdminShellProps {
  children: React.ReactNode;
}

export default function AdminShell({ children }: AdminShellProps) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated } = useAppSelector((s) => s.auth);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => setHydrated(true), []);

  // Auth pages: if already logged in, bounce to dashboard
  if (NO_SHELL_ROUTES.includes(pathname)) {
    if (hydrated && isAuthenticated) {
      router.replace('/admin/dashboard');
      return (
        <div className="min-h-screen flex items-center justify-center bg-neutral-bg-light">
          <Loader2 className="h-8 w-8 animate-spin text-brand-red-600" />
        </div>
      );
    }
    return <>{children}</>;
  }

  if (!hydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-bg-light">
        <Loader2 className="h-8 w-8 animate-spin text-brand-red-600" />
      </div>
    );
  }

  if (!isAuthenticated) {
    router.replace('/admin/login');
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-bg-light">
        <Loader2 className="h-8 w-8 animate-spin text-brand-red-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-bg-light flex">
      <AdminSidebar />
      <MobileSidebar isOpen={isMobileSidebarOpen} onClose={() => setIsMobileSidebarOpen(false)} />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader onToggleSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)} />
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
