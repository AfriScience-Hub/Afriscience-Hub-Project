'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Clock, Share2 } from 'lucide-react';
import { NEW_SUBMISSIONS, REJECTED_INNOVATIONS, TOP_SHARED_INNOVATIONS } from '../data';

export interface Slice { name: string; percent: string; count: number; color: string; }

const R = 40;
const C = 2 * Math.PI * R;

export function DonutChart({ total, slices }: { total: string | number; slices: Slice[] }) {
  let acc = 0;
  return (
    <div className="flex flex-col sm:flex-row items-center gap-4">
      <div className="relative w-32 h-32 flex-shrink-0">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {slices.map((s, i) => {
            const dash = (parseFloat(s.percent) / 100) * C;
            const el = (
              <circle key={i} cx="50" cy="50" r={R} fill="none" stroke={s.color} strokeWidth="20"
                strokeDasharray={`${dash} ${C - dash}`} strokeDashoffset={-acc} />
            );
            acc += dash;
            return el;
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-lg font-bold text-neutral-black">{total}</p>
          <p className="text-[9px] text-neutral-gray-medium">Total</p>
        </div>
      </div>
      <div className="space-y-1.5 w-full sm:w-auto">
        {slices.map((s) => (
          <div key={s.name} className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: s.color }} />
            <span className="text-[10px] text-neutral-gray-dark flex-1">{s.name}</span>
            <span className="text-[10px] text-neutral-gray-medium">{s.percent}</span>
            <span className="text-[9px] text-neutral-gray-medium">({s.count})</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function DonutCard({ title, total, slices }: { title: string; total: string | number; slices: Slice[] }) {
  return (
    <div className="bg-white rounded-lg border border-neutral-gray-light p-4">
      <h3 className="text-xs font-semibold text-neutral-black mb-3">{title}</h3>
      <DonutChart total={total} slices={slices} />
    </div>
  );
}

function ListCard({ title, viewHref, children }: { title: string; viewHref: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-lg border border-neutral-gray-light p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xs font-semibold text-neutral-black">{title}</h3>
        <Link href={viewHref} className="flex items-center gap-1 text-[10px] text-[#453DD8] font-medium hover:underline cursor-pointer">
          View all <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

export function NewSubmissionsCard({ viewHref }: { viewHref: string }) {
  return (
    <ListCard title="New Submissions" viewHref={viewHref}>
      {NEW_SUBMISSIONS.map((inn) => (
        <div key={inn.id} className="flex items-start gap-2.5">
          <Image src={inn.logo} alt={inn.name} width={28} height={28} className="rounded-lg object-cover flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-[11px] font-medium text-neutral-black truncate">{inn.name}</p>
            <p className="text-[9px] text-neutral-gray-medium">{inn.meta}</p>
          </div>
          <span className="flex items-center gap-1 text-[9px] text-neutral-gray-medium flex-shrink-0">
            <Clock className="h-3 w-3" />{inn.time}
          </span>
        </div>
      ))}
    </ListCard>
  );
}

export function RejectedInnovationsCard({ viewHref }: { viewHref: string }) {
  return (
    <ListCard title="Rejected Innovations" viewHref={viewHref}>
      {REJECTED_INNOVATIONS.map((inn) => (
        <div key={inn.id} className="flex items-start gap-2.5">
          <Image src={inn.logo} alt={inn.name} width={28} height={28} className="rounded-lg object-cover flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-[11px] font-medium text-neutral-black truncate">{inn.name}</p>
            <p className="text-[9px] text-neutral-gray-medium truncate">{inn.reason}</p>
          </div>
          <span className="px-1.5 py-0.5 rounded text-[8px] font-semibold bg-red-100 text-red-700 flex-shrink-0">Rejected</span>
        </div>
      ))}
    </ListCard>
  );
}

export function TopSharedInnovationsCard({ viewHref }: { viewHref: string }) {
  return (
    <ListCard title="Top Shared Innovations" viewHref={viewHref}>
      {TOP_SHARED_INNOVATIONS.map((inn, idx) => (
        <div key={inn.id} className="flex items-center gap-2.5">
          <span className="w-5 h-5 rounded-full bg-[#453DD8] text-white flex items-center justify-center text-[9px] font-bold flex-shrink-0">{idx + 1}</span>
          <Image src={inn.logo} alt={inn.name} width={28} height={28} className="rounded-lg object-cover flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-[11px] font-medium text-neutral-black truncate">{inn.name}</p>
            <p className="text-[9px] text-neutral-gray-medium">{inn.meta}</p>
          </div>
          <span className="flex items-center gap-1 text-[10px] text-neutral-gray-medium flex-shrink-0">
            <Share2 className="h-3 w-3" />{inn.shares.toLocaleString()}
          </span>
        </div>
      ))}
    </ListCard>
  );
}
