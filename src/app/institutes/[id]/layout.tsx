import ProtectedPage from '@/app/components/ProtectedPage';

export default function InstituteDetailLayout({ children }: { children: React.ReactNode }) {
  return <ProtectedPage>{children}</ProtectedPage>;
}
