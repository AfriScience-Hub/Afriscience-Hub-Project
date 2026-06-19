// Impact Types
export type ImpactType = 'community' | 'individual';

export interface ImpactStory {
  id: string;
  type: ImpactType;
  title: string; // Community name or Beneficiary name
  country: string;
  year: string;
  cause: string;
  image: string;
  summary: string;
  views: number;
  
  // Metrics
  beneficiaries?: number;
  amountUtilized: string;
  impactType: string; // "Water Access", "Research Funded", etc.
  
  // Detail page content
  story: string;
  impactBreakdown: {
    problemBefore?: string;
    solutionProvided?: string;
    outcomeAfter?: string;
    researchPurpose?: string;
    expectedOutcome?: string;
    areaOfImpact?: string;
  };
  
  // Media Gallery
  mediaGallery: {
    before?: { url: string; caption: string }[];
    during?: { url: string; caption: string }[];
    after?: { url: string; caption: string }[];
  };
  
  // Timeline
  timeline: {
    phase: 'Before' | 'During' | 'After';
    date: string;
    description: string;
    image?: string;
  }[];
}

// Mock Data
export const IMPACT_STORIES: ImpactStory[] = [
  {
    id: 'impact-1',
    type: 'community',
    title: 'Kano Rural Community',
    country: 'Nigeria',
    year: '2024',
    cause: 'Borehole',
    image: 'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&q=80&w=600',
    summary: 'Clean water access provided to over 5,000 residents through the installation of a solar-powered borehole system.',
    views: 3420,
    beneficiaries: 5000,
    amountUtilized: '₦2,450,000',
    impactType: 'Water Access',
    story: 'The Kano Rural Community had faced severe water scarcity for over a decade. Women and children walked an average of 3 kilometers daily to fetch water from contaminated sources, leading to frequent outbreaks of waterborne diseases. Through generous donations on AfriScience Hub, we were able to install a state-of-the-art solar-powered borehole system that now provides clean, safe drinking water to over 5,000 residents. This project has transformed the community, reducing disease rates by 70% and freeing up over 15 hours per week for women who previously spent time fetching water.',
    impactBreakdown: {
      problemBefore: 'No access to clean water within 3km radius. Community relied on contaminated surface water, leading to cholera outbreaks and high infant mortality rates.',
      solutionProvided: 'Installation of a 120-meter deep solar-powered borehole with a 10,000-liter storage tank and 8 distribution points across the community.',
      outcomeAfter: '5,000 residents now have access to clean water within 200 meters of their homes. Disease rates dropped by 70%, and school attendance increased by 40% as children no longer miss school to fetch water.',
    },
    mediaGallery: {
      before: [
        { url: 'https://images.unsplash.com/photo-1594843310818-c6f5d4a48751?auto=format&fit=crop&q=80&w=600', caption: 'Community members collecting water from contaminated pond' },
        { url: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=600', caption: 'Children carrying water containers over long distances' },
      ],
      during: [
        { url: 'https://images.unsplash.com/photo-1581092918484-8313e1f7f53d?auto=format&fit=crop&q=80&w=600', caption: 'Drilling the 120-meter deep borehole' },
        { url: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=600', caption: 'Installing solar panels for sustainable power' },
        { url: 'https://images.unsplash.com/photo-1581092918484-8313e1f7f53d?auto=format&fit=crop&q=80&w=600', caption: 'Community members observing the construction' },
      ],
      after: [
        { url: 'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&q=80&w=600', caption: 'Completed solar-powered borehole system' },
        { url: 'https://images.unsplash.com/photo-1597739248758-e0535e0c0d52?auto=format&fit=crop&q=80&w=600', caption: 'Community members celebrating access to clean water' },
        { url: 'https://images.unsplash.com/photo-1528747045269-390fe33c19f2?auto=format&fit=crop&q=80&w=600', caption: 'Children enjoying safe drinking water' },
      ],
    },
    timeline: [
      {
        phase: 'Before',
        date: 'January 2024',
        description: 'Community assessment and needs identification. Documented water scarcity challenges affecting 5,000 residents.',
        image: 'https://images.unsplash.com/photo-1594843310818-c6f5d4a48751?auto=format&fit=crop&q=80&w=400',
      },
      {
        phase: 'During',
        date: 'February - March 2024',
        description: 'Borehole drilling, solar panel installation, and water storage tank construction. Community members actively participated in the construction process.',
        image: 'https://images.unsplash.com/photo-1581092918484-8313e1f7f53d?auto=format&fit=crop&q=80&w=400',
      },
      {
        phase: 'After',
        date: 'April 2024',
        description: 'Project completed. Over 5,000 residents now have access to clean water. Disease rates dropped by 70% within the first month.',
        image: 'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&q=80&w=400',
      },
    ],
  },
  {
    id: 'impact-2',
    type: 'individual',
    title: 'Dr. Amara Okafor',
    country: 'Nigeria',
    year: '2024',
    cause: 'Research Aid',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600',
    summary: 'Research funding enabled groundbreaking study on malaria resistance in West Africa, potentially saving thousands of lives.',
    views: 2840,
    amountUtilized: '₦1,200,000',
    impactType: 'Research Funded',
    story: 'Dr. Amara Okafor, a molecular biologist at the University of Lagos, received crucial research funding through AfriScience Hub to study emerging patterns of antimalarial drug resistance in West Africa. Her research has identified three new genetic markers that predict drug resistance, enabling healthcare providers to tailor treatment protocols more effectively. This breakthrough research has been published in the Lancet Infectious Diseases and is already informing treatment guidelines across 12 African nations. The funding covered laboratory equipment, field research costs, and data analysis software that were previously inaccessible.',
    impactBreakdown: {
      researchPurpose: 'To identify genetic markers associated with antimalarial drug resistance in West African populations and develop predictive models for treatment efficacy.',
      expectedOutcome: 'Discovery of new biomarkers to guide personalized malaria treatment, reducing treatment failures and preventing the spread of drug-resistant strains.',
      areaOfImpact: 'Public health, infectious disease treatment, precision medicine. Research findings are now being used in 12 African countries to improve malaria treatment protocols.',
    },
    mediaGallery: {
      before: [
        { url: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&q=80&w=600', caption: 'Dr. Okafor in her laboratory before receiving funding' },
        { url: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&q=80&w=600', caption: 'Limited research equipment and resources' },
      ],
      during: [
        { url: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80&w=600', caption: 'Conducting field research in rural communities' },
        { url: 'https://images.unsplash.com/photo-1579154341394-0c6f5c175b68?auto=format&fit=crop&q=80&w=600', caption: 'Laboratory analysis of genetic samples' },
        { url: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&q=80&w=600', caption: 'Data analysis and pattern identification' },
      ],
      after: [
        { url: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600', caption: 'Dr. Okafor presenting findings at international conference' },
        { url: 'https://images.unsplash.com/photo-1532187643603-ba119ca4109e?auto=format&fit=crop&q=80&w=600', caption: 'Published research in the Lancet Infectious Diseases' },
        { url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=600', caption: 'Training healthcare workers on new treatment protocols' },
      ],
    },
    timeline: [
      {
        phase: 'Before',
        date: 'December 2023',
        description: 'Research proposal submitted. Dr. Okafor identified critical gap in understanding antimalarial drug resistance patterns in West Africa.',
        image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&q=80&w=400',
      },
      {
        phase: 'During',
        date: 'January - June 2024',
        description: 'Field research conducted across 6 states in Nigeria. Laboratory analysis of 2,500 genetic samples. Identified 3 new resistance markers.',
        image: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80&w=400',
      },
      {
        phase: 'After',
        date: 'July 2024',
        description: 'Research published in Lancet Infectious Diseases. Findings adopted by 12 African nations for malaria treatment guidelines. Dr. Okafor received WHO recognition.',
        image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400',
      },
    ],
  },
  {
    id: 'impact-3',
    type: 'community',
    title: 'Nakuru Education Center',
    country: 'Kenya',
    year: '2024',
    cause: 'Education Support',
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=600',
    summary: 'Modern computer lab and STEM resources provided to 800 students in underserved rural school.',
    views: 2150,
    beneficiaries: 800,
    amountUtilized: 'KSh 890,000',
    impactType: 'Education Infrastructure',
    story: 'The Nakuru Education Center serves 800 students from low-income families in rural Kenya. Before this intervention, students had no access to computers or digital learning tools, putting them at a severe disadvantage in our increasingly digital world. Thanks to donations through AfriScience Hub, we established a state-of-the-art computer lab with 40 workstations, high-speed internet, and comprehensive STEM learning resources. Students now receive weekly computer literacy training, coding lessons, and have access to online educational platforms. Within the first semester, student performance in science and mathematics improved by 35%, and 50 students have already enrolled in computer science programs at university level.',
    impactBreakdown: {
      problemBefore: 'Zero access to computers or digital learning tools. Students lacked basic computer literacy skills, limiting their future career opportunities in an increasingly digital economy.',
      solutionProvided: '40-workstation computer lab with high-speed internet, STEM learning resources, trained ICT teachers, and partnerships with online learning platforms.',
      outcomeAfter: '800 students now have access to digital learning tools. 35% improvement in science and mathematics scores. 50 students enrolled in computer science university programs.',
    },
    mediaGallery: {
      before: [
        { url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=600', caption: 'Traditional classroom with no digital tools' },
        { url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=600', caption: 'Students learning with limited resources' },
      ],
      during: [
        { url: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=600', caption: 'Setting up the computer lab infrastructure' },
        { url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=600', caption: 'Installing computers and networking equipment' },
        { url: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=600', caption: 'Training teachers on digital education tools' },
      ],
      after: [
        { url: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=600', caption: 'Students in the new computer lab' },
        { url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=600', caption: 'Students learning coding and computer skills' },
        { url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=600', caption: 'STEM education in progress' },
      ],
    },
    timeline: [
      {
        phase: 'Before',
        date: 'February 2024',
        description: 'School identified as having zero digital infrastructure despite serving 800 students. Needs assessment conducted.',
        image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=400',
      },
      {
        phase: 'During',
        date: 'March - April 2024',
        description: 'Computer lab construction, equipment installation, internet connectivity setup, and teacher training programs.',
        image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=400',
      },
      {
        phase: 'After',
        date: 'May 2024',
        description: 'Lab operational. 800 students receiving weekly computer literacy and coding lessons. 35% improvement in science and mathematics scores.',
        image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=400',
      },
    ],
  },
  {
    id: 'impact-4',
    type: 'individual',
    title: 'Kwame Mensah',
    country: 'Ghana',
    year: '2023',
    cause: 'Research Aid',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600',
    summary: 'Agricultural research on drought-resistant crops helping 10,000+ farmers across West Africa.',
    views: 1920,
    amountUtilized: 'GH₵ 45,000',
    impactType: 'Agricultural Research',
    story: 'Kwame Mensah, an agricultural scientist from Ghana, received critical funding to research and develop drought-resistant varieties of staple crops adapted to West African conditions. His research has produced three new varieties of sorghum and millet that require 40% less water while maintaining nutritional value. These varieties are now being cultivated by over 10,000 farmers across Ghana, Burkina Faso, and Mali, providing food security in regions severely affected by climate change and irregular rainfall patterns.',
    impactBreakdown: {
      researchPurpose: 'To develop drought-resistant varieties of sorghum and millet adapted to West African climate conditions, ensuring food security in the face of climate change.',
      expectedOutcome: 'Creation of crop varieties requiring 40% less water, increased yield stability, and improved food security for smallholder farmers in drought-prone regions.',
      areaOfImpact: 'Agriculture, food security, climate resilience. Over 10,000 farmers across 3 countries now cultivating drought-resistant varieties.',
    },
    mediaGallery: {
      before: [
        { url: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&q=80&w=600', caption: 'Traditional crops failing due to drought conditions' },
        { url: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&q=80&w=600', caption: 'Farmers struggling with crop failures' },
      ],
      during: [
        { url: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&q=80&w=600', caption: 'Field trials of drought-resistant varieties' },
        { url: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&q=80&w=600', caption: 'Laboratory analysis and seed development' },
        { url: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&q=80&w=600', caption: 'Testing crops under controlled drought conditions' },
      ],
      after: [
        { url: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&q=80&w=600', caption: 'Successful harvest of drought-resistant crops' },
        { url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600', caption: 'Kwame training farmers on new varieties' },
        { url: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&q=80&w=600', caption: 'Farmers celebrating improved yields' },
      ],
    },
    timeline: [
      {
        phase: 'Before',
        date: 'June 2023',
        description: 'Research initiated to address severe food insecurity caused by drought conditions affecting West African farmers.',
        image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&q=80&w=400',
      },
      {
        phase: 'During',
        date: 'July 2023 - February 2024',
        description: 'Field trials across multiple locations. Developed and tested 3 drought-resistant varieties of sorghum and millet.',
        image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&q=80&w=400',
      },
      {
        phase: 'After',
        date: 'March 2024',
        description: 'Varieties released to farmers. Over 10,000 farmers in 3 countries now using drought-resistant seeds. 40% reduction in water requirements.',
        image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&q=80&w=400',
      },
    ],
  },
  {
    id: 'impact-5',
    type: 'community',
    title: 'Lusaka Health Initiative',
    country: 'Zambia',
    year: '2024',
    cause: 'Health',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=600',
    summary: 'Mobile health clinic serving 15,000 residents in remote areas with no access to healthcare facilities.',
    views: 3680,
    beneficiaries: 15000,
    amountUtilized: 'ZMW 125,000',
    impactType: 'Healthcare Access',
    story: 'Rural communities around Lusaka had no access to basic healthcare services, with the nearest clinic over 50 kilometers away. Through donations on AfriScience Hub, we established a mobile health clinic that travels to 8 different villages on a rotating schedule. The clinic is equipped with essential medical equipment, staffed by qualified nurses and doctors, and provides free basic healthcare, maternal care, child immunizations, and health education. In the first 6 months, the clinic served over 15,000 patients, delivered 45 babies safely, vaccinated 2,000 children, and identified and treated 150 cases of preventable diseases that would have otherwise gone undiagnosed.',
    impactBreakdown: {
      problemBefore: 'No healthcare access within 50km. High maternal and infant mortality rates. Preventable diseases going untreated.',
      solutionProvided: 'Fully equipped mobile health clinic visiting 8 villages on rotation. Qualified medical staff providing free basic healthcare, maternal care, and immunizations.',
      outcomeAfter: '15,000 patients served in 6 months. 45 safe deliveries. 2,000 children vaccinated. 150 preventable disease cases identified and treated.',
    },
    mediaGallery: {
      before: [
        { url: 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&q=80&w=600', caption: 'Remote village with no healthcare access' },
        { url: 'https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?auto=format&fit=crop&q=80&w=600', caption: 'Community members traveling long distances for healthcare' },
      ],
      during: [
        { url: 'https://images.unsplash.com/photo-1626315869436-ae46a2f6c3ba?auto=format&fit=crop&q=80&w=600', caption: 'Mobile clinic being equipped with medical supplies' },
        { url: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&q=80&w=600', caption: 'Training medical staff for mobile operations' },
        { url: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&q=80&w=600', caption: 'Setting up mobile clinic infrastructure' },
      ],
      after: [
        { url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=600', caption: 'Mobile clinic serving patients in remote village' },
        { url: 'https://images.unsplash.com/photo-1631815588091-d62194f5dcdc?auto=format&fit=crop&q=80&w=600', caption: 'Mother and child receiving healthcare' },
        { url: 'https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&q=80&w=600', caption: 'Healthcare workers conducting immunizations' },
      ],
    },
    timeline: [
      {
        phase: 'Before',
        date: 'January 2024',
        description: 'Assessment of healthcare needs in 8 remote villages. Documented high maternal mortality and lack of basic healthcare access.',
        image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&q=80&w=400',
      },
      {
        phase: 'During',
        date: 'February - March 2024',
        description: 'Mobile clinic procurement, equipment installation, staff recruitment and training, and route planning.',
        image: 'https://images.unsplash.com/photo-1626315869436-ae46a2f6c3ba?auto=format&fit=crop&q=80&w=400',
      },
      {
        phase: 'After',
        date: 'April 2024',
        description: 'Clinic operational. 15,000 patients served in first 6 months. Maternal mortality reduced by 60% in target communities.',
        image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=400',
      },
    ],
  },
  {
    id: 'impact-6',
    type: 'individual',
    title: 'Dr. Fatima Hassan',
    country: 'Sudan',
    year: '2023',
    cause: 'Research Aid',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600',
    summary: 'Renewable energy research leading to affordable solar solutions for off-grid communities.',
    views: 2340,
    amountUtilized: 'SDG 180,000',
    impactType: 'Energy Innovation',
    story: 'Dr. Fatima Hassan, a renewable energy researcher, received funding to develop low-cost solar power solutions specifically designed for off-grid rural communities in Sudan. Her research focused on creating affordable solar panels using locally available materials and developing efficient energy storage systems. The resulting technology reduces solar power costs by 60% compared to imported systems. Her innovations are now being implemented in 25 villages across Sudan, providing electricity to over 8,000 people who previously had no access to power.',
    impactBreakdown: {
      researchPurpose: 'To develop affordable solar power solutions using locally available materials, making renewable energy accessible to off-grid rural communities.',
      expectedOutcome: 'Reduce solar power costs by 60%, create local manufacturing capacity, and provide electricity access to remote communities.',
      areaOfImpact: 'Renewable energy, rural electrification, economic development. 8,000 people in 25 villages now have access to electricity.',
    },
    mediaGallery: {
      before: [
        { url: 'https://images.unsplash.com/photo-1484399172022-72a90b12e3c1?auto=format&fit=crop&q=80&w=600', caption: 'Villages without electricity access' },
        { url: 'https://images.unsplash.com/photo-1536431803649-b134dea11928?auto=format&fit=crop&q=80&w=600', caption: 'Reliance on kerosene lamps and generators' },
      ],
      during: [
        { url: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=600', caption: 'Research and development of affordable solar panels' },
        { url: 'https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?auto=format&fit=crop&q=80&w=600', caption: 'Testing solar systems in laboratory' },
        { url: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=600', caption: 'Field testing in pilot villages' },
      ],
      after: [
        { url: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=600', caption: 'Solar panels installed in rural homes' },
        { url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600', caption: 'Dr. Hassan training local technicians' },
        { url: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&q=80&w=600', caption: 'Communities enjoying electricity for the first time' },
      ],
    },
    timeline: [
      {
        phase: 'Before',
        date: 'August 2023',
        description: 'Research proposal to develop affordable solar solutions for off-grid communities. Identified need to reduce costs by using local materials.',
        image: 'https://images.unsplash.com/photo-1484399172022-72a90b12e3c1?auto=format&fit=crop&q=80&w=400',
      },
      {
        phase: 'During',
        date: 'September 2023 - March 2024',
        description: 'Research and development phase. Created prototype solar panels using local materials. Field tested in 5 pilot villages.',
        image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=400',
      },
      {
        phase: 'After',
        date: 'April 2024',
        description: 'Technology deployed in 25 villages. 8,000 people now have electricity access. Local manufacturing facilities established creating 50 jobs.',
        image: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&q=80&w=400',
      },
    ],
  },
];

// Filter Options
export const IMPACT_CAUSES = [
  'Borehole',
  'Research Aid',
  'Education Support',
  'Health',
  'Agriculture',
  'Renewable Energy',
  'Technology Access',
  'Infrastructure',
];

export const IMPACT_COUNTRIES = [
  'Nigeria',
  'Kenya',
  'Ghana',
  'South Africa',
  'Egypt',
  'Tanzania',
  'Uganda',
  'Ethiopia',
  'Zambia',
  'Sudan',
  'Rwanda',
  'Senegal',
];

export const IMPACT_YEARS = ['2024', '2023', '2022', '2021', '2020'];
