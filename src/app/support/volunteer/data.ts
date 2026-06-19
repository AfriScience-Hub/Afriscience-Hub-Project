export const COUNTRY_STATES: Record<string, string[]> = {
  'Nigeria': ['Lagos', 'Abuja', 'Kano', 'Rivers', 'Oyo', 'Kaduna', 'Enugu', 'Delta', 'Anambra', 'Ogun'],
  'Kenya': ['Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret', 'Thika', 'Malindi'],
  'South Africa': ['Gauteng', 'Western Cape', 'KwaZulu-Natal', 'Eastern Cape', 'Free State', 'Limpopo', 'Mpumalanga', 'North West', 'Northern Cape'],
  'Ghana': ['Greater Accra', 'Ashanti', 'Western', 'Eastern', 'Central', 'Northern', 'Volta', 'Upper East', 'Upper West'],
  'Egypt': ['Cairo', 'Alexandria', 'Giza', 'Port Said', 'Suez', 'Luxor', 'Aswan'],
  'Tanzania': ['Dar es Salaam', 'Mwanza', 'Arusha', 'Dodoma', 'Mbeya', 'Morogoro', 'Tanga'],
  'Uganda': ['Kampala', 'Wakiso', 'Mukono', 'Gulu', 'Lira', 'Mbarara', 'Jinja'],
  'Ethiopia': ['Addis Ababa', 'Dire Dawa', 'Mek\'ele', 'Gondar', 'Bahir Dar', 'Hawassa', 'Awasa'],
  'Morocco': ['Casablanca', 'Rabat', 'Fès', 'Marrakesh', 'Agadir', 'Tangier', 'Meknès'],
  'Angola': ['Luanda', 'Huambo', 'Lobito', 'Benguela', 'Lubango', 'Kuito'],
  'Rwanda': ['Kigali', 'Butare', 'Gitarama', 'Ruhengeri', 'Gisenyi'],
  'Senegal': ['Dakar', 'Thiès', 'Saint-Louis', 'Kaolack', 'Ziguinchor', 'Diourbel'],
  'Zimbabwe': ['Harare', 'Bulawayo', 'Chitungwiza', 'Mutare', 'Gweru', 'Kwekwe'],
  'Zambia': ['Lusaka', 'Ndola', 'Kitwe', 'Kabwe', 'Chingola', 'Mufulira'],
  'Cameroon': ['Douala', 'Yaoundé', 'Garoua', 'Bamenda', 'Bafoussam', 'Maroua'],
};

export const QUALIFICATIONS = [
  'High school/secondary education',
  'Associate degrees',
  'Diplomas/certificate programs',
  'Bachelor\'s degree',
  'Master\'s degree',
  'Doctoral degree',
  'Others'
];

export const TASKS = [
  'Registering institutes and specialist centers',
  'Referring scientists and technologists',
  'Targeted advertisements',
  'Conducting surveys',
  'Sourcing sponsors',
  'Supervision',
  'Coordination and Hosting'
];

export const COMPENSATIONS = [
  'Scholarships',
  'Job offers',
  'Recommendations'
];

export const VOLUNTEER_ROLES = [
  {
    title: 'Competition Judge',
    emoji: '⚖️',
    commitment: '5-10 hrs / event',
    location: 'Remote / On-site',
    description: 'Evaluate entries in annual science and innovation competitions. Share your expertise to identify the most promising African innovations.',
    requirements: ['PhD or equivalent experience', 'Subject matter expertise', 'Impartial evaluation skills'],
  },
  {
    title: 'Research Mentor',
    emoji: '🔬',
    commitment: '2-4 hrs / week',
    location: 'Remote',
    description: 'Guide early-career African researchers through their projects, offering advice on methodology, publishing, and career development.',
    requirements: ['Active researcher or professor', '5+ years research experience', 'Mentoring experience preferred'],
  },
  {
    title: 'Event Volunteer',
    emoji: '🎪',
    commitment: 'Event-based',
    location: 'On-site (various cities)',
    description: 'Help organize and run AfriScienceHub events including conferences, workshops, award ceremonies, and community outreach programs.',
    requirements: ['Strong organizational skills', 'Available for event dates', 'Team player'],
  },
  {
    title: 'Platform Moderator',
    emoji: '🛡️',
    commitment: '3-5 hrs / week',
    location: 'Remote',
    description: 'Review listings, moderate community discussions, and ensure content quality across the AfriScienceHub platform.',
    requirements: ['Familiar with AfriScienceHub platform', 'Attention to detail', 'Good communication skills'],
  },
  {
    title: 'Content Creator',
    emoji: '✍️',
    commitment: '3-6 hrs / week',
    location: 'Remote',
    description: 'Write articles, create social media content, and produce educational materials that highlight African science achievements.',
    requirements: ['Strong writing skills', 'Knowledge of African science landscape', 'Content creation experience'],
  },
  {
    title: 'Translation Volunteer',
    emoji: '🌐',
    commitment: '2-4 hrs / week',
    location: 'Remote',
    description: 'Help translate platform content, research summaries, and educational materials into African languages to improve accessibility.',
    requirements: ['Fluent in English + African language(s)', 'Translation experience', 'Science literacy preferred'],
  },
];
