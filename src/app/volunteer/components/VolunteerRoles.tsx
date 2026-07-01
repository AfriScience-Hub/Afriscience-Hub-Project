'use client';

import { Clock, MapPin, CheckCircle2 } from 'lucide-react';

const VOLUNTEER_ROLES = [
  {
    title: 'Competition Judge',
    emoji: '⚖️',
    commitment: '5-10 hrs / event',
    location: 'Remote / On-site',
    description: 'Evaluate entries in annual science and innovation competitions. Share your expertise to identify the most promising African innovations.',
    requirements: ['PhD or equivalent experience', 'Subject matter expertise', 'Impartial evaluation skills'],
  },
  {
    title: 'Research Mentor',
    emoji: '🔬',
    commitment: '2-4 hrs / week',
    location: 'Remote',
    description: 'Guide early-career African researchers through their projects, offering advice on methodology, publishing, and career development.',
    requirements: ['Active researcher or professor', '5+ years research experience', 'Mentoring experience preferred'],
  },
  {
    title: 'Event Volunteer',
    emoji: '🎪',
    commitment: 'Event-based',
    location: 'On-site (various cities)',
    description: 'Help organize and run AfriScienceHub events including conferences, workshops, award ceremonies, and community outreach programs.',
    requirements: ['Strong organizational skills', 'Available for event dates', 'Team player'],
  },
  {
    title: 'Platform Moderator',
    emoji: '🛡️',
    commitment: '3-5 hrs / week',
    location: 'Remote',
    description: 'Review listings, moderate community discussions, and ensure content quality across the AfriScienceHub platform.',
    requirements: ['Familiar with AfriScienceHub platform', 'Attention to detail', 'Good communication skills'],
  },
  {
    title: 'Content Creator',
    emoji: '✍️',
    commitment: '3-6 hrs / week',
    location: 'Remote',
    description: 'Write articles, create social media content, and produce educational materials that highlight African science achievements.',
    requirements: ['Strong writing skills', 'Knowledge of African science landscape', 'Content creation experience'],
  },
  {
    title: 'Translation Volunteer',
    emoji: '🌐',
    commitment: '2-4 hrs / week',
    location: 'Remote',
    description: 'Help translate platform content, research summaries, and educational materials into African languages to improve accessibility.',
    requirements: ['Fluent in English + African language(s)', 'Translation experience', 'Science literacy preferred'],
  },
];

export default function VolunteerRoles() {
  return (
    <section className="bg-neutral-bg-light py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-neutral-black mb-2">Volunteer Roles</h2>
          <p className="text-slate-500">Choose how you'd like to contribute to the ecosystem.</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {VOLUNTEER_ROLES.map((role, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-neutral-gray-light p-6 hover:shadow-md transition-shadow">
              <div className="text-3xl mb-3">{role.emoji}</div>
              <h3 className="font-bold text-neutral-black mb-2">{role.title}</h3>
              <p className="text-sm text-slate-500 mb-4">{role.description}</p>
              <div className="flex flex-col gap-1.5 mb-4 text-xs text-slate-400">
                <div className="flex items-center gap-1.5">
                  <Clock className="h-3 w-3" /> {role.commitment}
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="h-3 w-3" /> {role.location}
                </div>
              </div>
              <div className="space-y-1.5">
                <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Requirements</p>
                {role.requirements.map((req, i) => (
                  <div key={i} className="flex items-start gap-1.5 text-xs text-slate-500">
                    <CheckCircle2 className="h-3 w-3 text-emerald-500 mt-0.5 flex-shrink-0" />
                    {req}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
