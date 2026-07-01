'use client';

import { MapPin, Phone, Mail } from 'lucide-react';

export default function ContactInfo() {
  return (
    <div className="space-y-8">
      <div className="flex gap-4">
        <div className="flex-shrink-0">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-red-100">
            <MapPin className="h-6 w-6 text-brand-red-600" aria-hidden="true" />
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-neutral-black">Our Location</h3>
          <p className="mt-2 text-base text-slate-600">
            AfriScience Hub Headquarters<br />
            123 Innovation Drive, Tech District<br />
            Lagos, Nigeria
          </p>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="flex-shrink-0">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-red-100">
            <Phone className="h-6 w-6 text-brand-red-600" aria-hidden="true" />
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-neutral-black">Phone Support</h3>
          <p className="mt-2 text-base text-slate-600">
            <span className="block mb-1">Main: +234 916 000 3305</span>
            <span className="block">Alt: +234 916 000 3306</span>
          </p>
          <p className="mt-1 text-sm text-slate-500">Mon-Fri 8am-6pm WAT</p>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="flex-shrink-0">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-red-100">
            <Mail className="h-6 w-6 text-brand-red-600" aria-hidden="true" />
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-neutral-black">Email Us</h3>
          <p className="mt-2 text-base text-slate-600">
            contact@afrisciencehub.com<br />
            support@afrisciencehub.com
          </p>
        </div>
      </div>
    </div>
  );
}
