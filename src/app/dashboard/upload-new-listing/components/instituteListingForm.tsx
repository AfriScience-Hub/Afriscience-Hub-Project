'use client';

import { ListingFormScaffold } from './listingFormScaffold';
import type { ListingFormProps } from './listingTypes';

export default function InstituteListingForm({ onChangeCategory }: ListingFormProps) {
  return <ListingFormScaffold type="institute" onChangeCategory={onChangeCategory} />;
}
