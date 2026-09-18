'use client';

import { useEffect, useState } from 'react';
import { Wallet, X, Loader2, MapPin, CheckCircle2, AlertTriangle, ShieldAlert } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { createWallet, detectWalletLocation, fetchWalletBalance, fetchWalletHistory } from '@/store/walletSlice';
import { getCurrencyForCountry, currencySymbol, formatMinor, WALLET_MODAL_OVERLAY } from '../walletUtils';

interface AshWalletModalProps {
  open: boolean;
  onClose: () => void;
}

type Phase = 'idle' | 'checking' | 'ready' | 'create' | 'creating' | 'created' | 'blocked' | 'error';

export function AshWalletModal({ open, onClose }: AshWalletModalProps) {
  const dispatch = useAppDispatch();
  const { detect, detectLoading, detectError, wallet, walletLoading, createLoading, createError } = useAppSelector((s) => s.wallet);
  const [phase, setPhase] = useState<Phase>('idle');
  const [errorMsg, setErrorMsg] = useState<string>('');

  useEffect(() => {
    if (open) {
      setPhase('checking');
      setErrorMsg('');
      dispatch(fetchWalletBalance());
      dispatch(detectWalletLocation());
    }
  }, [open, dispatch]);

  useEffect(() => {
    if (!open) return;
    if (wallet) { setPhase('ready'); return; }
    if (detectLoading || walletLoading) { setPhase('checking'); return; }
    if (detectError) { setPhase('error'); setErrorMsg(detectError); return; }
    if (detect) {
      if (detect.success === false) { setPhase('blocked'); return; }
      setPhase('create');
    }
  }, [open, wallet, detect, detectLoading, detectError, walletLoading]);

  const handleCreate = async () => {
    setPhase('creating');
    setErrorMsg('');
    try {
      const res = await dispatch(createWallet()).unwrap();
      if (res?.message?.toLowerCase().includes('existing wallet')) {
        setPhase('ready');
      } else {
        setPhase('created');
      }
      dispatch(fetchWalletBalance());
      dispatch(fetchWalletHistory());
    } catch (e: any) {
      const msg = e?.message?.toLowerCase() ?? '';
      setPhase(msg.includes('existing wallet') ? 'ready' : 'error');
      setErrorMsg(msg.includes('existing wallet') ? '' : (e?.message || 'Could not create more wallet'));
      if (msg.includes('existing wallet')) {
        dispatch(fetchWalletBalance());
        dispatch(fetchWalletHistory());
      }
    }
  };

  if (!open) return null;

  const country = detect?.details?.country_code || '';
  const currency = getCurrencyForCountry(country);
  const locLine = [detect?.details?.city, detect?.details?.region, detect?.details?.country].filter(Boolean).join(', ') || 'Detected location';
  const detected = detect?.details ? (detect.details.type || detect.details.continent || 'Your region') : 'Your region';

  const renderBody = () => {
    switch (phase) {
      case 'ready':
        return (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="h-14 w-14 rounded-full bg-green-100 flex items-center justify-center mb-3">
              <CheckCircle2 className="h-7 w-7 text-green-600" />
            </div>
            <h3 className="text-lg font-bold text-neutral-black mb-1">ASH Wallet Ready</h3>
            <p className="text-sm text-neutral-gray-medium mb-6">
              {wallet ? `Your wallet balance is ${formatMinor(wallet.balance, wallet.currency)} and it is ready to use.` : 'Your wallet is ready to use.'}
            </p>
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 text-sm font-medium text-white bg-brand-navy-900 rounded-lg hover:bg-brand-navy-700 cursor-pointer transition-colors"
            >
              Done
            </button>
          </div>
        );
      case 'checking':
        return (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <Loader2 className="h-8 w-8 text-brand-navy-900 animate-spin mb-3" />
            <p className="text-sm text-neutral-gray-medium">Checking your location&hellip;</p>
          </div>
        );
      case 'ready':
        return (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="h-14 w-14 rounded-full bg-green-100 flex items-center justify-center mb-3">
              <CheckCircle2 className="h-7 w-7 text-green-600" />
            </div>
            <h3 className="text-lg font-bold text-neutral-black mb-1">ASH Wallet Ready</h3>
            <p className="text-sm text-neutral-gray-medium mb-6">
              {wallet ? `Your wallet balance is ${formatMinor(wallet.balance, wallet.currency)} and it is ready to use.` : 'Your wallet is ready to use.'}
            </p>
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 text-sm font-medium text-white bg-brand-navy-900 rounded-lg hover:bg-brand-navy-700 cursor-pointer transition-colors"
            >
              Done
            </button>
          </div>
        );
      case 'create':
        return (
          <div className="space-y-4">
            <div className="rounded-lg border border-neutral-gray-light bg-neutral-bg-light p-4">
              <p className="text-xs text-neutral-gray-medium mb-1 flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" /> {locLine}
              </p>
              <p className="text-xs font-medium text-neutral-gray-dark mb-2">
                {detected} is eligible &mdash; a {detect?.details?.country || 'balanced'} wallet will be created in {currency}.
              </p>
              <div className="flex items-center gap-2 text-sm">
                <span className="px-2 py-1 rounded bg-white border border-neutral-gray-light font-medium text-neutral-black">{currency}</span>
                <span className="text-neutral-gray-medium">{currencySymbol(currency)}</span>
              </div>
            </div>
            {createError && (
              <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg p-3">{createError}</p>
            )}
            <div className="flex justify-end gap-2">
              <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-neutral-gray-dark border border-neutral-gray-light rounded-lg hover:bg-neutral-bg-light cursor-pointer transition-colors">
                Cancel
              </button>
              <button
                type="button"
                onClick={handleCreate}
                disabled={createLoading}
                className="inline-flex items-center gap-2 px-5 py-2 text-sm font-medium text-white bg-brand-navy-900 rounded-lg hover:bg-brand-navy-700 disabled:opacity-50 cursor-pointer transition-colors"
              >
                {createLoading && <Loader2 className="h-4 w-4 animate-spin" />}
                Create ASH Wallet
              </button>
            </div>
          </div>
        );
      case 'creating':
        return (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <Loader2 className="h-8 w-8 text-brand-navy-900 animate-spin mb-3" />
            <p className="text-sm text-neutral-gray-medium">Creating your ASH Wallet&hellip;</p>
          </div>
        );
      case 'created':
        return (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="h-14 w-14 rounded-full bg-green-100 flex items-center justify-center mb-3">
              <CheckCircle2 className="h-7 w-7 text-green-600" />
            </div>
            <h3 className="text-lg font-bold text-neutral-black mb-1">Wallet Created</h3>
            <p className="text-sm text-neutral-gray-medium mb-6">
              Your {currency} ASH Wallet has been created successfully.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 text-sm font-medium text-white bg-brand-navy-900 rounded-lg hover:bg-brand-navy-700 cursor-pointer transition-colors"
            >
              Done
            </button>
          </div>
        );
      case 'blocked':
        return (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="h-14 w-14 rounded-full bg-red-100 flex items-center justify-center mb-3">
              <ShieldAlert className="h-7 w-7 text-red-600" />
            </div>
            <h3 className="text-lg font-bold text-neutral-black mb-1">Region Not Supported</h3>
            <p className="text-sm text-neutral-gray-medium max-w-sm mb-6">
              {detect?.message || 'Wallet creation is currently unavailable for your region.'}
            </p>
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 text-sm font-medium text-neutral-gray-dark border border-neutral-gray-light rounded-lg hover:bg-neutral-bg-light cursor-pointer transition-colors"
            >
              Close
            </button>
          </div>
        );
      case 'error':
      default:
        return (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="h-14 w-14 rounded-full bg-red-100 flex items-center justify-center mb-3">
              <AlertTriangle className="h-7 w-7 text-red-600" />
            </div>
            <h3 className="text-lg font-bold text-neutral-black mb-1">Unable to Continue</h3>
            <p className="text-sm text-neutral-gray-medium max-w-sm mb-6">{errorMsg || 'Something went wrong. Please try again.'}</p>
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 text-sm font-medium text-neutral-gray-dark border border-neutral-gray-light rounded-lg hover:bg-neutral-bg-light cursor-pointer transition-colors"
            >
              Close
            </button>
          </div>
        );
    }
  };

  return (
    <div className={WALLET_MODAL_OVERLAY} onClick={onClose}>
      <div
        className="w-full max-w-md rounded-2xl bg-white shadow-xl p-6 mx-auto"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-neutral-black flex items-center gap-2">
            <Wallet className="h-5 w-5 text-brand-navy-900" />
            ASH Wallet
          </h3>
          <button type="button" onClick={onClose} className="text-neutral-gray-medium hover:text-neutral-black cursor-pointer transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>
        {renderBody()}
      </div>
    </div>
  );
}