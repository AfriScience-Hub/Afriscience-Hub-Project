export type OptionStatus = 'Active' | 'Inactive';

export interface ManagedOption {
  id: string;
  name: string;
  status: OptionStatus;
  /** Raw active flag, sent back on edit so it is preserved. */
  isActive?: boolean;
  /** Per-row listing price, only used by the Country tab. */
  price?: string;
  count: number;
  /** Info tooltip shown beside the option. Categories only. */
  note?: string;
}

/** The single price shared by every category, held once for the whole tab. */
export interface CategoryPrice {
  /** Price of one category for African countries, smallest unit. */
  africaOne?: string;
  /** Price of two or more categories for African countries, smallest unit. */
  africaTwoOrMore?: string;
  /** Price of one category for non-African countries, smallest unit. */
  nonAfricaOne?: string;
  /** Price of two or more categories for non-African countries, smallest unit. */
  nonAfricaTwoOrMore?: string;
}

export type ManageTab = 'Fields' | 'Categories' | 'Services' | 'Ownership' | 'Country';

export const MANAGE_TABS: { id: ManageTab; label: string }[] = [
  { id: 'Fields', label: 'Fields' },
  { id: 'Categories', label: 'Categories' },
  { id: 'Services', label: 'Services' },
  { id: 'Ownership', label: 'Ownership' },
  { id: 'Country', label: 'Country' },
];

/** Singular form of each tab label for "Add X" / "Edit X" button text. */
export const TAB_SINGULAR: Record<ManageTab, string> = {
  Fields: 'Field',
  Categories: 'Category',
  Services: 'Service',
  Ownership: 'Ownership',
  Country: 'Country',
};

export const TAB_DESCRIPTIONS: Record<ManageTab, string> = {
  Fields: 'Fields describe the main area or sector the specialist centre operates in.',
  Categories: 'Categories list the disciplines a centre covers. Every category shares one price per country group, and carries an info note.',
  Services: 'Services are the individual offerings a centre provides to its visitors.',
  Ownership: 'Ownership indicates who owns or leads the specialist centre.',
  Country: 'Countries set the listing price for African and non-African centres.',
};

/** Only Categories carry the info icon, so only they get a note field. */
export const TABS_WITHOUT_NOTE: ManageTab[] = ['Fields', 'Services', 'Ownership', 'Country'];

/** Tabs whose table renders a Price column. */
export const TABS_TABLE_PRICE: ManageTab[] = ['Categories', 'Country'];

/** Tabs whose Add / Edit dialog accepts a price (per-row, i.e. Country only). */
export const TABS_DIALOG_PRICE: ManageTab[] = ['Country'];

/** Tabs that expose the "Create price" button beside "Add X". */
export const TABS_WITH_CREATE_PRICE: ManageTab[] = ['Categories'];

/** Starter rows so every tab opens with realistic content. */
export const SEED_OPTIONS: Record<ManageTab, ManagedOption[]> = {
  Fields: [
    { id: 'f-1', name: 'Medical', status: 'Active', isActive: true, count: 24 },
    { id: 'f-2', name: 'Engineering', status: 'Active', isActive: true, count: 18 },
    { id: 'f-3', name: 'Agriculture', status: 'Active', isActive: true, count: 15 },
    { id: 'f-4', name: 'Environmental Science', status: 'Active', isActive: true, count: 11 },
    { id: 'f-5', name: 'ICT & Software', status: 'Active', isActive: true, count: 9 },
    { id: 'f-6', name: 'Renewable Energy', status: 'Inactive', isActive: false, count: 6 },
  ],
  Categories: [
    { id: 'c-1', name: 'Basic Clinical Diagnostics', status: 'Active', isActive: true, count: 32, note: 'Routine screening and general health checks.' },
    { id: 'c-2', name: 'Haematology | Haematopoiesis', status: 'Active', isActive: true, count: 21, note: 'Blood analysis and blood-forming tissue studies.' },
    { id: 'c-3', name: 'Molecular | Genetics', status: 'Active', isActive: true, count: 17, note: 'DNA, RNA and molecular sequencing work.' },
    { id: 'c-4', name: 'Crop Science', status: 'Active', isActive: true, count: 14, note: '' },
    { id: 'c-5', name: 'Solar & Energy Storage', status: 'Active', isActive: true, count: 12, note: '' },
    { id: 'c-6', name: 'Robotics & Automation', status: 'Inactive', isActive: false, count: 8, note: '' },
  ],
  Services: [
    { id: 's-1', name: 'Diagnosis (Screening)', status: 'Active', isActive: true, count: 41 },
    { id: 's-2', name: 'Result Interpretation', status: 'Active', isActive: true, count: 36 },
    { id: 's-3', name: 'Research & Development', status: 'Active', isActive: true, count: 28 },
    { id: 's-4', name: 'Training (Industrial)', status: 'Active', isActive: true, count: 23 },
    { id: 's-5', name: 'Quality Control & Assurance', status: 'Active', isActive: true, count: 19 },
    { id: 's-6', name: 'Consultation', status: 'Inactive', isActive: false, count: 12 },
  ],
  Ownership: [
    { id: 'o-1', name: 'Private', status: 'Active', isActive: true, count: 38 },
    { id: 'o-2', name: 'NGO | Charity', status: 'Active', isActive: true, count: 22 },
    { id: 'o-3', name: 'Government | Public', status: 'Active', isActive: true, count: 14 },
    { id: 'o-4', name: 'Inter-Government', status: 'Active', isActive: true, count: 7 },
    { id: 'o-5', name: 'Academic | Institution', status: 'Active', isActive: true, count: 5 },
  ],
  Country: [
    { id: 'k-1', name: 'African countries', status: 'Active', isActive: true, price: '5000', count: 54 },
    { id: 'k-2', name: 'Non-African countries', status: 'Active', isActive: true, price: '12000', count: 32 },
  ],
};

/** Default shared category price, stored in the smallest unit. */
export const SEED_CATEGORY_PRICE: CategoryPrice = {
  africaOne: '5000',
  africaTwoOrMore: '8000',
  nonAfricaOne: '12000',
  nonAfricaTwoOrMore: '16000',
};
