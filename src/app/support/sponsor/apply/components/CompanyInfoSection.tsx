'use client';

import { Upload, X } from 'lucide-react';
import { Input } from '../../../../components/ui/input';
import { INDUSTRIES } from '../data';

interface CompanyInfoSectionProps {
  companyName: string;
  onCompanyNameChange: (v: string) => void;
  companyMotto: string;
  onCompanyMottoChange: (v: string) => void;
  selectedIndustries: string[];
  onIndustryToggle: (industry: string) => void;
  maxIndustries: number;
  displayPicture: File | null;
  onDisplayPictureChange: (file: File | null) => void;
  companyDescription: string;
  onCompanyDescriptionChange: (v: string) => void;
}

export function CompanyInfoSection({
  companyName, onCompanyNameChange,
  companyMotto, onCompanyMottoChange,
  selectedIndustries, onIndustryToggle,
  maxIndustries,
  displayPicture, onDisplayPictureChange,
  companyDescription, onCompanyDescriptionChange,
}: CompanyInfoSectionProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-neutral-gray-light p-8">
      <h2 className="text-xl font-bold text-neutral-black mb-6">Company Information</h2>
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-neutral-gray-dark mb-1.5">Company Name *</label>
          <Input value={companyName} onChange={e => onCompanyNameChange(e.target.value)} placeholder="Enter your company's name" required />
        </div>
        <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-neutral-gray-dark mb-1.5">Company Motto *</label>
          <Input value={companyMotto} onChange={e => onCompanyMottoChange(e.target.value)} placeholder="Enter your company's motto or tagline" required />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-neutral-gray-dark mb-1.5">
            Industry * <span className="text-xs text-neutral-gray-medium font-normal">({selectedIndustries.length}/{maxIndustries} selected)</span>
          </label>
          <div className="border border-neutral-gray-light rounded-xl p-3 max-h-48 overflow-y-auto">
            <div className="grid gap-1 sm:grid-cols-2">
              {INDUSTRIES.map(ind => {
                const disabled = selectedIndustries.length >= maxIndustries && !selectedIndustries.includes(ind);
                return (
                  <label
                    key={ind}
                    className={`flex items-center gap-2 px-2 py-1.5 rounded text-sm cursor-pointer transition-colors ${
                      selectedIndustries.includes(ind)
                        ? 'bg-brand-red-50 text-brand-red-600 font-medium'
                        : disabled
                          ? 'text-neutral-gray-light cursor-not-allowed'
                          : 'text-neutral-gray-dark hover:bg-neutral-bg-light'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedIndustries.includes(ind)}
                      onChange={() => onIndustryToggle(ind)}
                      disabled={disabled}
                      className="rounded border-neutral-gray-light text-brand-red-600 focus:ring-brand-red-600"
                    />
                    <span>{ind}</span>
                  </label>
                );
              })}
            </div>
          </div>
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-neutral-gray-dark mb-1.5">Display Picture *</label>
          <div className="border-2 border-dashed border-neutral-gray-light rounded-xl p-6 text-center hover:border-brand-red-600 transition-colors">
            {displayPicture ? (
              <div className="flex items-center gap-2 justify-center">
                <img src={URL.createObjectURL(displayPicture)} alt="Preview" className="h-16 w-16 object-cover rounded-lg" />
                <span className="text-sm text-neutral-gray-dark truncate">{displayPicture.name}</span>
                <button type="button" onClick={() => onDisplayPictureChange(null)} className="cursor-pointer text-red-500"><X className="h-4 w-4" /></button>
              </div>
            ) : (
              <label className="cursor-pointer">
                <Upload className="h-8 w-8 text-neutral-gray-medium mx-auto mb-2" />
                <p className="text-xs text-neutral-gray-medium">Upload image of business, brand or organization</p>
                <input type="file" accept="image/*" className="hidden" onChange={e => e.target.files && onDisplayPictureChange(e.target.files[0])} />
              </label>
            )}
          </div>
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-neutral-gray-dark mb-1.5">Company Description *</label>
          <textarea
            value={companyDescription}
            onChange={e => onCompanyDescriptionChange(e.target.value)}
            rows={4}
            className="w-full rounded-xl border border-neutral-gray-light px-4 py-3 text-sm focus:border-brand-red-600 focus:outline-none focus:ring-1 focus:ring-brand-red-600"
            placeholder="Describe your company, brand or organization, and what it does."
            maxLength={1000}
            required
          />
          <p className="text-xs text-neutral-gray-medium text-right mt-1">{companyDescription.length}/1000 words max.</p>
        </div>
      </div>
    </div>
  );
}
