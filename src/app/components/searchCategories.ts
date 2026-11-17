import {
  GraduationCap,
  Beaker,
  Microscope,
  Lightbulb,
  Trophy,
  Vote,
  Award,
  TrendingUp,
  Handshake,
  HeartHandshake,
  Users,
} from 'lucide-react';

export interface SearchCategory {
  id: string;
  name: string;
  path: string;
  description: string;
  icon: typeof GraduationCap;
  featured: string[];
  keywords: string[];
}

/**
 * Single source of truth for the global AfriScience Hub search.
 * Descriptions mirror the main ecosystem descriptions used in the header.
 */
export const SEARCH_CATEGORIES: SearchCategory[] = [
  {
    id: 'institutes',
    name: 'Educational Institutes',
    path: '/institutes',
    description: 'Find elementary schools, secondary schools and universities globally.',
    icon: GraduationCap,
    featured: ['University of Cape Town', 'Makerere University', 'Cairo University'],
    keywords: ['school', 'university', 'college', 'education', 'primary', 'secondary', 'institute'],
  },
  {
    id: 'scientists',
    name: 'Scientists & Technologists',
    path: '/scientists',
    description: 'Connect with experts across various scientific and technological fields globally.',
    icon: Beaker,
    featured: ['Dr. Sarah K.', 'Prof. Ahmed M.', 'Dr. Ngozi O.'],
    keywords: ['scientist', 'technologist', 'researcher', 'expert', 'engineer', 'doctor', 'professor'],
  },
  {
    id: 'centers',
    name: 'Specialist Centers',
    path: '/specialist-centers',
    description: 'Discover specialized science & technology hubs globally.',
    icon: Microscope,
    featured: ['Kenya Medical Research Institute', 'CSIR South Africa'],
    keywords: ['specialist', 'center', 'centre', 'laboratory', 'lab', 'hub', 'clinic', 'research'],
  },
  {
    id: 'innovations',
    name: 'Afro-Innovations',
    path: '/innovations',
    description: 'Explore groundbreaking innovations from Africa.',
    icon: Lightbulb,
    featured: ['Solar Water Purifier', 'AgriTech Drone', 'Mobile Health App'],
    keywords: ['innovation', 'invention', 'startup', 'technology', 'inventor', 'creator'],
  },
  {
    id: 'competitions',
    name: 'Competitions',
    path: '/competitions',
    description: 'Participate in annual challenges and win awards.',
    icon: Trophy,
    featured: ['Africa Prize for Engineering', 'Innovation Challenge 2024'],
    keywords: ['competition', 'challenge', 'contest', 'tournament', 'hackathon'],
  },
  {
    id: 'voting',
    name: 'Voting',
    path: '/voting',
    description: 'Vote for competition finalists across Africa.',
    icon: Vote,
    featured: ['Afri – Presentations', 'Afri – Memes', 'Afri – Anime'],
    keywords: ['vote', 'voting', 'finalist', 'poll', 'election'],
  },
  {
    id: 'awards',
    name: 'Awards',
    path: '/awards',
    description: 'Celebrating success and excellence in African science and innovation.',
    icon: Award,
    featured: ['Developers Award', 'Sponsorships Award', 'Competitions Award'],
    keywords: ['award', 'honour', 'honor', 'recognition', 'winner', 'prize'],
  },
  {
    id: 'impact',
    name: 'Impact',
    path: '/impact',
    description: 'See how science and technology are transforming lives across Africa.',
    icon: TrendingUp,
    featured: ['Scholarships', 'Research Support', 'Career Support'],
    keywords: ['impact', 'story', 'scholarship', 'grant', 'support', 'community'],
  },
  {
    id: 'sponsors',
    name: 'Sponsorships',
    path: '/support/sponsor',
    description: 'Partner with organizations supporting science and innovation across Africa.',
    icon: Handshake,
    featured: ['Sponsor AfriScience Hub', 'Sponsor a Programme', 'Corporate Partnership'],
    keywords: ['sponsor', 'sponsorship', 'partner', 'partnership', 'corporate'],
  },
  {
    id: 'donations',
    name: 'Donations',
    path: '/support/donate',
    description: 'Support educational and developmental initiatives across Africa.',
    icon: HeartHandshake,
    featured: ['Donate to Projects', 'Fund a Scholarship', 'Support a Programme'],
    keywords: ['donate', 'donation', 'give', 'giving', 'fund', 'support'],
  },
  {
    id: 'volunteer',
    name: 'Volunteer',
    path: '/support/volunteer',
    description: 'Contribute your time and expertise to grow the ecosystem.',
    icon: Users,
    featured: ['Become a Volunteer', 'Community Programmes', 'Mentorship'],
    keywords: ['volunteer', 'mentor', 'mentorship', 'give time', 'community'],
  },
];

export function filterSearchCategories(query: string): SearchCategory[] {
  const q = query.trim().toLowerCase();
  if (!q) return SEARCH_CATEGORIES;

  return SEARCH_CATEGORIES.map((category) => {
    const matchesCategory =
      category.name.toLowerCase().includes(q) ||
      category.description.toLowerCase().includes(q) ||
      category.keywords.some((k) => k.includes(q));

    const featured = category.featured.filter((item) => item.toLowerCase().includes(q));

    if (matchesCategory) return category;
    if (featured.length > 0) return { ...category, featured };
    return null;
  }).filter((category): category is SearchCategory => category !== null);
}
