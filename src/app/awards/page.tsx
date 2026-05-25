'use client';

import { useMemo, useState } from 'react';
import { Award, SlidersHorizontal } from 'lucide-react';
import Header from '../components/header';
import SearchModal from '../components/search';
import Footer from '../components/footer';
import FilterSidebar from './components/filterSidebar';
import AwardCards, { type AwardItem } from './components/awardCards';

interface AwardFilters {
  types: string[];
  category: string;
  level: string;
  year: string;
  country: string;
}

function buildAwardVisual(title: string, accent: string, secondary: string) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900" viewBox="0 0 1200 900">
      <defs>
        <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="${accent}" />
          <stop offset="100%" stop-color="${secondary}" />
        </linearGradient>
      </defs>
      <rect width="1200" height="900" rx="42" fill="url(#bg)" />
      <rect x="54" y="54" width="1092" height="792" rx="30" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.26)" />
      <text x="78" y="132" fill="white" font-family="Arial, Helvetica, sans-serif" font-size="42" font-weight="700">Afriscience Hub Awards</text>
      <text x="78" y="214" fill="white" font-family="Arial, Helvetica, sans-serif" font-size="78" font-weight="700">${title}</text>
      <text x="78" y="284" fill="rgba(255,255,255,0.86)" font-family="Arial, Helvetica, sans-serif" font-size="30">Recognition showcase for African science impact</text>
      <circle cx="972" cy="212" r="110" fill="rgba(255,255,255,0.18)" />
      <circle cx="1032" cy="302" r="56" fill="rgba(255,255,255,0.28)" />
      <rect x="78" y="628" width="382" height="146" rx="24" fill="rgba(15,29,51,0.24)" />
      <text x="110" y="686" fill="white" font-family="Arial, Helvetica, sans-serif" font-size="28" font-weight="700">Pan-African Recognition</text>
      <text x="110" y="732" fill="rgba(255,255,255,0.84)" font-family="Arial, Helvetica, sans-serif" font-size="24">Innovation, support, and scientific excellence</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

