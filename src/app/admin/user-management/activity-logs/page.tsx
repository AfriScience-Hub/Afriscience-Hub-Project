'use client';

import React, { useState } from 'react';
import { Search, Filter, Clock, User, FileText, Settings, CheckCircle } from 'lucide-react';

const logs = [
  { id: 1, action: 'User login', user: 'Claire Iwuanyanwu', details: 'Successful login from Lagos, NG', time: '2 mins ago', type: 'auth' },
  { id: 2, action: 'Approved institution', user: 'Emeka Okonkwo', details: 'Approved University of Abuja profile', time: '15 mins ago', type: 'approval' },
  { id: 3, action: 'Updated system settings', user: 'Claire Iwuanyanwu', details: 'Changed competition registration deadline', time: '1 hour ago', type: 'settings' },
  { id: 4, action: 'Rejected submission', user: 'Fatima Hassan', details: 'Rejected duplicate innovation entry #1247', time: '2 hours ago', type: 'rejection' },
  { id: 5, action: 'User signup', user: 'New User', details: 'Dr. Chidi Eze registered as Scientist', time: '3 hours ago', type: 'auth' },
  { id: 6, action: 'Exported reports', user: 'David Mwangi', details: 'Downloaded monthly user analytics', time: '4 hours ago', type: 'report' },
  { id: 7, action: 'Created announcement', user: 'Claire Iwuanyanwu', details: 'Published maintenance notice for Dec 15', time: '5 hours ago', type: 'content' },
];

const iconMap = {
  auth: User,
  approval: CheckCircle,
  settings: Settings,
  rejection: FileText,
  report: FileText,
  content: FileText,
};

export default function ActivityLogsPage() {
  const [search, setSearch] = useState('');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-neutral-black">Activity Logs</h1>
        <p className="text-sm text-neutral-gray-dark mt-1">Track all admin actions and system events.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-gray-medium" />
          <input
            type="text"
            placeholder="Search logs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm rounded-lg border border-neutral-gray-light focus:border-brand-red-600 focus:ring-1 focus:ring-brand-red-600 outline-none"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-neutral-gray-light rounded-lg text-sm font-medium text-neutral-gray-dark hover:bg-neutral-bg-light cursor-pointer">
          <Filter className="h-4 w-4" />
          Filter
        </button>
      </div>

      <div className="rounded-xl border border-neutral-gray-light bg-white shadow-sm divide-y divide-neutral-gray-light">
        {logs.map((log) => {
          const Icon = iconMap[log.type as keyof typeof iconMap] || FileText;
          return (
            <div key={log.id} className="p-4 flex items-start gap-3 hover:bg-neutral-bg-light/50">
              <div className="p-2 rounded-lg bg-neutral-bg-light mt-0.5">
                <Icon className="h-4 w-4 text-neutral-gray-dark" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-neutral-black">{log.action}</p>
                  <span className="text-xs text-neutral-gray-medium">by {log.user}</span>
                </div>
                <p className="text-xs text-neutral-gray-dark mt-0.5">{log.details}</p>
              </div>
              <span className="text-xs text-neutral-gray-medium whitespace-nowrap flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {log.time}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
