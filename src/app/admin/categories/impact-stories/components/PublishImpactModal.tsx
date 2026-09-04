'use client';

import { useEffect, useState } from 'react';
import { X, Plus, Trash2, IdCard, Lightbulb, User, BarChart3, Clock, Camera } from 'lucide-react';
import { toast } from 'sonner';
import type { ImpactStory, ImpactProgram, ImpactStatus, TimelinePhase } from '@/app/data/impactData';
import { IMPACT_PROGRAMS, IMPACT_STATUSES, IMPACT_YEARS, IMPACT_COUNTRIES } from '@/app/data/impactData';
import CollapsibleSection from '@/app/dashboard/upload-new-listing/components/CollapsibleSection';
import UploadDropzone from './UploadDropzone';
import MediaGalleryEditor from './MediaGalleryEditor';

type DraftStory = Omit<ImpactStory, 'id'> & { id: string };

function emptyDraft(): DraftStory {
  return {
    id: `impact-${Date.now()}`,
    program: 'Career Support',
    status: 'Active',
    idTag: '',
    image: '',
    year: String(new Date().getFullYear()),
    location: { stateRegion: '', country: '' },
    summary: '',
    fundsUtilized: '',
    beneficiaries: 0,
    story: '',
    people: [{ name: '', image: '', role: '', socials: {} }],
    timeline: [{ title: '', bullets: [''] }],
    mediaGallery: [],
    careerPath: '',
    companyName: '',
    noOfOwners: 1,
    researchLevel: '',
    researchTitle: '',
    noOfResearchers: 1,
    scholarshipLevel: '',
    departmentName: '',
    initialCgpa: '',
  };
}

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (story: ImpactStory) => void;
  initial?: ImpactStory | null;
}

