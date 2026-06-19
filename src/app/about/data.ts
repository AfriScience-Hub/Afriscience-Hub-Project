import { 
  BookOpen, Lightbulb, GraduationCap, TrendingUp, Award, Heart,
  Link as LinkIcon, Trophy, ShieldCheck, Star, UserCheck, Users,
  Zap, Globe, Building2, Microscope,
} from 'lucide-react';

export const MISSION_ITEMS = [
  {
    title: 'Inform',
    description: 'Provide resourceful information to our users on scientific & technological concerns.',
    icon: BookOpen,
  },
  {
    title: 'Promote Innovations',
    description: 'Build a platform for African inventors/innovators to publish their crafts for global recognition.',
    icon: Lightbulb,
  },
  {
    title: 'Train',
    description: 'Connect users to professionals, institutions and corporations with the capacity to train them on scientific techniques/methods on different levels.',
    icon: GraduationCap,
  },
  {
    title: 'Invest',
    description: 'Facilitate partnership opportunities between African inventors/innovators and potential investors – African and International (non-African).',
    icon: TrendingUp,
  },
  {
    title: 'Award',
    description: 'Recognize individuals, professionals, institutes and corporations with outstanding performance in our enlightenment programmes/schemes.',
    icon: Award,
  },
  {
    title: 'Impact',
    description: 'Cause positive changes and outcomes in the lives of our users and the society at large.',
    icon: Heart,
  },
  {
    title: 'Link',
    description: 'Interconnect users to easily find, interact and build strong bonds with one another to serve their respective needs.',
    icon: LinkIcon,
  },
  {
    title: 'Compete',
    description: 'Give Africans an opportunity to compete in scientific & technological events where their skills and crafts will gain them global recognition.',
    icon: Trophy,
  },
];

export const CORE_VALUES = [
  {
    title: 'INTEGRITY',
    description: 'We believe in the culture of doing the right thing always. Our decisions and actions are rooted in transparency, ethics, consistency, fairness, accountability, and authenticity.',
    icon: ShieldCheck,
  },
  {
    title: 'EXCELLENCE',
    description: 'We are committed to maintaining the highest standards in everything we do – from information dissemination, to quality services and network stabilization.',
    icon: Star,
  },
  {
    title: 'ACCOUNTABILITY',
    description: 'We take ownership of our representations, decisions, and actions. We always stand by our commitments.',
    icon: UserCheck,
  },
  {
    title: 'USER-CENTRIC',
    description: 'We prioritize finding and creating solutions to the needs of our users. Their satisfaction is at the heart of our operations.',
    icon: Users,
  },
  {
    title: 'INNOVATION',
    description: 'We seek to always improve our system of operations; to adapt, evolve, and meet continuous advancements in the science & technology space.',
    icon: Zap,
  },
  {
    title: 'COLLABORATION',
    description: 'We welcome constructive communications, partnerships and collaborations with different parties and our network. Such collaborations create limitless possibilities and opportunities for great achievements.',
    icon: Globe,
  },
  {
    title: 'COMMUNITY IMPACT',
    description: 'We operate with deep sense of responsibility towards impacting communities and societies in ways that drive structural, functional and economic development/growth.',
    icon: Heart,
  },
];

export const SERVICES = [
  {
    title: 'INSTITUTES',
    description: 'We feature different scientific & technological institutes in Africa, alongside partnering International (non-African) institutes.',
    details: [
      'Primary & Secondary (Elementary/Basic and High Schools)',
      'Tertiary (Universities, Colleges and Polytechnics)',
      'Research (Independent/Private, Government, University, Councils)',
      'Specialized (Monotechnics and College of Education)',
    ],
    icon: Building2,
  },
  {
    title: 'FIELDS',
    description: 'We outline scientific & technological fields of study peculiar to African academic curriculum and provide detailed information about them.',
    details: ['Field objectives', 'Study institutions', 'Specialization areas', 'Career opportunities'],
    icon: BookOpen,
  },
  {
    title: 'SPECIALIST CENTERS',
    description: 'We feature licensed African and International (non-African) establishments/centers that render scientific & technological services in specific fields.',
    details: ['Engineering', 'Orthopedics', 'Radiology', 'Cardiology', 'IVF', 'Psychiatry', 'Dialysis'],
    icon: Microscope,
  },
  {
    title: 'AFRO-INNOVATIONS',
    description: 'We use our platform to publicize the skills and creativity of African innovators/inventors, for a global recognition of their craft and investment opportunities.',
    icon: Lightbulb,
  },
  {
    title: 'COMPETITIONS',
    description: 'We organize annual intellectual and skill based competitions for Africans under different categories.',
    icon: Trophy,
  },
  {
    title: 'AWARDS',
    description: 'We recognize the outstanding performance of individuals, professionals, institutions and corporations in our enlightenment programmes/schemes.',
    icon: Award,
  },
];

export interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
  linkedin?: string;
  twitter?: string;
}

export const TEAM: TeamMember[] = [
  {
    name: 'UMENNE UDOCHUKWU GERALD',
    role: 'Managing Director',
    image: 'https://images.unsplash.com/photo-1763598461615-610264129bea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwYnVzaW5lc3MlMjBtYW4lMjBleGVjdXRpdmUlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzA3NzU2ODB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    bio: 'A visionary leader with over 15 years of experience in strategic management and technological innovation. Dedicated to fostering pan-African growth through sustainable science ecosystems.',
    linkedin: '@umennegerald',
    twitter: '@umennegerald',
  },
  {
    name: 'AZUBUIKE GODSPOWER IKECHUKWU',
    role: 'General Manager',
    image: 'https://images.unsplash.com/photo-1621062089461-01f1eaebb66c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwYnVzaW5lc3MlMjBtYW4lMjBwcm9mZXNzaW9uYWwlMjBzdWl0JTIwY29uZmlkZW50fGVufDF8fHx8MTc3MDc3NTY3NXww&ixlib=rb-4.1.0&q=80&w=1080',
    bio: 'An expert in operational excellence and team leadership. He ensures the seamless execution of AfriScience Hub\'s mission across all departments with a focus on efficiency and scalability.',
    linkedin: '@azubuikegodspower',
    twitter: '@azubuikegodspower',
  },
  {
    name: 'OBIAMALU CHIDUBEM PASCHAL',
    role: 'Operations Officer',
    image: 'https://images.unsplash.com/photo-1665495005618-6f55e5f77a07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwYnVzaW5lc3MlMjBtYW4lMjB5b3VuZyUyMHByb2Zlc3Npb25hbCUyMHNtaWxpbmd8ZW58MXx8fHwxNzcwNzc1NjgzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    bio: 'Specializing in logistics and system optimization, Paschal drives the day-to-day efficiency of our network, connecting institutions with precision and ensuring resource availability.',
    linkedin: '@obiamalupaschal',
    twitter: '@obiamalupaschal',
  },
  {
    name: 'LINUS CHIDIMMA NGWEE',
    role: 'ICT Developer',
    image: 'https://images.unsplash.com/photo-1710778044102-56a3a6b69a1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwYnVzaW5lc3MlMjB3b21hbiUyMHByb2Zlc3Npb25hbCUyMHRlY2hub2xvZ3klMjBkZXZlbG9wZXJ8ZW58MXx8fHwxNzcwNzc1Njg2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    bio: 'A talented Full Stack Developer passionate about building scalable digital solutions. Chidimma leads the technical architecture that powers our global platform, ensuring robust security and user experience.',
    linkedin: '@linuschidimma',
    twitter: '@linuschidimma',
  },
];
