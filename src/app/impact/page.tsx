'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { HandHelping, SlidersHorizontal } from 'lucide-react';
import Header from '../components/header';
import SearchModal from '../components/search';
import Footer from '../components/footer';
import FilterSidebar from './components/filterSidebar';
import ImpactCards, { type ImpactItem } from './components/impartCards';

interface ImpactFilters {
  cause: string[];
  year: string;
  country: string;
}

const impactStories: ImpactItem[] = [
  {
    id: 1,
    slug: 'nakuru-education-center',
    title: 'Nakuru Education Center',
    organization: 'STEM Reach Africa',
    cause: 'Education Support',
    year: '2026',
    country: 'Kenya',
    beneficiaries: '800',
    utilizedAmount: 'KSh 890,000',
    image:
      'https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=1200&auto=format&fit=crop',
    description:
      'Modern computer lab and STEM resources provided to 800 students in underserved communities.',
  },
  {
    id: 2,
    slug: 'kwame-mensah',
    title: 'Kwame Mensah',
    organization: 'Nuru Research Collective',
    cause: 'Agriculture',
    year: '2026',
    country: 'Ghana',
    beneficiaries: '10,000+',
    utilizedAmount: 'GHS 45,000',
    image:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1200&auto=format&fit=crop',
    description:
      'Agricultural research on drought-resistant crops helping 10,000+ farmers improve harvest outcomes.',
  },
  {
    id: 3,
    slug: 'lusaka-health-initiative',
    title: 'Lusaka Health Initiative',
    organization: 'Akoma Science Network',
    cause: 'Health',
    year: '2026',
    country: 'Zambia',
    beneficiaries: '15,000',
    utilizedAmount: 'ZMW 125,000',
    image:
      'https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=1200&auto=format&fit=crop',
    description:
      'Mobile health clinic serving 15,000 residents in remote areas with no access to nearby healthcare.',
  },
  {
    id: 4,
    slug: 'dr-fatima-hassan',
    title: 'Dr. Fatima Hassan',
    organization: 'Atlas Climate Lab',
    cause: 'Renewable Energy',
    year: '2025',
    country: 'Sudan',
    beneficiaries: '180,000',
    utilizedAmount: 'SDG 180,000',
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1200&auto=format&fit=crop',
    description:
      'Renewable energy research leading to affordable solar solutions for off-grid households and clinics.',
  },
  {
    id: 5,
    slug: 'kaduna-borehole-project',
    title: 'Kaduna Borehole Project',
    organization: 'Ubuntu Futures Fund',
    cause: 'Borehole',
    year: '2025',
    country: 'Nigeria',
    beneficiaries: '2,400',
    utilizedAmount: 'NGN 32,000,000',
    image:
      'https://images.unsplash.com/photo-1509395176047-4a66953fd231?q=80&w=1200&auto=format&fit=crop',
    description:
      'Clean water access expanded through solar-powered boreholes installed across rural communities.',
  },
  {
    id: 6,
    slug: 'cairo-research-aid-fund',
    title: 'Cairo Research Aid Fund',
    organization: 'Cairo Future Labs',
    cause: 'Research Aid',
    year: '2025',
    country: 'Egypt',
    beneficiaries: '350',
    utilizedAmount: 'EGP 540,000',
    image:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop',
    description:
      'Research grants and equipment support helping early-career scientists move promising projects forward.',
  },
  {
    id: 7,
    slug: 'mirembe-tech-access',
    title: 'Mirembe Tech Access',
    organization: 'Savanna Discovery Hub',
    cause: 'Technology Access',
    year: '2024',
    country: 'Uganda',
    beneficiaries: '5,600',
    utilizedAmount: 'UGX 210,000,000',
    image:
      'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200&auto=format&fit=crop',
    description:
      'Connectivity and digital science tools delivered to schools that previously had almost no online access.',
  },
  {
    id: 8,
    slug: 'kigali-innovation-works',
    title: 'Kigali Innovation Works',
    organization: 'Mirembe Learning Trust',
    cause: 'Infrastructure',
    year: '2024',
    country: 'Rwanda',
    beneficiaries: '1,450',
    utilizedAmount: 'RWF 78,000,000',
    image:
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=1200&auto=format&fit=crop',
    description:
      'Shared labs and project spaces built to support community innovation, training, and technical collaboration.',
  },
];

