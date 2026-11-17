'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import SafeLink from './SafeLink';
import { Menu, X, Search, MessageSquare, FileText, Receipt, Banknote } from 'lucide-react';
import logoImg from '../../assets/logo.png';
import { Button } from './ui/Button';
import { useAuth } from '../context/AuthContext';
import { NotificationDropdown } from './NotificationDropdown';
import { Avatar } from './Avatar';
import { HeaderDesktopNav } from './HeaderDesktopNav';
import { HeaderMobileMenu } from './HeaderMobileMenu';
import { HeaderProfileDropdown } from './HeaderProfileDropdown';
import { HeaderWalletButton } from './HeaderWalletButton';

interface HeaderProps {
  isSearchOpen?: boolean;
  setIsSearchOpen: (isOpen: boolean) => void;
}

const NOTIFICATION_SHORTCUTS = [
  { id: 'messages', label: 'Messages', icon: MessageSquare, count: 3, path: '/dashboard/messages' },
  { id: 'submissions', label: 'Submissions', icon: FileText, count: 2, path: '/dashboard/submissions' },
  { id: 'invoices', label: 'Invoices', icon: Receipt, count: 2, path: '/dashboard/invoices' },
  { id: 'payouts', label: 'Payouts', icon: Banknote, count: 1, path: '/dashboard/payout' },
];

const NOTIFICATION_TOTAL = NOTIFICATION_SHORTCUTS.reduce((sum, item) => sum + item.count, 0);

export function Header({ setIsSearchOpen }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { isAuthenticated, user } = useAuth();

  useEffect(() => { setMounted(true); }, []);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-black bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <SafeLink href="/" className="flex items-center">
              <Image src={logoImg.src} alt="AFRISCIENCE HUB" width={0} height={0} sizes="100vw" className="h-10 w-auto" />
            </SafeLink>
          </div>

          <HeaderDesktopNav />

          <div className="hidden lg:flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Search"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search className="h-5 w-5" />
            </Button>
            <div className="h-6 w-px bg-neutral-gray-light" />

            {mounted && isAuthenticated ? (
              <div className="flex items-center gap-3">
                <HeaderWalletButton />
                <NotificationDropdown categories={NOTIFICATION_SHORTCUTS} totalUnread={NOTIFICATION_TOTAL} />
                <HeaderProfileDropdown />
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <SafeLink href="/login">
                  <Button variant="default" size="sm" className="bg-brand-red-600 hover:bg-brand-red-700">
                    Login
                  </Button>
                </SafeLink>
              </div>
            )}
          </div>

          <div className="lg:hidden flex items-center gap-2">
            {mounted && isAuthenticated && <HeaderWalletButton compact />}
            {mounted && isAuthenticated && user && (
              <Avatar src={user.avatar} name={user.name} size="md" />
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <HeaderMobileMenu
          isAuthenticated={isAuthenticated}
          mounted={mounted}
          onClose={() => setIsMenuOpen(false)}
          onOpenSearch={() => setIsSearchOpen(true)}
        />
      )}
    </nav>
  );
}
