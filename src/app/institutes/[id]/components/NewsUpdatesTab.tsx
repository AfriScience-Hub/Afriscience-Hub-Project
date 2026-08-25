'use client';

import { Calendar, Bell, Newspaper, Users, BookOpen, Star, GraduationCap, Clock, Building2 } from 'lucide-react';

interface Institute {
  [key: string]: any;
}

const SECTION_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  'Faculties & Departments': Building2,
  'Pre-Degree (Basic)': BookOpen,
  'Post-UTME': Bell,
  'Undergraduate Studies': GraduationCap,
  'JUPEB': Star,
  'Sandwich Programme': Users,
  'Postgraduate Studies': Clock,
  'Part-Time': Calendar,
  'Events': Newspaper,
};

export default function NewsUpdatesTab({ institute }: { institute: Institute }) {
  const news = institute.newsUpdates;
  if (!news) return null;

  const sections = Object.entries(news);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-gray-light">
        <h3 className="text-lg font-bold text-neutral-black mb-2 flex items-center gap-2">
          <Bell className="h-5 w-5 text-brand-red-600" /> News & Updates
        </h3>
        <p className="text-sm text-neutral-gray-medium mb-6">Latest updates on admissions, events, and announcements.</p>

        {sections.map(([sectionName, sectionData]: [string, any], idx: number) => {
          const Icon = SECTION_ICONS[sectionName] || Bell;
          const isFlat = typeof sectionData === 'string';
          return (
            <div key={idx} className={`mb-6 last:mb-0 p-5 rounded-xl border ${idx % 2 === 0 ? 'bg-blue-50/50 border-blue-100' : 'bg-green-50/50 border-green-100'}`}>
              <h4 className="font-bold text-neutral-black mb-3 flex items-center gap-2">
                <Icon className="h-4 w-4 text-brand-navy-900" />
                {sectionName}
              </h4>
              {isFlat ? (
                <p className="text-sm text-neutral-gray-medium">{sectionData}</p>
              ) : (
                <div className="grid gap-2 sm:grid-cols-2">
                  {Object.entries(sectionData).map(([key, value]: [string, any]) => (
                    <div key={key} className="flex items-start gap-2 text-sm">
                      <span className="text-xs font-bold text-brand-navy-900 uppercase mt-0.5 w-28 shrink-0">{key}:</span>
                      <span className="text-neutral-gray-dark">{value}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
