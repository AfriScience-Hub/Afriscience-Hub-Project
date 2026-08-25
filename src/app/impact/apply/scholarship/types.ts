export type SocialHandles = {
  linkedin: string;
  instagram: string;
  twitter: string;
  facebook: string;
};

export type IdCard = {
  type: string;
  otherSpecify: string;
  file: File | null;
};

export type Guardian = {
  id: string;
  title: string;
  name: string;
  phone: string;
  email: string;
  socials: SocialHandles;
  displayImage: File | null;
  idCard: IdCard;
};

export type ScholarshipFormState = {
  applicant: {
    title: string;
    name: string;
    idTag: string;
    phone: string;
    email: string;
    socials: SocialHandles;
    displayImage: File | null;
    idCard: IdCard;
    degreeCertificate: File | null;
    academicTranscript: File | null;
    academicLevel: string;
    academicLevelOther: string;
  };
  school: {
    scholarshipLevel: string;
    academicYear: string;
    institutionName: string;
    institutionAddress: string;
    country: string;
    stateRegion: string;
    departmentName: string;
    matricNo: string;
    currentCgpa: string;
    schoolIdCard: File | null;
  };
  guardians: Guardian[];
  impact: {
    problemsEncountered: string[];
    expectedOutcome: string[];
    outcomesAfterIntervention: string[];
    story: string;
  };
  media: {
    screeningExercise: File[];
    awardCeremony: File[];
    clearanceFunding: File[];
    projectCompletion: File[];
  };
  formUndertaking: boolean;
};

export function emptySocials(): SocialHandles {
  return { linkedin: '', instagram: '', twitter: '', facebook: '' };
}

export function emptyIdCard(): IdCard {
  return { type: '', otherSpecify: '', file: null };
}

export function createInitialScholarshipForm(user: {
  name?: string;
  email?: string;
  phone?: string;
}): ScholarshipFormState {
  return {
    applicant: {
      title: '',
      name: user.name || '',
      idTag: `ASH-ES-APP-${Date.now().toString().slice(-6)}`,
      phone: user.phone || '',
      email: user.email || '',
      socials: emptySocials(),
      displayImage: null,
      idCard: emptyIdCard(),
      degreeCertificate: null,
      academicTranscript: null,
      academicLevel: '',
      academicLevelOther: '',
    },
    school: {
      scholarshipLevel: '',
      academicYear: '',
      institutionName: '',
      institutionAddress: '',
      country: '',
      stateRegion: '',
      departmentName: '',
      matricNo: '',
      currentCgpa: '',
      schoolIdCard: null,
    },
    guardians: [
      {
        id: `guardian-${Date.now()}`,
        title: '',
        name: '',
        phone: '',
        email: '',
        socials: emptySocials(),
        displayImage: null,
        idCard: emptyIdCard(),
      },
    ],
    impact: {
      problemsEncountered: [''],
      expectedOutcome: [''],
      outcomesAfterIntervention: [''],
      story: '',
    },
    media: {
      screeningExercise: [],
      awardCeremony: [],
      clearanceFunding: [],
      projectCompletion: [],
    },
    formUndertaking: false,
  };
}

export function hasAtLeastOneSocial(s: SocialHandles): boolean {
  return Boolean(s.linkedin || s.instagram || s.twitter || s.facebook);
}

export const ACADEMIC_LEVELS = ['Undergraduate', 'Masters', 'Doctoral', 'Other'] as const;

export const ACADEMIC_YEARS: Record<string, string[]> = {
  Undergraduate: ['1st year', '2nd year', '3rd year', '4th year', '5th year', '6th year'],
  Masters: ['1st year', '2nd year', '3rd year'],
  Doctoral: ['1st year', '2nd year', '3rd year', '4th year'],
  Other: ['1st year', '2nd year', '3rd year', '4th year', '5th year', '6th year'],
};
