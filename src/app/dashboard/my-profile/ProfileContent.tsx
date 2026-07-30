'use client';

import { useState } from 'react';
import { User, GraduationCap, Briefcase, CreditCard, Shield, Save } from 'lucide-react';
import { useAuth } from '@/app/context/AuthContext';
import { toast } from 'sonner';
import { Button } from '@/app/components/ui/Button';
import { ProfileHeader } from './components/ProfileHeader';
import { ProfileTabs } from './components/ProfileTabs';
import { PersonalInfoTab } from './components/PersonalInfoTab';
import { EducationCertTab } from './components/EducationCertTab';
import { ExperienceSkillsTab } from './components/ExperienceSkillsTab';
import { PaymentInfoTab } from './components/PaymentInfoTab';
import { SystemSecurityTab } from './components/SystemSecurityTab';

type TabKey = 'personal' | 'education' | 'experience' | 'payment' | 'system';

const TABS = [
  { key: 'personal' as const, label: 'Personal Information', icon: User },
  { key: 'education' as const, label: 'Education & Certifications', icon: GraduationCap },
  { key: 'experience' as const, label: 'Experience & Skills', icon: Briefcase },
  { key: 'payment' as const, label: 'Payment Info', icon: CreditCard },
  { key: 'system' as const, label: 'System & Security', icon: Shield },
];

function generateId() {
  return Math.random().toString(36).substring(2, 11);
}

