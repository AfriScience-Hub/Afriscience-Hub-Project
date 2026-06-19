'use client';

import { Bell } from 'lucide-react';

interface WelcomeCardProps {
  user: { name: string };
}

export function WelcomeCard({ user }: WelcomeCardProps) {
  return (
    <div className="rounded-xl border border-neutral-gray-light bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-black">Welcome back, {user.name.split(' ')[0]}!</h1>
          <p className="text-sm text-neutral-gray-medium mt-1">Here's what's happening with your listings and activity.</p>
        </div>
        <Bell className="h-5 w-5 text-neutral-gray-medium" />
      </div>
    </div>
  );
}
