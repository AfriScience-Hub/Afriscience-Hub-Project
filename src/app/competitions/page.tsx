'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Search, Filter, Trophy, Clock, Users, ChevronDown, MapPin,
  SlidersHorizontal, DollarSign, Eye, Calendar
} from 'lucide-react';
import {
  COMPETITIONS,
  COMPETITION_TYPES,
  COMPETITION_CATEGORIES
} from '../data/mockData';
import { Button } from '../components/ui/Button';
import { cn } from '../../lib/utils';

export default function Competitions() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({
    type: false,
    category: false,
    country: false,
  });
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const toggleSection = (key: string) =>
    setCollapsedSections(prev => ({ ...prev, [key]: !prev[key] }));

  // Unique host countries from data
  const hostCountries = useMemo(() => {
    const countries = new Set(COMPETITIONS.map(c => c.country));
    return Array.from(countries).sort();
  }, []);

  // Filter logic
  const filteredCompetitions = useMemo(() => {
    return COMPETITIONS.filter(comp => {
      const matchesSearch =
        comp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        comp.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        comp.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = selectedTypes.length === 0 || selectedTypes.includes(comp.type);
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(comp.category);
      const matchesCountry = !selectedCountry || comp.country === selectedCountry;
      return matchesSearch && matchesType && matchesCategory && matchesCountry;
    });
  }, [searchTerm, selectedTypes, selectedCategories, selectedCountry]);

  // Group by country
  const groupedByCountry = useMemo(() => {
    const groups: Record<string, typeof filteredCompetitions> = {};
    filteredCompetitions.forEach(comp => {
      if (!groups[comp.country]) groups[comp.country] = [];
      groups[comp.country].push(comp);
    });
    return Object.entries(groups).sort(([a], [b]) => a.localeCompare(b));
  }, [filteredCompetitions]);

  const toggleFilter = (item: string, current: string[], set: (val: string[]) => void) => {
    set(current.includes(item) ? current.filter(i => i !== item) : [...current, item]);
  };

  const resetFilters = () => {
    setSelectedTypes([]);
    setSelectedCategories([]);
    setSelectedCountry('');
  };

  const activeFilterCount = selectedTypes.length + selectedCategories.length + (selectedCountry ? 1 : 0);

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
            Showcase your skills, creativity, and scientific knowledge. Join competitions across Africa and win prizes, recognition, and opportunities.
          </p>
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
          {/* --- SIDEBAR FILTERS (Collapsible) --- */}
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

                {/* 1. Type */}
                <div className="py-4 first:pt-0">
                  <button onClick={() => toggleSection('type')} className="w-full flex items-center justify-between text-sm font-bold text-neutral-black hover:text-brand-red-600 transition-colors">
                    <span className="flex items-center gap-1.5">
                      Type
                      {selectedTypes.length > 0 && (
                        <span className="text-[10px] font-bold text-brand-red-600 bg-brand-red-100 px-1.5 py-0.5 rounded-full">{selectedTypes.length}</span>
                      )}
                    </span>
                    <ChevronDown className={cn("h-4 w-4 text-slate-400 transition-transform", !collapsedSections.type && "rotate-180")} />
                  </button>
                  {!collapsedSections.type && (
                    <div className="mt-3 space-y-2 animate-in fade-in duration-200">
                      {COMPETITION_TYPES.map(type => (
                        <label key={type} className="flex items-center gap-2 cursor-pointer group">
                          <input
                            type="checkbox"
                            checked={selectedTypes.includes(type)}
                            onChange={() => toggleFilter(type, selectedTypes, setSelectedTypes)}
                            className="rounded border-neutral-gray-light text-brand-red-600 focus:ring-brand-red-600"
                          />
                          <span className="text-sm text-neutral-gray-dark group-hover:text-brand-navy-900 transition-colors">{type}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                {/* 2. Category */}
                <div className="py-4">
                  <button onClick={() => toggleSection('category')} className="w-full flex items-center justify-between text-sm font-bold text-neutral-black hover:text-brand-red-600 transition-colors">
                    <span className="flex items-center gap-1.5">
                      Category
                      {selectedCategories.length > 0 && (
                        <span className="text-[10px] font-bold text-brand-red-600 bg-brand-red-100 px-1.5 py-0.5 rounded-full">{selectedCategories.length}</span>
                      )}
                    </span>
                    <ChevronDown className={cn("h-4 w-4 text-slate-400 transition-transform", !collapsedSections.category && "rotate-180")} />
                  </button>
                  {!collapsedSections.category && (
                    <div className="mt-3 space-y-2 animate-in fade-in duration-200">
                      {COMPETITION_CATEGORIES.map(cat => (
                        <label key={cat} className="flex items-center gap-2 cursor-pointer group">
                          <input
                            type="checkbox"
                            checked={selectedCategories.includes(cat)}
                            onChange={() => toggleFilter(cat, selectedCategories, setSelectedCategories)}
                            className="rounded border-neutral-gray-light text-brand-red-600 focus:ring-brand-red-600"
                          />
                          <span className="text-sm text-neutral-gray-dark group-hover:text-brand-navy-900 transition-colors">{cat}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                {/* 3. Country */}
                <div className="py-4 last:pb-0">
                  <button onClick={() => toggleSection('country')} className="w-full flex items-center justify-between text-sm font-bold text-neutral-black hover:text-brand-red-600 transition-colors">
                    Country
                    <ChevronDown className={cn("h-4 w-4 text-slate-400 transition-transform", !collapsedSections.country && "rotate-180")} />
                  </button>
                  {!collapsedSections.country && (
                    <div className="mt-3 animate-in fade-in duration-200">
                      <select
                        className="w-full rounded-lg border border-neutral-gray-light text-sm p-2 bg-neutral-bg-light focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600"
                        value={selectedCountry}
                        onChange={(e) => setSelectedCountry(e.target.value)}
                      >
                        <option value="">All Countries</option>
                        {hostCountries.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
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
                placeholder="Search competitions by name, type, or keyword..."
                className="w-full rounded-xl border border-neutral-gray-light pl-12 pr-4 py-3 shadow-sm focus:border-brand-red-600 focus:outline-none focus:ring-1 focus:ring-brand-red-600 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Results count */}
            <div className="mb-4 flex items-center justify-between text-sm text-slate-500">
              <span>Showing <strong>{filteredCompetitions.length}</strong> competitions</span>
            </div>

            {/* Grouped by Country */}
            {groupedByCountry.length > 0 ? (
              <div className="space-y-10">
                {groupedByCountry.map(([country, comps]) => (
                  <div key={country}>
                    {/* Country Group Header */}
                    <div className="flex items-center gap-3 mb-5 pb-2 border-b-2 border-brand-navy-900">
                      <MapPin className="h-5 w-5 text-brand-red-600" />
                      <h2 className="text-xl font-bold text-brand-navy-900">{country}</h2>
                      <span className="text-xs text-neutral-gray-medium font-medium bg-neutral-bg-light px-2 py-0.5 rounded-full">{comps.length} competition{comps.length > 1 ? 's' : ''}</span>
                    </div>

                    {/* Cards Grid */}
                    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                      {comps.map(comp => (
                        <div key={comp.id} className="group flex flex-col rounded-xl border border-neutral-gray-light bg-white shadow-sm transition-all hover:shadow-md hover:border-brand-red-100 overflow-hidden">
                          {/* Image (previewable) */}
                          <div className="relative h-48 bg-brand-navy-900 overflow-hidden cursor-pointer" onClick={() => setPreviewImage(comp.image)}>
                            <img src={comp.image} alt={comp.title} className="h-full w-full object-cover opacity-90 transition-transform duration-500 group-hover:scale-105" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                            {/* Type badge */}
                            <div className="absolute top-3 left-3">
                              <span className={cn("px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border backdrop-blur-sm", getTypeColor(comp.type))}>
                                {comp.type}
                              </span>
                            </div>
                            {/* Preview hint */}
                            <div className="absolute top-3 right-3">
                              <span className="flex items-center justify-center h-7 w-7 rounded-full bg-white/80 backdrop-blur text-slate-600">
                                <Eye className="h-3.5 w-3.5" />
                              </span>
                            </div>
                          </div>

                          {/* Body */}
                          <div className="flex flex-1 flex-col p-5">
                            {/* Intro Note */}
                            <p className="text-xs text-neutral-gray-medium italic mb-3 line-clamp-2">
                              {comp.introNote}
                            </p>

                            {/* Title */}
                            <h3 className="text-lg font-bold text-neutral-black group-hover:text-brand-red-600 transition-colors mb-2 leading-tight">
                              {comp.title}
                            </h3>

                            {/* Category Badge */}
                            <div className="mb-3">
                              <span className="inline-block text-[10px] font-bold uppercase tracking-wide text-brand-navy-900 bg-brand-navy-100 px-2.5 py-1 rounded-full border border-brand-navy-100">
                                {comp.category}
                              </span>
                            </div>

                            {/* Registration & Deadline */}
                            <div className="mt-auto space-y-2.5 pt-3 border-t border-neutral-gray-light">
                              <div className="flex items-center justify-between text-sm">
                                <span className="flex items-center gap-2 text-neutral-gray-dark">
                                  <DollarSign className="h-3.5 w-3.5 text-green-600" />
                                  Registration:
                                </span>
                                <span className="font-bold text-green-700">{comp.registrationFee}</span>
                              </div>
                              <div className="flex items-center justify-between text-sm">
                                <span className="flex items-center gap-2 text-neutral-gray-dark">
                                  <Calendar className="h-3.5 w-3.5 text-neutral-gray-medium" />
                                  Deadline:
                                </span>
                                <span className="font-medium text-neutral-black">
                                  {new Date(comp.deadline).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                                </span>
                              </div>
                              <div className="flex items-center justify-between text-sm">
                                <span className="flex items-center gap-2 text-neutral-gray-dark">
                                  <Users className="h-3.5 w-3.5 text-neutral-gray-medium" />
                                  Participants:
                                </span>
                                <span className="font-medium text-neutral-black">{comp.participants}</span>
                              </div>

                              <Link href={`/competitions/${comp.id}`}>
                                <Button className="w-full mt-2 bg-brand-navy-900 hover:bg-brand-navy-800" size="sm">
                                  View Details
                                </Button>
                              </Link>
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
                <div className="h-16 w-16 rounded-full bg-slate-50 flex items-center justify-center mb-4">
                  <Search className="h-8 w-8 text-slate-300" />
                </div>
                <h3 className="text-lg font-medium text-neutral-black">No competitions found</h3>
                <p className="text-slate-500 max-w-sm mt-1">Try adjusting your filters or search terms.</p>
                <Button variant="outline" className="mt-6" onClick={() => { setSearchTerm(''); resetFilters(); }}>
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Image Preview Modal */}
      {previewImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4" onClick={() => setPreviewImage(null)}>
          <div className="relative max-w-3xl max-h-[80vh] rounded-xl overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
            <img src={previewImage} alt="Preview" className="max-w-full max-h-[80vh] object-contain" />
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute top-3 right-3 h-8 w-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors text-lg"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
