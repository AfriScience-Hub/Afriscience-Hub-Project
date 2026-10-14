'use client';

import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { ImagePreviewModal } from './components/InnovationHelpers';
import InnovationHeader from './components/InnovationHeader';
import InnovationFilters from './components/InnovationFilters';
import InnovationCard from './components/InnovationCard';
import { toast } from 'sonner';

interface Innovation {
  id: string;
  name: string;
  idTag: string;
  field: string;
  interests: string[];
  ownership: string;
  stage: string;
  sdgs: string[];
  image: string;
  status: 'Online' | 'Offline';
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

  const [showFilters, setShowFilters] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (key: string) =>
    setOpenSection(prev => prev === key ? null : key);

  const activeFilterCount =
    (selectedField ? 1 : 0) + selectedInterests.length + (selectedOwnership ? 1 : 0) +
    selectedSDGs.length + (selectedCountry ? 1 : 0) + (selectedStages ? 1 : 0);

  // TODO: Replace with actual API call when endpoint is ready
  // useEffect(() => {
  //   const fetchInnovations = async () => {
  //     try {
  //       const response = await fetch('/api/innovations?status=Online');
  //       const data = await response.json();
  //       setInnovations(data);
  //     } catch (error) {
  //       console.error('Failed to fetch innovations:', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchInnovations();
  // }, []);

  // For now, keep empty array until API is ready
  useEffect(() => {
    setLoading(false);
  }, []);

  const filteredInnovations = innovations.filter(inn => {
    // Only show live (Online) innovations
    if (inn.status !== 'Online') return false;
    
    const q = searchTerm.toLowerCase();
    const matchesSearch =
      inn.name.toLowerCase().includes(q) ||
      inn.field.toLowerCase().includes(q) ||
      inn.creator.toLowerCase().includes(q) ||
      inn.location.toLowerCase().includes(q) ||
      inn.idTag.toLowerCase().includes(q) ||
      inn.ownership.toLowerCase().includes(q) ||
      inn.stage.toLowerCase().includes(q);
    const matchesField = !selectedField || inn.field === selectedField;
    const matchesInterest = selectedInterests.length === 0 || inn.interests.some(i => selectedInterests.includes(i));
    const matchesOwnership = !selectedOwnership || inn.ownership === selectedOwnership;
    const matchesSDG = selectedSDGs.length === 0 || inn.sdgs.some(s => selectedSDGs.includes(s));
    const matchesCountry = !selectedCountry || inn.country === selectedCountry;
    const matchesStage = !selectedStages || inn.stage === selectedStages;
    return matchesSearch && matchesField && matchesInterest && matchesOwnership && matchesSDG && matchesCountry && matchesStage;
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

  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedField('');
    setSelectedInterests([]);
    setSelectedOwnership('');
    setSelectedSDGs([]);
    setSelectedCountry('');
    setSelectedStages('');
  };

  // All live innovations (before search/filter) - used for empty state check
  const liveInnovations = innovations.filter(inn => inn.status === 'Online');

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

            {loading ? (
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
              // Placeholder when no live innovations exist at all
              <div className="text-center py-16">
                <div className="mx-auto w-16 h-16 rounded-full bg-neutral-bg-light flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-neutral-gray-medium" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-neutral-black mb-2">No live innovations yet</h3>
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
