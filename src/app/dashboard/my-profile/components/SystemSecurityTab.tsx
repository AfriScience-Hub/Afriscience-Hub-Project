'use client';

import { useEffect } from 'react';
import { Eye, EyeOff, Activity, Smartphone, Monitor, LogOut, RefreshCw } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchSessions } from '@/store/authSlice';
import { Button } from '@/app/components/ui/Button';
import { toast } from 'sonner';

interface SystemSecurityTabProps {
  govIdCode: string;
  oldPassword: string; onOldPasswordChange: (v: string) => void;
  newPassword: string; onNewPasswordChange: (v: string) => void;
  showOldPassword: boolean; onShowOldPasswordChange: (v: boolean) => void;
  showNewPassword: boolean; onShowNewPasswordChange: (v: boolean) => void;
  securityQuestion: string; onSecurityQuestionChange: (v: string) => void;
  securityAnswer: string; onSecurityAnswerChange: (v: string) => void;
}

export function SystemSecurityTab(props: SystemSecurityTabProps) {
  const dispatch = useAppDispatch();
  const { sessions, sessionsLoading, sessionsError } = useAppSelector(s => s.auth);

  useEffect(() => {
    dispatch(fetchSessions() as any);
  }, [dispatch]);

  const handleRefresh = () => {
    dispatch(fetchSessions() as any).then((res: any) => {
      if (fetchSessions.rejected.match(res)) toast.error(res.payload as string);
    });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-bold text-neutral-black">System-Generated Information</h3>

      <div className="rounded-lg bg-neutral-bg-light border border-neutral-gray-light p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-neutral-gray-medium mb-1">Account Creation Date</p>
            <p className="text-sm font-medium text-neutral-black">March 15, 2026</p>
          </div>
          <div>
            <p className="text-xs text-neutral-gray-medium mb-1">Last Login</p>
            <p className="text-sm font-medium text-neutral-black">April 8, 2026 at 10:45 AM</p>
          </div>
          <div>
            <p className="text-xs text-neutral-gray-medium mb-1">User Role</p>
            <span className="inline-flex px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">User</span>
          </div>
          <div>
            <p className="text-xs text-neutral-gray-medium mb-1">ID Tag</p>
            <p className="text-sm font-medium text-neutral-black">{props.govIdCode}</p>
          </div>
        </div>
      </div>

      {/* Active Sessions */}
      <div className="space-y-3">
        <div className="flex items-center justify-between pt-2">
          <h3 className="text-lg font-bold text-neutral-black">Active Sessions</h3>
          <Button variant="outline" size="sm" onClick={handleRefresh} disabled={sessionsLoading} className="h-8">
            <RefreshCw className={`h-4 w-4 mr-1 ${sessionsLoading ? 'animate-spin' : ''}`} /> Refresh
          </Button>
        </div>
        <p className="text-xs text-neutral-gray-medium">View and manage your active sessions across different devices. Revoke any session you don&apos;t recognize.</p>

        <div className="rounded-lg border border-neutral-gray-light overflow-hidden">
          {sessionsLoading ? (
            <div className="p-8 text-center text-sm text-neutral-gray-medium">Loading sessions...</div>
          ) : sessionsError ? (
            <div className="p-8 text-center">
              <p className="text-sm text-red-600">{sessionsError}</p>
              <Button variant="outline" size="sm" onClick={handleRefresh} className="mt-3">Retry</Button>
            </div>
          ) : sessions.length === 0 ? (
            <div className="p-8 text-center">
              <Smartphone className="h-8 w-8 mx-auto text-neutral-gray-light mb-2" />
              <p className="text-sm font-medium text-neutral-black">No active sessions</p>
              <p className="text-xs text-neutral-gray-medium">Sessions will appear here when you log in from a new device.</p>
            </div>
          ) : (
            <div className="divide-y divide-neutral-gray-light">
              {sessions.map((sess: any, idx: number) => {
                const isCurrent = sess.current || sess.isCurrent || idx === 0;
                return (
                  <div key={sess.id || idx} className="p-4 flex items-start gap-3 hover:bg-neutral-bg-light transition-colors">
                    <div className={`h-10 w-10 rounded-lg flex items-center justify-center flex-shrink-0 ${isCurrent ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}`}>
                      {sess.device?.toLowerCase().includes('mobile') ? <Smartphone className="h-5 w-5" /> : <Monitor className="h-5 w-5" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-neutral-black truncate">{sess.device || sess.browser || 'Unknown device'}</p>
                        {isCurrent && <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-[10px] font-bold">Current</span>}
                      </div>
                      <p className="text-xs text-neutral-gray-medium truncate">
                        {[sess.os, sess.ip, sess.location].filter(Boolean).join(' • ') || sess.createdAt || sess.lastActive || 'Active now'}
                      </p>
                      {sess.lastActive && <p className="text-[11px] text-neutral-gray-medium">Last active: {sess.lastActive}</p>}
                    </div>
                    {!isCurrent && (
                      <Button variant="outline" size="sm" className="h-8 text-red-600 border-red-200 hover:bg-red-50" onClick={() => toast.info('Revoke session coming soon')}>
                        <LogOut className="h-3.5 w-3.5 mr-1" /> Logout
                      </Button>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <h3 className="text-lg font-bold text-neutral-black pt-4">Recent Activity Log</h3>

      <div className="rounded-lg border border-neutral-gray-light overflow-hidden">
        <div className="divide-y divide-neutral-gray-light">
          {[
            { action: 'Profile updated', time: 'April 8, 2026 at 10:45 AM', location: 'Lagos, Nigeria' },
            { action: 'Logged in', time: 'April 8, 2026 at 10:30 AM', location: 'Lagos, Nigeria' },
            { action: 'New innovation listed', time: 'April 7, 2026 at 3:20 PM', location: 'Lagos, Nigeria' },
            { action: 'Profile viewed by Dr. Wanjiku', time: 'April 6, 2026 at 11:15 AM', location: 'N/A' },
            { action: 'Password changed', time: 'April 5, 2026 at 9:00 AM', location: 'Lagos, Nigeria' },
          ].map((log, idx) => (
            <div key={idx} className="p-4 hover:bg-neutral-bg-light transition-colors flex items-center gap-3">
              <Activity className="h-4 w-4 text-neutral-gray-medium flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-medium text-neutral-black">{log.action}</p>
                <p className="text-xs text-neutral-gray-medium mt-0.5">{log.time} &bull; {log.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <h3 className="text-lg font-bold text-neutral-black pt-4">Security Settings</h3>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-neutral-gray-dark mb-2">Old Password</label>
          <div className="relative">
            <input type={props.showOldPassword ? 'text' : 'password'} value={props.oldPassword} onChange={e => props.onOldPasswordChange(e.target.value)} placeholder="Enter old password" className="w-full px-3 py-2 pr-10 rounded-lg border border-neutral-gray-light bg-neutral-bg-light focus:outline-none focus:border-brand-navy-900" />
            <button type="button" onClick={() => props.onShowOldPasswordChange(!props.showOldPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-gray-medium hover:text-neutral-black cursor-pointer">
              {props.showOldPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-gray-dark mb-2">New Password</label>
          <div className="relative">
            <input type={props.showNewPassword ? 'text' : 'password'} value={props.newPassword} onChange={e => props.onNewPasswordChange(e.target.value)} placeholder="Enter new password" className="w-full px-3 py-2 pr-10 rounded-lg border border-neutral-gray-light bg-neutral-bg-light focus:outline-none focus:border-brand-navy-900" />
            <button type="button" onClick={() => props.onShowNewPasswordChange(!props.showNewPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-gray-medium hover:text-neutral-black cursor-pointer">
              {props.showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-neutral-gray-dark mb-2">Security Question</label>
          <select value={props.securityQuestion} onChange={e => props.onSecurityQuestionChange(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-neutral-gray-light bg-neutral-bg-light focus:outline-none focus:border-brand-navy-900">
            <option value="What is your mother's maiden name?">What is your mother's maiden name?</option>
            <option value="What was the name of your first pet?">What was the name of your first pet?</option>
            <option value="What city were you born in?">What city were you born in?</option>
            <option value="What is your favorite book?">What is your favorite book?</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-gray-dark mb-2">Security Answer</label>
          <input type="text" value={props.securityAnswer} onChange={e => props.onSecurityAnswerChange(e.target.value)} placeholder="Your answer" className="w-full px-3 py-2 rounded-lg border border-neutral-gray-light bg-neutral-bg-light focus:outline-none focus:border-brand-navy-900" />
        </div>
      </div>
    </div>
  );
}