export function ProfileContent() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<TabKey>('personal');

  const [firstName, setFirstName] = useState('Claire');
  const [middleName, setMiddleName] = useState('');
  const [surname, setSurname] = useState('Iwuanyanwu');
  const [username, setUsername] = useState('@claire_iwu');
  const [gender, setGender] = useState('Female');
  const [dateOfBirth, setDateOfBirth] = useState('1997-02-23');
  const [idCardType, setIdCardType] = useState('');
  const [idCardNumber, setIdCardNumber] = useState('FE/23/70886398');
  const [idCardFile, setIdCardFile] = useState<File | null>(null);
  const [idCardFileName, setIdCardFileName] = useState('');
  const [bio, setBio] = useState('Passionate about renewable energy and sustainable development in Africa');

  const [email, setEmail] = useState(user?.email || 'claire.iwuanyanwu@afriscience.org');
  const [phone, setPhone] = useState(user?.phone || '+234 805 675 0798');
  const [altPhone, setAltPhone] = useState('');
  const [address, setAddress] = useState('14 Ahunanya Street');
  const [city, setCity] = useState('Umungasi');
  const [stateOfResidence, setStateOfResidence] = useState('Abia State');
  const [localGovt, setLocalGovt] = useState('Aba South');
  const [country, setCountry] = useState('Nigeria');
  const [zipCode, setZipCode] = useState('');
  const [website, setWebsite] = useState('');

  const [educationLevel, setEducationLevel] = useState("Bachelor's Degree");
  const [graduationClass, setGraduationClass] = useState('First Class');
  const [courseOfStudy, setCourseOfStudy] = useState('Electrical Engineering');
  const [institution, setInstitution] = useState('University of Lagos');
  const [yearOfGraduation, setYearOfGraduation] = useState('2023');
  const [degreeCertFile, setDegreeCertFile] = useState<File | null>(null);
  const [degreeCertFileName, setDegreeCertFileName] = useState('');
  const [otherCerts, setOtherCerts] = useState<Array<{ id: string; title: string; issuer: string; year: string; file: File | null; fileName: string }>>([]);

  const [employmentStatus, setEmploymentStatus] = useState('Student');
  const [role, setRole] = useState('');
  const [industry, setIndustry] = useState('');
  const [company, setCompany] = useState('');
  const [workCountry, setWorkCountry] = useState('');
  const [resumptionDate, setResumptionDate] = useState('');
  const [roleDescription, setRoleDescription] = useState('');
  const [pastJobs, setPastJobs] = useState<Array<{ id: string; organization: string; role: string; duration: string }>>([]);
  const [skills, setSkills] = useState<Array<{ id: string; name: string }>>([]);
  const [languages, setLanguages] = useState<Array<{ id: string; name: string; proficiency: string }>>([]);
  const [portfolioLinks, setPortfolioLinks] = useState<Array<{ id: string; url: string; label: string }>>([]);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [cvFileName, setCvFileName] = useState('');

  const [paymentMethod, setPaymentMethod] = useState('');
  const [billingAddress, setBillingAddress] = useState('');

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [securityQuestion, setSecurityQuestion] = useState("What is your mother's maiden name?");
  const [securityAnswer, setSecurityAnswer] = useState('');

  const fullName = [firstName, middleName, surname].filter(Boolean).join(' ');

  const calculateCompletion = () => {
    const fields = [
      firstName, surname, username, gender, dateOfBirth, idCardType, idCardNumber, bio,
      email, phone, address, city, stateOfResidence, country,
      educationLevel, institution, courseOfStudy, yearOfGraduation,
      employmentStatus,
    ];
    const filled = fields.filter(f => f && f.toString().trim() !== '').length;
    return Math.round((filled / fields.length) * 100);
  };

  const completionPct = calculateCompletion();

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Profile updated successfully!');
  };

  const handleIdCardUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIdCardFile(file);
      setIdCardFileName(file.name);
      toast.success('ID card uploaded successfully!');
    }
  };

  const handleDegreeCertUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setDegreeCertFile(file);
      setDegreeCertFileName(file.name);
      toast.success('Degree certificate uploaded successfully!');
    }
  };

  const handleCvUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCvFile(file);
      setCvFileName(file.name);
      toast.success('CV uploaded successfully!');
    }
  };

  const addOtherCert = () => {
    setOtherCerts(prev => [...prev, { id: generateId(), title: '', issuer: '', year: '', file: null, fileName: '' }]);
  };

  const removeOtherCert = (id: string) => {
    setOtherCerts(prev => prev.filter(c => c.id !== id));
  };

  const updateOtherCert = (id: string, field: string, value: string | File | null) => {
    setOtherCerts(prev => prev.map(c => {
      if (c.id !== id) return c;
      if (field === 'file') {
        const file = value as File | null;
        return { ...c, file, fileName: file ? file.name : '' };
      }
      return { ...c, [field]: value as string };
    }));
  };

  const addPastJob = () => {
    setPastJobs(prev => [...prev, { id: generateId(), organization: '', role: '', duration: '' }]);
  };

  const removePastJob = (id: string) => {
    setPastJobs(prev => prev.filter(j => j.id !== id));
  };

  const updatePastJob = (id: string, field: string, value: string) => {
    setPastJobs(prev => prev.map(j => j.id === id ? { ...j, [field]: value } : j));
  };

  const addSkill = () => {
    setSkills(prev => [...prev, { id: generateId(), name: '' }]);
  };

  const removeSkill = (id: string) => {
    setSkills(prev => prev.filter(s => s.id !== id));
  };

  const updateSkill = (id: string, value: string) => {
    setSkills(prev => prev.map(s => s.id === id ? { ...s, name: value } : s));
  };

  const addLanguage = () => {
    setLanguages(prev => [...prev, { id: generateId(), name: '', proficiency: '' }]);
  };

  const removeLanguage = (id: string) => {
    setLanguages(prev => prev.filter(l => l.id !== id));
  };

  const updateLanguage = (id: string, field: string, value: string) => {
    setLanguages(prev => prev.map(l => l.id === id ? { ...l, [field]: value } : l));
  };

  const addPortfolioLink = () => {
    setPortfolioLinks(prev => [...prev, { id: generateId(), url: '', label: '' }]);
  };

  const removePortfolioLink = (id: string) => {
    setPortfolioLinks(prev => prev.filter(p => p.id !== id));
  };

  const updatePortfolioLink = (id: string, field: string, value: string) => {
    setPortfolioLinks(prev => prev.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  return (
    <>
      <ProfileHeader fullName={fullName} govIdCode={idCardNumber} completionPct={completionPct} avatar={user?.avatar} />

      <div className="rounded-2xl border border-neutral-gray-light bg-white shadow-sm overflow-hidden">
        <ProfileTabs tabs={TABS} activeTab={activeTab} onTabChange={(key) => setActiveTab(key as TabKey)} />

        <form onSubmit={handleSaveProfile} className="p-6 space-y-6">
          {activeTab === 'personal' && (
            <PersonalInfoTab
              firstName={firstName} onFirstNameChange={setFirstName}
              middleName={middleName} onMiddleNameChange={setMiddleName}
              surname={surname} onSurnameChange={setSurname}
              username={username} onUsernameChange={setUsername}
              gender={gender} onGenderChange={setGender}
              dateOfBirth={dateOfBirth} onDateOfBirthChange={setDateOfBirth}
              idCardType={idCardType} onIdCardTypeChange={setIdCardType}
              idCardNumber={idCardNumber} onIdCardNumberChange={setIdCardNumber}
              idCardFile={idCardFile} idCardFileName={idCardFileName} handleIdCardUpload={handleIdCardUpload}
              bio={bio} onBioChange={setBio}
              email={email} onEmailChange={setEmail}
              phone={phone} onPhoneChange={setPhone}
              altPhone={altPhone} onAltPhoneChange={setAltPhone}
              address={address} onAddressChange={setAddress}
              city={city} onCityChange={setCity}
              stateOfResidence={stateOfResidence} onStateOfResidenceChange={setStateOfResidence}
              localGovt={localGovt} onLocalGovtChange={setLocalGovt}
              country={country} onCountryChange={setCountry}
              zipCode={zipCode} onZipCodeChange={setZipCode}
              website={website} onWebsiteChange={setWebsite}
            />
          )}

          {activeTab === 'education' && (
            <EducationCertTab
              educationLevel={educationLevel} onEducationLevelChange={setEducationLevel}
              graduationClass={graduationClass} onGraduationClassChange={setGraduationClass}
              courseOfStudy={courseOfStudy} onCourseOfStudyChange={setCourseOfStudy}
              institution={institution} onInstitutionChange={setInstitution}
              yearOfGraduation={yearOfGraduation} onYearOfGraduationChange={setYearOfGraduation}
              degreeCertFile={degreeCertFile} degreeCertFileName={degreeCertFileName}
              handleDegreeCertUpload={handleDegreeCertUpload}
              otherCerts={otherCerts}
              onAddOtherCert={addOtherCert}
              onRemoveOtherCert={removeOtherCert}
              onOtherCertChange={updateOtherCert}
            />
          )}

          {activeTab === 'experience' && (
            <ExperienceSkillsTab
              employmentStatus={employmentStatus} onEmploymentStatusChange={setEmploymentStatus}
              role={role} onRoleChange={setRole}
              industry={industry} onIndustryChange={setIndustry}
              company={company} onCompanyChange={setCompany}
              workCountry={workCountry} onWorkCountryChange={setWorkCountry}
              resumptionDate={resumptionDate} onResumptionDateChange={setResumptionDate}
              roleDescription={roleDescription} onRoleDescriptionChange={setRoleDescription}
              pastJobs={pastJobs}
              onAddPastJob={addPastJob}
              onRemovePastJob={removePastJob}
              onPastJobChange={updatePastJob}
              skills={skills}
              onAddSkill={addSkill}
              onRemoveSkill={removeSkill}
              onSkillChange={updateSkill}
              languages={languages}
              onAddLanguage={addLanguage}
              onRemoveLanguage={removeLanguage}
              onLanguageChange={updateLanguage}
              portfolioLinks={portfolioLinks}
              onAddPortfolioLink={addPortfolioLink}
              onRemovePortfolioLink={removePortfolioLink}
              onPortfolioLinkChange={updatePortfolioLink}
              cvFile={cvFile} cvFileName={cvFileName} handleCvUpload={handleCvUpload}
            />
          )}

          {activeTab === 'payment' && (
            <PaymentInfoTab
              paymentMethod={paymentMethod} onPaymentMethodChange={setPaymentMethod}
              billingAddress={billingAddress} onBillingAddressChange={setBillingAddress}
            />
          )}

          {activeTab === 'system' && (
            <SystemSecurityTab
              govIdCode={idCardNumber}
              oldPassword={oldPassword} onOldPasswordChange={setOldPassword}
              newPassword={newPassword} onNewPasswordChange={setNewPassword}
              showOldPassword={showOldPassword} onShowOldPasswordChange={setShowOldPassword}
              showNewPassword={showNewPassword} onShowNewPasswordChange={setShowNewPassword}
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
