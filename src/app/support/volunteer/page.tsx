'use client';

import { 
  ArrowLeft, 
  Users, 
  Globe, 
  Handshake, 
  FileCheck, 
  Rocket, 
  Scale, 
  Microscope, 
  Tent, 
  ShieldCheck, 
  PenTool, 
  Languages, 
  Clock, 
  MapPin, 
  CheckCircle2 
} from 'lucide-react';
import Header from '../../components/header';
import Footer from '../../components/footer';
import SearchModal from '../../components/search';
import Link from 'next/link';
import { useState, 
  // useEffect
 } from 'react';

// Mock data for Africa - in a real app, this might come from an API
const africanData: Record<string, string[]> = {
  "Nigeria": ["Lagos", "Abuja", "Kano", "Oyo", "Rivers"],
  "Kenya": ["Nairobi", "Mombasa", "Kisumu", "Nakuru"],
  "South Africa": ["Gauteng", "Western Cape", "KwaZulu-Natal", "Eastern Cape"],
  "Egypt": ["Cairo", "Alexandria", "Giza", "Luxor"],
  "Ghana": ["Greater Accra", "Ashanti", "Western", "Central"],
  "Ethiopia": ["Addis Ababa", "Amhara", "Oromia", "Tigray"]
};

export default function VolunteerPage() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [isLoggedIn, 
    // setIsLoggedIn
  ] = useState(false); // Toggle for demo

  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);
  const handleSearchOpen = () => setSearchOpen(true);
  
  const toggleTask = (task: string) => {
    if (selectedTasks.includes(task)) {
      setSelectedTasks(selectedTasks.filter(t => t !== task));
    } else if (selectedTasks.length < 2) {
      setSelectedTasks([...selectedTasks, task]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onSearchOpen={handleSearchOpen} />

      {/* Hero Section */}
      <section className="relative bg-[#0A1428] text-white py-28 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className='flex flex-col items-start'>
            <Link href="/support" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-5">
              <ArrowLeft className="w-4 h-4" /> Back to Support
            </Link>
            <div className="flex gap-2 bg-blue-500/20 text-blue-400 border border-blue-500/30 px-5 py-2 rounded-full text-sm font-medium mb-6">
              <Users className="w-4 h-4" />
              Volunteering
            </div>
          </div>

          <h1 className="text-3xl lg:text-5xl font-bold leading-tight mb-6">
            Become a Volunteer
          </h1>

          <p className="max-w-3xl text-sm lg:text-lg text-gray-300 mb-10 leading-relaxed">
            At AfriScience Hub®, our volunteers are considered as external team members of the network. 
            They are trained to work hand in hand with us to expand our reach across the African continent 
            and beyond. Volunteers engage in several activities within their respective regions for the 
            network — marketing, surveys, supervision, hosting, coordination, etc. In return, they form 
            closer ties with the network and enjoy numerous benefits for their services.
          </p>

          <Link 
            href="#apply"
            className="bg-red-600 hover:bg-red-700 transition-colors text-white font-semibold px-6 py-3 rounded-lg inline-flex items-center justify-center"
          >
            Become a Volunteer Today!
          </Link>
        </div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10" />
      </section>

      {/* Why Volunteer Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Volunteer With Us?</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Volunteering with AfriScienceHub is more than giving back — it&apos;s building Africa&apos;s future.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {[
              { icon: Globe, title: "Pan-African Impact", desc: "Your contributions reach scientists and innovators across 54 countries.", emoji: "🌍" },
              { icon: Handshake, title: "Network Growth", desc: "Build connections with leading minds in African science and technology.", emoji: "🤝" },
              { icon: FileCheck, title: "Certification", desc: "Receive official volunteer certificates and recognition for your service.", emoji: "📜" },
              { icon: Rocket, title: "Skill Development", desc: "Gain new skills in mentoring, event management, and community building.", emoji: "🚀" },
            ].map((item, i) => (
              <div key={i} className="text-center flex flex-col items-center">
                <div className="text-4xl mb-4">{item.emoji}</div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Volunteer Roles Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Volunteer Roles</h2>
            <p className="text-gray-500">Choose how you&apos;d like to contribute to the ecosystem.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Competition Judge",
                icon: Scale,
                desc: "Evaluate entries in annual science and innovation competitions. Share your expertise to identify the most promising African innovations.",
                time: "5-10 hrs / event",
                loc: "Remote / On-site",
                reqs: ["PhD or equivalent experience", "Subject matter expertise", "Impartial evaluation skills"]
              },
              {
                title: "Research Mentor",
                icon: Microscope,
                desc: "Guide early-career African researchers through their projects, offering advice on methodology, publishing, and career development.",
                time: "2-4 hrs / week",
                loc: "Remote",
                reqs: ["Active researcher or professor", "5+ years research experience", "Mentoring experience preferred"]
              },
              {
                title: "Event Volunteer",
                icon: Tent,
                desc: "Help organize and run AfriScienceHub events including conferences, workshops, award ceremonies, and community outreach programs.",
                time: "Event-based",
                loc: "On-site (various cities)",
                reqs: ["Strong organizational skills", "Available for event dates", "Team player"]
              },
              {
                title: "Platform Moderator",
                icon: ShieldCheck,
                desc: "Review listings, moderate community discussions, and ensure content quality across the AfriScienceHub platform.",
                time: "3-5 hrs / week",
                loc: "Remote",
                reqs: ["Familiar with AfriScienceHub platform", "Attention to detail", "Good communication skills"]
              },
              {
                title: "Content Creator",
                icon: PenTool,
                desc: "Write articles, create social media content, and produce educational materials that highlight African science achievements.",
                time: "3-6 hrs / week",
                loc: "Remote",
                reqs: ["Strong writing skills", "Knowledge of African science landscape", "Content creation experience"]
              },
              {
                title: "Translation Volunteer",
                icon: Languages,
                desc: "Help translate platform content, research summaries, and educational materials into African languages to improve accessibility.",
                time: "2-4 hrs / week",
                loc: "Remote",
                reqs: ["Fluent in English + African language(s)", "Translation experience", "Science literacy preferred"]
              }
            ].map((role, i) => (
              <div key={i} className="bg-white border border-gray-100 p-8 rounded-3xl hover:shadow-lg transition-shadow text-black">
                <role.icon className="w-8 h-8 text-blue-600 mb-6" />
                <h3 className="text-xl font-bold mb-4">{role.title}</h3>
                <p className="text-gray-500 text-sm mb-6 leading-relaxed">{role.desc}</p>
                
                <div className="space-y-2 mb-8">
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <Clock className="w-3.5 h-3.5" /> {role.time}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <MapPin className="w-3.5 h-3.5" /> {role.loc}
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="text-[10px] uppercase tracking-widest font-bold text-gray-900">Requirements</p>
                  {role.reqs.map((req, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-gray-600">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> {req}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Eligibility Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">Eligibility</h2>
          <p className="text-gray-500 text-center mb-16">We welcome volunteers from all backgrounds. Here&apos;s what we look for:</p>
          
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
            {[
              "Passion for African science & innovation",
              "Reliable and committed to schedules",
              "Good communication skills",
              "Willingness to learn and collaborate",
              "Minimum age: 18 years",
              "Access to reliable internet (for remote roles)"
            ].map((text, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-6 h-6  flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-red-500" />
                </div>
                <span className="text-gray-700 font-medium text-md">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section id="apply" className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Apply to Volunteer</h2>
            <p className="text-gray-500">Fill out the form below and we&apos;ll get back to you within 5 business days.</p>
          </div>

          <div className="bg-white p-8 rounded-4xl border border-gray-100 shadow-sm">
            <form className="space-y-5">
              {/* Name and ID Group */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
                  <input 
                    type="text" 
                    placeholder="Please log in"
                    disabled 
                    className="w-full bg-gray-100 border border-gray-200 rounded-xl px-4 py-3 text-gray-400 cursor-not-allowed"
                  />
                  {!isLoggedIn && <p className="text-amber-600 text-[10px] mt-1.5">Please log in to apply</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">ID Tag</label>
                  <input 
                    type="text" 
                    placeholder="Please log in"
                    disabled 
                    className="w-full bg-gray-100 border border-gray-200 rounded-xl px-4 py-3 text-gray-400 cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Qualification */}
              <div>
                <label className="block text-sm font-semibold text-black mb-2">Qualification *</label>
                <select className="w-full border border-gray-200 rounded-xl text-black text-sm px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cpath%20d%3D%22M5%207.5L10%2012.5L15%207.5%22%20stroke%3D%22%236B7280%22%20stroke-width%3D%221.67%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22/%3E%3C/svg%3E')] bg-size-[20px_20px] bg-position-[right_16px_center] bg-no-repeat">
                  <option value="">Select your qualification</option>
                  <option>High school/secondary education</option>
                  <option>Associate degrees</option>
                  <option>Diplomas/certificate programs</option>
                  <option>Bachelor’s degree</option>
                  <option>Master’s degree</option>
                  <option>Doctoral degree</option>
                  <option>Others</option>
                </select>
              </div>

              {/* Location Group */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Volunteering Country *</label>
                  <select 
                    onChange={(e) => setSelectedCountry(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none text-black text-sm"
                  >
                    <option value="">Select a country</option>
                    {Object.keys(africanData).map(country => (
                      <option key={country} value={country}>{country}</option>
                    ))}
                  </select>
                  <p className="text-[10px] text-gray-400 mt-1.5">Country you&apos;d like to represent</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Volunteering Region/State *</label>
                  <select className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none text-sm text-black">
                    <option value="">Select a state/region</option>
                    {selectedCountry && africanData[selectedCountry].map(state => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                  <p className="text-[10px] text-gray-400 mt-1.5">Specific region within country</p>
                </div>
              </div>

              {/* Tasks Grid */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-4">Task (Select up to 2) *</label>
                <div className="grid md:grid-cols-2 gap-3">
                  {[
                    "Registering institutes and specialist centers",
                    "Referring scientists and technologists",
                    "Targeted advertisements",
                    "Conducting surveys",
                    "Sourcing sponsors",
                    "Supervision",
                    "Coordination and Hosting"
                  ].map((task) => (
                    <button
                      key={task}
                      type="button"
                      onClick={() => toggleTask(task)}
                      className={`flex items-center gap-3 p-4 border rounded-xl text-left text-sm transition-all ${
                        selectedTasks.includes(task) 
                          ? 'border-blue-600 bg-blue-50 text-blue-700' 
                          : 'border-gray-100 hover:border-gray-300 text-gray-600'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                        selectedTasks.includes(task) ? 'bg-blue-600 border-blue-600' : 'border-gray-300'
                      }`}>
                        {selectedTasks.includes(task) && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                      </div>
                      {task}
                    </button>
                  ))}
                </div>
                <p className="text-[10px] text-gray-400 mt-3">Selected: {selectedTasks.length}/2</p>
              </div>

              {/* Additional Compensation */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-4">Additional Compensation (Select 1) *</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {["Scholarships", "Job offers", "Recommendations"].map((opt) => (
                    <label key={opt} className="flex items-center gap-3 p-4 border border-gray-100 rounded-xl cursor-pointer hover:bg-gray-50">
                      <input type="radio" name="compensation" className="w-4 h-4 text-blue-600" />
                      <span className="text-sm text-gray-700">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button 
                type="button"
                className="w-full bg-red-300 text-white font-bold py-4 rounded-xl cursor-not-allowed"
              >
                Log in to Apply
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}