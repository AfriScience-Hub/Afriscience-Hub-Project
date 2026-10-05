import { Building2, Beaker, Microscope, Lightbulb, Trophy, Award } from 'lucide-react';

export interface ServiceEntry {
  id: string;
  name: string;
  description: string;
  costRange: string;
}

export const LISTING_TYPES = [
  { id: 'institute', label: 'Institute', icon: Building2, description: 'University, school, or research institute' },
  { id: 'scientist', label: 'Scientist / Technologist', icon: Beaker, description: 'Individual scientist, researcher, or technologist' },
  { id: 'center', label: 'Specialist Center', icon: Microscope, description: 'Specialized research or innovation center' },
  { id: 'innovation', label: 'Afro-Innovation', icon: Lightbulb, description: 'African-born innovation or product' },
  { id: 'competition', label: 'Competition', icon: Trophy, description: 'Science competition or challenge' },
  { id: 'award', label: 'Award', icon: Award, description: 'Award or recognition program' },
] as const;

export type ListingType = typeof LISTING_TYPES[number]['id'];

export const AFRICAN_COUNTRIES = [
  'Algeria', 'Angola', 'Benin', 'Botswana', 'Burkina Faso', 'Burundi', 'Cabo Verde',
  'Cameroon', 'Central African Republic', 'Chad', 'Comoros', 'Congo', 'Côte d\'Ivoire',
  'DR Congo', 'Djibouti', 'Egypt', 'Equatorial Guinea', 'Eritrea', 'Eswatini', 'Ethiopia',
  'Gabon', 'Gambia', 'Ghana', 'Guinea', 'Guinea-Bissau', 'Kenya', 'Lesotho', 'Liberia',
  'Libya', 'Madagascar', 'Malawi', 'Mali', 'Mauritania', 'Mauritius', 'Morocco',
  'Mozambique', 'Namibia', 'Niger', 'Nigeria', 'Rwanda', 'São Tomé and Príncipe',
  'Senegal', 'Seychelles', 'Sierra Leone', 'Somalia', 'South Africa', 'South Sudan',
  'Sudan', 'Tanzania', 'Togo', 'Tunisia', 'Uganda', 'Zambia', 'Zimbabwe'
];

export const COST_RANGES = [
  '₦10 – ₦50', '₦50 – ₦100', '₦100 – ₦150', '₦150 – ₦200',
  '₦200 – ₦500', '₦500 – ₦1,000', '₦1,000+'
];

export const INSTITUTE_CLASSES = ['University', 'School', 'Polytechnic', 'College of Education', 'Research Institute'];
export const INSTITUTE_OWNERSHIP = ['Private', 'Government | Public', 'Open', 'Inter-Government', 'NGO | Charity'];
export const INSTITUTE_GENDER = ['Mixed', 'Male Only', 'Female Only'];

export const SCIENTIST_FIELDS = ['Biotechnology', 'Data Science', 'Environmental Science', 'Engineering', 'Medicine', 'Agriculture', 'Physics', 'Chemistry', 'Computer Science', 'Mathematics'];
export const SCIENTIST_PROFESSIONS = ['Researcher', 'Lecturer', 'Engineer', 'Doctor', 'Consultant', 'Professor', 'Lab Technician', 'Data Analyst'];

export const INNOVATION_CATEGORIES = ['AgriTech', 'HealthTech', 'EdTech', 'FinTech', 'CleanTech', 'BioTech', 'GreenTech', 'Other'];
export const COMPETITION_TYPES = ['Afri–Anime', 'Afri–Presentations', 'Afri–Memes', 'Afri–MySpace'];
export const AWARD_TYPES = ["Developer's Award", "Sponsorship Award", "Competition's Award", "Donation's Award"];

export const GALLERY_CATEGORIES = ['Workspaces', 'Projects', 'Facilities', 'Events', 'Other Media'];

export const CURRENCIES = [
  'USD', 'EUR', 'GBP', 'NGN', 'GHS', 'KES', 'TZS', 'UGX', 'ZAR',
  'EGP', 'RWF', 'XOF', 'XAF', 'MAD', 'ZMW', 'BWP'
];

export const YEARS = Array.from({ length: 30 }, (_, i) => String(2026 - i));
