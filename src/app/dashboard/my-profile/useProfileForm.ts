'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  fetchPersonalInfo, createPersonalInfo, updatePersonalInfo,
  fetchSkills, createSkill, updateSkill,
  fetchEducation, createEducation, updateEducation,
  fetchExperience, createExperience, updateExperience,
  fetchLanguages, createLanguage, updateLanguage,
  fetchPortfolio, createPortfolio, updatePortfolio,
} from '@/store/profileSlice';
import { toast } from 'sonner';
import { useLocalStorage } from '@/lib/useLocalStorage';
import { type SavedCard } from './components/CreditCardPanel';

function uid() { return crypto.randomUUID(); }
const GENDER_MAP: Record<string, string> = { Male: 'MALE', Female: 'FEMALE', Other: 'OTHER' };
const GENDER_REV: Record<string, string> = { MALE: 'Male', FEMALE: 'Female', OTHER: 'Other' };
const EMP_MAP: Record<string, string> = { 'Student': 'STUDENT', 'Employed (full time)': 'EMPLOYED', 'Self Employed (business owner)': 'SELF_EMPLOYED', 'Unemployed': 'UNEMPLOYED' };
const EMP_REV: Record<string, string> = { STUDENT: 'Student', EMPLOYED: 'Employed (full time)', SELF_EMPLOYED: 'Self Employed (business owner)', UNEMPLOYED: 'Unemployed' };

