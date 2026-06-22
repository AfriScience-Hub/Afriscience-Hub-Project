'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { Award, MapPin, Calendar, Gift, Search, Trophy, Medal } from 'lucide-react';
import { AWARD_WINNERS, AWARD_YEARS } from '@/app/data/mockData';
import { cn } from '@/lib/utils';
import { getTypeColor, getTypeIcon, getPositionStyle, getPositionLabel, usesMedal } from '@/app/awards/data';
import Link from 'next/link';

export default function DashboardAwards() {
  const [selectedYear, setSelectedYear] = useState<string>('2026');

  const userAwards = useMemo(() => {
    return AWARD_WINNERS.filter(a => !selectedYear || a.year.toString() === selectedYear);
  }, [selectedYear]);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Award className="h-6 w-6 text-amber-500" />
          <div>
            <h1 className="text-2xl font-bold text-neutral-black">Awards</h1>
            <p className="text-sm text-neutral-gray-medium">All awards received over the years</p>
          </div>
        </div>
        <select
          className="rounded-lg border border-neutral-gray-light text-sm p-2 bg-white focus:ring-1 focus:ring-brand-red-600"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          {AWARD_YEARS.map(y => <option key={y} value={y.toString()}>{y}</option>)}
        </select>
      </div>

      {userAwards.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Award className="h-16 w-16 text-slate-300 mb-4" />
          <h3 className="text-lg font-medium text-neutral-black">No awards found</h3>
          <p className="text-slate-500 max-w-sm mt-1">No awards were received in {selectedYear}.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {userAwards.map(award => {
          const TypeIcon = getTypeIcon(award.type);
          const isCompetition = award.type === 'Competitions Award';
          const isMedal = usesMedal(award.type);

          return (
            <Link key={award.id} href={`/awards/${award.id}`} className="flex items-center gap-4 p-4 rounded-xl border border-neutral-gray-light bg-white hover:shadow-md hover:border-amber-200 transition-all group">
              <div className="relative h-16 w-16 rounded-xl overflow-hidden flex-shrink-0">
                <Image src={award.image} alt={award.name} fill sizes="33vw" className="object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-neutral-black group-hover:text-brand-red-600 transition-colors">{award.name}</p>
                <div className="flex items-center gap-2 text-xs text-neutral-gray-medium mt-0.5">
                  <span className={cn("inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-bold", getTypeColor(award.type))}>
                    <TypeIcon className="h-2.5 w-2.5" />{award.type}
                  </span>
                  {isCompetition && award.position && (
                    <span className={cn("px-1.5 py-0.5 rounded text-[9px] font-bold", getPositionStyle(award.position))}>
                      {getPositionLabel(award.position)}
                    </span>
                  )}
                  <span className="flex items-center gap-0.5"><Calendar className="h-3 w-3" />{award.year}</span>
                  <span className="flex items-center gap-0.5"><MapPin className="h-3 w-3" />{award.country}</span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-amber-600">
                <Gift className="h-4 w-4" />
                <span className="text-[11px] font-bold">{award.rewards.length} reward{award.rewards.length > 1 ? 's' : ''}</span>
              </div>
              <div className="text-amber-500 opacity-0 group-hover:opacity-100 transition-opacity">
                {isMedal ? <Medal className="h-5 w-5" /> : <Trophy className="h-5 w-5" />}
              </div>
            </Link>
          );
          })}
        </div>
      )}
    </div>
  );
}
