'use client';

import { Calendar, Clock, Star, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/app/components/ui/Button';

interface SidebarProps {
  scientist: any;
}

export default function Sidebar({ scientist }: SidebarProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-gray-light sticky top-24">
      <h3 className="text-sm font-bold text-neutral-gray-dark uppercase tracking-wider mb-4">Professional Highlights</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-neutral-black">Status</span>
          <span className={cn(
            "px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wide border",
            scientist.status === 'Online'
              ? "bg-green-100 text-green-700 border-green-200"
              : "bg-neutral-bg-light text-neutral-gray-dark border-neutral-gray-light"
          )}>
            {scientist.status}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-neutral-black">Field</span>
          <span className="text-sm text-brand-navy-900 font-medium">{scientist.field}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-neutral-black">Response Time</span>
          <span className="text-sm text-brand-navy-900 font-medium">{scientist.responseTime || 'Within 24hrs'}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-neutral-black flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 text-neutral-gray-medium" /> Work Days
          </span>
          <span className="text-sm text-neutral-gray-dark font-medium">
            {scientist.availability?.workDays || 'Mon - Fri'}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-neutral-black flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-neutral-gray-medium" /> Work Hours
          </span>
          <span className="text-sm text-neutral-gray-dark font-medium">
            {scientist.availability?.time || '9 AM - 5 PM'}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-neutral-black">Bookings</span>
          <span className="text-sm text-neutral-gray-dark font-medium">{scientist.bookingsCount || 0}+</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-neutral-black">Rating</span>
          <div className="flex items-center gap-1">
            <Star className="h-3 w-3 text-amber-500 fill-current" />
            <span className="text-sm font-bold text-neutral-black">{scientist.rating}</span>
          </div>
        </div>

        {scientist.certifications && scientist.certifications.length > 0 && (
          <div className="pt-4 border-t border-neutral-gray-light">
            <p className="text-xs font-bold text-neutral-gray-dark uppercase mb-2">Certifications</p>
            <div className="space-y-1.5">
              {scientist.certifications.slice(0, 3).map((cert: any, idx: number) => (
                <div key={idx} className="flex items-center gap-2">
                  <ShieldCheck className="h-3 w-3 text-green-600 flex-shrink-0" />
                  <span className="text-xs text-neutral-gray-dark">{cert.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="pt-4 border-t border-neutral-gray-light">
          <Button className="w-full mb-3 bg-brand-navy-900 hover:bg-brand-navy-800">
            Book Now
          </Button>
          <p className="text-xs text-neutral-gray-medium text-center">
            Secure payment & verified experts
          </p>
        </div>
      </div>
    </div>
  );
}
