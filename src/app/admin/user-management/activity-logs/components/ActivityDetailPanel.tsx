'use client';

import React from 'react';
import Image from 'next/image';
import { X, UserPlus, Edit3, CheckCircle, Send, FileText, AlertTriangle, MessageSquare, Trash2 } from 'lucide-react';
import type { ActivityLog } from '../data';

interface ActivityDetailPanelProps {
  activity: ActivityLog;
  onClose: () => void;
}

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

export default function ActivityDetailPanel({ activity, onClose }: ActivityDetailPanelProps) {
  const actionMeta = ACTION_ICON_MAP[activity.actionIcon];
  const ActionIcon = actionMeta.icon;

  return (
    <div className="w-[280px] flex-shrink-0 border-l border-neutral-gray-light bg-white overflow-y-auto ml-4">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xs font-bold text-neutral-black">Activity Details</h3>
          <button onClick={onClose} className="p-1 rounded hover:bg-neutral-bg-light cursor-pointer">
            <X className="h-4 w-4 text-neutral-gray-medium" />
          </button>
        </div>

        <div className="flex items-start gap-2.5 mb-4">
          <div className={`p-2 rounded-full ${actionMeta.bg}`}>
            <ActionIcon className={`h-4 w-4 ${actionMeta.color}`} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <p className="text-[11px] font-bold text-neutral-black">{activity.action}</p>
              <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[8px] font-semibold ${
                activity.status === 'Success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {activity.status}
              </span>
            </div>
            <p className="text-[9px] text-neutral-gray-medium mt-0.5">
              {activity.date} at {activity.time}
            </p>
            <p className="text-[9px] text-neutral-gray-medium">{activity.relativeTime}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="text-[9px] font-semibold text-neutral-gray-medium uppercase tracking-wider mb-2">General Information</h4>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-neutral-gray-dark">Admin</span>
                <div className="flex items-center gap-1.5">
                  <Image src={activity.userAvatar} alt={activity.userName} width={16} height={16} className="rounded-full object-cover" />
                  <span className="text-[10px] font-medium text-neutral-black">{activity.userName}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-neutral-gray-dark">Role</span>
                <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[8px] font-semibold ${ROLE_COLORS[activity.role] || 'bg-gray-100 text-gray-700'}`}>
                  {activity.role}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-neutral-gray-dark">IP Address</span>
                <span className="text-[10px] font-medium text-neutral-black">{activity.ipAddress}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-neutral-gray-dark">Location</span>
                <span className="text-[10px] font-medium text-neutral-black">{activity.country}, {activity.city}</span>
              </div>
              {activity.userAgent && (
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-neutral-gray-dark">User Agent</span>
                  <span className="text-[9px] font-medium text-neutral-black text-right max-w-[150px] truncate">{activity.userAgent}</span>
                </div>
              )}
            </div>
          </div>

          <div>
            <h4 className="text-[9px] font-semibold text-neutral-gray-medium uppercase tracking-wider mb-2">Action Information</h4>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-neutral-gray-dark">Action</span>
                <span className="text-[10px] font-medium text-neutral-black">{activity.action}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-neutral-gray-dark">Description</span>
                <span className="text-[10px] font-medium text-neutral-black text-right max-w-[150px]">{activity.description}</span>
              </div>
              {activity.targetUser && (
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-neutral-gray-dark">Target User</span>
                  <div className="flex items-center gap-1.5">
                    <Image src={activity.userAvatar} alt={activity.targetUser} width={16} height={16} className="rounded-full object-cover" />
                    <span className="text-[10px] font-medium text-neutral-black">{activity.targetUser}</span>
                  </div>
                </div>
              )}
              {activity.targetRole && (
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-neutral-gray-dark">Role Assigned</span>
                  <span className="text-[10px] font-medium text-neutral-black">{activity.targetRole}</span>
                </div>
              )}
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-neutral-gray-dark">Status</span>
                <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[8px] font-semibold ${
                  activity.status === 'Success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {activity.status}
                </span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-[9px] font-semibold text-neutral-gray-medium uppercase tracking-wider mb-2">Additional Information</h4>
            <div className="space-y-1.5">
              {activity.userId && (
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-neutral-gray-dark">User ID</span>
                  <span className="text-[10px] font-medium text-neutral-black">{activity.userId}</span>
                </div>
              )}
              {activity.timeTaken && (
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-neutral-gray-dark">Time Taken</span>
                  <span className="text-[10px] font-medium text-neutral-black">{activity.timeTaken}</span>
                </div>
              )}
              {activity.device && (
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-neutral-gray-dark">Device</span>
                  <span className="text-[10px] font-medium text-neutral-black">{activity.device}</span>
                </div>
              )}
              {activity.browser && (
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-neutral-gray-dark">Browser</span>
                  <span className="text-[10px] font-medium text-neutral-black">{activity.browser}</span>
                </div>
              )}
              {activity.platform && (
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-neutral-gray-dark">Platform</span>
                  <span className="text-[10px] font-medium text-neutral-black">{activity.platform}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
