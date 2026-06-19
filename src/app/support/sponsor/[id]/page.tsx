'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { SponsorSidebar } from './components/SponsorSidebar';
import { AboutSection, CatalogSection, LicensesSection, PoliciesSection, AwardsSection, MediaGallery, LocationMap } from './components/DetailSections';
import { ImagePreviewModal } from './components/ImagePreviewModal';
import { MOCK_SPONSOR } from './data';

export default function SponsorDetails() {
  const { id } = useParams();
  const [isArchived, setIsArchived] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: MOCK_SPONSOR.name, text: MOCK_SPONSOR.description, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-neutral-bg-light pb-16">
      <section className="bg-brand-navy-900 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/support/sponsor/all"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm mb-4 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to All Sponsors
          </Link>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">{MOCK_SPONSOR.name}</h1>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          <SponsorSidebar
            isArchived={isArchived}
            onToggleArchive={() => setIsArchived(!isArchived)}
            onShare={handleShare}
            onImageClick={setSelectedImage}
          />

          <div className="lg:col-span-2 space-y-6">
            <AboutSection />
            <CatalogSection />
            <LicensesSection />
            <PoliciesSection />
            <AwardsSection />
            <MediaGallery onImageClick={setSelectedImage} />
            <LocationMap />
          </div>
        </div>
      </div>

      <ImagePreviewModal url={selectedImage} onClose={() => setSelectedImage(null)} />
    </div>
  );
}
