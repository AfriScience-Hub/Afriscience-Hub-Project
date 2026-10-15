'use client';

import React, { useState } from 'react';
import { VOTES_DATA } from '../data';

/**
 * "Votes Overview" bar chart card.
 */
export default function VotesOverviewChart() {
  const [period, setPeriod] = useState('This Week');
  const maxVotes = Math.max(...VOTES_DATA.map((d) => d.value));

  return (
    <div className="bg-white rounded-lg border border-neutral-gray-light p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xs font-semibold text-neutral-black">Votes Overview</h3>
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
  );
}
