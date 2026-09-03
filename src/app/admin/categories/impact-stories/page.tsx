'use client';

import { useMemo, useState } from 'react';
import { Search, SlidersHorizontal, BookOpen, Plus, Filter } from 'lucide-react';
import type { ImpactStory, ImpactProgram, ImpactStatus } from '@/app/data/impactData';
import { Button } from '@/app/components/ui/Button';
import AdminImpactFilters from './components/AdminImpactFilters';
import AdminImpactCard from './components/AdminImpactCard';
import PublishImpactModal from './components/PublishImpactModal';
import { getCardPrimaryTitle } from '@/app/data/impactData';

const DUMMY_STORIES: ImpactStory[] = [
  {
    id: 'impact-admin-1',
    program: 'Career Support',
    status: 'Active',
    idTag: 'ASH-CS-2024-001',
    image: 'https://images.unsplash.com/photo-1621062089461-01f1eaebb66c?auto=format&fit=crop&q=80&w=800',
    year: '2024',
    location: { stateRegion: 'Lagos', country: 'Nigeria' },
    summary: 'Graduate-led agritech startup scaling soil-testing kiosks across southwest Nigeria.',
    fundsUtilized: '$6,200',
    beneficiaries: 48,
    story: 'GreenRoot Diagnostics received Career Support funding to launch portable soil-testing kiosks serving smallholder farmers.',
    people: [{ name: 'Engr. Tunde Adeyemi', image: 'https://images.unsplash.com/photo-1537511446984-935f663eb1f4?auto=format&fit=crop&q=80&w=400', socials: {} }],
    timeline: [
      { title: 'Proposal & Verification', bullets: ['Application reviewed'] },
      { title: 'Funding & Setup', bullets: ['Workshop fit-out'] },
    ],
    mediaGallery: [{ label: 'Setup', items: [{ url: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=600', caption: 'Workshop setup' }] }],
    careerPath: 'AgriTech Entrepreneurship',
    companyName: 'GreenRoot Diagnostics Ltd',
    noOfOwners: 2,
  },
  {
    id: 'impact-admin-2',
    program: 'Research Support',
    status: 'Concluded',
    idTag: 'ASH-RS-2023-014',
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=800',
    year: '2023',
    location: { stateRegion: 'Nairobi', country: 'Kenya' },
    summary: 'Molecular study mapping antimalarial resistance markers in East Africa.',
    fundsUtilized: '$6,500',
    beneficiaries: 6,
    story: 'Research Support enabled laboratory sequencing and field sampling across three counties.',
    people: [{ name: 'Dr. Amara Okafor', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400', role: 'Principal Investigator', socials: {} }],
    timeline: [
      { title: 'Research Proposal & Verification', bullets: ['Ethics clearance secured'] },
      { title: 'Publication', bullets: ['Preprint released'] },
    ],
    mediaGallery: [],
    researchTitle: 'Genetic Markers of Antimalarial Resistance',
    researchLevel: 'Postgraduate',
    noOfResearchers: 3,
  },
  {
    id: 'impact-admin-3',
    program: 'Educational Scholarship',
    status: 'Active',
    idTag: 'ASH-ES-2025-003',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800',
    year: '2025',
    location: { stateRegion: 'Addis Ababa', country: 'Ethiopia' },
    summary: 'Undergraduate scholarship sustaining a high-performing engineering student.',
    fundsUtilized: '$500',
    beneficiaries: 1,
    story: 'Scholarship funding covered tuition and essential academic materials for the academic year.',
    people: [{ name: 'Ms. Hana Bekele', image: 'https://images.unsplash.com/photo-1621062089461-01f1eaebb66c?auto=format&fit=crop&q=80&w=400', socials: {} }],
    timeline: [
      { title: 'Scholarship Proposal & Verification', bullets: ['Eligibility verified'] },
      { title: 'Annual Clearance & Funding', bullets: ['Funds disbursed'] },
    ],
    mediaGallery: [],
    scholarshipLevel: 'Undergraduate',
    departmentName: 'Electrical Engineering',
    initialCgpa: '3.72',
  },
];

export default function ImpactStoriesPage() {
  const [stories, setStories] = useState<ImpactStory[]>(DUMMY_STORIES);
  const [search, setSearch] = useState('');
  const [selectedPrograms, setSelectedPrograms] = useState<ImpactProgram[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<ImpactStatus[]>([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({
    programs: false,
    status: false,
    year: true,
    country: true,
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<ImpactStory | null>(null);

  const activeFilterCount =
    selectedPrograms.length + selectedStatuses.length + (selectedCountry ? 1 : 0) + (selectedYear ? 1 : 0);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return stories.filter((s) => {
      const matchesSearch =
        !q ||
        [s.idTag, s.summary, s.location.country, s.location.stateRegion, getCardPrimaryTitle(s), s.status, s.program, s.year]
          .join(' ')
          .toLowerCase()
          .includes(q);
      const matchesProgram = selectedPrograms.length === 0 || selectedPrograms.includes(s.program);
      const matchesStatus = selectedStatuses.length === 0 || selectedStatuses.includes(s.status);
      const matchesCountry = !selectedCountry || s.location.country === selectedCountry;
      const matchesYear = !selectedYear || s.year === selectedYear;
      return matchesSearch && matchesProgram && matchesStatus && matchesCountry && matchesYear;
    });
  }, [stories, search, selectedPrograms, selectedStatuses, selectedCountry, selectedYear]);

  const handleSave = (story: ImpactStory) => {
    setStories((prev) => {
      const exists = prev.some((s) => s.id === story.id);
      return exists ? prev.map((s) => (s.id === story.id ? story : s)) : [story, ...prev];
    });
  };

  const handleStatusChange = (id: string, status: ImpactStatus) =>
    setStories((prev) => prev.map((s) => (s.id === id ? { ...s, status } : s)));

  const handleDelete = (id: string) => setStories((prev) => prev.filter((s) => s.id !== id));

  const clearAll = () => {
    setSearch('');
    setSelectedPrograms([]);
    setSelectedStatuses([]);
    setSelectedCountry('');
    setSelectedYear('');
  };

  const activeCount = stories.filter((s) => s.status === 'Active').length;
  const concludedCount = stories.filter((s) => s.status === 'Concluded').length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-neutral-gray-medium mb-1">
            <span>Dashboard</span>
            <span>/</span>
            <span>Categories</span>
            <span>/</span>
            <span className="text-neutral-black font-medium">Impact Stories</span>
          </div>
          <h1 className="text-xl font-bold text-neutral-black flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-teal-600" />
            Impact Stories
          </h1>
          <p className="text-xs text-neutral-gray-dark mt-1">Manage impact stories and case studies.</p>
        </div>
        <button
          onClick={() => {
            setEditing(null);
            setModalOpen(true);
          }}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-brand-navy-900 text-white rounded-xl text-sm font-semibold hover:bg-brand-navy-800 cursor-pointer shrink-0"
        >
          <Plus className="h-4 w-4" /> Publish Story
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-xl border border-neutral-gray-light bg-white p-4 shadow-sm">
          <p className="text-xs text-neutral-gray-medium">Total Stories</p>
          <p className="text-2xl font-bold text-neutral-black mt-1">{stories.length}</p>
        </div>
        <div className="rounded-xl border border-neutral-gray-light bg-white p-4 shadow-sm">
          <p className="text-xs text-neutral-gray-medium">Active</p>
          <p className="text-2xl font-bold text-green-600 mt-1">{activeCount}</p>
        </div>
        <div className="rounded-xl border border-neutral-gray-light bg-white p-4 shadow-sm">
          <p className="text-xs text-neutral-gray-medium">Concluded</p>
          <p className="text-2xl font-bold text-neutral-gray-dark mt-1">{concludedCount}</p>
        </div>
      </div>

      <div className="lg:hidden">
        <Button variant="outline" className="w-full gap-2" onClick={() => setShowFilters((v) => !v)}>
          <SlidersHorizontal className="h-4 w-4" />
          {showFilters ? 'Hide Filters' : 'Show Filters'}
          {activeFilterCount > 0 && (
            <span className="ml-1 rounded-full bg-brand-red-600 text-white text-[10px] font-bold px-1.5 py-0.5">{activeFilterCount}</span>
          )}
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <AdminImpactFilters
          showFilters={showFilters}
          activeFilterCount={activeFilterCount}
          selectedPrograms={selectedPrograms}
          selectedStatuses={selectedStatuses}
          selectedCountry={selectedCountry}
          selectedYear={selectedYear}
          collapsedSections={collapsedSections}
          onToggleSection={(k) => setCollapsedSections((p) => ({ ...p, [k]: !p[k] }))}
          onToggleProgram={(p) => setSelectedPrograms((prev) => (prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]))}
          onToggleStatus={(s) => setSelectedStatuses((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]))}
          onCountryChange={setSelectedCountry}
          onYearChange={setSelectedYear}
          onClearAll={clearAll}
        />

        <main className="flex-1 min-w-0">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-gray-medium" />
            <input
              type="text"
              placeholder="Search by program, title, country, year..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-neutral-gray-light bg-white text-sm focus:ring-2 focus:ring-brand-navy-900 focus:border-brand-navy-900 outline-none"
            />
          </div>

          <div className="flex items-center justify-between mb-4">
            <p className="text-xs text-neutral-gray-medium">
              Showing <span className="font-bold text-neutral-black">{filtered.length}</span> {filtered.length === 1 ? 'story' : 'stories'}
            </p>
            {activeFilterCount > 0 && (
              <button onClick={clearAll} className="text-xs font-medium text-brand-red-600 hover:underline cursor-pointer">
                Clear filters
              </button>
            )}
          </div>

          {filtered.length > 0 ? (
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {filtered.map((story) => (
                <AdminImpactCard
                  key={story.id}
                  story={story}
                  onView={() => {
                    setEditing(story);
                    setModalOpen(true);
                  }}
                  onEdit={(s) => {
                    setEditing(s);
                    setModalOpen(true);
                  }}
                  onStatusChange={handleStatusChange}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 rounded-xl border border-dashed border-neutral-gray-light bg-white">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-neutral-bg-light mb-3">
                <Filter className="h-6 w-6 text-neutral-gray-medium" />
              </div>
              <h3 className="font-bold text-neutral-black">No stories found</h3>
              <p className="text-xs text-neutral-gray-medium mt-1">Try adjusting filters or search</p>
              {activeFilterCount > 0 && (
                <Button variant="outline" size="sm" className="mt-3" onClick={clearAll}>
                  Clear All Filters
                </Button>
              )}
            </div>
          )}
        </main>
      </div>

      <PublishImpactModal open={modalOpen} onClose={() => setModalOpen(false)} onSave={handleSave} initial={editing} />
    </div>
  );
}
