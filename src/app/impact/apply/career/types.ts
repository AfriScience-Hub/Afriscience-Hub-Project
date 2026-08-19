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

export type CoOwner = {
  id: string;
  title: string;
  name: string;
  phone: string;
  email: string;
  socials: SocialHandles;
  displayImage: File | null;
  idCard: IdCard;
  cv: File | null;
};

export type Competitor = { brandName: string; address: string };
export type BankRel = { bankName: string; bankAddress: string; accountNumber: string };
export type Liability = {
  institution: string;
  totalAmount: string;
  remainingBalance: string;
  tenorMonths: string;
  currency: 'USD' | 'Local';
};
export type RiskItem = { riskType: string; preventionControl: string };

export type CareerFormState = {
  head: {
    title: string;
    name: string;
    idTag: string;
    phone: string;
    email: string;
    socials: SocialHandles;
    displayImage: File | null;
    idCard: IdCard;
    degreeCertificate: File | null;
    experienceDocType: string;
    experienceDoc: File | null;
    cv: File | null;
  };
  coOwners: CoOwner[];
  company: {
    registrationStatus: 'Registered' | 'Not Registered' | '';
    displayImage: File | null;
    companyName: string;
    companyAddress: string;
    country: string;
    stateRegion: string;
    phone: string;
    email: string;
    website: string;
    socials: SocialHandles;
  };
  businessPlan: {
    industry: string;
    industryOther: string;
    description: string;
    productsServices: string[];
    valuePropositions: string[];
    currentCustomerBase: string;
    marketingPlan: string[];
    distributionPlan: string[];
    customerGrowthProjection: string;
    competitors: Competitor[];
    employmentProjection: { y1: string; y2: string; y3: string };
    revenueProjection: { y1: string; y2: string; y3: string; currency: 'USD' | 'Local' };
    careerChallenges: string[];
    bankRelationships: BankRel[];
    personalLiabilities: Liability[];
    risks: RiskItem[];
    budgetDocument: File | null;
  };
  impact: {
    careerPath: string;
    careerObjectives: string[];
    careerRequirements: string[];
    expectedCareerImpacts: string[];
  };
  media: {
    businessMarketSurvey: File[];
    fundingSetup: File[];
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

export function createCoOwner(): CoOwner {
  return {
    id: `co-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    title: '',
    name: '',
    phone: '',
    email: '',
    socials: emptySocials(),
    displayImage: null,
    idCard: emptyIdCard(),
    cv: null,
  };
}

export function createInitialCareerForm(user: {
  name?: string;
  email?: string;
  phone?: string;
}): CareerFormState {
  const idTag = `ASH-CS-APP-${Date.now().toString().slice(-6)}`;
  return {
    head: {
      title: '',
      name: user.name || '',
      idTag,
      phone: user.phone || '',
      email: user.email || '',
      socials: emptySocials(),
      displayImage: null,
      idCard: emptyIdCard(),
      degreeCertificate: null,
      experienceDocType: '',
      experienceDoc: null,
      cv: null,
    },
    coOwners: [],
    company: {
      registrationStatus: '',
      displayImage: null,
      companyName: '',
      companyAddress: '',
      country: '',
      stateRegion: '',
      phone: '',
      email: '',
      website: '',
      socials: emptySocials(),
    },
    businessPlan: {
      industry: '',
      industryOther: '',
      description: '',
      productsServices: [''],
      valuePropositions: [''],
      currentCustomerBase: '',
      marketingPlan: [''],
      distributionPlan: [''],
      customerGrowthProjection: '',
      competitors: [{ brandName: '', address: '' }],
      employmentProjection: { y1: '', y2: '', y3: '' },
      revenueProjection: { y1: '', y2: '', y3: '', currency: 'USD' },
      careerChallenges: [''],
      bankRelationships: [{ bankName: '', bankAddress: '', accountNumber: '' }],
      personalLiabilities: [],
      risks: [{ riskType: '', preventionControl: '' }],
      budgetDocument: null,
    },
    impact: {
      careerPath: '',
      careerObjectives: [''],
      careerRequirements: [''],
      expectedCareerImpacts: [''],
    },
    media: {
      businessMarketSurvey: [],
      fundingSetup: [],
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
