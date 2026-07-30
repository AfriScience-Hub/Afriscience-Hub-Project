'use client';

import { Upload, Plus, Trash2, CheckCircle } from 'lucide-react';

interface OtherCert {
  id: string;
  title: string;
  issuer: string;
  year: string;
  file: File | null;
  fileName: string;
}

interface EducationCertTabProps {
  educationLevel: string; onEducationLevelChange: (v: string) => void;
  graduationClass: string; onGraduationClassChange: (v: string) => void;
  courseOfStudy: string; onCourseOfStudyChange: (v: string) => void;
  institution: string; onInstitutionChange: (v: string) => void;
  yearOfGraduation: string; onYearOfGraduationChange: (v: string) => void;
  degreeCertFile: File | null;
  degreeCertFileName: string;
  handleDegreeCertUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  otherCerts: OtherCert[];
  onAddOtherCert: () => void;
  onRemoveOtherCert: (id: string) => void;
  onOtherCertChange: (id: string, field: keyof Omit<OtherCert, 'id'>, value: string | File | null) => void;
}

export function EducationCertTab(props: EducationCertTabProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-bold text-neutral-black">Education & Certifications</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-neutral-gray-dark mb-2">Education Level <span className="text-red-600">*</span></label>
          <select value={props.educationLevel} onChange={e => props.onEducationLevelChange(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-neutral-gray-light bg-neutral-bg-light focus:outline-none focus:border-brand-navy-900" required>
            <option value="">Select Education Level</option>
            <option value="High School">High School</option>
            <option value="National Diploma">National Diploma</option>
            <option value="Associate Degree">Associate Degree</option>
            <option value="Higher National Diploma">Higher National Diploma</option>
            <option value="Bachelor's Degree">Bachelor's Degree</option>
            <option value="Postgraduate Diploma">Postgraduate Diploma</option>
            <option value="Master's Degree">Master's Degree</option>
            <option value="Doctorate Degree">Doctorate Degree</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-gray-dark mb-2">Graduation Class <span className="text-red-600">*</span></label>
          <select value={props.graduationClass} onChange={e => props.onGraduationClassChange(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-neutral-gray-light bg-neutral-bg-light focus:outline-none focus:border-brand-navy-900" required>
            <option value="">Select Graduation Class</option>
            <option value="First Class">First Class</option>
            <option value="Second Class Upper">Second Class Upper</option>
            <option value="Second Class Lower">Second Class Lower</option>
            <option value="Third Class">Third Class</option>
            <option value="Pass">Pass</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-gray-dark mb-2">Course of Study <span className="text-red-600">*</span></label>
          <input type="text" value={props.courseOfStudy} onChange={e => props.onCourseOfStudyChange(e.target.value)} placeholder="e.g., Electrical Engineering" className="w-full px-3 py-2 rounded-lg border border-neutral-gray-light bg-neutral-bg-light focus:outline-none focus:border-brand-navy-900" required />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-neutral-gray-dark mb-2">Institution Attended <span className="text-red-600">*</span></label>
          <input type="text" value={props.institution} onChange={e => props.onInstitutionChange(e.target.value)} placeholder="Institution Name" className="w-full px-3 py-2 rounded-lg border border-neutral-gray-light bg-neutral-bg-light focus:outline-none focus:border-brand-navy-900" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-gray-dark mb-2">Year of Graduation <span className="text-red-600">*</span></label>
          <input type="text" value={props.yearOfGraduation} onChange={e => props.onYearOfGraduationChange(e.target.value)} placeholder="2023" className="w-full px-3 py-2 rounded-lg border border-neutral-gray-light bg-neutral-bg-light focus:outline-none focus:border-brand-navy-900" required />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-gray-dark mb-2">Upload Degree Certificate <span className="text-red-600">*</span></label>
        <div className="flex items-center gap-3">
          <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={props.handleDegreeCertUpload} className="hidden" id="degree-cert-upload" />
          <label htmlFor="degree-cert-upload" className="px-4 py-2 rounded-lg border border-neutral-gray-light bg-white hover:bg-neutral-bg-light cursor-pointer inline-flex items-center gap-2 transition-colors">
            <Upload className="h-4 w-4" />
            Choose File
          </label>
          <span className="text-sm text-neutral-gray-medium">{props.degreeCertFileName || 'No file chosen'}</span>
        </div>
        {props.degreeCertFile && (
          <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
            <CheckCircle className="h-3 w-3" /> Degree certificate uploaded
          </p>
        )}
      </div>

      <div className="pt-4 border-t border-neutral-gray-light">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-base font-bold text-neutral-black">Other Certifications (if any)</h4>
          <button type="button" onClick={props.onAddOtherCert} className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-green-600 border border-green-600 rounded-lg hover:bg-green-50 transition-colors">
            <Plus className="h-4 w-4" /> Add
          </button>
        </div>

        {props.otherCerts.length === 0 && (
          <p className="text-sm text-neutral-gray-medium">No certifications added yet. Click "Add" to include certifications.</p>
        )}

        {props.otherCerts.map((cert) => (
          <div key={cert.id} className="rounded-lg border border-neutral-gray-light bg-neutral-bg-light p-4 mb-3">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-neutral-black">Certification</span>
              <button type="button" onClick={() => props.onRemoveOtherCert(cert.id)} className="text-red-500 hover:text-red-700 transition-colors">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-medium text-neutral-gray-dark mb-1">Certificate Title <span className="text-red-600">*</span></label>
                <input type="text" value={cert.title} onChange={e => props.onOtherCertChange(cert.id, 'title', e.target.value)} placeholder="e.g., AWS Certified Solutions Architect" className="w-full px-3 py-2 rounded-lg border border-neutral-gray-light bg-white focus:outline-none focus:border-brand-navy-900" required />
              </div>
              <div>
                <label className="block text-xs font-medium text-neutral-gray-dark mb-1">Issuer <span className="text-red-600">*</span></label>
                <input type="text" value={cert.issuer} onChange={e => props.onOtherCertChange(cert.id, 'issuer', e.target.value)} placeholder="e.g., Amazon Web Services" className="w-full px-3 py-2 rounded-lg border border-neutral-gray-light bg-white focus:outline-none focus:border-brand-navy-900" required />
              </div>
              <div>
                <label className="block text-xs font-medium text-neutral-gray-dark mb-1">Year <span className="text-red-600">*</span></label>
                <input type="text" value={cert.year} onChange={e => props.onOtherCertChange(cert.id, 'year', e.target.value)} placeholder="2024" className="w-full px-3 py-2 rounded-lg border border-neutral-gray-light bg-white focus:outline-none focus:border-brand-navy-900" required />
              </div>
            </div>
            <div className="mt-3">
              <label className="block text-xs font-medium text-neutral-gray-dark mb-1">Upload <span className="text-red-600">*</span></label>
              <div className="flex items-center gap-3">
                <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={e => props.onOtherCertChange(cert.id, 'file', e.target.files?.[0] || null)} className="hidden" id={`cert-upload-${cert.id}`} />
                <label htmlFor={`cert-upload-${cert.id}`} className="px-3 py-1.5 text-xs rounded-lg border border-neutral-gray-light bg-white hover:bg-neutral-bg-light cursor-pointer inline-flex items-center gap-1 transition-colors">
                  <Upload className="h-3 w-3" />
                  Choose File
                </label>
                <span className="text-xs text-neutral-gray-medium">{cert.fileName || 'No file chosen'}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
