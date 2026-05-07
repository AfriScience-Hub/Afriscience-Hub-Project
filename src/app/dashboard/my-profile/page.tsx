'use client';

import { useState } from 'react';
import { User, BookOpen, Briefcase, Heart, Lock } from 'lucide-react';

import ProfileHeader from './components/ProfileHeader';
import PersonalTab from './components/PersonalTab';
import EducationTab from './components/EducationTab';
import ProfessionalTab from './components/ProfessionalTab';
import InterestsTab from './components/InterestsTab';
import SecurityTab from './components/SecurityTab';

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

    educationLevel: "Bachelor's Degree",
    institution: 'University of Lagos',
    courseOfStudy: 'Electrical Engineering',
    yearOfGraduation: '2023',
    graduationClass: 'First Class',
    nyscCompleted: true,
    linkedinUrl: 'https://www.linkedin.com/in/claire-iwu',
    skillLevel: 'Advanced',
    englishProficiency: 'Advanced',
    otherLanguages: 'Igbo, Yoruba',

    employmentStatus: 'Employed (Full Time)',
    occupation: 'Renewable Energy Consultant',
    industry: 'Energy & Power',
    company: 'GreenTech Solutions',
    skills: 'Solar Energy, Power Systems Design, Project Management',
    portfolioLinks: 'https://github.com/username\nhttps://behance.net/username\nhttps://portfolio-site.com',

    interests: 'Renewable Energy, Sustainable Agriculture, Climate Change, Innovation',

    securityQuestion: "What is your mother's maiden name?",
    securityAnswer: '',
  });

  const tabs = [
    { id: 'personal', label: 'Personal Information', icon: User },
    { id: 'education', label: 'Education and Skills', icon: BookOpen },
    { id: 'professional', label: 'Professional Experience', icon: Briefcase },
    { id: 'interests', label: 'Interests', icon: Heart },
    { id: 'security', label: 'System & Security', icon: Lock },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSkillLevelChange = (level: string) => {
    setProfileData((prev) => ({ ...prev, skillLevel: level }));
  };

  const handleNyscChange = (completed: boolean) => {
    setProfileData((prev) => ({ ...prev, nyscCompleted: completed }));
  };

  const handleEmploymentStatusChange = (status: string) => {
    setProfileData((prev) => ({ ...prev, employmentStatus: status }));
  };

  return (
    <div className="max-w-6xl mx-auto lg:px-8">
      <ProfileHeader
        fullName={profileData.fullName}
        governmentId={profileData.governmentId}
        completionPercentage={80}
      />

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Tab Navigation */}
        <div className="flex w-full overflow-x-auto scrollbar-hide border-b border-gray-200">
          {tabs.map((tab) => {
            const TabIcon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center cursor-pointer gap-2 px-6 py-4 font-medium text-xs md:text-sm border-b-2 transition-all whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'border-green-600 text-green-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                <TabIcon size={18} />
                <span className="hidden md:inline">{tab.label}</span>
                <span className="md:hidden">{tab.label.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="p-4 lg:p-8">
          {activeTab === 'personal' && (
            <PersonalTab profileData={profileData} onInputChange={handleInputChange} />
          )}

          {activeTab === 'education' && (
            <EducationTab
              profileData={profileData}
              onInputChange={handleInputChange}
              onSkillLevelChange={handleSkillLevelChange}
              onNyscChange={handleNyscChange}
            />
          )}

          {activeTab === 'professional' && (
            <ProfessionalTab
              profileData={profileData}
              onInputChange={handleInputChange}
              onEmploymentStatusChange={handleEmploymentStatusChange}
            />
          )}

          {activeTab === 'interests' && (
            <InterestsTab profileData={profileData} onInputChange={handleInputChange} />
          )}

          {activeTab === 'security' && (
            <SecurityTab profileData={profileData} onInputChange={handleInputChange} />
          )}
        </div>
      </div>
       <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}