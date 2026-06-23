'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import { ProfileContent } from '../dashboard/my-profile/ProfileContent';

export default function Profile() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated || !user) {
      router.replace('/login');
    }
  }, [isAuthenticated, user, router]);

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-neutral-bg-light">
      {/* Header */}
      <div className="bg-white border-b border-neutral-gray-light sticky top-0 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-neutral-black">Profile</h1>
            <Link href="/dashboard">
              <Button size="sm" variant="outline">Back to Dashboard</Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-8">
        <ProfileContent />
      </div>
    </div>
  );
}
