import React from 'react';
import { PARTICIPANTS_BY_TYPE } from '../data';
import { cn } from '@/lib/utils';

/**
 * "Participants Overview" donut chart card with a legend breakdown by type.
 */
export default function ParticipantsOverviewChart() {
  return (
    <div className="bg-white rounded-lg border border-neutral-gray-light p-4">
      <h3 className="text-xs font-semibold text-neutral-black mb-3">Participants Overview</h3>
      <div className="flex items-center gap-4">
        <div className="relative w-32 h-32 flex-shrink-0">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="40" fill="none" stroke="#3B82F6" strokeWidth="20" strokeDasharray="107 219" strokeDashoffset="0" />
            <circle cx="50" cy="50" r="40" fill="none" stroke="#22C55E" strokeWidth="20" strokeDasharray="58.3 267.7" strokeDashoffset="-107" />
            <circle cx="50" cy="50" r="40" fill="none" stroke="#A855F7" strokeWidth="20" strokeDasharray="42.5 283.5" strokeDashoffset="-165.3" />
            <circle cx="50" cy="50" r="40" fill="none" stroke="#F97316" strokeWidth="20" strokeDasharray="28.3 297.7" strokeDashoffset="-207.8" />
            <circle cx="50" cy="50" r="40" fill="none" stroke="#D1D5DB" strokeWidth="20" strokeDasharray="16.2 309.8" strokeDashoffset="-236.1" />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-lg font-bold text-neutral-black">3,142</p>
            <p className="text-[9px] text-neutral-gray-medium">Total</p>
          </div>
        </div>
        <div className="space-y-1.5">
          {PARTICIPANTS_BY_TYPE.map((type) => (
            <div key={type.name} className="flex items-center gap-2">
              <span className={cn("w-2 h-2 rounded-full flex-shrink-0", type.color)} />
              <span className="text-[10px] text-neutral-gray-dark flex-1">{type.name}</span>
              <span className="text-[10px] text-neutral-gray-medium">{type.percent}</span>
              <span className="text-[9px] text-neutral-gray-medium">({type.count})</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
