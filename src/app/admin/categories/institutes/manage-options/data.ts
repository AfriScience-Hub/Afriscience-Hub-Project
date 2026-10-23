export type OptionStatus = 'Active' | 'Inactive';

export type ManageTab = 'Class' | 'Program' | 'Gender' | 'Ownership' | 'Services' | 'Country' | 'Faculties' | 'Program Levels';

/** The two top-level institute groups, each with their own option tabs. */
export type InstituteGroup = 'primary-secondary' | 'university';

export interface ManagedOption {
  id: string;
  name: string;
  status: OptionStatus;
  /** Raw active flag, sent back on edit so it is preserved. */
  isActive?: boolean;
  /** Parent ownership for field-scoped tabs (Services only). */
  field?: string;
  /** Per-row listing price, only used by the Country tab. */
  price?: string;
  count: number;
  /** Info tooltip shown beside the option. Ownership only. */
  note?: string;
}

/**
 * The canonical ownership list. Services are grouped under these headings, so
 * this must stay in sync with the Ownership tab for each group.
 */
export const SCHOOL_OWNERSHIP_LIST = [
  'Private',
  'Government | Public',
  'Mission',
  'International',
  'Inter-Government',
  'NGO | Charity',
];

export const UNIVERSITY_OWNERSHIP_LIST = [
  'Government | Public',
  'Private',
  'Inter-Government',
  'NGO | Charity',
];

/** Inner tabs per institute group. */
export const TABS_BY_GROUP: Record<InstituteGroup, ManageTab[]> = {
  'primary-secondary': ['Class', 'Program', 'Gender', 'Ownership', 'Services', 'Country'],
  university: ['Ownership', 'Gender', 'Faculties', 'Program Levels', 'Services', 'Country'],
};

export const TAB_SINGULAR: Record<ManageTab, string> = {
  Class: 'Class',
  Program: 'Program',
  Gender: 'Gender',
  Ownership: 'Ownership',
  Services: 'Service',
  Country: 'Country',
  Faculties: 'Faculty',
  'Program Levels': 'Program Level',
};

export const TAB_DESCRIPTIONS: Record<ManageTab, string> = {
  Class: 'Classes describe the school level an institute covers (primary, secondary or both).',
  Program: 'Programs describe how a school day is structured (day, boarding or both).',
  Gender: 'Gender states whether the institute is for girls, boys or mixed.',
  Ownership: 'Ownership lists the governing type of an institute. Every ownership shares one price per country group, and carries an info note.',
  Services: 'Services are the individual offerings an institute provides to students and the community.',
  Country: 'Countries set the listing price for African and non-African institutes.',
  Faculties: 'Faculties group the broad academic divisions a university offers.',
  'Program Levels': 'Program levels describe the study pathways a university runs (undergraduate, postgraduate, etc).',
};

/** Only Ownership carries the info icon, so only it gets a note field. */
export const TABS_WITHOUT_NOTE: ManageTab[] = ['Class', 'Program', 'Gender', 'Services', 'Country', 'Faculties', 'Program Levels'];

/** Tabs whose table renders a Price column. */
export const TABS_TABLE_PRICE: ManageTab[] = ['Ownership', 'Country'];

/** Tabs whose Add / Edit dialog accepts a price (Country prices are per-row). */
export const TABS_DIALOG_PRICE: ManageTab[] = ['Country'];

/** Tabs that expose the "Create price" button beside "Add X". */
export const TABS_WITH_CREATE_PRICE: ManageTab[] = ['Ownership'];

/** Tabs whose options are grouped under collapsible Ownership sections. */
export const FIELD_SCOPED: ManageTab[] = ['Services'];

/** Ownership list per group, used for the Services grouping and the dialog. */
export const OWNERSHIP_BY_GROUP: Record<InstituteGroup, string[]> = {
  'primary-secondary': SCHOOL_OWNERSHIP_LIST,
  university: UNIVERSITY_OWNERSHIP_LIST,
};

/* ------------------------------------------------------------------ seeds */

const schoolCountry = [
  { id: 'sc-1', name: 'African countries', status: 'Active' as OptionStatus, isActive: true, price: '4000', count: 48 },
  { id: 'sc-2', name: 'Non-African countries', status: 'Active' as OptionStatus, isActive: true, price: '10000', count: 16 },
];

