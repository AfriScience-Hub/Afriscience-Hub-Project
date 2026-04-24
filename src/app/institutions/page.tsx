'use client';

import { useMemo, useState } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import Header from '../components/header';
import SearchModal from '../components/search';
import Footer from '../components/footer';
import InstitutesHeader from './components/institutesheader';
import FilterSidebar from './components/filterSidebar';
import InstitutesResults, { type Institute, type SortOption } from './components/instituteCards';

interface InstituteFilters {
  status: string[];
  class: string[];
  gender: string[];
  ownership: string[];
  services: string[];
  country: string;
  region: string;
}

const instituteData: Institute[] = [
  {
    id: 1,
    name: 'Lagos High School of Science & Tech',
    location: { city: 'Lagos', region: 'Lagos', country: 'Nigeria' },
    status: 'ONLINE',
    class: 'Secondary',
    ownership: 'Private',
    gender: 'Mixed',
    services: ['Science Clubs', 'Teaching & Learning', 'Scholarships'],
    rating: { stars: 4.8, count: 156 },
    stats: { likes: '4.2k', messages: 156, forks: 820 },
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 2,
    name: 'Cape Town Science Academy',
    location: { city: 'Cape Town', region: 'Western Cape', country: 'South Africa' },
    status: 'OFFLINE',
    class: 'Primary',
    ownership: 'Private',
    gender: 'Mixed',
    services: ['Exercises & Sports', 'Extra Lessons', 'Teaching & Learning'],
    rating: { stars: 4.7, count: 56 },
    stats: { likes: '1.5k', messages: 56, forks: 180 },
    image: 'https://images.unsplash.com/photo-1605333555239-4d6211832043?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 3,
    name: "St. Mary's Girls Academy",
    location: { city: 'Accra', region: 'Greater Accra', country: 'Ghana' },
    status: 'OFFLINE',
    class: 'Secondary',
    ownership: 'Mission',
    gender: 'Female',
    services: ['Health Programs', 'Scholarships', 'Teaching & Learning'],
    rating: { stars: 4.6, count: 112 },
    stats: { likes: '2.8k', messages: 112, forks: 410 },
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 4,
    name: 'Cairo International School',
    location: { city: 'Cairo', region: 'Cairo', country: 'Egypt' },
    status: 'ONLINE',
    class: 'Secondary',
    ownership: 'International',
    gender: 'Mixed',
    services: ['Conferences', 'Excursions', 'Teaching & Learning'],
    rating: { stars: 4.9, count: 205 },
    stats: { likes: '4.1k', messages: 205, forks: 720 },
    image: 'https://images.unsplash.com/photo-1521791136064-7986c292321d?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 5,
    name: 'Kigali Boys High',
    location: { city: 'Kigali', region: 'Kigali City', country: 'Rwanda' },
    status: 'OFFLINE',
    class: 'Secondary',
    ownership: 'Government | Public',
    gender: 'Male',
    services: ['Competitions', 'Science Clubs', 'Teaching & Learning'],
    rating: { stars: 4.4, count: 78 },
    stats: { likes: '1.8k', messages: 78, forks: 200 },
    image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=1200&auto=format&fit=crop',
  },
];

const defaultFilters: InstituteFilters = {
  status: [],
  class: [],
  gender: [],
  ownership: [],
  services: [],
  country: '',
  region: '',
};

export default function InstitutionsPage() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('recommended');
  const [activeFilters, setActiveFilters] = useState<InstituteFilters>(defaultFilters);

  const handleToggleFilter = (
    category: 'status' | 'class' | 'gender' | 'ownership' | 'services',
    value: string,
    checked: boolean
  ) => {
    setActiveFilters((current) => ({
      ...current,
      [category]: checked
        ? [...current[category], value]
        : current[category].filter((item) => item !== value),
    }));
  };

  const handleCountryChange = (value: string) => {
    setActiveFilters((current) => ({
      ...current,
      country: value,
      region: '',
    }));
  };

  const handleRegionChange = (value: string) => {
    setActiveFilters((current) => ({
      ...current,
      region: value,
    }));
  };

  const handleResetFilters = () => {
    setActiveFilters(defaultFilters);
    setSearchQuery('');
  };

  const filteredInstitutes = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    const filtered = instituteData.filter((item) => {
      const searchMatch =
        normalizedQuery.length === 0 ||
        [
          item.name,
          item.location.city,
          item.location.region,
          item.location.country,
          item.class,
          item.ownership,
          item.gender,
          ...item.services,
        ]
          .join(' ')
          .toLowerCase()
          .includes(normalizedQuery);

      const statusMatch =
        activeFilters.status.length === 0 || activeFilters.status.includes(item.status);
      const classMatch =
        activeFilters.class.length === 0 || activeFilters.class.includes(item.class);
      const genderMatch =
        activeFilters.gender.length === 0 || activeFilters.gender.includes(item.gender);
      const ownershipMatch =
        activeFilters.ownership.length === 0 || activeFilters.ownership.includes(item.ownership);
      const servicesMatch =
        activeFilters.services.length === 0 ||
        activeFilters.services.some((service) => item.services.includes(service));
      const countryMatch =
        !activeFilters.country || item.location.country === activeFilters.country;
      const regionMatch =
        !activeFilters.region || item.location.region === activeFilters.region;

      return (
        searchMatch &&
        statusMatch &&
        classMatch &&
        genderMatch &&
        ownershipMatch &&
        servicesMatch &&
        countryMatch &&
        regionMatch
      );
    });

    return [...filtered].sort((first, second) => {
      if (sortBy === 'highest-rated') {
        return second.rating.stars - first.rating.stars;
      }

      if (sortBy === 'most-reviewed') {
        return second.rating.count - first.rating.count;
      }

      return second.rating.stars * second.rating.count - first.rating.stars * first.rating.count;
    });
  }, [activeFilters, searchQuery, sortBy]);

  return (
    <div className="min-h-screen bg-white">
      <Header onSearchOpen={() => setSearchOpen(true)} />
      <InstitutesHeader searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <section className="mx-auto mt-10 max-w-6xl px-4 pb-16">
        <button
          type="button"
          onClick={() => setShowMobileFilters((current) => !current)}
          className="mb-6 mt-10 inline-flex items-center gap-3 rounded-lg border-2 border-[#9dafc7] bg-white px-4 py-2 text-sm font-semibold text-[#0f1d33] shadow-sm transition hover:bg-[#f8fbff] lg:hidden"
        >
          <SlidersHorizontal className="h-5 w-5" />
          {showMobileFilters ? 'Hide Filters' : 'Show Filters'}
        </button>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr] lg:mt-22">
          <div className={`${showMobileFilters ? 'block' : 'hidden'} lg:block`}>
            <FilterSidebar
              selectedFilters={activeFilters}
              onToggleFilter={handleToggleFilter}
              onCountryChange={handleCountryChange}
              onRegionChange={handleRegionChange}
              onReset={handleResetFilters}
            />
          </div>

          <InstitutesResults
            data={filteredInstitutes}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />
        </div>
      </section>

      <Footer />
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}
