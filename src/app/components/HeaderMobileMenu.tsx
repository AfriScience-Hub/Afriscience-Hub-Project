'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ChevronDown, User, LayoutDashboard, Settings, LogOut, Wallet, Search,
} from 'lucide-react';
import SafeLink from './SafeLink';
import { Button } from './ui/Button';
import { cn } from '../../lib/utils';
import { useAuth } from '../context/AuthContext';
import { Avatar } from './Avatar';
import { toast } from 'sonner';
import { EXPLORE_ITEMS, SUPPORT_ITEMS } from './headerNavData';

interface HeaderMobileMenuProps {
  isAuthenticated: boolean;
  mounted: boolean;
  onClose: () => void;
  onOpenSearch: () => void;
}

export function HeaderMobileMenu({ isAuthenticated, mounted, onClose, onOpenSearch }: HeaderMobileMenuProps) {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [isExploreOpen, setIsExploreOpen] = useState(false);
  const [isSupportOpen, setIsSupportOpen] = useState(false);

  const itemClass =
    'block rounded-md px-3 py-2 text-sm font-medium text-neutral-gray-dark hover:bg-neutral-bg-light hover:text-brand-red-600';
  const topClass =
    'block rounded-md px-3 py-2 text-base font-medium text-neutral-gray-dark hover:bg-neutral-bg-light hover:text-brand-red-600';

  const handleLogout = () => {
    logout();
    toast.success('You have been logged out.');
    router.push('/');
    onClose();
  };

  return (
    <div className="lg:hidden border-t bg-white h-[calc(100vh-4rem)] overflow-y-auto">
      <div className="space-y-1 px-4 py-4">
        {mounted && isAuthenticated && user && (
          <div className="flex items-center gap-3 px-3 py-3 mb-3 bg-neutral-bg-light rounded-lg">
            <Avatar src={user.avatar} name={user.name} size="md" />
            <div className="min-w-0">
              <p className="text-sm font-bold text-neutral-black truncate">{user.name}</p>
              <p className="text-xs text-neutral-gray-medium truncate">{user.email}</p>
            </div>
          </div>
        )}

        <button
          onClick={() => { onClose(); onOpenSearch(); }}
          className="mb-2 flex w-full items-center gap-2 rounded-lg border border-neutral-gray-light bg-neutral-bg-light px-3 py-2.5 text-left text-sm text-neutral-gray-medium hover:border-brand-red-600/50 hover:bg-white transition-colors"
        >
          <Search className="h-4 w-4 text-brand-red-600" />
          Search the ecosystem...
        </button>

        <SafeLink href="/" className={topClass} onClick={onClose}>Home</SafeLink>

        <div>
          <button
            onClick={() => setIsExploreOpen(!isExploreOpen)}
            className="flex w-full items-center justify-between rounded-md px-3 py-2 text-base font-medium text-neutral-gray-dark hover:bg-neutral-bg-light hover:text-brand-red-600 cursor-pointer"
          >
            Explore
            <ChevronDown className={cn('h-4 w-4 transition-transform', isExploreOpen && 'rotate-180')} />
          </button>
          {isExploreOpen && (
            <div className="ml-4 mt-2 space-y-1 border-l-2 border-neutral-gray-light pl-4">
              {EXPLORE_ITEMS.map((item) => (
                <SafeLink key={item.id} href={item.path} className={itemClass} onClick={onClose}>
                  <div className="flex items-center gap-2">
                    <item.icon className="h-4 w-4 text-brand-red-600" />
                    {item.name}
                  </div>
                </SafeLink>
              ))}
            </div>
          )}
        </div>

        <SafeLink href="/about" className={topClass} onClick={onClose}>About</SafeLink>
        <SafeLink href="/contact" className={topClass} onClick={onClose}>Contact</SafeLink>
        <SafeLink href="/impact" className={topClass} onClick={onClose}>Impact</SafeLink>

        <div>
          <button
            onClick={() => setIsSupportOpen(!isSupportOpen)}
            className="flex w-full items-center justify-between rounded-md px-3 py-2 text-base font-medium text-neutral-gray-dark hover:bg-neutral-bg-light hover:text-brand-red-600 cursor-pointer"
          >
            Support
            <ChevronDown className={cn('h-4 w-4 transition-transform', isSupportOpen && 'rotate-180')} />
          </button>
          {isSupportOpen && (
            <div className="ml-4 mt-2 space-y-1 border-l-2 border-neutral-gray-light pl-4">
              {SUPPORT_ITEMS.map((item) => (
                <SafeLink key={item.id} href={item.path} className={itemClass} onClick={onClose}>
                  <div className="flex items-center gap-2">
                    <item.icon className="h-4 w-4 text-brand-red-600" />
                    {item.name}
                  </div>
                </SafeLink>
              ))}
            </div>
          )}
        </div>

        <div className="mt-4 border-t pt-4 space-y-2">
          {mounted && isAuthenticated ? (
            <>
              <SafeLink href="/dashboard/my-profile?tab=wallet" onClick={onClose}>
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <Wallet className="h-4 w-4" /> Wallet
                </Button>
              </SafeLink>
              <SafeLink href="/profile" onClick={onClose}>
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <User className="h-4 w-4" /> My Profile
                </Button>
              </SafeLink>
              <SafeLink href="/dashboard" onClick={onClose}>
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <LayoutDashboard className="h-4 w-4" /> My Dashboard
                </Button>
              </SafeLink>
              <SafeLink href="/dashboard/settings" onClick={onClose}>
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <Settings className="h-4 w-4" /> Settings
                </Button>
              </SafeLink>
              <Button
                variant="ghost"
                className="w-full justify-start gap-2 text-brand-red-600 hover:text-brand-red-700"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4" /> Log Out
              </Button>
            </>
          ) : (
            <SafeLink href="/login" onClick={onClose}>
              <Button className="w-full justify-center bg-brand-red-600 hover:bg-brand-red-700">Login</Button>
            </SafeLink>
          )}
        </div>
      </div>
    </div>
  );
}
