'use client';

import { Wallet, Plus, RefreshCw, Loader2 } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchWalletBalance, fetchWalletHistory } from '@/store/walletSlice';
import { formatMinor, formatISOString } from '../walletUtils';

interface AshWalletSectionProps {
  onOpenCreateWallet: () => void;
  onOpenTopup: () => void;
}

export function AshWalletSection({ onOpenCreateWallet, onOpenTopup }: AshWalletSectionProps) {
  const dispatch = useAppDispatch();
  const { wallet, walletLoading, walletError } = useAppSelector((s) => s.wallet);

  const refresh = () => {
    dispatch(fetchWalletBalance());
    dispatch(fetchWalletHistory());
  };

  if (walletLoading && !wallet) {
    return (
      <div className="rounded-lg border border-neutral-gray-light bg-neutral-bg-light p-5 flex items-center gap-3">
        <Loader2 className="h-5 w-5 text-brand-navy-900 animate-spin" />
        <p className="text-sm text-neutral-gray-medium">Loading wallet&hellip;</p>
      </div>
    );
  }

  if (!wallet) {
    return (
      <div className="rounded-lg border border-neutral-gray-light bg-neutral-bg-light p-5">
        <div className="flex items-center justify-between gap-3 mb-2">
          <h4 className="text-sm font-bold text-neutral-black flex items-center gap-2">
            <Wallet className="h-4 w-4 text-neutral-gray-medium" /> ASH Wallet
          </h4>
        </div>
        <p className="text-sm text-neutral-gray-medium mb-4">
          {walletError ? 'You do not have an ASH Wallet yet.' : 'You do not have an ASH Wallet yet. Create one to start transacting.'}
        </p>
        <button
          type="button"
          onClick={onOpenCreateWallet}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-brand-navy-900 rounded-lg hover:bg-brand-navy-700 cursor-pointer transition-colors"
        >
          <Plus className="h-4 w-4" /> Create ASH Wallet
        </button>
      </div>
    );
  }

  const currency = wallet.currency || 'NGN';

  return (
    <div className="rounded-lg border border-neutral-gray-light bg-white p-5 space-y-4">
      <div className="flex items-center justify-between gap-3">
        <h4 className="text-sm font-bold text-neutral-black flex items-center gap-2">
          <Wallet className="h-4 w-4 text-brand-navy-900" /> ASH Wallet
        </h4>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={refresh}
            title="Refresh wallet"
            className="p-2 text-neutral-gray-dark hover:text-brand-navy-900 rounded-lg hover:bg-neutral-bg-light cursor-pointer transition-colors"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={onOpenTopup}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-white bg-brand-navy-900 rounded-lg hover:bg-brand-navy-700 cursor-pointer transition-colors"
          >
            <Plus className="h-4 w-4" /> Top Up
          </button>
        </div>
      </div>

      <div className="rounded-xl bg-gradient-to-br from-brand-navy-900 to-brand-navy-700 p-5 text-white">
        <p className="text-xs text-neutral-200 mb-1">Available Balance</p>
        <p className="text-3xl font-bold">{formatMinor(wallet.balance, currency)}</p>
        <p className="text-xs text-neutral-200 mt-1">
          Reserved: {formatMinor(wallet.reservedBalance, currency)}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 pt-1">
        <div>
          <p className="text-xs text-neutral-gray-medium mb-0.5">Currency</p>
          <p className="text-sm font-medium text-neutral-black">{currency}</p>
        </div>
        <div>
          <p className="text-xs text-neutral-gray-medium mb-0.5">Wallet ID</p>
          <p className="text-sm font-medium text-neutral-black">#{wallet.id?.slice(0, 12) || '\u2014'}</p>
        </div>
        <div>
          <p className="text-xs text-neutral-gray-medium mb-0.5">Created</p>
          <p className="text-sm font-medium text-neutral-black">{formatISOString(wallet.createdAt)}</p>
        </div>
        <div>
          <p className="text-xs text-neutral-gray-medium mb-0.5">Last Updated</p>
          <p className="text-sm font-medium text-neutral-black">{formatISOString(wallet.updatedAt)}</p>
        </div>
      </div>
    </div>
  );
}