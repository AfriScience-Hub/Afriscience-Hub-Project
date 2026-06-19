'use client';

import { Mail, Phone, Globe, Linkedin, Twitter } from 'lucide-react';
import { Button } from '@/app/components/ui/Button';

interface ContactTabProps {
  scientist: any;
}

export default function ContactTab({ scientist }: ContactTabProps) {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <section className="bg-white rounded-xl p-6 shadow-sm border border-neutral-gray-light">
        <h3 className="text-lg font-bold text-neutral-black mb-6">Contact Information</h3>
        <div className="grid gap-6">
          {scientist.contact?.email && (
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-lg bg-neutral-bg-light flex items-center justify-center text-neutral-gray-dark">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-neutral-gray-medium uppercase font-bold">Email</p>
                <a href={`mailto:${scientist.contact.email}`} className="text-brand-red-600 font-medium hover:underline">{scientist.contact.email}</a>
              </div>
            </div>
          )}
          {scientist.contact?.phone && (
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-lg bg-neutral-bg-light flex items-center justify-center text-neutral-gray-dark">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-neutral-gray-medium uppercase font-bold">Phone</p>
                <a href={`tel:${scientist.contact.phone}`} className="text-brand-red-600 font-medium hover:underline">{scientist.contact.phone}</a>
              </div>
            </div>
          )}
          {(scientist.contact as any)?.website && (
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-lg bg-neutral-bg-light flex items-center justify-center text-neutral-gray-dark">
                <Globe className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-neutral-gray-medium uppercase font-bold">Website</p>
                <a href={`https://${(scientist.contact as any).website}`} target="_blank" rel="noreferrer" className="text-brand-red-600 font-medium hover:underline">{(scientist.contact as any).website}</a>
              </div>
            </div>
          )}
          {scientist.contact?.linkedin && (
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-lg bg-neutral-bg-light flex items-center justify-center text-neutral-gray-dark">
                <Linkedin className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-neutral-gray-medium uppercase font-bold">LinkedIn</p>
                <a href={`https://${scientist.contact.linkedin}`} target="_blank" rel="noreferrer" className="text-brand-red-600 font-medium hover:underline">{scientist.contact.linkedin}</a>
              </div>
            </div>
          )}
          {scientist.contact?.twitter && (
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-lg bg-neutral-bg-light flex items-center justify-center text-neutral-gray-dark">
                <Twitter className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-neutral-gray-medium uppercase font-bold">Twitter</p>
                <span className="text-brand-red-600 font-medium">{scientist.contact.twitter}</span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Contact Form */}
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
