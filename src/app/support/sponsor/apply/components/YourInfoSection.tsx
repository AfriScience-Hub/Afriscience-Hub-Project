'use client';

import { User } from '../../../../context/AuthContext';

interface YourInfoSectionProps {
  user: User | null;
}

export function YourInfoSection({ user }: YourInfoSectionProps) {
  const idTag = user?.email
    ? `ASH-${user.email.split('@')[0].toUpperCase()}`
    : 'ASH-********';

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-neutral-gray-light p-8">
      <h2 className="text-xl font-bold text-neutral-black mb-6">Your Information</h2>
      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className="block text-xs font-medium text-neutral-gray-medium mb-1">Full Name</label>
          <p className="text-sm font-semibold text-neutral-black bg-neutral-bg-light rounded-lg px-4 py-3">
            {user?.name || 'Not logged in'}
          </p>
        </div>
        <div>
          <label className="block text-xs font-medium text-neutral-gray-medium mb-1">E-mail</label>
          <p className="text-sm font-semibold text-neutral-black bg-neutral-bg-light rounded-lg px-4 py-3">
            {user?.email || 'Not logged in'}
          </p>
        </div>
        <div>
          <label className="block text-xs font-medium text-neutral-gray-medium mb-1">ID Tag</label>
          <p className="text-sm font-semibold text-neutral-black bg-neutral-bg-light rounded-lg px-4 py-3">
            {idTag}
          </p>
        </div>
      </div>
    </div>
  );
}
