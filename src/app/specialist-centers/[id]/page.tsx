'use client';

import { useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  MapPin, Star, Share2, ThumbsUp, CheckCircle, Eye, Building2, Phone
} from 'lucide-react';
import { Button } from '@/app/components/ui/Button';
import { SPECIALIST_CENTERS } from '@/app/data/mockData';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { ContactServiceProviderModal } from '@/app/components/modals/ContactServiceProviderModal';
import { MessagingModal } from '@/app/components/modals/MessagingModal';
import TabButton from './components/TabButton';
import OverviewTab from './components/OverviewTab';
import LicensesTab from './components/LicensesTab';
import GalleryTab from './components/GalleryTab';
import ReviewsTab from './components/ReviewsTab';
import ContactTab from './components/ContactTab';
import Sidebar from './components/Sidebar';
import PolicyModal from './components/PolicyModal';

export default function SpecialistCenterDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'overview');
  const [openAlbum, setOpenAlbum] = useState<string | null>(null);
  const [showPolicyModal, setShowPolicyModal] = useState(false);
  const [isBookServiceOpen, setIsBookServiceOpen] = useState(false);
  const [isMessagingOpen, setIsMessagingOpen] = useState(false);

  const center = SPECIALIST_CENTERS.find(c => c.id === id);

  if (!center) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-bg-light">
        <h2 className="text-2xl font-bold text-neutral-black">Center Not Found</h2>
        <Link href="/specialist-centers">
          <Button className="mt-4">Back to Directory</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-bg-light pb-12">
      <div className="bg-white border-b border-neutral-gray-light">
        <div className="h-48 md:h-64 w-full relative overflow-hidden">
          <Image src={center.image} alt={center.name} fill className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-navy-900/80 via-brand-navy-900/30 to-transparent" />
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-6">
          <div className="flex flex-col lg:flex-row gap-6 -mt-12 relative z-10">
            <div className="flex-shrink-0">
              <div className="h-32 w-32 md:h-40 md:w-40 rounded-xl border-4 border-white bg-white shadow-lg overflow-hidden">
                <Image src={center.image} alt={center.name} fill className="object-cover" sizes="160px" />
              </div>
              <div className="mt-3 flex items-center gap-1.5 justify-center">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={cn("h-4 w-4", i < Math.round(center.rating) ? "text-amber-500 fill-current" : "text-neutral-gray-light")} />
                  ))}
                </div>
                <span className="font-bold text-neutral-black text-sm">{center.rating}</span>
                <span className="text-xs text-neutral-gray-medium">({center.reviews} reviews)</span>
              </div>
            </div>

            <div className="flex-1 pt-2 lg:pt-14">
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className={cn(
                      "px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wide border",
                      center.status === 'Online'
                        ? "bg-green-100 text-green-700 border-green-200"
                        : "bg-neutral-bg-light text-neutral-gray-dark border-neutral-gray-light"
                    )}>
                      {center.status}
                    </span>
                    {center.verified && (
                      <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-blue-50 text-blue-600 text-xs font-bold border border-blue-100">
                        <CheckCircle className="h-3 w-3" /> Verified
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 rounded bg-brand-navy-100 text-brand-navy-900 text-xs font-bold border border-brand-navy-100">
                      {center.field}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-neutral-bg-light text-neutral-gray-dark text-xs font-bold border border-neutral-gray-light">
                      {center.ownership}
                    </span>
                  </div>
                  <h1 className="text-3xl font-bold text-neutral-black leading-tight mb-1">{center.name}</h1>
                  {center.motto && <p className="text-neutral-gray-medium italic mb-2">&ldquo;{center.motto}&rdquo;</p>}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-neutral-gray-dark mb-3">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-4 w-4 text-neutral-gray-medium" />
                      {center.country}{center.state ? `, ${center.state}` : ''}
                    </span>
                    <span className="flex items-center gap-1.5 text-neutral-gray-medium text-[13px]">
                      <Building2 className="h-3.5 w-3.5 text-neutral-gray-medium" />
                      {center.address}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {(center.categories || []).slice(0, 3).map(cat => (
                      <span key={cat} className="text-xs px-2 py-1 rounded-full bg-brand-red-100 text-brand-red-600 font-medium">{cat}</span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-4 min-w-[240px]">
                  <Button className="w-full bg-brand-red-600 hover:bg-brand-red-700 shadow-sm py-6 text-lg" onClick={() => setIsBookServiceOpen(true)}>
                    Book a Service
                  </Button>
                  {center.bookingsCount && (
                    <p className="text-xs text-center text-brand-navy-900 font-medium -mt-2">
                      <CheckCircle className="inline h-3 w-3 mr-1" />
                      {center.bookingsCount}+ successful bookings
                    </p>
                  )}
                  <div className="flex gap-2">
                    <div className="flex-1 grid grid-cols-2 gap-2">
                      <Button variant="outline" className="border-neutral-gray-light text-neutral-gray-dark hover:bg-neutral-bg-light" title="Call">
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" className="border-neutral-gray-light text-neutral-gray-dark hover:bg-neutral-bg-light" title="Like">
                        <ThumbsUp className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <Button variant="outline" className="px-3" title="Share" onClick={() => { navigator.clipboard.writeText(window.location.href); toast.success('Link copied!'); }}>
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-6 mt-6 pt-4 border-t border-neutral-gray-light text-sm text-neutral-gray-medium">
                <div className="flex items-center gap-1.5">
                  <Eye className="h-4 w-4" />
                  <span className="font-semibold text-neutral-gray-dark">{(center.views / 1000).toFixed(1)}k</span> Views
                </div>
                <button className="flex items-center gap-1.5 hover:text-brand-red-600 transition-colors">
                  <ThumbsUp className="h-4 w-4" />
                  <span className="font-semibold text-neutral-gray-dark">{(center.likes / 1000).toFixed(1)}k</span> Likes
                </button>
                <button className="flex items-center gap-1.5 hover:text-brand-navy-900 transition-colors">
                  <Share2 className="h-4 w-4" />
                  <span className="font-semibold text-neutral-gray-dark">{center.shares}</span> Shares
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto no-scrollbar">
            <TabButton active={activeTab === 'overview'} onClick={() => setActiveTab('overview')}>Overview & Services</TabButton>
            <TabButton active={activeTab === 'licenses'} onClick={() => setActiveTab('licenses')}>Licenses & Achievements</TabButton>
            <TabButton active={activeTab === 'gallery'} onClick={() => { setActiveTab('gallery'); setOpenAlbum(null); }}>Media Gallery</TabButton>
            <TabButton active={activeTab === 'reviews'} onClick={() => setActiveTab('reviews')}>Reviews</TabButton>
            <TabButton active={activeTab === 'contact'} onClick={() => setActiveTab('contact')}>Contact</TabButton>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {activeTab === 'overview' && (
              <OverviewTab center={center} onShowPolicies={() => setShowPolicyModal(true)} />
            )}
            {activeTab === 'licenses' && (
              <LicensesTab center={center} />
            )}
            {activeTab === 'gallery' && (
              <GalleryTab gallery={center.gallery as any} openAlbum={openAlbum} onSetOpenAlbum={setOpenAlbum} />
            )}
            {activeTab === 'reviews' && (
              <ReviewsTab center={center} />
            )}
            {activeTab === 'contact' && (
              <ContactTab contact={center.contact} />
            )}
          </div>

          <Sidebar center={center} onBookService={() => setIsBookServiceOpen(true)} />
        </div>
      </div>

      <PolicyModal
        show={showPolicyModal}
        policies={center.policies}
        onClose={() => setShowPolicyModal(false)}
      />

      <ContactServiceProviderModal
        isOpen={isBookServiceOpen}
        onClose={() => setIsBookServiceOpen(false)}
        providerName={center.name}
        providerId={center.id}
        providerPhone={(center as any).phone}
        profileType="specialist-center"
        onOpenMessaging={() => setIsMessagingOpen(true)}
      />

      <MessagingModal
        isOpen={isMessagingOpen}
        onClose={() => setIsMessagingOpen(false)}
        providerName={center.name}
        providerImage={center.image}
      />
    </div>
  );
}
