'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft, MapPin, Calendar, Users, DollarSign, Share2,
  CheckCircle, TrendingUp, Target
} from 'lucide-react';
import { IMPACT_STORIES } from '@/app/data/impactData';
import { Button } from '@/app/components/ui/Button';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import ImagePreviewModal from './components/ImagePreviewModal';
import ImpactBreakdown from './components/ImpactBreakdown';
import MediaGallery from './components/MediaGallery';
import Timeline from './components/Timeline';

export default function ImpactDetails() {
  const { id } = useParams();
  const story = IMPACT_STORIES.find(s => s.id === id);
  const [previewImage, setPreviewImage] = useState<{ src: string; alt: string } | null>(null);
  const [openFolder, setOpenFolder] = useState<'before' | 'during' | 'after' | null>(null);

  if (!story) {
    return (
      <div className="min-h-screen bg-neutral-bg-light py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold text-neutral-black mb-4">Impact Story Not Found</h1>
          <Link href="/impact">
            <Button>Back to Impact</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard!');
  };

  const toggleFolder = (folder: 'before' | 'during' | 'after') => {
    setOpenFolder(openFolder === folder ? null : folder);
  };

  return (
    <div className="min-h-screen bg-neutral-bg-light py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">

        <Link href="/impact" className="inline-flex items-center gap-2 text-sm text-neutral-gray-dark hover:text-brand-navy-900 mb-6 transition-colors">
          <ArrowLeft className="h-4 w-4" />
          Back to Impact
        </Link>

        <div className="rounded-2xl border border-neutral-gray-light bg-white shadow-sm overflow-hidden mb-8">

          <div className="relative h-80 bg-neutral-bg-light overflow-hidden">
            <img src={story.image} alt={story.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex px-3 py-1 rounded-full text-xs font-bold bg-white/20 backdrop-blur-sm">
                  {story.type === 'community' ? 'Community Impact' : 'Individual Impact'}
                </span>
                <span className="inline-flex px-3 py-1 rounded-full text-xs font-bold bg-green-500/80 backdrop-blur-sm">
                  {story.impactType}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-3">{story.title}</h1>
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4" />
                  <span>{story.country}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  <span>{story.year}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Target className="h-4 w-4" />
                  <span>{story.cause}</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleShare}
              className="absolute top-4 right-4 h-10 w-10 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white flex items-center justify-center transition-colors shadow-lg"
              title="Share"
            >
              <Share2 className="h-5 w-5 text-neutral-gray-dark" />
            </button>
          </div>

          <div className="p-8 border-b border-neutral-gray-light">
            <div className="grid sm:grid-cols-3 gap-6">
              {story.beneficiaries && (
                <div className="flex items-center gap-4 p-4 rounded-xl bg-blue-50 border border-blue-100">
                  <div className="h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-neutral-black">{story.beneficiaries.toLocaleString()}</p>
                    <p className="text-sm text-neutral-gray-medium">People Impacted</p>
                  </div>
                </div>
              )}
              <div className="flex items-center gap-4 p-4 rounded-xl bg-green-50 border border-green-100">
                <div className="h-12 w-12 rounded-full bg-green-600 flex items-center justify-center flex-shrink-0">
                  <DollarSign className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-neutral-black">{story.amountUtilized}</p>
                  <p className="text-sm text-neutral-gray-medium">Funds Utilized</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-xl bg-purple-50 border border-purple-100">
                <div className="h-12 w-12 rounded-full bg-purple-600 flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-neutral-black">{story.cause}</p>
                  <p className="text-sm text-neutral-gray-medium">Cause Category</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 border-b border-neutral-gray-light">
            <h2 className="text-xl font-bold text-neutral-black mb-3">Summary</h2>
            <p className="text-lg text-neutral-gray-dark leading-relaxed">
              {story.summary}
            </p>
          </div>

          <div className="p-8 border-b border-neutral-gray-light">
            <h2 className="text-xl font-bold text-neutral-black mb-4">The Story</h2>
            <div className="prose prose-sm max-w-none">
              <p className="text-neutral-gray-dark leading-relaxed whitespace-pre-line">
                {story.story}
              </p>
            </div>
          </div>

          <ImpactBreakdown impactBreakdown={story.impactBreakdown} type={story.type} />
          <Timeline timeline={story.timeline} />
        </div>

        <MediaGallery
          mediaGallery={story.mediaGallery}
          openFolder={openFolder}
          toggleFolder={toggleFolder}
          onImageClick={(src, alt) => setPreviewImage({ src, alt })}
        />

        <div className="mt-8 text-center">
          <Link href="/impact">
            <Button size="lg" className="bg-brand-navy-900 hover:bg-brand-navy-800">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to All Impact Stories
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
