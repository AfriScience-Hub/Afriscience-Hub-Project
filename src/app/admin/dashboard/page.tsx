'use client';

import React from 'react';
import Link from 'next/link';
import {
  Users,
  Building2,
  Trophy,
  TrendingUp,
  AlertCircle,
  Clock,
  Plus,
  UserCheck,
  Send,
  Lightbulb,
  Award,
  BookOpen,
  Target,
  ChevronRight,
  Activity,
  DollarSign,
  FileText,
  Eye,
} from 'lucide-react';

const alerts = [
  { id: 1, text: '12 pending approvals older than 48 hours', icon: AlertCircle, color: 'bg-red-50 text-red-600 border-red-200' },
  { id: 2, text: '3 invoice disputes awaiting review', icon: FileText, color: 'bg-orange-50 text-orange-600 border-orange-200' },
  { id: 3, text: 'Competition "AI Africa 2026" closes in 2 days', icon: Trophy, color: 'bg-purple-50 text-purple-600 border-purple-200' },
  { id: 4, text: 'New donation received for Borehole Initiative', icon: DollarSign, color: 'bg-green-50 text-green-600 border-green-200' },
  { id: 5, text: '5 new verification requests', icon: UserCheck, color: 'bg-blue-50 text-blue-600 border-blue-200' },
];

const stats = [
  { label: 'Total Users', value: '18,542', change: '+12.5% this month', positive: true, icon: Users },
  { label: 'Active Users Today', value: '2,847', change: '+8.3% today', positive: true, icon: Activity },
  { label: 'Total Listings', value: '6,784', change: '+9.7% this month', positive: true, icon: FileText },
  { label: 'Pending Approvals', value: '37', change: '5 from yesterday', positive: false, icon: Clock },
  { label: 'Total Donations', value: '₦12.4M', change: '+18.6% this month', positive: true, icon: DollarSign },
  { label: 'Active Competitions', value: '7', change: '2 ending soon', positive: true, icon: Trophy },
  { label: 'Votes Cast Today', value: '3,921', change: '+15.2% today', positive: true, icon: TrendingUp },
  { label: 'Outstanding Invoices', value: '24', change: '₦3.2M pending', positive: false, icon: FileText },
];

const quickActions = [
  { label: 'Add Scientist', icon: Users, href: '/admin/categories/scientists-technologies' },
  { label: 'Add Institute', icon: Building2, href: '/admin/categories/institutes' },
  { label: 'Add Innovation', icon: Lightbulb, href: '/admin/categories/afro-innovations' },
  { label: 'Add Competition', icon: Trophy, href: '/admin/categories/competitions' },
  { label: 'Create Award', icon: Award, href: '/admin/categories/awards' },
  { label: 'Publish Impact Story', icon: BookOpen, href: '/admin/categories/impact-stories' },
  { label: 'Send Announcement', icon: Send, href: '/admin/notifications' },
  { label: 'Verify User', icon: UserCheck, href: '/admin/verification-centre' },
];

const pendingApprovals = [
  { category: 'Scientists & Technologists', count: 14 },
  { category: 'Institutes', count: 6 },
  { category: 'Afro Innovations', count: 9 },
  { category: 'Special Centres', count: 5 },
  { category: 'Competitions', count: 1 },
  { category: 'Awards', count: 2 },
  { category: 'Impact Stories', count: 4 },
];

const recentActivity = [
  { action: 'University of Lagos submitted profile', time: '10 mins ago', type: 'info' },
  { action: 'Dr. John Okafor uploaded a new innovation', time: '25 mins ago', type: 'info' },
  { action: 'New donation of ₦250,000 received', time: '1 hour ago', type: 'success' },
  { action: 'Competition "AI Africa Challenge" launched', time: '2 hours ago', type: 'info' },
  { action: '14 new users registered today', time: '3 hours ago', type: 'info' },
];

const verificationQueue = [
  { category: 'Scientists & Technologists', pending: 8 },
  { category: 'Institutes', pending: 5 },
  { category: 'Innovation Owners', pending: 6 },
  { category: 'Organizations', pending: 4 },
  { category: 'Volunteers', pending: 3 },
];

