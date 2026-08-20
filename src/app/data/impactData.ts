import { AFRICAN_COUNTRIES } from './mockData';

export type ImpactProgram =
  | 'Career Support'
  | 'Research Support'
  | 'Educational Scholarship';

export type ImpactStatus = 'Active' | 'Concluded';

export interface ImpactLocation {
  stateRegion: string;
  country: string;
}

export interface SocialHandles {
  linkedin?: string;
  twitter?: string;
  instagram?: string;
  facebook?: string;
}

export interface ImpactPerson {
  name: string;
  image: string;
  role?: string;
  socials?: SocialHandles;
}

export interface MediaItem {
  url: string;
  caption: string;
}

export interface MediaGroup {
  label: string;
  items: MediaItem[];
}

export interface TimelinePhase {
  title: string;
  bullets: string[];
}

export interface BreakdownSection {
  title: string;
  bullets?: string[];
  text?: string;
}

export interface YearProjection {
  year1: string;
  year2: string;
  year3: string;
}

export interface CareerDetails {
  companyAddress: string;
  employmentProjection: YearProjection;
  revenueProjection: YearProjection;
  careerObjectives: string[];
  careerRequirements: string[];
  protocolsFunded: string[];
  expectedCareerImpacts: string[];
}

export interface ResearchDetails {
  researchCategory: string;
  researchDuration: string;
  sampleSize: string;
  researchAim: string;
  researchObjectives: string[];
  expectedOutcomes: string[];
  samplingCollection: string[];
  researchMaterials: string[];
  analyticalProcedures: string[];
  protocolsFunded: string[];
  resultInterpretation: string[];
  researchSummary: string;
  possibleImpactAreas: string[];
  publicationLinks: { label: string; url: string }[];
}

export interface ScholarshipDetails {
  academicYear: string;
  institutionName: string;
  institutionAddress: string;
  problemsBefore: string[];
  proposedFunding: string[];
  expectedAnnualOutcome: string[];
  outcomeAfter: string[];
}

export interface ImpactStory {
  id: string;
  program: ImpactProgram;
  status: ImpactStatus;
  idTag: string;
  image: string;
  year: string;
  location: ImpactLocation;
  summary: string;
  fundsUtilized: string;
  beneficiaries: number;
  story: string;
  people: ImpactPerson[];
  timeline: TimelinePhase[];
  mediaGallery: MediaGroup[];
  careerPath?: string;
  companyName?: string;
  noOfOwners?: number;
  careerDetails?: CareerDetails;
  researchLevel?: string;
  researchTitle?: string;
  noOfResearchers?: number;
  researchDetails?: ResearchDetails;
  scholarshipLevel?: string;
  departmentName?: string;
  initialCgpa?: string;
  scholarshipDetails?: ScholarshipDetails;
}

export const IMPACT_PROGRAMS: ImpactProgram[] = [
  'Career Support',
  'Research Support',
  'Educational Scholarship',
];

export const IMPACT_STATUSES: ImpactStatus[] = ['Active', 'Concluded'];
export const IMPACT_COUNTRIES = [...AFRICAN_COUNTRIES];
export const IMPACT_YEARS = ['2026', '2025', '2024', '2023', '2022', '2021', '2020'];

/** Stable dummy images — real Unsplash photos for impact cards */
const IMPACT_IMAGES: Record<string, string> = {
  'Business DP':
    'https://images.unsplash.com/photo-1621062089461-01f1eaebb66c?auto=format&fit=crop&q=80&w=800',
  'MedFix Hub':
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800',
  'Research Lab':
    'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=800',
  'Field Trials':
    'https://images.unsplash.com/photo-1677126577258-1a82fdf1a976?auto=format&fit=crop&q=80&w=800',
  Scholarship:
    'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800',
  Graduate:
    'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=800',
};

