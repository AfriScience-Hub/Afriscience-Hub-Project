'use client';

import Link from 'next/link';
import {
  Users, BookOpen, Award, Clock, Download, FileText,
  ShieldCheck, MapPin, Star
} from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/app/components/ui/Button';
import { INSTITUTES } from '@/app/data/mockData';

interface Institute {
  [key: string]: any;
}

export default function Sidebar({ institute }: { institute: Institute }) {
  return (
    <div className="lg:col-span-1 space-y-8">
      <section className="bg-white rounded-xl p-6 shadow-sm border border-neutral-gray-light">
        <h3 className="text-lg font-bold text-neutral-black mb-6 flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-brand-red-600" /> Institute Highlights
        </h3>
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 flex-shrink-0">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xl font-black text-neutral-black">1,500+</p>
              <p className="text-xs text-neutral-gray-medium font-bold uppercase tracking-wider">Active Students</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-lg bg-brand-red-50 flex items-center justify-center text-brand-red-600 flex-shrink-0">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xl font-black text-neutral-black">45+</p>
              <p className="text-xs text-neutral-gray-medium font-bold uppercase tracking-wider">Specialized Labs</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600 flex-shrink-0">
              <Award className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xl font-black text-neutral-black">12</p>
              <p className="text-xs text-neutral-gray-medium font-bold uppercase tracking-wider">Innovation Awards</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-lg bg-green-50 flex items-center justify-center text-green-600 flex-shrink-0">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xl font-black text-neutral-black">120+</p>
              <p className="text-xs text-neutral-gray-medium font-bold uppercase tracking-wider">Faculty & Staff</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600 flex-shrink-0">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xl font-black text-neutral-black">25 yrs</p>
              <p className="text-xs text-neutral-gray-medium font-bold uppercase tracking-wider">Years of Excellence</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white rounded-xl p-6 shadow-sm border border-neutral-gray-light">
        <h3 className="text-lg font-bold text-neutral-black mb-4 flex items-center gap-2">
          <Download className="h-5 w-5 text-brand-red-600" /> Downloadable Resources
        </h3>
        <div className="space-y-3">
          {[
            { name: 'School Brochure & Prospectus', icon: FileText },
            { name: 'Fee Structure', icon: BookOpen },
            { name: 'School Policies', icon: ShieldCheck },
            { name: 'Admission Form', icon: FileText },
          ].map((resource, idx) => (
            <button
              key={idx}
              className="w-full flex items-center gap-3 p-3 rounded-lg border border-neutral-gray-light bg-neutral-bg-light/50 hover:bg-neutral-bg-light hover:border-brand-red-100 transition-all text-left group"
              onClick={() => toast.info(`Download for "${resource.name}" will be available soon.`)}
            >
              <div className="h-8 w-8 rounded bg-brand-red-100 flex items-center justify-center text-brand-red-600 flex-shrink-0">
                <resource.icon className="h-4 w-4" />
              </div>
              <span className="text-sm font-medium text-neutral-gray-dark group-hover:text-brand-red-600 transition-colors">{resource.name}</span>
              <Download className="h-4 w-4 text-neutral-gray-light ml-auto group-hover:text-brand-red-600 transition-colors" />
            </button>
          ))}
        </div>
      </section>

      <section className="bg-brand-navy-900 rounded-xl p-6 text-white shadow-lg overflow-hidden relative">
        <div className="relative z-10">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-brand-red-600" /> Professional Listing
          </h3>
          <p className="text-brand-navy-100 text-sm leading-relaxed mb-6">
            This institute is a verified partner of AfriScience Hub. All certifications and records have been vetted by our quality assurance team.
          </p>
          <Button className="w-full bg-brand-red-600 hover:bg-brand-red-700 text-white border-none font-bold">
            View Verification PDF
          </Button>
        </div>
        <div className="absolute top-0 right-0 -mt-8 -mr-8 h-32 w-32 bg-brand-navy-800 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-0 left-0 -mb-8 -ml-8 h-32 w-32 bg-brand-red-900/20 rounded-full blur-3xl opacity-50" />
      </section>

      <section className="bg-white rounded-xl p-6 shadow-sm border border-neutral-gray-light">
        <h3 className="text-lg font-bold text-neutral-black mb-4">Admissions Open</h3>
        <p className="text-sm text-neutral-gray-dark mb-6 leading-relaxed">
          Join the next cohort of innovators. Admissions for the 2025 academic session are currently ongoing.
        </p>
        <div className="space-y-3">
          <Button className="w-full bg-brand-red-600 hover:bg-brand-red-700 text-white font-bold">Apply Now</Button>
          <Button variant="outline" className="w-full border-brand-navy-900 text-brand-navy-900 font-bold">Request Prospectus</Button>
        </div>
      </section>

      <section>
        <h3 className="text-sm font-bold text-neutral-gray-medium uppercase tracking-wider mb-4 px-2">Similar Institutes</h3>
        <div className="space-y-4">
          {INSTITUTES.filter((i: any) => i.id !== institute.id && i.class === institute.class).slice(0, 3).map((sim: any) => (
            <Link key={sim.id} href={`/institutes/${sim.id}`} className="flex gap-4 p-3 bg-white rounded-xl border border-neutral-gray-light hover:border-brand-red-600 hover:shadow-md transition-all group">
              <div className="h-16 w-16 rounded-lg overflow-hidden flex-shrink-0">
                <img src={sim.image} alt={sim.name} className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold text-neutral-black truncate group-hover:text-brand-red-600 transition-colors">{sim.name}</h4>
                <div className="flex items-center gap-1.5 text-xs text-neutral-gray-medium mt-1">
                  <MapPin className="h-3 w-3" />
                  <span className="truncate">{sim.location}</span>
                </div>
                <div className="flex items-center gap-1 text-xs font-bold text-amber-500 mt-1">
                  <Star className="h-3 w-3 fill-current" />
                  {sim.rating}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
