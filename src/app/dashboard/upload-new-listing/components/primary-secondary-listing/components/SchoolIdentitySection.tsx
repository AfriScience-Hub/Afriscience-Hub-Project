'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { X, ImagePlus } from 'lucide-react';
import { toast } from 'sonner';
import { uploadFile } from '@/lib/upload';
import { WORLD_COUNTRIES, STATES } from '../data';
import { SOCIAL_PLATFORMS } from '../data';
import type { SchoolIdentity } from '../types';

interface ImageUploaderProps {
  label: string;
  value: string | null;
  onPick: (url: string) => void;
  onRemove: () => void;
  hint: string;
  required?: boolean;
}

function ImageUploader({ label, value, onPick, onRemove, hint, required = false }: ImageUploaderProps) {
  const ref = useRef<HTMLInputElement>(null);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      try {
        const uploaded = await uploadFile(file);
        onPick(uploaded.url || uploaded.key);
      } catch {
        toast.error('Failed to upload image');
      }
    }
    e.target.value = '';
  };

  return (
    <div>
      <label className="block text-sm font-medium text-neutral-black mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
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
          <p>picture/image file formats</p>
        </div>
      </div>
    </div>
  );
}

interface SchoolIdentitySectionProps {
  identity: SchoolIdentity;
  onChange: (patch: Partial<SchoolIdentity>) => void;
}

export default function SchoolIdentitySection({ identity, onChange }: SchoolIdentitySectionProps) {
  const inputClass = 'w-full rounded-lg border border-neutral-gray-light px-4 py-2.5 text-sm focus:border-brand-red-600 focus:ring-1 focus:ring-brand-red-600';
  const wordCount = identity.description.trim() ? identity.description.trim().split(/\s+/).length : 0;

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <ImageUploader
          label="Profile image"
          value={identity.profileImage}
          onPick={(url) => onChange({ profileImage: url })}
          onRemove={() => onChange({ profileImage: null })}
          hint="Upload profile image"
          required
        />
        <ImageUploader
          label="Background image"
          value={identity.backgroundImage}
          onPick={(url) => onChange({ backgroundImage: url })}
          onRemove={() => onChange({ backgroundImage: null })}
          hint="Upload background image"
          required
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-neutral-black mb-1">School name <span className="text-red-500">*</span></label>
          <input type="text" value={identity.name} onChange={(e) => onChange({ name: e.target.value })} className={inputClass} placeholder="Enter the name of the school" />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-black mb-1">School motto</label>
          <input type="text" value={identity.motto} onChange={(e) => onChange({ motto: e.target.value })} className={inputClass} placeholder="Enter the school's motto or tagline" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-black mb-1">School address <span className="text-red-500">*</span></label>
        <input type="text" value={identity.address} onChange={(e) => onChange({ address: e.target.value })} className={inputClass} placeholder="Enter the address of the school" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-neutral-black mb-1">Country <span className="text-red-500">*</span></label>
          <select value={identity.country} onChange={(e) => onChange({ country: e.target.value })} className={`${inputClass} cursor-pointer`}>
            <option value="">Select country</option>
            {WORLD_COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-black mb-1">State / region</label>
          <input
            type="text"
            list="school-state-region-options"
            value={identity.stateRegion}
            onChange={(e) => onChange({ stateRegion: e.target.value })}
            className={inputClass}
            placeholder="Select or enter state/region"
          />
          <datalist id="school-state-region-options">
            {(STATES[identity.country] || []).map(s => <option key={s} value={s} />)}
          </datalist>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-neutral-black mb-1">Phone number <span className="text-red-500">*</span></label>
          <input type="tel" value={identity.phone} onChange={(e) => onChange({ phone: e.target.value })} className={inputClass} placeholder="+234 800 000 0000" />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-black mb-1">E-mail <span className="text-red-500">*</span></label>
          <input type="email" value={identity.email} onChange={(e) => onChange({ email: e.target.value })} className={inputClass} placeholder="info@example.com" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-black mb-1">Website</label>
        <input type="url" value={identity.website} onChange={(e) => onChange({ website: e.target.value })} className={inputClass} placeholder="https://www.example.com" />
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-black mb-2">
          Social handles <span className="text-red-500">*</span> <span className="text-[10px] font-normal text-neutral-gray-medium">(provide at least one)</span>
        </label>
        <div className="grid gap-3 sm:grid-cols-2">
          {SOCIAL_PLATFORMS.map(platform => (
            <div key={platform}>
              <label className="mb-1 block text-[11px] font-medium text-neutral-gray-medium">{platform}</label>
              <input
                type="text"
                value={identity.socials[platform]}
                onChange={(e) => onChange({ socials: { ...identity.socials, [platform]: e.target.value } })}
                className={inputClass}
                placeholder={`@your${platform.toLowerCase()}handle`}
              />
            </div>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-black mb-1">School description <span className="text-red-500">*</span></label>
        <textarea
          value={identity.description}
          onChange={(e) => onChange({ description: e.target.value })}
          rows={5}
          className={`${inputClass} resize-none`}
          placeholder="Give a detailed description of the school..."
        />
        <p className={`mt-1 text-xs ${wordCount > 1000 ? 'text-red-500' : 'text-neutral-gray-medium'}`}>{wordCount}/1000 words max.</p>
      </div>
    </div>
  );
}