'use client';

import { useState, useMemo } from 'react';
import {
  Search, Filter, ChevronDown, Award, Eye, Trophy, Medal,
  Gift, SlidersHorizontal, MapPin, Calendar, X
} from 'lucide-react';
import {
  AWARD_WINNERS,
  AWARD_TYPES,
  AWARD_YEARS,
  COMPETITION_TYPES,
  COMPETITION_CATEGORIES
} from '../data/mockData';
import { Button } from '../components/ui/Button';
import { cn } from '../../lib/utils';

// Full world countries list for non-Competition awards
const WORLD_COUNTRIES = [
  'Afghanistan','Albania','Algeria','Andorra','Angola','Antigua and Barbuda','Argentina','Armenia','Australia','Austria',
  'Azerbaijan','Bahamas','Bahrain','Bangladesh','Barbados','Belarus','Belgium','Belize','Benin','Bhutan',
  'Bolivia','Bosnia and Herzegovina','Botswana','Brazil','Brunei','Bulgaria','Burkina Faso','Burundi','Cabo Verde','Cambodia',
  'Cameroon','Canada','Central African Republic','Chad','Chile','China','Colombia','Comoros','Congo','Costa Rica',
  'Croatia','Cuba','Cyprus','Czech Republic','Denmark','Djibouti','Dominica','Dominican Republic','Ecuador','Egypt',
  'El Salvador','Equatorial Guinea','Eritrea','Estonia','Eswatini','Ethiopia','Fiji','Finland','France','Gabon',
  'Gambia','Georgia','Germany','Ghana','Greece','Grenada','Guatemala','Guinea','Guinea-Bissau','Guyana',
  'Haiti','Honduras','Hungary','Iceland','India','Indonesia','Iran','Iraq','Ireland','Israel',
  'Italy','Ivory Coast','Jamaica','Japan','Jordan','Kazakhstan','Kenya','Kiribati','Kuwait','Kyrgyzstan',
  'Laos','Latvia','Lebanon','Lesotho','Liberia','Libya','Liechtenstein','Lithuania','Luxembourg','Madagascar',
  'Malawi','Malaysia','Maldives','Mali','Malta','Marshall Islands','Mauritania','Mauritius','Mexico','Micronesia',
  'Moldova','Monaco','Mongolia','Montenegro','Morocco','Mozambique','Myanmar','Namibia','Nauru','Nepal',
  'Netherlands','New Zealand','Nicaragua','Niger','Nigeria','North Korea','North Macedonia','Norway','Oman','Pakistan',
  'Palau','Palestine','Panama','Papua New Guinea','Paraguay','Peru','Philippines','Poland','Portugal','Qatar',
  'Romania','Russia','Rwanda','Saint Kitts and Nevis','Saint Lucia','Saint Vincent and the Grenadines','Samoa','San Marino',
  'Sao Tome and Principe','Saudi Arabia','Senegal','Serbia','Seychelles','Sierra Leone','Singapore','Slovakia','Slovenia',
  'Solomon Islands','Somalia','South Africa','South Korea','South Sudan','Spain','Sri Lanka','Sudan','Suriname','Sweden',
  'Switzerland','Syria','Taiwan','Tajikistan','Tanzania','Thailand','Timor-Leste','Togo','Tonga','Trinidad and Tobago',
  'Tunisia','Turkey','Turkmenistan','Tuvalu','Uganda','Ukraine','United Arab Emirates','United Kingdom','United States',
  'Uruguay','Uzbekistan','Vanuatu','Vatican City','Venezuela','Vietnam','Yemen','Zambia','Zimbabwe'
];

// African competition host countries (derived from mock data)
const AFRICAN_COMP_COUNTRIES = ['Egypt', 'Ghana', 'Kenya', 'Nigeria', 'South Africa'];

