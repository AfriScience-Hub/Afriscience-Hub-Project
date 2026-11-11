export interface ScientistProfile {
  profileImage: string | null;
  backgroundImage: string | null;
  /** Local file staged until the listing is saved or submitted. */
  profileImageFile?: File | null;
  /** Local file staged until the listing is saved or submitted. */
  backgroundImageFile?: File | null;
  name: string;
  country: string;
  stateRegion: string;
  bio: string;
}

export interface ProfessionalDetails {
  field: string;
  professions: string[];
  professionOther: string;
  degree: string;
  /** Preview URL for a staged file or the saved document on an existing listing. */
  degreeCertificate: string;
  /** Local file staged until the listing is saved or submitted. */
  degreeCertificateFile?: File | null;
  degreeCertificateName?: string;
  services: string[];
}

export interface ServiceCharge {
  description: string;
  minCost: string;
  maxCost: string;
  currency: string;
}

export interface OtherCharge {
  name: string;
  description: string;
  minCost: string;
  maxCost: string;
  currency: string;
}

export interface ScientistFees {
  serviceCosts: Record<string, ServiceCharge>;
  otherCharges: OtherCharge[];
}

export interface ProfessionalHighlight {
  responseTime: string;
  workDays: string[];
  workHours: string[];
}

export interface ScientistContact {
  socials: {
    LinkedIn: string;
    X: string;
    Instagram: string;
    Facebook: string;
  };
}
