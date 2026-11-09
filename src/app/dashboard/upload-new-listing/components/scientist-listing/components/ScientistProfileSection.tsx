'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { X, ImagePlus, User } from 'lucide-react';
import CollapsibleSection from '../../CollapsibleSection';
import { WORLD_COUNTRIES } from '@/app/data/mockData';
import { STATES } from '@/app/specialist-centers/data';
import { limitWords } from '../../../wordUtils';
import type { ScientistProfile } from '../types';

const MAX_BIO_WORDS = 1000;

interface ScientistProfileSectionProps {
  profile: ScientistProfile;
  onChange: (patch: Partial<ScientistProfile>) => void;
  /** Approved listings can only change the profile and background images. */
  approvedEditMode?: boolean;
}

function ImageUploader({ label, hint, value, onPick, onRemove }: {
  label: string;
  hint: string;
  value: string | null;
  onPick: (picked: { file: File; previewUrl: string }) => void;
  onRemove: () => void;
}) {
  const ref = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      // Keep the file local until the listing is saved or submitted.
      onPick({ file, previewUrl: URL.createObjectURL(file) });
    }
    e.target.value = '';
  };

  const handleRemove = () => {
    if (value?.startsWith('blob:')) URL.revokeObjectURL(value);
    onRemove();
  };

  return (
    <div>
      <label className="block text-sm font-medium text-neutral-black mb-2">{label} <span className="text-red-500">*</span></label>
      <div className="flex items-center gap-4">
        {value ? (
          <div className="relative">
            <Image src={value} alt={label} width={80} height={80} unoptimized={value.startsWith('blob:')} className="h-20 w-20 rounded-xl border border-neutral-gray-light object-cover" />
            <button type="button" onClick={handleRemove} className="absolute -top-2 -right-2 flex h-5 w-5 cursor-pointer items-center justify-center rounded-full bg-red-500 text-white">
              <X className="h-3 w-3" />
            </button>
          </div>
        ) : (
          <>
            <input ref={ref} type="file" accept="image/*" onChange={handleFile} className="hidden" />
            <button
              type="button"
              onClick={() => ref.current?.click()}
              className="flex h-20 w-20 cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-neutral-gray-light transition-colors hover:border-brand-red-400"
            >
              <ImagePlus className="h-6 w-6 text-neutral-gray-medium" />
            </button>
          </>
        )}
        <div className="text-xs text-neutral-gray-medium">
          <p>{hint}</p>
          <p>Only picture format extensions are allowed</p>
        </div>
      </div>
    </div>
  );
}

export default function ScientistProfileSection({ profile, onChange, approvedEditMode = false }: ScientistProfileSectionProps) {
  const inputClass = 'w-full rounded-lg border border-neutral-gray-light px-4 py-2.5 text-sm focus:border-brand-red-600 focus:ring-1 focus:ring-brand-red-600 disabled:cursor-not-allowed disabled:bg-neutral-bg-light disabled:text-neutral-gray-medium';
  const wordCount = profile.bio.trim() ? profile.bio.trim().split(/\s+/).length : 0;

  return (
    <CollapsibleSection title="Basic profile information" icon={<User className="h-5 w-5 text-brand-red-600" />} badge="Required">
      <div className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <ImageUploader
            label="Profile Image"
            hint="Upload a facial image of the scientist/technologist"
            value={profile.profileImage}
            onPick={({ file, previewUrl }) => onChange({ profileImage: previewUrl, profileImageFile: file })}
            onRemove={() => onChange({ profileImage: null, profileImageFile: null })}
          />
          <ImageUploader
            label="Background Image"
            hint="Upload a background image"
            value={profile.backgroundImage}
            onPick={({ file, previewUrl }) => onChange({ backgroundImage: previewUrl, backgroundImageFile: file })}
            onRemove={() => onChange({ backgroundImage: null, backgroundImageFile: null })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-black mb-1">Name <span className="text-red-500">*</span></label>
          <p className="mb-2 text-xs text-neutral-gray-medium">Enter the full name of the scientist/technologist</p>
          <input type="text" value={profile.name} onChange={(e) => onChange({ name: e.target.value })} className={inputClass} placeholder="Enter full name" disabled={approvedEditMode} />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-neutral-black mb-1">Country <span className="text-red-500">*</span></label>
            <select value={profile.country} onChange={(e) => onChange({ country: e.target.value, stateRegion: '' })} className={`${inputClass} cursor-pointer`} disabled={approvedEditMode}>
              <option value="">Select Country</option>
              {WORLD_COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-black mb-1">State / Region</label>
            <input
              type="text"
              list="scientist-state-region-options"
              value={profile.stateRegion}
              onChange={(e) => onChange({ stateRegion: e.target.value })}
              disabled={!profile.country || approvedEditMode}
              className={`${inputClass} disabled:cursor-not-allowed disabled:bg-neutral-bg-light disabled:text-neutral-gray-medium`}
              placeholder={profile.country ? 'Select or enter state/region' : 'Select a country first'}
            />
            <datalist id="scientist-state-region-options">
              {(STATES[profile.country] || []).map(s => <option key={s} value={s} />)}
            </datalist>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-black mb-1">
            Bio <span className="text-red-500">*</span>
          </label>
          <textarea
            value={profile.bio}
            onChange={(e) => onChange({ bio: limitWords(e.target.value, MAX_BIO_WORDS) })}
            rows={5}
            className={`${inputClass} resize-none`}
            placeholder="Tell us more about yourself, qualifications, skills, career, etc."
            disabled={approvedEditMode}
          />
          <p className={`mt-1 text-xs ${wordCount >= MAX_BIO_WORDS ? 'text-amber-600' : 'text-neutral-gray-medium'}`}>{wordCount}/{MAX_BIO_WORDS} words</p>
        </div>
      </div>
    </CollapsibleSection>
  );
}