export default function PublishImpactModal({ open, onClose, onSave, initial }: Props) {
  const [draft, setDraft] = useState<DraftStory>(emptyDraft());
  const [breakdownBullets, setBreakdownBullets] = useState<string[]>(['']);

  useEffect(() => {
    if (open) {
      if (initial) setDraft({ ...initial });
      else setDraft(emptyDraft());
      setBreakdownBullets(['']);
    }
  }, [open, initial]);

  if (!open) return null;

  const handleSave = () => {
    if (!draft.idTag.trim() || !draft.summary.trim() || !draft.story.trim()) {
      toast.error('Please fill Id Tag, Summary and Story');
      return;
    }
    if (!draft.image) {
      toast.error('Please upload or provide an image');
      return;
    }
    onSave(draft as ImpactStory);
    toast.success(initial ? 'Story updated' : 'Story published');
    onClose();
  };

  const update = (patch: Partial<DraftStory>) => setDraft((p) => ({ ...p, ...patch }));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-neutral-bg-light rounded-2xl shadow-2xl w-full max-w-4xl my-8 flex flex-col max-h-[90vh]">
        <div className="px-6 py-4 bg-white rounded-t-2xl border-b border-neutral-gray-light flex items-center justify-between shrink-0">
          <div>
            <h2 className="text-base font-bold text-neutral-black">{initial ? 'Edit Impact Story' : 'Publish Impact Story'}</h2>
            <p className="text-xs text-neutral-gray-medium">All fields mirror the public impact detail structure. Funds is free text.</p>
          </div>
          <button onClick={onClose} className="h-9 w-9 rounded-full bg-neutral-bg-light hover:bg-neutral-gray-light flex items-center justify-center cursor-pointer">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <CollapsibleSection title="Infographic & Basics" icon={<IdCard className="h-5 w-5 text-brand-red-600" />} defaultOpen>
            <div className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <label className="space-y-1">
                  <span className="text-xs font-semibold text-neutral-black">Program *</span>
                  <select value={draft.program} onChange={(e) => update({ program: e.target.value as ImpactProgram })} className="w-full px-3 py-2.5 rounded-xl border border-neutral-gray-light text-sm focus:ring-2 focus:ring-brand-navy-900 outline-none bg-white">
                    {IMPACT_PROGRAMS.map((p) => <option key={p} value={p}>{p}</option>)}
                  </select>
                </label>
                <label className="space-y-1">
                  <span className="text-xs font-semibold text-neutral-black">Status *</span>
                  <select value={draft.status} onChange={(e) => update({ status: e.target.value as ImpactStatus })} className="w-full px-3 py-2.5 rounded-xl border border-neutral-gray-light text-sm focus:ring-2 focus:ring-brand-navy-900 outline-none bg-white">
                    {IMPACT_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </label>
                <label className="space-y-1">
                  <span className="text-xs font-semibold text-neutral-black">ID Tag *</span>
                  <input value={draft.idTag} onChange={(e) => update({ idTag: e.target.value })} placeholder="ASH-CS-2024-001" className="w-full px-3 py-2.5 rounded-xl border border-neutral-gray-light text-sm focus:ring-2 focus:ring-brand-navy-900 outline-none bg-white" />
                </label>
                <label className="space-y-1">
                  <span className="text-xs font-semibold text-neutral-black">Year *</span>
                  <select value={draft.year} onChange={(e) => update({ year: e.target.value })} className="w-full px-3 py-2.5 rounded-xl border border-neutral-gray-light text-sm focus:ring-2 focus:ring-brand-navy-900 outline-none bg-white">
                    {IMPACT_YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
                  </select>
                </label>
                <label className="space-y-1">
                  <span className="text-xs font-semibold text-neutral-black">State / Region</span>
                  <input value={draft.location.stateRegion} onChange={(e) => update({ location: { ...draft.location, stateRegion: e.target.value } })} placeholder="Lagos" className="w-full px-3 py-2.5 rounded-xl border border-neutral-gray-light text-sm focus:ring-2 focus:ring-brand-navy-900 outline-none bg-white" />
                </label>
                <label className="space-y-1">
                  <span className="text-xs font-semibold text-neutral-black">Country</span>
                  <select value={draft.location.country} onChange={(e) => update({ location: { ...draft.location, country: e.target.value } })} className="w-full px-3 py-2.5 rounded-xl border border-neutral-gray-light text-sm focus:ring-2 focus:ring-brand-navy-900 outline-none bg-white">
                    <option value="">Select Country</option>
                    {IMPACT_COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </label>
                <label className="space-y-1">
                  <span className="text-xs font-semibold text-neutral-black">Funds Utilized (free text)</span>
                  <input value={draft.fundsUtilized} onChange={(e) => update({ fundsUtilized: e.target.value })} placeholder="$6,200 or 6000 USD + in-kind" className="w-full px-3 py-2.5 rounded-xl border border-neutral-gray-light text-sm focus:ring-2 focus:ring-brand-navy-900 outline-none bg-white" />
                </label>
                <label className="space-y-1">
                  <span className="text-xs font-semibold text-neutral-black">Beneficiaries</span>
                  <input type="number" value={draft.beneficiaries} onChange={(e) => update({ beneficiaries: Number(e.target.value) })} className="w-full px-3 py-2.5 rounded-xl border border-neutral-gray-light text-sm focus:ring-2 focus:ring-brand-navy-900 outline-none bg-white" />
                </label>
              </div>

              <UploadDropzone label="Cover Image *" value={draft.image} onChange={(url) => update({ image: url })} />

              {draft.program === 'Career Support' && (
                <div className="grid sm:grid-cols-3 gap-4 p-3 rounded-xl bg-blue-50/50 border border-blue-100">
                  <input placeholder="Career Path" value={draft.careerPath ?? ''} onChange={(e) => update({ careerPath: e.target.value })} className="px-3 py-2.5 rounded-lg border border-neutral-gray-light text-sm bg-white outline-none" />
                  <input placeholder="Company Name" value={draft.companyName ?? ''} onChange={(e) => update({ companyName: e.target.value })} className="px-3 py-2.5 rounded-lg border border-neutral-gray-light text-sm bg-white outline-none" />
                  <input type="number" placeholder="No. of Owners" value={draft.noOfOwners ?? 1} onChange={(e) => update({ noOfOwners: Number(e.target.value) })} className="px-3 py-2.5 rounded-lg border border-neutral-gray-light text-sm bg-white outline-none" />
                </div>
              )}
              {draft.program === 'Research Support' && (
                <div className="grid sm:grid-cols-3 gap-4 p-3 rounded-xl bg-purple-50/50 border border-purple-100">
                  <input placeholder="Research Title" value={draft.researchTitle ?? ''} onChange={(e) => update({ researchTitle: e.target.value })} className="px-3 py-2.5 rounded-lg border border-neutral-gray-light text-sm bg-white outline-none" />
                  <input placeholder="Research Level" value={draft.researchLevel ?? ''} onChange={(e) => update({ researchLevel: e.target.value })} className="px-3 py-2.5 rounded-lg border border-neutral-gray-light text-sm bg-white outline-none" />
                  <input type="number" placeholder="No. of Researchers" value={draft.noOfResearchers ?? 1} onChange={(e) => update({ noOfResearchers: Number(e.target.value) })} className="px-3 py-2.5 rounded-lg border border-neutral-gray-light text-sm bg-white outline-none" />
                </div>
              )}
              {draft.program === 'Educational Scholarship' && (
                <div className="grid sm:grid-cols-3 gap-4 p-3 rounded-xl bg-amber-50/50 border border-amber-100">
                  <input placeholder="Scholarship Level" value={draft.scholarshipLevel ?? ''} onChange={(e) => update({ scholarshipLevel: e.target.value })} className="px-3 py-2.5 rounded-lg border border-neutral-gray-light text-sm bg-white outline-none" />
                  <input placeholder="Department" value={draft.departmentName ?? ''} onChange={(e) => update({ departmentName: e.target.value })} className="px-3 py-2.5 rounded-lg border border-neutral-gray-light text-sm bg-white outline-none" />
                  <input placeholder="Initial CGPA" value={draft.initialCgpa ?? ''} onChange={(e) => update({ initialCgpa: e.target.value })} className="px-3 py-2.5 rounded-lg border border-neutral-gray-light text-sm bg-white outline-none" />
                </div>
              )}
            </div>
          </CollapsibleSection>

          <CollapsibleSection title="Owner / People Information" icon={<User className="h-5 w-5 text-brand-red-600" />} defaultOpen={false}>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-xs text-neutral-gray-medium">Add owners, researchers or beneficiaries. Shown on detail page.</p>
                <button type="button" onClick={() => update({ people: [...draft.people, { name: '', image: '', role: '', socials: {} }] })} className="inline-flex items-center gap-1 text-xs font-semibold text-brand-navy-900 hover:underline cursor-pointer"><Plus className="h-3.5 w-3.5" />Add Person</button>
              </div>
              {draft.people.map((p, idx) => (
                <div key={idx} className="rounded-xl border border-neutral-gray-light p-3 bg-neutral-bg-light/40 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold">Person {idx + 1}</span>
                    {draft.people.length > 1 && (
                      <button type="button" onClick={() => update({ people: draft.people.filter((_, i) => i !== idx) })} className="text-red-600 hover:text-red-700 cursor-pointer"><Trash2 className="h-4 w-4" /></button>
                    )}
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <input placeholder="Full Name" value={p.name} onChange={(e) => { const n=[...draft.people]; n[idx]={...n[idx], name:e.target.value}; update({people:n}); }} className="px-3 py-2 rounded-lg border border-neutral-gray-light text-sm bg-white outline-none" />
                    <input placeholder="Role (optional)" value={p.role ?? ''} onChange={(e) => { const n=[...draft.people]; n[idx]={...n[idx], role:e.target.value}; update({people:n}); }} className="px-3 py-2 rounded-lg border border-neutral-gray-light text-sm bg-white outline-none" />
                  </div>
                  <UploadDropzone label="Photo" value={p.image} onChange={(url) => { const n=[...draft.people]; n[idx]={...n[idx], image:url}; update({people:n}); }} />
                  <div className="grid grid-cols-2 gap-2">
                    <input placeholder="LinkedIn URL" value={p.socials?.linkedin ?? ''} onChange={(e) => { const n=[...draft.people]; n[idx]={...n[idx], socials:{...n[idx].socials, linkedin:e.target.value}}; update({people:n}); }} className="px-3 py-2 rounded-lg border border-neutral-gray-light text-xs bg-white outline-none" />
                    <input placeholder="Twitter URL" value={p.socials?.twitter ?? ''} onChange={(e) => { const n=[...draft.people]; n[idx]={...n[idx], socials:{...n[idx].socials, twitter:e.target.value}}; update({people:n}); }} className="px-3 py-2 rounded-lg border border-neutral-gray-light text-xs bg-white outline-none" />
                  </div>
                </div>
              ))}
            </div>
          </CollapsibleSection>

          <CollapsibleSection title="Impact Summary & Story" icon={<Lightbulb className="h-5 w-5 text-brand-red-600" />} defaultOpen={false}>
            <div className="space-y-4">
              <label className="block space-y-1">
                <span className="text-xs font-bold text-neutral-black">Impact Summary *</span>
                <textarea value={draft.summary} onChange={(e) => update({ summary: e.target.value })} rows={3} placeholder="Short summary shown on card and detail header" className="w-full px-3 py-2.5 rounded-xl border border-neutral-gray-light text-sm focus:ring-2 focus:ring-brand-navy-900 outline-none resize-none bg-white" />
              </label>
              <label className="block space-y-1">
                <span className="text-xs font-bold text-neutral-black">Story *</span>
                <textarea value={draft.story} onChange={(e) => update({ story: e.target.value })} rows={6} placeholder="Full narrative..." className="w-full px-3 py-2.5 rounded-xl border border-neutral-gray-light text-sm focus:ring-2 focus:ring-brand-navy-900 outline-none resize-none bg-white" />
              </label>
            </div>
          </CollapsibleSection>

          <CollapsibleSection title="Impact Breakdown" icon={<BarChart3 className="h-5 w-5 text-brand-red-600" />} defaultOpen={false}>
            <div className="space-y-3">
              <p className="text-xs text-neutral-gray-medium">Add bullet points that will render as colored breakdown sections on the detail page.</p>
              {breakdownBullets.map((b, i) => (
                <div key={i} className="flex gap-2">
                  <input value={b} onChange={(e) => { const n=[...breakdownBullets]; n[i]=e.target.value; setBreakdownBullets(n); }} placeholder={`Bullet ${i+1}`} className="flex-1 px-3 py-2.5 rounded-xl border border-neutral-gray-light text-sm focus:ring-2 focus:ring-brand-navy-900 outline-none bg-white" />
                  <button type="button" onClick={() => setBreakdownBullets((p) => p.filter((_, idx) => idx !== i))} className="h-10 w-10 rounded-xl border border-neutral-gray-light hover:bg-red-50 text-red-600 flex items-center justify-center cursor-pointer bg-white"><Trash2 className="h-4 w-4" /></button>
                </div>
              ))}
              <button type="button" onClick={() => setBreakdownBullets((p) => [...p, ''])} className="inline-flex items-center gap-1 text-xs font-semibold text-brand-navy-900 hover:underline cursor-pointer"><Plus className="h-3.5 w-3.5" />Add bullet</button>
            </div>
          </CollapsibleSection>

          <CollapsibleSection title="Timeline" icon={<Clock className="h-5 w-5 text-brand-red-600" />} defaultOpen={false}>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-xs text-neutral-gray-medium">Phases shown vertically on detail page.</p>
                <button type="button" onClick={() => update({ timeline: [...draft.timeline, { title: '', bullets: [''] }] })} className="inline-flex items-center gap-1 text-xs font-semibold text-brand-navy-900 hover:underline cursor-pointer"><Plus className="h-3.5 w-3.5" />Add Phase</button>
              </div>
              {draft.timeline.map((phase, pIdx) => (
                <div key={pIdx} className="rounded-xl border border-neutral-gray-light p-3 space-y-2 bg-neutral-bg-light/40">
                  <div className="flex gap-2">
                    <input value={phase.title} onChange={(e) => { const n=[...draft.timeline] as TimelinePhase[]; n[pIdx]={...n[pIdx], title:e.target.value}; update({timeline:n}); }} placeholder="Phase title e.g. Funding & Setup" className="flex-1 px-3 py-2 rounded-lg border border-neutral-gray-light text-sm bg-white outline-none" />
                    <button type="button" onClick={() => update({ timeline: draft.timeline.filter((_, i) => i !== pIdx) })} className="h-9 w-9 rounded-lg bg-red-50 text-red-600 flex items-center justify-center cursor-pointer"><Trash2 className="h-4 w-4" /></button>
                  </div>
                  {phase.bullets.map((bullet, bIdx) => (
                    <div key={bIdx} className="flex gap-2">
                      <input value={bullet} onChange={(e) => { const n=[...draft.timeline] as TimelinePhase[]; n[pIdx].bullets[bIdx]=e.target.value; update({timeline:[...n]}); }} placeholder="Bullet point" className="flex-1 px-3 py-2 rounded-lg border border-neutral-gray-light text-xs bg-white outline-none" />
                      <button type="button" onClick={() => { const n=[...draft.timeline] as TimelinePhase[]; n[pIdx].bullets = n[pIdx].bullets.filter((_, i) => i !== bIdx); update({timeline:[...n]}); }} className="px-2 text-red-600 cursor-pointer"><X className="h-4 w-4" /></button>
                    </div>
                  ))}
                  <button type="button" onClick={() => { const n=[...draft.timeline] as TimelinePhase[]; n[pIdx].bullets.push(''); update({timeline:[...n]}); }} className="text-xs font-medium text-brand-navy-900 hover:underline cursor-pointer">+ Add bullet</button>
                </div>
              ))}
            </div>
          </CollapsibleSection>

          <CollapsibleSection title="Media Gallery" icon={<Camera className="h-5 w-5 text-brand-red-600" />} defaultOpen={false}>
            <MediaGalleryEditor value={draft.mediaGallery} onChange={(v) => update({ mediaGallery: v })} />
          </CollapsibleSection>
        </div>

        <div className="px-6 py-4 bg-white rounded-b-2xl border-t border-neutral-gray-light flex items-center justify-end gap-2 shrink-0">
          <button onClick={onClose} className="px-4 py-2 rounded-xl border border-neutral-gray-light text-sm font-medium hover:bg-neutral-bg-light cursor-pointer bg-white">Cancel</button>
          <button onClick={handleSave} className="px-6 py-2 rounded-xl bg-brand-red-600 text-white text-sm font-semibold hover:bg-brand-red-700 cursor-pointer">{initial ? 'Update Story' : 'Publish Story'}</button>
        </div>
      </div>
    </div>
  );
}
