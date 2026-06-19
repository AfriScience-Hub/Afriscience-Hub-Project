"use client"

import { useState, useMemo, useCallback, useEffect } from 'react';
import { Search } from 'lucide-react';
import {
  VOTING_FINALISTS,
  COMPETITION_TYPES,
  VOTING_YEARS
} from '../data/mockData';
import { Button } from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';
import { ShareVotingModal } from '../components/modals/ShareVotingModal';
import { BoostVotesModal } from '../components/modals/BoostVotesModal';
import { ViewWorkModal } from '../components/modals/ViewWorkModal';
import { getVoteCategoryKey, COMPETITION_CATEGORY_MAP } from './data';
import FilterSidebar from './components/FilterSidebar';
import VotingHeader from './components/VotingHeader';
import VotingBanner from './components/VotingBanner';
import FinalistCard from './components/FinalistCard';

export default function Voting() {
  const { isAuthenticated } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCompetition, setSelectedCompetition] = useState<string | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedYear, setSelectedYear] = useState<string>('2026');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({
    type: true,
    competition: false,
    category: false,
    year: false,
    country: true,
  });

  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [boostModalData, setBoostModalData] = useState<{
    contestantId: string;
    contestantName: string;
  } | null>(null);
  const [viewWorkModalData, setViewWorkModalData] = useState<any | null>(null);

  const [pageUrl, setPageUrl] = useState('');

  useEffect(() => {
    setPageUrl(window.location.href);
  }, []);

  const [votedCategories, setVotedCategories] = useState<Record<string, string>>(() => {
    try {
      const stored = localStorage.getItem('ash_votes');
      return stored ? JSON.parse(stored) : {};
    } catch { return {}; }
  });

  const [voteIncrements, setVoteIncrements] = useState<Record<string, number>>(() => {
    try {
      const stored = localStorage.getItem('ash_vote_increments');
      return stored ? JSON.parse(stored) : {};
    } catch { return {}; }
  });

  const toggleSection = (key: string) =>
    setCollapsedSections(prev => ({ ...prev, [key]: !prev[key] }));

  const filteredFinalists = useMemo(() => {
    return VOTING_FINALISTS.filter(f => {
      const term = searchTerm.toLowerCase();
      const matchesSearch =
        !term ||
        f.name.toLowerCase().includes(term) ||
        f.competition.toLowerCase().includes(term) ||
        f.country.toLowerCase().includes(term) ||
        f.year.toString().includes(term) ||
        f.category.toLowerCase().includes(term);
      const matchesCompetition = !selectedCompetition || f.competition === selectedCompetition;
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(f.category);
      const matchesYear = !selectedYear || f.year.toString() === selectedYear;
      const matchesCountry = !selectedCountry || f.country === selectedCountry;
      return matchesSearch && matchesCompetition && matchesCategory && matchesYear && matchesCountry;
    });
  }, [searchTerm, selectedCompetition, selectedCategories, selectedYear, selectedCountry]);

  const finalistsWithLiveStats = useMemo(() => {
    const groups: Record<string, typeof filteredFinalists> = {};
    filteredFinalists.forEach(f => {
      const key = getVoteCategoryKey(f.competition, f.category);
      if (!groups[key]) groups[key] = [];
      groups[key].push(f);
    });

    const result: Array<typeof VOTING_FINALISTS[0] & { liveVotes: number; livePosition: number }> = [];

    Object.values(groups).forEach(group => {
      const withVotes = group.map(f => ({
        ...f,
        liveVotes: f.votes + (voteIncrements[f.id] || 0),
        livePosition: 0
      }));
      withVotes.sort((a, b) => b.liveVotes - a.liveVotes);
      const top10 = withVotes.slice(0, 10);
      top10.forEach((f, idx) => { f.livePosition = idx + 1; });
      result.push(...top10);
    });

    return result;
  }, [filteredFinalists, voteIncrements]);

  const resetFilters = () => {
    setSelectedCompetition(null);
    setSelectedCategories([]);
    setSelectedYear('2026');
    setSelectedCountry('');
  };

  const activeFilterCount = (selectedCompetition ? 1 : 0) + selectedCategories.length + (selectedCountry ? 1 : 0);

  const handleVote = useCallback((finalist: typeof VOTING_FINALISTS[0]) => {
    if (!isAuthenticated) {
      toast.error('Please log in to vote.');
      return;
    }

    const catKey = getVoteCategoryKey(finalist.competition, finalist.category);

    if (votedCategories[catKey]) {
      toast.error(`You have already voted in ${finalist.competition} \u2013 ${finalist.category}. Votes cannot be reversed.`);
      return;
    }

    const newVotedCategories = { ...votedCategories, [catKey]: finalist.id };
    const newVoteIncrements = { ...voteIncrements, [finalist.id]: (voteIncrements[finalist.id] || 0) + 1 };

    setVotedCategories(newVotedCategories);
    setVoteIncrements(newVoteIncrements);

    localStorage.setItem('ash_votes', JSON.stringify(newVotedCategories));
    localStorage.setItem('ash_vote_increments', JSON.stringify(newVoteIncrements));

    toast.success(`Your vote for ${finalist.name} has been cast! This cannot be reversed.`);
  }, [isAuthenticated, votedCategories, voteIncrements]);

  const hasVotedForCategory = (competition: string, category: string) =>
    !!votedCategories[getVoteCategoryKey(competition, category)];

  const votedForFinalist = (finalistId: string) =>
    Object.values(votedCategories).includes(finalistId);

  const handleBoostSuccess = (contestantId: string, votesAdded: number) => {
    const newVoteIncrements = { ...voteIncrements, [contestantId]: (voteIncrements[contestantId] || 0) + votesAdded };
    setVoteIncrements(newVoteIncrements);
    localStorage.setItem('ash_vote_increments', JSON.stringify(newVoteIncrements));
  };

  return (
    <div className="min-h-screen bg-neutral-bg-light py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        <VotingHeader
          activeFilterCount={activeFilterCount}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          onShare={() => setShareModalOpen(true)}
        />

        <div className="flex flex-col lg:flex-row gap-8">

          <FilterSidebar
            searchTerm={searchTerm}
            selectedCompetition={selectedCompetition}
            selectedCategories={selectedCategories}
            selectedYear={selectedYear}
            selectedCountry={selectedCountry}
            availableCategories={[]}
            hostCountries={[]}
            activeFilterCount={activeFilterCount}
            showFilters={showFilters}
            collapsedSections={collapsedSections}
            setSelectedCompetition={setSelectedCompetition}
            setSelectedCategories={setSelectedCategories}
            setSelectedYear={setSelectedYear}
            setSelectedCountry={setSelectedCountry}
            toggleSection={toggleSection}
            resetFilters={resetFilters}
          />

          <div className="flex-1">
            <div className="mb-6 relative">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-gray-medium" />
              <input
                type="text"
                placeholder="Search finalist by name, competition, year, country or keyword"
                className="w-full rounded-xl border border-neutral-gray-light pl-12 pr-4 py-3 shadow-sm focus:border-brand-red-600 focus:outline-none focus:ring-1 focus:ring-brand-red-600 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <VotingBanner />

            <div className="mb-4 flex items-center justify-between text-sm text-slate-500">
              <span>Showing <strong>{finalistsWithLiveStats.length}</strong> top finalists</span>
              <span className="text-xs text-neutral-gray-medium">
                {Object.keys(votedCategories).length} vote{Object.keys(votedCategories).length !== 1 ? 's' : ''} cast
              </span>
            </div>

            {finalistsWithLiveStats.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {finalistsWithLiveStats.map(finalist => (
                  <FinalistCard
                    key={finalist.id}
                    finalist={finalist}
                    isMyVote={votedForFinalist(finalist.id)}
                    alreadyVotedThisCategory={hasVotedForCategory(finalist.competition, finalist.category)}
                    onVote={() => handleVote(finalist)}
                    onViewWork={() => setViewWorkModalData({ ...finalist, liveVotes: finalist.liveVotes })}
                    onBoost={(id, name) => setBoostModalData({ contestantId: id, contestantName: name })}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center rounded-xl border-2 border-dashed border-neutral-gray-light bg-white">
                <div className="h-16 w-16 rounded-full bg-slate-50 flex items-center justify-center mb-4">
                  <Search className="h-8 w-8 text-slate-300" />
                </div>
                <h3 className="text-lg font-medium text-neutral-black">No finalists found</h3>
                <p className="text-slate-500 max-w-sm mt-1">Try adjusting your filters or search terms.</p>
                <Button variant="outline" className="mt-6" onClick={() => { setSearchTerm(''); resetFilters(); }}>
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <ShareVotingModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        contestants={finalistsWithLiveStats.map(f => ({
          id: f.id,
          name: f.name,
          country: f.country,
          image: f.image,
          competition: f.competition,
          category: f.category
        }))}
        pageUrl={pageUrl}
      />

      {boostModalData && (
        <BoostVotesModal
          isOpen={true}
          onClose={() => setBoostModalData(null)}
          contestantId={boostModalData.contestantId}
          contestantName={boostModalData.contestantName}
          onBoostSuccess={handleBoostSuccess}
        />
      )}

      {viewWorkModalData && (
        <ViewWorkModal
          isOpen={true}
          onClose={() => setViewWorkModalData(null)}
          contestant={viewWorkModalData}
          liveVotes={viewWorkModalData.liveVotes}
        />
      )}
    </div>
  );
}
