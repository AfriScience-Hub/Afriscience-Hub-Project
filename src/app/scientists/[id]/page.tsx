'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  MapPin, Star, Share2, CheckCircle, GraduationCap,
  Eye, ThumbsUp, MessageCircle, Archive, ArchiveX,
  Phone, Briefcase
} from 'lucide-react';
import { Button } from '@/app/components/ui/Button';
import { SCIENTISTS } from '@/app/data/mockData';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { ContactServiceProviderModal } from '@/app/components/modals/ContactServiceProviderModal';
import { MessagingModal } from '@/app/components/modals/MessagingModal';
import TabButton from './components/TabButton';
import ProfileTab from './components/ProfileTab';
import AchievementsTab from './components/AchievementsTab';
import ReviewsTab from './components/ReviewsTab';
import ContactTab from './components/ContactTab';
import Sidebar from './components/Sidebar';

export default function ScientistDetails() {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState('profile');
  const [isArchived, setIsArchived] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [sharesCount, setSharesCount] = useState(0);
  const [isBookServiceOpen, setIsBookServiceOpen] = useState(false);
  const [isMessagingOpen, setIsMessagingOpen] = useState(false);

  const scientist = SCIENTISTS.find(sci => sci.id === id);

  React.useEffect(() => {
    if (scientist) {
      setLikesCount(scientist.likes || 0);
      setSharesCount(scientist.shares || 0);
    }
  }, [scientist]);

  if (!scientist) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-bg-light">
        <h2 className="text-2xl font-bold text-neutral-black">Scientist Not Found</h2>
        <Link href="/scientists">
          <Button className="mt-4">Back to Directory</Button>
        </Link>
      </div>
    );
  }

  const handleArchiveToggle = () => {
    setIsArchived(!isArchived);
    toast.success(isArchived ? 'Removed from archive' : 'Added to archive');
  };

  const handleLikeToggle = () => {
    setIsLiked(!isLiked);
    setLikesCount(prev => isLiked ? prev - 1 : prev + 1);
    toast.success(isLiked ? 'Like removed' : 'Liked!');
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setSharesCount(prev => prev + 1);
      toast.success('Profile link copied!');
    } catch {
      toast.success('Profile link copied!');
    }
  };

  const scrollToReviews = () => {
    setActiveTab('reviews');
    setTimeout(() => {
      const el = document.getElementById('reviews');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-neutral-bg-light pb-12">

      {/* HEADER SECTION */}
      <div className="bg-white border-b border-neutral-gray-light">
        <div className="h-48 md:h-64 w-full bg-brand-navy-900 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-brand-navy-900 via-brand-navy-800 to-brand-navy-700 opacity-90" />
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-6">
          <div className="flex flex-col lg:flex-row gap-6 -mt-12 relative z-10">

            <div className="flex-shrink-0 flex flex-col items-center">
              <div className="h-32 w-32 md:h-40 md:w-40 rounded-full border-4 border-white bg-white shadow-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity">
                <Image src={scientist.image} alt={scientist.name} fill className="object-cover" sizes="160px" />
              </div>
              <div className="flex items-center gap-1 mt-3">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={cn("h-4 w-4", i < Math.floor(scientist.rating) ? "text-amber-500 fill-current" : "text-neutral-gray-light")} />
                  ))}
                </div>
                <span className="text-sm font-bold text-neutral-black ml-1">{scientist.rating}</span>
                <span className="text-xs text-neutral-gray-medium">({scientist.reviews})</span>
              </div>
            </div>

            <div className="flex-1 pt-2 lg:pt-14">
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className={cn(
                      "px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wide border",
                      scientist.status === 'Online'
                        ? "bg-green-100 text-green-700 border-green-200"
                        : "bg-neutral-bg-light text-neutral-gray-dark border-neutral-gray-light"
                    )}>
                      {scientist.status}
                    </span>
                    {scientist.verified && (
                      <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-blue-50 text-blue-600 text-xs font-bold border border-blue-100">
                        <CheckCircle className="h-3 w-3" /> Verified
                      </span>
                    )}
                  </div>
                  <h1 className="text-3xl font-bold text-neutral-black leading-tight mb-1">{scientist.name}</h1>
                  <p className="text-brand-red-600 font-medium mb-2">{scientist.professions.slice(0, 3).join(' \u2022 ')}</p>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-neutral-gray-dark mb-4">
                    <span className="flex items-center gap-1.5">
                      <GraduationCap className="h-4 w-4 text-neutral-gray-medium" />
                      {scientist.degrees.slice(0, 3).join(', ')}
                    </span>
                    <span className="hidden sm:block text-neutral-gray-light">|</span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-4 w-4 text-neutral-gray-medium" />
                      {scientist.location}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-4 min-w-[240px]">
                  <Button className="w-full bg-brand-red-600 hover:bg-brand-red-700 shadow-sm py-6 text-lg" onClick={() => setIsBookServiceOpen(true)}>
                    Book a Service
                  </Button>
                  {scientist.bookingsCount && (
                    <p className="text-xs text-center text-brand-navy-900 font-medium -mt-2">
                      <CheckCircle className="inline h-3 w-3 mr-1" />
                      {scientist.bookingsCount}+ successful bookings
                    </p>
                  )}
                  <div className="flex gap-2">
                    <div className="flex-1 grid grid-cols-2 gap-2">
                      <Button variant="outline" className="border-neutral-gray-light text-neutral-gray-dark hover:bg-neutral-bg-light" title="Call">
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" className="border-neutral-gray-light text-neutral-gray-dark hover:bg-neutral-bg-light" title="Message" onClick={() => setIsMessagingOpen(true)}>
                        <MessageCircle className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <Button variant="outline" className="px-3" title="Share Profile" onClick={handleShare}>
                        <Share2 className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" onClick={handleArchiveToggle} className={cn(isArchived && "bg-neutral-bg-light text-neutral-gray-dark")}>
                        {isArchived ? <ArchiveX className="h-4 w-4" /> : <Archive className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-6 mt-6 pt-4 border-t border-neutral-gray-light text-sm text-neutral-gray-medium">
                <div className="flex items-center gap-1.5">
                  <Eye className="h-4 w-4" />
                  <span className="font-semibold text-neutral-gray-dark">{scientist.views ? (scientist.views / 1000).toFixed(1) + 'k' : '0'}</span> Views
                </div>
                <button onClick={handleLikeToggle} className={cn("flex items-center gap-1.5 transition-colors", isLiked ? "text-brand-red-600" : "hover:text-brand-red-600")}>
                  <ThumbsUp className={cn("h-4 w-4", isLiked && "fill-current")} />
                  <span className="font-semibold text-neutral-gray-dark">{(likesCount / 1000).toFixed(1)}k</span> Likes
                </button>
                <button onClick={scrollToReviews} className="flex items-center gap-1.5 hover:text-brand-red-600 transition-colors">
                  <MessageCircle className="h-4 w-4" />
                  <span className="font-semibold text-neutral-gray-dark">{scientist.reviews || 0}</span> Reviews
                </button>
                <button onClick={handleShare} className="flex items-center gap-1.5 hover:text-brand-navy-900 transition-colors">
                  <Share2 className="h-4 w-4" />
                  <span className="font-semibold text-neutral-gray-dark">{sharesCount}</span> Shares
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto no-scrollbar">
            <TabButton active={activeTab === 'profile'} onClick={() => setActiveTab('profile')}>Profile & Services</TabButton>
            <TabButton active={activeTab === 'achievements'} onClick={() => setActiveTab('achievements')}>Achievements</TabButton>
            <TabButton active={activeTab === 'reviews'} onClick={() => setActiveTab('reviews')}>Reviews</TabButton>
            <TabButton active={activeTab === 'contact'} onClick={() => setActiveTab('contact')}>Contact Info</TabButton>
          </div>
        </div>
      </div>

      {/* CONTENT SECTIONS */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* MAIN CONTENT COLUMN */}
          <div className="lg:col-span-2 space-y-8">
            {activeTab === 'profile' && <ProfileTab scientist={scientist} />}
            {activeTab === 'achievements' && <AchievementsTab scientist={scientist} />}
            {activeTab === 'reviews' && <ReviewsTab scientist={scientist} />}
            {activeTab === 'contact' && <ContactTab scientist={scientist} />}
          </div>

          {/* SIDEBAR */}
          <Sidebar scientist={scientist} />

        </div>
      </div>

      {/* Modals */}
      <ContactServiceProviderModal
        isOpen={isBookServiceOpen}
        onClose={() => setIsBookServiceOpen(false)}
        providerName={scientist.name}
        providerId={scientist.id}
        providerPhone={scientist.contact?.phone}
        profileType="scientist"
        onOpenMessaging={() => setIsMessagingOpen(true)}
      />

      <MessagingModal
        isOpen={isMessagingOpen}
        onClose={() => setIsMessagingOpen(false)}
        providerName={scientist.name}
        providerImage={scientist.image}
      />
    </div>
  );
}
