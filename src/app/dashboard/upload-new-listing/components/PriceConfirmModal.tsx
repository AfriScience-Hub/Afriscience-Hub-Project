'use client';

import { useEffect, useState } from 'react';
import { Check, Crown, Loader2, Sparkles, X } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

export type ListingPlan = 'free' | 'paid';

interface PriceConfirmModalProps {
  open: boolean;
  /** Raw price for the selected stage (stored in the smallest unit). */
  price?: string;
  /** The stage the listing was submitted under. */
  stage?: string;
  saving?: boolean;
  /** Hide the Free Plan option when an existing free listing is upgrading. */
  upgrade?: boolean;
  onConfirm: (plan: ListingPlan) => void;
  /** Closes the upgrade prompt without cancelling the upgrade intent. */
  onEditEntries?: () => void;
  onCancel: () => void;
}

const SINGLE_ENTRY_CATEGORIES = [
  'Field',
  'Interest',
  'SDG',
  'Materials',
  'User Groups',
  'Applications',
  'Impact',
  'Recommendations',
  'Cautions',
  'Licenses & Certifications',
  'Honorary Awards',
  'Media Gallery (Working Materials)',
];

/**
 * Lets the user pick between the free (single entry per category) and paid
 * (multiple entries, annual subscription) listing plans before submitting.
 */
