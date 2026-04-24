'use client';

import { useState } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import Header from '../components/header';
import SearchModal from '../components/search';
import Footer from '../components/footer';
import FilterCards from './components/centerCards';
import FilterSidebar from './components/filterSidebar';

type CenterStatus = 'ONLINE' | 'OFFLINE';

interface SpecialistCenter {
  id: number;
  name: string;
  field: string;
  categories: string[];
  services: string[];
  ownership: string;
  status: CenterStatus;
  location: {
    city: string;
    region: string;
    country: string;
  };
  rating: number;
  stats: {
    views: string;
    likes: string;
    shares: string;
  };
  image: string;
}

interface CenterFilters {
  field: string;
  categories: string[];
  services: string[];
  ownership: string[];
  status: string[];
  country: string;
  region: string;
}

const specialistCenters: SpecialistCenter[] = [
  {
    id: 1,
    name: 'Lagos Biomedical Diagnostics Center',
    field: 'Medical',
    categories: ['Basic Clinical Diagnostics', 'Haematology', 'Immunology'],
    services: ['Diagnosis (Screening)', 'Result Interpretation', 'Monitoring', 'Treatment', 'Prevention & Control'],
    ownership: 'Private',
    status: 'ONLINE',
    location: { city: 'Lagos', region: 'Lagos', country: 'Nigeria' },
    rating: 4.8,
    stats: { views: '14.2k', likes: '4.5k', shares: '720' },
    image: 'https://images.unsplash.com/photo-1516549655669-dfce2130fba7?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 2,
    name: 'Nairobi Environmental Sciences Hub',
    field: 'Environmental',
    categories: ['Climate Research', 'Conservation Biology', 'Water Systems'],
    services: ['Research & Development', 'Monitoring', 'Safety & Compliance', 'Training (Industrial)'],
    ownership: 'NGO | Charity',
    status: 'ONLINE',
    location: { city: 'Nairobi', region: 'Nairobi County', country: 'Kenya' },
    rating: 4.7,
    stats: { views: '8.9k', likes: '2.8k', shares: '450' },
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 3,
    name: 'Accra AgriTech Innovation Lab',
    field: 'Agriculture',
    categories: ['Crop Science', 'Soil Science', 'Precision Agriculture'],
    services: ['Research & Development', 'Diagnosis (Screening)', 'Monitoring', 'Training (Industrial)'],
    ownership: 'Academic',
    status: 'OFFLINE',
    location: { city: 'Accra', region: 'Greater Accra', country: 'Ghana' },
    rating: 4.9,
    stats: { views: '6.4k', likes: '2.1k', shares: '340' },
    image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 4,
    name: 'Cairo Pharma Testing Laboratory',
    field: 'Pharmaceutical',
    categories: ['Drug Discovery', 'Quality Control', 'Clinical Trials'],
    services: ['Quality Control & Assurance', 'Research & Development', 'Safety & Compliance', 'Result Interpretation'],
    ownership: 'Corporate',
    status: 'ONLINE',
    location: { city: 'Cairo', region: 'Cairo Governorate', country: 'Egypt' },
    rating: 4.6,
    stats: { views: '11.2k', likes: '3.4k', shares: '580' },
    image: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 5,
    name: 'Johannesburg Veterinary Research Institute',
    field: 'Veterinary',
    categories: ['Livestock Health', 'Veterinary Pathology', 'Epidemiology'],
    services: ['Treatment', 'Monitoring', 'Research & Development', 'Prevention & Control'],
    ownership: 'Government | Public',
    status: 'ONLINE',
    location: { city: 'Johannesburg', region: 'Gauteng', country: 'South Africa' },
    rating: 4.5,
    stats: { views: '7.6k', likes: '2.2k', shares: '290' },
    image: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 6,
    name: 'Kigali ICT & Cybersecurity Center',
    field: 'Computer & ICT',
    categories: ['Cybersecurity', 'AI & Machine Learning', 'Networking & Telecoms'],
    services: ['Monitoring', 'Safety & Compliance', 'Research & Development', 'Training (Industrial)'],
    ownership: 'Corporate',
    status: 'ONLINE',
    location: { city: 'Kigali', region: 'Kigali City', country: 'Rwanda' },
    rating: 4.8,
    stats: { views: '9.3k', likes: '3.1k', shares: '490' },
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 7,
    name: 'Dakar Energy & Power Research Station',
    field: 'Energy & Power',
    categories: ['Solar Energy', 'Wind Power', 'Power Systems'],
    services: ['Research & Development', 'Monitoring', 'Quality Control & Assurance', 'Training (Industrial)'],
    ownership: 'Inter-Government',
    status: 'OFFLINE',
    location: { city: 'Dakar', region: 'Dakar', country: 'Senegal' },
    rating: 4.4,
    stats: { views: '5.2k', likes: '1.6k', shares: '210' },
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 8,
    name: 'Kampala Food Safety & Nutrition Center',
    field: 'Food & Nutrition',
    categories: ['Food Safety', 'Nutrition Science', 'Food Processing'],
    services: ['Quality Control & Assurance', 'Diagnosis (Screening)', 'Guidance & Counseling', 'Workspace & Accommodation'],
    ownership: 'Government | Public',
    status: 'ONLINE',
    location: { city: 'Kampala', region: 'Central Region', country: 'Uganda' },
    rating: 4.3,
    stats: { views: '4.1k', likes: '1.2k', shares: '150' },
    image: 'https://images.unsplash.com/photo-1565061828011-1f834f4f85f2?q=80&w=1200&auto=format&fit=crop',
  },
];

