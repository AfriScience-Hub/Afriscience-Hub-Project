'use client';

import { useState } from 'react';
import Link from 'next/link';
import { SlidersHorizontal, Globe } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { SidebarFilters } from './components/SidebarFilters';
import { SponsorCard } from './components/SponsorCard';
import { MOCK_SPONSORS, type Sponsor } from './data';

export default function SponsorsListing() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [showFilters, setShowFilters] = useState(true);
  const [archivedSponsors, setArchivedSponsors] = useState<number[]>([]);
  const [industryOpen, setIndustryOpen] = useState(true);
  const [statusOpen, setStatusOpen] = useState(true);
  const [countryOpen, setCountryOpen] = useState(true);

  const handleIndustryChange = (industry: string) => {
    setSelectedIndustry(prev =>
      prev.includes(industry) ? prev.filter(i => i !== industry) : [...prev, industry]
    );
  };

  const handleStatusChange = (status: string) => {
    setSelectedStatus(prev =>
      prev.includes(status) ? prev.filter(s => s !== status) : [...prev, status]
    );
  };

  const resetFilters = () => {
    setSelectedIndustry([]);
    setSelectedStatus([]);
    setSelectedCountry('');
    setSearchTerm('');
  };

  const toggleArchive = (id: number) => {
    setArchivedSponsors(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const handleShare = (sponsor: Sponsor) => {
    if (navigator.share) {
      navigator.share({ title: sponsor.name, text: sponsor.description, url: window.location.href + '/' + sponsor.id });
    } else {
      navigator.clipboard.writeText(window.location.href + '/' + sponsor.id);
      alert('Link copied to clipboard!');
    }
  };

  const filteredSponsors = MOCK_SPONSORS.filter(sponsor => {
    if (searchTerm && !sponsor.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    if (selectedIndustry.length > 0 && !selectedIndustry.includes(sponsor.industry)) return false;
    if (selectedStatus.length > 0 && !selectedStatus.includes(sponsor.status)) return false;
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
          <p className="text-slate-300 text-lg">Browse organizations supporting African science and innovation</p>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          <aside className={`w-80 flex-shrink-0 transition-all duration-300 ${showFilters ? 'block' : 'hidden'}`}>
            <SidebarFilters
              searchTerm={searchTerm} onSearchChange={setSearchTerm}
              selectedIndustry={selectedIndustry} onIndustryChange={handleIndustryChange}
              selectedStatus={selectedStatus} onStatusChange={handleStatusChange}
              selectedCountry={selectedCountry} onCountryChange={setSelectedCountry}
              onReset={resetFilters}
              industryOpen={industryOpen} setIndustryOpen={setIndustryOpen}
              statusOpen={statusOpen} setStatusOpen={setStatusOpen}
              countryOpen={countryOpen} setCountryOpen={setCountryOpen}
            />
          </aside>

          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-2">
                  <SlidersHorizontal className="h-4 w-4" />
                  {showFilters ? 'Hide' : 'Show'} Filters
                </Button>
                <p className="text-sm text-neutral-gray-dark">
                  <span className="font-bold text-neutral-black">{filteredSponsors.length}</span> sponsors found
                </p>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredSponsors.map(sponsor => (
                <SponsorCard
                  key={sponsor.id}
                  sponsor={sponsor}
                  isArchived={archivedSponsors.includes(sponsor.id)}
                  onToggleArchive={toggleArchive}
                  onShare={handleShare}
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
