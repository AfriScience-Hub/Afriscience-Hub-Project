'use client';

import { useMemo, useState } from 'react';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import {
  IMPACT_STORIES,
  type ImpactProgram,
  type ImpactStatus,
  type ImpactStory,
  getCardPrimaryTitle,
} from '@/app/data/impactData';
import { Button } from '@/app/components/ui/Button';
import ImpactHero from './components/ImpactHero';
import ImpactFilters from './components/ImpactFilters';
import ImpactCard from './components/ImpactCard';
import ImagePreviewModal from './components/ImagePreviewModal';

export default function Impact() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPrograms, setSelectedPrograms] = useState<ImpactProgram[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<ImpactStatus[]>([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [previewImage, setPreviewImage] = useState<{ src: string; alt: string } | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({
    programs: false,
    status: false,
    year: true,
    country: true,
  });

  const toggleSection = (key: string) =>
    setCollapsedSections((prev) => ({ ...prev, [key]: !prev[key] }));

  const toggleProgram = (p: ImpactProgram) =>
    setSelectedPrograms((prev) =>
      prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]
    );

  const toggleStatus = (s: ImpactStatus) =>
    setSelectedStatuses((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );

  const activeFilterCount =
    selectedPrograms.length +
    selectedStatuses.length +
    (selectedCountry ? 1 : 0) +
    (selectedYear ? 1 : 0);

  const filteredImpact = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    return IMPACT_STORIES.filter((story) => {
      const matchesSearch = !q || matchesQuery(story, q);
      const matchesProgram =
        selectedPrograms.length === 0 || selectedPrograms.includes(story.program);
      const matchesStatus =
        selectedStatuses.length === 0 || selectedStatuses.includes(story.status);
      const matchesCountry = !selectedCountry || story.location.country === selectedCountry;
      const matchesYear = !selectedYear || story.year === selectedYear;
      return matchesSearch && matchesProgram && matchesStatus && matchesCountry && matchesYear;
    });
  }, [searchTerm, selectedPrograms, selectedStatuses, selectedCountry, selectedYear]);

  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedPrograms([]);
    setSelectedStatuses([]);
    setSelectedCountry('');
    setSelectedYear('');
  };

  return (
    <div className="min-h-screen bg-neutral-bg-light pb-8">
      <ImpactHero />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-4 lg:hidden">
          <Button
            variant="outline"
            className="w-full gap-2"
            onClick={() => setShowFilters((v) => !v)}
          >
            <SlidersHorizontal className="h-4 w-4" />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
            {activeFilterCount > 0 && (
              <span className="ml-1 rounded-full bg-brand-red-600 text-white text-[10px] font-bold px-1.5 py-0.5">
                {activeFilterCount}
              </span>
            )}
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <ImpactFilters
            showFilters={showFilters}
            activeFilterCount={activeFilterCount}
            selectedPrograms={selectedPrograms}
            selectedStatuses={selectedStatuses}
            selectedCountry={selectedCountry}
            selectedYear={selectedYear}
            collapsedSections={collapsedSections}
            onToggleSection={toggleSection}
            onToggleProgram={toggleProgram}
            onToggleStatus={toggleStatus}
            onCountryChange={setSelectedCountry}
            onYearChange={setSelectedYear}
            onClearAll={clearAllFilters}
          />

          <main className="flex-1">
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-gray-medium" />
                <input
                  type="text"
                  placeholder="Search by program, title, name, year, country or keyword..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-neutral-gray-light focus:ring-2 focus:ring-brand-red-600 focus:border-brand-red-600 transition-all"
                />
              </div>
            </div>

            <div className="mb-5 flex items-center justify-between">
              <p className="text-sm text-neutral-gray-medium">
                Showing{' '}
                <span className="font-bold text-neutral-black">{filteredImpact.length}</span>{' '}
                impact {filteredImpact.length === 1 ? 'record' : 'records'}
              </p>
            </div>

            {filteredImpact.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredImpact.map((story) => (
                  <ImpactCard
                    key={story.id}
                    story={story}
                    onPreview={(src, alt) => setPreviewImage({ src, alt })}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-neutral-bg-light mb-4">
                  <Filter className="h-8 w-8 text-neutral-gray-medium" />
                </div>
                <h3 className="font-bold text-neutral-black mb-2">No Impacts Found</h3>
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

function matchesQuery(story: ImpactStory, q: string): boolean {
  const haystack = [
    story.program,
    story.idTag,
    story.year,
    story.location.country,
    story.location.stateRegion,
    story.summary,
    story.status,
    getCardPrimaryTitle(story),
    story.careerPath,
    story.companyName,
    story.researchLevel,
    story.researchTitle,
    story.scholarshipLevel,
    story.departmentName,
    ...(story.people?.map((p) => p.name) ?? []),
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();
  return haystack.includes(q);
}
