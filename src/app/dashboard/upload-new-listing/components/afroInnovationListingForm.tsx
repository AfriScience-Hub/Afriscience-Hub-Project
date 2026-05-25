'use client';

import AfroInnovationForm from './afroInnovationListing/afroInnovationForm';
import type { ListingFormProps } from './listingTypes';

export default function AfroInnovationListingForm({ onChangeCategory }: ListingFormProps) {
  return <AfroInnovationForm onChangeCategory={onChangeCategory} />;
}
