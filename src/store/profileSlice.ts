import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '@/lib/api';

export interface PersonalInfo {
  id?: string; fullName?: string; firstname?: string; middlename?: string; surname?: string;
  email?: string; username: string; gender: string; dateOfBirth: string; bio: string;
  phone: string; alternativePhone?: string; address: string; city: string; state: string;
  lga: string; country: string; postalCode: string;
  idCardType: string; idCardNumber: string; employmentStatus: string;
  website: string; avatar?: string; displayPhoto?: string; displayPhotoUrl?: string; avatarUrl?: string; photo?: string;
  idCardFile?: string; idCardUrl?: string; cvFile?: string; cvUrl?: string; cv?: string;
}

export interface SkillEntry { id: string; name: string; }
export interface EducationEntry { id: string; educationLevel: string; graduationClass: string; courseOfStudy: string; institution: string; yearOfGraduation: number; degreeCertificate: string; }
export interface ExperienceEntry { id: string; organization: string; role: string; industry: string; country: string; startDate: string; roleDescription: string; isCurrent: boolean; }
export interface LanguageEntry { id: string; language: string; proficiency: string; }
export interface PortfolioEntry { id: string; label: string; link: string; }
export interface CertEntry { id: string; title: string; issuer: string; year: number; file: string; }

export interface CompletionSection {
  required?: boolean;
  completed?: boolean;
  missingFields?: string[];
  completedFields?: number;
  totalFields?: number;
  records?: number;
  requiredRecords?: number;
  incompleteRecords?: unknown[];
  warning?: string;
}

export interface CompletionResult {
  percentage: number;
  completed: boolean;
  sections: Record<string, CompletionSection> | null;
  status: string | null;
  missing: Record<string, unknown> | null;
  nextStep: string | null;
}

export interface ProfileState {
  personal: PersonalInfo | null; personalLoading: boolean; personalError: string | null;
  skills: SkillEntry[]; skillsLoading: boolean; skillsError: string | null;
  education: EducationEntry[]; educationLoading: boolean; educationError: string | null;
  experience: ExperienceEntry[]; experienceLoading: boolean; experienceError: string | null;
  languages: LanguageEntry[]; languagesLoading: boolean; languagesError: string | null;
  portfolio: PortfolioEntry[]; portfolioLoading: boolean; portfolioError: string | null;
  certs: CertEntry[]; certsLoading: boolean; certsError: string | null;
  completion: number; completionCompleted: boolean;
  completionSections: Record<string, CompletionSection> | null;
  completionLoading: boolean; completionLoaded: boolean;
  /** Backend profile status: DRAFT or COMPLETED. */
  status: string | null;
  /** Optimistic-concurrency timestamp from the last profile read/save. */
  updatedAt: string | null;
  profileLoading: boolean; profileLoaded: boolean; profileError: string | null;
  saveLoading: boolean; saveError: string | null;
}

export interface SaveProfileArg {
  payload: Record<string, unknown>;
  updatedAt?: string | null;
}

