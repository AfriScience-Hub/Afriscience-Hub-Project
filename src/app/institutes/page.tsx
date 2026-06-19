'use client';

import { useState } from 'react';
import { 
  Search, MapPin, Filter, Star, CheckCircle, 
  ThumbsUp, Share2, MessageCircle,
  Archive, ArchiveX, ChevronDown, ChevronUp, SlidersHorizontal,
  School, GraduationCap
} from 'lucide-react';
import { INSTITUTES } from '../data/mockData';

import { Button } from '../components/ui/Button';
import Link from 'next/link';
import { cn } from '../../lib/utils';
import { toast } from 'sonner';

// --- Filter Options Configuration ---

// Common
const STATUSES = ['Online', 'Offline'];
const COUNTRIES = [
  'Algeria', 'Angola', 'Benin', 'Botswana', 'Burkina Faso', 'Burundi',
  'Cameroon', 'Cape Verde', 'Central African Republic', 'Chad', 'Comoros',
  'Congo (DRC)', 'Congo (Republic)', 'Côte d\'Ivoire', 'Djibouti', 'Egypt',
  'Equatorial Guinea', 'Eritrea', 'Eswatini', 'Ethiopia', 'Gabon', 'Gambia',
  'Ghana', 'Guinea', 'Guinea-Bissau', 'Kenya', 'Lesotho', 'Liberia', 'Libya',
  'Madagascar', 'Malawi', 'Mali', 'Mauritania', 'Mauritius', 'Morocco',
  'Mozambique', 'Namibia', 'Niger', 'Nigeria', 'Rwanda', 'São Tomé and Príncipe',
  'Senegal', 'Seychelles', 'Sierra Leone', 'Somalia', 'South Africa', 'South Sudan',
  'Sudan', 'Tanzania', 'Togo', 'Tunisia', 'Uganda', 'Zambia', 'Zimbabwe'
];

// Schools Specific
const SCHOOL_CLASSES = ['Primary', 'Secondary', 'Primary & Secondary'];
const SCHOOL_OWNERSHIPS = ['Private', 'Government | Public', 'Mission', 'International', 'Inter-Government', 'NGO | Charity'];
const SCHOOL_GENDERS = ['Female', 'Male', 'Mixed'];
const SCHOOL_SERVICES = [
  'Competitions', 'Conferences', 'Excursions', 'Exercises & Sports', 
  'Extra Lessons', 'Health Programs', 'PTA Meetings', 'Reunions', 
  'Scholarships', 'Science Clubs', 'Teaching & Learning'
];

// University Specific
const UNI_OWNERSHIPS = ['Private', 'Government | Public', 'Open', 'Inter-Government', 'NGO | Charity'];
const UNI_SERVICES = [
  'Community Service', 'Competitions', 'Fieldworks & Workshops', 
  'Research & Development', 'Scholarships', 'Student Welfare Programs', 
  'Teaching & Learning'
];

// Mock states for dynamic dropdown (separate from country)
const STATES: Record<string, string[]> = {
  'Algeria': ['Algiers', 'Oran', 'Constantine'],
  'Angola': ['Luanda', 'Benguela', 'Huambo'],
  'Benin': ['Cotonou', 'Porto-Novo', 'Parakou'],
  'Botswana': ['Gaborone', 'Francistown'],
  'Cameroon': ['Yaoundé', 'Douala', 'Bamenda'],
  'Egypt': ['Cairo', 'Alexandria', 'Giza', 'Luxor'],
  'Ethiopia': ['Addis Ababa', 'Dire Dawa', 'Bahir Dar'],
  'Ghana': ['Greater Accra', 'Ashanti', 'Central', 'Western', 'Eastern', 'Northern'],
  'Kenya': ['Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret'],
  'Morocco': ['Casablanca', 'Rabat', 'Marrakech', 'Fez'],
  'Nigeria': ['Lagos', 'Abuja', 'Kano', 'Rivers', 'Oyo', 'Enugu', 'Kaduna', 'Ogun', 'Delta'],
  'Rwanda': ['Kigali City', 'Northern', 'Southern', 'Eastern', 'Western'],
  'Senegal': ['Dakar', 'Saint-Louis', 'Thiès'],
  'South Africa': ['Western Cape', 'Gauteng', 'KwaZulu-Natal', 'Eastern Cape', 'Free State'],
  'Tanzania': ['Dar es Salaam', 'Dodoma', 'Arusha', 'Mwanza'],
  'Uganda': ['Central', 'Eastern', 'Northern', 'Western'],
  'Zambia': ['Lusaka', 'Copperbelt', 'Southern'],
  'Zimbabwe': ['Harare', 'Bulawayo', 'Manicaland'],
};

