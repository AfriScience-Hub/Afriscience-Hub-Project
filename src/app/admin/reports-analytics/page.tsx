'use client';

import React from 'react';
import { BarChart3, TrendingUp, Users, FileText, DollarSign } from 'lucide-react';

const reports = [
  { title: 'User Growth Report', description: 'Monthly user registration and growth trends', icon: Users, period: 'January 2026' },
  { title: 'Content Distribution', description: 'Breakdown of listings by category and region', icon: FileText, period: 'January 2026' },
  { title: 'Revenue Report', description: 'Donations, sponsorships, and invoice summaries', icon: DollarSign, period: 'January 2026' },
  { title: 'Engagement Analytics', description: 'Page views, interactions, and voting patterns', icon: TrendingUp, period: 'January 2026' },
];

const topInsights = [
  { metric: 'Most Viewed Scientist', value: 'Dr. Ayodele John', detail: '1,245 views' },
  { metric: 'Most Visited Institute', value: 'University of Lagos', detail: '2,890 views' },
  { metric: 'Trending Innovation', value: 'AI Crop Predictor', detail: '932 views' },
  { metric: 'Top Country', value: 'Nigeria', detail: '9,642 users' },
  { metric: 'Most Active User', value: 'John Doe', detail: '156 actions' },
  { metric: 'Top Competition', value: 'AI Africa Challenge', detail: '8,421 votes' },
];

export default function ReportsAnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-neutral-black">Reports & Analytics</h1>
        <p className="text-sm text-neutral-gray-dark mt-1">View platform analytics and generate reports.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {reports.map((report) => (
          <div key={report.title} className="rounded-xl border border-neutral-gray-light bg-white p-5 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <div className="p-2 bg-brand-red-50 rounded-lg w-fit mb-3">
              <report.icon className="h-5 w-5 text-brand-red-600" />
            </div>
            <h3 className="text-sm font-semibold text-neutral-black">{report.title}</h3>
            <p className="text-xs text-neutral-gray-dark mt-1">{report.description}</p>
            <p className="text-[10px] text-neutral-gray-medium mt-3">{report.period}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-xl border border-neutral-gray-light bg-white p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-neutral-black mb-4">Platform Metrics</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-neutral-gray-dark">Total Users</span>
              <span className="text-sm font-bold text-neutral-black">18,542</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-neutral-gray-dark">Active This Month</span>
              <span className="text-sm font-bold text-neutral-black">12,340</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-neutral-gray-dark">Total Listings</span>
              <span className="text-sm font-bold text-neutral-black">6,784</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-neutral-gray-dark">Total Donations</span>
              <span className="text-sm font-bold text-neutral-black">₦45.2M</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-neutral-gray-dark">Competition Entries</span>
              <span className="text-sm font-bold text-neutral-black">8,421</span>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-neutral-gray-light bg-white p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-neutral-black mb-4">Top Insights</h3>
          <div className="space-y-3">
            {topInsights.map((insight) => (
              <div key={insight.metric} className="flex items-center justify-between py-1.5">
                <span className="text-xs text-neutral-gray-medium">{insight.metric}</span>
                <div className="text-right">
                  <p className="text-xs font-medium text-neutral-black">{insight.value}</p>
                  <p className="text-[10px] text-neutral-gray-medium">{insight.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
