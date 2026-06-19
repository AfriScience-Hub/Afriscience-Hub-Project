import { useState } from 'react';
import {
  User, Edit3, Upload, Save,
  GraduationCap, Briefcase, Shield, Heart,
  Linkedin, Twitter, Facebook, Instagram, Eye, EyeOff, CheckCircle, AlertCircle, Activity
} from 'lucide-react';
import { Button } from './ui/Button';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';

type TabKey = 'personal' | 'education' | 'professional' | 'interests' | 'system';

const TABS = [
  { key: 'personal' as const, label: 'Personal Information', icon: User },
  { key: 'education' as const, label: 'Education and Skills', icon: GraduationCap },
  { key: 'professional' as const, label: 'Professional Experience', icon: Briefcase },
  { key: 'interests' as const, label: 'Interests', icon: Heart },
  { key: 'system' as const, label: 'System & Security', icon: Shield },
];

export function ProfileContent() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<TabKey>('personal');
  const [showPassword, setShowPassword] = useState(false);

  // Personal Information State
  const [fullName, setFullName] = useState(user?.name || 'Claire Iwuanyanwu');
  const [username, setUsername] = useState('@claire_iwu');
  const [bio, setBio] = useState('Passionate about renewable energy and sustainable development in Africa');
  const [gender, setGender] = useState('Female');
  const [dateOfBirth, setDateOfBirth] = useState('1997-02-23');
  const [govIdCode, setGovIdCode] = useState('FE/23/70886398');

  // Contact Information State
  const [email, setEmail] = useState(user?.email || 'claire.iwuanyanwu@afriscience.org');
  const [phone, setPhone] = useState(user?.phone || '+234 805 675 0798');
  const [altPhone, setAltPhone] = useState('');
  const [address, setAddress] = useState('14 Ahunanya Street');
  const [city, setCity] = useState('Umungasi');
  const [stateProvince, setStateProvince] = useState('Imo State');
  const [stateOfResidence, setStateOfResidence] = useState('Abia State');
  const [localGovt, setLocalGovt] = useState('Aba South');
  const [country, setCountry] = useState('Nigeria');
  const [zipCode, setZipCode] = useState('');
  const [website, setWebsite] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('https://www.linkedin.com/in/claire-iwu');
  const [twitterUrl, setTwitterUrl] = useState('');
  const [facebookUrl, setFacebookUrl] = useState('');
  const [instagramUrl, setInstagramUrl] = useState('');

  // Education & Skills State
  const [educationLevel, setEducationLevel] = useState("Bachelor's Degree");
  const [graduationClass, setGraduationClass] = useState('First Class');
  const [institution, setInstitution] = useState('University of Lagos');
  const [courseOfStudy, setCourseOfStudy] = useState('Electrical Engineering');
  const [yearOfGraduation, setYearOfGraduation] = useState('2023');
  const [completedNYSC, setCompletedNYSC] = useState('Yes');
  const [skillLevel, setSkillLevel] = useState('Advanced');
  const [englishProficiency, setEnglishProficiency] = useState('Advanced');
  const [otherLanguages, setOtherLanguages] = useState('Igbo, Yoruba');
  const [cvFile, setCvFile] = useState<File | null>(null);

  // Professional Experience State
  const [employmentStatus, setEmploymentStatus] = useState('Student');
  const [occupation, setOccupation] = useState('Renewable Energy Consultant');
  const [industry, setIndustry] = useState('Energy & Power');
  const [companyOrganization, setCompanyOrganization] = useState('');
  const [skillsExpertise, setSkillsExpertise] = useState('Solar Energy, Power Systems Design, Project Management');
  const [portfolioLinks, setPortfolioLinks] = useState('');

  // Security State
  const [password, setPassword] = useState('');
  const [securityQuestion, setSecurityQuestion] = useState('What is your mother\'s maiden name?');
  const [securityAnswer, setSecurityAnswer] = useState('');

  // Interests State
  const [interests, setInterests] = useState('Renewable Energy, Sustainable Agriculture, Climate Change, Innovation');

  // Calculate profile completion
  const calculateCompletion = () => {
    const fields = [
      fullName, username, bio, gender, dateOfBirth, govIdCode,
      email, phone, address, city, stateProvince, country,
      educationLevel, institution, courseOfStudy, yearOfGraduation,
      employmentStatus, occupation, industry, skillsExpertise
    ];
    const filled = fields.filter(f => f && f.toString().trim() !== '').length;
    return Math.round((filled / fields.length) * 100);
  };

  const completionPct = calculateCompletion();

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Profile updated successfully!');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCvFile(file);
      toast.success('CV uploaded successfully!');
    }
  };

  return (
    <>
      {/* Profile Header Card */}
      <div className="rounded-2xl border border-neutral-gray-light bg-white shadow-sm overflow-hidden mb-6">
        {/* Banner Background */}
        <div className="h-32 bg-gradient-to-r from-brand-navy-900 to-brand-navy-800 relative">
          <div className="absolute inset-0 opacity-10" style={{ 
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.15\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
          }} />
        </div>

        {/* Profile Info */}
        <div className="px-6 pb-6 -mt-16 relative">
          <div className="flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-6">
            <div className="relative">
              <img
                src={user?.avatar}
                alt={fullName}
                className="h-32 w-32 rounded-full object-cover border-4 border-white shadow-lg"
              />
              <button className="absolute bottom-0 right-0 h-10 w-10 rounded-full bg-green-600 hover:bg-green-700 flex items-center justify-center text-white shadow-lg transition-colors">
                <Edit3 className="h-4 w-4" />
              </button>
            </div>
            <div className="flex-1 pt-2">
              <h2 className="text-2xl font-bold text-neutral-black">{fullName} <span className="text-lg text-neutral-gray-medium font-normal">(3mtt)</span></h2>
              <p className="text-sm text-neutral-gray-medium mt-1">{govIdCode}</p>
            </div>
            <div className="flex items-center justify-center h-24 w-24 rounded-2xl bg-neutral-bg-light border border-neutral-gray-light">
              <div className="text-center">
                <p className="text-2xl font-bold text-neutral-black">{completionPct}%</p>
                <p className="text-xs text-neutral-gray-medium">Complete</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs & Content */}
      <div className="rounded-2xl border border-neutral-gray-light bg-white shadow-sm overflow-hidden">
        {/* Tab Navigation */}
        <div className="border-b border-neutral-gray-light bg-white overflow-x-auto">
          <div className="flex min-w-max">
            {TABS.map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-6 py-4 border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.key
                    ? 'border-green-600 text-green-600'
                    : 'border-transparent text-neutral-gray-medium hover:text-neutral-gray-dark'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                <span className="text-sm font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <form onSubmit={handleSaveProfile} className="p-6 space-y-6">
          {activeTab === 'personal' && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-neutral-black">Personal Information</h3>
              
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-gray-dark mb-2">Full Name <span className="text-red-600">*</span></label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-neutral-gray-light bg-neutral-bg-light focus:outline-none focus:border-brand-navy-900"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-gray-dark mb-2">Username <span className="text-red-600">*</span></label>
                  <input
                    type="text"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-neutral-gray-light bg-neutral-bg-light focus:outline-none focus:border-brand-navy-900"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-gray-dark mb-2">Gender <span className="text-red-600">*</span></label>
                  <select
                    value={gender}
                    onChange={e => setGender(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-neutral-gray-light bg-neutral-bg-light focus:outline-none focus:border-brand-navy-900"
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Other">Other</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-gray-dark mb-2">Date of Birth <span className="text-red-600">*</span></label>
                  <input
                    type="date"
                    value={dateOfBirth}
                    onChange={e => setDateOfBirth(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-neutral-gray-light bg-neutral-bg-light focus:outline-none focus:border-brand-navy-900"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-gray-dark mb-2">Government ID Code <span className="text-red-600">*</span></label>
                  <input
                    type="text"
                    value={govIdCode}
                    onChange={e => setGovIdCode(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-neutral-gray-light bg-neutral-bg-light focus:outline-none focus:border-brand-navy-900"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-gray-dark mb-2">Bio / About Me <span className="text-red-600">*</span></label>
                <textarea
                  value={bio}
                  onChange={e => setBio(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 rounded-lg border border-neutral-gray-light bg-neutral-bg-light focus:outline-none focus:border-brand-navy-900 resize-none"
                  required
                />
              </div>

              <h3 className="text-lg font-bold text-neutral-black pt-4">Contact Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-gray-dark mb-2">Email <span className="text-red-600">*</span></label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-neutral-gray-light bg-neutral-bg-light focus:outline-none focus:border-brand-navy-900"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-gray-dark mb-2">Phone Number <span className="text-red-600">*</span></label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-neutral-gray-light bg-neutral-bg-light focus:outline-none focus:border-brand-navy-900"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-gray-dark mb-2">Alternative Number</label>
                  <input
                    type="tel"
                    value={altPhone}
                    onChange={e => setAltPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-neutral-gray-light bg-neutral-bg-light focus:outline-none focus:border-brand-navy-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-gray-dark mb-2">Address</label>
                  <input
                    type="text"
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-neutral-gray-light bg-neutral-bg-light focus:outline-none focus:border-brand-navy-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-gray-dark mb-2">City</label>
                  <input
                    type="text"
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-neutral-gray-light bg-neutral-bg-light focus:outline-none focus:border-brand-navy-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-gray-dark mb-2">State of Origin</label>
                  <input
                    type="text"
                    value={stateProvince}
                    onChange={e => setStateProvince(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-neutral-gray-light bg-neutral-bg-light focus:outline-none focus:border-brand-navy-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-gray-dark mb-2">State of Residence</label>
                  <input
                    type="text"
                    value={stateOfResidence}
                    onChange={e => setStateOfResidence(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-neutral-gray-light bg-neutral-bg-light focus:outline-none focus:border-brand-navy-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-gray-dark mb-2">Local Government of Residence</label>
                  <input
                    type="text"
                    value={localGovt}
                    onChange={e => setLocalGovt(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-neutral-gray-light bg-neutral-bg-light focus:outline-none focus:border-brand-navy-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-gray-dark mb-2">Country</label>
                  <input
                    type="text"
                    value={country}
                    onChange={e => setCountry(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-neutral-gray-light bg-neutral-bg-light focus:outline-none focus:border-brand-navy-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-gray-dark mb-2">Zip / Postal Code</label>
                  <input
                    type="text"
                    value={zipCode}
                    onChange={e => setZipCode(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-neutral-gray-light bg-neutral-bg-light focus:outline-none focus:border-brand-navy-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-gray-dark mb-2">Website</label>
                  <input
                    type="url"
                    value={website}
                    onChange={e => setWebsite(e.target.value)}
                    placeholder="https://example.com"
                    className="w-full px-3 py-2 rounded-lg border border-neutral-gray-light bg-neutral-bg-light focus:outline-none focus:border-brand-navy-900"
                  />
                </div>
              </div>

              <h3 className="text-lg font-bold text-neutral-black pt-4">Social Media Links</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-gray-dark mb-2 flex items-center gap-2">
                    <Linkedin className="h-4 w-4 text-blue-600" /> LinkedIn Profile
                  </label>
                  <input
                    type="url"
                    value={linkedinUrl}
                    onChange={e => setLinkedinUrl(e.target.value)}
                    placeholder="https://linkedin.com/in/username"
                    className="w-full px-3 py-2 rounded-lg border border-neutral-gray-light bg-neutral-bg-light focus:outline-none focus:border-brand-navy-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-gray-dark mb-2 flex items-center gap-2">
                    <Twitter className="h-4 w-4 text-sky-500" /> Twitter Profile
                  </label>
                  <input
                    type="url"
                    value={twitterUrl}
                    onChange={e => setTwitterUrl(e.target.value)}
                    placeholder="https://twitter.com/username"
                    className="w-full px-3 py-2 rounded-lg border border-neutral-gray-light bg-neutral-bg-light focus:outline-none focus:border-brand-navy-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-gray-dark mb-2 flex items-center gap-2">
                    <Facebook className="h-4 w-4 text-blue-700" /> Facebook Profile
                  </label>
                  <input
                    type="url"
                    value={facebookUrl}
                    onChange={e => setFacebookUrl(e.target.value)}
                    placeholder="https://facebook.com/username"
                    className="w-full px-3 py-2 rounded-lg border border-neutral-gray-light bg-neutral-bg-light focus:outline-none focus:border-brand-navy-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-gray-dark mb-2 flex items-center gap-2">
                    <Instagram className="h-4 w-4 text-pink-600" /> Instagram Profile
                  </label>
                  <input
                    type="url"
                    value={instagramUrl}
                    onChange={e => setInstagramUrl(e.target.value)}
                    placeholder="https://instagram.com/username"
                    className="w-full px-3 py-2 rounded-lg border border-neutral-gray-light bg-neutral-bg-light focus:outline-none focus:border-brand-navy-900"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'education' && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-neutral-black">Education and Skills</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-gray-dark mb-2">Education Level</label>
                  <select
                    value={educationLevel}
                    onChange={e => setEducationLevel(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-neutral-gray-light bg-neutral-bg-light focus:outline-none focus:border-brand-navy-900"
                  >
                    <option value="">Select Education Level</option>
                    <option value="High School">High School</option>
                    <option value="Associate Degree">Associate Degree</option>
                    <option value="Bachelor's Degree">Bachelor's Degree</option>
                    <option value="Master's Degree">Master's Degree</option>
                    <option value="Doctorate">Doctorate</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-gray-dark mb-2">Institution Attended</label>
                  <input
                    type="text"
                    value={institution}
                    onChange={e => setInstitution(e.target.value)}
                    placeholder="Institution Name"
                    className="w-full px-3 py-2 rounded-lg border border-neutral-gray-light bg-neutral-bg-light focus:outline-none focus:border-brand-navy-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-gray-dark mb-2">Course of Study</label>
                  <input
                    type="text"
                    value={courseOfStudy}
                    onChange={e => setCourseOfStudy(e.target.value)}
                    placeholder="Electrical Engineering"
                    className="w-full px-3 py-2 rounded-lg border border-neutral-gray-light bg-neutral-bg-light focus:outline-none focus:border-brand-navy-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-gray-dark mb-2">Year of Graduation</label>
                  <input
                    type="text"
                    value={yearOfGraduation}
                    onChange={e => setYearOfGraduation(e.target.value)}
                    placeholder="2023"
                    className="w-full px-3 py-2 rounded-lg border border-neutral-gray-light bg-neutral-bg-light focus:outline-none focus:border-brand-navy-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-gray-dark mb-2">Graduation Class</label>
                  <select
                    value={graduationClass}
                    onChange={e => setGraduationClass(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-neutral-gray-light bg-neutral-bg-light focus:outline-none focus:border-brand-navy-900"
                  >
                    <option value="">Select Graduation Class</option>
                    <option value="First Class">First Class</option>
                    <option value="Second Class Upper">Second Class Upper</option>
                    <option value="Second Class Lower">Second Class Lower</option>
                    <option value="Third Class">Third Class</option>
                    <option value="Pass">Pass</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-gray-dark mb-2">Have you completed NYSC?</label>
                  <div className="flex gap-4 pt-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        value="Yes"
                        checked={completedNYSC === 'Yes'}
                        onChange={e => setCompletedNYSC(e.target.value)}
                        className="h-4 w-4 text-brand-navy-900"
                      />
                      <span className="text-sm">Yes</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        value="No"
                        checked={completedNYSC === 'No'}
                        onChange={e => setCompletedNYSC(e.target.value)}
                        className="h-4 w-4 text-brand-navy-900"
                      />
                      <span className="text-sm">No</span>
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-gray-dark mb-2">Upload your CV (PDF)</label>
                <div className="flex items-center gap-3">
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="cv-upload"
                  />
                  <label
                    htmlFor="cv-upload"
                    className="px-4 py-2 rounded-lg border border-neutral-gray-light bg-white hover:bg-neutral-bg-light cursor-pointer inline-flex items-center gap-2 transition-colors"
                  >
                    <Upload className="h-4 w-4" />
                    Choose File
                  </label>
                  <span className="text-sm text-neutral-gray-medium">
                    {cvFile ? cvFile.name : 'No file chosen'}
                  </span>
                </div>
                {cvFile && (
                  <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                    <CheckCircle className="h-3 w-3" /> Current CV: View uploaded CV
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-gray-dark mb-2">Please share the url to your LinkedIn profile</label>
                <input
                  type="url"
                  value={linkedinUrl}
                  onChange={e => setLinkedinUrl(e.target.value)}
                  placeholder="https://www.linkedin.com/in/claire-iwu"
                  className="w-full px-3 py-2 rounded-lg border border-neutral-gray-light bg-neutral-bg-light focus:outline-none focus:border-brand-navy-900"
                />
              </div>

              <h3 className="text-lg font-bold text-neutral-black pt-4">Skill Level</h3>
              <div className="flex gap-4">
                {['Beginner', 'Intermediate', 'Advanced'].map(level => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setSkillLevel(level)}
                    className={`flex-1 py-3 rounded-lg border transition-colors ${
                      skillLevel === level
                        ? 'border-brand-navy-900 bg-brand-navy-900 text-white'
                        : 'border-neutral-gray-light bg-white text-neutral-gray-dark hover:border-brand-navy-900'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-gray-dark mb-2">English Proficiency</label>
                  <select
                    value={englishProficiency}
                    onChange={e => setEnglishProficiency(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-neutral-gray-light bg-neutral-bg-light focus:outline-none focus:border-brand-navy-900"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Native">Native</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-gray-dark mb-2">Other Languages</label>
                  <input
                    type="text"
                    value={otherLanguages}
                    onChange={e => setOtherLanguages(e.target.value)}
                    placeholder="Igbo, Yoruba, Hausa"
                    className="w-full px-3 py-2 rounded-lg border border-neutral-gray-light bg-neutral-bg-light focus:outline-none focus:border-brand-navy-900"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'professional' && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-neutral-black">Professional Experience</h3>
              
              <div>
                <label className="block text-sm font-medium text-neutral-gray-dark mb-3">Employment Status</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {['Employed (Full Time)', 'Self Employed (Business Owner)', 'Student', 'Unemployed'].map(status => (
                    <button
                      key={status}
                      type="button"
                      onClick={() => setEmploymentStatus(status)}
                      className={`py-3 px-4 rounded-lg border transition-colors text-sm ${
                        employmentStatus === status
                          ? 'border-brand-navy-900 bg-brand-navy-900 text-white'
                          : 'border-neutral-gray-light bg-white text-neutral-gray-dark hover:border-brand-navy-900'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              {(employmentStatus === 'Employed (Full Time)' || employmentStatus === 'Self Employed (Business Owner)') && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-gray-dark mb-2">Occupation</label>
                      <input
                        type="text"
                        value={occupation}
                        onChange={e => setOccupation(e.target.value)}
                        placeholder="e.g., Renewable Energy Consultant"
                        className="w-full px-3 py-2 rounded-lg border border-neutral-gray-light bg-neutral-bg-light focus:outline-none focus:border-brand-navy-900"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-gray-dark mb-2">Industry</label>
                      <input
                        type="text"
                        value={industry}
                        onChange={e => setIndustry(e.target.value)}
                        placeholder="e.g., Energy & Power"
                        className="w-full px-3 py-2 rounded-lg border border-neutral-gray-light bg-neutral-bg-light focus:outline-none focus:border-brand-navy-900"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-gray-dark mb-2">Company / Organization</label>
                      <input
                        type="text"
                        value={companyOrganization}
                        onChange={e => setCompanyOrganization(e.target.value)}
                        placeholder="e.g., GreenTech Solutions"
                        className="w-full px-3 py-2 rounded-lg border border-neutral-gray-light bg-neutral-bg-light focus:outline-none focus:border-brand-navy-900"
                      />
                    </div>
                  </div>
                </>
              )}

              <div>
                <label className="block text-sm font-medium text-neutral-gray-dark mb-2">Skills / Expertise</label>
                <textarea
                  value={skillsExpertise}
                  onChange={e => setSkillsExpertise(e.target.value)}
                  rows={3}
                  placeholder="e.g., Solar Energy, Power Systems Design, Project Management, Technical Consulting"
                  className="w-full px-3 py-2 rounded-lg border border-neutral-gray-light bg-neutral-bg-light focus:outline-none focus:border-brand-navy-900 resize-none"
                />
                <p className="text-xs text-neutral-gray-medium mt-1">Separate multiple skills with commas</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-gray-dark mb-2">Portfolio (Add Links)</label>
                <textarea
                  value={portfolioLinks}
                  onChange={e => setPortfolioLinks(e.target.value)}
                  rows={3}
                  placeholder="https://github.com/username&#10;https://behance.net/username&#10;https://portfolio-site.com"
                  className="w-full px-3 py-2 rounded-lg border border-neutral-gray-light bg-neutral-bg-light focus:outline-none focus:border-brand-navy-900 resize-none"
                />
                <p className="text-xs text-neutral-gray-medium mt-1">Add one URL per line</p>
              </div>

              <div className="rounded-lg bg-blue-50 border border-blue-200 p-4 flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-blue-900">Financial Information</p>
                  <p className="text-xs text-blue-700 mt-1">Payment methods, billing address, and transaction history can be managed in the Dashboard under "Invoices" section.</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'interests' && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-neutral-black">Interests</h3>
              
              <div>
                <label className="block text-sm font-medium text-neutral-gray-dark mb-2">Your Interests (Fields)</label>
                <textarea
                  value={interests}
                  onChange={e => setInterests(e.target.value)}
                  rows={4}
                  placeholder="e.g., Renewable Energy, Sustainable Agriculture, Climate Change, Innovation, Technology for Development"
                  className="w-full px-3 py-2 rounded-lg border border-neutral-gray-light bg-neutral-bg-light focus:outline-none focus:border-brand-navy-900 resize-none"
                />
                <p className="text-xs text-neutral-gray-medium mt-1">Separate multiple interests with commas</p>
              </div>

              <div className="rounded-lg bg-neutral-bg-light border border-neutral-gray-light p-6">
                <h4 className="font-medium text-neutral-black mb-3">Current Interests</h4>
                <div className="flex flex-wrap gap-2">
                  {interests.split(',').map((interest, idx) => (
                    interest.trim() && (
                      <span key={idx} className="px-3 py-1.5 rounded-full bg-brand-navy-100 text-brand-navy-900 text-sm">
                        {interest.trim()}
                      </span>
                    )
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'system' && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-neutral-black">System-Generated Information</h3>
              
              <div className="rounded-lg bg-neutral-bg-light border border-neutral-gray-light p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-neutral-gray-medium mb-1">Account Creation Date</p>
                    <p className="text-sm font-medium text-neutral-black">March 15, 2026</p>
                  </div>
                  <div>
                    <p className="text-xs text-neutral-gray-medium mb-1">Last Login</p>
                    <p className="text-sm font-medium text-neutral-black">April 8, 2026 at 10:45 AM</p>
                  </div>
                  <div>
                    <p className="text-xs text-neutral-gray-medium mb-1">User Role</p>
                    <span className="inline-flex px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">User</span>
                  </div>
                  <div>
                    <p className="text-xs text-neutral-gray-medium mb-1">ID Tag</p>
                    <p className="text-sm font-medium text-neutral-black">{govIdCode}</p>
                  </div>
                </div>
              </div>

              <h3 className="text-lg font-bold text-neutral-black pt-4">Recent Activity Log</h3>
              
              <div className="rounded-lg border border-neutral-gray-light overflow-hidden">
                <div className="divide-y divide-neutral-gray-light">
                  {[
                    { action: 'Profile updated', time: 'April 8, 2026 at 10:45 AM', location: 'Lagos, Nigeria' },
                    { action: 'Logged in', time: 'April 8, 2026 at 10:30 AM', location: 'Lagos, Nigeria' },
                    { action: 'New innovation listed', time: 'April 7, 2026 at 3:20 PM', location: 'Lagos, Nigeria' },
                    { action: 'Profile viewed by Dr. Wanjiku', time: 'April 6, 2026 at 11:15 AM', location: 'N/A' },
                    { action: 'Password changed', time: 'April 5, 2026 at 9:00 AM', location: 'Lagos, Nigeria' },
                  ].map((log, idx) => (
                    <div key={idx} className="p-4 hover:bg-neutral-bg-light transition-colors flex items-center gap-3">
                      <Activity className="h-4 w-4 text-neutral-gray-medium flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-neutral-black">{log.action}</p>
                        <p className="text-xs text-neutral-gray-medium mt-0.5">{log.time} • {log.location}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <h3 className="text-lg font-bold text-neutral-black pt-4">Security Settings</h3>
              
              <div>
                <label className="block text-sm font-medium text-neutral-gray-dark mb-2">Change Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Enter new password"
                    className="w-full px-3 py-2 pr-10 rounded-lg border border-neutral-gray-light bg-neutral-bg-light focus:outline-none focus:border-brand-navy-900"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-gray-medium hover:text-neutral-black"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-gray-dark mb-2">Security Question</label>
                  <select
                    value={securityQuestion}
                    onChange={e => setSecurityQuestion(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-neutral-gray-light bg-neutral-bg-light focus:outline-none focus:border-brand-navy-900"
                  >
                    <option value="What is your mother's maiden name?">What is your mother's maiden name?</option>
                    <option value="What was the name of your first pet?">What was the name of your first pet?</option>
                    <option value="What city were you born in?">What city were you born in?</option>
                    <option value="What is your favorite book?">What is your favorite book?</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-gray-dark mb-2">Security Answer</label>
                  <input
                    type="text"
                    value={securityAnswer}
                    onChange={e => setSecurityAnswer(e.target.value)}
                    placeholder="Your answer"
                    className="w-full px-3 py-2 rounded-lg border border-neutral-gray-light bg-neutral-bg-light focus:outline-none focus:border-brand-navy-900"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Save Button */}
          <div className="flex justify-end pt-6 border-t border-neutral-gray-light">
            <Button type="submit" className="bg-green-600 hover:bg-green-700 gap-2">
              <Save className="h-4 w-4" />
              Save & Proceed
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
