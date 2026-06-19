'use client';

import { FileText, X, Upload } from 'lucide-react';
import CollapsibleSection from './CollapsibleSection';

interface DocumentsSectionProps {
  certifications: { name: string; file: string }[];
  setCertifications: (v: { name: string; file: string }[] | ((prev: { name: string; file: string }[]) => { name: string; file: string }[])) => void;
  handleAddCertification: () => void;
}

export default function DocumentsSection({ certifications, setCertifications, handleAddCertification }: DocumentsSectionProps) {
  return (
    <CollapsibleSection title="Certifications & Documents" icon={<FileText className="h-5 w-5 text-brand-red-600" />} defaultOpen={false}>
      <div className="space-y-4">
        <p className="text-xs text-neutral-gray-medium">Upload licenses, certifications, accreditation documents, and awards (PDF or images).</p>
        {certifications.length > 0 && (
          <div className="space-y-2">
            {certifications.map((cert, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-lg border border-neutral-gray-light bg-neutral-bg-light">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-brand-red-600" />
                  <p className="text-sm text-neutral-black">{cert.name}</p>
                </div>
                <button onClick={() => setCertifications(prev => prev.filter((_, i) => i !== idx))} className="text-red-400 hover:text-red-600">
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
        <button
          type="button"
          onClick={handleAddCertification}
          className="inline-flex items-center gap-2 rounded-lg border border-dashed border-brand-red-300 px-4 py-3 text-sm font-medium text-brand-red-600 hover:bg-brand-red-50 transition-colors w-full justify-center"
        >
          <Upload className="h-4 w-4" /> Upload Document (PDF, JPG, PNG)
        </button>
      </div>
    </CollapsibleSection>
  );
}
