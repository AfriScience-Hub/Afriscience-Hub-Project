'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { SidebarItem } from '../data/sidebar-nav';

interface SidebarNavItemProps {
  item: SidebarItem;
  isExpanded: boolean;
  onToggle: () => void;
  onNavigate?: () => void;
}

export default function SidebarNavItem({ item, isExpanded, onToggle, onNavigate }: SidebarNavItemProps) {
  const pathname = usePathname();
  const isActive = item.href
    ? pathname === item.href || pathname.startsWith(item.href + '/')
    : item.children?.some((child) => pathname === child.href || pathname.startsWith(child.href + '/')) ?? false;

  const isChildActiveStrict = (childHref: string, siblings: { href: string }[]) => {
    if (pathname === childHref) return true;
    if (!pathname.startsWith(childHref + '/')) return false;
    const remainder = pathname.slice(childHref.length + 1);
    return !siblings.some((s) => s.href !== childHref && remainder.startsWith(s.href.replace(childHref + '/', '')));
  };

  if (item.children) {
    return (
      <div>
        <button
          onClick={onToggle}
          className={cn(
            "w-full flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
            isActive
              ? "bg-[#453DD8] text-white"
              : "text-white hover:bg-white/10"
          )}
        >
          <item.icon className="h-4 w-4 flex-shrink-0" />
          <span className="truncate">{item.label}</span>
          <ChevronDown
            className={cn(
              "ml-auto h-4 w-4 transition-transform",
              isExpanded && "rotate-180"
            )}
          />
        </button>
        {isExpanded && (
          <div className="ml-4 mt-1 space-y-0.5">
            {item.children.map((child) => {
              const isChildActive = isChildActiveStrict(child.href, item.children!);
              return (
                <Link
                  key={child.href}
                  href={child.href}
                  onClick={onNavigate}
                  className={cn(
                    "flex items-center gap-2.5 rounded-md px-3 py-2 text-xs font-medium transition-colors",
                    isChildActive
                      ? "bg-[#453DD8] text-white"
                      : "text-white/70 hover:bg-white/10 hover:text-white"
                  )}
                >
                  <span className={cn(
                    "h-1.5 w-1.5 rounded-full flex-shrink-0",
                    isChildActive ? "bg-white" : "bg-white/40"
                  )} />
                  <span className="truncate">{child.label}</span>
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
      href={item.href!}
      onClick={onNavigate}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
        isActive
          ? "bg-[#453DD8] text-white"
          : "text-white hover:bg-white/10"
      )}
    >
      <item.icon className="h-4 w-4 flex-shrink-0" />
      <span className="truncate">{item.label}</span>
    </Link>
  );
}
