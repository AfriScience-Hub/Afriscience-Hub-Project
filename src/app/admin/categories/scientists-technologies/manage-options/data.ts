export type OptionStatus = 'Active' | 'Inactive';

export interface ManagedOption {
  id: string;
  name: string;
  status: OptionStatus;
  /** Raw active flag, sent back on edit so it is preserved. */
  isActive?: boolean;
  /** Parent field for field-scoped tabs (Profession and Services). */
  field?: string;
  /** Per-row listing price, only used by the Country tab. */
  price?: string;
  count: number;
  /** Info tooltip shown beside the option. Professions only. */
  note?: string;
}

export type ManageTab = 'Fields' | 'Profession' | 'Degree' | 'Services' | 'Country';

/**
 * The canonical field list. Professions and Services are grouped under these
 * headings, so this must stay in sync with the Fields tab.
 */
export const SCIENTIST_FIELD_LIST = [
  'Hybrid',
  'Medical',
  'Engineering',
  'Pharmaceutical',
  'Computer & ICT',
  'Veterinary',
  'Agriculture',
  'Food & Nutrition',
  'Mathematics & Statistics',
  'Physics',
  'Chemistry',
  'Biology',
  'Environmental',
  'Industrial & Manufacturing',
  'Energy & Power',
  'Waste & Recycling',
  'Astronomy & Space',
];

export const MANAGE_TABS: { id: ManageTab; label: string }[] = [
  { id: 'Fields', label: 'Fields' },
  { id: 'Profession', label: 'Profession' },
  { id: 'Degree', label: 'Degree' },
  { id: 'Services', label: 'Services' },
  { id: 'Country', label: 'Country' },
];

export const TAB_SINGULAR: Record<ManageTab, string> = {
  Fields: 'Field',
  Profession: 'Profession',
  Degree: 'Degree',
  Services: 'Service',
  Country: 'Country',
};

export const TAB_DESCRIPTIONS: Record<ManageTab, string> = {
  Fields: 'Fields describe the scientific or technical discipline a listing belongs to.',
  Profession: 'Professions list the roles a scientist can hold. Every profession shares one price per country group, and carries an info note.',
  Degree: 'Degrees set the academic qualification levels a scientist can declare.',
  Services: 'Services are the individual offerings a scientist provides to clients.',
  Country: 'Countries set the listing price for African and non-African scientists.',
};

/** Only Professions carry the info icon, so only they get a note field. */
export const TABS_WITHOUT_NOTE: ManageTab[] = ['Fields', 'Degree', 'Services', 'Country'];

/** Tabs whose table renders a Price column. */
export const TABS_TABLE_PRICE: ManageTab[] = ['Profession', 'Country'];

/** Tabs whose Add / Edit dialog accepts a price (Country prices are per-row). */
export const TABS_DIALOG_PRICE: ManageTab[] = ['Country'];

/** Tabs that expose the "Create price" button beside "Add X". */
export const TABS_WITH_CREATE_PRICE: ManageTab[] = ['Profession'];

/** Starter rows so every tab opens with realistic content. */
export const SEED_OPTIONS: Record<ManageTab, ManagedOption[]> = {
  Fields: [
    { id: 'f-1', name: 'Medical', status: 'Active', isActive: true, count: 24 },
    { id: 'f-2', name: 'Engineering', status: 'Active', isActive: true, count: 19 },
    { id: 'f-3', name: 'Computer & ICT', status: 'Active', isActive: true, count: 16 },
    { id: 'f-4', name: 'Agriculture', status: 'Active', isActive: true, count: 13 },
    { id: 'f-5', name: 'Pharmaceutical', status: 'Active', isActive: true, count: 11 },
    { id: 'f-6', name: 'Environmental', status: 'Inactive', isActive: false, count: 9 },
  ],
  Profession: [
    { id: 'p-1', field: 'Medical', name: 'Medical Doctor', status: 'Active', isActive: true, count: 22, note: 'Licensed clinical physician.' },
    { id: 'p-2', field: 'Medical', name: 'Clinical Researcher', status: 'Active', isActive: true, count: 14, note: 'Runs and supervises clinical trials.' },
    { id: 'p-3', field: 'Engineering', name: 'Civil Engineer', status: 'Active', isActive: true, count: 17, note: '' },
    { id: 'p-4', field: 'Engineering', name: 'Renewable Energy Engineer', status: 'Active', isActive: true, count: 10, note: '' },
    { id: 'p-5', field: 'Computer & ICT', name: 'Data Scientist', status: 'Active', isActive: true, count: 12, note: '' },
    { id: 'p-6', field: 'Agriculture', name: 'Soil Scientist', status: 'Inactive', isActive: false, count: 7, note: '' },
  ],
  Degree: [
    { id: 'd-1', name: 'Field Expert | No Degree', status: 'Active', isActive: true, count: 18 },
    { id: 'd-2', name: 'Associate', status: 'Active', isActive: true, count: 9 },
    { id: 'd-3', name: 'Bachelors', status: 'Active', isActive: true, count: 31 },
    { id: 'd-4', name: 'Diplomas', status: 'Active', isActive: true, count: 14 },
    { id: 'd-5', name: 'Masters', status: 'Active', isActive: true, count: 27 },
    { id: 'd-6', name: 'Doctoral', status: 'Active', isActive: true, count: 13 },
    { id: 'd-7', name: 'Others', status: 'Inactive', isActive: false, count: 4 },
  ],
  Services: [
    { id: 's-1', field: 'Medical', name: 'Consultancy', status: 'Active', isActive: true, count: 34 },
    { id: 's-2', field: 'Medical', name: 'Lab Analysis & Equipment Expert', status: 'Active', isActive: true, count: 21 },
    { id: 's-3', field: 'Engineering', name: 'Project Management', status: 'Active', isActive: true, count: 26 },
    { id: 's-4', field: 'Engineering', name: 'Fabrication & Installation', status: 'Active', isActive: true, count: 15 },
    { id: 's-5', field: 'Computer & ICT', name: 'Modeling & Simulation', status: 'Active', isActive: true, count: 11 },
    { id: 's-6', field: 'Agriculture', name: 'Fieldwork', status: 'Inactive', isActive: false, count: 8 },
  ],
  Country: [
    { id: 'k-1', name: 'African countries', status: 'Active', isActive: true, price: '6000', count: 84 },
    { id: 'k-2', name: 'Non-African countries', status: 'Active', isActive: true, price: '15000', count: 28 },
  ],
};
