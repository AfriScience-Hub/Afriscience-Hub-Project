'use client';

import { Search } from 'lucide-react';
import { MdApartment } from 'react-icons/md';

interface InstitutesHeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export default function InstitutesHeader({
  searchQuery,
  onSearchChange,
}: InstitutesHeaderProps) {
  return (
    <div className="sticky top-16 z-40 border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-3 md:px-8 lg:px-10">
        <div className="mb-5 flex flex-col gap-3 lg:gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex-1">
            <h1 className="text-lg font-semibold text-gray-900 md:text-2xl">
              Institutes Directory
            </h1>
            <p className="text-sm lg:text-md text-gray-500">
              Discover top educational centers across Africa
            </p>
          </div>

          <div className="flex-1 lg:max-w-md">
            <div className="relative text-black">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search schools, class, service, location..."
                value={searchQuery}
                onChange={(event) => onSearchChange(event.target.value)}
                className="w-full rounded-lg border border-gray-300 py-2.5 text-xs lg:text-md lg:py-3 pl-12 pr-4 shadow-sm outline-none transition focus:border-red-500 placeholder-gray-400"
              />
            </div>
          </div>
        </div>

        <div className="flex w-fit gap-1 rounded-lg bg-gray-100 p-1">
          <button className="flex cursor-pointer items-center gap-2 rounded-lg border border-white bg-white px-3 lg:px-5 py-2 text-xs lg:text-sm font-semibold text-red-500 shadow-sm">
            <MdApartment className="h-5 w-5" />
            Primary & Secondary
          </button>
        </div>
      </div>
    </div>
  );
}
