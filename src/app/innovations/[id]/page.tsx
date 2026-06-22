'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowLeft, MapPin, Eye, Share2, Archive, ArchiveX,
  Award, ShieldCheck, AlertTriangle, ThumbsUp, Users,
  Lightbulb, Wrench, Camera, ChevronRight, Maximize2,
  MessageCircle, ChevronLeft, ChevronRight as ChevronRightIcon
} from 'lucide-react';
import { INNOVATIONS, type Innovation } from '@/app/data/mockData';
import { Button } from '@/app/components/ui/Button';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { ContactInnovatorModal } from '@/app/components/modals/ContactInnovatorModal';
import InterestEmoji from './components/InterestEmoji';
import SectionCard from './components/SectionCard';
import ImagePreviewModal from './components/ImagePreviewModal';

type Tab = 'overview' | 'awards' | 'media';

export default function InnovationDetails() {
  const { id } = useParams<{ id: string }>();
  const innovation = INNOVATIONS.find(i => i.id === id);
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [liked, setLiked] = useState(false);
  const [archived, setArchived] = useState(false);
  const [previewImage, setPreviewImage] = useState<{ src: string; alt: string } | null>(null);
  const [activeGalleryCategory, setActiveGalleryCategory] = useState<string>('');
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  if (!innovation) {
    return (
      <div className="min-h-screen bg-neutral-bg-light flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-neutral-gray-dark mb-4">Innovation not found.</p>
          <Link href="/innovations"><Button>Back to Innovations</Button></Link>
        </div>
      </div>
    );
  }

  const tabs: { key: Tab; label: string }[] = [
    { key: 'overview', label: 'Overview' },
    { key: 'awards', label: 'Awards & Cert' },
    { key: 'media', label: 'Media & Gallery' },
  ];

  const allMediaItems = innovation.mediaGallery.flatMap(g => g.items);
  const [currentSlide, setCurrentSlide] = useState(0);

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

  const mediaCategories = [
    { category: 'Working Materials', items: innovation.mediaGallery?.[0]?.items || [] },
    { category: 'Work in Progress', items: innovation.mediaGallery?.[1]?.items || [] },
    { category: 'Finished Work', items: innovation.mediaGallery?.[2]?.items || [] },
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
            <button onClick={prevSlide} className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-2 text-white backdrop-blur-sm hover:bg-white/40 transition-colors z-10">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button onClick={nextSlide} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-2 text-white backdrop-blur-sm hover:bg-white/40 transition-colors z-10">
              <ChevronRightIcon className="h-5 w-5" />
            </button>
            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10">
              {allMediaItems.map((_, i) => (
                <button key={i} onClick={() => setCurrentSlide(i)} className={`h-1.5 rounded-full transition-all ${i === currentSlide ? 'w-6 bg-white' : 'w-1.5 bg-white/50'}`} />
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
          className="absolute top-4 right-4 sm:top-6 sm:right-6 rounded-full bg-white/20 p-2 text-white backdrop-blur-sm hover:bg-white/30 transition-colors z-10"
          title="Preview image"
        >
          <Maximize2 className="h-5 w-5" />
        </button>
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8 z-10">
          <div className="container mx-auto">
            <h1 className="text-2xl sm:text-4xl font-bold text-white mb-2">{innovation.name}</h1>
            <p className="text-sm text-white/70 font-mono tracking-wider mb-2">{innovation.idTag}</p>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-[11px] uppercase font-bold text-brand-navy-900 bg-white px-2 py-0.5 rounded">{innovation.field}</span>
              <span className="text-[11px] uppercase font-bold text-purple-900 bg-purple-200 px-2 py-0.5 rounded">{innovation.stage}</span>
              <span className="text-[11px] uppercase font-bold text-white bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded">{innovation.ownership}</span>
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
                {innovation.interests.map(i => (
                  <InterestEmoji key={i} interest={i} />
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
                  "px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap",
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
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <SectionCard title="Description" icon={<Lightbulb className="h-5 w-5 text-brand-red-600" />}>
                <p className="text-sm text-neutral-gray-dark leading-relaxed">{innovation.description}</p>
              </SectionCard>
              <SectionCard title="Specifications" icon={<Wrench className="h-5 w-5 text-neutral-gray-dark" />}>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-bold text-neutral-gray-medium uppercase mb-2">Materials Used</p>
                    <div className="flex flex-wrap gap-2">
                      {innovation.specifications.materials.map(m => (
                        <span key={m} className="px-2.5 py-1 rounded bg-neutral-bg-light border border-neutral-gray-light text-xs text-neutral-gray-dark">{m}</span>
                      ))}
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4 pt-3 border-t border-neutral-gray-light">
                    <div>
                      <p className="text-xs font-bold text-neutral-gray-medium uppercase mb-1">Dimensions (L x W x H)</p>
                      <p className="text-sm text-neutral-black font-medium">{innovation.specifications.dimensions}</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-neutral-gray-medium uppercase mb-1">Weight</p>
                      <p className="text-sm text-neutral-black font-medium">{innovation.specifications.weight}</p>
                    </div>
                  </div>
                </div>
              </SectionCard>
              <SectionCard title="SDGs Addressed" icon={<Award className="h-5 w-5 text-green-600" />}>
                <div className="flex flex-wrap gap-2">
                  {innovation.sdgs.map(s => (
                    <span key={s} className="px-2.5 py-1 rounded-full bg-green-50 border border-green-200 text-xs font-medium text-green-700">{s}</span>
                  ))}
                </div>
              </SectionCard>
              <SectionCard title="User Groups" icon={<Users className="h-5 w-5 text-blue-600" />}>
                <div className="flex flex-wrap gap-2">
                  {innovation.userGroups.map(g => (
                    <span key={g} className="px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-medium text-blue-700">{g}</span>
                  ))}
                </div>
              </SectionCard>
              <SectionCard title="Applications & Impact" icon={<Lightbulb className="h-5 w-5 text-emerald-600" />}>
                <ul className="space-y-2">
                  {innovation.applicationsImpact.split('.').filter(s => s.trim()).map((s, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-neutral-gray-dark">
                      <Lightbulb className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      {s.trim()}.
                    </li>
                  ))}
                </ul>
              </SectionCard>
              <SectionCard title="Recommendations" icon={<ThumbsUp className="h-5 w-5 text-emerald-600" />}>
                <ul className="space-y-2">
                  {innovation.recommendations.map((r, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-neutral-gray-dark">
                      <ChevronRight className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      {r}
                    </li>
                  ))}
                </ul>
              </SectionCard>
              <SectionCard title="Cautions" icon={<AlertTriangle className="h-5 w-5 text-amber-500" />}>
                <ul className="space-y-2">
                  {innovation.cautions.map((c, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-neutral-gray-dark">
                      <AlertTriangle className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
                      {c}
                    </li>
                  ))}
                </ul>
              </SectionCard>
            </div>
            <div className="space-y-6">
              <div className="rounded-xl border border-neutral-gray-light bg-white p-5 shadow-sm">
                <Button
                  className="w-full bg-brand-red-600 hover:bg-brand-red-700"
                  onClick={() => setIsContactModalOpen(true)}
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Message Innovator
                </Button>
              </div>
              <div className="rounded-xl border border-neutral-gray-light bg-white p-5 shadow-sm">
                <p className="text-xs font-bold text-neutral-gray-medium uppercase mb-3">Innovator</p>
                <div className="flex items-center gap-3">
                  <Image src={innovation.creatorImage} alt={innovation.creator} width={48} height={48} className="rounded-full object-cover border-2 border-brand-navy-100" />
                  <div>
                    <p className="font-bold text-neutral-black">{innovation.creator}</p>
                    <p className="text-xs text-neutral-gray-medium">{innovation.country}</p>
                  </div>
                </div>
              </div>
              <div className="rounded-xl border border-neutral-gray-light bg-white p-5 shadow-sm">
                <p className="text-xs font-bold text-neutral-gray-medium uppercase mb-3">Dimensions</p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-neutral-bg-light rounded-lg p-3 text-center">
                    <p className="text-xs text-neutral-gray-medium">Length</p>
                    <p className="font-bold text-neutral-black">{innovation.dimensions.length}</p>
                  </div>
                  <div className="bg-neutral-bg-light rounded-lg p-3 text-center">
                    <p className="text-xs text-neutral-gray-medium">Width</p>
                    <p className="font-bold text-neutral-black">{innovation.dimensions.width}</p>
                  </div>
                  <div className="bg-neutral-bg-light rounded-lg p-3 text-center">
                    <p className="text-xs text-neutral-gray-medium">Height</p>
                    <p className="font-bold text-neutral-black">{innovation.dimensions.height}</p>
                  </div>
                  <div className="bg-neutral-bg-light rounded-lg p-3 text-center">
                    <p className="text-xs text-neutral-gray-medium">Weight</p>
                    <p className="font-bold text-neutral-black">{innovation.dimensions.weight}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Awards Tab */}
        {activeTab === 'awards' && (
          <div className="grid lg:grid-cols-2 gap-6">
            <SectionCard title="Licenses & Certifications" icon={<ShieldCheck className="h-5 w-5 text-blue-600" />}>
              <div className="space-y-3">
                {innovation.licensesCertifications.map((lic, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-blue-50/50 border border-blue-100">
                    <ShieldCheck className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-bold text-neutral-black">{lic.name}</p>
                      <p className="text-xs text-neutral-gray-medium">{lic.issuer} &middot; {lic.year}</p>
                    </div>
                  </div>
                ))}
              </div>
            </SectionCard>
            <SectionCard title="Honorary Awards" icon={<Award className="h-5 w-5 text-amber-500" />}>
              <div className="space-y-3">
                {innovation.honoraryAwards.map((award, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-amber-50/50 border border-amber-100">
                    <Image src={award.image} alt={award.title} width={48} height={48} className="rounded-lg object-cover" />
                    <div>
                      <p className="text-sm font-bold text-neutral-black">{award.title}</p>
                      <p className="text-xs text-neutral-gray-medium">{award.organization} &middot; {award.year}</p>
                    </div>
                  </div>
                ))}
              </div>
            </SectionCard>
          </div>
        )}
        {/* Media Tab */}
        {activeTab === 'media' && (
          <div>
            <div className="flex flex-wrap gap-2 mb-6">
              {mediaCategories.map(cat => (
                <button
                  key={cat.category}
                  onClick={() => setActiveGalleryCategory(cat.category)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-all border",
                    (activeGalleryCategory === cat.category || (!activeGalleryCategory && cat === mediaCategories[0]))
                      ? "bg-brand-red-600 text-white border-brand-red-600"
                      : "bg-white text-neutral-gray-dark border-neutral-gray-light hover:border-brand-red-300"
                  )}
                >
                  <Camera className="h-3.5 w-3.5 inline mr-1" />
                  {cat.category}
                  <span className="ml-1.5 text-xs opacity-70">({cat.items.length})</span>
                </button>
              ))}
            </div>
            {mediaCategories.map(cat => {
              const isActive = activeGalleryCategory === cat.category || (!activeGalleryCategory && cat === mediaCategories[0]);
              if (!isActive) return null;
              return (
                <div key={cat.category} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {cat.items.map((item, i) => (
                    <div key={i} className="group relative rounded-xl overflow-hidden border border-neutral-gray-light bg-white shadow-sm cursor-pointer"
                      onClick={() => setPreviewImage({ src: item.url, alt: item.caption })}
                    >
                      <div className="aspect-video relative overflow-hidden">
                        {item.type === 'video' ? (
                          <video src={item.url} controls className="h-full w-full object-cover" />
                        ) : (
                          <Image src={item.url} alt={item.caption} fill sizes="33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                        )}
                      </div>
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                        <Maximize2 className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <div className="p-3">
                        <p className="text-xs text-neutral-gray-dark">{item.caption}</p>
                        <span className="text-[10px] uppercase text-neutral-gray-medium font-bold">{item.type}</span>
                      </div>
                    </div>
                  ))}
                </div>
              );
            })}
            {mediaCategories.every(cat => cat.items.length === 0) && (
              <p className="text-center text-neutral-gray-medium py-12">No media available yet.</p>
            )}
          </div>
        )}

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
