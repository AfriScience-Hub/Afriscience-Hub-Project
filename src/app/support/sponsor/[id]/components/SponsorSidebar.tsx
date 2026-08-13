'use client';

import Image from 'next/image';
import { MapPin, Phone, Share2, Mail, Globe, Eye, Archive, ArchiveX, MessageCircle } from 'lucide-react';
import { Button } from '../../../../components/ui/Button';
import type { SponsorDetail } from '../data';

interface SponsorSidebarProps {
  sponsor: SponsorDetail;
  onShare: () => void;
  onImageClick: (url: string) => void;
  isArchived: boolean;
  onToggleArchive: () => void;
}

export function SponsorSidebar({ sponsor: s, onShare, onImageClick, isArchived, onToggleArchive }: SponsorSidebarProps) {
  return (
    <div className="lg:col-span-1 space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-neutral-gray-light overflow-hidden">
        <div className="relative h-64">
          <Image
            src={s.image}
            alt={s.name}
            fill
            sizes="(max-width: 1024px) 100vw, 33vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
            <button
              onClick={() => onImageClick(s.image)}
              className="cursor-pointer bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold text-neutral-black flex items-center gap-2 transition-colors"
            >
              <Eye className="h-4 w-4" />
              Preview
            </button>
          </div>
          <div className={`absolute bottom-4 left-4 px-3 py-1.5 rounded-full text-xs font-bold ${s.status === 'Online' ? 'bg-green-500 text-white' : 'bg-neutral-gray-dark text-white'}`}>
            {s.status === 'Online' ? '● Online' : '○ Offline'}
          </div>
        </div>
        <div className="p-5">
          <p className="text-xs text-neutral-gray-dark mb-3">
            {s.industries.join(' | ')}
          </p>
          <p className="text-xs italic text-neutral-gray-dark mb-4">"{s.motto}"</p>

          <div className="space-y-2 text-sm mb-4">
            <p className="text-neutral-gray-dark flex items-start gap-2">
              <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <span>{s.address}</span>
            </p>
            <p className="text-neutral-black font-semibold flex items-start gap-2 ml-6">
              <span>{s.state}, {s.country}</span>
            </p>
          </div>

          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <Button onClick={onToggleArchive} variant="outline" size="sm" className="flex items-center gap-2">
                {isArchived ? <ArchiveX className="h-4 w-4" /> : <Archive className="h-4 w-4" />}
                {isArchived ? 'Unarchive' : 'Archive'}
              </Button>
              <Button onClick={onShare} variant="outline" size="sm" className="flex items-center gap-2">
                <Share2 className="h-4 w-4" /> Share
              </Button>
            </div>
            <Button
              asChild
              className="w-full bg-brand-red-600 hover:bg-brand-red-700 flex items-center gap-2 justify-center"
              size="sm"
            >
              <a href={`tel:${s.contact.phone}`}>
                <Phone className="h-4 w-4" /> Call Contact
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="sm"
              className="w-full flex items-center gap-2 justify-center"
            >
              <a href={`sms:${s.contact.phone}`}>
                <MessageCircle className="h-4 w-4" /> Message Contact
              </a>
            </Button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-neutral-gray-light p-6">
        <h3 className="text-lg font-bold text-neutral-black mb-4 flex items-center gap-2">
          <Phone className="h-5 w-5 text-brand-red-600" />
          Contact Information
        </h3>
        <div className="space-y-3 text-sm">
          <a href={`tel:${s.contact.phone}`} className="cursor-pointer flex items-start gap-3 p-2 rounded-lg group">
            <Phone className="h-4 w-4 text-neutral-gray-medium mt-0.5" />
            <div>
              <p className="text-xs text-neutral-gray-medium">Phone</p>
              <p className="text-brand-red-600">{s.contact.phone}</p>
            </div>
          </a>
          <a href={`mailto:${s.contact.email}`} className="cursor-pointer flex items-start gap-3 p-2 rounded-lg group">
            <Mail className="h-4 w-4 text-neutral-gray-medium mt-0.5" />
            <div>
              <p className="text-xs text-neutral-gray-medium">Email</p>
              <p className="text-brand-red-600">{s.contact.email}</p>
            </div>
          </a>
          <a href={`https://${s.contact.website}`} target="_blank" rel="noopener noreferrer" className="cursor-pointer flex items-start gap-3 p-2 rounded-lg group">
            <Globe className="h-4 w-4 text-neutral-gray-medium mt-0.5" />
            <div>
              <p className="text-xs text-neutral-gray-medium">Website</p>
              <p className="text-brand-red-600">{s.contact.website}</p>
            </div>
          </a>
        </div>
        <div className="mt-4 pt-4 border-t border-neutral-gray-light">
          <p className="text-sm font-semibold text-neutral-black mb-3">Social Media Handles</p>
          <div className="flex gap-3">
            <a href={`https://linkedin.com/company/${s.contact.linkedin}`} target="_blank" rel="noopener noreferrer" className="cursor-pointer text-blue-600 p-2 rounded-lg transition-colors">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </a>
            <a href={`https://twitter.com/${s.contact.twitter}`} target="_blank" rel="noopener noreferrer" className="cursor-pointer text-sky-500 p-2 rounded-lg transition-colors">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/></svg>
            </a>
            <a href={`https://facebook.com/${s.contact.facebook}`} target="_blank" rel="noopener noreferrer" className="cursor-pointer text-blue-700 p-2 rounded-lg transition-colors">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
