'use client';

import { useState } from 'react';
import { User, GraduationCap, Briefcase, Heart, Shield, Save } from 'lucide-react';
import { useAuth } from '@/app/context/AuthContext';
import { toast } from 'sonner';
import { Button } from '@/app/components/ui/Button';
import { ProfileHeader } from './components/ProfileHeader';
import { ProfileTabs } from './components/ProfileTabs';
import { PersonalInfoTab } from './components/PersonalInfoTab';
import { EducationSkillsTab } from './components/EducationSkillsTab';
import { ProfessionalExpTab } from './components/ProfessionalExpTab';
import { InterestsTab } from './components/InterestsTab';
import { SystemSecurityTab } from './components/SystemSecurityTab';

type TabKey = 'personal' | 'education' | 'professional' | 'interests' | 'system';

const TABS = [
  { key: 'personal' as const, label: 'Personal Information', icon: User },
  { key: 'education' as const, label: 'Education and Skills', icon: GraduationCap },
  { key: 'professional' as const, label: 'Professional Experience', icon: Briefcase },
  { key: 'interests' as const, label: 'Interests', icon: Heart },
  { key: 'system' as const, label: 'System & Security', icon: Shield },
];

export function ProfileContent() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<TabKey>('personal');
  const [showPassword, setShowPassword] = useState(false);

  const [fullName, setFullName] = useState(user?.name || 'Claire Iwuanyanwu');
  const [username, setUsername] = useState('@claire_iwu');
  const [bio, setBio] = useState('Passionate about renewable energy and sustainable development in Africa');
  const [gender, setGender] = useState('Female');
  const [dateOfBirth, setDateOfBirth] = useState('1997-02-23');
  const [govIdCode, setGovIdCode] = useState('FE/23/70886398');

  const [email, setEmail] = useState(user?.email || 'claire.iwuanyanwu@afriscience.org');
  const [phone, setPhone] = useState(user?.phone || '+234 805 675 0798');
  const [altPhone, setAltPhone] = useState('');
  const [address, setAddress] = useState('14 Ahunanya Street');
  const [city, setCity] = useState('Umungasi');
  const [stateProvince, setStateProvince] = useState('Imo State');
  const [stateOfResidence, setStateOfResidence] = useState('Abia State');
  const [localGovt, setLocalGovt] = useState('Aba South');
  const [country, setCountry] = useState('Nigeria');
  const [zipCode, setZipCode] = useState('');
  const [website, setWebsite] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('https://www.linkedin.com/in/claire-iwu');
  const [twitterUrl, setTwitterUrl] = useState('');
  const [facebookUrl, setFacebookUrl] = useState('');
  const [instagramUrl, setInstagramUrl] = useState('');

  const [educationLevel, setEducationLevel] = useState("Bachelor's Degree");
  const [graduationClass, setGraduationClass] = useState('First Class');
  const [institution, setInstitution] = useState('University of Lagos');
  const [courseOfStudy, setCourseOfStudy] = useState('Electrical Engineering');
  const [yearOfGraduation, setYearOfGraduation] = useState('2023');
  const [completedNYSC, setCompletedNYSC] = useState('Yes');
  const [skillLevel, setSkillLevel] = useState('Advanced');
  const [englishProficiency, setEnglishProficiency] = useState('Advanced');
  const [otherLanguages, setOtherLanguages] = useState('Igbo, Yoruba');
  const [cvFile, setCvFile] = useState<File | null>(null);

  const [employmentStatus, setEmploymentStatus] = useState('Student');
  const [occupation, setOccupation] = useState('Renewable Energy Consultant');
  const [industry, setIndustry] = useState('Energy & Power');
  const [companyOrganization, setCompanyOrganization] = useState('');
  const [skillsExpertise, setSkillsExpertise] = useState('Solar Energy, Power Systems Design, Project Management');
  const [portfolioLinks, setPortfolioLinks] = useState('');

  const [password, setPassword] = useState('');
  const [securityQuestion, setSecurityQuestion] = useState("What is your mother's maiden name?");
  const [securityAnswer, setSecurityAnswer] = useState('');

  const [interests, setInterests] = useState('Renewable Energy, Sustainable Agriculture, Climate Change, Innovation');

  const calculateCompletion = () => {
    const fields = [
      fullName, username, bio, gender, dateOfBirth, govIdCode,
      email, phone, address, city, stateProvince, country,
      educationLevel, institution, courseOfStudy, yearOfGraduation,
      employmentStatus, occupation, industry, skillsExpertise
    ];
    const filled = fields.filter(f => f && f.toString().trim() !== '').length;
    return Math.round((filled / fields.length) * 100);
  };

  const completionPct = calculateCompletion();

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Profile updated successfully!');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCvFile(file);
      toast.success('CV uploaded successfully!');
    }
  };

  return (
    <>
      <ProfileHeader fullName={fullName} govIdCode={govIdCode} completionPct={completionPct} avatar={user?.avatar} />

      <div className="rounded-2xl border border-neutral-gray-light bg-white shadow-sm overflow-hidden">
        <ProfileTabs tabs={TABS} activeTab={activeTab} onTabChange={(key) => setActiveTab(key as TabKey)} />

        <form onSubmit={handleSaveProfile} className="p-6 space-y-6">
          {activeTab === 'personal' && (
            <PersonalInfoTab
              fullName={fullName} onFullNameChange={setFullName}
              username={username} onUsernameChange={setUsername}
              gender={gender} onGenderChange={setGender}
              dateOfBirth={dateOfBirth} onDateOfBirthChange={setDateOfBirth}
              govIdCode={govIdCode} onGovIdCodeChange={setGovIdCode}
              bio={bio} onBioChange={setBio}
              email={email} onEmailChange={setEmail}
              phone={phone} onPhoneChange={setPhone}
              altPhone={altPhone} onAltPhoneChange={setAltPhone}
              address={address} onAddressChange={setAddress}
              city={city} onCityChange={setCity}
              stateProvince={stateProvince} onStateProvinceChange={setStateProvince}
              stateOfResidence={stateOfResidence} onStateOfResidenceChange={setStateOfResidence}
              localGovt={localGovt} onLocalGovtChange={setLocalGovt}
              country={country} onCountryChange={setCountry}
              zipCode={zipCode} onZipCodeChange={setZipCode}
              website={website} onWebsiteChange={setWebsite}
              linkedinUrl={linkedinUrl} onLinkedinUrlChange={setLinkedinUrl}
              twitterUrl={twitterUrl} onTwitterUrlChange={setTwitterUrl}
              facebookUrl={facebookUrl} onFacebookUrlChange={setFacebookUrl}
              instagramUrl={instagramUrl} onInstagramUrlChange={setInstagramUrl}
            />
          )}

          {activeTab === 'education' && (
            <EducationSkillsTab
              educationLevel={educationLevel} onEducationLevelChange={setEducationLevel}
              graduationClass={graduationClass} onGraduationClassChange={setGraduationClass}
              institution={institution} onInstitutionChange={setInstitution}
              courseOfStudy={courseOfStudy} onCourseOfStudyChange={setCourseOfStudy}
              yearOfGraduation={yearOfGraduation} onYearOfGraduationChange={setYearOfGraduation}
              completedNYSC={completedNYSC} onCompletedNYSCChange={setCompletedNYSC}
              skillLevel={skillLevel} onSkillLevelChange={setSkillLevel}
              englishProficiency={englishProficiency} onEnglishProficiencyChange={setEnglishProficiency}
              otherLanguages={otherLanguages} onOtherLanguagesChange={setOtherLanguages}
              cvFile={cvFile}
              linkedinUrl={linkedinUrl} onLinkedinUrlChange={setLinkedinUrl}
              handleFileUpload={handleFileUpload}
            />
          )}

          {activeTab === 'professional' && (
            <ProfessionalExpTab
              employmentStatus={employmentStatus} onEmploymentStatusChange={setEmploymentStatus}
              occupation={occupation} onOccupationChange={setOccupation}
              industry={industry} onIndustryChange={setIndustry}
              companyOrganization={companyOrganization} onCompanyOrganizationChange={setCompanyOrganization}
              skillsExpertise={skillsExpertise} onSkillsExpertiseChange={setSkillsExpertise}
              portfolioLinks={portfolioLinks} onPortfolioLinksChange={setPortfolioLinks}
            />
          )}

          {activeTab === 'interests' && (
            <InterestsTab interests={interests} onInterestsChange={setInterests} />
          )}

          {activeTab === 'system' && (
            <SystemSecurityTab
              govIdCode={govIdCode}
              password={password} onPasswordChange={setPassword}
              showPassword={showPassword} onShowPasswordChange={setShowPassword}
              securityQuestion={securityQuestion} onSecurityQuestionChange={setSecurityQuestion}
              securityAnswer={securityAnswer} onSecurityAnswerChange={setSecurityAnswer}
            />
          )}

          <div className="flex justify-end pt-6 border-t border-neutral-gray-light">
            <Button type="submit" className="bg-green-600 hover:bg-green-700 gap-2">
              <Save className="h-4 w-4" />
              Save & Proceed
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
