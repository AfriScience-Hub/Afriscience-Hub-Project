'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { IMPACT_STORIES } from '@/app/data/impactData';
import { Button } from '@/app/components/ui/Button';
import DetailHero from './components/DetailHero';
import Infographic from './components/Infographic';
import PeopleSection from './components/PeopleSection';
import ImpactBreakdown from './components/ImpactBreakdown';
import Timeline from './components/Timeline';
import MediaGallery from './components/MediaGallery';
import PublicationLinks from './components/PublicationLinks';
import ImagePreviewModal from './components/ImagePreviewModal';

export default function ImpactDetails() {
  const { id } = useParams();
  const story = IMPACT_STORIES.find((s) => s.id === id);
  const [previewImage, setPreviewImage] = useState<{ src: string; alt: string } | null>(null);

  if (!story) {
    return (
      <div className="min-h-screen bg-neutral-bg-light py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold text-neutral-black mb-4">Impact Not Found</h1>
          <Link href="/impact">
            <Button>Back to Impact</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-bg-light py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <Link
          href="/impact"
          className="inline-flex items-center gap-2 text-sm text-neutral-gray-dark hover:text-brand-navy-900 mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Impact
        </Link>

        <div className="rounded-2xl border border-neutral-gray-light bg-white shadow-sm overflow-hidden mb-8">
          <DetailHero story={story} />
          <Infographic story={story} />
          <PeopleSection program={story.program} people={story.people} />

          <div className="p-6 sm:p-8 border-b border-neutral-gray-light">
            <h2 className="text-xl font-bold text-neutral-black mb-3">Impact Summary</h2>
            <p className="text-lg text-neutral-gray-dark leading-relaxed">{story.summary}</p>
          </div>

          <div className="p-6 sm:p-8 border-b border-neutral-gray-light">
            <h2 className="text-xl font-bold text-neutral-black mb-4">The Story</h2>
            <p className="text-neutral-gray-dark leading-relaxed whitespace-pre-line">
              {story.story}
            </p>
          </div>

          <ImpactBreakdown story={story} />
          <Timeline timeline={story.timeline} />

          {story.program === 'Research Support' && story.researchDetails && (
            <PublicationLinks links={story.researchDetails.publicationLinks} />
          )}
        </div>

        <MediaGallery
          mediaGallery={story.mediaGallery}
          onImageClick={(src, alt) => setPreviewImage({ src, alt })}
        />

        <div className="mt-4 text-center">
          <Link href="/impact">
            <Button size="lg" className="bg-brand-navy-900 hover:bg-brand-navy-800">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Impact
            </Button>
          </Link>
        </div>
      </div>

      {previewImage && (
        <ImagePreviewModal
          src={previewImage.src}
          alt={previewImage.alt}
          onClose={() => setPreviewImage(null)}
        />
      )}
    </div>
  );
}
