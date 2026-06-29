'use client';

import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Plus, Upload, FileText, ImagePlus, Film, ChevronDown, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  INNOVATION_FIELDS, INNOVATION_STAGES, INNOVATION_INTERESTS,
  INNOVATION_OWNERSHIP, INNOVATION_SDGS,
  INNOVATION_USER_GROUPS,
} from '@/app/data/mockData';

interface Dimensions { length: string; width: string; height: string; unit: string; }
interface Weight { value: string; unit: string; }
interface GalleryFile { category: string; type: 'image' | 'video'; name: string; caption: string; }

interface InnovationDetailsSectionProps {
  innovFields: string[]; setInnovFields: (v: string[] | ((p: string[]) => string[])) => void;
  innovInterests: string[]; setInnovInterests: (v: string[] | ((p: string[]) => string[])) => void;
  innovOwnership: string; setInnovOwnership: (v: string) => void;
  innovStage: string; setInnovStage: (v: string) => void;
  innovSdgs: string[]; setInnovSdgs: (v: string[] | ((p: string[]) => string[])) => void;
  innovMaterials: string[]; setInnovMaterials: (v: string[] | ((p: string[]) => string[])) => void;
  innovDimensions: Dimensions; setInnovDimensions: (v: Dimensions | ((p: Dimensions) => Dimensions)) => void;
  innovWeight: Weight; setInnovWeight: (v: Weight | ((p: Weight) => Weight)) => void;
  innovUserGroups: string[]; setInnovUserGroups: (v: string[] | ((p: string[]) => string[])) => void;
  innovApplications: string[]; setInnovApplications: (v: string[] | ((p: string[]) => string[])) => void;
  innovRecommendations: string[]; setInnovRecommendations: (v: string[] | ((p: string[]) => string[])) => void;
  innovCautions: string[]; setInnovCautions: (v: string[] | ((p: string[]) => string[])) => void;
  innovLicenses: { name: string; file: string }[]; setInnovLicenses: (v: { name: string; file: string }[] | ((p: { name: string; file: string }[]) => { name: string; file: string }[])) => void;
  innovAwards: { name: string; file: string }[]; setInnovAwards: (v: { name: string; file: string }[] | ((p: { name: string; file: string }[]) => { name: string; file: string }[])) => void;
  innovGallery: GalleryFile[]; setInnovGallery: (v: GalleryFile[] | ((p: GalleryFile[]) => GalleryFile[])) => void;
}

const DIMENSION_UNITS = ['mm', 'cm', 'in', 'ft', 'm'];
const WEIGHT_UNITS = ['mg', 'g', 'oz', 'lb', 'kg', 't'];
const GALLERY_CATEGORIES = ['Working Materials', 'Work-in-Progress', 'Finished Work'];
const MAX_GALLERY = 3;

const INTEREST_DESCRIPTIONS: Record<string, string> = {
  'Investment | Partnership': 'Get individuals/brands that can invest into your innovation',
  'Purchase | Trade': 'Get individuals/brands that can directly purchase & sell your innovative product',
  'Marketing': 'Get individuals/brands that can link you to potential markets for your innovation',
  'Training | Mentorship': 'Get individuals/brands that can advance your knowledge further in the innovation',
  'Sensitization': 'Get individuals/brands that can help create targeted awareness of your innovation.',
};

const STAGE_DESCRIPTIONS: Record<string, string> = {
  'Ideation': 'Innovation only exists as an idea or concept',
  'Research & Development': 'Innovative idea is under scientific experimentation and technical development',
  'Prototype': 'A working model of innovation is created and ready for testing and validation',
  'MVP': 'A validated and useable version of the innovation is currently available to users',
  'Scale-Up': 'Innovation is validated, usable and ready for mass-production',
  'Commercialization': 'Innovation is ready to be introduced and distributed in suitable markets',
};

const OWNERSHIP_DESCRIPTIONS: Record<string, string> = {
  'Private': 'Owned by an individual or private entity',
  'Government | Public': 'Owned or operated by government',
  'Academic': 'Developed within an academic institution',
  'Mission': 'Driven by a social or religious mission',
  'Corporate': 'Owned by a corporation',
  'Inter-Government': 'Jointly owned by multiple governments',
  'NGO | Charity': 'Owned by a non-profit organization',
  'Other': 'Other ownership structure',
};