/** Face portraits for people sections */
const IMPACT_FACES: Record<string, string> = {
  'Tunde A': 'https://images.unsplash.com/photo-1537511446984-935f663eb1f4?auto=format&fit=crop&q=80&w=400',
  'Chioma O': 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400',
  'Kwame B': 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400',
  'Amara O': 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
  'James W': 'https://images.unsplash.com/photo-1537511446984-935f663eb1f4?auto=format&fit=crop&q=80&w=400',
  'Amina Y': 'https://images.unsplash.com/photo-1621062089461-01f1eaebb66c?auto=format&fit=crop&q=80&w=400',
  'Fatima M': 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400',
  'Hana B': 'https://images.unsplash.com/photo-1621062089461-01f1eaebb66c?auto=format&fit=crop&q=80&w=400',
  'Thabo N': 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400',
};

/** Media/gallery images */
const IMPACT_MEDIA: Record<string, string> = {
  Complete: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&q=80&w=600',
  Survey: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&q=80&w=600',
  Setup: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=600',
  Done: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&q=80&w=600',
  Field: 'https://images.unsplash.com/photo-1677126577258-1a82fdf1a976?auto=format&fit=crop&q=80&w=600',
  Lab: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=600',
  Analysis: 'https://images.unsplash.com/photo-1671917057421-677f9cd99721?auto=format&fit=crop&q=80&w=600',
  Results: 'https://images.unsplash.com/photo-1717934444759-41d4794edcca?auto=format&fit=crop&q=80&w=600',
  Screening: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=600',
  Ceremony: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=600',
  Graduation: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=600',
};

const img = (label: string) => IMPACT_IMAGES[label] || `https://placehold.co/800x600/0f172a/e2e8f0/png?text=${encodeURIComponent(label)}`;
const face = (label: string) => IMPACT_FACES[label] || `https://placehold.co/400x400/1e293b/f8fafc/png?text=${encodeURIComponent(label)}`;
const media = (label: string, caption: string): MediaItem => ({
  url: IMPACT_MEDIA[label] || `https://placehold.co/600x400/334155/f1f5f9/png?text=${encodeURIComponent(label)}`,
  caption,
});

