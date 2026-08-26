'use client';

import React, { useState } from 'react';
import { Bell, Filter, CheckCircle, Send } from 'lucide-react';

const mockNotifications = [
  { id: 1, title: 'New sponsor application received', type: 'Sponsor', time: '10 mins ago', read: false },
  { id: 2, title: 'Competition deadline approaching', type: 'Competition', time: '1 hour ago', read: false },
  { id: 3, title: 'System maintenance scheduled', type: 'System', time: '2 hours ago', read: true },
  { id: 4, title: 'Monthly report ready for download', type: 'Report', time: '5 hours ago', read: true },
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(mockNotifications);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-neutral-black">Notifications</h1>
          <p className="text-sm text-neutral-gray-dark mt-1">Manage system notifications and announcements.</p>
        </div>
        <button className="px-4 py-2 bg-brand-navy-900 text-white rounded-lg text-sm font-medium hover:bg-brand-navy-800 cursor-pointer flex items-center gap-2">
          <Send className="h-4 w-4" /> Send Announcement
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <button className="flex items-center gap-2 px-4 py-2 border border-neutral-gray-light rounded-lg text-sm font-medium text-neutral-gray-dark hover:bg-neutral-bg-light cursor-pointer">
          <Filter className="h-4 w-4" /> Filter
        </button>
        <button
          onClick={() => setNotifications(prev => prev.map(n => ({ ...n, read: true })))}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-brand-red-600 hover:text-brand-red-700 cursor-pointer"
        >
          <CheckCircle className="h-4 w-4" /> Mark all as read
        </button>
      </div>

      <div className="rounded-xl border border-neutral-gray-light bg-white shadow-sm divide-y divide-neutral-gray-light">
        {notifications.map((notif) => (
          <div key={notif.id} className={`p-4 flex items-start gap-3 hover:bg-neutral-bg-light/50 ${!notif.read ? 'bg-blue-50/30' : ''}`}>
            <div className={`p-2 rounded-lg mt-0.5 ${!notif.read ? 'bg-blue-100' : 'bg-neutral-bg-light'}`}>
              <Bell className={`h-4 w-4 ${!notif.read ? 'text-blue-600' : 'text-neutral-gray-medium'}`} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className={`text-sm ${!notif.read ? 'font-semibold text-neutral-black' : 'text-neutral-gray-dark'}`}>{notif.title}</p>
                {!notif.read && <span className="h-2 w-2 rounded-full bg-blue-500 flex-shrink-0" />}
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-neutral-bg-light text-neutral-gray-medium">{notif.type}</span>
                <span className="text-xs text-neutral-gray-medium">{notif.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
