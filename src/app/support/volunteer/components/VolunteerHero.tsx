'use client';

import Link from 'next/link';
import { ArrowRight, Users } from 'lucide-react';
import { Button } from '../../../components/ui/Button';

interface VolunteerHeroProps {
  onScrollToForm: () => void;
}

export function VolunteerHero({ onScrollToForm }: VolunteerHeroProps) {
  return (
    <section className="relative bg-brand-navy-900 py-20 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1744234233590-2d00b3c87444?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwdm9sdW50ZWVycyUyMHRlYW0lMjBjb21tdW5pdHklMjB3b3JrfGVufDF8fHx8MTc3Mjg2OTA0OHww&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Volunteer" className="h-full w-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-navy-900/60 to-brand-navy-900" />
      </div>
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/support" className="inline-flex items-center gap-1 text-slate-400 hover:text-white text-sm mb-6 transition-colors">
          <ArrowRight className="h-3 w-3 rotate-180" /> Back to Support
        </Link>
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-400 px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
            <Users className="h-4 w-4" /> Volunteering
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-6 tracking-tight">Become a Volunteer</h1>
          <p className="text-slate-300 text-lg leading-relaxed mb-8">
            At AfriScience Hub®, our volunteers are considered as external team members of the network. They are trained to work hand in hand with us to expand our reach across the African continent and beyond.
          </p>
          <Button size="lg" onClick={onScrollToForm} className="h-12 px-8 bg-brand-red-600 hover:bg-brand-red-700 text-base">
            Become a Volunteer Today!
          </Button>
        </div>
      </div>
    </section>
  );
}
