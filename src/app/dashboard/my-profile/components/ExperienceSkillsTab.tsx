'use client';

import { Field, SectionCard } from './FieldDisplay';
import { ExperienceForm } from './ExperienceSkillsForm';

interface PastJob {
  id: string;
  organization: string;
  role: string;
  duration: string;
}

interface SkillEntry {
  id: string;
  name: string;
}

interface LanguageEntry {
  id: string;
  name: string;
  proficiency: string;
}

interface PortfolioLink {
  id: string;
  url: string;
  label: string;
}

interface ExperienceSkillsTabProps {
  isEditing: boolean;
  employmentStatus: string; onEmploymentStatusChange: (v: string) => void;
  role: string; onRoleChange: (v: string) => void;
  industry: string; onIndustryChange: (v: string) => void;
  industryOther: string; onIndustryOtherChange: (v: string) => void;
  company: string; onCompanyChange: (v: string) => void;
  workCountry: string; onWorkCountryChange: (v: string) => void;
  resumptionDate: string; onResumptionDateChange: (v: string) => void;
  roleDescription: string; onRoleDescriptionChange: (v: string) => void;
  pastJobs: PastJob[];
  onAddPastJob: () => void;
  onRemovePastJob: (id: string) => void;
  onPastJobChange: (id: string, field: keyof Omit<PastJob, 'id'>, value: string) => void;
  skills: SkillEntry[];
  onAddSkill: () => void;
  onRemoveSkill: (id: string) => void;
  onSkillChange: (id: string, value: string) => void;
  languages: LanguageEntry[];
  onAddLanguage: () => void;
  onRemoveLanguage: (id: string) => void;
  onLanguageChange: (id: string, field: keyof Omit<LanguageEntry, 'id'>, value: string) => void;
  portfolioLinks: PortfolioLink[];
  onAddPortfolioLink: () => void;
  onRemovePortfolioLink: (id: string) => void;
  onPortfolioLinkChange: (id: string, field: keyof Omit<PortfolioLink, 'id'>, value: string) => void;
  cvFile: File | null;
  cvFileName: string;
  handleCvUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCvClear?: () => void;
}

function ExperienceDisplay(props: ExperienceSkillsTabProps) {
  const showCurrent = props.employmentStatus === 'Employed (full time)' || props.employmentStatus === 'Self Employed (business owner)';

  return (
    <div className="space-y-6">
      <SectionCard title="Employment Status">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <Field label="Status" value={props.employmentStatus} />
        </div>
      </SectionCard>

      {showCurrent && (
        <SectionCard title="Current Employment">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <Field label="Role" value={props.role} />
            <Field label="Industry" value={props.industry} />
            <Field label="Company" value={props.company} />
            <Field label="Country" value={props.workCountry} />
            <Field label="Resumption Date" value={props.resumptionDate ? new Date(props.resumptionDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : null} />
          </div>
          <div className="mt-3">
            <Field label="Role Description" value={props.roleDescription} />
          </div>
        </SectionCard>
      )}

      {props.pastJobs.length > 0 && (
        <SectionCard title="Past Employment">
          <div className="space-y-3">
            {props.pastJobs.map(job => (
              <div key={job.id} className="rounded-lg bg-white border border-neutral-gray-light p-3">
                <div className="grid grid-cols-3 gap-3">
                  <Field label="Organization" value={job.organization} />
                  <Field label="Role" value={job.role} />
                  <Field label="Duration" value={job.duration ? `${job.duration} year(s)` : null} />
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      )}

      {props.skills.filter(s => s.name.trim()).length > 0 && (
        <SectionCard title="Skills / Expertise">
          <div className="flex flex-wrap gap-2">
            {props.skills.filter(s => s.name.trim()).map(skill => (
              <span key={skill.id} className="inline-flex px-3 py-1.5 rounded-full border border-neutral-gray-light bg-white text-sm text-neutral-black">
                {skill.name}
              </span>
            ))}
          </div>
        </SectionCard>
      )}

      {props.languages.filter(l => l.name.trim()).length > 0 && (
        <SectionCard title="Languages">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {props.languages.filter(l => l.name.trim()).map(lang => (
              <div key={lang.id}>
                <span className="text-sm font-medium text-neutral-black">{lang.name}</span>
                {lang.proficiency && <span className="text-xs text-neutral-gray-medium ml-1">({lang.proficiency})</span>}
              </div>
            ))}
          </div>
        </SectionCard>
      )}

      {props.portfolioLinks.filter(p => p.url.trim()).length > 0 && (
        <SectionCard title="Portfolio Links">
          <div className="space-y-2">
            {props.portfolioLinks.filter(p => p.url.trim()).map(link => {
              const href = link.url.startsWith('http') ? link.url : `https://${link.url}`;
              return (
                <div key={link.id} className="flex items-center gap-2">
                  <span className="text-sm font-medium text-neutral-black">{link.label || 'Link'}:</span>
                  <a href={href} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline truncate">{link.url}</a>
                </div>
              );
            })}
          </div>
        </SectionCard>
      )}

      <SectionCard title="CV">
        <Field label="CV File" value={props.cvFileName || 'Not uploaded'} />
      </SectionCard>
    </div>
  );
}

export function ExperienceSkillsTab(props: ExperienceSkillsTabProps) {
  return props.isEditing ? <ExperienceForm {...props} /> : <ExperienceDisplay {...props} />;
}
