'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { FileText, MessageSquare } from 'lucide-react';
import type { CompetitionSubmission } from '../../data';

interface SubmissionWorkSummaryProps {
  submission: CompetitionSubmission;
}

/**
 * The submitted work plus its written summary. Used above the scoring sheet
 * on the View Work & Score page.
 */
export default function SubmissionWorkSummary({ submission }: SubmissionWorkSummaryProps) {
  const [activeImg, setActiveImg] = useState(0);

  return (
    <div className="rounded-xl border border-neutral-gray-light bg-white shadow-sm p-4 sm:p-5 space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 min-w-0">
          <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-neutral-gray-light">
            <Image
              src={submission.gallery[activeImg]}
              alt={`${submission.title} preview`}
              fill
              sizes="(max-width: 768px) 100vw, 60vw"
              className="object-cover"
            />
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
        <div className="sm:w-72 flex-shrink-0 space-y-3">
          <div>
            <p className="text-sm font-bold text-neutral-black">{submission.title}</p>
            <p className="text-[11px] text-neutral-gray-medium mt-1">{submission.description}</p>
          </div>
          <p className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-blue-50 text-blue-700">
            <FileText className="h-3 w-3" /> {submission.fileType}
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-neutral-gray-light bg-neutral-bg-light/60 p-4">
        <p className="text-xs font-bold text-neutral-black mb-1.5 flex items-center gap-1.5">
          <MessageSquare className="h-4 w-4 text-neutral-gray-medium" /> Work Summary
        </p>
        <p className="text-xs text-neutral-gray-dark whitespace-pre-wrap">{submission.message}</p>
      </div>
    </div>
  );
}
