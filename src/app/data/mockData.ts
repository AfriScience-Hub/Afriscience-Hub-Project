import { 
  Building2, 
  Beaker, 
  Lightbulb, 
  Trophy, 
  GraduationCap, 
  Microscope,
  Stethoscope,
  Code
} from 'lucide-react';

export const CATEGORIES = [
  { id: 'institutes', name: 'Institutes', icon: Building2, path: '/institutes' },
  { id: 'scientists', name: 'Scientists', icon: Beaker, path: '/scientists' },
  { id: 'centers', name: 'Specialist Centers', icon: Microscope, path: '/centers' },
  { id: 'innovations', name: 'Afro-Innovations', icon: Lightbulb, path: '/innovations' },
  { id: 'competitions', name: 'Competitions', icon: Trophy, path: '/competitions' },
];

export const INSTITUTES = [
  {
    id: 'inst-1',
    name: 'Pan-African University of Science',
    motto: 'Knowledge for a Sustainable Future',
    address: 'University Way, Juja',
    type: 'University',
    class: 'University',
    ownership: 'Public',
    gender: 'Mixed',
    status: 'Offline',
    location: 'Nairobi, Kenya',
    country: 'Kenya',
    state: 'Nairobi',
    rating: 4.8,
    reviews: 124,
    views: 12050,
    likes: 3400,
    favorites: 1200,
    shares: 450,
    verified: true,
    bookingsCount: 845,
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1000',
    description: 'Leading research university focusing on sustainable development and technology.',
    services: ['Undergraduate Programs', 'Graduate Research', 'Innovation Hub', 'Conferences', 'Scholarships'],
    scopes: ['Sustainable Energy', 'Biotechnology', 'Data Science'],
    email: 'info@pau-science.org',
    phone: '+254 700 123 456',
    website: 'www.pau-science.org',
    faculties: [
      { name: 'Faculty of Engineering', departments: ['Civil Engineering', 'Electrical Engineering', 'Mechanical Engineering'] },
      { name: 'Faculty of Science', departments: ['Computer Science', 'Physics', 'Mathematics', 'Biology'] },
      { name: 'Faculty of Agriculture', departments: ['Crop Science', 'Animal Science', 'Soil Science'] }
    ],
    programs: {
      'Post-UTME': ['Screening for all candidates scoring 200+'],
      'Pre-Sciences': ['Remedial courses for science students'],
      'Undergraduate': ['B.Sc. Computer Science', 'B.Eng. Civil Engineering'],
      'Graduate': ['M.Sc. Data Science', 'Ph.D. Renewable Energy'],
      'Part-Time': ['Weekend classes for working professionals']
    },
    ranking: [
      { name: 'Times Higher Education Africa', rank: '#5', year: '2023' },
      { name: 'Webometrics', rank: '#12', year: '2023' }
    ],
    tuitionFees: [
      { level: 'Undergraduate', range: '₦50,000 - ₦100,000' },
      { level: 'Graduate', range: '₦100,000 - ₦200,000' },
      { level: 'PhD', range: '₦200,000 - ₦300,000' }
    ],
    otherFees: [
      { item: 'Registration Fee', range: '₦5,000 - ₦10,000' },
      { item: 'Library Fee', range: '₦2,000 - ₦5,000' },
      { item: 'Student Union', range: '₦1,000 - ₦2,000' }
    ],
    curriculum: ['Computer Science', 'Civil Engineering', 'Electrical Engineering', 'Biotechnology', 'Mathematics', 'Physics', 'Chemistry'],
    certifications: [
      { name: 'ISO 9001:2015', issuer: 'International Standards Organization', year: '2019', description: 'Quality Management Systems - Legal Accreditation' },
      { name: 'Chartered University', issuer: 'Commission for University Education', year: '2012', description: 'Full University Charter - Government Approved' }
    ],
    policies: [
      'Students must attend at least 80% of lectures.',
      'Zero tolerance for plagiarism and academic dishonesty.',
      'Respect for diversity and inclusion is mandatory.'
    ],
    awards: [
      { title: 'Best Science University 2023', year: '2023' },
      { title: 'Green Campus Award', year: '2022' }
    ],
    alumni: [
      { name: 'Dr. Jane Doe', role: 'Minister of ICT', impact: 'Led the National Digital Literacy Program affecting 1M+ students.', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200' },
      { name: 'John Smith', role: 'CEO of TechCorp', impact: 'Founded Africa\'s largest fintech unicorn, employing 5000+ youth.', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200' },
      { name: 'Sarah Anyango', role: 'Climate Activist', impact: 'Spearheaded the Green City initiative reducing carbon emissions by 15%.', image: 'https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&q=80&w=200' },
      { name: 'Prof. Ali Hassan', role: 'Medical Researcher', impact: 'Discovered a novel treatment for tropical diseases.', image: 'https://images.unsplash.com/photo-1537511446984-935f663eb1f4?auto=format&fit=crop&q=80&w=200' },
      { name: 'Grace Osei', role: 'EdTech Pioneer', impact: 'Built an e-learning platform serving remote villages.', image: 'https://images.unsplash.com/photo-1598550874175-4d71156852fd?auto=format&fit=crop&q=80&w=200' },
      { name: 'David Kimani', role: 'Agri-Innovator', impact: 'Developed drought-resistant maize distributed to 50k farmers.', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200' },
      { name: 'Fatima Bello', role: 'Architect', impact: 'Designed the award-winning sustainable city center.', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200' },
      { name: 'Emmanuel Eze', role: 'Clean Energy Expert', impact: 'Implemented solar grids in 100 off-grid communities.', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200' },
      { name: 'Chinwe Okeke', role: 'Robotics Engineer', impact: 'Created low-cost robotics kits for STEM education.', image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=200' },
      { name: 'Samuel Tunde', role: 'Policy Advisor', impact: 'Drafted the Continental Free Trade Tech Protocol.', image: 'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?auto=format&fit=crop&q=80&w=200' }
    ],
    testimonials: [
      { user: 'Alice Wambui', role: 'Student', content: 'PAU changed my life. The facilities are world-class.', rating: 5 },
      { user: 'Michael Otieno', role: 'Parent', content: 'Great environment for learning.', rating: 4 }
    ],
    gallery: {
      frontGate: ['https://images.unsplash.com/photo-1733603676238-2a8048edfb0b?auto=format&fit=crop&q=80&w=800'],
      compound: ['https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&q=80&w=800'],
      classrooms: ['https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&q=80&w=800'],
      playground: ['https://images.unsplash.com/photo-1710000736115-692bbb897fca?auto=format&fit=crop&q=80&w=800'],
      halls: ['https://images.unsplash.com/photo-1758413350815-7b06dbbfb9a7?auto=format&fit=crop&q=80&w=800'],
      convenience: ['https://images.unsplash.com/photo-1632727107654-a910b6fb2fb9?auto=format&fit=crop&q=80&w=800'],
      laboratories: ['https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=800'],
      libraries: ['https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&q=80&w=800'],
      offices: ['https://images.unsplash.com/photo-1662455928125-eebc38b5607d?auto=format&fit=crop&q=80&w=800'],
      others: ['https://images.unsplash.com/photo-1590579491624-f98f36d4c763?auto=format&fit=crop&q=80&w=800', 'mock_video_tour.mp4']
    }
  },
  {
    id: 'inst-2',
    name: 'Lagos High School of Science & Tech',
    motto: 'Excellence in Technology and Character',
    address: '123 Victoria Island Way',
    type: 'Secondary School',
    class: 'Secondary',
    ownership: 'Private',
    gender: 'Mixed',
    status: 'Online',
    location: 'Lagos, Nigeria',
    country: 'Nigeria',
    state: 'Lagos',
    rating: 4.8,
    reviews: 156,
    views: 12500,
    likes: 4200,
    favorites: 1890,
    shares: 820,
    verified: true,
    bookingsCount: 845,
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1000',
    description: 'Lagos High School of Science & Tech is a premier secondary institution with a focus on STEM education, robotics, and future-ready skills. We nurture the next generation of African innovators through hands-on learning and character development.',
    services: ['Secondary Education', 'Robotics Club', 'Coding Bootcamp', 'Competitions', 'Science Clubs', 'Virtual Reality Lab', 'Drones Program'],
    scopes: ['Junior Secondary', 'Senior Secondary', 'Pre-University'],
    email: 'admissions@lagoshigh.ng',
    phone: '+234 800 987 654',
    website: 'www.lagoshigh.ng',
    tuitionFees: [
      { level: 'JSS 1-3', range: '₦150,000 - ₦250,000' },
      { level: 'SS 1-3', range: '₦250,000 - ₦400,000' }
    ],
    otherFees: [
      { item: 'Enrollment Fee', range: '₦50,000 - ₦75,000' },
      { item: 'Tech & Lab Fee', range: '₦30,000 - ₦50,000' },
      { item: 'Uniform & Sports Gear', range: '₦25,000 - ₦40,000' }
    ],
    curriculum: ['Advanced Mathematics', 'Applied Physics', 'Organic Chemistry', 'Molecular Biology', 'Computer Programming', 'Robotics & Automation', 'AI Ethics', 'Entrepreneurship'],
    certifications: [
        { name: 'WAEC Approved', issuer: 'West African Examination Council', year: '2010', description: 'Fully accredited centre for West African Senior School Certificate Examination.' },
        { name: 'Microsoft Showcase School', issuer: 'Microsoft Education', year: '2021', description: 'Recognized for excellence in digital transformation and technology integration.' },
        { name: 'British Council Partner', issuer: 'British Council', year: '2018', description: 'Affiliated for international exchange programs and Cambridge curriculum support.' }
    ],
    policies: [
      'Strict adherence to the STEM-first curriculum.',
      'Mandatory participation in at least one annual innovation competition.',
      'Digitized learning environment: Students must utilize the platform for all assignments.'
    ],
    awards: [
        { title: 'Best Robotics Team 2022', year: '2022' },
        { title: 'National Code Challenge Winner', year: '2023' },
        { title: 'African STEM Excellence Award', year: '2024' }
    ],
    alumni: [
        { name: 'Tunde Bakare', role: 'Software Engineer at Google', impact: 'Built a translation app for 5 Nigerian languages affecting 10M+ speakers.', image: 'https://images.unsplash.com/photo-1689857538296-b6e1a392a91d?auto=format&fit=crop&q=80&w=200' },
        { name: 'Amara Nnaji', role: 'Biotech Researcher', impact: 'Developed a low-cost malaria testing kit used in 500+ rural clinics.', image: 'https://images.unsplash.com/photo-1735028254397-6dbac5b3fc8d?auto=format&fit=crop&q=80&w=200' },
        { name: 'Chioma Okonjo', role: 'Fintech Founder', impact: 'Founded "PayEasy", serving 2M+ African small businesses.', image: 'https://images.unsplash.com/photo-1739300293504-234817eead52?auto=format&fit=crop&q=80&w=200' }
    ],
    testimonials: [
        { user: 'Mr. & Mrs. Adebayo', role: 'Parents', content: 'The robotics program here is unmatched. Our son is already building drones and competing at national levels!', rating: 5 },
        { user: 'Chinedu I.', role: 'Alumni (Class of 2018)', content: 'Lagos High gave me the foundation I needed to excel at MIT. The tech exposure is world-class.', rating: 5 },
        { user: 'Sarah K.', role: 'Senior Student', content: 'I love the VR lab and the AI ethics classes. Science is taught with a future-focus here.', rating: 5 }
    ],
    gallery: {
      frontGate: ['https://images.unsplash.com/photo-1579651745194-ff4b0f1580d0?auto=format&fit=crop&q=80&w=800'],
      compound: ['https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&q=80&w=800'],
      classrooms: ['https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800', 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=800'],
      laboratories: ['https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=800', 'https://images.unsplash.com/photo-1581093458791-9f302e6d862e?auto=format&fit=crop&q=80&w=800'],
      playground: ['https://images.unsplash.com/photo-1742129118964-2fb99c751cf3?auto=format&fit=crop&q=80&w=800'],
      others: ['https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800', 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=800']
    }
  },
  {
    id: 'inst-3',
    name: 'Cape Town Science Academy',
    motto: 'Discovering the Future',
    address: '45 Table Mountain Rd',
    type: 'Primary School',
    class: 'Primary',
    ownership: 'Private',
    gender: 'Mixed',
    status: 'Offline',
    location: 'Cape Town, South Africa',
    country: 'South Africa',
    state: 'Western Cape',
    rating: 4.7,
    reviews: 56,
    views: 6200,
    likes: 1500,
    favorites: 600,
    shares: 180,
    verified: true,
    bookingsCount: 150,
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=1000',
    description: 'Nurturing young minds through hands-on science experiments and discovery.',
    services: ['Primary Education', 'Science Fairs', 'Math Olympiad Training', 'Excursions', 'Health Programs'],
    scopes: ['Lower Primary', 'Upper Primary'],
    email: 'contact@ctscienceacademy.za',
    phone: '+27 21 555 0123',
    website: 'www.ctscienceacademy.za',
    tuitionFees: [
      { level: 'Grade 1-3', range: 'R 2,000 - R 3,000' },
      { level: 'Grade 4-7', range: 'R 3,000 - R 4,500' }
    ],
    otherFees: [
      { item: 'Excursion Fee', range: 'R 500 - R 1,000' }
    ],
    curriculum: ['Mathematics', 'Science', 'English', 'Afrikaans', 'Geography', 'History'],
    certifications: [],
    policies: [],
    awards: [],
    alumni: [],
    testimonials: [],
    gallery: {
      classrooms: ['https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=800']
    }
  },
  {
    id: 'inst-4',
    name: 'St. Mary\'s Girls Academy',
    motto: 'Virtue and Knowledge',
    address: 'Independence Avenue',
    type: 'Secondary School',
    class: 'Secondary',
    ownership: 'Mission',
    gender: 'Female',
    status: 'Offline',
    location: 'Accra, Ghana',
    country: 'Ghana',
    state: 'Greater Accra',
    rating: 4.6,
    reviews: 112,
    views: 9300,
    likes: 2800,
    favorites: 950,
    shares: 410,
    verified: true,
    bookingsCount: 410,
    image: 'https://images.unsplash.com/photo-1594608661623-aa0bd3a69d98?auto=format&fit=crop&q=80&w=1000',
    description: 'Empowering young women through excellence in education and moral values.',
    services: ['Secondary Education', 'Boarding Facilities', 'Choir', 'Sports', 'Reunions'],
    scopes: ['High School', 'Vocational Training'],
    email: 'info@stmarysgirls.gh',
    phone: '+233 24 123 4567',
    website: 'www.stmarysgirls.gh',
    tuitionFees: [],
    otherFees: [],
    curriculum: [],
    certifications: [],
    policies: [],
    awards: [],
    alumni: [],
    testimonials: [],
    gallery: {}
  },
  {
    id: 'inst-5',
    name: 'Cairo International School',
    motto: 'Global Citizens, Local Roots',
    address: 'New Cairo City',
    type: 'Secondary School',
    class: 'Secondary',
    ownership: 'International',
    gender: 'Mixed',
    status: 'Online',
    location: 'Cairo, Egypt',
    country: 'Egypt',
    state: 'Cairo',
    rating: 4.9,
    reviews: 205,
    views: 15400,
    likes: 4100,
    favorites: 1800,
    shares: 720,
    verified: true,
    bookingsCount: 950,
    image: 'https://images.unsplash.com/photo-1544531696-608b6348c3b7?auto=format&fit=crop&q=80&w=1000',
    description: 'Offering a world-class international curriculum with a strong focus on digital learning.',
    services: ['International Baccalaureate', 'Online Learning', 'Language Courses', 'Extra Lessons', 'PTA Meetings'],
    scopes: ['IB Diploma', 'IGCSE'],
    email: 'admissions@cis.eg',
    phone: '+20 2 1234 5678',
    website: 'www.cis.eg',
    tuitionFees: [],
    otherFees: [],
    curriculum: [],
    certifications: [],
    policies: [],
    awards: [],
    alumni: [],
    testimonials: [],
    gallery: {}
  },
  {
    id: 'inst-6',
    name: 'Kigali Boys High',
    motto: 'Strength in Unity',
    address: 'Kigali Heights Rd',
    type: 'Secondary School',
    class: 'Secondary',
    ownership: 'Government | Public',
    gender: 'Male',
    status: 'Offline',
    location: 'Kigali, Rwanda',
    country: 'Rwanda',
    state: 'Kigali City',
    rating: 4.4,
    reviews: 78,
    views: 7100,
    likes: 1800,
    favorites: 550,
    shares: 200,
    verified: false,
    bookingsCount: 220,
    image: 'https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&q=80&w=1000',
    description: 'A historic institution dedicated to academic and athletic excellence.',
    services: ['Secondary Education', 'Rugby Team', 'Cadet Corps', 'Exercises & Sports', 'Teaching & Learning'],
    scopes: ['Secondary'],
    email: 'admin@kigaliboys.rw',
    phone: '+250 78 123 4567',
    website: 'www.kigaliboys.rw',
    tuitionFees: [],
    otherFees: [],
    curriculum: [],
    certifications: [],
    policies: [],
    awards: [],
    alumni: [],
    testimonials: [],
    gallery: {}
  }
];

export const SCIENTIST_FIELDS = [
  'Medical', 'Engineering', 'Pharmaceutical', 'Computer & ICT', 'Hybrid', 
  'Veterinary', 'Agriculture', 'Food & Nutrition', 'Physics', 'Chemistry', 
  'Biology', 'Environmental', 'Industry & Manufacturing', 'Energy & Power', 
  'Waste & Recycling', 'Astronomy & Space'
];

export const SCIENTIST_DEGREES = [
  'Field Experts | No Degrees', 'Associate', 'Bachelors', 'Diplomas', 'Masters', 'Doctoral', 'Others'
];

export const SCIENTIST_SERVICES = [
  'Architecture & Framework Design', 'Building & Construction', 'Consultancy', 
  'Content Creation', 'Education & Training', 'Entrepreneurship & Business', 
  'Fabrication & Installation', 'Fieldwork', 'Job Applicant', 
  'Lab Analysis & Equipment Expert', 'Modeling & Simulation', 
  'Project Management', 'Repairs & Maintenance', 'Research & Development', 
  'Writing & Documentations', 'Others'
];

export const SCIENTISTS = [
  {
    id: 'sci-1',
    name: 'Dr. Amara Okafor',
    title: 'Pharmaceutical Scientist',
    degrees: ['Doctoral', 'Masters'],
    professions: ['Clinical Pharmacologist', 'Drug Discovery Scientist', 'Toxicologist'],
    field: 'Pharmaceutical',
    location: 'Lagos, Nigeria',
    country: 'Nigeria',
    state: 'Lagos',
    rating: 4.9,
    reviews: 142,
    views: 5200,
    likes: 1800,
    favorites: 650,
    shares: 210,
    verified: true,
    bookingsCount: 340,
    status: 'Online',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=1000',
    bio: 'Dedicated Clinical Pharmacologist with over 12 years of experience in drug discovery and toxicology. Passionate about developing affordable medicines for tropical diseases and mentoring the next generation of African scientists.',
    services: ['Research & Development', 'Consultancy', 'Education & Training', 'Lab Analysis & Equipment Expert'],
    scopes: ['Herbal Medicine Analysis', 'Clinical Trials Supervision'],
    serviceCost: [
      { service: 'Consultancy', range: '₦100,000 - ₦150,000' },
      { service: 'Research & Development', range: '₦500,000 - ₦1,000,000' },
      { service: 'Education & Training', range: '₦150,000 - ₦200,000' }
    ],
    certifications: [
      { name: 'PhD in Pharmacology', issuer: 'University of Lagos', year: '2015' },
      { name: 'Certified Clinical Research Professional', issuer: 'ACRP', year: '2018' }
    ],
    policies: [
      'All consultations must be booked 48 hours in advance.',
      'Research data remains confidential property of the client.',
      '50% deposit required for project initiation.'
    ],
    achievements: [
      { title: 'Best Researcher Award 2022', description: 'Awarded by the Nigerian Academy of Science for breakthrough in malaria treatment.' },
      { title: 'Published 20+ Papers', description: 'Author of numerous peer-reviewed articles in international journals.' }
    ],
    testimonials: [
      { user: 'Pharm. Emeka Obi', role: 'Colleague', content: 'Dr. Amara is a brilliant mind. Her insights saved our project months of work.', rating: 5 },
      { user: 'Sarah Johnson', role: 'Student', content: 'Her mentorship program helped me secure my masters scholarship abroad.', rating: 5 }
    ],
    availability: { workDays: 'Monday - Friday', time: '9:00 AM - 5:00 PM (WAT)' },
    contact: {
      phone: '+234 800 123 4567',
      email: 'amara.okafor@sciencehub.ng',
      website: 'www.amaraokafor.com',
      linkedin: 'linkedin.com/in/amaraokafor',
      twitter: '@dramara'
    }
  },
  {
    id: 'sci-2',
    name: 'Engr. David Nkosi',
    title: 'Civil Engineer',
    degrees: ['Bachelors', 'Masters'],
    professions: ['Structural Engineer', 'Project Manager'],
    field: 'Engineering',
    location: 'Johannesburg, South Africa',
    country: 'South Africa',
    state: 'Gauteng',
    rating: 4.7,
    reviews: 89,
    views: 4100,
    likes: 1200,
    favorites: 400,
    shares: 150,
    verified: true,
    bookingsCount: 120,
    status: 'Offline',
    image: 'https://images.unsplash.com/photo-1537511446984-935f663eb1f4?auto=format&fit=crop&q=80&w=1000',
    bio: 'Structural Engineer specializing in sustainable urban infrastructure. Expert in low-cost housing projects and green building materials.',
    services: ['Building & Construction', 'Project Management', 'Modeling & Simulation', 'Consultancy'],
    scopes: ['Green Building Certification', 'Structural Integrity Assessment'],
    serviceCost: [
      { service: 'Building & Construction', range: 'R 50,000 - R 100,000' },
      { service: 'Consultancy', range: 'R 5,000 - R 10,000' },
      { service: 'Project Management', range: 'R 20,000 - R 40,000' }
    ],
    certifications: [
      { name: 'MSc Civil Engineering', issuer: 'University of Cape Town', year: '2012' },
      { name: 'Registered Professional Engineer', issuer: 'ECSA', year: '2014' }
    ],
    policies: [
      'Site visits require a preliminary safety assessment.',
      'Consultation fees are non-refundable after service delivery.'
    ],
    achievements: [
      { title: 'Sustainable City Award', description: 'Recognized for the design of the Soweto Green Housing Project.' }
    ],
    testimonials: [
      { user: 'BuildRight Contractors', role: 'Client', content: 'David\'s designs are both innovative and structurally sound. A pleasure to work with.', rating: 5 }
    ],
    availability: { workDays: 'Monday - Friday', time: '8:00 AM - 4:00 PM (SAST)' },
    contact: {
      phone: '+27 72 123 4567',
      email: 'david.nkosi@engprojects.co.za',
      website: 'www.nkosiengineering.co.za',
      linkedin: 'linkedin.com/in/davidnkosi'
    }
  },
  {
    id: 'sci-3',
    name: 'Sarah Mensah',
    title: 'Data Scientist & AI Expert',
    degrees: ['Bachelors'],
    professions: ['Data Analyst', 'Machine Learning Engineer'],
    field: 'Computer & ICT',
    location: 'Accra, Ghana',
    country: 'Ghana',
    state: 'Greater Accra',
    rating: 5.0,
    reviews: 56,
    views: 3200,
    likes: 980,
    favorites: 320,
    shares: 90,
    verified: false,
    bookingsCount: 85,
    status: 'Online',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=1000',
    bio: 'Passionate about leveraging Artificial Intelligence to solve real-world problems in agriculture and logistics. Skilled in Python, R, and TensorFlow.',
    services: ['Modeling & Simulation', 'Research & Development', 'Education & Training', 'Content Creation'],
    scopes: ['AI Model Training', 'Data Visualization Dashboards'],
    serviceCost: [
      { service: 'Modeling & Simulation', range: '₵ 2,000 - ₵ 5,000' },
      { service: 'Education & Training', range: '₵ 500 - ₵ 1,000' }
    ],
    certifications: [
      { name: 'BSc Computer Science', issuer: 'Ashesi University', year: '2020' },
      { name: 'TensorFlow Developer Certificate', issuer: 'Google', year: '2021' }
    ],
    policies: [
      'Data privacy agreement must be signed before sharing datasets.',
      'Remote work preferred.'
    ],
    achievements: [
      { title: 'Hackathon Winner', description: 'Won the 2021 Accra AI Hackathon for a crop disease detection app.' }
    ],
    testimonials: [
      { user: 'AgriTech Startups', role: 'Client', content: 'Sarah\'s models improved our yield predictions by 20%.', rating: 5 }
    ],
    availability: { workDays: 'Monday - Saturday', time: '10:00 AM - 6:00 PM (GMT)' },
    contact: {
      phone: '+233 50 123 4567',
      email: 'sarah.mensah@datahub.gh',
      website: 'www.sarahmensah.dev',
      twitter: '@sarahcodes'
    }
  },
  {
    id: 'sci-4',
    name: 'Dr. Ahmed Ibrahim',
    title: 'Veterinary Surgeon',
    degrees: ['Doctoral'],
    professions: ['Veterinary Surgeon', 'Animal Nutritionist'],
    field: 'Veterinary',
    location: 'Cairo, Egypt',
    country: 'Egypt',
    state: 'Cairo',
    rating: 4.6,
    reviews: 72,
    views: 4500,
    likes: 1100,
    favorites: 380,
    shares: 110,
    verified: true,
    bookingsCount: 210,
    status: 'Online',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=1000',
    bio: 'Experienced veterinarian with a focus on livestock health and production. Helping farmers maximize productivity through better animal care.',
    services: ['Fieldwork', 'Consultancy', 'Repairs & Maintenance', 'Entrepreneurship & Business'],
    scopes: ['Livestock Surgery', 'Farm Management Strategy'],
    serviceCost: [
      { service: 'Fieldwork', range: 'EGP 1,000 - EGP 2,000' },
      { service: 'Consultancy', range: 'EGP 500 - EGP 1,000' }
    ],
    certifications: [
      { name: 'DVM (Doctor of Veterinary Medicine)', issuer: 'Cairo University', year: '2010' }
    ],
    policies: [
      'Emergency services available 24/7.',
      'Travel fees apply for locations outside Cairo.'
    ],
    achievements: [
      { title: 'Vet of the Year Nominee', description: 'Nominated for exceptional service to the farming community.' }
    ],
    testimonials: [
      { user: 'Nile Dairy Farms', role: 'Client', content: 'Dr. Ahmed helped us control a major outbreak. Highly recommended.', rating: 5 }
    ],
    availability: { workDays: 'Sunday - Thursday', time: '8:00 AM - 3:00 PM (EET)' },
    contact: {
      phone: '+20 10 1234 5678',
      email: 'ahmed.vet@cairoanimals.eg',
      website: 'www.drahmedvet.eg'
    }
  }
];

export const AFRICAN_COUNTRIES = [
  'Algeria','Angola','Benin','Botswana','Burkina Faso','Burundi','Cabo Verde','Cameroon',
  'Central African Republic','Chad','Comoros','Congo','DR Congo','Djibouti','Egypt',
  'Equatorial Guinea','Eritrea','Eswatini','Ethiopia','Gabon','Gambia','Ghana','Guinea',
  'Guinea-Bissau','Ivory Coast','Kenya','Lesotho','Liberia','Libya','Madagascar','Malawi',
  'Mali','Mauritania','Mauritius','Morocco','Mozambique','Namibia','Niger','Nigeria','Rwanda',
  'São Tomé and Príncipe','Senegal','Seychelles','Sierra Leone','Somalia','South Africa',
  'South Sudan','Sudan','Tanzania','Togo','Tunisia','Uganda','Zambia','Zimbabwe'
];

export const INNOVATION_FIELDS = [
  'Hybrid','Medical','Engineering','Pharmaceutical','Computer & ICT','Veterinary',
  'Agriculture','Food & Nutrition','Mathematics & Statistics','Physics','Chemistry',
  'Biology','Environmental','Industrial & Manufacturing','Energy & Power',
  'Waste & Recycling','Astronomy & Space'
];

export const INNOVATION_STAGES = [
  'Ideation','Research & Development','Prototype','MVP','Scale-Up','Commercialization'
];

export const INNOVATION_INTERESTS = [
  'Investment | Partnership','Purchase | Trade','Marketing','Training | Mentorship','Sensitization'
];

export const INNOVATION_INTERESTS_EMOJI: Record<string, { emoji: string; label: string }> = {
  'Investment | Partnership': { emoji: '\u{1F91D}', label: 'Investment | Partnership' },
  'Purchase | Trade': { emoji: '\u{1F6D2}', label: 'Purchase | Trade' },
  'Marketing': { emoji: '\u{1F4CA}', label: 'Marketing' },
  'Training | Mentorship': { emoji: '\u{1F393}', label: 'Training | Mentorship' },
  'Sensitization': { emoji: '\u{1F5E3}', label: 'Sensitization' }
};

export const INNOVATION_OWNERSHIP = [
  'Private','Government | Public','Academic','Mission','Corporate','Inter-Government','NGO | Charity','Other'
];

export const INNOVATION_SDGS = [
  'No Poverty','Zero Hunger','Good Health & Well-Being','Quality Education','Gender Equality',
  'Clean Water & Sanitation','Affordable & Clean Energy','Decent Work & Economic Growth',
  'Industry, Innovation & Infrastructure','Reduced Inequalities','Sustainable Cities & Communities',
  'Responsible Consumption & Production','Climate Action','Life Below Water','Life on Land',
  'Peace, Justice & Strong Institutions','Partnerships for the Goals'
];

export const INNOVATION_USER_GROUPS = [
  'Children','Adolescents/Teens','Adults','Elderly','Homes','Businesses','Schools','Outdoor',
  'Healthcare','Funeral','Pets','Relationships','Beauty/Aesthetics','Males','Females',
  'Religion','Law & Enforcement','Culinary','Students'
];

export interface Innovation {
  id: string;
  name: string;
  idTag: string;
  field: string;
  interests: string[];
  ownership: string;
  stage: string;
  sdgs: string[];
  image: string;
  status: 'Online' | 'Offline';
  country: string;
  state: string;
  location: string;
  description: string;
  dimensions: { length: string; width: string; height: string; weight: string };
  userGroups: string[];
  applicationsImpact: string;
  specifications: { materials: string[]; dimensions: string; weight: string };
  licensesCertifications: { name: string; issuer: string; year: number }[];
  recommendations: string[];
  cautions: string[];
  honoraryAwards: { title: string; year: number; organization: string; image: string }[];
  mediaGallery: { category: string; items: { type: 'image' | 'video'; url: string; caption: string }[] }[];
  views: number;
  likes: number;
  favorites: number;
  shares: number;
  creator: string;
  creatorImage: string;
  creatorBio: string;
  creatorSpecializations: string[];
  creatorExperience: string;
  creatorAffiliation: string;
}

export const INNOVATIONS: Innovation[] = [
  {
    id: 'inn-1',
    name: 'SolaPump Pro',
    idTag: 'AFI-NG-2024-0001',
    field: 'Energy & Power',
    interests: ['Investment | Partnership', 'Purchase | Trade', 'Marketing'],
    ownership: 'Private',
    stage: 'Scale-Up',
    sdgs: ['Affordable & Clean Energy', 'Zero Hunger', 'Climate Action'],
    image: 'https://images.unsplash.com/photo-1671917057421-677f9cd99721?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwc29sYXIlMjBlbmVyZ3klMjBpbm5vdmF0aW9uJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NzIzODMxMzl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    status: 'Online',
    country: 'Nigeria',
    state: 'Lagos',
    location: 'Lagos, Nigeria',
    description: 'SolaPump Pro is an automated, solar-powered water pumping and irrigation system designed specifically for smallholder farmers across sub-Saharan Africa. The device uses a 400W monocrystalline solar panel coupled with a brushless DC submersible pump capable of delivering 5,000 litres per hour from boreholes up to 80m deep.',
    dimensions: { length: '120cm', width: '80cm', height: '150cm', weight: '45kg' },
    userGroups: ['Adults', 'Businesses', 'Outdoor', 'Schools', 'Homes'],
    applicationsImpact: 'Deployed across 12 Nigerian states benefiting over 8,000 farming households. Increased crop yields by 40% on average and reduced water consumption per hectare by 55%.',
    specifications: { materials: ['Aluminium alloy frame', 'Monocrystalline silicon PV cells', 'Stainless steel pump impeller', 'HDPE piping'], dimensions: '120 x 80 x 150 cm', weight: '45 kg' },
    licensesCertifications: [
      { name: 'SON Product Certification', issuer: 'Standards Organisation of Nigeria', year: 2023 },
      { name: 'NAFDAC Technical Approval', issuer: 'NAFDAC', year: 2023 }
    ],
    recommendations: ['Ideal for farms up to 5 hectares', 'Best performance with direct sunlight >= 6hrs/day', 'Compatible with drip and sprinkler systems'],
    cautions: ['Not suitable for saltwater environments', 'Requires professional installation for borehole depths > 50m', 'Panel must be secured against high winds'],
    honoraryAwards: [
      { title: 'Best AgriTech Innovation 2023', year: 2023, organization: 'Africa Innovation Summit', image: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&q=80&w=200' },
      { title: 'Green Energy Pioneer Award', year: 2024, organization: 'ECOWAS Energy Council', image: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&q=80&w=200' }
    ],
    mediaGallery: [
      { category: 'Working Materials', items: [
        { type: 'image', url: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=800', caption: 'Solar panel assembly components' },
        { type: 'image', url: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=800', caption: 'Pump mechanism parts' }
      ]},
      { category: 'Work-in-Progress', items: [
        { type: 'image', url: 'https://images.unsplash.com/photo-1611365892117-00ac6fb24675?auto=format&fit=crop&q=80&w=800', caption: 'Assembly stage in workshop' }
      ]},
      { category: 'Finished Work', items: [
        { type: 'image', url: 'https://images.unsplash.com/photo-1671917057421-677f9cd99721?auto=format&fit=crop&q=80&w=800', caption: 'Deployed unit on farmland' }
      ]}
    ],
    views: 34200,
    likes: 4850,
    favorites: 1230,
    shares: 890,
    creator: 'Engr. Chidi Okonkwo',
    creatorImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    creatorBio: 'Engr. Chidi Okonkwo is a mechanical engineer and renewable energy specialist with over 15 years of experience designing solar-powered agricultural solutions across West Africa. His passion lies in bridging the gap between modern technology and rural farming communities, enabling sustainable food production through affordable innovation.',
    creatorSpecializations: ['Renewable Energy', 'Mechanical Engineering', 'Agricultural Technology'],
    creatorExperience: '15+ years in solar energy and agricultural engineering',
    creatorAffiliation: 'Nigerian Institute of Mechanical Engineers (NIMechE)'
  },
  {
    id: 'inn-2',
    name: 'MalariaScope AI',
    idTag: 'AFI-KE-2024-0002',
    field: 'Medical',
    interests: ['Investment | Partnership', 'Training | Mentorship', 'Sensitization'],
    ownership: 'Academic',
    stage: 'MVP',
    sdgs: ['Good Health & Well-Being', 'Industry, Innovation & Infrastructure', 'Partnerships for the Goals'],
    image: 'https://images.unsplash.com/photo-1717934444759-41d4794edcca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBoZWFsdGglMjB0ZWNobm9sb2d5JTIwYWZyaWNhfGVufDF8fHx8MTc3MjI4MjA4MXww&ixlib=rb-4.1.0&q=80&w=1080',
    status: 'Online',
    country: 'Kenya',
    state: 'Nairobi',
    location: 'Nairobi, Kenya',
    description: 'MalariaScope AI is a smartphone-attachable microscope lens with an AI-powered mobile application that can identify Plasmodium parasites in blood smear samples within 90 seconds. Achieves 97.3% sensitivity and 98.1% specificity.',
    dimensions: { length: '8cm', width: '4cm', height: '3cm', weight: '0.12kg' },
    userGroups: ['Healthcare', 'Adults', 'Children', 'Outdoor', 'Schools'],
    applicationsImpact: 'Piloted in 45 rural health posts across Kenya and Uganda. Reduced malaria diagnosis turnaround from 2 hours to under 2 minutes. Contributed to a 28% increase in early treatment rates.',
    specifications: { materials: ['Optical-grade glass lens', 'ABS plastic housing', 'Silicone universal phone clip', 'Stainless steel focus ring'], dimensions: '8 x 4 x 3 cm', weight: '0.12 kg' },
    licensesCertifications: [
      { name: 'Kenya Bureau of Standards Mark', issuer: 'KEBS', year: 2024 },
      { name: 'WHO Prequalification (pending)', issuer: 'World Health Organization', year: 2025 }
    ],
    recommendations: ['Best used with Giemsa-stained thin blood smears', 'Compatible with Android 10+ and iOS 15+', 'Optimal performance under controlled indoor lighting'],
    cautions: ['Not a replacement for PCR-based confirmation', 'Lens requires cleaning after every 20 uses', 'AI accuracy may vary for mixed-species infections'],
    honoraryAwards: [
      { title: 'Africa Health Innovation of the Year', year: 2024, organization: 'Africa CDC', image: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&q=80&w=200' }
    ],
    mediaGallery: [
      { category: 'Working Materials', items: [
        { type: 'image', url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800', caption: 'Lens and clip-on assembly' }
      ]},
      { category: 'Finished Work', items: [
        { type: 'image', url: 'https://images.unsplash.com/photo-1717934444759-41d4794edcca?auto=format&fit=crop&q=80&w=800', caption: 'Field deployment with CHW' }
      ]}
    ],
    views: 28700,
    likes: 3920,
    favorites: 980,
    shares: 1540,
    creator: 'Dr. Wanjiku Muthoni',
    creatorImage: 'https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&q=80&w=200',
    creatorBio: 'Dr. Wanjiku Muthoni is a water purification scientist and environmental health researcher based in Nairobi. She holds a PhD in Environmental Chemistry from the University of Nairobi and has dedicated her career to developing affordable clean water solutions for underserved communities across East Africa.',
    creatorSpecializations: ['Water Purification', 'Environmental Chemistry', 'Public Health'],
    creatorExperience: '12 years in water treatment and environmental science',
    creatorAffiliation: 'University of Nairobi, Dept. of Chemistry'
  },
  {
    id: 'inn-3',
    name: 'EcoBrick Builder',
    idTag: 'AFI-GH-2023-0003',
    field: 'Environmental',
    interests: ['Purchase | Trade', 'Investment | Partnership', 'Marketing'],
    ownership: 'Corporate',
    stage: 'Commercialization',
    sdgs: ['Sustainable Cities & Communities', 'Climate Action', 'Responsible Consumption & Production'],
    image: 'https://images.unsplash.com/photo-1638449856837-84e7e7bfd7a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWN5Y2xlZCUyMHBsYXN0aWMlMjBidWlsZGluZyUyMG1hdGVyaWFsc3xlbnwxfHx8fDE3NzIzODMxNDB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    status: 'Online',
    country: 'Ghana',
    state: 'Greater Accra',
    location: 'Accra, Ghana',
    description: 'EcoBrick Builder is a portable hydraulic press machine that converts shredded plastic waste into interlocking construction bricks. Each brick is 5x stronger than traditional cement blocks, waterproof, and 40% lighter.',
    dimensions: { length: '200cm', width: '100cm', height: '180cm', weight: '350kg' },
    userGroups: ['Businesses', 'Adults', 'Homes', 'Schools', 'Outdoor'],
    applicationsImpact: 'Diverted over 2,000 tonnes of plastic waste from landfills in Accra. Built 45 affordable housing units and 12 school classrooms. Created over 300 direct jobs.',
    specifications: { materials: ['Hydraulic steel press', 'Industrial shredder blades', 'Recycled HDPE/LDPE plastic', 'River sand filler'], dimensions: '200 x 100 x 180 cm', weight: '350 kg' },
    licensesCertifications: [
      { name: 'Ghana Standards Authority Certification', issuer: 'GSA', year: 2023 },
      { name: 'ISO 9001:2015', issuer: 'ISO', year: 2023 }
    ],
    recommendations: ['Best with sorted, clean plastic waste feedstock', 'Standard interlocking bricks for load-bearing walls', 'Machine requires 3-phase power supply (380V)'],
    cautions: ['Heavy machinery - requires trained operators', 'Not designed for PVC or composite plastics', 'Bricks must cure for 48 hours before use'],
    honoraryAwards: [
      { title: 'UNEP Green Innovation Award', year: 2023, organization: 'United Nations Environment Programme', image: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&q=80&w=200' }
    ],
    mediaGallery: [
      { category: 'Working Materials', items: [
        { type: 'image', url: 'https://images.unsplash.com/photo-1638449856837-84e7e7bfd7a9?auto=format&fit=crop&q=80&w=800', caption: 'Plastic feedstock preparation' }
      ]},
      { category: 'Finished Work', items: [
        { type: 'image', url: 'https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?auto=format&fit=crop&q=80&w=800', caption: 'Finished interlocking bricks' }
      ]}
    ],
    views: 41300,
    likes: 5200,
    favorites: 1540,
    shares: 2100,
    creator: 'Kwame Asante',
    creatorImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200',
    creatorBio: 'Kwame Asante is a Ghanaian social entrepreneur and materials scientist who pioneered the use of recycled plastic waste in construction. His work has transformed waste management practices in Accra while creating affordable building materials for low-income housing projects across Ghana and neighboring countries.',
    creatorSpecializations: ['Materials Science', 'Waste Management', 'Sustainable Construction'],
    creatorExperience: '10 years in recycling technology and sustainable building',
    creatorAffiliation: 'Ghana Green Building Council'
  },
  {
    id: 'inn-4',
    name: 'AgroDrone Mapper',
    idTag: 'AFI-RW-2024-0004',
    field: 'Agriculture',
    interests: ['Investment | Partnership', 'Training | Mentorship', 'Purchase | Trade'],
    ownership: 'Private',
    stage: 'MVP',
    sdgs: ['Zero Hunger', 'Industry, Innovation & Infrastructure', 'Climate Action'],
    image: 'https://images.unsplash.com/photo-1677126577258-1a82fdf1a976?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwYWdyaWN1bHR1cmUlMjBkcm9uZSUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzcyMzgzMTQxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    status: 'Online',
    country: 'Rwanda',
    state: 'Kigali',
    location: 'Kigali, Rwanda',
    description: 'AgroDrone Mapper is a precision agriculture drone system with multispectral and thermal imaging cameras for crop health monitoring, pest detection, and yield estimation. 45-minute flight time covering up to 200 hectares.',
    dimensions: { length: '90cm', width: '90cm', height: '35cm', weight: '6.8kg' },
    userGroups: ['Businesses', 'Adults', 'Schools', 'Outdoor'],
    applicationsImpact: 'Operational across 15,000 hectares in Rwanda, Uganda, and Tanzania. Reduced pesticide use by 35% through targeted spraying recommendations.',
    specifications: { materials: ['Carbon fibre frame', 'Multispectral sensor array', 'LiPo battery (22,000mAh)', 'GPS/RTK module'], dimensions: '90 x 90 x 35 cm', weight: '6.8 kg' },
    licensesCertifications: [
      { name: 'Rwanda Civil Aviation Authority Drone License', issuer: 'RCAA', year: 2024 },
      { name: 'CE Marking', issuer: 'European Conformity', year: 2024 }
    ],
    recommendations: ['Best for farms > 10 hectares', 'Optimized for maize, rice, and tea crops', 'Can be customized for livestock monitoring'],
    cautions: ['Do not fly in rain or winds > 35 km/h', 'Requires licensed drone pilot', 'Battery storage: 15-25 C only'],
    honoraryAwards: [
      { title: 'East Africa AgriTech Innovator', year: 2024, organization: 'EAC Innovation Hub', image: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&q=80&w=200' }
    ],
    mediaGallery: [
      { category: 'Working Materials', items: [
        { type: 'image', url: 'https://images.unsplash.com/photo-1677126577258-1a82fdf1a976?auto=format&fit=crop&q=80&w=800', caption: 'Drone assembly and sensor calibration' }
      ]},
      { category: 'Finished Work', items: [
        { type: 'image', url: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&q=80&w=800', caption: 'Field deployment over plantation' }
      ]}
    ],
    views: 22100,
    likes: 3100,
    favorites: 870,
    shares: 650,
    creator: 'Jean-Pierre Habimana',
    creatorImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    creatorBio: 'Jean-Pierre Habimana is a Rwandan biogas engineer and climate action advocate. A graduate of the African Leadership University, he focuses on converting agricultural waste into clean cooking fuel for rural households, reducing deforestation and respiratory illness across Central and East Africa.',
    creatorSpecializations: ['Biogas Engineering', 'Climate Science', 'Rural Energy Systems'],
    creatorExperience: '8 years in biogas technology and clean energy deployment',
    creatorAffiliation: 'Rwanda Energy Group (REG)'
  },
  {
    id: 'inn-5',
    name: 'AquaPure Filter',
    idTag: 'AFI-TZ-2023-0005',
    field: 'Environmental',
    interests: ['Purchase | Trade', 'Sensitization', 'Marketing'],
    ownership: 'NGO | Charity',
    stage: 'Commercialization',
    sdgs: ['Clean Water & Sanitation', 'Good Health & Well-Being', 'No Poverty'],
    image: 'https://images.unsplash.com/photo-1662647344062-b0cdb1ed7227?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlciUyMHB1cmlmaWNhdGlvbiUyMGZpbHRlciUyMGRldmljZXxlbnwxfHx8fDE3NzIzODMxNDF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    status: 'Online',
    country: 'Tanzania',
    state: 'Dar es Salaam',
    location: 'Dar es Salaam, Tanzania',
    description: 'AquaPure Filter is a gravity-fed, ceramic-membrane water purification unit that removes 99.99% of bacteria and 99.9% of protozoa without electricity or chemical treatment. Produces 3 litres of clean water per hour.',
    dimensions: { length: '30cm', width: '30cm', height: '50cm', weight: '4.5kg' },
    userGroups: ['Homes', 'Children', 'Adults', 'Elderly', 'Schools'],
    applicationsImpact: 'Distributed to over 50,000 households across rural Tanzania, Mozambique, and Malawi. Reduced waterborne disease incidence by 62%.',
    specifications: { materials: ['Local clay', 'Rice husk filler', 'Food-grade plastic housing', 'Colloidal silver coating'], dimensions: '30 x 30 x 50 cm', weight: '4.5 kg' },
    licensesCertifications: [
      { name: 'Tanzania Bureau of Standards Approval', issuer: 'TBS', year: 2023 },
      { name: 'NSF/ANSI 53 Equivalent Testing', issuer: 'Intertek', year: 2023 }
    ],
    recommendations: ['Replace ceramic element every 3 years', 'Clean filter surface weekly', 'Store filled unit in shade'],
    cautions: ['Not effective against dissolved chemicals or heavy metals', 'Handle ceramic element with care', 'Do not use with hot water (>40 C)'],
    honoraryAwards: [
      { title: 'WASH Innovation Award', year: 2023, organization: 'UNICEF East & Southern Africa', image: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&q=80&w=200' }
    ],
    mediaGallery: [
      { category: 'Working Materials', items: [
        { type: 'image', url: 'https://images.unsplash.com/photo-1662647344062-b0cdb1ed7227?auto=format&fit=crop&q=80&w=800', caption: 'Clay and rice husk preparation' }
      ]},
      { category: 'Finished Work', items: [
        { type: 'image', url: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&q=80&w=800', caption: 'Filter in use in rural home' }
      ]}
    ],
    views: 56800,
    likes: 7200,
    favorites: 2300,
    shares: 3400,
    creator: 'Amani Mwakasege',
    creatorImage: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=200',
    creatorBio: 'Amani Mwakasege is a Tanzanian agricultural technologist and IoT specialist. She combines her background in electronics engineering with a deep understanding of East African farming challenges to build precision agriculture tools that help smallholder farmers increase crop yields while conserving resources.',
    creatorSpecializations: ['IoT & Sensors', 'Precision Agriculture', 'Electronics Engineering'],
    creatorExperience: '9 years in agri-tech and embedded systems',
    creatorAffiliation: 'Sokoine University of Agriculture'
  },
  {
    id: 'inn-6',
    name: 'BioGas SmartStove',
    idTag: 'AFI-UG-2024-0006',
    field: 'Energy & Power',
    interests: ['Purchase | Trade', 'Investment | Partnership', 'Sensitization'],
    ownership: 'Private',
    stage: 'Scale-Up',
    sdgs: ['Affordable & Clean Energy', 'Good Health & Well-Being', 'Climate Action'],
    image: 'https://images.unsplash.com/photo-1709364528208-b59ffcf82439?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGVhbiUyMGNvb2tpbmclMjBzdG92ZSUyMGJpb21hc3MlMjBlbmVyZ3l8ZW58MXx8fHwxNzcyMzgzMTQ1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    status: 'Online',
    country: 'Uganda',
    state: 'Kampala',
    location: 'Kampala, Uganda',
    description: 'BioGas SmartStove is a compact, household-scale biogas digester and cookstove system that converts kitchen waste and animal dung into clean cooking gas. Eliminates the need for firewood or charcoal.',
    dimensions: { length: '150cm', width: '80cm', height: '120cm', weight: '65kg' },
    userGroups: ['Homes', 'Adults', 'Elderly', 'Culinary', 'Businesses'],
    applicationsImpact: 'Installed in 3,200 households across Uganda and Kenya. Reduced indoor air pollution exposure by 85%. Saves families approximately $40/month on fuel costs.',
    specifications: { materials: ['Reinforced fibreglass digester tank', 'Stainless steel burner', 'HDPE gas piping', 'Digital pressure gauge with Bluetooth'], dimensions: '150 x 80 x 120 cm', weight: '65 kg' },
    licensesCertifications: [
      { name: 'Uganda National Bureau of Standards Mark', issuer: 'UNBS', year: 2024 },
      { name: 'Global Alliance for Clean Cookstoves Tier 4', issuer: 'CCA', year: 2024 }
    ],
    recommendations: ['Feed digester daily with 60% water / 40% organic waste', 'Ideal for households with livestock', 'Can be scaled for restaurants'],
    cautions: ['Biogas is flammable - ensure proper ventilation', 'Do not introduce synthetic chemicals', 'Professional installation required for gas piping'],
    honoraryAwards: [
      { title: 'Clean Cooking Innovation Award', year: 2024, organization: 'Clean Cooking Alliance', image: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&q=80&w=200' }
    ],
    mediaGallery: [
      { category: 'Working Materials', items: [
        { type: 'image', url: 'https://images.unsplash.com/photo-1709364528208-b59ffcf82439?auto=format&fit=crop&q=80&w=800', caption: 'Digester tank components' }
      ]},
      { category: 'Finished Work', items: [
        { type: 'image', url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&q=80&w=800', caption: 'SmartStove in kitchen use' }
      ]}
    ],
    views: 18900,
    likes: 2800,
    favorites: 720,
    shares: 510,
    creator: 'Moses Kiggundu',
    creatorImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200',
    creatorBio: 'Moses Kiggundu is a Ugandan biomechanical engineer and disability inclusion advocate. After years of research at Makerere University, he developed low-cost prosthetic solutions using locally sourced materials, making mobility aids accessible to amputees and people with disabilities across Sub-Saharan Africa.',
    creatorSpecializations: ['Biomechanical Engineering', 'Prosthetics', 'Disability Inclusion'],
    creatorExperience: '11 years in biomechanical research and prosthetics',
    creatorAffiliation: 'Makerere University, College of Engineering'
  },
  {
    id: 'inn-7',
    name: 'E-Waste Refinery Hub',
    idTag: 'AFI-ZA-2023-0007',
    field: 'Waste & Recycling',
    interests: ['Investment | Partnership', 'Marketing', 'Training | Mentorship'],
    ownership: 'Corporate',
    stage: 'Scale-Up',
    sdgs: ['Responsible Consumption & Production', 'Decent Work & Economic Growth', 'Industry, Innovation & Infrastructure'],
    image: 'https://images.unsplash.com/photo-1759500657339-6e11b99a8882?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJvbmljJTIwd2FzdGUlMjByZWN5Y2xpbmclMjBjaXJjdWl0JTIwYm9hcmR8ZW58MXx8fHwxNzcyMzgzMTQyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    status: 'Online',
    country: 'South Africa',
    state: 'Gauteng',
    location: 'Johannesburg, South Africa',
    description: 'E-Waste Refinery Hub is a modular, containerized electronic waste processing system that safely extracts precious metals from discarded electronics using a hydrometallurgical process that avoids toxic mercury or cyanide leaching.',
    dimensions: { length: '600cm', width: '240cm', height: '260cm', weight: '4500kg' },
    userGroups: ['Businesses', 'Adults', 'Outdoor'],
    applicationsImpact: 'Operating 5 refinery hubs across Gauteng and Western Cape. Processed over 800 tonnes of e-waste in 2024. Created 120 formal jobs.',
    specifications: { materials: ['Shipping container (modified)', 'Acid-resistant polymer tanks', 'Electrolysis cells', 'HEPA filtration system'], dimensions: '600 x 240 x 260 cm', weight: '4,500 kg' },
    licensesCertifications: [
      { name: 'SABS Approved', issuer: 'South African Bureau of Standards', year: 2023 },
      { name: 'ISO 14001:2015', issuer: 'ISO', year: 2023 }
    ],
    recommendations: ['Ideal for municipal e-waste programmes', 'Co-locate with waste transfer stations', 'Modular: scale from 1 to 10 containers'],
    cautions: ['Requires trained chemical engineers', 'Strict PPE protocols', 'Wastewater must be treated before discharge'],
    honoraryAwards: [
      { title: 'African Circular Economy Champion', year: 2024, organization: 'African Development Bank', image: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&q=80&w=200' }
    ],
    mediaGallery: [
      { category: 'Working Materials', items: [
        { type: 'image', url: 'https://images.unsplash.com/photo-1759500657339-6e11b99a8882?auto=format&fit=crop&q=80&w=800', caption: 'Circuit board sorting area' }
      ]},
      { category: 'Finished Work', items: [
        { type: 'image', url: 'https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?auto=format&fit=crop&q=80&w=800', caption: 'Recovered precious metals' }
      ]}
    ],
    views: 31500,
    likes: 4100,
    favorites: 1150,
    shares: 980,
    creator: 'Thandi Nkosi',
    creatorImage: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=200',
    creatorBio: 'Thandi Nkosi is a South African cold chain logistics expert and food science researcher. With a Master\'s degree from Stellenbosch University, she is passionate about reducing post-harvest losses across Africa through innovative, solar-powered cooling and preservation technologies tailored for off-grid areas.',
    creatorSpecializations: ['Food Science', 'Cold Chain Logistics', 'Solar Refrigeration'],
    creatorExperience: '7 years in food preservation technology',
    creatorAffiliation: 'Stellenbosch University, Dept. of Food Science'
  },
  {
    id: 'inn-8',
    name: 'BioHand Prosthetic',
    idTag: 'AFI-EG-2024-0008',
    field: 'Engineering',
    interests: ['Investment | Partnership', 'Training | Mentorship', 'Sensitization'],
    ownership: 'Academic',
    stage: 'Prototype',
    sdgs: ['Good Health & Well-Being', 'Reduced Inequalities', 'Industry, Innovation & Infrastructure'],
    image: 'https://images.unsplash.com/photo-1581090465357-c8a1f71f0407?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2JvdGljJTIwcHJvc3RoZXRpYyUyMGFybSUyMGVuZ2luZWVyaW5nfGVufDF8fHx8MTc3MjM4MzE0Mnww&ixlib=rb-4.1.0&q=80&w=1080',
    status: 'Offline',
    country: 'Egypt',
    state: 'Cairo',
    location: 'Cairo, Egypt',
    description: 'BioHand Prosthetic is a 3D-printed, myoelectric upper-limb prosthesis that uses surface EMG sensors to detect residual muscle signals and translate them into hand movements. Costs under $300 to produce.',
    dimensions: { length: '22cm', width: '10cm', height: '8cm', weight: '0.38kg' },
    userGroups: ['Adults', 'Adolescents/Teens', 'Children', 'Healthcare', 'Males'],
    applicationsImpact: 'Fitted 280 patients across Egypt, Ethiopia, and Sudan. Reduced prosthetic cost by 90%. Open-source design downloaded over 15,000 times globally.',
    specifications: { materials: ['PLA structural filament', 'TPU flexible joints', 'Surface EMG sensors', 'Micro servo motors (6x)', 'Li-ion battery (3.7V, 2000mAh)'], dimensions: '22 x 10 x 8 cm', weight: '0.38 kg' },
    licensesCertifications: [
      { name: 'Egyptian Drug Authority Registration', issuer: 'EDA', year: 2024 },
      { name: 'CE Mark (Class I Medical Device)', issuer: 'European Commission', year: 2025 }
    ],
    recommendations: ['Best for transradial amputees', 'Requires occupational therapy training', 'Battery lasts 8-10 hours'],
    cautions: ['Not waterproof', 'EMG sensor calibration required by a prosthetist', 'PLA degrades above 60 C'],
    honoraryAwards: [
      { title: 'Arab-Africa Innovation Prize', year: 2024, organization: 'League of Arab States & AU', image: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&q=80&w=200' },
      { title: 'MIT Solve Global Challenge Finalist', year: 2024, organization: 'MIT Solve', image: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&q=80&w=200' }
    ],
    mediaGallery: [
      { category: 'Working Materials', items: [
        { type: 'image', url: 'https://images.unsplash.com/photo-1581090465357-c8a1f71f0407?auto=format&fit=crop&q=80&w=800', caption: '3D printing in progress' }
      ]},
      { category: 'Work-in-Progress', items: [
        { type: 'image', url: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800', caption: 'Assembly and wiring' }
      ]},
      { category: 'Finished Work', items: [
        { type: 'image', url: 'https://images.unsplash.com/photo-1531746790095-e650200f3056?auto=format&fit=crop&q=80&w=800', caption: 'Patient fitting session' }
      ]}
    ],
    views: 45600,
    likes: 6300,
    favorites: 1890,
    shares: 2700,
    creator: 'Dr. Ahmed El-Sayed',
    creatorImage: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200',
    creatorBio: 'Dr. Ahmed El-Sayed is an Egyptian desalination engineer and water resources expert. He holds a PhD from Cairo University and has spent two decades researching affordable desalination methods for arid regions of North and Sub-Saharan Africa, making clean water accessible to millions through solar-driven membrane technology.',
    creatorSpecializations: ['Desalination Engineering', 'Membrane Technology', 'Water Resources'],
    creatorExperience: '20 years in water desalination and purification',
    creatorAffiliation: 'Cairo University, Faculty of Engineering'
  }
];

export const COMPETITIONS = [
  {
    id: 'comp-1',
    title: 'Afri \u2013 Anime: Malaria Fighters',
    type: 'Afri \u2013 Anime',
    category: 'General (18+)',
    country: 'Nigeria',
    registrationFee: '$10',
    deadline: '2026-06-30',
    image: 'https://images.unsplash.com/photo-1602728114068-25257aedd285?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    introNote: 'Create an animated video to explain a scientific concept of your choice. Skillfully craft your animation to be engaging and educating.',
    description: 'Afri \u2013 Anime challenges young African creatives to explain complex scientific concepts through animation and storytelling. Participants must produce a short animated video (max 5 minutes) that breaks down a scientific principle in an engaging, entertaining, and educational manner. The best entries will be screened at the AfriScience Hub Annual Summit.',
    registrationRequirements: ['Must be a registered AfriScience Hub member', 'Must fall within the specified age category', 'Valid school/institution ID for verification', 'Registration fee of $5 must be paid before the deadline'],
    rules: ['Screen time of 5 minutes max.', 'Animation must be original work created by the contestant.', 'All content must be scientifically accurate.', 'No copyrighted music or third-party assets without license.', 'Language must be English, French, or any African language with English subtitles.', 'Content must be appropriate for all ages within the category.'],
    selectionScreening: 'All entries will be reviewed by a panel of 5 judges comprising scientists, animators, and educators. Entries are scored on scientific accuracy (30%), creativity (25%), storytelling (25%), and technical quality (20%). Top 10 finalists will be announced two weeks after the deadline.',
    consent: 'By applying, you grant AfriScience Hub the right to screen, publish, and promote your entry across our platforms for educational purposes. Your personal information will be handled in accordance with our privacy policy.',
    reward: '$2,500 Grand Prize, $1,000 Runner-Up, $500 Third Place, plus certificates and feature on the AfriScience Hub Hall of Fame.',
    undertakingRemark: 'I confirm that the work I will submit is entirely my own original creation, that all scientific content is accurate to the best of my knowledge, and that I accept the rules and conditions of this competition.',
    topics: [],
    mediaType: 'video' as const,
    participants: 120
  },
  {
    id: 'comp-2',
    title: 'Afri \u2013 Presentations: Undergraduate Research Showcase',
    type: 'Afri \u2013 Presentations',
    category: 'Undergraduates',
    country: 'Kenya',
    registrationFee: '$10',
    deadline: '2026-07-15',
    image: 'https://images.unsplash.com/photo-1764874299006-bf4266427ec9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    introNote: 'Give an audio-visual presentation to address some persisting problems that challenge the African continent, and offer possible science – based solutions for them.',
    description: 'Afri \u2013 Presentations challenges undergraduates and Graduates to present video research presentations that address pressing problems common across the African continent. Presentations should demonstrate applied scopes where integrated knowledge of different science fields is required.',
    registrationRequirements: ['Must be a registered AfriScience Hub member', 'Must be currently enrolled as an undergraduate student', 'Institutional verification letter or student ID required', 'Registration fee of $5 must be paid before the deadline'],
    rules: ['Screen time of 5 minutes max.', 'Presentations must be delivered in English with clear audio.', 'All claims must be supported by referenced scientific literature.', 'Use of visual aids (slides, diagrams) is strongly encouraged.', 'Plagiarism will result in immediate disqualification.', 'Presenter must appear on camera for at least 50% of the presentation.'],
    selectionScreening: 'Entries reviewed by academic panel. Scored on research depth (30%), clarity of presentation (25%), cross-disciplinary integration (25%), and practical applicability (20%). Semi-finalists present live at a virtual symposium.',
    consent: 'By applying, you grant AfriScience Hub the right to publish and distribute your presentation for educational and promotional purposes. Your academic institution may be contacted for verification.',
    reward: '$3,000 Grand Prize, $1,500 Runner-Up, $750 Third Place, plus publication opportunity in the AfriScience Journal and mentorship from leading African researchers.',
    undertakingRemark: 'I confirm that my presentation is based on original research, that all references are properly cited, and that I agree to the competition rules and conditions.',
    topics: ['Combating antimicrobial resistance in sub-Saharan Africa through integrated pharmaceutical and environmental science approaches', 'Leveraging renewable energy and smart agriculture to address food security challenges across the Sahel region', 'Developing low-cost diagnostic tools for endemic tropical diseases using biomedical engineering and data science'],
    mediaType: 'video' as const,
    participants: 85
  },
  {
    id: 'comp-3',
    title: 'Afri \u2013 Memes: Science Humor Challenge',
    type: 'Afri \u2013 Memes',
    category: 'General (18+)',
    country: 'South Africa',
    registrationFee: '$7',
    deadline: '2026-05-31',
    image: 'https://images.unsplash.com/photo-1496050500305-aa04b5f00448?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    introNote: 'Create a science – themed meme that is both comic and informative. Use humor to make science concepts less complex and more understandable.',
    description: 'Afri \u2013 Memes invites creative minds to produce original, science-themed memes that are funny, factually accurate, and culturally relevant to Africa. Entries should make science accessible and entertaining while maintaining accuracy.',
    registrationRequirements: ['Must be a registered AfriScience Hub member', 'Must be 18 years or older', 'Registration fee of $5 must be paid before the deadline'],
    rules: ['Image format only (JPEG, PNG, or GIF).', 'Meme must be original \u2013 no reposting existing memes.', 'Content must be scientifically accurate.', 'No offensive, discriminatory, or politically charged content.', 'Maximum of 3 entries per contestant.', 'Text must be legible and in English.'],
    selectionScreening: 'Community voting (40%) combined with panel judging (60%). Panel scores humor (30%), scientific accuracy (20%), and creativity/originality (50%).',
    consent: 'By submitting, you grant AfriScience Hub full rights to use, share, and feature your meme on all platforms with credit given to you.',
    reward: '$500 Grand Prize, $250 Runner-Up, AfriScience Hub merchandise pack for top 10 entries.',
    undertakingRemark: 'I confirm that my meme submission is entirely original, scientifically accurate, and does not infringe on any copyright or intellectual property.',
    topics: [],
    mediaType: 'image' as const,
    participants: 300
  },
  {
    id: 'comp-4',
    title: 'Afri \u2013 MySpace: Lab & Study Setup Showcase',
    type: 'Afri \u2013 MySpace',
    category: 'General (18+)',
    country: 'Ghana',
    registrationFee: '$5',
    deadline: '2026-08-15',
    image: 'https://images.unsplash.com/photo-1662117940162-b666fea153cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    introNote: 'Showcase your working environment (station, lab, workshop, studio, hub, center, unit, etc.). Let us see the space from where you provide scientific & technological solutions.',
    description: 'Afri \u2013 MySpace celebrates the diverse spaces where African scientists, students, and innovators work. Submit a photo of your personal workspace \u2013 whether it\u2019s a home lab, university bench, study desk, or field station.',
    registrationRequirements: ['Must be a registered AfriScience Hub member', 'Must be 18 years or older', 'Registration fee of $5 must be paid before the deadline'],
    rules: ['Image format only (JPEG or PNG, minimum 1080px width).', 'Photo must be of your actual workspace \u2013 no stock photos.', 'Include a short caption (max 200 words) describing your space.', 'No identifiable personal documents visible in the photo.', 'Maximum of 2 entries per contestant.'],
    selectionScreening: 'Panel of scientists and designers judge entries on creativity (30%), story/caption (30%), aesthetic quality (20%), and inspiration value (20%).',
    consent: 'By submitting, you allow AfriScience Hub to feature your workspace photo and caption on our platforms and promotional materials.',
    reward: '$500 Grand Prize, $250 Runner-Up, featured workspace profile on AfriScience Hub homepage for one month.',
    undertakingRemark: 'I confirm that the photo is of my actual personal workspace, that the caption is truthful, and that I agree to the competition terms.',
    topics: [],
    mediaType: 'image' as const,
    participants: 180
  },
  {
    id: 'comp-5',
    title: 'Afri \u2013 Anime: Junior Explorers',
    type: 'Afri \u2013 Anime',
    category: 'General (18+)',
    country: 'Nigeria',
    registrationFee: '$10',
    deadline: '2026-07-31',
    image: 'https://images.unsplash.com/photo-1770843093640-c44ae557928b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    introNote: 'Create an animated video to explain a scientific concept of your choice. Skillfully craft your animation to be engaging and educating.',
    description: 'The Junior Explorers edition of Afri \u2013 Anime is designed for younger students. Create a fun, educational animated story that explains a basic science concept.',
    registrationRequirements: ['Must be a registered AfriScience Hub member', 'Must be enrolled in Junior Secondary school', 'Parental/guardian consent form required', 'Registration fee of $5 must be paid before the deadline'],
    rules: ['Screen time of 5 minutes max.', 'Animation must be age-appropriate.', 'Content must explain a real science concept.', 'All work must be original.', 'Parental supervision during creation is recommended.'],
    selectionScreening: 'Youth panel of educators and animators review entries. Scored on educational value (35%), creativity (35%), and effort/presentation (30%).',
    consent: 'Parental consent is required. By applying, the guardian confirms the work is the student\u2019s own and grants AfriScience Hub rights to screen and promote the entry.',
    reward: '$1,000 Grand Prize, $500 Runner-Up, science kit for top 5 finalists, certificate for all participants.',
    undertakingRemark: 'I (or my parent/guardian) confirm that this animated work is my own creation and that all scientific content is accurate to the best of my knowledge.',
    topics: [],
    mediaType: 'video' as const,
    participants: 95
  },
  {
    id: 'comp-6',
    title: 'Afri \u2013 Presentations: Graduate Innovation Forum',
    type: 'Afri \u2013 Presentations',
    category: 'Graduates',
    country: 'Kenya',
    registrationFee: '$20',
    deadline: '2026-08-31',
    image: 'https://images.unsplash.com/photo-1655102718560-19dd4971f87b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    introNote: 'Give an audio-visual presentation to address some persisting problems that challenge the African continent, and offer possible science \u2013 based solutions for them.',
    description: 'The Graduate Innovation Forum challenges masters and doctoral students to present advanced research that addresses continental challenges with cross-disciplinary integration.',
    registrationRequirements: ['Must be a registered AfriScience Hub member', 'Must be enrolled in a Graduate programme (Masters/PhD)', 'Supervisor endorsement letter required', 'Registration fee of $5 must be paid before the deadline'],
    rules: ['Screen time of 5 minutes max.', 'All research claims must be peer-reviewable.', 'Visual aids and data visualizations required.', 'Must cite at least 5 scholarly references.', 'Presenter must appear on screen.'],
    selectionScreening: 'Academic review board evaluates entries on research rigor (35%), innovation (25%), cross-disciplinary integration (25%), and presentation quality (15%).',
    consent: 'By applying, you grant AfriScience Hub the right to publish your abstract and presentation excerpts. Full research remains your intellectual property.',
    reward: '$5,000 Grand Prize, $2,500 Runner-Up, $1,000 Third Place, plus conference invitations and journal publication opportunity.',
    undertakingRemark: 'I confirm that my research is original, properly cited, endorsed by my academic supervisor, and that I agree to all competition rules.',
    topics: ['Applying machine learning and genomic data to predict and prevent outbreaks of zoonotic diseases in East Africa', 'Engineering climate-resilient crops through CRISPR technology combined with indigenous agricultural knowledge systems', 'Integrating nanotechnology and water engineering to develop scalable water purification systems for rural African communities'],
    mediaType: 'video' as const,
    participants: 62
  },
  {
    id: 'comp-7',
    title: 'Afri \u2013 Memes: Campus Science Edition',
    type: 'Afri \u2013 Memes',
    category: 'General (18+)',
    country: 'Egypt',
    registrationFee: '$7',
    deadline: '2026-06-15',
    image: 'https://images.unsplash.com/photo-1726804973612-3e610a28ba3f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    introNote: 'Create a science \u2013 themed meme that is both comic and informative. Use humor to make science concepts less complex and more understandable.',
    description: 'The Campus Science Edition challenges university students to create memes about the university science experience \u2013 from lab fails to thesis struggles.',
    registrationRequirements: ['Must be a registered AfriScience Hub member', 'Must be currently enrolled in an undergraduate programme', 'Registration fee of $5 must be paid before the deadline'],
    rules: ['Image format only (JPEG, PNG, or GIF).', 'Must be original and relate to the science student experience.', 'No offensive or discriminatory content.', 'Maximum of 3 entries per contestant.'],
    selectionScreening: 'Community voting (50%) combined with panel judging (50%). Entries scored on relatability, humor, and creativity.',
    consent: 'By submitting, you grant AfriScience Hub rights to share your meme across all platforms with credit.',
    reward: '$400 Grand Prize, $200 Runner-Up, AfriScience Hub swag pack for top 5.',
    undertakingRemark: 'I confirm that my meme is original and does not contain offensive or copyrighted material.',
    topics: [],
    mediaType: 'image' as const,
    participants: 210
  },
  {
    id: 'comp-8',
    title: 'Afri \u2013 MySpace: Young Scientist Workspace',
    type: 'Afri \u2013 MySpace',
    category: 'General (18+)',
    country: 'South Africa',
    registrationFee: '$5',
    deadline: '2026-09-15',
    image: 'https://images.unsplash.com/photo-1705727210721-961cc64a6895?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    introNote: 'Showcase your working environment (station, lab, workshop, studio, hub, center, unit, etc.). Let us see the space from where you provide scientific & technological solutions.',
    description: 'The Young Scientist Workspace edition invites secondary school students to show off their study spaces. Whether you built a science corner in your bedroom or have a school lab you love, we want to see it!',
    registrationRequirements: ['Must be a registered AfriScience Hub member', 'Must be enrolled in Senior Secondary school', 'Parental consent required for students under 18', 'Registration fee of $5 must be paid before the deadline'],
    rules: ['Image format only (JPEG or PNG).', 'Must be a real photo of your actual workspace.', 'Caption of max 150 words required.', 'No identifying documents visible in the photo.'],
    selectionScreening: 'Panel of educators judge entries on inspiration (35%), creativity (35%), and caption quality (30%).',
    consent: 'Guardian consent required for minors. AfriScience Hub may feature entries on platforms and social media.',
    reward: '$300 Grand Prize, science kit for top 3, certificate for all participants.',
    undertakingRemark: 'I (or my parent/guardian) confirm that the workspace photo is genuine and that I agree to the competition terms.',
    topics: [],
    mediaType: 'image' as const,
    participants: 145
  },
  {
    id: 'comp-9',
    title: 'Afri \u2013 Presentations: Young Explorers Showcase',
    type: 'Afri \u2013 Presentations',
    category: 'Lower Primary',
    country: 'Nigeria',
    registrationFee: '$5',
    deadline: '2026-08-31',
    image: 'https://images.unsplash.com/photo-1602728114068-25257aedd285?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    introNote: 'Young explorers present science-based solutions to challenges facing Africa. Use research to analyze problems and offer practical solutions.',
    description: 'Afri \u2013 Presentations offer African brilliant minds an opportunity to look into the prominent problems that challenge the African continent at different levels. Participants are required to use research-backed information to critically analyze these problems and offer possible &amp; practical science-based solutions for them. Take the global stage with other African great minds to tackle problems that plague the continent.',
    registrationRequirements: ['Must be registered with AfriScience Hub', 'Valid NIN slip of contestant', 'Must be within the ages of 6 \u2013 8 years', 'Must be currently enrolled as a lower basic pupil in a school', 'Must be represented by a parent or guardian', 'Any valid government issued ID of the parent/guardian'],
    rules: ['Presentation screen time of 5 minutes max.', 'Cut-screens are not allowed during presentations', 'Video format only (MP4, WebM, MOV, AVI)', 'All information presented must be accurate and scientifically practical', 'Must use an African country as a case-study', 'Contestant must look and dress smart during presentations', 'Presentation must be an original work created by the contestant', 'Presentation contents must not violate any copyright or other third-party rights', 'Presentation language can be in English, French, or any other language spoken in Africa with English subtitles', 'Presentation contents should not be offensive and discriminatory', 'Contestants must submit their work before submission deadline', 'Contestants must consent to the terms of service and undertake to comply with them'],
    selectionScreening: 'All submitted entries will be reviewed and scored by our competition panel in the following areas:\nAccuracy of Information\nDepth of Knowledge\nPresentation Skill\nAudience Engagement\n\nTop 30 finalists will be listed under the Voting section of the platform after four (4) weeks of submission deadline.\nPublic votes will be used to determine the final performance of finalists.\nAt the end of voting sessions, winners will be ranked, announced and rewarded under the Awards section of the platform.\nWhen a tie exists either in the 1st, 2nd or 3rd positions, it will be resolved by further extending the voting window for affected finalists by 48 hours.',
    consent: 'By applying, you grant AfriScience Hub the right to further modify, publish, and promote your entry across our platforms for educational and outreach purposes. Your personal information will be handled in accordance with our privacy policy.',
    reward: '1st Position: Gold Medal, Educational Tablet, Advanced School Kit, $300 Prize Money for Parent/Guardian, Certificate of Recognition, Possible Feature in Hall of Fame, Work Publication across AfriScience Hub Platforms, Developmental project in enrolled school.\n2nd Position: Silver Medal, Advanced School Kit, $300 Prize Money for Parent/Guardian, Certificate of Recognition, Work Publication across AfriScience Hub Platforms, Developmental project in enrolled school.\n3rd Position: Bronze Medal, Basic School Kit, $300 Prize Money for Parent/Guardian, Certificate of Recognition, Work Publication across AfriScience Hub Platforms, Developmental project in enrolled school.',
    undertakingRemark: 'I confirm that the work I will submit is entirely my own original creation, that all scientific contents are accurate to the best of my knowledge, that the work does not violate any copyright or third party rights, and that I accept the terms and conditions of this competition.',
    topics: ['How does the sun help plants grow? A simple experiment we can do at home', 'Why does water turn into ice? A fun look at the states of matter', 'How do birds fly? Understanding the science of flight with examples from African birds'],
    mediaType: 'video' as const,
    participants: 45
  },
  {
    id: 'comp-10',
    title: 'Afri \u2013 Presentations: Young Innovators Showcase',
    type: 'Afri \u2013 Presentations',
    category: 'Upper Primary',
    country: 'Nigeria',
    registrationFee: '$5',
    deadline: '2026-09-15',
    image: 'https://images.unsplash.com/photo-1602728114068-25257aedd285?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    introNote: 'Young innovators present science-based solutions to challenges facing their communities. Use research to analyze problems and offer practical solutions.',
    description: 'Afri \u2013 Presentations offer African brilliant minds an opportunity to look into the prominent problems that challenge the African continent at different levels. Participants are required to use research-backed information to critically analyze these problems and offer possible &amp; practical science-based solutions for them. Take the global stage with other African great minds to tackle problems that plague the continent.',
    registrationRequirements: ['Must be registered with AfriScience Hub', 'Valid NIN slip of contestant', 'Must be within the ages of 9 \u2013 11 years', 'Must be currently enrolled as an upper basic pupil in a school', 'Must be represented by a parent or guardian', 'Any valid government issued ID of the parent/guardian'],
    rules: ['Presentation screen time of 5 minutes max.', 'Cut-screens are not allowed during presentations', 'Video format only (MP4, WebM, MOV, AVI)', 'All information presented must be accurate and scientifically practical', 'Must use an African country as a case-study', 'Contestant must look and dress smart during presentations', 'Presentation must be an original work created by the contestant', 'Presentation contents must not violate any copyright or other third-party rights', 'Presentation language can be in English, French, or any other language spoken in Africa with English subtitles', 'Presentation contents should not be offensive and discriminatory', 'Contestants must submit their work before submission deadline', 'Contestants must consent to the terms of service and undertake to comply with them'],
    selectionScreening: 'All submitted entries will be reviewed and scored by our competition panel in the following areas:\nAccuracy of Information\nDepth of Knowledge\nPresentation Skill\nAudience Engagement\n\nTop 30 finalists will be listed under the Voting section of the platform after four (4) weeks of submission deadline.\nPublic votes will be used to determine the final performance of finalists.\nAt the end of voting sessions, winners will be ranked, announced and rewarded under the Awards section of the platform.\nWhen a tie exists either in the 1st, 2nd or 3rd positions, it will be resolved by further extending the voting window for affected finalists by 48 hours.',
    consent: 'By applying, you grant AfriScience Hub the right to further modify, publish, and promote your entry across our platforms for educational and outreach purposes. Your personal information will be handled in accordance with our privacy policy.',
    reward: '1st Position: Gold Medal, $100 Prize Money, Educational Tablet, Advanced School Kit, $300 Prize Money for Parent/Guardian, Certificate of Recognition, Possible Feature in Hall of Fame, Work Publication across AfriScience Hub Platforms, Developmental project in enrolled school.\n2nd Position: Silver Medal, Educational Tablet, Advanced School Kit, $300 Prize Money for Parent/Guardian, Certificate of Recognition, Work Publication across AfriScience Hub Platforms, Developmental project in enrolled school.\n3rd Position: Bronze Medal, Advanced School Kit, $300 Prize Money for Parent/Guardian, Certificate of Recognition, Work Publication across AfriScience Hub Platforms, Developmental project in enrolled school.',
    undertakingRemark: 'I confirm that the work I will submit is entirely my own original creation, that all scientific contents are accurate to the best of my knowledge, that the work does not violate any copyright or third party rights, and that I accept the terms and conditions of this competition.',
    topics: ['What causes rain? Exploring the water cycle and its importance to African farmers', 'How does electricity work? Simple circuits that can power a light bulb', 'Why do we need to recycle? Understanding waste management in our communities'],
    mediaType: 'video' as const,
    participants: 55
  }
];

export const COMPETITION_TYPES = ['Afri \u2013 Anime', 'Afri \u2013 Presentations', 'Afri \u2013 Memes', 'Afri \u2013 MySpace'];

export const COMPETITION_CATEGORIES = ['General (18+)', 'Lower Primary', 'Upper Primary', 'Junior Secondary', 'Senior Secondary', 'Undergraduates', 'Graduates'];

export const VOTING_FINALISTS = [
  {
    id: 'vf-1',
    name: 'Adaeze Nwosu',
    type: "Competition's Finalists",
    competition: 'Afri \u2013 Anime',
    category: 'Senior Secondary',
    year: 2026,
    country: 'Nigeria',
    image: 'https://images.unsplash.com/photo-1606934555462-4c14244d180c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    afriScienceScore: 92,
    votes: 1245,
    overallPerformance: 88,
    position: 1
  },
  {
    id: 'vf-2',
    name: 'Kwame Asante',
    type: "Competition's Finalists",
    competition: 'Afri \u2013 Anime',
    category: 'Senior Secondary',
    year: 2026,
    country: 'Ghana',
    image: 'https://images.unsplash.com/photo-1689857538296-b6e1a392a91d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    afriScienceScore: 89,
    votes: 1102,
    overallPerformance: 85,
    position: 2
  },
  {
    id: 'vf-3',
    name: 'Fatima El-Amin',
    type: "Competition's Finalists",
    competition: 'Afri \u2013 Presentations',
    category: 'Undergraduates',
    year: 2026,
    country: 'Kenya',
    image: 'https://images.unsplash.com/photo-1761370981160-0e111d79ebc3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    afriScienceScore: 95,
    votes: 1580,
    overallPerformance: 92,
    position: 1
  },
  {
    id: 'vf-4',
    name: 'Samuel Okonkwo',
    type: "Competition's Finalists",
    competition: 'Afri \u2013 Presentations',
    category: 'Undergraduates',
    year: 2026,
    country: 'Nigeria',
    image: 'https://images.unsplash.com/photo-1574687175332-dd01d500359e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    afriScienceScore: 91,
    votes: 1340,
    overallPerformance: 87,
    position: 2
  },
  {
    id: 'vf-5',
    name: 'Zara Mbeki',
    type: "Competition's Finalists",
    competition: 'Afri \u2013 Memes',
    category: 'General (18+)',
    year: 2026,
    country: 'South Africa',
    image: 'https://images.unsplash.com/photo-1742473716788-72ec6df8a830?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    afriScienceScore: 87,
    votes: 2103,
    overallPerformance: 83,
    position: 1
  },
  {
    id: 'vf-6',
    name: 'Amina Diallo',
    type: "Competition's Finalists",
    competition: 'Afri \u2013 Memes',
    category: 'General (18+)',
    year: 2026,
    country: 'Ghana',
    image: 'https://images.unsplash.com/photo-1680265254066-b2b65e1e95ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    afriScienceScore: 84,
    votes: 1870,
    overallPerformance: 80,
    position: 2
  },
  {
    id: 'vf-7',
    name: 'Thabo Mokoena',
    type: "Competition's Finalists",
    competition: 'Afri \u2013 MySpace',
    category: 'General (18+)',
    year: 2026,
    country: 'South Africa',
    image: 'https://images.unsplash.com/photo-1684337399050-0412ebed8005?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    afriScienceScore: 90,
    votes: 980,
    overallPerformance: 86,
    position: 1
  },
  {
    id: 'vf-8',
    name: 'Ngozi Eze',
    type: "Competition's Finalists",
    competition: 'Afri \u2013 MySpace',
    category: 'Senior Secondary',
    year: 2026,
    country: 'Nigeria',
    image: 'https://images.unsplash.com/photo-1650295894392-7fea9aa5a5a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    afriScienceScore: 86,
    votes: 875,
    overallPerformance: 82,
    position: 2
  },
  {
    id: 'vf-9',
    name: 'Hassan Mwangi',
    type: "Competition's Finalists",
    competition: 'Afri \u2013 Presentations',
    category: 'Graduates',
    year: 2026,
    country: 'Kenya',
    image: 'https://images.unsplash.com/photo-1768489038212-3202a936734f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    afriScienceScore: 96,
    votes: 1420,
    overallPerformance: 94,
    position: 1
  },
  {
    id: 'vf-10',
    name: 'Chidinma Obi',
    type: "Competition's Finalists",
    competition: 'Afri \u2013 Anime',
    category: 'Junior Secondary',
    year: 2026,
    country: 'Nigeria',
    image: 'https://images.unsplash.com/photo-1769000066691-6a5015513bcb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    afriScienceScore: 82,
    votes: 760,
    overallPerformance: 78,
    position: 1
  },
  {
    id: 'vf-11',
    name: 'Nadia Bouazizi',
    type: "Competition's Finalists",
    competition: 'Afri \u2013 Memes',
    category: 'Undergraduates',
    year: 2026,
    country: 'Egypt',
    image: 'https://images.unsplash.com/photo-1592393532405-fb1f165c4a1f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    afriScienceScore: 88,
    votes: 1650,
    overallPerformance: 84,
    position: 1
  },
  {
    id: 'vf-12',
    name: 'Kofi Mensah',
    type: "Competition's Finalists",
    competition: 'Afri \u2013 Presentations',
    category: 'Graduates',
    year: 2026,
    country: 'Ghana',
    image: 'https://images.unsplash.com/photo-1655720357761-f18ea9e5e7e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    afriScienceScore: 93,
    votes: 1380,
    overallPerformance: 90,
    position: 2
  }
];

export const VOTING_YEARS = [2026];

export const CONCLUDED_VOTING_FINALISTS = [
  {
    id: 'cvf-1',
    name: 'Chioma Ezeh',
    type: "Competition's Finalists",
    competition: 'Afri – Anime',
    category: 'General (18+)',
    year: 2025,
    country: 'Nigeria',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    afriScienceScore: 88,
    votes: 2340,
    overallPerformance: 85,
    position: 1,
    concludedDate: '2025-08-15',
  },
  {
    id: 'cvf-2',
    name: 'Emmanuel Boateng',
    type: "Competition's Finalists",
    competition: 'Afri – Anime',
    category: 'General (18+)',
    year: 2025,
    country: 'Ghana',
    image: 'https://images.unsplash.com/photo-1580518337843-959d0a1f4e8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    afriScienceScore: 85,
    votes: 1890,
    overallPerformance: 82,
    position: 2,
    concludedDate: '2025-08-15',
  },
  {
    id: 'cvf-3',
    name: 'Grace Wanjiku',
    type: "Competition's Finalists",
    competition: 'Afri – Presentations',
    category: 'Senior Secondary',
    year: 2025,
    country: 'Kenya',
    image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    afriScienceScore: 91,
    votes: 3120,
    overallPerformance: 89,
    position: 1,
    concludedDate: '2025-08-30',
  },
  {
    id: 'cvf-4',
    name: 'Yusuf Idris',
    type: "Competition's Finalists",
    competition: 'Afri – Presentations',
    category: 'Undergraduates',
    year: 2025,
    country: 'Nigeria',
    image: 'https://images.unsplash.com/photo-1590086782792-42dd2350140d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    afriScienceScore: 87,
    votes: 2780,
    overallPerformance: 84,
    position: 1,
    concludedDate: '2025-08-30',
  },
  {
    id: 'cvf-5',
    name: 'Naledi Moilwa',
    type: "Competition's Finalists",
    competition: 'Afri – Memes',
    category: 'General (18+)',
    year: 2025,
    country: 'Botswana',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    afriScienceScore: 83,
    votes: 4560,
    overallPerformance: 80,
    position: 1,
    concludedDate: '2025-09-15',
  },
  {
    id: 'cvf-6',
    name: 'Tendai Mukoko',
    type: "Competition's Finalists",
    competition: 'Afri – MySpace',
    category: 'General (18+)',
    year: 2025,
    country: 'Zimbabwe',
    image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    afriScienceScore: 86,
    votes: 1650,
    overallPerformance: 83,
    position: 1,
    concludedDate: '2025-09-30',
  },
];

export const AWARD_WINNERS = [
  {
    id: 'award-1',
    name: 'Oluwaseun Adeyemi',
    type: 'Developers Award',
    image: 'https://images.unsplash.com/photo-1620829813573-7c9e1877706f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    country: 'Nigeria',
    year: 2026,
    rewards: ['AfriScience Hub Developer Badge', 'Certificate of Recognition', 'VIP Access to Events & Programs'],
    certificate: 'https://images.unsplash.com/photo-1646769762753-565020b3bb2c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    badgeImage: 'https://images.unsplash.com/photo-1611926653458-09294b3142bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    awardPresentation: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    socialLinks: { linkedin: '#', twitter: '#', instagram: '#', facebook: '#' },
    workSummary: 'Developed an open-source AI framework for crop disease detection across African farming communities.',
  },
  {
    id: 'award-2',
    name: 'Amara Osei',
    type: 'Developers Award',
    image: 'https://images.unsplash.com/photo-1612299273045-362a39972259?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    country: 'Ghana',
    year: 2026,
    rewards: ['AfriScience Hub Developer Badge', 'Certificate of Recognition', 'VIP Access to Events & Programs'],
    certificate: 'https://images.unsplash.com/photo-1646769762753-565020b3bb2c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    badgeImage: 'https://images.unsplash.com/photo-1611926653458-09294b3142bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    awardPresentation: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    socialLinks: { linkedin: '#', twitter: '#', instagram: '#', facebook: '#' },
    workSummary: 'Created a mobile-first telemedicine platform connecting rural patients with specialists.',
  },
  {
    id: 'award-3',
    name: 'Lindiwe Dlamini',
    type: 'Sponsorships Award',
    image: 'https://images.unsplash.com/photo-1604783125462-37d81c7385e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    country: 'South Africa',
    year: 2026,
    rewards: ['AfriScience Hub Sponsorship Badge', 'Certificate of Recognition', 'Web-space Marketing', 'Sponsorship Tier Benefits'],
    certificate: 'https://images.unsplash.com/photo-1646769762753-565020b3bb2c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    badgeImage: 'https://images.unsplash.com/photo-1611926653458-09294b3142bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    awardPresentation: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    socialLinks: { linkedin: '#', twitter: '#', instagram: '#', facebook: '#' },
    workSummary: 'Funded STEM labs in 12 underserved South African schools with full equipment and training.',
  },
  {
    id: 'award-4',
    name: 'Nkechi Okafor-Williams',
    type: 'Sponsorships Award',
    image: 'https://images.unsplash.com/photo-1710778044102-56a3a62ece8d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    country: 'United Kingdom',
    year: 2026,
    rewards: ['AfriScience Hub Sponsorship Badge', 'Certificate of Recognition', 'Web-space Marketing', 'Homepage Feature'],
    certificate: 'https://images.unsplash.com/photo-1646769762753-565020b3bb2c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    badgeImage: 'https://images.unsplash.com/photo-1611926653458-09294b3142bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    awardPresentation: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    socialLinks: { linkedin: '#', twitter: '#', instagram: '#', facebook: '#' },
    workSummary: 'Sponsored the annual AfriScience innovation summit with a $50,000 contribution.',
  },
  {
    id: 'award-5',
    name: 'Adaeze Nwosu',
    type: 'Competitions Award',
    competition: 'Afri \u2013 Anime',
    category: 'Senior Secondary',
    position: 1,
    image: 'https://images.unsplash.com/photo-1750438920035-e5d213280a78?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    country: 'Nigeria',
    year: 2026,
    rewards: ['Gold Medal', '$1,000 Grand Prize', 'Certificate of Recognition', 'Possible Feature in Hall of Fame', 'Work Publication across AfriScience Hub Platform'],
    certificate: 'https://images.unsplash.com/photo-1646769762753-565020b3bb2c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    badgeImage: 'https://images.unsplash.com/photo-1601987077677-5346c0c57b9f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    awardPresentation: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    socialLinks: { linkedin: '#', twitter: '#', instagram: '#', facebook: '#' },
    workSummary: 'An animated short film showcasing African folklore through a futuristic AI lens.',
    workMedia: ['https://images.unsplash.com/photo-1750438920035-e5d213280a78?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080'],
  },
  {
    id: 'award-6',
    name: 'Fatima El-Amin',
    type: 'Competitions Award',
    competition: 'Afri \u2013 Presentations',
    category: 'Undergraduates',
    position: 1,
    image: 'https://images.unsplash.com/photo-1724055160815-9d8bc830a609?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    country: 'Kenya',
    year: 2026,
    rewards: ['Gold Medal', '$1,500 Grand Prize', 'Laptop PC', 'Educational Tablet', 'Certificate of Recognition', 'Possible Feature in Hall of Fame', 'Work Publication across AfriScience Hub Platform'],
    certificate: 'https://images.unsplash.com/photo-1646769762753-565020b3bb2c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    badgeImage: 'https://images.unsplash.com/photo-1601987077677-5346c0c57b9f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    awardPresentation: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    socialLinks: { linkedin: '#', twitter: '#', instagram: '#', facebook: '#' },
    workSummary: 'A presentation on low-cost water purification using locally sourced materials.',
    workMedia: ['https://images.unsplash.com/photo-1724055160815-9d8bc830a609?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080'],
  },
  {
    id: 'award-7',
    name: 'Kwame Asante',
    type: 'Competitions Award',
    competition: 'Afri \u2013 Anime',
    category: 'Senior Secondary',
    position: 2,
    image: 'https://images.unsplash.com/photo-1650316516580-48f18fb6bc5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    country: 'Ghana',
    year: 2026,
    rewards: ['Silver Medal', '$800 Prize Money', 'Certificate of Recognition', 'Work Publication across AfriScience Hub Platform'],
    certificate: 'https://images.unsplash.com/photo-1646769762753-565020b3bb2c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    badgeImage: 'https://images.unsplash.com/photo-1601987077677-5346c0c57b9f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    awardPresentation: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    workSummary: 'A 2D animated series on African math legends aimed at secondary school students.',
  },
  {
    id: 'award-8',
    name: 'Zara Mbeki',
    type: 'Competitions Award',
    competition: 'Afri \u2013 Memes',
    category: 'General (18+)',
    position: 1,
    image: 'https://images.unsplash.com/photo-1744972974316-c6a5142da3c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    country: 'South Africa',
    year: 2026,
    rewards: ['Gold Medal', '$800 Grand Prize', 'Certificate of Recognition', 'Possible Feature in Hall of Fame', 'Work Publication across AfriScience Hub Platform'],
    certificate: 'https://images.unsplash.com/photo-1646769762753-565020b3bb2c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    badgeImage: 'https://images.unsplash.com/photo-1601987077677-5346c0c57b9f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    awardPresentation: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    socialLinks: { linkedin: '#', twitter: '#', instagram: '#', facebook: '#' },
    workSummary: 'A viral meme campaign that popularized climate science among Gen Z Africans.',
    workMedia: ['https://images.unsplash.com/photo-1744972974316-c6a5142da3c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080'],
  },
  {
    id: 'award-9',
    name: 'Thabo Mokoena',
    type: 'Competitions Award',
    competition: 'Afri \u2013 MySpace',
    category: 'General (18+)',
    position: 1,
    image: 'https://images.unsplash.com/photo-1738963785992-dd0132bbac3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    country: 'South Africa',
    year: 2026,
    rewards: ['Gold Medal', '$800 Grand Prize', 'Certificate of Recognition', 'Possible Feature in Hall of Fame', 'Work Publication across AfriScience Hub Platform'],
    certificate: 'https://images.unsplash.com/photo-1646769762753-565020b3bb2c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    badgeImage: 'https://images.unsplash.com/photo-1601987077677-5346c0c57b9f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    awardPresentation: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    workSummary: 'Designed an immersive MySpace-style virtual science fair platform.',
  },
  {
    id: 'award-10',
    name: 'Grace Mutumba',
    type: 'Donations Award',
    image: 'https://images.unsplash.com/photo-1722199792994-62fa123b89c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    country: 'Uganda',
    year: 2026,
    rewards: ['AfriScience Hub Donor Badge', 'Certificate of Recognition', 'Feature in Annual Donor Magazine'],
    certificate: 'https://images.unsplash.com/photo-1646769762753-565020b3bb2c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    badgeImage: 'https://images.unsplash.com/photo-1611926653458-09294b3142bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    awardPresentation: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    socialLinks: { linkedin: '#', twitter: '#', instagram: '#', facebook: '#' },
    workSummary: 'Donated $50,000 to fund scholarships for women in STEM across East Africa.',
  },
  {
    id: 'award-11',
    name: 'Mohamed Al-Rashid',
    type: 'Donations Award',
    image: 'https://images.unsplash.com/photo-1548782033-3ac3a62ece8d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    country: 'United Arab Emirates',
    year: 2026,
    rewards: ['AfriScience Hub Donor Badge', 'Certificate of Recognition'],
    certificate: 'https://images.unsplash.com/photo-1646769762753-565020b3bb2c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    badgeImage: 'https://images.unsplash.com/photo-1611926653458-09294b3142bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    awardPresentation: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    workSummary: 'Funded water sanitation projects in 20 rural communities across the Sahel region.',
  },
  {
    id: 'award-12',
    name: 'Chen Wei',
    type: 'Sponsorships Award',
    image: 'https://images.unsplash.com/photo-1690820498008-8941d1b32e2b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    country: 'China',
    year: 2025,
    rewards: ['AfriScience Hub Sponsorship Badge', 'Certificate of Recognition', 'Web-space Marketing'],
    certificate: 'https://images.unsplash.com/photo-1646769762753-565020b3bb2c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    badgeImage: 'https://images.unsplash.com/photo-1611926653458-09294b3142bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    awardPresentation: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    workSummary: 'Sponsored the AfriScience developer bootcamp with cloud credits and mentorship.',
  },
  {
    id: 'award-13',
    name: 'Nadia Bouazizi',
    type: 'Competitions Award',
    competition: 'Afri \u2013 Memes',
    category: 'General (18+)',
    position: 2,
    image: 'https://images.unsplash.com/photo-1592393532405-fb1f165c4a1f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    country: 'Egypt',
    year: 2026,
    rewards: ['Silver Medal', '$500 Prize Money', 'Certificate of Recognition', 'Work Publication across AfriScience Hub Platform'],
    certificate: 'https://images.unsplash.com/photo-1646769762753-565020b3bb2c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    badgeImage: 'https://images.unsplash.com/photo-1601987077677-5346c0c57b9f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    awardPresentation: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    workSummary: 'Created memes that made complex AI concepts accessible to the general public.',
  },
  {
    id: 'award-14',
    name: 'Kofi Mensah',
    type: 'Competitions Award',
    competition: 'Afri \u2013 Presentations',
    category: 'Lower Primary',
    position: 1,
    image: 'https://images.unsplash.com/photo-1655720357761-f18ea9e5e7e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    country: 'Ghana',
    year: 2026,
    rewards: ['Gold Medal', 'Educational Tablet', 'Advanced School Kit', 'Certificate of Recognition', 'Possible Feature in Hall of Fame', 'Work Publication across AfriScience Hub Platform'],
    certificate: 'https://images.unsplash.com/photo-1646769762753-565020b3bb2c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    badgeImage: 'https://images.unsplash.com/photo-1601987077677-5346c0c57b9f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    awardPresentation: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    workSummary: 'A colorful presentation on how plants grow, using handmade dioramas.',
  },
  {
    id: 'award-15',
    name: 'Hassan Mwangi',
    type: 'Competitions Award',
    competition: 'Afri \u2013 Presentations',
    category: 'Graduates',
    position: 1,
    image: 'https://images.unsplash.com/photo-1768489038212-3202a936734f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    country: 'Kenya',
    year: 2026,
    rewards: ['Gold Medal', '$2,500 Grand Prize', 'Laptop PC', 'Educational Tablet', 'Certificate of Recognition', 'Possible Feature in Hall of Fame', 'Work Publication across AfriScience Hub Platform'],
    certificate: 'https://images.unsplash.com/photo-1646769762753-565020b3bb2c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    badgeImage: 'https://images.unsplash.com/photo-1601987077677-5346c0c57b9f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    awardPresentation: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    socialLinks: { linkedin: '#', twitter: '#', instagram: '#', facebook: '#' },
    workSummary: 'A doctoral-level presentation on quantum computing applications in drug discovery.',
    workMedia: ['https://images.unsplash.com/photo-1768489038212-3202a936734f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080'],
  },
];

export const WORLD_COUNTRIES = [
  'Afghanistan','Albania','Algeria','Andorra','Angola','Antigua and Barbuda','Argentina','Armenia','Australia','Austria',
  'Azerbaijan','Bahamas','Bahrain','Bangladesh','Barbados','Belarus','Belgium','Belize','Benin','Bhutan',
  'Bolivia','Bosnia and Herzegovina','Botswana','Brazil','Brunei','Bulgaria','Burkina Faso','Burundi','Cabo Verde','Cambodia',
  'Cameroon','Canada','Central African Republic','Chad','Chile','China','Colombia','Comoros','Congo','Costa Rica',
  'Croatia','Cuba','Cyprus','Czech Republic','Denmark','Djibouti','Dominica','Dominican Republic','Ecuador','Egypt',
  'El Salvador','Equatorial Guinea','Eritrea','Estonia','Eswatini','Ethiopia','Fiji','Finland','France','Gabon',
  'Gambia','Georgia','Germany','Ghana','Greece','Grenada','Guatemala','Guinea','Guinea-Bissau','Guyana',
  'Haiti','Honduras','Hungary','Iceland','India','Indonesia','Iran','Iraq','Ireland','Israel',
  'Italy','Ivory Coast','Jamaica','Japan','Jordan','Kazakhstan','Kenya','Kiribati','Kuwait','Kyrgyzstan',
  'Laos','Latvia','Lebanon','Lesotho','Liberia','Libya','Liechtenstein','Lithuania','Luxembourg','Madagascar',
  'Malawi','Malaysia','Maldives','Mali','Malta','Marshall Islands','Mauritania','Mauritius','Mexico','Micronesia',
  'Moldova','Monaco','Mongolia','Montenegro','Morocco','Mozambique','Myanmar','Namibia','Nauru','Nepal',
  'Netherlands','New Zealand','Nicaragua','Niger','Nigeria','North Korea','North Macedonia','Norway','Oman','Pakistan',
  'Palau','Palestine','Panama','Papua New Guinea','Paraguay','Peru','Philippines','Poland','Portugal','Qatar',
  'Romania','Russia','Rwanda','Saint Kitts and Nevis','Saint Lucia','Saint Vincent and the Grenadines','Samoa','San Marino',
  'Sao Tome and Principe','Saudi Arabia','Senegal','Serbia','Seychelles','Sierra Leone','Singapore','Slovakia','Slovenia',
  'Solomon Islands','Somalia','South Africa','South Korea','South Sudan','Spain','Sri Lanka','Sudan','Suriname','Sweden',
  'Switzerland','Syria','Taiwan','Tajikistan','Tanzania','Thailand','Timor-Leste','Togo','Tonga','Trinidad and Tobago',
  'Tunisia','Turkey','Turkmenistan','Tuvalu','Uganda','Ukraine','United Arab Emirates','United Kingdom','United States',
  'Uruguay','Uzbekistan','Vanuatu','Vatican City','Venezuela','Vietnam','Yemen','Zambia','Zimbabwe'
];

export const AWARD_TYPES = ["Developers Award", "Sponsorships Award", "Competitions Award", "Donations Award"];

export const AWARD_YEARS = [2026, 2025, 2024];

export const CENTER_FIELDS = [
  'Medical', 'Engineering', 'Pharmaceutical', 'Computer & ICT', 'Hybrid',
  'Veterinary', 'Agriculture', 'Food & Nutrition', 'Physics', 'Chemistry',
  'Biology', 'Environmental', 'Industry & Manufacturing', 'Energy & Power',
  'Waste & Recycling', 'Astronomy & Space'
];

export const CENTER_CATEGORIES_BY_FIELD: Record<string, string[]> = {
  'Medical': [
    'Basic Clinical Diagnostics', 'Blood | Transfusion', 'Cardiovascular', 'Dentistry | Orals',
    'Endocrine | Metabolism', 'Fertility | Reproduction', 'Gastrointestinal', 'Geriatrics',
    'Haematology | Haematopoiesis', 'Histology', 'Immunology | Allergy | Lymphatic',
    'Integumentary', 'Intensive Care', 'Molecular | Genetics', 'Musculoskeletal',
    'Neurology', 'Oncology', 'Palliative Care', 'Parasitology', 'Pathology',
    'Pediatrics | Neonatal', 'Psychiatry | Rehab', 'Public Health | Epidemiology',
    'Radiology | Sonography', 'Rehabilitative', 'Renal', 'Respiratory', 'Sensory'
  ],
  'Engineering': [
    'Civil Engineering', 'Mechanical Engineering', 'Electrical Engineering',
    'Chemical Engineering', 'Biomedical Engineering', 'Structural Engineering',
    'Geotechnical Engineering', 'Materials Science'
  ],
  'Pharmaceutical': [
    'Drug Discovery', 'Quality Control', 'Herbal Medicine', 'Clinical Pharmacology',
    'Toxicology', 'Pharmaceutical Manufacturing', 'Drug Formulation'
  ],
  'Computer & ICT': [
    'Cybersecurity', 'AI & Machine Learning', 'Cloud Computing', 'Data Analytics',
    'Software Engineering', 'Networking & Telecoms', 'Blockchain & Fintech'
  ],
  'Hybrid': ['Interdisciplinary Research', 'Multi-field Diagnostics', 'Cross-functional Labs'],
  'Veterinary': [
    'Livestock Health', 'Pet Care', 'Wildlife Conservation', 'Animal Nutrition',
    'Aquaculture Health', 'Poultry Science'
  ],
  'Agriculture': [
    'Crop Science', 'Soil Science', 'Precision Farming', 'Irrigation Systems',
    'Post-Harvest Technology', 'Agricultural Economics'
  ],
  'Food & Nutrition': [
    'Food Safety', 'Nutrition Science', 'Food Processing', 'Quality Assurance',
    'Food Microbiology', 'Dietary Research'
  ],
  'Physics': ['Applied Physics', 'Nuclear Physics', 'Optics & Photonics', 'Acoustics', 'Geophysics'],
  'Chemistry': ['Analytical Chemistry', 'Organic Chemistry', 'Inorganic Chemistry', 'Biochemistry', 'Petrochemistry'],
  'Biology': ['Microbiology', 'Cell Biology', 'Marine Biology', 'Biotechnology', 'Ecology'],
  'Environmental': [
    'Climate Research', 'Conservation Biology', 'Water Resources', 'Pollution Control',
    'Waste Management', 'Environmental Impact Assessment'
  ],
  'Industry & Manufacturing': [
    'Industrial Automation', 'Quality Engineering', 'Process Optimization',
    'Supply Chain Technology', 'Additive Manufacturing'
  ],
  'Energy & Power': ['Solar Energy', 'Wind Power', 'Bioenergy', 'Grid Systems', 'Hydropower', 'Nuclear Energy'],
  'Waste & Recycling': [
    'Solid Waste Management', 'E-Waste Recycling', 'Plastic Recycling',
    'Hazardous Waste', 'Composting & Organic Waste'
  ],
  'Astronomy & Space': ['Astrophysics', 'Satellite Technology', 'Space Weather', 'Planetary Science', 'Radio Astronomy']
};

export const CENTER_OWNERSHIP_OPTIONS = [
  'Private', 'Government | Public', 'Academic', 'Mission', 'Corporate', 'Inter-Government', 'NGO | Charity', 'Other'
];

export const CENTER_SERVICES = [
  'Diagnosis (Screening)', 'Guidance & Counseling', 'Monitoring', 'Prevention & Control',
  'Quality Control & Assurance', 'Research & Development', 'Result Interpretation',
  'Safety & Compliance', 'Sales', 'Surgery', 'Training (Industrial)', 'Transplant',
  'Treatment', 'Workspace & Accommodation'
];

export const SPECIALIST_CENTERS = [
  {
    id: 'center-1',
    name: 'Lagos Biomedical Diagnostics Center',
    motto: 'Precision Diagnostics, Better Outcomes',
    address: '14 Broad Street, Victoria Island',
    field: 'Medical',
    categories: ['Basic Clinical Diagnostics', 'Haematology | Haematopoiesis', 'Molecular | Genetics'],
    ownership: 'Private',
    status: 'Online',
    location: 'Lagos, Nigeria',
    country: 'Nigeria',
    state: 'Lagos',
    rating: 4.8,
    reviews: 189,
    views: 14200,
    likes: 4500,
    favorites: 1650,
    shares: 720,
    verified: true,
    bookingsCount: 1240,
    image: 'https://images.unsplash.com/photo-1758101512269-660feabf64fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    description: 'Lagos Biomedical Diagnostics Center is a premier medical diagnostics facility offering cutting-edge screening, blood analysis, and molecular genetic testing. Our state-of-the-art laboratory serves over 1,000 patients monthly with fast, accurate results.',
    services: ['Diagnosis (Screening)', 'Result Interpretation', 'Research & Development', 'Training (Industrial)', 'Quality Control & Assurance'],
    scopes: ['Full Blood Count Panels', 'PCR & Genetic Sequencing', 'Rapid Antigen Testing'],
    serviceCost: [
      { service: 'Diagnosis (Screening)', range: '\u20A610,000 - \u20A650,000' },
      { service: 'Result Interpretation', range: '\u20A65,000 - \u20A615,000' },
      { service: 'Training (Industrial)', range: '\u20A6100,000 - \u20A6250,000' },
      { service: 'Research & Development', range: '\u20A6500,000 - \u20A61,000,000' }
    ],
    otherFees: [
      { name: 'Consultation Fee', amount: '\u20A65,000' },
      { name: 'Sample Collection Fee', amount: '\u20A63,000' },
      { name: 'Urgent Processing (Same Day)', amount: '\u20A615,000' },
      { name: 'Report Duplication', amount: '\u20A62,000' }
    ],
    certifications: [
      { name: 'ISO 15189:2022', issuer: 'Standards Organisation of Nigeria', year: '2022', description: 'Medical laboratories quality and competence accreditation.' },
      { name: 'MLSCN Licensed', issuer: 'Medical Lab Science Council of Nigeria', year: '2018', description: 'Licensed to operate as a medical diagnostics laboratory.' },
      { name: 'WHO Certified Lab', issuer: 'World Health Organization', year: '2021', description: 'Certified for diagnostic testing quality standards.' }
    ],
    policies: [
      'All test results are delivered within 24-48 hours for standard panels.',
      'Patient data is strictly confidential under HIPAA-equivalent standards.',
      'Walk-in patients are welcome; appointments are recommended for specialized tests.',
      'Insurance claims are processed for partner HMO providers.'
    ],
    awards: [
      { title: 'Best Diagnostic Lab in West Africa', year: '2023' },
      { title: 'Innovation in Genetic Testing Award', year: '2024' }
    ],
    testimonials: [
      { user: 'Dr. Funke Adeyemi', role: 'Referring Physician', content: 'The turnaround time and accuracy of results from Lagos Biomedical is unmatched.', rating: 5 },
      { user: 'Mrs. Chidinma Obi', role: 'Patient', content: 'Professional, clean facility with friendly staff. Got my results the same day!', rating: 5 },
      { user: 'Prof. Emeka Nwosu', role: 'Research Partner', content: 'Our collaboration on genomic research has been incredibly productive.', rating: 4 }
    ],
    gallery: {
      frontGate: ['https://images.unsplash.com/photo-1761821221774-a1c2c81616d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800'],
      compound: ['https://images.unsplash.com/photo-1694787590597-ba49c7cdc2cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800'],
      hallways: ['https://images.unsplash.com/photo-1559137781-875af01c14bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800'],
      operationsRoom: ['https://images.unsplash.com/photo-1758101512269-660feabf64fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800'],
      instruments: ['https://images.unsplash.com/photo-1766297247072-93fd815afef3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800'],
      laboratories: ['https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=800'],
      offices: ['https://images.unsplash.com/photo-1559137781-875af01c14bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800'],
      others: ['https://images.unsplash.com/photo-1581093458791-9f302e6d862e?auto=format&fit=crop&q=80&w=800']
    },
    contact: { phone: '+234 800 555 1234', email: 'info@lagosbiomedical.ng', website: 'www.lagosbiomedical.ng', linkedin: 'linkedin.com/company/lagosbiomedical', twitter: '@LagosBiomed', mapCoords: { lat: 6.4281, lng: 3.4219 } }
  },
  {
    id: 'center-2',
    name: 'Nairobi Environmental Sciences Hub',
    motto: 'Protecting Africa\'s Natural Heritage',
    address: '88 Uhuru Highway',
    field: 'Environmental',
    categories: ['Climate Research', 'Conservation Biology', 'Water Resources'],
    ownership: 'NGO | Charity',
    status: 'Online',
    location: 'Nairobi, Kenya',
    country: 'Kenya',
    state: 'Nairobi',
    rating: 4.7,
    reviews: 97,
    views: 8900,
    likes: 2800,
    favorites: 980,
    shares: 450,
    verified: true,
    bookingsCount: 380,
    image: 'https://images.unsplash.com/photo-1742970936099-b68c962278c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    description: 'Specializing in climate change research, conservation biology, and sustainable resource management across East Africa.',
    services: ['Research & Development', 'Monitoring', 'Quality Control & Assurance', 'Training (Industrial)', 'Guidance & Counseling'],
    scopes: ['Carbon Emission Audits', 'Biodiversity Mapping', 'EIA Consulting'],
    serviceCost: [
      { service: 'Research & Development', range: 'KES 200,000 - KES 500,000' },
      { service: 'Monitoring', range: 'KES 50,000 - KES 150,000' },
      { service: 'Training (Industrial)', range: 'KES 80,000 - KES 200,000' }
    ],
    otherFees: [
      { name: 'Field Visit Fee', amount: 'KES 30,000' },
      { name: 'Equipment Rental', amount: 'KES 15,000/day' },
      { name: 'Data Report Fee', amount: 'KES 10,000' }
    ],
    certifications: [
      { name: 'NEMA Certified', issuer: 'National Environment Management Authority', year: '2019', description: 'Certified for environmental impact assessments in Kenya.' },
      { name: 'ISO 14001:2015', issuer: 'Kenya Bureau of Standards', year: '2020', description: 'Environmental management systems certification.' }
    ],
    policies: ['Environmental data is shared publicly unless under NDA.', 'Field research requires prior safety clearance.', 'All projects must align with the UN SDGs.'],
    awards: [{ title: 'UNEP Green Innovation Award', year: '2023' }],
    testimonials: [
      { user: 'Dr. Wanjiku Kamau', role: 'Conservation Scientist', content: 'Their biodiversity mapping project in the Mau Forest was groundbreaking.', rating: 5 },
      { user: 'Kenya Wildlife Service', role: 'Partner Organization', content: 'A reliable partner for our environmental monitoring initiatives.', rating: 4 }
    ],
    gallery: { compound: ['https://images.unsplash.com/photo-1742970936099-b68c962278c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800'], laboratories: ['https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=800'], others: ['https://images.unsplash.com/photo-1769259047014-83149b3c9ca7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800'] },
    contact: { phone: '+254 700 987 654', email: 'contact@nairobienviro.ke', website: 'www.nairobienviro.ke', twitter: '@NairobiEnviro', mapCoords: { lat: -1.2921, lng: 36.8219 } }
  },
  {
    id: 'center-3',
    name: 'Accra AgriTech Innovation Lab',
    motto: 'Feeding Africa Through Science',
    address: '22 Liberation Road',
    field: 'Agriculture',
    categories: ['Crop Science', 'Soil Science', 'Precision Farming'],
    ownership: 'Academic',
    status: 'Offline',
    location: 'Accra, Ghana',
    country: 'Ghana',
    state: 'Greater Accra',
    rating: 4.9,
    reviews: 68,
    views: 6400,
    likes: 2100,
    favorites: 780,
    shares: 340,
    verified: true,
    bookingsCount: 290,
    image: 'https://images.unsplash.com/photo-1769259047014-83149b3c9ca7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    description: 'Cutting-edge agricultural technology center focused on food security, smart farming, and sustainable crop development.',
    services: ['Research & Development', 'Diagnosis (Screening)', 'Training (Industrial)', 'Quality Control & Assurance'],
    scopes: ['Soil Nutrient Analysis', 'Seed Certification', 'Drone-Assisted Farming'],
    serviceCost: [
      { service: 'Diagnosis (Screening)', range: 'GHS 500 - GHS 2,000' },
      { service: 'Research & Development', range: 'GHS 5,000 - GHS 20,000' },
      { service: 'Training (Industrial)', range: 'GHS 1,500 - GHS 5,000' }
    ],
    otherFees: [
      { name: 'Soil Sample Kit', amount: 'GHS 200' },
      { name: 'Drone Survey Fee', amount: 'GHS 3,000' },
      { name: 'Certificate of Analysis', amount: 'GHS 150' }
    ],
    certifications: [{ name: 'Ghana EPA Approved', issuer: 'Environmental Protection Agency Ghana', year: '2020', description: 'Approved for agricultural and environmental research.' }],
    policies: ['All research partnerships require a formal MoU.', 'Samples must be properly labeled.', 'Training programs run quarterly with open enrollment.'],
    awards: [{ title: 'Best AgriTech Lab in West Africa', year: '2024' }, { title: 'FAO Innovation Partner', year: '2023' }],
    testimonials: [{ user: 'Dr. Kofi Mensah', role: 'Agri-Scientist', content: 'Precision farming tools they developed increased yields by 35% for our partner farms.', rating: 5 }],
    gallery: { compound: ['https://images.unsplash.com/photo-1769259047014-83149b3c9ca7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800'], laboratories: ['https://images.unsplash.com/photo-1609819390597-783ccdfc2529?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800'] },
    contact: { phone: '+233 30 234 5678', email: 'info@accraagritech.gh', website: 'www.accraagritech.gh', mapCoords: { lat: 5.6037, lng: -0.1870 } }
  },
  {
    id: 'center-4',
    name: 'Cairo Pharma Testing Laboratory',
    motto: 'Quality Assurance for a Healthier Africa',
    address: '5 El-Tahrir Square',
    field: 'Pharmaceutical',
    categories: ['Drug Discovery', 'Quality Control', 'Clinical Pharmacology'],
    ownership: 'Corporate',
    status: 'Online',
    location: 'Cairo, Egypt',
    country: 'Egypt',
    state: 'Cairo',
    rating: 4.6,
    reviews: 134,
    views: 11200,
    likes: 3400,
    favorites: 1100,
    shares: 580,
    verified: true,
    bookingsCount: 920,
    image: 'https://images.unsplash.com/photo-1757578097654-fdae0f7cf008?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    description: 'A leading pharmaceutical testing and quality assurance center serving North and East Africa.',
    services: ['Quality Control & Assurance', 'Research & Development', 'Diagnosis (Screening)', 'Safety & Compliance', 'Result Interpretation'],
    scopes: ['Drug Stability Studies', 'Bioequivalence Testing', 'GMP Auditing'],
    serviceCost: [{ service: 'Quality Control & Assurance', range: 'EGP 15,000 - EGP 50,000' }, { service: 'Research & Development', range: 'EGP 100,000 - EGP 500,000' }],
    otherFees: [
      { name: 'Sample Registration', amount: 'EGP 2,000' },
      { name: 'Stability Chamber Usage', amount: 'EGP 10,000/month' },
      { name: 'Express Testing Surcharge', amount: 'EGP 5,000' }
    ],
    certifications: [{ name: 'EDA Licensed', issuer: 'Egyptian Drug Authority', year: '2017', description: 'Licensed pharmaceutical testing laboratory.' }, { name: 'ISO 17025:2017', issuer: 'Egyptian Accreditation Council', year: '2021', description: 'Testing and calibration laboratory accreditation.' }],
    policies: ['All pharmaceutical samples must be accompanied by proper documentation.', 'Results issued in compliance with ICH guidelines.', 'Confidentiality agreements mandatory.'],
    awards: [{ title: 'Top Pharma Lab MENA Region', year: '2022' }],
    testimonials: [{ user: 'Pharma Egypt Ltd.', role: 'Client', content: 'Their quality control testing is thorough and fast.', rating: 5 }, { user: 'Dr. Heba Mostafa', role: 'Pharmacologist', content: 'Professional team with deep expertise in bioequivalence studies.', rating: 4 }],
    gallery: { laboratories: ['https://images.unsplash.com/photo-1757578097654-fdae0f7cf008?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800'], instruments: ['https://images.unsplash.com/photo-1766297247072-93fd815afef3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800'] },
    contact: { phone: '+20 2 2345 6789', email: 'info@cairopharmalab.eg', website: 'www.cairopharmalab.eg', linkedin: 'linkedin.com/company/cairopharmalab', mapCoords: { lat: 30.0444, lng: 31.2357 } }
  },
  {
    id: 'center-5',
    name: 'Johannesburg Veterinary Research Institute',
    motto: 'Advancing Animal Health Science',
    address: '100 Jan Smuts Avenue, Rosebank',
    field: 'Veterinary',
    categories: ['Livestock Health', 'Wildlife Conservation', 'Animal Nutrition'],
    ownership: 'Government | Public',
    status: 'Online',
    location: 'Johannesburg, South Africa',
    country: 'South Africa',
    state: 'Gauteng',
    rating: 4.5,
    reviews: 82,
    views: 7600,
    likes: 2200,
    favorites: 640,
    shares: 290,
    verified: true,
    bookingsCount: 560,
    image: 'https://images.unsplash.com/photo-1735837893073-fef13dedc842?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    description: 'Government-backed veterinary research institute focused on livestock disease control and wildlife conservation medicine.',
    services: ['Diagnosis (Screening)', 'Treatment', 'Research & Development', 'Prevention & Control', 'Training (Industrial)'],
    scopes: ['Livestock Vaccination Programs', 'Game Reserve Health Monitoring', 'Feed Quality Analysis'],
    serviceCost: [{ service: 'Diagnosis (Screening)', range: 'R 500 - R 2,000' }, { service: 'Treatment', range: 'R 1,000 - R 5,000' }, { service: 'Research & Development', range: 'R 20,000 - R 100,000' }],
    otherFees: [
      { name: 'Emergency Callout Fee', amount: 'R 1,500' },
      { name: 'Specimen Transport', amount: 'R 800' },
      { name: 'Lab Access (External)', amount: 'R 3,000/day' }
    ],
    certifications: [{ name: 'SAVC Registered', issuer: 'South African Veterinary Council', year: '2010', description: 'Registered veterinary research and diagnostic facility.' }, { name: 'OIE Reference Lab', issuer: 'World Organisation for Animal Health', year: '2019', description: 'Reference laboratory for select animal diseases.' }],
    policies: ['Animal specimens must follow OIE biosafety standards.', 'Emergency disease outbreak assistance available 24/7.', 'All research complies with the Animal Protection Act.'],
    awards: [{ title: 'OIE Excellence in Veterinary Science', year: '2023' }, { title: 'Best Government Lab in Southern Africa', year: '2021' }],
    testimonials: [{ user: 'Dr. Sipho Ndlovu', role: 'State Veterinarian', content: 'Their rapid response during the FMD outbreak saved thousands of livestock.', rating: 5 }, { user: 'Kruger National Park', role: 'Partner', content: 'Invaluable partner in our wildlife health monitoring programs.', rating: 5 }],
    gallery: { frontGate: ['https://images.unsplash.com/photo-1735837893073-fef13dedc842?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800'], laboratories: ['https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=800'], others: ['https://images.unsplash.com/photo-1766297247072-93fd815afef3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800'] },
    contact: { phone: '+27 11 555 0987', email: 'research@jvri.gov.za', website: 'www.jvri.gov.za', mapCoords: { lat: -26.1496, lng: 28.0383 } }
  },
  {
    id: 'center-6',
    name: 'Kigali ICT & Cybersecurity Center',
    motto: 'Securing Africa\'s Digital Future',
    address: 'Kigali Innovation City, Gasabo',
    field: 'Computer & ICT',
    categories: ['Cybersecurity', 'AI & Machine Learning', 'Data Analytics'],
    ownership: 'Corporate',
    status: 'Online',
    location: 'Kigali, Rwanda',
    country: 'Rwanda',
    state: 'Kigali City',
    rating: 4.8,
    reviews: 56,
    views: 9300,
    likes: 3100,
    favorites: 1050,
    shares: 490,
    verified: false,
    bookingsCount: 410,
    image: 'https://images.unsplash.com/photo-1744868562210-fffb7fa882d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    description: 'A next-generation cybersecurity and AI research center serving governments and enterprises across East and Central Africa.',
    services: ['Diagnosis (Screening)', 'Monitoring', 'Training (Industrial)', 'Research & Development', 'Safety & Compliance'],
    scopes: ['Penetration Testing', 'SOC-as-a-Service', 'AI Model Auditing'],
    serviceCost: [{ service: 'Diagnosis (Screening)', range: 'RWF 500,000 - RWF 2,000,000' }, { service: 'Monitoring', range: 'RWF 1,000,000 - RWF 5,000,000/yr' }],
    otherFees: [
      { name: 'Onboarding Fee', amount: 'RWF 200,000' },
      { name: 'Compliance Audit', amount: 'RWF 500,000' },
      { name: 'Incident Report Fee', amount: 'RWF 100,000' }
    ],
    certifications: [{ name: 'RURA Licensed', issuer: 'Rwanda Utilities Regulatory Authority', year: '2021', description: 'Licensed ICT service provider in Rwanda.' }, { name: 'ISO 27001:2022', issuer: 'Rwanda Standards Board', year: '2023', description: 'Information security management systems certification.' }],
    policies: ['Penetration testing requires written authorization.', 'Client data never shared with third parties.', 'SOC monitoring requires 12-month minimum.'],
    awards: [{ title: 'Best Cybersecurity Startup East Africa', year: '2024' }],
    testimonials: [{ user: 'Bank of Kigali', role: 'Client', content: 'Their penetration testing identified critical vulnerabilities we had missed for years.', rating: 5 }, { user: 'Rwanda ICT Chamber', role: 'Partner', content: 'A flagship center for digital security in East Africa.', rating: 5 }],
    gallery: { compound: ['https://images.unsplash.com/photo-1744868562210-fffb7fa882d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800'], offices: ['https://images.unsplash.com/photo-1559137781-875af01c14bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800'] },
    contact: { phone: '+250 78 888 1234', email: 'info@kigalicyber.rw', website: 'www.kigalicyber.rw', twitter: '@KigaliCyber', linkedin: 'linkedin.com/company/kigalicyber', mapCoords: { lat: -1.9403, lng: 30.0587 } }
  },
  {
    id: 'center-7',
    name: 'Dakar Energy & Power Research Station',
    motto: 'Powering Africa Sustainably',
    address: 'Route de Rufisque, Pikine',
    field: 'Energy & Power',
    categories: ['Solar Energy', 'Wind Power', 'Grid Systems'],
    ownership: 'Inter-Government',
    status: 'Offline',
    location: 'Dakar, Senegal',
    country: 'Senegal',
    state: 'Dakar',
    rating: 4.4,
    reviews: 45,
    views: 5200,
    likes: 1600,
    favorites: 480,
    shares: 210,
    verified: true,
    bookingsCount: 180,
    image: 'https://images.unsplash.com/photo-1763114613273-ec505136d03a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    description: 'An inter-governmental research station dedicated to renewable energy solutions for West Africa.',
    services: ['Research & Development', 'Monitoring', 'Training (Industrial)', 'Guidance & Counseling'],
    scopes: ['Solar Farm Design', 'Mini-Grid Solutions', 'Energy Policy Advisory'],
    serviceCost: [{ service: 'Research & Development', range: 'XOF 5,000,000 - XOF 20,000,000' }, { service: 'Monitoring', range: 'XOF 1,000,000 - XOF 5,000,000' }],
    otherFees: [
      { name: 'Site Assessment Fee', amount: 'XOF 500,000' },
      { name: 'Equipment Calibration', amount: 'XOF 200,000' }
    ],
    certifications: [{ name: 'ECOWAS Energy Centre Affiliate', issuer: 'ECREEE', year: '2020', description: 'Recognized affiliate of the ECOWAS Centre for Renewable Energy.' }],
    policies: ['All feasibility studies follow IRENA guidelines.', 'Research data is open-access unless classified.', 'Training programs are subsidized for government officials.'],
    awards: [],
    testimonials: [{ user: 'ECOWAS Commission', role: 'Partner', content: 'A critical institution for advancing renewable energy across the region.', rating: 4 }],
    gallery: { compound: ['https://images.unsplash.com/photo-1763114613273-ec505136d03a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800'] },
    contact: { phone: '+221 33 800 1234', email: 'info@dakarenergy.sn', website: 'www.dakarenergy.sn', mapCoords: { lat: 14.7167, lng: -17.4677 } }
  },
  {
    id: 'center-8',
    name: 'Kampala Food Safety & Nutrition Center',
    motto: 'Safe Food, Healthy Nation',
    address: '7 Jinja Road, Kampala',
    field: 'Food & Nutrition',
    categories: ['Food Safety', 'Nutrition Science', 'Quality Assurance'],
    ownership: 'Government | Public',
    status: 'Online',
    location: 'Kampala, Uganda',
    country: 'Uganda',
    state: 'Central',
    rating: 4.3,
    reviews: 38,
    views: 4100,
    likes: 1200,
    favorites: 350,
    shares: 150,
    verified: true,
    bookingsCount: 220,
    image: 'https://images.unsplash.com/photo-1609819390597-783ccdfc2529?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    description: 'A government-run food safety and nutrition center ensuring food quality standards across Uganda and the East African Community.',
    services: ['Quality Control & Assurance', 'Diagnosis (Screening)', 'Research & Development', 'Safety & Compliance', 'Training (Industrial)'],
    scopes: ['Mycotoxin Testing', 'Nutritional Labeling Compliance', 'Food Processing Advisory'],
    serviceCost: [{ service: 'Diagnosis (Screening)', range: 'UGX 100,000 - UGX 500,000' }, { service: 'Quality Control & Assurance', range: 'UGX 300,000 - UGX 1,000,000' }],
    otherFees: [
      { name: 'Sample Container Fee', amount: 'UGX 20,000' },
      { name: 'Rush Processing', amount: 'UGX 150,000' },
      { name: 'Export Documentation', amount: 'UGX 50,000' }
    ],
    certifications: [{ name: 'UNBS Approved', issuer: 'Uganda National Bureau of Standards', year: '2018', description: 'Approved testing laboratory for food products.' }],
    policies: ['Food samples must be delivered in approved sterile containers.', 'Test results shared only with the submitting party.', 'Compliance reports follow EAC food safety standards.'],
    awards: [{ title: 'EAC Food Safety Excellence', year: '2023' }],
    testimonials: [{ user: 'Uganda Manufacturers Association', role: 'Client', content: 'Essential service for food exporters. Their certifications are recognized across the EAC.', rating: 4 }],
    gallery: { laboratories: ['https://images.unsplash.com/photo-1609819390597-783ccdfc2529?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800'] },
    contact: { phone: '+256 41 234 5678', email: 'info@kampalafoodsafety.ug', website: 'www.kampalafoodsafety.ug', mapCoords: { lat: 0.3476, lng: 32.5825 } }
  }
];

export const PARTNERS = [
  { id: 'p-1', name: 'African Development Bank', logo: 'AfDB', brandColor: '#00964F' },
  { id: 'p-2', name: 'UNESCO', logo: 'UNESCO', brandColor: '#0077D4' },
  { id: 'p-3', name: 'Bill & Melinda Gates Foundation', logo: 'BMGF', brandColor: '#00A4E4' },
  { id: 'p-4', name: 'World Health Organization', logo: 'WHO', brandColor: '#009ADE' },
  { id: 'p-5', name: 'African Union', logo: 'AU', brandColor: '#078930' },
  { id: 'p-6', name: 'USAID', logo: 'USAID', brandColor: '#002F6C' },
  { id: 'p-7', name: 'European Commission', logo: 'EC', brandColor: '#003399' },
  { id: 'p-8', name: 'Mastercard Foundation', logo: 'MCF', brandColor: '#CF4500' },
  { id: 'p-9', name: 'Ford Foundation', logo: 'FF', brandColor: '#0066B3' },
  { id: 'p-10', name: 'Wellcome Trust', logo: 'WT', brandColor: '#F0B323' }
];