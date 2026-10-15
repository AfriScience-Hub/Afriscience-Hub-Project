'use client';

import React, { useEffect, useState } from 'react';
import { X, UserPlus, Mail, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { AllCompetition } from '../data';

interface AssignJudgesModalProps {
  competition: AllCompetition | null;
  /** Emails already assigned (edited in place) */
  currentEmails: string[];
  open: boolean;
  onClose: () => void;
  /** Persist the judge emails for this competition */
  onAssign: (competition: AllCompetition, emails: string[]) => void;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * "Assign Judges" modal: collect judge email addresses for a competition.
 * NOTE: sending the invitation email instantly is a later backend feature —
 * for now the addresses are saved to the competition record.
 */
export default function AssignJudgesModal({ competition, currentEmails, open, onClose, onAssign }: AssignJudgesModalProps) {
  const [emails, setEmails] = useState<string[]>([]);
  const [draft, setDraft] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (open && competition) {
      setEmails(currentEmails);
      setDraft('');
      setError('');
    }
  }, [open, competition, currentEmails]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open || !competition) return null;

  const addEmail = () => {
    const value = draft.trim().replace(/[,;]+$/, '');
    if (!value) return setError('');
    if (!EMAIL_RE.test(value)) return setError('Enter a valid email address.');
    if (emails.includes(value)) return setError('That email is already added.');
    setEmails((prev) => [...prev, value]);
    setDraft('');
    setError('');
    return undefined;
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',' || e.key === ';') {
      e.preventDefault();
      addEmail();
    }
  };

  const removeEmail = (email: string) => setEmails((prev) => prev.filter((e) => e !== email));

  const handleSave = () => {
    // Commit any valid pending draft first
    const pending = draft.trim();
    const finalEmails = EMAIL_RE.test(pending) && !emails.includes(pending) ? [...emails, pending] : emails;
    onAssign(competition, finalEmails);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md flex flex-col max-h-[85vh]">
        <div className="px-5 py-4 border-b border-neutral-gray-light flex items-start justify-between gap-3 shrink-0">
          <div className="min-w-0">
            <h2 className="text-base font-bold text-neutral-black flex items-center gap-2">
              <UserPlus className="h-4 w-4 text-neutral-gray-medium" /> Assign Judges
            </h2>
            <p className="text-xs text-neutral-gray-medium truncate">{competition.name}</p>
          </div>
          <button onClick={onClose} aria-label="Close" className="h-9 w-9 rounded-full bg-neutral-bg-light hover:bg-neutral-gray-light flex items-center justify-center cursor-pointer flex-shrink-0">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          <div>
            <label htmlFor="judge-email" className="text-[11px] font-semibold text-neutral-gray-medium uppercase block mb-1.5">
              Judge Email{emails.length > 0 ? 's' : ''}
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-neutral-gray-medium pointer-events-none" />
              <input
                id="judge-email"
                type="email"
                value={draft}
                onChange={(e) => { setDraft(e.target.value); setError(''); }}
                onKeyDown={handleKeyDown}
                onBlur={addEmail}
                placeholder="judge@example.org"
                className={cn(
                  'w-full pl-9 pr-3 py-2 text-xs rounded-lg border bg-white outline-none',
                  error ? 'border-brand-red-600' : 'border-neutral-gray-light focus:border-[#453DD8]'
                )}
              />
            </div>
            <p className="text-[10px] text-neutral-gray-medium mt-1">Press Enter or comma to add multiple addresses.</p>
            {error && <p className="text-[11px] text-brand-red-600 mt-1">{error}</p>}
          </div>

          {emails.length > 0 && (
            <div>
              <p className="text-[11px] font-semibold text-neutral-gray-medium uppercase mb-1.5">Added ({emails.length})</p>
              <ul className="space-y-1.5">
                {emails.map((email) => (
                  <li key={email} className="flex items-center justify-between gap-2 px-3 py-2 rounded-lg border border-neutral-gray-light bg-neutral-bg-light/60">
                    <span className="flex items-center gap-2 text-xs text-neutral-gray-dark min-w-0 break-all">
                      <Mail className="h-3.5 w-3.5 text-neutral-gray-medium flex-shrink-0" /> {email}
                    </span>
                    <button
                      onClick={() => removeEmail(email)}
                      aria-label={`Remove ${email}`}
                      className="h-6 w-6 rounded-md grid place-items-center text-neutral-gray-medium hover:text-brand-red-600 hover:bg-white cursor-pointer flex-shrink-0"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="px-5 py-3 border-t border-neutral-gray-light flex justify-end gap-2 shrink-0">
          <button onClick={onClose} className="px-4 py-2 rounded-lg border border-neutral-gray-light bg-white text-xs font-medium text-neutral-gray-dark hover:bg-neutral-bg-light cursor-pointer">
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#453DD8] text-white text-xs font-medium hover:bg-[#3a33c0] cursor-pointer"
          >
            <UserPlus className="h-3.5 w-3.5" /> Save Judges
          </button>
        </div>
      </div>
    </div>
  );
}
