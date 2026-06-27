'use client';

import Image from 'next/image';
import { User, X, ImagePlus } from 'lucide-react';
import CollapsibleSection from './CollapsibleSection';

interface BasicProfileSectionProps {
  selectedType: string;
  name: string;
  setName: (v: string) => void;
  profileImage: string | null;
  setProfileImage: (v: string | null) => void;
  country: string;
  setCountry: (v: string) => void;
  stateRegion: string;
  setStateRegion: (v: string) => void;
  bio: string;
  setBio: (v: string) => void;
  instMotto: string;
  setInstMotto: (v: string) => void;
  handleProfileImageUpload: () => void;
  AFRICAN_COUNTRIES: string[];
}

export default function BasicProfileSection({
  selectedType, name, setName, profileImage, setProfileImage,
  country, setCountry, stateRegion, setStateRegion, bio, setBio,
  instMotto, setInstMotto, handleProfileImageUpload, AFRICAN_COUNTRIES
}: BasicProfileSectionProps) {
  return (
    <CollapsibleSection title="Basic Profile Information" icon={<User className="h-5 w-5 text-brand-red-600" />} badge="Required">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-neutral-black mb-2">Profile Image</label>
          <div className="flex items-center gap-4">
            {profileImage ? (
              <div className="relative">
                <Image src={profileImage} alt="Profile" width={80} height={80} className="rounded-xl object-cover border border-neutral-gray-light" />
                <button onClick={() => setProfileImage(null)} className="absolute -top-2 -right-2 h-5 w-5 cursor-pointer rounded-full bg-red-500 text-white flex items-center justify-center">
                  <X className="h-3 w-3" />
                </button>
              </div>
            ) : (
              <button
                onClick={handleProfileImageUpload}
                className="flex h-20 w-20 cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-neutral-gray-light hover:border-brand-red-400 transition-colors"
              >
                <ImagePlus className="h-6 w-6 text-neutral-gray-medium" />
              </button>
            )}
            <div className="text-xs text-neutral-gray-medium">
              <p>Upload a clear image (JPG, PNG)</p>
              <p>Recommended: 400×400px or larger</p>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-black mb-1">
            {selectedType === 'institute' ? 'Institute Name' :
              selectedType === 'scientist' ? 'Full Name' :
                selectedType === 'center' ? 'Center Name' :
                  selectedType === 'innovation' ? 'Innovation Name' :
                    selectedType === 'competition' ? 'Competition Name' : 'Award Name'} *
          </label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full rounded-lg border border-neutral-gray-light px-4 py-2.5 text-sm focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600"
            placeholder={`Enter ${selectedType} name`}
          />
        </div>

        {selectedType === 'institute' && (
          <div>
            <label className="block text-sm font-medium text-neutral-black mb-1">Motto</label>
            <input type="text" value={instMotto} onChange={e => setInstMotto(e.target.value)}
              className="w-full rounded-lg border border-neutral-gray-light px-4 py-2.5 text-sm focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600"
              placeholder="e.g. Knowledge for a Sustainable Future" />
          </div>
        )}

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-neutral-black mb-1">Country *</label>
            <select value={country} onChange={e => setCountry(e.target.value)}
              className="w-full cursor-pointer rounded-lg border border-neutral-gray-light px-4 py-2.5 text-sm focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600">
              <option value="">Select Country</option>
              {AFRICAN_COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-black mb-1">State / Region</label>
            <input type="text" value={stateRegion} onChange={e => setStateRegion(e.target.value)}
              className="w-full rounded-lg border border-neutral-gray-light px-4 py-2.5 text-sm focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600"
              placeholder="e.g. Lagos, Nairobi" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-black mb-1">Short Bio / Description</label>
          <textarea value={bio} onChange={e => setBio(e.target.value)} rows={3}
            className="w-full rounded-lg border border-neutral-gray-light px-4 py-2.5 text-sm focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600 resize-none"
            placeholder="Tell us about yourself or your organization..." />
          <p className="text-xs text-neutral-gray-medium mt-1">{bio.length}/500 characters</p>
        </div>
      </div>
    </CollapsibleSection>
  );
}
