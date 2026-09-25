import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '@/lib/api';

export interface PersonalInfo {
  id?: string; firstname: string; middlename: string; surname: string;
  username: string; gender: string; dateOfBirth: string; bio: string;
  phone: string; address: string; city: string; state: string;
  lga: string; country: string; postalCode: string;
  idCardType: string; idCardNumber: string; employmentStatus: string;
  website: string;
}

export interface SkillEntry { id: string; name: string; }
export interface EducationEntry { id: string; educationLevel: string; graduationClass: string; courseOfStudy: string; institution: string; yearOfGraduation: number; degreeCertificate: string; }
export interface ExperienceEntry { id: string; organization: string; role: string; industry: string; country: string; startDate: string; roleDescription: string; isCurrent: boolean; }
export interface LanguageEntry { id: string; language: string; proficiency: string; }
export interface PortfolioEntry { id: string; label: string; link: string; }
export interface CertEntry { id: string; title: string; issuer: string; year: number; file: string; }

export interface ProfileState {
  personal: PersonalInfo | null; personalLoading: boolean; personalError: string | null;
  skills: SkillEntry[]; skillsLoading: boolean; skillsError: string | null;
  education: EducationEntry[]; educationLoading: boolean; educationError: string | null;
  experience: ExperienceEntry[]; experienceLoading: boolean; experienceError: string | null;
  languages: LanguageEntry[]; languagesLoading: boolean; languagesError: string | null;
  portfolio: PortfolioEntry[]; portfolioLoading: boolean; portfolioError: string | null;
  certs: CertEntry[]; certsLoading: boolean; certsError: string | null;
  completion: number; completionLoading: boolean; completionLoaded: boolean;
  profileLoading: boolean; profileLoaded: boolean; profileError: string | null;
  saveLoading: boolean; saveError: string | null;
}

/** Unwrap common API envelopes: {data: ...} or raw payload. */
function unwrap<T>(r: any): T {
  return (r?.data ?? r) as T;
}

function asArray<T>(v: unknown): T[] {
  if (Array.isArray(v)) return v as T[];
  if (v && typeof v === 'object') return [v as T];
  return [];
}

function pickFirst<T>(...vals: unknown[]): T[] {
  for (const v of vals) {
    if (Array.isArray(v)) return v as T[];
    if (v && typeof v === 'object') return [v as T];
  }
  return [];
}

function extractCompletion(v: any): number {
  const root = v?.data ?? v;
  const candidates = [
    root?.completion, root?.completionRate, root?.completionPercentage,
    root?.percentage, root?.percent, root?.rate, root,
  ];
  for (const c of candidates) {
    const n = typeof c === 'string' ? Number(c) : c;
    if (typeof n === 'number' && Number.isFinite(n)) return Math.max(0, Math.min(100, Math.round(n)));
  }
  return 0;
}

// Personal
export const fetchPersonalInfo = createAsyncThunk('profile/fetchPersonal', async (_, { rejectWithValue }) => {
  try { const r: any = await api.get('/profile/personal'); return r?.data || r || null; } catch (e: any) { return rejectWithValue(e.message); }
});
export const createPersonalInfo = createAsyncThunk('profile/createPersonal', async (p: Record<string, any>, { rejectWithValue }) => {
  try { const r: any = await api.post('/profile/personal', p); return r?.data || r; } catch (e: any) { return rejectWithValue(e.message); }
});
export const updatePersonalInfo = createAsyncThunk('profile/updatePersonal', async (p: Record<string, any>, { rejectWithValue }) => {
  try { const r: any = await api.patch('/profile/personal', p); return r?.data || r; } catch (e: any) { return rejectWithValue(e.message); }
});

