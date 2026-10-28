'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchFullProfile, fetchProfileCompletion, saveProfile } from '@/store/profileSlice';
import { fetchWalletBalance } from '@/store/walletSlice';
import { toast } from 'sonner';
import { isNoGraduationClassLevel } from './educationLevels';
import { uploadFile } from '@/lib/upload';
import { normalizeFileSrc } from '@/lib/files';
import { fetchCurrentUser, setUser } from '@/store/authSlice';
import type { ProfileTab } from './profileCompletion';

function uid() { return crypto.randomUUID(); }

/** Last path segment of a stored file key/URL (e.g. "certificates/degree-certificate.pdf" → "degree-certificate.pdf"). */
function fileNameOf(v?: string) { if (!v) return ''; const parts = v.split(/[?#]/)[0].split('/'); return parts[parts.length - 1] || ''; }

function readAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ''));
    reader.onerror = () => reject(new Error('Could not read the selected image'));
    reader.readAsDataURL(file);
  });
}

const GENDER_MAP: Record<string, string> = { Male: 'MALE', Female: 'FEMALE', Other: 'OTHER' };
const GENDER_REV: Record<string, string> = { MALE: 'Male', FEMALE: 'Female', OTHER: 'Other' };
const EMP_MAP: Record<string, string> = { 'Student': 'STUDENT', 'Employed (full time)': 'EMPLOYED', 'Self Employed (business owner)': 'SELF_EMPLOYED', 'Unemployed': 'UNEMPLOYED' };
const EMP_REV: Record<string, string> = { STUDENT: 'Student', EMPLOYED: 'Employed (full time)', SELF_EMPLOYED: 'Self Employed (business owner)', UNEMPLOYED: 'Unemployed' };
const PROF_MAP: Record<string, string> = { Beginner: 'BEGINNER', Intermediate: 'INTERMEDIATE', Advanced: 'ADVANCED', Native: 'NATIVE' };
const PROF_REV: Record<string, string> = { BEGINNER: 'Beginner', INTERMEDIATE: 'Intermediate', ADVANCED: 'Advanced', NATIVE: 'Native' };
/** The API only accepts these enum values for idCardType. */
const ID_CARD_MAP: Record<string, string> = {
  'National ID': 'NATIONAL_ID',
  "Driver's License": 'DRIVERS_LICENSE',
  'International Passport': 'PASSPORT',
  "Voter's Card": 'VOTERS_CARD',
  'Other': 'OTHER',
};
const ID_CARD_REV: Record<string, string> = {
  NATIONAL_ID: 'National ID',
  DRIVERS_LICENSE: "Driver's License",
  PASSPORT: 'International Passport',
  VOTERS_CARD: "Voter's Card",
  OTHER: 'Other',
};

export interface SaveResult {
  ok: boolean;
  submitted: boolean;
  status: string | null;
}