export const IMPACT_STORIES: ImpactStory[] = [
  {
    id: 'impact-cs-1',
    program: 'Career Support',
    status: 'Active',
    idTag: 'ASH-CS-2024-001',
    image: img('Business DP'),
    year: '2024',
    location: { stateRegion: 'Lagos', country: 'Nigeria' },
    summary:
      'Graduate-led agritech startup funded to scale soil-testing kiosks and create rural employment across southwest Nigeria.',
    fundsUtilized: '$6,200',
    beneficiaries: 48,
    careerPath: 'AgriTech Entrepreneurship',
    companyName: 'GreenRoot Diagnostics Ltd',
    noOfOwners: 2,
    story:
      'GreenRoot Diagnostics received Career Support funding to launch portable soil-testing kiosks serving smallholder farmers. The team built a lean workshop, trained field agents, and opened three community access points in Lagos State.',
    people: [
      {
        name: 'Engr. Tunde Adeyemi',
        image: face('Tunde A'),
        socials: { linkedin: 'https://linkedin.com', twitter: 'https://twitter.com' },
      },
      {
        name: 'Ms. Chioma Okeke',
        image: face('Chioma O'),
        socials: { instagram: 'https://instagram.com', facebook: 'https://facebook.com' },
      },
    ],
    careerDetails: {
      companyAddress: '14 Industrial Layout, Ikeja, Lagos, Nigeria',
      employmentProjection: { year1: '8 staff', year2: '18 staff', year3: '35 staff' },
      revenueProjection: { year1: '$12,000', year2: '$28,000', year3: '$55,000' },
      careerObjectives: [
        'Deploy affordable soil diagnostics for smallholder farmers',
        'Create skilled technical jobs for STEM graduates',
        'Build a sustainable agritech service model',
      ],
      careerRequirements: [
        'Registered science/technology graduate proprietors',
        'Validated business plan under $7,000 budget',
        'Majority ownership by applicant team',
      ],
      protocolsFunded: [
        'Workshop equipment and calibration kits',
        'Initial inventory of soil test consumables',
        'Field agent training and safety protocols',
      ],
      expectedCareerImpacts: [
        'Improved crop yield advice for rural farmers',
        'Local employment for technicians and agents',
        'Pathway to secondary investment after progressive years',
      ],
    },
    timeline: [
      {
        title: 'Career Proposal & Verification',
        bullets: [
          'Application reviewed and eligibility verified',
          'Business plan and budget validated by AfriScience Hub',
        ],
      },
      {
        title: 'Business & Market Survey',
        bullets: [
          'Farmer demand survey across three LGAs',
          'Competitor and pricing analysis completed',
        ],
      },
      {
        title: 'Funding & Setup',
        bullets: [
          'Disbursement of startup equipment funds',
          'Workshop fit-out and staff onboarding',
        ],
      },
      {
        title: 'Project Completion',
        bullets: [
          'Three kiosks operational',
          'First quarterly impact report submitted',
        ],
      },
    ],
    mediaGallery: [
      {
        label: 'Business & Market Survey',
        items: [
          media('Survey 1', 'Field interviews with farmers'),
          media('Survey 2', 'Market mapping session'),
        ],
      },
      {
        label: 'Funding & Setup',
        items: [
          media('Setup 1', 'Workshop equipment installation'),
          media('Setup 2', 'Team training day'),
        ],
      },
      {
        label: 'Project Completion',
        items: [media('Complete', 'Open kiosk serving farmers')],
      },
    ],
  },
  {
    id: 'impact-cs-2',
    program: 'Career Support',
    status: 'Concluded',
    idTag: 'ASH-CS-2023-014',
    image: img('MedFix Hub'),
    year: '2023',
    location: { stateRegion: 'Ashanti', country: 'Ghana' },
    summary:
      'Biomedical engineering graduate established a medical device repair hub serving district hospitals.',
    fundsUtilized: '$5,800',
    beneficiaries: 12,
    careerPath: 'Medical Device Services',
    companyName: 'MedFix Hub Ghana',
    noOfOwners: 1,
    story:
      'MedFix Hub was funded to equip a workshop and train technicians for hospital equipment maintenance across the Ashanti region.',
    people: [
      {
        name: 'Mr. Kwame Boateng',
        image: face('Kwame B'),
        socials: { linkedin: 'https://linkedin.com' },
      },
    ],
    careerDetails: {
      companyAddress: 'Kumasi Industrial Area, Ashanti, Ghana',
      employmentProjection: { year1: '3 staff', year2: '6 staff', year3: '10 staff' },
      revenueProjection: { year1: '$8,000', year2: '$18,000', year3: '$32,000' },
      careerObjectives: [
        'Reduce hospital equipment downtime',
        'Build local biomedical repair capacity',
      ],
      careerRequirements: [
        'STEM graduate with relevant work experience',
        'Service agreements with partner hospitals',
      ],
      protocolsFunded: [
        'Diagnostic tools and spare-parts starter kit',
        'Technician apprenticeship stipends',
      ],
      expectedCareerImpacts: [
        'Faster turnaround on critical devices',
        'Skills transfer to junior technicians',
      ],
    },
    timeline: [
      { title: 'Career Proposal & Verification', bullets: ['Proposal approved', 'Site inspection completed'] },
      { title: 'Business & Market Survey', bullets: ['Hospital needs assessment across 5 facilities'] },
      { title: 'Funding & Setup', bullets: ['Workshop commissioned', 'Tools procured'] },
      { title: 'Project Completion', bullets: ['Service contracts signed', 'Final report accepted'] },
    ],
    mediaGallery: [
      { label: 'Business & Market Survey', items: [media('Survey', 'Hospital equipment audit')] },
      { label: 'Funding & Setup', items: [media('Setup', 'Workshop setup')] },
      { label: 'Project Completion', items: [media('Done', 'Repaired devices returned')] },
    ],
  },
  {
    id: 'impact-rs-1',
    program: 'Research Support',
    status: 'Active',
    idTag: 'ASH-RS-2024-007',
    image: img('Research Lab'),
    year: '2024',
    location: { stateRegion: 'Nairobi', country: 'Kenya' },
    summary:
      'Molecular study mapping antimalarial resistance markers to guide treatment protocols in East Africa.',
    fundsUtilized: '$6,500',
    beneficiaries: 6,
    researchLevel: 'Postgraduate',
    researchTitle: 'Genetic Markers of Antimalarial Resistance in East Africa',
    noOfResearchers: 3,
    story:
      'Research Support enabled laboratory sequencing and field sampling across three counties, strengthening evidence for treatment guidelines.',
    people: [
      {
        name: 'Dr. Amara Okafor',
        image: face('Amara O'),
        role: 'Principal Investigator',
        socials: { linkedin: 'https://linkedin.com', twitter: 'https://twitter.com' },
      },
      {
        name: 'Mr. James Wekesa',
        image: face('James W'),
        role: 'Field Research Lead',
        socials: { linkedin: 'https://linkedin.com' },
      },
      {
        name: 'Ms. Amina Yusuf',
        image: face('Amina Y'),
        role: 'Laboratory Analyst',
        socials: { instagram: 'https://instagram.com' },
      },
    ],
    researchDetails: {
      researchCategory: 'Infectious Disease / Molecular Biology',
      researchDuration: '18 months',
      sampleSize: '2,500 samples',
      researchAim:
        'Identify genetic markers associated with antimalarial drug resistance in East African populations.',
      researchObjectives: [
        'Collect and sequence clinical samples from three counties',
        'Map resistance-associated markers',
        'Recommend protocol updates for partner clinics',
      ],
      expectedOutcomes: [
        'Validated marker panel for resistance risk',
        'Open dataset for regional researchers',
      ],
      samplingCollection: [
        'Ethics approval obtained',
        'Community sensitization before sampling',
        'Cold-chain transport to central lab',
      ],
      researchMaterials: [
        'PCR reagents and sequencing kits',
        'Field collection kits and PPE',
      ],
      analyticalProcedures: [
        'DNA extraction and QC',
        'Targeted amplicon sequencing',
        'Statistical association analysis',
      ],
      protocolsFunded: [
        'Sequencing consumables package',
        'Field logistics and cold-chain support',
      ],
      resultInterpretation: [
        'Three markers significantly associated with treatment failure',
        'Regional variation observed between highland and lowland sites',
      ],
      researchSummary:
        'The study produced an actionable marker set now under review by partner health teams for pilot decision support.',
      possibleImpactAreas: [
        'Public health treatment guidelines',
        'Precision medicine for malaria',
        'Regional research capacity building',
      ],
      publicationLinks: [
        { label: 'Preprint repository', url: 'https://example.com/preprint' },
        { label: 'Partner clinic brief', url: 'https://example.com/brief' },
      ],
    },
    timeline: [
      { title: 'Research Proposal & Verification', bullets: ['Proposal peer-reviewed', 'Ethics clearance secured'] },
      { title: 'Research Materials Acquisition', bullets: ['Reagents and kits procured', 'Lab readiness verified'] },
      { title: 'Sample Collection & Analysis', bullets: ['Field sampling completed', 'Sequencing batch 1–3 analyzed'] },
      {
        title: 'Result Interpretations & Statistical Representations',
        bullets: ['Association models finalized', 'Visualization dashboards prepared'],
      },
      { title: 'Publication', bullets: ['Manuscript drafted', 'Preprint released'] },
    ],
    mediaGallery: [
      { label: 'Materials Acquisition', items: [media('Materials', 'Lab kit inventory')] },
      { label: 'Sample Collection', items: [media('Samples', 'Field sampling team')] },
      { label: 'Setup & Experimentation', items: [media('Setup', 'Sequencing workflow')] },
      { label: 'Project Completion', items: [media('Results', 'Results presentation')] },
    ],
  },
  {
    id: 'impact-rs-2',
    program: 'Research Support',
    status: 'Concluded',
    idTag: 'ASH-RS-2023-022',
    image: img('Field Trials'),
    year: '2023',
    location: { stateRegion: 'Northern', country: 'Ghana' },
    summary:
      'Field trials produced drought-tolerant sorghum lines now adopted by smallholder cooperatives.',
    fundsUtilized: '$4,900',
    beneficiaries: 15,
    researchLevel: 'Doctoral',
    researchTitle: 'Drought-Tolerant Sorghum Varieties for the Sahel Margin',
    noOfResearchers: 4,
    story:
      'Funding covered seed development, multi-site trials, and farmer demonstration plots culminating in variety release guidance.',
    people: [
      {
        name: 'Dr. Fatima Mensah',
        image: face('Fatima M'),
        role: 'Lead Researcher',
        socials: { linkedin: 'https://linkedin.com', twitter: 'https://twitter.com' },
      },
    ],
    researchDetails: {
      researchCategory: 'Agricultural Science',
      researchDuration: '24 months',
      sampleSize: '12 trial sites',
      researchAim: 'Develop sorghum lines requiring significantly less water without yield collapse.',
      researchObjectives: [
        'Screen germplasm under controlled drought',
        'Validate top lines with farmer cooperatives',
      ],
      expectedOutcomes: ['Three candidate varieties', 'Extension training materials'],
      samplingCollection: ['Multi-location plot layout', 'Phenotypic data capture'],
      researchMaterials: ['Seed stocks', 'Irrigation control equipment'],
      analyticalProcedures: ['Yield indexing', 'Stress-tolerance scoring'],
      protocolsFunded: ['Trial inputs and extension days'],
      resultInterpretation: ['Top lines used 40% less water with stable yields'],
      researchSummary: 'Three varieties advanced for cooperative seed multiplication.',
      possibleImpactAreas: ['Food security', 'Climate resilience'],
      publicationLinks: [{ label: 'Journal article', url: 'https://example.com/journal' }],
    },
    timeline: [
      { title: 'Research Proposal & Verification', bullets: ['Doctoral proposal approved'] },
      { title: 'Research Materials Acquisition', bullets: ['Seed and sensors acquired'] },
      { title: 'Sample Collection & Analysis', bullets: ['Two season trials completed'] },
      { title: 'Result Interpretations & Statistical Representations', bullets: ['Yield models published internally'] },
      { title: 'Publication', bullets: ['Peer-reviewed article released'] },
    ],
    mediaGallery: [
      { label: 'Materials Acquisition', items: [media('Seeds', 'Seed preparation')] },
      { label: 'Sample Collection', items: [media('Plots', 'Plot sampling')] },
      { label: 'Setup & Experimentation', items: [media('Trials', 'Trial monitoring')] },
      { label: 'Project Completion', items: [media('Harvest', 'Harvest demonstration')] },
    ],
  },
  {
    id: 'impact-es-1',
    program: 'Educational Scholarship',
    status: 'Active',
    idTag: 'ASH-ES-2025-003',
    image: img('Scholarship'),
    year: '2025',
    location: { stateRegion: 'Addis Ababa', country: 'Ethiopia' },
    summary:
      'Undergraduate scholarship sustaining a high-performing engineering student facing tuition shortfalls.',
    fundsUtilized: '$500',
    beneficiaries: 1,
    scholarshipLevel: 'Undergraduate',
    departmentName: 'Electrical Engineering',
    initialCgpa: '3.72',
    story:
      'Scholarship funding covered tuition and essential academic materials for the academic year, allowing uninterrupted study progress.',
    people: [
      {
        name: 'Ms. Hana Bekele',
        image: face('Hana B'),
        socials: { linkedin: 'https://linkedin.com', instagram: 'https://instagram.com' },
      },
    ],
    scholarshipDetails: {
      academicYear: '2024/2025',
      institutionName: 'Addis Ababa Institute of Technology',
      institutionAddress: 'King George VI St, Addis Ababa, Ethiopia',
      problemsBefore: [
        'Outstanding tuition balance risking deregistration',
        'Limited funds for laboratory materials',
      ],
      proposedFunding: [
        'Annual tuition support up to $500',
        'Essential academic materials stipend',
      ],
      expectedAnnualOutcome: [
        'Maintain CGPA above renewal threshold',
        'Complete all registered credit units',
      ],
      outcomeAfter: [
        'Tuition cleared for the academic year',
        'Student retained full course load',
      ],
    },
    timeline: [
      { title: 'Scholarship Proposal & Verification', bullets: ['Eligibility verified', 'Aptitude screening passed'] },
      { title: 'Annual Clearance & Funding', bullets: ['Institution clearance confirmed', 'Funds disbursed'] },
      { title: 'Project Completion', bullets: ['End-of-year transcript submitted'] },
    ],
    mediaGallery: [
      { label: 'Screening Exercise', items: [media('Screening', 'Aptitude screening day')] },
      { label: 'Clearance & Funding', items: [media('Clearance', 'Campus registration')] },
      { label: 'Project Completion', items: [media('Complete', 'Academic year milestone')] },
    ],
  },
  {
    id: 'impact-es-2',
    program: 'Educational Scholarship',
    status: 'Concluded',
    idTag: 'ASH-ES-2024-019',
    image: img('Graduate'),
    year: '2024',
    location: { stateRegion: 'Western Cape', country: 'South Africa' },
    summary:
      'Postgraduate scholarship enabled completion of an MSc in environmental chemistry with first-class distinction.',
    fundsUtilized: '$700',
    beneficiaries: 1,
    scholarshipLevel: 'Postgraduate',
    departmentName: 'Environmental Chemistry',
    initialCgpa: '3.85',
    story:
      'Annual scholarship support removed financial barriers during thesis research and final examinations.',
    people: [
      {
        name: 'Mr. Thabo Ndlovu',
        image: face('Thabo N'),
        socials: { linkedin: 'https://linkedin.com', twitter: 'https://twitter.com' },
      },
    ],
    scholarshipDetails: {
      academicYear: '2023/2024',
      institutionName: 'University of Cape Town',
      institutionAddress: 'Rondebosch, Cape Town, 7700, South Africa',
      problemsBefore: ['Thesis lab costs unmet', 'Part-time work conflicting with research hours'],
      proposedFunding: ['Postgraduate annual support up to $700'],
      expectedAnnualOutcome: ['Thesis submission on schedule', 'CGPA ≥ 3.5'],
      outcomeAfter: ['MSc completed with distinction', 'Thesis archived by department'],
    },
    timeline: [
      { title: 'Scholarship Proposal & Verification', bullets: ['Documents verified', 'Renewal CGPA confirmed'] },
      { title: 'Annual Clearance & Funding', bullets: ['Fees cleared', 'Research stipend released'] },
      { title: 'Project Completion', bullets: ['Graduation confirmed'] },
    ],
    mediaGallery: [
      { label: 'Screening Exercise', items: [media('Screening', 'Document screening')] },
      { label: 'Clearance & Funding', items: [media('Clearance', 'Fee clearance')] },
      { label: 'Project Completion', items: [media('Graduation', 'Graduation ceremony')] },
    ],
  },
];