const defaultFilters: ImpactFilters = {
  cause: [],
  year: '',
  country: '',
};

export default function ImpactPage() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [filters, setFilters] = useState<ImpactFilters>(defaultFilters);

  const toggleArrayFilter = (key: 'cause', value: string, checked: boolean) => {
    setFilters((current) => ({
      ...current,
      [key]: checked
        ? [...current[key], value]
        : current[key].filter((item) => item !== value),
    }));
  };

  const handleYearChange = (value: string) => {
    setFilters((current) => ({ ...current, year: value }));
  };

  const handleCountryChange = (value: string) => {
    setFilters((current) => ({ ...current, country: value }));
  };

  const handleResetFilters = () => {
    setFilters(defaultFilters);
    setSearchQuery('');
  };

  const filteredImpactStories = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return impactStories.filter((story) => {
      const searchMatch =
        normalizedQuery.length === 0 ||
        [
          story.title,
          story.organization,
          story.cause,
          story.country,
          story.description,
          story.utilizedAmount,
          story.beneficiaries,
        ]
          .join(' ')
          .toLowerCase()
          .includes(normalizedQuery);

      const causeMatch = filters.cause.length === 0 || filters.cause.includes(story.cause);
      const yearMatch = !filters.year || story.year === filters.year;
      const countryMatch = !filters.country || story.country === filters.country;

      return searchMatch && causeMatch && yearMatch && countryMatch;
    });
  }, [filters, searchQuery]);

  const activeTags = [
    ...filters.cause.map((value) => ({ group: 'cause' as const, value, label: value })),
    ...(filters.country
      ? [{ group: 'country' as const, value: filters.country, label: filters.country }]
      : []),
    ...(filters.year ? [{ group: 'year' as const, value: filters.year, label: filters.year }] : []),
  ];

  const removeTag = (group: 'cause' | 'year' | 'country', value?: string) => {
    setFilters((current) => {
      if (group === 'year' || group === 'country') {
        return { ...current, [group]: '' };
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

      <section className="relative overflow-hidden bg-[#0a2342] pb-20 pt-32 text-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-12" />
        <div className="absolute inset-0 bg-[#0a2342]/90" />

        <div className="relative mx-auto max-w-5xl px-4 lg:px-8">
          <div className="max-w-4xl">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-emerald-500/20 text-emerald-400 px-5 py-3 text-sm font-semibold">
              <HandHelping className="h-5 w-5" />
              Making a Difference
            </div>

            <h1 className="text-2xl lg:text-5xl font-bold tracking-tight">Impact Stories</h1>

            <p className="mt-4 max-w-5xl text-md text-gray-200 lg:text-xl">
              Explore how donations have been used to create meaningful impact across different
              causes, communities, and individuals. Join us in making a difference.
            </p>

            <Link
              href="/support/donate"
              className="mt-8 inline-flex rounded-md bg-[#ff3138] px-5 py-3 cursor-pointer text-sm lg:text-lg font-semibold text-white transition hover:bg-[#ea2930]"
            >
              Apply for Support
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-16 pt-8 lg:px-8">

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
          <div className={`${showMobileFilters ? 'block' : 'hidden'} lg:block`}>
            <FilterSidebar
              selectedFilters={filters}
              onToggleFilter={toggleArrayFilter}
              onYearChange={handleYearChange}
              onCountryChange={handleCountryChange}
              onReset={handleResetFilters}
            />
          </div>

          <ImpactCards
            stories={filteredImpactStories}
            allStories={impactStories}
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
