export type OptionStatus = 'Active' | 'Inactive';

export interface ManagedOption {
  id: string;
  name: string;
  status: OptionStatus;
  count: number;
}

export type ManageTab = 'Fields' | 'Interests' | 'Stages' | 'Ownership' | 'SDGs' | 'Countries' | 'Availability';

export const MANAGE_TABS: { id: ManageTab; label: string }[] = [
  { id: 'Fields', label: 'Fields' },
  { id: 'Interests', label: 'Interests' },
  { id: 'Stages', label: 'Stages' },
  { id: 'Ownership', label: 'Ownership' },
  { id: 'SDGs', label: 'SDGs' },
  { id: 'Countries', label: 'Countries' },
  { id: 'Availability', label: 'Availability' },
];

export const DUMMY_OPTIONS: Record<ManageTab, ManagedOption[]> = {
  Fields: [
    { id: 'f1', name: 'Health & Biotech', status: 'Active', count: 68 },
    { id: 'f2', name: 'Agriculture & Food', status: 'Active', count: 82 },
    { id: 'f3', name: 'Energy & Environment', status: 'Active', count: 58 },
    { id: 'f4', name: 'Education & Learning', status: 'Active', count: 44 },
    { id: 'f5', name: 'ICT & Software', status: 'Active', count: 28 },
    { id: 'f6', name: 'Engineering & Manufacturing', status: 'Active', count: 36 },
    { id: 'f7', name: 'Other', status: 'Inactive', count: 5 },
  ],
  Interests: [
    { id: 'i1', name: 'Climate Action', status: 'Active', count: 54 },
    { id: 'i2', name: 'Food Security', status: 'Active', count: 61 },
    { id: 'i3', name: 'Healthcare Access', status: 'Active', count: 42 },
    { id: 'i4', name: 'Clean Energy', status: 'Active', count: 39 },
    { id: 'i5', name: 'Youth Employment', status: 'Inactive', count: 8 },
  ],
  Stages: [
    { id: 's1', name: 'Idea', status: 'Active', count: 21 },
    { id: 's2', name: 'Prototype', status: 'Active', count: 48 },
    { id: 's3', name: 'Early Stage', status: 'Active', count: 67 },
    { id: 's4', name: 'Growth Stage', status: 'Active', count: 38 },
    { id: 's5', name: 'Mature', status: 'Active', count: 18 },
    { id: 's6', name: 'Archived', status: 'Inactive', count: 6 },
  ],
  Ownership: [
    { id: 'o1', name: 'Individual', status: 'Active', count: 112 },
    { id: 'o2', name: 'Team', status: 'Active', count: 86 },
    { id: 'o3', name: 'Institution', status: 'Active', count: 41 },
    { id: 'o4', name: 'Community Group', status: 'Inactive', count: 4 },
  ],
  SDGs: [
    { id: 'g1', name: 'SDG 3 — Good Health', status: 'Active', count: 31 },
    { id: 'g2', name: 'SDG 7 — Affordable Energy', status: 'Active', count: 27 },
    { id: 'g3', name: 'SDG 9 — Industry & Innovation', status: 'Active', count: 44 },
    { id: 'g4', name: 'SDG 13 — Climate Action', status: 'Active', count: 36 },
    { id: 'g5', name: 'SDG 4 — Quality Education', status: 'Active', count: 29 },
  ],
  Countries: [
    { id: 'c1', name: 'Nigeria', status: 'Active', count: 92 },
    { id: 'c2', name: 'Kenya', status: 'Active', count: 74 },
    { id: 'c3', name: 'South Africa', status: 'Active', count: 61 },
    { id: 'c4', name: 'Ghana', status: 'Active', count: 48 },
    { id: 'c5', name: 'Rwanda', status: 'Active', count: 22 },
    { id: 'c6', name: 'Ethiopia', status: 'Inactive', count: 3 },
  ],
  Availability: [
    { id: 'a1', name: 'Available Now', status: 'Active', count: 156 },
    { id: 'a2', name: 'Licensing', status: 'Active', count: 43 },
    { id: 'a3', name: 'Partnership Open', status: 'Active', count: 38 },
    { id: 'a4', name: 'Not Available', status: 'Inactive', count: 12 },
  ],
};

export const TAB_DESCRIPTIONS: Record<ManageTab, string> = {
  Fields: 'Fields describe the main area or sector of the innovation.',
  Interests: 'Interests help match innovations to thematic priorities.',
  Stages: 'Stages track how far the innovation has matured.',
  Ownership: 'Ownership indicates who owns or leads the innovation.',
  SDGs: 'SDGs link innovations to sustainable development goals.',
  Countries: 'Countries control which geography filters appear.',
  Availability: 'Availability controls where innovations can be available.',
};
