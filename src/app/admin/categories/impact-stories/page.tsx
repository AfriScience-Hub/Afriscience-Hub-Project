'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { Search, BookOpen, Plus, Pencil, Trash2, Eye, ChevronDown } from 'lucide-react';
import TableActionMenu from '@/app/admin/components/TableActionMenu';
import type { ImpactStory, ImpactProgram, ImpactStatus } from '@/app/data/impactData';
import { IMPACT_PROGRAMS, IMPACT_STATUSES, IMPACT_COUNTRIES, IMPACT_YEARS, getCardPrimaryTitle } from '@/app/data/impactData';
import PublishImpactModal from './components/PublishImpactModal';
import { cn } from '@/lib/utils';

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
    timeline: [{ title: 'Proposal & Verification', bullets: ['Application reviewed'] }, { title: 'Funding & Setup', bullets: ['Workshop fit-out'] }],
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
    timeline: [{ title: 'Research Proposal & Verification', bullets: ['Ethics clearance secured'] }, { title: 'Publication', bullets: ['Preprint released'] }],
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
    timeline: [{ title: 'Scholarship Proposal & Verification', bullets: ['Eligibility verified'] }, { title: 'Annual Clearance & Funding', bullets: ['Funds disbursed'] }],
    mediaGallery: [],
    scholarshipLevel: 'Undergraduate',
    departmentName: 'Electrical Engineering',
    initialCgpa: '3.72',
  },
];

