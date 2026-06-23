'use client';

import { Upload, CheckCircle } from 'lucide-react';

interface EducationSkillsTabProps {
  educationLevel: string; onEducationLevelChange: (v: string) => void;
  graduationClass: string; onGraduationClassChange: (v: string) => void;
  institution: string; onInstitutionChange: (v: string) => void;
  courseOfStudy: string; onCourseOfStudyChange: (v: string) => void;
  yearOfGraduation: string; onYearOfGraduationChange: (v: string) => void;
  completedNYSC: string; onCompletedNYSCChange: (v: string) => void;
  skillLevel: string; onSkillLevelChange: (v: string) => void;
  englishProficiency: string; onEnglishProficiencyChange: (v: string) => void;
  otherLanguages: string; onOtherLanguagesChange: (v: string) => void;
  cvFile: File | null;
  linkedinUrl: string; onLinkedinUrlChange: (v: string) => void;
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function EducationSkillsTab(props: EducationSkillsTabProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-bold text-neutral-black">Education and Skills</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-neutral-gray-dark mb-2">Education Level</label>
          <select value={props.educationLevel} onChange={e => props.onEducationLevelChange(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-neutral-gray-light bg-neutral-bg-light focus:outline-none focus:border-brand-navy-900">
            <option value="">Select Education Level</option>
            <option value="High School">High School</option>
            <option value="Associate Degree">Associate Degree</option>
            <option value="Bachelor's Degree">Bachelor's Degree</option>
            <option value="Master's Degree">Master's Degree</option>
            <option value="Doctorate">Doctorate</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-gray-dark mb-2">Institution Attended</label>
          <input type="text" value={props.institution} onChange={e => props.onInstitutionChange(e.target.value)} placeholder="Institution Name" className="w-full px-3 py-2 rounded-lg border border-neutral-gray-light bg-neutral-bg-light focus:outline-none focus:border-brand-navy-900" />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-gray-dark mb-2">Course of Study</label>
          <input type="text" value={props.courseOfStudy} onChange={e => props.onCourseOfStudyChange(e.target.value)} placeholder="Electrical Engineering" className="w-full px-3 py-2 rounded-lg border border-neutral-gray-light bg-neutral-bg-light focus:outline-none focus:border-brand-navy-900" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-neutral-gray-dark mb-2">Year of Graduation</label>
          <input type="text" value={props.yearOfGraduation} onChange={e => props.onYearOfGraduationChange(e.target.value)} placeholder="2023" className="w-full px-3 py-2 rounded-lg border border-neutral-gray-light bg-neutral-bg-light focus:outline-none focus:border-brand-navy-900" />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-gray-dark mb-2">Graduation Class</label>
          <select value={props.graduationClass} onChange={e => props.onGraduationClassChange(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-neutral-gray-light bg-neutral-bg-light focus:outline-none focus:border-brand-navy-900">
            <option value="">Select Graduation Class</option>
            <option value="First Class">First Class</option>
            <option value="Second Class Upper">Second Class Upper</option>
            <option value="Second Class Lower">Second Class Lower</option>
            <option value="Third Class">Third Class</option>
            <option value="Pass">Pass</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-gray-dark mb-2">Have you completed NYSC?</label>
          <div className="flex gap-4 pt-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" value="Yes" checked={props.completedNYSC === 'Yes'} onChange={e => props.onCompletedNYSCChange(e.target.value)} className="h-4 w-4 text-brand-navy-900" />
              <span className="text-sm">Yes</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" value="No" checked={props.completedNYSC === 'No'} onChange={e => props.onCompletedNYSCChange(e.target.value)} className="h-4 w-4 text-brand-navy-900" />
              <span className="text-sm">No</span>
            </label>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-gray-dark mb-2">Upload your CV (PDF)</label>
        <div className="flex items-center gap-3">
          <input type="file" accept=".pdf" onChange={props.handleFileUpload} className="hidden" id="cv-upload" />
          <label htmlFor="cv-upload" className="px-4 py-2 rounded-lg border border-neutral-gray-light bg-white hover:bg-neutral-bg-light cursor-pointer inline-flex items-center gap-2 transition-colors">
            <Upload className="h-4 w-4" />
            Choose File
          </label>
          <span className="text-sm text-neutral-gray-medium">{props.cvFile ? props.cvFile.name : 'No file chosen'}</span>
        </div>
        {props.cvFile && (
          <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
            <CheckCircle className="h-3 w-3" /> Current CV: View uploaded CV
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-gray-dark mb-2">Please share the url to your LinkedIn profile</label>
        <input type="url" value={props.linkedinUrl} onChange={e => props.onLinkedinUrlChange(e.target.value)} placeholder="https://www.linkedin.com/in/claire-iwu" className="w-full px-3 py-2 rounded-lg border border-neutral-gray-light bg-neutral-bg-light focus:outline-none focus:border-brand-navy-900" />
      </div>

      <h3 className="text-lg font-bold text-neutral-black pt-4">Skill Level</h3>
      <div className="flex gap-4">
        {['Beginner', 'Intermediate', 'Advanced'].map(level => (
          <button key={level} type="button" onClick={() => props.onSkillLevelChange(level)}
            className={`flex-1 py-3 rounded-lg border transition-colors ${props.skillLevel === level ? 'border-brand-navy-900 bg-brand-navy-900 text-white' : 'border-neutral-gray-light bg-white text-neutral-gray-dark hover:border-brand-navy-900'}`}>
            {level}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-neutral-gray-dark mb-2">English Proficiency</label>
          <select value={props.englishProficiency} onChange={e => props.onEnglishProficiencyChange(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-neutral-gray-light bg-neutral-bg-light focus:outline-none focus:border-brand-navy-900">
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
            <option value="Native">Native</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-gray-dark mb-2">Other Languages</label>
          <input type="text" value={props.otherLanguages} onChange={e => props.onOtherLanguagesChange(e.target.value)} placeholder="Igbo, Yoruba, Hausa" className="w-full px-3 py-2 rounded-lg border border-neutral-gray-light bg-neutral-bg-light focus:outline-none focus:border-brand-navy-900" />
        </div>
      </div>
    </div>
  );
}
