'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Search, Filter, Eye, Share2, Archive, ArchiveX,
  MapPin, ChevronDown, X, SlidersHorizontal, Users, DollarSign
} from 'lucide-react';
import {
  IMPACT_STORIES,
  IMPACT_CAUSES,
  IMPACT_COUNTRIES,
  IMPACT_YEARS,
  type ImpactStory
} from '../data/impactData';
import { Button } from '../components/ui/Button';
import { toast } from 'sonner';
import { cn } from '../../lib/utils';

/* ─── Image Preview Modal ─── */
function ImagePreviewModal({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" onClick={onClose}>
      <div className="relative max-w-3xl max-h-[90vh]" onClick={e => e.stopPropagation()}>
        <Image src={src} alt={alt} width={0} height={0} sizes="100vw" className="max-h-[85vh] max-w-full rounded-lg object-contain shadow-2xl" />
        <button onClick={onClose} className="absolute -top-3 -right-3 rounded-full bg-white p-1.5 shadow-lg hover:bg-neutral-bg-light">
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

export default function Impact() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCauses, setSelectedCauses] = useState<string[]>([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [archivedIds, setArchivedIds] = useState<string[]>([]);
  const [previewImage, setPreviewImage] = useState<{ src: string; alt: string } | null>(null);

  const [showFilters, setShowFilters] = useState(false);
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({
    cause: false,
    country: true,
    year: true,
  });

  const toggleSection = (key: string) =>
    setCollapsedSections(prev => ({ ...prev, [key]: !prev[key] }));

  const toggleFilter = (value: string, setter: React.Dispatch<React.SetStateAction<string[]>>) =>
    setter(prev => prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]);

  const activeFilterCount =
    selectedCauses.length + (selectedCountry ? 1 : 0) + (selectedYear ? 1 : 0);

  const filteredImpact = IMPACT_STORIES.filter(story => {
    const q = searchTerm.toLowerCase();
    const matchesSearch =
      story.title.toLowerCase().includes(q) ||
      story.country.toLowerCase().includes(q) ||
      story.cause.toLowerCase().includes(q) ||
      story.summary.toLowerCase().includes(q);
    const matchesCause = selectedCauses.length === 0 || selectedCauses.includes(story.cause);
    const matchesCountry = !selectedCountry || story.country === selectedCountry;
    const matchesYear = !selectedYear || story.year === selectedYear;
    return matchesSearch && matchesCause && matchesCountry && matchesYear;
  });

  const toggleArchive = (id: string) => {
    if (archivedIds.includes(id)) {
      setArchivedIds(prev => prev.filter(i => i !== id));
      toast.success('Removed from archive');
    } else {
      setArchivedIds(prev => [...prev, id]);
      toast.success('Added to archive');
    }
  };

  const handleShare = (story: ImpactStory) => {
    navigator.clipboard.writeText(`${window.location.origin}/impact/${story.id}`);
    toast.success('Link copied to clipboard!');
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedCauses([]);
    setSelectedCountry('');
    setSelectedYear('');
  };

  return (
    <div className="min-h-screen bg-neutral-bg-light pb-8">
      
      {/* Hero Section */}
      <section className="relative bg-brand-navy-900 py-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1200"
            alt="Impact"
            fill
            className="object-cover opacity-20"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-navy-900/60 to-brand-navy-900" />
        </div>
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-green-500/20 text-green-400 px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
              <Users className="h-4 w-4" />
              Making a Difference
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-4 tracking-tight">
              Impact Stories
            </h1>
            <p className="text-slate-300 text-lg max-w-2xl mb-8">
              Explore how donations have been used to create meaningful impact across different causes, communities, and individuals. Join us in making a difference.
            </p>
            <Link href="/impact/apply">
              <Button size="lg" className="bg-brand-red-600 hover:bg-brand-red-700 h-12 px-8">
                Apply for Support
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <div className="flex flex-col lg:flex-row gap-8">

          {/* ────── SIDEBAR FILTERS ────── */}
          <aside className={cn(
            "w-full lg:w-80 flex-shrink-0 space-y-4 transition-all duration-300",
            showFilters ? "block" : "hidden lg:block"
          )}>
            <div className="rounded-xl border border-neutral-gray-light bg-white p-5 shadow-sm lg:sticky lg:top-20 max-h-[calc(100vh-6rem)] overflow-y-auto custom-scrollbar">
              
              {/* Filter Header with Reset All */}
              <div className="mb-4 flex items-center justify-between border-b border-neutral-gray-light pb-3">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-brand-red-600" />
                  <h3 className="font-bold text-neutral-black">Filters</h3>
                  {activeFilterCount > 0 && (
                    <span className="flex items-center justify-center h-5 min-w-5 px-1.5 rounded-full bg-brand-red-600 text-white text-[10px] font-bold">
                      {activeFilterCount}
                    </span>
                  )}
                </div>
                <button 
                  onClick={clearAllFilters}
                  className="text-xs text-brand-red-600 hover:underline font-medium"
                >
                  Reset All
                </button>
              </div>

              <div className="space-y-5">

                {/* Cause */}
                <div>
                  <button onClick={() => toggleSection('cause')} className="w-full flex items-center justify-between text-sm font-bold text-neutral-black mb-2">
                    <span className="flex items-center gap-1.5">
                      Cause
                      {selectedCauses.length > 0 && (
                        <span className="text-[10px] font-bold text-brand-red-600 bg-brand-red-100 px-1.5 py-0.5 rounded-full">{selectedCauses.length}</span>
                      )}
                    </span>
                    <ChevronDown className={cn("h-4 w-4 text-neutral-gray-medium transition-transform", !collapsedSections.cause && "rotate-180")} />
                  </button>
                  {!collapsedSections.cause && (
                    <div className="space-y-1.5 max-h-52 overflow-y-auto pr-2">
                      {IMPACT_CAUSES.map(cause => (
                        <label key={cause} className="flex items-center gap-2 cursor-pointer group">
                          <input type="checkbox" checked={selectedCauses.includes(cause)} onChange={() => toggleFilter(cause, setSelectedCauses)}
                            className="rounded border-neutral-gray-light text-brand-red-600 focus:ring-brand-red-600 h-3.5 w-3.5" />
                          <span className="text-sm text-neutral-gray-dark group-hover:text-brand-navy-900 transition-colors">{cause}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                {/* Country */}
                <div>
                  <button onClick={() => toggleSection('country')} className="w-full flex items-center justify-between text-sm font-bold text-neutral-black mb-2">
                    <span className="flex items-center gap-1.5">
                      Country
                      {selectedCountry && (
                        <span className="text-[10px] font-bold text-brand-red-600 bg-brand-red-100 px-1.5 py-0.5 rounded-full">1</span>
                      )}
                    </span>
                    <ChevronDown className={cn("h-4 w-4 text-neutral-gray-medium transition-transform", !collapsedSections.country && "rotate-180")} />
                  </button>
                  {!collapsedSections.country && (
                    <div className="space-y-1.5">
                      <select
                        value={selectedCountry}
                        onChange={(e) => setSelectedCountry(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-neutral-gray-light focus:ring-2 focus:ring-brand-red-600 focus:border-brand-red-600 transition-all text-sm"
                      >
                        <option value="">All Countries</option>
                        {IMPACT_COUNTRIES.map(country => (
                          <option key={country} value={country}>{country}</option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>

                {/* Year */}
                <div>
                  <button onClick={() => toggleSection('year')} className="w-full flex items-center justify-between text-sm font-bold text-neutral-black mb-2">
                    <span className="flex items-center gap-1.5">
                      Year
                      {selectedYear && (
                        <span className="text-[10px] font-bold text-brand-red-600 bg-brand-red-100 px-1.5 py-0.5 rounded-full">1</span>
                      )}
                    </span>
                    <ChevronDown className={cn("h-4 w-4 text-neutral-gray-medium transition-transform", !collapsedSections.year && "rotate-180")} />
                  </button>
                  {!collapsedSections.year && (
                    <div className="space-y-1.5">
                      <select
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-neutral-gray-light focus:ring-2 focus:ring-brand-red-600 focus:border-brand-red-600 transition-all text-sm"
                      >
                        <option value="">All Years</option>
                        {IMPACT_YEARS.map(year => (
                          <option key={year} value={year}>{year}</option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>

              </div>

              {/* Reset Button */}
              {activeFilterCount > 0 && (
                <button
                  onClick={clearAllFilters}
                  className="mt-5 w-full py-2.5 px-4 rounded-lg bg-brand-red-50 text-brand-red-600 text-sm font-bold hover:bg-brand-red-100 transition-colors"
                >
                  Reset All Filters
                </button>
              )}
            </div>
          </aside>

          {/* ────── MAIN CONTENT ────── */}
          <main className="flex-1">
            
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-gray-medium" />
                <input
                  type="text"
                  placeholder="Search by title, country, cause..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-neutral-gray-light focus:ring-2 focus:ring-brand-red-600 focus:border-brand-red-600 transition-all"
                />
              </div>
            </div>

            {/* Results Count */}
            <div className="mb-5 flex items-center justify-between">
              <p className="text-sm text-neutral-gray-medium">
                Showing <span className="font-bold text-neutral-black">{filteredImpact.length}</span> impact {filteredImpact.length === 1 ? 'story' : 'stories'}
              </p>
            </div>

            {/* Impact Cards Grid */}
            {filteredImpact.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredImpact.map(story => {
                  const isArchived = archivedIds.includes(story.id);
                  return (
                    <div
                      key={story.id}
                      className={cn(
                        "rounded-2xl border bg-white shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group",
                        isArchived ? "border-neutral-gray-medium opacity-60" : "border-neutral-gray-light hover:border-brand-red-200"
                      )}
                    >
                      {/* Image */}
                      <div className="relative h-48 bg-neutral-bg-light overflow-hidden">
                        <Image src={story.image} alt={story.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                        
                        {/* Top Left - View DP */}
                        <button
                          onClick={() => setPreviewImage({ src: story.image, alt: story.title })}
                          className="absolute top-3 left-3 h-8 w-8 rounded-full bg-black/60 backdrop-blur-sm hover:bg-black/75 flex items-center justify-center transition-colors shadow-sm"
                          title="View Image"
                        >
                          <Eye className="h-4 w-4 text-white" />
                        </button>

                        {/* Top Right - Share & Archive */}
                        <div className="absolute top-3 right-3 flex gap-2">
                          <button
                            onClick={() => handleShare(story)}
                            className="h-8 w-8 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white flex items-center justify-center transition-colors shadow-sm"
                            title="Share"
                          >
                            <Share2 className="h-4 w-4 text-neutral-gray-dark" />
                          </button>
                          <button
                            onClick={() => toggleArchive(story.id)}
                            className="h-8 w-8 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white flex items-center justify-center transition-colors shadow-sm"
                            title={isArchived ? 'Unarchive' : 'Archive'}
                          >
                            {isArchived ? (
                              <ArchiveX className="h-4 w-4 text-brand-red-600" />
                            ) : (
                              <Archive className="h-4 w-4 text-neutral-gray-dark" />
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5">
                        {/* Title */}
                        <h3 className="font-bold text-neutral-black mb-1 line-clamp-1">{story.title}</h3>
                        
                        {/* Country */}
                        <div className="flex items-center gap-1.5 text-xs text-neutral-gray-medium mb-3">
                          <MapPin className="h-3 w-3" />
                          <span>{story.country}</span>
                        </div>

                        {/* Summary */}
                        <p className="text-sm text-neutral-gray-dark mb-4 line-clamp-2">
                          {story.summary}
                        </p>

                        {/* Impact Metrics */}
                        <div className="flex items-center gap-4 mb-4 pb-4 border-b border-neutral-gray-light">
                          {story.beneficiaries && (
                            <div className="flex items-center gap-1.5">
                              <Users className="h-4 w-4 text-brand-navy-900" />
                              <div>
                                <p className="text-xs font-bold text-neutral-black">{story.beneficiaries.toLocaleString()}</p>
                                <p className="text-[10px] text-neutral-gray-medium">Beneficiaries</p>
                              </div>
                            </div>
                          )}
                          <div className="flex items-center gap-1.5">
                            <DollarSign className="h-4 w-4 text-green-600" />
                            <div>
                              <p className="text-xs font-bold text-neutral-black">{story.amountUtilized}</p>
                              <p className="text-[10px] text-neutral-gray-medium">Utilized</p>
                            </div>
                          </div>
                        </div>

                        {/* Impact Type & CTA */}
                        <div className="flex items-center justify-between gap-3">
                          <span className="inline-flex px-2 py-1 rounded-full text-[10px] font-bold bg-green-100 text-green-700">
                            {story.impactType}
                          </span>
                          <Link href={`/impact/${story.id}`}>
                            <Button size="sm" className="bg-brand-navy-900 hover:bg-brand-navy-800">
                              View Details
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-neutral-bg-light mb-4">
                  <Filter className="h-8 w-8 text-neutral-gray-medium" />
                </div>
                <h3 className="font-bold text-neutral-black mb-2">No Impact Stories Found</h3>
                <p className="text-sm text-neutral-gray-medium mb-4">
                  Try adjusting your filters or search term
                </p>
                {activeFilterCount > 0 && (
                  <Button onClick={clearAllFilters} variant="outline">
                    Clear All Filters
                  </Button>
                )}
              </div>
            )}

          </main>

        </div>
      </div>

      {/* Image Preview Modal */}
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