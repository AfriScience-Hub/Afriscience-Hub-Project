'use client';

import React from 'react';
import Link from 'next/link';
import {
  Layers,
  Building2,
  Beaker,
  Target,
  Lightbulb,
  Trophy,
  Award,
  BookOpen,
  Heart,
  ChevronRight,
} from 'lucide-react';
import { ADMIN_ROUTES } from '../data/routes';

const CATEGORIES = [
  { label: 'Institutes', href: ADMIN_ROUTES.institutes, icon: Building2, iconCls: 'bg-purple-100 text-purple-600', description: 'Manage registered science and technology institutes.' },
  { label: 'Scientists & Technologies', href: ADMIN_ROUTES.scientistsTechnologies, icon: Beaker, iconCls: 'bg-blue-100 text-blue-600', description: 'Review and manage scientist and technology listings.' },
  { label: 'Special Centres', href: ADMIN_ROUTES.specialCentres, icon: Target, iconCls: 'bg-amber-100 text-amber-600', description: 'Administer special centres and their details.' },
  { label: 'Afro Innovations', href: ADMIN_ROUTES.afroInnovations, icon: Lightbulb, iconCls: 'bg-green-100 text-green-600', description: 'Manage innovations, options and submissions.' },
  { label: 'Competitions', href: ADMIN_ROUTES.competitions, icon: Trophy, iconCls: 'bg-orange-100 text-orange-600', description: 'Create competitions and review submissions.' },
  { label: 'Awards', href: ADMIN_ROUTES.awards, icon: Award, iconCls: 'bg-pink-100 text-pink-600', description: 'Track awards, recipients and recognition.' },
  { label: 'Impact Stories', href: ADMIN_ROUTES.impactStories, icon: BookOpen, iconCls: 'bg-indigo-100 text-indigo-600', description: 'Impact dashboard, aid applications and stories.' },
  { label: 'Donations', href: ADMIN_ROUTES.donations, icon: Heart, iconCls: 'bg-red-100 text-red-500', description: 'Donation records and support programs.' },
];

/**
 * Categories hub: landing page for the "Categories" breadcrumb and the
 * sidebar group — links out to every category section.
 */
export default function CategoriesPage() {
  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-1.5 text-[11px] text-neutral-gray-medium mb-1">
          <Link href="/admin/dashboard" className="hover:text-neutral-black">Dashboard</Link>
          <span>&rsaquo;</span>
          <span className="text-neutral-black font-medium">Categories</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-[#453DD8]/10 flex items-center justify-center flex-shrink-0">
            <Layers className="h-6 w-6 text-[#453DD8]" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-neutral-black leading-tight">Categories</h1>
            <p className="text-xs text-neutral-gray-dark mt-0.5">Browse and manage every category section of the platform.</p>
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {CATEGORIES.map((category) => {
          const Icon = category.icon;
          return (
            <Link
              key={category.href}
              href={category.href}
              className="group rounded-2xl border border-neutral-gray-light bg-white p-5 shadow-sm hover:shadow-md hover:border-[#453DD8]/40 transition-shadow flex items-start gap-4"
            >
              <span className={`w-12 h-12 rounded-xl grid place-items-center flex-shrink-0 ${category.iconCls}`}>
                <Icon className="h-6 w-6" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-bold text-neutral-black">{category.label}</p>
                  <ChevronRight className="h-4 w-4 text-neutral-gray-light group-hover:text-[#453DD8] transition-colors flex-shrink-0" />
                </div>
                <p className="text-xs text-neutral-gray-medium mt-1 leading-relaxed">{category.description}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
