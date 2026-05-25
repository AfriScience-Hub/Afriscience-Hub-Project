import {
  Award,
  Building2,
  Lightbulb,
  Microscope,
  Trophy,
  User,
} from 'lucide-react';

export type ListingType =
  | 'institute'
  | 'scientist'
  | 'center'
  | 'innovation'
  | 'competition'
  | 'award';

export const categories: Array<{
  id: ListingType;
  title: string;
  description: string;
  icon: typeof Building2;
}> = [
  {
    id: 'institute',
    title: 'Institute',
    description: 'University, school, or research institute',
    icon: Building2,
  },
  {
    id: 'scientist',
    title: 'Scientist / Technologist',
    description: 'Individual scientist, researcher, or technologist',
    icon: User,
  },
  {
    id: 'center',
    title: 'Specialist Center',
    description: 'Specialized research or innovation center',
    icon: Microscope,
  },
  {
    id: 'innovation',
    title: 'Afro-Innovation',
    description: 'African-born innovation or product',
    icon: Lightbulb,
  },
  {
    id: 'competition',
    title: 'Competition',
    description: 'Science competition or challenge',
    icon: Trophy,
  },
  {
    id: 'award',
    title: 'Award',
    description: 'Award or recognition program',
    icon: Award,
  },
];

export const titleMap: Record<ListingType, string> = {
  institute: 'New Institute Listing',
  scientist: 'New Scientist / Technologist Listing',
  center: 'New Specialist Center Listing',
  innovation: 'New Afro-Innovation Listing',
  competition: 'New Competition Listing',
  award: 'New Award Listing',
};

export const nameLabel: Record<ListingType, string> = {
  institute: 'Institute Name',
  scientist: 'Full Name',
  center: 'Center Name',
  innovation: 'Innovation Name',
  competition: 'Competition Name',
  award: 'Award Name',
};

export interface ListingFormProps {
  onChangeCategory: () => void;
}
