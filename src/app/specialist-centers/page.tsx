'use client';

import { useState, useMemo } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import {
  SPECIALIST_CENTERS,
  CENTER_CATEGORIES_BY_FIELD,
} from '@/app/data/mockData';
import { Button } from '@/app/components/ui/Button';
import { toast } from 'sonner';
import FilterSidebar from './components/FilterSidebar';
import ActiveFilters from './components/ActiveFilters';
import CenterCard from './components/CenterCard';

export default function SpecialistCentersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedField, setSelectedField] = useState<string>('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedOwnership, setSelectedOwnership] = useState<string[]>([]);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [archivedIds, setArchivedIds] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({
    fields: false, categories: true, services: true, ownership: true, status: true, country: true, state: true,
  });

  const toggleSection = (key: string) => {
    setCollapsedSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const availableCategories = useMemo(() => {
    if (!selectedField) return [];
    return CENTER_CATEGORIES_BY_FIELD[selectedField] || [];
  }, [selectedField]);

  const activeFilterCount = (selectedField ? 1 : 0) + selectedCategories.length + selectedOwnership.length + selectedServices.length + selectedStatus.length + (selectedCountry ? 1 : 0) + (selectedState ? 1 : 0);

  const filteredCenters = SPECIALIST_CENTERS.filter(center => {
    const matchesSearch = !searchTerm ||
      center.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      center.field.toLowerCase().includes(searchTerm.toLowerCase()) ||
      center.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      center.categories.some(c => c.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesField = !selectedField || center.field === selectedField;
    const matchesCategory = selectedCategories.length === 0 || center.categories.some(c => selectedCategories.includes(c));
    const matchesOwnership = selectedOwnership.length === 0 || selectedOwnership.includes(center.ownership);
    const matchesServices = selectedServices.length === 0 || center.services.some(s => selectedServices.includes(s));
    const matchesStatus = selectedStatus.length === 0 || selectedStatus.includes(center.status);
    const matchesCountry = !selectedCountry || center.country === selectedCountry;
    const matchesState = !selectedState || center.state === selectedState;
    return matchesSearch && matchesField && matchesCategory && matchesOwnership && matchesServices && matchesStatus && matchesCountry && matchesState;
  });

  const toggleFilter = (value: string, setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter(prev => prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]);
  };

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
    setSelectedCategories([]);
    setSelectedOwnership([]);
    setSelectedServices([]);
    setSelectedStatus([]);
    setSelectedCountry('');
    setSelectedState('');
  };

  const handleFieldChange = (field: string) => {
    if (selectedField === field) {
      setSelectedField('');
      setSelectedCategories([]);
    } else {
      setSelectedField(field);
      setSelectedCategories([]);
      setCollapsedSections(prev => ({ ...prev, categories: false }));
    }
  };

  return (
    <div className="min-h-screen bg-neutral-bg-light py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-black">Find Specialist Centers</h1>
          <p className="mt-2 text-neutral-gray-dark">Discover specialized clinics, stations, centers, and establishments that render services in specific scientific & technological fields.</p>
          <Button variant="outline" className="mt-4 lg:hidden flex items-center gap-2" onClick={() => setShowFilters(!showFilters)}>
            <SlidersHorizontal className="h-4 w-4" />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
            {activeFilterCount > 0 && (
              <span className="flex items-center justify-center h-5 min-w-5 px-1.5 rounded-full bg-brand-red-600 text-white text-[10px] font-bold">{activeFilterCount}</span>
            )}
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <FilterSidebar
            selectedField={selectedField}
            onFieldChange={handleFieldChange}
            selectedCategories={selectedCategories}
            onCategoryToggle={(cat) => toggleFilter(cat, setSelectedCategories)}
            selectedOwnership={selectedOwnership}
            onOwnershipToggle={(own) => toggleFilter(own, setSelectedOwnership)}
            selectedServices={selectedServices}
            onServiceToggle={(svc) => toggleFilter(svc, setSelectedServices)}
            selectedStatus={selectedStatus}
            onStatusToggle={(st) => toggleFilter(st, setSelectedStatus)}
            selectedCountry={selectedCountry}
            onCountryChange={(c) => { setSelectedCountry(c); setSelectedState(''); }}
            selectedState={selectedState}
            onStateChange={setSelectedState}
            collapsedSections={collapsedSections}
            onToggleSection={toggleSection}
            onClearAll={clearAllFilters}
            activeFilterCount={activeFilterCount}
            showFilters={showFilters}
            availableCategories={availableCategories}
          />

          <div className="flex-1">
            <div className="mb-6 relative">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-gray-medium" />
              <input
                type="text"
                placeholder="Search centers by name, field, category, or location..."
                className="w-full rounded-xl border border-neutral-gray-light pl-12 pr-4 py-3 shadow-sm focus:border-brand-red-600 focus:outline-none focus:ring-1 focus:ring-brand-red-600 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <ActiveFilters
              selectedField={selectedField}
              onClearField={() => { setSelectedField(''); setSelectedCategories([]); }}
              selectedCategories={selectedCategories}
              onClearCategory={(cat) => toggleFilter(cat, setSelectedCategories)}
              selectedServices={selectedServices}
              onClearService={(svc) => toggleFilter(svc, setSelectedServices)}
              selectedOwnership={selectedOwnership}
              onClearOwnership={(own) => toggleFilter(own, setSelectedOwnership)}
              selectedStatus={selectedStatus}
              onClearStatus={(st) => toggleFilter(st, setSelectedStatus)}
              selectedCountry={selectedCountry}
              selectedState={selectedState}
              onClearLocation={() => { setSelectedCountry(''); setSelectedState(''); }}
              onClearAll={clearAllFilters}
              activeFilterCount={activeFilterCount}
            />

            <div className="mb-4 flex items-center justify-between text-sm text-slate-500">
              <span>Showing <strong>{filteredCenters.length}</strong> center{filteredCenters.length !== 1 ? 's' : ''}</span>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filteredCenters.map((center) => (
                <CenterCard key={center.id} center={center} archivedIds={archivedIds} onToggleArchive={toggleArchive} />
              ))}
            </div>

            {filteredCenters.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 text-center rounded-xl border-2 border-dashed border-neutral-gray-light bg-white">
                <div className="h-16 w-16 rounded-full bg-slate-50 flex items-center justify-center mb-4">
                  <Search className="h-8 w-8 text-slate-300" />
                </div>
                <h3 className="text-lg font-medium text-neutral-black">No specialist centers found</h3>
                <p className="text-slate-500 max-w-sm mt-1">Try adjusting your filters or search for something else.</p>
                <Button variant="outline" className="mt-6" onClick={clearAllFilters}>
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