export default function PriceConfirmModal({
  open, price, stage, saving = false, upgrade = false, onConfirm, onEditEntries, onCancel,
}: PriceConfirmModalProps) {
  const [pending, setPending] = useState<ListingPlan | null>(null);

  useEffect(() => {
    if (!open) setPending(null);
  }, [open]);

  if (!open) return null;

  const choose = (plan: ListingPlan) => {
    setPending(plan);
    onConfirm(plan);
  };

  return (
    <div
      className="fixed inset-0 z-[70] flex items-start justify-center overflow-y-auto bg-black/60 p-2 backdrop-blur-sm sm:items-center"
      onClick={() => { if (!saving) onCancel(); }}
    >
      <div
        className="my-4 w-full md:max-w-2xl lg:max-w-3xl overflow-auto rounded-2xl bg-white shadow-2xl max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative border-b border-neutral-gray-light bg-gradient-to-br from-white via-white to-brand-red-100/60 px-6 py-6 sm:px-8">
          <button
            type="button"
            onClick={onCancel}
            disabled={saving}
            aria-label="Close"
            className="absolute right-4 top-4 cursor-pointer rounded-full p-1.5 text-black bg-gray-300 hover:text-neutral-black disabled:opacity-40"
          >
            <X className="h-5 w-5" />
          </button>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-red-600">
            {upgrade ? 'Upgrade your plan' : 'Choose your plan'}
          </p>
          <h3 className="mt-1 text-xl font-bold text-neutral-black sm:text-2xl">
            {upgrade ? 'Upgrade to Pro Plan' : 'Publish your innovation'}
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-neutral">
            {upgrade
              ? 'Your listing is currently on the Free Plan. Upgrade to the Pro Plan to unlock full visibility and multiple entries.'
              : 'Select how much of your listing you want visible. You can upgrade to the Pro Plan at any time.'}
            {stage && (
              <span className="ml-1">
                Selected stage: <span className="font-semibold text-neutral-black">{stage}</span>.
              </span>
            )}
          </p>
        </div>

        <div className={upgrade ? 'grid gap-4 p-5 sm:p-6' : 'grid gap-4 p-5 sm:p-6 md:grid-cols-2'}>
          {/* Free plan */}
          {!upgrade && (
          <div className="flex flex-col rounded-2xl border-2 border-brand-red-100 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-red-100 text-brand-red-600">
                <Sparkles className="h-4 w-4" />
              </span>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wide text-brand-red-600">Free Plan</p>
                <p className="text-2xl font-bold text-neutral-black">Free</p>
              </div>
            </div>

            <p className="mt-3 text-xs leading-5 text-neutral-gray">
              One item from each of these categories is shown on your listing:
            </p>
            <ul className="mt-3 grid flex-1 grid-cols-1 gap-1.5 text-xs text-neutral-gray-dark sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
              {SINGLE_ENTRY_CATEGORIES.map((item) => (
                <li key={item} className="flex items-start gap-1.5">
                  <Check className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-brand-red-600" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-4 rounded-lg border border-brand-red-100 bg-brand-red-100/60 p-3 text-[11px] leading-5 text-brand-red-700">
              Choosing &quot;Free Plan&quot; limits the visibility of your listing and its features. You can always upgrade to the
              &quot;Pro Plan&quot; anytime to enjoy a full coverage of your listing.
            </div>

            <button
              type="button"
              onClick={() => choose('free')}
              disabled={saving}
              className="mt-4 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-brand-red-600 bg-white px-4 py-2.5 text-sm font-semibold text-brand-red-600 transition-colors hover:bg-brand-red-100/60 disabled:opacity-50"
            >
              {pending === 'free' && <Loader2 className="h-4 w-4 animate-spin" />}
              {pending === 'free' ? 'Processing…' : 'Proceed with Free Plan'}
            </button>
          </div>
          )}

          {/* Paid plan */}
          <div className="relative flex flex-col rounded-2xl border-2 border-brand-navy-900 bg-brand-navy-900 p-5 text-white shadow-xl">
            <span className="absolute -top-3 right-4 rounded-full bg-brand-red-600 px-3 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
              Recommended
            </span>
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white">
                <Crown className="h-4 w-4" />
              </span>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wide text-white/70">Pro Plan</p>
                <p className="text-2xl font-bold">
                  {price !== undefined && price !== null && price !== '' ? formatPrice(price) : '—'}
                  <span className="ml-1 text-xs font-normal text-white/60">/ year</span>
                </p>
              </div>
            </div>

            <ul className="mt-4 flex-1 space-y-2 text-xs text-white/90">
              <li className="flex items-start gap-2">
                <Check className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-green-400" />
                <span>Multiple entries allowed in every category.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-green-400" />
                <span>All fields, interests, SDGs, materials, user groups, applications, impact, recommendations, cautions, documents and media are fully visible.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-green-400" />
                <span>Maximum visibility for your listing and its features.</span>
              </li>
              {price === undefined || price === null || price === '' ? (
                <li className="flex items-start gap-2 text-amber-300">
                  <Check className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" />
                  <span>No price is set for the selected stage.</span>
                </li>
              ) : null}
            </ul>

            <div className="mt-4 rounded-lg border border-white/15 bg-white/10 p-3 text-[11px] leading-5 text-white/85">
              Continue with &quot;Pro Plan&quot; to enjoy maximum visibility for your listing and its features. Subscription to
              this plan is annual and will expire one year after approval. When the Pro Plan expires, your listing is
              automatically downgraded to the Free Plan.
            </div>

            <div className={`mt-4 ${upgrade ? 'grid gap-2 sm:grid-cols-2' : ''}`}>
              {upgrade && (
                <button
                  type="button"
                  onClick={() => onEditEntries?.()}
                  disabled={saving}
                  className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-white bg-white px-4 py-2.5 text-sm font-bold text-brand-red-600 shadow-sm transition-colors hover:border-red-100 hover:bg-red-50 disabled:opacity-50"
                >
                  Edit Entries
                </button>
              )}
              <button
                type="button"
                onClick={() => choose('paid')}
                disabled={saving}
                className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-brand-red-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-red-700 disabled:opacity-50"
              >
                {pending === 'paid' && <Loader2 className="h-4 w-4 animate-spin" />}
                {pending === 'paid' ? 'Processing…' : upgrade ? 'Upgrade to Pro' : 'Continue with Pro Plan'}
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-neutral-gray-light px-6 py-3 text-center text-[11px] text-neutral-gray-medium">
          {upgrade
            ? 'Your existing listing keeps its details and is upgraded after the plan is paid for.'
            : 'Your listing is submitted for review after you choose a plan. You can change plans later from your submissions.'}
        </div>
      </div>
    </div>
  );
}
