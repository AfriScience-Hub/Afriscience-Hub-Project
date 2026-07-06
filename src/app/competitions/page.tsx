'use client';

import { useState, useMemo } from 'react';
import { Search, Clock } from 'lucide-react';
import { COMPETITIONS } from './data';
import { CompetitionsHeader } from './components/CompetitionsHeader';
import { CompetitionFilters } from './components/CompetitionFilters';
import { CompetitionGrid } from './components/CompetitionGrid';
import { ImagePreviewModal } from './components/ImagePreviewModal';

const CATEGORIES_BY_TYPE: Record<string, string[]> = {
  'Afri \u2013 Anime': ['General (18+)'],
  'Afri \u2013 Presentations': ['Lower Primary', 'Upper Primary', 'Junior Secondary', 'Senior Secondary', 'Undergraduates', 'Graduates'],
  'Afri \u2013 Memes': ['General (18+)'],
  'Afri \u2013 MySpace': ['General (18+)'],
};

const DEADLINES: Record<string, string> = {
  'Afri \u2013 Anime': 'August 15, 2026',
  'Afri \u2013 Presentations': 'August 30, 2026',
  'Afri \u2013 Memes': 'September 15, 2026',
  'Afri \u2013 MySpace': 'September 30, 2026',
};

export default function Competitions() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({ type: false, category: false, country: false });
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const currentYear = new Date().getFullYear();
  const categories = selectedType ? CATEGORIES_BY_TYPE[selectedType] || [] : [];

  const toggleSection = (key: string) => setCollapsedSections(prev => ({ ...prev, [key]: !prev[key] }));

  const filteredCompetitions = useMemo(() => {
    return COMPETITIONS.filter(comp => {
      const term = searchTerm.toLowerCase();
      const matchesSearch = !term ||
        comp.title.toLowerCase().includes(term) ||
        comp.type.toLowerCase().includes(term) ||
        comp.category.toLowerCase().includes(term) ||
        comp.country.toLowerCase().includes(term) ||
        comp.description.toLowerCase().includes(term);
      const matchesType = !selectedType || comp.type === selectedType;
      const matchesCategory = !selectedCategory || comp.category === selectedCategory;
      const matchesCountry = !selectedCountry || comp.country === selectedCountry;
      return matchesSearch && matchesType && matchesCategory && matchesCountry;
    });
  }, [searchTerm, selectedType, selectedCategory, selectedCountry]);

  const groupedByCountry = useMemo(() => {
    const groups: Record<string, typeof filteredCompetitions> = {};
    filteredCompetitions.forEach(comp => {
      if (!groups[comp.country]) groups[comp.country] = [];
      groups[comp.country].push(comp);
    });
    return Object.entries(groups).sort(([a], [b]) => a.localeCompare(b));
  }, [filteredCompetitions]);

  const resetFilters = () => { setSelectedType(''); setSelectedCategory(''); setSelectedCountry(''); };
  const activeFilterCount = (selectedType ? 1 : 0) + (selectedCategory ? 1 : 0) + (selectedCountry ? 1 : 0);
  const handleClear = () => { setSearchTerm(''); resetFilters(); };

  return (
    <div className="min-h-screen bg-neutral-bg-light py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <CompetitionsHeader activeFilterCount={activeFilterCount} showFilters={showFilters} setShowFilters={setShowFilters} />

        <div className="flex flex-col lg:flex-row gap-8">
          <CompetitionFilters
            selectedType={selectedType} setSelectedType={setSelectedType}
            selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}
            selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry}
            showFilters={showFilters} collapsedSections={collapsedSections}
            toggleSection={toggleSection} resetFilters={resetFilters}
            activeFilterCount={activeFilterCount} categories={categories} currentYear={currentYear}
          />

          <div className="flex-1">
            <div className="mb-6 relative">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-gray-medium" />
              <input type="text" placeholder="Search competitions by name, type, category, country or keyword"
                className="w-full rounded-xl border border-neutral-gray-light pl-12 pr-4 py-3 text-sm placeholder:text-sm shadow-sm focus:border-brand-red-600 focus:outline-none focus:ring-1 focus:ring-brand-red-600 transition-all"
                value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
              {selectedType && DEADLINES[selectedType] && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1.5 text-xs font-medium text-brand-red-600 bg-brand-red-50 px-2.5 py-1 rounded-full border border-brand-red-100">
                  <Clock className="h-3 w-3" />
                  Deadline: {DEADLINES[selectedType]}
                </div>
              )}
            </div>
            <div className="mb-4 flex items-center justify-between text-sm text-slate-500">
              <span>Showing <strong>{filteredCompetitions.length}</strong> competitions</span>
            </div>
            <CompetitionGrid groupedByCountry={groupedByCountry} onPreview={setPreviewImage} onClear={handleClear} />
          </div>
        </div>
      </div>

      {previewImage && <ImagePreviewModal image={previewImage} onClose={() => setPreviewImage(null)} />}
    </div>
  );
}
