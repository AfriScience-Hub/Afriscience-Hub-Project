'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, ArrowRight, X } from 'lucide-react';
import { Button } from '@/app/components/ui/Button';
import { SEARCH_CATEGORIES, filterSearchCategories } from '@/app/components/searchCategories';

interface SearchPageContentProps {
  initialQuery?: string;
}

export function SearchPageContent({ initialQuery = '' }: SearchPageContentProps) {
  const [query, setQuery] = useState(initialQuery);
  const results = filterSearchCategories(query);

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex justify-end -mb-6">
        <Link
          href="/"
          aria-label="Close search and return home"
          title="Close"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-neutral-gray-light bg-white text-slate-500 shadow-sm transition-colors hover:border-brand-red-600 hover:bg-brand-red-50 hover:text-brand-red-600"
        >
          <X className="h-5 w-5" />
        </Link>
      </div>

      <div className="max-w-5xl mx-auto mb-12 text-center">
        <h1 className="text-3xl font-bold text-neutral-black sm:text-4xl">Search the Ecosystem</h1>
        <p className="mt-3 text-slate-500">
          Search the entire AfriScience Hub&reg; database and browse results by category.
        </p>
        <div className="relative mt-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search for institutes, scientists, technologists, specialists, innovations, sponsors, competitions, etc."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full h-14 pl-12 pr-4 rounded-full border border-neutral-gray-light bg-white shadow-lg text-sm sm:text-base placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-brand-red-600 transition-shadow"
            autoFocus
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.map((category) => (
          <div
            key={category.id}
            className="group bg-white rounded-2xl border border-neutral-gray-light p-6 shadow-sm hover:shadow-md transition-all duration-200 hover:border-brand-red-600/20"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="h-12 w-12 rounded-xl bg-brand-red-100 flex items-center justify-center text-brand-red-600 group-hover:bg-brand-red-600 group-hover:text-white transition-colors">
                <category.icon className="h-6 w-6" />
              </div>
              <Link href={category.path}>
                <Button variant="ghost" size="sm" className="text-slate-400 group-hover:text-brand-red-600">
                  Explore <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </div>

            <Link href={category.path}>
              <h2 className="text-xl font-bold text-neutral-black mb-2 hover:text-brand-red-600 transition-colors">
                {category.name}
              </h2>
            </Link>
            <p className="text-slate-500 text-sm mb-6">{category.description}</p>

            {category.featured.length > 0 && (
              <div className="space-y-3">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Popular / Featured
                </div>
                <ul className="space-y-2">
                  {category.featured.map((item) => (
                    <li key={item} className="flex items-center text-sm text-slate-600">
                      <div className="h-1.5 w-1.5 rounded-full bg-brand-red-600/40 mr-2" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>

      {results.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-500">
            No results for &ldquo;{query}&rdquo;. Try a different keyword.
          </p>
          <Button variant="outline" className="mt-4" onClick={() => setQuery('')}>
            Show all categories
          </Button>
        </div>
      )}

      <p className="text-center text-xs text-slate-400 mt-10">
        Searching across {SEARCH_CATEGORIES.length} ecosystem categories.
      </p>
    </div>
  );
}
