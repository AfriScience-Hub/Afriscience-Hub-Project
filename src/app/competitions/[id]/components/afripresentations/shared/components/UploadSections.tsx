'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { Camera, Upload, CreditCard, ChevronDown } from 'lucide-react';

interface ProfilePictureSectionProps {
  preview: string | null;
  fileName: string | null;
  onUpload: (file: File) => void;
}

export function ProfilePictureSection({ preview, fileName, onUpload }: ProfilePictureSectionProps) {
  const ref = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) return;
    onUpload(file);
  };

  return (
    <div className="border-t border-neutral-gray-light pt-6">
      <label className="flex items-center gap-1.5 text-xs text-neutral-gray-medium uppercase font-bold mb-3">
        <Camera className="h-3.5 w-3.5" /> Profile Picture
      </label>
      <p className="text-[10px] text-neutral-gray-medium mb-3">Upload the facial image of the contestant only</p>
      <div
        className="border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors border-neutral-gray-light hover:border-brand-red-300 hover:bg-brand-red-50/30"
        onClick={() => ref.current?.click()}
      >
        <input ref={ref} type="file" accept="image/*" onChange={handleChange} className="hidden" />
        {preview ? (
          <div className="flex flex-col items-center">
            <div className="relative h-24 w-24 rounded-full overflow-hidden mb-3">
              <Image src={preview} alt="Profile preview" fill className="object-cover" sizes="96px" />
            </div>
            <p className="font-bold text-green-800">{fileName}</p>
            <p className="text-xs text-neutral-gray-medium mt-1">Click to replace</p>
          </div>
        ) : (
          <div>
            <Camera className="h-10 w-10 text-neutral-gray-light mx-auto mb-2" />
            <p className="text-sm text-neutral-gray-dark">Upload the facial image of the contestant only</p>
            <p className="text-xs text-neutral-gray-medium mt-1">picture / image file formats only</p>
          </div>
        )}
      </div>
    </div>
  );
}

interface IdCardUploadSectionProps {
  label: string;
  description: string;
  preview: string | null;
  fileName: string | null;
  onUpload: (file: File) => void;
}

export function IdCardUploadSection({ label, description, preview, fileName, onUpload }: IdCardUploadSectionProps) {
  const ref = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) return;
    onUpload(file);
  };

  return (
    <div className="border-t border-neutral-gray-light pt-6">
      <label className="flex items-center gap-1.5 text-xs text-neutral-gray-medium uppercase font-bold mb-3">
        <CreditCard className="h-3.5 w-3.5" /> {label}
      </label>
      <p className="text-[10px] text-neutral-gray-medium mb-3">{description}</p>
      <div
        className="border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors border-neutral-gray-light hover:border-brand-red-300 hover:bg-brand-red-50/30"
        onClick={() => ref.current?.click()}
      >
        <input ref={ref} type="file" accept="image/*" onChange={handleChange} className="hidden" />
        {preview ? (
          <div className="flex flex-col items-center">
            <div className="relative h-28 w-48 rounded-lg overflow-hidden mb-3">
              <Image src={preview} alt="ID preview" fill className="object-cover" sizes="192px" />
            </div>
            <p className="font-bold text-green-800">{fileName}</p>
            <p className="text-xs text-neutral-gray-medium mt-1">Click to replace</p>
          </div>
        ) : (
          <div>
            <Upload className="h-8 w-8 text-neutral-gray-light mx-auto mb-2" />
            <p className="text-sm text-neutral-gray-dark leading-relaxed">
              To verify your identity, kindly upload a copy of the {description.toLowerCase()}. Uploaded documents are securely stored and protected from unauthorized access.
            </p>
            <p className="text-xs text-neutral-gray-medium mt-2">picture / image file formats only</p>
          </div>
        )}
      </div>
    </div>
  );
}

interface GuardianIdSectionProps {
  idType: string;
  otherIdType: string;
  preview: string | null;
  fileName: string | null;
  onIdTypeChange: (v: string) => void;
  onOtherIdTypeChange: (v: string) => void;
  onUpload: (file: File) => void;
}

const ID_CARD_TYPES = ['National ID Card', "Driver's Licence", 'International Passport', 'Other'];

export function GuardianIdSection({ idType, otherIdType, preview, fileName, onIdTypeChange, onOtherIdTypeChange, onUpload }: GuardianIdSectionProps) {
  const ref = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) return;
    onUpload(file);
  };

  return (
    <div className="border-t border-neutral-gray-light pt-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-4">
        <div>
          <label className="flex items-center gap-1.5 text-xs text-neutral-gray-medium uppercase font-bold mb-1.5">
            <CreditCard className="h-3.5 w-3.5" /> Parent/Guardian&apos;s ID Card
          </label>
          <div className="relative">
            <select
              value={idType}
              onChange={(e) => onIdTypeChange(e.target.value)}
              className="w-full rounded-lg border border-neutral-gray-light p-3 text-sm appearance-none bg-white focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600"
            >
              <option value="">Select ID card type</option>
              {ID_CARD_TYPES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-gray-medium pointer-events-none" />
          </div>
          {idType === 'Other' && (
            <input
              type="text"
              value={otherIdType}
              onChange={(e) => onOtherIdTypeChange(e.target.value)}
              placeholder="Specify ID card type..."
              className="w-full rounded-lg border border-neutral-gray-light p-3 text-sm mt-2 focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600"
            />
          )}
        </div>
      </div>
      <div
        className="border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors border-neutral-gray-light hover:border-brand-red-300 hover:bg-brand-red-50/30"
        onClick={() => ref.current?.click()}
      >
        <input ref={ref} type="file" accept="image/*" onChange={handleChange} className="hidden" />
        {preview ? (
          <div className="flex flex-col items-center">
            <div className="relative h-28 w-48 rounded-lg overflow-hidden mb-3">
              <Image src={preview} alt="Guardian ID preview" fill className="object-cover" sizes="192px" />
            </div>
            <p className="font-bold text-green-800">{fileName}</p>
            <p className="text-xs text-neutral-gray-medium mt-1">Click to replace</p>
          </div>
        ) : (
          <div>
            <Upload className="h-8 w-8 text-neutral-gray-light mx-auto mb-2" />
            <p className="text-sm text-neutral-gray-dark leading-relaxed">
              To verify your identity, kindly upload a copy of any valid government issued ID card of the parent or guardian (National ID card, Driver&apos;s license, Voter&apos;s card, International passport, etc.). Uploaded documents are securely stored and protected from unauthorized access.
            </p>
            <p className="text-xs text-neutral-gray-medium mt-2">picture / image file formats only</p>
          </div>
        )}
      </div>
    </div>
  );
}
