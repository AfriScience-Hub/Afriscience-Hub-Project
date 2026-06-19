'use client';

import { useState } from 'react';
import {
  MapPin, Phone, Mail, Globe, Facebook, Twitter, Instagram, Linkedin
} from 'lucide-react';
import { Button } from '@/app/components/ui/Button';
import { toast } from 'sonner';

interface Institute {
  [key: string]: any;
}

export default function ContactTab({ institute }: { institute: Institute }) {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-gray-light">
            <h3 className="text-lg font-bold text-neutral-black mb-6">Get in Touch</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-lg bg-brand-red-100 flex items-center justify-center text-brand-red-600 flex-shrink-0">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-neutral-black">Address</p>
                  <p className="text-sm text-neutral-gray-medium">{institute.address}, {institute.location}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-lg bg-brand-red-100 flex items-center justify-center text-brand-red-600 flex-shrink-0">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-neutral-black">Phone Number</p>
                  <p className="text-sm text-neutral-gray-medium">{institute.phone || '+234 800 000 0000'}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-lg bg-brand-red-100 flex items-center justify-center text-brand-red-600 flex-shrink-0">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-neutral-black">Email Address</p>
                  <p className="text-sm text-neutral-gray-medium">{institute.email || 'info@institute.edu'}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-lg bg-brand-red-100 flex items-center justify-center text-brand-red-600 flex-shrink-0">
                  <Globe className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-neutral-black">Website</p>
                  <p className="text-sm text-brand-navy-900 hover:underline cursor-pointer">{institute.website || 'www.institute.edu'}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-neutral-gray-light">
              <p className="text-sm font-bold text-neutral-black mb-3">Social Media</p>
              <div className="flex gap-3">
                <a href="#" className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 hover:bg-blue-100 transition-colors" title="Facebook">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="h-10 w-10 rounded-lg bg-sky-50 flex items-center justify-center text-sky-500 hover:bg-sky-100 transition-colors" title="Twitter">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="h-10 w-10 rounded-lg bg-pink-50 flex items-center justify-center text-pink-600 hover:bg-pink-100 transition-colors" title="Instagram">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-700 hover:bg-blue-100 transition-colors" title="LinkedIn">
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-gray-light">
            <h3 className="text-lg font-bold text-neutral-black mb-4">Opening Hours</h3>
            <div className="space-y-2">
              {[
                { day: 'Monday - Friday', hours: '8:00 AM - 4:00 PM' },
                { day: 'Saturday', hours: '9:00 AM - 1:00 PM' },
                { day: 'Sunday', hours: 'Closed' }
              ].map((item, idx) => (
                <div key={idx} className="flex justify-between text-sm">
                  <span className="text-neutral-gray-medium">{item.day}</span>
                  <span className="font-semibold text-neutral-black">{item.hours}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-gray-light">
          <h3 className="text-lg font-bold text-neutral-black mb-2">Send a Message</h3>
          <p className="text-xs text-neutral-gray-medium mb-6">Your message will be sent to the institute&apos;s registered email address. They typically respond within 1-3 business days.</p>
          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); toast.success('Message sent successfully! The institute will respond to your email.'); }}>
            <div>
              <label className="block text-xs font-bold text-neutral-gray-medium uppercase mb-1">Full Name</label>
              <input type="text" className="w-full px-4 py-3 rounded-lg border border-neutral-gray-light focus:outline-none focus:ring-2 focus:ring-brand-red-100 focus:border-brand-red-600 transition-all text-sm" placeholder="Your name" required />
            </div>
            <div>
              <label className="block text-xs font-bold text-neutral-gray-medium uppercase mb-1">Email Address</label>
              <input type="email" className="w-full px-4 py-3 rounded-lg border border-neutral-gray-light focus:outline-none focus:ring-2 focus:ring-brand-red-100 focus:border-brand-red-600 transition-all text-sm" placeholder="Your email" required />
            </div>
            <div>
              <label className="block text-xs font-bold text-neutral-gray-medium uppercase mb-1">Subject</label>
              <select className="w-full px-4 py-3 rounded-lg border border-neutral-gray-light focus:outline-none focus:ring-2 focus:ring-brand-red-100 focus:border-brand-red-600 transition-all text-sm">
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
        </div>
      </div>

      <div className="bg-white rounded-xl p-4 shadow-sm border border-neutral-gray-light h-80 overflow-hidden relative">
        <div className="absolute inset-0 bg-neutral-bg-light flex items-center justify-center">
          <div className="text-center space-y-4">
            <MapPin className="h-12 w-12 text-brand-red-600 mx-auto animate-bounce" />
            <div>
              <p className="font-bold text-neutral-black">Interactive Map Loading...</p>
              <p className="text-sm text-neutral-gray-medium">Locate {institute.name} in {institute.location}</p>
            </div>
            <Button variant="outline" size="sm">Open in Google Maps</Button>
          </div>
        </div>
        <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1200" alt="Map Placeholder" className="w-full h-full object-cover opacity-20" />
      </div>
    </div>
  );
}
