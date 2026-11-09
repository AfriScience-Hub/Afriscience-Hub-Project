export type PayoutJobStatus = 'Completed' | 'In Progress' | 'Payout Requested' | 'Paid Out';

export interface PayoutJob {
  id: string;
  reference: string;
  jobTitle: string;
  listingName: string;
  listingCategory: 'Scientists & Technologists' | 'Specialist Centers' | 'Institutes' | 'Afro-Innovation';
  clientName: string;
  clientEmail: string;
  price: number;
  platformFee: number;
  total: number;
  startDate: string;
  completedDate: string | null;
  status: PayoutJobStatus;
  escrowNote: string;
}

export const MOCK_PAYOUT_JOBS: PayoutJob[] = [
  {
    id: 'pj-1',
    reference: 'ESC-2026-0101',
    jobTitle: 'Soil Microbiome & Fertility Lab Analysis',
    listingName: 'Dr. Chidi Nnamdi — Soil Scientist',
    listingCategory: 'Scientists & Technologists',
    clientName: 'Amara Farms Cooperative',
    clientEmail: 'procurement@amarafarms.ng',
    price: 450,
    platformFee: 22.5,
    total: 427.5,
    startDate: '2026-10-12',
    completedDate: '2026-10-28',
    status: 'Completed',
    escrowNote: 'Client confirmed job completion. Funds are ready for escrow checkout.',
  },
  {
    id: 'pj-2',
    reference: 'ESC-2026-0102',
    jobTitle: 'Genomic Sequencing & Bioinformatics Report',
    listingName: 'Pan-African Molecular Diagnostics Centre',
    listingCategory: 'Specialist Centers',
    clientName: 'BioHealth Research Lab',
    clientEmail: 'grants@biohealth.org',
    price: 1200,
    platformFee: 60,
    total: 1140,
    startDate: '2026-10-18',
    completedDate: '2026-11-02',
    status: 'Completed',
    escrowNote: 'Deliverables verified by client. Ready for payout.',
  },
  {
    id: 'pj-3',
    reference: 'ESC-2026-0103',
    jobTitle: 'Solar Micro-Grid Feasibility & Sizing Consultation',
    listingName: 'Engr. Kwame Mensah — Renewable Energy',
    listingCategory: 'Scientists & Technologists',
    clientName: 'SunGrid West Africa Ltd',
    clientEmail: 'ops@sungridwa.com',
    price: 800,
    platformFee: 40,
    total: 760,
    startDate: '2026-10-25',
    completedDate: '2026-11-05',
    status: 'Completed',
    escrowNote: 'All milestones completed and approved. Ready for escrow release.',
  },
  {
    id: 'pj-4',
    reference: 'ESC-2026-0104',
    jobTitle: 'Industrial Water Filtration Prototype Testing',
    listingName: 'AquaPure Membrane Unit',
    listingCategory: 'Specialist Centers',
    clientName: 'CleanWater Initiative Kenya',
    clientEmail: 'projects@cleanwater.ke',
    price: 950,
    platformFee: 47.5,
    total: 902.5,
    startDate: '2026-11-01',
    completedDate: null,
    status: 'In Progress',
    escrowNote: 'Payment held in escrow while the service is still being worked on.',
  },
  {
    id: 'pj-5',
    reference: 'ESC-2026-0105',
    jobTitle: 'Clinical Trial Protocol Review & Ethics Advisory',
    listingName: 'Dr. Wanjiku Muthoni — Clinical Researcher',
    listingCategory: 'Scientists & Technologists',
    clientName: 'AfriMed Pharmaceuticals',
    clientEmail: 'clinical@afrimed.co',
    price: 650,
    platformFee: 32.5,
    total: 617.5,
    startDate: '2026-11-04',
    completedDate: null,
    status: 'In Progress',
    escrowNote: 'Payment held in escrow until job completion is confirmed.',
  },
  {
    id: 'pj-6',
    reference: 'ESC-2026-0094',
    jobTitle: 'STEM Curriculum & Laboratory Setup Workshop',
    listingName: 'Lagos Science Academy',
    listingCategory: 'Institutes',
    clientName: 'EduForward Foundation',
    clientEmail: 'programs@eduforward.org',
    price: 600,
    platformFee: 30,
    total: 570,
    startDate: '2026-09-20',
    completedDate: '2026-10-08',
    status: 'Payout Requested',
    escrowNote: 'Checkout notification sent to AfriScience Hub. Processing disbursement.',
  },
  {
    id: 'pj-7',
    reference: 'ESC-2026-0088',
    jobTitle: 'Cassava Bio-Polymer Material Stress Testing',
    listingName: 'EcoPack Bio-Materials Lab',
    listingCategory: 'Specialist Centers',
    clientName: 'GreenPack Industries',
    clientEmail: 'rd@greenpack.com',
    price: 500,
    platformFee: 25,
    total: 475,
    startDate: '2026-09-02',
    completedDate: '2026-09-19',
    status: 'Paid Out',
    escrowNote: 'Escrow funds released and disbursed to your account.',
  },
];

export function formatUsd(amount: number): string {
  return `$${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}
