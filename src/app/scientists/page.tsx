'use client';

import { useCallback, useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { toast } from 'sonner';
import ScientistHeader from './components/ScientistHeader';
import ScientistFilters from './components/ScientistFilters';
import ScientistCard from './components/ScientistCard';
import {
  fetchPublicScientists,
  fetchScientistFilterOptions,
  type PublicScientist,
  type ScientistFilterOptions,
} from './publicApi';

const EMPTY_OPTIONS: ScientistFilterOptions = {
  fields: [],
  degrees: [],
  services: [],
  professionsByField: {},
  professionNotes: {},
};

export default function Scientists() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedField, setSelectedField] = useState('');
  const [selectedProfessions, setSelectedProfessions] = useState<string[]>([]);
  const [selectedDegree, setSelectedDegree] = useState('');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [selectedState, setSelectedState] = useState<string>('');
  const [archivedIds, setArchivedIds] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [scientists, setScientists] = useState<PublicScientist[]>([]);
  const [filterOptions, setFilterOptions] = useState<ScientistFilterOptions>(EMPTY_OPTIONS);
  const [loading, setLoading] = useState(true);
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({
    fields: false,
    profession: false,
    degree: true,
    services: true,
    status: false,
    country: false,
    state: true,
  });

  const toggleSection = (key: string) =>
    setCollapsedSections(prev => ({ ...prev, [key]: !prev[key] }));

  const loadListings = useCallback(async () => {
    setLoading(true);
    try {
      const rows = await fetchPublicScientists();
      setScientists(rows);
    } catch (e: any) {
      toast.error(e?.message || 'Failed to load scientists and technologists');
      setScientists([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadListings();
  }, [loadListings]);

  useEffect(() => {
    let cancelled = false;
    fetchScientistFilterOptions()
      .then((options) => { if (!cancelled) setFilterOptions(options); })
      .catch(() => { /* keep the bundled fallback lists */ });
    return () => { cancelled = true; };
  }, []);

  const handleFieldChange = (field: string) => {
    if (selectedField === field) {
      setSelectedField('');
    } else {
      setSelectedField(field);
      setCollapsedSections(prev => ({ ...prev, profession: false }));
    }
    setSelectedProfessions([]);
  };

  const filteredScientists = scientists.filter(sci => {
    const q = searchTerm.toLowerCase();
    const matchesSearch = !q ||
      sci.name.toLowerCase().includes(q) ||
      sci.field.toLowerCase().includes(q) ||
      sci.location.toLowerCase().includes(q) ||
      sci.country.toLowerCase().includes(q) ||
      (sci.degrees || []).some(d => d.toLowerCase().includes(q)) ||
      sci.professions.some(p => p.toLowerCase().includes(q)) ||
      sci.services.some(s => s.toLowerCase().includes(q)) ||
      (sci.scopes || []).some(s => s.toLowerCase().includes(q));

    const matchesField = !selectedField || sci.field === selectedField;
    const matchesProfession = selectedProfessions.length === 0 || sci.professions.some(p => selectedProfessions.includes(p));
    const matchesDegree = !selectedDegree || (sci.degrees || []).includes(selectedDegree);
    const matchesService = selectedServices.length === 0 || sci.services.some(s => selectedServices.includes(s));
    const matchesStatus = !selectedStatus || sci.status === selectedStatus;
    const matchesCountry = !selectedCountry || sci.country === selectedCountry;
    const matchesState = !selectedState || (sci.state || '').toLowerCase().includes(selectedState.toLowerCase());

    return matchesSearch && matchesField && matchesProfession && matchesDegree && matchesService && matchesStatus && matchesCountry && matchesState;
  });

  const resetFilters = () => {
    setSelectedField('');
    setSelectedProfessions([]);
    setSelectedDegree('');
    setSelectedServices([]);
    setSelectedStatus('');
    setSelectedCountry('');
    setSelectedState('');
  };

  const activeFilterCount = (selectedField ? 1 : 0) + selectedProfessions.length + (selectedDegree ? 1 : 0) + selectedServices.length + (selectedStatus ? 1 : 0) + (selectedCountry ? 1 : 0) + (selectedState ? 1 : 0);

  const toggleArchive = (id: string) => {
    if (archivedIds.includes(id)) {
      setArchivedIds(prev => prev.filter(i => i !== id));
      toast.success('Removed from archive');
    } else {
      setArchivedIds(prev => [...prev, id]);
      toast.success('Added to archive');
    }
  };

  return (
    <div className="min-h-screen bg-neutral-bg-light py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        <ScientistHeader
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          activeFilterCount={activeFilterCount}
        />

        <div className="flex flex-col lg:flex-row gap-8">

          <ScientistFilters
            selectedField={selectedField}
            handleFieldChange={handleFieldChange}
            selectedProfessions={selectedProfessions}
            setSelectedProfessions={setSelectedProfessions}
            selectedDegree={selectedDegree}
            setSelectedDegree={setSelectedDegree}
            selectedServices={selectedServices}
            setSelectedServices={setSelectedServices}
            selectedStatus={selectedStatus}
            setSelectedStatus={setSelectedStatus}
            selectedCountry={selectedCountry}
            setSelectedCountry={setSelectedCountry}
            selectedState={selectedState}
            setSelectedState={setSelectedState}
            showFilters={showFilters}
            collapsedSections={collapsedSections}
            toggleSection={toggleSection}
            activeFilterCount={activeFilterCount}
            resetFilters={resetFilters}
            fields={filterOptions.fields}
            degrees={filterOptions.degrees}
            services={filterOptions.services}
            professionsByField={filterOptions.professionsByField}
            professionNotes={filterOptions.professionNotes}
          />

          <div className="flex-1">
            <div className="mb-6 relative">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-gray-medium" />
              <input
                type="text"
                placeholder="Search scientists and technologists by name, fields, profession, degrees, services, scopes, country or keyword..."
                className="w-full rounded-xl border border-neutral-gray-light pl-12 pr-4 py-3 shadow-sm focus:border-brand-red-600 focus:outline-none focus:ring-1 focus:ring-brand-red-600 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="mb-4 flex items-center justify-between text-sm text-slate-500">
              <span>Showing <strong>{filteredScientists.length}</strong> results</span>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {loading
                ? Array.from({ length: 6 }).map((_, index) => (
                    <div
                      key={`skeleton-${index}`}
                      className="animate-pulse overflow-hidden rounded-xl border border-neutral-gray-light bg-white shadow-sm"
                      aria-hidden="true"
                    >
                      <div className="h-40 bg-neutral-bg-light" />
                      <div className="space-y-3 p-3.5">
                        <div className="h-4 w-2/5 rounded bg-neutral-bg-light" />
                        <div className="h-3 w-3/5 rounded bg-neutral-bg-light" />
                        <div className="h-3 w-1/2 rounded bg-neutral-bg-light" />
                        <div className="h-3 w-4/5 rounded bg-neutral-bg-light" />
                        <div className="mt-4 h-8 w-full rounded bg-neutral-bg-light" />
                      </div>
                    </div>
                  ))
                : filteredScientists.map((sci) => (
                    <ScientistCard
                      key={sci.id}
                      sci={sci}
                      archived={archivedIds.includes(sci.id)}
                      onToggleArchive={() => toggleArchive(sci.id)}
                    />
                  ))}
            </div>

            {!loading && filteredScientists.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 text-center rounded-xl border-2 border-dashed border-neutral-gray-light bg-white">
                <div className="h-16 w-16 rounded-full bg-slate-50 flex items-center justify-center mb-4">
                  <Search className="h-8 w-8 text-slate-300" />
                </div>
                <h3 className="text-lg font-medium text-neutral-black">No scientists found</h3>
                <p className="text-slate-500 max-w-sm mt-1">Try adjusting your filters or search for something else.</p>
                <Button variant="outline" className="mt-6" onClick={() => { setSearchTerm(''); resetFilters(); }}>
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
