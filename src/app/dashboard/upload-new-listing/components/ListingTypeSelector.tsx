'use client';

import { LISTING_TYPES } from '../data';

interface ListingTypeSelectorProps {
  onSelectType: (typeId: string) => void;
}

export default function ListingTypeSelector({ onSelectType }: ListingTypeSelectorProps) {
  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-neutral-gray-light bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-neutral-black mb-1">Upload New Listing</h2>
        <p className="text-sm text-neutral-gray-medium mb-6">Select the category that best describes what you'd like to list on AfriScience Hub.</p>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {LISTING_TYPES.map(type => (
            <button
              key={type.id}
              onClick={() => onSelectType(type.id)}
              className="group flex flex-col items-center gap-3 rounded-xl border-2 border-neutral-gray-light p-6 text-center transition-all hover:border-brand-red-600 hover:shadow-md focus:border-brand-red-600 focus:outline-none"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-red-50 group-hover:bg-brand-red-100 transition-colors">
                <type.icon className="h-7 w-7 text-brand-red-600" />
              </div>
              <div>
                <p className="font-bold text-neutral-black">{type.label}</p>
                <p className="text-xs text-neutral-gray-medium mt-1">{type.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