export function formatImpactLocation(loc: ImpactLocation): string {
  return `${loc.stateRegion}, ${loc.country}`;
}

export function getCardPrimaryTitle(story: ImpactStory): string {
  if (story.program === 'Career Support') return story.companyName ?? story.idTag;
  if (story.program === 'Research Support') return story.researchTitle ?? story.idTag;
  const dept = story.departmentName ?? 'Department';
  return `${dept} Scholarship`;
}

export function getDetailTitle(story: ImpactStory): string {
  if (story.program === 'Career Support') return story.companyName ?? story.idTag;
  if (story.program === 'Research Support') return story.researchTitle ?? story.idTag;
  return story.departmentName ?? story.idTag;
}

export function getCardSecondaryMetric(story: ImpactStory): { label: string; value: string } {
  if (story.program === 'Career Support') {
    return { label: 'No. of Owners', value: String(story.noOfOwners ?? 0) };
  }
  if (story.program === 'Research Support') {
    return { label: 'No. of Researchers', value: String(story.noOfResearchers ?? 0) };
  }
  return { label: 'Initial CGPA', value: story.initialCgpa ?? '—' };
}

export function getDpBadgeLabel(story: ImpactStory): string {
  if (story.program === 'Career Support') return story.careerPath ?? '';
  if (story.program === 'Research Support') return story.researchLevel ?? '';
  return story.scholarshipLevel ?? '';
}
