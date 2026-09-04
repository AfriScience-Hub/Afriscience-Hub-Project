'use client';

import { useState, useMemo } from 'react';
import { Search, Vote } from 'lucide-react';
import { VOTING_FINALISTS, COMPETITION_TYPES, VOTING_YEARS, AFRICAN_COUNTRIES } from '@/app/data/mockData';
import { COMPETITION_CATEGORY_MAP } from '@/app/voting/data';
import AdminVotingTable from './components/AdminVotingTable';

export default function VotingPage() {
  const [search, setSearch] = useState('');
  const [selectedCompetition, setSelectedCompetition] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');

  const compCategories = selectedCompetition ? COMPETITION_CATEGORY_MAP[selectedCompetition] || [] : [];

  const resetFilters = () => {
    setSelectedCompetition(null);
    setSelectedCategory(null);
    setSelectedYear('');
    setSelectedCountry('');
    setSearch('');
  };

  const activeFilterCount = (selectedCompetition ? 1 : 0) + (selectedCategory ? 1 : 0) + (selectedYear ? 1 : 0) + (selectedCountry ? 1 : 0);

  const filtered = useMemo(() => {
    const term = search.toLowerCase();
    return VOTING_FINALISTS.filter((f) => {
      const posLabel = f.position === 1 ? '1st' : f.position === 2 ? '2nd' : f.position === 3 ? '3rd' : `${f.position}th`;
      const matchesSearch =
        !term ||
        f.name.toLowerCase().includes(term) ||
        f.competition.toLowerCase().includes(term) ||
        f.category.toLowerCase().includes(term) ||
        f.country.toLowerCase().includes(term) ||
        String(f.year).includes(term) ||
        posLabel.includes(term);
      const matchesCompetition = !selectedCompetition || f.competition === selectedCompetition;
      const matchesCategory = !selectedCategory || f.category === selectedCategory;
      const matchesYear = !selectedYear || String(f.year) === selectedYear;
      const matchesCountry = !selectedCountry || f.country === selectedCountry;
      return matchesSearch && matchesCompetition && matchesCategory && matchesYear && matchesCountry;
    });
  }, [search, selectedCompetition, selectedCategory, selectedYear, selectedCountry]);

  const totalVotes = filtered.reduce((sum, f) => sum + f.votes, 0);

  return (
    <div className="space-y-4">
      <div>
        <div className="flex items-center gap-1.5 text-[11px] text-neutral-gray-medium mb-1">
          <span>Dashboard</span>
          <span>›</span>
          <span>Categories</span>
          <span>›</span>
          <span className="text-neutral-black font-medium">Voting</span>
        </div>
        <h1 className="text-xl font-bold text-neutral-black flex items-center gap-2">
          <Vote className="h-5 w-5 text-red-600" />
          Voting
        </h1>
        <p className="text-xs text-neutral-gray-dark mt-1">Monitor live voting across competitions — filters mirror the public voting page.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="rounded-xl border border-neutral-gray-light bg-white p-4 shadow-sm">
          <p className="text-xs text-neutral-gray-medium">Showing Finalists</p>
          <p className="text-2xl font-bold text-neutral-black mt-1">{filtered.length}</p>
          <p className="text-[11px] text-neutral-gray-medium mt-1">of {VOTING_FINALISTS.length} total</p>
        </div>
        <div className="rounded-xl border border-neutral-gray-light bg-white p-4 shadow-sm">
          <p className="text-xs text-neutral-gray-medium">Total Votes (filtered)</p>
          <p className="text-2xl font-bold text-neutral-black mt-1">{totalVotes.toLocaleString()}</p>
          <p className="text-[11px] text-green-600 mt-1">{activeFilterCount > 0 ? `${activeFilterCount} filter${activeFilterCount > 1 ? 's' : ''} active` : 'No filters'}</p>
        </div>
        <div className="rounded-xl border border-neutral-gray-light bg-white p-4 shadow-sm">
          <p className="text-xs text-neutral-gray-medium">Active Competition</p>
          <p className="text-sm font-bold text-neutral-black mt-1 truncate">{selectedCompetition || 'All Competitions'}</p>
          <p className="text-[11px] text-neutral-gray-medium mt-1">{selectedCategory || 'All categories'}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 items-center">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-gray-medium" />
          <input
            type="text"
            placeholder="Search finalists by name, competition, category, country..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-neutral-gray-light bg-white text-xs focus:ring-2 focus:ring-brand-red-600 outline-none"
          />
        </div>
        <select
          value={selectedCompetition || ''}
          onChange={(e) => {
            const val = e.target.value || null;
            setSelectedCompetition(val);
            const cats = val ? COMPETITION_CATEGORY_MAP[val] || [] : [];
            if (cats.length === 1) setSelectedCategory(cats[0]);
            else setSelectedCategory(null);
          }}
          className="px-3 py-2 rounded-lg border border-neutral-gray-light bg-white text-xs cursor-pointer outline-none"
        >
          <option value="">All Competitions</option>
          {COMPETITION_TYPES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <select
          value={selectedCategory || ''}
          onChange={(e) => setSelectedCategory(e.target.value || null)}
          disabled={!selectedCompetition}
          className="px-3 py-2 rounded-lg border border-neutral-gray-light bg-white text-xs cursor-pointer outline-none disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <option value="">{!selectedCompetition ? 'Select competition first' : compCategories.length === 1 ? compCategories[0] : 'All Categories'}</option>
          {compCategories.length > 1 && compCategories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} className="px-3 py-2 rounded-lg border border-neutral-gray-light bg-white text-xs cursor-pointer outline-none">
          <option value="">All Years</option>
          {VOTING_YEARS.map((y) => (
            <option key={y} value={String(y)}>{y}</option>
          ))}
        </select>
        <select value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)} className="px-3 py-2 rounded-lg border border-neutral-gray-light bg-white text-xs cursor-pointer outline-none">
          <option value="">All Countries</option>
          {AFRICAN_COUNTRIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-xs text-neutral-gray-medium">
          Showing <span className="font-bold text-neutral-black">{filtered.length}</span> finalist{filtered.length !== 1 ? 's' : ''}
        </p>
        {activeFilterCount > 0 && (
          <button onClick={resetFilters} className="text-xs font-medium text-brand-red-600 hover:underline cursor-pointer">
            Clear filters
          </button>
        )}
      </div>

      <AdminVotingTable rows={filtered} />
    </div>
  );
}
