'use client';

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

export const SERVICE_DESCRIPTIONS: Record<string, string> = {
  'Diagnosis (Screening)': 'Testing and screening to identify conditions, defects or quality issues.',
  'Guidance & Counseling': 'Expert advice and advisory sessions for clients and partners.',
  'Monitoring': 'Ongoing observation, tracking and reporting of systems, samples or environments.',
  'Prevention & Control': 'Programs and measures that prevent risks, outbreaks or defects.',
  'Quality Control & Assurance': 'Inspection and standards checks to guarantee consistent quality.',
  'Research & Development': 'Original research, experimentation and development of new solutions.',
  'Result Interpretation': 'Professional analysis and explanation of test or research results.',
  'Safety & Compliance': 'Audits and checks that ensure adherence to safety and regulations.',
  'Sales': 'Sale of products, samples, kits or equipment related to the field.',
  'Surgery': 'Surgical procedures and operative interventions.',
  'Training (Industrial)': 'Industrial skills training, workshops and capacity building.',
  'Transplant': 'Transplant procedures and associated laboratory support.',
  'Treatment': 'Therapeutic and corrective interventions for clients.',
  'Workspace & Accommodation': 'Provision of laboratories, workspaces or accommodation.'
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