interface NormalizedProfile {
  personal: PersonalInfo | null;
  skills: SkillEntry[];
  education: EducationEntry[];
  experience: ExperienceEntry[];
  languages: LanguageEntry[];
  portfolio: PortfolioEntry[];
  certs: CertEntry[];
  status: string | null;
  updatedAt: string | null;
  completion: CompletionResult;
  submitted: boolean;
  demoted: boolean;
  walletCreated: boolean;
  walletId: string | null;
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

function extractCompletion(v: any): CompletionResult {
  const root = v?.data ?? v;
  const candidates = [
    root?.completion, root?.completionRate, root?.completionPercentage,
    root?.percentage, root?.percent, root?.rate,
  ];
  let percentage = 0;
  for (const c of candidates) {
    const n = typeof c === 'string' ? Number(c) : c;
    if (typeof n === 'number' && Number.isFinite(n)) {
      percentage = Math.max(0, Math.min(100, Math.round(n)));
      break;
    }
  }
  const sections = root?.sections && typeof root.sections === 'object' && !Array.isArray(root.sections)
    ? (root.sections as Record<string, CompletionSection>)
    : null;
  return {
    percentage,
    completed: root?.completed === true || percentage === 100,
    sections,
    status: typeof root?.status === 'string' ? root.status : null,
    missing: root?.missing && typeof root.missing === 'object' ? root.missing : null,
    nextStep: typeof root?.nextStep === 'string' ? root.nextStep : null,
  };
}

function looksLikePersonal(v: unknown): v is Record<string, any> {
  if (!v || typeof v !== 'object' || Array.isArray(v)) return false;
  const o = v as Record<string, any>;
  return (
    typeof o.fullName === 'string' ||
    typeof o.firstname === 'string' ||
    typeof o.surname === 'string' ||
    typeof o.username === 'string' ||
    typeof o.gender === 'string' ||
    typeof o.dateOfBirth === 'string' ||
    typeof o.phone === 'string' ||
    typeof o.email === 'string' ||
    typeof o.address === 'string' ||
    typeof o.city === 'string' ||
    typeof o.state === 'string' ||
    typeof o.lga === 'string' ||
    typeof o.country === 'string' ||
    typeof o.idCardType === 'string' ||
    typeof o.idCardNumber === 'string' ||
    typeof o.employmentStatus === 'string' ||
    typeof o.displayPhoto === 'string' ||
    typeof o.idCardFile === 'string' ||
    typeof o.cvFile === 'string'
  );
}

/**
 * Normalise both GET /profile and PUT /profile responses. The PUT response
 * returns the full canonical profile plus completion/submit flags.
 */
function normalizeProfile(r: any): NormalizedProfile {
  const raw = unwrap<any>(r) || {};
  const d = raw.profile && typeof raw.profile === 'object' && !Array.isArray(raw.profile)
    ? { ...raw, ...raw.profile }
    : raw;
  const nested = d.personal ?? d.personalInfo ?? d.userProfile ?? d.user ?? d.bio;
  const personal = looksLikePersonal(nested) ? (nested as Record<string, any>) : looksLikePersonal(d) ? d : null;
  const completionSource = r?.completion ?? d?.completion ?? raw?.completion ?? r ?? d;

  return {
    personal: personal as PersonalInfo | null,
    skills: pickFirst<SkillEntry>(d.skills),
    education: pickFirst<EducationEntry>(d.education, d.educations),
    experience: pickFirst<ExperienceEntry>(d.experience, d.experiences, d.employment, d.workExperience),
    languages: pickFirst<LanguageEntry>(d.languages),
    portfolio: pickFirst<PortfolioEntry>(d.portfolio, d.portfolios),
    certs: pickFirst<CertEntry>(d.certs, d.certifications, d.certificates),
    status: typeof d.status === 'string' ? d.status : null,
    updatedAt: typeof d.updatedAt === 'string' ? d.updatedAt : null,
    completion: extractCompletion(completionSource),
    submitted: r?.submitted === true || d?.submitted === true,
    demoted: r?.demoted === true || d?.demoted === true,
    walletCreated: r?.walletCreated === true || d?.walletCreated === true,
    walletId: typeof r?.walletId === 'string' ? r.walletId : typeof d?.walletId === 'string' ? d.walletId : null,
  };
}

// Full profile — single request hydrates every tab (GET /api/v1/profile).
export const fetchFullProfile = createAsyncThunk('profile/fetchFull', async (_arg: { force?: boolean } | undefined, { rejectWithValue }) => {
  try {
    const r: any = await api.get('/profile');
    return normalizeProfile(r);
  } catch (e: any) { return rejectWithValue(e.message); }
}, {
  // Only ever one request: skip while in-flight, and skip once already loaded.
  condition: (arg, { getState }) => {
    const s = (getState() as any).profile;
    if (s.profileLoading) return false;
    return arg?.force ? true : !s.profileLoaded;
  },
});

export const fetchProfileCompletion = createAsyncThunk('profile/fetchCompletion', async (_arg: { force?: boolean } | undefined, { rejectWithValue }) => {
  try {
    const r: any = await api.get('/profile/completion');
    return extractCompletion(r);
  } catch (e: any) { return rejectWithValue(e.message); }
}, {
  // Skip while a request is in-flight, and skip once loaded unless forced.
  condition: (arg, { getState }) => {
    const s = (getState() as any).profile;
    if (s.completionLoading) return false;
    return arg?.force ? true : !s.completionLoaded;
  },
});

/**
 * PUT /profile
 *
 * Sends only the sections supplied in `payload`. Present sections replace
 * their whole collection; absent sections are left untouched. A complete
 * payload is auto-submitted by the backend. The updatedAt value is used for
 * optimistic concurrency and is refreshed on every successful save.
 */
export const saveProfile = createAsyncThunk(
  'profile/save',
  async (arg: SaveProfileArg, { rejectWithValue }) => {
    try {
      const headers: Record<string, string> = {};
      if (arg.updatedAt) headers['If-Unmodified-Since'] = arg.updatedAt;
      const r: any = await api.put('/profile', arg.payload, { auth: 'required', headers });
      return normalizeProfile(r);
    } catch (e: any) {
      return rejectWithValue({
        message: e?.message || 'Failed to save profile',
        status: typeof e?.status === 'number' ? e.status : null,
      });
    }
  },
);

/**
 * POST /profile/completion
 *
 * Evaluates and submits the profile once all required sections are complete,
 * transitioning the profile to COMPLETED and creating the user's wallet.
 */
export const submitProfileCompletion = createAsyncThunk(
  'profile/submitCompletion',
  async (arg: { payload?: Record<string, unknown>; updatedAt?: string | null } | undefined, { rejectWithValue }) => {
    try {
      const headers: Record<string, string> = {};
      if (arg?.updatedAt) headers['If-Unmodified-Since'] = arg.updatedAt;
      const r: any = await api.post('/profile/completion', arg?.payload, { auth: 'required', headers });
      return r?.data ?? r;
    } catch (e: any) {
      return rejectWithValue({
        message: e?.message || 'Failed to submit profile',
        status: typeof e?.status === 'number' ? e.status : null,
      });
    }
  },
);

const initialState: ProfileState = {
  personal: null, personalLoading: false, personalError: null,
  skills: [], skillsLoading: false, skillsError: null,
  education: [], educationLoading: false, educationError: null,
  experience: [], experienceLoading: false, experienceError: null,
  languages: [], languagesLoading: false, languagesError: null,
  portfolio: [], portfolioLoading: false, portfolioError: null,
  certs: [], certsLoading: false, certsError: null,
  completion: 0, completionCompleted: false, completionSections: null,
  completionLoading: false, completionLoaded: false,
  status: null, updatedAt: null,
  profileLoading: false, profileLoaded: false, profileError: null,
  saveLoading: false, saveError: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    clearProfileErrors(s) {
      s.personalError = null; s.skillsError = null; s.educationError = null;
      s.experienceError = null; s.languagesError = null; s.portfolioError = null;
      s.certsError = null; s.saveError = null;
    },
    resetProfile() { return initialState; },
  },
  extraReducers: (b) => {
    b
      .addCase(fetchFullProfile.pending, (s) => { s.profileLoading = true; s.profileError = null; })
      .addCase(fetchFullProfile.fulfilled, (s, a) => {
        s.profileLoading = false; s.profileLoaded = true;
        if (a.payload.personal) s.personal = a.payload.personal;
        s.skills = asArray<SkillEntry>(a.payload.skills);
        s.education = asArray<EducationEntry>(a.payload.education);
        s.experience = asArray<ExperienceEntry>(a.payload.experience);
        s.languages = asArray<LanguageEntry>(a.payload.languages);
        s.portfolio = asArray<PortfolioEntry>(a.payload.portfolio);
        s.certs = asArray<CertEntry>(a.payload.certs);
        s.status = a.payload.status;
        s.updatedAt = a.payload.updatedAt;
        s.completion = a.payload.completion.percentage;
        s.completionCompleted = a.payload.completion.completed;
        s.completionSections = a.payload.completion.sections;
        s.completionLoaded = true;
      })
      .addCase(fetchFullProfile.rejected, (s, a) => { s.profileLoading = false; s.profileError = a.payload as string; })
      .addCase(fetchProfileCompletion.pending, (s) => { s.completionLoading = true; })
      .addCase(fetchProfileCompletion.fulfilled, (s, a) => {
        s.completionLoading = false;
        s.completionLoaded = true;
        s.completion = a.payload.percentage;
        s.completionCompleted = a.payload.completed;
        s.completionSections = a.payload.sections;
        if (a.payload.status) s.status = a.payload.status;
      })
      .addCase(fetchProfileCompletion.rejected, (s) => { s.completionLoading = false; })
      .addCase(saveProfile.pending, (s) => { s.saveLoading = true; s.saveError = null; })
      .addCase(saveProfile.fulfilled, (s, a) => {
        s.saveLoading = false;
        const p = a.payload;
        if (p.personal) s.personal = p.personal;
        s.skills = asArray<SkillEntry>(p.skills);
        s.education = asArray<EducationEntry>(p.education);
        s.experience = asArray<ExperienceEntry>(p.experience);
        s.languages = asArray<LanguageEntry>(p.languages);
        s.portfolio = asArray<PortfolioEntry>(p.portfolio);
        s.certs = asArray<CertEntry>(p.certs);
        s.status = p.status ?? p.completion.status;
        s.updatedAt = p.updatedAt;
        s.completion = p.completion.percentage;
        s.completionCompleted = p.completion.completed;
        s.completionSections = p.completion.sections;
        s.completionLoaded = true;
      })
      .addCase(saveProfile.rejected, (s, a) => {
        s.saveLoading = false;
        const e: any = a.payload;
        s.saveError = typeof e === 'string' ? e : e?.message || 'Failed to save profile';
      })
      .addCase(submitProfileCompletion.pending, (s) => { s.saveLoading = true; s.saveError = null; })
      .addCase(submitProfileCompletion.fulfilled, (s, a) => {
        s.saveLoading = false;
        const raw = a.payload;
        if (raw && typeof raw === 'object') {
          const p = normalizeProfile(raw);
          if (p.personal) s.personal = p.personal;
          if (p.skills.length) s.skills = asArray<SkillEntry>(p.skills);
          if (p.education.length) s.education = asArray<EducationEntry>(p.education);
          if (p.experience.length) s.experience = asArray<ExperienceEntry>(p.experience);
          if (p.languages.length) s.languages = asArray<LanguageEntry>(p.languages);
          if (p.portfolio.length) s.portfolio = asArray<PortfolioEntry>(p.portfolio);
          if (p.certs.length) s.certs = asArray<CertEntry>(p.certs);
          if (p.status || p.completion.status) s.status = p.status ?? p.completion.status;
          if (p.updatedAt) s.updatedAt = p.updatedAt;
          if (p.completion.percentage > 0 || p.completion.completed) {
            s.completion = p.completion.percentage;
            s.completionCompleted = p.completion.completed;
          }
          if (p.completion.sections) s.completionSections = p.completion.sections;
        }
      })
      .addCase(submitProfileCompletion.rejected, (s, a) => {
        s.saveLoading = false;
        const e: any = a.payload;
        s.saveError = typeof e === 'string' ? e : e?.message || 'Failed to submit profile';
      });
  },
});

export const { clearProfileErrors, resetProfile } = profileSlice.actions;
export default profileSlice.reducer;
