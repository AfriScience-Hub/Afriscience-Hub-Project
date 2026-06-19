'use client';

import Link from 'next/link';
import { Users, ArrowRight, CheckCircle2, Clock, MapPin, Briefcase } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { AFRICAN_COUNTRIES } from '../data/mockData';

// African countries with their states/regions
const COUNTRY_STATES: Record<string, string[]> = {
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

const QUALIFICATIONS = [
  'High school/secondary education',
  'Associate degrees',
  'Diplomas/certificate programs',
  'Bachelor\'s degree',
  'Master\'s degree',
  'Doctoral degree',
  'Others'
];

const TASKS = [
  'Registering institutes and specialist centers',
  'Referring scientists and technologists',
  'Targeted advertisements',
  'Conducting surveys',
  'Sourcing sponsors',
  'Supervision',
  'Coordination and Hosting'
];

const COMPENSATIONS = [
  'Scholarships',
  'Job offers',
  'Recommendations'
];

const VOLUNTEER_ROLES = [
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

export default function Volunteer() {
  const { isAuthenticated } = useAuth();
  const formRef = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState({
    qualification: '',
    country: '',
    state: '',
    tasks: [] as string[],
    compensation: ''
  });

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleTaskToggle = (task: string) => {
    setFormData(prev => {
      const newTasks = prev.tasks.includes(task)
        ? prev.tasks.filter(t => t !== task)
        : prev.tasks.length < 2
          ? [...prev.tasks, task]
          : prev.tasks;
      return { ...prev, tasks: newTasks };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      alert('Please log in to apply as a volunteer.');
      return;
    }
    
    if (formData.tasks.length === 0) {
      alert('Please select at least one task.');
      return;
    }
    
    alert('Thank you for your application! We will review it and get back to you within 5 business days.');
    setFormData({
      qualification: '',
      country: '',
      state: '',
      tasks: [],
      compensation: ''
    });
  };

  const availableStates = formData.country ? (COUNTRY_STATES[formData.country] || []) : [];

  return (
    <div className="pb-16">
      {/* Hero */}
      <section className="relative bg-brand-navy-900 py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1744234233590-2d00b3c87444?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwdm9sdW50ZWVycyUyMHRlYW0lMjBjb21tdW5pdHklMjB3b3JrfGVufDF8fHx8MTc3Mjg2OTA0OHww&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Volunteer"
            className="h-full w-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-navy-900/60 to-brand-navy-900" />
        </div>
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/support" className="inline-flex items-center gap-1 text-slate-400 hover:text-white text-sm mb-6 transition-colors">
            <ArrowRight className="h-3 w-3 rotate-180" /> Back to Support
          </Link>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-400 px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
              <Users className="h-4 w-4" />
              Volunteering
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-6 tracking-tight">
              Become a Volunteer
            </h1>
            <p className="text-slate-300 text-lg leading-relaxed mb-8">
              At AfriScience Hub®, our volunteers are considered as external team members of the network. They are trained to work hand in hand with us to expand our reach across the African continent and beyond. Volunteers engage in several activities within their respective regions for the network – marketing, surveys, supervision, hosting, coordination, etc. In return, they form closer ties with the network and enjoy numerous benefits for their services.
            </p>
            <Button 
              size="lg" 
              onClick={scrollToForm}
              className="h-12 px-8 bg-brand-red-600 hover:bg-brand-red-700 text-base"
            >
              Become a Volunteer Today!
            </Button>
          </div>
        </div>
      </section>

      {/* Why Volunteer */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-neutral-black mb-2">Why Volunteer With Us?</h2>
          <p className="text-slate-500 max-w-xl mx-auto">Volunteering with AfriScienceHub is more than giving back — it's building Africa's future.</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { emoji: '🌍', title: 'Pan-African Impact', desc: 'Your contributions reach scientists and innovators across 54 countries.' },
            { emoji: '🤝', title: 'Network Growth', desc: 'Build connections with leading minds in African science and technology.' },
            { emoji: '📜', title: 'Certification', desc: 'Receive official volunteer certificates and recognition for your service.' },
            { emoji: '🚀', title: 'Skill Development', desc: 'Gain new skills in mentoring, event management, and community building.' },
          ].map((item, idx) => (
            <div key={idx} className="p-6 rounded-xl bg-neutral-bg-light text-center hover:shadow-md transition-shadow">
              <div className="text-3xl mb-3">{item.emoji}</div>
              <h3 className="font-bold text-neutral-black mb-1">{item.title}</h3>
              <p className="text-sm text-slate-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Volunteer Roles */}
      <section className="bg-neutral-bg-light py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-neutral-black mb-2">Volunteer Roles</h2>
            <p className="text-slate-500">Choose how you'd like to contribute to the ecosystem.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {VOLUNTEER_ROLES.map((role, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-neutral-gray-light p-6 hover:shadow-md transition-shadow">
                <div className="text-3xl mb-3">{role.emoji}</div>
                <h3 className="font-bold text-neutral-black mb-2">{role.title}</h3>
                <p className="text-sm text-slate-500 mb-4">{role.description}</p>
                <div className="flex flex-col gap-1.5 mb-4 text-xs text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-3 w-3" /> {role.commitment}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="h-3 w-3" /> {role.location}
                  </div>
                </div>
                <div className="space-y-1.5">
                  <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Requirements</p>
                  {role.requirements.map((req, i) => (
                    <div key={i} className="flex items-start gap-1.5 text-xs text-slate-500">
                      <CheckCircle2 className="h-3 w-3 text-emerald-500 mt-0.5 flex-shrink-0" />
                      {req}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Eligibility */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-neutral-black mb-2">Eligibility</h2>
            <p className="text-slate-500">We welcome volunteers from all backgrounds. Here's what we look for:</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              'Passion for African science & innovation',
              'Reliable and committed to schedules',
              'Good communication skills',
              'Willingness to learn and collaborate',
              'Minimum age: 18 years',
              'Access to reliable internet (for remote roles)',
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 p-4 bg-neutral-bg-light rounded-xl">
                <CheckCircle2 className="h-5 w-5 text-brand-red-600 flex-shrink-0" />
                <span className="text-sm text-neutral-black">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="bg-neutral-bg-light py-16" ref={formRef}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-neutral-black mb-2">Apply to Volunteer</h2>
              <p className="text-slate-500">Fill out the form below and we'll get back to you within 5 business days.</p>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-neutral-gray-light p-8 space-y-5">
              {/* Name and ID Tag - Auto-generated */}
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1.5">Name</label>
                  <input
                    type="text"
                    value={isAuthenticated ? 'John Doe' : ''}
                    disabled
                    className="w-full rounded-xl border border-neutral-gray-light px-4 py-3 text-sm bg-neutral-bg-light text-slate-400 cursor-not-allowed"
                    placeholder={!isAuthenticated ? 'Please log in' : 'Auto-generated'}
                  />
                  {!isAuthenticated && (
                    <p className="text-xs text-amber-600 mt-1">Please log in to apply</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1.5">ID Tag</label>
                  <input
                    type="text"
                    value={isAuthenticated ? 'USR-NG-2026-0001' : ''}
                    disabled
                    className="w-full rounded-xl border border-neutral-gray-light px-4 py-3 text-sm bg-neutral-bg-light text-slate-400 cursor-not-allowed"
                    placeholder={!isAuthenticated ? 'Please log in' : 'Auto-generated'}
                  />
                </div>
              </div>

              {/* Qualification */}
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1.5">Qualification *</label>
                <select
                  required
                  value={formData.qualification}
                  onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                  className="w-full rounded-xl border border-neutral-gray-light px-4 py-3 text-sm focus:border-brand-red-600 focus:outline-none focus:ring-1 focus:ring-brand-red-600 bg-white"
                >
                  <option value="">Select your qualification</option>
                  {QUALIFICATIONS.map((qual, idx) => (
                    <option key={idx} value={qual}>{qual}</option>
                  ))}
                </select>
              </div>

              {/* Country and State */}
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1.5">Volunteering Country *</label>
                  <select
                    required
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value, state: '' })}
                    className="w-full rounded-xl border border-neutral-gray-light px-4 py-3 text-sm focus:border-brand-red-600 focus:outline-none focus:ring-1 focus:ring-brand-red-600 bg-white"
                  >
                    <option value="">Select a country</option>
                    {Object.keys(COUNTRY_STATES).map((country, idx) => (
                      <option key={idx} value={country}>{country}</option>
                    ))}
                  </select>
                  <p className="text-xs text-slate-500 mt-1">Country you'd like to represent</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1.5">Volunteering Region/State *</label>
                  <select
                    required
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    disabled={!formData.country}
                    className="w-full rounded-xl border border-neutral-gray-light px-4 py-3 text-sm focus:border-brand-red-600 focus:outline-none focus:ring-1 focus:ring-brand-red-600 bg-white disabled:bg-neutral-bg-light disabled:cursor-not-allowed"
                  >
                    <option value="">Select a state/region</option>
                    {availableStates.map((state, idx) => (
                      <option key={idx} value={state}>{state}</option>
                    ))}
                  </select>
                  <p className="text-xs text-slate-500 mt-1">Specific region within country</p>
                </div>
              </div>

              {/* Tasks */}
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">Task (Select up to 2) *</label>
                <div className="grid gap-3 sm:grid-cols-2">
                  {TASKS.map((task, idx) => (
                    <label
                      key={idx}
                      className={`flex items-start gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
                        formData.tasks.includes(task)
                          ? 'border-brand-red-600 bg-brand-red-50'
                          : 'border-neutral-gray-light hover:border-neutral-gray-medium'
                      } ${
                        formData.tasks.length >= 2 && !formData.tasks.includes(task)
                          ? 'opacity-50 cursor-not-allowed'
                          : ''
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={formData.tasks.includes(task)}
                        onChange={() => handleTaskToggle(task)}
                        disabled={formData.tasks.length >= 2 && !formData.tasks.includes(task)}
                        className="h-4 w-4 text-brand-red-600 focus:ring-brand-red-600 border-gray-300 rounded mt-0.5 flex-shrink-0"
                      />
                      <span className="text-sm text-slate-700">{task}</span>
                    </label>
                  ))}
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  Selected: {formData.tasks.length}/2
                </p>
              </div>

              {/* Additional Compensation */}
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">Additional Compensation (Select 1) *</label>
                <div className="grid gap-3 sm:grid-cols-3">
                  {COMPENSATIONS.map((comp, idx) => (
                    <label
                      key={idx}
                      className={`flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
                        formData.compensation === comp
                          ? 'border-brand-red-600 bg-brand-red-50'
                          : 'border-neutral-gray-light hover:border-neutral-gray-medium'
                      }`}
                    >
                      <input
                        type="radio"
                        name="compensation"
                        value={comp}
                        checked={formData.compensation === comp}
                        onChange={(e) => setFormData({ ...formData, compensation: e.target.value })}
                        className="h-4 w-4 text-brand-red-600 focus:ring-brand-red-600 border-gray-300"
                      />
                      <span className="text-sm text-slate-700">{comp}</span>
                    </label>
                  ))}
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 bg-brand-red-600 hover:bg-brand-red-700 text-base"
                disabled={!isAuthenticated}
              >
                {isAuthenticated ? 'Apply' : 'Log in to Apply'}
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}