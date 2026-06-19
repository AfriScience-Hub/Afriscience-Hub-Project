'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { ChevronDown } from 'lucide-react';
import { useAuth } from '@/app/context/AuthContext';
import { getProfileCompletion, SIDEBAR_ITEMS, PATH_TO_TAB, TAB_TO_PATH, MOCK_NOTIFICATIONS, SidebarTab } from '../data';
import { cn } from '@/lib/utils';
import Sidebar from './Sidebar';

export default function DashboardShell({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const activeTab: SidebarTab = PATH_TO_TAB[pathname] || 'overview';

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [notificationFilter, setNotificationFilter] = useState<string>('all');
  const [isNotificationSubmenuOpen, setIsNotificationSubmenuOpen] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  const handleTabChange = (tab: SidebarTab) => {
    router.push(TAB_TO_PATH[tab]);
    setIsSidebarOpen(false);
  };

  const unreadCount = MOCK_NOTIFICATIONS.filter(n => !n.read).length;
  const completion = getProfileCompletion(user!);

  return (
    <div className="min-h-screen bg-neutral-bg-light">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:hidden">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="w-full flex items-center justify-between rounded-xl border border-neutral-gray-light bg-white px-4 py-3 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <img src={user!.avatar} alt={user!.name} className="h-8 w-8 rounded-full object-cover" />
                <span className="text-sm font-bold text-neutral-black">
                  {SIDEBAR_ITEMS.find(i => i.key === activeTab)?.label}
                </span>
              </div>
              <ChevronDown className={cn("h-4 w-4 transition-transform", isSidebarOpen && "rotate-180")} />
            </button>
          </div>

          <Sidebar
            activeTab={activeTab}
            onTabChange={handleTabChange}
            user={user!}
            completion={completion}
            unreadCount={unreadCount}
            notificationFilter={notificationFilter}
            isNotificationSubmenuOpen={isNotificationSubmenuOpen}
            setNotificationFilter={setNotificationFilter}
            setIsNotificationSubmenuOpen={setIsNotificationSubmenuOpen}
            isSidebarOpen={isSidebarOpen}
          />

          <div className="flex-1 min-w-0">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
