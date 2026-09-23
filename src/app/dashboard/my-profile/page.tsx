'use client';

import { Suspense } from 'react';
import { ProfileContent } from './ProfileContent';

export default function MyProfile() {
  return (
    <div className="space-y-6">
      <Suspense fallback={null}>
        <ProfileContent />
      </Suspense>
    </div>
  );
}
