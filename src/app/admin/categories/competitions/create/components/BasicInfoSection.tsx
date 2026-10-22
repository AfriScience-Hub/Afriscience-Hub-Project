'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import CollapsibleSection from './CollapsibleSection';
import ImageUploadField from './ImageUploadField';
import { CATEGORIES_BY_TYPE, COMPETITION_TYPES, COUNTRIES, GENERAL_CATEGORY, MEDIA_TYPE_OPTIONS, isCategoryLocked } from '../data';

export interface BasicInfoState {
  cover: File | null;
  /** Remote cover URL prefilled in edit/reuse mode (until replaced). */
  coverUrl: string | null;
  type: string;
  category: string;
  entryFee: string;
  /** Competition year, e.g. 2028 */
  year: string;
  country: string;
  mediaTypes: string[];
  /** Maximum number of media files a participant may submit. */
  maxFiles: string;
  /** Maximum size of a single uploaded media file, in MB. */
  maxFileSizeMB: string;
  /** Maximum video duration, in seconds. */
  maxVideoDurationSeconds: string;
  start: string;
  submissionDeadline: string;
  votingDeadline: string;
}

interface BasicInfoSectionProps {
  value: BasicInfoState;
  onChange: (patch: Partial<BasicInfoState>) => void;
}

const selectCls = 'w-full px-3 py-2 text-xs text-neutral-black rounded-lg border border-neutral-gray-light bg-white outline-none focus:border-[#453DD8] cursor-pointer';
const inputCls = 'w-full px-3 py-2 text-xs text-neutral-black rounded-lg border border-neutral-gray-light bg-white outline-none focus:border-[#453DD8]';

/**
 * Section 1 — Basic Information: cover image, type, category (locked to
 * General 18+ unless the type is Afri-Presentations), registration fee,
 * country, media types (multi-select) and the three date & time fields.
 */