export function useProfileForm() {
  const { user } = useAuth();
  const dispatch = useAppDispatch();
  const profile = useAppSelector(s => s.profile);
  const fetchedRef = useRef({ full: false });
  // Certificate already persisted on the server, kept so a save without a new
  // pick (or a clear) doesn't wipe it from the payload.
  const savedDegreeCertRef = useRef('');
  // Existing stored file values. PUT /profile replaces whole sections, so the
  // current key/URL must be sent back when the user has not picked a new file.
  const savedFileRef = useRef({ idCard: '', avatar: '', cv: '' });

  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState(''); const [gender, setGender] = useState(''); const [dateOfBirth, setDateOfBirth] = useState('');
  const [idCardType, setIdCardType] = useState(''); const [idCardNumber, setIdCardNumber] = useState('');
  const [idCardFile, setIdCardFile] = useState<File | null>(null); const [idCardFileName, setIdCardFileName] = useState('');
  const [idCardUrl, setIdCardUrl] = useState('');
  const [idCardKey, setIdCardKey] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [avatarKey, setAvatarKey] = useState('');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarFileName, setAvatarFileName] = useState('');
  const [avatarUploading, setAvatarUploading] = useState(false);
  const [bio, setBio] = useState(''); const [email, setEmail] = useState(user?.email || ''); const [phone, setPhone] = useState('');
  const [altPhone, setAltPhone] = useState(''); const [address, setAddress] = useState(''); const [city, setCity] = useState('');
  const [stateOfResidence, setStateOfResidence] = useState(''); const [localGovt, setLocalGovt] = useState('');
  const [country, setCountry] = useState(''); const [zipCode, setZipCode] = useState(''); const [website, setWebsite] = useState('');
  const [employmentStatus, setEmploymentStatus] = useState('');
  const [educationLevel, setEducationLevel] = useState(''); const [educationLevelOther, setEducationLevelOther] = useState('');
  const [graduationClass, setGraduationClass] = useState(''); const [graduationClassOther, setGraduationClassOther] = useState('');
  const [courseOfStudy, setCourseOfStudy] = useState(''); const [institution, setInstitution] = useState('');
  const [yearOfGraduation, setYearOfGraduation] = useState('');   const [degreeCertFile, setDegreeCertFile] = useState<File | null>(null);
  const [degreeCertFileName, setDegreeCertFileName] = useState('');
  const [degreeCertUrl, setDegreeCertUrl] = useState('');
  const [degreeCertKey, setDegreeCertKey] = useState('');
  const [otherCerts, setOtherCerts] = useState<Array<{ id: string; title: string; issuer: string; year: string; file: File | null; fileName: string; fileKey: string }>>([]);
  const [role, setRole] = useState(''); const [industry, setIndustry] = useState(''); const [industryOther, setIndustryOther] = useState('');
  const [company, setCompany] = useState(''); const [workCountry, setWorkCountry] = useState('');
  const [resumptionDate, setResumptionDate] = useState(''); const [roleDescription, setRoleDescription] = useState('');
  const [pastJobs, setPastJobs] = useState<Array<{ id: string; organization: string; role: string; industry: string; country: string; startDate: string; roleDescription: string }>>([]);
  const [skills, setSkills] = useState<Array<{ id: string; name: string }>>([]);
  const [languages, setLanguages] = useState<Array<{ id: string; name: string; proficiency: string }>>([]);
  const [portfolioLinks, setPortfolioLinks] = useState<Array<{ id: string; url: string; label: string }>>([]);
  const [cvFile, setCvFile] = useState<File | null>(null); const [cvFileName, setCvFileName] = useState('');
  const [cvUrl, setCvUrl] = useState('');
  const [cvKey, setCvKey] = useState('');
  const [oldPassword, setOldPassword] = useState(''); const [newPassword, setNewPassword] = useState('');
  const [showOldPassword, setShowOldPassword] = useState(false); const [showNewPassword, setShowNewPassword] = useState(false);
  const [securityQuestion, setSecurityQuestion] = useState("What is your mother's maiden name?"); const [securityAnswer, setSecurityAnswer] = useState('');
  const [personalLoaded, setPersonalLoaded] = useState(false);

  // Single fetch on mount: GET /profile hydrates every tab, plus
  // GET /profile/completion for the header percentage.
  useEffect(() => {
    if (fetchedRef.current.full) return;
    fetchedRef.current.full = true;
    dispatch(fetchFullProfile()).unwrap().catch(() => {}).finally(() => setPersonalLoaded(true));
    dispatch(fetchProfileCompletion());
  }, [dispatch]);

  // Sync personal info from Redux into local state.
  useEffect(() => {
    const p = profile.personal; if (!p) return;
    setFullName(p.fullName || [p.firstname, p.middlename, p.surname].filter(Boolean).join(' ') || user?.name || '');
    setUsername(p.username || ''); setGender(GENDER_REV[p.gender] || p.gender || ''); setDateOfBirth(p.dateOfBirth || '');
    setIdCardType(ID_CARD_REV[p.idCardType] || p.idCardType || ''); setIdCardNumber(p.idCardNumber || ''); setBio(p.bio || '');
    if (p.email) setEmail(p.email);
    const rawAvatar = p.avatar || p.displayPhoto || p.displayPhotoUrl || p.avatarUrl || p.photo;
    // Signed URL from the API, else the one captured when the file was uploaded.
    const avatarSrc = normalizeFileSrc(rawAvatar);
    // Keep an unsaved local preview (data: URL) so a refetch doesn't wipe the pick.
    setAvatarUrl(prev => (prev.startsWith('data:') ? prev : avatarSrc || prev));
    setPhone(p.phone || ''); setAltPhone(p.alternativePhone || ''); setAddress(p.address || ''); setCity(p.city || '');
    // Stored docs: prefer the API's signed URL, else the upload-time one. A bare
    // storage key never renders — it 403s against the private bucket.
    const idCardSrc = normalizeFileSrc(p.idCardUrl) || normalizeFileSrc(p.idCardFile);
    if (idCardSrc) setIdCardUrl(prev => prev || idCardSrc);
    if (p.idCardFile) setIdCardFileName(prev => prev || fileNameOf(p.idCardFile));
    const cvRaw = p.cvUrl || p.cvFile || p.cv;
    const cvSrc = normalizeFileSrc(p.cvUrl) || normalizeFileSrc(p.cvFile) || normalizeFileSrc(p.cv);
    if (cvSrc) setCvUrl(prev => prev || cvSrc);
    if (cvRaw) setCvFileName(prev => prev || fileNameOf(cvRaw));
    setStateOfResidence(p.state || ''); setLocalGovt(p.lga || ''); setCountry(p.country || '');
    setZipCode(p.postalCode || ''); setEmploymentStatus(EMP_REV[p.employmentStatus] || p.employmentStatus || ''); setWebsite(p.website || '');

    savedFileRef.current = {
      idCard: p.idCardFile || '',
      avatar: p.displayPhoto || p.avatar || '',
      cv: p.cvFile || p.cv || '',
    };
  }, [profile.personal, user?.name]);

  useEffect(() => { setSkills(profile.skills.map(s => ({ id: s.id, name: s.name }))); }, [profile.skills]);
  useEffect(() => {
    const e = profile.education[0];
    setEducationLevel(e?.educationLevel || ''); setGraduationClass(e?.graduationClass || '');
    setCourseOfStudy(e?.courseOfStudy || ''); setInstitution(e?.institution || '');
    setYearOfGraduation(e?.yearOfGraduation ? String(e.yearOfGraduation) : '');
    savedDegreeCertRef.current = e?.degreeCertificate || '';
    setDegreeCertUrl(e?.degreeCertificate || '');
    setDegreeCertFileName(fileNameOf(e?.degreeCertificate));
  }, [profile.education]);
  useEffect(() => {
    const c = profile.experience.find(e => e.isCurrent);
    setRole(c?.role || ''); setIndustry(c?.industry || ''); setCompany(c?.organization || '');
    setWorkCountry(c?.country || ''); setResumptionDate(c?.startDate || ''); setRoleDescription(c?.roleDescription || '');
    setPastJobs(profile.experience.filter(e => !e.isCurrent).map(e => ({
      id: e.id, organization: e.organization || '', role: e.role || '',
      industry: e.industry || '', country: e.country || '', startDate: e.startDate || '', roleDescription: e.roleDescription || '',
    })));
  }, [profile.experience]);
  useEffect(() => { setLanguages(profile.languages.map(l => ({ id: l.id, name: l.language, proficiency: PROF_REV[l.proficiency] || l.proficiency }))); }, [profile.languages]);
  useEffect(() => { setPortfolioLinks(profile.portfolio.map(p => ({ id: p.id, url: p.link, label: p.label }))); }, [profile.portfolio]);
  useEffect(() => {
    setOtherCerts(profile.certs.map(c => ({
      id: c.id,
      title: c.title || '',
      issuer: c.issuer || '',
      year: c.year ? String(c.year) : '',
      file: null,
      fileName: fileNameOf(c.file),
      fileKey: c.file || '',
    })));
  }, [profile.certs]);

  /**
   * Discards every unsaved change across all tabs and restores the form from
   * the last saved profile in Redux. Covers typed fields, added/removed rows
   * (skills, jobs, languages, certificates, portfolio links) and file picks.
   */
  const resetUnsavedChanges = useCallback(() => {
    const p: any = profile.personal;
    const rawAvatar = p?.avatar || p?.displayPhoto || p?.displayPhotoUrl || p?.avatarUrl || p?.photo;

    // Personal information
    setFullName(p?.fullName || [p?.firstname, p?.middlename, p?.surname].filter(Boolean).join(' ') || user?.name || '');
    setUsername(p?.username || '');
    setGender(GENDER_REV[p?.gender] || p?.gender || '');
    setDateOfBirth(p?.dateOfBirth || '');
    setIdCardType(ID_CARD_REV[p?.idCardType] || p?.idCardType || '');
    setIdCardNumber(p?.idCardNumber || '');
    setBio(p?.bio || '');
    setEmail(p?.email || user?.email || '');
    setPhone(p?.phone || '');
    setAltPhone(p?.alternativePhone || '');
    setAddress(p?.address || '');
    setCity(p?.city || '');
    setStateOfResidence(p?.state || '');
    setLocalGovt(p?.lga || '');
    setCountry(p?.country || '');
    setZipCode(p?.postalCode || '');
    setWebsite(p?.website || '');
    setEmploymentStatus(EMP_REV[p?.employmentStatus] || p?.employmentStatus || '');

    // Uploaded / selected files go back to what the server has.
    setAvatarFile(null); setAvatarFileName(''); setAvatarKey('');
    setAvatarUrl(normalizeFileSrc(rawAvatar) || '');
    setIdCardFile(null); setIdCardKey('');
    setIdCardUrl(normalizeFileSrc(p?.idCardUrl) || normalizeFileSrc(p?.idCardFile) || '');
    setIdCardFileName(p?.idCardFile ? fileNameOf(p.idCardFile) : '');
    setCvFile(null); setCvKey('');
    setCvUrl(normalizeFileSrc(p?.cvUrl) || normalizeFileSrc(p?.cvFile) || normalizeFileSrc(p?.cv) || '');
    const cvRaw = p?.cvUrl || p?.cvFile || p?.cv;
    setCvFileName(cvRaw ? fileNameOf(cvRaw) : '');
    savedFileRef.current = { idCard: p?.idCardFile || '', avatar: p?.displayPhoto || p?.avatar || '', cv: p?.cvFile || p?.cv || '' };

    // Education & certifications
    const e = profile.education[0];
    setEducationLevel(e?.educationLevel || '');
    setEducationLevelOther('');
    setGraduationClass(e?.graduationClass || '');
    setGraduationClassOther('');
    setCourseOfStudy(e?.courseOfStudy || '');
    setInstitution(e?.institution || '');
    setYearOfGraduation(e?.yearOfGraduation ? String(e.yearOfGraduation) : '');
    setDegreeCertFile(null); setDegreeCertKey('');
    savedDegreeCertRef.current = e?.degreeCertificate || '';
    setDegreeCertUrl(e?.degreeCertificate || '');
    setDegreeCertFileName(fileNameOf(e?.degreeCertificate));
    setOtherCerts(profile.certs.map(c => ({
      id: c.id,
      title: c.title || '',
      issuer: c.issuer || '',
      year: c.year ? String(c.year) : '',
      file: null,
      fileName: fileNameOf(c.file),
      fileKey: c.file || '',
    })));

    // Experience, skills, languages & portfolio links
    const current = profile.experience.find(exp => exp.isCurrent);
    setRole(current?.role || '');
    setIndustry(current?.industry || '');
    setIndustryOther('');
    setCompany(current?.organization || '');
    setWorkCountry(current?.country || '');
    setResumptionDate(current?.startDate || '');
    setRoleDescription(current?.roleDescription || '');
    setPastJobs(profile.experience.filter(exp => !exp.isCurrent).map(exp => ({
      id: exp.id,
      organization: exp.organization || '',
      role: exp.role || '',
      industry: exp.industry || '',
      country: exp.country || '',
      startDate: exp.startDate || '',
      roleDescription: exp.roleDescription || '',
    })));
    setSkills(profile.skills.map(s => ({ id: s.id, name: s.name })));
    setLanguages(profile.languages.map(l => ({ id: l.id, name: l.language, proficiency: PROF_REV[l.proficiency] || l.proficiency })));
    setPortfolioLinks(profile.portfolio.map(link => ({ id: link.id, url: link.link, label: link.label })));
  }, [profile, user?.name, user?.email]);

  const hasPersonalInfo = !!profile.personal;

  const handleIdCardUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) {
      setIdCardFile(f);
      setIdCardFileName(f.name);
      // A fresh pick invalidates the previous upload key so save re-uploads it.
      setIdCardKey('');
      toast.success('ID card selected');
    }
    e.target.value = '';
  };
  const handleDegreeCertUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) {
      setDegreeCertFile(f);
      setDegreeCertFileName(f.name);
      // A fresh pick invalidates any previously stored key/url so save re-uploads it.
      setDegreeCertKey('');
      setDegreeCertUrl('');
      toast.success('Degree certificate selected');
    }
    e.target.value = '';
  };
  const handleCvUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) {
      setCvFile(f);
      setCvFileName(f.name);
      setCvKey('');
      setCvUrl('');
      toast.success('CV selected');
    }
    e.target.value = '';
  };
  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    e.target.value = '';
    if (!f) return;
    setAvatarFile(f);
    setAvatarFileName(f.name);
    // A new pick invalidates any previously uploaded key so save() re-uploads.
    setAvatarKey('');
    try {
      // Immediate local preview so the header image swaps the moment a file is picked.
      setAvatarUrl(await readAsDataURL(f));
      toast.success('Profile image selected — save to publish it');
    } catch {
      toast.error('Could not preview the selected image');
    }
  };
  const clearIdCard = () => { setIdCardFile(null); setIdCardFileName(''); setIdCardUrl(''); setIdCardKey(''); savedFileRef.current.idCard = ''; };
  const clearDegreeCert = () => { setDegreeCertFile(null); setDegreeCertFileName(fileNameOf(savedDegreeCertRef.current)); setDegreeCertUrl(savedDegreeCertRef.current); setDegreeCertKey(''); };
  const clearCv = () => { setCvFile(null); setCvFileName(''); setCvUrl(''); setCvKey(''); savedFileRef.current.cv = ''; };
  const clearAvatar = () => { setAvatarFile(null); setAvatarFileName(''); setAvatarUrl(''); setAvatarKey(''); savedFileRef.current.avatar = ''; };

  const addOtherCert = () => setOtherCerts(p => [...p, { id: uid(), title: '', issuer: '', year: '', file: null, fileName: '', fileKey: '' }]);
  const removeOtherCert = (id: string) => setOtherCerts(p => p.filter(c => c.id !== id));
  const updateOtherCert = (id: string, field: string, value: string | File | null) => setOtherCerts(p => p.map(c => c.id !== id ? c : field === 'file'
    ? { ...c, file: value as File | null, fileName: (value as File)?.name || (value ? '' : c.fileName), fileKey: '' }
    : { ...c, [field]: value as string }));
  const addPastJob = () => setPastJobs(p => [...p, { id: uid(), organization: '', role: '', industry: '', country: '', startDate: '', roleDescription: '' }]);
  const removePastJob = (id: string) => setPastJobs(p => p.filter(j => j.id !== id));
  const updatePastJob = (id: string, field: string, value: string) => setPastJobs(p => p.map(j => j.id === id ? { ...j, [field]: value } : j));
  const addSkill = () => setSkills(p => [...p, { id: uid(), name: '' }]); const removeSkill = (id: string) => setSkills(p => p.filter(s => s.id !== id));
  const updateSkillLocal = (id: string, value: string) => setSkills(p => p.map(s => s.id === id ? { ...s, name: value } : s));
  const addLanguage = () => setLanguages(p => [...p, { id: uid(), name: '', proficiency: '' }]); const removeLanguage = (id: string) => setLanguages(p => p.filter(l => l.id !== id));
  const updateLanguageLocal = (id: string, field: string, value: string) => setLanguages(p => p.map(l => l.id === id ? { ...l, [field]: value } : l));
  const addPortfolioLink = () => setPortfolioLinks(p => [...p, { id: uid(), url: '', label: '' }]); const removePortfolioLink = (id: string) => setPortfolioLinks(p => p.filter(x => x.id !== id));
  const updatePortfolioLink = (id: string, field: string, value: string) => setPortfolioLinks(p => p.map(x => x.id === id ? { ...x, [field]: value } : x));

  const uploadPersonalFiles = useCallback(async () => {
    let idCard = savedFileRef.current.idCard;
    let avatar = savedFileRef.current.avatar;
    let cv = savedFileRef.current.cv;
    let avatarDisplayUrl = avatarUrl;

    if (idCardFile && !idCardKey) {
      const uploaded = await uploadFile(idCardFile);
      idCard = uploaded.key || uploaded.url;
      setIdCardKey(uploaded.key);
      setIdCardUrl(uploaded.url);
      savedFileRef.current.idCard = idCard;
    }
    if (avatarFile && !avatarKey) {
      setAvatarUploading(true);
      try {
        const uploaded = await uploadFile(avatarFile);
        avatar = uploaded.key || uploaded.url;
        avatarDisplayUrl = uploaded.url;
        setAvatarKey(uploaded.key);
        setAvatarUrl(uploaded.url);
        savedFileRef.current.avatar = avatar;
      } finally {
        setAvatarUploading(false);
      }
    }
    if (cvFile && !cvKey) {
      const uploaded = await uploadFile(cvFile);
      cv = uploaded.key || uploaded.url;
      setCvKey(uploaded.key);
      setCvUrl(uploaded.url);
      savedFileRef.current.cv = cv;
    }

    return { idCard, avatar, cv, avatarDisplayUrl };
  }, [idCardFile, idCardKey, avatarFile, avatarKey, cvFile, cvKey, avatarUrl]);

  const buildPersonalPayload = useCallback((keys: { idCard: string; avatar: string; cv: string }) => ({
    personal: {
      fullName,
      email,
      username,
      gender: GENDER_MAP[gender] || gender || null,
      dateOfBirth: dateOfBirth || null,
      bio: bio || null,
      phone: phone || null,
      alternativePhone: altPhone || null,
      address: address || null,
      city: city || null,
      state: stateOfResidence || null,
      lga: localGovt || null,
      country: country || null,
      postalCode: zipCode || null,
      idCardType: idCardType ? (ID_CARD_MAP[idCardType] || 'OTHER') : null,
      idCardNumber: idCardNumber || null,
      employmentStatus: EMP_MAP[employmentStatus] || employmentStatus || null,
      website: website.trim() || null,
      idCardFile: keys.idCard || null,
      displayPhoto: keys.avatar || null,
      cvFile: keys.cv || null,
    },
  }), [fullName, email, username, gender, dateOfBirth, bio, phone, altPhone, address, city, stateOfResidence, localGovt, country, zipCode, idCardType, idCardNumber, employmentStatus, website]);

  const buildEducationPayload = useCallback(async () => {
    let certKey = degreeCertKey || savedDegreeCertRef.current || '';
    if (degreeCertFile && !degreeCertKey) {
      const uploaded = await uploadFile(degreeCertFile);
      certKey = uploaded.key || uploaded.url;
      setDegreeCertKey(uploaded.key);
      setDegreeCertUrl(uploaded.url || certKey);
      savedDegreeCertRef.current = certKey;
    }

    const noGrad = isNoGraduationClassLevel(educationLevel);
    const education = {
      educationLevel: educationLevel || null,
      educationLevelOther: educationLevel === 'Other' ? (educationLevelOther || null) : null,
      graduationClass: noGrad ? null : (graduationClass === 'Other' ? graduationClassOther : graduationClass) || null,
      courseOfStudy: noGrad ? null : (courseOfStudy || null),
      institution: institution || null,
      yearOfGraduation: Number(yearOfGraduation) || 0,
      degreeCertificate: certKey || null,
    };

    const certificates: Record<string, unknown>[] = [];
    for (const cert of otherCerts) {
      if (!cert.title.trim() && !cert.issuer.trim() && !cert.year.trim() && !cert.file && !cert.fileKey) continue;
      let fileKey = cert.fileKey || '';
      if (cert.file && !fileKey) {
        const uploaded = await uploadFile(cert.file);
        fileKey = uploaded.key || uploaded.url;
        setOtherCerts(prev => prev.map(c => c.id === cert.id ? { ...c, fileKey, fileName: c.fileName || uploaded.originalName } : c));
      }
      certificates.push({
        title: cert.title.trim(),
        issuer: cert.issuer.trim(),
        year: Number(cert.year) || 0,
        file: fileKey || null,
      });
    }

    const hasEducation = !!(educationLevel || educationLevelOther || institution || courseOfStudy || yearOfGraduation || certKey);
    // The UI edits only the first education record. Preserve any additional
    // server records so a section replacement does not delete them.
    const additionalEducation = profile.education.slice(1).map(e => ({
      educationLevel: e.educationLevel || null,
      graduationClass: e.graduationClass || null,
      courseOfStudy: e.courseOfStudy || null,
      institution: e.institution || null,
      yearOfGraduation: e.yearOfGraduation || 0,
      degreeCertificate: e.degreeCertificate || null,
    }));
    return { education: [...(hasEducation ? [education] : []), ...additionalEducation], certificates };
  }, [profile.education, educationLevel, educationLevelOther, graduationClass, graduationClassOther, courseOfStudy, institution, yearOfGraduation, degreeCertUrl, degreeCertKey, degreeCertFile, otherCerts]);

  const buildExperiencePayload = useCallback(() => {
    const experiences: Record<string, unknown>[] = [];
    const hasCurrent = !!(company || role || industry || workCountry || resumptionDate || roleDescription);
    if (hasCurrent) {
      experiences.push({
        organization: company,
        role,
        industry: industry === 'Other' ? (industryOther || industry) : industry,
        country: workCountry,
        startDate: resumptionDate,
        roleDescription,
        isCurrent: true,
      });
    }
    for (const job of pastJobs) {
      if (!job.organization.trim() && !job.role.trim()) continue;
      experiences.push({
        organization: job.organization,
        role: job.role,
        industry: job.industry,
        country: job.country,
        startDate: job.startDate,
        roleDescription: job.roleDescription,
        isCurrent: false,
      });
    }

    return {
      experiences,
      skills: skills.filter(s => s.name.trim()).map(s => ({ name: s.name.trim() })),
      languages: languages.filter(l => l.name.trim()).map(l => ({
        language: l.name.trim(),
        proficiency: PROF_MAP[l.proficiency] || l.proficiency.toUpperCase(),
      })),
      portfolio: portfolioLinks.filter(p => p.url.trim()).map(p => ({ label: p.label, link: p.url.trim() })),
    };
  }, [company, role, industry, industryOther, workCountry, resumptionDate, roleDescription, pastJobs, skills, languages, portfolioLinks]);

  const failSave = useCallback((e: unknown) => {
    const error: any = e;
    const message = typeof e === 'string' ? e : error?.message || 'Failed to save profile';
    if (error?.status === 409) {
      toast.error('This profile was changed elsewhere. Reload the page before saving again.');
    } else {
      toast.error(message);
    }
    return { ok: false, submitted: false, status: null } as SaveResult;
  }, []);

  const runSave = useCallback(async (payload: Record<string, unknown>): Promise<SaveResult> => {
    try {
      const result = await dispatch(saveProfile({ payload, updatedAt: profile.updatedAt })).unwrap();
      if (result.submitted || result.walletId || result.walletCreated) dispatch(fetchWalletBalance());
      return { ok: true, submitted: result.submitted, status: result.status ?? null };
    } catch (e) {
      return failSave(e);
    }
  }, [dispatch, profile.updatedAt, failSave]);

  const saveDraft = useCallback(async (tab: ProfileTab): Promise<SaveResult> => {
    try {
      let payload: Record<string, unknown>;
      let avatarDisplayUrl = '';
      if (tab === 'personal') {
        const keys = await uploadPersonalFiles();
        payload = buildPersonalPayload(keys);
        avatarDisplayUrl = keys.avatarDisplayUrl;
      } else if (tab === 'education') {
        payload = await buildEducationPayload();
      } else {
        payload = buildExperiencePayload();
      }

      const result = await runSave(payload);
      if (result.ok) {
        if (tab === 'personal') {
          const newAvatar = normalizeFileSrc(avatarDisplayUrl);
          if (newAvatar) {
            const base = user ?? { name: fullName, email: '', phone: '' };
            dispatch(setUser({ ...base, avatar: newAvatar }));
          }
          dispatch(fetchCurrentUser());
        }
        toast.success(result.submitted ? 'Profile completed and submitted!' : 'Draft saved');
      }
      return result;
    } catch (e) {
      return failSave(e);
    }
  }, [uploadPersonalFiles, buildPersonalPayload, buildEducationPayload, buildExperiencePayload, runSave, user, fullName, dispatch, failSave]);

  const submitProfile = useCallback(async (): Promise<SaveResult> => {
    try {
      const keys = await uploadPersonalFiles();
      const education = await buildEducationPayload();
      const payload = {
        ...buildPersonalPayload(keys),
        ...education,
        ...buildExperiencePayload(),
      };

      const result = await runSave(payload);
      if (result.ok) {
        const newAvatar = normalizeFileSrc(keys.avatarDisplayUrl);
        if (newAvatar) {
          const base = user ?? { name: fullName, email: '', phone: '' };
          dispatch(setUser({ ...base, avatar: newAvatar }));
        }
        dispatch(fetchCurrentUser());
        toast.success(result.submitted ? 'Profile submitted successfully!' : 'Profile saved as draft. Complete all required sections to submit.');
      }
      return result;
    } catch (e) {
      return failSave(e);
    }
  }, [uploadPersonalFiles, buildPersonalPayload, buildEducationPayload, buildExperiencePayload, runSave, user, fullName, dispatch, failSave]);

  const displayName = fullName || user?.name || '';
  const localPct = (() => { const fields = [fullName, username, gender, dateOfBirth, idCardType, idCardNumber, bio, email, phone, address, city, stateOfResidence, country, educationLevel, institution, courseOfStudy, yearOfGraduation, employmentStatus]; return Math.round((fields.filter(f => f?.trim()).length / fields.length) * 100); })();
  const completionPct = profile.completionLoading && !profile.profileLoaded ? localPct : (profile.completion > 0 ? profile.completion : localPct);

  return {
    user, fullName: displayName, setFullName, completionPct, hasPersonalInfo, personalLoaded, personalLoading: profile.personalLoading,
    avatarUrl, avatarKey, avatarFile, avatarFileName, handleAvatarUpload, avatarUploading, clearAvatar, username, setUsername,
    gender, setGender, dateOfBirth, setDateOfBirth, idCardType, setIdCardType, idCardNumber, setIdCardNumber,
    idCardFile, idCardFileName, idCardKey, handleIdCardUpload, clearIdCard, bio, setBio, email, setEmail, phone, setPhone,
    altPhone, setAltPhone, address, setAddress, city, setCity, stateOfResidence, setStateOfResidence,
    localGovt, setLocalGovt, country, setCountry, zipCode, setZipCode, website, setWebsite,
    educationLevel, setEducationLevel, educationLevelOther, setEducationLevelOther,
    graduationClass, setGraduationClass, graduationClassOther, setGraduationClassOther,
    courseOfStudy, setCourseOfStudy, institution, setInstitution, yearOfGraduation, setYearOfGraduation,
    degreeCertFile, degreeCertFileName, degreeCertKey, degreeCertUrl, handleDegreeCertUpload, clearDegreeCert,
    cvFile, cvFileName, cvKey, cvUrl, handleCvUpload, clearCv,
    idCardUrl,
    employmentStatus, setEmploymentStatus, role, setRole, industry, setIndustry, industryOther, setIndustryOther,
    company, setCompany, workCountry, setWorkCountry, resumptionDate, setResumptionDate,
    roleDescription, setRoleDescription, pastJobs, addPastJob, removePastJob, updatePastJob,
    skills, addSkill, removeSkill, updateSkill: updateSkillLocal,
    languages, addLanguage, removeLanguage, updateLanguage: updateLanguageLocal,
    portfolioLinks, addPortfolioLink, removePortfolioLink, updatePortfolioLink,
    otherCerts, addOtherCert, removeOtherCert, updateOtherCert,
    oldPassword, setOldPassword, newPassword, setNewPassword,
    showOldPassword, setShowOldPassword, showNewPassword, setShowNewPassword,
    securityQuestion, setSecurityQuestion, securityAnswer, setSecurityAnswer,
    saveDraft, submitProfile, resetUnsavedChanges,
  };
}