export default function Awards() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedYear, setSelectedYear] = useState<string>('2026');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [certificatePreview, setCertificatePreview] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({
    type: false,
    category: true,
    level: true,
    year: false,
    country: true,
  });

  const toggleSection = (key: string) =>
    setCollapsedSections(prev => ({ ...prev, [key]: !prev[key] }));

  // Determine if Competition's Award is the only selected type (for conditional filters)
  const isCompetitionOnly = selectedTypes.length === 1 && selectedTypes[0] === "Competition's Award";
  const hasCompetitionSelected = selectedTypes.includes("Competition's Award");

  // Country list depends on selection
  const countryList = useMemo(() => {
    if (isCompetitionOnly) return AFRICAN_COMP_COUNTRIES;
    return WORLD_COUNTRIES;
  }, [isCompetitionOnly]);

  // Filter
  const filteredAwards = useMemo(() => {
    return AWARD_WINNERS.filter(a => {
      const matchesSearch = a.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = selectedTypes.length === 0 || selectedTypes.includes(a.type);
      const matchesYear = !selectedYear || a.year.toString() === selectedYear;
      const matchesCountry = !selectedCountry || a.country === selectedCountry;

      // Category & Level only apply to Competition's Award
      const matchesCategory = !selectedCategory ||
        (a.type === "Competition's Award" && (a as any).competition === selectedCategory);
      const matchesLevel = !selectedLevel ||
        (a.type === "Competition's Award" && (a as any).category === selectedLevel);

      return matchesSearch && matchesType && matchesYear && matchesCountry && matchesCategory && matchesLevel;
    });
  }, [searchTerm, selectedTypes, selectedCategory, selectedLevel, selectedYear, selectedCountry]);

  const toggleFilter = (item: string, current: string[], set: (val: string[]) => void) => {
    set(current.includes(item) ? current.filter(i => i !== item) : [...current, item]);
  };

  const resetFilters = () => {
    setSelectedTypes([]);
    setSelectedCategory('');
    setSelectedLevel('');
    setSelectedYear('2026');
    setSelectedCountry('');
  };

  const activeFilterCount =
    selectedTypes.length +
    (selectedCategory ? 1 : 0) +
    (selectedLevel ? 1 : 0) +
    (selectedCountry ? 1 : 0);

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Developer's Award": return 'bg-blue-100 text-blue-700 border-blue-200';
      case "Sponsorship Award": return 'bg-purple-100 text-purple-700 border-purple-200';
      case "Competition's Award": return 'bg-amber-100 text-amber-700 border-amber-200';
      case "Donation's Award": return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      default: return 'bg-slate-100 text-slate-600 border-slate-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Developer's Award": return <Award className="h-3.5 w-3.5" />;
      case "Sponsorship Award": return <Gift className="h-3.5 w-3.5" />;
      case "Competition's Award": return <Trophy className="h-3.5 w-3.5" />;
      case "Donation's Award": return <Medal className="h-3.5 w-3.5" />;
      default: return <Award className="h-3.5 w-3.5" />;
    }
  };

  const getPositionStyle = (pos: number) => {
    switch (pos) {
      case 1: return 'bg-amber-500 text-white';
      case 2: return 'bg-slate-400 text-white';
      case 3: return 'bg-amber-700 text-white';
      default: return 'bg-slate-200 text-slate-600';
    }
  };

  const getPositionLabel = (pos: number) => {
    if (pos === 1) return '1st';
    if (pos === 2) return '2nd';
    if (pos === 3) return '3rd';
    return `${pos}th`;
  };

  return (
    <div className="min-h-screen bg-neutral-bg-light py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Award className="h-8 w-8 text-amber-500" />
            <h1 className="text-3xl font-bold text-neutral-black">Awards</h1>
          </div>
          <p className="text-neutral-gray-dark max-w-2xl">
            Celebrating outstanding contributions to African science, technology, and innovation across developers, sponsors, competitors, and donors.
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

          {/* --- SIDEBAR FILTERS --- */}
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
                      {AWARD_TYPES.map(type => (
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

                {/* 2. Category (Competition's Award only) */}
                <div className="py-4">
                  <button onClick={() => toggleSection('category')} className="w-full flex items-center justify-between text-sm font-bold text-neutral-black hover:text-brand-red-600 transition-colors">
                    <span className="flex items-center gap-1.5">
                      Category
                      <span className="text-[9px] text-slate-400 font-normal">(Competition's only)</span>
                    </span>
                    <ChevronDown className={cn("h-4 w-4 text-slate-400 transition-transform", !collapsedSections.category && "rotate-180")} />
                  </button>
                  {!collapsedSections.category && (
                    <div className="mt-3 space-y-2 animate-in fade-in duration-200">
                      <select
                        className="w-full rounded-lg border border-neutral-gray-light text-sm p-2 bg-neutral-bg-light focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600 disabled:opacity-50"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        disabled={!hasCompetitionSelected && selectedTypes.length > 0}
                      >
                        <option value="">All Categories</option>
                        {COMPETITION_TYPES.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                  )}
                </div>

                {/* 3. Level (Competition's Award only) */}
                <div className="py-4">
                  <button onClick={() => toggleSection('level')} className="w-full flex items-center justify-between text-sm font-bold text-neutral-black hover:text-brand-red-600 transition-colors">
                    <span className="flex items-center gap-1.5">
                      Level
                      <span className="text-[9px] text-slate-400 font-normal">(Competition's only)</span>
                    </span>
                    <ChevronDown className={cn("h-4 w-4 text-slate-400 transition-transform", !collapsedSections.level && "rotate-180")} />
                  </button>
                  {!collapsedSections.level && (
                    <div className="mt-3 space-y-2 animate-in fade-in duration-200">
                      <select
                        className="w-full rounded-lg border border-neutral-gray-light text-sm p-2 bg-neutral-bg-light focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600 disabled:opacity-50"
                        value={selectedLevel}
                        onChange={(e) => setSelectedLevel(e.target.value)}
                        disabled={!hasCompetitionSelected && selectedTypes.length > 0}
                      >
                        <option value="">All Levels</option>
                        {COMPETITION_CATEGORIES.map(l => <option key={l} value={l}>{l}</option>)}
                      </select>
                    </div>
                  )}
                </div>

                {/* 4. Year */}
                <div className="py-4">
                  <button onClick={() => toggleSection('year')} className="w-full flex items-center justify-between text-sm font-bold text-neutral-black hover:text-brand-red-600 transition-colors">
                    Year
                    <ChevronDown className={cn("h-4 w-4 text-slate-400 transition-transform", !collapsedSections.year && "rotate-180")} />
                  </button>
                  {!collapsedSections.year && (
                    <div className="mt-3 animate-in fade-in duration-200">
                      <select
                        className="w-full rounded-lg border border-neutral-gray-light text-sm p-2 bg-neutral-bg-light focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600"
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value)}
                      >
                        {AWARD_YEARS.map(y => <option key={y} value={y.toString()}>{y}</option>)}
                      </select>
                    </div>
                  )}
                </div>

                {/* 5. Country */}
                <div className="py-4 last:pb-0">
                  <button onClick={() => toggleSection('country')} className="w-full flex items-center justify-between text-sm font-bold text-neutral-black hover:text-brand-red-600 transition-colors">
                    <span className="flex items-center gap-1.5">
                      Country
                      {isCompetitionOnly && (
                        <span className="text-[9px] text-slate-400 font-normal">(African hosts)</span>
                      )}
                    </span>
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
                        {countryList.map(c => <option key={c} value={c}>{c}</option>)}
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
                placeholder="Search award bearers by name..."
                className="w-full rounded-xl border border-neutral-gray-light pl-12 pr-4 py-3 shadow-sm focus:border-brand-red-600 focus:outline-none focus:ring-1 focus:ring-brand-red-600 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Results count */}
            <div className="mb-4 flex items-center justify-between text-sm text-slate-500">
              <span>Showing <strong>{filteredAwards.length}</strong> award{filteredAwards.length !== 1 ? 's' : ''}</span>
              <div className="flex gap-2 flex-wrap">
                {selectedTypes.map(t => (
                  <span key={t} className="inline-flex items-center gap-1 text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                    {t}
                    <button onClick={() => toggleFilter(t, selectedTypes, setSelectedTypes)} className="hover:text-brand-red-600">
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Award Cards Grid */}
            {filteredAwards.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {filteredAwards.map(award => {
                  const isCompetition = award.type === "Competition's Award";
                  const compAward = award as any;

                  return (
                    <div
                      key={award.id}
                      className="group flex flex-col rounded-xl border border-neutral-gray-light bg-white shadow-sm transition-all hover:shadow-md overflow-hidden"
                    >
                      {/* Image area */}
                      <div className="relative h-52 bg-brand-navy-900 overflow-hidden">
                        <img
                          src={award.image}
                          alt={award.name}
                          className="h-full w-full object-cover object-top opacity-90 transition-transform duration-500 group-hover:scale-105 cursor-pointer"
                          onClick={() => setImagePreview(award.image)}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                        {/* Award Type Badge */}
                        <div className="absolute top-3 left-3">
                          <span className={cn(
                            "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border backdrop-blur-sm",
                            getTypeColor(award.type)
                          )}>
                            {getTypeIcon(award.type)}
                            {award.type}
                          </span>
                        </div>

                        {/* Position Badge for Competition Awards */}
                        {isCompetition && compAward.position && (
                          <div className="absolute top-3 right-3">
                            <span className={cn(
                              "flex items-center justify-center h-9 w-9 rounded-full text-sm font-bold shadow-lg",
                              getPositionStyle(compAward.position)
                            )}>
                              {getPositionLabel(compAward.position)}
                            </span>
                          </div>
                        )}

                        {/* Preview Eye */}
                        <button
                          className="absolute bottom-3 right-3 flex items-center justify-center h-7 w-7 rounded-full bg-white/80 backdrop-blur text-slate-600 hover:bg-white transition-colors"
                          onClick={(e) => { e.stopPropagation(); setImagePreview(award.image); }}
                        >
                          <Eye className="h-3.5 w-3.5" />
                        </button>

                        {/* Competition & Category badges in overlay */}
                        {isCompetition && (
                          <div className="absolute bottom-3 left-3 flex flex-wrap items-center gap-1.5">
                            <span className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase bg-white/20 text-white border border-white/20 backdrop-blur-sm">
                              {compAward.competition}
                            </span>
                            <span className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase bg-white/20 text-white border border-white/20 backdrop-blur-sm">
                              {compAward.category}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Body */}
                      <div className="flex flex-1 flex-col p-5">
                        {/* Name */}
                        <h3 className="text-lg font-bold text-neutral-black mb-1 leading-tight">{award.name}</h3>

                        {/* Country & Year */}
                        <div className="flex items-center gap-3 text-xs text-neutral-gray-medium mb-4">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {award.country}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {award.year}
                          </span>
                        </div>

                        {/* Rewards */}
                        <div className="mb-4">
                          <p className="text-[10px] font-bold text-neutral-gray-medium uppercase tracking-wider mb-2">Rewards</p>
                          <div className="flex flex-wrap gap-1.5">
                            {award.rewards.map((r, i) => (
                              <span key={i} className="inline-flex items-center gap-1 text-[11px] bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded-full">
                                <Gift className="h-2.5 w-2.5" />
                                {r}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* View Certificate Button */}
                        <div className="mt-auto">
                          <Button
                            variant="outline"
                            className="w-full border-brand-navy-900 text-brand-navy-900 hover:bg-brand-navy-900 hover:text-white gap-2"
                            onClick={() => setCertificatePreview(award.certificate)}
                          >
                            <Award className="h-4 w-4" />
                            View Certificate
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center rounded-xl border-2 border-dashed border-neutral-gray-light bg-white">
                <div className="h-16 w-16 rounded-full bg-slate-50 flex items-center justify-center mb-4">
                  <Search className="h-8 w-8 text-slate-300" />
                </div>
                <h3 className="text-lg font-medium text-neutral-black">No awards found</h3>
                <p className="text-slate-500 max-w-sm mt-1">Try adjusting your filters or search terms.</p>
                <Button variant="outline" className="mt-6" onClick={() => { setSearchTerm(''); resetFilters(); }}>
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Certificate Preview Modal */}
      {certificatePreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4" onClick={() => setCertificatePreview(null)}>
          <div className="relative max-w-2xl w-full rounded-xl overflow-hidden shadow-2xl bg-white" onClick={e => e.stopPropagation()}>
            <div className="p-4 border-b border-neutral-gray-light flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-amber-500" />
                <h3 className="font-bold text-neutral-black">Certificate Preview</h3>
              </div>
              <button
                onClick={() => setCertificatePreview(null)}
                className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="p-4">
              <img src={certificatePreview} alt="Certificate" className="w-full rounded-lg object-contain max-h-[60vh]" />
            </div>
          </div>
        </div>
      )}

      {/* Image Preview Modal */}
      {imagePreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4" onClick={() => setImagePreview(null)}>
          <div className="relative max-w-lg max-h-[80vh] rounded-xl overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
            <img src={imagePreview} alt="Preview" className="max-w-full max-h-[80vh] object-contain" />
            <button
              onClick={() => setImagePreview(null)}
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
