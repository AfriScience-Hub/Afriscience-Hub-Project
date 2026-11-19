'use client';

import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import type { AdminScientist } from '../data';

interface Props {
  value: AdminScientist;
  onChange: (value: AdminScientist) => void;
}

const inputCls = 'w-full rounded-lg border border-neutral-gray-light px-3 py-2 text-sm focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600';
const labelCls = 'block text-[11px] font-semibold text-neutral-gray-medium uppercase mb-1';

function BulletInput({
  label,
  items,
  setItems,
  placeholder,
}: {
  label: string;
  items: string[];
  setItems: (items: string[]) => void;
  placeholder: string;
}) {
  const [input, setInput] = useState('');
  const add = () => {
    const text = input.trim();
    if (text) {
      setItems([...items, text]);
      setInput('');
    }
  };

  return (
    <div className="rounded-lg border border-dashed border-neutral-gray-light p-4">
      <label className="mb-2 block text-sm font-medium text-neutral-black">{label}</label>
      {items.length > 0 && (
        <div className="mb-3 space-y-1.5">
          {items.map((item, index) => (
            <div key={`${item}-${index}`} className="flex items-start gap-2 text-sm text-neutral-black">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-red-600" />
              <span className="flex-1">{item}</span>
              <button
                type="button"
                onClick={() => setItems(items.filter((_, i) => i !== index))}
                className="shrink-0 cursor-pointer text-red-400 hover:text-red-600"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); add(); } }}
          placeholder={placeholder}
          className={`${inputCls} flex-1`}
        />
        <button
          type="button"
          onClick={add}
          disabled={!input.trim()}
          className="flex cursor-pointer items-center gap-1 rounded-lg bg-brand-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-red-700 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Plus className="h-4 w-4" /> Add
        </button>
      </div>
    </div>
  );
}

/** Inline edit form shown inside the scientist detail modal, mirroring Afro-Innovations. */
export default function ScientistEditForm({ value, onChange }: Props) {
  const set = (patch: Partial<AdminScientist>) => onChange({ ...value, ...patch });

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-neutral-gray-light bg-white p-4 space-y-3">
        <h3 className="text-sm font-bold text-neutral-black">Scientist Identity</h3>
        <div className="grid sm:grid-cols-2 gap-3">
          <label className="block"><span className={labelCls}>Name</span>
            <input className={inputCls} value={value.name} onChange={(e) => set({ name: e.target.value })} />
          </label>
          <label className="block"><span className={labelCls}>Title</span>
            <input className={inputCls} value={value.title} onChange={(e) => set({ title: e.target.value })} />
          </label>
          <label className="block"><span className={labelCls}>Field</span>
            <input className={inputCls} value={value.field} onChange={(e) => set({ field: e.target.value })} />
          </label>
          <label className="block"><span className={labelCls}>Location</span>
            <input className={inputCls} value={value.location} onChange={(e) => set({ location: e.target.value })} />
          </label>
          <label className="block"><span className={labelCls}>Country</span>
            <input className={inputCls} value={value.country} onChange={(e) => set({ country: e.target.value })} />
          </label>
          <label className="block"><span className={labelCls}>City / State</span>
            <input className={inputCls} value={value.city} onChange={(e) => set({ city: e.target.value })} />
          </label>
        </div>
        <label className="block"><span className={labelCls}>Short Bio</span>
          <textarea rows={3} className={inputCls} value={value.bio} onChange={(e) => set({ bio: e.target.value })} />
        </label>
      </div>

      <div className="rounded-xl border border-neutral-gray-light bg-white p-4 space-y-4">
        <h3 className="text-sm font-bold text-neutral-black">Professional Details</h3>
        <BulletInput label="Professions" items={value.professions} setItems={(professions) => set({ professions })} placeholder="e.g. Research Scientist" />
        <BulletInput label="Degrees" items={value.degrees} setItems={(degrees) => set({ degrees })} placeholder="e.g. PhD in Chemistry" />
        <BulletInput label="Services" items={value.services} setItems={(services) => set({ services })} placeholder="e.g. Laboratory analysis" />
        <BulletInput label="Specialized Scopes" items={value.scopes} setItems={(scopes) => set({ scopes })} placeholder="e.g. Drug discovery" />
        <BulletInput label="Engagement Policies" items={value.policies} setItems={(policies) => set({ policies })} placeholder="e.g. 48-hour cancellation notice" />
      </div>

      <div className="rounded-xl border border-neutral-gray-light bg-white p-4 space-y-3">
        <h3 className="text-sm font-bold text-neutral-black">Contact Information</h3>
        <div className="grid sm:grid-cols-2 gap-3">
          <label className="block"><span className={labelCls}>E-mail</span>
            <input type="email" className={inputCls} value={value.email} onChange={(e) => set({ email: e.target.value })} />
          </label>
          <label className="block"><span className={labelCls}>Phone</span>
            <input className={inputCls} value={value.phone} onChange={(e) => set({ phone: e.target.value })} />
          </label>
          <label className="block sm:col-span-2"><span className={labelCls}>Website</span>
            <input className={inputCls} value={value.website} onChange={(e) => set({ website: e.target.value })} />
          </label>
        </div>
      </div>
    </div>
  );
}
