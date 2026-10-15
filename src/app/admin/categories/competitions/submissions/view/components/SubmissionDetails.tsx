'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { MapPin, Tag, Flag, Phone, Calendar, FileText, MessageSquare, User } from 'lucide-react';
import type { CompetitionSubmission } from '../../data';

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
 * Body of the View Submission page: gallery + entry info, submitted-by
 * card, key fields and the participant's message.
 */
export default function SubmissionDetails({ submission }: { submission: CompetitionSubmission }) {
  const [activeImg, setActiveImg] = useState(0);

  return (
    <div className="p-5 space-y-5">
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
        <div className="sm:w-64 flex-shrink-0 space-y-3">
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
  );
}
