'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { X, Search, ArrowRight } from 'lucide-react';
import { Button } from './ui/Button';
import { SEARCH_CATEGORIES, filterSearchCategories } from './searchCategories';

interface SearchDirectoryProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchDirectory({ isOpen, onClose }: SearchDirectoryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  if (!isOpen) return null;

  const results = filterSearchCategories(searchQuery);

  const handleCategoryClick = (path: string) => {
    router.push(path);
    onClose();
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] bg-white/95 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex justify-end mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="rounded-full h-12 w-12 hover:bg-neutral-bg-light"
          >
            <X className="h-6 w-6 text-slate-500" />
            <span className="sr-only">Close</span>
          </Button>
        </div>

        <div className="max-w-5xl mx-auto mb-12 text-center">
          <h2 className="text-3xl font-bold text-neutral-black mb-6">
            Explore the Ecosystem
          </h2>
          <form onSubmit={handleSearchSubmit} className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search for institutes, scientists, technologists, specialists, innovations, sponsors, competitions, etc."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-14 pl-12 pr-4 rounded-full border border-neutral-gray-light bg-white shadow-lg text-sm sm:text-base placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-brand-red-600 transition-shadow"
              autoFocus
            />
          </form>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {results.map((category) => (
            <div
              key={category.id}
              className="group bg-white rounded-2xl border border-neutral-gray-light p-6 shadow-sm hover:shadow-md transition-all duration-200 hover:border-brand-red-600/20"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="h-12 w-12 rounded-xl bg-brand-red-100 flex items-center justify-center text-brand-red-600 group-hover:bg-brand-red-600 group-hover:text-white transition-colors">
                  <category.icon className="h-6 w-6" />
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-slate-400 group-hover:text-brand-red-600"
                  onClick={() => handleCategoryClick(category.path)}
                >
                  Explore <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </div>

              <h3
                className="text-xl font-bold text-neutral-black mb-2 cursor-pointer hover:text-brand-red-600"
                onClick={() => handleCategoryClick(category.path)}
              >
                {category.name}
              </h3>
              <p className="text-slate-500 text-sm mb-6 h-10">
                {category.description}
              </p>

              <div className="space-y-3">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Popular / Featured
                </div>
                <ul className="space-y-2">
                  {category.featured.map((item, index) => (
                    <li key={index} className="flex items-center text-sm text-slate-600">
                      <div className="h-1.5 w-1.5 rounded-full bg-brand-red-600/40 mr-2" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {results.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-500">
              No results for &ldquo;{searchQuery}&rdquo;. Try a different keyword.
            </p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => setSearchQuery('')}
            >
              Show all categories
            </Button>
          </div>
        )}

        <p className="text-center text-xs text-slate-400 mt-10">
          Searching across {SEARCH_CATEGORIES.length} ecosystem categories.
        </p>
      </div>
    </div>
  );
}
