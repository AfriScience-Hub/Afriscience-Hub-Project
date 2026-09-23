'use client';

import { useState } from 'react';
import { X, Loader2, ExternalLink, CheckCircle2, Wallet } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { topUpWallet, fetchWalletBalance, fetchWalletHistory } from '@/store/walletSlice';
import { formatMinor, WALLET_MODAL_OVERLAY } from '../walletUtils';

interface AshWalletTopupModalProps {
  open: boolean;
  currency: string;
  onClose: () => void;
}

export function AshWalletTopupModal({ open, currency, onClose }: AshWalletTopupModalProps) {
  const dispatch = useAppDispatch();
  const { topup, topupLoading, topupError } = useAppSelector((s) => s.wallet);
  const [amount, setAmount] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!open) return null;

  const handleSubmit = async () => {
    const n = Number(amount);
    if (!amount || Number.isNaN(n) || n <= 0) {
      setErrorMsg('Enter a valid amount to top up.');
      return;
    }
    setErrorMsg('');
    const kobo = Math.round(n * 100).toString();
    try {
      await dispatch(topUpWallet(kobo)).unwrap();
    } catch (e: any) {
      setErrorMsg(e?.message || 'Top up failed. Please try again.');
    }
  };

  const handleDone = () => {
    dispatch(fetchWalletBalance());
    dispatch(fetchWalletHistory());
    setAmount('');
    setErrorMsg('');
    onClose();
  };

  const handleCancel = () => {
    setAmount('');
    setErrorMsg('');
    onClose();
  };

  return (
    <div className={WALLET_MODAL_OVERLAY} onClick={handleCancel}>
      <div
        className="w-full max-w-md rounded-2xl bg-white shadow-xl p-6 mx-auto"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-neutral-black flex items-center gap-2">
            <Wallet className="h-5 w-5 text-brand-navy-900" />
            Top Up Wallet
          </h3>
          <button type="button" onClick={handleCancel} className="text-neutral-gray-medium hover:text-neutral-black cursor-pointer transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        {topup ? (
          <div className="space-y-4">
            <div className="rounded-lg border border-green-200 bg-green-50 p-4 flex items-center gap-3">
              <CheckCircle2 className="h-6 w-6 text-green-600 shrink-0" />
              <div>
                <p className="text-sm font-semibold text-green-800">Payment link generated</p>
                <p className="text-xs text-green-700">
                  Ref: <span className="font-mono">{topup.reference}</span>
                </p>
              </div>
            </div>

            <div className="rounded-lg border border-neutral-gray-light bg-neutral-bg-light p-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-neutral-gray-medium">Amount</span>
                <span className="font-medium text-neutral-black">{formatMinor(Number(topup.amount) || 0, currency)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-gray-medium">Processing Fee (1.5%)</span>
                <span className="font-medium text-neutral-black">{formatMinor(topup.processingFee, currency)}</span>
              </div>
              <div className="flex justify-between border-t border-neutral-gray-light pt-2">
                <span className="font-medium text-neutral-gray-dark">Total Charge</span>
                <span className="font-semibold text-neutral-black">{formatMinor(topup.totalAmount, currency)}</span>
              </div>
              {topup.accessCode && (
                <div className="flex justify-between">
                  <span className="text-neutral-gray-medium">Access Code</span>
                  <span className="font-medium text-neutral-black">{topup.accessCode}</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <a
                href={topup.paymentLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-brand-navy-900 rounded-lg hover:bg-brand-navy-700 cursor-pointer transition-colors"
              >
                Proceed to Payment <ExternalLink className="h-4 w-4" />
              </a>
              <button
                type="button"
                onClick={handleDone}
                className="w-full px-5 py-2.5 text-sm font-medium text-neutral-gray-dark border border-neutral-gray-light rounded-lg hover:bg-neutral-bg-light cursor-pointer transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-neutral-gray-dark mb-1">
                Amount to top up
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="flex-1 px-3 py-2 rounded-lg border border-neutral-gray-light bg-neutral-bg-light focus:outline-none focus:border-brand-navy-900"
                />
                <span className="text-sm font-semibold text-neutral-gray-dark whitespace-nowrap">{currency}</span>
              </div>
              <p className="text-xs text-neutral-gray-medium mt-1">A processing fee of 1.5% applies to this top up.</p>
            </div>

            {errorMsg && (
              <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg p-3">{errorMsg}</p>
            )}

            <div className="flex justify-end gap-2">
              <button type="button" onClick={handleCancel} className="px-4 py-2 text-sm font-medium text-neutral-gray-dark border border-neutral-gray-light rounded-lg hover:bg-neutral-bg-light cursor-pointer transition-colors">
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={topupLoading}
                className="inline-flex items-center gap-2 px-5 py-2 text-sm font-medium text-white bg-brand-navy-900 rounded-lg hover:bg-brand-navy-700 disabled:opacity-50 cursor-pointer transition-colors"
              >
                {topupLoading && <Loader2 className="h-4 w-4 animate-spin" />}
                Top Up
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}