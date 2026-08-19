'use client';

import {
  DollarSign,
  Briefcase,
  Users,
  MapPin,
  TrendingUp,
  FlaskConical,
  GraduationCap,
  Building2,
  Calendar,
  Beaker,
} from 'lucide-react';
import type { ImpactStory } from '@/app/data/impactData';

function Cell({
  icon: Icon,
  label,
  value,
  tone = 'navy',
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  tone?: 'navy' | 'green' | 'blue' | 'purple' | 'amber';
}) {
  const tones = {
    navy: 'bg-brand-navy-900/5 border-brand-navy-900/10 text-brand-navy-900',
    green: 'bg-green-50 border-green-100 text-green-700',
    blue: 'bg-blue-50 border-blue-100 text-blue-700',
    purple: 'bg-purple-50 border-purple-100 text-purple-700',
    amber: 'bg-amber-50 border-amber-100 text-amber-700',
  };
  return (
    <div className={`rounded-xl border p-4 ${tones[tone]}`}>
      <div className="flex items-center gap-2 mb-2">
        <Icon className="h-4 w-4" />
        <p className="text-[11px] font-semibold uppercase tracking-wide opacity-80">{label}</p>
      </div>
      <p className="text-sm font-bold text-neutral-black leading-snug">{value}</p>
    </div>
  );
}

export default function Infographic({ story }: { story: ImpactStory }) {
  return (
    <div className="p-6 sm:p-8 border-b border-neutral-gray-light">
      <h2 className="text-xl font-bold text-neutral-black mb-5">Infographic</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <Cell icon={DollarSign} label="Funds Utilized" value={story.fundsUtilized} tone="green" />

        {story.program === 'Career Support' && story.careerDetails && (
          <>
            <Cell icon={Briefcase} label="Career Path" value={story.careerPath ?? '—'} tone="navy" />
            <Cell
              icon={Users}
              label="No. of Owners"
              value={String(story.noOfOwners ?? 0)}
              tone="blue"
            />
            <Cell
              icon={MapPin}
              label="Company Address"
              value={story.careerDetails.companyAddress}
              tone="amber"
            />
            <Cell
              icon={TrendingUp}
              label="Employment Projection"
              value={`1st: ${story.careerDetails.employmentProjection.year1} · 2nd: ${story.careerDetails.employmentProjection.year2} · 3rd: ${story.careerDetails.employmentProjection.year3}`}
              tone="purple"
            />
            <Cell
              icon={DollarSign}
              label="Revenue Projection"
              value={`1st: ${story.careerDetails.revenueProjection.year1} · 2nd: ${story.careerDetails.revenueProjection.year2} · 3rd: ${story.careerDetails.revenueProjection.year3}`}
              tone="green"
            />
          </>
        )}

        {story.program === 'Research Support' && story.researchDetails && (
          <>
            <Cell
              icon={FlaskConical}
              label="Research Category"
              value={story.researchDetails.researchCategory}
              tone="navy"
            />
            <Cell
              icon={GraduationCap}
              label="Research Level"
              value={story.researchLevel ?? '—'}
              tone="blue"
            />
            <Cell
              icon={Users}
              label="No. of Researchers"
              value={String(story.noOfResearchers ?? 0)}
              tone="purple"
            />
            <Cell
              icon={Calendar}
              label="Research Duration"
              value={story.researchDetails.researchDuration}
              tone="amber"
            />
            <Cell
              icon={Beaker}
              label="Sample Size"
              value={story.researchDetails.sampleSize}
              tone="green"
            />
          </>
        )}

        {story.program === 'Educational Scholarship' && story.scholarshipDetails && (
          <>
            <Cell
              icon={GraduationCap}
              label="Scholarship Level"
              value={story.scholarshipLevel ?? '—'}
              tone="navy"
            />
            <Cell
              icon={TrendingUp}
              label="Initial CGPA"
              value={story.initialCgpa ?? '—'}
              tone="blue"
            />
            <Cell
              icon={Calendar}
              label="Academic Year"
              value={story.scholarshipDetails.academicYear}
              tone="purple"
            />
            <Cell
              icon={Building2}
              label="Name of Institution"
              value={story.scholarshipDetails.institutionName}
              tone="amber"
            />
            <Cell
              icon={MapPin}
              label="Address of Institution"
              value={story.scholarshipDetails.institutionAddress}
              tone="green"
            />
          </>
        )}
      </div>
    </div>
  );
}
