'use client';

import React, { useState } from 'react';
import { TREND_DATA } from '../data';

/**
 * "Registration Trend" area/line chart card.
 */
export default function CompetitionTrendChart() {
  const [period, setPeriod] = useState('This Week');
  const maxTrend = Math.max(...TREND_DATA.map((d) => d.value));

  return (
    <div className="bg-white rounded-lg border border-neutral-gray-light p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xs font-semibold text-neutral-black">Registration Trend</h3>
        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
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
  );
}
