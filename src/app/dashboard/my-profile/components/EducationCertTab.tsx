'use client';

import { Upload, Plus, Trash2, CheckCircle, X } from 'lucide-react';
import { Field, SectionCard } from './FieldDisplay';
import { isNoGraduationClassLevel } from '../educationLevels';

interface OtherCert {
  id: string;
  title: string;
  issuer: string;
  year: string;
  file: File | null;
  fileName: string;
}

interface EducationCertTabProps {
  isEditing: boolean;
  educationLevel: string; onEducationLevelChange: (v: string) => void;
  educationLevelOther: string; onEducationLevelOtherChange: (v: string) => void;
  graduationClass: string; onGraduationClassChange: (v: string) => void;
  graduationClassOther: string; onGraduationClassOtherChange: (v: string) => void;
  courseOfStudy: string; onCourseOfStudyChange: (v: string) => void;
  institution: string; onInstitutionChange: (v: string) => void;
  yearOfGraduation: string; onYearOfGraduationChange: (v: string) => void;
  degreeCertFile: File | null;
  degreeCertFileName: string;
  handleDegreeCertUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDegreeCertClear?: () => void;
  otherCerts: OtherCert[];
  onAddOtherCert: () => void;
  onRemoveOtherCert: (id: string) => void;
  onOtherCertChange: (id: string, field: keyof Omit<OtherCert, 'id'>, value: string | File | null) => void;
}

