import ProtectedPage from '@/app/components/ProtectedPage';

export default function ScientistDetailLayout({ children }: { children: React.ReactNode }) {
  return <ProtectedPage>{children}</ProtectedPage>;
}
