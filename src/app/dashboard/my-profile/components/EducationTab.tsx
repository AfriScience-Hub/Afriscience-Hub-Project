import React from 'react';
import { Upload } from 'lucide-react';

interface EducationTabProps {
  profileData: {
    educationLevel: string;
    institution: string;
    courseOfStudy: string;
    yearOfGraduation: string;
    graduationClass: string;
    nyscCompleted: boolean;
    linkedinUrl: string;
    skillLevel: string;
    englishProficiency: string;
    otherLanguages: string;
  };
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onSkillLevelChange: (level: string) => void;
  onNyscChange: (completed: boolean) => void;
}

export default function EducationTab({
  profileData,
  onInputChange,
  onSkillLevelChange,
  onNyscChange,
}: EducationTabProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-6">Education and Skills</h2>

      {/* Education Row 1 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">Education Level</label>
          <select
            name="educationLevel"
            value={profileData.educationLevel}
            onChange={onInputChange}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none cursor-pointer"
          >
            <option>High School</option>
            <option>Diploma</option>
            <option>Bachelor&apos;s Degree</option>
            <option>Master&apos;s Degree</option>
            <option>PhD</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">Institution Attended</label>
          <input
            type="text"
            name="institution"
            value={profileData.institution}
            onChange={onInputChange}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">Course of Study</label>
          <input
            type="text"
            name="courseOfStudy"
            value={profileData.courseOfStudy}
            onChange={onInputChange}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Education Row 2 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">Year of Graduation</label>
          <input
            type="text"
            name="yearOfGraduation"
            value={profileData.yearOfGraduation}
            onChange={onInputChange}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">Graduation Class</label>
          <select
            name="graduationClass"
            value={profileData.graduationClass}
            onChange={onInputChange}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none cursor-pointer"
          >
            <option>First Class</option>
            <option>Second Class Upper</option>
            <option>Second Class Lower</option>
            <option>Third Class</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">NYSC Completed?</label>
          <div className="flex gap-6 pt-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                checked={profileData.nyscCompleted}
                onChange={() => onNyscChange(true)}
                className="w-4 h-4"
              />
              <span className="text-gray-900">Yes</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                checked={!profileData.nyscCompleted}
                onChange={() => onNyscChange(false)}
                className="w-4 h-4"
              />
              <span className="text-gray-900">No</span>
            </label>
          </div>
        </div>
      </div>

      {/* CV Upload */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">Upload your CV (PDF)</label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-green-500 transition-colors cursor-pointer">
          <Upload size={32} className="mx-auto text-gray-400 mb-2" />
          <p className="text-gray-600 text-sm">Choose File</p>
          <p className="text-gray-400 text-xs">No file chosen</p>
        </div>
      </div>

      {/* LinkedIn URL */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          LinkedIn Profile URL
        </label>
        <input
          type="url"
          name="linkedinUrl"
          value={profileData.linkedinUrl}
          onChange={onInputChange}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
      </div>

      {/* Skill Level */}
      <div className="border-t border-gray-200 pt-8">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Skill Level</h3>
        <div className="flex scroll-auto overflow-auto gap-4 mb-6">
          {['Beginner', 'Intermediate', 'Advanced'].map((level) => (
            <button
              key={level}
              onClick={() => onSkillLevelChange(level)}
              className={`px-3 lg:px-6 py-2 lg:py-3 text-xs lg:text-md cursor-pointer font-semibold rounded-lg border transition-all ${
                profileData.skillLevel === level
                  ? 'bg-blue-900 text-white border-blue-900'
                  : 'bg-white text-gray-900 border-gray-300 hover:border-gray-400'
              }`}
            >
              {level}
            </button>
          ))}
        </div>

        {/* Language Proficiency */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              English Proficiency
            </label>
            <select
              name="englishProficiency"
              value={profileData.englishProficiency}
              onChange={onInputChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none cursor-pointer"
            >
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
              <option>Fluent</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Other Languages
            </label>
            <input
              type="text"
              name="otherLanguages"
              value={profileData.otherLanguages}
              onChange={onInputChange}
              placeholder="e.g. Igbo, Yoruba"
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
