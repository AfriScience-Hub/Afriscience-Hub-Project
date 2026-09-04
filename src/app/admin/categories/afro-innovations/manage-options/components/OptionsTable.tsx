'use client';

import { useState, useRef, useEffect } from 'react';
import { MoreVertical, Pencil, Power } from 'lucide-react';
import type { ManagedOption } from '../data';

interface Props {
  options: ManagedOption[];
  onEdit: (opt: ManagedOption) => void;
  onToggleStatus: (id: string) => void;
}

export default function OptionsTable({ options, onEdit, onToggleStatus }: Props) {
  const [openId, setOpenId] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpenId(null);
    };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  if (options.length === 0) {
    return <p className="text-sm text-neutral-gray-medium py-8 text-center">No options yet.</p>;
  }

  return (
    <div ref={ref} className="overflow-x-auto -mx-4 sm:mx-0">
      <table className="w-full text-sm min-w-[520px]">
        <thead>
          <tr className="border-b border-neutral-gray-light bg-neutral-bg-light/60">
            <th className="text-left px-4 py-2.5 text-xs font-semibold text-neutral-gray-medium">Name</th>
            <th className="text-left px-4 py-2.5 text-xs font-semibold text-neutral-gray-medium">Status</th>
            <th className="text-left px-4 py-2.5 text-xs font-semibold text-neutral-gray-medium">Innovations Using</th>
            <th className="text-right px-4 py-2.5 text-xs font-semibold text-neutral-gray-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {options.map((opt) => (
            <tr key={opt.id} className="border-b border-neutral-gray-light/60 last:border-0 hover:bg-neutral-bg-light/40">
              <td className="px-4 py-3 text-xs font-medium text-neutral-black">{opt.name}</td>
              <td className="px-4 py-3">
                <span
                  className={`inline-flex px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                    opt.status === 'Active' ? 'bg-emerald-50 text-emerald-700' : 'bg-neutral-100 text-neutral-gray-medium'
                  }`}
                >
                  {opt.status}
                </span>
              </td>
              <td className="px-4 py-3 text-xs text-neutral-gray-dark">{opt.count}</td>
              <td className="px-4 py-3">
                <div className="flex justify-end">
                  <div className="relative">
                    <button
                      onClick={() => setOpenId(openId === opt.id ? null : opt.id)}
                      className="h-8 w-8 rounded-lg border border-neutral-gray-light bg-white hover:bg-neutral-bg-light flex items-center justify-center cursor-pointer"
                      aria-label="Actions"
                    >
                      <MoreVertical className="h-4 w-4 text-neutral-gray-dark" />
                    </button>
                    {openId === opt.id && (
                      <div className="absolute right-0 top-full mt-1 w-44 bg-white border border-neutral-gray-light rounded-xl shadow-lg py-1 z-10">
                        <button
                          onClick={() => {
                            onEdit(opt);
                            setOpenId(null);
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-neutral-black hover:bg-neutral-bg-light cursor-pointer"
                        >
                          <Pencil className="h-3.5 w-3.5 text-[#453DD8]" /> Edit
                        </button>
                        <button
                          onClick={() => {
                            onToggleStatus(opt.id);
                            setOpenId(null);
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium hover:bg-neutral-bg-light cursor-pointer text-amber-700"
                        >
                          <Power className="h-3.5 w-3.5" /> {opt.status === 'Active' ? 'Deactivate' : 'Activate'}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
