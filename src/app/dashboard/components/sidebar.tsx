'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import {
  Award,
  Bell,
  BriefcaseBusiness,
  CalendarCheck,
  ChevronDown,
  FileText,
  Grid2X2,
  HandHeart,
  MessageCircle,
  Plus,
  Settings,
  ShieldCheck,
  Star,
  Trophy,
  UploadCloud,
  User,
  UsersRound,
} from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { label: 'Overview', href: '/dashboard/overview', icon: Grid2X2 },
  { label: 'My Profile', href: '/dashboard/my-profile', icon: User },
  { label: 'My Listings', href: '/dashboard/my-listings', icon: FileText },
  { label: 'Upload New Listing', href: '/dashboard/upload-new-listing', icon: UploadCloud, plus: true },
  { label: 'My Services', href: '/dashboard/my-services', icon: BriefcaseBusiness },
  { label: 'Messages', href: '/dashboard/messages', icon: MessageCircle, badge: 2 },
  { label: 'Invoices', href: '/dashboard/invoices', icon: FileText },
  { label: 'Donations', href: '/dashboard/donations', icon: HandHeart },
  { label: 'Notifications', href: '/dashboard/notifications', icon: Bell, badge: 3, dropdown: true },
  { label: 'Reviews', href: '/dashboard/reviews', icon: Star },
  { label: 'Verification Status', href: '/dashboard/verification-status', icon: ShieldCheck },
  { label: 'Settings', href: '/dashboard/settings', icon: Settings },
];

const notificationFilters = [
  { label: 'All Notifications', value: 'all', icon: Bell },
  { label: 'Impact Applications', value: 'impact', icon: UsersRound },
  { label: 'Competition Applications', value: 'competition', icon: Trophy },
  { label: 'Awards Given', value: 'awards', icon: Award },
  { label: 'Messages', value: 'messages', icon: MessageCircle },
  { label: 'Invoices', value: 'invoices', icon: FileText },
  { label: 'Bookings', value: 'bookings', icon: CalendarCheck },
];

export default function Sidebar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [notificationsOpen, setNotificationsOpen] = useState(pathname === '/dashboard/notifications');
  const [mobileOpen, setMobileOpen] = useState(false);
  const currentFilter = searchParams.get('filter') ?? 'all';

  const asideContent = (
    <>
      <div className="bg-[#082947] px-5 py-5 text-white">
        <div className="flex items-center gap-3">
          <Image
            src="/dashboard-avatar.png"
            alt="Wisdomcezeh"
            width={54}
            height={54}
            className="h-14 w-14 rounded-full border-2 border-white/70 object-cover grayscale"
          />
          <div className="min-w-0">
            <h2 className="truncate text-base font-bold leading-tight">Wisdomcezeh</h2>
            <p className="truncate text-sm text-slate-300">wisdomcezeh@gmail.com</p>
          </div>
        </div>
        <div className="mt-6">
          <div className="mb-2 flex items-center justify-between text-xs font-bold uppercase tracking-wide text-slate-200">
            <span>Profile Completion</span>
            <span className="text-white">71%</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-slate-500/80">
            <div className="h-full rounded-full bg-slate-300" style={{ width: '71%' }} />
          </div>
        </div>
      </div>

      <nav className="space-y-3 px-6 py-6">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          if (item.dropdown) {
            return (
              <div key={item.href}>
                <div className="flex items-center gap-3">
                  <Link
                    href={item.href}
                    className={`flex min-w-0 flex-1 cursor-pointer items-center gap-4 py-1 text-base font-semibold ${
                      active ? 'text-red-500' : 'text-slate-600 hover:text-red-500'
                    }`}
                  >
                    <Icon size={20} strokeWidth={1.8} />
                    <span className="truncate">{item.label}</span>
                  </Link>
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-red-500 text-xs font-bold text-white">
                    {item.badge}
                  </span>
                  <button
                    type="button"
                    onClick={() => setNotificationsOpen((open) => !open)}
                    className={`grid h-7 w-7 cursor-pointer place-items-center rounded-full ${active ? 'text-red-500' : 'text-slate-600'}`}
                    aria-label="Toggle notification filters"
                  >
                    <ChevronDown size={16} className={notificationsOpen ? 'rotate-180 transition-transform' : 'transition-transform'} />
                  </button>
                </div>
                {notificationsOpen && (
                  <div className="ml-10 mt-4 space-y-4">
                    {notificationFilters.map((filter) => {
                      const FilterIcon = filter.icon;
                      const selected = currentFilter === filter.value;

                      return (
                        <Link
                          key={filter.value}
                          href={`/dashboard/notifications?filter=${filter.value}`}
                          className={`flex cursor-pointer items-center gap-4 text-sm font-semibold ${
                            selected ? 'text-red-500' : 'text-slate-400 hover:text-slate-600'
                          }`}
                        >
                          <FilterIcon size={18} strokeWidth={1.8} />
                          <span>{filter.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex cursor-pointer items-center gap-4 py-1 text-base font-semibold ${
                active ? 'text-red-500' : 'text-slate-600 hover:text-red-500'
              }`}
            >
              <Icon size={20} strokeWidth={1.8} />
              <span className="min-w-0 flex-1 truncate">{item.label}</span>
              {item.plus && <Plus size={16} className="text-red-500" />}
              {item.badge ? (
                <span className="grid h-7 w-7 place-items-center rounded-full bg-red-500 text-xs font-bold text-white">
                  {item.badge}
                </span>
              ) : null}
            </Link>
          );
        })}
      </nav>
    </>
  );

  return (
    <>
      <div className="w-full lg:hidden">
        <button
          type="button"
          onClick={() => setMobileOpen((open) => !open)}
          className={`w-full cursor-pointer overflow-hidden border border-gray-200 bg-white text-left shadow-sm ${
            mobileOpen ? 'rounded-t-2xl' : 'rounded-2xl'
          }`}
        >
          <div className="flex items-center gap-3 px-5 py-5">
            <Image
              src="/dashboard-avatar.png"
              alt="Wisdomcezeh"
              width={52}
              height={52}
              className="h-12 w-12 rounded-full border-2 border-gray-200 object-cover grayscale"
            />
            <div className="min-w-0 flex-1">
              <h2 className="truncate text-base font-bold text-gray-950">Wisdomcezeh</h2>
              <p className="truncate text-sm text-gray-500">wisdomcezeh@gmail.com</p>
            </div>
            <ChevronDown
              size={18}
              className={`text-gray-700 transition-transform ${mobileOpen ? 'rotate-180' : ''}`}
            />
          </div>
        </button>

        {mobileOpen && (
          <aside className="overflow-hidden rounded-b-2xl border-x border-b border-gray-200 bg-white shadow-sm">
            {asideContent}
          </aside>
        )}
      </div>

      <aside className="hidden w-72 shrink-0 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm lg:block">
        {asideContent}
      </aside>
    </>
  );
}
