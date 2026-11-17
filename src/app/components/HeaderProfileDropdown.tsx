'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User, LayoutDashboard, Settings, LogOut, Heart } from 'lucide-react';
import SafeLink from './SafeLink';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';
import { Avatar } from './Avatar';

export function HeaderProfileDropdown() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!user) return null;

  const handleLogout = () => {
    setOpen(false);
    logout();
    toast.success('You have been logged out.');
    router.push('/');
  };

  const menuItems = [
    { label: 'My Profile', icon: User, path: '/profile' },
    { label: 'My Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { label: 'Settings', icon: Settings, path: '/dashboard/settings' },
  ];

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-full focus:outline-none focus:ring-2 focus:ring-brand-red-600 focus:ring-offset-2"
        aria-label="Profile menu"
      >
        <Avatar src={user.avatar} name={user.name} size="md" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-56 rounded-xl bg-white shadow-lg border border-neutral-gray-light py-2 z-50">
          <div className="px-4 py-3 border-b border-neutral-gray-light">
            <p className="text-sm font-bold text-neutral-black truncate">{user.name}</p>
            <p className="text-xs text-neutral-gray-medium truncate">{user.email}</p>
          </div>

          <div className="py-1">
            {menuItems.map(item => (
              <SafeLink
                key={item.label}
                href={item.path}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 text-sm text-neutral-gray-dark hover:bg-neutral-bg-light hover:text-brand-red-600 transition-colors"
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </SafeLink>
            ))}
          </div>

          <div className="border-t border-neutral-gray-light py-1">
            <SafeLink
              href="/support"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 text-sm text-neutral-gray-dark hover:bg-neutral-bg-light hover:text-brand-red-600 transition-colors"
            >
              <Heart className="h-4 w-4" />
              Support AfriScience Hub
            </SafeLink>
          </div>

          <div className="border-t border-neutral-gray-light pt-1">
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-brand-red-600 hover:bg-brand-red-50 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              Log Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
