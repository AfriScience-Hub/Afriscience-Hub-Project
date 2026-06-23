'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Star, MapPin, Microscope } from 'lucide-react';
import { SPECIALIST_CENTERS } from '@/app/data/mockData';
import { Button } from '@/app/components/ui/Button';

export function HomeSpecialistCentersSection() {
  return (
    <section className="container mx-auto px-4 md:px-6 lg:px-8 py-16">
      <div className="mb-8 flex flex-col md:flex-row items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-neutral-black flex items-center gap-2">
            <Microscope className="h-6 w-6 text-brand-red-600" />
            Specialist Centers
          </h2>
          <p className="text-slate-500">Discover specialized hubs for advanced research and services.</p>
        </div>
        <Link href="/specialist-centers" className="flex items-center gap-1 text-brand-red-600 hover:underline">
          View All <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {SPECIALIST_CENTERS.slice(0, 3).map((center) => (
          <div key={center.id} className="overflow-hidden rounded-xl bg-white shadow-sm border border-neutral-gray-light hover:shadow-md transition-shadow">
            <div className="h-48 bg-slate-200 relative">
              <Image src={center.image} alt={center.name} fill className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute top-4 right-4 bg-white/90 px-2 py-1 rounded text-xs font-semibold text-neutral-black">{center.field}</div>
            </div>
            <div className="p-6">
              <div className="mb-2 flex items-start justify-between">
                <h3 className="font-bold text-lg text-neutral-black line-clamp-1">{center.name}</h3>
                <div className="flex items-center gap-1 text-amber-500 text-sm">
                  <Star className="h-4 w-4 fill-current" />
                  <span>{center.rating}</span>
                </div>
              </div>
              <p className="mb-3 text-sm text-slate-500 flex items-center gap-1">
                <MapPin className="h-3 w-3" /> {center.location}
              </p>
              <p className="mb-4 text-sm text-slate-500 line-clamp-2">{center.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {center.services.slice(0, 3).map((s, i) => (
                  <span key={i} className="text-xs bg-neutral-bg-light text-slate-600 px-2 py-1 rounded">{s}</span>
                ))}
              </div>
              <Link href={`/specialist-centers/${center.id}`}>
                <Button variant="outline" className="w-full">View Center</Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
