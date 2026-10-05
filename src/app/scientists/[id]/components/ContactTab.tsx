'use client';

import { Mail, Phone, Globe, Linkedin, Twitter, Instagram, Facebook } from 'lucide-react';
import { Button } from '@/app/components/ui/Button';
import { useAuth } from '@/app/context/AuthContext';

interface ContactTabProps {
  scientist: any;
}

export default function ContactTab({ scientist }: ContactTabProps) {
  const { user } = useAuth();
  const contact = scientist.contact || {};

  const rows = [
    { key: 'email', icon: Mail, label: 'Email', value: contact.email, href: contact.email ? `mailto:${contact.email}` : undefined },
    { key: 'phone', icon: Phone, label: 'Phone', value: contact.phone, href: contact.phone ? `tel:${contact.phone}` : undefined },
    { key: 'website', icon: Globe, label: 'Website', value: contact.website, href: contact.website ? `https://${contact.website}` : undefined },
    { key: 'linkedin', icon: Linkedin, label: 'LinkedIn', value: contact.linkedin, href: contact.linkedin ? `https://${contact.linkedin}` : undefined },
    { key: 'twitter', icon: Twitter, label: 'Twitter', value: contact.twitter, href: contact.twitter && !String(contact.twitter).startsWith('@') ? `https://${contact.twitter}` : undefined },
    { key: 'instagram', icon: Instagram, label: 'Instagram', value: contact.instagram, href: contact.instagram ? `https://${contact.instagram}` : undefined },
    { key: 'facebook', icon: Facebook, label: 'Facebook', value: contact.facebook, href: contact.facebook ? `https://${contact.facebook}` : undefined },
  ].filter(row => row.value);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <section className="bg-white rounded-xl p-6 shadow-sm border border-neutral-gray-light">
        <h3 className="text-lg font-bold text-neutral-black mb-6">Contact Information</h3>
        <div className="grid gap-6 sm:grid-cols-2">
          {rows.map(({ key, icon: Icon, label, value, href }) => (
            <div key={key} className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-lg bg-neutral-bg-light flex items-center justify-center text-neutral-gray-dark flex-shrink-0">
                <Icon className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-neutral-gray-medium uppercase font-bold">{label}</p>
                {href ? (
                  <a href={href} target="_blank" rel="noreferrer" className="text-brand-red-600 font-medium hover:underline break-all">{value}</a>
                ) : (
                  <span className="text-brand-red-600 font-medium break-all">{value}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white rounded-xl p-6 shadow-sm border border-neutral-gray-light">
        <h3 className="text-lg font-bold text-neutral-black mb-4">Send a Message</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input type="text" placeholder="Your Name" defaultValue={user?.name || ''} className="w-full rounded-lg border border-neutral-gray-light p-3 text-sm focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600" />
            <input type="email" placeholder="Your Email" defaultValue={user?.email || ''} className="w-full rounded-lg border border-neutral-gray-light p-3 text-sm focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600" />
          </div>
          <input type="text" placeholder="Subject" className="w-full rounded-lg border border-neutral-gray-light p-3 text-sm focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600" />
          <textarea rows={4} placeholder="Your Message" className="w-full rounded-lg border border-neutral-gray-light p-3 text-sm focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600 resize-none" />
          <Button className="bg-brand-red-600 hover:bg-brand-red-700">Send Message</Button>
        </div>
      </section>
    </div>
  );
}
