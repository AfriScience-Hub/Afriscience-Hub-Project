'use client';

import Image from 'next/image';
import Link from 'next/link';
import { CATEGORIES } from '@/app/data/mockData';

const categoryImages = [
  'https://images.unsplash.com/photo-1645559946960-c002b6e9d559?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
  'https://images.unsplash.com/photo-1614308457932-e16d85c5d053?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
  'https://images.unsplash.com/photo-1742436707388-2b6727520d5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
  'https://images.unsplash.com/photo-1770632067760-70ac2cb9ec3f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
  'https://images.unsplash.com/photo-1764874298962-ac0c84307fc0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
  'https://images.unsplash.com/photo-1540908489236-15aac66d9a53?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
  'https://images.unsplash.com/photo-1766722906733-609eebf3b63a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
];

export function HomeCategoriesGrid() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-neutral-black sm:text-3xl">Explore Categories</h2>
          <p className="text-slate-500 mt-2">Navigate the AfriScience Hub\u00ae ecosystem by category.</p>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {CATEGORIES.map((cat, index) => (
            <Link key={cat.id} href={cat.path}
              className="group flex flex-col overflow-hidden rounded-2xl border border-neutral-gray-light bg-white transition-all hover:shadow-lg hover:border-brand-red-600/50 hover:-translate-y-1"
            >
              <div className="relative h-32 bg-neutral-bg-light overflow-hidden">
                <Image src={categoryImages[index] || categoryImages[0]} alt={cat.name} fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy-900/80 via-brand-navy-900/40 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-14 w-14 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg transition-all group-hover:bg-brand-red-600 group-hover:scale-110">
                    <cat.icon className="h-7 w-7 text-brand-navy-900 transition-colors group-hover:text-white" />
                  </div>
                </div>
              </div>
              <div className="p-4 text-center bg-neutral-bg-light group-hover:bg-white transition-colors">
                <span className="text-sm font-bold text-neutral-black group-hover:text-brand-red-600 transition-colors leading-tight block">{cat.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
