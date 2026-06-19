'use client';

import { X, Award, Medal, Image as ImageIcon } from 'lucide-react';

type PreviewModalProps = {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  title: string;
};

export default function PreviewModal({ isOpen, onClose, imageUrl, title }: PreviewModalProps) {
  if (!isOpen) return null;

  const getIcon = () => {
    const t = title.toLowerCase();
    if (t.includes('badge')) return <Award className="h-5 w-5 text-amber-500" />;
    if (t.includes('medal')) return <Medal className="h-5 w-5 text-amber-500" />;
    if (t.includes('certificate')) return <Award className="h-5 w-5 text-amber-500" />;
    return <ImageIcon className="h-5 w-5 text-amber-500" />;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="relative max-w-2xl w-full rounded-xl overflow-hidden shadow-2xl bg-white" onClick={e => e.stopPropagation()}>
        <div className="p-4 border-b border-neutral-gray-light flex items-center justify-between">
          <div className="flex items-center gap-2">
            {getIcon()}
            <h3 className="font-bold text-neutral-black">{title}</h3>
          </div>
          <button onClick={onClose} className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="p-4">
          <img src={imageUrl} alt={title} className="w-full rounded-lg object-contain max-h-[60vh]" />
        </div>
      </div>
    </div>
  );
}
