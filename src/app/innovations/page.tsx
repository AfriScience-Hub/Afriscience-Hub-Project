'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { INNOVATIONS } from '../data/mockData';
import { Button } from '../components/ui/Button';
import { ImagePreviewModal } from './components/InnovationHelpers';
import InnovationHeader from './components/InnovationHeader';
import InnovationFilters from './components/InnovationFilters';
import InnovationCard from './components/InnovationCard';
import { toast } from 'sonner';

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

  const [showFilters, setShowFilters] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (key: string) =>
    setOpenSection(prev => prev === key ? null : key);

  const activeFilterCount =
    (selectedField ? 1 : 0) + selectedInterests.length + (selectedOwnership ? 1 : 0) +
    selectedSDGs.length + (selectedCountry ? 1 : 0) + (selectedStages ? 1 : 0);

  const filteredInnovations = INNOVATIONS.filter(inn => {
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
          </div>
        </div>
      </div>

      {previewImage && (
        <ImagePreviewModal src={previewImage.src} alt={previewImage.alt} onClose={() => setPreviewImage(null)} />
      )}
    </div>
  );
}
