'use client';

import { MOCK_LISTINGS } from '../data';
import VerificationList from './components/VerificationList';
import VerificationInfo from './components/VerificationInfo';

export default function VerificationStatusPage() {
  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-neutral-gray-light bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-neutral-black mb-6">Verification Status</h2>
        <VerificationList listings={MOCK_LISTINGS} />
        <VerificationInfo />
      </div>
    </div>
  );
}
