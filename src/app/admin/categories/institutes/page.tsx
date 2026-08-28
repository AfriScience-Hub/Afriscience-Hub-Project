'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Building2, ChevronDown, ChevronRight, MoreHorizontal, BarChart3, PieChart, Eye, CheckCircle, XCircle, Clock, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MOCK_INSTITUTES, PENDING_APPROVALS, RECENTLY_ADDED, STATS, TABS, INSTITUTES_BY_TYPE, TOP_COUNTRIES, GROWTH_DATA, QUICK_ACTIONS } from './data';

export default function InstitutesPage() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [showActions, setShowActions] = useState(false);
  const [growthPeriod, setGrowthPeriod] = useState('This Month');
  const [countryPeriod, setCountryPeriod] = useState('This Month');

  const maxGrowth = Math.max(...GROWTH_DATA.map((d) => d.value));

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-[11px] text-neutral-gray-medium mb-0.5">
            <span>Dashboard</span><span>/</span><span>Categories</span><span>/</span>
            <span className="text-neutral-black font-medium">Institutes</span>
          </div>
          <h1 className="text-xl font-bold text-neutral-black flex items-center gap-2">
            <Building2 className="h-5 w-5 text-purple-600" />
            Institutes
          </h1>
          <p className="text-[11px] text-neutral-gray-dark mt-0.5">Manage institutes, universities, research centers and organizations listed on the platform.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <button
              onClick={() => setShowActions(!showActions)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#453DD8] text-white rounded-lg text-xs font-medium hover:bg-[#3a33c0] cursor-pointer"
            >
              + Add Institute <ChevronDown className="h-3 w-3" />
            </button>
            {showActions && (
              <div className="absolute right-0 top-full mt-1 w-56 bg-white border border-neutral-gray-light rounded-lg shadow-lg py-1 z-50">
                {QUICK_ACTIONS.map((action) => (
                  <button
                    key={action.label}
                    onClick={() => setShowActions(false)}
                    className="w-full flex items-start gap-2.5 px-3 py-2.5 hover:bg-neutral-bg-light cursor-pointer text-left"
                  >
                    <div className="p-1.5 rounded-lg bg-purple-50 mt-0.5">
                      {action.icon === 'dashboard' && <BarChart3 className="h-3.5 w-3.5 text-purple-600" />}
                      {action.icon === 'content' && <Building2 className="h-3.5 w-3.5 text-purple-600" />}
                      {action.icon === 'approvals' && <CheckCircle className="h-3.5 w-3.5 text-purple-600" />}
                      {action.icon === 'add' && <span className="text-purple-600 text-sm font-bold">+</span>}
                    </div>
                    <div>
                      <p className="text-[11px] font-medium text-neutral-black">{action.label}</p>
                      <p className="text-[9px] text-neutral-gray-medium">{action.description}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
          <button className="p-1.5 rounded-lg border border-neutral-gray-light hover:bg-neutral-bg-light cursor-pointer">
            <MoreHorizontal className="h-4 w-4 text-neutral-gray-medium" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-3">
        {STATS.map((stat) => (
          <div key={stat.label} className="bg-white rounded-lg border border-neutral-gray-light p-3">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center ${stat.iconBg}`}>
              {stat.label.includes('Total Institutes') && <Building2 className="h-3.5 w-3.5" />}
              {stat.label.includes('Pending') && <Clock className="h-3.5 w-3.5" />}
              {stat.label.includes('Verified') && <CheckCircle className="h-3.5 w-3.5" />}
              {stat.label.includes('Rejected') && <XCircle className="h-3.5 w-3.5" />}
              {stat.label.includes('Views') && <Eye className="h-3.5 w-3.5" />}
            </div>
            <p className="text-lg font-bold text-neutral-black mt-1.5">{stat.value}</p>
            <p className={`text-[10px] mt-0.5 ${stat.positive ? 'text-green-600' : 'text-red-500'}`}>{stat.change}</p>
          </div>
        ))}
      </div>

      <div className="border-b border-neutral-gray-light">
        <div className="flex gap-0 overflow-x-auto">
          {TABS.map((tab) => (
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
            <h3 className="text-xs font-semibold text-neutral-black">Institutes Growth</h3>
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
                <linearGradient id="lineGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#453DD8" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#453DD8" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d={`M 0 ${160 - (GROWTH_DATA[0].value / maxGrowth) * 140} ${GROWTH_DATA.map((d, i) => `L ${(i / (GROWTH_DATA.length - 1)) * 400} ${160 - (d.value / maxGrowth) * 140}`).join(' ')} L 400 160 L 0 160 Z`}
                fill="url(#lineGrad)"
              />
              <polyline
                points={GROWTH_DATA.map((d, i) => `${(i / (GROWTH_DATA.length - 1)) * 400},${160 - (d.value / maxGrowth) * 140}`).join(' ')}
                fill="none"
                stroke="#453DD8"
                strokeWidth="2"
              />
              {GROWTH_DATA.map((d, i) => (
                <circle
                  key={i}
                  cx={(i / (GROWTH_DATA.length - 1)) * 400}
                  cy={160 - (d.value / maxGrowth) * 140}
                  r="3"
                  fill="#453DD8"
                  stroke="white"
                  strokeWidth="2"
                />
              ))}
              {GROWTH_DATA.map((d, i) => (
                <text
                  key={i}
                  x={(i / (GROWTH_DATA.length - 1)) * 400}
                  y="155"
                  textAnchor="middle"
                  className="text-[8px] fill-neutral-gray-medium"
                >
                  {d.label}
                </text>
              ))}
              {[0, 250, 500, 750, 1000, 1250, 1500].map((v) => (
                <text key={v} x="0" y={160 - (v / maxGrowth) * 140 - 2} className="text-[7px] fill-neutral-gray-medium">
                  {v >= 1000 ? `${v / 1000}K` : v}
                </text>
              ))}
            </svg>
            <div className="absolute top-2 right-2 bg-white border border-neutral-gray-light rounded px-2 py-1 shadow-sm">
              <p className="text-[10px] font-bold text-neutral-black">1,248</p>
              <p className="text-[8px] text-green-600">↑ 12.5%</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-neutral-gray-light p-4">
          <h3 className="text-xs font-semibold text-neutral-black mb-3">Institutes by Type</h3>
          <div className="flex items-center gap-4">
            <div className="relative w-32 h-32 flex-shrink-0">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <circle cx="50" cy="50" r="40" fill="none" stroke="#3B82F6" strokeWidth="20" strokeDasharray="106.8 244.2" strokeDashoffset="0" />
                <circle cx="50" cy="50" r="40" fill="none" stroke="#22C55E" strokeWidth="20" strokeDasharray="54.4 296.6" strokeDashoffset="-106.8" />
                <circle cx="50" cy="50" r="40" fill="none" stroke="#A855F7" strokeWidth="20" strokeDasharray="42.3 308.7" strokeDashoffset="-161.2" />
                <circle cx="50" cy="50" r="40" fill="none" stroke="#F97316" strokeWidth="20" strokeDasharray="28.7 322.3" strokeDashoffset="-203.5" />
                <circle cx="50" cy="50" r="40" fill="none" stroke="#D1D5DB" strokeWidth="20" strokeDasharray="20 331" strokeDashoffset="-232.2" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-lg font-bold text-neutral-black">1,248</p>
                <p className="text-[9px] text-neutral-gray-medium">Total</p>
              </div>
            </div>
            <div className="space-y-1.5">
              {INSTITUTES_BY_TYPE.map((type) => (
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
            <select
              value={countryPeriod}
              onChange={(e) => setCountryPeriod(e.target.value)}
              className="text-[10px] px-2 py-1 rounded border border-neutral-gray-light text-neutral-gray-dark bg-white cursor-pointer outline-none"
            >
              <option>This Month</option>
              <option>Last Month</option>
            </select>
          </div>
          <div className="space-y-2.5">
            {TOP_COUNTRIES.map((country) => {
              const maxWidth = 100;
              const barWidth = (country.count / TOP_COUNTRIES[0].count) * maxWidth;
              return (
                <div key={country.name} className="flex items-center gap-2">
                  <span className="text-sm">{country.flag}</span>
                  <span className="text-[10px] text-neutral-black w-20 flex-shrink-0">{country.name}</span>
                  <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#453DD8] rounded-full" style={{ width: `${barWidth}%` }} />
                  </div>
                  <span className="text-[10px] font-medium text-neutral-black w-8 text-right">{country.count}</span>
                  <span className="text-[9px] text-neutral-gray-medium w-10 text-right">({country.percent})</span>
                </div>
              );
            })}
          </div>
          <button className="flex items-center gap-1 text-[10px] text-[#453DD8] font-medium mt-3 hover:underline cursor-pointer">
            View all countries <ArrowRight className="h-3 w-3" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-lg border border-neutral-gray-light p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-semibold text-neutral-black">Pending Approvals</h3>
            <button className="flex items-center gap-1 text-[10px] text-[#453DD8] font-medium hover:underline cursor-pointer">
              View all <ArrowRight className="h-3 w-3" />
            </button>
          </div>
          <div className="space-y-3">
            {PENDING_APPROVALS.map((inst) => (
              <div key={inst.id} className="flex items-start gap-2.5">
                <Image src={inst.logo} alt={inst.name} width={28} height={28} className="rounded-lg object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-medium text-neutral-black truncate">{inst.name}</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="text-[9px] text-neutral-gray-medium">{inst.type}</span>
                    <span className="text-[9px] text-neutral-gray-medium">·</span>
                    <span className="text-[9px] text-neutral-gray-medium">Submitted: {inst.submitted}</span>
                  </div>
                </div>
                <span className="px-1.5 py-0.5 rounded text-[8px] font-semibold bg-orange-100 text-orange-700 flex-shrink-0">Pending</span>
              </div>
            ))}
          </div>
          <button className="flex items-center gap-1 text-[10px] text-[#453DD8] font-medium mt-3 hover:underline cursor-pointer">
            View all pending <ArrowRight className="h-3 w-3" />
          </button>
        </div>

        <div className="bg-white rounded-lg border border-neutral-gray-light p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-semibold text-neutral-black">Recently Added</h3>
            <button className="flex items-center gap-1 text-[10px] text-[#453DD8] font-medium hover:underline cursor-pointer">
              View all <ArrowRight className="h-3 w-3" />
            </button>
          </div>
          <div className="space-y-3">
            {RECENTLY_ADDED.map((inst) => (
              <div key={inst.id} className="flex items-start gap-2.5">
                <Image src={inst.logo} alt={inst.name} width={28} height={28} className="rounded-lg object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-medium text-neutral-black truncate">{inst.name}</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="text-[9px] text-neutral-gray-medium">{inst.country}</span>
                    <span className="text-[9px] text-neutral-gray-medium">·</span>
                    <span className="text-[9px] text-neutral-gray-medium">{inst.submitted}</span>
                  </div>
                </div>
                <span className="px-1.5 py-0.5 rounded text-[8px] font-semibold bg-green-100 text-green-700 flex-shrink-0">Verified</span>
              </div>
            ))}
          </div>
          <button className="flex items-center gap-1 text-[10px] text-[#453DD8] font-medium mt-3 hover:underline cursor-pointer">
            View all institutes <ArrowRight className="h-3 w-3" />
          </button>
        </div>

        <div className="bg-white rounded-lg border border-neutral-gray-light p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-semibold text-neutral-black">Most Viewed Institutes</h3>
            <button className="flex items-center gap-1 text-[10px] text-[#453DD8] font-medium hover:underline cursor-pointer">
              View all <ArrowRight className="h-3 w-3" />
            </button>
          </div>
          <div className="space-y-3">
            {MOCK_INSTITUTES.map((inst) => (
              <div key={inst.id} className="flex items-center gap-2.5">
                <Image src={inst.logo} alt={inst.name} width={28} height={28} className="rounded-lg object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-medium text-neutral-black truncate">{inst.name}</p>
                  <p className="text-[9px] text-neutral-gray-medium">{inst.country}</p>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-neutral-gray-medium flex-shrink-0">
                  <Eye className="h-3 w-3" />
                  <span>{inst.views?.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
          <button className="flex items-center gap-1 text-[10px] text-[#453DD8] font-medium mt-3 hover:underline cursor-pointer">
            View full leaderboard <ArrowRight className="h-3 w-3" />
          </button>
        </div>
      </div>
    </div>
  );
}
