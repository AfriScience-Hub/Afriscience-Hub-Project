'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { INNOVATIONS } from '@/app/data/mockData';
import { Button } from '@/app/components/ui/Button';

export function HomeInnovationsSection() {
  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-8 flex flex-col md:flex-row items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-neutral-black">Trending Innovations</h2>
          <p className="text-slate-500">Breakthrough solutions tackling African challenges.</p>
        </div>
        <Link href="/innovations" className="flex items-center gap-1 text-brand-red-600 hover:underline">
          View All <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {INNOVATIONS.slice(0, 3).map((item) => (
          <div key={item.id} className="group relative overflow-hidden rounded-xl bg-brand-navy-900">
            <div className="aspect-[4/3]">
              <img src={item.image} alt={item.name}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105 opacity-80 group-hover:opacity-60"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-brand-navy-900 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 p-6 w-full">
              <div className="flex items-center justify-between mb-2">
                <span className="text-brand-red-600 text-xs font-bold uppercase tracking-wider">{item.status}</span>
                <div className="flex gap-1">
                  {item.sdgs.slice(0, 1).map((sdg) => (
                    <span key={sdg} className="text-[10px] bg-white/20 text-white px-2 py-0.5 rounded-full backdrop-blur-sm">{sdg}</span>
                  ))}
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-1">{item.name}</h3>
              <p className="text-slate-300 text-sm mb-4 line-clamp-1">by {item.creator}</p>
              <Link href={`/innovations/${item.id}`}>
                <Button size="sm" className="w-full bg-white text-brand-navy-900 hover:bg-neutral-bg-light">Learn More</Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
