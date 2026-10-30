import type { ReactNode } from 'react';

interface StatCardProps {
  label: string;
  value: number;
  icon: ReactNode;
  iconBg: string;
}

export default function StatCard({ label, value, icon, iconBg }: StatCardProps) {
  return (
    <div className="bg-white rounded-xl border border-neutral-gray-light p-4 flex flex-col">
      <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${iconBg} text-xs shrink-0`}>{icon}</div>
      <p className="text-2xl font-bold text-neutral-black mt-2">{value}</p>
      <p className="text-[11px] text-neutral-gray-medium">{label}</p>
    </div>
  );
}
