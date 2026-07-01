'use client';

import { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { useAuth } from '../../context/AuthContext';

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

const COMPENSATIONS = ['Scholarships', 'Job offers', 'Recommendations'];

export default function VolunteerForm() {
  const { isAuthenticated } = useAuth();

  const [formData, setFormData] = useState({
    qualification: '',
    country: '',
    state: '',
    tasks: [] as string[],
    compensation: ''
  });

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
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-neutral-black mb-2">Apply to Volunteer</h2>
        <p className="text-slate-500">Fill out the form below and we'll get back to you within 5 business days.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-neutral-gray-light p-8 space-y-5">
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
  );
}
