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

export type TeamMember = {
  id: string;
  role: string;
  title: string;
  name: string;
  phone: string;
  email: string;
  socials: SocialHandles;
  displayImage: File | null;
  idCard: IdCard;
  isDefaultSupervisor?: boolean;
};

export type Laboratory = {
  name: string;
  address: string;
  phone: string;
  email: string;
  country: string;
  stateRegion: string;
};

export type AnalyticalProcedure = {
  name: string;
  noOfSamples: string;
  averageCost: string;
  currency: 'USD' | 'Local';
};

export type ResearchFormState = {
  head: {
    title: string;
    name: string;
    idTag: string;
    phone: string;
    email: string;
    socials: SocialHandles;
    displayImage: File | null;
    researcherIdentity: '' | 'Academic Researcher' | 'Independent Researcher';
    researchLevel: string;
    researchLevelOther: string;
    role: string;
    schoolName: string;
    schoolAddress: string;
    matricNo: string;
    department: string;
    schoolIdCard: File | null;
    previousPublications: string[];
    idCard: IdCard;
    degreeCertificate: File | null;
  };
  team: TeamMember[];
  research: {
    duration: string;
    country: string;
    stateRegion: string;
    title: string;
    sampleSize: string;
    materials: string[];
    laboratories: Laboratory[];
    procedures: AnalyticalProcedure[];
    proposalDoc: File | null;
    budgetDoc: File | null;
    scopes: string[];
    scopeOther: string;
  };
  impact: {
    researchAim: string;
    objectives: string[];
    expectedOutcomes: string[];
    resultInterpretations: string[];
    researchSummary: string;
    impactAreas: string[];
    publicationLinks: string[];
  };
  media: {
    materialsAcquisition: File[];
    sampleCollection: File[];
    setupExperimentation: File[];
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

export function createTeamMember(partial?: Partial<TeamMember>): TeamMember {
  return {
    id: `tm-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    role: '',
    title: '',
    name: '',
    phone: '',
    email: '',
    socials: emptySocials(),
    displayImage: null,
    idCard: emptyIdCard(),
    ...partial,
  };
}

export function createDefaultSupervisor(): TeamMember {
  return createTeamMember({
    role: 'Supervisor',
    isDefaultSupervisor: true,
  });
}

export function createInitialResearchForm(user: {
  name?: string;
  email?: string;
  phone?: string;
}): ResearchFormState {
  return {
    head: {
      title: '',
      name: user.name || '',
      idTag: `ASH-RS-APP-${Date.now().toString().slice(-6)}`,
      phone: user.phone || '',
      email: user.email || '',
      socials: emptySocials(),
      displayImage: null,
      researcherIdentity: '',
      researchLevel: '',
      researchLevelOther: '',
      role: 'Head Researcher',
      schoolName: '',
      schoolAddress: '',
      matricNo: '',
      department: '',
      schoolIdCard: null,
      previousPublications: Array.from({ length: 7 }, () => ''),
      idCard: emptyIdCard(),
      degreeCertificate: null,
    },
    team: [],
    research: {
      duration: '',
      country: '',
      stateRegion: '',
      title: '',
      sampleSize: '',
      materials: [''],
      laboratories: [
        {
          name: '',
          address: '',
          phone: '',
          email: '',
          country: '',
          stateRegion: '',
        },
      ],
      procedures: [
        { name: '', noOfSamples: '', averageCost: '', currency: 'USD' },
      ],
      proposalDoc: null,
      budgetDoc: null,
      scopes: [],
      scopeOther: '',
    },
    impact: {
      researchAim: '',
      objectives: [''],
      expectedOutcomes: [''],
      resultInterpretations: [''],
      researchSummary: '',
      impactAreas: [''],
      publicationLinks: [''],
    },
    media: {
      materialsAcquisition: [],
      sampleCollection: [],
      setupExperimentation: [],
      projectCompletion: [],
    },
    formUndertaking: false,
  };
}

export function hasAtLeastOneSocial(s: SocialHandles): boolean {
  return Boolean(s.linkedin || s.instagram || s.twitter || s.facebook);
}

export function wordCount(text: string): number {
  return text.trim() ? text.trim().split(/\s+/).length : 0;
}

export function getResearchCategory(
  identity: ResearchFormState['head']['researcherIdentity']
): string {
  if (identity === 'Academic Researcher') return 'Academic Research';
  if (identity === 'Independent Researcher') return 'Independent Research';
  return '—';
}

export function getDisplayResearchLevel(head: ResearchFormState['head']): string {
  if (!head.researchLevel) return '—';
  if (head.researchLevel === 'Other' && head.researchLevelOther) {
    return head.researchLevelOther;
  }
  return head.researchLevel;
}
