'use client';

import { ListingFormScaffold } from './listingFormScaffold';
import type { ListingFormProps } from './listingTypes';

export default function CompetitionListingForm({ onChangeCategory }: ListingFormProps) {
  return <ListingFormScaffold type="competition" onChangeCategory={onChangeCategory} />;
}
