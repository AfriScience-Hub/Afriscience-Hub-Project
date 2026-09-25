'use client';

import { useEffect, useState } from 'react';
import { Wallet, Plus, RefreshCw, Loader2, AlertTriangle } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchWalletBalance, fetchWalletHistory } from '@/store/walletSlice';
import { formatMinor } from '../walletUtils';
import { AshWalletTopupModal } from './AshWalletTopupModal';
import { TransactionHistory } from './TransactionHistory';

// All wallet money is USD-denominated, regardless of the user's profile country.
const CURRENCY = 'USD';

export function WalletTab() {
  const dispatch = useAppDispatch();
  const { wallet, walletLoading, walletError } = useAppSelector((s) => s.wallet);
  const [topupOpen, setTopupOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchWalletBalance());
    dispatch(fetchWalletHistory());
  }, [dispatch]);

  const refresh = () => {
    dispatch(fetchWalletBalance());
    dispatch(fetchWalletHistory());
  };

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-neutral-gray-light bg-white p-5 space-y-4">
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
              onClick={() => setTopupOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-white bg-brand-navy-900 rounded-lg hover:bg-brand-navy-700 cursor-pointer transition-colors"
            >
              <Plus className="h-4 w-4" /> Top Up
            </button>
          </div>
        </div>

        {walletLoading && !wallet ? (
          <div className="flex items-center gap-3 py-6">
            <Loader2 className="h-5 w-5 text-brand-navy-900 animate-spin" />
            <p className="text-sm text-neutral-gray-medium">Loading wallet&hellip;</p>
          </div>
        ) : wallet ? (
          <div className="rounded-xl bg-gradient-to-br from-brand-navy-900 to-brand-navy-700 p-6 text-white">
            <p className="text-xs text-neutral-200 mb-1">Available Balance</p>
            <p className="text-3xl font-bold">{formatMinor(wallet.balance, CURRENCY)}</p>
          </div>
        ) : (
          <div className="flex items-center gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4">
            <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0" />
            <p className="text-sm text-amber-800">{walletError || 'Your wallet is not available yet.'}</p>
          </div>
        )}
      </div>

      <TransactionHistory filter="wallet" />

      <AshWalletTopupModal open={topupOpen} currency={CURRENCY} onClose={() => setTopupOpen(false)} />
    </div>
  );
}
