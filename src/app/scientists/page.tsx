'use client';

import { useState } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import Header from '../components/header';
import SearchModal from '../components/search';
import Footer from '../components/footer';
import FilterSidebar from './components/filterSidebar';
import ScientistsCards from './components/scientistsCards';

type ScientistStatus = 'ONLINE' | 'OFFLINE';

type ScientistFilters = {
  fields: string[];
  professions: string[];
  services: string[];
  status: ScientistStatus[];
  country: string;
  region: string;
};

export interface ScientistItem {
  id: number;
  name: string;
  field: string;
  professions: string[];
  services: string[];
  status: ScientistStatus;
  country: string;
  region: string;
  degree: string[];
  rating: number;
  stats: {
    views: string;
    likes: string;
    shares: string;
  };
  image: string;
}

const scientistData: ScientistItem[] = [
  {
    id: 1,
    name: 'Dr. Amara Okafor',
    field: 'Medical',
    professions: ['Clinical Pharmacologist', 'Drug Discovery Scientist', 'Toxicologist'],
    services: ['Research & Development', 'Lab Analysis & Equipment Expert', 'Consultancy'],
    status: 'ONLINE',
    country: 'Nigeria',
    region: 'Lagos',
    degree: ['Doctoral', 'Masters'],
    rating: 4.9,
    stats: { views: '6.8k', likes: '1.8k', shares: '145' },
    image: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 2,
    name: 'Engr. David Nkosi',
    field: 'Engineering',
    professions: ['Structural Engineer', 'Project Manager'],
    services: ['Building & Construction', 'Project Management', 'Consultancy'],
    status: 'OFFLINE',
    country: 'South Africa',
    region: 'Gauteng',
    degree: ['Bachelors', 'Masters'],
    rating: 4.7,
    stats: { views: '5.1k', likes: '1.4k', shares: '120' },
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 3,
    name: 'Sarah Mensah',
    field: 'Computer & ICT',
    professions: ['Data Analyst', 'Machine Learning Engineer'],
    services: ['Modeling & Simulation', 'Research & Development', 'Education & Training', 'Content Creation'],
    status: 'ONLINE',
    country: 'Ghana',
    region: 'Greater Accra',
    degree: ['Bachelors'],
    rating: 5.0,
    stats: { views: '3.2k', likes: '1.0k', shares: '90' },
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 4,
    name: 'Dr. Ahmed Ibrahim',
    field: 'Veterinary',
    professions: ['Veterinary Surgeon', 'Animal Nutritionist'],
    services: ['Fieldwork', 'Consultancy', 'Repairs & Maintenance', 'Entrepreneurship & Business'],
    status: 'ONLINE',
    country: 'Egypt',
    region: 'Cairo',
    degree: ['Doctoral'],
    rating: 4.6,
    stats: { views: '4.5k', likes: '1.1k', shares: '110' },
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 5,
    name: 'Dr. Chipo Moyo',
    field: 'Food & Nutrition',
    professions: ['Animal Nutritionist', 'Project Manager'],
    services: ['Education & Training', 'Writing & Documentations', 'Research & Development'],
    status: 'OFFLINE',
    country: 'Zimbabwe',
    region: 'Harare',
    degree: ['Masters', 'Doctoral'],
    rating: 4.5,
    stats: { views: '2.9k', likes: '0.9k', shares: '82' },
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 6,
    name: 'Dr. Samuel Kiplagat',
    field: 'Agriculture',
    professions: ['Project Manager', 'Data Analyst'],
    services: ['Fieldwork', 'Research & Development', 'Entrepreneurship & Business'],
    status: 'ONLINE',
    country: 'Kenya',
    region: 'Nairobi County',
    degree: ['Bachelors', 'Masters'],
    rating: 4.8,
    stats: { views: '4.9k', likes: '1.5k', shares: '136' },
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 7,
    name: 'Dr. Fatou Diallo',
    field: 'Pharmaceutical',
    professions: ['Clinical Pharmacologist', 'Toxicologist'],
    services: ['Lab Analysis & Equipment Expert', 'Consultancy', 'Writing & Documentations'],
    status: 'ONLINE',
    country: 'Senegal',
    region: 'Dakar',
    degree: ['Doctoral'],
    rating: 4.8,
    stats: { views: '3.8k', likes: '1.2k', shares: '105' },
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 8,
    name: 'Engr. Ruth Nansubuga',
    field: 'Energy & Power',
    professions: ['Structural Engineer', 'Project Manager'],
    services: ['Fabrication & Installation', 'Project Management', 'Repairs & Maintenance'],
    status: 'ONLINE',
    country: 'Uganda',
    region: 'Central Region',
    degree: ['Bachelors'],
    rating: 4.4,
    stats: { views: '2.7k', likes: '0.8k', shares: '74' },
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1200&auto=format&fit=crop',
  },
];

