'use client';

import { FileText } from 'lucide-react';
import { Button } from '@/app/components/ui/Button';
import { LISTING_TYPES } from '../data';

interface ListingTypeSelectorProps {
  onSelectType: (typeId: string) => void;
  onViewDrafts?: () => void;
}

export default function ListingTypeSelector({ onSelectType, onViewDrafts }: ListingTypeSelectorProps) {
  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-neutral-gray-light bg-white p-6 shadow-sm">
        <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-neutral-black mb-1">Upload New Listing</h2>
            <p className="text-sm text-neutral-gray-medium">
              Select the category that best describes what you&apos;d like to list on AfriScience Hub.
            </p>
          </div>
          {onViewDrafts && (
            <Button variant="outline" onClick={onViewDrafts} className="gap-2 border-2 border-red-600 shadow-sm text-red-600 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-600">
              <FileText className="h-4 w-4" /> View Drafts
            </Button>
          )}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {LISTING_TYPES.map(type => (
            <button
              key={type.id}
              onClick={() => onSelectType(type.id)}
              className="group flex cursor-pointer flex-col items-center gap-3 rounded-xl border-2 border-neutral-gray-light p-6 text-center transition-all hover:border-brand-red-600 hover:shadow-md focus:border-brand-red-600 focus:outline-none"
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
