'use client';

import { ListingFormScaffold } from './listingFormScaffold';
import type { ListingFormProps } from './listingTypes';

export default function CenterListingForm({ onChangeCategory }: ListingFormProps) {
  return <ListingFormScaffold type="center" onChangeCategory={onChangeCategory} />;
}
