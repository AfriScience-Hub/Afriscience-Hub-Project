'use client';

export const FIELD_DESCRIPTIONS: Record<string, string> = {
  'Medical': 'Centers focused on human health, diagnostics, and clinical services.',
  'Engineering': 'Centers specializing in engineering design, testing, and research.',
  'Pharmaceutical': 'Drug development, testing, quality control, and pharmaceutical research.',
  'Computer & ICT': 'Information technology, cybersecurity, AI, and digital services.',
  'Hybrid': 'Multi-disciplinary centers spanning two or more scientific fields.',
  'Veterinary': 'Animal health, livestock science, and wildlife conservation centers.',
  'Agriculture': 'Crop science, farming technology, and agricultural research.',
  'Food & Nutrition': 'Food safety, nutrition science, and quality assurance centers.',
  'Physics': 'Applied and theoretical physics research and testing centers.',
  'Chemistry': 'Chemical analysis, synthesis, and research laboratories.',
  'Biology': 'Biological research, microbiology, and biotechnology centers.',
  'Environmental': 'Climate research, conservation, and environmental management.',
  'Industry & Manufacturing': 'Industrial automation, quality engineering, and manufacturing research.',
  'Energy & Power': 'Renewable energy, power systems, and energy research.',
  'Waste & Recycling': 'Waste management, recycling technology, and environmental cleanup.',
  'Astronomy & Space': 'Space science, astrophysics, and satellite technology centers.'
};

export const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  'Basic Clinical Diagnostics': 'General medical tests and screenings',
  'Blood | Transfusion': 'Blood banking and transfusion services',
  'Cardiovascular': 'Heart and circulatory system specialization',
  'Dentistry | Orals': 'Dental and oral health services',
  'Endocrine | Metabolism': 'Hormonal and metabolic disorder services',
  'Fertility | Reproduction': 'Reproductive health and fertility treatments',
  'Gastrointestinal': 'Digestive system diagnostics and treatment',
  'Geriatrics': 'Elderly care and age-related health services',
  'Haematology | Haematopoiesis': 'Blood disorders and blood cell formation',
  'Histology': 'Tissue examination and analysis',
  'Immunology | Allergy | Lymphatic': 'Immune system, allergy, and lymph services',
  'Integumentary': 'Skin, hair, and nail related services',
  'Intensive Care': 'Critical and intensive care units',
  'Molecular | Genetics': 'DNA, RNA, and genetic testing services',
  'Musculoskeletal': 'Bone, joint, and muscle services',
  'Neurology': 'Brain and nervous system specialization',
  'Oncology': 'Cancer diagnosis and treatment',
  'Palliative Care': 'End-of-life and comfort care services',
  'Parasitology': 'Parasitic disease diagnosis and treatment',
  'Pathology': 'Disease diagnosis through lab analysis',
  'Pediatrics | Neonatal': 'Child and newborn health services',
  'Psychiatry | Rehab': 'Mental health and rehabilitation services',
  'Public Health | Epidemiology': 'Population health and disease tracking',
  'Radiology | Sonography': 'Medical imaging and ultrasound services',
  'Rehabilitative': 'Physical and occupational rehabilitation',
  'Renal': 'Kidney-related diagnostics and treatment',
  'Respiratory': 'Lung and breathing disorder services',
  'Sensory': 'Eye, ear, and sensory organ services',
};

export const COUNTRIES = [
  'Algeria', 'Angola', 'Benin', 'Botswana', 'Burkina Faso', 'Burundi',
  'Cameroon', 'Cape Verde', 'Central African Republic', 'Chad', 'Comoros',
  'Congo (DRC)', 'Congo (Republic)', "Côte d'Ivoire", 'Djibouti', 'Egypt',
  'Equatorial Guinea', 'Eritrea', 'Eswatini', 'Ethiopia', 'Gabon', 'Gambia',
  'Ghana', 'Guinea', 'Guinea-Bissau', 'Kenya', 'Lesotho', 'Liberia', 'Libya',
  'Madagascar', 'Malawi', 'Mali', 'Mauritania', 'Mauritius', 'Morocco',
  'Mozambique', 'Namibia', 'Niger', 'Nigeria', 'Rwanda', 'São Tomé and Príncipe',
  'Senegal', 'Seychelles', 'Sierra Leone', 'Somalia', 'South Africa', 'South Sudan',
  'Sudan', 'Tanzania', 'Togo', 'Tunisia', 'Uganda', 'Zambia', 'Zimbabwe'
];

export const STATES: Record<string, string[]> = {
  'Egypt': ['Cairo', 'Alexandria', 'Giza', 'Luxor'],
  'Ethiopia': ['Addis Ababa', 'Dire Dawa', 'Bahir Dar'],
  'Ghana': ['Greater Accra', 'Ashanti', 'Central', 'Western', 'Eastern', 'Northern'],
  'Kenya': ['Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret'],
  'Morocco': ['Casablanca', 'Rabat', 'Marrakech', 'Fez'],
  'Nigeria': ['Lagos', 'Abuja', 'Kano', 'Rivers', 'Oyo', 'Enugu', 'Kaduna', 'Ogun', 'Delta'],
  'Rwanda': ['Kigali City', 'Northern', 'Southern', 'Eastern', 'Western'],
  'Senegal': ['Dakar', 'Saint-Louis', 'Thiès'],
  'South Africa': ['Western Cape', 'Gauteng', 'KwaZulu-Natal', 'Eastern Cape', 'Free State'],
  'Tanzania': ['Dar es Salaam', 'Dodoma', 'Arusha', 'Mwanza'],
  'Uganda': ['Central', 'Eastern', 'Northern', 'Western'],
};
