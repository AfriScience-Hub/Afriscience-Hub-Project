export interface ScientistProfile {
  profileImage: string | null;
  backgroundImage: string | null;
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
  degreeCertificate: string;
  services: string[];
}

export interface ServiceCharge {
  description: string;
  costRange: string;
  currency: string;
}

export interface OtherCharge {
  name: string;
  description: string;
  cost: string;
  currency: string;
}

export interface ScientistFees {
  serviceCosts: Record<string, ServiceCharge>;
  otherCharges: OtherCharge[];
}

export interface ScientistContact {
  phone: string;
  email: string;
  website: string;
  socials: {
    LinkedIn: string;
    Twitter: string;
    Instagram: string;
    Facebook: string;
  };
}