function EducationDisplay(props: EducationCertTabProps) {
  return (
    <div className="space-y-6">
      <SectionCard title="Education Details">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <Field label="Education Level" value={props.educationLevel} />
          <Field label="Graduation Class" value={props.graduationClass} />
          <Field label="Course of Study" value={props.courseOfStudy} />
          <Field label="Institution" value={props.institution} />
          <Field label="Year of Graduation" value={props.yearOfGraduation} />
          <Field label="Degree Certificate" value={props.degreeCertFileName || 'Not uploaded'} />
        </div>
      </SectionCard>

      {props.otherCerts.length > 0 && (
        <SectionCard title="Other Certifications">
          <div className="space-y-3">
            {props.otherCerts.map(cert => (
              <div key={cert.id} className="rounded-lg bg-white border border-neutral-gray-light p-3">
                <div className="grid grid-cols-3 gap-3">
                  <Field label="Title" value={cert.title} />
                  <Field label="Issuer" value={cert.issuer} />
                  <Field label="Year" value={cert.year} />
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      )}
    </div>
  );
}

function EducationForm(props: EducationCertTabProps) {
  const noGraduationClass = isNoGraduationClassLevel(props.educationLevel);
  const inputClass = "w-full px-3 py-2 rounded-lg border border-neutral-gray-light bg-white focus:outline-none focus:border-brand-navy-900";
  const disabledClass = "w-full px-3 py-2 rounded-lg border border-neutral-gray-light bg-neutral-bg-light cursor-not-allowed opacity-50";

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-bold text-neutral-black">Education & Certifications</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-neutral-gray-dark mb-2">Education Level <span className="text-red-600">*</span></label>
          <select value={props.educationLevel} onChange={e => props.onEducationLevelChange(e.target.value)} className={inputClass} required>
            <option value="">Select Education Level</option>
            <option value="Elementary Degree">Elementary Degree</option>
            <option value="Junior High School Degree">Junior High School Degree</option>
            <option value="Senior High School Degree">Senior High School Degree</option>
            <option value="National Diploma">National Diploma</option>
            <option value="Associate Degree">Associate Degree</option>
            <option value="Higher National Diploma">Higher National Diploma</option>
            <option value="Bachelor's Degree">Bachelor&apos;s Degree</option>
            <option value="Postgraduate Diploma">Postgraduate Diploma</option>
            <option value="Master's Degree">Master&apos;s Degree</option>
            <option value="Doctorate Degree">Doctorate Degree</option>
            <option value="Other">Other</option>
          </select>
          {props.educationLevel === 'Other' && (
            <input type="text" value={props.educationLevelOther} onChange={e => props.onEducationLevelOtherChange(e.target.value)} placeholder="Specify education level" className={`mt-2 ${inputClass}`} required />
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-gray-dark mb-2">Graduation Class {noGraduationClass ? <span className="text-neutral-gray-medium">(N/A)</span> : <span className="text-red-600">*</span>}</label>
          <select value={props.graduationClass} onChange={e => props.onGraduationClassChange(e.target.value)} disabled={noGraduationClass} className={noGraduationClass ? disabledClass : inputClass} required={!noGraduationClass}>
            <option value="">Select Graduation Class</option>
            <option value="First Class">First Class</option>
            <option value="Second Class Upper">Second Class Upper</option>
            <option value="Second Class Lower">Second Class Lower</option>
            <option value="Third Class">Third Class</option>
            <option value="Pass">Pass</option>
            <option value="Other">Other</option>
          </select>
          {props.graduationClass === 'Other' && (
            <input type="text" value={props.graduationClassOther} onChange={e => props.onGraduationClassOtherChange(e.target.value)} placeholder="Specify graduation class" className={`mt-2 ${inputClass}`} required />
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-gray-dark mb-2">Course of Study {noGraduationClass ? <span className="text-neutral-gray-medium">(N/A)</span> : <span className="text-red-600">*</span>}</label>
          <input type="text" value={props.courseOfStudy} onChange={e => props.onCourseOfStudyChange(e.target.value)} placeholder="e.g., Electrical Engineering" disabled={noGraduationClass} className={noGraduationClass ? disabledClass : inputClass} required={!noGraduationClass} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-neutral-gray-dark mb-2">Institution Attended <span className="text-red-600">*</span></label>
          <input type="text" value={props.institution} onChange={e => props.onInstitutionChange(e.target.value)} placeholder="Institution Name" className={inputClass} required />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-gray-dark mb-2">Year of Graduation <span className="text-red-600">*</span></label>
          <input type="text" value={props.yearOfGraduation} onChange={e => props.onYearOfGraduationChange(e.target.value)} placeholder="2023" className={inputClass} required />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-gray-dark mb-2">Upload Degree Certificate <span className="text-red-600">*</span></label>
        <div className="flex items-center gap-3">
          <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={props.handleDegreeCertUpload} className="hidden" id="degree-cert-upload" />
          <label htmlFor="degree-cert-upload" className="px-4 py-2 rounded-lg border border-neutral-gray-light bg-white hover:bg-neutral-bg-light cursor-pointer inline-flex items-center gap-2 transition-colors">
            <Upload className="h-4 w-4" /> Choose File
          </label>
          {props.degreeCertFileName && (
            <button type="button" onClick={() => props.onDegreeCertClear?.()} className="text-red-500 hover:text-red-700 cursor-pointer" title="Remove file">
              <X className="h-4 w-4" />
            </button>
          )}
          <span className="text-sm text-neutral-gray-medium">{props.degreeCertFileName || 'No file chosen'}</span>
        </div>
        {props.degreeCertFile && (
          <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
            <CheckCircle className="h-3 w-3" /> Degree certificate added
          </p>
        )}
      </div>

      <div className="pt-4 border-t border-neutral-gray-light">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-base font-bold text-neutral-black">Other Certifications (if any)</h4>
          <button type="button" onClick={props.onAddOtherCert} className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-green-600 border border-green-600 rounded-lg hover:bg-green-50 cursor-pointer transition-colors">
            <Plus className="h-4 w-4" /> Add
          </button>
        </div>

        {props.otherCerts.length === 0 && (
          <p className="text-sm text-neutral-gray-medium">No certifications added yet. Click &quot;Add&quot; to include certifications.</p>
        )}

        {props.otherCerts.map((cert) => (
          <div key={cert.id} className="rounded-lg border border-neutral-gray-light bg-neutral-bg-light p-4 mb-3">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-neutral-black">Certification</span>
              <button type="button" onClick={() => props.onRemoveOtherCert(cert.id)} className="text-red-500 hover:text-red-700 cursor-pointer transition-colors">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-medium text-neutral-gray-dark mb-1">Certificate Title <span className="text-red-600">*</span></label>
                <input type="text" value={cert.title} onChange={e => props.onOtherCertChange(cert.id, 'title', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-neutral-gray-light bg-white focus:outline-none focus:border-brand-navy-900" required />
              </div>
              <div>
                <label className="block text-xs font-medium text-neutral-gray-dark mb-1">Issuer <span className="text-red-600">*</span></label>
                <input type="text" value={cert.issuer} onChange={e => props.onOtherCertChange(cert.id, 'issuer', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-neutral-gray-light bg-white focus:outline-none focus:border-brand-navy-900" required />
              </div>
              <div>
                <label className="block text-xs font-medium text-neutral-gray-dark mb-1">Year <span className="text-red-600">*</span></label>
                <input type="text" value={cert.year} onChange={e => props.onOtherCertChange(cert.id, 'year', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-neutral-gray-light bg-white focus:outline-none focus:border-brand-navy-900" required />
              </div>
            </div>
            <div className="mt-3">
              <label className="block text-xs font-medium text-neutral-gray-dark mb-1">Upload <span className="text-red-600">*</span></label>
              <div className="flex items-center gap-3">
                <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={e => props.onOtherCertChange(cert.id, 'file', e.target.files?.[0] || null)} className="hidden" id={`cert-upload-${cert.id}`} />
                <label htmlFor={`cert-upload-${cert.id}`} className="px-3 py-1.5 text-xs rounded-lg border border-neutral-gray-light bg-white hover:bg-neutral-bg-light cursor-pointer inline-flex items-center gap-1 transition-colors">
                  <Upload className="h-3 w-3" /> Choose File
                </label>
                {cert.fileName && (
                  <button type="button" onClick={() => props.onOtherCertChange(cert.id, 'file', null)} className="text-red-500 hover:text-red-700 cursor-pointer" title="Remove file">
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
                <span className="text-xs text-neutral-gray-medium">{cert.fileName || 'No file chosen'}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function EducationCertTab(props: EducationCertTabProps) {
  return props.isEditing ? <EducationForm {...props} /> : <EducationDisplay {...props} />;
}
