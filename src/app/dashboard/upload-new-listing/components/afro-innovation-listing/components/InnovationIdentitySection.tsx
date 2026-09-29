'use client';

import { useRef } from 'react';
import Image from 'next/image';
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
  const fileRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => setProfileImage(typeof reader.result === 'string' ? reader.result : null);
      reader.readAsDataURL(file);
    }
    e.target.value = '';
  };

  const handleRemoveImage = () => setProfileImage(null);

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-neutral-black mb-2">Profile Image <span className="text-red-500">*</span></label>
        <div className="flex items-center gap-4">
          {profileImage ? (
            <div className="relative">
              <Image src={profileImage} alt="Profile" width={80} height={80} className="rounded-xl object-cover border border-neutral-gray-light h-20 w-20" />
              <button onClick={handleRemoveImage} className="absolute -top-2 -right-2 h-5 w-5 cursor-pointer rounded-full bg-red-500 text-white flex items-center justify-center">
                <X className="h-3 w-3" />
              </button>
            </div>
          ) : (
            <>
              <input ref={fileRef} type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="flex h-20 w-20 cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-neutral-gray-light hover:border-brand-red-400 transition-colors"
              >
                <ImagePlus className="h-6 w-6 text-neutral-gray-medium" />
              </button>
            </>
          )}
          <div className="text-xs text-neutral-gray-medium">
            <p>Upload a clear image of the innovation</p>
            <p>Only picture format extensions are allowed</p>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-black mb-1">Innovation Name <span className="text-red-500">*</span></label>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          className="w-full rounded-lg border border-neutral-gray-light px-4 py-2.5 text-sm focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600"
          placeholder="Enter innovation's name"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-black mb-1">Country <span className="text-red-500">*</span></label>
        <select
          value={country}
          onChange={e => setCountry(e.target.value)}
          className="w-full cursor-pointer rounded-lg border border-neutral-gray-light px-4 py-2.5 text-sm focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600"
        >
          <option value="">Select Country</option>
          {AFRICAN_COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-black mb-1">Short Bio / Description <span className="text-red-500">*</span></label>
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
