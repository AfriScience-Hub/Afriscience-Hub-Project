import type { ImpactProgram } from '@/app/data/impactData';

export interface ProgramDetails {
  summary: string;
  description: string;
  eligibility: string[];
  applicationRequirements: string[];
  preApprovalRequirements?: string[];
  disbursementRequirements?: string[];
  approvalRequirements?: string[];
  renewalRequirement?: string[];
  honoraryAwardRequirements?: string[];
  postCompletionRequirements: string[];
  overallProgramImpact: string[];
  undertaking: string;
}

export const PROGRAM_DETAILS: Record<ImpactProgram, ProgramDetails> = {
  'Career Support': {
    summary:
      'Access entrepreneurial funding to start and grow your business as a graduate student of any science and technology field. Impact on your region by creating more employment opportunities.',
    description:
      'This program aims at financing the entrepreneurial journey of graduates (of science & technology), in their chosen career path. Our focus revolves around providing funding, creating investment opportunities and running mentorship programs to ensure entrepreneurial success of qualified graduates. Eligible graduates with strong entrepreneurial drive are invited to diligently follow through the application process for a chance to bring their career dreams to reality.',
    eligibility: [
      'Must be an African currently residing in an African country',
      'Age requirement of 18 years minimum and 35 years maximum',
      'Must be a tertiary graduate of any science or technology field from a recognized African tertiary academic institution',
      'Minimum graduation CGPA of 3.0',
      'Minimum of 3 years active work experience (or training) in chosen career',
      'Career startup must be below 2 years (applicable to already existing startups only)',
      'Must hold a majority ownership stake in the joint startup (for already existing joint startups only)',
      'Startup budget proposal not exceeding $7,000 budget',
      'Strong entrepreneurial drive of proprietor(s)',
      'Good credit report status of proprietor(s)',
    ],
    applicationRequirements: [
      'Valid government issued ID card of proprietor(s)',
      'Most recent degree certificate of proprietor(s)',
      'Employment Letter/Training Certificate of proprietor(s)',
      'Curriculum Vitae of proprietor(s)',
      'Business plan summary',
      'Estimated budget breakdown document',
      'Facial images of proprietor(s)',
    ],
    preApprovalRequirements: [
      'Business registration documents (for registered startups only)',
      'License/Permit documents for proposed business (where applicable)',
      'Skill verification/screening exercise',
      'Two (2) reference letters for each proprietor',
      'Bank reference letter of proprietor(s)',
      'Statement of current personal debts of proprietor(s)',
      'One (1) year personal bank statement of proprietor(s)',
      'Tax related documents & KYC information of proprietor(s)',
    ],
    postCompletionRequirements: [
      'Periodic evaluation of business operations, reports and documents (a mandatory requirement for secondary funding & investment opportunities)',
    ],
    overallProgramImpact: [
      'Business funding',
      'Market expansion opportunities',
      'Secondary funding & investment opportunities (after 3 progressive business years)',
      'Business mentorship schemes',
      'Employment creation opportunities',
    ],
    undertaking:
      'I understand the requirements of this program and confirm that I have all the necessary documents and information to complete this application. I also confirm that my organization and I meet the program’s eligibility criteria.',
  },
  'Research Support': {
    summary:
      'Access research funding that supports African researchers (at different levels) towards conducting experimental findings that are scientifically and technologically relevant. Create an impact by contributing to scientific knowledge.',
    description:
      'This program aims at financing experimental findings by African researchers in different scientific and technological fields. Our focus primarily centers on providing support for research scopes that aim to: Tackle problems endemic to African regions; Explore African ecosystems; Discover practical applications of vast African resources; Contribute to global scientific and technological knowledge. Eligible African researchers with the zeal of using their scientific and technological knowledge to transform their communities are invited to apply for this program.',
    eligibility: [
      'Must be an African currently residing in an African country',
      'Minimum age requirement of 18 years',
      'Can either be an ‘Academic Researcher’ or an ‘Independent Researcher’',
      'Research duration of 2 years max',
      'Research budget not exceeding $1,500',
      'Research must address at least one of the program scopes (endemic problems, ecosystems, African resources, or global knowledge contribution)',
    ],
    applicationRequirements: [
      'Valid government issued ID card of researcher(s)',
      'Most recent degree certificate of researcher(s) where applicable',
      'School registration details (for academic researchers only)',
      'Minimum of seven (7) previous research publications (for independent researchers only)',
      'Research proposal document',
      'Research budget breakdown document',
      'Facial images of researcher(s)',
    ],
    disbursementRequirements: [
      'Periodic media and progress-report document submissions (information must align with research proposal objectives)',
    ],
    postCompletionRequirements: [
      'Copy of complete research thesis (to be archived for researchers in AfriScience Hub’s digital library)',
    ],
    overallProgramImpact: [
      'Research funding',
      'Research collaboration & partnership opportunities',
      'Recommendation of scientific & technological solutions to endemic problems',
      'Knowledge of African resource(s) applications',
      'Sensitization opportunities',
      'Contribution to global scientific and technological knowledge',
    ],
    undertaking:
      'I understand the requirements of this program and confirm that I have all the necessary documents and information to complete this application. I also confirm that I meet the program’s eligibility criteria.',
  },
  'Educational Scholarship': {
    summary:
      'Access educational funding as a tertiary student aspiring to obtain an academic degree in any science or technology field, from a recognized African tertiary institution. Invest in your intellectual capacity today, to make a difference tomorrow.',
    description:
      'This program aims at providing financial support to high-performing African tertiary students of science and technology that are struggling to finance their educational journey. Our focus is to assist these students absorb the financial stress that comes with their education, which may negatively affect their academic performance. Qualified students will be selected after an aptitude test screening, and will be required to maintain a certain performance-benchmark in order to continue benefiting from this scholarship program. Interested African tertiary students that are eligible for this scholarship program are invited to apply.',
    eligibility: [
      'Must be an African currently residing in an African country',
      'Minimum age requirement of 18 years',
      'Must be currently enrolled in a recognized African tertiary academic institution',
      'Minimum CGPA score of 3.0 at the time of application',
    ],
    applicationRequirements: [
      'Valid government issued ID card of applicant',
      'School registration details of applicant',
      'Most recent degree certificate of applicant (where applicable)',
      'Current academic transcript of applicant',
      'Facial image of applicant',
    ],
    approvalRequirements: [
      'Aptitude test score of 80% and above',
      'Current academic transcript of applicant',
    ],
    renewalRequirement: ['Annual CGPA score of 3.5 and above'],
    honoraryAwardRequirements: [
      'Final academic graduation with first class honors degree certification',
      'Field specific assessment test score of 80% and above',
    ],
    postCompletionRequirements: [
      'Maintain renewal CGPA benchmark where applicable',
      'Submit academic progress evidence as requested by AfriScience Hub',
    ],
    overallProgramImpact: [
      'Scholarship Funding (Undergraduates – $500 max. & Postgraduates – $700 max. annually)',
      'Improved academic performance',
      'Collaboration opportunities',
      'AfriScience Hub’s first class honorary award',
    ],
    undertaking:
      'I understand the requirements of this program and confirm that I have all the necessary documents and information to complete this application. I also confirm that I meet the program’s eligibility criteria.',
  },
};

