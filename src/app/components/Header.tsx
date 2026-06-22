'use client';

import Image from 'next/image';
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Menu, X, Search, ChevronDown, Building2, Beaker, Microscope, Lightbulb, Trophy, Vote, Award,
  Linkedin, Facebook, Twitter, Youtube, Instagram,
  User, LayoutDashboard, Settings, LogOut, Heart, Sparkles, HandCoins, Users as UsersIcon, TrendingUp
} from 'lucide-react';
import logoImg from "../../assets/logo.png";
import { Button } from './ui/Button';
import { cn } from '../../lib/utils';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import { useAuth } from '../context/AuthContext';
import { NotificationDropdown } from './NotificationDropdown';
import { SearchDirectory } from './SearchDirectory';

interface HeaderProps {
  isSearchOpen: boolean;
  setIsSearchOpen: (isOpen: boolean) => void;
}

const EXPLORE_GROUPS = [
  {
    label: 'Knowledge & Institutions',
    items: [
      {
        id: 'institutes',
        name: 'Institutes',
        path: '/institutes',
        description: 'Find top African research institutes and universities.',
        icon: Building2
      },
      {
        id: 'centers',
        name: 'Specialist Centers',
        path: '/specialist-centers',
        description: 'Discover specialized hubs for advanced research.',
        icon: Microscope
      },
    ]
  },
  {
    label: 'Experts & Professionals',
    items: [
      {
        id: 'scientists',
        name: 'Scientists & Technologists',
        path: '/scientists',
        description: 'Connect with leading experts across various fields.',
        icon: Beaker
      },
    ]
  },
  {
    label: 'Innovation Ecosystem',
    items: [
      {
        id: 'innovations',
        name: 'Afro-Innovations',
        path: '/innovations',
        description: 'Explore groundbreaking innovations from Africa.',
        icon: Lightbulb
      },
    ]
  },
  {
    label: 'Programs & Engagement',
    items: [
      {
        id: 'competitions',
        name: 'Competitions',
        path: '/competitions',
        description: 'Participate in challenges and win awards.',
        icon: Trophy
      },
      {
        id: 'voting',
        name: 'Voting',
        path: '/voting',
        description: 'Vote for competition finalists across Africa.',
        icon: Vote
      },
      {
        id: 'awards',
        name: 'Awards',
        path: '/awards',
        description: 'Celebrating excellence in African science and innovation.',
        icon: Award
      },
    ]
  },
];

