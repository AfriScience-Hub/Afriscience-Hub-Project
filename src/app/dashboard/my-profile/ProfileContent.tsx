'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { User, GraduationCap, Briefcase, CreditCard, Shield, Save, X, Send, FileDown, Lock } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/app/components/ui/Button';
import { ProfileHeader } from './components/ProfileHeader';
import { ProfileTabs } from './components/ProfileTabs';
import { PersonalInfoTab } from './components/PersonalInfoTab';
import { EducationCertTab } from './components/EducationCertTab';
import { ExperienceSkillsTab } from './components/ExperienceSkillsTab';
import { PaymentInfoTab } from './components/PaymentInfoTab';
import { SystemSecurityTab } from './components/SystemSecurityTab';
import { useProfileForm } from './useProfileForm';

type TabKey = 'personal' | 'education' | 'experience' | 'payment' | 'system';

const TABS = [
  { key: 'personal' as const, label: 'Personal Information', icon: User },
  { key: 'education' as const, label: 'Education & Certifications', icon: GraduationCap },
  { key: 'experience' as const, label: 'Experience & Skills', icon: Briefcase },
  { key: 'payment' as const, label: 'Payment Info', icon: CreditCard },
  { key: 'system' as const, label: 'System & Security', icon: Shield },
];

function EditIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );
}

function TabLockedPlaceholder({ tabName }: { tabName: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="h-16 w-16 rounded-full bg-neutral-bg-light border border-neutral-gray-light flex items-center justify-center mb-4">
        <Lock className="h-7 w-7 text-neutral-gray-medium" />
      </div>
      <h3 className="text-lg font-bold text-neutral-black mb-2">Complete Personal Information First</h3>
      <p className="text-sm text-neutral-gray-medium max-w-md">
        You must fill in and submit your personal and contact details before you can access <span className="font-medium text-neutral-black">{tabName}</span>.
      </p>
    </div>
  );
}

