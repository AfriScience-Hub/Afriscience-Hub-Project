'use client';

import { useState } from 'react';
import { X, Plus, Upload, ImagePlus, Film } from 'lucide-react';
import { INNOVATION_USER_GROUPS } from '@/app/data/mockData';
import {
  useInnovationOptionsMap, optionNames, type InnovationOptionType,
} from '@/app/data/innovationOptions';
import {
  MultiSelectField, SingleSelectField, BulletInput, DocSection,
} from './InnovationFormControls';

interface Dimensions { length: string; width: string; height: string; unit: string; }
interface Weight { value: string; unit: string; }
interface GalleryFile { category: string; type: 'image' | 'video'; name: string; file?: File; }
interface LicenseDoc { title: string; issuer: string; date: string; file: string; fileObj?: File; }

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
  innovImpact: string[]; setInnovImpact: (v: string[] | ((p: string[]) => string[])) => void;
  innovRecommendations: string[]; setInnovRecommendations: (v: string[] | ((p: string[]) => string[])) => void;
  innovCautions: string[]; setInnovCautions: (v: string[] | ((p: string[]) => string[])) => void;
  innovLicenses: LicenseDoc[]; setInnovLicenses: (v: LicenseDoc[] | ((p: LicenseDoc[]) => LicenseDoc[])) => void;
  innovAwards: LicenseDoc[]; setInnovAwards: (v: LicenseDoc[] | ((p: LicenseDoc[]) => LicenseDoc[])) => void;
  innovGallery: GalleryFile[]; setInnovGallery: (v: GalleryFile[] | ((p: GalleryFile[]) => GalleryFile[])) => void;
}

const DIMENSION_UNITS = ['mm', 'cm', 'in', 'ft', 'm'];
const DIMENSION_UNIT_PAYLOAD: Record<string, string> = { mm: 'MM', cm: 'CM', in: 'INCH', ft: 'FT', m: 'M' };
const WEIGHT_UNITS = ['mg', 'g', 'oz', 'lb', 'kg', 'tonnes'];
const GALLERY_CATEGORIES = ['Working Materials', 'Work-in-Progress', 'Finished Work'];
const MAX_GALLERY = 3;
const CURRENT_YEAR = new Date().getFullYear();
const YEAR_OPTIONS = Array.from({ length: CURRENT_YEAR - 1900 + 11 }, (_, i) => 1900 + i);

/** Fallback descriptions, used when the option has no note from the API. */
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