export function useProfileForm() {
  const { user } = useAuth();
  const dispatch = useAppDispatch();
  const profile = useAppSelector(s => s.profile);
  const fetchedRef = useRef({ personal: false, skills: false, education: false, experience: false, languages: false, portfolio: false });
  const existingIdsRef = useRef({ skills: new Set<string>(), languages: new Set<string>(), portfolio: new Set<string>() });

  const [firstName, setFirstName] = useState(''); const [middleName, setMiddleName] = useState(''); const [surname, setSurname] = useState('');
  const [username, setUsername] = useState(''); const [gender, setGender] = useState(''); const [dateOfBirth, setDateOfBirth] = useState('');
  const [idCardType, setIdCardType] = useState(''); const [idCardNumber, setIdCardNumber] = useState('');
  const [idCardFile, setIdCardFile] = useState<File | null>(null); const [idCardFileName, setIdCardFileName] = useState('');
  const [bio, setBio] = useState(''); const [email, setEmail] = useState(user?.email || ''); const [phone, setPhone] = useState('');
  const [altPhone, setAltPhone] = useState(''); const [address, setAddress] = useState(''); const [city, setCity] = useState('');
  const [stateOfResidence, setStateOfResidence] = useState(''); const [localGovt, setLocalGovt] = useState('');
  const [country, setCountry] = useState(''); const [zipCode, setZipCode] = useState(''); const [website, setWebsite] = useState('');
  const [employmentStatus, setEmploymentStatus] = useState('');
  const [educationLevel, setEducationLevel] = useState(''); const [educationLevelOther, setEducationLevelOther] = useState('');
  const [graduationClass, setGraduationClass] = useState(''); const [graduationClassOther, setGraduationClassOther] = useState('');
  const [courseOfStudy, setCourseOfStudy] = useState(''); const [institution, setInstitution] = useState('');
  const [yearOfGraduation, setYearOfGraduation] = useState(''); const [degreeCertFile, setDegreeCertFile] = useState<File | null>(null);
  const [degreeCertFileName, setDegreeCertFileName] = useState('');
  const [otherCerts, setOtherCerts] = useState<Array<{ id: string; title: string; issuer: string; year: string; file: File | null; fileName: string }>>([]);
  const [role, setRole] = useState(''); const [industry, setIndustry] = useState(''); const [industryOther, setIndustryOther] = useState('');
  const [company, setCompany] = useState(''); const [workCountry, setWorkCountry] = useState('');
  const [resumptionDate, setResumptionDate] = useState(''); const [roleDescription, setRoleDescription] = useState('');
  const [pastJobs, setPastJobs] = useState<Array<{ id: string; organization: string; role: string; duration: string }>>([]);
  const [skills, setSkills] = useState<Array<{ id: string; name: string }>>([]);
  const [languages, setLanguages] = useState<Array<{ id: string; name: string; proficiency: string }>>([]);
  const [portfolioLinks, setPortfolioLinks] = useState<Array<{ id: string; url: string; label: string }>>([]);
  const [cvFile, setCvFile] = useState<File | null>(null); const [cvFileName, setCvFileName] = useState('');
  const [oldPassword, setOldPassword] = useState(''); const [newPassword, setNewPassword] = useState('');
  const [showOldPassword, setShowOldPassword] = useState(false); const [showNewPassword, setShowNewPassword] = useState(false);
  const [securityQuestion, setSecurityQuestion] = useState("What is your mother's maiden name?"); const [securityAnswer, setSecurityAnswer] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [savedCards, setSavedCards] = useLocalStorage<SavedCard[]>('ash:saved-cards', []);
  const [personalLoaded, setPersonalLoaded] = useState(false);

  // Fetch once on mount
  useEffect(() => {
    if (fetchedRef.current.personal) return;
    fetchedRef.current.personal = true;
    dispatch(fetchPersonalInfo()).unwrap().catch(() => {}).finally(() => setPersonalLoaded(true));
  }, [dispatch]);

  useEffect(() => {
    if (fetchedRef.current.skills) return;
    fetchedRef.current.skills = true;
    dispatch(fetchSkills());
  }, [dispatch]);

  useEffect(() => {
    if (fetchedRef.current.education) return;
    fetchedRef.current.education = true;
    dispatch(fetchEducation());
  }, [dispatch]);

  useEffect(() => {
    if (fetchedRef.current.experience) return;
    fetchedRef.current.experience = true;
    dispatch(fetchExperience());
  }, [dispatch]);

  useEffect(() => {
    if (fetchedRef.current.languages) return;
    fetchedRef.current.languages = true;
    dispatch(fetchLanguages());
  }, [dispatch]);

  useEffect(() => {
    if (fetchedRef.current.portfolio) return;
    fetchedRef.current.portfolio = true;
    dispatch(fetchPortfolio());
  }, [dispatch]);

  // Sync personal info from Redux into local state
  useEffect(() => {
    const p = profile.personal; if (!p) return;
    setFirstName(p.firstname || ''); setMiddleName(p.middlename || ''); setSurname(p.surname || '');
    setUsername(p.username || ''); setGender(GENDER_REV[p.gender] || p.gender || ''); setDateOfBirth(p.dateOfBirth || '');
    setIdCardType(p.idCardType || ''); setIdCardNumber(p.idCardNumber || ''); setBio(p.bio || '');
    setPhone(p.phone || ''); setAddress(p.address || ''); setCity(p.city || '');
    setStateOfResidence(p.state || ''); setLocalGovt(p.lga || ''); setCountry(p.country || '');
    setZipCode(p.postalCode || ''); setEmploymentStatus(EMP_REV[p.employmentStatus] || p.employmentStatus || ''); setWebsite(p.website || '');
  }, [profile.personal]);

  useEffect(() => { if (profile.skills.length) { setSkills(profile.skills.map(s => ({ id: s.id, name: s.name }))); existingIdsRef.current.skills = new Set(profile.skills.map(s => s.id)); } }, [profile.skills]);
  useEffect(() => { if (profile.education.length) { const e = profile.education[0]; setEducationLevel(e.educationLevel || ''); setGraduationClass(e.graduationClass || ''); setCourseOfStudy(e.courseOfStudy || ''); setInstitution(e.institution || ''); setYearOfGraduation(e.yearOfGraduation ? String(e.yearOfGraduation) : ''); } }, [profile.education]);
  useEffect(() => { if (profile.experience.length) { const c = profile.experience.find(e => e.isCurrent) || profile.experience[0]; setRole(c.role || ''); setIndustry(c.industry || ''); setCompany(c.organization || ''); setWorkCountry(c.country || ''); setResumptionDate(c.startDate || ''); setRoleDescription(c.roleDescription || ''); setPastJobs(profile.experience.filter(e => !e.isCurrent).map(e => ({ id: e.id, organization: e.organization, role: e.role, duration: '' }))); } }, [profile.experience]);
  useEffect(() => { if (profile.languages.length) { setLanguages(profile.languages.map(l => ({ id: l.id, name: l.language, proficiency: l.proficiency }))); existingIdsRef.current.languages = new Set(profile.languages.map(l => l.id)); } }, [profile.languages]);
  useEffect(() => { if (profile.portfolio.length) { setPortfolioLinks(profile.portfolio.map(p => ({ id: p.id, url: p.link, label: p.label }))); existingIdsRef.current.portfolio = new Set(profile.portfolio.map(p => p.id)); } }, [profile.portfolio]);

  const hasPersonalInfo = !!profile.personal;

  const handleIdCardUpload = (e: React.ChangeEvent<HTMLInputElement>) => { const f = e.target.files?.[0]; if (f) { setIdCardFile(f); setIdCardFileName(f.name); toast.success('ID card uploaded!'); } };
  const handleDegreeCertUpload = (e: React.ChangeEvent<HTMLInputElement>) => { const f = e.target.files?.[0]; if (f) { setDegreeCertFile(f); setDegreeCertFileName(f.name); toast.success('Degree certificate uploaded!'); } };
  const handleCvUpload = (e: React.ChangeEvent<HTMLInputElement>) => { const f = e.target.files?.[0]; if (f) { setCvFile(f); setCvFileName(f.name); toast.success('CV uploaded!'); } };
  const clearIdCard = () => { setIdCardFile(null); setIdCardFileName(''); };
  const clearDegreeCert = () => { setDegreeCertFile(null); setDegreeCertFileName(''); };
  const clearCv = () => { setCvFile(null); setCvFileName(''); };

  const addOtherCert = () => setOtherCerts(p => [...p, { id: uid(), title: '', issuer: '', year: '', file: null, fileName: '' }]);
  const removeOtherCert = (id: string) => setOtherCerts(p => p.filter(c => c.id !== id));
  const updateOtherCert = (id: string, field: string, value: string | File | null) => setOtherCerts(p => p.map(c => c.id !== id ? c : field === 'file' ? { ...c, file: value as File | null, fileName: (value as File)?.name || '' } : { ...c, [field]: value as string }));
  const addPastJob = () => setPastJobs(p => [...p, { id: uid(), organization: '', role: '', duration: '' }]);
  const removePastJob = (id: string) => setPastJobs(p => p.filter(j => j.id !== id));
  const updatePastJob = (id: string, field: string, value: string) => setPastJobs(p => p.map(j => j.id === id ? { ...j, [field]: value } : j));
  const addSkill = () => setSkills(p => [...p, { id: uid(), name: '' }]); const removeSkill = (id: string) => setSkills(p => p.filter(s => s.id !== id));
  const updateSkillLocal = (id: string, value: string) => setSkills(p => p.map(s => s.id === id ? { ...s, name: value } : s));
  const addLanguage = () => setLanguages(p => [...p, { id: uid(), name: '', proficiency: '' }]); const removeLanguage = (id: string) => setLanguages(p => p.filter(l => l.id !== id));
  const updateLanguageLocal = (id: string, field: string, value: string) => setLanguages(p => p.map(l => l.id === id ? { ...l, [field]: value } : l));
  const addPortfolioLink = () => setPortfolioLinks(p => [...p, { id: uid(), url: '', label: '' }]); const removePortfolioLink = (id: string) => setPortfolioLinks(p => p.filter(x => x.id !== id));
  const updatePortfolioLink = (id: string, field: string, value: string) => setPortfolioLinks(p => p.map(x => x.id === id ? { ...x, [field]: value } : x));
  const handleAddCard = (c: Omit<SavedCard, 'id'>) => setSavedCards(p => [...p, { ...c, id: uid() }]);
  const handleUpdateCard = (id: string, c: Omit<SavedCard, 'id'>) => setSavedCards(p => p.map(x => x.id === id ? { ...x, ...c } : x));
  const handleRemoveCard = (id: string) => setSavedCards(p => p.filter(x => x.id !== id));

  const savePersonalInfo = useCallback(async () => {
    const payload: Record<string, any> = { firstname: firstName, middlename: middleName, surname, username, gender: GENDER_MAP[gender] || gender, dateOfBirth, bio, phone, address, city, state: stateOfResidence, lga: localGovt, country, postalCode: zipCode, idCardType, idCardNumber, employmentStatus: EMP_MAP[employmentStatus] || employmentStatus, website };
    try { await dispatch(hasPersonalInfo ? updatePersonalInfo(payload) : createPersonalInfo(payload)).unwrap(); toast.success('Personal info saved!'); return true; } catch (e: any) { toast.error(e || 'Failed to save'); return false; }
  }, [firstName, middleName, surname, username, gender, dateOfBirth, bio, phone, address, city, stateOfResidence, localGovt, country, zipCode, idCardType, idCardNumber, employmentStatus, website, hasPersonalInfo, dispatch]);

  const saveSkills = useCallback(async () => { for (const s of skills) { if (!s.name.trim()) continue; const existing = existingIdsRef.current.skills.has(s.id); try { if (existing) { await dispatch(updateSkill({ id: s.id, name: s.name })).unwrap(); } else { const created = await dispatch(createSkill({ name: s.name })).unwrap(); existingIdsRef.current.skills.add(created.id); } } catch {} } }, [skills, dispatch]);
  const saveEducation = useCallback(async () => {
    const p = { educationLevel, graduationClass, courseOfStudy, institution, yearOfGraduation: Number(yearOfGraduation) || 0, degreeCertificate: '' };
    try { await dispatch(profile.education[0]?.id ? updateEducation({ id: profile.education[0].id, data: p }) : createEducation(p)).unwrap(); toast.success('Education saved!'); } catch {}
  }, [educationLevel, graduationClass, courseOfStudy, institution, yearOfGraduation, profile.education, dispatch]);
  const saveExperience = useCallback(async () => {
    const p = { organization: company, role, industry, country: workCountry, startDate: resumptionDate, roleDescription, isCurrent: true };
    try { await dispatch(profile.experience.find(e => e.isCurrent)?.id ? updateExperience({ id: profile.experience.find(e => e.isCurrent)!.id, data: p }) : createExperience(p)).unwrap(); toast.success('Experience saved!'); } catch {}
  }, [company, role, industry, workCountry, resumptionDate, roleDescription, profile.experience, dispatch]);
  const saveLanguages = useCallback(async () => { for (const l of languages) { if (!l.name.trim()) continue; const existing = existingIdsRef.current.languages.has(l.id); try { if (existing) { await dispatch(updateLanguage({ id: l.id, data: { language: l.name, proficiency: l.proficiency } })).unwrap(); } else { const created = await dispatch(createLanguage({ language: l.name, proficiency: l.proficiency })).unwrap(); existingIdsRef.current.languages.add(created.id); } } catch {} } }, [languages, dispatch]);
  const savePortfolio = useCallback(async () => { for (const p of portfolioLinks.filter(x => x.url.trim())) { const existing = existingIdsRef.current.portfolio.has(p.id); try { if (existing) { await dispatch(updatePortfolio({ id: p.id, data: { label: p.label, link: p.url } })).unwrap(); } else { const created = await dispatch(createPortfolio({ label: p.label, link: p.url })).unwrap(); existingIdsRef.current.portfolio.add(created.id); } } catch {} } }, [portfolioLinks, dispatch]);
  const saveAll = useCallback(async () => { const ok = await savePersonalInfo(); if (!ok) return false; await Promise.all([saveSkills(), saveEducation(), saveExperience(), saveLanguages(), savePortfolio()]); return true; }, [savePersonalInfo, saveSkills, saveEducation, saveExperience, saveLanguages, savePortfolio]);

  const fullName = [firstName, middleName, surname].filter(Boolean).join(' ') || user?.name || '';
  const completionPct = (() => { const fields = [firstName, surname, username, gender, dateOfBirth, idCardType, idCardNumber, bio, email, phone, address, city, stateOfResidence, country, educationLevel, institution, courseOfStudy, yearOfGraduation, employmentStatus]; return Math.round((fields.filter(f => f?.trim()).length / fields.length) * 100); })();

  return {
    user, fullName, completionPct, hasPersonalInfo, personalLoaded, personalLoading: profile.personalLoading,
    firstName, setFirstName, middleName, setMiddleName, surname, setSurname, username, setUsername,
    gender, setGender, dateOfBirth, setDateOfBirth, idCardType, setIdCardType, idCardNumber, setIdCardNumber,
    idCardFile, idCardFileName, handleIdCardUpload, bio, setBio, email, setEmail, phone, setPhone,
    altPhone, setAltPhone, address, setAddress, city, setCity, stateOfResidence, setStateOfResidence,
    localGovt, setLocalGovt, country, setCountry, zipCode, setZipCode, website, setWebsite,
    educationLevel, setEducationLevel, educationLevelOther, setEducationLevelOther,
    graduationClass, setGraduationClass, graduationClassOther, setGraduationClassOther,
    courseOfStudy, setCourseOfStudy, institution, setInstitution, yearOfGraduation, setYearOfGraduation,
    degreeCertFile, degreeCertFileName, handleDegreeCertUpload, otherCerts, addOtherCert, removeOtherCert, updateOtherCert,
    employmentStatus, setEmploymentStatus, role, setRole, industry, setIndustry, industryOther, setIndustryOther,
    company, setCompany, workCountry, setWorkCountry, resumptionDate, setResumptionDate,
    roleDescription, setRoleDescription, pastJobs, addPastJob, removePastJob, updatePastJob,
    skills, addSkill, removeSkill, updateSkill: updateSkillLocal,
    languages, addLanguage, removeLanguage, updateLanguage: updateLanguageLocal,
    portfolioLinks, addPortfolioLink, removePortfolioLink, updatePortfolioLink,
    cvFile, cvFileName, handleCvUpload, clearCv, clearIdCard, clearDegreeCert, oldPassword, setOldPassword, newPassword, setNewPassword,
    showOldPassword, setShowOldPassword, showNewPassword, setShowNewPassword,
    securityQuestion, setSecurityQuestion, securityAnswer, setSecurityAnswer,
    savePersonalInfo, saveSkills, saveEducation, saveExperience, saveLanguages, savePortfolio, saveAll,
    paymentMethod, setPaymentMethod, savedCards, handleAddCard, handleUpdateCard, handleRemoveCard,
  };
}
