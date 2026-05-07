import React from 'react';

interface ProfessionalTabProps {
  profileData: {
    employmentStatus: string;
    occupation: string;
    industry: string;
    company: string;
    skills: string;
    portfolioLinks: string;
  };
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onEmploymentStatusChange: (status: string) => void;
}

export default function ProfessionalTab({
  profileData,
  onInputChange,
  onEmploymentStatusChange,
}: ProfessionalTabProps) {
  const employmentOptions = [
    'Employed (Full Time)',
    'Self Employed (Business Owner)',
    'Student',
    'Unemployed',
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-6">Professional Experience</h2>

      {/* Employment Status */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-4">Employment Status</label>
        <div className="flex flex-wrap gap-4">
          {employmentOptions.map((status) => (
            <button
              key={status}
              onClick={() => onEmploymentStatusChange(status)}
              className={`px-3 lg:px-6 py-1.5 text-xs lg:text-md cursor-pointer lg:py-2.5 font-semibold rounded-lg border transition-all ${
                profileData.employmentStatus === status
                  ? 'bg-blue-900 text-white border-blue-900'
                  : 'bg-white text-gray-900 border-gray-300 hover:border-gray-400'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Row 1 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">Occupation</label>
          <input
            type="text"
            name="occupation"
            value={profileData.occupation}
            onChange={onInputChange}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">Industry</label>
          <input
            type="text"
            name="industry"
            value={profileData.industry}
            onChange={onInputChange}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Company / Organization
          </label>
          <input
            type="text"
            name="company"
            value={profileData.company}
            onChange={onInputChange}
            placeholder="e.g., GreenTech Solutions"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Skills / Expertise */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">Skills / Expertise</label>
        <textarea
          name="skills"
          value={profileData.skills}
          onChange={onInputChange}
          placeholder="Separate multiple skills with commas"
          rows={3}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
        />
      </div>

      {/* Portfolio Links */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">Portfolio (Add Links)</label>
        <textarea
          name="portfolioLinks"
          value={profileData.portfolioLinks}
          onChange={onInputChange}
          placeholder="Add one URL per line"
          rows={3}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
        />
        <p className="text-gray-500 text-xs mt-2">Add one URL per line</p>
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
        <div className="text-blue-600 shrink-0">ℹ️</div>
        <p className="text-blue-800 text-sm">
          <strong>Financial Information</strong>
          <br />
          Payment methods, billing address, and transaction history can be managed in the
          Dashboard under &quot;Invoices&quot; section.
        </p>
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
