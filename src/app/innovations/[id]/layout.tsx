import ProtectedPage from '@/app/components/ProtectedPage';

export default function InnovationDetailLayout({ children }: { children: React.ReactNode }) {
  return <ProtectedPage>{children}</ProtectedPage>;
}
