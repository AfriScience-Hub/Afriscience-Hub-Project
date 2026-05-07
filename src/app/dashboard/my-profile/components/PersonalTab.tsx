import React from 'react';

interface PersonalTabProps {
  profileData: {
    fullName: string;
    username: string;
    gender: string;
    dateOfBirth: string;
    governmentId: string;
    bio: string;
    email: string;
    phone: string;
    alternativePhone: string;
    address: string;
    city: string;
    stateOfOrigin: string;
    stateOfResidence: string;
    localGovernment: string;
    country: string;
    zipCode: string;
    website: string;
    linkedin: string;
    twitter: string;
    facebook: string;
    instagram: string;
  };
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

export default function PersonalTab({ profileData, onInputChange }: PersonalTabProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-6">Personal Information</h2>

      {/* Row 1 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">Full Name *</label>
          <input
            type="text"
            name="fullName"
            value={profileData.fullName}
            onChange={onInputChange}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">Username *</label>
          <input
            type="text"
            name="username"
            value={profileData.username}
            onChange={onInputChange}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">Gender *</label>
          <select
            name="gender"
            value={profileData.gender}
            onChange={onInputChange}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none cursor-pointer"
          >
            <option>Female</option>
            <option>Male</option>
            <option>Other</option>
          </select>
        </div>
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">Date of Birth *</label>
          <input
            type="text"
            name="dateOfBirth"
            value={profileData.dateOfBirth}
            onChange={onInputChange}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">Government ID Code *</label>
          <input
            type="text"
            name="governmentId"
            value={profileData.governmentId}
            onChange={onInputChange}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Bio */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">Bio / About Me *</label>
        <textarea
          name="bio"
          value={profileData.bio}
          onChange={onInputChange}
          rows={4}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
        />
      </div>

      {/* Contact Information Section */}
      <div className="border-t border-gray-200 pt-8">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Contact Information</h3>

        {/* Contact Row 1 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Email *</label>
            <input
              type="email"
              name="email"
              value={profileData.email}
              onChange={onInputChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Phone Number *</label>
            <input
              type="tel"
              name="phone"
              value={profileData.phone}
              onChange={onInputChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Alternative Number</label>
            <input
              type="tel"
              name="alternativePhone"
              value={profileData.alternativePhone}
              onChange={onInputChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Contact Row 2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Address</label>
            <input
              type="text"
              name="address"
              value={profileData.address}
              onChange={onInputChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">City</label>
            <input
              type="text"
              name="city"
              value={profileData.city}
              onChange={onInputChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">State of Origin</label>
            <input
              type="text"
              name="stateOfOrigin"
              value={profileData.stateOfOrigin}
              onChange={onInputChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Contact Row 3 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">State of Residence</label>
            <input
              type="text"
              name="stateOfResidence"
              value={profileData.stateOfResidence}
              onChange={onInputChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Local Government</label>
            <input
              type="text"
              name="localGovernment"
              value={profileData.localGovernment}
              onChange={onInputChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Country</label>
            <input
              type="text"
              name="country"
              value={profileData.country}
              onChange={onInputChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Contact Row 4 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Zip / Postal Code</label>
            <input
              type="text"
              name="zipCode"
              value={profileData.zipCode}
              onChange={onInputChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Website</label>
            <input
              type="url"
              name="website"
              value={profileData.website}
              onChange={onInputChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Social Media Links Section */}
      <div className="border-t border-gray-200 pt-8">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Social Media Links</h3>

        {/* Social Row 1 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">LinkedIn Profile</label>
            <input
              type="url"
              name="linkedin"
              value={profileData.linkedin}
              onChange={onInputChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Twitter Profile</label>
            <input
              type="url"
              name="twitter"
              value={profileData.twitter}
              onChange={onInputChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Social Row 2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Facebook Profile</label>
            <input
              type="url"
              name="facebook"
              value={profileData.facebook}
              onChange={onInputChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Instagram Profile</label>
            <input
              type="url"
              name="instagram"
              value={profileData.instagram}
              onChange={onInputChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end gap-4 pt-8 border-t border-gray-200">
        <button className="px-3 lg:px-8 py-1.5 lg:py-2.5 border cursor-pointer border-gray-300 text-gray-900 font-semibold rounded-lg text-xs lg:text-md hover:bg-gray-50 transition-colors">
          Cancel
        </button>
        <button className="px-3 lg:px-8 py-1.5 lg:py-2.5 text-xs lg:text-md cursor-pointer bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2">
          Save & Proceed
        </button>
      </div>
    </div>
  );
}
