import AdminShell from './components/AdminShell';

// AdminShell handles protection + NO_SHELL logic centrally

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminShell>{children}</AdminShell>;
}
