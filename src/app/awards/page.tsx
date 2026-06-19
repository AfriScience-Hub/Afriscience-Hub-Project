'use client';

import { useState, useMemo } from 'react';
import { Search, X } from 'lucide-react';
import { AWARD_WINNERS, AWARD_TYPES, COMPETITION_TYPES } from '../data/mockData';
import { getLevelsForCompetition } from './data';
import AwardsHeader from './components/AwardsHeader';
import AwardsFilterSidebar from './components/AwardsFilterSidebar';
import AwardCard from './components/AwardCard';
import PreviewModal from './components/PreviewModal';

export default function Awards() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedCompetition, setSelectedCompetition] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<string>('2026');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [preview, setPreview] = useState<{ type: 'badge' | 'certificate' | 'presentation'; url: string } | null>(null);

  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({
    type: false, category: true, level: true, year: false, country: true,
  });

  const toggleSection = (key: string) =>
    setCollapsedSections(prev => ({ ...prev, [key]: !prev[key] }));

  const filteredAwards = useMemo(() => {
    return AWARD_WINNERS.filter(a => {
      const term = searchTerm.toLowerCase();
      const matchesSearch = !term ||
        a.name.toLowerCase().includes(term) ||
        a.type.toLowerCase().includes(term) ||
        a.country.toLowerCase().includes(term) ||
        a.year.toString().includes(term) ||
        (a.competition || '').toLowerCase().includes(term) ||
        (a.category || '').toLowerCase().includes(term) ||
        a.id.toLowerCase().includes(term) ||
        a.rewards.some(r => r.toLowerCase().includes(term));

      const matchesType = !selectedType || a.type === selectedType;
      const matchesYear = !selectedYear || a.year.toString() === selectedYear;
      const matchesCountry = !selectedCountry || a.country === selectedCountry;
      const matchesComp = !selectedCompetition || a.competition === selectedCompetition;

      const lvls = selectedCompetition ? getLevelsForCompetition(selectedCompetition) : [];
      const isAuto = lvls.length === 1;
      const matchesLevel = !selectedLevel || isAuto || a.category === selectedLevel;

      return matchesSearch && matchesType && matchesYear && matchesCountry && matchesComp && matchesLevel;
    });
  }, [searchTerm, selectedType, selectedCompetition, selectedLevel, selectedYear, selectedCountry]);

  const resetFilters = () => {
    setSelectedType(null);
    setSelectedCompetition(null);
    setSelectedLevel(null);
    setSelectedYear('2026');
    setSelectedCountry('');
  };

  const activeFilterCount = (selectedType ? 1 : 0) + (selectedCompetition ? 1 : 0) + (selectedLevel ? 1 : 0) + (selectedCountry ? 1 : 0);

  const previewTitle = preview
    ? (preview.type === 'badge'
        ? (selectedType === 'Competitions Award' ? 'Medal Preview' : 'Badge Preview')
        : preview.type === 'certificate' ? 'Certificate Preview' : 'Award Presentation Preview')
    : '';

  return (
    <div className="min-h-screen bg-neutral-bg-light py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        <AwardsHeader
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          activeFilterCount={activeFilterCount}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          onShare={() => {}}
        />

        <div className="flex flex-col lg:flex-row gap-8">

          <AwardsFilterSidebar
            selectedType={selectedType}
            selectedCompetition={selectedCompetition}
            selectedLevel={selectedLevel}
            selectedYear={selectedYear}
            selectedCountry={selectedCountry}
            activeFilterCount={activeFilterCount}
            showFilters={showFilters}
            collapsedSections={collapsedSections}
            setSelectedType={setSelectedType}
            setSelectedCompetition={setSelectedCompetition}
            setSelectedLevel={setSelectedLevel}
            setSelectedYear={setSelectedYear}
            setSelectedCountry={setSelectedCountry}
            toggleSection={toggleSection}
            resetFilters={resetFilters}
          />

          <div className="flex-1">
            <div className="mb-4 flex items-center justify-between text-sm text-slate-500">
              <span>Showing <strong>{filteredAwards.length}</strong> award{filteredAwards.length !== 1 ? 's' : ''}</span>
              <div className="flex gap-2 flex-wrap">
                {selectedType && (
                  <span className="inline-flex items-center gap-1 text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                    {selectedType}
                    <button onClick={() => { setSelectedType(null); setSelectedCompetition(null); setSelectedLevel(null); }} className="hover:text-brand-red-600"><X className="h-3 w-3" /></button>
                  </span>
                )}
              </div>
            </div>

            {filteredAwards.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {filteredAwards.map(award => (
                  <AwardCard key={award.id} award={award} onPreview={(type, url) => setPreview({ type, url })} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center rounded-xl border-2 border-dashed border-neutral-gray-light bg-white">
                <Search className="h-12 w-12 text-slate-300 mb-4" />
                <h3 className="text-lg font-medium text-neutral-black">No awards found</h3>
                <p className="text-slate-500 max-w-sm mt-1">Try adjusting your filters or search terms.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <PreviewModal
        isOpen={!!preview}
        onClose={() => setPreview(null)}
        imageUrl={preview?.url || ''}
        title={previewTitle}
      />
    </div>
  );
}
