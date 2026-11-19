'use client';

import { useEffect, useState } from 'react';
import { X, CheckCircle, XCircle, Pencil } from 'lucide-react';
import type { AdminScientist, SubmissionStatus } from '../data';
import ScientistDetailSections from './ScientistDetailSections';
import ScientistEditForm from './ScientistEditForm';

interface Props {
  scientist: AdminScientist | null;
  open: boolean;
  onClose: () => void;
  onApprove: (s: AdminScientist) => void;
  onReject: (s: AdminScientist) => void;
  onSave?: (updated: AdminScientist) => void;
}

const STATUS_TONE: Record<SubmissionStatus, string> = {
  'Pending Review': 'bg-amber-50 text-amber-700',
  Approved: 'bg-emerald-50 text-emerald-700',
  Rejected: 'bg-red-50 text-red-700',
  Published: 'bg-emerald-50 text-emerald-700',
};

/**
 * Full record for one scientist or technologist, shown when a table row is
 * clicked. The Edit button swaps the read-only profile for an inline form,
 * mirroring the Afro-Innovations submissions modal.
 */
export default function ScientistDetailModal({
  scientist, open, onClose, onApprove, onReject, onSave,
}: Props) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState<AdminScientist | null>(null);

  useEffect(() => {
    if (open && scientist) {
      setDraft(scientist);
      setEditing(false);
    }
  }, [open, scientist]);

  if (!open || !scientist) return null;

  const isPending = scientist.status === 'Pending Review';
  const isPublished = scientist.listingStatus === 'Published';
  const canReject = isPending && !isPublished;

  const handleSave = () => {
    if (draft && onSave) onSave(draft);
    setEditing(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-neutral-bg-light rounded-2xl shadow-2xl w-full max-w-4xl my-8 flex flex-col max-h-[90vh]">
        <div className="px-6 py-4 bg-white rounded-t-2xl border-b border-neutral-gray-light flex items-center justify-between gap-3 shrink-0">
          <div className="min-w-0">
            <h2 className="text-base font-bold text-neutral-black truncate">{scientist.name}</h2>
            <p className="text-xs text-neutral-gray-medium">
              {editing
                ? 'Editing listing details'
                : `${scientist.title} · Submitted on ${scientist.submittedOn} ${scientist.submittedTime}`}
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {onSave && !editing && (
              <button
                onClick={() => { setDraft(scientist); setEditing(true); }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-gray-light bg-white text-xs font-semibold hover:bg-neutral-bg-light cursor-pointer"
              >
                <Pencil className="h-3.5 w-3.5" /> Edit
              </button>
            )}
            <button onClick={onClose} className="h-9 w-9 rounded-full bg-neutral-bg-light hover:bg-neutral-gray-light flex items-center justify-center cursor-pointer shrink-0">
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {editing && draft ? (
            <ScientistEditForm value={draft} onChange={setDraft} />
          ) : (
            <ScientistDetailSections scientist={scientist} />
          )}
        </div>

        <div className="px-6 py-4 bg-white rounded-b-2xl border-t border-neutral-gray-light flex items-center justify-between shrink-0 gap-3">
          <button onClick={onClose} className="px-4 py-2 rounded-xl border border-neutral-gray-light text-xs font-semibold hover:bg-neutral-bg-light cursor-pointer">Close</button>
          <div className="flex gap-2">
            {editing ? (
              <>
                <button
                  onClick={() => { setDraft(scientist); setEditing(false); }}
                  className="px-4 py-2 rounded-xl border border-neutral-gray-light text-xs font-semibold hover:bg-neutral-bg-light cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 rounded-xl bg-[#453DD8] text-white text-xs font-semibold hover:bg-[#3a33c0] cursor-pointer"
                >
                  Save Changes
                </button>
              </>
            ) : canReject ? (
              <>
                <button
                  onClick={() => { onReject(scientist); onClose(); }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-50 text-red-600 border border-red-200 text-xs font-semibold hover:bg-red-100 cursor-pointer"
                >
                  <XCircle className="h-4 w-4" /> Reject
                </button>
                <button
                  onClick={() => { onApprove(scientist); onClose(); }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 cursor-pointer"
                >
                  <CheckCircle className="h-4 w-4" /> Approve
                </button>
              </>
            ) : (
              <span className={`px-3 py-1.5 rounded-full text-xs font-bold ${STATUS_TONE[scientist.status]}`}>{scientist.status}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
