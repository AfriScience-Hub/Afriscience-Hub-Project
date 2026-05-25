'use client';

import { ListingFormScaffold } from './listingFormScaffold';
import type { ListingFormProps } from './listingTypes';

export default function ScientistListingForm({ onChangeCategory }: ListingFormProps) {
  return <ListingFormScaffold type="scientist" onChangeCategory={onChangeCategory} />;
}
