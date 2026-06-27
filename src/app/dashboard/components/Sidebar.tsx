'use client';

import Image from 'next/image';
import { Bell, ChevronDown, Plus, Users as UsersIcon, Trophy, Award, MessageCircle, FileText, CalendarCheck } from 'lucide-react';
import { SIDEBAR_ITEMS, SidebarTab } from '../data';
import { cn } from '@/lib/utils';

interface SidebarProps {
  activeTab: SidebarTab;
  onTabChange: (tab: SidebarTab) => void;
  user: { name: string; email: string; avatar: string };
  completion: { pct: number; checks: { label: string; done: boolean }[] };
  unreadCount: number;
  notificationFilter: string;
  isNotificationSubmenuOpen: boolean;
  setNotificationFilter: (filter: any) => void;
  setIsNotificationSubmenuOpen: (open: boolean) => void;
  isSidebarOpen: boolean;
}

export default function Sidebar({
  activeTab, onTabChange, user, completion, unreadCount,
  notificationFilter, isNotificationSubmenuOpen,
  setNotificationFilter, setIsNotificationSubmenuOpen, isSidebarOpen
}: SidebarProps) {
  return (
    <aside className={cn("w-full lg:w-64 flex-shrink-0", !isSidebarOpen && "hidden lg:block")}>
      <div className="rounded-xl border border-neutral-gray-light bg-white shadow-sm overflow-hidden">
        <div className="p-5 border-b border-neutral-gray-light bg-gradient-to-br from-brand-navy-900 to-brand-navy-800">
          <div className="flex items-center gap-3">
            <Image src={user.avatar} alt={user.name} width={44} height={44} className="rounded-full object-cover border-2 border-white/30 h-12 w-12" />
            <div className="min-w-0">
              <p className="text-sm font-bold text-white truncate">{user.name}</p>
              <p className="text-[11px] text-white/60 truncate">{user.email}</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-bold text-white/70 uppercase tracking-wider">Profile Completion</span>
              <span className="text-[11px] font-bold text-white">{completion.pct}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-white/20 overflow-hidden">
              <div className="h-full rounded-full bg-brand-red-500 transition-all duration-500" style={{ width: `${completion.pct}%` }} />
            </div>
          </div>
        </div>

        <nav className="p-2">
          {SIDEBAR_ITEMS.map(item => (
            <div key={item.key}>
              {item.key === 'notifications' ? (
                <div>
                  <button
                    onClick={() => {
                      onTabChange(item.key);
                      setIsNotificationSubmenuOpen(!isNotificationSubmenuOpen);
                    }}
                    className={cn(
                      "w-full flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                      activeTab === item.key
                        ? "bg-brand-red-50 text-brand-red-600"
                        : "text-neutral-gray-dark hover:bg-neutral-bg-light hover:text-brand-navy-900"
                    )}
                  >
                    <item.icon className="h-4 w-4 flex-shrink-0" />
                    <span className="truncate">{item.label}</span>
                    {unreadCount > 0 && (
                      <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-red-600 px-1.5 text-[10px] font-bold text-white">{unreadCount}</span>
                    )}
                    <ChevronDown className={cn("h-4 w-4 transition-transform", isNotificationSubmenuOpen ? "rotate-180" : "")} />
                  </button>

                  {isNotificationSubmenuOpen && (
                    <div className="ml-7 mt-1 space-y-0.5">
                      {[
                        { key: 'all' as const, label: 'All Notifications', icon: Bell },
                        { key: 'impact' as const, label: 'Impact Applications', icon: UsersIcon },
                        { key: 'competitions' as const, label: 'Competition Applications', icon: Trophy },
                        { key: 'awards' as const, label: 'Awards Given', icon: Award },
                        { key: 'messages' as const, label: 'Messages', icon: MessageCircle },
                        { key: 'invoices' as const, label: 'Invoices', icon: FileText },
                        { key: 'bookings' as const, label: 'Bookings', icon: CalendarCheck },
                      ].map(subItem => (
                        <button
                          key={subItem.key}
                          onClick={() => {
                            setNotificationFilter(subItem.key);
                            onTabChange('notifications');
                          }}
                          className={cn(
                            "w-full flex cursor-pointer items-center gap-2.5 rounded-md px-3 py-2 text-xs font-medium transition-colors",
                            notificationFilter === subItem.key && activeTab === 'notifications'
                              ? "bg-brand-red-50 text-brand-red-600"
                              : "text-neutral-gray-medium hover:bg-neutral-bg-light hover:text-brand-navy-900"
                          )}
                        >
                          <subItem.icon className="h-3.5 w-3.5 flex-shrink-0" />
                          <span className="truncate">{subItem.label}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => onTabChange(item.key)}
                  className={cn(
                    "w-full flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    activeTab === item.key
                      ? "bg-brand-red-50 text-brand-red-600"
                      : "text-neutral-gray-dark hover:bg-neutral-bg-light hover:text-brand-navy-900"
                  )}
                >
                  <item.icon className="h-4 w-4 flex-shrink-0" />
                  <span className="truncate">{item.label}</span>
                  {item.key === 'messages' && unreadCount > 0 && (
                    <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-red-600 px-1.5 text-[10px] font-bold text-white">2</span>
                  )}
                  {item.key === 'upload' && (
                    <Plus className="ml-auto h-3.5 w-3.5 text-brand-red-600" />
                  )}
                </button>
              )}
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
}
