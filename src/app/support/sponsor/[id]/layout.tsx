import ProtectedPage from '@/app/components/ProtectedPage';

export default function SponsorDetailLayout({ children }: { children: React.ReactNode }) {
  return <ProtectedPage>{children}</ProtectedPage>;
}
