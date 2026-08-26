'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { SIDEBAR_NAV } from '../data/sidebar-nav';
import SidebarNavItem from './SidebarNavItem';
import littleLogo from '../../../assets/littleLogo.png';

interface AdminSidebarProps {
  isSidebarOpen: boolean;
}

export default function AdminSidebar({ isSidebarOpen }: AdminSidebarProps) {
  const pathname = usePathname();
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
    <aside className={`w-64 flex-shrink-0 ${isSidebarOpen ? 'block' : 'hidden lg:block'}`}>
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

        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 px-2 py-2">
            <Image
              src="https://images.unsplash.com/photo-1670881391783-9c55ba592f93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwcHJvZmVzc2lvbmFsJTIwcG9ydHJhaXQlMjBoZWFkc2hvdHxlbnwxfHx8fDE3NzIzODM4NjZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Admin"
              width={40}
              height={40}
              className="rounded-full object-cover"
            />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-white truncate">Claire Iwuanyanwu</p>
              <p className="text-[10px] text-gray-400">Super Admin</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