/* ─── Profile Dropdown ─── */
function ProfileDropdown() {
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
router.push('/');
  };

  const menuItems = [
    { label: 'My Profile', icon: User, path: '/profile' },
    { label: 'My Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { label: 'Settings', icon: Settings, path: '/dashboard?tab=settings' },
  ];

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-full focus:outline-none focus:ring-2 focus:ring-brand-red-600 focus:ring-offset-2"
        aria-label="Profile menu"
      >
        <Image
          src={user.avatar}
          alt={user.name}
          width={36}
          height={36}
          className="rounded-full object-cover border-2 border-brand-navy-100 hover:border-brand-red-600 transition-colors"
        />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-56 rounded-xl bg-white shadow-lg border border-neutral-gray-light py-2 z-50">
          {/* User Info */}
          <div className="px-4 py-3 border-b border-neutral-gray-light">
            <p className="text-sm font-bold text-neutral-black truncate">{user.name}</p>
            <p className="text-xs text-neutral-gray-medium truncate">{user.email}</p>
          </div>

          {/* Menu Items */}
          <div className="py-1">
            {menuItems.map(item => (
              <Link
                key={item.label}
                href={item.path}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 text-sm text-neutral-gray-dark hover:bg-neutral-bg-light hover:text-brand-red-600 transition-colors"
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </div>

          {/* Support AfriScienceHub */}
          <div className="border-t border-neutral-gray-light py-1">
            <Link
              href="/support"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 text-sm text-neutral-gray-dark hover:bg-neutral-bg-light hover:text-brand-red-600 transition-colors"
            >
              <Heart className="h-4 w-4" />
              Support AfriScienceHub
            </Link>
          </div>

          {/* Logout */}
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

export function Header({ isSearchOpen, setIsSearchOpen }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileExploreOpen, setIsMobileExploreOpen] = useState(false);
  const [isMobileSupportOpen, setIsMobileSupportOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const router = useRouter();

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image src={logoImg.src} alt="AFRISCIENCE HUB" width={0} height={0} sizes="100vw" className="h-10 w-auto" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-2">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/" className={navigationMenuTriggerStyle()}>
                      Home
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger>Explore</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[420px] p-4 md:w-[540px] lg:w-[640px]">
                      <div className="grid gap-5 md:grid-cols-2">
                        {EXPLORE_GROUPS.map((group) => (
                          <div key={group.label}>
                            <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-widest text-brand-red-600">
                              {group.label}
                            </p>
                            <ul className="space-y-1">
                              {group.items.map((item) => (
                                <li key={item.id}>
                                  <NavigationMenuLink asChild>
                                    <Link
                                      href={item.path}
                                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-neutral-bg-light hover:text-brand-red-600 focus:bg-neutral-bg-light focus:text-brand-red-600"
                                    >
                                      <div className="flex items-center gap-2 text-sm font-medium leading-none">
                                        <item.icon className="h-4 w-4" />
                                        {item.name}
                                      </div>
                                      <p className="line-clamp-2 text-xs leading-snug text-neutral-gray-dark mt-1">
                                        {item.description}
                                      </p>
                                    </Link>
                                  </NavigationMenuLink>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/about" className={navigationMenuTriggerStyle()}>
                      About
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/contact" className={navigationMenuTriggerStyle()}>
                      Contact
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/impact" className={navigationMenuTriggerStyle()}>
                      Impact
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger>Support</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[350px] gap-3 p-4">
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            href="/support/sponsor"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-neutral-bg-light hover:text-brand-red-600 focus:bg-neutral-bg-light focus:text-brand-red-600"
                          >
                            <div className="flex items-center gap-2 text-sm font-medium leading-none">
                              <Sparkles className="h-4 w-4" />
                              Sponsor AfriScienceHub
                            </div>
                            <p className="line-clamp-2 text-xs leading-snug text-neutral-gray-dark mt-1">
                              Support the platform's overall mission and development.
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            href="/support/donate"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-neutral-bg-light hover:text-brand-red-600 focus:bg-neutral-bg-light focus:text-brand-red-600"
                          >
                            <div className="flex items-center gap-2 text-sm font-medium leading-none">
                              <HandCoins className="h-4 w-4" />
                              Donate to Projects
                            </div>
                            <p className="line-clamp-2 text-xs leading-snug text-neutral-gray-dark mt-1">
                              Support specific initiatives like competitions and research.
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            href="/support/volunteer"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-neutral-bg-light hover:text-brand-red-600 focus:bg-neutral-bg-light focus:text-brand-red-600"
                          >
                            <div className="flex items-center gap-2 text-sm font-medium leading-none">
                              <UsersIcon className="h-4 w-4" />
                              Become a Volunteer
                            </div>
                            <p className="line-clamp-2 text-xs leading-snug text-neutral-gray-dark mt-1">
                              Contribute time and expertise to grow the ecosystem.
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Actions */}
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

            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <NotificationDropdown
                  categories={[
                    { id: 'impact', label: 'Impact Applications', icon: UsersIcon, count: 3, path: '/dashboard?tab=notifications&filter=impact' },
                    { id: 'competitions', label: 'Competition Applications', icon: Trophy, count: 2, path: '/dashboard?tab=notifications&filter=competitions' },
                    { id: 'awards', label: 'Awards Given', icon: Award, count: 1, path: '/dashboard?tab=notifications&filter=awards' },
                  ]}
                  totalUnread={6}
                />
                <ProfileDropdown />
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/login">
                  <Button variant="default" size="sm" className="bg-brand-red-600 hover:bg-brand-red-700">
                    Login
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            {isAuthenticated && user?.avatar && (
              <Image
                src={user.avatar}
                alt={user.name}
                width={32}
                height={32}
                className="rounded-full object-cover border-2 border-brand-navy-100"
              />
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden border-t bg-white h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="space-y-1 px-4 py-4">

            {/* If authenticated, show user info at top */}
            {isAuthenticated && user && (
              <div className="flex items-center gap-3 px-3 py-3 mb-3 bg-neutral-bg-light rounded-lg">
                <Image src={user.avatar} alt={user.name} width={40} height={40} className="rounded-full object-cover border-2 border-brand-navy-100" />
                <div className="min-w-0">
                  <p className="text-sm font-bold text-neutral-black truncate">{user.name}</p>
                  <p className="text-xs text-neutral-gray-medium truncate">{user.email}</p>
                </div>
              </div>
            )}

            <Link
              href="/"
              className="block rounded-md px-3 py-2 text-base font-medium text-neutral-gray-dark hover:bg-neutral-bg-light hover:text-brand-red-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>

            {/* Mobile Explore Dropdown */}
            <div>
              <button
                onClick={() => setIsMobileExploreOpen(!isMobileExploreOpen)}
                className="flex w-full items-center justify-between rounded-md px-3 py-2 text-base font-medium text-neutral-gray-dark hover:bg-neutral-bg-light hover:text-brand-red-600"
              >
                Explore
                <ChevronDown
                  className={cn(
                    "h-4 w-4 transition-transform",
                    isMobileExploreOpen ? "rotate-180" : ""
                  )}
                />
              </button>
              {isMobileExploreOpen && (
                <div className="ml-4 mt-2 space-y-3 border-l-2 border-neutral-gray-light pl-4">
                  {EXPLORE_GROUPS.map((group) => (
                    <div key={group.label}>
                      <p className="px-3 pb-1 text-[10px] font-bold uppercase tracking-widest text-brand-red-600">
                        {group.label}
                      </p>
                      {group.items.map((item) => (
                        <Link
                          key={item.id}
                          href={item.path}
                          className="block rounded-md px-3 py-2 text-sm font-medium text-neutral-gray-dark hover:bg-neutral-bg-light hover:text-brand-red-600"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <div className="flex items-center gap-2">
                            <item.icon className="h-4 w-4" />
                            {item.name}
                          </div>
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/about"
              className="block rounded-md px-3 py-2 text-base font-medium text-neutral-gray-dark hover:bg-neutral-bg-light hover:text-brand-red-600"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/contact"
              className="block rounded-md px-3 py-2 text-base font-medium text-neutral-gray-dark hover:bg-neutral-bg-light hover:text-brand-red-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <Link
              href="/impact"
              className="block rounded-md px-3 py-2 text-base font-medium text-neutral-gray-dark hover:bg-neutral-bg-light hover:text-brand-red-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Impact
            </Link>

            {/* Mobile Support Dropdown */}
            <div>
              <button
                onClick={() => setIsMobileSupportOpen(!isMobileSupportOpen)}
                className="flex w-full items-center justify-between rounded-md px-3 py-2 text-base font-medium text-neutral-gray-dark hover:bg-neutral-bg-light hover:text-brand-red-600"
              >
                Support
                <ChevronDown
                  className={cn(
                    "h-4 w-4 transition-transform",
                    isMobileSupportOpen ? "rotate-180" : ""
                  )}
                />
              </button>
              {isMobileSupportOpen && (
                <div className="ml-4 mt-2 space-y-1 border-l-2 border-neutral-gray-light pl-4">
                  <Link
                    href="/support/sponsor"
                    className="block rounded-md px-3 py-2 text-sm font-medium text-neutral-gray-dark hover:bg-neutral-bg-light hover:text-brand-red-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4" />
                      Sponsor AfriScienceHub
                    </div>
                  </Link>
                  <Link
                    href="/support/donate"
                    className="block rounded-md px-3 py-2 text-sm font-medium text-neutral-gray-dark hover:bg-neutral-bg-light hover:text-brand-red-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="flex items-center gap-2">
                      <HandCoins className="h-4 w-4" />
                      Donate to Projects
                    </div>
                  </Link>
                  <Link
                    href="/support/volunteer"
                    className="block rounded-md px-3 py-2 text-sm font-medium text-neutral-gray-dark hover:bg-neutral-bg-light hover:text-brand-red-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="flex items-center gap-2">
                      <UsersIcon className="h-4 w-4" />
                      Become a Volunteer
                    </div>
                  </Link>
                </div>
              )}
            </div>

            <div className="mt-4 border-t pt-4 space-y-2">
              {isAuthenticated ? (
                <>
                  <Link href="/profile" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start gap-2">
                      <User className="h-4 w-4" /> My Profile
                    </Button>
                  </Link>
                  <Link href="/dashboard" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start gap-2">
                      <LayoutDashboard className="h-4 w-4" /> My Dashboard
                    </Button>
                  </Link>
                  <Link href="/dashboard?tab=settings" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start gap-2">
                      <Settings className="h-4 w-4" /> Settings
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-2 text-brand-red-600 hover:text-brand-red-700"
                    onClick={() => { logout(); router.push('/'); setIsMenuOpen(false); }}
                  >
                    <LogOut className="h-4 w-4" /> Log Out
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full justify-center bg-brand-red-600 hover:bg-brand-red-700">Login</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}