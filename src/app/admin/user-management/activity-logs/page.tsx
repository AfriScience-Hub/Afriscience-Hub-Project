'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Search, Download, ChevronLeft, ChevronRight, UserPlus, Edit3, CheckCircle, Send, FileText, AlertTriangle, MessageSquare, Trash2, Activity, Users, Shield, Clock, Database } from 'lucide-react';
import { MOCK_ACTIVITIES, STATS, ACTIONS, USERS, ROLES, type ActivityLog } from './data';
import ActivityDetailPanel from './components/ActivityDetailPanel';

const ACTION_ICON_MAP = {
  create: { icon: UserPlus, bg: 'bg-purple-100', color: 'text-purple-600' },
  update: { icon: Edit3, bg: 'bg-blue-100', color: 'text-blue-600' },
  approve: { icon: CheckCircle, bg: 'bg-green-100', color: 'text-green-600' },
  send: { icon: Send, bg: 'bg-indigo-100', color: 'text-indigo-600' },
  generate: { icon: FileText, bg: 'bg-teal-100', color: 'text-teal-600' },
  fail: { icon: AlertTriangle, bg: 'bg-red-100', color: 'text-red-600' },
  reply: { icon: MessageSquare, bg: 'bg-orange-100', color: 'text-orange-600' },
  delete: { icon: Trash2, bg: 'bg-red-100', color: 'text-red-600' },
};

const ROLE_COLORS: Record<string, string> = {
  'Super Admin': 'bg-purple-100 text-purple-700',
  'Admin': 'bg-blue-100 text-blue-700',
  'Content Admin': 'bg-teal-100 text-teal-700',
  'Support Admin': 'bg-yellow-100 text-yellow-700',
  'Finance Admin': 'bg-green-100 text-green-700',
  'Community Admin': 'bg-orange-100 text-orange-700',
  'Tech Admin': 'bg-indigo-100 text-indigo-700',
  'Analytics Admin': 'bg-pink-100 text-pink-700',
  'System': 'bg-gray-100 text-gray-700',
};

const STAT_ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  'total': Activity,
  'today': Clock,
  'admin': Users,
  'user': Users,
  'security': Shield,
  'data': Database,
};

