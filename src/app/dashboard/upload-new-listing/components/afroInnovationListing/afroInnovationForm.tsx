'use client';

import { Info, Lightbulb, Upload, X } from 'lucide-react';
import type { ListingFormProps } from '../listingTypes';
import {
  InnovationDetailsSection,
  InnovationIdentitySection,
  InventorInformationSection,
} from './sections';

export default function AfroInnovationForm({ onChangeCategory }: ListingFormProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center justify-between gap-4 rounded-lg border border-gray-200 bg-white px-4 py-4 shadow-sm lg:flex-row lg:gap-0">
        <div className="flex items-center gap-3">
          <Lightbulb size={20} className="text-red-500" />
          <div>
            <h1 className="text-base font-bold text-gray-950 lg:text-lg">
              New Afro-Innovation Listing
            </h1>
            <p className="text-[10px] text-gray-400 lg:text-xs">
              Fill in the details below. Fields marked * are required.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={onChangeCategory}
          className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50"
        >
          <X size={13} />
          Change Category
        </button>
      </div>

      <InnovationIdentitySection />
      <InnovationDetailsSection />
      <InventorInformationSection />

      <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
        <div className="mb-4 rounded-md border border-blue-200 bg-blue-50 px-4 py-3 text-[10px] text-blue-700 lg:text-xs">
          <Info size={14} className="mr-2 inline" />
          Your listing will be submitted for verification by the AfriScience Hub team. Once approved, it will be publicly visible with a Verified badge.
        </div>
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <button className="w-max cursor-pointer rounded-md border border-gray-200 px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50">
            Cancel
          </button>
          <div className="flex gap-3">
            <button className="cursor-pointer rounded-md border border-gray-200 px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50">
              Save as Draft
            </button>
            <button className="cursor-pointer rounded-md bg-[#082947] px-4 py-2 text-xs font-semibold text-white hover:bg-slate-900">
              <Upload size={13} className="mr-2 inline" />
              Submit for Verification
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
