'use client';

import { MapPin, Search } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { CompetitionCard } from './CompetitionCard';
import type { Competition } from '../data';

interface CompetitionGridProps {
  groupedByCountry: [string, Competition[]][];
  onPreview: (image: string) => void;
  onClear: () => void;
}

export function CompetitionGrid({ groupedByCountry, onPreview, onClear }: CompetitionGridProps) {
  if (groupedByCountry.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center rounded-xl border-2 border-dashed border-neutral-gray-light bg-white">
        <div className="h-16 w-16 rounded-full bg-slate-50 flex items-center justify-center mb-4">
          <Search className="h-8 w-8 text-slate-300" />
        </div>
        <h3 className="text-lg font-medium text-neutral-black">No competitions found</h3>
        <p className="text-slate-500 max-w-sm mt-1">Try adjusting your filters or search terms.</p>
        <Button variant="outline" className="mt-6" onClick={onClear}>Clear Filters</Button>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {groupedByCountry.map(([country, comps]) => (
        <div key={country}>
          <div className="flex items-center gap-3 mb-5 pb-2 border-b-2 border-brand-navy-900">
            <MapPin className="h-5 w-5 text-brand-red-600" />
            <h2 className="text-xl font-bold text-brand-navy-900">{country}</h2>
            <span className="text-xs text-neutral-gray-medium font-medium bg-neutral-bg-light px-2 py-0.5 rounded-full">{comps.length} competition{comps.length > 1 ? 's' : ''}</span>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {comps.map(comp => <CompetitionCard key={comp.id} comp={comp} onPreview={onPreview} />)}
          </div>
        </div>
      ))}
    </div>
  );
}
