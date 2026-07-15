'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { Search, SlidersHorizontal, Globe } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { SidebarFilters } from './components/SidebarFilters';
import { SponsorCard } from './components/SponsorCard';
import { MOCK_SPONSORS, type Sponsor } from './data';

export default function SponsorsListing() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const handleIndustryChange = useCallback((industry: string) => {
    setSelectedIndustry(prev => prev === industry ? '' : industry);
  }, []);

  const handleStatusChange = useCallback((status: string) => {
    setSelectedStatus(prev => prev === status ? '' : status);
  }, []);

  const handleCountryChange = useCallback((country: string) => {
    setSelectedCountry(country);
  }, []);

  const resetFilters = useCallback(() => {
    setSelectedIndustry('');
    setSelectedStatus('');
    setSelectedCountry('');
    setSearchTerm('');
  }, []);

  const filteredSponsors = MOCK_SPONSORS.filter(sponsor => {
    if (searchTerm && !sponsor.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !sponsor.industries.some(i => i.toLowerCase().includes(searchTerm.toLowerCase())) &&
        !sponsor.tier.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !sponsor.country.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !sponsor.description.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !sponsor.motto.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    if (selectedIndustry && !sponsor.industries.includes(selectedIndustry)) return false;
    if (selectedStatus && sponsor.status !== selectedStatus) return false;
    if (selectedCountry && sponsor.country !== selectedCountry) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-neutral-bg-light pb-16">
      <section className="bg-brand-navy-900 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-slate-400 text-sm mb-4">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <Link href="/support" className="hover:text-white">Support</Link>
            <span>/</span>
            <Link href="/support/sponsor" className="hover:text-white">Sponsor</Link>
            <span>/</span>
            <span className="text-white">All Sponsors</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">Our Sponsors</h1>
          <p className="text-slate-300 text-lg">Browse organizations, companies and brands powering African science, technology and innovation</p>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className={`w-full lg:w-80 flex-shrink-0 transition-all duration-300 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <SidebarFilters
              selectedIndustry={selectedIndustry} onIndustryChange={handleIndustryChange}
              selectedStatus={selectedStatus} onStatusChange={handleStatusChange}
              selectedCountry={selectedCountry} onCountryChange={handleCountryChange}
              onReset={resetFilters}
            />
          </aside>

          <div className="flex-1">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-2 lg:hidden">
                  <SlidersHorizontal className="h-4 w-4" />
                  {showFilters ? 'Hide' : 'Show'} Filters
                </Button>
                <p className="text-sm text-neutral-gray-dark">
                  <span className="font-bold text-neutral-black">{filteredSponsors.length}</span> sponsors found
                </p>
              </div>
            </div>

            <div className="mb-6 relative">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-gray-medium" />
              <input
                type="text"
                placeholder="Search sponsors by name, industry, tiers, country or keyword"
                className="w-full rounded-xl border border-neutral-gray-light pl-12 pr-4 py-3 text-sm shadow-sm focus:border-brand-red-600 focus:outline-none focus:ring-1 focus:ring-brand-red-600 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filteredSponsors.map(sponsor => (
                <SponsorCard
                  key={sponsor.id}
                  sponsor={sponsor}
                />
              ))}
            </div>

            {filteredSponsors.length === 0 && (
              <div className="text-center py-16">
                <Globe className="h-16 w-16 text-neutral-gray-light mx-auto mb-4" />
                <h3 className="text-xl font-bold text-neutral-black mb-2">No sponsors found</h3>
                <p className="text-neutral-gray-medium mb-4">Try adjusting your filters or search term</p>
                <Button onClick={resetFilters} variant="outline">Reset Filters</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
