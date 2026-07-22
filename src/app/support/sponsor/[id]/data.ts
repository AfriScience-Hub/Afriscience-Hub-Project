export interface CatalogItem {
  productName: string;
  currency: string;
  price: string;
  ashDiscountPrice: string;
  specifications: string[];
  images: string[];
}

export interface CatalogGroup {
  industry: string;
  items: CatalogItem[];
}

export interface SponsorDetail {
  id: number;
  name: string;
  image: string;
  industries: string[];
  status: string;
  tier: string;
  country: string;
  state: string;
  address: string;
  motto: string;
  description: string;
  catalog: CatalogGroup[];
  licenses: { name: string; issuer: string; year: number }[];
  policies: string[];
  awards: { title: string; org: string }[];
  mediaGallery: { type: string; url: string; thumbnail?: string }[];
  contact: {
    phone: string;
    email: string;
    website: string;
    linkedin: string;
    twitter: string;
    facebook: string;
    mapUrl: string;
  };
}

import { SPONSORS } from './sponsorData';

export const MOCK_SPONSORS: Record<number, SponsorDetail> = {};
for (const s of SPONSORS) {
  MOCK_SPONSORS[s.id] = s;
}
