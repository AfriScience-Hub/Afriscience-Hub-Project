'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Filter, Trophy, Users, ChevronDown, MapPin, SlidersHorizontal, DollarSign, Eye, Calendar, Clock } from 'lucide-react';
import { COMPETITIONS, COMPETITION_TYPES, AFRICAN_COUNTRIES } from '../data';
import { Button } from '../../components/ui/Button';
import { cn } from '../../../lib/utils';

const CATEGORIES_BY_TYPE: Record<string, string[]> = {
  'Afri \u2013 Anime': ['General (18+)'],
  'Afri \u2013 Presentations': ['Lower Primary', 'Upper Primary', 'Junior Secondary', 'Senior Secondary', 'Undergraduates', 'Graduates'],
  'Afri \u2013 Memes': ['General (18+)'],
  'Afri \u2013 MySpace': ['General (18+)'],
};

const TYPE_SUMMARY: Record<string, string> = {
  'Afri \u2013 Anime': 'Create an animated video to explain a scientific concept of your choice. Skillfully craft your animation to be engaging and educating.',
  'Afri \u2013 Presentations': 'Give an audio-visual presentation to address some persisting problems that challenge the African continent, and offer possible science \u2013 based solutions for them.',
  'Afri \u2013 Memes': 'Create a science \u2013 themed meme that is both comic and informative. Use humor to make science concepts less complex and more understandable.',
  'Afri \u2013 MySpace': 'Showcase your working environment (station, lab, workshop, studio, hub, center, unit, etc.). Let us see the space from where you provide scientific & technological solutions.',
};

