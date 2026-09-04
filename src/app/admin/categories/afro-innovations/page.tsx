'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Lightbulb, MoreHorizontal, Eye, Share2, CheckCircle, XCircle, Clock, ArrowRight, Calendar, Filter, ChevronDown, LayoutGrid, Settings2, Inbox } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MOCK_INNOVATIONS, PENDING_APPROVALS, RECENTLY_ADDED, STATS, TABS, INNOVATIONS_BY_CATEGORY, INNOVATIONS_BY_STAGE, GROWTH_DATA } from './data';

export default function AfroInnovationsPage() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [growthPeriod, setGrowthPeriod] = useState('This Month');
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const h = (e: MouseEvent) => { if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  const maxGrowth = Math.max(...GROWTH_DATA.map((d) => d.value));

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-[11px] text-neutral-gray-medium mb-0.5">
            <span>Dashboard</span><span>/</span><span>Categories</span><span>/</span>
            <span className="text-neutral-black font-medium">Afro Innovations</span>
          </div>
          <h1 className="text-xl font-bold text-neutral-black flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-purple-600" />
            Afro Innovations
          </h1>
          <p className="text-[11px] text-neutral-gray-dark mt-0.5">Discover, manage and promote innovative solutions from across Africa that are solving real problems and driving impact.</p>
        </div>
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="h-9 w-9 inline-flex items-center justify-center rounded-xl bg-white border border-neutral-gray-light shadow-sm hover:bg-neutral-bg-light cursor-pointer"
            aria-label="More actions"
          >
            <MoreHorizontal className="h-5 w-5 text-neutral-gray-dark" />
          </button>
          {menuOpen && (
            <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-neutral-gray-light rounded-xl shadow-xl py-1.5 z-50 overflow-hidden">
              <Link
                href="/admin/categories/afro-innovations/manage-options"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 px-3.5 py-2.5 hover:bg-neutral-bg-light cursor-pointer"
              >
                <span className="h-8 w-8 rounded-lg bg-[#453DD8]/10 flex items-center justify-center shrink-0"><Settings2 className="h-4 w-4 text-[#453DD8]" /></span>
                <span className="text-xs font-semibold text-neutral-black">Manage Options</span>
              </Link>
              <Link
                href="/admin/categories/afro-innovations/submissions"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 px-3.5 py-2.5 hover:bg-neutral-bg-light cursor-pointer"
              >
                <span className="h-8 w-8 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0"><Inbox className="h-4 w-4 text-emerald-600" /></span>
                <span className="text-xs font-semibold text-neutral-black">View Submissions</span>
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-6 gap-3">
        {STATS.map((stat) => (
          <div key={stat.label} className="bg-white rounded-lg border border-neutral-gray-light p-3">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center ${stat.iconBg}`}>
              {stat.icon === 'lightbulb' && <Lightbulb className="h-3.5 w-3.5" />}
              {stat.icon === 'clock' && <Clock className="h-3.5 w-3.5" />}
              {stat.icon === 'check' && <CheckCircle className="h-3.5 w-3.5" />}
              {stat.icon === 'x' && <XCircle className="h-3.5 w-3.5" />}
              {stat.icon === 'eye' && <Eye className="h-3.5 w-3.5" />}
              {stat.icon === 'share' && <Share2 className="h-3.5 w-3.5" />}
            </div>
            <p className="text-lg font-bold text-neutral-black mt-1.5">{stat.value}</p>
            <p className="text-[10px] text-neutral-gray-medium mt-0.5">{stat.label}</p>
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

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5 px-2.5 py-1.5 border border-neutral-gray-light rounded-lg text-xs text-neutral-gray-dark cursor-pointer">
          <Calendar className="h-3.5 w-3.5" />
          May 20, 2025 - May 27, 2025
          <ChevronDown className="h-3 w-3" />
        </div>
        <select className="px-2.5 py-1.5 text-xs rounded-lg border border-neutral-gray-light text-neutral-gray-dark bg-white cursor-pointer outline-none">
          <option>All Status</option>
          <option>Approved</option>
          <option>Pending</option>
          <option>Rejected</option>
        </select>
        <select className="px-2.5 py-1.5 text-xs rounded-lg border border-neutral-gray-light text-neutral-gray-dark bg-white cursor-pointer outline-none">
          <option>All Categories</option>
          <option>Health & Biotech</option>
          <option>Agriculture & Food</option>
          <option>Energy & Environment</option>
        </select>
        <select className="px-2.5 py-1.5 text-xs rounded-lg border border-neutral-gray-light text-neutral-gray-dark bg-white cursor-pointer outline-none">
          <option>All Countries</option>
          <option>Nigeria</option>
          <option>Kenya</option>
          <option>South Africa</option>
        </select>
        <button className="flex items-center gap-1.5 px-3 py-1.5 border border-neutral-gray-light rounded-lg text-xs font-medium text-neutral-gray-dark hover:bg-neutral-bg-light cursor-pointer">
          <Filter className="h-3.5 w-3.5" /> Filters
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-lg border border-neutral-gray-light p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-semibold text-neutral-black">Innovations Growth</h3>
            <select
              value={growthPeriod}
              onChange={(e) => setGrowthPeriod(e.target.value)}
              className="text-[10px] px-2 py-1 rounded border border-neutral-gray-light text-neutral-gray-dark bg-white cursor-pointer outline-none"
            >
              <option>This Month</option>
              <option>Last Month</option>
            </select>
          </div>
          <div className="relative h-40">
            <svg viewBox="0 0 400 160" className="w-full h-full">
              <defs>
                <linearGradient id="innGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#453DD8" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#453DD8" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d={`M 0 ${160 - (GROWTH_DATA[0].value / maxGrowth) * 140} ${GROWTH_DATA.map((d, i) => `L ${(i / (GROWTH_DATA.length - 1)) * 400} ${160 - (d.value / maxGrowth) * 140}`).join(' ')} L 400 160 L 0 160 Z`}
                fill="url(#innGrad)"
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
              {[0, 50, 100, 150, 200, 250, 300, 350].map((v) => (
                <text key={v} x="0" y={160 - (v / maxGrowth) * 140 - 2} className="text-[7px] fill-neutral-gray-medium">{v}</text>
              ))}
            </svg>
            <div className="absolute top-2 right-2 bg-white border border-neutral-gray-light rounded px-2 py-1 shadow-sm">
              <p className="text-[10px] font-bold text-neutral-black">312</p>
              <p className="text-[8px] text-green-600">↑ 18.3%</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-neutral-gray-light p-4">
          <h3 className="text-xs font-semibold text-neutral-black mb-3">Innovations by Category</h3>
          <div className="flex items-center gap-4">
            <div className="relative w-32 h-32 flex-shrink-0">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <circle cx="50" cy="50" r="40" fill="none" stroke="#3B82F6" strokeWidth="20" strokeDasharray="71.2 255.8" strokeDashoffset="0" />
                <circle cx="50" cy="50" r="40" fill="none" stroke="#22C55E" strokeWidth="20" strokeDasharray="55.1 271.9" strokeDashoffset="-71.2" />
                <circle cx="50" cy="50" r="40" fill="none" stroke="#A855F7" strokeWidth="20" strokeDasharray="47 279.8" strokeDashoffset="-126.3" />
                <circle cx="50" cy="50" r="40" fill="none" stroke="#F97316" strokeWidth="20" strokeDasharray="35.6 291.4" strokeDashoffset="-173.3" />
                <circle cx="50" cy="50" r="40" fill="none" stroke="#EC4899" strokeWidth="20" strokeDasharray="22.7 304.3" strokeDashoffset="-208.9" />
                <circle cx="50" cy="50" r="40" fill="none" stroke="#D1D5DB" strokeWidth="20" strokeDasharray="21 306" strokeDashoffset="-231.6" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-lg font-bold text-neutral-black">312</p>
                <p className="text-[9px] text-neutral-gray-medium">Total</p>
              </div>
            </div>
            <div className="space-y-1.5">
              {INNOVATIONS_BY_CATEGORY.map((type) => (
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
          <h3 className="text-xs font-semibold text-neutral-black mb-3">Innovations by Stage</h3>
          <div className="flex items-center gap-4">
            <div className="relative w-32 h-32 flex-shrink-0">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <circle cx="50" cy="50" r="40" fill="none" stroke="#3B82F6" strokeWidth="20" strokeDasharray="81 246" strokeDashoffset="0" />
                <circle cx="50" cy="50" r="40" fill="none" stroke="#22C55E" strokeWidth="20" strokeDasharray="71.8 255.2" strokeDashoffset="-81" />
                <circle cx="50" cy="50" r="40" fill="none" stroke="#A855F7" strokeWidth="20" strokeDasharray="54.1 272.9" strokeDashoffset="-152.8" />
                <circle cx="50" cy="50" r="40" fill="none" stroke="#F97316" strokeWidth="20" strokeDasharray="30.8 296.2" strokeDashoffset="-206.9" />
                <circle cx="50" cy="50" r="40" fill="none" stroke="#D1D5DB" strokeWidth="20" strokeDasharray="14.6 312.4" strokeDashoffset="-237.7" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-lg font-bold text-neutral-black">312</p>
                <p className="text-[9px] text-neutral-gray-medium">Total</p>
              </div>
            </div>
            <div className="space-y-1.5">
              {INNOVATIONS_BY_STAGE.map((stage) => (
                <div key={stage.name} className="flex items-center gap-2">
                  <span className={cn("w-2 h-2 rounded-full flex-shrink-0", stage.color)} />
                  <span className="text-[10px] text-neutral-gray-dark flex-1">{stage.name}</span>
                  <span className="text-[10px] text-neutral-gray-medium">{stage.percent}</span>
                  <span className="text-[9px] text-neutral-gray-medium">({stage.count})</span>
                </div>
              ))}
            </div>
          </div>
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
            {PENDING_APPROVALS.map((inn) => (
              <div key={inn.id} className="flex items-start gap-2.5">
                <Image src={inn.logo} alt={inn.name} width={28} height={28} className="rounded-lg object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-medium text-neutral-black truncate">{inn.name}</p>
                  <p className="text-[9px] text-neutral-gray-medium">{inn.description || inn.category}</p>
                  <p className="text-[9px] text-neutral-gray-medium">Submitted: {inn.submitted}</p>
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
            {RECENTLY_ADDED.map((inn) => (
              <div key={inn.id} className="flex items-start gap-2.5">
                <Image src={inn.logo} alt={inn.name} width={28} height={28} className="rounded-lg object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-medium text-neutral-black truncate">{inn.name}</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="text-[9px] text-neutral-gray-medium">{inn.category}</span>
                    <span className="text-[9px] text-neutral-gray-medium">·</span>
                    <span className="text-[9px] text-neutral-gray-medium">{inn.submitted}</span>
                  </div>
                </div>
                <span className="px-1.5 py-0.5 rounded text-[8px] font-semibold bg-green-100 text-green-700 flex-shrink-0">Approved</span>
              </div>
            ))}
          </div>
          <button className="flex items-center gap-1 text-[10px] text-[#453DD8] font-medium mt-3 hover:underline cursor-pointer">
            View all innovations <ArrowRight className="h-3 w-3" />
          </button>
        </div>

        <div className="bg-white rounded-lg border border-neutral-gray-light p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-semibold text-neutral-black">Top Viewed Innovations</h3>
            <button className="flex items-center gap-1 text-[10px] text-[#453DD8] font-medium hover:underline cursor-pointer">
              View all <ArrowRight className="h-3 w-3" />
            </button>
          </div>
          <div className="space-y-3">
            {MOCK_INNOVATIONS.map((inn, idx) => (
              <div key={inn.id} className="flex items-center gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#453DD8] text-white flex items-center justify-center text-[9px] font-bold flex-shrink-0">
                  {idx + 1}
                </span>
                <Image src={inn.logo} alt={inn.name} width={28} height={28} className="rounded-lg object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-medium text-neutral-black truncate">{inn.name}</p>
                  <p className="text-[9px] text-neutral-gray-medium">{inn.description || inn.category}</p>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-neutral-gray-medium flex-shrink-0">
                  <Eye className="h-3 w-3" />
                  <span>{inn.views?.toLocaleString()}</span>
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
