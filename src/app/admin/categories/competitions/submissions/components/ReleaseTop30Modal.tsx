'use client';

import React, { useEffect, useState } from 'react';
import { AlertCircle, CheckCircle2, Trophy, X } from 'lucide-react';
import { PRESENTATION_CATEGORIES } from '../../create/data';
import {
  SUBMISSION_TYPES,
  releaseKey,
  releaseLabel,
  type SubmissionTypeTab,
} from '../data';
import type { SubmissionsTab } from './SubmissionsTabs';

interface ReleaseTop30ModalProps {
  open: boolean;
  onClose: () => void;
  phase: SubmissionsTab;
  activeType: SubmissionTypeTab;
  releasedKeys: ReadonlySet<string>;
  onRelease: (type: string, category?: string) => void;
}

const selectClass = 'w-full px-3 py-2 text-xs rounded-lg border border-neutral-gray-light text-neutral-black bg-white outline-none';

/**
 * Release Top 30 flow. On the All Competitions tab the user picks a type
 * (and a category for Afri-Presentations). On a specific type tab the modal
 * is already scoped to that type.
 */
export default function ReleaseTop30Modal({
  open,
  onClose,
  phase,
  activeType,
  releasedKeys,
  onRelease,
}: ReleaseTop30ModalProps) {
  const [selectedType, setSelectedType] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!open) return;
    setSelectedType(activeType === 'All Competitions' ? '' : activeType);
    setSelectedCategory('');
    setSuccess(false);
    setMessage('');
  }, [open, activeType]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  const past = phase === 'Past';
  const isPresentation = selectedType === 'Afri-Presentations';
  const chosenKey = selectedType ? releaseKey(selectedType, isPresentation ? selectedCategory : undefined) : '';
  const alreadyReleased = Boolean(chosenKey && releasedKeys.has(chosenKey));
  const canConfirm = !past && Boolean(selectedType) && (!isPresentation || Boolean(selectedCategory)) && !alreadyReleased;
  const label = selectedType ? releaseLabel(selectedType, isPresentation ? selectedCategory : undefined) : '';

  const confirm = () => {
    if (!canConfirm) return;
    const category = isPresentation ? selectedCategory : undefined;
    onRelease(selectedType, category);
    setMessage(`Top 30 finalists for ${releaseLabel(selectedType, category)} have been released.`);
    setSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="px-5 py-4 border-b border-neutral-gray-light flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center flex-shrink-0">
              <Trophy className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <h2 className="text-base font-bold text-neutral-black">Release Top 30</h2>
              <p className="text-[11px] text-neutral-gray-medium">Publish the finalist shortlist for voting.</p>
            </div>
          </div>
          <button onClick={onClose} aria-label="Close" className="h-8 w-8 rounded-full bg-neutral-bg-light hover:bg-neutral-gray-light flex items-center justify-center cursor-pointer flex-shrink-0">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          {past ? (
            <div className="flex items-start gap-2.5 rounded-lg border border-amber-200 bg-amber-50 p-3">
              <AlertCircle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-amber-800">
                Top 30 finalists cannot be released for past competitions.
              </p>
            </div>
          ) : success ? (
            <div className="flex items-start gap-2.5 rounded-lg border border-green-200 bg-green-50 p-3">
              <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs font-semibold text-green-800">Top 30 released</p>
                <p className="text-xs text-green-700 mt-0.5">{message}</p>
              </div>
            </div>
          ) : (
            <>
              <p className="text-xs text-neutral-gray-dark">
                {activeType === 'All Competitions'
                  ? 'Select the competition type whose top 30 finalists you want to release.'
                  : `Confirm that you want to release the top 30 finalists for ${activeType}.`}
              </p>

              {activeType === 'All Competitions' && (
                <div>
                  <label className="block text-[10px] font-medium text-neutral-gray-medium mb-1.5">Competition Type</label>
                  <select
                    value={selectedType}
                    onChange={(e) => { setSelectedType(e.target.value); setSelectedCategory(''); }}
                    className={selectClass}
                  >
                    <option value="">Select competition type</option>
                    {SUBMISSION_TYPES.map((type) => <option key={type} value={type}>{type}</option>)}
                  </select>
                </div>
              )}

              {isPresentation && (
                <div>
                  <label className="block text-[10px] font-medium text-neutral-gray-medium mb-1.5">Competition Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className={selectClass}
                  >
                    <option value="">Select competition category</option>
                    {PRESENTATION_CATEGORIES.map((category) => <option key={category} value={category}>{category}</option>)}
                  </select>
                </div>
              )}

              {activeType !== 'All Competitions' && activeType !== 'Afri-Presentations' && (
                <div className="rounded-lg border border-neutral-gray-light bg-neutral-bg-light/60 p-3">
                  <p className="text-xs font-semibold text-neutral-black">{activeType}</p>
                  <p className="text-[11px] text-neutral-gray-medium mt-0.5">Top 30 finalists will be released for this competition.</p>
                </div>
              )}

              {selectedType && !isPresentation && activeType === 'All Competitions' && (
                <div className="rounded-lg border border-neutral-gray-light bg-neutral-bg-light/60 p-3">
                  <p className="text-xs font-semibold text-neutral-black">{label}</p>
                  <p className="text-[11px] text-neutral-gray-medium mt-0.5">Top 30 finalists will be released for this competition.</p>
                </div>
              )}

              {alreadyReleased && (
                <div className="flex items-start gap-2.5 rounded-lg border border-amber-200 bg-amber-50 p-3">
                  <AlertCircle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-amber-800">
                    Top 30 finalists for {label} are already released.
                  </p>
                </div>
              )}
            </>
          )}
        </div>

        <div className="px-5 py-3 border-t border-neutral-gray-light flex justify-end gap-2">
          {past || success ? (
            <button onClick={onClose} className="px-4 py-2 rounded-lg border border-neutral-gray-light bg-white text-xs font-medium text-neutral-gray-dark hover:bg-neutral-bg-light cursor-pointer">
              Close
            </button>
          ) : (
            <>
              <button onClick={onClose} className="px-4 py-2 rounded-lg border border-neutral-gray-light bg-white text-xs font-medium text-neutral-gray-dark hover:bg-neutral-bg-light cursor-pointer">
                Cancel
              </button>
              <button
                onClick={confirm}
                disabled={!canConfirm}
                className="px-4 py-2 rounded-lg bg-[#453DD8] text-white text-xs font-semibold hover:bg-[#3a33c0] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Release Top 30
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
