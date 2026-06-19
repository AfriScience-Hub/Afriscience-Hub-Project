'use client';

import { useAuth } from '@/app/context/AuthContext';
import { SUMMARY_CARDS, LISTING_STATUS_CARDS, RECENT_ACTIVITY, getProfileCompletion } from '../data';
import { WelcomeCard } from './components/WelcomeCard';
import { ProfileCompletionCard } from './components/ProfileCompletionCard';
import { QuickStatsGrid } from './components/QuickStatsGrid';
import { ListingStatusCards } from './components/ListingStatusCards';
import { RecentActivity } from './components/RecentActivity';

export default function Overview() {
  const { user } = useAuth();
  if (!user) return null;
  const completion = getProfileCompletion(user);

  return (
    <div className="space-y-6">
      <WelcomeCard user={user} />
      <ProfileCompletionCard completion={completion} />
      <QuickStatsGrid cards={SUMMARY_CARDS} />
      <ListingStatusCards cards={LISTING_STATUS_CARDS} />
      <RecentActivity activities={RECENT_ACTIVITY} />
    </div>
  );
}
