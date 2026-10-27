import ProtectedPage from '@/app/components/ProtectedPage';

export default function ImpactDetailLayout({ children }: { children: React.ReactNode }) {
  return <ProtectedPage>{children}</ProtectedPage>;
}
