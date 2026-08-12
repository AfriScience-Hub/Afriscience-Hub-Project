'use client';

import { Plus, Trash2, Upload, CheckCircle } from 'lucide-react';
import { INDUSTRIES, COUNTRIES } from '@/app/support/sponsor/apply/data';

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
}

export function ExperienceSkillsTab(props: ExperienceSkillsTabProps) {
  const showCurrentEmployment = props.employmentStatus === 'Employed (full time)' || props.employmentStatus === 'Self Employed (business owner)';

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-bold text-neutral-black">Experience & Skills</h3>

      <div>
        <label className="block text-sm font-medium text-neutral-gray-dark mb-3">Current Employment Status <span className="text-red-600">*</span></label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {['Employed (full time)', 'Self Employed (business owner)', 'Student', 'Unemployed'].map(status => (
            <button key={status} type="button" onClick={() => props.onEmploymentStatusChange(status)}
              className={`py-3 px-4 rounded-lg border cursor-pointer transition-colors text-sm ${props.employmentStatus === status ? 'border-brand-navy-900 bg-brand-navy-900 text-white' : 'border-neutral-gray-light bg-white text-neutral-gray-dark hover:border-brand-navy-900'}`}>
              {status}
            </button>
          ))}
        </div>
      </div>

      {showCurrentEmployment && (
        <div className="rounded-lg border border-neutral-gray-light bg-neutral-bg-light p-4 space-y-4">
          <h4 className="text-sm font-bold text-neutral-black">Current Employment Details</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-gray-dark mb-2">Role <span className="text-red-600">*</span></label>
              <input type="text" value={props.role} onChange={e => props.onRoleChange(e.target.value)} placeholder="e.g., Renewable Energy Consultant" className="w-full px-3 py-2 rounded-lg border border-neutral-gray-light bg-white focus:outline-none focus:border-brand-navy-900" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-gray-dark mb-2">Industry <span className="text-red-600">*</span></label>
              <select value={props.industry} onChange={e => props.onIndustryChange(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-neutral-gray-light bg-white focus:outline-none focus:border-brand-navy-900" required>
                <option value="">Select Industry</option>
                {INDUSTRIES.map(ind => (
                  <option key={ind} value={ind}>{ind}</option>
                ))}
                <option value="Other">Other</option>
              </select>
              {props.industry === 'Other' && (
                <input type="text" value={props.industryOther} onChange={e => props.onIndustryOtherChange(e.target.value)} placeholder="Specify industry" className="mt-2 w-full px-3 py-2 rounded-lg border border-neutral-gray-light bg-white focus:outline-none focus:border-brand-navy-900" required />
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-gray-dark mb-2">Company / Organization <span className="text-red-600">*</span></label>
              <input type="text" value={props.company} onChange={e => props.onCompanyChange(e.target.value)} placeholder="e.g., GreenTech Solutions" className="w-full px-3 py-2 rounded-lg border border-neutral-gray-light bg-white focus:outline-none focus:border-brand-navy-900" required />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-gray-dark mb-2">Country <span className="text-red-600">*</span></label>
              <select value={props.workCountry} onChange={e => props.onWorkCountryChange(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-neutral-gray-light bg-white focus:outline-none focus:border-brand-navy-900" required>
                <option value="">Select Country</option>
                {COUNTRIES.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-gray-dark mb-2">Resumption Date <span className="text-red-600">*</span></label>
              <input type="date" value={props.resumptionDate} onChange={e => props.onResumptionDateChange(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-neutral-gray-light bg-white focus:outline-none focus:border-brand-navy-900" required />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-gray-dark mb-2">Role Description <span className="text-red-600">*</span></label>
            <textarea value={props.roleDescription} onChange={e => props.onRoleDescriptionChange(e.target.value)} rows={3} placeholder="Describe your responsibilities and achievements..." className="w-full px-3 py-2 rounded-lg border border-neutral-gray-light bg-white focus:outline-none focus:border-brand-navy-900 resize-none" required />
          </div>
        </div>
      )}

      <div className="pt-4 border-t border-neutral-gray-light">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-base font-bold text-neutral-black">Past Employment <span className="text-red-600">*</span></h4>
          <button type="button" onClick={props.onAddPastJob} className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-green-600 border border-green-600 rounded-lg hover:bg-green-50 cursor-pointer transition-colors">
            <Plus className="h-4 w-4" /> Add
          </button>
        </div>

        {props.pastJobs.length === 0 && (
          <p className="text-sm text-neutral-gray-medium">No past employment added yet.</p>
        )}

        {props.pastJobs.map((job) => (
          <div key={job.id} className="rounded-lg border border-neutral-gray-light bg-neutral-bg-light p-4 mb-3">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-neutral-black">Past Employment</span>
              <button type="button" onClick={() => props.onRemovePastJob(job.id)} className="text-red-500 hover:text-red-700 cursor-pointer transition-colors">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-medium text-neutral-gray-dark mb-1">Name of Organization <span className="text-red-600">*</span></label>
                <input type="text" value={job.organization} onChange={e => props.onPastJobChange(job.id, 'organization', e.target.value)} placeholder="Organization Name" className="w-full px-3 py-2 rounded-lg border border-neutral-gray-light bg-white focus:outline-none focus:border-brand-navy-900" required />
              </div>
              <div>
                <label className="block text-xs font-medium text-neutral-gray-dark mb-1">Role <span className="text-red-600">*</span></label>
                <input type="text" value={job.role} onChange={e => props.onPastJobChange(job.id, 'role', e.target.value)} placeholder="e.g., Junior Analyst" className="w-full px-3 py-2 rounded-lg border border-neutral-gray-light bg-white focus:outline-none focus:border-brand-navy-900" required />
              </div>
              <div>
                <label className="block text-xs font-medium text-neutral-gray-dark mb-1">Work Duration (in years) <span className="text-red-600">*</span></label>
                <input type="text" value={job.duration} onChange={e => props.onPastJobChange(job.id, 'duration', e.target.value)} placeholder="e.g., 2" className="w-full px-3 py-2 rounded-lg border border-neutral-gray-light bg-white focus:outline-none focus:border-brand-navy-900" required />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-4 border-t border-neutral-gray-light">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-base font-bold text-neutral-black">Skills / Expertise <span className="text-red-600">*</span></h4>
          <button type="button" onClick={props.onAddSkill} className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-green-600 border border-green-600 rounded-lg hover:bg-green-50 cursor-pointer transition-colors">
            <Plus className="h-4 w-4" /> Add Skills
          </button>
        </div>

        {props.skills.length === 0 && (
          <p className="text-sm text-neutral-gray-medium">No skills added yet. Click "Add Skills" to include your expertise.</p>
        )}

        <div className="flex flex-wrap gap-2">
          {props.skills.map((skill) => (
            <div key={skill.id} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-neutral-gray-light bg-white">
              <input type="text" value={skill.name} onChange={e => props.onSkillChange(skill.id, e.target.value)} placeholder="Skill name" className="text-sm bg-transparent outline-none w-28" />
              <button type="button" onClick={() => props.onRemoveSkill(skill.id)} className="text-red-400 hover:text-red-600 cursor-pointer transition-colors">
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-4 border-t border-neutral-gray-light">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-base font-bold text-neutral-black">Language Proficiency <span className="text-red-600">*</span></h4>
          <button type="button" onClick={props.onAddLanguage} className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-green-600 border border-green-600 rounded-lg hover:bg-green-50 cursor-pointer transition-colors">
            <Plus className="h-4 w-4" /> Add Languages
          </button>
        </div>

        {props.languages.length === 0 && (
          <p className="text-sm text-neutral-gray-medium">No languages added yet. Click "Add Languages" to include languages you speak.</p>
        )}

        {props.languages.map((lang) => (
          <div key={lang.id} className="flex items-center gap-3 mb-2">
            <input type="text" value={lang.name} onChange={e => props.onLanguageChange(lang.id, 'name', e.target.value)} placeholder="Language" className="flex-1 px-3 py-2 rounded-lg border border-neutral-gray-light bg-neutral-bg-light focus:outline-none focus:border-brand-navy-900" />
            <select value={lang.proficiency} onChange={e => props.onLanguageChange(lang.id, 'proficiency', e.target.value)} className="px-3 py-2 rounded-lg border border-neutral-gray-light bg-neutral-bg-light focus:outline-none focus:border-brand-navy-900">
              <option value="">Proficiency</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
              <option value="Native">Native</option>
            </select>
            <button type="button" onClick={() => props.onRemoveLanguage(lang.id)} className="text-red-500 hover:text-red-700 cursor-pointer transition-colors">
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      <div className="pt-4 border-t border-neutral-gray-light">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-base font-bold text-neutral-black">Portfolio (Work Links)</h4>
          <button type="button" onClick={props.onAddPortfolioLink} className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-green-600 border border-green-600 rounded-lg hover:bg-green-50 cursor-pointer transition-colors">
            <Plus className="h-4 w-4" /> Add Links
          </button>
        </div>

        {props.portfolioLinks.length === 0 && (
          <p className="text-sm text-neutral-gray-medium">No work links added yet. Click "Add Links" to include your portfolio.</p>
        )}

        {props.portfolioLinks.map((link) => (
          <div key={link.id} className="flex items-center gap-3 mb-2">
            <input type="text" value={link.label} onChange={e => props.onPortfolioLinkChange(link.id, 'label', e.target.value)} placeholder="Label (e.g., GitHub)" className="w-40 px-3 py-2 rounded-lg border border-neutral-gray-light bg-neutral-bg-light focus:outline-none focus:border-brand-navy-900" />
            <input type="url" value={link.url} onChange={e => props.onPortfolioLinkChange(link.id, 'url', e.target.value)} placeholder="https://..." className="flex-1 px-3 py-2 rounded-lg border border-neutral-gray-light bg-neutral-bg-light focus:outline-none focus:border-brand-navy-900" />
            <button type="button" onClick={() => props.onRemovePortfolioLink(link.id)} className="text-red-500 hover:text-red-700 cursor-pointer transition-colors">
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      <div className="pt-4 border-t border-neutral-gray-light">
        <label className="block text-sm font-medium text-neutral-gray-dark mb-2">Upload CV <span className="text-red-600">*</span></label>
        <div className="flex items-center gap-3">
          <input type="file" accept=".pdf" onChange={props.handleCvUpload} className="hidden" id="cv-upload" />
          <label htmlFor="cv-upload" className="px-4 py-2 rounded-lg border border-neutral-gray-light bg-white hover:bg-neutral-bg-light cursor-pointer inline-flex items-center gap-2 transition-colors">
            <Upload className="h-4 w-4" />
            Choose File
          </label>
          <span className="text-sm text-neutral-gray-medium">{props.cvFileName || 'No file chosen'}</span>
        </div>
        {props.cvFile && (
          <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
            <CheckCircle className="h-3 w-3" /> CV uploaded
          </p>
        )}
      </div>
    </div>
  );
}