function OptionInfo({ text }: { text: string }) {
  const [pos, setPos] = useState<{ left: number; top: number } | null>(null);
  return (
    <span className="inline-flex cursor-pointer items-center"
      onMouseEnter={e => { const r = e.currentTarget.getBoundingClientRect(); setPos({ left: Math.min(r.right + 8, window.innerWidth - 236), top: Math.max(8, r.top - 10) }); }}
      onMouseLeave={() => setPos(null)}
      onFocus={e => { const r = e.currentTarget.getBoundingClientRect(); setPos({ left: Math.min(r.right + 8, window.innerWidth - 236), top: Math.max(8, r.top - 10) }); }}
      onBlur={() => setPos(null)} tabIndex={0}>
      <Info size={14} className="text-blue-400" />
      {pos && createPortal(
        <span className="pointer-events-none fixed z-[9999] w-56 rounded-lg bg-neutral-black px-3 py-2 text-left text-[10px] font-medium leading-4 text-white shadow-lg"
          style={{ left: pos.left, top: pos.top }}>{text}</span>, document.body)}
    </span>
  );
}

function MultiSelectField({ label, placeholder, options, value, onChange, max, required, tooltips }: {
  label: string; placeholder: string; options: string[]; value: string[];
  onChange: (v: string[] | ((p: string[]) => string[])) => void; max: number;
  required?: boolean; tooltips?: Record<string, string>;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => { if (!open) return; const handler = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); }; document.addEventListener('mousedown', handler); return () => document.removeEventListener('mousedown', handler); }, [open]);
  const toggle = (opt: string) => {
    onChange(p => {
      const arr = typeof p === 'function' ? (p as (prev: string[]) => string[])(value) : p;
      if (arr.includes(opt)) return arr.filter(f => f !== opt);
      if (arr.length >= max) return arr;
      return [...arr, opt];
    });
  };
  return (
    <div ref={ref}>
      <label className="mb-2 block text-sm font-medium text-neutral-black">{label} {required && <span className="text-red-500">*</span>}</label>
      <button type="button" onClick={() => setOpen(v => !v)}
        className="flex h-10 w-full cursor-pointer items-center justify-between gap-3 rounded-lg border border-neutral-gray-light bg-white px-4 text-sm text-left text-neutral-black outline-none focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600">
        <span className={value.length ? 'text-neutral-black' : 'text-neutral-gray-medium'}>{value.length ? value.join(', ') : placeholder}</span>
        <ChevronDown size={15} className={`shrink-0 text-neutral-gray-medium transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      <p className="mt-1 text-xs text-neutral-gray-medium">{value.length}/{max} selected</p>
      {open && (
        <div className="mt-2 max-h-60 overflow-y-auto rounded-lg border border-neutral-gray-light bg-white p-2 shadow-sm">
          {options.map(opt => {
            const checked = value.includes(opt);
            const disabled = !checked && value.length >= max;
            return (
              <label key={opt} className={`flex cursor-pointer items-center justify-between gap-3 rounded-md px-3 py-2 text-sm ${disabled ? 'text-neutral-gray-light' : 'text-neutral-gray-dark hover:bg-brand-red-50'}`}>
                <span className="flex min-w-0 items-center gap-2">
                  <input type="checkbox" checked={checked} disabled={disabled} onChange={() => toggle(opt)} className="h-3.5 w-3.5 rounded accent-brand-red-600" />
                  <span>{opt}</span>
                </span>
                {tooltips?.[opt] ? <OptionInfo text={tooltips[opt]} /> : null}
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
}

function SingleSelectField({ label, placeholder, options, value, onChange, required, tooltips }: {
  label: string; placeholder: string; options: string[]; value: string;
  onChange: (v: string) => void; required?: boolean; tooltips?: Record<string, string>;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => { if (!open) return; const handler = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); }; document.addEventListener('mousedown', handler); return () => document.removeEventListener('mousedown', handler); }, [open]);
  return (
    <div ref={ref}>
      <label className="mb-2 block text-sm font-medium text-neutral-black">{label} {required && <span className="text-red-500">*</span>}</label>
      <button type="button" onClick={() => setOpen(v => !v)}
        className="flex h-10 w-full cursor-pointer items-center justify-between gap-3 rounded-lg border border-neutral-gray-light bg-white px-4 text-sm text-left text-neutral-black outline-none focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600">
        <span className={value ? 'text-neutral-black' : 'text-neutral-gray-medium'}>{value || placeholder}</span>
        <ChevronDown size={15} className={`shrink-0 text-neutral-gray-medium transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="mt-2 max-h-60 overflow-y-auto rounded-lg border border-neutral-gray-light bg-white p-2 shadow-sm">
          {options.map(opt => (
            <button key={opt} type="button" onClick={() => { onChange(opt); setOpen(false); }}
              className={`flex w-full cursor-pointer items-center justify-between gap-3 rounded-md px-3 py-2 text-sm text-left hover:bg-brand-red-50 ${value === opt ? 'font-semibold text-brand-red-600' : 'text-neutral-gray-dark'}`}>
              <span>{opt}</span>
              {tooltips?.[opt] ? <OptionInfo text={tooltips[opt]} /> : null}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function BulletInput({ label, items, setItems, placeholder, description }: {
  label: string; items: string[]; setItems: (v: string[] | ((p: string[]) => string[])) => void;
  placeholder: string; description?: string;
}) {
  const [input, setInput] = useState('');
  const add = () => { const t = input.trim(); if (t) { setItems(p => [...p, t]); setInput(''); } };
  return (
    <div className="rounded-lg border border-dashed border-neutral-gray-light p-4">
      <div className="mb-2 flex items-center justify-between gap-3">
        <label className="block text-sm font-medium text-neutral-black">
          {label}{description && <span className="ml-1"><OptionInfo text={description} /></span>}
        </label>
        <button type="button" onClick={add}
          className="inline-flex cursor-pointer items-center gap-1 rounded-lg border border-brand-red-200 px-3 py-1.5 text-[11px] font-semibold text-brand-red-600 hover:bg-brand-red-50">
          <Plus size={13} /> Add
        </button>
      </div>
      {items.length > 0 && (
        <div className="mb-3 space-y-1.5">
          {items.map((item, i) => (
            <div key={i} className="flex items-start gap-2 text-sm text-neutral-black">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-red-600" />
              <span className="flex-1">{item}</span>
              <button type="button" onClick={() => setItems(p => p.filter((_, j) => j !== i))} className="cursor-pointer text-red-400 hover:text-red-600 shrink-0">
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
        <button type="button" onClick={add}
          className="flex cursor-pointer items-center gap-1 rounded-lg bg-brand-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-red-700">
          <Plus className="h-4 w-4" /> Add
        </button>
      </div>
    </div>
  );
}

export default function InnovationDetailsSection(props: InnovationDetailsSectionProps) {
  const [newMaterial, setNewMaterial] = useState('');

  const addMaterial = () => {
    const t = newMaterial.trim();
    if (t && !props.innovMaterials.includes(t)) {
      props.setInnovMaterials(p => [...p, t]);
      setNewMaterial('');
    }
  };

  const docUpload = (title: string, items: { name: string; file: string }[], setItems: (v: { name: string; file: string }[] | ((p: { name: string; file: string }[]) => { name: string; file: string }[])) => void, placeholder: string, desc: string) => {
    const [docTitle, setDocTitle] = useState('');
    const handleUpload = () => {
      const t = docTitle.trim();
      setItems(p => [...p, { name: t || `Doc_${Date.now()}`, file: 'mock.pdf' }]);
      setDocTitle('');
    };
    return (
      <div>
        <label className="block text-sm font-medium text-neutral-black mb-1">{title}</label>
        <p className="text-xs text-neutral-gray-medium mb-2">{desc}</p>
        {items.length > 0 && (
          <div className="space-y-2 mb-3">
            {items.map((item, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-neutral-gray-light bg-neutral-bg-light">
                <div className="flex items-center gap-2"><FileText className="h-4 w-4 text-brand-red-600" /><p className="text-sm text-neutral-black">{item.name}</p></div>
                <button onClick={() => setItems(p => p.filter((_, j) => j !== i))} className="cursor-pointer text-red-400 hover:text-red-600"><X className="h-4 w-4" /></button>
              </div>
            ))}
          </div>
        )}
        <div className="flex gap-2">
          <input type="text" value={docTitle} onChange={e => setDocTitle(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleUpload(); } }}
            className="flex-1 rounded-lg border border-neutral-gray-light px-4 py-2 text-sm focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600" placeholder={placeholder} />
          <button type="button" onClick={handleUpload}
            className="flex cursor-pointer items-center gap-1 rounded-lg border border-dashed border-brand-red-300 px-4 py-2 text-sm font-medium text-brand-red-600 hover:bg-brand-red-50 transition-colors">
            <Upload className="h-4 w-4" /> Upload
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <MultiSelectField label="Innovation Field" placeholder="Select the best fields your innovation fits into"
        options={INNOVATION_FIELDS} value={props.innovFields} onChange={props.setInnovFields} max={3} required />
      <MultiSelectField label="Interests" placeholder="Select your interests"
        options={INNOVATION_INTERESTS} value={props.innovInterests} onChange={props.setInnovInterests} max={3} required
        tooltips={INTEREST_DESCRIPTIONS} />
      <SingleSelectField label="Ownership" placeholder="What is the ownership identity of innovation?"
        options={INNOVATION_OWNERSHIP} value={props.innovOwnership} onChange={props.setInnovOwnership} required
        tooltips={OWNERSHIP_DESCRIPTIONS} />
      <SingleSelectField label="Stage" placeholder="Select innovation stage"
        options={INNOVATION_STAGES} value={props.innovStage} onChange={props.setInnovStage} required
        tooltips={STAGE_DESCRIPTIONS} />
      <MultiSelectField label="SDGs" placeholder="Select appropriate sustainable development goals your innovation address"
        options={INNOVATION_SDGS} value={props.innovSdgs} onChange={props.setInnovSdgs} max={5} required />

      <hr className="border-neutral-gray-light" />

      <div>
        <label className="block text-sm font-medium text-neutral-black mb-1">Specifications</label>
        <div className="space-y-4 pl-2 border-l-2 border-brand-red-200">
          <div className="pl-3">
            <label className="block text-sm font-medium text-neutral-black mb-1">Materials</label>
            <p className="text-xs text-neutral-gray-medium mb-2">State some materials used in innovation</p>
            <div className="flex gap-2 mb-2">
              <input type="text" value={newMaterial} onChange={e => setNewMaterial(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addMaterial(); } }}
                className="flex-1 rounded-lg border border-neutral-gray-light px-4 py-2 text-sm focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600" placeholder="Input materials" />
              <button type="button" onClick={addMaterial}
                className="flex cursor-pointer items-center gap-1 rounded-lg bg-brand-red-600 text-white px-4 py-2 text-sm font-medium hover:bg-brand-red-700 transition-colors">
                <Plus className="h-4 w-4" /> Add
              </button>
            </div>
            {props.innovMaterials.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {props.innovMaterials.map((mat, i) => (
                  <span key={i} className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-brand-red-50 text-brand-red-600 text-xs font-medium">
                    {mat}
                    <button type="button" onClick={() => props.setInnovMaterials(p => p.filter((_, j) => j !== i))} className="cursor-pointer"><X className="h-3 w-3" /></button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="pl-3">
            <label className="block text-sm font-medium text-neutral-black mb-1">Dimensions</label>
            <p className="text-xs text-neutral-gray-medium mb-2">State the measurements of innovation</p>
            <div className="flex items-end gap-3">
              {(['length', 'width', 'height'] as const).map(dim => (
                <div key={dim} className="flex-1">
                  <label className="block text-[11px] font-medium text-neutral-gray-medium mb-1 capitalize">{dim}</label>
                  <input type="text" value={props.innovDimensions[dim]}
                    onChange={e => props.setInnovDimensions(p => ({ ...p, [dim]: e.target.value }))}
                    className="w-full rounded-lg border border-neutral-gray-light px-3 py-2 text-sm focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600" placeholder="0" />
                </div>
              ))}
              <div className="w-24">
                <label className="block text-[11px] font-medium text-neutral-gray-medium mb-1">Unit</label>
                <select value={props.innovDimensions.unit}
                  onChange={e => props.setInnovDimensions(p => ({ ...p, unit: e.target.value }))}
                  className="w-full cursor-pointer rounded-lg border border-neutral-gray-light px-3 py-2 text-sm focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600">
                  {DIMENSION_UNITS.map(u => <option key={u} value={u}>{u}</option>)}
                </select>
              </div>
            </div>
          </div>

          <div className="pl-3">
            <label className="block text-sm font-medium text-neutral-black mb-1">Weight</label>
            <p className="text-xs text-neutral-gray-medium mb-2">State innovation weight</p>
            <div className="flex items-end gap-3 max-w-xs">
              <div className="flex-1">
                <input type="text" value={props.innovWeight.value}
                  onChange={e => props.setInnovWeight(p => ({ ...p, value: e.target.value }))}
                  className="w-full rounded-lg border border-neutral-gray-light px-4 py-2 text-sm focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600" placeholder="0" />
              </div>
              <div className="w-24">
                <select value={props.innovWeight.unit}
                  onChange={e => props.setInnovWeight(p => ({ ...p, unit: e.target.value }))}
                  className="w-full cursor-pointer rounded-lg border border-neutral-gray-light px-3 py-2 text-sm focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600">
                  {WEIGHT_UNITS.map(u => <option key={u} value={u}>{u}</option>)}
                </select>
              </div>
            </div>
          </div>

          <div className="pl-3">
            <label className="block text-sm font-medium text-neutral-black mb-1">User Groups <span className="text-neutral-gray-medium font-normal">({props.innovUserGroups.length}/10 entries max)</span></label>
            <p className="text-xs text-neutral-gray-medium mb-2">List possible users of your innovation</p>
            {props.innovUserGroups.length > 0 && (
              <ul className="mb-3 space-y-1.5">
                {props.innovUserGroups.map((g, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-neutral-black">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-red-600 flex-shrink-0" />
                    <span className="flex-1">{g}</span>
                    <button type="button" onClick={() => props.setInnovUserGroups(p => p.filter((_, j) => j !== i))} className="cursor-pointer text-red-400 hover:text-red-600 flex-shrink-0">
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
            <div className="flex flex-wrap gap-2">
              {INNOVATION_USER_GROUPS.filter(g => !props.innovUserGroups.includes(g)).map(group => (
                <button key={group} type="button"
                  disabled={props.innovUserGroups.length >= 10}
                  onClick={() => props.setInnovUserGroups(p => p.length < 10 ? [...p, group] : p)}
                  className="cursor-pointer px-3 py-1.5 rounded-full text-xs font-medium border border-neutral-gray-light bg-white text-neutral-gray-dark hover:border-brand-red-400 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >+ {group}</button>
              ))}
            </div>
            <div className="mt-3 flex gap-2">
              <input type="text" id="custom-user-group"
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    const input = e.currentTarget;
                    const val = input.value.trim();
                    if (val && !props.innovUserGroups.includes(val) && props.innovUserGroups.length < 10) {
                      props.setInnovUserGroups(p => [...p, val]);
                      input.value = '';
                    }
                  }
                }}
                className="flex-1 rounded-lg border border-neutral-gray-light px-4 py-2 text-sm focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600"
                placeholder="Add a custom user group..." />
              <button type="button"
                onClick={() => {
                  const input = document.getElementById('custom-user-group') as HTMLInputElement;
                  const val = input.value.trim();
                  if (val && !props.innovUserGroups.includes(val) && props.innovUserGroups.length < 10) {
                    props.setInnovUserGroups(p => [...p, val]);
                    input.value = '';
                  }
                }}
                className="flex cursor-pointer items-center gap-1 rounded-lg bg-brand-red-600 text-white px-4 py-2 text-sm font-medium hover:bg-brand-red-700 transition-colors">
                <Plus className="h-4 w-4" /> Add
              </button>
            </div>
          </div>
        </div>
      </div>

      <BulletInput label="Applications & Impact" items={props.innovApplications} setItems={props.setInnovApplications}
        placeholder="e.g. Deployed across 12 states..." description="In what areas can your innovation be used and what impacts can it bring about?" />
      <BulletInput label="Recommendations" items={props.innovRecommendations} setItems={props.setInnovRecommendations}
        placeholder="e.g. Ideal for farms up to 5 hectares" description="How can users get the best out of your innovation?" />
      <BulletInput label="Cautions" items={props.innovCautions} setItems={props.setInnovCautions}
        placeholder="e.g. Not suitable for saltwater environments" description="What important notes should users be aware of when using innovation to prevent hazards and malfunction?" />

      <hr className="border-neutral-gray-light" />

      {docUpload('Licenses & Certifications', props.innovLicenses, props.setInnovLicenses, 'Enter certificate title...',
        'Upload any licenses or certifications that your innovation has (if any). Uploaded documents are securely stored and protected from unauthorized access.')}

      {docUpload('Honorary Awards', props.innovAwards, props.setInnovAwards, 'Enter award title...',
        'Upload any recognition awards that your innovation has received previously (if any). Uploaded documents are securely stored and protected from unauthorized access.')}

      <div>
        <label className="block text-sm font-medium text-neutral-black mb-2">Media Gallery *</label>
        <p className="text-xs text-neutral-gray-medium mb-3">Upload media files (image and video format allowed).</p>
        <div className="grid gap-4 sm:grid-cols-3">
          {GALLERY_CATEGORIES.map(cat => {
            const files = props.innovGallery.filter(f => f.category === cat);
            return (
              <div key={cat} className="rounded-lg border border-neutral-gray-light p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-bold text-neutral-black">{cat}</p>
                  <span className="text-xs text-neutral-gray-medium">{files.length}/{MAX_GALLERY}</span>
                </div>
                <p className="text-[11px] text-neutral-gray-medium mb-3">
                  {cat === 'Working Materials' ? 'Upload file showing the work materials used in building innovation' :
                   cat === 'Work-in-Progress' ? 'Upload media files showing the building process of innovation' :
                   'Upload media files showing the completed/built innovation'}
                </p>
                {files.length > 0 && (
                  <div className="space-y-2 mb-3">
                    {files.map((file, i) => {
                      const gi = props.innovGallery.indexOf(file);
                      return (
                        <div key={i} className="flex items-start gap-2 p-2 rounded-lg border border-neutral-gray-light bg-neutral-bg-light">
                          {file.type === 'video' ? <Film className="h-8 w-8 text-brand-red-600 flex-shrink-0" /> : <ImagePlus className="h-8 w-8 text-brand-red-600 flex-shrink-0" />}
                          <div className="flex-1 min-w-0">
                            <p className="text-xs text-neutral-black truncate">{file.name}</p>
                            <input type="text" value={file.caption}
                              onChange={e => props.setInnovGallery(p => p.map((f, j) => j === gi ? { ...f, caption: e.target.value } : f))}
                              className="w-full mt-1 rounded border border-neutral-gray-light px-2 py-1 text-[11px] focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600" placeholder="Add caption..." />
                          </div>
                          <button onClick={() => props.setInnovGallery(p => p.filter((_, j) => j !== gi))} className="cursor-pointer text-red-400 hover:text-red-600 flex-shrink-0">
                            <X className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
                <button type="button" disabled={files.length >= MAX_GALLERY}
                  onClick={() => props.setInnovGallery(p => p.length >= 9 ? p : [...p, { category: cat, type: 'image', name: `Media_${Date.now()}.jpg`, caption: '' }])}
                  className="inline-flex cursor-pointer w-full items-center justify-center gap-1 rounded-lg border border-dashed border-brand-red-300 px-3 py-2 text-xs font-medium text-brand-red-600 hover:bg-brand-red-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
                  <Upload className="h-3.5 w-3.5" /> Upload File
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
