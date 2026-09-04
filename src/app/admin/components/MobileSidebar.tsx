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

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileSidebar({ isOpen, onClose }: MobileSidebarProps) {
  const pathname = usePathname();
  const { user } = useAppSelector((s) => s.auth);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const handleSignOut = async () => {
    onClose();
    await (dispatch as any)(logoutThunk());
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="absolute inset-y-0 left-0 w-64 bg-[#030C2C] shadow-sm overflow-hidden flex flex-col">
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src={littleLogo.src} alt="AFRISCIENCE HUB" width={40} height={40} className="h-10 w-10 object-contain" />
            <div>
              <p className="text-sm font-bold text-white">AFRISCIENCEHUB</p>
              <p className="text-[11px] text-gray-400">Admin Dashboard</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-white/10 text-white cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
          {SIDEBAR_NAV.map((item) => (
            <SidebarNavItem
              key={item.key}
              item={item}
              isExpanded={expandedItems.includes(item.key)}
              onToggle={() => toggleItem(item.key)}
              onNavigate={onClose}
            />
          ))}
        </nav>

        <div className="border-t border-white/10">
          <Link href="/admin/profile" onClick={onClose} className="p-4 flex items-center gap-3 hover:bg-white/5 transition-colors">
            <Image
              src={user?.avatar || 'https://images.unsplash.com/photo-1670881391783-9c55ba592f93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwcHJvZmVzc2lvbmFsJTIwcG9ydHJhaXQlMjBoZWFkc2hvdHxlbnwxfHx8fDE3NzIzODM4NjZ8MA&ixlib=rb-4.1.0&q=80&w=1080'}
              alt="Admin"
              width={40}
              height={40}
              className="rounded-full object-cover w-10 h-10"
            />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-white truncate">{user?.name || 'Claire Iwuanyanwu'}</p>
              <p className="text-[10px] text-gray-400 truncate">{user?.email || 'Super Admin'}</p>
            </div>
          </Link>
          <button onClick={handleSignOut} className="w-full flex items-center gap-2 px-6 py-2 text-xs font-medium text-red-300 hover:text-white hover:bg-white/10 transition-colors">
            <LogOut className="h-3.5 w-3.5" /> Sign out
          </button>
        </div>
      </div>
    </div>
  );
}
