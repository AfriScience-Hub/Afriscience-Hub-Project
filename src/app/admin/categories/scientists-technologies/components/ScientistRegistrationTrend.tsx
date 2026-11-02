'use client';

import React from 'react';

interface RegistrationTrendProps {
  data: { label: string; value: number }[];
}

/** Registration trend line/area chart for the scientists overview. */
export default function ScientistRegistrationTrend({ data }: RegistrationTrendProps) {
  const max = Math.max(...data.map((d) => d.value), 1);
  const width = 900;
  const height = 260;
  const top = 24;
  const bottom = 42;
  const chartHeight = height - top - bottom;
  const x = (i: number) => (i / Math.max(data.length - 1, 1)) * width;
  const y = (value: number) => top + chartHeight - (value / max) * chartHeight;

  return (
    <div className="bg-white rounded-lg border border-neutral-gray-light p-5 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xs font-semibold text-neutral-black">Registration Trend</h3>
        <span className="text-[10px] text-neutral-gray-medium">Recent weeks</span>
      </div>
      <div className="flex-1 min-h-[300px] w-full">
        <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" className="w-full h-full">
          <defs>
            <linearGradient id="sciRegistrationGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#453DD8" stopOpacity="0.24" />
              <stop offset="100%" stopColor="#453DD8" stopOpacity="0.01" />
            </linearGradient>
          </defs>

          {[0, 0.25, 0.5, 0.75, 1].map((fraction) => {
            const lineY = top + chartHeight * fraction;
            return <line key={fraction} x1="0" x2={width} y1={lineY} y2={lineY} stroke="#E5E7EB" strokeDasharray="4 5" />;
          })}

          <path
            d={`M ${x(0)} ${y(data[0].value)} ${data.map((d, i) => `L ${x(i)} ${y(d.value)}`).join(' ')} L ${width} ${top + chartHeight} L 0 ${top + chartHeight} Z`}
            fill="url(#sciRegistrationGradient)"
          />
          <polyline
            points={data.map((d, i) => `${x(i)},${y(d.value)}`).join(' ')}
            fill="none"
            stroke="#453DD8"
            strokeWidth="3"
            vectorEffect="non-scaling-stroke"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          {data.map((d, i) => (
            <circle
              key={d.label}
              cx={x(i)}
              cy={y(d.value)}
              r="4"
              fill="#453DD8"
              stroke="white"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
            />
          ))}
          {data.map((d, i) => (
            <text
              key={d.label}
              x={x(i)}
              y={height - 14}
              textAnchor={i === 0 ? 'start' : i === data.length - 1 ? 'end' : 'middle'}
              className="text-[10px] fill-neutral-gray-medium"
            >
              {d.label}
            </text>
          ))}
        </svg>
      </div>
    </div>
  );
}
