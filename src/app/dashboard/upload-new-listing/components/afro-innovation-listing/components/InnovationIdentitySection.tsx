'use client';

import { X, ImagePlus } from 'lucide-react';

interface InnovationIdentitySectionProps {
  name: string;
  setName: (v: string) => void;
  profileImage: string | null;
  setProfileImage: (v: string | null) => void;
  country: string;
  setCountry: (v: string) => void;
  bio: string;
  setBio: (v: string) => void;
  AFRICAN_COUNTRIES: string[];
}

export default function InnovationIdentitySection({
  name, setName, profileImage, setProfileImage,
  country, setCountry, bio, setBio, AFRICAN_COUNTRIES,
}: InnovationIdentitySectionProps) {
  const handleImageUpload = () => {
    setProfileImage('https://images.unsplash.com/photo-1670881391783-9c55ba592f93?auto=format&fit=crop&q=80&w=200');
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-neutral-black mb-2">Profile Image *</label>
        <div className="flex items-center gap-4">
          {profileImage ? (
            <div className="relative">
              <img src={profileImage} alt="Profile" className="h-20 w-20 rounded-xl object-cover border border-neutral-gray-light" />
              <button onClick={() => setProfileImage(null)} className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-red-500 text-white flex items-center justify-center">
                <X className="h-3 w-3" />
              </button>
            </div>
          ) : (
            <button
              onClick={handleImageUpload}
              className="flex h-20 w-20 items-center justify-center rounded-xl border-2 border-dashed border-neutral-gray-light hover:border-brand-red-400 transition-colors"
            >
              <ImagePlus className="h-6 w-6 text-neutral-gray-medium" />
            </button>
          )}
          <div className="text-xs text-neutral-gray-medium">
            <p>Upload a clear image</p>
            <p>Only picture format extensions are allowed</p>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-black mb-1">Innovation Name *</label>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          className="w-full rounded-lg border border-neutral-gray-light px-4 py-2.5 text-sm focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600"
          placeholder="Enter innovation's name"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-black mb-1">Country *</label>
        <select
          value={country}
          onChange={e => setCountry(e.target.value)}
          className="w-full rounded-lg border border-neutral-gray-light px-4 py-2.5 text-sm focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600"
        >
          <option value="">Select Country</option>
          {AFRICAN_COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <p className="text-xs text-neutral-gray-medium mt-1">1 selection max. Populate list of all African countries only.</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-black mb-1">ID Tag</label>
        <div className="rounded-lg border border-neutral-gray-light bg-neutral-bg-light px-4 py-2.5 text-sm text-neutral-gray-medium">
          <span className="text-neutral-black">AFI-{country ? country.substring(0, 2).toUpperCase() : 'XX'}-2024-XXXX</span>
          <p className="text-xs text-neutral-gray-medium mt-0.5">
            ID Tag number will automatically be displayed.
          </p>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-black mb-1">Short Bio / Description *</label>
        <textarea
          value={bio}
          onChange={e => setBio(e.target.value)}
          rows={3}
          className="w-full rounded-lg border border-neutral-gray-light px-4 py-2.5 text-sm focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600 resize-none"
          placeholder="Describe innovation in more details"
        />
        <p className="text-xs text-neutral-gray-medium mt-1">{bio.length}/500 words max.</p>
      </div>
    </div>
  );
}
