'use client';

import { Mail, Phone, Globe, MapPin, Linkedin, Twitter } from 'lucide-react';
import { Button } from '@/app/components/ui/Button';

interface MapCoords {
  lat: number;
  lng: number;
}

interface ContactInfo {
  email?: string;
  phone?: string;
  website?: string;
  linkedin?: string;
  twitter?: string;
  mapCoords?: MapCoords;
}

interface ContactTabProps {
  contact?: ContactInfo;
}

export default function ContactTab({ contact }: ContactTabProps) {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <section className="bg-white rounded-xl p-6 shadow-sm border border-neutral-gray-light">
        <h3 className="text-lg font-bold text-neutral-black mb-6">Contact Information</h3>
        <div className="grid gap-6">
          {contact?.email && (
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-lg bg-neutral-bg-light flex items-center justify-center text-neutral-gray-dark">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-neutral-gray-medium uppercase font-bold">Email</p>
                <a href={`mailto:${contact.email}`} className="text-brand-red-600 font-medium hover:underline">{contact.email}</a>
              </div>
            </div>
          )}
          {contact?.phone && (
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-lg bg-neutral-bg-light flex items-center justify-center text-neutral-gray-dark">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-neutral-gray-medium uppercase font-bold">Phone</p>
                <a href={`tel:${contact.phone}`} className="text-brand-red-600 font-medium hover:underline">{contact.phone}</a>
              </div>
            </div>
          )}
          {contact?.website && (
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-lg bg-neutral-bg-light flex items-center justify-center text-neutral-gray-dark">
                <Globe className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-neutral-gray-medium uppercase font-bold">Website</p>
                <a href={`https://${contact.website}`} target="_blank" rel="noreferrer" className="text-brand-red-600 font-medium hover:underline">{contact.website}</a>
              </div>
            </div>
          )}
          {contact?.linkedin && (
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-lg bg-neutral-bg-light flex items-center justify-center text-neutral-gray-dark">
                <Linkedin className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-neutral-gray-medium uppercase font-bold">LinkedIn</p>
                <a href={`https://${contact.linkedin}`} target="_blank" rel="noreferrer" className="text-brand-red-600 font-medium hover:underline">{contact.linkedin}</a>
              </div>
            </div>
          )}
          {contact?.twitter && (
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-lg bg-neutral-bg-light flex items-center justify-center text-neutral-gray-dark">
                <Twitter className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-neutral-gray-medium uppercase font-bold">Twitter</p>
                <span className="text-brand-red-600 font-medium">{contact.twitter}</span>
              </div>
            </div>
          )}
        </div>
      </section>

      {contact?.mapCoords && (
        <section className="bg-white rounded-xl p-6 shadow-sm border border-neutral-gray-light">
          <h3 className="text-lg font-bold text-neutral-black mb-4 flex items-center gap-2">
            <MapPin className="h-5 w-5 text-brand-red-600" /> Location Map
          </h3>
          <div className="h-64 rounded-lg bg-neutral-bg-light border border-neutral-gray-light flex items-center justify-center overflow-hidden">
            <iframe
              title="Center Location"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              src={`https://www.openstreetmap.org/export/embed.html?bbox=${contact.mapCoords.lng - 0.02},${contact.mapCoords.lat - 0.015},${contact.mapCoords.lng + 0.02},${contact.mapCoords.lat + 0.015}&layer=mapnik&marker=${contact.mapCoords.lat},${contact.mapCoords.lng}`}
            />
          </div>
        </section>
      )}

      <section className="bg-white rounded-xl p-6 shadow-sm border border-neutral-gray-light">
        <h3 className="text-lg font-bold text-neutral-black mb-4">Send a Message</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input type="text" placeholder="Your Name" className="w-full rounded-lg border border-neutral-gray-light p-3 text-sm focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600" />
            <input type="email" placeholder="Your Email" className="w-full rounded-lg border border-neutral-gray-light p-3 text-sm focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600" />
          </div>
          <input type="text" placeholder="Subject" className="w-full rounded-lg border border-neutral-gray-light p-3 text-sm focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600" />
          <textarea rows={4} placeholder="Your Message" className="w-full rounded-lg border border-neutral-gray-light p-3 text-sm focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600 resize-none" />
          <Button className="bg-brand-red-600 hover:bg-brand-red-700">Send Message</Button>
        </div>
      </section>
    </div>
  );
}