const defaultFilters: CenterFilters = {
  field: '',
  categories: [],
  services: [],
  ownership: [],
  status: [],
  country: '',
  region: '',
};

export default function CentersPage() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<CenterFilters>(defaultFilters);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const toggleArrayFilter = (
    key: 'categories' | 'services' | 'ownership' | 'status',
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

  const handleFieldChange = (value: string) => {
    setFilters((current) => ({
      ...current,
      field: current.field === value ? '' : value,
      categories: [],
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

  const removeFilterTag = (group: keyof CenterFilters, value?: string) => {
    setFilters((current) => {
      if (group === 'field' || group === 'country' || group === 'region') {
        return { ...current, [group]: '' };
      }

      if (group === 'categories' || group === 'services' || group === 'ownership' || group === 'status') {
        return {
          ...current,
          [group]: current[group].filter((item) => item !== value),
        };
      }

      return current;
    });
  };

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filteredCenters = specialistCenters.filter((center) => {
    const searchMatch =
      normalizedQuery.length === 0 ||
      [
        center.name,
        center.field,
        center.ownership,
        center.location.city,
        center.location.region,
        center.location.country,
        ...center.categories,
        ...center.services,
      ]
        .join(' ')
        .toLowerCase()
        .includes(normalizedQuery);

    const fieldMatch = !filters.field || center.field === filters.field;
    const categoryMatch =
      filters.categories.length === 0 ||
      filters.categories.some((category) => center.categories.includes(category));
    const serviceMatch =
      filters.services.length === 0 ||
      filters.services.some((service) => center.services.includes(service));
    const ownershipMatch =
      filters.ownership.length === 0 || filters.ownership.includes(center.ownership);
    const statusMatch =
      filters.status.length === 0 || filters.status.includes(center.status);
    const countryMatch =
      !filters.country || center.location.country === filters.country;
    const regionMatch =
      !filters.region || center.location.region === filters.region;

    return (
      searchMatch &&
      fieldMatch &&
      categoryMatch &&
      serviceMatch &&
      ownershipMatch &&
      statusMatch &&
      countryMatch &&
      regionMatch
    );
  });

  const activeTags = [
    ...(filters.field ? [{ group: 'field' as const, value: filters.field, label: filters.field }] : []),
    ...filters.categories.map((value) => ({ group: 'categories' as const, value, label: value })),
    ...filters.services.map((value) => ({ group: 'services' as const, value, label: value })),
    ...filters.ownership.map((value) => ({ group: 'ownership' as const, value, label: value })),
    ...filters.status.map((value) => ({ group: 'status' as const, value, label: value })),
    ...(filters.country ? [{ group: 'country' as const, value: filters.country, label: filters.country }] : []),
    ...(filters.region ? [{ group: 'region' as const, value: filters.region, label: filters.region }] : []),
  ];

  return (
    <div className="min-h-screen bg-[#f7f9fc]">
      <Header onSearchOpen={() => setSearchOpen(true)} />

      <section className="mx-auto max-w-6xl px-4 pb-16 pt-24 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-5xl">
          <h1 className="text-2xl font-bold tracking-tight text-[#0f1d33] lg:text-3xl">
            Find Specialist Centers
          </h1>
          <p className="text-sm text-[#51637f] lg:text-md">
            Discover specialized clinics, stations, centers, and establishments that render services in specific scientific & technological fields.
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
              onFieldChange={handleFieldChange}
              onToggleFilter={toggleArrayFilter}
              onCountryChange={handleCountryChange}
              onRegionChange={handleRegionChange}
              onReset={handleResetFilters}
            />
          </div>

          <FilterCards
            centers={filteredCenters}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            activeTags={activeTags}
            onRemoveTag={removeFilterTag}
            onClearAll={handleResetFilters}
          />
        </div>
      </section>

      <Footer />
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}
