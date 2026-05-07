import React from 'react';

interface InterestsTabProps {
  profileData: {
    interests: string;
  };
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

export default function InterestsTab({ profileData, onInputChange }: InterestsTabProps) {
  const interestsList = profileData.interests
    .split(',')
    .map((interest) => interest.trim())
    .filter((interest) => interest.length > 0);

  return (
    <div className="space-y-6">
      <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-6">Interests</h2>

      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          Your Interests (Fields)
        </label>
        <textarea
          name="interests"
          value={profileData.interests}
          onChange={onInputChange}
          placeholder="Separate multiple interests with commas"
          rows={4}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
        />
        <p className="text-gray-500 text-xs mt-2">Separate multiple interests with commas</p>
      </div>

      {/* Current Interests Tags */}
      {interestsList.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Current Interests</h3>
          <div className="flex flex-wrap gap-2">
            {interestsList.map((interest, idx) => (
              <span key={idx} className="px-3 py-1.5 bg-gray-200 text-gray-900 text-sm rounded-full">
                {interest}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Save Button */}
      <div className="flex justify-end gap-4 pt-8 border-t border-gray-200">
        <button className="px-3 cursor-pointer lg:px-8 py-1.5 lg:py-2.5 border border-gray-300 text-gray-900 font-semibold rounded-lg text-xs lg:text-md hover:bg-gray-50 transition-colors">
          Cancel
        </button>
        <button className="px-3 cursor-pointer lg:px-8 py-1.5 lg:py-2.5 text-xs lg:text-md bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2">
          Save & Proceed
        </button>
      </div>
    </div>
  );
}
