'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { ImagePreviewModal } from './components/InnovationHelpers';
import InnovationHeader from './components/InnovationHeader';
import InnovationFilters from './components/InnovationFilters';
import InnovationCard from './components/InnovationCard';
import { toast } from 'sonner';
import {
  fetchVisitorInnovations,
  mapVisitorInnovation,
  type VisitorInnovationFilters,
} from './visitorApi';

interface Innovation {
  id: string;
  name: string;
  idTag: string;
  field: string[];
  interests: string[];
  ownership: string;
  stage: string;
  sdgs: string[];
  image: string;
  status: 'Online' | 'Offline';
  verified?: boolean;
  country: string;
  state: string;
  location: string;
  description: string;
  dimensions: { length: string; width: string; height: string; weight: string };
  userGroups: string[];
  applications: string[];
  impact: string[];
  specifications: { materials: string[]; dimensions: string; weight: string };
  licensesCertifications: { name: string; issuer: string; year: number }[];
  recommendations: string[];
  cautions: string[];
  honoraryAwards: { title: string; year: number; organization: string; image: string }[];
  mediaGallery: { category: string; items: { type: 'image' | 'video'; url: string; caption: string }[] }[];
  views: number;
  likes: number;
  favorites: number;
  shares: number;
  creator: string;
  creatorImage: string;
  creatorBio: string;
  creatorSpecializations: string[];
  creatorExperience: string;
  creatorAffiliation: string;
}

