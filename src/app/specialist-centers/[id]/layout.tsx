import ProtectedPage from '@/app/components/ProtectedPage';

export default function SpecialistCenterDetailLayout({ children }: { children: React.ReactNode }) {
  return <ProtectedPage>{children}</ProtectedPage>;
}
