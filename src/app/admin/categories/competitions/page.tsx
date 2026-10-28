'use client';

import React from 'react';
import { Trophy } from 'lucide-react';
import {
  ONGOING_COMPETITIONS,
  UPCOMING_COMPETITIONS,
  PARTICIPANTS_BY_TYPE,
  PARTICIPANTS_BY_COUNTRY,
  BOOST_VOTE_PACKAGES,
  TOP_VOTED_PARTICIPANTS,
  TOP_BOOSTED_PARTICIPANTS,
  VOTES_DATA,
  BOOST_VOTE_TRENDS,
} from './data';
import CompetitionPageHeader from './components/CompetitionPageHeader';
import CompetitionPagesMenu from './components/CompetitionPagesMenu';
import CompetitionStats from './components/CompetitionStats';
import CompetitionTrendChart from './components/CompetitionTrendChart';
import BarChartCard from './components/BarChartCard';
import PieChartCard from './components/PieChartCard';
import LeaderboardCard from './components/LeaderboardCard';
import OngoingCompetitionsCard from './components/OngoingCompetitionsCard';
import UpcomingCompetitionsCard from './components/UpcomingCompetitionsCard';

export default function CompetitionsPage() {
  return (
    <div className="space-y-4">
      <CompetitionPageHeader
        icon={Trophy}
        title="Competitions"
        description="Create, manage and monitor science and technology competitions across Africa."
        actions={<CompetitionPagesMenu />}
      />

      <CompetitionStats />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <CompetitionTrendChart />
        <BarChartCard title="Voting Trends" data={VOTES_DATA} color="#453DD8" />
        <BarChartCard title="Boost Vote Trends" data={BOOST_VOTE_TRENDS} color="#EC4899" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <PieChartCard title="Participants by Type" data={PARTICIPANTS_BY_TYPE} total={3142} centerLabel="Participants" />
        <PieChartCard title="Participants by Country" data={PARTICIPANTS_BY_COUNTRY} total={3142} centerLabel="Participants" />
        <PieChartCard title="Boost Vote Packages" data={BOOST_VOTE_PACKAGES} total={1150} centerLabel="Packages" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <LeaderboardCard title="Top Voted Participants" rows={TOP_VOTED_PARTICIPANTS} valueLabel="Votes" />
        <LeaderboardCard title="Top Boosted Participants" rows={TOP_BOOSTED_PARTICIPANTS} valueLabel="Boosted votes" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <OngoingCompetitionsCard competitions={ONGOING_COMPETITIONS} total={ONGOING_COMPETITIONS.length} />
        <UpcomingCompetitionsCard competitions={UPCOMING_COMPETITIONS} total={UPCOMING_COMPETITIONS.length} />
      </div>
    </div>
  );
}
