'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Star, MapPin } from 'lucide-react';
import { INSTITUTES } from '@/app/data/mockData';
import { Button } from '@/app/components/ui/Button';

export function HomeInstitutesSection() {
  return (
    <section className="bg-neutral-bg-light py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col md:flex-row items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-neutral-black">Top Rated Institutes</h2>
            <p className="text-slate-500">Discover verified educational centers of excellence.</p>
          </div>
          <Link href="/institutes" className="flex items-center gap-1 text-brand-red-600 hover:underline">
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {INSTITUTES.slice(0, 3).map((inst) => (
            <Link key={inst.id} href={`/institutes/${inst.id}`}
              className="overflow-hidden rounded-xl bg-white shadow-sm border border-neutral-gray-light hover:shadow-md transition-shadow block"
            >
              <div className="h-48 bg-slate-200 relative">
                <Image src={inst.image} alt={inst.name} fill className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute top-4 right-4 bg-white/90 px-2 py-1 rounded text-xs font-semibold text-neutral-black">{inst.type}</div>
              </div>
              <div className="p-6">
                <div className="mb-2 flex items-start justify-between">
                  <h3 className="font-bold text-lg text-neutral-black line-clamp-1">{inst.name}</h3>
                  <div className="flex items-center gap-1 text-amber-500 text-sm">
                    <Star className="h-4 w-4 fill-current" />
                    <span>{inst.rating}</span>
                  </div>
                </div>
                <p className="mb-3 text-sm text-slate-500 flex items-center gap-1">
                  <MapPin className="h-3 w-3" /> {inst.location}
                </p>
                <p className="mb-4 text-sm text-slate-500 line-clamp-2">{inst.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {inst.services.slice(0, 2).map((s, i) => (
                    <span key={i} className="text-xs bg-neutral-bg-light text-slate-600 px-2 py-1 rounded">{s}</span>
                  ))}
                </div>
                <Button variant="outline" className="w-full">View Profile</Button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