// Skills
export const fetchSkills = createAsyncThunk('profile/fetchSkills', async (_, { rejectWithValue }) => {
  try { const r: any = await api.get('/profile/skills'); return (r?.data || r || []) as SkillEntry[]; } catch (e: any) { return rejectWithValue(e.message); }
});
export const createSkill = createAsyncThunk('profile/createSkill', async (p: { name: string }, { rejectWithValue }) => {
  try { const r: any = await api.post('/profile/skills', p); return r?.data || r; } catch (e: any) { return rejectWithValue(e.message); }
});
export const updateSkill = createAsyncThunk('profile/updateSkill', async (p: { id: string; name: string }, { rejectWithValue }) => {
  try { const r: any = await api.patch(`/profile/skills/${p.id}`, { name: p.name }); return r?.data || r; } catch (e: any) { return rejectWithValue(e.message); }
});

// Education
export const fetchEducation = createAsyncThunk('profile/fetchEducation', async (_, { rejectWithValue }) => {
  try { const r: any = await api.get('/profile/education'); return (r?.data || r || []) as EducationEntry[]; } catch (e: any) { return rejectWithValue(e.message); }
});
export const createEducation = createAsyncThunk('profile/createEducation', async (p: Record<string, any>, { rejectWithValue }) => {
  try { const r: any = await api.post('/profile/education', p); return r?.data || r; } catch (e: any) { return rejectWithValue(e.message); }
});
export const updateEducation = createAsyncThunk('profile/updateEducation', async (p: { id: string; data: Record<string, any> }, { rejectWithValue }) => {
  try { const r: any = await api.patch(`/profile/education/${p.id}`, p.data); return r?.data || r; } catch (e: any) { return rejectWithValue(e.message); }
});

// Experience
export const fetchExperience = createAsyncThunk('profile/fetchExperience', async (_, { rejectWithValue }) => {
  try { const r: any = await api.get('/profile/exp'); return (r?.data || r || []) as ExperienceEntry[]; } catch (e: any) { return rejectWithValue(e.message); }
});
export const createExperience = createAsyncThunk('profile/createExperience', async (p: Record<string, any>, { rejectWithValue }) => {
  try { const r: any = await api.post('/profile/exp', p); return r?.data || r; } catch (e: any) { return rejectWithValue(e.message); }
});
export const updateExperience = createAsyncThunk('profile/updateExperience', async (p: { id: string; data: Record<string, any> }, { rejectWithValue }) => {
  try { const r: any = await api.patch(`/profile/exp/${p.id}`, p.data); return r?.data || r; } catch (e: any) { return rejectWithValue(e.message); }
});
export const deleteExperience = createAsyncThunk('profile/deleteExperience', async (id: string, { rejectWithValue }) => {
  try { await api.delete(`/profile/${id}`); return id; } catch (e: any) { return rejectWithValue(e.message); }
});

// Languages
export const fetchLanguages = createAsyncThunk('profile/fetchLanguages', async (_, { rejectWithValue }) => {
  try { const r: any = await api.get('/profile/languages'); return (r?.data || r || []) as LanguageEntry[]; } catch (e: any) { return rejectWithValue(e.message); }
});
export const createLanguage = createAsyncThunk('profile/createLanguage', async (p: { language: string; proficiency: string }, { rejectWithValue }) => {
  try { const r: any = await api.post('/profile/languages', p); return r?.data || r; } catch (e: any) { return rejectWithValue(e.message); }
});
export const updateLanguage = createAsyncThunk('profile/updateLanguage', async (p: { id: string; data: { language: string; proficiency: string } }, { rejectWithValue }) => {
  try { const r: any = await api.patch(`/profile/languages/${p.id}`, p.data); return r?.data || r; } catch (e: any) { return rejectWithValue(e.message); }
});

// Portfolio
export const fetchPortfolio = createAsyncThunk('profile/fetchPortfolio', async (_, { rejectWithValue }) => {
  try { const r: any = await api.get('/profile/portfolio'); return (r?.data || r || []) as PortfolioEntry[]; } catch (e: any) { return rejectWithValue(e.message); }
});
export const createPortfolio = createAsyncThunk('profile/createPortfolio', async (p: { label: string; link: string }, { rejectWithValue }) => {
  try { const r: any = await api.post('/profile/portfolio', p); return r?.data || r; } catch (e: any) { return rejectWithValue(e.message); }
});
export const updatePortfolio = createAsyncThunk('profile/updatePortfolio', async (p: { id: string; data: { label: string; link: string } }, { rejectWithValue }) => {
  try { const r: any = await api.patch(`/profile/portfolio/${p.id}`, p.data); return r?.data || r; } catch (e: any) { return rejectWithValue(e.message); }
});
export const deletePortfolio = createAsyncThunk('profile/deletePortfolio', async (id: string, { rejectWithValue }) => {
  try { await api.delete(`/profile/portfolio/${id}`); return id; } catch (e: any) { return rejectWithValue(e.message); }
});