export default function ImpactStoriesPage() {
  const [stories, setStories] = useState<ImpactStory[]>(DUMMY_STORIES);
  const [search, setSearch] = useState('');
  const [selectedProgram, setSelectedProgram] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<ImpactStory | null>(null);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return stories.filter((s) => {
      const matchesSearch = !q || [s.idTag, s.summary, s.location.country, s.location.stateRegion, getCardPrimaryTitle(s), s.status, s.program, s.year].join(' ').toLowerCase().includes(q);
      const matchesProgram = !selectedProgram || s.program === selectedProgram;
      const matchesStatus = !selectedStatus || s.status === selectedStatus;
      const matchesCountry = !selectedCountry || s.location.country === selectedCountry;
      const matchesYear = !selectedYear || s.year === selectedYear;
      return matchesSearch && matchesProgram && matchesStatus && matchesCountry && matchesYear;
    });
  }, [stories, search, selectedProgram, selectedStatus, selectedCountry, selectedYear]);

  const handleSave = (story: ImpactStory) => {
    setStories((prev) => {
      const exists = prev.some((s) => s.id === story.id);
      return exists ? prev.map((s) => (s.id === story.id ? story : s)) : [story, ...prev];
    });
  };
  const handleStatusChange = (id: string, status: ImpactStatus) => setStories((prev) => prev.map((s) => (s.id === id ? { ...s, status } : s)));
  const handleDelete = (id: string) => setStories((prev) => prev.filter((s) => s.id !== id));
  const clearAll = () => { setSearch(''); setSelectedProgram(''); setSelectedStatus(''); setSelectedCountry(''); setSelectedYear(''); };

  const activeFilterCount = [selectedProgram, selectedStatus, selectedCountry, selectedYear].filter(Boolean).length;
  const activeCount = stories.filter((s) => s.status === 'Active').length;
  const concludedCount = stories.filter((s) => s.status === 'Concluded').length;

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-[11px] text-neutral-gray-medium mb-0.5">
            <span>Dashboard</span><span>/</span><span>Categories</span><span>/</span><span className="text-neutral-black font-medium">Impact Stories</span>
          </div>
          <h1 className="text-xl font-bold text-neutral-black flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-teal-600" /> Impact Stories
          </h1>
          <p className="text-xs text-neutral-gray-dark mt-0.5">Manage impact stories and case studies.</p>
        </div>
        <button onClick={() => { setEditing(null); setModalOpen(true); }} className="inline-flex items-center gap-2 px-4 py-2.5 bg-brand-navy-900 text-white rounded-xl text-sm font-semibold hover:bg-brand-navy-800 cursor-pointer shrink-0">
          <Plus className="h-4 w-4" /> Publish Story
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-xl border border-neutral-gray-light bg-white p-4 shadow-sm"><p className="text-xs text-neutral-gray-medium">Total Stories</p><p className="text-2xl font-bold text-neutral-black mt-1">{stories.length}</p></div>
        <div className="rounded-xl border border-neutral-gray-light bg-white p-4 shadow-sm"><p className="text-xs text-neutral-gray-medium">Active</p><p className="text-2xl font-bold text-green-600 mt-1">{activeCount}</p></div>
        <div className="rounded-xl border border-neutral-gray-light bg-white p-4 shadow-sm"><p className="text-xs text-neutral-gray-medium">Concluded</p><p className="text-2xl font-bold text-neutral-gray-dark mt-1">{concludedCount}</p></div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-gray-medium" />
          <input type="text" placeholder="Search by program, title, country, year..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2 rounded-xl border border-neutral-gray-light bg-white text-xs focus:ring-2 focus:ring-brand-navy-900 focus:border-brand-navy-900 outline-none" />
        </div>
        <div className="flex gap-2 flex-wrap">
          <Select value={selectedProgram} onChange={setSelectedProgram} options={IMPACT_PROGRAMS} placeholder="All Programs" />
          <Select value={selectedStatus} onChange={setSelectedStatus} options={IMPACT_STATUSES} placeholder="All Statuses" />
          <Select value={selectedCountry} onChange={setSelectedCountry} options={IMPACT_COUNTRIES} placeholder="All Countries" />
          <Select value={selectedYear} onChange={setSelectedYear} options={IMPACT_YEARS} placeholder="All Years" />
          {activeFilterCount > 0 && <button onClick={clearAll} className="text-xs font-medium text-brand-red-600 hover:underline px-2">Clear</button>}
        </div>
      </div>

      <div className="rounded-xl border border-neutral-gray-light bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-neutral-bg-light border-b border-neutral-gray-light text-[11px] text-neutral-gray-medium">
                <th className="text-left font-semibold px-3 py-2.5">Story</th>
                <th className="text-left font-semibold px-3 py-2.5">Program</th>
                <th className="text-left font-semibold px-3 py-2.5">Location</th>
                <th className="text-left font-semibold px-3 py-2.5">Year</th>
                <th className="text-left font-semibold px-3 py-2.5">Status</th>
                <th className="text-right font-semibold px-3 py-2.5">Funds</th>
                <th className="text-center font-semibold px-3 py-2.5">Beneficiaries</th>
                <th className="text-right font-semibold px-3 py-2.5">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s) => (
                <tr key={s.id} className="border-b border-neutral-gray-light last:border-0 hover:bg-neutral-bg-light/50">
                  <td className="px-3 py-2.5">
                    <div className="flex items-center gap-2.5">
                      <div className="relative h-9 w-12 rounded-lg overflow-hidden bg-neutral-bg-light flex-shrink-0">
                        <Image src={s.image} alt={getCardPrimaryTitle(s)} fill className="object-cover" sizes="48px" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-neutral-black text-xs truncate max-w-[180px]">{getCardPrimaryTitle(s)}</p>
                        <p className="text-[11px] text-neutral-gray-medium truncate">{s.idTag}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-2.5"><span className="px-2 py-1 rounded-full bg-brand-navy-900/10 text-brand-navy-900 text-[11px] font-medium whitespace-nowrap">{s.program}</span></td>
                  <td className="px-3 py-2.5 text-neutral-gray-dark whitespace-nowrap">{s.location.stateRegion}, {s.location.country}</td>
                  <td className="px-3 py-2.5 text-neutral-gray-dark">{s.year}</td>
                  <td className="px-3 py-2.5">
                    <span className={cn('px-2 py-0.5 rounded-full text-[11px] font-bold', s.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-neutral-bg-light text-neutral-gray-dark border border-neutral-gray-light')}>{s.status}</span>
                  </td>
                  <td className="px-3 py-2.5 text-right font-semibold text-neutral-black whitespace-nowrap">{s.fundsUtilized}</td>
                  <td className="px-3 py-2.5 text-center">{s.beneficiaries}</td>
                  <td className="px-3 py-2.5 text-right">
                    <div className="flex justify-end" onClick={(e) => e.stopPropagation()}>
                      <TableActionMenu
                        items={[
                          { label: 'View / Edit', icon: <Eye className="h-3.5 w-3.5" />, onClick: () => { setEditing(s); setModalOpen(true); } },
                          { label: `Mark as ${s.status === 'Active' ? 'Concluded' : 'Active'}`, icon: <Pencil className="h-3.5 w-3.5" />, onClick: () => handleStatusChange(s.id, s.status === 'Active' ? 'Concluded' : 'Active') },
                          { label: 'Delete', icon: <Trash2 className="h-3.5 w-3.5" />, onClick: () => handleDelete(s.id), danger: true },
                        ]}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && <div className="text-center py-12 text-sm text-neutral-gray-medium">No stories found. Try adjusting filters.</div>}
        <div className="px-4 py-3 border-t border-neutral-gray-light flex items-center justify-between text-xs text-neutral-gray-medium">
          <span>Showing {filtered.length} of {stories.length} stories</span>
        </div>
      </div>

      <PublishImpactModal open={modalOpen} onClose={() => setModalOpen(false)} onSave={handleSave} initial={editing} />
    </div>
  );
}

function Select({ value, onChange, options, placeholder }: { value: string; onChange: (v: string) => void; options: string[]; placeholder: string }) {
  return (
    <div className="relative">
      <select value={value} onChange={(e) => onChange(e.target.value)} className="appearance-none pl-3 pr-8 py-2 rounded-xl border border-neutral-gray-light bg-white text-xs text-neutral-gray-dark focus:ring-2 focus:ring-brand-navy-900 outline-none cursor-pointer">
        <option value="">{placeholder}</option>{options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
      <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-neutral-gray-medium pointer-events-none" />
    </div>
  );
}
