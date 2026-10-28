import React from 'react';

export interface PieChartDatum {
  name: string;
  percent: string;
  count: number;
  color: string;
}

interface PieChartCardProps {
  title: string;
  data: PieChartDatum[];
  total: number;
  centerLabel?: string;
}

const RADIUS = 40;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

/** Reusable donut/pie chart card with a legend. */
export default function PieChartCard({ title, data, total, centerLabel = 'Total' }: PieChartCardProps) {
  let offset = 0;

  return (
    <div className="bg-white rounded-lg border border-neutral-gray-light p-4">
      <h3 className="text-xs font-semibold text-neutral-black mb-3">{title}</h3>
      <div className="flex items-center gap-4">
        <div className="relative w-32 h-32 flex-shrink-0">
          <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
            {data.map((slice) => {
              const percent = Number.parseFloat(slice.percent) || 0;
              const dash = (percent / 100) * CIRCUMFERENCE;
              const dashOffset = -offset;
              offset += dash;
              return (
                <circle
                  key={slice.name}
                  cx="50"
                  cy="50"
                  r={RADIUS}
                  fill="none"
                  stroke={slice.color}
                  strokeWidth="20"
                  strokeDasharray={`${dash} ${CIRCUMFERENCE - dash}`}
                  strokeDashoffset={dashOffset}
                />
              );
            })}
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-lg font-bold text-neutral-black">{total.toLocaleString()}</p>
            <p className="text-[9px] text-neutral-gray-medium">{centerLabel}</p>
          </div>
        </div>
        <div className="min-w-0 flex-1 space-y-1.5">
          {data.map((slice) => (
            <div key={slice.name} className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: slice.color }} />
              <span className="text-[10px] text-neutral-gray-dark flex-1 truncate">{slice.name}</span>
              <span className="text-[10px] text-neutral-gray-medium whitespace-nowrap">{slice.percent}</span>
              <span className="text-[9px] text-neutral-gray-medium whitespace-nowrap">({slice.count.toLocaleString()})</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
