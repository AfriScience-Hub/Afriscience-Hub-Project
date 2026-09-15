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

function ProjectionCard({
  icon: Icon,
  label,
  year1,
  year2,
  year3,
  tone = 'navy',
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  year1: string;
  year2: string;
  year3: string;
  tone?: 'navy' | 'green' | 'blue' | 'purple' | 'amber';
}) {
  const tones = {
    navy: 'bg-brand-navy-900/5 border-brand-navy-900/10 text-brand-navy-900',
    green: 'bg-green-50 border-green-100 text-green-700',
    blue: 'bg-blue-50 border-blue-100 text-blue-700',
    purple: 'bg-purple-50 border-purple-100 text-purple-700',
    amber: 'bg-amber-50 border-amber-100 text-amber-700',
  };
  const years = [
    { key: '1', label: 'Year 1', value: year1 },
    { key: '2', label: 'Year 2', value: year2 },
    { key: '3', label: 'Year 3', value: year3 },
  ];
  return (
    <div className={`rounded-xl border p-4 sm:col-span-2 lg:col-span-3 ${tones[tone]}`}>
      <div className="flex items-center gap-2 mb-3">
        <Icon className="h-4 w-4" />
        <p className="text-[11px] font-semibold uppercase tracking-wide opacity-80">{label}</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        {years.map((y) => (
          <div
            key={y.key}
            className="rounded-lg bg-white/70 border border-neutral-gray-light/70 p-3 text-center"
          >
            <p className="text-[10px] font-semibold uppercase tracking-wide text-neutral-gray-medium mb-1">
              {y.label}
            </p>
            <p className="text-sm font-bold text-neutral-black">{y.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Infographic({ story }: { story: ImpactStory }) {
  return (
    <div className="p-6 sm:p-8 border-b border-neutral-gray-light">
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
            <ProjectionCard
              icon={TrendingUp}
              label="Employment Projection"
              year1={`${story.careerDetails.employmentProjection.year1} staff`}
              year2={`${story.careerDetails.employmentProjection.year2} staff`}
              year3={`${story.careerDetails.employmentProjection.year3} staff`}
              tone="purple"
            />
            <ProjectionCard
              icon={DollarSign}
              label="Revenue Projection"
              year1={story.careerDetails.revenueProjection.year1}
              year2={story.careerDetails.revenueProjection.year2}
              year3={story.careerDetails.revenueProjection.year3}
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
