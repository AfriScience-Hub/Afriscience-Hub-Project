'use client';

import { useState, Suspense } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/app/components/ui/Button';
import { INSTITUTES } from '@/app/data/mockData';
import { toast } from 'sonner';
import { ContactServiceProviderModal } from '@/app/components/modals/ContactServiceProviderModal';
import { MessagingModal } from '@/app/components/modals/MessagingModal';
import TabButton from './components/TabButton';
import InstituteHero from './components/InstituteHero';
import OverviewTab from './components/OverviewTab';
import AcademicsTab from './components/AcademicsTab';
import AchievementsTab from './components/AchievementsTab';
import GalleryTab from './components/GalleryTab';
import DownloadsTab from './components/DownloadsTab';
import ReviewsTab from './components/ReviewsTab';
import ContactTab from './components/ContactTab';
import NewsUpdatesTab from './components/NewsUpdatesTab';
import Sidebar from './components/Sidebar';

function InstituteDetailsContent() {
  const { id } = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const initialTab = searchParams.get('tab') || 'overview';
  const [activeTab, setActiveTab] = useState(initialTab);
  const [isArchived, setIsArchived] = useState(false);
  const [openAlbum, setOpenAlbum] = useState<string | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
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

  const isUniversity = institute.type === 'University';

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
        <InstituteHero
          institute={institute}
          onTabChange={setActiveTab}
          isArchived={isArchived}
          onArchiveToggle={handleArchiveToggle}
          isLiked={isLiked}
          onLikeToggle={handleLikeToggle}
          currentLikes={currentLikes}
          onRegister={() => setIsRegisterOpen(true)}
        />

        {/* Tabs */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto no-scrollbar border-b border-neutral-gray-light">
            {isUniversity ? (
              <>
                <TabButton active={activeTab === 'overview'} onClick={() => setActiveTab('overview')}>Profile & Services</TabButton>
                <TabButton active={activeTab === 'academics'} onClick={() => setActiveTab('academics')}>Certifications & Policies</TabButton>
                <TabButton active={activeTab === 'achievements'} onClick={() => setActiveTab('achievements')}>Achievements</TabButton>
                <TabButton active={activeTab === 'gallery'} onClick={() => { setActiveTab('gallery'); setOpenAlbum(null); }}>Media Gallery</TabButton>
                <TabButton active={activeTab === 'news'} onClick={() => setActiveTab('news')}>News & Updates</TabButton>
                <TabButton active={activeTab === 'reviews'} onClick={() => setActiveTab('reviews')}>Reviews</TabButton>
                <TabButton active={activeTab === 'contact'} onClick={() => setActiveTab('contact')}>Contact Info</TabButton>
              </>
            ) : (
              <>
                <TabButton active={activeTab === 'overview'} onClick={() => setActiveTab('overview')}>Overview</TabButton>
                <TabButton active={activeTab === 'academics'} onClick={() => setActiveTab('academics')}>Academics & Fees</TabButton>
                <TabButton active={activeTab === 'achievements'} onClick={() => setActiveTab('achievements')}>Licenses & Achievements</TabButton>
                <TabButton active={activeTab === 'gallery'} onClick={() => { setActiveTab('gallery'); setOpenAlbum(null); }}>Media Gallery</TabButton>
                <TabButton active={activeTab === 'downloads'} onClick={() => setActiveTab('downloads')}>Downloadable Resources</TabButton>
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
            {activeTab === 'downloads' && <DownloadsTab downloads={institute.downloads} />}
            {activeTab === 'news' && <NewsUpdatesTab institute={institute} />}
            {activeTab === 'reviews' && <ReviewsTab institute={institute} />}
            {activeTab === 'contact' && <ContactTab institute={institute} />}
          </div>
          <Sidebar institute={institute} onRegister={() => setIsRegisterOpen(true)} />
        </div>
      </div>

      <ContactServiceProviderModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
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

export default function InstituteDetails() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-neutral-bg-light" />}>
      <InstituteDetailsContent />
    </Suspense>
  );
}
