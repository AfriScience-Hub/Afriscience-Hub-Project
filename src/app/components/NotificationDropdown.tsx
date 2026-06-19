'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Bell, Trophy, Users, Award, Settings, CheckCheck } from 'lucide-react';

export interface NotificationCategory {
  id: string;
  label: string;
  icon: any;
  count: number;
  path: string;
}

interface NotificationDropdownProps {
  categories: NotificationCategory[];
  totalUnread: number;
}

export function NotificationDropdown({ categories, totalUnread }: NotificationDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="relative flex items-center justify-center h-9 w-9 rounded-full hover:bg-neutral-bg-light transition-colors focus:outline-none focus:ring-2 focus:ring-brand-red-600 focus:ring-offset-2"
        aria-label="Notifications"
      >
        <Bell className="h-5 w-5 text-neutral-gray-dark" />
        {totalUnread > 0 && (
          <span className="absolute top-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-brand-red-600 text-[10px] font-bold text-white">
            {totalUnread > 9 ? '9+' : totalUnread}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 rounded-xl bg-white shadow-lg border border-neutral-gray-light z-50">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-gray-light">
            <h3 className="text-sm font-bold text-neutral-black">Notifications</h3>
            {totalUnread > 0 && (
              <Link
                href="/dashboard?tab=notifications"
                onClick={() => setOpen(false)}
                className="text-xs text-brand-red-600 hover:underline font-medium"
              >
                Mark all as read
              </Link>
            )}
          </div>

          {/* Notification Categories */}
          <div className="py-2 max-h-96 overflow-y-auto">
            {categories.length > 0 ? (
              categories.map(category => (
                <Link
                  key={category.id}
                  href={category.path}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between px-4 py-3 hover:bg-neutral-bg-light transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-brand-navy-50 group-hover:bg-brand-navy-100 transition-colors">
                      <category.icon className="h-5 w-5 text-brand-navy-900" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-neutral-black group-hover:text-brand-red-600">
                        {category.label}
                      </p>
                      <p className="text-xs text-neutral-gray-medium">
                        {category.count === 0 ? 'No new updates' : `${category.count} unread`}
                      </p>
                    </div>
                  </div>
                  {category.count > 0 && (
                    <span className="flex items-center justify-center h-6 min-w-6 px-2 rounded-full bg-brand-red-600 text-white text-[10px] font-bold">
                      {category.count > 99 ? '99+' : category.count}
                    </span>
                  )}
                </Link>
              ))
            ) : (
              <div className="px-4 py-8 text-center">
                <CheckCheck className="h-12 w-12 text-neutral-gray-medium mx-auto mb-2" />
                <p className="text-sm text-neutral-gray-medium">No notifications yet</p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-neutral-gray-light py-2">
            <Link
              href="/dashboard?tab=notifications"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-2 px-4 py-2 text-sm text-brand-red-600 hover:bg-brand-red-50 transition-colors font-medium"
            >
              View All Notifications
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
