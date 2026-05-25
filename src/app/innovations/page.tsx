'use client';

import { useState } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import Header from '../components/header';
import SearchModal from '../components/search';
import Footer from '../components/footer';
import FilterSidebar from './components/filterSidebar';
import InnovationCards from './components/innovationCards';

type InterestOption =
  | 'Investment | Partnership'
  | 'Purchase | Trade'
  | 'Marketing'
  | 'Training | Mentorship'
  | 'Sensitization';

type InnovationFilters = {
  fields: string[];
  interests: InterestOption[];
  ownership: string[];
  stage: string[];
  sdgs: string[];
  country: string;
};

export interface InnovationItem {
  id: number;
  name: string;
  code: string;
  field: string;
  interests: InterestOption[];
  ownership: string;
  stage: string;
  sdgs: string[];
  creator: string;
  country: string;
  dimensions: string;
  stats: {
    views: string;
    likes: string;
    shares: string;
  };
  image: string;
}

const innovationData: InnovationItem[] = [
  {
    id: 1,
    name: 'SolaPump Pro',
    code: 'AFI-NG-2024-0001',
    field: 'Energy & Power',
    interests: ['Investment | Partnership', 'Purchase | Trade', 'Marketing'],
    ownership: 'Private',
    stage: 'Commercialization',
    sdgs: ['Affordable & Clean Energy', 'Zero Hunger', 'Climate Action'],
    creator: 'GreenRise Labs',
    country: 'Nigeria',
    dimensions: '120cm x 80cm x 160cm / 45kg',
    stats: { views: '33.8k', likes: '4.7k', shares: '1.5k' },
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 2,
    name: 'MalariaScope AI',
    code: 'AFI-KE-2024-0002',
    field: 'Medical',
    interests: ['Investment | Partnership', 'Training | Mentorship', 'Sensitization'],
    ownership: 'Academic',
    stage: 'Prototype',
    sdgs: ['Good Health & Well-Being', 'Quality Education', 'Reduced Inequalities'],
    creator: 'MedVision Africa',
    country: 'Kenya',
    dimensions: '35cm x 22cm x 18cm / 6kg',
    stats: { views: '28.4k', likes: '5.1k', shares: '1.9k' },
    image: 'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 3,
    name: 'EcoBrick Builder',
    code: 'AFI-GH-2023-0003',
    field: 'Environmental',
    interests: ['Purchase | Trade', 'Investment | Partnership', 'Marketing'],
    ownership: 'Corporate',
    stage: 'Scale-Up',
    sdgs: ['Responsible Consumption & Production', 'Sustainable Cities & Communities', 'Climate Action'],
    creator: 'UrbanCycle Works',
    country: 'Ghana',
    dimensions: '200cm x 100cm x 180cm / 350kg',
    stats: { views: '41.3k', likes: '5.2k', shares: '2.1k' },
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 4,
    name: 'AgroDrone Mapper',
    code: 'AFI-RW-2024-0004',
    field: 'Agriculture',
    interests: ['Investment | Partnership', 'Training | Mentorship', 'Purchase | Trade'],
    ownership: 'Private',
    stage: 'MVP',
    sdgs: ['Zero Hunger', 'Industry, Innovation & Infrastructure', 'Climate Action'],
    creator: 'CropSight Africa',
    country: 'Rwanda',
    dimensions: '90cm x 90cm x 35cm / 6.8kg',
    stats: { views: '22.1k', likes: '3.1k', shares: '0.7k' },
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 5,
    name: 'AquaPure Filter',
    code: 'AFI-TZ-2024-0005',
    field: 'Environmental',
    interests: ['Investment | Partnership', 'Sensitization', 'Purchase | Trade'],
    ownership: 'NGO | Charity',
    stage: 'Research & Development',
    sdgs: ['Clean Water & Sanitation', 'Good Health & Well-Being', 'Life on Land'],
    creator: 'BlueSource Initiative',
    country: 'Tanzania',
    dimensions: '55cm x 30cm x 28cm / 9kg',
    stats: { views: '18.9k', likes: '2.6k', shares: '0.9k' },
    image: 'https://images.unsplash.com/photo-1581093458791-9d15482442f6?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 6,
    name: 'BioGas SmartStove',
    code: 'AFI-UG-2023-0006',
    field: 'Energy & Power',
    interests: ['Purchase | Trade', 'Marketing', 'Sensitization'],
    ownership: 'Mission',
    stage: 'Ideation',
    sdgs: ['Affordable & Clean Energy', 'Climate Action', 'No Poverty'],
    creator: 'EcoHeat Cooperative',
    country: 'Uganda',
    dimensions: '70cm x 65cm x 40cm / 18kg',
    stats: { views: '24.7k', likes: '3.3k', shares: '1.1k' },
    image: 'https://images.unsplash.com/photo-1618477462146-050d2767eac4?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 7,
    name: 'PharmaTrace Chain',
    code: 'AFI-EG-2024-0007',
    field: 'Pharmaceutical',
    interests: ['Investment | Partnership', 'Marketing', 'Training | Mentorship'],
    ownership: 'Government | Public',
    stage: 'MVP',
    sdgs: ['Good Health & Well-Being', 'Industry, Innovation & Infrastructure', 'Peace, Justice & Strong Institutions'],
    creator: 'Nile Health Systems',
    country: 'Egypt',
    dimensions: 'Cloud platform / scalable',
    stats: { views: '16.2k', likes: '2.4k', shares: '0.8k' },
    image: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 8,
    name: 'OrbitLearn Telescope Kit',
    code: 'AFI-ZA-2024-0008',
    field: 'Astronomy & Space',
    interests: ['Training | Mentorship', 'Purchase | Trade', 'Sensitization'],
    ownership: 'Other',
    stage: 'Prototype',
    sdgs: ['Quality Education', 'Industry, Innovation & Infrastructure', 'Partnerships for the Goals'],
    creator: 'SkyLab Youth Works',
    country: 'South Africa',
    dimensions: '140cm x 45cm x 45cm / 14kg',
    stats: { views: '12.8k', likes: '1.9k', shares: '0.6k' },
    image: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=1200&auto=format&fit=crop',
  },
];

