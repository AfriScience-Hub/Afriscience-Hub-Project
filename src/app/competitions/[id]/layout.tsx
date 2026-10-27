import ProtectedPage from '@/app/components/ProtectedPage';

export default function CompetitionDetailLayout({ children }: { children: React.ReactNode }) {
  return <ProtectedPage>{children}</ProtectedPage>;
}
