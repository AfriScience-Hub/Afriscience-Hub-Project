'use client';

import { FileText, X } from 'lucide-react';

interface PolicyModalProps {
  show: boolean;
  policies?: string[];
  onClose: () => void;
}

export default function PolicyModal({ show, policies, onClose }: PolicyModalProps) {
  if (!show || !policies) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-6 border-b border-neutral-gray-light">
          <h3 className="text-lg font-bold text-neutral-black flex items-center gap-2">
            <FileText className="h-5 w-5 text-neutral-gray-dark" /> Engagement Policies
          </h3>
          <button onClick={onClose} className="h-8 w-8 rounded-full bg-neutral-bg-light flex items-center justify-center hover:bg-neutral-gray-light transition-colors">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="p-6">
          <ol className="space-y-4">
            {policies.map((policy, idx) => (
              <li key={idx} className="flex gap-3">
                <span className="flex-shrink-0 h-6 w-6 rounded-full bg-brand-navy-100 text-brand-navy-900 flex items-center justify-center text-xs font-bold">{idx + 1}</span>
                <p className="text-sm text-neutral-gray-dark leading-relaxed pt-0.5">{policy}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
