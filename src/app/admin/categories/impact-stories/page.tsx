'use client';

import React, { useMemo, useState } from 'react';
import DashboardHeader from './components/dashboard/DashboardHeader';
import DashboardStats from './components/dashboard/DashboardStats';
import StatusDonut from './components/dashboard/StatusDonut';
import ProgramBars from './components/dashboard/ProgramBars';
import GeographicList from './components/dashboard/GeographicList';
import DonationTotalCard from './components/dashboard/DonationTotalCard';
import DonationsByProgram from './components/dashboard/DonationsByProgram';
import KeyImpactMetrics from './components/dashboard/KeyImpactMetrics';
import RecentApplications from './components/dashboard/RecentApplications';
import RecentDonations from './components/dashboard/RecentDonations';
import { rangeBounds, type DateRange } from './components/dashboard/DateRangePicker';
import {
  countApplications,
  getApplications,
  type ApplicationCounts,
} from './applicationsData';
import { DONATIONS } from '../donations/data';

/**
 * Impact Dashboard (main page of the Impact section): headline cards,
 * status/program/geographic overviews, donation totals and the recent
 * applications & donations tables. The date-range selector in the
 * header filters every dated metric; the Geographic Distribution card
 * is a plain country list — no map.
 */
export default function ImpactDashboardPage() {
  // No range selected by default — the dashboard shows all data until one is picked.
  const [range, setRange] = useState<DateRange | null>(null);
  const applications = getApplications();

  const bounds = useMemo(() => (range ? rangeBounds(range) : null), [range]);
  const filteredApps = useMemo(
    () => (bounds ? applications.filter((a) => a.ts >= bounds.fromTs && a.ts <= bounds.toTs) : applications),
    [applications, bounds]
  );
  const filteredDonations = useMemo(
    () => (bounds ? DONATIONS.filter((d) => d.ts >= bounds.fromTs && d.ts <= bounds.toTs) : DONATIONS),
    [bounds]
  );
  const counts: ApplicationCounts = useMemo(() => countApplications(filteredApps), [filteredApps]);

  return (
    <div className="space-y-6">
      <DashboardHeader range={range} onApplyRange={setRange} />
      <DashboardStats counts={counts} />

      <div className="grid lg:grid-cols-3 gap-5 items-stretch">
        <StatusDonut counts={counts} />
        <ProgramBars applications={filteredApps} />
        <GeographicList />
      </div>

      <div className="grid lg:grid-cols-3 gap-5 items-stretch">
        <DonationTotalCard donations={filteredDonations} />
        <DonationsByProgram donations={filteredDonations} />
        <KeyImpactMetrics />
      </div>

      <div className="grid lg:grid-cols-2 gap-5 items-stretch">
        <RecentApplications applications={filteredApps} />
        <RecentDonations donations={filteredDonations} />
      </div>
    </div>
  );
}
