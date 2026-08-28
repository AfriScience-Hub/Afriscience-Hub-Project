import AdminShell from './components/AdminShell';

const NO_SHELL_ROUTES = ['/admin/login', '/admin/forgot-password'];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminShell>{children}</AdminShell>;
}
