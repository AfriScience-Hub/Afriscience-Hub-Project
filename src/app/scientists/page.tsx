'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Search, MapPin, Filter, Star, CheckCircle, GraduationCap,
  Eye, ThumbsUp, Share2, Archive, ArchiveX,
  SlidersHorizontal, ChevronDown
} from 'lucide-react';
import { 
  SCIENTISTS, 
  SCIENTIST_FIELDS, 
  SCIENTIST_DEGREES, 
  SCIENTIST_SERVICES 
} from '../data/mockData';
import { Button } from '../components/ui/Button';
import { toast } from 'sonner';
import { cn } from '../../lib/utils';

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

const STATES: Record<string, string[]> = {
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
};

export default function Scientists() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  const [selectedProfessions, setSelectedProfessions] = useState<string[]>([]);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [selectedState, setSelectedState] = useState<string>('');
  const [archivedIds, setArchivedIds] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({
    fields: false,
    profession: false,
    services: true,
    status: false,
    country: false,
    state: true,
  });

  const toggleSection = (key: string) =>
    setCollapsedSections(prev => ({ ...prev, [key]: !prev[key] }));

  // Extract unique professions from data
  const allProfessions = useMemo(() => {
    const profs = new Set<string>();
    SCIENTISTS.forEach(sci => sci.professions.forEach(p => profs.add(p)));
    return Array.from(profs).sort();
  }, []);

  // Filter Logic
  const filteredScientists = SCIENTISTS.filter(sci => {
    const matchesSearch = 
      sci.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sci.field.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sci.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesField = selectedFields.length === 0 || selectedFields.includes(sci.field);
    const matchesProfession = selectedProfessions.length === 0 || sci.professions.some(p => selectedProfessions.includes(p));
    const matchesService = selectedServices.length === 0 || sci.services.some(s => selectedServices.includes(s));
    const matchesStatus = selectedStatus.length === 0 || selectedStatus.includes(sci.status);
    const matchesCountry = !selectedCountry || sci.country === selectedCountry;
    const matchesState = !selectedState || sci.state === selectedState;

    return matchesSearch && matchesField && matchesProfession && matchesService && matchesStatus && matchesCountry && matchesState;
  });

  const toggleFilter = (item: string, current: string[], set: (val: string[]) => void) => {
    if (current.includes(item)) {
      set(current.filter(i => i !== item));
    } else {
      set([...current, item]);
    }
  };

  const resetFilters = () => {
    setSelectedFields([]);
    setSelectedProfessions([]);
    setSelectedServices([]);
    setSelectedStatus([]);
    setSelectedCountry('');
    setSelectedState('');
  };

  const activeFilterCount = selectedFields.length + selectedProfessions.length + selectedServices.length + selectedStatus.length + (selectedCountry ? 1 : 0) + (selectedState ? 1 : 0);

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
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-black">Find Scientists & Technologists</h1>
          <p className="mt-2 text-neutral-gray-dark">Connect with verified experts across African science and innovation ecosystems.</p>
          <Button 
            variant="outline" 
            className="mt-4 lg:hidden flex items-center gap-2"
            onClick={() => setShowFilters(!showFilters)}
          >
            <SlidersHorizontal className="h-4 w-4" />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
            {activeFilterCount > 0 && (
              <span className="flex items-center justify-center h-5 min-w-5 px-1.5 rounded-full bg-brand-red-600 text-white text-[10px] font-bold">
                {activeFilterCount}
              </span>
            )}
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* --- SIDEBAR FILTERS (Collapsible sections) --- */}
          <aside className={cn(
            "w-full lg:w-72 flex-shrink-0 space-y-6 transition-all duration-300",
            showFilters ? "block" : "hidden lg:block"
          )}>
            <div className="rounded-xl border border-neutral-gray-light bg-white p-5 shadow-sm lg:sticky lg:top-20 max-h-[calc(100vh-6rem)] overflow-y-auto custom-scrollbar">
              <div className="mb-4 flex items-center justify-between border-b border-neutral-gray-light pb-3">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-brand-red-600" />
                  <h3 className="font-bold text-neutral-black">Filters</h3>
                  {activeFilterCount > 0 && (
                    <span className="flex items-center justify-center h-5 min-w-5 px-1.5 rounded-full bg-brand-red-600 text-white text-[10px] font-bold">
                      {activeFilterCount}
                    </span>
                  )}
                </div>
                <button 
                  onClick={resetFilters}
                  className="text-xs text-brand-red-600 hover:underline font-medium"
                >
                  Reset All
                </button>
              </div>
              
              <div className="space-y-0 divide-y divide-neutral-gray-light">
                
                {/* 1. Fields */}
                <div className="py-4 first:pt-0">
                  <button onClick={() => toggleSection('fields')} className="w-full flex items-center justify-between text-sm font-bold text-neutral-black mb-0 hover:text-brand-red-600 transition-colors">
                    <span className="flex items-center gap-1.5">
                      Fields
                      {selectedFields.length > 0 && (
                        <span className="text-[10px] font-bold text-brand-red-600 bg-brand-red-100 px-1.5 py-0.5 rounded-full">{selectedFields.length}</span>
                      )}
                    </span>
                    <ChevronDown className={cn("h-4 w-4 text-slate-400 transition-transform", !collapsedSections.fields && "rotate-180")} />
                  </button>
                  {!collapsedSections.fields && (
                    <div className="mt-3 space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar animate-in fade-in duration-200">
                      {SCIENTIST_FIELDS.map((field) => (
                        <label key={field} className="flex items-center gap-2 cursor-pointer group">
                          <input 
                            type="checkbox" 
                            checked={selectedFields.includes(field)}
                            onChange={() => toggleFilter(field, selectedFields, setSelectedFields)}
                            className="rounded border-neutral-gray-light text-brand-red-600 focus:ring-brand-red-600" 
                          />
                          <span className="text-sm text-neutral-gray-dark group-hover:text-brand-navy-900 transition-colors">{field}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                {/* 2. Profession */}
                <div className="py-4">
                  <button onClick={() => toggleSection('profession')} className="w-full flex items-center justify-between text-sm font-bold text-neutral-black mb-0 hover:text-brand-red-600 transition-colors">
                    <span className="flex items-center gap-1.5">
                      Profession
                      {selectedProfessions.length > 0 && (
                        <span className="text-[10px] font-bold text-brand-red-600 bg-brand-red-100 px-1.5 py-0.5 rounded-full">{selectedProfessions.length}</span>
                      )}
                    </span>
                    <ChevronDown className={cn("h-4 w-4 text-slate-400 transition-transform", !collapsedSections.profession && "rotate-180")} />
                  </button>
                  {!collapsedSections.profession && (
                    <div className="mt-3 space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar animate-in fade-in duration-200">
                      {allProfessions.map((prof) => (
                        <label key={prof} className="flex items-center gap-2 cursor-pointer group">
                          <input 
                            type="checkbox" 
                            checked={selectedProfessions.includes(prof)}
                            onChange={() => toggleFilter(prof, selectedProfessions, setSelectedProfessions)}
                            className="rounded border-neutral-gray-light text-brand-red-600 focus:ring-brand-red-600" 
                          />
                          <span className="text-sm text-neutral-gray-dark group-hover:text-brand-navy-900 transition-colors">{prof}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                {/* 3. Services */}
                <div className="py-4">
                  <button onClick={() => toggleSection('services')} className="w-full flex items-center justify-between text-sm font-bold text-neutral-black mb-0 hover:text-brand-red-600 transition-colors">
                    <span className="flex items-center gap-1.5">
                      Services
                      {selectedServices.length > 0 && (
                        <span className="text-[10px] font-bold text-brand-red-600 bg-brand-red-100 px-1.5 py-0.5 rounded-full">{selectedServices.length}</span>
                      )}
                    </span>
                    <ChevronDown className={cn("h-4 w-4 text-slate-400 transition-transform", !collapsedSections.services && "rotate-180")} />
                  </button>
                  {!collapsedSections.services && (
                    <div className="mt-3 space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar animate-in fade-in duration-200">
                      {SCIENTIST_SERVICES.map((svc) => (
                        <label key={svc} className="flex items-center gap-2 cursor-pointer group">
                          <input 
                            type="checkbox" 
                            checked={selectedServices.includes(svc)}
                            onChange={() => toggleFilter(svc, selectedServices, setSelectedServices)}
                            className="rounded border-neutral-gray-light text-brand-red-600 focus:ring-brand-red-600" 
                          />
                          <span className="text-sm text-neutral-gray-dark group-hover:text-brand-navy-900 transition-colors truncate" title={svc}>{svc}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                {/* 4. Status */}
                <div className="py-4">
                  <button onClick={() => toggleSection('status')} className="w-full flex items-center justify-between text-sm font-bold text-neutral-black mb-0 hover:text-brand-red-600 transition-colors">
                    <span className="flex items-center gap-1.5">
                      Status
                      {selectedStatus.length > 0 && (
                        <span className="text-[10px] font-bold text-brand-red-600 bg-brand-red-100 px-1.5 py-0.5 rounded-full">{selectedStatus.length}</span>
                      )}
                    </span>
                    <ChevronDown className={cn("h-4 w-4 text-slate-400 transition-transform", !collapsedSections.status && "rotate-180")} />
                  </button>
                  {!collapsedSections.status && (
                    <div className="mt-3 space-y-2 animate-in fade-in duration-200">
                      {['Online', 'Offline'].map((status) => (
                        <label key={status} className="flex items-center gap-2 cursor-pointer group">
                          <input 
                            type="checkbox" 
                            checked={selectedStatus.includes(status)}
                            onChange={() => toggleFilter(status, selectedStatus, setSelectedStatus)}
                            className="rounded border-neutral-gray-light text-brand-red-600 focus:ring-brand-red-600" 
                          />
                          <span className="text-sm text-neutral-gray-dark group-hover:text-brand-navy-900 transition-colors">{status}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                {/* 5. Country */}
                <div className="py-4">
                  <button onClick={() => toggleSection('country')} className="w-full flex items-center justify-between text-sm font-bold text-neutral-black mb-0 hover:text-brand-red-600 transition-colors">
                    Country
                    <ChevronDown className={cn("h-4 w-4 text-slate-400 transition-transform", !collapsedSections.country && "rotate-180")} />
                  </button>
                  {!collapsedSections.country && (
                    <div className="mt-3 animate-in fade-in duration-200">
                      <select 
                        className="w-full rounded-lg border border-neutral-gray-light text-sm p-2 bg-neutral-bg-light focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600"
                        value={selectedCountry}
                        onChange={(e) => { setSelectedCountry(e.target.value); setSelectedState(''); }}
                      >
                        <option value="">All Countries</option>
                        {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                  )}
                </div>

                {/* 6. State / Region */}
                <div className="py-4 last:pb-0">
                  <button onClick={() => toggleSection('state')} className="w-full flex items-center justify-between text-sm font-bold text-neutral-black mb-0 hover:text-brand-red-600 transition-colors">
                    State / Region
                    <ChevronDown className={cn("h-4 w-4 text-slate-400 transition-transform", !collapsedSections.state && "rotate-180")} />
                  </button>
                  {!collapsedSections.state && (
                    <div className="mt-3 animate-in fade-in duration-200">
                      {selectedCountry && STATES[selectedCountry] ? (
                        <select 
                          className="w-full rounded-lg border border-neutral-gray-light text-sm p-2 bg-neutral-bg-light focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600"
                          value={selectedState}
                          onChange={(e) => setSelectedState(e.target.value)}
                        >
                          <option value="">All Regions</option>
                          {STATES[selectedCountry].map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      ) : (
                        <p className="text-xs text-slate-400 italic">Select a country first</p>
                      )}
                    </div>
                  )}
                </div>

              </div>
            </div>
          </aside>

          {/* --- MAIN CONTENT --- */}
          <div className="flex-1">
            {/* Search Bar */}
            <div className="mb-6 relative">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-gray-medium" />
              <input
                type="text"
                placeholder="Search Scientists by name, field, or expertise..."
                className="w-full rounded-xl border border-neutral-gray-light pl-12 pr-4 py-3 shadow-sm focus:border-brand-red-600 focus:outline-none focus:ring-1 focus:ring-brand-red-600 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Results count */}
            <div className="mb-4 flex items-center justify-between text-sm text-slate-500">
              <span>Showing <strong>{filteredScientists.length}</strong> results</span>
            </div>

            {/* Results Grid */}
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filteredScientists.map((sci, index) => (
                <div key={sci.id} className="group flex flex-col rounded-xl border border-neutral-gray-light bg-white shadow-sm transition-all hover:shadow-md hover:border-brand-red-100 overflow-hidden">
                  
                  {/* Card Header / Image */}
                  <div className="relative h-48 bg-brand-navy-900 overflow-hidden">
                    <Image src={sci.image} alt={sci.name} fill className="object-cover opacity-90 transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    
                    {/* Index badge (top-left) */}
                    <div className="absolute top-3 left-3 flex items-center justify-center h-6 w-6 rounded-full bg-brand-navy-900/80 text-white text-[10px] font-bold backdrop-blur-sm">
                      {index + 1}
                    </div>

                    {/* Archive button (top-right, always visible) */}
                    <div className="absolute top-3 right-3 flex gap-1.5">
                      <button 
                        className="flex items-center justify-center h-7 w-7 rounded-full bg-white/90 backdrop-blur text-slate-600 hover:text-blue-600 shadow-sm transition-colors"
                        title="Share"
                        onClick={async (e) => {
                          e.preventDefault();
                          try {
                            await navigator.clipboard.writeText(`${window.location.origin}/scientists/${sci.id}`);
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
                          archivedIds.includes(sci.id) ? "text-brand-red-600" : "text-slate-600 hover:text-brand-red-600"
                        )}
                        title={archivedIds.includes(sci.id) ? "Remove from Archive" : "Add to Archive"}
                        onClick={(e) => { e.preventDefault(); toggleArchive(sci.id); }}
                      >
                        {archivedIds.includes(sci.id) ? <ArchiveX className="h-3.5 w-3.5" /> : <Archive className="h-3.5 w-3.5" />}
                      </button>
                    </div>

                    {/* Bottom overlay: Status above name */}
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      {/* Online status on top of name */}
                      <div className="mb-1">
                        <span className={cn(
                          "inline-block px-2 py-0.5 text-[10px] font-bold rounded uppercase tracking-wide",
                          sci.status === 'Online' ? "bg-green-500 text-white" : "bg-neutral-gray-dark text-white"
                        )}>
                          {sci.status}
                        </span>
                      </div>
                      <h3 className="font-bold text-lg flex items-center gap-1 leading-tight">
                        {sci.name} 
                        {sci.verified && <CheckCircle className="h-4 w-4 text-blue-400 flex-shrink-0" />}
                      </h3>
                      <p className="text-xs text-neutral-gray-light flex items-center gap-1 mt-0.5">
                        <MapPin className="h-3 w-3" />
                        {sci.state ? `${sci.state}, ` : ''}{sci.country}
                      </p>
                    </div>
                  </div>
                  
                  {/* Card Body */}
                  <div className="flex flex-1 flex-col p-4">
                    
                    {/* Professions first (3 max) */}
                    <div className="mb-2">
                      <div className="flex flex-wrap gap-1">
                        {sci.professions.slice(0, 3).map(p => (
                          <span key={p} className="text-[10px] font-bold text-brand-red-600 bg-brand-red-100 px-2 py-0.5 rounded-full border border-brand-red-100">
                            {p}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Degrees with graduation cap, in a straight line */}
                    <div className="flex items-center gap-1.5 mb-3">
                      <GraduationCap className="h-3.5 w-3.5 text-brand-navy-900 flex-shrink-0" />
                      <div className="flex items-center gap-1 flex-wrap">
                        {sci.degrees.map((d, i) => (
                          <span key={d} className="text-[10px] uppercase font-bold text-brand-navy-900">
                            {d}{i < sci.degrees.length - 1 && <span className="text-neutral-gray-light ml-1">|</span>}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Star Rating - repositioned prominently */}
                    <div className="flex items-center gap-1.5 mb-3">
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={cn("h-3.5 w-3.5", i < Math.floor(sci.rating) ? "text-amber-500 fill-current" : "text-neutral-gray-light")} />
                        ))}
                      </div>
                      <span className="text-xs font-bold text-neutral-black">{sci.rating}</span>
                    </div>

                    {/* Services (max 5, structured) */}
                    <div className="flex-1">
                      <p className="text-xs text-neutral-gray-medium font-bold uppercase mb-1.5">Services</p>
                      <div className="flex flex-wrap gap-1">
                        {sci.services.slice(0, 5).map(s => (
                          <span key={s} className="text-[10px] text-neutral-gray-dark bg-neutral-bg-light border border-neutral-gray-light px-2 py-0.5 rounded">
                            {s}
                          </span>
                        ))}
                        {sci.services.length > 5 && (
                          <span className="text-[10px] text-neutral-gray-medium px-1">+{sci.services.length - 5}</span>
                        )}
                      </div>
                    </div>

                    {/* Stats Row: Views, Likes, Shares (no Reviews, no Favourites) */}
                    <div className="mt-4 pt-3 border-t border-neutral-gray-light flex justify-between items-center text-xs text-neutral-gray-medium">
                      <div className="flex gap-4">
                        <span className="flex items-center gap-1" title="Views"><Eye className="h-3 w-3" /> {sci.views ? (sci.views / 1000).toFixed(1) + 'k' : '0'}</span>
                        <span className="flex items-center gap-1" title="Likes"><ThumbsUp className="h-3 w-3" /> {(sci.likes/1000).toFixed(1)}k</span>
                        <span className="flex items-center gap-1" title="Shares"><Share2 className="h-3 w-3" /> {sci.shares || 0}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-4 grid grid-cols-2 gap-2">
                      <Link href={`/scientists/${sci.id}`} className="flex-1">
                        <Button size="sm" className="w-full bg-brand-navy-900 hover:bg-brand-navy-800 text-xs">View Details</Button>
                      </Link>
                      <Link href={`/scientists/${sci.id}?tab=contact`} className="flex-1">
                        <Button size="sm" variant="outline" className="w-full text-xs">Contact</Button>
                      </Link>
                    </div>

                  </div>
                </div>
              ))}
            </div>

            {filteredScientists.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 text-center rounded-xl border-2 border-dashed border-neutral-gray-light bg-white">
                <div className="h-16 w-16 rounded-full bg-slate-50 flex items-center justify-center mb-4">
                  <Search className="h-8 w-8 text-slate-300" />
                </div>
                <h3 className="text-lg font-medium text-neutral-black">No scientists found</h3>
                <p className="text-slate-500 max-w-sm mt-1">Try adjusting your filters or search for something else.</p>
                <Button 
                  variant="outline" 
                  className="mt-6"
                  onClick={() => { setSearchTerm(''); resetFilters(); }}
                >
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