import type { SponsorDetail } from './data';

const SPONSOR_1: SponsorDetail = {
  id: 1,
  name: 'TechConnect Africa',
  image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
  industries: ['Technology', 'Telecommunications', 'Artificial Intelligence'],
  status: 'Online',
  tier: 'Platinum',
  country: 'Nigeria',
  state: 'Lagos',
  address: '45 Innovation Drive, Victoria Island',
  motto: 'Connecting Africa to the Digital Future',
  description: 'Leading technology solutions provider across West Africa, specializing in enterprise software, cloud infrastructure, and AI-powered business solutions.',
  catalog: [
    {
      industry: 'Technology',
      items: [
        {
          productName: 'Custom Software Development', currency: 'USD', price: '50000', ashDiscountPrice: '45000',
          specifications: ['Full-stack web and mobile application development', 'Agile methodology with 2-week sprints', 'Source code ownership and documentation', 'CI/CD pipeline setup and deployment', '90-day post-launch support'],
          images: ['https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400', 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400', 'https://images.unsplash.com/photo-1537432376074-2174a9b47e3c?w=400'],
        },
        {
          productName: 'Cloud Infrastructure Solutions', currency: 'USD', price: '12000', ashDiscountPrice: '10800',
          specifications: ['AWS, Azure and GCP architecture design', 'On-premise to cloud migration', 'Auto-scaling and load balancing', '24/7 monitoring and incident response', 'Monthly cost optimization reports'],
          images: ['https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400', 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400'],
        },
        {
          productName: 'Enterprise API Integration', currency: 'USD', price: '15000', ashDiscountPrice: 'N/A',
          specifications: ['RESTful and GraphQL API development', 'Third-party service integration', 'API gateway with rate limiting', 'Comprehensive API documentation', 'Security audit and pen testing'],
          images: ['https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400'],
        },
        {
          productName: 'Cybersecurity Audit & Hardening', currency: 'local', price: '8500000', ashDiscountPrice: '7650000',
          specifications: ['Vulnerability assessment and penetration testing', 'Network security architecture review', 'Compliance check (ISO 27001, GDPR, NDPR)', 'Security policy and incident response planning', 'Employee security awareness training'],
          images: ['https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400', 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400', 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400'],
        },
      ],
    },
    {
      industry: 'Telecommunications',
      items: [
        {
          productName: 'ISP Network Infrastructure Setup', currency: 'USD', price: '75000', ashDiscountPrice: '67500',
          specifications: ['End-to-end fiber optic network design and deployment', 'Core and edge router configuration', 'BGP and MPLS network setup', 'Network monitoring and management system', '99.9% uptime SLA guarantee'],
          images: ['https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400', 'https://images.unsplash.com/photo-1614064643863-2f337e72b47a?w=400'],
        },
        {
          productName: 'VoIP Phone System', currency: 'USD', price: '8000', ashDiscountPrice: '7200',
          specifications: ['SIP trunking and PBX system setup', 'Softphone and desk phone integration', 'IVR and call routing configuration', 'Call recording and analytics dashboard', 'Multi-branch extension management'],
          images: ['https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=400'],
        },
        {
          productName: '5G Fixed Wireless Access', currency: 'USD', price: '25000', ashDiscountPrice: 'N/A',
          specifications: ['5G CPE installation and configuration', 'Signal strength survey and antenna placement', 'Throughput optimization and QoS tuning', 'Remote management and firmware updates', 'Coverage mapping and expansion planning'],
          images: ['https://images.unsplash.com/photo-1614064643863-2f337e72b47a?w=400', 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400'],
        },
      ],
    },
    {
      industry: 'Artificial Intelligence',
      items: [
        {
          productName: 'Custom Machine Learning Models', currency: 'USD', price: '35000', ashDiscountPrice: '31500',
          specifications: ['Supervised and unsupervised model development', 'Dataset preparation, cleaning and augmentation', 'Model training, validation and hyperparameter tuning', 'Deployment as REST API or edge device', 'Performance monitoring and model retraining'],
          images: ['https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400', 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400'],
        },
        {
          productName: 'Computer Vision Solutions', currency: 'USD', price: '28000', ashDiscountPrice: '25200',
          specifications: ['Object detection, classification and tracking', 'OCR pipeline development', 'Facial recognition and liveness detection', 'Real-time video stream processing', 'CCTV and camera system integration'],
          images: ['https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400', 'https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=400'],
        },
        {
          productName: 'NLP Solutions', currency: 'USD', price: '22000', ashDiscountPrice: '19800',
          specifications: ['Custom chatbot and virtual assistant development', 'Sentiment analysis and text classification', 'Named entity recognition', 'Multi-language support (English, French, Swahili)', 'WhatsApp and Telegram integration'],
          images: ['https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400', 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400'],
        },
      ],
    },
  ],
  licenses: [
    { name: 'ISO 27001:2013 Certificate', issuer: 'ISO', year: 2023 },
    { name: 'Business Registration', issuer: 'Corporate Affairs Commission', year: 2018 },
    { name: 'Technology License', issuer: 'Ministry of Communications', year: 2020 },
  ],
  policies: [
    'All projects must have a signed contract before commencement',
    'Payment terms: 40% upfront, 30% at midpoint, 30% on completion',
    '90-day warranty on all software deliverables',
    'Confidentiality agreements are mandatory for all projects',
    '24/7 support services available for enterprise clients',
  ],
  awards: [
    { title: 'Best Tech Company West Africa 2023', org: 'African Tech Awards' },
    { title: 'Innovation Excellence Award 2022', org: 'Nigeria Tech Summit' },
    { title: 'SME Partner of the Year 2021', org: 'Microsoft Africa' },
  ],
  mediaGallery: [
    { type: 'image', url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600' },
    { type: 'image', url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600' },
    { type: 'image', url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600' },
    { type: 'image', url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600' },
    { type: 'video', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', thumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600' },
    { type: 'image', url: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=600' },
  ],
  contact: {
    phone: '+234 803 456 7890', email: 'info@techconnect.africa', website: 'www.techconnect.africa',
    linkedin: 'techconnect-africa', twitter: '@techconnectafrica', facebook: 'TechConnectAfrica',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.7589934511954!2d3.41889931477385!3d6.428055595357088!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8b2ae68280c1%3A0xdc9e87a367c3d9cb!2sLagos%2C%20Nigeria!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus',
  },
};

const SPONSOR_2: SponsorDetail = {
  id: 2,
  name: 'AfriMed Healthcare',
  image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800',
  industries: ['Healthcare & Medicals', 'Pharmacy & Drugs'],
  status: 'Online',
  tier: 'Gold',
  country: 'South Africa',
  state: 'Gauteng',
  address: '12 Medical Plaza, Sandton',
  motto: 'Health for All Africans',
  description: 'Comprehensive healthcare solutions and medical equipment supplier serving clinics and hospitals across Southern Africa.',
  catalog: [
    {
      industry: 'Healthcare & Medicals',
      items: [
        {
          productName: 'MRI Diagnostic Scanner', currency: 'USD', price: '450000', ashDiscountPrice: '425000',
          specifications: ['1.5T superconducting magnet', 'High-resolution imaging software', 'Automated patient positioning', 'Remote diagnostics capability', '5-year warranty and maintenance'],
          images: ['https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400', 'https://images.unsplash.com/photo-1581595219315-a187dd40c322?w=400'],
        },
        {
          productName: 'ICU Ventilator Systems', currency: 'USD', price: '35000', ashDiscountPrice: '31500',
          specifications: ['Invasive and non-invasive ventilation modes', 'Real-time patient monitoring dashboard', 'Battery backup up to 8 hours', 'Pediatric and adult configurations', 'HL7 integration with hospital systems'],
          images: ['https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=400', 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=400'],
        },
        {
          productName: 'Surgical Robotics Package', currency: 'USD', price: '120000', ashDiscountPrice: 'N/A',
          specifications: ['Minimally invasive surgical arms (4-axis)', '3D high-definition visualization system', 'Surgeon console with haptic feedback', 'Instrument tracking and analytics', 'Training and certification program'],
          images: ['https://images.unsplash.com/photo-1551076805-e1869033e561?w=400'],
        },
      ],
    },
    {
      industry: 'Pharmacy & Drugs',
      items: [
        {
          productName: 'Antimalarial Drug Supply', currency: 'USD', price: '250000', ashDiscountPrice: '230000',
          specifications: ['WHO-prequalified artemisinin-based therapies', 'Bulk packaging for institutional buyers', 'Cold chain logistics support', '12-month shelf life guarantee', 'Regulatory compliance documentation'],
          images: ['https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400', 'https://images.unsplash.com/photo-1550572017-edd951b55104?w=400'],
        },
        {
          productName: 'Vaccine Cold Chain Equipment', currency: 'USD', price: '85000', ashDiscountPrice: '76500',
          specifications: ['Solar-powered vaccine refrigerators', 'Temperature monitoring IoT sensors', 'WHO PQS certified', 'Battery backup for 72-hour holdover', 'Remote alarm and notification system'],
          images: ['https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400'],
        },
      ],
    },
  ],
  licenses: [
    { name: 'SAHPRA Medical Device License', issuer: 'South African Health Authority', year: 2022 },
    { name: 'ISO 13485:2016 Certification', issuer: 'ISO', year: 2023 },
    { name: 'WHO GMP Compliance', issuer: 'World Health Organization', year: 2023 },
  ],
  policies: [
    'All medical equipment comes with 2-year comprehensive warranty',
    'Installation and staff training included with every purchase',
    'Annual maintenance contracts available for all equipment',
    'Emergency replacement within 48 hours for critical devices',
    'Compliant with all South African medical regulations',
  ],
  awards: [
    { title: 'Best Healthcare Provider Southern Africa 2023', org: 'African Health Awards' },
    { title: 'Medical Innovation Award 2022', org: 'SA Medical Association' },
  ],
  mediaGallery: [
    { type: 'image', url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600' },
    { type: 'image', url: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600' },
    { type: 'image', url: 'https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=600' },
    { type: 'image', url: 'https://images.unsplash.com/photo-1551076805-e1869033e561?w=600' },
  ],
  contact: {
    phone: '+27 11 234 5678', email: 'info@afrimed.co.za', website: 'www.afrimed.co.za',
    linkedin: 'afrimed-healthcare', twitter: '@afrimedsa', facebook: 'AfriMedSA',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3580.788738118928!2d28.0478!3d-26.1076!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e9506c5f5d5c5c5%3A0x5c5c5c5c5c5c5c5c!2sSandton%2C%20South%20Africa!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus',
  },
};

const SPONSOR_3: SponsorDetail = {
  id: 3,
  name: 'GreenBuild Construction',
  image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800',
  industries: ['Building & Construction', 'Architecture & Designs', 'Roofing & Plasters'],
  status: 'Online',
  tier: 'Silver',
  country: 'Kenya',
  state: 'Nairobi',
  address: '88 Riverside Drive, Westlands',
  motto: 'Building Sustainable Futures',
  description: 'Sustainable construction and green building specialists delivering eco-friendly residential and commercial projects across East Africa.',
  catalog: [
    {
      industry: 'Building & Construction',
      items: [
        {
          productName: 'Green Building Design & Build', currency: 'USD', price: '500000', ashDiscountPrice: '475000',
          specifications: ['LEED-certified building design', 'Energy-efficient HVAC and lighting systems', 'Rainwater harvesting and greywater recycling', 'Solar panel integration and battery storage', 'Post-occupancy performance monitoring'],
          images: ['https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400', 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400'],
        },
        {
          productName: 'Structural Engineering Services', currency: 'USD', price: '75000', ashDiscountPrice: '67500',
          specifications: ['Seismic-resistant structural design', 'Steel and reinforced concrete analysis', 'Foundation and soil investigation', '3D structural modeling and simulation', 'Construction supervision and quality assurance'],
          images: ['https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400'],
        },
      ],
    },
    {
      industry: 'Architecture & Designs',
      items: [
        {
          productName: 'Modern Residential Design', currency: 'USD', price: '35000', ashDiscountPrice: '32000',
          specifications: ['Custom home design and floor plans', '3D renderings and virtual walkthroughs', 'Interior design and space planning', 'Landscape architecture integration', 'Permit and approval documentation'],
          images: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400', 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400'],
        },
      ],
    },
    {
      industry: 'Roofing & Plasters',
      items: [
        {
          productName: 'Eco-Friendly Roofing Systems', currency: 'local', price: '12000000', ashDiscountPrice: '11000000',
          specifications: ['Cool roof technology with solar reflectance', 'Aluminum and zinc alloy materials', 'Thermal insulation layer integration', 'Gutter and downspout drainage system', '10-year weatherproof warranty'],
          images: ['https://images.unsplash.com/photo-1631871078281-fb1a013f9f5f?w=400'],
        },
      ],
    },
  ],
  licenses: [
    { name: 'NCA Class A Contractor License', issuer: 'National Construction Authority Kenya', year: 2023 },
    { name: 'Green Building Certification', issuer: 'Kenya Green Building Society', year: 2022 },
  ],
  policies: [
    'All projects insured under professional indemnity cover',
    'Payment plan: 30% mobilization, 40% milestone, 30% completion',
    '2-year defect liability period on all construction work',
    'Environmental impact assessment included for all projects',
    'Subcontractor vetting and approval required',
  ],
  awards: [
    { title: 'Sustainable Builder of the Year 2023', org: 'East Africa Property Awards' },
    { title: 'Best Green Building Project 2022', org: 'Kenya Construction Summit' },
  ],
  mediaGallery: [
    { type: 'image', url: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600' },
    { type: 'image', url: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=600' },
    { type: 'image', url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600' },
  ],
  contact: {
    phone: '+254 703 456 789', email: 'info@greenbuild.co.ke', website: 'www.greenbuild.co.ke',
    linkedin: 'greenbuild-kenya', twitter: '@greenbuildke', facebook: 'GreenBuildKE',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.6543!2d36.8219!3d-1.2679!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f173c8f5c5c5c%3A0x5c5c5c5c5c5c5c5c!2sNairobi%2C%20Kenya!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus',
  },
};

const SPONSOR_4: SponsorDetail = {
  id: 4, name: 'EduTech Solutions',
  image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800',
  industries: ['Education', 'Technology'], status: 'Online', tier: 'Bronze',
  country: 'Ghana', state: 'Greater Accra', address: '22 Learning Avenue, Accra',
  motto: 'Empowering Through Education',
  description: 'Innovative educational technology and learning solutions provider transforming classrooms across West Africa.',
  catalog: [
    {
      industry: 'Education',
      items: [
        {
          productName: 'E-Learning Platform Suite', currency: 'USD', price: '15000', ashDiscountPrice: '12000',
          specifications: ['LMS with course authoring tools', 'Student progress tracking and analytics', 'Mobile-first responsive design', 'Offline learning mode', 'Multi-language interface support'],
          images: ['https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400'],
        },
        {
          productName: 'Virtual Classroom Software', currency: 'USD', price: '8000', ashDiscountPrice: '7200',
          specifications: ['HD video conferencing for up to 500 students', 'Interactive whiteboard and screen sharing', 'Breakout rooms for group work', 'Recording and playback functionality', 'Integration with major LMS platforms'],
          images: ['https://images.unsplash.com/photo-1529390079861-591de354faf5?w=400'],
        },
      ],
    },
  ],
  licenses: [{ name: 'Ghana Education Service Accreditation', issuer: 'Ministry of Education Ghana', year: 2023 }],
  policies: ['30-day free trial for all platforms', 'Annual subscription with volume discounts', '24/7 technical support included', 'Data privacy compliant with GDPR and local laws'],
  awards: [{ title: 'EdTech Innovation Award 2023', org: 'Ghana Tech Summit' }],
  mediaGallery: [
    { type: 'image', url: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600' },
    { type: 'image', url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600' },
  ],
  contact: {
    phone: '+233 302 456 789', email: 'hello@edutech.com.gh', website: 'www.edutech.com.gh',
    linkedin: 'edutech-ghana', twitter: '@edutechgh', facebook: 'EduTechGH',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.6543!2d-0.1869!3d5.6037!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf908c5f5c5c5c%3A0x5c5c5c5c5c5c5c5c!2sAccra%2C%20Ghana!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus',
  },
};

const SPONSOR_5: SponsorDetail = {
  id: 5, name: 'AgriSupply Network',
  image: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=800',
  industries: ['Plants & Animals', 'Fishing & Aquaculture', 'Food & Eateries'], status: 'Online', tier: 'Silver',
  country: 'Tanzania', state: 'Dar es Salaam', address: '7 Farm Road, Kariakoo',
  motto: 'Growing Africa\'s Agricultural Future',
  description: 'Complete agricultural supply chain and equipment provider supporting farmers and agribusinesses across East Africa.',
  catalog: [
    {
      industry: 'Plants & Animals',
      items: [
        {
          productName: 'Irrigation Systems Package', currency: 'USD', price: '12000', ashDiscountPrice: '10800',
          specifications: ['Drip and sprinkler irrigation systems', 'Solar-powered water pumps', 'Automated timer and moisture sensors', 'Fertigation integration capability', 'Installation and training included'],
          images: ['https://images.unsplash.com/photo-1560493676-04071c5f467b?w=400'],
        },
        {
          productName: 'Hybrid Seed Collection', currency: 'local', price: '3500000', ashDiscountPrice: 'N/A',
          specifications: ['Drought-resistant maize varieties', 'High-yield rice seeds', 'Disease-resistant tomato and pepper', '50kg and 100kg bulk packaging', 'Storage and handling guidelines'],
          images: ['https://images.unsplash.com/photo-1574323347407-f5e1a02e0bfc?w=400'],
        },
      ],
    },
  ],
  licenses: [{ name: 'Tanzania Agricultural Regulatory License', issuer: 'Ministry of Agriculture Tanzania', year: 2023 }],
  policies: ['Free delivery within Dar es Salaam region', 'Payment on delivery for first-time customers', 'Bulk purchase discounts available', 'Technical advisory support included'],
  awards: [{ title: 'Agri-Business Excellence Award 2023', org: 'East African Farmers Federation' }],
  mediaGallery: [
    { type: 'image', url: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=600' },
    { type: 'image', url: 'https://images.unsplash.com/photo-1574323347407-f5e1a02e0bfc?w=600' },
  ],
  contact: {
    phone: '+255 22 345 6789', email: 'info@agrisupply.co.tz', website: 'www.agrisupply.co.tz',
    linkedin: 'agrisupply-tanzania', twitter: '@agrisupplytz', facebook: 'AgriSupplyTZ',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.1234!2d39.2695!3d-6.8161!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x185c4f5c5f5c5c5c%3A0x5c5c5c5c5c5c5c5c!2sDar%20es%20Salaam%2C%20Tanzania!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus',
  },
};

const SPONSOR_6: SponsorDetail = {
  id: 6, name: 'PowerGrid Systems',
  image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800',
  industries: ['Electricals & Wiring', 'Equipment & Machineries'], status: 'Offline', tier: 'Gold',
  country: 'Egypt', state: 'Cairo', address: '15 Industrial Zone, Nasr City',
  motto: 'Powering Africa Forward',
  description: 'Electrical systems and power distribution specialists providing reliable energy solutions for industrial and commercial clients across North Africa.',
  catalog: [
    {
      industry: 'Electricals & Wiring',
      items: [
        {
          productName: 'Industrial Transformer Units', currency: 'USD', price: '85000', ashDiscountPrice: '76500',
          specifications: ['Oil-immersed power transformers up to 50MVA', 'On-load tap changer for voltage regulation', 'Remote monitoring and SCADA integration', 'Built-in surge and lightning protection', '15-year operational lifespan design'],
          images: ['https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400'],
        },
        {
          productName: 'Solar Farm Installation', currency: 'USD', price: '200000', ashDiscountPrice: '180000',
          specifications: ['Utility-scale solar PV system design', 'Bifacial solar panel technology', 'String and central inverter configuration', 'Grid-tie with net metering capability', 'Performance monitoring and reporting dashboard'],
          images: ['https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400'],
        },
      ],
    },
  ],
  licenses: [
    { name: 'Egyptian Electrical Authority License', issuer: 'Ministry of Electricity Egypt', year: 2022 },
    { name: 'ISO 9001:2015 Quality Management', issuer: 'ISO', year: 2023 },
  ],
  policies: [
    'All installations comply with Egyptian Electrical Code',
    '5-year warranty on all equipment and installations',
    'Emergency maintenance response within 4 hours',
    'Annual system health check included in service contracts',
  ],
  awards: [
    { title: 'Industrial Project of the Year 2023', org: 'North Africa Energy Awards' },
    { title: 'Excellence in Power Distribution 2022', org: 'Egyptian Engineering Council' },
  ],
  mediaGallery: [
    { type: 'image', url: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600' },
    { type: 'image', url: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600' },
  ],
  contact: {
    phone: '+20 2 345 6789', email: 'info@powergrid.com.eg', website: 'www.powergrid.com.eg',
    linkedin: 'powergrid-egypt', twitter: '@powergradeg', facebook: 'PowerGridEG',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3456.7890!2d31.2357!3d30.0444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583c5f5c5f5c5c%3A0x5c5c5c5c5c5c5c5c!2sCairo%2C%20Egypt!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus',
  },
};

export const SPONSORS: SponsorDetail[] = [SPONSOR_1, SPONSOR_2, SPONSOR_3, SPONSOR_4, SPONSOR_5, SPONSOR_6];
