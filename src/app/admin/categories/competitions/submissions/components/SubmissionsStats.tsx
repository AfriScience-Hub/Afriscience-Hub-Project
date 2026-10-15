'use client';

import React from 'react';
import { FileText, Clock, CheckCircle, XCircle, Users } from 'lucide-react';
import { SUBMISSION_STATS } from '../data';

const ICONS: Record<string, React.ElementType> = {
  file: FileText,
  clock: Clock,
  check: CheckCircle,
  x: XCircle,
  users: Users,
};

/**
 * Summary cards for the View Submissions page:
 * Total, Pending Review, Approved, Rejected and Finalists.
 */
export default function SubmissionsStats() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-3">
      {SUBMISSION_STATS.map((stat) => {
        const Icon = ICONS[stat.icon] || FileText;
        return (
          <div key={stat.label} className="bg-white rounded-xl border border-neutral-gray-light p-4">
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${stat.iconBg}`}>
                <Icon className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <p className="text-xl font-bold text-neutral-black leading-tight">{stat.value}</p>
                <p className="text-[11px] text-neutral-gray-medium leading-tight">{stat.label}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
