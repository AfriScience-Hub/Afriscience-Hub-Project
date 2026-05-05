'use client';

import { useState } from 'react';
import { User, Mail, Phone, Lock, Save } from 'lucide-react';

export default function SettingsPage() {
  const [formData, setFormData] = useState({
    fullName: 'Wisdomcezeh',
    email: 'wisdomcezeh@gmail.com',
    phone: '+234 805 675 0798',
    notifications: {
      bookings: true,
      invoices: true,
      messages: true,
      updates: true,
    },
    newPassword: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNotificationChange = (key: keyof typeof formData.notifications) => {
    setFormData(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key]
      }
    }));
  };

  const handleSave = () => {
    // Handle save logic
    console.log('Saving settings:', formData);
  };

  return (
    <div className="max-w-4xl mx-auto">

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 space-y-8">
      <h1 className="text-xl lg:text-2xl font-bold text-gray-900 mb-8">Account Settings</h1>
        {/* Avatar Section */}
        <div className="flex items-center gap-6 pb-8 border-b border-gray-200">
          <div className="w-20 h-20 bg-linear-to-br from-gray-700 to-gray-900 rounded-full flex items-center justify-center text-white text-3xl font-bold shrink-0">
            W
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Wisdomcezeh</h3>
            <button className="text-red-600 hover:text-red-700 font-medium text-sm transition-colors">
              Change Avatar
            </button>
          </div>
        </div>

        {/* Full Name */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">Full Name</label>
          <div className="relative">
            <User size={18} className="absolute left-3 top-3.5 text-gray-400" />
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Email Address */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">Email Address</label>
          <div className="relative">
            <Mail size={18} className="absolute left-3 top-3.5 text-gray-400" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">Phone Number</label>
          <div className="relative">
            <Phone size={18} className="absolute left-3 top-3.5 text-gray-400" />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Email Notifications */}
        <div className="pb-8 border-b border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-4">Email Notifications</h3>
          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.notifications.bookings}
                onChange={() => handleNotificationChange('bookings')}
                className="w-4 h-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
              />
              <span className="text-sm text-gray-700">New bookings & inquiries</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.notifications.invoices}
                onChange={() => handleNotificationChange('invoices')}
                className="w-4 h-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
              />
              <span className="text-sm text-gray-700">Invoice updates</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.notifications.messages}
                onChange={() => handleNotificationChange('messages')}
                className="w-4 h-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
              />
              <span className="text-sm text-gray-700">Messages from other users</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.notifications.updates}
                onChange={() => handleNotificationChange('updates')}
                className="w-4 h-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
              />
              <span className="text-sm text-gray-700">Platform updates & news</span>
            </label>
          </div>
        </div>

        {/* Change Password */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-4">Change Password</h3>
          <div className="relative mb-2">
            <Lock size={18} className="absolute left-3 top-3.5 text-gray-400" />
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleInputChange}
              placeholder="Enter new password"
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
          <p className="text-xs text-gray-600">Leave blank to keep current password.</p>
        </div>

        {/* Save Button */}
        <div className="flex justify-start pt-4">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-2.5 bg-gray-900 text-white font-semibold rounded-lg hover:bg-black transition-colors"
          >
            <Save size={18} />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
