'use client';

import { useState } from 'react';
import { FileText, X, Upload } from 'lucide-react';
import CollapsibleSection from './CollapsibleSection';
import { toast } from 'sonner';

interface DocItem {
  name: string;
  file: File;
  previewUrl: string;
}

interface DocumentsSectionProps {
  certifications: DocItem[];
  setCertifications: React.Dispatch<React.SetStateAction<DocItem[]>>;
}

function truncateName(name: string, max = 30): string {
  if (name.length <= max) return name;
  const ext = name.split('.').pop() || '';
  const base = name.slice(0, name.length - ext.length - 1);
  return `${base.slice(0, max - ext.length - 3)}...${ext}`;
}

export default function DocumentsSection({ certifications, setCertifications }: DocumentsSectionProps) {
  const [docName, setDocName] = useState('');

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !docName.trim()) return;
    const previewUrl = URL.createObjectURL(file);
    setCertifications(prev => [...prev, { name: docName.trim(), file, previewUrl }]);
    setDocName('');
    toast.success('Document added');
    e.target.value = '';
  };

  const removeCert = (idx: number) => {
    setCertifications(prev => {
      const item = prev[idx];
      if (item.previewUrl.startsWith('blob:')) URL.revokeObjectURL(item.previewUrl);
      return prev.filter((_, i) => i !== idx);
    });
  };

  return (
    <CollapsibleSection title="Certifications & documents" icon={<FileText className="h-5 w-5 text-brand-red-600" />} defaultOpen={false}>
      <div className="space-y-4">
        <p className="text-xs text-neutral-gray-medium">Upload licenses, certifications, accreditation documents, and awards (PDF or images).</p>
        {certifications.length > 0 && (
          <div className="space-y-2">
            {certifications.map((cert, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-lg border border-neutral-gray-light bg-neutral-bg-light">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-brand-red-600" />
                  <p className="text-sm text-neutral-black truncate max-w-[200px]">{truncateName(cert.name)}</p>
                </div>
                <button onClick={() => removeCert(idx)} className="text-red-400 hover:text-red-600">
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
        <div className="flex gap-2">
          <input type="text" value={docName} onChange={e => setDocName(e.target.value)} placeholder="Document name" className="flex-1 w-full rounded-lg border border-neutral-gray-light px-4 py-2.5 text-sm" />
          <label className="inline-flex items-center gap-1 cursor-pointer rounded-lg border border-dashed border-brand-red-300 px-4 py-2.5 text-sm font-medium text-brand-red-600 hover:bg-brand-red-50 transition-colors">
            <input type="file" accept=".pdf,.jpg,.jpeg,.png" className="hidden" onChange={handleUpload} />
            <Upload className="h-4 w-4" /> Upload
          </label>
        </div>
      </div>
    </CollapsibleSection>
  );
}
