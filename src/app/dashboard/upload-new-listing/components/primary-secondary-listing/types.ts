'use client';

export interface YourInformation {
  fullName: string;
  phone: string;
  email: string;
  username: string;
}

export interface SchoolIdentity {
  profileImage: string | null;
  backgroundImage: string | null;
  name: string;
  motto: string;
  address: string;
  country: string;
  stateRegion: string;
  phone: string;
  email: string;
  website: string;
  socials: {
    LinkedIn: string;
    Twitter: string;
    Instagram: string;
    Facebook: string;
  };
  description: string;
}

export interface SchoolInformation {
  class: string;
  program: string;
  gender: string;
  ownership: string;
  ownershipOther: string;
  services: string[];
  scopes: string[];
  tuitionFees: TuitionFee[];
  otherFees: OtherFee[];
  engagementPolicies: string[];
}

export interface TuitionFee {
  level: string;
  fee: string;
  currency: string;
}

export interface OtherFee {
  name: string;
  description: string;
  cost: string;
  currency: string;
}

export interface AcademicInformation {
  academicCalendar: AcademicTerm[];
  subjects: string[];
  gradingSystem: GradingEntry[];
  degreesAwarded: DegreeEntry[];
  admissionRequirements: {
    primary: string[];
    secondary: string[];
  };
}

export interface AcademicTerm {
  term: string;
  startDate: string;
  midtermBreakDate: string;
  closureDate: string;
}

export interface GradingEntry {
  scoreRange: string;
  symbol: string;
  interpretation: string;
}

export interface DegreeEntry {
  abbreviation: string;
  fullName: string;
}

export interface LicensesAchievements {
  licenses: DocEntry[];
  achievements: DocEntry[];
  notableAlumni: AlumniEntry[];
}

export interface DocEntry {
  name: string;
  issuer: string;
  year: string;
  file: File | null;
  previewUrl: string | null;
}

export interface AlumniEntry {
  fullName: string;
  impact: string;
  displayPicture: File | null;
  previewUrl: string | null;
}

export interface DownloadableResources {
  brochures: ResourceEntry[];
  curricula: ResourceEntry[];
  timetables: ResourceEntry[];
  feeStructures: ResourceEntry[];
  policies: ResourceEntry[];
  admissionForms: ResourceEntry[];
  others: ResourceEntry[];
}

export interface ResourceEntry {
  title: string;
  file: File | null;
  previewUrl: string | null;
}

export interface SchoolHighlight {
  workDays: string[];
  workHours: string[];
  activeStudents: string;
  mediaGallery: Record<string, MediaItem[]>;
}

export interface MediaItem {
  file: File;
  previewUrl: string;
  name: string;
}

export const EMPTY_IDENTITY: SchoolIdentity = {
  profileImage: null,
  backgroundImage: null,
  name: '',
  motto: '',
  address: '',
  country: '',
  stateRegion: '',
  phone: '',
  email: '',
  website: '',
  socials: { LinkedIn: '', Twitter: '', Instagram: '', Facebook: '' },
  description: '',
};

export const EMPTY_INFORMATION: SchoolInformation = {
  class: '',
  program: '',
  gender: '',
  ownership: '',
  ownershipOther: '',
  services: ['Teaching & Learning'],
  scopes: [],
  tuitionFees: [],
  otherFees: [],
  engagementPolicies: [],
};

export const EMPTY_ACADEMIC: AcademicInformation = {
  academicCalendar: [
    { term: '1st Term', startDate: '', midtermBreakDate: '', closureDate: '' },
    { term: '2nd Term', startDate: '', midtermBreakDate: '', closureDate: '' },
    { term: '3rd Term', startDate: '', midtermBreakDate: '', closureDate: '' },
  ],
  subjects: [],
  gradingSystem: [],
  degreesAwarded: [],
  admissionRequirements: { primary: [], secondary: [] },
};

export const EMPTY_LICENSES: LicensesAchievements = {
  licenses: [],
  achievements: [],
  notableAlumni: [],
};

export const EMPTY_RESOURCES: DownloadableResources = {
  brochures: [],
  curricula: [],
  timetables: [],
  feeStructures: [],
  policies: [],
  admissionForms: [],
  others: [],
};

export const EMPTY_HIGHLIGHT: SchoolHighlight = {
  workDays: [],
  workHours: [],
  activeStudents: '',
  mediaGallery: {},
};

export const DEFAULT_TUITION_FEE: TuitionFee = { level: '', fee: '', currency: 'USD' };
export const DEFAULT_OTHER_FEE: OtherFee = { name: '', description: '', cost: '', currency: 'USD' };
export const DEFAULT_GRADING: GradingEntry = { scoreRange: '', symbol: '', interpretation: '' };
export const DEFAULT_DEGREE: DegreeEntry = { abbreviation: '', fullName: '' };
export const EMPTY_DOC: DocEntry = { name: '', issuer: '', year: '', file: null, previewUrl: null };
export const EMPTY_ALUMNI: AlumniEntry = { fullName: '', impact: '', displayPicture: null, previewUrl: null };
export const EMPTY_RESOURCE: ResourceEntry = { title: '', file: null, previewUrl: null };