'use client';

import { useEffect, useState, useMemo } from 'react';
import {
  Eye, EyeOff, Activity, Smartphone,
  Monitor, RefreshCw, ChevronLeft, ChevronRight,
  Globe, Tablet
} from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchSessions, UserSession } from '@/store/authSlice';
import { Button } from '@/app/components/ui/Button';
import { toast } from 'sonner';

function parseUserAgent(ua?: string): { browser: string; os: string; device: string } {
  if (!ua) return { browser: 'Unknown', os: 'Unknown', device: 'Unknown' };

  let browser = 'Unknown';
  if (ua.includes('Edg/')) browser = 'Edge';
  else if (ua.includes('Chrome/')) browser = 'Chrome';
  else if (ua.includes('Firefox/')) browser = 'Firefox';
  else if (ua.includes('Safari/')) browser = 'Safari';
  else if (ua.includes('Opera') || ua.includes('OPR/')) browser = 'Opera';

  let os = 'Unknown';
  if (ua.includes('Windows NT 10')) os = 'Windows 10';
  else if (ua.includes('Windows NT 11') || ua.includes('Windows NT 10.0')) os = 'Windows 11';
  else if (ua.includes('Windows')) os = 'Windows';
  else if (ua.includes('Android')) os = 'Android';
  else if (ua.includes('iPhone') || ua.includes('iPad')) os = 'iOS';
  else if (ua.includes('Mac OS X')) os = 'macOS';
  else if (ua.includes('Linux')) os = 'Linux';

  let device = 'Desktop';
  if (ua.includes('Mobile') || ua.includes('Android')) device = 'Mobile';
  else if (ua.includes('iPad') || ua.includes('Tablet')) device = 'Tablet';

  return { browser, os, device };
}

function DeviceIcon({ ua, className }: { ua?: string; className?: string }) {
  const { device } = parseUserAgent(ua);
  const cls = className || 'h-5 w-5';
  if (device === 'Mobile') return <Smartphone className={cls} />;
  if (device === 'Tablet') return <Tablet className={cls} />;
  return <Monitor className={cls} />;
}

function formatRelativeTime(dateStr?: string | null): string {
  if (!dateStr) return 'Unknown';
  const d = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 1) return 'Just now';
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h ago`;
  const diffDay = Math.floor(diffHr / 24);
  if (diffDay < 7) return `${diffDay}d ago`;
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

interface SystemSecurityTabProps {
  govIdCode: string;
  oldPassword: string;
  onOldPasswordChange: (v: string) => void;
  newPassword: string;
  onNewPasswordChange: (v: string) => void;
  showOldPassword: boolean;
  onShowOldPasswordChange: (v: boolean) => void;
  showNewPassword: boolean;
  onShowNewPasswordChange: (v: boolean) => void;
  securityQuestion: string;
  onSecurityQuestionChange: (v: string) => void;
  securityAnswer: string;
  onSecurityAnswerChange: (v: string) => void;
}

export function SystemSecurityTab(props: SystemSecurityTabProps) {
  const dispatch = useAppDispatch();
  const { sessions, sessionsPagination, sessionsLoading, sessionsError } = useAppSelector(s => s.auth);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchSessions({ page, limit: 5 }) as any);
  }, [dispatch, page]);

  const handleRefresh = () => {
    dispatch(fetchSessions({ page, limit: 5 }) as any).then((res: any) => {
      if (fetchSessions.rejected.match(res)) toast.error(res.payload as string);
    });
  };

  const currentSessionId = useMemo(() => {
    if (sessions.length === 0) return null;
    const valid = sessions.filter(s => !s.revokedAt && new Date(s.expiresAt || 0) > new Date());
    if (valid.length === 0) return sessions[0]?.id;
    const sorted = [...valid].sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
    return sorted[0]?.id;
  }, [sessions]);

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
            <>
              <div className="divide-y divide-neutral-gray-light">
                {sessions.map((sess) => {
                  const isCurrent = sess.id === currentSessionId;
                  const isRevoked = !!sess.revokedAt;
                  const isExpired = sess.expiresAt ? new Date(sess.expiresAt) < new Date() : false;
                  const { browser, os, device } = parseUserAgent(sess.userAgent);
                  const meta = [os, sess.ipAddress, device].filter(Boolean).join(' \u2022 ');

                  return (
                    <div key={sess.id} className="p-4 flex items-start gap-3 hover:bg-neutral-bg-light transition-colors">
                      <div className={`h-10 w-10 rounded-lg flex items-center justify-center flex-shrink-0 ${isCurrent ? 'bg-green-100 text-green-700' : isRevoked || isExpired ? 'bg-red-50 text-red-400' : 'bg-slate-100 text-slate-600'}`}>
                        <DeviceIcon ua={sess.userAgent} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="text-sm font-medium text-neutral-black truncate">
                            {sess.deviceName || `${browser} on ${os}`}
                          </p>
                          {isCurrent && <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-[10px] font-bold">Current</span>}
                          {isRevoked && <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-600 text-[10px] font-bold">Revoked</span>}
                          {isExpired && !isRevoked && <span className="px-2 py-0.5 rounded-full bg-orange-100 text-orange-600 text-[10px] font-bold">Expired</span>}
                        </div>
                        <p className="text-xs text-neutral-gray-medium truncate mt-0.5">{meta || sess.ipAddress || 'Unknown'}</p>
                        <p className="text-xs text-neutral-gray-medium mt-0.5">
                          {sess.createdAt ? `Logged in ${formatRelativeTime(sess.createdAt)}` : 'Unknown'}
                          {sess.expiresAt && ` \u2022 Expires ${new Date(sess.expiresAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
              {sessionsPagination && sessionsPagination.totalPages > 1 && (
                <div className="flex items-center justify-between px-4 py-3 border-t border-neutral-gray-light bg-neutral-bg-light">
                  <p className="text-xs text-neutral-gray-medium">
                    Page {sessionsPagination.page} of {sessionsPagination.totalPages} ({sessionsPagination.totalItems} sessions)
                  </p>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline" size="sm" className="h-8"
                      disabled={!sessionsPagination.hasPrevious || sessionsLoading}
                      onClick={() => setPage(p => Math.max(1, p - 1))}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    {Array.from({ length: sessionsPagination.totalPages }, (_, i) => i + 1).map(p => (
                      <Button
                        key={p}
                        variant={p === page ? 'default' : 'outline'}
                        size="sm"
                        className={`h-8 w-8 p-0 ${p === page ? 'bg-[#453DD8] text-white' : ''}`}
                        onClick={() => setPage(p)}
                        disabled={sessionsLoading}
                      >
                        {p}
                      </Button>
                    ))}
                    <Button
                      variant="outline" size="sm" className="h-8"
                      disabled={!sessionsPagination.hasNext || sessionsLoading}
                      onClick={() => setPage(p => p + 1)}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </>
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
            <option value="What is your mother's maiden name?">What is your mother&apos;s maiden name?</option>
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
