'use client';

import Image from 'next/image';
import {
  MapPin, Phone, Mail, Globe, Facebook, Twitter, Instagram, Linkedin, Contact
} from 'lucide-react';
import { Button } from '@/app/components/ui/Button';
import { toast } from 'sonner';
import { useAuth } from '@/app/context/AuthContext';

interface Institute {
  [key: string]: any;
}

export default function ContactTab({ institute }: { institute: Institute }) {
  const { user } = useAuth();

  const details = [
    { icon: <Mail className="h-5 w-5" />, label: 'Email Address', value: institute.email || 'info@institute.edu' },
    { icon: <Phone className="h-5 w-5" />, label: 'Phone Number', value: institute.phone || '+234 800 000 0000' },
    { icon: <Globe className="h-5 w-5" />, label: 'Website', value: institute.website || 'www.institute.edu' },
  ];

  const socialHandles = [
    { key: 'linkedin', Icon: Linkedin, bg: 'bg-blue-50', text: 'text-blue-700', hover: 'hover:bg-blue-100' },
    { key: 'twitter', Icon: Twitter, bg: 'bg-sky-50', text: 'text-sky-500', hover: 'hover:bg-sky-100' },
    { key: 'instagram', Icon: Instagram, bg: 'bg-pink-50', text: 'text-pink-600', hover: 'hover:bg-pink-100' },
    { key: 'facebook', Icon: Facebook, bg: 'bg-blue-50', text: 'text-blue-600', hover: 'hover:bg-blue-100' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <section className="bg-white rounded-xl p-6 shadow-sm border border-neutral-gray-light">
        <h3 className="text-lg font-bold text-neutral-black mb-6 flex items-center gap-2">
          <Contact className="h-5 w-5 text-brand-red-600" /> Contact Information
        </h3>
        <div className="space-y-4">
          {details.map((item) => (
            <div key={item.label} className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-lg bg-brand-red-100 flex items-center justify-center text-brand-red-600 flex-shrink-0">
                {item.icon}
              </div>
              <div>
                <p className="text-sm font-bold text-neutral-black">{item.label}</p>
                <p className="text-sm text-neutral-gray-medium">{item.value}</p>
              </div>
            </div>
          ))}
          <div className="flex items-start gap-4">
            <div className="h-10 w-10 rounded-lg bg-brand-red-100 flex items-center justify-center text-brand-red-600 flex-shrink-0">
              <MapPin className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-neutral-black">Address</p>
              <p className="text-sm text-neutral-gray-medium">{institute.address}, {institute.location}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white rounded-xl p-4 shadow-sm border border-neutral-gray-light">
        <h3 className="text-lg font-bold text-neutral-black mb-4 px-2 flex items-center gap-2">
          <MapPin className="h-5 w-5 text-brand-red-600" /> Location Map
        </h3>
        <div className="relative h-80 overflow-hidden rounded-lg">
          <div className="absolute inset-0 bg-neutral-bg-light flex items-center justify-center z-10">
            <div className="text-center space-y-4">
              <MapPin className="h-12 w-12 text-brand-red-600 mx-auto animate-bounce" />
              <div>
                <p className="font-bold text-neutral-black">Interactive Map Loading...</p>
                <p className="text-sm text-neutral-gray-medium">Locate {institute.name} in {institute.location}</p>
              </div>
              <Button variant="outline" size="sm">Open in Google Maps</Button>
            </div>
          </div>
          <Image src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1200" alt="Map Placeholder" fill sizes="100vw" className="object-cover opacity-20" />
        </div>
      </section>

      <section className="bg-white rounded-xl p-6 shadow-sm border border-neutral-gray-light">
        <h3 className="text-lg font-bold text-neutral-black mb-2">Send a Message</h3>
        <p className="text-xs text-neutral-gray-medium mb-6">Your message will be sent to the institute&apos;s registered email address. They typically respond within 1-3 business days.</p>
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); toast.success('Message sent successfully! The institute will respond to your email.'); }}>
          <div>
            <label className="block text-xs font-bold text-neutral-gray-medium uppercase mb-1">Name</label>
            <input type="text" defaultValue={user?.name || ''} className="w-full px-4 py-3 rounded-lg border border-neutral-gray-light focus:outline-none focus:ring-2 focus:ring-brand-red-100 focus:border-brand-red-600 transition-all text-sm" placeholder="Your name" required />
          </div>
          <div>
            <label className="block text-xs font-bold text-neutral-gray-medium uppercase mb-1">Email</label>
            <input type="email" defaultValue={user?.email || ''} className="w-full px-4 py-3 rounded-lg border border-neutral-gray-light focus:outline-none focus:ring-2 focus:ring-brand-red-100 focus:border-brand-red-600 transition-all text-sm" placeholder="Your email" required />
          </div>
          <div>
            <label className="block text-xs font-bold text-neutral-gray-medium uppercase mb-1">Subject</label>
            <select className="w-full px-4 py-3 rounded-lg border border-neutral-gray-light focus:outline-none focus:ring-2 focus:ring-brand-red-100 focus:border-brand-red-600 transition-all text-sm cursor-pointer">
              <option>Admissions Inquiry</option>
              <option>Partnership</option>
              <option>General Support</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-neutral-gray-medium uppercase mb-1">Message</label>
            <textarea className="w-full px-4 py-3 rounded-lg border border-neutral-gray-light focus:outline-none focus:ring-2 focus:ring-brand-red-100 focus:border-brand-red-600 transition-all text-sm h-32" placeholder="How can we help you?" required></textarea>
          </div>
          <Button type="submit" className="w-full bg-brand-red-600 hover:bg-brand-red-700 text-white font-bold py-3">
            Send Message
          </Button>
        </form>
      </section>

      <section className="bg-white rounded-xl p-6 shadow-sm border border-neutral-gray-light">
        <h3 className="text-lg font-bold text-neutral-black mb-4">Social Handles</h3>
        <div className="flex flex-wrap gap-3">
          {socialHandles.map(({ key, Icon, bg, text, hover }) => (
            <a
              key={key}
              href="#"
              className={`h-10 w-10 rounded-lg ${bg} ${text} ${hover} flex items-center justify-center transition-colors`}
              title={institute.socialMedia?.[key] || key}
            >
              <Icon className="h-5 w-5" />
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
