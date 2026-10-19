'use client';

import React, { useRef, useState } from 'react';
import type { SubmissionRecord } from '../data';
import { X, Plus, Upload, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MultiSelectField, SingleSelectField } from './DropdownFields';

interface Props {
  value: SubmissionRecord;
  onChange: (v: SubmissionRecord) => void;
}

const inputCls = 'w-full rounded-lg border border-neutral-gray-light px-3 py-2 text-sm focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600';
const labelCls = 'block text-[11px] font-semibold text-neutral-gray-medium uppercase mb-1';

interface DocEntry { title: string; issuer: string; year: string; file: string; fileObj?: File; }

// ------ BulletInput: input with add button for arrays ------

function BulletInput({ label, items, setItems, placeholder, description }: {
  label: string; items: string[]; setItems: (v: string[]) => void; placeholder: string; description?: string;
}) {
  const [input, setInput] = useState('');
  const add = () => { const t = input.trim(); if (t) { setItems([...items, t]); setInput(''); } };
  return (
    <div className="rounded-lg border border-dashed border-neutral-gray-light p-4">
      <div className="mb-2">
        <label className="block text-sm font-medium text-neutral-black">{label}</label>
        {description && <span className="ml-1 text-[10px] text-neutral-gray-medium">{description}</span>}
      </div>
      {items.length > 0 && (
        <div className="mb-3 space-y-1.5">
          {items.map((item: string, i: number) => (
            <div key={i} className="flex items-start gap-2 text-sm text-neutral-black">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-red-600" />
              <span className="flex-1">{item}</span>
              <button type="button" onClick={() => setItems(items.filter((_, j: number) => j !== i))} className="cursor-pointer text-red-400 hover:text-red-600 shrink-0">
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
      <div className="flex gap-2">
        <input type="text" value={input} onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); add(); } }}
          className="flex-1 rounded-lg border border-neutral-gray-light px-4 py-2 text-sm outline-none focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600 placeholder:text-neutral-gray-medium" placeholder={placeholder} />
        <button type="button" onClick={add} disabled={!input.trim()}
          className="flex cursor-pointer items-center gap-1 rounded-lg bg-brand-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-red-700 disabled:opacity-40 disabled:cursor-not-allowed">
          <Plus className="h-4 w-4" /> Add
        </button>
      </div>
    </div>
  );
}

// ------ DocSection: for licenses & awards with view file ------

function DocSection({ title, items, setItems, desc }: {
  title: string; items: DocEntry[]; setItems: (v: DocEntry[]) => void; desc: string;
}) {
  const [docTitle, setDocTitle] = useState('');
  const [docIssuer, setDocIssuer] = useState('');
  const [docYear, setDocYear] = useState('');
  const [docFile, setDocFile] = useState<File | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const canAdd = docTitle.trim() && docIssuer.trim() && docYear.trim() && docFile;

  const handleAdd = () => {
    if (!canAdd) return;
    setItems([...items, { title: docTitle.trim(), issuer: docIssuer.trim(), year: docYear.trim(), file: docFile.name, fileObj: docFile }]);
    setDocTitle(''); setDocIssuer(''); setDocYear(''); setDocFile(null);
    if (fileRef.current) fileRef.current.value = '';
  };

  const removeFile = (idx: number) => {
    setItems(items.filter((_, i) => i !== idx));
  };

  return (
    <div>
      <label className="block text-sm font-medium text-neutral-black mb-1">{title}</label>
      <p className="text-xs text-neutral-gray-medium mb-2">{desc}</p>
      {items.length > 0 && (
        <div className="space-y-2 mb-3">
          {items.map((item: DocEntry, i: number) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-neutral-gray-light bg-neutral-bg-light/50">
              <div className="flex items-center gap-2 min-w-0">
                <FileText className="h-4 w-4 text-brand-red-600 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-neutral-black truncate">{item.title}</p>
                  <p className="text-[11px] text-neutral-gray-medium truncate">{item.issuer} &middot; {item.year}</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => { window.open(item.file, '_blank'); }}
                  className="inline-flex items-center gap-1 px-2 py-1 rounded text-[11px] font-medium text-[#453DD8] border border-[#453DD8]/20 hover:bg-[#453DD8]/10 transition-colors cursor-pointer"
                  title="View Document"
                >
                  <FileText className="h-3 w-3" /> View
                </button>
                <button onClick={() => removeFile(i)} className="cursor-pointer text-red-400 hover:text-red-600 shrink-0">
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="space-y-2 rounded-lg border border-dashed border-neutral-gray-light p-3">
        <input type="text" value={docTitle} onChange={e => setDocTitle(e.target.value)}
          className="w-full rounded-lg border border-neutral-gray-light px-3 py-2 text-sm focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600" placeholder="Document title *" />
        <div className="flex gap-2">
          <input type="text" value={docIssuer} onChange={e => setDocIssuer(e.target.value)}
            className="flex-1 rounded-lg border border-neutral-gray-light px-3 py-2 text-sm focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600" placeholder="Issuer *" />
          <input type="text" value={docYear} onChange={e => setDocYear(e.target.value)}
            className="w-32 rounded-lg border border-neutral-gray-light px-3 py-2 text-sm focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600" placeholder="Year" />
        </div>
        <div className="flex gap-2">
          <input ref={fileRef} type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={e => setDocFile(e.target.files?.[0] || null)}
            className="hidden" id="doc-file-input" />
          <button type="button" onClick={() => document.getElementById('doc-file-input')?.click()}
            className="flex cursor-pointer items-center gap-1 rounded-lg border border-dashed border-brand-red-300 px-3 py-2 text-xs font-medium text-brand-red-600 hover:bg-brand-red-50 transition-colors flex-1 justify-center">
            <Upload className="h-3.5 w-3.5" /> {docFile ? docFile.name : 'Select file (PDF, JPG, PNG) *'}
          </button>
          <button type="button" onClick={handleAdd} disabled={!canAdd}
            className="flex cursor-pointer items-center gap-1 rounded-lg bg-brand-red-600 px-4 py-2 text-xs font-medium text-white hover:bg-brand-red-700 disabled:opacity-40 disabled:cursor-not-allowed">
            <Plus className="h-3 w-3" /> Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default function SubmissionEditForm({ value, onChange }: Props) {
  const inn = value.innovation;
  const inv = value.innovator;

  const setInn = (patch: Partial<typeof inn>) => onChange({ ...value, innovation: { ...inn, ...patch } });
  const setInv = (patch: Partial<typeof inv>) => onChange({ ...value, innovator: { ...inv, ...patch } });

  // Reference option lists (same as afro-innovation listing)
  const FIELDS = [
    'Hybrid', 'Medical', 'Engineering', 'Pharmaceutical', 'Computer & ICT', 'Veterinary',
    'Agriculture', 'Food & Nutrition', 'Mathematics & Statistics', 'Physics', 'Chemistry',
    'Biology', 'Environmental', 'Industrial & Manufacturing', 'Energy & Power',
    'Waste & Recycling', 'Astronomy & Space'
  ];
  const STAGES = ['Ideation', 'Research & Development', 'Prototype', 'MVP', 'Scale-Up', 'Commercialization'];
  const OWNERSHIP = ['Private', 'Government | Public', 'Academic', 'Mission', 'Corporate', 'Inter-Government', 'NGO | Charity', 'Other'];
  const SDGS = [
    'No Poverty', 'Zero Hunger', 'Good Health & Well-Being', 'Quality Education', 'Gender Equality',
    'Clean Water & Sanitation', 'Affordable & Clean Energy', 'Decent Work & Economic Growth',
    'Industry, Innovation & Infrastructure', 'Reduced Inequalities', 'Sustainable Cities & Communities',
    'Responsible Consumption & Production', 'Climate Action', 'Life Below Water', 'Life on Land',
    'Peace, Justice & Strong Institutions', 'Partnerships for the Goals'
  ];
  const INTERESTS = ['Investment | Partnership', 'Purchase | Trade', 'Marketing', 'Training | Mentorship', 'Sensitization'];

  return (
    <div className="space-y-6">
      {/* Innovation Identity */}
      <div className={cn('rounded-xl border border-neutral-gray-light bg-white p-4 space-y-3')}>
        <h3 className="text-sm font-bold text-neutral-black">Innovation Identity</h3>
        <div className="grid sm:grid-cols-2 gap-3">
          <label className="block"><span className={labelCls}>Name</span><input className={inputCls} value={inn.name} onChange={(e) => setInn({ name: e.target.value })} /></label>
          <label className="block"><span className={labelCls}>Country</span><input className={inputCls} value={inn.country} onChange={(e) => setInn({ country: e.target.value })} /></label>
        </div>
        <label className="block"><span className={labelCls}>Short Description</span><textarea rows={2} className={inputCls} value={inn.description} onChange={(e) => setInn({ description: e.target.value })} /></label>
      </div>

      {/* Innovation Details */}
      <div className={cn('rounded-xl border border-neutral-gray-light bg-white p-4 space-y-3')}>
        <h3 className="text-sm font-bold text-neutral-black">Innovation Details</h3>
        <div className="grid sm:grid-cols-2 gap-3">
          <label className="block"><span className={labelCls}>Field</span>
            <SingleSelectField options={FIELDS} value={inn.field} onChange={(v) => setInn({ field: v })} />
          </label>
          <label className="block"><span className={labelCls}>Stage</span>
            <SingleSelectField options={STAGES} value={inn.stage} onChange={(v) => setInn({ stage: v })} />
          </label>
          <label className="block"><span className={labelCls}>Ownership</span>
            <SingleSelectField options={OWNERSHIP} value={inn.ownership} onChange={(v) => setInn({ ownership: v })} />
          </label>
        </div>
        <div>
          <span className={labelCls}>Interests</span>
          <MultiSelectField options={INTERESTS} value={inn.interests} onChange={(v) => setInn({ interests: v })} max={3} />
        </div>
        <div>
          <span className={labelCls}>SDGs</span>
          <MultiSelectField options={SDGS} value={inn.sdgs} onChange={(v) => setInn({ sdgs: v })} max={5} />
        </div>
        <label className="block"><span className={labelCls}>Specification</span><textarea rows={2} className={inputCls} value={inn.specification} onChange={(e) => setInn({ specification: e.target.value })} /></label>
        <div className="grid sm:grid-cols-2 gap-3">
          <div className="flex flex-col">
            <div className="grid grid-cols-2 gap-3">
              <label className="block"><span className={labelCls}>Dimensions</span><input className={inputCls} value={inn.dimensions} onChange={(e) => setInn({ dimensions: e.target.value })} /></label>
              <label className="block"><span className={labelCls}>Weight</span><input className={inputCls} value={inn.weight} onChange={(e) => setInn({ weight: e.target.value })} /></label>
            </div>
          </div>
        </div>
        <div>
          <span className={labelCls}>Materials Used</span>
          <BulletInput label="Materials Used" items={inn.materials} setItems={(v) => setInn({ materials: v })} placeholder="e.g. Aluminium, Silicon" />
        </div>
        <div>
          <span className={labelCls}>User Groups</span>
          <BulletInput label="User Groups" items={inn.userGroups} setItems={(v) => setInn({ userGroups: v })} placeholder="e.g. Farmers, Businesses" />
        </div>
        <BulletInput label="Applications" items={inn.applications} setItems={(v) => setInn({ applications: v })} placeholder="e.g. Irrigation, Crop monitoring" />
        <BulletInput label="Impact" items={inn.impact} setItems={(v) => setInn({ impact: v })} placeholder="e.g. Yield +40%" />
        <BulletInput label="Recommendations" items={inn.recommendations} setItems={(v) => setInn({ recommendations: v })} placeholder="e.g. Calibrate sensors every season" />
        <BulletInput label="Cautions" items={inn.cautions} setItems={(v) => setInn({ cautions: v })} placeholder="e.g. Keep dry during rainfall" />
        <DocSection
          title="Licenses & Certifications"
          items={inn.licenses as DocEntry[]}
          setItems={(v) => setInn({ licenses: v as any })}
          desc="Upload licenses or certifications for your innovation."
        />
        <DocSection
          title="Honorary Awards"
          items={inn.awards as DocEntry[]}
          setItems={(v) => setInn({ awards: v as any })}
          desc="Upload recognition awards your innovation has received."
        />
      </div>

      {/* Innovator's Information */}
      <div className={cn('rounded-xl border border-neutral-gray-light bg-white p-4 space-y-3')}>
        <h3 className="text-sm font-bold text-neutral-black">Innovator's Information</h3>
        <div className="grid sm:grid-cols-2 gap-3">
          <label className="block"><span className={labelCls}>Name</span><input className={inputCls} value={inv.name} onChange={(e) => setInv({ name: e.target.value })} /></label>
          <label className="block"><span className={labelCls}>Username</span><input className={inputCls} value={inv.username} onChange={(e) => setInv({ username: e.target.value })} /></label>
          <label className="block"><span className={labelCls}>Phone</span><input className={inputCls} value={inv.phone} onChange={(e) => setInv({ phone: e.target.value })} /></label>
          <label className="block"><span className={labelCls}>Alternative Phone</span><input className={inputCls} value={inv.altPhone} onChange={(e) => setInv({ altPhone: e.target.value })} /></label>
          <label className="block"><span className={labelCls}>Email</span><input className={inputCls} value={inv.email} onChange={(e) => setInv({ email: e.target.value })} /></label>
          <label className="block"><span className={labelCls}>Website</span><input className={inputCls} value={inv.website} onChange={(e) => setInv({ website: e.target.value })} /></label>
        </div>
      </div>
    </div>
  );
}
