'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowLeft, MapPin, Eye, Share2, Archive, ArchiveX,
  Award, ThumbsUp, Camera, Maximize2,
  MessageCircle, ChevronLeft, ChevronRight as ChevronRightIcon
} from 'lucide-react';
import { Button } from '@/app/components/ui/Button';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { ContactInnovatorModal } from '@/app/components/modals/ContactInnovatorModal';
import ImagePreviewModal from './components/ImagePreviewModal';
import InnovationTabContent, { type InnovationTab } from './components/InnovationTabContent';
import { fetchVisitorInnovationById, mapVisitorInnovation } from '../visitorApi';

type Tab = InnovationTab;

export default function InnovationDetails() {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [liked, setLiked] = useState(false);
  const [archived, setArchived] = useState(false);
  const [previewImage, setPreviewImage] = useState<{ src: string; alt: string } | null>(null);
  const [activeGalleryCategory, setActiveGalleryCategory] = useState<string>('');
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [innovation, setInnovation] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const fetchInnovation = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const raw = await fetchVisitorInnovationById(id!);
      setInnovation(mapVisitorInnovation(raw));
    } catch (err: any) {
      setError(err?.message || 'Failed to load innovation details.');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) fetchInnovation();
  }, [id, fetchInnovation]);

  // NOTE: every hook must run before any early return below, otherwise the
  // hook order changes between the loading and the loaded render.
  const allMediaItems: { type: 'image' | 'video'; url: string; caption: string }[] =
    innovation?.mediaGallery?.flatMap((g: any) => g.items) || [];

  const nextSlide = useCallback(() => {
    if (allMediaItems.length > 1) setCurrentSlide(prev => (prev + 1) % allMediaItems.length);
  }, [allMediaItems.length]);

  const prevSlide = useCallback(() => {
    if (allMediaItems.length > 1) setCurrentSlide(prev => (prev - 1 + allMediaItems.length) % allMediaItems.length);
  }, [allMediaItems.length]);

  useEffect(() => {
    if (allMediaItems.length <= 1) return;
    const timer = setInterval(nextSlide, 4000);
    return () => clearInterval(timer);
  }, [allMediaItems.length, nextSlide]);

  if (loading && !innovation) {
    return (
      <div className="min-h-screen bg-neutral-bg-light flex items-center justify-center">
        <div className="h-8 w-8 rounded-full border-2 border-neutral-gray-light border-t-brand-red-600 animate-spin" />
      </div>
    );
  }

  if (!innovation || error) {
    return (
      <div className="min-h-screen bg-neutral-bg-light flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-neutral-gray-dark mb-4">{error || 'Innovation not found.'}</p>
          <Link href="/innovations"><Button>Back to Innovations</Button></Link>
        </div>
      </div>
    );
  }

  const tabs: { key: Tab; label: string }[] = [
    { key: 'overview', label: 'Overview' },
    { key: 'awards', label: 'Certification & Award' },
    { key: 'media', label: 'Media & Gallery' },
  ];

  const mediaCategories = (innovation.mediaGallery || []).length
    ? innovation.mediaGallery
    : [
      { category: 'Working Materials', items: [] },
      { category: 'Work in Progress', items: [] },
      { category: 'Finished Work', items: [] },
    ];

  return (
    <div className="min-h-screen bg-neutral-bg-light">
      {/* Hero Section with Slideshow */}
      <div className="relative h-72 sm:h-96 bg-brand-navy-900 overflow-hidden">
        {allMediaItems.length > 0 ? (
          <>
            {allMediaItems[currentSlide].type === 'video' ? (
              <video src={allMediaItems[currentSlide].url} autoPlay muted loop className="h-full w-full object-cover" />
            ) : (
              <Image src={allMediaItems[currentSlide].url} alt={allMediaItems[currentSlide].caption} fill sizes="100vw" className="object-cover opacity-70" />
            )}
          </>
        ) : (
          <Image src={innovation.image} alt={innovation.name} fill sizes="100vw" className="object-cover opacity-70" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {allMediaItems.length > 1 && (
          <>
            <button onClick={prevSlide} className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-2 text-white backdrop-blur-sm hover:bg-white/40 transition-colors z-10 cursor-pointer">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button onClick={nextSlide} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-2 text-white backdrop-blur-sm hover:bg-white/40 transition-colors z-10 cursor-pointer">
              <ChevronRightIcon className="h-5 w-5" />
            </button>
            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10">
              {allMediaItems.map((_, i) => (
                <button key={i} onClick={() => setCurrentSlide(i)} className={`h-1.5 rounded-full transition-all cursor-pointer ${i === currentSlide ? 'w-6 bg-white' : 'w-1.5 bg-white/50'}`} />
              ))}
            </div>
          </>
        )}

        <Link href="/innovations" className="absolute top-4 left-4 sm:top-6 sm:left-6 flex items-center gap-2 text-white/90 hover:text-white transition-colors z-10">
          <ArrowLeft className="h-5 w-5" />
          <span className="text-sm font-medium">Back to Innovations</span>
        </Link>
        <button
          onClick={() => allMediaItems.length > 0 ? setPreviewImage({ src: allMediaItems[currentSlide].url, alt: allMediaItems[currentSlide].caption }) : setPreviewImage({ src: innovation.image, alt: innovation.name })}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 rounded-full bg-white/20 p-2 text-white backdrop-blur-sm hover:bg-white/30 transition-colors z-10 cursor-pointer"
          title="Preview image"
        >
          <Maximize2 className="h-5 w-5" />
        </button>
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8 z-10">
          <div className="container mx-auto">
            <h1 className="text-2xl sm:text-4xl font-bold text-white mb-2">{innovation.name}</h1>
            <p className="text-sm text-white/70 font-mono tracking-wider mb-2">{innovation.idTag}</p>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              {innovation.field.map((f: string) => (
                <span key={f} className="text-[11px] uppercase font-bold text-brand-navy-900 bg-white px-2 py-0.5 rounded">{f}</span>
              ))}
              {innovation.stage && (
                <span className="text-[11px] uppercase font-bold text-purple-900 bg-purple-200 px-2 py-0.5 rounded">{innovation.stage}</span>
              )}
              {innovation.ownership && (
                <span className="text-[11px] uppercase font-bold text-white bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded">{innovation.ownership}</span>
              )}
            </div>
            <p className="text-sm text-white/80 flex items-center gap-1">
              <MapPin className="h-4 w-4" /> {innovation.country}
            </p>
          </div>
        </div>
      </div>

      {/* Meta Bar */}
      <div className="bg-white border-b border-neutral-gray-light">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-4 text-sm text-neutral-gray-medium">
                <span className="flex items-center gap-1"><Eye className="h-4 w-4" /> {(innovation.views / 1000).toFixed(1)}k Views</span>
                <span className="flex items-center gap-1"><ThumbsUp className={cn("h-4 w-4", liked && "text-brand-red-600")} /> {(innovation.likes / 1000).toFixed(1)}k Likes</span>
                <span className="flex items-center gap-1"><Share2 className="h-4 w-4" /> {(innovation.shares / 1000).toFixed(1)}k Shares</span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {innovation.interests.map((i: string) => (
                  <span key={i} className="inline-flex items-center rounded-full bg-amber-50 border border-amber-200 px-2.5 py-1 text-xs text-amber-700 font-medium">{i}</span>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button size="sm" variant={liked ? "default" : "outline"} className={cn(liked && "bg-brand-red-600 hover:bg-brand-red-700 text-white")} onClick={() => { setLiked(!liked); toast.success(liked ? 'Unliked' : 'Liked!'); }}>
                <ThumbsUp className={cn("h-4 w-4 mr-1", liked && "fill-current")} /> {liked ? 'Liked' : 'Like'}
              </Button>
              <Button size="sm" variant="outline" onClick={() => { navigator.clipboard.writeText(window.location.href); toast.success('Link copied!'); }}>
                <Share2 className="h-4 w-4 mr-1" /> Share
              </Button>
              <Button size="sm" variant="outline" onClick={() => { setArchived(!archived); toast.success(archived ? 'Removed from archive' : 'Added to archive'); }}>
                {archived ? <ArchiveX className="h-4 w-4 mr-1" /> : <Archive className="h-4 w-4 mr-1" />}
                {archived ? 'Unarchive' : 'Archive'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-neutral-gray-light sticky top-0 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex gap-1 overflow-x-auto">
            {tabs.map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={cn(
                  "px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap cursor-pointer",
                  activeTab === tab.key
                    ? "border-brand-red-600 text-brand-red-600"
                    : "border-transparent text-neutral-gray-medium hover:text-brand-navy-900 hover:border-neutral-gray-light"
                )}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <InnovationTabContent
          innovation={innovation}
          activeTab={activeTab}
          mediaCategories={mediaCategories}
          activeGalleryCategory={activeGalleryCategory}
          onSelectGalleryCategory={setActiveGalleryCategory}
          onPreview={(src, alt) => setPreviewImage({ src, alt })}
          onMessageInnovator={() => setIsContactModalOpen(true)}
        />
      </div>

      {previewImage && (
        <ImagePreviewModal src={previewImage.src} alt={previewImage.alt} onClose={() => setPreviewImage(null)} />
      )}
      <ContactInnovatorModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        innovatorName={innovation.creator}
        innovatorImage={innovation.creatorImage}
        innovationName={innovation.name}
      />
    </div>
  );
}
