'use client';

import { Button } from '../../components/ui/Button';

export default function ContactForm() {
  return (
    <div className="bg-neutral-bg-light rounded-2xl p-8 border border-neutral-gray-light">
      <h3 className="text-xl font-bold text-neutral-black mb-6">Send us a Message</h3>
      <form className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input type="text" className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-brand-red-600 focus:outline-none focus:ring-1 focus:ring-brand-red-600" placeholder="First Name" />
          <input type="text" className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-brand-red-600 focus:outline-none focus:ring-1 focus:ring-brand-red-600" placeholder="Last Name" />
        </div>
        <input type="email" className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-brand-red-600 focus:outline-none focus:ring-1 focus:ring-brand-red-600" placeholder="Email Address" />
        <textarea rows={4} className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-brand-red-600 focus:outline-none focus:ring-1 focus:ring-brand-red-600" placeholder="Your Message..." />
        <Button className="w-full bg-brand-navy-900 hover:bg-brand-navy-800">Send Message</Button>
      </form>
    </div>
  );
}