// Collapsible Filter Section Component
const FilterSection = ({ 
  title, 
  isOpen, 
  onToggle, 
  children 
}: { 
  title: string; 
  isOpen: boolean; 
  onToggle: () => void; 
  children: React.ReactNode 
}) => {
  return (
    <div className="border-b border-neutral-gray-light py-4 last:border-0">
      <button 
        className="flex w-full items-center justify-between text-sm font-bold text-neutral-black hover:text-brand-red-600 transition-colors"
        onClick={onToggle}
      >
        {title}
        {isOpen ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
      </button>
      {isOpen && <div className="mt-3 animate-in slide-in-from-top-1 duration-200">{children}</div>}
    </div>
  );
};

export default function Institutes() {
  const [activeTab, setActiveTab] = useState<'schools' | 'universities'>('schools');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false); 
  const [openFilterSection, setOpenFilterSection] = useState<string | null>('class');
  
  // Filter States
  const [selectedClasses, setSelectedClasses] = useState<string[]>([]);
  const [selectedOwnerships, setSelectedOwnerships] = useState<string[]>([]);
  const [selectedGenders, setSelectedGenders] = useState<string[]>([]);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [selectedState, setSelectedState] = useState<string>('');
  const [archivedIds, setArchivedIds] = useState<string[]>([]);

  const toggleFilter = (item: string, current: string[], set: (val: string[]) => void) => {
    if (current.includes(item)) {
      set(current.filter(i => i !== item));
    } else {
      set([...current, item]);
    }
  };

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

    // Class (Schools Only) - handle "Primary & Secondary" as matching both
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
      
      {/* Top Section: Header & Search */}
      <div className="bg-white border-b border-neutral-gray-light sticky top-0 z-30 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-neutral-black">Institutes Directory</h1>
              <p className="text-sm text-slate-500">Discover top educational centers across Africa</p>
            </div>
            
            <div className="relative w-full md:max-w-md">
              <input
                type="text"
                placeholder={activeTab === 'universities' ? "Search universities database..." : "Search schools, location..."}
                className="w-full h-12 rounded-xl border border-neutral-gray-light pl-12 pr-4 shadow-sm focus:border-brand-red-600 focus:outline-none focus:ring-2 focus:ring-brand-red-600/20 text-base"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            </div>
          </div>

          {/* Category Selector */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex p-1 bg-slate-100 rounded-lg w-full sm:w-auto">
              <button
                onClick={() => handleTabChange('schools')}
                className={cn(
                  "flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-md text-sm font-semibold transition-all duration-200",
                  activeTab === 'schools' 
                    ? "bg-white text-brand-red-600 shadow-sm ring-1 ring-slate-200" 
                    : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50"
                )}
              >
                <School className="h-4 w-4" />
                Primary & Secondary
              </button>
              <button
                onClick={() => handleTabChange('universities')}
                className={cn(
                  "flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-md text-sm font-semibold transition-all duration-200",
                  activeTab === 'universities' 
                    ? "bg-white text-brand-red-600 shadow-sm ring-1 ring-slate-200" 
                    : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50"
                )}
              >
                <GraduationCap className="h-4 w-4" />
                Universities
              </button>
            </div>

            <Button 
              variant="outline" 
              className="w-full sm:w-auto lg:hidden flex items-center gap-2"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="h-4 w-4" />
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col gap-8 lg:flex-row">
          
          {/* Sidebar Filters */}
          <aside className={cn(
            "w-full lg:w-60 flex-shrink-0 transition-all duration-300 ease-in-out",
            showFilters ? "block" : "hidden lg:block"
          )}>
            <div className="rounded-xl border bg-white p-5 shadow-sm lg:sticky lg:top-32 max-h-[calc(100vh-10rem)] overflow-y-auto custom-scrollbar">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-neutral-black flex items-center gap-2">
                  <Filter className="h-4 w-4 text-brand-red-600" />
                  Filters
                </h3>
                <button 
                  onClick={resetFilters}
                  className="text-xs text-brand-red-600 hover:underline font-medium"
                >
                  Reset All
                </button>
              </div>
              
              <div className="divide-y divide-neutral-gray-light">
                {/* 1. Class - Schools Only */}
                {activeTab === 'schools' && (
                  <FilterSection 
                    title="Class" 
                    isOpen={openFilterSection === 'class'}
                    onToggle={() => handleFilterSectionToggle('class')}
                  >
                    <div className="space-y-2">
                      {SCHOOL_CLASSES.map((cls) => (
                        <label key={cls} className="flex items-center gap-3 cursor-pointer group">
                          <input 
                            type="checkbox" 
                            checked={selectedClasses.includes(cls)}
                            onChange={() => toggleFilter(cls, selectedClasses, setSelectedClasses)}
                            className="rounded border-slate-300 bg-white text-brand-red-600 focus:ring-brand-red-600" 
                          />
                          <span className="text-sm text-slate-600 group-hover:text-neutral-black">{cls}</span>
                        </label>
                      ))}
                    </div>
                  </FilterSection>
                )}

                {/* Type - Universities */}
                {activeTab === 'universities' && (
                   <div className="py-4 border-b border-neutral-gray-light">
                      <div className="text-sm font-bold text-neutral-black mb-2">Type</div>
                      <div className="flex items-center gap-2 text-brand-red-600 bg-brand-red-100 px-3 py-2 rounded-lg border border-brand-red-100">
                        <CheckCircle className="h-4 w-4" />
                        <span className="text-sm font-medium">Universities</span>
                      </div>
                   </div>
                )}

                {/* 2. Ownership */}
                <FilterSection 
                  title="Ownership" 
                  isOpen={openFilterSection === 'ownership'}
                  onToggle={() => handleFilterSectionToggle('ownership')}
                >
                  <div className="space-y-2">
                    {(activeTab === 'schools' ? SCHOOL_OWNERSHIPS : UNI_OWNERSHIPS).map((own) => (
                      <label key={own} className="flex items-center gap-3 cursor-pointer group">
                        <input 
                          type="checkbox" 
                          checked={selectedOwnerships.includes(own)}
                          onChange={() => toggleFilter(own, selectedOwnerships, setSelectedOwnerships)}
                          className="rounded border-slate-300 bg-white text-brand-red-600 focus:ring-brand-red-600" 
                        />
                        <span className="text-sm text-slate-600 group-hover:text-neutral-black">{own}</span>
                      </label>
                    ))}
                  </div>
                </FilterSection>

                {/* 3. Gender - Schools Only */}
                {activeTab === 'schools' && (
                  <FilterSection 
                    title="Gender" 
                    isOpen={openFilterSection === 'gender'}
                    onToggle={() => handleFilterSectionToggle('gender')}
                  >
                    <div className="space-y-2">
                      {SCHOOL_GENDERS.map((gen) => (
                        <label key={gen} className="flex items-center gap-3 cursor-pointer group">
                          <input 
                            type="checkbox" 
                            checked={selectedGenders.includes(gen)}
                            onChange={() => toggleFilter(gen, selectedGenders, setSelectedGenders)}
                            className="rounded border-slate-300 bg-white text-brand-red-600 focus:ring-brand-red-600" 
                          />
                          <span className="text-sm text-slate-600 group-hover:text-neutral-black">{gen}</span>
                        </label>
                      ))}
                    </div>
                  </FilterSection>
                )}

                {/* 4. Services */}
                <FilterSection 
                  title="Services" 
                  isOpen={openFilterSection === 'services'}
                  onToggle={() => handleFilterSectionToggle('services')}
                >
                  <div className="max-h-48 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
                    {(activeTab === 'schools' ? SCHOOL_SERVICES : UNI_SERVICES).map((svc) => (
                      <label key={svc} className="flex items-center gap-3 cursor-pointer group">
                        <input 
                          type="checkbox" 
                          checked={selectedServices.includes(svc)}
                          onChange={() => toggleFilter(svc, selectedServices, setSelectedServices)}
                          className="rounded border-slate-300 bg-white text-brand-red-600 focus:ring-brand-red-600" 
                        />
                        <span className="text-sm text-slate-600 group-hover:text-neutral-black truncate" title={svc}>{svc}</span>
                      </label>
                    ))}
                  </div>
                </FilterSection>

                {/* 5. Status */}
                <FilterSection 
                  title="Status" 
                  isOpen={openFilterSection === 'status'}
                  onToggle={() => handleFilterSectionToggle('status')}
                >
                  <div className="space-y-2">
                    {STATUSES.map((stat) => (
                      <label key={stat} className="flex items-center gap-3 cursor-pointer group">
                        <input 
                          type="checkbox" 
                          checked={selectedStatus.includes(stat)}
                          onChange={() => toggleFilter(stat, selectedStatus, setSelectedStatus)}
                          className="rounded border-slate-300 bg-white text-brand-red-600 focus:ring-brand-red-600" 
                        />
                        <span className="text-sm text-slate-600 group-hover:text-neutral-black">{stat}</span>
                      </label>
                    ))}
                  </div>
                </FilterSection>

                {/* 6. Country (separate from State) */}
                <FilterSection 
                  title="Country"
                  isOpen={openFilterSection === 'country'}
                  onToggle={() => handleFilterSectionToggle('country')}
                >
                  <select 
                    className="w-full rounded-md border border-slate-300 p-2 text-sm focus:border-brand-red-600 focus:outline-none bg-white"
                    value={selectedCountry}
                    onChange={(e) => {
                      setSelectedCountry(e.target.value);
                      setSelectedState(''); 
                    }}
                  >
                    <option value="">All Countries</option>
                    {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </FilterSection>

                {/* 7. State / Region (separate) */}
                <FilterSection 
                  title="State / Region"
                  isOpen={openFilterSection === 'state'}
                  onToggle={() => handleFilterSectionToggle('state')}
                >
                  {selectedCountry && STATES[selectedCountry] ? (
                    <select 
                      className="w-full rounded-md border border-slate-300 p-2 text-sm focus:border-brand-red-600 focus:outline-none bg-white"
                      value={selectedState}
                      onChange={(e) => setSelectedState(e.target.value)}
                    >
                      <option value="">All Regions</option>
                      {STATES[selectedCountry].map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  ) : (
                    <p className="text-xs text-slate-400 italic">Select a country first</p>
                  )}
                </FilterSection>

              </div>
            </div>
          </aside>

          {/* Main Content Results */}
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
                <Button 
                  variant="outline" 
                  className="mt-6"
                  onClick={() => {
                    setSearchTerm('');
                    resetFilters();
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                {filteredInstitutes.map((inst, index) => (
                  <div key={inst.id} className="group flex flex-col rounded-xl border bg-white shadow-sm transition-all hover:shadow-md hover:border-brand-red-600/30 overflow-hidden">
                    {/* Thumbnail Image */}
                    <div className="relative h-40 w-full overflow-hidden bg-slate-200">
                      <img 
                        src={inst.image} 
                        alt={inst.name} 
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" 
                      />
                      {/* Index badge */}
                      <div className="absolute top-2 left-2 flex items-center justify-center h-6 w-6 rounded-full bg-brand-navy-900/80 text-white text-[10px] font-bold backdrop-blur-sm">
                        {index + 1}
                      </div>
                      <div className="absolute top-2 right-2 flex gap-1">
                         <button 
                           className="flex items-center justify-center h-7 w-7 rounded-full bg-white/90 backdrop-blur text-slate-600 hover:text-blue-600 hover:bg-white shadow-sm transition-colors" 
                           title="Share"
                           onClick={async (e) => {
                             e.preventDefault();
                             try {
                               await navigator.clipboard.writeText(`${window.location.origin}/institutes/${inst.id}`);
                               toast.success('Link copied');
                             } catch (err) {
                               toast.success('Link copied');
                             }
                           }}
                         >
                           <Share2 className="h-3.5 w-3.5" />
                         </button>
                         <button 
                           className={cn(
                             "flex items-center justify-center h-7 w-7 rounded-full bg-white/90 backdrop-blur shadow-sm transition-colors",
                             archivedIds.includes(inst.id) ? "text-brand-red-600" : "text-slate-600 hover:text-brand-red-600 hover:bg-white"
                           )}
                           title={archivedIds.includes(inst.id) ? "Remove from Archive" : "Add to Archive"}
                           onClick={(e) => { e.preventDefault(); toggleArchive(inst.id); }}
                         >
                           {archivedIds.includes(inst.id) ? <ArchiveX className="h-3.5 w-3.5" /> : <Archive className="h-3.5 w-3.5" />}
                         </button>
                      </div>
                      <div className="absolute bottom-2 left-2">
                        <span className={cn(
                          "px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide backdrop-blur-md",
                          inst.status === 'Online' ? "bg-brand-red-600 text-white" : "bg-white/90 text-slate-800"
                        )}>
                          {inst.status}
                        </span>
                      </div>
                    </div>
                    
                    {/* Card Content */}
                    <div className="flex flex-1 flex-col p-4">
                      <div className="mb-3">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h3 className="font-bold text-neutral-black text-sm leading-tight line-clamp-2 group-hover:text-brand-red-600 transition-colors">
                            {inst.name}
                          </h3>
                          {inst.verified && <CheckCircle className="h-4 w-4 flex-shrink-0 text-blue-500" />}
                        </div>
                        <p className="text-xs text-slate-500 flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {inst.state ? `${inst.state}, ` : ''}{inst.country}
                        </p>
                      </div>

                      {/* Compact Specs Grid */}
                      <div className="grid grid-cols-3 gap-1 text-[10px] text-slate-600 mb-3 bg-neutral-bg-light p-2 rounded border border-neutral-gray-light">
                        <div className="flex flex-col">
                          <span className="text-slate-400">{inst.type === 'University' ? 'Type' : 'Class'}</span>
                          <span className="font-semibold text-slate-700">{inst.class}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-slate-400">Ownership</span>
                          <span className="font-semibold text-slate-700 truncate">{inst.ownership}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-slate-400">Gender</span>
                          <span className="font-semibold text-slate-700">{inst.gender}</span>
                        </div>
                        <div className="flex flex-col col-span-3 mt-1 pt-1 border-t border-slate-200">
                           <span className="text-slate-400">Rating</span>
                           <div className="flex items-center gap-0.5 font-semibold text-amber-500">
                             <Star className="h-2.5 w-2.5 fill-current" />
                             {inst.rating} <span className="text-slate-400 font-normal ml-1">({inst.reviews} reviews)</span>
                           </div>
                        </div>
                      </div>

                      {/* Engagement Stats - no Favourites */}
                      <div className="flex items-center justify-between text-[10px] text-slate-400 mb-4 px-1">
                        <span className="flex items-center gap-1" title="Likes"><ThumbsUp className="h-3 w-3" /> {inst.likes ? (inst.likes / 1000).toFixed(1) + 'k' : '0'}</span>
                        <span className="flex items-center gap-1" title="Reviews"><MessageCircle className="h-3 w-3" /> {inst.reviews || 0}</span>
                        <span className="flex items-center gap-1" title="Shares"><Share2 className="h-3 w-3" /> {inst.shares || 0}</span>
                      </div>

                      {/* Actions */}
                      <div className="mt-auto grid grid-cols-2 gap-2">
                        <Link href={`/institutes/${inst.id}`} className="w-full">
                          <Button size="sm" variant="outline" className="w-full text-xs h-8 px-0">Details</Button>
                        </Link>
                        <Link href={`/institutes/${inst.id}?tab=contact`} className="w-full">
                          <Button size="sm" className="w-full text-xs h-8 px-0 bg-brand-navy-900 hover:bg-brand-navy-800 text-white">Contact</Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}