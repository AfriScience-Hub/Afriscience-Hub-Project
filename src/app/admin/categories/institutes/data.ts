export type InstituteSubType = 'primary-secondary' | 'university';
export type SubmissionStatus = 'Pending Review' | 'Approved' | 'Rejected' | 'Published';
export type ListingStatus = 'Published' | 'Pending Review' | 'Unpublished';
export type Verification = 'Verified' | 'Pending' | 'Unverified';

export const SUBTYPE_LABEL: Record<InstituteSubType, string> = {
  'primary-secondary': 'Primary & Secondary',
  university: 'University',
};

/** Both institute sub-types, in the order they appear in the tabs. */
export const INSTITUTE_SUBTYPES: InstituteSubType[] = ['primary-secondary', 'university'];

/* ------------------------------------------------------------------ school */

export interface SchoolTuitionFee {
  level: string;
  fee: string;
  currency: string;
}

export interface SchoolOtherFee {
  name: string;
  cost: string;
  currency: string;
}

export interface AcademicTerm {
  term: string;
  startDate: string;
  midtermBreakDate: string;
  closureDate: string;
}

export interface AdminSchool {
  id: string;
  name: string;
  motto: string;
  image: string;
  class: string;
  program: string;
  ownership: string;
  gender: string;
  services: string[];
  scopes: string[];
  status: string;
  country: string;
  state: string;
  city: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  description: string;
  socials: { LinkedIn: string; Twitter: string; Instagram: string; Facebook: string };
  tuitionFees: SchoolTuitionFee[];
  otherFees: SchoolOtherFee[];
  academicCalendar: AcademicTerm[];
  subjects: string[];
  admissionRequirements: { primary: string[]; secondary: string[] };
  workDays: string[];
  workHours: string[];
  activeStudents: string;
  submittedBy: string;
  submitterEmail: string;
  submittedOn: string;
  submittedTime: string;
  publishedBy?: string;
  workflowStatus: SubmissionStatus;
  listingStatus: ListingStatus;
  verification: Verification;
  views: number;
  reason?: string;
}

/* -------------------------------------------------------------- university */

export interface Faculty {
  name: string;
  departments: string[];
}

export interface ProgramLevel {
  id: string;
  name: string;
  description: string;
  duration: string;
  tuitionFee: string;
  hostelFee: string;
}

export interface AdminUniversity {
  id: string;
  name: string;
  motto: string;
  image: string;
  ownership: string;
  gender: string;
  services: string[];
  scopes: string[];
  status: string;
  country: string;
  state: string;
  city: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  description: string;
  socials: { LinkedIn: string; Twitter: string; Instagram: string; Facebook: string };
  yearEstablished: number;
  campuses: string[];
  subInstitutions: string[];
  faculties: Faculty[];
  programLevels: ProgramLevel[];
  submittedBy: string;
  submitterEmail: string;
  submittedOn: string;
  submittedTime: string;
  publishedBy?: string;
  workflowStatus: SubmissionStatus;
  listingStatus: ListingStatus;
  verification: Verification;
  views: number;
  reason?: string;
}

/* ------------------------------------------------------------------ stats */

export const SCHOOL_STATS = {
  total: 64,
  published: 44,
  approved: 44,
  pending: 12,
  rejected: 8,
  unpublished: 8,
};

export const UNIVERSITY_STATS = {
  total: 48,
  published: 34,
  approved: 34,
  pending: 9,
  rejected: 5,
  unpublished: 5,
};

export const INSTITUTE_STATS = {
  total: SCHOOL_STATS.total + UNIVERSITY_STATS.total,
  pending: SCHOOL_STATS.pending + UNIVERSITY_STATS.pending,
  approved: SCHOOL_STATS.approved + UNIVERSITY_STATS.approved,
  rejected: SCHOOL_STATS.rejected + UNIVERSITY_STATS.rejected,
  published: SCHOOL_STATS.published + UNIVERSITY_STATS.published,
};

export const SCHOOL_TRENDS = {
  total: { change: '+9%', positive: true },
  published: { change: '+14%', positive: true },
  approved: { change: '+14%', positive: true },
  pending: { change: '+5%', positive: true },
  rejected: { change: '−3%', positive: false },
  unpublished: { change: '−3%', positive: false },
};