const schoolSeeds: Record<ManageTab, ManagedOption[]> = {
  Class: [
    { id: 'cl-1', name: 'Primary', status: 'Active', isActive: true, count: 26 },
    { id: 'cl-2', name: 'Secondary', status: 'Active', isActive: true, count: 30 },
    { id: 'cl-3', name: 'Primary & Secondary', status: 'Active', isActive: true, count: 8 },
  ],
  Program: [
    { id: 'pg-1', name: 'Day school', status: 'Active', isActive: true, count: 34 },
    { id: 'pg-2', name: 'Boarding', status: 'Active', isActive: true, count: 14 },
    { id: 'pg-3', name: 'Day & Boarding', status: 'Active', isActive: true, count: 16 },
  ],
  Gender: [
    { id: 'gd-1', name: 'Female', status: 'Active', isActive: true, count: 12 },
    { id: 'gd-2', name: 'Male', status: 'Active', isActive: true, count: 14 },
    { id: 'gd-3', name: 'Mixed', status: 'Active', isActive: true, count: 38 },
  ],
  Ownership: [
    { id: 'ow-1', field: 'Private', name: 'Private', status: 'Active', isActive: true, count: 24, note: 'Privately owned and funded institution.' },
    { id: 'ow-2', field: 'Government | Public', name: 'Government | Public', status: 'Active', isActive: true, count: 16, note: 'State or federally funded institution.' },
    { id: 'ow-3', field: 'Mission', name: 'Mission', status: 'Active', isActive: true, count: 9, note: 'Religious organisation founded and run.' },
    { id: 'ow-4', field: 'International', name: 'International', status: 'Active', isActive: true, count: 7, note: '' },
    { id: 'ow-5', field: 'Inter-Government', name: 'Inter-Government', status: 'Inactive', isActive: false, count: 4, note: '' },
    { id: 'ow-6', field: 'NGO | Charity', name: 'NGO | Charity', status: 'Active', isActive: true, count: 4, note: '' },
  ],
  Services: [
    { id: 'ss-1', field: 'Private', name: 'Teaching & Learning', status: 'Active', isActive: true, count: 24 },
    { id: 'ss-2', field: 'Private', name: 'School Bus', status: 'Active', isActive: true, count: 18 },
    { id: 'ss-3', field: 'Government | Public', name: 'Teaching & Learning', status: 'Active', isActive: true, count: 16 },
    { id: 'ss-4', field: 'Government | Public', name: 'Clinic & Health Programs', status: 'Active', isActive: true, count: 11 },
    { id: 'ss-5', field: 'Mission', name: 'Scholarships', status: 'Active', isActive: true, count: 8 },
    { id: 'ss-6', field: 'International', name: 'STEM & STEAM', status: 'Inactive', isActive: false, count: 6 },
  ],
  Country: schoolCountry,
  // University-only tabs, unused for schools.
  Faculties: [],
  'Program Levels': [],
};

const universitySeeds: Record<ManageTab, ManagedOption[]> = {
  // School-only tabs, unused for universities.
  Class: [],
  Program: [],
  Ownership: [
    { id: 'uo-1', field: 'Government | Public', name: 'Government | Public', status: 'Active', isActive: true, count: 26, note: 'State or federally funded university.' },
    { id: 'uo-2', field: 'Private', name: 'Private', status: 'Active', isActive: true, count: 14, note: 'Privately funded university.' },
    { id: 'uo-3', field: 'Inter-Government', name: 'Inter-Government', status: 'Active', isActive: true, count: 5, note: '' },
    { id: 'uo-4', field: 'NGO | Charity', name: 'NGO | Charity', status: 'Inactive', isActive: false, count: 3, note: '' },
  ],
  Gender: [
    { id: 'ug-1', name: 'Mixed', status: 'Active', isActive: true, count: 42 },
    { id: 'ug-2', name: 'Male', status: 'Active', isActive: true, count: 3 },
    { id: 'ug-3', name: 'Female', status: 'Active', isActive: true, count: 3 },
  ],
  Faculties: [
    { id: 'fc-1', name: 'Faculty of Science', status: 'Active', isActive: true, count: 44 },
    { id: 'fc-2', name: 'Faculty of Engineering', status: 'Active', isActive: true, count: 38 },
    { id: 'fc-3', name: 'Faculty of Health Sciences', status: 'Active', isActive: true, count: 32 },
    { id: 'fc-4', name: 'Faculty of Agriculture', status: 'Active', isActive: true, count: 24 },
    { id: 'fc-5', name: 'Faculty of Social Sciences', status: 'Active', isActive: true, count: 28 },
    { id: 'fc-6', name: 'Faculty of Education', status: 'Inactive', isActive: false, count: 18 },
  ],
  'Program Levels': [
    { id: 'pl-1', name: 'Pre-Degree (Basic Studies)', status: 'Active', isActive: true, count: 12 },
    { id: 'pl-2', name: 'Post-UTME', status: 'Active', isActive: true, count: 30 },
    { id: 'pl-3', name: 'Undergraduate', status: 'Active', isActive: true, count: 48 },
    { id: 'pl-4', name: 'Postgraduate', status: 'Active', isActive: true, count: 44 },
    { id: 'pl-5', name: 'Sandwich / Part-Time', status: 'Inactive', isActive: false, count: 16 },
  ],
  Services: [
    { id: 'us-1', field: 'Government | Public', name: 'Teaching & Learning', status: 'Active', isActive: true, count: 26 },
    { id: 'us-2', field: 'Government | Public', name: 'Research & Development', status: 'Active', isActive: true, count: 24 },
    { id: 'us-3', field: 'Private', name: 'Teaching & Learning', status: 'Active', isActive: true, count: 14 },
    { id: 'us-4', field: 'Private', name: 'Innovation Hub', status: 'Active', isActive: true, count: 10 },
    { id: 'us-5', field: 'Inter-Government', name: 'Conferences', status: 'Active', isActive: true, count: 5 },
    { id: 'us-6', field: 'NGO | Charity', name: 'Scholarships', status: 'Inactive', isActive: false, count: 3 },
  ],
  Country: schoolCountry,
};

export const SEED_OPTIONS: Record<InstituteGroup, Record<ManageTab, ManagedOption[]>> = {
  'primary-secondary': schoolSeeds,
  university: universitySeeds,
};

/** Default shared ownership price per group, stored in the smallest unit. */
export const SEED_OWNERSHIP_PRICE: Record<InstituteGroup, { africaOne: string; africaTwoOrMore: string; nonAfricaOne: string; nonAfricaTwoOrMore: string }> = {
  'primary-secondary': { africaOne: '4000', africaTwoOrMore: '7000', nonAfricaOne: '10000', nonAfricaTwoOrMore: '16000' },
  university: { africaOne: '20000', africaTwoOrMore: '34000', nonAfricaOne: '50000', nonAfricaTwoOrMore: '80000' },
};