const defaultFilters: ScientistFilters = {
  fields: [],
  professions: [],
  services: [],
  status: [],
  country: '',
  region: '',
};

export default function ScientistsPage() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [filters, setFilters] = useState<ScientistFilters>(defaultFilters);

  const toggleArrayFilter = (
    key: 'fields' | 'professions' | 'services' | 'status',
    value: string,
    checked: boolean
  ) => {
    setFilters((current) => ({
      ...current,
      [key]: checked
        ? [...current[key], value]
        : current[key].filter((item) => item !== value),
    }));
  };

  const handleCountryChange = (value: string) => {
    setFilters((current) => ({
      ...current,
      country: value,
      region: '',
    }));
  };

  const handleRegionChange = (value: string) => {
    setFilters((current) => ({
      ...current,
      region: value,
    }));
  };

  const handleResetFilters = () => {
    setFilters(defaultFilters);
    setSearchQuery('');
  };

  const filteredScientists = scientistData.filter((scientist) => {
    const normalizedQuery = searchQuery.trim().toLowerCase();
    const searchMatch =
      normalizedQuery.length === 0 ||
      [
        scientist.name,
        scientist.field,
        scientist.country,
        scientist.region,
        ...scientist.professions,
        ...scientist.services,
      ]
        .join(' ')
        .toLowerCase()
        .includes(normalizedQuery);

    const fieldsMatch =
      filters.fields.length === 0 || filters.fields.includes(scientist.field);
    const professionsMatch =
      filters.professions.length === 0 ||
      filters.professions.some((profession) => scientist.professions.includes(profession));
    const servicesMatch =
      filters.services.length === 0 ||
      filters.services.some((service) => scientist.services.includes(service));
    const statusMatch =
      filters.status.length === 0 || filters.status.includes(scientist.status);
    const countryMatch =
      !filters.country || scientist.country === filters.country;
    const regionMatch =
      !filters.region || scientist.region === filters.region;

    return searchMatch && fieldsMatch && professionsMatch && servicesMatch && statusMatch && countryMatch && regionMatch;
  });

  const activeTags = [
    ...filters.fields.map((value) => ({ group: 'fields' as const, value, label: value })),
    ...filters.professions.map((value) => ({ group: 'professions' as const, value, label: value })),
    ...filters.services.map((value) => ({ group: 'services' as const, value, label: value })),
    ...filters.status.map((value) => ({ group: 'status' as const, value, label: value })),
    ...(filters.country ? [{ group: 'country' as const, value: filters.country, label: filters.country }] : []),
    ...(filters.region ? [{ group: 'region' as const, value: filters.region, label: filters.region }] : []),
  ];

  const removeTag = (
    group: 'fields' | 'professions' | 'services' | 'status' | 'country' | 'region',
    value?: string
  ) => {
    setFilters((current) => {
      if (group === 'country') {
        return { ...current, country: '', region: '' };
      }

      if (group === 'region') {
        return { ...current, region: '' };
      }

      return {
        ...current,
        [group]: current[group].filter((item) => item !== value),
      };
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Header onSearchOpen={() => setSearchOpen(true)} />

      <section className="mx-auto max-w-6xl px-4 pb-16 pt-24 lg:px-8">
        <div className="mb-10 max-w-5xl">
          <h1 className="text-2xl font-bold tracking-tight text-[#0f1d33] sm:text-3xl">
            Find Scientists & Technologists
          </h1>
          <p className="text-sm text-[#51637f] lg:text-md">
            Connect with verified experts across African science and innovation ecosystems.
          </p>
          <button
            type="button"
            onClick={() => setShowMobileFilters((current) => !current)}
            className="mt-6 inline-flex items-center gap-3 rounded-lg border-2 text-sm border-[#9dafc7] bg-white px-3 py-2 font-semibold text-[#0f1d33] shadow-sm transition hover:bg-[#f8fbff] lg:hidden"
          >
            <SlidersHorizontal className="h-5 w-5" />
            {showMobileFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr]">
          <div className={`${showMobileFilters ? 'block' : 'hidden'} lg:block`}>
            <FilterSidebar
              selectedFilters={filters}
              onToggleFilter={toggleArrayFilter}
              onCountryChange={handleCountryChange}
              onRegionChange={handleRegionChange}
              onReset={handleResetFilters}
            />
          </div>

          <ScientistsCards
            scientists={filteredScientists}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            activeTags={activeTags}
            onRemoveTag={removeTag}
            onClearAll={handleResetFilters}
          />
        </div>
      </section>

      <Footer />
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}
