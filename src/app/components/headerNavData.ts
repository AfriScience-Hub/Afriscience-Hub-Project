import {
  GraduationCap,
  Beaker,
  Microscope,
  Lightbulb,
  Trophy,
  Vote,
  Award,
  Handshake,
  HeartHandshake,
  Users as UsersIcon,
} from 'lucide-react';

export interface HeaderNavItem {
  id: string;
  name: string;
  path: string;
  description: string;
  icon: typeof GraduationCap;
}

export const EXPLORE_ITEMS: HeaderNavItem[] = [
  {
    id: 'institutes',
    name: 'Educational Institutes',
    path: '/institutes',
    description: 'Find elementary schools, secondary schools and universities globally.',
    icon: GraduationCap,
  },
  {
    id: 'scientists',
    name: 'Scientists & Technologists',
    path: '/scientists',
    description: 'Connect with experts across various scientific and technological fields globally.',
    icon: Beaker,
  },
  {
    id: 'centers',
    name: 'Specialist Centers',
    path: '/specialist-centers',
    description: 'Discover specialized science & technology hubs globally.',
    icon: Microscope,
  },
  {
    id: 'innovations',
    name: 'Afro-Innovations',
    path: '/innovations',
    description: 'Explore groundbreaking innovations from Africa.',
    icon: Lightbulb,
  },
  {
    id: 'competitions',
    name: 'Competitions',
    path: '/competitions',
    description: 'Participate in annual challenges and win awards.',
    icon: Trophy,
  },
  {
    id: 'voting',
    name: 'Voting',
    path: '/voting',
    description: 'Vote for competition finalists across Africa.',
    icon: Vote,
  },
  {
    id: 'awards',
    name: 'Awards',
    path: '/awards',
    description: 'Celebrating success and excellence in African science and innovation.',
    icon: Award,
  },
];

export const SUPPORT_ITEMS: HeaderNavItem[] = [
  {
    id: 'sponsor',
    name: 'Sponsor AfriScience Hub',
    path: '/support/sponsor',
    description: 'Support the platform’s mission, objectives and development.',
    icon: Handshake,
  },
  {
    id: 'donate',
    name: 'Donate to Projects',
    path: '/support/donate',
    description: 'Support educational and developmental initiatives across Africa.',
    icon: HeartHandshake,
  },
  {
    id: 'volunteer',
    name: 'Become a Volunteer',
    path: '/support/volunteer',
    description: 'Contribute your time and expertise to grow the ecosystem.',
    icon: UsersIcon,
  },
];
