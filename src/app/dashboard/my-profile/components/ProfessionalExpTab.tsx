'use client';

import { AlertCircle } from 'lucide-react';

interface ProfessionalExpTabProps {
  employmentStatus: string; onEmploymentStatusChange: (v: string) => void;
  occupation: string; onOccupationChange: (v: string) => void;
  industry: string; onIndustryChange: (v: string) => void;
  companyOrganization: string; onCompanyOrganizationChange: (v: string) => void;
  skillsExpertise: string; onSkillsExpertiseChange: (v: string) => void;
  portfolioLinks: string; onPortfolioLinksChange: (v: string) => void;
}

export function ProfessionalExpTab(props: ProfessionalExpTabProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-bold text-neutral-black">Professional Experience</h3>

      <div>
        <label className="block text-sm font-medium text-neutral-gray-dark mb-3">Employment Status</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {['Employed (Full Time)', 'Self Employed (Business Owner)', 'Student', 'Unemployed'].map(status => (
            <button key={status} type="button" onClick={() => props.onEmploymentStatusChange(status)}
              className={`py-3 px-4 rounded-lg border transition-colors text-sm ${props.employmentStatus === status ? 'border-brand-navy-900 bg-brand-navy-900 text-white' : 'border-neutral-gray-light bg-white text-neutral-gray-dark hover:border-brand-navy-900'}`}>
              {status}
            </button>
          ))}
        </div>
      </div>

      {(props.employmentStatus === 'Employed (Full Time)' || props.employmentStatus === 'Self Employed (Business Owner)') && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-neutral-gray-dark mb-2">Occupation</label>
            <input type="text" value={props.occupation} onChange={e => props.onOccupationChange(e.target.value)} placeholder="e.g., Renewable Energy Consultant" className="w-full px-3 py-2 rounded-lg border border-neutral-gray-light bg-neutral-bg-light focus:outline-none focus:border-brand-navy-900" />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-gray-dark mb-2">Industry</label>
            <input type="text" value={props.industry} onChange={e => props.onIndustryChange(e.target.value)} placeholder="e.g., Energy & Power" className="w-full px-3 py-2 rounded-lg border border-neutral-gray-light bg-neutral-bg-light focus:outline-none focus:border-brand-navy-900" />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-gray-dark mb-2">Company / Organization</label>
            <input type="text" value={props.companyOrganization} onChange={e => props.onCompanyOrganizationChange(e.target.value)} placeholder="e.g., GreenTech Solutions" className="w-full px-3 py-2 rounded-lg border border-neutral-gray-light bg-neutral-bg-light focus:outline-none focus:border-brand-navy-900" />
          </div>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-neutral-gray-dark mb-2">Skills / Expertise</label>
        <textarea value={props.skillsExpertise} onChange={e => props.onSkillsExpertiseChange(e.target.value)} rows={3} placeholder="e.g., Solar Energy, Power Systems Design, Project Management, Technical Consulting" className="w-full px-3 py-2 rounded-lg border border-neutral-gray-light bg-neutral-bg-light focus:outline-none focus:border-brand-navy-900 resize-none" />
        <p className="text-xs text-neutral-gray-medium mt-1">Separate multiple skills with commas</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-gray-dark mb-2">Portfolio (Add Links)</label>
        <textarea value={props.portfolioLinks} onChange={e => props.onPortfolioLinksChange(e.target.value)} rows={3} placeholder="https://github.com/username&#10;https://behance.net/username&#10;https://portfolio-site.com" className="w-full px-3 py-2 rounded-lg border border-neutral-gray-light bg-neutral-bg-light focus:outline-none focus:border-brand-navy-900 resize-none" />
        <p className="text-xs text-neutral-gray-medium mt-1">Add one URL per line</p>
      </div>

      <div className="rounded-lg bg-blue-50 border border-blue-200 p-4 flex items-start gap-3">
        <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-blue-900">Financial Information</p>
          <p className="text-xs text-blue-700 mt-1">Payment methods, billing address, and transaction history can be managed in the Dashboard under "Invoices" section.</p>
        </div>
      </div>
    </div>
  );
}
