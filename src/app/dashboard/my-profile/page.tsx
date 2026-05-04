'use client';

import { useState } from 'react';
import { User, BookOpen, Briefcase, Heart, Lock } from 'lucide-react';

export default function MyProfilePage() {
  const [activeTab, setActiveTab] = useState('personal');
  const [profileData, setProfileData] = useState({
    fullName: 'Wisdomcezeh',
    username: '@claire_iwu',
    gender: 'Female',
    dateOfBirth: '02/23/1997',
    governmentId: 'FE/23/70886398',
    bio: 'Passionate about renewable energy and sustainable development in Africa',
    email: 'wisdomcezeh@gmail.com',
    phone: '+234 805 675 0798',
    alternativePhone: '',
    address: '14 Ahunanya Street',
    city: 'Umungasi',
    stateOfOrigin: 'Imo State',
    stateOfResidence: 'Abia State',
    localGovernment: 'Aba South',
    country: 'Nigeria',
    zipCode: '',
    website: 'https://example.com',
    linkedin: 'https://www.linkedin.com/in/claire-iwu',
    twitter: 'https://twitter.com/username',
    facebook: 'https://facebook.com/username',
    instagram: 'https://instagram.com/username',
  });

  const tabs = [
    { id: 'personal', label: 'Personal Information', icon: User },
    { id: 'education', label: 'Education and Skills', icon: BookOpen },
    { id: 'professional', label: 'Professional Experience', icon: Briefcase },
    { id: 'interests', label: 'Interests', icon: Heart },
    { id: 'security', label: 'System & Security', icon: Lock },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto">
      {/* Profile Header */}
      <div className="bg-linear-to-r from-slate-900 to-slate-700 rounded-2xl p-8 mb-8 text-white relative">
        <div className="flex items-end gap-6">
          <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center border-4 border-white shadow-lg -mb-8">
            <div className="w-28 h-28 bg-linear-to-br from-gray-700 to-gray-900 rounded-full flex items-center justify-center text-white text-5xl font-bold">
              W
            </div>
          </div>
          <div className="flex-1 pb-4">
            <h1 className="text-4xl font-bold mb-2">{profileData.fullName}</h1>
            <p className="text-gray-300 mb-3 text-sm">{profileData.governmentId}</p>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div className="bg-white h-2 rounded-full" style={{ width: '100%' }} />
            </div>
            <p className="text-sm text-gray-300 mt-2">100% Complete</p>
          </div>
          <button className="px-6 py-2.5 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors whitespace-nowrap">
            ✓ Verified
          </button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 mb-8">
        <div className="flex flex-wrap border-b border-gray-200 overflow-x-auto">
          {tabs.map((tab) => {
            const TabIcon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 font-medium text-sm border-b-2 transition-all whitespace-nowrap ${
                  isActive
                    ? 'border-green-600 text-green-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                <TabIcon size={18} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="p-8">
          {activeTab === 'personal' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Personal Information</h2>

              {/* Row 1 */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    value={profileData.fullName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Username *</label>
                  <input
                    type="text"
                    name="username"
                    value={profileData.username}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Gender *</label>
                  <select
                    name="gender"
                    value={profileData.gender}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option>Female</option>
                    <option>Male</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Date of Birth *</label>
                  <input
                    type="text"
                    name="dateOfBirth"
                    value={profileData.dateOfBirth}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Government ID Code *</label>
                  <input
                    type="text"
                    name="governmentId"
                    value={profileData.governmentId}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>

              {/* Bio */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Bio / About Me *</label>
                <textarea
                  name="bio"
                  value={profileData.bio}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              {/* Contact Information */}
              <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">Contact Information</h3>

              {/* Contact Row 1 */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Alternative Number</label>
                  <input
                    type="tel"
                    name="alternativePhone"
                    value={profileData.alternativePhone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>

              {/* Contact Row 2 */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={profileData.address}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">City</label>
                  <input
                    type="text"
                    name="city"
                    value={profileData.city}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">State of Origin</label>
                  <input
                    type="text"
                    name="stateOfOrigin"
                    value={profileData.stateOfOrigin}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>

              {/* Contact Row 3 */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">State of Residence</label>
                  <input
                    type="text"
                    name="stateOfResidence"
                    value={profileData.stateOfResidence}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Local Government of Residence</label>
                  <input
                    type="text"
                    name="localGovernment"
                    value={profileData.localGovernment}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Country</label>
                  <input
                    type="text"
                    name="country"
                    value={profileData.country}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>

              {/* Contact Row 4 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Zip / Postal Code</label>
                  <input
                    type="text"
                    name="zipCode"
                    value={profileData.zipCode}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Website</label>
                  <input
                    type="url"
                    name="website"
                    value={profileData.website}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>

              {/* Social Media Links */}
              <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">Social Media Links</h3>

              {/* Social Row 1 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">LinkedIn Profile</label>
                  <input
                    type="url"
                    name="linkedin"
                    value={profileData.linkedin}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Twitter Profile</label>
                  <input
                    type="url"
                    name="twitter"
                    value={profileData.twitter}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>

              {/* Social Row 2 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Facebook Profile</label>
                  <input
                    type="url"
                    name="facebook"
                    value={profileData.facebook}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Instagram Profile</label>
                  <input
                    type="url"
                    name="instagram"
                    value={profileData.instagram}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>

              {/* Save Button */}
              <div className="flex justify-end gap-4 pt-6 border-t border-gray-200 mt-8">
                <button className="px-8 py-2.5 border border-gray-300 text-gray-900 font-semibold rounded-lg hover:bg-gray-50 transition-colors">
                  Cancel
                </button>
                <button className="px-8 py-2.5 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors">
                  Save & Proceed
                </button>
              </div>
            </div>
          )}

          {/* Other Tabs Placeholder */}
          {activeTab !== 'personal' && (
            <div className="text-center py-12">
              <p className="text-gray-600">Content for {tabs.find(t => t.id === activeTab)?.label} will be added soon.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {}
