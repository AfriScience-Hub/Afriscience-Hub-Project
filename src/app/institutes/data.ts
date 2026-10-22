/**
 * Shared constants for the institutes (Primary & Secondary) directory and the
 * institute detail page. Kept here rather than in mockData.ts so the school
 * specific vocabularies stay with the school UI that consumes them.
 */

/** Program a school runs on. */
export const SCHOOL_PROGRAMS = ['Day school', 'Boarding', 'Day & Boarding'] as const;

export const SCHOOL_CLASSES = ['Primary', 'Secondary', 'Primary & Secondary'] as const;

export const SCHOOL_OWNERSHIPS = [
  'Private', 'Government | Public', 'Mission', 'International', 'Inter-Government', 'NGO | Charity',
] as const;

export const SCHOOL_GENDERS = ['Female', 'Male', 'Mixed'] as const;

export const STATUSES = ['Online', 'Offline'] as const;

/**
 * The canonical school services list. "Teaching & Learning" is the first entry
 * because it is pre-selected by default in the filter.
 */
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

/** Pre-selected service when the filters are reset. */
export const DEFAULT_SCHOOL_SERVICES: string[] = ['Teaching & Learning'];

/** Short description shown next to each service in the Overview tab. */
export const SERVICE_DESCRIPTIONS: Record<string, string> = {
  'Teaching & Learning': 'Core classroom instruction delivered by the school\'s certified teaching staff.',
  'Disabilities Support': 'Learning support units, accessible facilities and trained special needs educators.',
  'School Bus': 'Supervised door-to-door transport along published routes with safety-trained drivers.',
  'Excursions': 'Curriculum-linked educational trips to museums, parks, industries and field sites.',
  'Competitions & Olympiads': 'Entry and coaching for interschool contests, quizzes and subject olympiads.',
  'Sports & Physical Exercise': 'Fixed timetabled games, team sports and fitness sessions for every learner.',
  'STEM & STEAM': 'Robotics, coding, engineering and arts-integrated applied science programmes.',
  'Clinic & Health Programs': 'On-site nurse, routine screening, immunization drives and health education.',
  'Scholarships': 'Merit and needs-based awards, bursaries and external scholarship placements.',
  'Technical Skills Development': 'Practical workshop training in trades such as welding, coding and electronics.',
  'Clubs (Science & Welfare)': 'Science, debate, cultural and community-service clubs running each term.',
  'Extra Lessons': 'Optional supplementary lessons scheduled before school or after hours.',
  'Counselling (Academic & Personal)': 'Guidance counsellors supporting career choices, wellbeing and study skills.',
  'PTA Meetings': 'Scheduled parent-teacher association meetings each term to review school progress.',
  'Cafeteria': 'Catered meals and snacks prepared under the school\'s nutrition guidelines.',
  'Boarding Accommodation': 'Residential houses with live-in matrons, prep supervision and meals.',
  'Science Laboratory': 'Equipped biology, chemistry and physics labs for practical coursework.',
  'Career Exposures': 'Guest professionals, workplace visits and shadowing days to guide career choices.',
  'Seminars & Conferences': 'Talks, workshops and student conferences hosted on or off campus.',
  'Science Fairs & Exhibitions': 'Annual exhibitions where students present projects to judges and the public.',
};

/** Media albums, in display order. Each holds up to 10 files. */
export const GALLERY_ALBUMS: { key: string; label: string }[] = [
  { key: 'frontGate', label: 'Front View' },
  { key: 'compound', label: 'Compound/Premise' },
  { key: 'classrooms', label: 'Classrooms' },
  { key: 'playground', label: 'Playground' },
  { key: 'auditorium', label: 'Auditorium/Halls' },
  { key: 'convenience', label: 'Convenience' },
  { key: 'laboratories', label: 'Laboratories' },
  { key: 'libraries', label: 'Libraries' },
  { key: 'offices', label: 'Offices' },
  { key: 'lobby', label: 'Lobby' },
  { key: 'uniforms', label: 'School Uniforms' },
  { key: 'others', label: 'Others' },
];

/** Max files an album may hold. */
export const GALLERY_ALBUM_LIMIT = 10;

/** Downloadable resource albums, in catalog order. */
export const DOWNLOAD_ALBUMS: { key: string; label: string }[] = [
  { key: 'brochure', label: 'School Brochure & Prospectus' },
  { key: 'curriculum', label: 'Subject Curriculum' },
  { key: 'timetable', label: 'School Timetable' },
  { key: 'feeStructure', label: 'Fee Structure' },
  { key: 'policies', label: 'School Policies' },
  { key: 'admissionForm', label: 'Admission Form' },
  { key: 'others', label: 'Others' },
];

/**
 * Every country in the world, alphabetically. Used by the Country filter,
 * which is no longer limited to Africa.
 */
export const WORLD_COUNTRIES: string[] = [
  'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda', 'Argentina', 'Armenia',
  'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium',
  'Belize', 'Benin', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei', 'Bulgaria',
  'Burkina Faso', 'Burundi', 'Cabo Verde', 'Cambodia', 'Cameroon', 'Canada', 'Central African Republic',
  'Chad', 'Chile', 'China', 'Colombia', 'Comoros', 'Congo (DRC)', 'Congo (Republic)', 'Costa Rica',
  'Côte d\'Ivoire', 'Croatia', 'Cuba', 'Cyprus', 'Czechia', 'Denmark', 'Djibouti', 'Dominica',
  'Dominican Republic', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia',
  'Eswatini', 'Ethiopia', 'Fiji', 'Finland', 'France', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana',
  'Greece', 'Grenada', 'Guatemala', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Honduras', 'Hungary',
  'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy', 'Jamaica', 'Japan',
  'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon',
  'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Madagascar', 'Malawi',
  'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Mauritania', 'Mauritius', 'Mexico',
  'Micronesia', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Morocco', 'Mozambique', 'Myanmar',
  'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'North Korea',
  'North Macedonia', 'Norway', 'Oman', 'Pakistan', 'Palau', 'Palestine', 'Panama', 'Papua New Guinea',
  'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Qatar', 'Romania', 'Russia', 'Rwanda',
  'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines', 'Samoa', 'San Marino',
  'São Tomé and Príncipe', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore',
  'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Korea', 'South Sudan',
  'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Sweden', 'Switzerland', 'Syria', 'Tajikistan', 'Tanzania',
  'Thailand', 'Timor-Leste', 'Togo', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan',
  'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay',
  'Uzbekistan', 'Vanuatu', 'Vatican City', 'Venezuela', 'Vietnam', 'Yemen', 'Zambia', 'Zimbabwe',
];