export default function ActivityLogsPage() {
  const [selectedActivity, setSelectedActivity] = useState<ActivityLog | null>(MOCK_ACTIVITIES[0]);
  const [selectedIds, setSelectedIds] = useState<number[]>([1]);
  const [search, setSearch] = useState('');
  const [actionFilter, setActionFilter] = useState('All Actions');
  const [userFilter, setUserFilter] = useState('All Users');
  const [roleFilter, setRoleFilter] = useState('All Roles');
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(20);

  const toggleSelectAll = () => {
    if (selectedIds.length === MOCK_ACTIVITIES.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(MOCK_ACTIVITIES.map((a) => a.id));
    }
  };

  const toggleSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="flex h-full">
      <div className="flex-1 min-w-0 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-[11px] text-neutral-gray-medium mb-0.5">
              <span>Dashboard</span>
              <span>/</span>
              <span>User Management</span>
              <span>/</span>
              <span className="text-neutral-black font-medium">Activity Logs</span>
            </div>
            <h1 className="text-xl font-bold text-neutral-black">Activity Logs</h1>
          </div>
          <button className="flex items-center gap-1.5 px-3 py-1.5 border border-neutral-gray-light rounded-lg text-xs font-medium text-neutral-gray-dark hover:bg-neutral-bg-light cursor-pointer">
            <Download className="h-3.5 w-3.5" />
            Export Logs
          </button>
        </div>

        <div className="grid grid-cols-6 gap-3">
          {STATS.map((stat, idx) => {
            const statKeys = ['total', 'today', 'admin', 'user', 'security', 'data'];
            const IconComp = STAT_ICON_MAP[statKeys[idx]];
            const iconColors = ['bg-purple-100 text-purple-600', 'bg-green-100 text-green-600', 'bg-pink-100 text-pink-600', 'bg-blue-100 text-blue-600', 'bg-red-100 text-red-600', 'bg-indigo-100 text-indigo-600'];
            return (
              <div key={stat.label} className="bg-white rounded-lg border border-neutral-gray-light p-3">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center ${iconColors[idx]}`}>
                  {IconComp && <IconComp className="h-3.5 w-3.5" />}
                </div>
                <p className="text-lg font-bold text-neutral-black mt-1.5">{stat.value}</p>
                <p className="text-[10px] text-neutral-gray-medium mt-0.5">{stat.label}</p>
                <p className={`text-[10px] mt-0.5 ${stat.positive === false ? 'text-red-500' : 'text-green-600'}`}>{stat.sub}</p>
              </div>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-neutral-gray-medium" />
            <input
              type="text"
              placeholder="Search by admin, user, action, or description..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-neutral-gray-light focus:border-[#453DD8] focus:ring-1 focus:ring-[#453DD8] outline-none"
            />
          </div>
          <select
            value={actionFilter}
            onChange={(e) => setActionFilter(e.target.value)}
            className="px-2.5 py-1.5 text-xs rounded-lg border border-neutral-gray-light text-neutral-gray-dark bg-white cursor-pointer outline-none"
          >
            {ACTIONS.map((a) => <option key={a}>{a}</option>)}
          </select>
          <select
            value={userFilter}
            onChange={(e) => setUserFilter(e.target.value)}
            className="px-2.5 py-1.5 text-xs rounded-lg border border-neutral-gray-light text-neutral-gray-dark bg-white cursor-pointer outline-none"
          >
            {USERS.map((u) => <option key={u}>{u}</option>)}
          </select>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-2.5 py-1.5 text-xs rounded-lg border border-neutral-gray-light text-neutral-gray-dark bg-white cursor-pointer outline-none"
          >
            {ROLES.map((r) => <option key={r}>{r}</option>)}
          </select>
          <div className="relative">
            <input
              type="text"
              placeholder="May 20, 2025 - May 27, 2025"
              className="px-2.5 py-1.5 text-xs rounded-lg border border-neutral-gray-light text-neutral-gray-dark bg-white cursor-pointer outline-none w-[180px]"
              readOnly
            />
          </div>
          <button className="flex items-center gap-1.5 px-3 py-1.5 border border-neutral-gray-light rounded-lg text-xs font-medium text-neutral-gray-dark hover:bg-neutral-bg-light cursor-pointer">
            <span>&#x2715;</span> Filters
          </button>
        </div>

        <div className="bg-white rounded-lg border border-neutral-gray-light overflow-hidden">
          <table className="w-full text-[11px]">
            <thead>
              <tr className="border-b border-neutral-gray-light bg-neutral-bg-light/50">
                <th className="w-8 px-3 py-2">
                  <input
                    type="checkbox"
                    checked={selectedIds.length === MOCK_ACTIVITIES.length}
                    onChange={toggleSelectAll}
                    className="rounded border-neutral-gray-light w-3 h-3"
                  />
                </th>
                <th className="text-left px-3 py-2 text-[10px] font-semibold text-neutral-gray-medium">Date & Time</th>
                <th className="text-left px-3 py-2 text-[10px] font-semibold text-neutral-gray-medium">User</th>
                <th className="text-left px-3 py-2 text-[10px] font-semibold text-neutral-gray-medium">Role</th>
                <th className="text-left px-3 py-2 text-[10px] font-semibold text-neutral-gray-medium">Action</th>
                <th className="text-left px-3 py-2 text-[10px] font-semibold text-neutral-gray-medium">Description</th>
                <th className="text-left px-3 py-2 text-[10px] font-semibold text-neutral-gray-medium">IP Address</th>
                <th className="text-left px-3 py-2 text-[10px] font-semibold text-neutral-gray-medium">Location</th>
                <th className="text-left px-3 py-2 text-[10px] font-semibold text-neutral-gray-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_ACTIVITIES.map((activity) => {
                const actionMeta = ACTION_ICON_MAP[activity.actionIcon];
                const ActionIcon = actionMeta.icon;
                const isSelected = selectedIds.includes(activity.id);
                const isActiveRow = selectedActivity?.id === activity.id;

                return (
                  <tr
                    key={activity.id}
                    className={`border-b border-neutral-gray-light last:border-0 cursor-pointer transition-colors ${
                      isActiveRow ? 'bg-[#453DD8]/5' : isSelected ? 'bg-blue-50/50' : 'hover:bg-neutral-bg-light/50'
                    }`}
                    onClick={() => setSelectedActivity(activity)}
                  >
                    <td className="px-3 py-2" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleSelect(activity.id)}
                        className="rounded border-neutral-gray-light w-3 h-3"
                      />
                    </td>
                    <td className="px-3 py-2">
                      <p className="text-[11px] font-medium text-neutral-black">{activity.date}</p>
                      <p className="text-[9px] text-neutral-gray-medium">{activity.time}</p>
                      <p className="text-[9px] text-neutral-gray-medium">{activity.relativeTime}</p>
                    </td>
                    <td className="px-3 py-2">
                      <div className="flex items-center gap-2">
                        <Image src={activity.userAvatar} alt={activity.userName} width={24} height={24} className="rounded-full object-cover" />
                        <div>
                          <p className="text-[11px] font-medium text-neutral-black">{activity.userName}</p>
                          <p className="text-[9px] text-neutral-gray-medium">{activity.userEmail}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-2">
                      <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-semibold ${ROLE_COLORS[activity.role] || 'bg-gray-100 text-gray-700'}`}>
                        {activity.role}
                      </span>
                    </td>
                    <td className="px-3 py-2">
                      <div className="flex items-center gap-1.5">
                        <div className={`p-0.5 rounded-full ${actionMeta.bg}`}>
                          <ActionIcon className={`h-3 w-3 ${actionMeta.color}`} />
                        </div>
                        <span className="text-[11px] font-medium text-neutral-black">{activity.action}</span>
                      </div>
                    </td>
                    <td className="px-3 py-2">
                      <p className="text-[11px] text-neutral-black max-w-[200px] truncate">{activity.description}</p>
                    </td>
                    <td className="px-3 py-2">
                      <span className="text-[11px] text-neutral-black font-mono">{activity.ipAddress}</span>
                    </td>
                    <td className="px-3 py-2">
                      <div className="flex items-center gap-1">
                        <span className="text-[11px]">{activity.country === 'Nigeria' ? '🇳🇬' : activity.country === 'United States' ? '🇺🇸' : '🌍'}</span>
                        <div>
                          <p className="text-[10px] font-medium text-neutral-black">{activity.country}</p>
                          <p className="text-[9px] text-neutral-gray-medium">{activity.city}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-2">
                      <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-semibold ${
                        activity.status === 'Success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        <span className={`w-1 h-1 rounded-full ${activity.status === 'Success' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                        {activity.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="flex items-center justify-between px-3 py-2 border-t border-neutral-gray-light">
            <p className="text-[11px] text-neutral-gray-medium">Showing 1 to {MOCK_ACTIVITIES.length} of 2,456 activities</p>
            <div className="flex items-center gap-1">
              <button className="p-1 rounded-lg border border-neutral-gray-light hover:bg-neutral-bg-light cursor-pointer">
                <ChevronLeft className="h-3.5 w-3.5 text-neutral-gray-medium" />
              </button>
              {[1, 2, 3, 4, 5].map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-6 h-6 rounded text-[11px] font-medium cursor-pointer ${
                    currentPage === page
                      ? 'bg-[#453DD8] text-white'
                      : 'border border-neutral-gray-light text-neutral-gray-dark hover:bg-neutral-bg-light'
                  }`}
                >
                  {page}
                </button>
              ))}
              <span className="text-neutral-gray-medium text-[11px]">...</span>
              <button className="w-6 h-6 rounded border border-neutral-gray-light text-[11px] font-medium text-neutral-gray-dark hover:bg-neutral-bg-light cursor-pointer">
                123
              </button>
              <button className="p-1 rounded-lg border border-neutral-gray-light hover:bg-neutral-bg-light cursor-pointer">
                <ChevronRight className="h-3.5 w-3.5 text-neutral-gray-medium" />
              </button>
              <select
                value={perPage}
                onChange={(e) => setPerPage(Number(e.target.value))}
                className="ml-1 px-1.5 py-1 text-[10px] rounded border border-neutral-gray-light text-neutral-gray-dark bg-white cursor-pointer outline-none"
              >
                <option value={20}>20 per page</option>
                <option value={50}>50 per page</option>
                <option value={100}>100 per page</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {selectedActivity && (
        <ActivityDetailPanel activity={selectedActivity} onClose={() => setSelectedActivity(null)} />
      )}
    </div>
  );
}
