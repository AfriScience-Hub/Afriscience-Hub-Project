'use client';

import { useMemo, useState } from 'react';
import { CheckSquare, SlidersHorizontal } from 'lucide-react';
import Header from '../components/header';
import SearchModal from '../components/search';
import Footer from '../components/footer';
import FilterSidebar from './components/filterSidebar';
import VotingCards, { type ContestantItem } from './components/votingCards';

interface VotingFilters {
  type: string[];
  competition: string[];
  category: string[];
  year: string;
  country: string;
}

const contestants: ContestantItem[] = [
  {
    id: 1,
    slug: 'vf-1',
    name: 'Adaeze Nwosu',
    type: 'Afri – Anime',
    competition: 'Afri – Anime',
    category: 'Senior Secondary',
    year: '2026',
    country: 'Nigeria',
    votes: 1245,
    position: '1st',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 2,
    slug: 'vf-2',
    name: 'Kwame Asante',
    type: 'Afri – Anime',
    competition: 'Afri – Anime',
    category: 'Senior Secondary',
    year: '2026',
    country: 'Ghana',
    votes: 1102,
    position: '2nd',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 3,
    slug: 'vf-3',
    name: 'Fatima El-Amin',
    type: 'Afri – Presentations',
    competition: 'Afri – Presentations',
    category: 'Undergraduates',
    year: '2026',
    country: 'Kenya',
    votes: 1580,
    position: '1st',
    image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 4,
    slug: 'vf-4',
    name: 'Samuel Okonkwo',
    type: 'Afri – Presentations',
    competition: 'Afri – Presentations',
    category: 'Undergraduates',
    year: '2026',
    country: 'Nigeria',
    votes: 1340,
    position: '2nd',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 5,
    slug: 'vf-5',
    name: 'Zara Mbeki',
    type: 'Afri – Memes',
    competition: 'Afri – Memes',
    category: 'General (18+)',
    year: '2026',
    country: 'South Africa',
    votes: 2103,
    position: '1st',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 6,
    slug: 'vf-6',
    name: 'Amina Diallo',
    type: 'Afri – Memes',
    competition: 'Afri – Memes',
    category: 'General (18+)',
    year: '2026',
    country: 'Ghana',
    votes: 1870,
    position: '2nd',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 7,
    slug: 'vf-7',
    name: 'Thabo Mokoena',
    type: 'Afri – MySpace',
    competition: 'Afri – MySpace',
    category: 'General (18+)',
    year: '2026',
    country: 'South Africa',
    votes: 980,
    position: '1st',
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 8,
    slug: 'vf-8',
    name: 'Ngozi Eze',
    type: 'Afri – MySpace',
    competition: 'Afri – MySpace',
    category: 'Senior Secondary',
    year: '2026',
    country: 'Nigeria',
    votes: 875,
    position: '1st',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 9,
    slug: 'vf-9',
    name: 'Hassan Mwangi',
    type: 'Afri – Presentations',
    competition: 'Afri – Presentations',
    category: 'Postgraduates',
    year: '2026',
    country: 'Kenya',
    votes: 1420,
    position: '1st',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 10,
    slug: 'vf-10',
    name: 'Leila Ben Youssef',
    type: 'Afri – Memes',
    competition: 'Afri – Memes',
    category: 'Upper Primary',
    year: '2025',
    country: 'Egypt',
    votes: 760,
    position: '1st',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 11,
    slug: 'vf-11',
    name: 'Bongani Dube',
    type: 'Afri – Anime',
    competition: 'Afri – Anime',
    category: 'Junior Secondary',
    year: '2025',
    country: 'Zimbabwe',
    votes: 690,
    position: '2nd',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 12,
    slug: 'vf-12',
    name: 'Mariam Sule',
    type: 'Afri – MySpace',
    competition: 'Afri – MySpace',
    category: 'Undergraduates',
    year: '2025',
    country: 'Uganda',
    votes: 930,
    position: '2nd',
    image: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?q=80&w=1200&auto=format&fit=crop',
  },
];

const defaultFilters: VotingFilters = {
  type: [],
  competition: [],
  category: [],
  year: '',
  country: '',
};

export default function VotingPage() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [filters, setFilters] = useState<VotingFilters>(defaultFilters);

  const toggleArrayFilter = (
    key: 'type' | 'competition' | 'category',
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

  const filteredContestants = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return contestants.filter((contestant) => {
      const searchMatch =
        normalizedQuery.length === 0 ||
        [
          contestant.name,
          contestant.type,
          contestant.competition,
          contestant.category,
          contestant.country,
        ]
          .join(' ')
          .toLowerCase()
          .includes(normalizedQuery);

      const typeMatch =
        filters.type.length === 0 || filters.type.includes(contestant.type);
      const competitionMatch =
        filters.competition.length === 0 ||
        filters.competition.includes(contestant.competition);
      const categoryMatch =
        filters.category.length === 0 || filters.category.includes(contestant.category);
      const yearMatch = !filters.year || contestant.year === filters.year;
      const countryMatch = !filters.country || contestant.country === filters.country;

      return searchMatch && typeMatch && competitionMatch && categoryMatch && yearMatch && countryMatch;
    });
  }, [filters, searchQuery]);

  const activeTags = [
    ...filters.type.map((value) => ({ group: 'type' as const, value, label: value })),
    ...filters.competition.map((value) => ({ group: 'competition' as const, value, label: value })),
    ...filters.category.map((value) => ({ group: 'category' as const, value, label: value })),
    ...(filters.year ? [{ group: 'year' as const, value: filters.year, label: filters.year }] : []),
    ...(filters.country ? [{ group: 'country' as const, value: filters.country, label: filters.country }] : []),
  ];

  const removeTag = (
    group: 'type' | 'competition' | 'category' | 'year' | 'country',
    value?: string
  ) => {
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

      <section className="mx-auto max-w-6xl px-4 pb-16 pt-24 lg:px-8">
        <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-5xl">
            <div className="flex items-center gap-4">
              <CheckSquare className="h-6 w-6 text-[#ff3b30]" />
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-[#0f1d33] lg:text-3xl">
                  Voting
                </h1>
                <p className="text-md text-[#9aa7bc]">Top 10 Competition Finalists</p>
              </div>
            </div>
            <p className="mt-6 text-[#51637f] text-sm">
              Vote for your favorite finalists! Each user gets <span className="font-bold text-[#304866]">one free vote</span> per category. Boost votes are available to show extra support. Positions update dynamically based on total votes.
            </p>
            <button
              type="button"
              onClick={() => setShowMobileFilters((current) => !current)}
              className="mt-6 inline-flex items-center gap-3 rounded-md border-2 border-[#9dafc7] bg-white px-3 py-2 text-sm font-semibold text-[#0f1d33] shadow-sm transition hover:bg-[#f8fbff] lg:hidden"
            >
              <SlidersHorizontal className="h-5 w-5" />
              {showMobileFilters ? 'Hide Filters' : 'Show Filters'}
            </button>
          </div>
        </div>

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

          <VotingCards
            contestants={filteredContestants}
            allContestants={contestants}
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
