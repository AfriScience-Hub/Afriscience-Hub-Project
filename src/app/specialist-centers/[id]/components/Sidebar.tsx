'use client';

import { Calendar, Star } from 'lucide-react';
import { Button } from '@/app/components/ui/Button';
import { cn, formatJoinedDate } from '@/lib/utils';

interface SidebarProps {
  center: {
    status: string;
    field: string;
    ownership: string;
    responseTime?: string;
    workDays?: string;
    workHours?: string;
    bookingsCount?: number;
    rating: number;
    createdAt?: string;
  };
  onBookService: () => void;
}

export default function Sidebar({ center, onBookService }: SidebarProps) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-gray-light sticky top-24">
        <h3 className="text-sm font-bold text-neutral-gray-dark uppercase tracking-wider mb-4">Center Highlights</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-neutral-black">Status</span>
            <span className={cn(
              "px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wide border",
              center.status === 'Online'
                ? "bg-green-100 text-green-700 border-green-200"
                : "bg-neutral-bg-light text-neutral-gray-dark border-neutral-gray-light"
            )}>
              {center.status}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-neutral-black">Field</span>
            <span className="text-sm text-brand-navy-900 font-medium">{center.field}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-neutral-black">Ownership</span>
            <span className="text-sm text-neutral-gray-dark font-medium">{center.ownership}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-neutral-black">Response Time</span>
            <span className="text-sm text-brand-navy-900 font-medium">{center.responseTime || '—'}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-neutral-black">Work Days</span>
            <span className="text-sm text-neutral-gray-dark font-medium">{center.workDays || '—'}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-neutral-black">Work Hours</span>
            <span className="text-sm text-neutral-gray-dark font-medium">{center.workHours || '—'}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-neutral-black">Bookings</span>
            <span className="text-sm text-neutral-gray-dark font-medium">{center.bookingsCount}+</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-neutral-black flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-neutral-gray-medium" /> Joined
            </span>
            <span className="text-sm text-neutral-gray-dark font-medium">
              {formatJoinedDate(center.createdAt) || '—'}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-neutral-black">Rating</span>
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 text-amber-500 fill-current" />
              <span className="text-sm font-bold text-neutral-black">{center.rating}</span>
            </div>
          </div>

          <div className="pt-4 border-t border-neutral-gray-light">
            <Button className="w-full mb-3 bg-brand-navy-900 hover:bg-brand-navy-800" onClick={onBookService}>
              Book a Service
            </Button>
            <p className="text-xs text-neutral-gray-medium text-center">
              Secure booking & verified centers
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
