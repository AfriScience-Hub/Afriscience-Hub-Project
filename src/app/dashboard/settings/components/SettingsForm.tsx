'use client';

import { User, Mail, Phone, Lock, Save } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import type { User as UserType } from '../../../context/AuthContext';

interface SettingsFormProps {
  user: UserType;
  settingsName: string;
  settingsEmail: string;
  settingsPhone: string;
  onNameChange: (val: string) => void;
  onEmailChange: (val: string) => void;
  onPhoneChange: (val: string) => void;
  onSave: (e: React.FormEvent) => void;
}

export default function SettingsForm({
  user, settingsName, settingsEmail, settingsPhone,
  onNameChange, onEmailChange, onPhoneChange, onSave
}: SettingsFormProps) {
  return (
    <form onSubmit={onSave} className="space-y-6 max-w-lg">
      <div className="flex items-center gap-4">
        <img src={user.avatar} alt={user.name} className="h-16 w-16 rounded-full object-cover border-2 border-brand-navy-100" />
        <div>
          <p className="text-sm font-bold text-neutral-black">{user.name}</p>
          <button type="button" className="text-xs text-brand-red-600 hover:underline font-medium mt-0.5">Change Avatar</button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-black mb-1">Full Name</label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-gray-medium pointer-events-none" />
          <input type="text" value={settingsName} onChange={e => onNameChange(e.target.value)}
            className="w-full rounded-lg border border-neutral-gray-light pl-10 pr-4 py-2.5 text-sm focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-black mb-1">Email Address</label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-gray-medium pointer-events-none" />
          <input type="email" value={settingsEmail} onChange={e => onEmailChange(e.target.value)}
            className="w-full rounded-lg border border-neutral-gray-light pl-10 pr-4 py-2.5 text-sm focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-black mb-1">Phone Number</label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-gray-medium pointer-events-none" />
          <input type="tel" value={settingsPhone} onChange={e => onPhoneChange(e.target.value)}
            className="w-full rounded-lg border border-neutral-gray-light pl-10 pr-4 py-2.5 text-sm focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600"
            placeholder="+234 800 000 0000" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-black mb-2">Email Notifications</label>
        <div className="space-y-2">
          {['New bookings & inquiries', 'Invoice updates', 'Messages from other users', 'Platform updates & news'].map(pref => (
            <label key={pref} className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-neutral-gray-light text-brand-red-600 focus:ring-brand-red-600" />
              <span className="text-sm text-neutral-gray-dark">{pref}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-black mb-1">Change Password</label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-gray-medium pointer-events-none" />
          <input type="password" placeholder="Enter new password"
            className="w-full rounded-lg border border-neutral-gray-light pl-10 pr-4 py-2.5 text-sm focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600" />
        </div>
        <p className="text-xs text-neutral-gray-medium mt-1">Leave blank to keep current password.</p>
      </div>

      <Button type="submit" className="bg-brand-navy-900 hover:bg-brand-navy-800">
        <Save className="h-4 w-4 mr-2" /> Save Changes
      </Button>
    </form>
  );
}
