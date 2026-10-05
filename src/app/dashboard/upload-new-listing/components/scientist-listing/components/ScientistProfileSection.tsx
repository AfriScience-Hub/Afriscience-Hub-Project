'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { X, ImagePlus, User } from 'lucide-react';
import CollapsibleSection from '../../CollapsibleSection';
import { WORLD_COUNTRIES } from '@/app/data/mockData';
import { STATES } from '@/app/specialist-centers/data';
import type { ScientistProfile } from '../types';

interface ScientistProfileSectionProps {
  profile: ScientistProfile;
  onChange: (patch: Partial<ScientistProfile>) => void;
}

function ImageUploader({ label, hint, value, onPick, onRemove }: {
  label: string;
  hint: string;
  value: string | null;
  onPick: (url: string) => void;
  onRemove: () => void;
}) {
  const ref = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => onPick(typeof reader.result === 'string' ? reader.result : '');
      reader.readAsDataURL(file);
    }
    e.target.value = '';
  };

  return (
    <div>
      <label className="block text-sm font-medium text-neutral-black mb-2">{label} <span className="text-red-500">*</span></label>
      <div className="flex items-center gap-4">
        {value ? (
          <div className="relative">
            <Image src={value} alt={label} width={80} height={80} className="h-20 w-20 rounded-xl border border-neutral-gray-light object-cover" />
            <button type="button" onClick={onRemove} className="absolute -top-2 -right-2 flex h-5 w-5 cursor-pointer items-center justify-center rounded-full bg-red-500 text-white">
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

export default function ScientistProfileSection({ profile, onChange }: ScientistProfileSectionProps) {
  const inputClass = 'w-full rounded-lg border border-neutral-gray-light px-4 py-2.5 text-sm focus:border-brand-red-600 focus:ring-1 focus:ring-brand-red-600';
  const wordCount = profile.bio.trim() ? profile.bio.trim().split(/\s+/).length : 0;

  return (
    <CollapsibleSection title="Basic Profile Information" icon={<User className="h-5 w-5 text-brand-red-600" />} badge="Required">
      <div className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <ImageUploader
            label="Profile Image"
            hint="Upload a facial image of the scientist/technologist"
            value={profile.profileImage}
            onPick={(url) => onChange({ profileImage: url })}
            onRemove={() => onChange({ profileImage: null })}
          />
          <ImageUploader
            label="Background Image"
            hint="Upload a wide background image"
            value={profile.backgroundImage}
            onPick={(url) => onChange({ backgroundImage: url })}
            onRemove={() => onChange({ backgroundImage: null })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-black mb-1">Name <span className="text-red-500">*</span></label>
          <input type="text" value={profile.name} onChange={(e) => onChange({ name: e.target.value })} className={inputClass} placeholder="Enter full name" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-neutral-black mb-1">Country <span className="text-red-500">*</span></label>
            <select value={profile.country} onChange={(e) => onChange({ country: e.target.value })} className={`${inputClass} cursor-pointer`}>
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
              className={inputClass}
              placeholder="Select or enter state/region"
            />
            <datalist id="scientist-state-region-options">
              {(STATES[profile.country] || []).map(s => <option key={s} value={s} />)}
            </datalist>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-black mb-1">
            Short Bio / Description <span className="text-red-500">*</span>
          </label>
          <textarea
            value={profile.bio}
            onChange={(e) => onChange({ bio: e.target.value })}
            rows={5}
            className={`${inputClass} resize-none`}
            placeholder="Tell us more about yourself, qualifications, skills, career, etc. (1000 words max)"
          />
          <p className={`mt-1 text-xs ${wordCount > 1000 ? 'text-red-500' : 'text-neutral-gray-medium'}`}>{wordCount}/1000 words</p>
        </div>
      </div>
    </CollapsibleSection>
  );
}
