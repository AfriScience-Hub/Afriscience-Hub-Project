'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Trophy, ChevronDown, MoreHorizontal, BarChart3, Users, Star, Calendar, CheckCircle, Play, ExternalLink, Filter, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ONGOING_COMPETITIONS, UPCOMING_COMPETITIONS, STATS, TABS, PARTICIPANTS_BY_TYPE, VOTES_DATA, TREND_DATA, QUICK_ACTIONS } from './data';

export default function CompetitionsPage() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [showActions, setShowActions] = useState(false);
  const [trendPeriod, setTrendPeriod] = useState('This Week');
  const [votesPeriod, setVotesPeriod] = useState('This Week');

  const maxTrend = Math.max(...TREND_DATA.map((d) => d.value));
  const maxVotes = Math.max(...VOTES_DATA.map((d) => d.value));

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-[11px] text-neutral-gray-medium mb-0.5">
            <span>Dashboard</span><span>/</span><span>Categories</span><span>/</span>
            <span className="text-neutral-black font-medium">Competitions</span>
          </div>
          <h1 className="text-xl font-bold text-neutral-black flex items-center gap-2">
            <Trophy className="h-5 w-5 text-purple-600" />
            Competitions
          </h1>
          <p className="text-[11px] text-neutral-gray-dark mt-0.5">Create, manage and monitor science and technology competitions across Africa.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-3 py-1.5 border border-neutral-gray-light rounded-lg text-xs font-medium text-neutral-gray-dark hover:bg-neutral-bg-light cursor-pointer">
            View Public Page <ExternalLink className="h-3 w-3" />
          </button>
          <div className="relative">
            <button
              onClick={() => setShowActions(!showActions)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#453DD8] text-white rounded-lg text-xs font-medium hover:bg-[#3a33c0] cursor-pointer"
            >
              + Create Competition <ChevronDown className="h-3 w-3" />
            </button>
            {showActions && (
              <div className="absolute right-0 top-full mt-1 w-56 bg-white border border-neutral-gray-light rounded-lg shadow-lg py-1 z-50">
                {QUICK_ACTIONS.map((action) => (
                  <button
                    key={action.label}
                    onClick={() => setShowActions(false)}
                    className="w-full flex items-start gap-2.5 px-3 py-2 hover:bg-neutral-bg-light cursor-pointer text-left"
                  >
                    <div className="p-1.5 rounded-lg bg-purple-50 mt-0.5">
                      {action.icon === 'dashboard' && <BarChart3 className="h-3.5 w-3.5 text-purple-600" />}
                      {action.icon === 'manage' && <Trophy className="h-3.5 w-3.5 text-purple-600" />}
                      {action.icon === 'submissions' && <CheckCircle className="h-3.5 w-3.5 text-purple-600" />}
                      {action.icon === 'judges' && <Users className="h-3.5 w-3.5 text-purple-600" />}
                      {action.icon === 'leaderboard' && <Star className="h-3.5 w-3.5 text-purple-600" />}
                      {action.icon === 'categories' && <Filter className="h-3.5 w-3.5 text-purple-600" />}
                      {action.icon === 'settings' && <span className="text-purple-600 text-xs">&#9881;</span>}
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

      <div className="grid grid-cols-6 gap-3">
        {STATS.map((stat) => (
          <div key={stat.label} className="bg-white rounded-lg border border-neutral-gray-light p-3">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center ${stat.iconBg}`}>
              {stat.icon === 'trophy' && <Trophy className="h-3.5 w-3.5" />}
              {stat.icon === 'calendar' && <Calendar className="h-3.5 w-3.5" />}
              {stat.icon === 'play' && <Play className="h-3.5 w-3.5" />}
              {stat.icon === 'check' && <CheckCircle className="h-3.5 w-3.5" />}
              {stat.icon === 'users' && <Users className="h-3.5 w-3.5" />}
              {stat.icon === 'star' && <Star className="h-3.5 w-3.5" />}
            </div>
            <p className="text-lg font-bold text-neutral-black mt-1.5">{stat.value}</p>
            <p className="text-[10px] text-neutral-gray-medium mt-0.5">{stat.label}</p>
            {stat.change && <p className={`text-[10px] mt-0.5 ${stat.positive ? 'text-green-600' : 'text-red-500'}`}>{stat.change}</p>}
            {stat.sub && <p className="text-[10px] text-neutral-gray-medium mt-0.5">{stat.sub}</p>}
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
          <option>Ongoing</option>
          <option>Upcoming</option>
          <option>Completed</option>
        </select>
        <select className="px-2.5 py-1.5 text-xs rounded-lg border border-neutral-gray-light text-neutral-gray-dark bg-white cursor-pointer outline-none">
          <option>All Categories</option>
          <option>Technology</option>
          <option>Innovation</option>
          <option>Environment</option>
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
            <h3 className="text-xs font-semibold text-neutral-black">Competitions Trend</h3>
            <select
              value={trendPeriod}
              onChange={(e) => setTrendPeriod(e.target.value)}
              className="text-[10px] px-2 py-1 rounded border border-neutral-gray-light text-neutral-gray-dark bg-white cursor-pointer outline-none"
            >
              <option>This Week</option>
              <option>Last Week</option>
            </select>
          </div>
          <div className="relative h-40">
            <svg viewBox="0 0 400 160" className="w-full h-full">
              <defs>
                <linearGradient id="compGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#453DD8" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#453DD8" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d={`M 0 ${160 - (TREND_DATA[0].value / maxTrend) * 140} ${TREND_DATA.map((d, i) => `L ${(i / (TREND_DATA.length - 1)) * 400} ${160 - (d.value / maxTrend) * 140}`).join(' ')} L 400 160 L 0 160 Z`}
                fill="url(#compGrad)"
              />
              <polyline
                points={TREND_DATA.map((d, i) => `${(i / (TREND_DATA.length - 1)) * 400},${160 - (d.value / maxTrend) * 140}`).join(' ')}
                fill="none"
                stroke="#453DD8"
                strokeWidth="2"
              />
              {TREND_DATA.map((d, i) => (
                <circle key={i} cx={(i / (TREND_DATA.length - 1)) * 400} cy={160 - (d.value / maxTrend) * 140} r="3" fill="#453DD8" stroke="white" strokeWidth="2" />
              ))}
              {TREND_DATA.map((d, i) => (
                <text key={i} x={(i / (TREND_DATA.length - 1)) * 400} y="155" textAnchor="middle" className="text-[8px] fill-neutral-gray-medium">{d.label}</text>
              ))}
              {[0, 5, 10, 15, 20, 25, 30].map((v) => (
                <text key={v} x="0" y={160 - (v / maxTrend) * 140 - 2} className="text-[7px] fill-neutral-gray-medium">{v}</text>
              ))}
            </svg>
            <div className="absolute top-2 right-2 bg-white border border-neutral-gray-light rounded px-2 py-1 shadow-sm">
              <p className="text-[10px] font-bold text-neutral-black">24</p>
              <p className="text-[8px] text-neutral-gray-medium">Total</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-neutral-gray-light p-4">
          <h3 className="text-xs font-semibold text-neutral-black mb-3">Participants Overview</h3>
          <div className="flex items-center gap-4">
            <div className="relative w-32 h-32 flex-shrink-0">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <circle cx="50" cy="50" r="40" fill="none" stroke="#3B82F6" strokeWidth="20" strokeDasharray="107 219" strokeDashoffset="0" />
                <circle cx="50" cy="50" r="40" fill="none" stroke="#22C55E" strokeWidth="20" strokeDasharray="58.3 267.7" strokeDashoffset="-107" />
                <circle cx="50" cy="50" r="40" fill="none" stroke="#A855F7" strokeWidth="20" strokeDasharray="42.5 283.5" strokeDashoffset="-165.3" />
                <circle cx="50" cy="50" r="40" fill="none" stroke="#F97316" strokeWidth="20" strokeDasharray="28.3 297.7" strokeDashoffset="-207.8" />
                <circle cx="50" cy="50" r="40" fill="none" stroke="#D1D5DB" strokeWidth="20" strokeDasharray="16.2 309.8" strokeDashoffset="-236.1" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-lg font-bold text-neutral-black">3,142</p>
                <p className="text-[9px] text-neutral-gray-medium">Total</p>
              </div>
            </div>
            <div className="space-y-1.5">
              {PARTICIPANTS_BY_TYPE.map((type) => (
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
            <h3 className="text-xs font-semibold text-neutral-black">Votes Overview</h3>
            <select
              value={votesPeriod}
              onChange={(e) => setVotesPeriod(e.target.value)}
              className="text-[10px] px-2 py-1 rounded border border-neutral-gray-light text-neutral-gray-dark bg-white cursor-pointer outline-none"
            >
              <option>This Week</option>
              <option>Last Week</option>
            </select>
          </div>
          <div className="relative h-40">
            <svg viewBox="0 0 400 160" className="w-full h-full">
              {VOTES_DATA.map((d, i) => {
                const barWidth = 400 / VOTES_DATA.length - 8;
                const barHeight = (d.value / maxVotes) * 130;
                const x = (i / VOTES_DATA.length) * 400 + 4;
                return (
                  <g key={i}>
                    <rect x={x} y={150 - barHeight} width={barWidth} height={barHeight} fill="#453DD8" rx="2" />
                    <text x={x + barWidth / 2} y="158" textAnchor="middle" className="text-[7px] fill-neutral-gray-medium">{d.label}</text>
                  </g>
                );
              })}
              {[0, 10000, 20000, 30000, 40000].map((v) => (
                <text key={v} x="0" y={150 - (v / maxVotes) * 130 - 2} className="text-[7px] fill-neutral-gray-medium">
                  {v >= 1000 ? `${v / 1000}K` : v}
                </text>
              ))}
            </svg>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-lg border border-neutral-gray-light p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-semibold text-neutral-black">Ongoing Competitions</h3>
            <button className="flex items-center gap-1 text-[10px] text-[#453DD8] font-medium hover:underline cursor-pointer">
              View all <span>&rarr;</span>
            </button>
          </div>
          <table className="w-full text-[11px]">
            <thead>
              <tr className="border-b border-neutral-gray-light">
                <th className="text-left py-2 font-medium text-neutral-gray-medium">Competition</th>
                <th className="text-left py-2 font-medium text-neutral-gray-medium">Category</th>
                <th className="text-left py-2 font-medium text-neutral-gray-medium">Participants</th>
                <th className="text-left py-2 font-medium text-neutral-gray-medium">Votes</th>
                <th className="text-left py-2 font-medium text-neutral-gray-medium">Status</th>
                <th className="text-left py-2 font-medium text-neutral-gray-medium">Ends In</th>
                <th className="py-2"></th>
              </tr>
            </thead>
            <tbody>
              {ONGOING_COMPETITIONS.map((comp) => (
                <tr key={comp.id} className="border-b border-neutral-gray-light last:border-0">
                  <td className="py-2.5">
                    <div className="flex items-center gap-2">
                      <Image src={comp.logo} alt={comp.name} width={24} height={24} className="rounded-lg object-cover" />
                      <div>
                        <p className="font-medium text-neutral-black">{comp.name}</p>
                        <p className="text-[9px] text-neutral-gray-medium">{comp.category}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-2.5"><span className={cn("px-1.5 py-0.5 rounded text-[9px] font-medium", comp.categoryColor)}>{comp.category}</span></td>
                  <td className="py-2.5 text-neutral-black">{comp.participants}</td>
                  <td className="py-2.5 text-neutral-black">{comp.votes.toLocaleString()}</td>
                  <td className="py-2.5"><span className="px-1.5 py-0.5 rounded text-[9px] font-semibold bg-green-100 text-green-700">{comp.status}</span></td>
                  <td className="py-2.5 text-neutral-gray-dark">{comp.endsIn}</td>
                  <td className="py-2.5"><button className="p-1 hover:bg-neutral-bg-light rounded cursor-pointer"><MoreHorizontal className="h-3 w-3 text-neutral-gray-medium" /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-[10px] text-neutral-gray-medium mt-2">Showing 1 to 4 of 8 ongoing competitions</p>
        </div>

        <div className="bg-white rounded-lg border border-neutral-gray-light p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-semibold text-neutral-black">Upcoming Competitions</h3>
            <button className="flex items-center gap-1 text-[10px] text-[#453DD8] font-medium hover:underline cursor-pointer">
              View all <span>&rarr;</span>
            </button>
          </div>
          <div className="space-y-3">
            {UPCOMING_COMPETITIONS.map((comp) => (
              <div key={comp.id} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-purple-50 flex flex-col items-center justify-center flex-shrink-0">
                  <span className="text-[8px] font-bold text-purple-600 uppercase">Jun</span>
                  <span className="text-sm font-bold text-purple-700">{comp.startDate?.split(' ')[1]?.replace(',', '')}</span>
                </div>
                <Image src={comp.logo} alt={comp.name} width={28} height={28} className="rounded-lg object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-medium text-neutral-black truncate">{comp.name}</p>
                  <p className="text-[9px] text-neutral-gray-medium">{comp.category}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-[10px] font-medium text-neutral-black">{comp.expected} Expected</p>
                  <p className="text-[9px] text-neutral-gray-medium">{comp.startsIn}</p>
                  <p className="text-[9px] text-neutral-gray-medium">{comp.startDate}</p>
                </div>
                <button className="p-1 hover:bg-neutral-bg-light rounded cursor-pointer flex-shrink-0"><MoreHorizontal className="h-3 w-3 text-neutral-gray-medium" /></button>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-neutral-gray-medium mt-2">Showing 1 to 4 of 6 upcoming competitions</p>
        </div>
      </div>
    </div>
  );
}