export function ProfileContent() {
  const [activeTab, setActiveTab] = useState<TabKey>('personal');
  const [editingTab, setEditingTab] = useState<TabKey | null>(null);
  const f = useProfileForm();
  const isEditing = editingTab !== null;
  const canAccessTabs = f.hasPersonalInfo;
  const remindedRef = useRef(false);

  useEffect(() => {
    if (remindedRef.current || !f.personalLoaded || editingTab) return;
    remindedRef.current = true;
    const missing: string[] = [];
    if (!f.firstName) missing.push('First Name');
    if (!f.surname) missing.push('Surname');
    if (!f.username) missing.push('Username');
    if (!f.gender) missing.push('Gender');
    if (!f.dateOfBirth) missing.push('Date of Birth');
    if (!f.idCardType) missing.push('ID Card Type');
    if (!f.idCardNumber) missing.push('ID Card Number');
    if (!f.phone) missing.push('Phone Number');
    if (!f.address) missing.push('Address');
    if (!f.city) missing.push('City');
    if (!f.stateOfResidence) missing.push('State');
    if (!f.country) missing.push('Country');
    if (missing.length > 0) {
      toast.info(`Complete your profile: ${missing.slice(0, 3).join(', ')}${missing.length > 3 ? ` and ${missing.length - 3} more` : ''}`, { duration: 6000 });
    }
  }, [f.personalLoaded, editingTab, f.firstName, f.surname, f.username, f.gender, f.dateOfBirth, f.idCardType, f.idCardNumber, f.phone, f.address, f.city, f.stateOfResidence, f.country]);

  const handleStartEdit = () => setEditingTab(activeTab);
  const handleCancel = () => setEditingTab(null);
  const [saving, setSaving] = useState(false);

  const handleTabChange = (key: string) => {
    if (isEditing) { toast.info('Save or discard your changes first'); return; }
    if (key !== 'personal' && key !== 'system' && !canAccessTabs) {
      toast.info('Complete personal information first');
      return;
    }
    setActiveTab(key as TabKey);
  };

  const handleSaveDraft = async () => {
    setSaving(true);
    try {
      if (activeTab === 'personal') {
        await f.savePersonalInfo();
      } else if (activeTab === 'education') {
        await f.saveEducation();
      } else if (activeTab === 'experience') {
        await f.saveSkills();
        await f.saveExperience();
        await f.saveLanguages();
        await f.savePortfolio();
      } else {
        toast.success('Draft saved');
      }
    } finally { setSaving(false); }
  };

  const handleSubmit = async () => {
    setSaving(true);
    try {
      if (activeTab === 'personal') {
        const ok = await f.savePersonalInfo();
        if (ok) setEditingTab(null);
      } else {
        const ok = await f.saveAll();
        if (ok) setEditingTab(null);
      }
    } finally { setSaving(false); }
  };

  const personalProps = {
    isEditing: editingTab === 'personal',
    firstName: f.firstName, onFirstNameChange: f.setFirstName,
    middleName: f.middleName, onMiddleNameChange: f.setMiddleName,
    surname: f.surname, onSurnameChange: f.setSurname,
    username: f.username, onUsernameChange: f.setUsername,
    gender: f.gender, onGenderChange: f.setGender,
    dateOfBirth: f.dateOfBirth, onDateOfBirthChange: f.setDateOfBirth,
    idCardType: f.idCardType, onIdCardTypeChange: f.setIdCardType,
    idCardNumber: f.idCardNumber, onIdCardNumberChange: f.setIdCardNumber,
    idCardFile: f.idCardFile, idCardFileName: f.idCardFileName,
    handleIdCardUpload: f.handleIdCardUpload, onIdCardClear: f.clearIdCard,
    bio: f.bio, onBioChange: f.setBio,
    email: f.email, onEmailChange: f.setEmail,
    phone: f.phone, onPhoneChange: f.setPhone,
    altPhone: f.altPhone, onAltPhoneChange: f.setAltPhone,
    address: f.address, onAddressChange: f.setAddress,
    city: f.city, onCityChange: f.setCity,
    stateOfResidence: f.stateOfResidence, onStateOfResidenceChange: f.setStateOfResidence,
    localGovt: f.localGovt, onLocalGovtChange: f.setLocalGovt,
    country: f.country, onCountryChange: f.setCountry,
    zipCode: f.zipCode, onZipCodeChange: f.setZipCode,
    website: f.website, onWebsiteChange: f.setWebsite,
  };

  const educationProps = {
    isEditing: editingTab === 'education',
    educationLevel: f.educationLevel, onEducationLevelChange: f.setEducationLevel,
    educationLevelOther: f.educationLevelOther, onEducationLevelOtherChange: f.setEducationLevelOther,
    graduationClass: f.graduationClass, onGraduationClassChange: f.setGraduationClass,
    graduationClassOther: f.graduationClassOther, onGraduationClassOtherChange: f.setGraduationClassOther,
    courseOfStudy: f.courseOfStudy, onCourseOfStudyChange: f.setCourseOfStudy,
    institution: f.institution, onInstitutionChange: f.setInstitution,
    yearOfGraduation: f.yearOfGraduation, onYearOfGraduationChange: f.setYearOfGraduation,
    degreeCertFile: f.degreeCertFile, degreeCertFileName: f.degreeCertFileName,
    handleDegreeCertUpload: f.handleDegreeCertUpload, onDegreeCertClear: f.clearDegreeCert,
    otherCerts: f.otherCerts,
    onAddOtherCert: f.addOtherCert, onRemoveOtherCert: f.removeOtherCert,
    onOtherCertChange: f.updateOtherCert,
  };

  const experienceProps = {
    isEditing: editingTab === 'experience',
    employmentStatus: f.employmentStatus, onEmploymentStatusChange: f.setEmploymentStatus,
    role: f.role, onRoleChange: f.setRole,
    industry: f.industry, onIndustryChange: f.setIndustry,
    industryOther: f.industryOther, onIndustryOtherChange: f.setIndustryOther,
    company: f.company, onCompanyChange: f.setCompany,
    workCountry: f.workCountry, onWorkCountryChange: f.setWorkCountry,
    resumptionDate: f.resumptionDate, onResumptionDateChange: f.setResumptionDate,
    roleDescription: f.roleDescription, onRoleDescriptionChange: f.setRoleDescription,
    pastJobs: f.pastJobs, onAddPastJob: f.addPastJob,
    onRemovePastJob: f.removePastJob, onPastJobChange: f.updatePastJob,
    skills: f.skills, onAddSkill: f.addSkill,
    onRemoveSkill: f.removeSkill, onSkillChange: f.updateSkill,
    languages: f.languages, onAddLanguage: f.addLanguage,
    onRemoveLanguage: f.removeLanguage, onLanguageChange: f.updateLanguage,
    portfolioLinks: f.portfolioLinks, onAddPortfolioLink: f.addPortfolioLink,
    onRemovePortfolioLink: f.removePortfolioLink, onPortfolioLinkChange: f.updatePortfolioLink,
    cvFile: f.cvFile, cvFileName: f.cvFileName, handleCvUpload: f.handleCvUpload, onCvClear: f.clearCv,
  };

  return (
    <>
      <ProfileHeader fullName={f.fullName} completionPct={f.completionPct} avatar={f.user?.avatar} />

      <div className="rounded-2xl border border-neutral-gray-light bg-white shadow-sm overflow-hidden">
        <ProfileTabs tabs={TABS} activeTab={activeTab} onTabChange={handleTabChange} />

        <div className="p-6 space-y-6">
          {activeTab === 'personal' && <PersonalInfoTab {...personalProps} />}
          {activeTab === 'education' && (canAccessTabs ? <EducationCertTab {...educationProps} /> : <TabLockedPlaceholder tabName="Education & Certifications" />)}
          {activeTab === 'experience' && (canAccessTabs ? <ExperienceSkillsTab {...experienceProps} /> : <TabLockedPlaceholder tabName="Experience & Skills" />)}
          {activeTab === 'payment' && (
            <PaymentInfoTab
              isEditing={editingTab === 'payment'}
              paymentMethod={f.paymentMethod} onPaymentMethodChange={f.setPaymentMethod}
              cards={f.savedCards} onAddCard={f.handleAddCard}
              onUpdateCard={f.handleUpdateCard} onRemoveCard={f.handleRemoveCard}
            />
          )}
          {activeTab === 'system' && (
            <SystemSecurityTab
              govIdCode={f.idCardNumber}
              oldPassword={f.oldPassword} onOldPasswordChange={f.setOldPassword}
              newPassword={f.newPassword} onNewPasswordChange={f.setNewPassword}
              showOldPassword={f.showOldPassword} onShowOldPasswordChange={f.setShowOldPassword}
              showNewPassword={f.showNewPassword} onShowNewPasswordChange={f.setShowNewPassword}
              securityQuestion={f.securityQuestion} onSecurityQuestionChange={f.setSecurityQuestion}
              securityAnswer={f.securityAnswer} onSecurityAnswerChange={f.setSecurityAnswer}
            />
          )}
        </div>

        <div className="px-6 py-4 border-t border-neutral-gray-light bg-neutral-bg-light/50">
          <div className="flex items-center justify-end gap-3">
            {activeTab === 'system' ? (
              <Button type="button" onClick={handleSaveDraft} loading={saving} className="gap-2 bg-green-600 hover:bg-green-700">
                <Save className="h-4 w-4" /> Save
              </Button>
            ) : isEditing ? (
              <>
                <Button type="button" variant="outline" onClick={handleCancel} disabled={saving} className="gap-2">
                  <X className="h-4 w-4" /> Cancel
                </Button>
                <Button type="button" onClick={handleSaveDraft} loading={saving} className="gap-2 bg-white border border-neutral-gray-light text-neutral-black hover:bg-neutral-bg-light">
                  <FileDown className="h-4 w-4" /> Save as Draft
                </Button>
                <Button type="button" onClick={handleSubmit} loading={saving} className="gap-2 bg-green-600 hover:bg-green-700">
                  <Send className="h-4 w-4" /> Submit
                </Button>
              </>
            ) : (
              <>
                <Button type="button" onClick={handleSaveDraft} variant="outline" loading={saving} className="gap-2">
                  <Save className="h-4 w-4" /> Save as Draft
                </Button>
                <Button type="button" onClick={handleStartEdit} disabled={saving} className="gap-2 bg-green-600 hover:bg-green-700">
                  <EditIcon className="h-4 w-4" /> Edit
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