export default function InnovationDetailsSection(props: InnovationDetailsSectionProps) {
  const [newMaterial, setNewMaterial] = useState('');
  const [customGroup, setCustomGroup] = useState('');

  // Selectable options come from the backend so the admin can manage them.
  const { options, loading } = useInnovationOptionsMap([
    'FIELD', 'INTEREST', 'STAGE', 'OWNERSHIP', 'SDG',
  ]);

  const names = (type: InnovationOptionType) => optionNames(options[type]);

  /** Descriptions for a type, preferring the note from the API. */
  const descriptions = (type: InnovationOptionType, fallback: Record<string, string>) => {
    const map: Record<string, string> = { ...fallback };
    (options[type] ?? []).forEach((o) => { if (o.notes) map[o.content] = o.notes; });
    return map;
  };

  const addMaterial = () => {
    const t = newMaterial.trim();
    if (t && !props.innovMaterials.includes(t)) {
      props.setInnovMaterials(p => [...p, t]);
      setNewMaterial('');
    }
  };


  return (
    <div className="space-y-6">
      {loading && (
        <p className="flex items-center gap-2 text-xs text-neutral-gray-medium">
          <span className="h-3 w-3 rounded-full border-2 border-neutral-gray-light border-t-brand-red-600 animate-spin" />
          Loading options...
        </p>
      )}
      <MultiSelectField label="Innovation Field" placeholder="Select the best fields your innovation fits into"
        options={names('FIELD')} value={props.innovFields} onChange={props.setInnovFields} max={3} required />
      <MultiSelectField label="Interests" placeholder="Select your interests"
        options={names('INTEREST')} value={props.innovInterests} onChange={props.setInnovInterests} max={3} required
        descriptions={descriptions('INTEREST', INTEREST_DESCRIPTIONS)} />
      <SingleSelectField label="Ownership" placeholder="What is the ownership identity of innovation?"
        options={names('OWNERSHIP')} value={props.innovOwnership} onChange={props.setInnovOwnership} required
        descriptions={descriptions('OWNERSHIP', OWNERSHIP_DESCRIPTIONS)} />
      <SingleSelectField label="Stage" placeholder="Select innovation stage"
        options={names('STAGE')} value={props.innovStage} onChange={props.setInnovStage} required
        descriptions={descriptions('STAGE', STAGE_DESCRIPTIONS)} />
      <MultiSelectField label="SDGs" placeholder="Select appropriate sustainable development goals your innovation address"
        options={names('SDG')} value={props.innovSdgs} onChange={props.setInnovSdgs} max={5} required />

      <hr className="border-neutral-gray-light" />

      <div>
        <label className="block text-sm font-medium text-neutral-black mb-1">Specifications <span className="text-red-500">*</span></label>
        <div className="space-y-4 pl-2 border-l-2 border-brand-red-200">
          <div className="pl-3">
            <label className="block text-sm font-medium text-neutral-black mb-1">Materials</label>
            <p className="text-xs text-neutral-gray-medium mb-2">State some materials used in innovation</p>
            <div className="flex gap-2 mb-2">
              <input type="text" value={newMaterial} onChange={e => setNewMaterial(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addMaterial(); } }}
                className="flex-1 rounded-lg border border-neutral-gray-light px-4 py-2 text-sm focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600" placeholder="e.g. plastic, aluminum, rubber" />
              <button type="button" onClick={addMaterial} disabled={!newMaterial.trim()}
                className="flex cursor-pointer items-center gap-1 rounded-lg bg-brand-red-600 text-white px-4 py-2 text-sm font-medium hover:bg-brand-red-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
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
                  <input type="number" step="any" min="0" value={props.innovDimensions[dim] || ''}
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
                <input type="number" step="any" min="0" value={props.innovWeight.value || ''}
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
        </div>
      </div>

        <div>
          <label className="block text-sm font-medium text-neutral-black mb-1">User Groups <span className="text-red-500">*</span> <span className="text-neutral-gray-medium font-normal">({props.innovUserGroups.length}/10 entries max)</span></label>
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
            <input type="text" id="custom-user-group" value={customGroup}
              onChange={e => setCustomGroup(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  const val = customGroup.trim();
                  if (val && !props.innovUserGroups.includes(val) && props.innovUserGroups.length < 10) {
                    props.setInnovUserGroups(p => [...p, val]);
                    setCustomGroup('');
                  }
                }
              }}
              className="flex-1 rounded-lg border border-neutral-gray-light px-4 py-2 text-sm focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600"
              placeholder="Add a custom user group..." />
            <button type="button" disabled={!customGroup.trim()}
              onClick={() => {
                const val = customGroup.trim();
                if (val && !props.innovUserGroups.includes(val) && props.innovUserGroups.length < 10) {
                  props.setInnovUserGroups(p => [...p, val]);
                  setCustomGroup('');
                }
              }}
              className="flex cursor-pointer items-center gap-1 rounded-lg bg-brand-red-600 text-white px-4 py-2 text-sm font-medium hover:bg-brand-red-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
              <Plus className="h-4 w-4" /> Add
            </button>
          </div>
        </div>

      <BulletInput label="Applications" items={props.innovApplications} setItems={props.setInnovApplications}
        placeholder="e.g. Used as a coolant in jet engines" description="In what areas can your innovation be used" required />
      <BulletInput label="Impact" items={props.innovImpact} setItems={props.setInnovImpact}
        placeholder="e.g. increased yield by 20%" description="What are the positive effects of your innovation" required />
      <BulletInput label="Recommendations" items={props.innovRecommendations} setItems={props.setInnovRecommendations}
        placeholder="e.g. store in a cool dry place" description="How can users get the best out of your innovation?" required />
      <BulletInput label="Cautions" items={props.innovCautions} setItems={props.setInnovCautions}
        placeholder="e.g. Not suitable for saltwater environments" description="What important notes should users be aware of when using innovation to prevent hazards and malfunction?" required />

      <hr className="border-neutral-gray-light" />

      <DocSection title="Licenses & Certifications" items={props.innovLicenses} setItems={props.setInnovLicenses}
        desc="To further authenticate your innovation, upload any licenses or certifications that your innovation has (if any). Uploaded documents are securely stored and protected from unauthorized access." />

      <DocSection title="Honorary Awards" items={props.innovAwards} setItems={props.setInnovAwards}
        desc="To further authenticate your innovation, upload any recognition awards that your innovation has received previously (if any). Uploaded documents are securely stored and protected from unauthorized access." />

      <div>
        <label className="block text-sm font-medium text-neutral-black mb-2">Media Gallery <span className="text-red-500">*</span></label>
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
                        <div key={i} className="rounded-lg border border-neutral-gray-light bg-neutral-bg-light p-2">
                          <div className="flex items-start gap-2">
                            {file.type === 'video' ? <Film className="h-8 w-8 text-brand-red-600 flex-shrink-0" /> : <ImagePlus className="h-8 w-8 text-brand-red-600 flex-shrink-0" />}
                            <p className="flex-1 truncate text-xs text-neutral-black pt-1">{file.name}</p>
                            <button onClick={() => props.setInnovGallery(p => p.filter((_, j) => j !== gi))} className="cursor-pointer text-red-400 hover:text-red-600 flex-shrink-0">
                              <X className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
                <input type="file" accept="image/*,video/*" className="hidden" id={`gallery-${cat}`}
                  onChange={e => {
                    // Staged locally — uploaded only when the form is submitted.
                    const file = e.target.files?.[0];
                    if (file && props.innovGallery.length < 9) {
                      props.setInnovGallery(p => [...p, { category: cat, type: file.type.startsWith('video') ? 'video' : 'image', name: file.name, file }]);
                    }
                    e.target.value = '';
                  }} />
                <button type="button" disabled={files.length >= MAX_GALLERY}
                  onClick={() => document.getElementById(`gallery-${cat}`)?.click()}
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
