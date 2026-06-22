'use client';

import React, { useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  MapPin, Star, Share2, CheckCircle, Globe, Phone, MessageCircle,
  Archive, ArchiveX, ThumbsUp, Eye
} from 'lucide-react';
import { Button } from '@/app/components/ui/Button';
import { INSTITUTES } from '@/app/data/mockData';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { ContactServiceProviderModal } from '@/app/components/modals/ContactServiceProviderModal';
import { MessagingModal } from '@/app/components/modals/MessagingModal';
import TabButton from './components/TabButton';
import OverviewTab from './components/OverviewTab';
import AcademicsTab from './components/AcademicsTab';
import AchievementsTab from './components/AchievementsTab';
import GalleryTab from './components/GalleryTab';
import ReviewsTab from './components/ReviewsTab';
import ContactTab from './components/ContactTab';
import Sidebar from './components/Sidebar';

export default function InstituteDetails() {
  const { id } = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const initialTab = searchParams.get('tab') || 'overview';
  const [activeTab, setActiveTab] = useState(initialTab);
  const [isArchived, setIsArchived] = useState(false);
  const [openAlbum, setOpenAlbum] = useState<string | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookServiceOpen, setIsBookServiceOpen] = useState(false);
  const [isMessagingOpen, setIsMessagingOpen] = useState(false);

  const institute = INSTITUTES.find(inst => inst.id === id);

  if (!institute) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-bg-light">
        <h2 className="text-2xl font-bold text-neutral-black">Institute Not Found</h2>
        <Link href="/institutes">
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
    toast.success(isLiked ? 'Like removed' : 'You liked this institute!');
  };

  const currentLikes = (institute.likes || 0) + (isLiked ? 1 : 0);

  return (
    <div className="min-h-screen bg-neutral-bg-light pb-12">
      {/* HEADER */}
      <div className="bg-white border-b border-neutral-gray-light">
        <div className="h-48 md:h-64 w-full bg-brand-navy-900 relative overflow-hidden">
          <Image src={institute.image} alt={institute.name} fill className="object-cover opacity-80" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-navy-900/60 to-transparent" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-6">
          <div className="flex flex-col lg:flex-row gap-6 -mt-12 relative z-10">
            <div className="flex-shrink-0">
              <div className="h-32 w-32 md:h-40 md:w-40 rounded-xl border-4 border-white bg-white shadow-lg overflow-hidden">
                <Image src={institute.image} alt={institute.name} fill className="object-cover" sizes="100vw" />
              </div>
              <div className="flex items-center justify-center gap-1.5 mt-3">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={cn("h-4 w-4", i < Math.floor(institute.rating) ? "text-amber-500 fill-current" : "text-neutral-gray-light")} />
                  ))}
                </div>
                <span className="text-sm font-bold text-neutral-black">{institute.rating}</span>
              </div>
              <p className="text-xs text-neutral-gray-medium text-center mt-0.5">{institute.reviews} reviews</p>
            </div>

            <div className="flex-1 pt-2 lg:pt-14">
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className={cn(
                      "px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wide border",
                      institute.status === 'Online'
                        ? "bg-brand-red-100 text-brand-red-600 border-brand-red-100"
                        : "bg-neutral-bg-light text-neutral-gray-dark border-neutral-gray-light"
                    )}>
                      {institute.status}
                    </span>
                    {institute.verified && (
                      <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-blue-50 text-blue-600 text-xs font-bold border border-blue-100">
                        <CheckCircle className="h-3 w-3" /> Verified
                      </span>
                    )}
                  </div>
                  <h1 className="text-3xl font-bold text-neutral-black leading-tight mb-1">{institute.name}</h1>
                  {institute.motto && <p className="text-neutral-gray-medium italic mb-2">&quot;{institute.motto}&quot;</p>}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-neutral-gray-dark mb-3">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-4 w-4 text-neutral-gray-medium" />
                      {institute.address || 'Address Hidden'}
                    </span>
                    <span className="hidden sm:block text-neutral-gray-light">|</span>
                    <span className="flex items-center gap-1.5">
                      <Globe className="h-4 w-4 text-neutral-gray-medium" />
                      {institute.location}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <span className="px-2 py-0.5 rounded bg-brand-navy-100 text-brand-navy-900 text-xs font-bold uppercase tracking-wide border border-brand-navy-100">
                      {institute.type === 'University' ? `Type: ${institute.class}` : institute.class}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-neutral-bg-light text-neutral-gray-dark text-xs font-bold border border-neutral-gray-light">
                      {institute.ownership}
                    </span>
                    {institute.type !== 'University' && (
                      <span className="px-2 py-0.5 rounded bg-purple-50 text-purple-700 text-xs font-bold border border-purple-100">
                        {institute.gender}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-4 min-w-[240px]">
                  <Button className="w-full bg-brand-red-600 hover:bg-brand-red-700 shadow-sm py-6 text-lg" onClick={() => setIsBookServiceOpen(true)}>
                    Book a Service
                  </Button>
                  {institute.bookingsCount && (
                    <p className="text-xs text-center text-brand-navy-900 font-medium -mt-2">
                      <CheckCircle className="inline h-3 w-3 mr-1" />
                      {institute.bookingsCount}+ successful bookings
                    </p>
                  )}
                  <div className="flex gap-2">
                    <div className="flex-1 grid grid-cols-2 gap-2">
                      <Button variant="outline" className="border-neutral-gray-light text-neutral-gray-dark hover:bg-neutral-bg-light" title="Call" onClick={() => setActiveTab('contact')}>
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" className="border-neutral-gray-light text-neutral-gray-dark hover:bg-neutral-bg-light" title="Message" onClick={() => setActiveTab('contact')}>
                        <MessageCircle className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <Button variant="outline" className="px-3" title="Share Profile" onClick={async () => {
                        try {
                          await navigator.clipboard.writeText(window.location.href);
                          toast.success('Profile link copied to clipboard');
                        } catch (err) {
                          toast.success('Profile link copied to clipboard');
                        }
                      }}>
                        <Share2 className="h-4 w-4" />
                      </Button>
                      <div className="relative group">
                        <Button variant="outline" onClick={handleArchiveToggle} className={cn(isArchived && "bg-neutral-bg-light text-neutral-gray-dark")}>
                          {isArchived ? <ArchiveX className="h-4 w-4" /> : <Archive className="h-4 w-4" />}
                        </Button>
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block px-2 py-1 bg-brand-navy-900 text-white text-xs rounded whitespace-nowrap shadow-lg z-50">
                          {isArchived ? 'Remove from Archive' : 'Add to Archive'}
                          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-brand-navy-900" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-6 mt-6 pt-4 border-t border-neutral-gray-light text-sm text-neutral-gray-medium">
                <div className="flex items-center gap-1.5">
                  <Eye className="h-4 w-4" />
                  <span className="font-semibold text-neutral-gray-dark">{institute.views ? (institute.views / 1000).toFixed(1) + 'k' : '0'}</span> Views
                </div>
                <button onClick={handleLikeToggle} className={cn("flex items-center gap-1.5 transition-colors", isLiked ? "text-brand-red-600" : "hover:text-brand-red-600")}>
                  <ThumbsUp className={cn("h-4 w-4", isLiked && "fill-current")} />
                  <span className={cn("font-semibold", isLiked ? "text-brand-red-600" : "text-neutral-gray-dark")}>{currentLikes ? (currentLikes / 1000).toFixed(1) + 'k' : '0'}</span> Likes
                </button>
                <button onClick={() => setActiveTab('reviews')} className="flex items-center gap-1.5 hover:text-brand-red-600 transition-colors">
                  <MessageCircle className="h-4 w-4" />
                  <span className="font-semibold text-neutral-gray-dark">{institute.reviews || 0}</span> Reviews
                </button>
                <button onClick={async () => {
                  try { await navigator.clipboard.writeText(window.location.href); toast.success('Profile link copied — share it!'); }
                  catch (err) { toast.success('Profile link copied — share it!'); }
                }} className="flex items-center gap-1.5 hover:text-brand-navy-900 transition-colors">
                  <Share2 className="h-4 w-4" />
                  <span className="font-semibold text-neutral-gray-dark">{institute.shares || 0}</span> Shares
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto no-scrollbar border-b border-neutral-gray-light">
            {institute.type === 'University' ? (
              <>
                <TabButton active={activeTab === 'overview'} onClick={() => setActiveTab('overview')}>Profile & Services</TabButton>
                <TabButton active={activeTab === 'academics'} onClick={() => setActiveTab('academics')}>Certifications & Policies</TabButton>
                <TabButton active={activeTab === 'reviews'} onClick={() => setActiveTab('reviews')}>Reviews</TabButton>
                <TabButton active={activeTab === 'contact'} onClick={() => setActiveTab('contact')}>Contact Info</TabButton>
              </>
            ) : (
              <>
                <TabButton active={activeTab === 'overview'} onClick={() => setActiveTab('overview')}>Overview</TabButton>
                <TabButton active={activeTab === 'academics'} onClick={() => setActiveTab('academics')}>Academics & Fees</TabButton>
                <TabButton active={activeTab === 'achievements'} onClick={() => setActiveTab('achievements')}>Achievements</TabButton>
                <TabButton active={activeTab === 'gallery'} onClick={() => { setActiveTab('gallery'); setOpenAlbum(null); }}>Media Gallery</TabButton>
                <TabButton active={activeTab === 'reviews'} onClick={() => setActiveTab('reviews')}>Reviews</TabButton>
                <TabButton active={activeTab === 'contact'} onClick={() => setActiveTab('contact')}>Contact</TabButton>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {activeTab === 'overview' && <OverviewTab institute={institute} />}
            {activeTab === 'academics' && <AcademicsTab institute={institute} />}
            {activeTab === 'achievements' && <AchievementsTab institute={institute} />}
            {activeTab === 'gallery' && <GalleryTab institute={institute} openAlbum={openAlbum} setOpenAlbum={setOpenAlbum} />}
            {activeTab === 'reviews' && <ReviewsTab institute={institute} />}
            {activeTab === 'contact' && <ContactTab institute={institute} />}
          </div>
          <Sidebar institute={institute} />
        </div>
      </div>

      <ContactServiceProviderModal
        isOpen={isBookServiceOpen}
        onClose={() => setIsBookServiceOpen(false)}
        providerName={institute.name}
        providerId={institute.id}
        providerPhone={institute.phone}
        profileType="institute"
        onOpenMessaging={() => setIsMessagingOpen(true)}
      />
      <MessagingModal
        isOpen={isMessagingOpen}
        onClose={() => setIsMessagingOpen(false)}
        providerName={institute.name}
        providerImage={institute.image}
      />
    </div>
  );
}
