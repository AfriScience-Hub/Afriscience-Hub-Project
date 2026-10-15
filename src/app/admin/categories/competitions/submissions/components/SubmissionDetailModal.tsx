'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { X, MapPin, Tag, Flag, Phone, Calendar, FileText, MessageSquare, User } from 'lucide-react';
import type { CompetitionSubmission } from '../data';

interface SubmissionDetailModalProps {
  submission: CompetitionSubmission | null;
  open: boolean;
  onClose: () => void;
}

function Field({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="flex items-start gap-2.5">
      <Icon className="h-4 w-4 text-neutral-gray-medium mt-0.5 flex-shrink-0" />
      <div className="min-w-0">
        <p className="text-[10px] text-neutral-gray-medium">{label}</p>
        <p className="text-xs font-medium text-neutral-black break-words">{value}</p>
      </div>
    </div>
  );
}

/**
 * "View Full Submission" modal. Replaces the old right-side detail panel:
 * gallery + entry info, submitted-by, key fields and the participant's message.
 */
export default function SubmissionDetailModal({ submission, open, onClose }: SubmissionDetailModalProps) {
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    if (open) setActiveImg(0);
  }, [open, submission?.id]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open || !submission) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl my-8 flex flex-col max-h-[90vh]">
        <div className="px-5 py-4 border-b border-neutral-gray-light flex items-start justify-between gap-3 shrink-0">
          <div className="min-w-0">
            <h2 className="text-base font-bold text-neutral-black truncate">{submission.title}</h2>
            <p className="text-xs text-neutral-gray-medium">{submission.type} &middot; {submission.category}</p>
          </div>
          <button onClick={onClose} aria-label="Close" className="h-9 w-9 rounded-full bg-neutral-bg-light hover:bg-neutral-gray-light flex items-center justify-center cursor-pointer flex-shrink-0">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 min-w-0">
              <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-neutral-gray-light">
                <Image src={submission.gallery[activeImg]} alt={`${submission.title} preview`} fill sizes="(max-width: 768px) 100vw, 60vw" className="object-cover" />
              </div>
              <div className="flex gap-2 mt-2">
                {submission.gallery.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    aria-label={`View image ${i + 1}`}
                    className={`relative w-14 h-14 rounded-lg overflow-hidden border-2 cursor-pointer ${i === activeImg ? 'border-[#453DD8]' : 'border-transparent opacity-70 hover:opacity-100'}`}
                  >
                    <Image src={img} alt="" fill sizes="56px" className="object-cover" />
                  </button>
                ))}
              </div>
            </div>
            <div className="sm:w-56 flex-shrink-0 space-y-3">
              <div>
                <p className="text-sm font-bold text-neutral-black">{submission.title}</p>
                <p className="text-[11px] text-neutral-gray-medium mt-1">{submission.description}</p>
              </div>
              <div className="flex items-center gap-2.5 pt-3 border-t border-neutral-gray-light">
                <Image src={submission.avatar} alt={submission.participant} width={36} height={36} className="h-9 w-9 rounded-full object-cover flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-neutral-black flex items-center gap-1">
                    <User className="h-3 w-3 text-neutral-gray-medium" /> {submission.participant}
                  </p>
                  <p className="text-[10px] text-neutral-gray-medium truncate">{submission.email}</p>
                </div>
              </div>
              <p className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-blue-50 text-blue-700">
                <FileText className="h-3 w-3" /> {submission.fileType}
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4 border-t border-neutral-gray-light">
            <Field icon={Tag} label="Category" value={submission.category} />
            <Field icon={Flag} label="Competition Type" value={submission.type} />
            <Field icon={MapPin} label="Country" value={submission.country} />
            <Field icon={Phone} label="Contact" value={submission.contact} />
            <Field icon={Calendar} label="Submission Date" value={`${submission.submittedOn} at ${submission.submittedTime}`} />
            <Field icon={FileText} label="File Type" value={submission.fileType} />
          </div>

          <div className="rounded-xl border border-neutral-gray-light bg-neutral-bg-light/60 p-4">
            <p className="text-xs font-bold text-neutral-black mb-1.5 flex items-center gap-1.5">
              <MessageSquare className="h-4 w-4 text-neutral-gray-medium" /> Message from Participant
            </p>
            <p className="text-xs text-neutral-gray-dark whitespace-pre-wrap">{submission.message}</p>
          </div>
        </div>

        <div className="px-5 py-3 border-t border-neutral-gray-light flex justify-end shrink-0">
          <button onClick={onClose} className="px-4 py-2 rounded-lg border border-neutral-gray-light bg-white text-xs font-medium text-neutral-gray-dark hover:bg-neutral-bg-light cursor-pointer">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
