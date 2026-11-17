'use client';

import { useEffect } from 'react';
import SafeLink from './SafeLink';
import { Wallet } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchWalletBalance } from '@/store/walletSlice';

/** ASH coins are shown as a plain figure — no currency symbol. */
function formatCoins(balance: number) {
  return new Intl.NumberFormat('en', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(balance);
}

interface HeaderWalletButtonProps {
  compact?: boolean;
}

export function HeaderWalletButton({ compact = false }: HeaderWalletButtonProps) {
  const dispatch = useAppDispatch();
  const { wallet } = useAppSelector((s) => s.wallet);

  useEffect(() => {
    dispatch(fetchWalletBalance());
  }, [dispatch]);

  const label = wallet ? formatCoins(wallet.balance) : '—';

  if (compact) {
    return (
      <SafeLink
        href="/dashboard/my-profile?tab=wallet"
        aria-label="Wallet"
        title="ASH Wallet"
        className="flex items-center gap-1.5 rounded-lg px-2 py-1 text-neutral-gray-dark hover:bg-neutral-bg-light transition-colors"
      >
        <Wallet className="h-5 w-5 text-brand-navy-900" />
        <span className="max-w-[80px] truncate text-xs font-semibold text-brand-navy-900">
          {label}
        </span>
      </SafeLink>
    );
  }

  return (
    <SafeLink
      href="/dashboard/my-profile?tab=wallet"
      aria-label="Wallet"
      title="ASH Wallet"
      className="flex flex-col items-center justify-center rounded-lg px-2 py-1 text-neutral-gray-dark hover:bg-neutral-bg-light hover:text-brand-navy-900 transition-colors"
    >
      <Wallet className="h-5 w-5" />
      <span className="mt-0.5 max-w-[90px] truncate text-[10px] font-semibold leading-none text-brand-navy-900">
        {label}
      </span>
    </SafeLink>
  );
}
