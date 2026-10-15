'use client';

import React from 'react';
import { Users, Building2, Briefcase, GraduationCap } from 'lucide-react';
import { KEY_IMPACT_METRICS } from '../../applicationsData';

const ICONS = [Users, Building2, Briefcase, GraduationCap];

/**
 * Key Impact Metrics: four headline impact numbers with trend chips.
 */
export default function KeyImpactMetrics() {
  return (
    <div className="rounded-2xl border border-neutral-gray-light bg-white p-5 shadow-sm">
      <h3 className="text-sm font-bold text-neutral-black mb-4">Key Impact Metrics</h3>
      <div className="grid grid-cols-2 gap-4">
        {KEY_IMPACT_METRICS.map((metric, i) => {
          const Icon = ICONS[i];
          return (
            <div key={metric.label} className="rounded-xl border border-neutral-gray-light p-3.5 flex items-start gap-3">
              <span className={`w-10 h-10 rounded-lg grid place-items-center flex-shrink-0 ${metric.iconCls}`}>
                <Icon className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <div className="flex items-baseline gap-1.5 flex-wrap">
                  <p className="text-lg font-bold text-neutral-black leading-tight">{metric.value}</p>
                  <span className="text-[10px] font-semibold text-green-600">{metric.trend}</span>
                </div>
                <p className="text-[11px] text-neutral-gray-medium leading-tight">{metric.label}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
