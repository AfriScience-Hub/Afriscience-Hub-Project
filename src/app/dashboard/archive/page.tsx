'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { Archive, Search, ChevronDown, Trophy, MapPin, Vote, Eye } from 'lucide-react';
import { CONCLUDED_VOTING_FINALISTS, COMPETITION_TYPES } from '@/app/data/mockData';
import { Button } from '@/app/components/ui/Button';
import { cn } from '@/lib/utils';
import { getCompetitionColor, getPositionStyle, getPositionLabel } from '@/app/voting/data';

export default function ArchivePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCompetition, setSelectedCompetition] = useState<string>('all');
  const [expandedCompetition, setExpandedCompetition] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let items = CONCLUDED_VOTING_FINALISTS;
    if (selectedCompetition !== 'all') {
      items = items.filter(f => f.competition === selectedCompetition);
    }
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      items = items.filter(f =>
        f.name.toLowerCase().includes(term) ||
        f.competition.toLowerCase().includes(term) ||
        f.category.toLowerCase().includes(term) ||
        f.country.toLowerCase().includes(term)
      );
    }
    return items;
  }, [searchTerm, selectedCompetition]);

  const grouped = useMemo(() => {
    const groups: Record<string, typeof filtered> = {};
    filtered.forEach(f => {
      if (!groups[f.competition]) groups[f.competition] = [];
      groups[f.competition].push(f);
    });
    return groups;
  }, [filtered]);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Archive className="h-6 w-6 text-brand-red-600" />
          <div>
            <h1 className="text-2xl font-bold text-neutral-black">Archive</h1>
            <p className="text-sm text-neutral-gray-medium">Concluded voting activities</p>
          </div>
        </div>
      </div>

      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-gray-medium" />
          <input
            type="text"
            placeholder="Search archived finalists..."
            className="w-full rounded-lg border border-neutral-gray-light pl-10 pr-4 py-2 text-sm focus:border-brand-red-600 focus:outline-none focus:ring-1 focus:ring-brand-red-600"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          className="rounded-lg border border-neutral-gray-light text-sm p-2 bg-white focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600"
          value={selectedCompetition}
          onChange={(e) => setSelectedCompetition(e.target.value)}
        >
          <option value="all">All Competitions</option>
          {COMPETITION_TYPES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <div className="space-y-6">
        {Object.entries(grouped).map(([competition, finalists]) => (
          <div key={competition} className="rounded-xl border border-neutral-gray-light bg-white shadow-sm overflow-hidden">
            <button
              onClick={() => setExpandedCompetition(expandedCompetition === competition ? null : competition)}
              className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-brand-navy-900 to-brand-navy-800 text-white hover:brightness-110 transition-all"
            >
              <span className="font-bold">{competition}</span>
              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-300">{finalists.length} finalist{finalists.length !== 1 ? 's' : ''}</span>
                <ChevronDown className={cn("h-4 w-4 transition-transform", expandedCompetition === competition && "rotate-180")} />
              </div>
            </button>
            {expandedCompetition === competition && (
              <div className="divide-y divide-neutral-gray-light">
                {finalists.map(f => (
                  <div key={f.id} className="p-4 flex items-center gap-4 hover:bg-neutral-bg-light transition-colors">
                    <Image src={f.image} alt={f.name} width={56} height={56} className="rounded-xl object-cover flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-neutral-black">{f.name}</p>
                      <p className="text-xs text-neutral-gray-medium flex items-center gap-1 mt-0.5">
                        <MapPin className="h-3 w-3" />
                        {f.country}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className={cn(
                        "inline-flex items-center justify-center h-8 w-8 rounded-full text-xs font-bold shadow",
                        getPositionStyle(f.position)
                      )}>
                        {getPositionLabel(f.position)}
                      </span>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <span className="text-sm font-bold text-brand-red-600">{f.votes.toLocaleString()}</span>
                      <p className="text-[10px] text-neutral-gray-medium">votes</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
        {Object.keys(grouped).length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center rounded-xl border-2 border-dashed border-neutral-gray-light bg-white">
            <Archive className="h-12 w-12 text-slate-300 mb-3" />
            <h3 className="text-lg font-medium text-neutral-black">No archived activities</h3>
            <p className="text-slate-500 max-w-sm mt-1">Concluded voting activities will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
}