export const TITLES = ['Mr.', 'Ms.', 'Mrs.', 'Engr.', 'Dr.', 'Prof.'] as const;

export const ID_CARD_TYPES = [
  'National ID card',
  "Driver’s License",
  'International Passport',
  'Other',
] as const;

export const INDUSTRIES = [
  'Agriculture & AgriTech',
  'Healthcare & Biomedical',
  'Engineering & Manufacturing',
  'ICT & Software',
  'Energy & Environment',
  'Education & EdTech',
  'Food & Nutrition',
  'Other',
] as const;

export const CUSTOMER_BASE_OPTIONS = ['None yet', '< 20', '< 50', '< 100', '> 100'] as const;

export const GROWTH_PROJECTION_OPTIONS = ['+10', '+20', '+30', '+50', '> +50'] as const;

export const FORM_UNDERTAKING =
  'I confirm that all information provided are accurate, that all uploaded documents are valid, and that I accept the terms and conditions of this service.';

export const RESEARCHER_IDENTITIES = ['Academic Researcher', 'Independent Researcher'] as const;

export const ACADEMIC_RESEARCH_LEVELS = [
  'Undergraduate Research',
  'Masters Research',
  'Doctoral Research',
  'Postdoctoral Research',
  'Other',
] as const;

export const INDEPENDENT_RESEARCH_LEVELS = [
  'Basic Research',
  'Intermediate Research',
  'Advanced Research',
  'Other',
] as const;

export const RESEARCH_DURATIONS = ['< 3 months', '< 6 months', '< 1 year', '< 2 years'] as const;

export const RESEARCH_SCOPES = [
  'Solve problem(s) endemic to an African region',
  'Explore an African ecosystem',
  'Discover practical applications of one or more African resource(s)',
  'Contribute to global scientific and technological knowledge',
  'Others',
] as const;

export const TEAM_ROLES = ['Co-researcher', 'Supervisor'] as const;

export const SCHOLARSHIP_LEVELS = ['Undergraduate', 'Postgraduate'] as const;

/** @deprecated use PROGRAM_DETAILS */
export const CAUSE_DETAILS = PROGRAM_DETAILS;
