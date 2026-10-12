'use client';

import { useEffect, useRef } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchFullProfile, fetchProfileCompletion } from '@/store/profileSlice';
import { fetchWalletBalance } from '@/store/walletSlice';
import { LISTING_STATUS_CARDS } from '../data';
import { WelcomeCard } from './components/WelcomeCard';
import { ProfileCompletionCard } from './components/ProfileCompletionCard';
import { QuickStatsGrid } from './components/QuickStatsGrid';
import { ListingStatusCards } from './components/ListingStatusCards';
import { RecentActivity } from './components/RecentActivity';
import { buildSectionChecks, STATS_CARDS, buildRecentActivities } from './overviewData';

export default function Overview() {
  const { user } = useAuth();
  const dispatch = useAppDispatch();
  const profile = useAppSelector((s) => s.profile);
  const wallet = useAppSelector((s) => s.wallet.wallet);
  const walletFetchedRef = useRef(false);

  useEffect(() => {
    dispatch(fetchFullProfile());
    dispatch(fetchProfileCompletion());
  }, [dispatch]);

  // The Wallet check ticks only when the wallet actually exists; fetch it once
  // (a missing wallet rejects, so this must not re-run on state changes).
  useEffect(() => {
    if (walletFetchedRef.current) return;
    walletFetchedRef.current = true;
    dispatch(fetchWalletBalance());
  }, [dispatch]);

  if (!user) return null;

  const personal = profile.personal && typeof profile.personal === 'object' && !Array.isArray(profile.personal)
    ? profile.personal
    : null;
  const firstName = (personal?.fullName || personal?.firstname || user.name || '').split(' ')[0] || '';

  const completion = { pct: profile.completion, checks: buildSectionChecks(profile, wallet) };

  return (
    <div className="space-y-6">
      <WelcomeCard firstName={firstName} />
      <ProfileCompletionCard completion={completion} />
      <QuickStatsGrid cards={STATS_CARDS} />
      <ListingStatusCards cards={LISTING_STATUS_CARDS} />
      <RecentActivity activities={buildRecentActivities(profile)} />
    </div>
  );
}