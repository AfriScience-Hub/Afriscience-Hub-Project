export type OptionStatus = 'Active' | 'Inactive';

export interface ManagedOption {
  id: string;
  name: string;
  status: OptionStatus;
  /** Raw active flag, sent back on edit so it is preserved. */
  isActive?: boolean;
  /** Parent field name for field-scoped tabs (Profession). */
  field?: string;
  /** Parent field id, used by professions when saving back to the API. */
  fieldId?: string;
  count: number;
  /** Info tooltip shown beside the option. Professions only. */
  note?: string;
}

export type ManageTab = 'Fields' | 'Profession' | 'Degree' | 'Services' | 'Price' | 'Country';

export const MANAGE_TABS: { id: ManageTab; label: string }[] = [
  { id: 'Fields', label: 'Fields' },
  { id: 'Profession', label: 'Profession' },
  { id: 'Degree', label: 'Degree' },
  { id: 'Services', label: 'Services' },
  { id: 'Price', label: 'Price' },
  { id: 'Country', label: 'Country' },
];

export const TAB_SINGULAR: Record<ManageTab, string> = {
  Fields: 'Field',
  Profession: 'Profession',
  Degree: 'Degree',
  Services: 'Service',
  Price: 'Price',
  Country: 'Country',
};

export const TAB_DESCRIPTIONS: Record<ManageTab, string> = {
  Fields: 'Fields describe the scientific or technical discipline a listing belongs to.',
  Profession: 'Professions list the specific roles or titles a scientist or technologist holds under each scientific field.',
  Degree: 'Degrees set the academic qualification levels a scientist can declare.',
  Services: 'Services are shared across every field and are not tied to a specific scientific discipline.',
  Price: 'Configure the shared listing prices for African and non-African scientists based on the number of professions they select.',
  Country: 'Countries available for scientist and technologist listings.',
};

/** Only Professions carry the info icon, so only they get a note field. */
export const TABS_WITHOUT_NOTE: ManageTab[] = ['Fields', 'Degree', 'Services', 'Price', 'Country'];


