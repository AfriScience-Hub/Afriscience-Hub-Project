'use client';

import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';

export interface SocialHandle {
  name: string;
  link: string;
}

/** Known platforms and the domains their links are allowed to point at. */
const PLATFORM_DOMAINS: Record<string, string[]> = {
  x: ['x.com', 'twitter.com'],
  twitter: ['twitter.com', 'x.com'],
  instagram: ['instagram.com'],
  facebook: ['facebook.com', 'fb.com'],
  linkedin: ['linkedin.com'],
  tiktok: ['tiktok.com'],
  youtube: ['youtube.com', 'youtu.be'],
  github: ['github.com'],
  threads: ['threads.net'],
  snapchat: ['snapchat.com'],
  pinterest: ['pinterest.com'],
  reddit: ['reddit.com'],
  discord: ['discord.com', 'discord.gg'],
  telegram: ['t.me', 'telegram.me', 'telegram.org'],
  medium: ['medium.com'],
  behance: ['behance.net', 'behance.io'],
  dribbble: ['dribbble.com'],
  // Generic entries accept any valid URL.
  website: [],
  'personal website': [],
  portfolio: [],
};

/**
 * Validates that a social link matches the handle it was added with.
 * Returns an error message, or `null` when the pair is valid.
 * An empty name AND link is treated as an untouched row (valid).
 */
export function validateSocialHandle(name: string, link: string): string | null {
  const n = name.trim();
  const l = link.trim();
  if (!n && !l) return null;
  if (!n) return 'Add the social media name for this link.';
  if (!l) return `Add the link for "${n}".`;
  // Allow http://, https://, and www. prefixed URLs
  if (!/^(https?:\/\/|www\.)[^\s/]+\.[^\s/]+/i.test(l)) {
    return 'Link must be a valid URL starting with http://, https://, or www.';
  }

  const domains = PLATFORM_DOMAINS[n.toLowerCase()];
  if (domains) {
    if (domains.length === 0) return null; // Website / Portfolio: any URL is fine
    let host = '';
    try {
      // Normalize URL for parsing (prepend https:// if starts with www.)
      const normalizedUrl = l.startsWith('www.') ? `https://${l}` : l;
      host = new URL(normalizedUrl).hostname.replace(/^www\./, '').toLowerCase();
    } catch {
      return 'Link must be a valid URL.';
    }
    // Strict match: exact domain or subdomain of the allowed domain
    const matches = domains.some(d => host === d || host.endsWith(`.${d}`));
    if (!matches) {
      return `This link doesn't match "${n}" — expected a ${domains[0]} link.`;
    }
    return null;
  }

  // Unknown platform: when the name looks like a username, the link must contain it.
  if (!/\s/.test(n) && n.length >= 3 && !l.toLowerCase().includes(n.toLowerCase())) {
    return `The link doesn't contain your "${n}" handle — paste the URL of that profile.`;
  }
  return null;
}

/** First validation error across all rows, or `null` when everything is fine. */
export function firstSocialError(handles: SocialHandle[]): string | null {
  const filled = handles.filter(h => h.name.trim() || h.link.trim());
  if (filled.length === 0) return 'Please provide at least one social media handle.';
  for (const h of filled) {
    const err = validateSocialHandle(h.name, h.link);
    if (err) return err;
  }
  return null;
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

  const [touchedFields, setTouchedFields] = useState<Record<number, { name: boolean; link: boolean }>>({});

  const handleBlur = (index: number, field: keyof SocialHandle) => {
    setTouchedFields(prev => ({
      ...prev,
      [index]: { ...(prev[index] || {}), [field]: true },
    }));
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
          {socialHandles.map((handle, index) => {
            const fieldTouched = touchedFields[index] || { name: false, link: false };
            const showError = fieldTouched.name || fieldTouched.link;
            const error = showError ? validateSocialHandle(handle.name, handle.link) : null;
            return (
              <div key={index}>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={handle.name}
                    onChange={e => updateHandle(index, 'name', e.target.value)}
                    onBlur={() => handleBlur(index, 'name')}
                    aria-invalid={!!error}
                    className="w-[40%] rounded-lg border border-neutral-gray-light px-3 py-2 text-sm focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600"
                    placeholder="Social media name (e.g. X)"
                  />
                  <input
                    type="url"
                    value={handle.link}
                    onChange={e => updateHandle(index, 'link', e.target.value)}
                    onBlur={() => handleBlur(index, 'link')}
                    aria-invalid={!!error}
                    className={`flex-1 min-w-0 rounded-lg border px-3 py-2 text-sm focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600 ${
                      error ? 'border-red-400' : 'border-neutral-gray-light'
                    }`}
                    placeholder="https://... or www.example.com"
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
                {error && <p className="mt-1 text-[11px] text-red-500">{error}</p>}
              </div>
            );
          })}
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
