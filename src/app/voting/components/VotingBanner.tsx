"use client"

import { AlertCircle } from 'lucide-react';

export default function VotingBanner() {
  return (
    <div className="mb-6 flex items-start gap-3 rounded-lg border border-blue-200 bg-blue-50 p-4">
      <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
      <div>
        <p className="text-sm text-blue-800 font-medium">Voting Rules</p>
        <p className="text-xs text-blue-700 mt-0.5">
          Each user can vote <strong>once for free</strong> per category. Boost votes available for extra support. Positions update in real-time based on total votes (50% judges + 50% audience).
        </p>
      </div>
    </div>
  );
}
