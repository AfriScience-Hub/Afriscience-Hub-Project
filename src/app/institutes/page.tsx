'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { INSTITUTES } from '../data/mockData';
import { Button } from '../components/ui/Button';
import { toast } from 'sonner';
import InstituteHeader from './components/InstituteHeader';
import InstituteFilters from './components/InstituteFilters';
import InstituteCard from './components/InstituteCard';

export default function Institutes() {
  const [activeTab, setActiveTab] = useState<'schools' | 'universities'>('schools');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [openFilterSection, setOpenFilterSection] = useState<string | null>('class');

  const [selectedClasses, setSelectedClasses] = useState<string[]>([]);
  const [selectedOwnerships, setSelectedOwnerships] = useState<string[]>([]);
  const [selectedGenders, setSelectedGenders] = useState<string[]>([]);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [selectedState, setSelectedState] = useState<string>('');
  const [archivedIds, setArchivedIds] = useState<string[]>([]);

  const handleFilterSectionToggle = (section: string) => {
    setOpenFilterSection(openFilterSection === section ? null : section);
  };

  const resetFilters = () => {
    setSelectedClasses([]);
    setSelectedOwnerships([]);
    setSelectedGenders([]);
    setSelectedStatus([]);
    setSelectedServices([]);
    setSelectedCountry('');
    setSelectedState('');
    setOpenFilterSection('class');
  };

  const handleTabChange = (tab: 'schools' | 'universities') => {
    setActiveTab(tab);
    resetFilters();
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

  const filteredInstitutes = INSTITUTES.filter(inst => {
    const isUniversity = inst.type === 'University';
    if (activeTab === 'schools' && isUniversity) return false;
    if (activeTab === 'universities' && !isUniversity) return false;

    const matchesSearch = inst.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          inst.location.toLowerCase().includes(searchTerm.toLowerCase());
    if (!matchesSearch) return false;

    if (activeTab === 'schools' && selectedClasses.length > 0) {
      const classMatch = selectedClasses.includes(inst.class || '') ||
        (selectedClasses.includes('Primary & Secondary') && (inst.class === 'Primary' || inst.class === 'Secondary'));
      if (!classMatch) return false;
    }

    if (selectedOwnerships.length > 0 && !selectedOwnerships.includes(inst.ownership || '')) return false;
    if (activeTab === 'schools' && selectedGenders.length > 0 && !selectedGenders.includes(inst.gender || '')) return false;
    if (selectedStatus.length > 0 && !selectedStatus.includes(inst.status || '')) return false;
    if (selectedCountry && inst.country !== selectedCountry) return false;
    if (selectedState && inst.state !== selectedState) return false;

    if (selectedServices.length > 0) {
      const hasService = selectedServices.some(s => inst.services?.includes(s));
      if (!hasService) return false;
    }

    return true;
  });

  return (
    <div className="min-h-screen bg-neutral-bg-light">
      <InstituteHeader
        activeTab={activeTab}
        onTabChange={handleTabChange}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        showFilters={showFilters}
        setShowFilters={setShowFilters}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col gap-8 lg:flex-row">

          <InstituteFilters
            activeTab={activeTab}
            selectedClasses={selectedClasses}
            setSelectedClasses={setSelectedClasses}
            selectedOwnerships={selectedOwnerships}
            setSelectedOwnerships={setSelectedOwnerships}
            selectedGenders={selectedGenders}
            setSelectedGenders={setSelectedGenders}
            selectedServices={selectedServices}
            setSelectedServices={setSelectedServices}
            selectedStatus={selectedStatus}
            setSelectedStatus={setSelectedStatus}
            selectedCountry={selectedCountry}
            setSelectedCountry={setSelectedCountry}
            selectedState={selectedState}
            setSelectedState={setSelectedState}
            showFilters={showFilters}
            openFilterSection={openFilterSection}
            handleFilterSectionToggle={handleFilterSectionToggle}
            resetFilters={resetFilters}
          />

          <div className="flex-1">
            <div className="mb-4 flex items-center justify-between text-sm text-slate-500">
              <span>Showing <strong>{filteredInstitutes.length}</strong> results</span>
              <div className="flex items-center gap-2">
                <span>Sort by:</span>
                <select className="border-none bg-transparent font-semibold text-neutral-black focus:ring-0 p-0 cursor-pointer">
                  <option>Recommended</option>
                  <option>Most Reviewed</option>
                  <option>Highest Rated</option>
                </select>
              </div>
            </div>

            {filteredInstitutes.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center rounded-xl border-2 border-dashed border-neutral-gray-light bg-white">
                <div className="h-16 w-16 rounded-full bg-slate-50 flex items-center justify-center mb-4">
                  <Search className="h-8 w-8 text-slate-300" />
                </div>
                <h3 className="text-lg font-medium text-neutral-black">No institutes found</h3>
                <p className="text-slate-500 max-w-sm mt-1">We couldn't find any matches for your current filters. Try adjusting them or search for something else.</p>
                <Button variant="outline" className="mt-6" onClick={() => { setSearchTerm(''); resetFilters(); }}>
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                {filteredInstitutes.map((inst, index) => (
                  <InstituteCard
                    key={inst.id}
                    inst={inst}
                    index={index}
                    archived={archivedIds.includes(inst.id)}
                    onToggleArchive={() => toggleArchive(inst.id)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