export default function Innovations() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedField, setSelectedField] = useState('');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedOwnership, setSelectedOwnership] = useState('');
  const [selectedSDGs, setSelectedSDGs] = useState<string[]>([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedStages, setSelectedStages] = useState('');
  const [archivedIds, setArchivedIds] = useState<string[]>([]);
  const [previewImage, setPreviewImage] = useState<{ src: string; alt: string } | null>(null);
  const [innovations, setInnovations] = useState<Innovation[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const pageRef = useRef(1);
  const observerRef = useRef<HTMLDivElement>(null);
  const isFetchingRef = useRef(false);

  const [showFilters, setShowFilters] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (key: string) =>
    setOpenSection(prev => prev === key ? null : key);

  const activeFilterCount =
    (selectedField ? 1 : 0) + selectedInterests.length + (selectedOwnership ? 1 : 0) +
    selectedSDGs.length + (selectedCountry ? 1 : 0) + (selectedStages ? 1 : 0);

  // No limit param — the backend controls page size. We only pass page for pagination.
  const buildFilters = useCallback((): VisitorInnovationFilters => ({
    field: selectedField || undefined,
    interests: selectedInterests.length ? selectedInterests : undefined,
    ownership: selectedOwnership || undefined,
    sdgs: selectedSDGs.length ? selectedSDGs : undefined,
    country: selectedCountry || undefined,
    stage: selectedStages || undefined,
    page: pageRef.current,
  }), [selectedField, selectedInterests, selectedOwnership, selectedSDGs, selectedCountry, selectedStages]);

  const fetchPage = useCallback(async (append = false) => {
    if (isFetchingRef.current) return;
    isFetchingRef.current = true;

    if (append) {
      setLoadingMore(true);
    } else {
      setLoading(true);
    }
    setError(null);
    try {
      const res = await fetchVisitorInnovations(buildFilters());
      const mapped = res.data.map(mapVisitorInnovation);
      if (append) {
        setInnovations(prev => [...prev, ...mapped]);
        pageRef.current += 1;
      } else {
        setInnovations(mapped);
        pageRef.current = 1;
      }
      // Use the backend's authoritative hasNext instead of guessing from data length.
      setHasMore(Boolean(res.pagination?.hasNext));
    } catch (err: any) {
      setError(err?.message || 'Failed to load innovations. Please try again.');
    } finally {
      setLoading(false);
      setLoadingMore(false);
      isFetchingRef.current = false;
    }
  }, [buildFilters]);

  // Load on mount and whenever filters change.
  useEffect(() => {
    pageRef.current = 1;
    setHasMore(true);
    fetchPage(false);
  }, [fetchPage]);

  // Infinite scroll: fetch more when the sentinel enters the viewport.
  useEffect(() => {
    const el = observerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loadingMore && !loading && !isFetchingRef.current) {
          pageRef.current += 1;
          fetchPage(true);
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [hasMore, loadingMore, loading, fetchPage]);

  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedField('');
    setSelectedInterests([]);
    setSelectedOwnership('');
    setSelectedSDGs([]);
    setSelectedCountry('');
    setSelectedStages('');
    pageRef.current = 1;
    setHasMore(true);
    fetchPage(false);
  };

  const filteredInnovations = innovations.filter(inn => {
    const q = searchTerm.toLowerCase();
    const matchesSearch =
      inn.name.toLowerCase().includes(q) ||
      inn.field.some(f => f.toLowerCase().includes(q)) ||
      inn.creator.toLowerCase().includes(q) ||
      inn.location.toLowerCase().includes(q) ||
      inn.idTag.toLowerCase().includes(q) ||
      inn.ownership.toLowerCase().includes(q) ||
      inn.stage.toLowerCase().includes(q);
    return matchesSearch;
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

  const liveInnovations = innovations;

  return (
    <div className="min-h-screen bg-neutral-bg-light py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        <InnovationHeader
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          activeFilterCount={activeFilterCount}
        />

        <div className="flex flex-col lg:flex-row gap-8">

          <InnovationFilters
            activeFilterCount={activeFilterCount}
            selectedField={selectedField}
            setSelectedField={setSelectedField}
            selectedInterests={selectedInterests}
            setSelectedInterests={setSelectedInterests}
            selectedOwnership={selectedOwnership}
            setSelectedOwnership={setSelectedOwnership}
            selectedSDGs={selectedSDGs}
            setSelectedSDGs={setSelectedSDGs}
            selectedCountry={selectedCountry}
            setSelectedCountry={setSelectedCountry}
            selectedStages={selectedStages}
            setSelectedStages={setSelectedStages}
            showFilters={showFilters}
            openSection={openSection}
            toggleSection={toggleSection}
            clearAllFilters={clearAllFilters}
          />

          <div className="flex-1">
            <div className="mb-4 relative">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-gray-medium" />
              <input
                type="text"
                placeholder="Search innovations by name, ID tag, field, creator, location, ownership, or stage..."
                className="w-full rounded-xl border border-neutral-gray-light pl-12 pr-4 py-3 shadow-sm focus:border-brand-red-600 focus:outline-none focus:ring-1 focus:ring-brand-red-600 transition-all"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>

            <p className="mb-4 text-sm text-neutral-gray-medium">{filteredInnovations.length} innovation{filteredInnovations.length !== 1 ? 's' : ''} found</p>

            {error ? (
              <div className="rounded-xl border border-brand-red-100 bg-brand-red-50 p-4 text-brand-red-700 text-sm mb-6">
                {error}
                <button
                  onClick={() => fetchPage(false)}
                  className="mt-2 text-xs underline hover:text-brand-red-900"
                >
                  Try again
                </button>
              </div>
            ) : loading ? (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="h-48 w-full rounded-xl bg-neutral-gray-light mb-3" />
                    <div className="h-4 w-3/4 rounded bg-neutral-gray-light mb-2" />
                    <div className="h-3 w-1/2 rounded bg-neutral-gray-light mb-1" />
                    <div className="h-3 w-1/3 rounded bg-neutral-gray-light" />
                  </div>
                ))}
              </div>
            ) : liveInnovations.length === 0 ? (
              <div className="text-center py-16">
                <div className="mx-auto w-16 h-16 rounded-full bg-neutral-bg-light flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-neutral-gray-medium" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-neutral-black mb-2">No innovations yet</h3>
                <p className="text-neutral-gray-medium max-w-md mx-auto">Approved innovations will appear here once they go live on the platform.</p>
              </div>
            ) : (
              <>
                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {filteredInnovations.map(inn => (
                    <InnovationCard
                      key={inn.id}
                      inn={inn}
                      archived={archivedIds.includes(inn.id)}
                      onToggleArchive={() => toggleArchive(inn.id)}
                      onPreview={(src, alt) => setPreviewImage({ src, alt })}
                    />
                  ))}
                </div>

                {filteredInnovations.length === 0 && (
                  <div className="text-center py-16">
                    <p className="text-neutral-gray-medium text-lg">No innovations found matching your criteria.</p>
                    <Button variant="outline" className="mt-4" onClick={clearAllFilters}>Clear Filters</Button>
                  </div>
                )}

                {loadingMore && (
                  <div className="mt-6 flex justify-center">
                    <div className="h-4 w-4 rounded-full border-2 border-neutral-gray-light border-t-brand-red-600 animate-spin" />
                  </div>
                )}

                {hasMore && (
                  <div ref={observerRef} className="h-20" />
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {previewImage && (
        <ImagePreviewModal src={previewImage.src} alt={previewImage.alt} onClose={() => setPreviewImage(null)} />
      )}
    </div>
  );
}
