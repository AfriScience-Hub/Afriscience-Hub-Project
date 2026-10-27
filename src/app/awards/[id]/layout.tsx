import ProtectedPage from '@/app/components/ProtectedPage';

export default function AwardDetailLayout({ children }: { children: React.ReactNode }) {
  return <ProtectedPage>{children}</ProtectedPage>;
}
