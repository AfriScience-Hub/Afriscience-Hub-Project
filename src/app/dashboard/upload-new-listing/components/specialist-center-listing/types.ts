export interface CenterIdentity {
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

export interface CenterInformation {
  field: string;
  categories: string[];
  categoryOther: string;
  ownership: string;
  ownershipOther: string;
  services: string[];
}

export interface ServiceFee {
  description: string;
  costRange: string;
  currency: string;
}

export interface OtherFee {
  name: string;
  description: string;
  cost: string;
  currency: string;
}

export interface CenterFees {
  serviceFees: Record<string, ServiceFee>;
  otherFees: OtherFee[];
}

export interface CenterDocEntry {
  name: string;
  issuer: string;
  year: string;
  file: string;
}
