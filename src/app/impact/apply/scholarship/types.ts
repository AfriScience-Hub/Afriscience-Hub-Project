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
  };
  school: {
    scholarshipLevel: string;
    institutionName: string;
    institutionAddress: string;
    country: string;
    stateRegion: string;
    departmentName: string;
    matricNo: string;
    academicYear: string;
    initialCgpa: string;
    schoolIdCard: File | null;
  };
  impact: {
    problemsBefore: string[];
    expectedAnnualOutcome: string[];
    story: string;
  };
  media: {
    screeningExercise: File[];
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
    },
    school: {
      scholarshipLevel: '',
      institutionName: '',
      institutionAddress: '',
      country: '',
      stateRegion: '',
      departmentName: '',
      matricNo: '',
      academicYear: '',
      initialCgpa: '',
      schoolIdCard: null,
    },
    impact: {
      problemsBefore: [''],
      expectedAnnualOutcome: [''],
      story: '',
    },
    media: {
      screeningExercise: [],
      clearanceFunding: [],
      projectCompletion: [],
    },
    formUndertaking: false,
  };
}

export function hasAtLeastOneSocial(s: SocialHandles): boolean {
  return Boolean(s.linkedin || s.instagram || s.twitter || s.facebook);
}
