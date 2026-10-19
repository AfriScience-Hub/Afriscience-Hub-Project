export type OptionStatus = 'Active' | 'Inactive';

export interface ManagedOption {
  id: string;
  name: string;
  status: OptionStatus;
  /** Raw active flag from the API, sent back on edit so it is preserved. */
  isActive?: boolean;
  count: number;
  note?: string;
}

export type ManageTab = 'Fields' | 'Interests' | 'Stages' | 'Ownership' | 'SDGs' | 'Price';

export const MANAGE_TABS: { id: ManageTab; label: string; type: string }[] = [
  { id: 'Fields', label: 'Fields', type: 'FIELD' },
  { id: 'Interests', label: 'Interests', type: 'INTEREST' },
  { id: 'Stages', label: 'Stages', type: 'STAGE' },
  { id: 'Ownership', label: 'Ownership', type: 'OWNERSHIP' },
  { id: 'SDGs', label: 'SDGs', type: 'SDG' },
  { id: 'Price', label: 'Price', type: '' },
];

/** Singular form of each tab label for "Add X" / "Edit X" button text. */
export const TAB_SINGULAR: Record<ManageTab, string> = {
  Fields: 'Field',
  Interests: 'Interest',
  Stages: 'Stage',
  Ownership: 'Ownership',
  SDGs: 'SDG',
  Price: 'Price',
};

export const TAB_DESCRIPTIONS: Record<ManageTab, string> = {
  Fields: 'Fields describe the main area or sector of the innovation.',
  Interests: 'Interests help match innovations to thematic priorities.',
  Stages: 'Stages track how far the innovation has matured.',
  Ownership: 'Ownership indicates who owns or leads the innovation.',
  SDGs: 'SDGs link innovations to sustainable development goals.',
  Price: 'Set the price for innovation listings.',
};

/** Tabs that do NOT have a note field in the create/edit form. */
export const TABS_WITHOUT_NOTE: ManageTab[] = ['Fields', 'Ownership', 'SDGs'];

export function tabTypeFor(tabId: ManageTab): string {
  const tab = MANAGE_TABS.find((t) => t.id === tabId);
  return tab?.type ?? '';
}
