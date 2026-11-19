'use client';

import { Mail, Phone, Globe, Linkedin, Twitter, Instagram, Facebook, MessageCircle } from 'lucide-react';
import { Button } from '@/app/components/ui/Button';
import { Avatar } from '@/app/components/Avatar';

interface ContactTabProps {
  scientist: any;
  onOpenMessaging?: () => void;
}

export default function ContactTab({ scientist, onOpenMessaging }: ContactTabProps) {
  const contact = scientist.contact || {};

  const rows = [
    { key: 'email', icon: Mail, label: 'Email', value: contact.email, href: contact.email ? `mailto:${contact.email}` : undefined },
    { key: 'phone', icon: Phone, label: 'Phone', value: contact.phone, href: contact.phone ? `tel:${contact.phone}` : undefined },
    { key: 'website', icon: Globe, label: 'Website', value: contact.website, href: contact.website ? `https://${contact.website}` : undefined },
    { key: 'linkedin', icon: Linkedin, label: 'LinkedIn', value: contact.linkedin, href: contact.linkedin ? `https://${contact.linkedin}` : undefined },
    { key: 'twitter', icon: Twitter, label: 'X', value: contact.twitter, href: contact.twitter && !String(contact.twitter).startsWith('@') ? `https://${contact.twitter}` : undefined },
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
        <h3 className="text-lg font-bold text-neutral-black mb-4">Messages</h3>
        <div className="rounded-xl border border-neutral-gray-light overflow-hidden">
          <div className="flex items-center gap-3 bg-neutral-bg-light/60 px-4 py-3">
            <Avatar src={scientist.image} name={scientist.name || 'Scientist'} size="md" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-neutral-black">{scientist.name || 'Scientist'}</p>
              <p className="truncate text-xs text-neutral-gray-medium">
                Continue the conversation in your chat
              </p>
            </div>
            <MessageCircle className="h-5 w-5 flex-shrink-0 text-brand-red-600" />
          </div>
          <div className="space-y-3 p-4">
            <p className="text-sm text-neutral-gray-medium">
              Send a message to {scientist.name || 'this scientist'} and see their replies here in a two-way chat.
            </p>
            <Button className="bg-brand-red-600 hover:bg-brand-red-700" onClick={onOpenMessaging}>
              <MessageCircle className="mr-2 h-4 w-4" />
              Open Conversation
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