// Certs
export const fetchCerts = createAsyncThunk('profile/fetchCerts', async (_, { rejectWithValue }) => {
  try { const r: any = await api.get('/profile/certs'); return (r?.data || r || []) as CertEntry[]; } catch (e: any) { return rejectWithValue(e.message); }
});
export const createCert = createAsyncThunk('profile/createCert', async (p: Record<string, any>, { rejectWithValue }) => {
  try { const r: any = await api.post('/profile/certs', p); return r?.data || r; } catch (e: any) { return rejectWithValue(e.message); }
});
export const updateCert = createAsyncThunk('profile/updateCert', async (p: { id: string; data: Record<string, any> }, { rejectWithValue }) => {
  try { const r: any = await api.patch(`/profile/certs/${p.id}`, p.data); return r?.data || r; } catch (e: any) { return rejectWithValue(e.message); }
});

// Full profile — SINGLE request hydrating every tab (GET /api/v1/profile).
// Per-section POST/PATCH thunks below stay as the write path on edit/save.
function looksLikePersonal(v: unknown): v is Record<string, any> {
  if (!v || typeof v !== 'object' || Array.isArray(v)) return false;
  const o = v as Record<string, any>;
  return typeof o.firstname === 'string' || typeof o.surname === 'string' || typeof o.phone === 'string';
}

export const fetchFullProfile = createAsyncThunk('profile/fetchFull', async (_, { rejectWithValue }) => {
  try {
    const r: any = await api.get('/profile');
    const d = unwrap<any>(r) || {};
    // The backend returns personal fields either nested (personal/personalInfo/user/bio)
    // or directly at the top level of /profile. Guard against a top-level bio string
    // being mistaken for the record — it must be an object with name/phone fields.
    const nested = d.personal ?? d.personalInfo ?? d.user ?? d.bio;
    const personal = looksLikePersonal(nested) ? (nested as Record<string, any>) : looksLikePersonal(d) ? d : null;
    return {
      personal,
      skills: pickFirst<SkillEntry>(d.skills),
      education: pickFirst<EducationEntry>(d.education, d.educations),
      experience: pickFirst<ExperienceEntry>(d.experience, d.experiences, d.employment, d.workExperience),
      languages: pickFirst<LanguageEntry>(d.languages),
      portfolio: pickFirst<PortfolioEntry>(d.portfolio, d.portfolios),
      certs: pickFirst<CertEntry>(d.certs, d.certifications, d.certificates),
    };
  } catch (e: any) { return rejectWithValue(e.message); }
}, {
  // Only ever one request: skip while in-flight, and skip once already loaded.
  condition: (_, { getState }) => {
    const s = (getState() as any).profile;
    return !s.profileLoading && !s.profileLoaded;
  },
});

// Profile + Completion
export const fetchProfile = createAsyncThunk('profile/fetchProfile', async (_, { rejectWithValue }) => {
  try { const r: any = await api.get('/profile'); return r?.data || r || null; } catch (e: any) { return rejectWithValue(e.message); }
});
export const fetchProfileCompletion = createAsyncThunk('profile/fetchCompletion', async (_arg: { force?: boolean } | undefined, { rejectWithValue }) => {
  try { const r: any = await api.get('/profile/completion'); return extractCompletion(r); } catch (e: any) { return rejectWithValue(e.message); }
}, {
  // Skip while a request is in-flight, and skip once loaded unless forced
  // (used after a save to refresh the percentage).
  condition: (arg, { getState }) => {
    const s = (getState() as any).profile;
    if (s.completionLoading) return false;
    return arg?.force ? true : !s.completionLoaded;
  },
});
export const submitProfileCompletion = createAsyncThunk('profile/submitCompletion', async (_, { rejectWithValue }) => {
  try { const r: any = await api.post('/profile/completion'); return r?.data ?? r; } catch (e: any) { return rejectWithValue(e.message); }
});

