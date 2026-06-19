'use client';

import { Phone, Mail, Globe } from 'lucide-react';

interface InnovatorInfoSectionProps {
  innovatorName: string;
  setInnovatorName: (v: string) => void;
  phone: string;
  setPhone: (v: string) => void;
  altPhone: string;
  setAltPhone: (v: string) => void;
  email: string;
  setEmail: (v: string) => void;
  website: string;
  setWebsite: (v: string) => void;
  socialLinks: { linkedin: string; twitter: string; instagram: string; facebook: string };
  setSocialLinks: (v: { linkedin: string; twitter: string; instagram: string; facebook: string } | ((prev: { linkedin: string; twitter: string; instagram: string; facebook: string }) => { linkedin: string; twitter: string; instagram: string; facebook: string })) => void;
}

export default function InnovatorInfoSection({
  innovatorName, setInnovatorName, phone, setPhone, altPhone, setAltPhone,
  email, setEmail, website, setWebsite, socialLinks, setSocialLinks,
}: InnovatorInfoSectionProps) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-neutral-black mb-1">Innovator's Name *</label>
        <input
          type="text"
          value={innovatorName}
          onChange={e => setInnovatorName(e.target.value)}
          className="w-full rounded-lg border border-neutral-gray-light px-4 py-2.5 text-sm focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600"
          placeholder="Input Innovator's Name"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-neutral-black mb-1">Phone Number *</label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-gray-medium pointer-events-none" />
            <input type="tel" value={phone} onChange={e => setPhone(e.target.value)}
              className="w-full rounded-lg border border-neutral-gray-light pl-10 pr-4 py-2.5 text-sm focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600"
              placeholder="+234 800 000 0000" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-black mb-1">Alternative Phone No.</label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-gray-medium pointer-events-none" />
            <input type="tel" value={altPhone} onChange={e => setAltPhone(e.target.value)}
              className="w-full rounded-lg border border-neutral-gray-light pl-10 pr-4 py-2.5 text-sm focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600"
              placeholder="+234 800 000 0000" />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-black mb-1">E-mail Address *</label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-gray-medium pointer-events-none" />
          <input type="email" value={email} onChange={e => setEmail(e.target.value)}
            className="w-full rounded-lg border border-neutral-gray-light pl-10 pr-4 py-2.5 text-sm focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600"
            placeholder="info@example.com" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-black mb-1">Website</label>
        <div className="relative">
          <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-gray-medium pointer-events-none" />
          <input type="url" value={website} onChange={e => setWebsite(e.target.value)}
            className="w-full rounded-lg border border-neutral-gray-light pl-10 pr-4 py-2.5 text-sm focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600"
            placeholder="https://www.example.com" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-black mb-2">Social Media Handles</label>
        <div className="grid gap-3 sm:grid-cols-2">
          {(['linkedin', 'twitter', 'instagram', 'facebook'] as const).map(platform => (
            <div key={platform}>
              <label className="block text-[11px] font-medium text-neutral-gray-medium mb-1 capitalize">{platform}</label>
              <input type="text"
                value={socialLinks[platform]}
                onChange={e => setSocialLinks(prev => ({ ...prev, [platform]: e.target.value }))}
                className="w-full rounded-lg border border-neutral-gray-light px-3 py-2 text-sm focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600"
                placeholder={`@your${platform}handle`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
