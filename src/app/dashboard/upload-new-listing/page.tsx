'use client';

import { useState } from 'react';
import type { ComponentType } from 'react';
import AfroInnovationListingForm from './components/afroInnovationListingForm';
import AwardListingForm from './components/awardListingForm';
import CenterListingForm from './components/centerListingForm';
import CompetitionListingForm from './components/competitionListingForm';
import InstituteListingForm from './components/instituteListingForm';
import { categories, type ListingType } from './components/listingTypes';
import ScientistListingForm from './components/scientistListingForm';

const listingForms: Record<ListingType, ComponentType<{ onChangeCategory: () => void }>> = {
  institute: InstituteListingForm,
  scientist: ScientistListingForm,
  center: CenterListingForm,
  innovation: AfroInnovationListingForm,
  competition: CompetitionListingForm,
  award: AwardListingForm,
};

export default function UploadNewListingPage() {
  const [selectedType, setSelectedType] = useState<ListingType | null>(null);

  if (selectedType) {
    const SelectedListingForm = listingForms[selectedType];

    return <SelectedListingForm onChangeCategory={() => setSelectedType(null)} />;
  }

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-8">
        <h1 className="text-xl font-bold text-gray-950 lg:text-2xl">Upload New Listing</h1>
        <p className="mt-0 text-xs text-gray-400 lg:mt-3 lg:text-base">
          Select the category that best describes what you&apos;d like to list on AfriScience Hub.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {categories.map((category) => {
          const Icon = category.icon;

          return (
            <button
              key={category.id}
              type="button"
              onClick={() => setSelectedType(category.id)}
              className="cursor-pointer rounded-2xl border-2 border-gray-200 bg-white p-5 text-center transition-colors hover:border-red-400 hover:bg-red-50"
            >
              <Icon size={30} className="mx-auto mb-8 text-red-500" strokeWidth={1.8} />
              <h2 className="text-md font-bold text-gray-950">{category.title}</h2>
              <p className="mx-auto mt-2 max-w-52 text-xs text-gray-400">{category.description}</p>
            </button>
          );
        })}
      </div>
    </section>
  );
}
