'use client';

import { Plus, Trash2 } from 'lucide-react';

export interface SocialHandle {
  name: string;
  link: string;
}

interface InnovatorInfoSectionProps {
  socialHandles: SocialHandle[];
  setSocialHandles: (
    v: SocialHandle[] | ((prev: SocialHandle[]) => SocialHandle[])
  ) => void;
  agreed: boolean;
  setAgreed: (v: boolean) => void;
}

export default function InnovatorInfoSection({
  socialHandles, setSocialHandles, agreed, setAgreed,
}: InnovatorInfoSectionProps) {
  const updateHandle = (index: number, field: keyof SocialHandle, value: string) => {
    setSocialHandles(prev => prev.map((h, i) => (i === index ? { ...h, [field]: value } : h)));
  };

  const addHandle = () => setSocialHandles(prev => [...prev, { name: '', link: '' }]);

  const removeHandle = (index: number) =>
    setSocialHandles(prev => (prev.length > 1 ? prev.filter((_, i) => i !== index) : prev));

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-neutral-black mb-1">
          Social Media Handles <span className="text-red-500">*</span>{' '}
          <span className="text-[10px] text-neutral-gray-medium font-normal">(provide at least one)</span>
        </label>

        <div className="space-y-3">
          {socialHandles.map((handle, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="text"
                value={handle.name}
                onChange={e => updateHandle(index, 'name', e.target.value)}
                className="w-[40%] rounded-lg border border-neutral-gray-light px-3 py-2 text-sm focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600"
                placeholder="Social media name (e.g. X)"
              />
              <input
                type="url"
                value={handle.link}
                onChange={e => updateHandle(index, 'link', e.target.value)}
                className="flex-1 min-w-0 rounded-lg border border-neutral-gray-light px-3 py-2 text-sm focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600"
                placeholder="https://..."
              />
              {socialHandles.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeHandle(index)}
                  aria-label="Remove social media handle"
                  className="shrink-0 rounded-lg border border-neutral-gray-light p-2 text-neutral-gray-medium transition hover:border-red-300 hover:text-red-500"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={addHandle}
          className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-brand-red-600 px-3 py-1.5 text-xs font-medium text-brand-red-600 transition hover:bg-brand-red-50"
        >
          <Plus className="h-4 w-4" /> Add Social Media
        </button>
      </div>

      <div className="flex items-start gap-3 p-4 rounded-lg border border-neutral-gray-light bg-neutral-bg-light">
        <input type="checkbox" id="confirm-agreement" checked={agreed} onChange={e => setAgreed(e.target.checked)}
          className="mt-0.5 h-4 w-4 rounded accent-brand-red-600" />
        <label htmlFor="confirm-agreement" className="text-xs text-neutral-gray-dark leading-relaxed cursor-pointer">
          I confirm that every information provided is accurate, that all uploaded documents are valid and that I accept the terms and conditions of this service.
        </label>
      </div>
    </div>
  );
}