const initialState: ProfileState = {
  personal: null, personalLoading: false, personalError: null,
  skills: [], skillsLoading: false, skillsError: null,
  education: [], educationLoading: false, educationError: null,
  experience: [], experienceLoading: false, experienceError: null,
  languages: [], languagesLoading: false, languagesError: null,
  portfolio: [], portfolioLoading: false, portfolioError: null,
  certs: [], certsLoading: false, certsError: null,
  completion: 0, completionLoading: false, completionLoaded: false,
  profileLoading: false, profileLoaded: false, profileError: null,
  saveLoading: false, saveError: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    clearProfileErrors(s) { s.personalError = null; s.skillsError = null; s.educationError = null; s.experienceError = null; s.languagesError = null; s.portfolioError = null; s.certsError = null; s.saveError = null; },
    resetProfile() { return initialState; },
  },
  extraReducers: (b) => {
    b
      .addCase(fetchPersonalInfo.pending, (s) => { s.personalLoading = true; })
      .addCase(fetchPersonalInfo.fulfilled, (s, a) => { s.personalLoading = false; s.personal = a.payload; })
      .addCase(fetchPersonalInfo.rejected, (s, a) => { s.personalLoading = false; s.personalError = a.payload as string; })
      .addCase(createPersonalInfo.pending, (s) => { s.saveLoading = true; })
      .addCase(createPersonalInfo.fulfilled, (s, a) => { s.saveLoading = false; s.personal = a.payload; })
      .addCase(createPersonalInfo.rejected, (s, a) => { s.saveLoading = false; s.saveError = a.payload as string; })
      .addCase(updatePersonalInfo.pending, (s) => { s.saveLoading = true; })
      .addCase(updatePersonalInfo.fulfilled, (s, a) => { s.saveLoading = false; s.personal = a.payload; })
      .addCase(updatePersonalInfo.rejected, (s, a) => { s.saveLoading = false; s.saveError = a.payload as string; })
      .addCase(fetchSkills.pending, (s) => { s.skillsLoading = true; })
      .addCase(fetchSkills.fulfilled, (s, a) => { s.skillsLoading = false; s.skills = a.payload; })
      .addCase(fetchSkills.rejected, (s, a) => { s.skillsLoading = false; s.skillsError = a.payload as string; })
      .addCase(createSkill.fulfilled, (s, a) => { s.skills.push(a.payload); })
      .addCase(updateSkill.fulfilled, (s, a) => { const i = s.skills.findIndex(sk => sk.id === a.payload.id); if (i >= 0) s.skills[i] = a.payload; })
      .addCase(fetchEducation.pending, (s) => { s.educationLoading = true; })
      .addCase(fetchEducation.fulfilled, (s, a) => { s.educationLoading = false; s.education = a.payload; })
      .addCase(fetchEducation.rejected, (s, a) => { s.educationLoading = false; s.educationError = a.payload as string; })
      .addCase(createEducation.fulfilled, (s, a) => { s.education.push(a.payload); })
      .addCase(updateEducation.fulfilled, (s, a) => { const i = s.education.findIndex(e => e.id === a.payload.id); if (i >= 0) s.education[i] = a.payload; })
      .addCase(fetchExperience.pending, (s) => { s.experienceLoading = true; })
      .addCase(fetchExperience.fulfilled, (s, a) => { s.experienceLoading = false; s.experience = a.payload; })
      .addCase(fetchExperience.rejected, (s, a) => { s.experienceLoading = false; s.experienceError = a.payload as string; })
      .addCase(createExperience.fulfilled, (s, a) => { s.experience.push(a.payload); })
      .addCase(updateExperience.fulfilled, (s, a) => { const i = s.experience.findIndex(e => e.id === a.payload.id); if (i >= 0) s.experience[i] = a.payload; })
      .addCase(deleteExperience.fulfilled, (s, a) => { s.experience = s.experience.filter(e => e.id !== a.payload); })
      .addCase(fetchLanguages.pending, (s) => { s.languagesLoading = true; })
      .addCase(fetchLanguages.fulfilled, (s, a) => { s.languagesLoading = false; s.languages = a.payload; })
      .addCase(fetchLanguages.rejected, (s, a) => { s.languagesLoading = false; s.languagesError = a.payload as string; })
      .addCase(createLanguage.fulfilled, (s, a) => { s.languages.push(a.payload); })
      .addCase(updateLanguage.fulfilled, (s, a) => { const i = s.languages.findIndex(l => l.id === a.payload.id); if (i >= 0) s.languages[i] = a.payload; })
      .addCase(fetchPortfolio.pending, (s) => { s.portfolioLoading = true; })
      .addCase(fetchPortfolio.fulfilled, (s, a) => { s.portfolioLoading = false; s.portfolio = a.payload; })
      .addCase(fetchPortfolio.rejected, (s, a) => { s.portfolioLoading = false; s.portfolioError = a.payload as string; })
      .addCase(createPortfolio.fulfilled, (s, a) => { s.portfolio.push(a.payload); })
      .addCase(updatePortfolio.fulfilled, (s, a) => { const i = s.portfolio.findIndex(p => p.id === a.payload.id); if (i >= 0) s.portfolio[i] = a.payload; })
      .addCase(deletePortfolio.fulfilled, (s, a) => { s.portfolio = s.portfolio.filter(p => p.id !== a.payload); })
      .addCase(fetchCerts.pending, (s) => { s.certsLoading = true; })
      .addCase(fetchCerts.fulfilled, (s, a) => { s.certsLoading = false; s.certs = a.payload; })
      .addCase(fetchCerts.rejected, (s, a) => { s.certsLoading = false; s.certsError = a.payload as string; })
      .addCase(createCert.fulfilled, (s, a) => { s.certs.push(a.payload); })
      .addCase(updateCert.fulfilled, (s, a) => { const i = s.certs.findIndex(c => c.id === a.payload.id); if (i >= 0) s.certs[i] = a.payload; })
      .addCase(fetchFullProfile.pending, (s) => { s.profileLoading = true; s.profileError = null; })
      .addCase(fetchFullProfile.fulfilled, (s, a) => {
        s.profileLoading = false; s.profileLoaded = true;
        if (a.payload.personal) s.personal = a.payload.personal as PersonalInfo;
        s.skills = asArray<SkillEntry>(a.payload.skills);
        s.education = asArray<EducationEntry>(a.payload.education);
        s.experience = asArray<ExperienceEntry>(a.payload.experience);
        s.languages = asArray<LanguageEntry>(a.payload.languages);
        s.portfolio = asArray<PortfolioEntry>(a.payload.portfolio);
        s.certs = asArray<CertEntry>(a.payload.certs);
      })
      .addCase(fetchFullProfile.rejected, (s, a) => { s.profileLoading = false; s.profileError = a.payload as string; })
      .addCase(fetchProfile.pending, (s) => { s.completionLoading = true; })
      .addCase(fetchProfile.fulfilled, (s, a) => { s.completionLoading = false; if (a.payload?.personal) s.personal = a.payload.personal; })
      .addCase(fetchProfile.rejected, (s) => { s.completionLoading = false; })
      .addCase(fetchProfileCompletion.pending, (s) => { s.completionLoading = true; })
      .addCase(fetchProfileCompletion.fulfilled, (s, a) => { s.completionLoading = false; s.completionLoaded = true; s.completion = typeof a.payload === 'number' ? a.payload : 0; })
      .addCase(fetchProfileCompletion.rejected, (s) => { s.completionLoading = false; })
      .addCase(submitProfileCompletion.fulfilled, (s) => { s.saveLoading = false; });
  },
});

export const { clearProfileErrors, resetProfile } = profileSlice.actions;
export default profileSlice.reducer;
