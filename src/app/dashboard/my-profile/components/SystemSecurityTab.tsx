'use client';

import { Eye, EyeOff, Activity } from 'lucide-react';

interface SystemSecurityTabProps {
  govIdCode: string;
  password: string; onPasswordChange: (v: string) => void;
  showPassword: boolean; onShowPasswordChange: (v: boolean) => void;
  securityQuestion: string; onSecurityQuestionChange: (v: string) => void;
  securityAnswer: string; onSecurityAnswerChange: (v: string) => void;
}

export function SystemSecurityTab(props: SystemSecurityTabProps) {
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

      <div>
        <label className="block text-sm font-medium text-neutral-gray-dark mb-2">Change Password</label>
        <div className="relative">
          <input type={props.showPassword ? 'text' : 'password'} value={props.password} onChange={e => props.onPasswordChange(e.target.value)} placeholder="Enter new password" className="w-full px-3 py-2 pr-10 rounded-lg border border-neutral-gray-light bg-neutral-bg-light focus:outline-none focus:border-brand-navy-900" />
          <button type="button" onClick={() => props.onShowPasswordChange(!props.showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-gray-medium hover:text-neutral-black">
            {props.showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
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
