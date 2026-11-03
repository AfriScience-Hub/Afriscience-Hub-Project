'use client';

import { useState } from 'react';
import { Ban, Loader2, ShieldAlert, X } from 'lucide-react';
import type { AdminConversation, BlockScope } from '@/lib/adminConversations';

interface BlockConversationModalProps {
  conversation: AdminConversation | null;
  busy: boolean;
  onClose: () => void;
  onConfirm: (payload: { scope: BlockScope; reason: string }) => void;
}

export function BlockConversationModal({
  conversation,
  busy,
  onClose,
  onConfirm,
}: BlockConversationModalProps) {
  const [scope, setScope] = useState<BlockScope>('BOTH');
  const [reason, setReason] = useState('');

  if (!conversation) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs"
      onClick={() => { if (!busy) onClose(); }}
    >
      <div
        className="w-full max-w-md rounded-2xl bg-white p-5 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-3 flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600">
              <Ban className="h-4 w-4" />
            </span>
            <div>
              <h3 className="text-sm font-bold text-neutral-black">Block Conversation</h3>
              <p className="text-[11px] text-neutral-gray-medium">
                {conversation.clientName} &bull; {conversation.listingName}
              </p>
            </div>
          </div>
          <button
            type="button"
            disabled={busy}
            onClick={onClose}
            className="rounded-lg p-1 text-neutral-gray-medium hover:bg-neutral-bg-light hover:text-neutral-black disabled:opacity-40 cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-3">
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-neutral-black">
              Block Scope <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              {([
                { value: 'BOTH', label: 'Both Participants', desc: 'Neither side can message' },
                { value: 'CLIENT', label: 'Client Only', desc: 'Only the sender is blocked' },
              ] as const).map((item) => (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => setScope(item.value)}
                  className={`rounded-xl border p-2.5 text-left transition cursor-pointer ${
                    scope === item.value
                      ? 'border-red-500 bg-red-50/70 text-neutral-black'
                      : 'border-neutral-gray-light bg-white text-neutral-gray-dark hover:bg-neutral-bg-light'
                  }`}
                >
                  <p className="text-xs font-bold">{item.label}</p>
                  <p className="mt-0.5 text-[10px] text-neutral-gray-medium">{item.desc}</p>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="block-reason" className="mb-1.5 block text-xs font-semibold text-neutral-black">
              Reason for blocking <span className="text-red-500">*</span>
            </label>
            <textarea
              id="block-reason"
              rows={3}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="e.g. Repeated unsolicited contact after a request to stop."
              className="w-full resize-none rounded-xl border border-neutral-gray-light px-3 py-2 text-xs text-neutral-black outline-none focus:border-red-500 focus:ring-1 focus:ring-red-200"
              autoFocus
            />
          </div>
        </div>

        <div className="mt-4 flex justify-end gap-2">
          <button
            type="button"
            disabled={busy}
            onClick={onClose}
            className="rounded-lg border border-neutral-gray-light px-3.5 py-2 text-xs font-medium text-neutral-gray-dark hover:bg-neutral-bg-light disabled:opacity-50 cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={busy || !reason.trim()}
            onClick={() => onConfirm({ scope, reason: reason.trim() })}
            className="inline-flex items-center gap-1.5 rounded-lg bg-red-600 px-3.5 py-2 text-xs font-semibold text-white hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {busy && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
            {busy ? 'Blocking...' : 'Block Conversation'}
          </button>
        </div>
      </div>
    </div>
  );
}

interface SuspendMessagingModalProps {
  conversation: AdminConversation | null;
  busy: boolean;
  onClose: () => void;
  onConfirm: (payload: { reason: string; durationHours: number }) => void;
}

export function SuspendMessagingModal({
  conversation,
  busy,
  onClose,
  onConfirm,
}: SuspendMessagingModalProps) {
  const [reason, setReason] = useState('');
  const [durationHours, setDurationHours] = useState('72');

  if (!conversation) return null;

  const hoursNum = Number(durationHours);
  const validHours = Number.isFinite(hoursNum) && hoursNum > 0;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs"
      onClick={() => { if (!busy) onClose(); }}
    >
      <div
        className="w-full max-w-md rounded-2xl bg-white p-5 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-3 flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-700">
              <ShieldAlert className="h-4 w-4" />
            </span>
            <div>
              <h3 className="text-sm font-bold text-neutral-black">Suspend Messaging</h3>
              <p className="text-[11px] text-neutral-gray-medium">
                Prevent {conversation.clientName} from sending messages
              </p>
            </div>
          </div>
          <button
            type="button"
            disabled={busy}
            onClick={onClose}
            className="rounded-lg p-1 text-neutral-gray-medium hover:bg-neutral-bg-light hover:text-neutral-black disabled:opacity-40 cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-3">
          <div>
            <label htmlFor="suspend-duration" className="mb-1.5 block text-xs font-semibold text-neutral-black">
              Duration (hours) <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-2">
              <input
                id="suspend-duration"
                type="number"
                min="1"
                step="1"
                value={durationHours}
                onChange={(e) => setDurationHours(e.target.value)}
                className="w-28 rounded-xl border border-neutral-gray-light px-3 py-2 text-xs text-neutral-black outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-200"
              />
              <div className="flex flex-wrap gap-1.5">
                {[24, 48, 72, 168].map((h) => (
                  <button
                    key={h}
                    type="button"
                    onClick={() => setDurationHours(String(h))}
                    className={`rounded-lg border px-2.5 py-1.5 text-[11px] font-medium transition cursor-pointer ${
                      Number(durationHours) === h
                        ? 'border-amber-500 bg-amber-50 text-amber-800'
                        : 'border-neutral-gray-light bg-white text-neutral-gray-dark hover:bg-neutral-bg-light'
                    }`}
                  >
                    {h === 168 ? '7d (168h)' : `${h}h`}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="suspend-msg-reason" className="mb-1.5 block text-xs font-semibold text-neutral-black">
              Reason for suspension <span className="text-red-500">*</span>
            </label>
            <textarea
              id="suspend-msg-reason"
              rows={3}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="e.g. Harassment reports confirmed."
              className="w-full resize-none rounded-xl border border-neutral-gray-light px-3 py-2 text-xs text-neutral-black outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-200"
              autoFocus
            />
          </div>
        </div>

        <div className="mt-4 flex justify-end gap-2">
          <button
            type="button"
            disabled={busy}
            onClick={onClose}
            className="rounded-lg border border-neutral-gray-light px-3.5 py-2 text-xs font-medium text-neutral-gray-dark hover:bg-neutral-bg-light disabled:opacity-50 cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={busy || !reason.trim() || !validHours}
            onClick={() => onConfirm({ reason: reason.trim(), durationHours: hoursNum })}
            className="inline-flex items-center gap-1.5 rounded-lg bg-amber-600 px-3.5 py-2 text-xs font-semibold text-white hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {busy && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
            {busy ? 'Suspending...' : 'Suspend Messaging'}
          </button>
        </div>
      </div>
    </div>
  );
}
