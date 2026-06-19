'use client';

import { 
  Target, 
  Lightbulb, 
  GraduationCap, 
  TrendingUp, 
  Award, 
  Users, 
  Link as LinkIcon, 
  Trophy,
  ShieldCheck,
  Star,
  UserCheck,
  Heart,
  Zap,
  Globe,
  Building2,
  BookOpen,
  Microscope,
  Stethoscope,
  Rocket,
  Linkedin,
  Mail,
  X
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import Link from 'next/link';

const MISSION_ITEMS = [
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

const CORE_VALUES = [
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

const SERVICES = [
  {
    title: 'INSTITUTES',
    description: 'We feature different scientific & technological institutes in Africa, alongside partnering International (non-African) institutes.',
    details: [
      'Primary & Secondary (Elementary/Basic and High Schools)',
      'Tertiary (Universities, Colleges and Polytechnics)',
      'Research (Independent/Private, Government, University, Councils)',
      'Specialized (Monotechnics and College of Education)'
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

interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
  linkedin?: string;
  twitter?: string;
}

const TEAM: TeamMember[] = [
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

export default function About() {
  return (
    <div className="bg-white">
      {/* Hero / Who We Are */}
      <div className="relative isolate overflow-hidden bg-brand-navy-900 py-24 sm:py-32">
        <img
          src="https://images.unsplash.com/photo-1693932038683-7c35401f5307?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwc2NpZW5jZSUyMHRlY2hub2xvZ3klMjBpbm5vdmF0aW9uJTIwbGFib3JhdG9yeXxlbnwxfHx8fDE3NzA3NzUzOTR8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="African Science Technology"
          className="absolute inset-0 -z-10 h-full w-full object-cover opacity-20"
        />
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">Who We Are</h2>
            <p className="mt-6 text-lg leading-8 text-neutral-gray-light text-justify">
              AfriScience Hub® is a scientific and technological network aimed at providing insightful science & technology based solutions to individuals, professionals, institutions and corporations.
            </p>
            <p className="mt-4 text-lg leading-8 text-neutral-gray-light text-justify">
              Through diverse applications of science & technology, our actions serve to inform, innovate, train, award, impact and invest in our users, and societies at large.
            </p>
            <p className="mt-4 text-lg leading-8 text-neutral-gray-light text-justify">
              Rooted in Africa, we aim to contribute towards driving innovation and growth throughout the continent with enlightenment programmes/schemes.
            </p>
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="py-24 sm:py-32 bg-neutral-bg-light">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-brand-red-600">Our Purpose</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-brand-navy-900 sm:text-4xl">Mission & Vision</p>
            <p className="mt-6 text-lg leading-8 text-neutral-gray-dark">
              As a scientific & technological hub, we envision becoming a globally recognized platform, and a frontier network in science & technology space.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
              {MISSION_ITEMS.map((item) => (
                <div key={item.title} className="flex flex-col">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-brand-navy-900">
                    <item.icon className="h-5 w-5 flex-none text-brand-red-600" aria-hidden="true" />
                    {item.title}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-neutral-gray-dark">
                    <p className="flex-auto">{item.description}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* Core Values */}
      <div className="py-24 sm:py-32 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-brand-navy-900 sm:text-4xl">Our Core Values</h2>
            <p className="mt-4 text-lg leading-8 text-neutral-gray-dark">
              Our culture is built on a foundation of strong principles that guide every interaction.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-7xl px-6 lg:px-8">
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {CORE_VALUES.map((value) => (
                  <div key={value.title} className="bg-neutral-bg-light p-8 rounded-2xl border border-neutral-gray-light hover:shadow-md transition-shadow">
                    <div className="h-12 w-12 rounded-lg bg-brand-navy-100 flex items-center justify-center text-brand-red-600 mb-6">
                      <value.icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold text-brand-navy-900 mb-3">{value.title}</h3>
                    <p className="text-neutral-gray-dark leading-relaxed">{value.description}</p>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </div>

      {/* What We Do */}
      <div className="py-24 sm:py-32 bg-neutral-bg-light">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-brand-navy-900 sm:text-4xl">What We Do</h2>
            <p className="mt-4 text-lg leading-8 text-neutral-gray-dark">
              AfriScience Hub® offers solutions in diverse scientific & technological sectors.
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {SERVICES.map((service, index) => (
              <div key={index} className="flex gap-6 p-6 rounded-2xl bg-white hover:shadow-md transition-all border border-neutral-gray-light">
                <div className="flex-none">
                  <div className="h-12 w-12 rounded-lg bg-brand-red-600/10 flex items-center justify-center text-brand-red-600">
                    <service.icon className="h-6 w-6" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-brand-navy-900 mb-2">{service.title}</h3>
                  <p className="text-neutral-gray-dark mb-4">{service.description}</p>
                  {service.details && (
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {service.details.map((detail, idx) => (
                        <li key={idx} className="flex items-center text-sm text-neutral-gray-dark">
                          <div className="h-1.5 w-1.5 rounded-full bg-brand-red-600 mr-2" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team */}
      <div className="py-24 sm:py-32 bg-white relative">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-brand-navy-900 sm:text-4xl">Our Team</h2>
            <p className="mt-4 text-lg leading-8 text-neutral-gray-dark">
              AfriScience Hub® is built by a team of intellectual and highly motivated individuals with reputable analytical, technical and interpersonal skills.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {TEAM.map((member) => (
              <div 
                key={member.name} 
                className="group"
              >
                <div className="relative overflow-hidden rounded-2xl bg-neutral-bg-light aspect-[4/5] mb-4">
                    <img 
                        src={member.image} 
                        alt={member.name}
                        className="h-full w-full object-cover"
                    />
                </div>
                <div>
                   <h3 className="text-lg font-bold text-brand-navy-900">{member.name}</h3>
                   <div className="flex items-center gap-3 mt-1">
                     {member.linkedin && (
                       <span className="text-xs text-neutral-gray-dark flex items-center gap-1">
                         <Linkedin className="h-3 w-3" /> {member.linkedin}
                       </span>
                     )}
                     {member.twitter && (
                       <span className="text-xs text-neutral-gray-dark flex items-center gap-1">
                         <X className="h-3 w-3" /> {member.twitter}
                       </span>
                     )}
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="relative bg-brand-navy-800">
        <div className="relative h-80 overflow-hidden md:absolute md:left-0 md:h-full md:w-1/3 lg:w-1/2">
          <img
            className="h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1657394404815-6e8d8b164edf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBsYWJvcmF0b3J5JTIwbWljcm9zY29wZSUyMHJlc2VhcmNofGVufDF8fHx8MTc3MDc2Nzk3M3ww&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Laboratory"
          />
           <div className="absolute inset-0 bg-brand-navy-800/60 mix-blend-multiply" />
        </div>
        <div className="relative mx-auto max-w-7xl py-24 sm:py-32 lg:px-8 lg:py-40">
          <div className="pl-6 pr-6 md:ml-auto md:w-2/3 md:pl-16 lg:w-1/2 lg:pl-24 lg:pr-0 xl:pl-32">
            <h2 className="text-base font-semibold leading-7 text-brand-red-600">Join the Ecosystem</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready for a Limitless experience in Science and Technology?
            </p>
            <p className="mt-6 text-base leading-7 text-neutral-gray-light">
              Join us now to connect, innovate, and grow with the AfriScience Hub ecosystem.
            </p>
            <div className="mt-8 flex flex-col gap-4 text-white">
              <div className="flex items-center gap-3">
                 <div className="h-10 w-10 rounded-lg bg-white/10 flex items-center justify-center">
                    <Mail className="h-5 w-5" />
                 </div>
                 <div>
                    <div className="font-semibold">Email</div>
                    <div className="text-sm text-neutral-gray-light">contact@afrisciencehub.com</div>
                    <div className="text-sm text-neutral-gray-light">support@afrisciencehub.com</div>
                 </div>
              </div>
              <div className="flex items-center gap-3">
                 <div className="h-10 w-10 rounded-lg bg-white/10 flex items-center justify-center">
                    <Users className="h-5 w-5" />
                 </div>
                 <div>
                    <div className="font-semibold">Phone</div>
                    <div className="text-sm text-neutral-gray-light">+2349160003305, +2349160003306</div>
                 </div>
              </div>
            </div>
            <div className="mt-8">
              <Link href="/contact">
                <Button size="lg" className="bg-white text-brand-navy-900 hover:bg-neutral-gray-light">
                  Join Us Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}