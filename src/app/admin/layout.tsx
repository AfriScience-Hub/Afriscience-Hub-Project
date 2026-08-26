'use client';

import { usePathname } from 'next/navigation';
import AdminShell from './components/AdminShell';

const NO_SHELL_ROUTES = ['/admin/login', '/admin/forgot-password'];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (NO_SHELL_ROUTES.includes(pathname)) {
    return <>{children}</>;
  }

  return <AdminShell>{children}</AdminShell>;
}