const defaultFilters: InnovationFilters = {
  fields: [],
  interests: [],
  ownership: [],
  stage: [],
  sdgs: [],
  country: '',
};

export default function InnovationsPage() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [filters, setFilters] = useState<InnovationFilters>(defaultFilters);

  const toggleArrayFilter = (
    key: 'fields' | 'interests' | 'ownership' | 'stage' | 'sdgs',
    value: string,
    checked: boolean
  ) => {
    const singleSelectFilters = ['fields', 'ownership'];

    setFilters((current) => ({
      ...current,
      [key]: checked
        ? singleSelectFilters.includes(key)
          ? [value]
          : [...current[key], value]
        : current[key].filter((item) => item !== value),
    }));
  };

  const handleCountryChange = (value: string) => {
    setFilters((current) => ({
      ...current,
      country: value,
    }));
  };

  const handleResetFilters = () => {
    setFilters(defaultFilters);
    setSearchQuery('');
  };

  const filteredInnovations = innovationData.filter((innovation) => {
    const normalizedQuery = searchQuery.trim().toLowerCase();
    const searchMatch =
      normalizedQuery.length === 0 ||
      [
        innovation.name,
        innovation.code,
        innovation.field,
        innovation.creator,
        innovation.country,
        innovation.ownership,
        innovation.stage,
        ...innovation.interests,
        ...innovation.sdgs,
      ]
        .join(' ')
        .toLowerCase()
        .includes(normalizedQuery);

    const fieldsMatch =
      filters.fields.length === 0 || filters.fields.includes(innovation.field);
    const interestsMatch =
      filters.interests.length === 0 ||
      filters.interests.some((interest) => innovation.interests.includes(interest));
    const ownershipMatch =
      filters.ownership.length === 0 || filters.ownership.includes(innovation.ownership);
    const stageMatch =
      filters.stage.length === 0 || filters.stage.includes(innovation.stage);
    const sdgsMatch =
      filters.sdgs.length === 0 ||
      filters.sdgs.some((sdg) => innovation.sdgs.includes(sdg));
    const countryMatch =
      !filters.country || innovation.country === filters.country;

    return searchMatch && fieldsMatch && interestsMatch && ownershipMatch && stageMatch && sdgsMatch && countryMatch;
  });

  const activeTags = [
    ...filters.fields.map((value) => ({ group: 'fields' as const, value, label: value })),
    ...filters.interests.map((value) => ({ group: 'interests' as const, value, label: value })),
    ...filters.ownership.map((value) => ({ group: 'ownership' as const, value, label: value })),
    ...filters.stage.map((value) => ({ group: 'stage' as const, value, label: value })),
    ...filters.sdgs.map((value) => ({ group: 'sdgs' as const, value, label: value })),
    ...(filters.country ? [{ group: 'country' as const, value: filters.country, label: filters.country }] : []),
  ];

  const removeTag = (
    group: 'fields' | 'interests' | 'ownership' | 'stage' | 'sdgs' | 'country',
    value?: string
  ) => {
    setFilters((current) => {
      if (group === 'country') {
        return { ...current, country: '' };
      }

      return {
        ...current,
        [group]: current[group].filter((item) => item !== value),
      };
    });
  };

  return (
    <div className="min-h-screen bg-[#f7f9fc]">
      <Header onSearchOpen={() => setSearchOpen(true)} />

      <section className="mx-auto max-w-5xl px-4 pb-16 pt-24 lg:px-8">
        <div className="mb-10 lg:mt-2 max-w-5xl">
          <h1 className="text-2xl lg:text-3xl font-bold tracking-tight text-[#0f1d33]">
            Afro-Innovations
          </h1>
          <p className="mt-2 text-sm text-[#51637f] lg:text-md">
            Discover ground-breaking solutions developed by African minds to solve global challenges. Search, filter, and connect with innovators.
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

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[300px_1fr]">
          <div className={`${showMobileFilters ? 'block' : 'hidden'} lg:block`}>
            <FilterSidebar
              selectedFilters={filters}
              onToggleFilter={toggleArrayFilter}
              onCountryChange={handleCountryChange}
              onReset={handleResetFilters}
            />
          </div>

          <InnovationCards
            innovations={filteredInnovations}
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