export default function BasicInfoSection({ value, onChange }: BasicInfoSectionProps) {
  const locked = isCategoryLocked(value.type);
  const categoryOptions = value.type ? CATEGORIES_BY_TYPE[value.type] ?? [] : [];

  const handleTypeChange = (type: string) => {
    // Non-presentation types are always General (18+); switching type resets the category.
    onChange({ type, category: isCategoryLocked(type) ? GENERAL_CATEGORY : '' });
  };

  const toggleMedia = (option: string) =>
    onChange({
      mediaTypes: value.mediaTypes.includes(option)
        ? value.mediaTypes.filter((m) => m !== option)
        : [...value.mediaTypes, option],
    });

  return (
    <CollapsibleSection
      number={1}
      title="Basic Information"
      subtitle="Provide the key details for the competition."
    >
      <div className="space-y-4">
        <ImageUploadField
          label="Cover Image"
          hint="PNG, JPG or WebP (Max 5MB)"
          file={value.cover}
          initialUrl={value.coverUrl}
          onSelect={(f) => onChange({ cover: f })}
        />

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="comp-type" className="text-xs font-medium text-neutral-black block mb-1.5">Select Type <span className="text-brand-red-600">*</span></label>
            <select
              id="comp-type"
              value={value.type}
              onChange={(e) => handleTypeChange(e.target.value)}
              className={cn(selectCls, 'appearance-none')}
            >
              <option value="">Select competition type</option>
              {COMPETITION_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="comp-category" className="text-xs font-medium text-neutral-black block mb-1.5">Select Category <span className="text-brand-red-600">*</span></label>
            <select
              id="comp-category"
              value={value.category}
              disabled={locked}
              onChange={(e) => onChange({ category: e.target.value })}
              className={cn(selectCls, 'appearance-none', locked && 'bg-neutral-bg-light cursor-not-allowed')}
            >
              <option value="">{locked && value.type ? GENERAL_CATEGORY : 'Select categories'}</option>
              {categoryOptions.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          <div>
            <label htmlFor="comp-fee" className="text-xs font-medium text-neutral-black block mb-1.5">Registration Fee <span className="text-brand-red-600">*</span></label>
            <div className="flex gap-2">
              <span className="w-16 flex-shrink-0 px-3 py-2 text-xs text-neutral-black rounded-lg border border-neutral-gray-light bg-neutral-bg-light grid place-items-center font-semibold">
                USD
              </span>
              <input
                id="comp-fee"
                type="number"
                min={0}
                aria-label="Registration fee amount in USD"
                value={value.entryFee}
                onChange={(e) => onChange({ entryFee: e.target.value })}
                placeholder="0.00"
                className={inputCls}
              />
            </div>
          </div>
          <div>
            <label htmlFor="comp-year" className="text-xs font-medium text-neutral-black block mb-1.5">Year <span className="text-brand-red-600">*</span></label>
            <input
              id="comp-year"
              type="number"
              min={2000}
              max={2100}
              aria-label="Competition year"
              value={value.year}
              onChange={(e) => onChange({ year: e.target.value })}
              placeholder="e.g. 2028"
              className={inputCls}
            />
          </div>
          <div>
            <label htmlFor="comp-country" className="text-xs font-medium text-neutral-black block mb-1.5">Select Country <span className="text-brand-red-600">*</span></label>
            <select
              id="comp-country"
              value={value.country}
              onChange={(e) => onChange({ country: e.target.value })}
              className={cn(selectCls, 'appearance-none')}
            >
              <option value="">Select country</option>
              {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        <div>
          <p className="text-xs font-medium text-neutral-black mb-1.5">Media Type <span className="text-brand-red-600">*</span></p>
          <div className="flex flex-wrap gap-2">
            {MEDIA_TYPE_OPTIONS.map((option) => {
              const active = value.mediaTypes.includes(option);
              return (
                <label
                  key={option}
                  className={cn(
                    'flex items-center gap-1.5 px-3 py-2 rounded-lg border text-xs font-medium cursor-pointer transition-colors',
                    active ? 'border-[#453DD8] bg-[#453DD8]/5 text-neutral-black' : 'border-neutral-gray-light text-neutral-gray-dark hover:bg-neutral-bg-light'
                  )}
                >
                  <input
                    type="checkbox"
                    checked={active}
                    onChange={() => toggleMedia(option)}
                    className="accent-[#453DD8] cursor-pointer"
                  />
                  {option}
                </label>
              );
            })}
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          <div>
            <label htmlFor="media-max-files" className="text-xs font-medium text-neutral-black block mb-1.5">Max Files <span className="text-brand-red-600">*</span></label>
            <input
              id="media-max-files"
              type="number"
              min={1}
              aria-label="Maximum number of media files"
              value={value.maxFiles}
              onChange={(e) => onChange({ maxFiles: e.target.value })}
              placeholder="e.g. 3"
              className={inputCls}
            />
          </div>
          <div>
            <label htmlFor="media-max-size" className="text-xs font-medium text-neutral-black block mb-1.5">Max File Size (MB) <span className="text-brand-red-600">*</span></label>
            <input
              id="media-max-size"
              type="number"
              min={1}
              aria-label="Maximum media file size in megabytes"
              value={value.maxFileSizeMB}
              onChange={(e) => onChange({ maxFileSizeMB: e.target.value })}
              placeholder="e.g. 5"
              className={inputCls}
            />
          </div>
          {value.mediaTypes.includes('Video') && (
            <div>
              <label htmlFor="media-max-duration" className="text-xs font-medium text-neutral-black block mb-1.5">Max Video Duration (secs)</label>
              <input
                id="media-max-duration"
                type="number"
                min={1}
                aria-label="Maximum video duration in seconds"
                value={value.maxVideoDurationSeconds}
                onChange={(e) => onChange({ maxVideoDurationSeconds: e.target.value })}
                placeholder="e.g. 120"
                className={inputCls}
              />
            </div>
          )}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label htmlFor="dt-start" className="text-xs font-medium text-neutral-black block mb-1.5">Start Date &amp; Time <span className="text-brand-red-600">*</span></label>
            <input
              id="dt-start"
              type="datetime-local"
              value={value.start}
              onChange={(e) => onChange({ start: e.target.value })}
              className={inputCls}
            />
          </div>
          <div>
            <label htmlFor="dt-submission" className="text-xs font-medium text-neutral-black block mb-1.5">Submission Deadline <span className="text-brand-red-600">*</span></label>
            <input
              id="dt-submission"
              type="datetime-local"
              value={value.submissionDeadline}
              onChange={(e) => onChange({ submissionDeadline: e.target.value })}
              className={inputCls}
            />
          </div>
          <div>
            <label htmlFor="dt-voting" className="text-xs font-medium text-neutral-black block mb-1.5">Voting Deadline <span className="text-brand-red-600">*</span></label>
            <input
              id="dt-voting"
              type="datetime-local"
              value={value.votingDeadline}
              onChange={(e) => onChange({ votingDeadline: e.target.value })}
              className={inputCls}
            />
          </div>
        </div>
      </div>
    </CollapsibleSection>
  );
}