export default function PastCompetitions() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({ type: false, category: false, country: false });
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const toggleSection = (key: string) => setCollapsedSections(prev => ({ ...prev, [key]: !prev[key] }));

  const categories = selectedType ? CATEGORIES_BY_TYPE[selectedType] || [] : [];

  const filteredCompetitions = useMemo(() => {
    return COMPETITIONS.filter(comp => {
      const matchesSearch = comp.title.toLowerCase().includes(searchTerm.toLowerCase()) || comp.type.toLowerCase().includes(searchTerm.toLowerCase()) || comp.description.toLowerCase().includes(searchTerm.toLowerCase());
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

  const resetFilters = () => {
    setSelectedType('');
    setSelectedCategory('');
    setSelectedCountry('');
  };

  const activeFilterCount = (selectedType ? 1 : 0) + (selectedCategory ? 1 : 0) + (selectedCountry ? 1 : 0);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Afri \u2013 Anime': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'Afri \u2013 Presentations': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Afri \u2013 Memes': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'Afri \u2013 MySpace': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      default: return 'bg-neutral-bg-light text-neutral-gray-dark border-neutral-gray-light';
    }
  };

  return (
    <div className="min-h-screen bg-neutral-bg-light py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Trophy className="h-8 w-8 text-brand-red-600" />
            <h1 className="text-3xl font-bold text-neutral-black">Competitions</h1>
          </div>
          <p className="text-neutral-gray-dark max-w-2xl">
            Join competitors across Africa to showcase your skills, creativity and scientific knowledge. Win prizes, recognition and collaboration opportunities.
          </p>

          {/* Toggle */}
          <div className="flex p-1 bg-slate-100 rounded-lg w-full sm:w-auto mt-6">
            <Link
              href="/competitions"
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-md text-sm font-semibold transition-all duration-200 text-slate-500 hover:text-slate-700 hover:bg-slate-200/50"
            >
              <Trophy className="h-4 w-4" />
              Current
            </Link>
            <Link
              href="/competitions/pastcompetition"
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-md text-sm font-semibold transition-all duration-200 bg-white text-brand-red-600 shadow-sm ring-1 ring-slate-200"
            >
              <Clock className="h-4 w-4" />
              Past
            </Link>
          </div>
        </div>

        {filteredCompetitions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center rounded-xl border-2 border-dashed border-neutral-gray-light bg-white">
            <Clock className="h-12 w-12 text-slate-300 mb-4" />
            <h2 className="text-xl font-bold text-neutral-black mb-2">No Past Competitions Yet</h2>
            <p className="text-slate-500 max-w-md mb-6">Past competitions will appear here once they conclude. Check back later.</p>
            <Link href="/competitions">
              <Button variant="outline">View Current Competitions</Button>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            <aside className={cn("w-full lg:w-72 flex-shrink-0 space-y-6 transition-all duration-300", showFilters ? "block" : "hidden lg:block")}>
              <div className="rounded-xl border border-neutral-gray-light bg-white p-5 shadow-sm lg:sticky lg:top-20 max-h-[calc(100vh-6rem)] overflow-y-auto custom-scrollbar">
                <div className="mb-4 flex items-center justify-between border-b border-neutral-gray-light pb-3">
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-brand-red-600" />
                    <h3 className="font-bold text-neutral-black">Filters</h3>
                    {activeFilterCount > 0 && (
                      <span className="flex items-center justify-center h-5 min-w-5 px-1.5 rounded-full bg-brand-red-600 text-white text-[10px] font-bold">{activeFilterCount}</span>
                    )}
                  </div>
                  <button onClick={resetFilters} className="text-xs text-brand-red-600 hover:underline font-medium">Reset All</button>
                </div>
                <div className="space-y-0 divide-y divide-neutral-gray-light">
                  <div className="py-4 first:pt-0">
                    <button onClick={() => toggleSection('type')} className="w-full flex items-center justify-between text-sm font-bold text-neutral-black hover:text-brand-red-600 transition-colors">
                      <span>Type</span>
                      <ChevronDown className={cn("h-4 w-4 text-slate-400 transition-transform", !collapsedSections.type && "rotate-180")} />
                    </button>
                    {!collapsedSections.type && (
                      <div className="mt-3 space-y-2 animate-in fade-in duration-200">
                        {COMPETITION_TYPES.map(type => (
                          <label key={type} className="flex items-center gap-2 cursor-pointer group">
                            <input type="radio" name="past-type" checked={selectedType === type} onChange={() => { setSelectedType(type); setSelectedCategory(''); }} className="border-neutral-gray-light text-brand-red-600 focus:ring-brand-red-600" />
                            <span className="text-sm text-neutral-gray-dark group-hover:text-brand-navy-900 transition-colors">{type}</span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="py-4">
                    <button onClick={() => toggleSection('category')} className="w-full flex items-center justify-between text-sm font-bold text-neutral-black hover:text-brand-red-600 transition-colors">
                      <span>Category</span>
                      <ChevronDown className={cn("h-4 w-4 text-slate-400 transition-transform", !collapsedSections.category && "rotate-180")} />
                    </button>
                    {!collapsedSections.category && (
                      <div className="mt-3 animate-in fade-in duration-200">
                        {!selectedType ? (
                          <p className="text-xs text-slate-400 italic">Select a type first</p>
                        ) : categories.length === 0 ? (
                          <p className="text-xs text-slate-400 italic">No categories available</p>
                        ) : (
                          <div className="space-y-2">
                            {categories.map(cat => (
                              <label key={cat} className="flex items-center gap-2 cursor-pointer group">
                                <input type="radio" name="past-category" checked={selectedCategory === cat} onChange={() => setSelectedCategory(cat)} className="border-neutral-gray-light text-brand-red-600 focus:ring-brand-red-600" />
                                <span className="text-sm text-neutral-gray-dark group-hover:text-brand-navy-900 transition-colors">{cat}</span>
                              </label>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="py-4 last:pb-0">
                    <button onClick={() => toggleSection('country')} className="w-full flex items-center justify-between text-sm font-bold text-neutral-black hover:text-brand-red-600 transition-colors">Country<ChevronDown className={cn("h-4 w-4 text-slate-400 transition-transform", !collapsedSections.country && "rotate-180")} /></button>
                    {!collapsedSections.country && (
                      <div className="mt-3 animate-in fade-in duration-200">
                        <select className="w-full rounded-lg border border-neutral-gray-light text-sm p-2 bg-neutral-bg-light focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600" value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)}>
                          <option value="">All Countries</option>
                          {AFRICAN_COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </aside>
            <div className="flex-1">
              <div className="mb-6 relative">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-gray-medium" />
                <input type="text" placeholder="Search past competitions by name, type, category, country or keyword" className="w-full rounded-xl border border-neutral-gray-light pl-12 pr-4 py-3 text-sm placeholder:text-sm shadow-sm focus:border-brand-red-600 focus:outline-none focus:ring-1 focus:ring-brand-red-600 transition-all" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
              </div>
              <div className="mb-4 flex items-center justify-between text-sm text-slate-500">
                <span>Showing <strong>{filteredCompetitions.length}</strong> past competitions</span>
              </div>
              {groupedByCountry.length > 0 ? (
                <div className="space-y-10">
                  {groupedByCountry.map(([country, comps]) => (
                    <div key={country}>
                      <div className="flex items-center gap-3 mb-5 pb-2 border-b-2 border-brand-navy-900">
                        <MapPin className="h-5 w-5 text-brand-red-600" />
                        <h2 className="text-xl font-bold text-brand-navy-900">{country}</h2>
                        <span className="text-xs text-neutral-gray-medium font-medium bg-neutral-bg-light px-2 py-0.5 rounded-full">{comps.length} competition{comps.length > 1 ? 's' : ''}</span>
                      </div>
                      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                        {comps.map(comp => (
                          <div key={comp.id} className="group flex flex-col rounded-xl border border-neutral-gray-light bg-white shadow-sm transition-all hover:shadow-md hover:border-brand-red-100 overflow-hidden">
                            <div className="relative h-48 bg-brand-navy-900 overflow-hidden cursor-pointer" onClick={() => setPreviewImage(comp.image)}>
                              <Image src={comp.image} alt={comp.title} fill className="object-cover opacity-90 transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                              <div className="absolute top-3 left-3">
                                <span className={cn("px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border backdrop-blur-sm", getTypeColor(comp.type))}>{comp.type}</span>
                              </div>
                              <div className="absolute top-3 right-3">
                                <span className="flex items-center justify-center h-7 w-7 rounded-full bg-white/80 backdrop-blur text-slate-600"><Eye className="h-3.5 w-3.5" /></span>
                              </div>
                            </div>
                            <div className="flex flex-1 flex-col p-5">
                              <p className="text-xs text-neutral-gray-medium italic mb-3 line-clamp-2">{comp.introNote}</p>
                              <h3 className="text-lg font-bold text-neutral-black group-hover:text-brand-red-600 transition-colors mb-2 leading-tight">{comp.title}: {comp.country}</h3>
                              <div className="mb-3">
                                <span className="inline-block text-[10px] font-bold uppercase tracking-wide text-brand-navy-900 bg-brand-navy-100 px-2.5 py-1 rounded-full border border-brand-navy-100">{comp.category}</span>
                              </div>
                              <div className="mt-auto space-y-2.5 pt-3 border-t border-neutral-gray-light">
                                <div className="flex items-center justify-between text-sm">
                                  <span className="flex items-center gap-2 text-neutral-gray-dark"><DollarSign className="h-3.5 w-3.5 text-green-600" /> Registration:</span>
                                  <span className="font-bold text-green-700">{comp.registrationFee}</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                  <span className="flex items-center gap-2 text-neutral-gray-dark"><Calendar className="h-3.5 w-3.5 text-neutral-gray-medium" /> Deadline:</span>
                                  <span className="font-medium text-neutral-black">{new Date(comp.deadline).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                  <span className="flex items-center gap-2 text-neutral-gray-dark"><Users className="h-3.5 w-3.5 text-neutral-gray-medium" /> Participants:</span>
                                  <span className="font-medium text-neutral-black">{comp.participants}</span>
                                </div>
                                <Link href={`/competitions/${comp.id}`}><Button className="w-full mt-2 bg-brand-navy-900 hover:bg-brand-navy-800" size="sm">View Details</Button></Link>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center rounded-xl border-2 border-dashed border-neutral-gray-light bg-white">
                  <div className="h-16 w-16 rounded-full bg-slate-50 flex items-center justify-center mb-4"><Search className="h-8 w-8 text-slate-300" /></div>
                  <h3 className="text-lg font-medium text-neutral-black">No past competitions found</h3>
                  <p className="text-slate-500 max-w-sm mt-1">Try adjusting your filters or search terms.</p>
                  <Button variant="outline" className="mt-6" onClick={() => { setSearchTerm(''); resetFilters(); }}>Clear Filters</Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      {previewImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4" onClick={() => setPreviewImage(null)}>
          <div className="relative max-w-3xl max-h-[80vh] w-full rounded-xl overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
            <Image src={previewImage} alt="Preview" fill className="object-contain" sizes="90vw" />
            <button onClick={() => setPreviewImage(null)} className="absolute top-3 right-3 h-8 w-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors text-lg">&times;</button>
          </div>
        </div>
      )}
    </div>
  );
}