function buildCertificateVisual(title: string, recipient: string, accent: string) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900" viewBox="0 0 1200 900">
      <rect width="1200" height="900" fill="#f7f4ec" />
      <rect x="42" y="42" width="1116" height="816" rx="26" fill="#fffdf9" stroke="${accent}" stroke-width="8" />
      <rect x="72" y="72" width="1056" height="756" rx="18" fill="none" stroke="#d9c7a0" stroke-width="2" stroke-dasharray="14 10" />
      <text x="600" y="168" text-anchor="middle" fill="#7b5a22" font-family="Georgia, serif" font-size="34" font-weight="700">AFRISCIENCE HUB</text>
      <text x="600" y="252" text-anchor="middle" fill="#10233f" font-family="Georgia, serif" font-size="72" font-weight="700">Certificate of Award</text>
      <text x="600" y="336" text-anchor="middle" fill="#5d6b81" font-family="Arial, Helvetica, sans-serif" font-size="30">This is proudly presented to</text>
      <text x="600" y="430" text-anchor="middle" fill="#0f1d33" font-family="Georgia, serif" font-size="66" font-weight="700">${recipient}</text>
      <text x="600" y="508" text-anchor="middle" fill="#5d6b81" font-family="Arial, Helvetica, sans-serif" font-size="28">for outstanding contribution and excellence in</text>
      <text x="600" y="580" text-anchor="middle" fill="${accent}" font-family="Arial, Helvetica, sans-serif" font-size="42" font-weight="700">${title}</text>
      <line x1="210" y1="716" x2="468" y2="716" stroke="#9ca8b8" stroke-width="2" />
      <line x1="732" y1="716" x2="990" y2="716" stroke="#9ca8b8" stroke-width="2" />
      <text x="340" y="748" text-anchor="middle" fill="#5d6b81" font-family="Arial, Helvetica, sans-serif" font-size="24">Director</text>
      <text x="860" y="748" text-anchor="middle" fill="#5d6b81" font-family="Arial, Helvetica, sans-serif" font-size="24">Date: 2026</text>
      <circle cx="1030" cy="214" r="54" fill="${accent}" opacity="0.18" />
      <circle cx="1030" cy="214" r="34" fill="${accent}" opacity="0.34" />
    </svg>
  `;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

const defaultFilters: AwardFilters = {
  types: [],
  category: '',
  level: '',
  year: '',
  country: '',
};

const awardData: AwardItem[] = [
  {
    id: 1,
    name: 'Lead Platform Builder Award',
    recipient: 'Kofi Mensah',
    type: "Developer's Award",
    category: 'Afri - Presentations',
    level: 'Postgraduates',
    year: '2026',
    country: 'Ghana',
    description: 'Recognizes the lead engineer behind scalable product systems that power science communities.',
    image: buildAwardVisual('Lead Platform Builder', '#173c7d', '#ff7b54'),
    certificateImage: buildCertificateVisual('Lead Platform Builder Award', 'Kofi Mensah', '#173c7d'),
  },
  {
    id: 2,
    name: 'Mobile Experience Excellence Award',
    recipient: 'Adaeze Okonkwo',
    type: "Developer's Award",
    category: 'Afri - Anime',
    level: 'Undergraduates',
    year: '2026',
    country: 'Nigeria',
    description: 'Celebrates outstanding mobile-first product experience and polished delivery across the platform.',
    image: buildAwardVisual('Mobile Experience Excellence', '#0f8c6b', '#4bd0a0'),
    certificateImage: buildCertificateVisual('Mobile Experience Excellence Award', 'Adaeze Okonkwo', '#0f8c6b'),
  },
  {
    id: 3,
    name: 'STEM Access Partnership Award',
    recipient: 'Nuru Learning Trust',
    type: "Sponsorship Award",
    category: 'Afri - Presentations',
    level: 'Senior Secondary',
    year: '2026',
    country: 'Kenya',
    description: 'Honors sponsorship that opened high-impact learning opportunities for young scientists.',
    image: buildAwardVisual('STEM Access Partnership', '#7a2df1', '#ff6ea8'),
    certificateImage: buildCertificateVisual('STEM Access Partnership Award', 'Nuru Learning Trust', '#7a2df1'),
  },
  {
    id: 4,
    name: 'Community Impact Sponsor Award',
    recipient: 'Ubuntu Futures Fund',
    type: "Sponsorship Award",
    category: 'Afri - MySpace',
    level: 'General (18+)',
    year: '2026',
    country: 'South Africa',
    description: 'Recognizes a sponsor whose backing expanded community reach and meaningful science impact.',
    image: buildAwardVisual('Community Impact Sponsor', '#d94f30', '#ffbf5f'),
    certificateImage: buildCertificateVisual('Community Impact Sponsor Award', 'Ubuntu Futures Fund', '#d94f30'),
  },
  {
    id: 5,
    name: 'Afri Anime Gold Recognition',
    recipient: 'Mariam Bello',
    type: "Competition's Award",
    category: 'Afri - Anime',
    level: 'Senior Secondary',
    year: '2026',
    country: 'Nigeria',
    description: 'Awarded for the most compelling science storytelling through animation and creativity.',
    image: buildAwardVisual('Afri Anime Gold', '#ff6b35', '#f7c548'),
    certificateImage: buildCertificateVisual('Afri Anime Gold Recognition', 'Mariam Bello', '#ff6b35'),
  },
  {
    id: 6,
    name: 'Afri Presentations Research Prize',
    recipient: 'Fatima El-Amin',
    type: "Competition's Award",
    category: 'Afri - Presentations',
    level: 'Undergraduates',
    year: '2026',
    country: 'Kenya',
    description: 'Presented to the finalist with the most rigorous and practical research presentation.',
    image: buildAwardVisual('Afri Presentations Prize', '#0f4c81', '#48a9f8'),
    certificateImage: buildCertificateVisual('Afri Presentations Research Prize', 'Fatima El-Amin', '#0f4c81'),
  },
  {
    id: 7,
    name: 'Afri Memes Creative Signal Award',
    recipient: 'Zara Mbeki',
    type: "Competition's Award",
    category: 'Afri - Memes',
    level: 'General (18+)',
    year: '2026',
    country: 'South Africa',
    description: 'Recognizes bold science communication through humor, clarity, and cultural resonance.',
    image: buildAwardVisual('Afri Memes Creative Signal', '#7627cf', '#45c3ff'),
    certificateImage: buildCertificateVisual('Afri Memes Creative Signal Award', 'Zara Mbeki', '#7627cf'),
  },
  {
    id: 8,
    name: 'Afri MySpace Inspiration Award',
    recipient: 'Thabo Mokoena',
    type: "Competition's Award",
    category: 'Afri - MySpace',
    level: 'General (18+)',
    year: '2026',
    country: 'South Africa',
    description: 'Celebrates the most inspiring learning or lab setup shared by an African science creator.',
    image: buildAwardVisual('Afri MySpace Inspiration', '#1f7a5b', '#8ad66d'),
    certificateImage: buildCertificateVisual('Afri MySpace Inspiration Award', 'Thabo Mokoena', '#1f7a5b'),
  },
  {
    id: 9,
    name: 'Afri Presentations Future Scholar Award',
    recipient: 'Leila Ben Youssef',
    type: "Competition's Award",
    category: 'Afri - Presentations',
    level: 'Postgraduates',
    year: '2026',
    country: 'Egypt',
    description: 'Presented to an emerging researcher demonstrating depth, relevance, and delivery excellence.',
    image: buildAwardVisual('Future Scholar Award', '#153e90', '#7fbcff'),
    certificateImage: buildCertificateVisual('Afri Presentations Future Scholar Award', 'Leila Ben Youssef', '#153e90'),
  },
  {
    id: 10,
    name: 'Science Equity Donation Award',
    recipient: 'Mirembe Foundation',
    type: "Donation's Award",
    category: 'Afri - Memes',
    level: 'Lower Primary',
    year: '2026',
    country: 'Uganda',
    description: 'Recognizes donations that reduced participation barriers and widened inclusion across regions.',
    image: buildAwardVisual('Science Equity Donation', '#8f1d3f', '#f08ca4'),
    certificateImage: buildCertificateVisual('Science Equity Donation Award', 'Mirembe Foundation', '#8f1d3f'),
  },
  {
    id: 11,
    name: 'Equipment Support Donation Award',
    recipient: 'Atlas Lab Circle',
    type: "Donation's Award",
    category: 'Afri - Anime',
    level: 'Upper Primary',
    year: '2026',
    country: 'Rwanda',
    description: 'Honors donors who provided materials and equipment that directly strengthened science practice.',
    image: buildAwardVisual('Equipment Support Donation', '#70553a', '#d9ad6f'),
    certificateImage: buildCertificateVisual('Equipment Support Donation Award', 'Atlas Lab Circle', '#70553a'),
  },
  {
    id: 12,
    name: 'Regional Ecosystem Builder Award',
    recipient: 'Aisha Ben Salem',
    type: "Developer's Award",
    category: 'Afri - MySpace',
    level: 'Junior Secondary',
    year: '2026',
    country: 'Morocco',
    description: 'Celebrates the builder who strengthened platform connections between institutions and talent.',
    image: buildAwardVisual('Regional Ecosystem Builder', '#005f73', '#94d2bd'),
    certificateImage: buildCertificateVisual('Regional Ecosystem Builder Award', 'Aisha Ben Salem', '#005f73'),
  },
];

export default function AwardsPage() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [filters, setFilters] = useState<AwardFilters>(defaultFilters);

  const toggleTypeFilter = (value: string, checked: boolean) => {
    setFilters((current) => ({
      ...current,
      types: checked
        ? [...current.types, value]
        : current.types.filter((item) => item !== value),
    }));
  };

  const handleCategoryChange = (value: string) => {
    setFilters((current) => ({
      ...current,
      category: value,
      level: value ? current.level : '',
    }));
  };

  const handleLevelChange = (value: string) => {
    setFilters((current) => ({ ...current, level: value }));
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

  const filteredAwards = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return awardData.filter((award) => {
      const searchMatch =
        normalizedQuery.length === 0 ||
        [
          award.name,
          award.recipient,
          award.type,
          award.category,
          award.level,
          award.country,
          award.description,
        ]
          .join(' ')
          .toLowerCase()
          .includes(normalizedQuery);

      const typeMatch = filters.types.length === 0 || filters.types.includes(award.type);
      const categoryMatch = !filters.category || award.category === filters.category;
      const levelMatch = !filters.level || award.level === filters.level;
      const yearMatch = !filters.year || award.year === filters.year;
      const countryMatch = !filters.country || award.country === filters.country;

      return searchMatch && typeMatch && categoryMatch && levelMatch && yearMatch && countryMatch;
    });
  }, [filters, searchQuery]);

  const activeTags = [
    ...filters.types.map((value) => ({ group: 'types' as const, value, label: value })),
    ...(filters.category ? [{ group: 'category' as const, value: filters.category, label: filters.category }] : []),
    ...(filters.level ? [{ group: 'level' as const, value: filters.level, label: filters.level }] : []),
    ...(filters.year ? [{ group: 'year' as const, value: filters.year, label: filters.year }] : []),
    ...(filters.country ? [{ group: 'country' as const, value: filters.country, label: filters.country }] : []),
  ];

  const removeTag = (
    group: 'types' | 'category' | 'level' | 'year' | 'country',
    value?: string
  ) => {
    setFilters((current) => {
      if (group === 'types') {
        return {
          ...current,
          types: current.types.filter((item) => item !== value),
        };
      }

      if (group === 'category') {
        return {
          ...current,
          category: '',
          level: '',
        };
      }

      return {
        ...current,
        [group]: '',
      };
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Header onSearchOpen={() => setSearchOpen(true)} />

      <section className="mx-auto max-w-5xl px-4 pb-16 pt-24 lg:px-8">
        <div className="mb-10 max-w-5xl">
          <div className="flex items-center gap-4">
            <Award className="h-6 w-6 text-[#ff3b30]" />
            <h1 className="text-2xl font-bold tracking-tight text-[#0f1d33] lg:text-3xl">
              Awards
            </h1>
          </div>
          <p className="mt-4 text-sm text-[#51637f] lg:text-md">
            Explore recognitions across development, sponsorship, competitions, and donations.
            Each card highlights a winner, a showcase visual, and a certificate preview.
          </p>
          <button
            type="button"
            onClick={() => setShowMobileFilters((current) => !current)}
            className="mt-6 inline-flex items-center gap-3 rounded-lg border-2 border-[#9dafc7] bg-white px-3 py-2 text-sm font-semibold text-[#0f1d33] shadow-sm transition hover:bg-[#f8fbff] lg:hidden"
          >
            <SlidersHorizontal className="h-5 w-5" />
            {showMobileFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
          <div className={`${showMobileFilters ? 'block' : 'hidden'} lg:block`}>
            <FilterSidebar
              selectedFilters={filters}
              onToggleType={toggleTypeFilter}
              onCategoryChange={handleCategoryChange}
              onLevelChange={handleLevelChange}
              onYearChange={handleYearChange}
              onCountryChange={handleCountryChange}
              onReset={handleResetFilters}
            />
          </div>

          <AwardCards
            awards={filteredAwards}
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