export default function AdminDashboardPage() {
  const now = new Date();
  const greeting = now.getHours() < 12 ? 'Good morning' : now.getHours() < 18 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-neutral-black">{greeting}, Claire! 👋</h1>
          <p className="text-sm text-neutral-gray-dark mt-1">Here&apos;s what&apos;s happening across AFRISCIENCEHUB today.</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium text-neutral-black">{now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
          <p className="text-xs text-neutral-gray-medium">Last login: Today, 8:34 AM</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {alerts.map((alert) => (
          <div key={alert.id} className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-medium ${alert.color}`}>
            <alert.icon className="h-4 w-4 flex-shrink-0" />
            <span>{alert.text}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-xl border border-neutral-gray-light bg-white p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <stat.icon className="h-4 w-4 text-neutral-gray-medium" />
              <span className="text-xs text-neutral-gray-medium">{stat.label}</span>
            </div>
            <p className="text-2xl font-bold text-neutral-black">{stat.value}</p>
            <p className={`text-xs mt-1 ${stat.positive ? 'text-green-600' : 'text-orange-600'}`}>
              {stat.change}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-xl border border-neutral-gray-light bg-white p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-neutral-black mb-3">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-2">
            {quickActions.map((action) => (
              <Link
                key={action.label}
                href={action.href}
                className="flex flex-col items-center gap-2 p-3 rounded-lg border border-neutral-gray-light hover:bg-neutral-bg-light transition-colors text-center"
              >
                <action.icon className="h-5 w-5 text-brand-red-600" />
                <span className="text-[11px] font-medium text-neutral-gray-dark">{action.label}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-neutral-gray-light bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-neutral-black">Pending Approvals</h3>
            <Link href="/admin/approvals" className="text-xs text-brand-red-600 hover:text-brand-red-700 font-medium">
              View all →
            </Link>
          </div>
          <div className="space-y-2">
            {pendingApprovals.map((item) => (
              <div key={item.category} className="flex items-center justify-between py-1.5">
                <span className="text-xs text-neutral-gray-dark">{item.category}</span>
                <span className="text-xs font-bold text-brand-red-600 bg-brand-red-50 px-2 py-0.5 rounded-full">{item.count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-neutral-gray-light bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-neutral-black">Recent Activity</h3>
            <Link href="/admin/user-management/activity-logs" className="text-xs text-brand-red-600 hover:text-brand-red-700 font-medium">
              View all →
            </Link>
          </div>
          <div className="space-y-3">
            {recentActivity.map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <div className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-neutral-black">{item.action}</p>
                  <p className="text-[10px] text-neutral-gray-medium">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-neutral-gray-light bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-neutral-black">Verification Queue</h3>
            <Link href="/admin/verification-centre" className="text-xs text-brand-red-600 hover:text-brand-red-700 font-medium">
              View queue →
            </Link>
          </div>
          <div className="space-y-2">
            {verificationQueue.map((item) => (
              <div key={item.category} className="flex items-center justify-between py-1.5">
                <span className="text-xs text-neutral-gray-dark">{item.category}</span>
                <span className="text-xs font-medium text-orange-600">{item.pending} pending</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-xl border border-neutral-gray-light bg-white p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-neutral-black mb-3">User Growth</h3>
          <p className="text-2xl font-bold text-neutral-black">18,542</p>
          <p className="text-xs text-green-600 mt-1">↑ +12.5% this month</p>
        </div>
        <div className="rounded-xl border border-neutral-gray-light bg-white p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-neutral-black mb-3">Content Distribution</h3>
          <p className="text-2xl font-bold text-neutral-black">6,784</p>
          <p className="text-xs text-neutral-gray-medium mt-1">Total listings</p>
        </div>
        <div className="rounded-xl border border-neutral-gray-light bg-white p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-neutral-black mb-3">Donations (Monthly)</h3>
          <p className="text-2xl font-bold text-neutral-black">₦12.4M</p>
          <p className="text-xs text-green-600 mt-1">↑ +18.6% this month</p>
        </div>
        <div className="rounded-xl border border-neutral-gray-light bg-white p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-neutral-black mb-3">Voting Trends</h3>
          <p className="text-2xl font-bold text-neutral-black">3,921</p>
          <p className="text-xs text-green-600 mt-1">↑ +15.2% today</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="rounded-xl border border-neutral-gray-light bg-white p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-neutral-black mb-3">Platform Health</h3>
          <div className="flex items-center gap-2 mb-3">
            <span className="h-2 w-2 rounded-full bg-green-500" />
            <span className="text-xs font-medium text-green-600">All systems operational</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-green-500" /> API Status</div>
            <div className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-green-500" /> Emails</div>
            <div className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-green-500" /> Database</div>
            <div className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-green-500" /> Payments</div>
            <div className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-green-500" /> Storage</div>
            <div className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-green-500" /> Notifications</div>
          </div>
        </div>

        <div className="rounded-xl border border-neutral-gray-light bg-white p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-neutral-black mb-3">Support Summary</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center p-3 rounded-lg bg-neutral-bg-light">
              <p className="text-xl font-bold text-neutral-black">18</p>
              <p className="text-[10px] text-neutral-gray-medium">Open Tickets</p>
            </div>
            <div className="text-center p-3 rounded-lg bg-neutral-bg-light">
              <p className="text-xl font-bold text-neutral-black">27</p>
              <p className="text-[10px] text-neutral-gray-medium">Messages</p>
            </div>
            <div className="text-center p-3 rounded-lg bg-neutral-bg-light">
              <p className="text-xl font-bold text-neutral-black">8</p>
              <p className="text-[10px] text-neutral-gray-medium">Bug Reports</p>
            </div>
            <div className="text-center p-3 rounded-lg bg-neutral-bg-light">
              <p className="text-xl font-bold text-neutral-black">12</p>
              <p className="text-[10px] text-neutral-gray-medium">Feature Requests</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-neutral-gray-light bg-white p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-neutral-black mb-3">Top Insights</h3>
          <div className="space-y-3 text-xs">
            <div className="flex justify-between"><span className="text-neutral-gray-medium">Most Viewed Scientist</span><span className="font-medium text-neutral-black">Dr. Ayodele John</span></div>
            <div className="flex justify-between"><span className="text-neutral-gray-medium">Most Visited Institute</span><span className="font-medium text-neutral-black">University of Lagos</span></div>
            <div className="flex justify-between"><span className="text-neutral-gray-medium">Trending Innovation</span><span className="font-medium text-neutral-black">AI Crop Predictor</span></div>
            <div className="flex justify-between"><span className="text-neutral-gray-medium">Top Competition</span><span className="font-medium text-neutral-black">AI Africa Challenge</span></div>
            <div className="flex justify-between"><span className="text-neutral-gray-medium">Top Country</span><span className="font-medium text-neutral-black">Nigeria</span></div>
            <div className="flex justify-between"><span className="text-neutral-gray-medium">Most Active User</span><span className="font-medium text-neutral-black">John Doe</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
