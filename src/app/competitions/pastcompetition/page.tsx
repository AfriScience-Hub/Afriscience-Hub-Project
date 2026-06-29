'use client';

import { useState, useMemo } from 'react';
import { Search, MapPin, SlidersHorizontal } from 'lucide-react';
import { CONCLUDED_VOTING_FINALISTS, COMPETITION_TYPES, AFRICAN_COUNTRIES } from '@/app/data/mockData';
import { Button } from '@/app/components/ui/Button';
import { ViewWorkModal } from '@/app/components/modals/ViewWorkModal';
import { CompetitionsHeader } from '../components/CompetitionsHeader';
import PastFilterSidebar from './components/PastFilterSidebar';
import PastFinalistCard, { type ConcludedFinalist } from './components/PastFinalistCard';

const CATEGORIES_BY_TYPE: Record<string, string[]> = {
  'Afri \u2013 Anime': ['General (18+)'],
  'Afri \u2013 Presentations': ['Lower Primary', 'Upper Primary', 'Junior Secondary', 'Senior Secondary', 'Undergraduates', 'Graduates'],
  'Afri \u2013 Memes': ['General (18+)'],
  'Afri \u2013 MySpace': ['General (18+)'],
};

export default function PastCompetitions() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedPosition, setSelectedPosition] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({
    type: false, category: false, position: false, year: false, country: false,
  });
  const [viewWorkData, setViewWorkData] = useState<ConcludedFinalist | null>(null);

  const toggleSection = (key: string) =>
    setCollapsedSections(prev => ({ ...prev, [key]: !prev[key] }));

  const categories = selectedType ? CATEGORIES_BY_TYPE[selectedType] || [] : [];

  const years = useMemo(() =>
    [...new Set(CONCLUDED_VOTING_FINALISTS.map(f => f.year))].sort(),
  []);

  const countries = useMemo(() =>
    [...new Set(CONCLUDED_VOTING_FINALISTS.map(f => f.country))].sort(),
  []);

  const matchesPosition = (pos: number, range: string) => {
    if (!range) return true;
    if (range === '1st - 10th') return pos >= 1 && pos <= 10;
    if (range === '11th - 20th') return pos >= 11 && pos <= 20;
    if (range === '21st - 30th') return pos >= 21 && pos <= 30;
    return true;
  };

  const filteredFinalists = useMemo(() => {
    return CONCLUDED_VOTING_FINALISTS.filter(f => {
      const term = searchTerm.toLowerCase();
      const matchesSearch =
        !term ||
        f.name.toLowerCase().includes(term) ||
        f.competition.toLowerCase().includes(term) ||
        f.category.toLowerCase().includes(term) ||
        f.country.toLowerCase().includes(term) ||
        f.year.toString().includes(term);
      const matchesType = !selectedType || f.competition === selectedType;
      const matchesCategory = !selectedCategory || f.category === selectedCategory;
      const matchesPositionFilter = matchesPosition(f.position, selectedPosition);
      const matchesYear = !selectedYear || f.year.toString() === selectedYear;
      const matchesCountry = !selectedCountry || f.country === selectedCountry;
      return matchesSearch && matchesType && matchesCategory && matchesPositionFilter && matchesYear && matchesCountry;
    });
  }, [searchTerm, selectedType, selectedCategory, selectedPosition, selectedYear, selectedCountry]);

  const groupedByCountry = useMemo(() => {
    const groups: Record<string, typeof filteredFinalists> = {};
    filteredFinalists.forEach(f => {
      if (!groups[f.country]) groups[f.country] = [];
      groups[f.country].push(f);
    });
    return Object.entries(groups).sort(([a], [b]) => a.localeCompare(b));
  }, [filteredFinalists]);

  const resetFilters = () => {
    setSelectedType('');
    setSelectedCategory('');
    setSelectedPosition('');
    setSelectedYear('');
    setSelectedCountry('');
  };

  const activeFilterCount = (selectedType ? 1 : 0) + (selectedCategory ? 1 : 0) + (selectedPosition ? 1 : 0) + (selectedYear ? 1 : 0) + (selectedCountry ? 1 : 0);

  const mapToViewWork = (f: ConcludedFinalist) => ({
    id: f.id,
    name: f.name,
    country: f.country,
    image: f.image,
    competition: f.competition,
    category: f.category,
    workTitle: `${f.name}'s Entry`,
    workSummary: `${f.name}'s ${f.competition} entry (${f.year}) — Position: ${getPositionLabel(f.position)}, Score: ${f.afriScienceScore}%`,
    workMedia: [f.image],
    votes: f.votes,
    livePosition: f.position,
    year: f.year,
    socialLinks: {} as Record<string, string>,
  });

  return (
    <div className="min-h-screen bg-neutral-bg-light py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <CompetitionsHeader
          activeFilterCount={activeFilterCount}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          description="Browse through our competition's records to get more information on previous finalists. Connect and network with them for further partnership opportunities."
        />

        <div className="flex flex-col lg:flex-row gap-8">
          <PastFilterSidebar
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedPosition={selectedPosition}
            setSelectedPosition={setSelectedPosition}
            selectedYear={selectedYear}
            setSelectedYear={setSelectedYear}
            selectedCountry={selectedCountry}
            setSelectedCountry={setSelectedCountry}
            showFilters={showFilters}
            collapsedSections={collapsedSections}
            toggleSection={toggleSection}
            resetFilters={resetFilters}
            activeFilterCount={activeFilterCount}
            categories={categories}
            competitionTypes={COMPETITION_TYPES}
            years={years}
            countries={countries}
          />

          <div className="flex-1">
            <div className="mb-6 relative">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-gray-medium" />
              <input
                type="text"
                placeholder="Search finalist of previous competitions by name, type, category, country or keyword"
                className="w-full rounded-xl border border-neutral-gray-light pl-12 pr-4 py-3 text-sm placeholder:text-sm shadow-sm focus:border-brand-red-600 focus:outline-none focus:ring-1 focus:ring-brand-red-600 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  className="lg:hidden flex items-center gap-2 text-xs"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  {showFilters ? 'Hide Filters' : 'Show Filters'}
                </Button>
              </div>
              <span className="text-sm text-slate-500">
                Showing <strong>{filteredFinalists.length}</strong> past finalist{filteredFinalists.length !== 1 ? 's' : ''}
              </span>
            </div>

            {groupedByCountry.length > 0 ? (
              <div className="space-y-10">
                {groupedByCountry.map(([country, finalists]) => (
                  <div key={country}>
                    <div className="flex items-center gap-3 mb-5 pb-2 border-b-2 border-brand-navy-900">
                      <MapPin className="h-5 w-5 text-brand-red-600" />
                      <h2 className="text-xl font-bold text-brand-navy-900">{country}</h2>
                      <span className="text-xs text-neutral-gray-medium font-medium bg-neutral-bg-light px-2 py-0.5 rounded-full">{finalists.length} finalist{finalists.length !== 1 ? 's' : ''}</span>
                    </div>
                    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                      {finalists.map(finalist => (
                        <PastFinalistCard
                          key={finalist.id}
                          finalist={finalist}
                          onViewWork={(f) => setViewWorkData(f)}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center rounded-xl border-2 border-dashed border-neutral-gray-light bg-white">
                <div className="h-16 w-16 rounded-full bg-slate-50 flex items-center justify-center mb-4"><Search className="h-8 w-8 text-slate-300" /></div>
                <h3 className="text-lg font-medium text-neutral-black">No finalists found</h3>
                <p className="text-slate-500 max-w-sm mt-1">Try adjusting your filters or search terms.</p>
                <Button variant="outline" className="mt-6" onClick={() => { setSearchTerm(''); resetFilters(); }}>Clear Filters</Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {viewWorkData && (
        <ViewWorkModal
          isOpen={true}
          onClose={() => setViewWorkData(null)}
          contestant={mapToViewWork(viewWorkData)}
          liveVotes={viewWorkData.votes}
        />
      )}
    </div>
  );
}

function getPositionLabel(pos: number) {
  if (pos === 1) return '1st';
  if (pos === 2) return '2nd';
  if (pos === 3) return '3rd';
  return `${pos}th`;
}
