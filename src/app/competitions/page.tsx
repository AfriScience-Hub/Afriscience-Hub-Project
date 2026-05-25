'use client';

import { useMemo, useState } from 'react';
import { SlidersHorizontal, Trophy } from 'lucide-react';
import Header from '../components/header';
import SearchModal from '../components/search';
import Footer from '../components/footer';
import FilterSidebar from './components/filterSidebar';
import CompetitionCards, { type CompetitionItem } from './components/conpetitionCards';

interface CompetitionFilters {
  types: string[];
  categories: string[];
  country: string;
}

const competitionData: CompetitionItem[] = [
  {
    id: 1,
    name: 'Afri - Memes: Campus Science Edition',
    type: 'Afri – Memes',
    category: 'Undergraduates',
    country: 'Egypt',
    description:
      'Create a science-themed meme that is both hilarious and educational. Use humor to make complex scientific ideas simple.',
    registrationFee: '$5',
    deadline: '15 Jun 2026',
    participants: 210,
    image: 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 2,
    name: 'Afri - MySpace: Lab & Study Setup Showcase',
    type: 'Afri – MySpace',
    category: 'General (18+)',
    country: 'Ghana',
    description:
      'Showcase your personal science workspace, lab setup, or study corner. Let the world see where African science happens.',
    registrationFee: '$5',
    deadline: '15 Aug 2026',
    participants: 180,
    image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 3,
    name: 'Afri - Presentations: Undergraduate Research Showcase',
    type: 'Afri – Presentations',
    category: 'Undergraduates',
    country: 'Kenya',
    description:
      'Present a research-backed solution to a pressing African challenge. Demonstrate integrated knowledge across multiple fields.',
    registrationFee: '$5',
    deadline: '15 Jul 2026',
    participants: 85,
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 4,
    name: 'Afri - Presentations: Postgraduate Innovation Forum',
    type: 'Afri – Presentations',
    category: 'Postgraduates',
    country: 'Kenya',
    description:
      'Present a research-backed solution to a pressing African challenge. Demonstrate advanced innovation and applied impact.',
    registrationFee: '$5',
    deadline: '31 Aug 2026',
    participants: 62,
    image: 'https://images.unsplash.com/photo-1521295121783-8a321d551ad2?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 5,
    name: 'Afri - Anime: Malaria Fighters',
    type: 'Afri – Anime',
    category: 'Senior Secondary',
    country: 'Nigeria',
    description:
      'Explain a scientific concept or principle of your choice as an animated story. Slightly off animation visuals, sound and creativity all count.',
    registrationFee: '$5',
    deadline: '30 Jun 2026',
    participants: 120,
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 6,
    name: 'Afri - Anime: Junior Explorers',
    type: 'Afri – Anime',
    category: 'Junior Secondary',
    country: 'Nigeria',
    description:
      'Explain a scientific concept or principle of your choice as an animated story designed for curious young minds.',
    registrationFee: '$5',
    deadline: '31 Jul 2026',
    participants: 95,
    image: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 7,
    name: 'Afri - Memes: Science Humor Challenge',
    type: 'Afri – Memes',
    category: 'General (18+)',
    country: 'South Africa',
    description:
      'Create a science-themed meme that is both hilarious and educational. Use humor to make scientific ideas go viral.',
    registrationFee: '$5',
    deadline: '31 May 2026',
    participants: 300,
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 8,
    name: 'Afri - MySpace: Young Scientist Workspace',
    type: 'Afri – MySpace',
    category: 'Senior Secondary',
    country: 'South Africa',
    description:
      'Showcase your personal science workspace, lab setup, or study corner. Inspire other young scientists through your setup.',
    registrationFee: '$5',
    deadline: '15 Sept 2026',
    participants: 145,
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop',
  },
];

const defaultFilters: CompetitionFilters = {
  types: [],
  categories: [],
  country: '',
};

export default function CompetitionsPage() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [filters, setFilters] = useState<CompetitionFilters>(defaultFilters);

  const toggleArrayFilter = (
    key: 'types' | 'categories',
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
    }));
  };

  const handleResetFilters = () => {
    setFilters(defaultFilters);
    setSearchQuery('');
  };

  const filteredCompetitions = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return competitionData.filter((competition) => {
      const searchMatch =
        normalizedQuery.length === 0 ||
        [
          competition.name,
          competition.type,
          competition.category,
          competition.country,
          competition.description,
        ]
          .join(' ')
          .toLowerCase()
          .includes(normalizedQuery);

      const typeMatch =
        filters.types.length === 0 || filters.types.includes(competition.type);
      const categoryMatch =
        filters.categories.length === 0 || filters.categories.includes(competition.category);
      const countryMatch =
        !filters.country || competition.country === filters.country;

      return searchMatch && typeMatch && categoryMatch && countryMatch;
    });
  }, [filters, searchQuery]);

  const activeTags = [
    ...filters.types.map((value) => ({ group: 'types' as const, value, label: value })),
    ...filters.categories.map((value) => ({ group: 'categories' as const, value, label: value })),
    ...(filters.country ? [{ group: 'country' as const, value: filters.country, label: filters.country }] : []),
  ];

  const removeTag = (
    group: 'types' | 'categories' | 'country',
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
    <div className="min-h-screen bg-white">
      <Header onSearchOpen={() => setSearchOpen(true)} />

      <section className="mx-auto max-w-5xl px-4 pb-16 pt-24 lg:px-8">
        <div className="mb-10 max-w-5xl">
          <div className="flex items-center gap-4">
            <Trophy className="h-6 w-6 text-[#ff3b30]" />
            <h1 className="text-2xl lg:text-3xl font-bold tracking-tight text-[#0f1d33]">
              Competitions
            </h1>
          </div>
          <p className="mt-4 text-sm text-[#51637f] lg:text-md">
            Showcase your skills, creativity, and scientific knowledge. Join competitions across Africa and win prizes, recognition, and opportunities.
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

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[300px_1fr]">
          <div className={`${showMobileFilters ? 'block' : 'hidden'} lg:block`}>
            <FilterSidebar
              selectedFilters={filters}
              onToggleFilter={toggleArrayFilter}
              onCountryChange={handleCountryChange}
              onReset={handleResetFilters}
            />
          </div>

          <CompetitionCards
            competitions={filteredCompetitions}
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
