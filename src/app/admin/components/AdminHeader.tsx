'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, Bell, ChevronDown, User, LogOut } from 'lucide-react';
import Image from 'next/image';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { logoutThunk } from '@/store/authSlice';
import { toast } from 'sonner';

interface AdminHeaderProps {
  onToggleSidebar?: () => void;
}

export default function AdminHeader({ onToggleSidebar }: AdminHeaderProps) {
  const { user } = useAppSelector((s) => s.auth);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleLogout = async () => {
    await dispatch(logoutThunk() as any);
    toast.success('Signed out');
    router.replace('/admin/login');
  };

  const displayName = user?.name || 'Claire Iwuanyanwu';
  const displayEmail = user?.email || 'admin@afrisciencehub.com';

  return (
    <header className="h-16 border-b border-neutral-gray-light bg-white flex items-center justify-between px-6">
      <div className="flex items-center gap-4 flex-1">
        <button onClick={onToggleSidebar} className="lg:hidden p-2 rounded-lg hover:bg-neutral-bg-light cursor-pointer">
          <svg className="h-5 w-5 text-neutral-gray-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div className="relative flex-1 max-w-xl">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-gray-medium" />
          <input
            type="text"
            placeholder="Search users, listings, invoices, messages..."
            className="w-full pl-10 pr-4 py-2 text-sm rounded-lg border border-neutral-gray-light bg-neutral-bg-light focus:bg-white focus:border-brand-red-600 focus:ring-1 focus:ring-brand-red-600 outline-none transition-colors"
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:inline-flex items-center gap-0.5 rounded border border-neutral-gray-light bg-white px-1.5 py-0.5 text-[10px] font-medium text-neutral-gray-medium">
            ⌘K
          </kbd>
        </div>
      </div>

      <div className="flex items-center gap-3 ml-4">
        <button className="relative p-2 rounded-lg hover:bg-neutral-bg-light transition-colors cursor-pointer">
          <Bell className="h-5 w-5 text-neutral-gray-dark" />
          <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-red-500 text-[9px] font-bold text-white flex items-center justify-center">
            12
          </span>
        </button>

        <div ref={ref} className="relative">
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex items-center gap-2 pl-3 border-l border-neutral-gray-light cursor-pointer"
          >
            <Image
              src={user?.avatar || 'https://images.unsplash.com/photo-1670881391783-9c55ba592f93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwcHJvZmVzc2lvbmFsJTIwcG9ydHJhaXQlMjBoZWFkc2hvdHxlbnwxfHx8fDE3NzIzODM4NjZ8MA&ixlib=rb-4.1.0&q=80&w=1080'}
              alt="Admin"
              width={36}
              height={36}
              className="rounded-full object-cover w-10 h-10"
            />
            <div className="hidden sm:block text-left">
              <p className="text-sm font-semibold text-neutral-black leading-none">{displayName}</p>
              <p className="text-[10px] text-neutral-gray-medium">Super Admin</p>
            </div>
            <ChevronDown className={`h-4 w-4 text-neutral-gray-medium transition-transform ${open ? 'rotate-180' : ''}`} />
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-56 rounded-xl border border-neutral-gray-light bg-white shadow-lg overflow-hidden z-50">
              <div className="px-4 py-3 border-b border-neutral-gray-light">
                <p className="text-sm font-semibold text-neutral-black truncate">{displayName}</p>
                <p className="text-xs text-neutral-gray-medium truncate">{displayEmail}</p>
              </div>
              <div className="py-1">
                <Link
                  href="/admin/profile"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 px-4 py-2.5 text-sm text-neutral-gray-dark hover:bg-neutral-bg-light transition-colors"
                >
                  <User className="h-4 w-4" /> View Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors text-left"
                >
                  <LogOut className="h-4 w-4" /> Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
