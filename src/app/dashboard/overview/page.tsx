'use client';

import { useEffect } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchFullProfile, fetchProfileCompletion } from '@/store/profileSlice';
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

  useEffect(() => {
    dispatch(fetchFullProfile());
    dispatch(fetchProfileCompletion());
  }, [dispatch]);

  if (!user) return null;

  const personal = profile.personal && typeof profile.personal === 'object' && !Array.isArray(profile.personal)
    ? profile.personal
    : null;
  const firstName = personal?.firstname || user.name?.split(' ')[0] || '';

  const completion = { pct: profile.completion, checks: buildSectionChecks(profile) };

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