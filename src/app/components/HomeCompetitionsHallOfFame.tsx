'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Trophy, Award, Calendar, Vote, ArrowRight } from 'lucide-react';
import { COMPETITIONS, AWARD_WINNERS } from '@/app/data/mockData';
import { Button } from '@/app/components/ui/Button';

export function HomeCompetitionsHallOfFame() {
  return (
    <section className="bg-neutral-bg-light py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <div className="mb-6 flex flex-col md:flex-row items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-neutral-black flex items-center gap-2">
                  <Trophy className="h-6 w-6 text-brand-red-600" />
                  Ongoing Competitions
                </h2>
                <p className="text-slate-500 text-sm mt-1">Participate, Innovate, Win.</p>
              </div>
              <Link href="/competitions" className="flex items-center gap-1 text-brand-red-600 hover:underline text-sm font-medium">
                View All <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="flex flex-col gap-4">
              {COMPETITIONS.slice(0, 4).map((comp) => (
                <div key={comp.id} className="flex items-start gap-4 rounded-xl bg-white p-2 md:p-4 shadow-sm border border-neutral-gray-light hover:shadow-md transition-all">
                  <div className="h-24 w-28 flex-shrink-0 overflow-hidden rounded-lg bg-slate-200 relative">
                    <Image src={comp.image} alt={comp.title} fill className="object-cover" sizes="112px" />
                  </div>
                  <div className="flex flex-1 flex-col min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="font-bold text-neutral-black text-sm leading-tight">{comp.title}</h3>
                      <span className="text-[10px] font-semibold text-brand-red-600 bg-brand-red-100 px-2 py-0.5 rounded-full whitespace-nowrap flex-shrink-0">
                        {comp.registrationFee}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 line-clamp-1 mb-2">{comp.description}</p>
                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                        <Calendar className="h-3 w-3" />
                        <span>Deadline: {new Date(comp.deadline).toLocaleDateString()}</span>
                      </div>
                      <Link href="/voting">
                        <Button size="sm" className="h-7 text-[11px] px-3 bg-green-600 hover:bg-green-700 gap-1">
                          <Vote className="h-3 w-3" />
                          Vote Now
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-6 flex flex-col md:flex-row items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-neutral-black flex items-center gap-2">
                  <Award className="h-6 w-6 text-amber-500" />
                  Hall of Fame
                </h2>
                <p className="text-slate-500 text-sm mt-1">Celebrating excellence in African Science.</p>
              </div>
              <Link href="/hall-of-fame" className="flex items-center gap-1 text-brand-red-600 hover:underline text-sm font-medium">
                View All <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="flex flex-col gap-4">
              {AWARD_WINNERS.slice(0, 4).map((winner) => (
                <div key={winner.id} className="flex items-center gap-4 rounded-xl bg-brand-navy-900 p-4 shadow-sm text-white relative overflow-hidden group hover:shadow-md transition-all">
                  <div className="h-14 w-14 flex-shrink-0 overflow-hidden rounded-full border-2 border-amber-500/50 relative z-10">
                    <Image src={winner.image} alt={winner.name} fill className="object-cover" sizes="56px" />
                  </div>
                  <div className="relative z-10 flex-1 min-w-0">
                    <h4 className="font-bold text-white truncate">{winner.name}</h4>
                    <p className="text-amber-400 text-xs font-semibold uppercase tracking-wide">{winner.type}</p>
                    <p className="text-slate-400 text-xs mt-0.5 truncate">{winner.country}</p>
                  </div>
                  <div className="ml-auto relative z-10 flex-shrink-0">
                    <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center">
                      <Award className="h-4 w-4 text-amber-500" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
