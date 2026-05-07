'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Search, 
  ChevronDown, 
  Building2, 
  Microscope, 
  Lightbulb, 
  Users, 
  Trophy, 
  Vote, 
  Award, 
  Stars, 
  HandHeart, 
  Users2,
  Menu,
  X,
  Bell,
  Settings,
  LogOut,
  User,
  LayoutDashboard,
  Heart,
} from 'lucide-react';

interface HeaderProps {
  onSearchOpen: () => void;
}

export default function Header({ onSearchOpen }: HeaderProps) {
  const [exploreOpen, setExploreOpen] = useState(false);
  const [supportOpen, setSupportOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileProfileOpen, setMobileProfileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    if (typeof window !== 'undefined') {
      return !!localStorage.getItem('userLogin');
    }
    return false;
  });
  const userName = typeof window !== 'undefined' ? (localStorage.getItem('userName') || 'User') : 'User';
  const userEmail = typeof window !== 'undefined' ? (localStorage.getItem('userEmail') || 'user@example.com') : 'user@example.com';

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-md border-b border-gray-200 mb-32 md:mb-5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"> 
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div className="shrink-0">
            <Link href="/">
              <Image
                src="/logo.png"
                alt="AfriScience Hub"
                width={160}
                height={160}
              className="h-10 w-auto"
              priority
            />
            </Link>
          </div>

          {/* Navigation - Desktop Only */}
          <nav className="hidden lg:flex items-center gap-8 text-sm">
            
            <Link 
              href="/" 
              className="text-gray-900 hover:text-gray-600 font-medium transition-colors"
            >
              Home
            </Link>

            {/* Explore Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setExploreOpen(true)}
              onMouseLeave={() => setExploreOpen(false)}
            >
              <button className="cursor-pointer flex items-center gap-1 text-gray-900 hover:text-gray-600 font-medium transition-colors">
                Explore
                <ChevronDown 
                  size={16} 
                  className={`transition-transform duration-200 ${exploreOpen ? 'rotate-180' : ''}`} 
                />
              </button>

              {/* Explore Dropdown */}
              {exploreOpen && (
                <div className="absolute -left-16 mt-0 w-180 bg-white rounded-2xl shadow-xl border border-gray-100 p-8 top-full z-50">
                  <div className="grid grid-cols-2 gap-x-12 gap-y-8">
                    
                    {/* Left Column */}
                    <div>
                      <h3 className="text-red-600 font-bold text-xs uppercase tracking-wide mb-4">
                        KNOWLEDGE & INSTITUTIONS
                      </h3>
                      <div className="space-y-6">
                        <Link href="/institutions" >
                          <div className='my-2 p-2 rounded-sm hover:bg-gray-100'>
                            <div className="flex items-center gap-2 mb-1">
                            <Building2 className="text-red-600" size={20} />
                            <h4 className="font-semibold text-gray-900">Institutes</h4>
                            </div>
                            <p className="text-sm text-gray-600">
                              Find top African research institutes and universities.
                            </p>
                          </div>                          
                        </Link>

                        <div>
                          <Link href="/centers" >
                            <div className='my-2 p-2 rounded-sm hover:bg-gray-100'>
                              <div className="flex items-center gap-2 mb-1">
                                <Microscope className="text-red-600" size={20} />
                                <h4 className="font-semibold text-gray-900">Specialist Centers</h4>
                              </div>
                              <p className="text-sm text-gray-600">
                                Discover specialized hubs for advanced research.
                              </p>
                            </div>
                          </Link>                          
                        </div>
                      </div>

                      <h3 className="text-red-600 font-bold text-xs uppercase tracking-wide mb-4 mt-8">
                        INNOVATION ECOSYSTEM
                      </h3>
                      <div>
                        <Link href="/innovations" >
                          <div className='my-2 p-2 rounded-sm hover:bg-gray-100'>
                            <div className="flex items-center gap-2 mb-1">
                              <Lightbulb className="text-red-600" size={20} />
                              <h4 className="font-semibold text-gray-900">Afro-Innovations</h4>
                            </div>
                            <p className="text-sm text-gray-600">
                              Explore groundbreaking innovations from Africa.
                            </p>
                          </div>
                        </Link>                        
                      </div>
                    </div>

                    {/* Right Column */}
                    <div>
                      <h3 className="text-red-600 font-bold text-xs uppercase tracking-wide mb-4">
                        EXPERTS & PROFESSIONALS
                      </h3>
                      <div className="mb-8">
                        <Link href="/scientists" >
                          <div className='my-2 p-2 rounded-sm hover:bg-gray-100'>
                            <div className="flex items-center gap-2 mb-1">
                              <Users className="text-red-600" size={20} />
                              <h4 className="font-semibold text-gray-900">Scientists & Technologists</h4>
                            </div>
                            <p className="text-sm text-gray-600">
                              Connect with leading experts across various fields.
                            </p>
                          </div>
                        </Link>                        
                      </div>

                      <h3 className="text-red-600 font-bold text-xs uppercase tracking-wide mb-4">
                        PROGRAMS & ENGAGEMENT
                      </h3>
                      <div className="space-y-6">
                        <Link href="/competitions" >
                          <div className='my-2 p-2 rounded-sm hover:bg-gray-100'>
                            <div className="flex items-center gap-2 mb-1">
                            <Trophy className="text-red-600" size={20} />
                            <h4 className="font-semibold text-gray-900">Competitions</h4>
                          </div>
                          <p className="text-sm text-gray-600">
                            Participate in challenges and win awards.
                          </p>
                          </div>
                        </Link>

                        <div>
                          <Link href="/voting">
                            <div className='my-2 p-2 rounded-sm hover:bg-gray-100'>
                              <div className="flex items-center gap-2 mb-1">
                                <Vote className="text-red-600" size={20} />
                                <h4 className="font-semibold text-gray-900">Voting</h4>
                              </div>
                              <p className="text-sm text-gray-600">
                                Vote for competition finalists across Africa.
                              </p>
                            </div>
                          </Link>                         
                        </div>

                        <div>
                          <Link href="/awards">
                            <div className='my-2 p-2 rounded-sm hover:bg-gray-100'>
                               <div className="flex items-center gap-2 mb-1">
                                <Award className="text-red-600" size={20} />
                                <h4 className="font-semibold text-gray-900">Awards</h4>
                              </div>
                              <p className="text-sm text-gray-600">
                                Celebrating excellence in African science and innovation.
                              </p>
                            </div>
                          </Link>                         
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link 
              href="/about" 
              className="text-gray-900 hover:text-gray-600 font-medium transition-colors"
            >
              About
            </Link>

            <Link 
              href="/contact" 
              className="text-gray-900 hover:text-gray-600 font-medium transition-colors"
            >
              Contact
            </Link>

            <Link
              href="/impact"
              className="text-gray-900 hover:text-gray-600 font-medium transition-colors"
            >
              Impact
            </Link>

            {/* Support Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setSupportOpen(true)}
              onMouseLeave={() => setSupportOpen(false)}
            >
              <button className="flex items-center gap-1 text-gray-900 cursor-pointer hover:text-gray-600 font-medium transition-colors">
                Support
                <ChevronDown 
                  size={16} 
                  className={`transition-transform duration-200 ${supportOpen ? 'rotate-180' : ''}`} 
                />
              </button>

              {/* Support Dropdown */}
              {supportOpen && (
                <div className="absolute -right-16 mt-0 w-100 bg-white rounded-2xl shadow-xl border border-gray-100 p-6 top-full z-50">
                  <div className="space-y-8">
                    <Link href="/support/sponsor">
                      <div className='my-2 p-2 rounded-sm hover:bg-gray-100'>
                        <div className="flex items-center gap-2 mb-1">
                          <Stars className="text-red-600" size={16} />
                          <h4 className="font-semibold text-gray-900">Sponsor AfriScienceHub</h4>
                        </div>
                        <p className="text-sm text-gray-600">
                          Support the platform&apos;s overall mission and development.
                        </p>
                      </div>
                    </Link>
                    
                    <Link href="/support/donate">
                      <div className='my-2 p-2 rounded-sm hover:bg-gray-100'>
                        <div className="flex items-center gap-2 mb-1">
                        <HandHeart className="text-red-600" size={16} />
                        <h4 className="font-semibold text-gray-900">Donate to Projects</h4>
                      </div>
                      <p className="text-sm text-gray-600">
                        Support specific initiatives like competitions and research.
                      </p>
                      </div>
                    </Link>

                    <Link href="/support/volunteer">
                      <div className='my-2 p-2 rounded-sm hover:bg-gray-100'>
                        <div className="flex items-center gap-2 mb-1">
                        <Users2 className="text-red-600" size={16} />
                        <h4 className="font-semibold text-gray-900">Become a Volunteer</h4>
                      </div>
                      <p className="text-sm text-gray-600">
                        Contribute time and expertise to grow the ecosystem.
                      </p>
                      </div>
                    </Link>

                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Right Side: Search + Notifications + Profile (Desktop) + Mobile Menu Button */}
          <div className="flex items-center gap-4">
            {/* Search + Notifications + Profile - Desktop Only */}
            <div className="hidden md:flex items-center gap-4">
              <button 
                onClick={onSearchOpen}
                className="p-2 text-gray-700 hover:text-gray-900 transition-colors cursor-pointer"
              >
                <Search size={20} />
              </button>

              <div className="h-8 w-px bg-gray-200" />

              {/* Notifications Dropdown - only show if logged in */}
              {isLoggedIn && (
                <div className="relative">
                  <button
                    onClick={() => setNotificationOpen(!notificationOpen)}
                    className="relative cursor-pointer p-2 text-gray-700 transition-colors hover:text-gray-900"
                  >
                    <Bell size={22} />
                    <span className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">6</span>
                  </button>

                  {notificationOpen && (
                    <div className="absolute right-0 z-50 mt-2 w-80 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl">
                      <div className="flex items-center justify-between border-b border-gray-100 px-4 py-4">
                        <div className="flex items-center gap-3">
                          <Bell size={20} className="text-red-600" />
                          <h3 className="text-base font-semibold text-gray-900">Recent Activity</h3>
                        </div>
                        <Link
                          href="/dashboard/notifications?filter=all"
                          className="cursor-pointer text-sm font-semibold text-red-600"
                          onClick={() => setNotificationOpen(false)}
                        >
                          View All
                        </Link>
                      </div>
                      <div>
                        {[
                          ['New message from Dr. Wanjiku Muthoni', '2 hours ago'],
                          ['Invoice #INV-2024-0045 received from TechConsult Services', '3 hours ago'],
                          ['New service booking request received', '5 hours ago'],
                          ['Your SolaPump Pro listing reached 12k views', '1 day ago'],
                        ].map(([title, time]) => (
                          <Link
                            key={title}
                            href="/dashboard/notifications"
                            onClick={() => setNotificationOpen(false)}
                            className="block cursor-pointer border-b border-gray-100 px-4 py-3 hover:bg-gray-50"
                          >
                            <p className="text-sm font-medium text-gray-700">{title}</p>
                            <p className="mt-1 text-xs text-gray-500">{time}</p>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Profile Dropdown - only show if logged in */}
              {isLoggedIn && (
                <div className="relative">
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="cursor-pointer rounded-full p-1 transition-colors hover:bg-gray-100"
                  >
                    <Image
                      src="/dashboard-avatar.png"
                      alt="Wisdomcezeh"
                      width={40}
                      height={40}
                      className={`h-10 w-10 rounded-full border-2 object-cover grayscale ${
                        profileOpen ? 'border-red-500 ring-4 ring-red-500/20' : 'border-slate-200'
                      }`}
                    />
                  </button>

                  {profileOpen && (
                    <div className="absolute right-0 z-50 mt-2 w-60 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl">
                      <div className="border-b border-gray-100 p-3">
                        <p className="text-sm font-semibold text-gray-900">{userName}</p>
                        <p className="text-xs text-gray-600">{userEmail}</p>
                      </div>
                      <div className="space-y-1 p-2">
                        <Link
                          href="/dashboard/my-profile"
                          className="flex cursor-pointer items-center gap-3 rounded-lg px-4 py-2 text-gray-700 transition-colors hover:bg-gray-100 hover:text-red-600"
                          onClick={() => setProfileOpen(false)}
                        >
                          <User size={18} />
                          <span className="text-sm">My Profile</span>
                        </Link>
                        <Link
                          href="/dashboard/overview"
                          className="flex cursor-pointer items-center gap-3 rounded-lg px-4 py-2 text-gray-700 hover:text-red-600 transition-colors hover:bg-gray-100"
                          onClick={() => setProfileOpen(false)}
                        >
                          <LayoutDashboard size={18} />
                          <span className="text-sm">My Dashboard</span>
                        </Link>
                        <Link
                          href="/dashboard/settings"
                          className="flex cursor-pointer items-center hover:text-red-600 gap-3 rounded-lg px-4 py-2 text-gray-700 transition-colors hover:bg-gray-100"
                          onClick={() => setProfileOpen(false)}
                        >
                          <Settings size={18} />
                          <span className="text-sm">Settings</span>
                        </Link>
                      </div>
                      <div className="border-t border-gray-100 p-2">
                        <Link
                          href="/support"
                          onClick={() => setProfileOpen(false)}
                          className="flex cursor-pointer items-center hover:text-red-600 gap-3 rounded-lg px-4 py-2 text-gray-700 transition-colors hover:bg-gray-100"
                        >
                          <Heart size={18} />
                          <span className="text-sm">Support AfriScienceHub</span>
                        </Link>
                      </div>
                      <div className="border-t border-gray-100 p-2">
                        <button 
                          onClick={() => {
                            localStorage.removeItem('userLogin');
                            localStorage.removeItem('userName');
                            localStorage.removeItem('userEmail');
                            localStorage.removeItem('userPhone');
                            setIsLoggedIn(false);
                            setProfileOpen(false);
                            window.location.href = '/';
                          }}
                          className="flex w-full cursor-pointer items-center gap-3 rounded-lg px-4 py-1 font-medium text-red-600 transition-colors hover:bg-red-50">
                          <LogOut size={18} />
                          <span className="text-sm">Log Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Login Button - only show if not logged in */}
              {!isLoggedIn && (
                <Link 
                  href="/login"
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors text-sm"
                >
                  Login
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="cursor-pointer p-2 text-gray-700 transition-colors hover:text-gray-900 lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white/70 backdrop-blur-md max-h-screen overflow-y-auto">
            <div className="px-4 py-4 space-y-4">
              <Link 
                href="/" 
                className="block px-3 py-2 text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>

              <Link 
                href="/about" 
                className="block px-3 py-2 text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>

              <Link 
                href="/contact" 
                className="block px-3 py-2 text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>

              <Link
                href="/impact"
                className="block px-3 py-2 text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Impact
              </Link>

              {/* Explore Mobile Submenu */}
              <div>
                <button 
                  className="flex w-full cursor-pointer items-center justify-between px-3 py-3 text-sm font-semibold text-gray-900"
                  onClick={() => setExploreOpen(!exploreOpen)}
                >
                  <span>Explore</span>
                  <ChevronDown 
                    size={20} 
                    className={`transition-transform ${exploreOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                {exploreOpen && (
                  <div className="border-l-4 border-gray-300 pl-4 space-y-3 py-2">
                    <Link 
                      href="/institutions"
                      className="flex items-center gap-3 py-2 text-gray-700 hover:text-gray-900 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Building2 size={18} className="text-gray-600" />
                      <span>Institutes</span>
                    </Link>
                    <Link 
                      href="/centers"
                      className="flex items-center gap-3 py-2 text-gray-700 hover:text-gray-900 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Microscope size={18} className="text-gray-600" />
                      <span>Specialist Centers</span>
                    </Link>
                    <div className="text-xs text-red-600 font-bold uppercase tracking-wide py-2">
                      Experts & Professionals
                    </div>
                    <Link 
                      href="/scientists"
                      className="flex items-center gap-3 py-2 text-gray-700 hover:text-gray-900 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Users size={18} className="text-gray-600" />
                      <span>Scientists & Technologists</span>
                    </Link>
                    <div className="text-xs text-red-600 font-bold uppercase tracking-wide py-2">
                      Innovation Ecosystem
                    </div>
                    <Link 
                      href="/innovations"
                      className="flex items-center gap-3 py-2 text-gray-700 hover:text-gray-900 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Lightbulb size={18} className="text-gray-600" />
                      <span>Afro-Innovations</span>
                    </Link>
                    <div className="text-xs text-red-600 font-bold uppercase tracking-wide py-2">
                      Programs & Engagement
                    </div>
                    <Link 
                      href="/competitions"
                      className="flex items-center gap-3 py-2 text-gray-700 hover:text-gray-900 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Trophy size={18} className="text-gray-600" />
                      <span>Competitions</span>
                    </Link>
                    <Link 
                      href="/voting"
                      className="flex items-center gap-3 py-2 text-gray-700 hover:text-gray-900 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Vote size={18} className="text-gray-600" />
                      <span>Voting</span>
                    </Link>
                    <Link 
                      href="/awards"
                      className="flex items-center gap-3 py-2 text-gray-700 hover:text-gray-900 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Award size={18} className="text-gray-600" />
                      <span>Awards</span>
                    </Link>
                  </div>
                )}
              </div>

              {/* Support Mobile Submenu */}
              <div>
                <button 
                  className="flex w-full cursor-pointer items-center justify-between px-3 py-3 text-sm font-semibold text-gray-900"
                  onClick={() => setSupportOpen(!supportOpen)}
                >
                  <span>Support</span>
                  <ChevronDown 
                    size={20} 
                    className={`transition-transform ${supportOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                {supportOpen && (
                  <div className="border-l-4 border-gray-300 pl-4 space-y-3 py-2">
                    <Link 
                      href="/support/sponsor"
                      className="flex items-center gap-3 py-2 text-gray-700 hover:text-gray-900 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Stars size={18} className="text-gray-600" />
                      <span>Sponsor AfriScienceHub</span>
                    </Link>
                    <Link 
                      href="/support/donate"
                      className="flex items-center gap-3 py-2 text-gray-700 hover:text-gray-900 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <HandHeart size={18} className="text-gray-600" />
                      <span>Donate to Projects</span>
                    </Link>
                    <Link 
                      href="/support/volunteer"
                      className="flex items-center gap-3 py-2 text-gray-700 hover:text-gray-900 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Users2 size={18} className="text-gray-600" />
                      <span>Become a Volunteer</span>
                    </Link>
                  </div>
                )}
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200"></div>

              {/* Mobile Profile Section - only show if logged in */}
              {isLoggedIn && (
                <div className="space-y-3 py-2">
                  <div className="flex items-center gap-3 bg-gray-50 rounded-lg px-3 py-2.5">
                    <Image
                      src="/dashboard-avatar.png"
                      alt={userName}
                      width={40}
                      height={40}
                      className="h-10 w-10 rounded-full border-2 border-slate-200 object-cover grayscale"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-900">{userName}</p>
                      <p className="text-xs text-gray-600">{userEmail}</p>
                    </div>
                  </div>

                  <button 
                    className="flex w-full cursor-pointer items-center justify-between px-3 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                    onClick={() => setMobileProfileOpen(!mobileProfileOpen)}
                  >
                    <span>Menu</span>
                    <ChevronDown 
                      size={18} 
                      className={`transition-transform ${mobileProfileOpen ? 'rotate-180' : ''}`}
                    />
                  </button>

                  {mobileProfileOpen && (
                    <div className="border-l-4 border-gray-300 pl-4 space-y-2 py-1">
                      <Link
                        href="/dashboard/my-profile"
                        className="flex items-center gap-3 px-2 py-2 text-gray-700 hover:text-gray-900 transition-colors"
                        onClick={() => {
                          setMobileMenuOpen(false);
                          setMobileProfileOpen(false);
                        }}
                      >
                        <User size={18} className="text-gray-600" />
                        <span className="text-sm">My Profile</span>
                      </Link>
                      <Link
                        href="/dashboard/overview"
                        className="flex items-center gap-3 px-2 py-2 text-gray-700 hover:text-gray-900 transition-colors"
                        onClick={() => {
                          setMobileMenuOpen(false);
                          setMobileProfileOpen(false);
                        }}
                      >
                        <LayoutDashboard size={18} className="text-gray-600" />
                        <span className="text-sm">My Dashboard</span>
                      </Link>
                      <Link
                        href="/dashboard/settings"
                        className="flex items-center gap-3 px-2 py-2 text-gray-700 hover:text-gray-900 transition-colors"
                        onClick={() => {
                          setMobileMenuOpen(false);
                          setMobileProfileOpen(false);
                        }}
                      >
                        <Settings size={18} className="text-gray-600" />
                        <span className="text-sm">Settings</span>
                      </Link>
                      <button 
                        onClick={() => {
                          localStorage.removeItem('userLogin');
                          localStorage.removeItem('userName');
                          localStorage.removeItem('userEmail');
                          localStorage.removeItem('userPhone');
                          setIsLoggedIn(false);
                          setMobileMenuOpen(false);
                          setMobileProfileOpen(false);
                          
                        }}
                        className="flex w-full items-center gap-3 px-2 py-2 text-red-600 hover:text-red-700 transition-colors"
                      >
                        <LogOut size={18} />
                        <span className="text-sm">Log Out</span>
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Mobile Search & Login - only show if not logged in */}
              {!isLoggedIn && (
                <div className="space-y-2">
                  <button 
                    onClick={() => {
                      onSearchOpen();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-center gap-2 px-3 py-2.5 cursor-pointer text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Search size={18} />
                    <span>Search</span>
                  </button>
                  
                  <Link 
                    href="/login"
                    className="w-full block text-center bg-red-600 hover:bg-red-700 text-white font-medium py-2.5 rounded-lg transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