export const UNIVERSITY_TRENDS = {
  total: { change: '+11%', positive: true },
  published: { change: '+17%', positive: true },
  approved: { change: '+17%', positive: true },
  pending: { change: '+4%', positive: true },
  rejected: { change: '−2%', positive: false },
  unpublished: { change: '−2%', positive: false },
};

/** Platform-wide totals per institute type, used by the overview bar chart. */
export const INSTITUTE_BY_TYPE: { name: string; count: number }[] = [
  { name: 'Primary & Secondary', count: SCHOOL_STATS.total },
  { name: 'University', count: UNIVERSITY_STATS.total },
];

export const TOP_COUNTRIES: { name: string; count: number }[] = [
  { name: 'Nigeria', count: 38 },
  { name: 'Ghana', count: 21 },
  { name: 'Kenya', count: 17 },
  { name: 'South Africa', count: 14 },
  { name: 'Egypt', count: 11 },
];

const IMG = (id: string) =>
  `https://images.unsplash.com/photo-${id}?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400`;

/* ----------------------------------------------------------- school seeds */

export const ADMIN_SCHOOLS: AdminSchool[] = [
  {
    id: 'sch-1',
    name: 'Greenfield International School',
    motto: 'Excellence in Character and Learning',
    image: IMG('1580582932707-520aed937b7b'),
    class: 'Primary & Secondary',
    program: 'Day & Boarding',
    ownership: 'Private',
    gender: 'Mixed',
    services: ['Teaching & Learning', 'School Bus', 'STEM & STEAM', 'Scholarships'],
    scopes: ['Science Club', 'Robotics Lab', 'Sports Academy'],
    status: 'Online',
    country: 'Nigeria',
    state: 'Lagos State',
    city: 'Ikeja',
    address: '14 Allen Avenue, Ikeja, Lagos, Nigeria',
    phone: '+234 803 111 2244',
    email: 'info@greenfieldschool.edu.ng',
    website: 'greenfieldschool.edu.ng',
    description:
      'Greenfield International School is a co-educational institution running both primary and secondary programmes with a strong emphasis on science, technology and character formation.',
    socials: { LinkedIn: 'greenfield-school', Twitter: '@greenfieldsch', Instagram: 'greenfieldschool', Facebook: 'greenfieldschool' },
    tuitionFees: [
      { level: 'Primary', fee: '450,000', currency: 'NGN' },
      { level: 'Secondary', fee: '620,000', currency: 'NGN' },
    ],
    otherFees: [
      { name: 'Development Levy', cost: '50,000', currency: 'NGN' },
      { name: 'Hostel (Boarding)', cost: '180,000', currency: 'NGN' },
    ],
    academicCalendar: [
      { term: '1st Term', startDate: 'Sep 8, 2026', midtermBreakDate: 'Oct 17, 2026', closureDate: 'Dec 12, 2026' },
      { term: '2nd Term', startDate: 'Jan 6, 2027', midtermBreakDate: 'Feb 13, 2027', closureDate: 'Mar 27, 2027' },
      { term: '3rd Term', startDate: 'Apr 13, 2027', midtermBreakDate: 'May 21, 2027', closureDate: 'Jul 9, 2027' },
    ],
    subjects: ['Mathematics', 'English Language', 'Basic Science', 'Computer Studies', 'Creative Arts'],
    admissionRequirements: { primary: ['Birth certificate', 'Previous report card'], secondary: ['O-Level credits', 'Entrance exam'] },
    workDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    workHours: ['7:30 AM – 4:00 PM'],
    activeStudents: '1,240',
    submittedBy: 'Adebayo Ogundimu',
    submitterEmail: 'a.ogundimu@greenfieldschool.edu.ng',
    submittedOn: 'Oct 11, 2026',
    submittedTime: '10:22 AM',
    publishedBy: 'A. Diallo',
    workflowStatus: 'Pending Review',
    listingStatus: 'Published',
    verification: 'Verified',
    views: 3400,
  },
  {
    id: 'sch-2',
    name: 'St. Augustine College',
    motto: 'Knowledge and Service',
    image: IMG('1562774053-701939374585'),
    class: 'Secondary',
    program: 'Boarding',
    ownership: 'Mission',
    gender: 'Male',
    services: ['Teaching & Learning', 'Sports & Physical Exercise', 'Clinic & Health Programs', 'Competitions & Olympiads'],
    scopes: [' debate', 'Football', 'Chess'],
    status: 'Online',
    country: 'Ghana',
    state: 'Greater Accra',
    city: 'Accra',
    address: 'Plot 15 Ring Road East, Accra, Ghana',
    phone: '+233 30 222 1188',
    email: 'admin@staugustine.edu.gh',
    website: 'staugustine.edu.gh',
    description:
      'A Catholic mission secondary school with a proud tradition of academic excellence, competitive debate and athletics.',
    socials: { LinkedIn: 'st-augustine-college', Twitter: '@staugustinegh', Instagram: 'staugustinecollege', Facebook: 'staugustinecollege' },
    tuitionFees: [{ level: 'Secondary', fee: '8,500', currency: 'GHS' }],
    otherFees: [{ name: 'Boarding', cost: '4,200', currency: 'GHS' }],
    academicCalendar: [
      { term: '1st Term', startDate: 'Sep 5, 2026', midtermBreakDate: 'Oct 10, 2026', closureDate: 'Dec 11, 2026' },
      { term: '2nd Term', startDate: 'Jan 9, 2027', midtermBreakDate: 'Feb 12, 2027', closureDate: 'Mar 26, 2027' },
      { term: '3rd Term', startDate: 'Apr 12, 2027', midtermBreakDate: 'May 20, 2027', closureDate: 'Jul 8, 2027' },
    ],
    subjects: ['Core Mathematics', 'Integrated Science', 'Social Studies', 'ICT'],
    admissionRequirements: { primary: [], secondary: ['BECE result', 'Interview'] },
    workDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    workHours: ['7:00 AM – 5:00 PM'],
    activeStudents: '860',
    submittedBy: 'Fr. Kwesi Boateng',
    submitterEmail: 'rector@staugustine.edu.gh',
    submittedOn: 'Oct 6, 2026',
    submittedTime: '02:47 PM',
    publishedBy: 'M. Osei',
    workflowStatus: 'Approved',
    listingStatus: 'Published',
    verification: 'Verified',
    views: 2100,
  },
  {
    id: 'sch-3',
    name: 'Horizon Academy',
    motto: 'Bright Futures Start Here',
    image: IMG('1503676260728-1c00da094a0b'),
    class: 'Primary',
    program: 'Day school',
    ownership: 'International',
    gender: 'Mixed',
    services: ['Teaching & Learning', 'Disabilities Support', 'Excursions', 'STEM & STEAM'],
    scopes: ['Inclusive education', 'Bilingual programme'],
    status: 'Offline',
    country: 'Kenya',
    state: 'Nairobi County',
    city: 'Nairobi',
    address: '34 Riverside Drive, Nairobi, Kenya',
    phone: '+254 720 554 118',
    email: 'hello@horizonacademy.ke',
    website: 'horizonacademy.ke',
    description:
      'An inclusive international primary school offering a bilingual curriculum and specialist support for learners with disabilities.',
    socials: { LinkedIn: 'horizon-academy', Twitter: '@horizonke', Instagram: 'horizonacademy', Facebook: 'horizonacademy' },
    tuitionFees: [{ level: 'Primary', fee: '96,000', currency: 'KES' }],
    otherFees: [{ name: 'Transport', cost: '18,000', currency: 'KES' }],
    academicCalendar: [
      { term: '1st Term', startDate: 'Sep 1, 2026', midtermBreakDate: 'Oct 12, 2026', closureDate: 'Dec 11, 2026' },
      { term: '2nd Term', startDate: 'Jan 5, 2027', midtermBreakDate: 'Feb 15, 2027', closureDate: 'Mar 26, 2027' },
      { term: '3rd Term', startDate: 'Apr 19, 2027', midtermBreakDate: 'May 24, 2027', closureDate: 'Jul 9, 2027' },
    ],
    subjects: ['English', 'Kiswahili', 'Mathematics', 'Environmental Activities'],
    admissionRequirements: { primary: ['Birth certificate', 'Immunisation card'], secondary: [] },
    workDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    workHours: ['8:00 AM – 3:30 PM'],
    activeStudents: '420',
    submittedBy: 'Wanjiru Kamau',
    submitterEmail: 'w.kamau@horizonacademy.ke',
    submittedOn: 'Oct 2, 2026',
    submittedTime: '09:15 AM',
    publishedBy: 'A. Diallo',
    workflowStatus: 'Rejected',
    listingStatus: 'Pending Review',
    verification: 'Unverified',
    views: 780,
    reason: 'Operating licence upload was expired and could not be verified.',
  },
  {
    id: 'sch-4',
    name: 'Royal Crest School',
    motto: 'Leadership Through Learning',
    image: IMG('1546410531-bb4caa6b424d'),
    class: 'Secondary',
    program: 'Day school',
    ownership: 'Private',
    gender: 'Female',
    services: ['Teaching & Learning', 'Scholarships', 'Technical Skills Development', 'Sports & Physical Exercise'],
    scopes: ['Girls in STEM', 'Debate society'],
    status: 'Online',
    country: 'South Africa',
    state: 'Gauteng',
    city: 'Johannesburg',
    address: '7 Rivonia Road, Sandton, Johannesburg, South Africa',
    phone: '+27 11 884 2210',
    email: 'info@royalcrest.co.za',
    website: 'royalcrest.co.za',
    description:
      'An all-girls private secondary school focused on leadership, STEM participation and community service.',
    socials: { LinkedIn: 'royal-crest-school', Twitter: '@royalcrestsa', Instagram: 'royalcrestschool', Facebook: 'royalcrestschool' },
    tuitionFees: [{ level: 'Secondary', fee: '38,000', currency: 'ZAR' }],
    otherFees: [{ name: 'Uniform Package', cost: '4,500', currency: 'ZAR' }],
    academicCalendar: [
      { term: '1st Term', startDate: 'Jan 12, 2027', midtermBreakDate: 'Feb 19, 2027', closureDate: 'Mar 24, 2027' },
      { term: '2nd Term', startDate: 'Apr 13, 2027', midtermBreakDate: 'May 21, 2027', closureDate: 'Jun 25, 2027' },
      { term: '3rd Term', startDate: 'Jul 12, 2027', midtermBreakDate: 'Aug 20, 2027', closureDate: 'Oct 1, 2027' },
    ],
    subjects: ['Mathematics', 'Physical Sciences', 'Life Sciences', 'Business Studies'],
    admissionRequirements: { primary: [], secondary: ['NSC readiness', 'Interview'] },
    workDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    workHours: ['7:45 AM – 3:15 PM'],
    activeStudents: '690',
    submittedBy: 'Nomsa Dlamini',
    submitterEmail: 'n.dlamini@royalcrest.co.za',
    submittedOn: 'Sep 28, 2026',
    submittedTime: '11:58 AM',
    publishedBy: 'M. Osei',
    workflowStatus: 'Pending Review',
    listingStatus: 'Pending Review',
    verification: 'Pending',
    views: 1500,
  },
  {
    id: 'sch-5',
    name: 'Cedar Grove Primary',
    motto: 'Growing Minds Daily',
    image: IMG('1497633762265-9e179a9553aa'),
    class: 'Primary',
    program: 'Day & Boarding',
    ownership: 'Government | Public',
    gender: 'Mixed',
    services: ['Teaching & Learning', 'School Bus', 'Clinic & Health Programs'],
    scopes: ['Remedial support', 'After-school clubs'],
    status: 'Online',
    country: 'Nigeria',
    state: 'Oyo State',
    city: 'Ibadan',
    address: '22 Molete Road, Ibadan, Oyo State, Nigeria',
    phone: '+234 802 447 9910',
    email: 'cedargrove@oyo.gov.ng',
    website: '',
    description:
      'A public primary school serving the Molete community with remedial support and a daily health clinic.',
    socials: { LinkedIn: '', Twitter: '', Instagram: '', Facebook: 'cedargroveprimary' },
    tuitionFees: [{ level: 'Primary', fee: '12,000', currency: 'NGN' }],
    otherFees: [{ name: 'Exercise Books', cost: '3,500', currency: 'NGN' }],
    academicCalendar: [
      { term: '1st Term', startDate: 'Sep 8, 2026', midtermBreakDate: 'Oct 17, 2026', closureDate: 'Dec 12, 2026' },
      { term: '2nd Term', startDate: 'Jan 6, 2027', midtermBreakDate: 'Feb 13, 2027', closureDate: 'Mar 27, 2027' },
      { term: '3rd Term', startDate: 'Apr 13, 2027', midtermBreakDate: 'May 21, 2027', closureDate: 'Jul 9, 2027' },
    ],
    subjects: ['English Studies', 'Basic Mathematics', 'Basic Science & Technology'],
    admissionRequirements: { primary: ['Birth certificate'], secondary: [] },
    workDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    workHours: ['8:00 AM – 2:30 PM'],
    activeStudents: '540',
    submittedBy: 'Oyo State Ministry of Education',
    submitterEmail: 'institutions@oyo.gov.ng',
    submittedOn: 'Sep 22, 2026',
    submittedTime: '08:03 AM',
    publishedBy: 'A. Diallo',
    workflowStatus: 'Published',
    listingStatus: 'Unpublished',
    verification: 'Verified',
    views: 940,
  },
  {
    id: 'sch-6',
    name: 'Kingmaker Bilingual School',
    motto: 'Two Languages, One World',
    image: IMG('1509062522246-3755977927d7'),
    class: 'Primary & Secondary',
    program: 'Day school',
    ownership: 'Inter-Government',
    gender: 'Mixed',
    services: ['Teaching & Learning', 'Excursions', 'Competitions & Olympiads', 'STEM & STEAM'],
    scopes: ['French-English bilingual', 'Model UN'],
    status: 'Online',
    country: 'Morocco',
    state: 'Rabat-Salé-Kénitra',
    city: 'Rabat',
    address: 'Avenue Fal Ould Oumeir, Rabat, Morocco',
    phone: '+212 537 66 20 14',
    email: 'contact@kingmakerschool.ma',
    website: 'kingmakerschool.ma',
    description:
      'A bilingual French-English school offering both primary and secondary pathways with an active Model UN programme.',
    socials: { LinkedIn: 'kingmaker-school', Twitter: '@kingmakermaroc', Instagram: 'kingmakerschool', Facebook: '' },
    tuitionFees: [
      { level: 'Primary', fee: '22,000', currency: 'MAD' },
      { level: 'Secondary', fee: '31,000', currency: 'MAD' },
    ],
    otherFees: [{ name: 'Registration', cost: '2,000', currency: 'MAD' }],
    academicCalendar: [
      { term: '1st Term', startDate: 'Sep 7, 2026', midtermBreakDate: 'Oct 20, 2026', closureDate: 'Dec 15, 2026' },
      { term: '2nd Term', startDate: 'Jan 11, 2027', midtermBreakDate: 'Feb 22, 2027', closureDate: 'Mar 30, 2027' },
      { term: '3rd Term', startDate: 'Apr 19, 2027', midtermBreakDate: 'May 27, 2027', closureDate: 'Jul 12, 2027' },
    ],
    subjects: ['Français', 'English Language', 'Mathématiques', 'Sciences'],
    admissionRequirements: { primary: ['Transcript', 'Language assessment'], secondary: ['Baccalaureate readiness'] },
    workDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    workHours: ['8:00 AM – 4:00 PM'],
    activeStudents: '730',
    submittedBy: 'Youssef Bennani',
    submitterEmail: 'y.bennani@kingmakerschool.ma',
    submittedOn: 'Sep 18, 2026',
    submittedTime: '01:19 PM',
    publishedBy: 'M. Osei',
    workflowStatus: 'Approved',
    listingStatus: 'Published',
    verification: 'Verified',
    views: 1220,
  },
];
