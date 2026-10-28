'use client';

import React, { useState } from 'react';

export interface BarChartDatum {
  label: string;
  value: number;
}

interface BarChartCardProps {
  title: string;
  data: BarChartDatum[];
  color?: string;
}

function compact(value: number): string {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `${Math.round(value / 1_000)}K`;
  return String(value);
}

/** Reusable single-series bar chart card. */
export default function BarChartCard({ title, data, color = '#453DD8' }: BarChartCardProps) {
  const [period, setPeriod] = useState('This Week');
  const max = Math.max(...data.map((d) => d.value), 1);
  const ticks = [0, max / 3, (max * 2) / 3, max];

  return (
    <div className="bg-white rounded-lg border border-neutral-gray-light p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xs font-semibold text-neutral-black">{title}</h3>
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
          {data.map((d, i) => {
            const barWidth = 400 / data.length - 8;
            const barHeight = (d.value / max) * 130;
            const x = (i / data.length) * 400 + 4;
            return (
              <g key={i}>
                <rect x={x} y={150 - barHeight} width={barWidth} height={barHeight} fill={color} rx="2" />
                <text x={x + barWidth / 2} y="158" textAnchor="middle" className="text-[7px] fill-neutral-gray-medium">{d.label}</text>
              </g>
            );
          })}
          {ticks.map((v) => (
            <text key={v} x="0" y={150 - (v / max) * 130 - 2} className="text-[7px] fill-neutral-gray-medium">
              {compact(v)}
            </text>
          ))}
        </svg>
      </div>
    </div>
  );
}
