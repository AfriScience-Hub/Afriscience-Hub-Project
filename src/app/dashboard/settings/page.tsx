'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { toast } from 'sonner';
import SettingsForm from './components/SettingsForm';

export default function SettingsPage() {
  const { user } = useAuth();
  const [settingsName, setSettingsName] = useState(user?.name || '');
  const [settingsEmail, setSettingsEmail] = useState(user?.email || '');
  const [settingsPhone, setSettingsPhone] = useState(user?.phone || '');

  const { updateUser } = useAuth();

  useEffect(() => {
    if (user) {
      setSettingsName(user.name);
      setSettingsEmail(user.email);
      setSettingsPhone(user.phone);
    }
  }, [user]);

  if (!user) return null;

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({ name: settingsName, email: settingsEmail, phone: settingsPhone });
    toast.success('Settings saved successfully!');
  };

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-neutral-gray-light bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-neutral-black mb-6">Account Settings</h2>
        <SettingsForm
          user={user}
          settingsName={settingsName}
          settingsEmail={settingsEmail}
          settingsPhone={settingsPhone}
          onNameChange={setSettingsName}
          onEmailChange={setSettingsEmail}
          onPhoneChange={setSettingsPhone}
          onSave={handleSaveSettings}
        />
      </div>
    </div>
  );
}
