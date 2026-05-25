'use client';

import { ListingFormScaffold } from './listingFormScaffold';
import type { ListingFormProps } from './listingTypes';

export default function AwardListingForm({ onChangeCategory }: ListingFormProps) {
  return <ListingFormScaffold type="award" onChangeCategory={onChangeCategory} />;
}
