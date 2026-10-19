export type OptionStatus = 'Active' | 'Inactive';

export interface ManagedOption {
  id: string;
  name: string;
  status: OptionStatus;
  count: number;
  note?: string;
}

export type ManageTab = 'Fields' | 'Interests' | 'Stages' | 'Ownership' | 'SDGs' | 'Price';

export const MANAGE_TABS: { id: ManageTab; label: string }[] = [
  { id: 'Fields', label: 'Fields' },
  { id: 'Interests', label: 'Interests' },
  { id: 'Stages', label: 'Stages' },
  { id: 'Ownership', label: 'Ownership' },
  { id: 'SDGs', label: 'SDGs' },
  { id: 'Price', label: 'Price' },
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
    { id: 'i1', name: 'Climate Action', status: 'Active', count: 54, note: 'Innovations focused on climate mitigation or adaptation.' },
    { id: 'i2', name: 'Food Security', status: 'Active', count: 61, note: 'Solutions improving food availability and access.' },
    { id: 'i3', name: 'Healthcare Access', status: 'Active', count: 42, note: 'Improving access to affordable healthcare.' },
    { id: 'i4', name: 'Clean Energy', status: 'Active', count: 39, note: 'Renewable and clean energy solutions.' },
    { id: 'i5', name: 'Youth Employment', status: 'Inactive', count: 8 },
  ],
  Stages: [
    { id: 's1', name: 'Idea', status: 'Active', count: 21, note: 'Concept stage — no prototype yet.' },
    { id: 's2', name: 'Prototype', status: 'Active', count: 48, note: 'A working model exists for testing.' },
    { id: 's3', name: 'Early Stage', status: 'Active', count: 67, note: 'Validated and used by early adopters.' },
    { id: 's4', name: 'Growth Stage', status: 'Active', count: 38, note: 'Scaling to more users and markets.' },
    { id: 's5', name: 'Mature', status: 'Active', count: 18, note: 'Established and stable in the market.' },
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
  Price: [
    { id: 'p1', name: 'Default Innovation Price', status: 'Active', count: 1, note: 'Default price in NGN for innovation listings.' },
  ],
};

export const TAB_DESCRIPTIONS: Record<ManageTab, string> = {
  Fields: 'Fields describe the main area or sector of the innovation.',
  Interests: 'Interests help match innovations to thematic priorities.',
  Stages: 'Stages track how far the innovation has matured.',
  Ownership: 'Ownership indicates who owns or leads the innovation.',
  SDGs: 'SDGs link innovations to sustainable development goals.',
  Price: 'Set the price for innovation listings.',
};
