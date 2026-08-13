'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { useLocalStorage } from '@/lib/useLocalStorage';
import { SponsorSidebar } from './components/SponsorSidebar';
import { AboutSection, CatalogSection, LicensesSection, PoliciesSection, AwardsSection, MediaGallery, LocationMap } from './components/DetailSections';
import { ImagePreviewModal } from './components/ImagePreviewModal';
import { MOCK_SPONSORS } from './data';

export default function SponsorDetails() {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [archivedIds, setArchivedIds] = useLocalStorage<number[]>('ash:archived-sponsors', []);

  const sponsor = MOCK_SPONSORS[Number(id)];

  if (!sponsor) {
    return (
      <div className="min-h-screen bg-neutral-bg-light flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-neutral-black mb-2">Sponsor Not Found</h1>
          <Link href="/support/sponsor/all" className="text-brand-red-600 hover:underline">Back to All Sponsors</Link>
        </div>
      </div>
    );
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: sponsor.name, text: sponsor.description, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const isArchived = archivedIds.includes(sponsor.id);

  const handleToggleArchive = () => {
    setArchivedIds(prev =>
      prev.includes(sponsor.id)
        ? prev.filter(archivedId => archivedId !== sponsor.id)
        : [...prev, sponsor.id]
    );
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
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">{sponsor.name}</h1>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          <SponsorSidebar
            sponsor={sponsor}
            onShare={handleShare}
            onImageClick={setSelectedImage}
            isArchived={isArchived}
            onToggleArchive={handleToggleArchive}
          />

          <div className="lg:col-span-2 space-y-6">
            <AboutSection sponsor={sponsor} />
            <CatalogSection sponsor={sponsor} />
            <LicensesSection sponsor={sponsor} />
            <PoliciesSection sponsor={sponsor} />
            <AwardsSection sponsor={sponsor} />
            <MediaGallery sponsor={sponsor} onImageClick={setSelectedImage} />
            <LocationMap sponsor={sponsor} />
          </div>
        </div>
      </div>

      <ImagePreviewModal url={selectedImage} onClose={() => setSelectedImage(null)} />
    </div>
  );
}
