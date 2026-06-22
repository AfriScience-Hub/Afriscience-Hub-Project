'use client';

import { useState } from 'react';
import { Check, X, Plus, Upload, FileText, ImagePlus, Film } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  INNOVATION_FIELDS, INNOVATION_STAGES, INNOVATION_INTERESTS,
  INNOVATION_INTERESTS_EMOJI, INNOVATION_OWNERSHIP, INNOVATION_SDGS,
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

export default function InnovationDetailsSection(props: InnovationDetailsSectionProps) {
  const [newMaterial, setNewMaterial] = useState('');

  const addMaterial = () => {
    const t = newMaterial.trim();
    if (t && !props.innovMaterials.includes(t)) {
      props.setInnovMaterials(p => [...p, t]);
      setNewMaterial('');
    }
  };

  const toggleChips = (val: string, arr: string[], updater: (v: string[] | ((p: string[]) => string[])) => void, max: number) => {
    if (arr.includes(val)) { updater(p => p.filter(f => f !== val)); }
    else if (arr.length < max) { updater(p => [...p, val]); }
  };

  const chipGroup = (label: string, options: string[], selected: string[], updater: (v: string[] | ((p: string[]) => string[])) => void, max: number, description?: string) => (
    <div>
      <label className="block text-sm font-medium text-neutral-black mb-1">{label} <span className="text-neutral-gray-medium font-normal">({selected.length}/{max} max.)</span></label>
      {description && <p className="text-xs text-neutral-gray-medium mb-2">{description}</p>}
      <div className="flex flex-wrap gap-2">
        {options.map(opt => {
          const on = selected.includes(opt);
          const dis = !on && selected.length >= max;
          return (
            <button key={opt} type="button" disabled={dis}
              onClick={() => toggleChips(opt, selected, updater, max)}
              className={cn("px-3 py-1.5 rounded-full text-xs font-medium border transition-colors",
                on ? "bg-brand-red-600 text-white border-brand-red-600" :
                dis ? "bg-neutral-bg-light text-neutral-gray-light border-neutral-gray-light cursor-not-allowed" :
                "bg-white text-neutral-gray-dark border-neutral-gray-light hover:border-brand-red-400"
              )}
            >{on && <Check className="h-3 w-3 inline mr-1" />}{opt}</button>
          );
        })}
      </div>
    </div>
  );

  const radioGroup = (label: string, options: string[], selected: string, updater: (v: string) => void, descriptions: Record<string, string>, selLabel: string) => (
    <div>
      <label className="block text-sm font-medium text-neutral-black mb-1">{label} <span className="text-neutral-gray-medium font-normal">(1 selection max)</span></label>
      <p className="text-xs text-neutral-gray-medium mb-2">{selLabel}</p>
      <div className="space-y-2">
        {options.map(opt => (
          <label key={opt} className={cn("flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors",
            selected === opt ? "border-brand-red-600 bg-brand-red-50" : "border-neutral-gray-light hover:border-brand-red-300"
          )}>
            <input type="radio" name={label} checked={selected === opt} onChange={() => updater(opt)} className="mt-0.5 accent-brand-red-600" />
            <div>
              <span className="text-sm font-medium text-neutral-black">{opt}</span>
              {descriptions[opt] && <p className="text-xs text-neutral-gray-medium mt-0.5">{descriptions[opt]}</p>}
            </div>
          </label>
        ))}
      </div>
    </div>
  );

  const bulletList = (label: string, items: string[], setItems: (v: string[] | ((p: string[]) => string[])) => void, placeholder: string, description?: string) => {
    const [val, setVal] = useState('');
    const add = () => { const t = val.trim(); if (t) { setItems(p => [...p, t]); setVal(''); } };
    return (
      <div>
        <label className="block text-sm font-medium text-neutral-black mb-2">{label}</label>
        {description && <p className="text-xs text-neutral-gray-medium mb-2">{description}</p>}
        {items.length > 0 && (
          <ul className="mb-3 space-y-1.5">
            {items.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-neutral-black">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-red-600 flex-shrink-0" />
                <span className="flex-1">{item}</span>
                <button type="button" onClick={() => setItems(p => p.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-600 flex-shrink-0">
                  <X className="h-3.5 w-3.5" />
                </button>
              </li>
            ))}
          </ul>
        )}
        <div className="flex gap-2">
          <input type="text" value={val} onChange={e => setVal(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); add(); } }}
            className="flex-1 rounded-lg border border-neutral-gray-light px-4 py-2 text-sm focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600" placeholder={placeholder} />
          <button type="button" onClick={add}
            className="flex items-center gap-1 rounded-lg bg-brand-red-600 text-white px-4 py-2 text-sm font-medium hover:bg-brand-red-700 transition-colors">
            <Plus className="h-4 w-4" /> Add
          </button>
        </div>
      </div>
    );
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
                <button onClick={() => setItems(p => p.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-600"><X className="h-4 w-4" /></button>
              </div>
            ))}
          </div>
        )}
        <div className="flex gap-2">
          <input type="text" value={docTitle} onChange={e => setDocTitle(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleUpload(); } }}
            className="flex-1 rounded-lg border border-neutral-gray-light px-4 py-2 text-sm focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600" placeholder={placeholder} />
          <button type="button" onClick={handleUpload}
            className="flex items-center gap-1 rounded-lg border border-dashed border-brand-red-300 px-4 py-2 text-sm font-medium text-brand-red-600 hover:bg-brand-red-50 transition-colors">
            <Upload className="h-4 w-4" /> Upload
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {chipGroup('Innovation Field', INNOVATION_FIELDS, props.innovFields, props.setInnovFields, 3)}

      <div>
        <label className="block text-sm font-medium text-neutral-black mb-1">Interests <span className="text-neutral-gray-medium font-normal">({props.innovInterests.length}/3 max.)</span></label>
        <div className="flex flex-wrap gap-2">
          {INNOVATION_INTERESTS.map(interest => {
            const on = props.innovInterests.includes(interest);
            const dis = !on && props.innovInterests.length >= 3;
            const emoji = INNOVATION_INTERESTS_EMOJI[interest]?.emoji || '';
            return (
              <div key={interest} className="group relative">
                <button type="button" disabled={dis}
                  onClick={() => toggleChips(interest, props.innovInterests, props.setInnovInterests, 3)}
                  className={cn("px-3 py-1.5 rounded-full text-xs font-medium border transition-colors flex items-center gap-1",
                    on ? "bg-brand-red-600 text-white border-brand-red-600" :
                    dis ? "bg-neutral-bg-light text-neutral-gray-light border-neutral-gray-light cursor-not-allowed" :
                    "bg-white text-neutral-gray-dark border-neutral-gray-light hover:border-brand-red-400"
                  )}
                >{on && <Check className="h-3 w-3" />}<span>{emoji} {interest}</span></button>
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-neutral-black text-white text-xs rounded-lg shadow-lg whitespace-nowrap z-[100] opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
                  {INTEREST_DESCRIPTIONS[interest]}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-neutral-black" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {radioGroup('Ownership', INNOVATION_OWNERSHIP, props.innovOwnership, props.setInnovOwnership,
        { 'Private': 'What is the ownership identity of innovation?',
          'Government | Public': 'Owned or operated by government',
          'Academic': 'Developed within an academic institution',
          'Mission': 'Driven by a social or religious mission',
          'Corporate': 'Owned by a corporation',
          'Inter-Government': 'Jointly owned by multiple governments',
          'NGO | Charity': 'Owned by a non-profit organization',
          'Other': 'Other ownership structure',
        }, 'What is the ownership identity of innovation?')}

      {radioGroup('Stage', INNOVATION_STAGES, props.innovStage, props.setInnovStage, STAGE_DESCRIPTIONS, '')}

      {chipGroup('SDGs', INNOVATION_SDGS, props.innovSdgs, props.setInnovSdgs, 5, 'Select appropriate sustainable development goals your innovation address.')}

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
                className="flex items-center gap-1 rounded-lg bg-brand-red-600 text-white px-4 py-2 text-sm font-medium hover:bg-brand-red-700 transition-colors">
                <Plus className="h-4 w-4" /> Add
              </button>
            </div>
            {props.innovMaterials.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {props.innovMaterials.map((mat, i) => (
                  <span key={i} className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-brand-red-50 text-brand-red-600 text-xs font-medium">
                    {mat}
                    <button type="button" onClick={() => props.setInnovMaterials(p => p.filter((_, j) => j !== i))}><X className="h-3 w-3" /></button>
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
                  className="w-full rounded-lg border border-neutral-gray-light px-3 py-2 text-sm focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600">
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
                  className="w-full rounded-lg border border-neutral-gray-light px-3 py-2 text-sm focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600">
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
                    <button type="button" onClick={() => props.setInnovUserGroups(p => p.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-600 flex-shrink-0">
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
                  className="px-3 py-1.5 rounded-full text-xs font-medium border border-neutral-gray-light bg-white text-neutral-gray-dark hover:border-brand-red-400 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
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
                className="flex items-center gap-1 rounded-lg bg-brand-red-600 text-white px-4 py-2 text-sm font-medium hover:bg-brand-red-700 transition-colors">
                <Plus className="h-4 w-4" /> Add
              </button>
            </div>
          </div>
        </div>
      </div>

      {bulletList('Applications & Impact', props.innovApplications, props.setInnovApplications, 'e.g. Deployed across 12 states...', 'In what areas can your innovation be used and what impacts can it bring about?')}

      {bulletList('Recommendations', props.innovRecommendations, props.setInnovRecommendations, 'e.g. Ideal for farms up to 5 hectares', 'How can users get the best out of your innovation?')}

      {bulletList('Cautions', props.innovCautions, props.setInnovCautions, 'e.g. Not suitable for saltwater environments', 'What important notes should users be aware of when using innovation to prevent hazards and malfunction?')}

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
                          <button onClick={() => props.setInnovGallery(p => p.filter((_, j) => j !== gi))} className="text-red-400 hover:text-red-600 flex-shrink-0">
                            <X className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
                <button type="button" disabled={files.length >= MAX_GALLERY}
                  onClick={() => props.setInnovGallery(p => p.length >= 9 ? p : [...p, { category: cat, type: 'image', name: `Media_${Date.now()}.jpg`, caption: '' }])}
                  className="inline-flex w-full items-center justify-center gap-1 rounded-lg border border-dashed border-brand-red-300 px-3 py-2 text-xs font-medium text-brand-red-600 hover:bg-brand-red-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
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
