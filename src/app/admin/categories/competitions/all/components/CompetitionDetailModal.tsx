'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { X, Trophy, Flag, Ticket, Users, Calendar, Film, Mail } from 'lucide-react';
import { formatDate, formatRegFee, getStatus, type AllCompetition } from '../data';

interface CompetitionDetailModalProps {
  competition: AllCompetition | null;
  /** Judge emails already assigned to this competition */
  judgeEmails: string[];
  open: boolean;
  onClose: () => void;
}

/** Numbered section header in the style of the create-competition form. */
function Section({ number, title, children }: { number: number; title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center gap-2.5 mb-3">
        <span className="w-6 h-6 rounded-full bg-[#453DD8] text-white text-[11px] font-bold grid place-items-center flex-shrink-0">
          {number}
        </span>
        <h3 className="text-sm font-bold text-neutral-black">{title}</h3>
      </div>
      {children}
    </div>
  );
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

function BulletList({ items }: { items: string[] }) {
  if (items.length === 0) return <p className="text-xs text-neutral-gray-medium">None listed.</p>;
  return (
    <ul className="space-y-1.5">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2.5 text-xs text-neutral-gray-dark">
          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-neutral-black flex-shrink-0" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/**
 * "View" modal for the All Competitions table: the full competition
 * record laid out in the same numbered sections as the create form.
 */
export default function CompetitionDetailModal({ competition, judgeEmails, open, onClose }: CompetitionDetailModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open || !competition) return null;

  const status = getStatus(competition);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl flex flex-col max-h-[88vh]">
        <div className="px-5 py-4 border-b border-neutral-gray-light flex items-start justify-between gap-3 shrink-0">
          <div className="min-w-0 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center flex-shrink-0">
              <Trophy className="h-5 w-5 text-purple-600" />
            </div>
            <div className="min-w-0">
              <h2 className="text-base font-bold text-neutral-black leading-tight">{competition.name}</h2>
              <p className="text-xs text-neutral-gray-medium">{competition.type} &middot; {competition.category}</p>
            </div>
          </div>
          <button onClick={onClose} aria-label="Close" className="h-9 w-9 rounded-full bg-neutral-bg-light hover:bg-neutral-gray-light flex items-center justify-center cursor-pointer flex-shrink-0">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          <div className="relative w-full h-40 rounded-xl overflow-hidden border border-neutral-gray-light">
            <Image src={competition.cover} alt={competition.name} fill sizes="(max-width: 672px) 100vw, 672px" className="object-cover" />
            <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded text-[11px] font-semibold bg-white/90 text-neutral-black">
              {status}
            </span>
          </div>

          <Section number={1} title="Basic Information">
            <div className="grid sm:grid-cols-2 gap-x-4 gap-y-3">
              <Field icon={Trophy} label="Type" value={competition.type} />
              <Field icon={Flag} label="Category" value={competition.category} />
              <Field icon={Ticket} label="Registration Fee (USD)" value={formatRegFee(competition.regFee)} />
              <Field icon={Flag} label="Country" value={competition.country} />
              <Field icon={Calendar} label="Start Date & Time" value={formatDate(competition.startISO)} />
              <Field icon={Calendar} label="Submission Deadline" value={formatDate(competition.submissionISO)} />
              <Field icon={Calendar} label="Voting Deadline" value={formatDate(competition.deadlineISO)} />
              <Field icon={Users} label="Participants" value={competition.participants.toLocaleString()} />
              <Field icon={Calendar} label="Date Created" value={formatDate(competition.createdISO)} />
              <div className="flex items-start gap-2.5">
                <Film className="h-4 w-4 text-neutral-gray-medium mt-0.5 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-[10px] text-neutral-gray-medium">Media Types</p>
                  <div className="flex flex-wrap gap-1 mt-0.5">
                    {competition.mediaTypes.map((m) => (
                      <span key={m} className="px-2 py-0.5 rounded text-[11px] font-medium bg-blue-50 text-blue-700">{m}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Section>

          <Section number={2} title="About the Competition">
            <p className="text-xs font-semibold text-neutral-black mb-1.5">Short Description</p>
            <p className="text-xs text-neutral-gray-dark mb-3">{competition.shortDescription}</p>
            <p className="text-xs font-semibold text-neutral-black mb-1.5">Competition Description</p>
            <p className="text-xs text-neutral-gray-dark leading-relaxed">{competition.description}</p>
          </Section>

          <Section number={3} title="Registration Requirements">
            <BulletList items={competition.requirements} />
          </Section>

          <Section number={4} title="Rules and Guidelines">
            <BulletList items={competition.rules} />
          </Section>

          <Section number={5} title="Screening and Selection">
            <BulletList items={competition.screening} />
          </Section>

          <Section number={6} title="Rewards and Prizes">
            {competition.awards.length === 0 ? (
              <p className="text-xs text-neutral-gray-medium">No awards listed.</p>
            ) : (
              <div className="space-y-2">
                {competition.awards.map((award, i) => (
                  <div key={award.position} className="flex items-start gap-2.5 rounded-lg border border-neutral-gray-light px-3 py-2">
                    <Trophy className={`h-3.5 w-3.5 mt-0.5 flex-shrink-0 ${i === 0 ? 'text-amber-500' : i === 1 ? 'text-slate-400' : i === 2 ? 'text-orange-600' : 'text-[#453DD8]'}`} />
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-neutral-black">{award.position}</p>
                      <p className="text-[11px] text-neutral-gray-dark">{award.items.join(', ')}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Section>

          <Section number={7} title="Judging Criteria">
            {competition.criteria.length === 0 ? (
              <p className="text-xs text-neutral-gray-medium">No criteria listed.</p>
            ) : (
              <ol className="space-y-1.5">
                {competition.criteria.map((criterion, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs text-neutral-gray-dark">
                    <span className="font-semibold text-neutral-black flex-shrink-0">{i + 1}.</span>
                    <span>{criterion}</span>
                  </li>
                ))}
              </ol>
            )}
          </Section>

          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <Users className="h-4 w-4 text-neutral-gray-medium" />
              <h3 className="text-sm font-bold text-neutral-black">Assigned Judges</h3>
            </div>
            {judgeEmails.length === 0 ? (
              <p className="text-xs text-neutral-gray-medium">
                No judges assigned yet. Use <span className="font-semibold text-neutral-gray-dark">Assign Judges</span> in the Actions menu to add them.
              </p>
            ) : (
              <ul className="space-y-1.5">
                {judgeEmails.map((email) => (
                  <li key={email} className="flex items-center gap-2 text-xs text-neutral-gray-dark break-all">
                    <Mail className="h-3.5 w-3.5 text-neutral-gray-medium flex-shrink-0" />
                    {email}
                  </li>
                ))}
              </ul>
            )}
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
