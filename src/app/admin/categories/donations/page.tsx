'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Heart, ChevronDown, MoreHorizontal, BarChart3, Eye, CheckCircle, XCircle, Clock, ArrowRight, Calendar, Filter, DollarSign, TrendingUp, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

const MOCK_DONATIONS = [
  { id: 1, name: 'STEM Education Fund', donor: 'African Development Bank', amount: '₦5,200,000', country: 'Nigeria', status: 'Completed', date: 'May 27, 2025', logo: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwaW5ub3ZhdGlvbnxlbnwxfHx8fDE3NzIzODY1MzV8MA&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: 2, name: 'Research Innovation Grant', donor: 'Wellcome Trust', amount: '₦3,800,000', country: 'Kenya', status: 'Completed', date: 'May 26, 2025', logo: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwaW5ub3ZhdGlvbnxlbnwxfHx8fDE3NzIzODY1MzV8MA&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: 3, name: 'Youth Innovation Prize', donor: 'Mastercard Foundation', amount: '₦2,500,000', country: 'Ghana', status: 'Pending', date: 'May 25, 2025', logo: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwaW5ub3ZhdGlvbnxlbnwxfHx8fDE3NzIzODY1MzV8MA&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: 4, name: 'Clean Water Initiative', donor: 'Ford Foundation', amount: '₦1,800,000', country: 'Tanzania', status: 'Completed', date: 'May 24, 2025', logo: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwaW5ub3ZhdGlvbnxlbnwxfHx8fDE3NzIzODY1MzV8MA&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: 5, name: 'Healthcare Tech Support', donor: 'Gates Foundation', amount: '₦4,100,000', country: 'South Africa', status: 'Completed', date: 'May 23, 2025', logo: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwaW5ub3ZhdGlvbnxlbnwxfHx8fDE3NzIzODY1MzV8MA&ixlib=rb-4.1.0&q=80&w=1080' },
];

const PENDING_DONATIONS = [
  { id: 6, name: 'Agricultural Innovation Fund', donor: 'GIZ', amount: '₦2,200,000', country: 'Nigeria', status: 'Pending', submitted: '2 hours ago', logo: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwaW5ub3ZhdGlvbnxlbnwxfHx8fDE3NzIzODY1MzV8MA&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: 7, name: 'Digital Literacy Program', donor: 'Google.org', amount: '₦1,500,000', country: 'Kenya', status: 'Pending', submitted: '5 hours ago', logo: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwaW5ub3ZhdGlvbnxlbnwxfHx8fDE3NzIzODY1MzV8MA&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: 8, name: 'Renewable Energy Project', donor: 'World Bank', amount: '₦3,600,000', country: 'Ghana', status: 'Pending', submitted: '1 day ago', logo: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwaW5ub3ZhdGlvbnxlbnwxfHx8fDE3NzIzODY1MzV8MA&ixlib=rb-4.1.0&q=80&w=1080' },
];

const STATS = [
  { label: 'Total Donations', value: '₦42.5M', change: '↑ 22.4% this month', positive: true, iconBg: 'bg-purple-100 text-purple-600', icon: 'heart' },
  { label: 'Pending Donations', value: '₦7.3M', change: '8 pending', positive: false, iconBg: 'bg-orange-100 text-orange-600', icon: 'clock' },
  { label: 'Completed', value: '₦35.2M', change: '82.8% of total', positive: true, iconBg: 'bg-green-100 text-green-600', icon: 'check' },
  { label: 'Total Donors', value: '156', change: '↑ 15.2% this month', positive: true, iconBg: 'bg-blue-100 text-blue-600', icon: 'users' },
  { label: 'Average Donation', value: '₦272K', change: '↑ 8.3% this month', positive: true, iconBg: 'bg-teal-100 text-teal-600', icon: 'trending' },
  { label: 'Total Views', value: '18,432', change: '↑ 12.7% this month', positive: true, iconBg: 'bg-indigo-100 text-indigo-600', icon: 'eye' },
];

const GROWTH_DATA = [
  { label: 'Jan', value: 2000000 },
  { label: 'Feb', value: 3500000 },
  { label: 'Mar', value: 5000000 },
  { label: 'Apr', value: 7500000 },
  { label: 'May', value: 12000000 },
];

const DONATIONS_BY_CATEGORY = [
  { name: 'Education', percent: '35.2%', count: 14, color: 'bg-blue-500' },
  { name: 'Healthcare', percent: '24.8%', count: 10, color: 'bg-green-500' },
  { name: 'Technology', percent: '18.6%', count: 7, color: 'bg-purple-500' },
  { name: 'Environment', percent: '12.4%', count: 5, color: 'bg-orange-500' },
  { name: 'Others', percent: '9.0%', count: 4, color: 'bg-gray-300' },
];

export default function DonationsPage() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [growthPeriod, setGrowthPeriod] = useState('This Month');

  const maxGrowth = Math.max(...GROWTH_DATA.map((d) => d.value));

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-[11px] text-neutral-gray-medium mb-0.5">
            <span>Dashboard</span><span>/</span><span>Categories</span><span>/</span>
            <span className="text-neutral-black font-medium">Donations</span>
          </div>
          <h1 className="text-xl font-bold text-neutral-black flex items-center gap-2">
            <Heart className="h-5 w-5 text-purple-600" />
            Donations
          </h1>
          <p className="text-[11px] text-neutral-gray-dark mt-0.5">Track and manage all donations, grants and funding across the platform.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[#453DD8] text-white rounded-lg text-xs font-medium hover:bg-[#3a33c0] cursor-pointer">
            + Add Donation <ChevronDown className="h-3 w-3" />
          </button>
          <button className="p-1.5 rounded-lg border border-neutral-gray-light hover:bg-neutral-bg-light cursor-pointer">
            <MoreHorizontal className="h-4 w-4 text-neutral-gray-medium" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-6 gap-3">
        {STATS.map((stat) => (
          <div key={stat.label} className="bg-white rounded-lg border border-neutral-gray-light p-3">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center ${stat.iconBg}`}>
              {stat.icon === 'heart' && <Heart className="h-3.5 w-3.5" />}
              {stat.icon === 'clock' && <Clock className="h-3.5 w-3.5" />}
              {stat.icon === 'check' && <CheckCircle className="h-3.5 w-3.5" />}
              {stat.icon === 'users' && <Users className="h-3.5 w-3.5" />}
              {stat.icon === 'trending' && <TrendingUp className="h-3.5 w-3.5" />}
              {stat.icon === 'eye' && <Eye className="h-3.5 w-3.5" />}
            </div>
            <p className="text-lg font-bold text-neutral-black mt-1.5">{stat.value}</p>
            <p className="text-[10px] text-neutral-gray-medium mt-0.5">{stat.label}</p>
            <p className={`text-[10px] mt-0.5 ${stat.positive ? 'text-green-600' : 'text-red-500'}`}>{stat.change}</p>
          </div>
        ))}
      </div>

      <div className="border-b border-neutral-gray-light">
        <div className="flex gap-0 overflow-x-auto">
          {['Overview', 'Recent Donations', 'Top Donors', 'Geographic Distribution'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-3 py-2 text-xs font-medium whitespace-nowrap border-b-2 transition-colors cursor-pointer",
                activeTab === tab
                  ? "border-[#453DD8] text-[#453DD8]"
                  : "border-transparent text-neutral-gray-medium hover:text-neutral-black"
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-lg border border-neutral-gray-light p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-semibold text-neutral-black">Donations Growth</h3>
            <select
              value={growthPeriod}
              onChange={(e) => setGrowthPeriod(e.target.value)}
              className="text-[10px] px-2 py-1 rounded border border-neutral-gray-light text-neutral-gray-dark bg-white cursor-pointer outline-none"
            >
              <option>This Month</option>
              <option>Last Month</option>
              <option>This Year</option>
            </select>
          </div>
          <div className="relative h-40">
            <svg viewBox="0 0 400 160" className="w-full h-full">
              <defs>
                <linearGradient id="donGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#453DD8" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#453DD8" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d={`M 0 ${160 - (GROWTH_DATA[0].value / maxGrowth) * 140} ${GROWTH_DATA.map((d, i) => `L ${(i / (GROWTH_DATA.length - 1)) * 400} ${160 - (d.value / maxGrowth) * 140}`).join(' ')} L 400 160 L 0 160 Z`}
                fill="url(#donGrad)"
              />
              <polyline
                points={GROWTH_DATA.map((d, i) => `${(i / (GROWTH_DATA.length - 1)) * 400},${160 - (d.value / maxGrowth) * 140}`).join(' ')}
                fill="none"
                stroke="#453DD8"
                strokeWidth="2"
              />
              {GROWTH_DATA.map((d, i) => (
                <circle key={i} cx={(i / (GROWTH_DATA.length - 1)) * 400} cy={160 - (d.value / maxGrowth) * 140} r="3" fill="#453DD8" stroke="white" strokeWidth="2" />
              ))}
              {GROWTH_DATA.map((d, i) => (
                <text key={i} x={(i / (GROWTH_DATA.length - 1)) * 400} y="155" textAnchor="middle" className="text-[8px] fill-neutral-gray-medium">{d.label}</text>
              ))}
            </svg>
            <div className="absolute top-2 right-2 bg-white border border-neutral-gray-light rounded px-2 py-1 shadow-sm">
              <p className="text-[10px] font-bold text-neutral-black">₦42.5M</p>
              <p className="text-[8px] text-green-600">↑ 22.4%</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-neutral-gray-light p-4">
          <h3 className="text-xs font-semibold text-neutral-black mb-3">Donations by Category</h3>
          <div className="flex items-center gap-4">
            <div className="relative w-32 h-32 flex-shrink-0">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <circle cx="50" cy="50" r="40" fill="none" stroke="#3B82F6" strokeWidth="20" strokeDasharray="88.8 238.2" strokeDashoffset="0" />
                <circle cx="50" cy="50" r="40" fill="none" stroke="#22C55E" strokeWidth="20" strokeDasharray="62.5 264.5" strokeDashoffset="-88.8" />
                <circle cx="50" cy="50" r="40" fill="none" stroke="#A855F7" strokeWidth="20" strokeDasharray="46.9 280.1" strokeDashoffset="-151.3" />
                <circle cx="50" cy="50" r="40" fill="none" stroke="#F97316" strokeWidth="20" strokeDasharray="31.2 295.8" strokeDashoffset="-198.2" />
                <circle cx="50" cy="50" r="40" fill="none" stroke="#D1D5DB" strokeWidth="20" strokeDasharray="22.7 304.3" strokeDashoffset="-229.4" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-lg font-bold text-neutral-black">₦42.5M</p>
                <p className="text-[9px] text-neutral-gray-medium">Total</p>
              </div>
            </div>
            <div className="space-y-1.5">
              {DONATIONS_BY_CATEGORY.map((type) => (
                <div key={type.name} className="flex items-center gap-2">
                  <span className={cn("w-2 h-2 rounded-full flex-shrink-0", type.color)} />
                  <span className="text-[10px] text-neutral-gray-dark flex-1">{type.name}</span>
                  <span className="text-[10px] text-neutral-gray-medium">{type.percent}</span>
                  <span className="text-[9px] text-neutral-gray-medium">({type.count})</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-neutral-gray-light p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-semibold text-neutral-black">Top Countries</h3>
            <button className="flex items-center gap-1 text-[10px] text-[#453DD8] font-medium hover:underline cursor-pointer">
              View all <ArrowRight className="h-3 w-3" />
            </button>
          </div>
          <div className="space-y-2.5">
            {[
              { name: 'Nigeria', flag: '🇳🇬', amount: '₦18.2M', percent: '42.8%' },
              { name: 'Kenya', flag: '🇰🇪', amount: '₦8.5M', percent: '20.0%' },
              { name: 'South Africa', flag: '🇿🇦', amount: '₦6.8M', percent: '16.0%' },
              { name: 'Ghana', flag: '🇬🇭', amount: '₦5.2M', percent: '12.2%' },
              { name: 'Tanzania', flag: '🇹🇿', amount: '₦3.8M', percent: '8.9%' },
            ].map((country) => (
              <div key={country.name} className="flex items-center gap-2">
                <span className="text-sm">{country.flag}</span>
                <span className="text-[10px] text-neutral-black w-20 flex-shrink-0">{country.name}</span>
                <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#453DD8] rounded-full" style={{ width: country.percent }} />
                </div>
                <span className="text-[10px] font-medium text-neutral-black w-14 text-right">{country.amount}</span>
                <span className="text-[9px] text-neutral-gray-medium w-10 text-right">{country.percent}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-lg border border-neutral-gray-light p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-semibold text-neutral-black">Pending Donations</h3>
            <button className="flex items-center gap-1 text-[10px] text-[#453DD8] font-medium hover:underline cursor-pointer">
              View all <ArrowRight className="h-3 w-3" />
            </button>
          </div>
          <div className="space-y-3">
            {PENDING_DONATIONS.map((don) => (
              <div key={don.id} className="flex items-start gap-2.5">
                <Image src={don.logo} alt={don.name} width={28} height={28} className="rounded-lg object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-medium text-neutral-black truncate">{don.name}</p>
                  <p className="text-[9px] text-neutral-gray-medium">{don.donor} · {don.country}</p>
                  <p className="text-[9px] text-neutral-gray-medium">Submitted: {don.submitted}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-[11px] font-bold text-neutral-black">{don.amount}</p>
                  <span className="px-1.5 py-0.5 rounded text-[8px] font-semibold bg-orange-100 text-orange-700">Pending</span>
                </div>
              </div>
            ))}
          </div>
          <button className="flex items-center gap-1 text-[10px] text-[#453DD8] font-medium mt-3 hover:underline cursor-pointer">
            View all pending <ArrowRight className="h-3 w-3" />
          </button>
        </div>

        <div className="bg-white rounded-lg border border-neutral-gray-light p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-semibold text-neutral-black">Recent Donations</h3>
            <button className="flex items-center gap-1 text-[10px] text-[#453DD8] font-medium hover:underline cursor-pointer">
              View all <ArrowRight className="h-3 w-3" />
            </button>
          </div>
          <div className="space-y-3">
            {MOCK_DONATIONS.slice(0, 5).map((don) => (
              <div key={don.id} className="flex items-start gap-2.5">
                <Image src={don.logo} alt={don.name} width={28} height={28} className="rounded-lg object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-medium text-neutral-black truncate">{don.name}</p>
                  <p className="text-[9px] text-neutral-gray-medium">{don.donor} · {don.country}</p>
                  <p className="text-[9px] text-neutral-gray-medium">{don.date}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-[11px] font-bold text-neutral-black">{don.amount}</p>
                  <span className="px-1.5 py-0.5 rounded text-[8px] font-semibold bg-green-100 text-green-700">{don.status}</span>
                </div>
              </div>
            ))}
          </div>
          <button className="flex items-center gap-1 text-[10px] text-[#453DD8] font-medium mt-3 hover:underline cursor-pointer">
            View all donations <ArrowRight className="h-3 w-3" />
          </button>
        </div>
      </div>
    </div>
  );
}
