'use client';

export const SCHOOL_CLASSES = [
  'Primary',
  'Secondary',
  'Primary & Secondary',
] as const;

export const SCHOOL_PROGRAMS = [
  'Day School',
  'Boarding School',
  'Day & Boarding School',
] as const;

export const SCHOOL_GENDERS = [
  'Male',
  'Female',
  'Mixed (Male & Female)',
] as const;

export const SCHOOL_OWNERSHIP = [
  'Private',
  'Government | Public',
  'Academic',
  'Mission',
  'Corporate',
  'Inter - Government',
  'NGO | Charity',
  'Other',
] as const;

export const SCHOOL_SERVICES = [
  'Teaching & Learning',
  'Disabilities Support',
  'School Bus',
  'Excursions',
  'Competitions & Olympiads',
  'Sports & Physical Exercise',
  'STEM & STEAM',
  'Clinic & Health Programs',
  'Scholarships',
  'Technical Skills Development',
  'Clubs (Science & Welfare)',
  'Extra Lessons',
  'Counselling (Academic & Personal)',
  'PTA Meetings',
  'Cafeteria',
  'Boarding Accommodation',
  'Science Laboratory',
  'Career Exposures',
  'Seminars & Conferences',
  'Science Fairs & Exhibitions',
] as const;

export const GALLERY_ALBUMS = [
  'Front View',
  'Compound/Premise',
  'Classrooms',
  'Playground',
  'Auditorium/Halls',
  'Convenience',
  'Laboratories',
  'Libraries',
  'Offices',
  'Lobby',
  'School Uniforms',
  'Others',
] as const;

export const MAX_FILES_PER_ALBUM = 10;

export const WORK_DAYS = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
] as const;

export const SOCIAL_PLATFORMS = ['LinkedIn', 'Twitter', 'Instagram', 'Facebook'] as const;

// All world currencies for tuition fee selection
export const ALL_CURRENCIES = [
  'USD', 'EUR', 'GBP', 'NGN', 'GHS', 'KES', 'TZS', 'UGX', 'ZAR',
  'EGP', 'RWF', 'XOF', 'XAF', 'MAD', 'ZMW', 'BWP',
  'AED', 'AFN', 'ALL', 'AMD', 'ANG', 'AOA', 'ARS', 'AUD', 'AWG', 'AZN',
  'BAM', 'BBD', 'BDT', 'BGN', 'BHD', 'BIF', 'BMD', 'BND', 'BOB', 'BRL',
  'BSD', 'BTN', 'BYN', 'BZD', 'CAD', 'CDF', 'CHF', 'CLP', 'CNY', 'COP',
  'CRC', 'CUP', 'CVE', 'CZK', 'DJF', 'DKK', 'DOP', 'DZD', 'ERN', 'ETB',
  'FJD', 'FKP', 'FOK', 'GEL', 'GGP', 'GIP', 'GMD', 'GNF', 'GTQ', 'GYD',
  'HKD', 'HNL', 'HRK', 'HTG', 'HUF', 'IDR', 'ILS', 'IMP', 'INR', 'IQD',
  'IRR', 'ISK', 'JEP', 'JMD', 'JOD', 'JPY', 'KGS', 'KHR', 'KID', 'KMF',
  'KRW', 'KWD', 'KYD', 'KZT', 'LAK', 'LBP', 'LKR', 'LRD', 'LSL', 'LYD',
  'MDL', 'MGA', 'MKD', 'MMK', 'MNT', 'MOP', 'MRU', 'MUR', 'MVR', 'MWK',
  'MXN', 'MYR', 'MZN', 'NAD', 'NIO', 'NOK', 'NPR', 'NZD', 'OMR', 'PAB',
  'PEN', 'PGK', 'PHP', 'PKR', 'PLN', 'PYG', 'QAR', 'RON', 'RSD', 'RUB',
  'SAR', 'SBD', 'SCR', 'SDG', 'SEK', 'SGD', 'SHP', 'SLE', 'SOS', 'SRD',
  'SSP', 'STN', 'SYP', 'SZL', 'THB', 'TJS', 'TMT', 'TND', 'TOP', 'TRY',
  'TTD', 'TVD', 'TWD', 'UAH', 'UYU', 'UZS', 'VES', 'VND', 'VUV', 'WST',
  'XCD', 'XDR', 'XPF', 'YER', 'ZWL'
];

export { CURRENCIES, YEARS } from '../../data';
export { WORLD_COUNTRIES } from '@/app/data/mockData';
export { STATES } from '@/app/specialist-centers/data';