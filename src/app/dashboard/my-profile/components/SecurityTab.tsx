import React from 'react';

interface SecurityTabProps {
  profileData: {
    securityQuestion: string;
    securityAnswer: string;
  };
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const ACTIVITY_LOG = [
  {
    icon: '📝',
    title: 'Profile updated',
    timestamp: 'April 8, 2026 at 10:45 AM',
    location: 'Lagos, Nigeria',
  },
  {
    icon: '🔐',
    title: 'Logged in',
    timestamp: 'April 8, 2026 at 10:30 AM',
    location: 'Lagos, Nigeria',
  },
  {
    icon: '⭐',
    title: 'New innovation listed',
    timestamp: 'April 7, 2026 at 3:20 PM',
    location: 'Lagos, Nigeria',
  },
  {
    icon: '👁️',
    title: 'Profile viewed by Dr. Wanjiku',
    timestamp: 'April 6, 2026 at 1:15 AM',
    location: 'N/A',
  },
  {
    icon: '🔑',
    title: 'Password changed',
    timestamp: 'April 5, 2026 at 9:50 AM',
    location: 'Lagos, Nigeria',
  },
];

export default function SecurityTab({ profileData, onInputChange }: SecurityTabProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-6">System & Security</h2>

      {/* System Generated Info */}
      <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
        <h3 className="text-lg font-bold text-gray-900 mb-4">System-Generated Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <p className="text-gray-600 text-sm">Account Creation Date</p>
            <p className="text-gray-900 font-semibold">March 15, 2026</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Last Login</p>
            <p className="text-gray-900 font-semibold">April 8, 2026 at 10:45 AM</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">User Role</p>
            <p className="text-green-600 font-semibold">User</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">ID Tag</p>
            <p className="text-gray-900 font-semibold">FE/23/70886398</p>
          </div>
        </div>
      </div>

      {/* Recent Activity Log */}
      <div className="border-t border-gray-200 pt-8">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Activity Log</h3>
        <div className="space-y-3">
          {ACTIVITY_LOG.map((activity, idx) => (
            <div key={idx} className="flex gap-3 pb-3 border-b border-gray-200 last:border-b-0">
              <div className="text-gray-400 text-lg">{activity.icon}</div>
              <div>
                <p className="text-gray-900 font-semibold text-sm">{activity.title}</p>
                <p className="text-gray-500 text-xs">
                  {activity.timestamp} • {activity.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Security Settings */}
      <div className="border-t border-gray-200 pt-8">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Security Settings</h3>

        <div className="space-y-6">
          {/* Change Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Change Password
            </label>
            <input
              type="password"
              placeholder="Enter new password"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          {/* Security Question */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Security Question
            </label>
            <select
              name="securityQuestion"
              value={profileData.securityQuestion}
              onChange={onInputChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none cursor-pointer"
            >
              <option>What is your mother&apos;s maiden name?</option>
              <option>What was the name of your first pet?</option>
              <option>In what city were you born?</option>
              <option>What is your favorite book?</option>
            </select>
          </div>

          {/* Security Answer */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Security Answer
            </label>
            <input
              type="text"
              name="securityAnswer"
              value={profileData.securityAnswer}
              onChange={onInputChange}
              placeholder="Your answer"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end gap-4 pt-8 border-t border-gray-200">
        <button className="px-3 lg:px-8 py-1.5 cursor-pointer lg:py-2.5 border border-gray-300 text-gray-900 font-semibold rounded-lg text-xs lg:text-md hover:bg-gray-50 transition-colors">
          Cancel
        </button>
        <button className="px-3 lg:px-8 py-1.5 lg:py-2.5 text-xs lg:text-md cursor-pointer bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2">
          Save & Proceed
        </button>
      </div>
    </div>
  );
}
