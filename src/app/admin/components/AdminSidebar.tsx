'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X, LogOut } from 'lucide-react';
import { SIDEBAR_NAV } from '../data/sidebar-nav';
import SidebarNavItem from './SidebarNavItem';
import littleLogo from '../../../assets/littleLogo.png';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { logoutThunk } from '@/store/authSlice';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Avatar } from '@/app/components/Avatar';

export default function AdminSidebar() {
  const pathname = usePathname();
  const { user } = useAppSelector((s) => s.auth);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const handleSignOut = () => {
    void (dispatch as any)(logoutThunk());
    toast.success('Signed out');
    router.replace('/admin/login');
  };
  const [expandedItems, setExpandedItems] = useState<string[]>(() => {
    const expanded: string[] = [];
    for (const item of SIDEBAR_NAV) {
      if (item.children?.some((child) => pathname.startsWith(child.href))) {
        expanded.push(item.key);
      }
    }
    return expanded;
  });

  const toggleItem = (key: string) => {
    setExpandedItems((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  return (
    <aside className="w-64 flex-shrink-0 hidden lg:block">
      <div className="fixed w-64 h-screen bg-[#030C2C] shadow-sm overflow-hidden flex flex-col">
        <div className="p-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <Image src={littleLogo.src} alt="AFRISCIENCE HUB" width={40} height={40} className="h-10 w-10 object-contain" />
            <div>
              <p className="text-sm font-bold text-white">AFRISCIENCEHUB</p>
              <p className="text-[11px] text-gray-400">Admin Dashboard</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
          {SIDEBAR_NAV.map((item) => (
            <SidebarNavItem
              key={item.key}
              item={item}
              isExpanded={expandedItems.includes(item.key)}
              onToggle={() => toggleItem(item.key)}
            />
          ))}
        </nav>

        <div className="border-t border-white/10">
          <Link href="/admin/profile" className="p-4 block hover:bg-white/5 transition-colors">
            <div className="flex items-center gap-3 px-2 py-2">
              <Avatar src={user?.avatar} name={user?.name || 'Admin'} size="md" />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-white truncate">{user?.name || 'Claire Iwuanyanwu'}</p>
                <p className="text-[10px] text-gray-400 truncate">{user?.email || 'Super Admin'}</p>
              </div>
            </div>
          </Link>
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-2 px-6 py-2 text-xs font-medium text-red-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <LogOut className="h-3.5 w-3.5" /> Sign out
          </button>
        </div>
      </div>
    </aside>
  );
}
