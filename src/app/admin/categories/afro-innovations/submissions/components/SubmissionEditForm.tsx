'use client';

import type { SubmissionRecord } from '../data';

interface Props {
  value: SubmissionRecord;
  onChange: (v: SubmissionRecord) => void;
}

const inputCls = 'w-full px-3 py-2 rounded-lg border border-neutral-gray-light text-sm focus:ring-2 focus:ring-[#453DD8] focus:border-[#453DD8] outline-none';
const labelCls = 'block text-[11px] font-semibold text-neutral-gray-medium uppercase mb-1';
const cardCls = 'rounded-xl border border-neutral-gray-light bg-white p-4 space-y-3';

export default function SubmissionEditForm({ value, onChange }: Props) {
  const inn = value.innovation;
  const inv = value.innovator;

  const setInn = (patch: Partial<typeof inn>) => onChange({ ...value, innovation: { ...inn, ...patch } });
  const setInv = (patch: Partial<typeof inv>) => onChange({ ...value, innovator: { ...inv, ...patch } });
  const joinList = (v: string) => v.split(',').map((s) => s.trim()).filter(Boolean);
  const joinLines = (v: string) => v.split('\n').map((s) => s.trim()).filter(Boolean);

  return (
    <div className="space-y-4">
      <div className={cardCls}>
        <h3 className="text-sm font-bold text-neutral-black">Innovation Identity</h3>
        <div className="grid sm:grid-cols-2 gap-3">
          <label className="block"><span className={labelCls}>Name</span><input className={inputCls} value={inn.name} onChange={(e) => setInn({ name: e.target.value })} /></label>
          <label className="block"><span className={labelCls}>Country</span><input className={inputCls} value={inn.country} onChange={(e) => setInn({ country: e.target.value })} /></label>
        </div>
        <label className="block"><span className={labelCls}>Short Description</span><textarea rows={2} className={inputCls} value={inn.description} onChange={(e) => setInn({ description: e.target.value })} /></label>
      </div>

      <div className={cardCls}>
        <h3 className="text-sm font-bold text-neutral-black">Innovation Details</h3>
        <div className="grid sm:grid-cols-3 gap-3">
          <label className="block"><span className={labelCls}>Field</span><input className={inputCls} value={inn.field} onChange={(e) => setInn({ field: e.target.value })} /></label>
          <label className="block"><span className={labelCls}>Stage</span><input className={inputCls} value={inn.stage} onChange={(e) => setInn({ stage: e.target.value })} /></label>
          <label className="block"><span className={labelCls}>Ownership</span><input className={inputCls} value={inn.ownership} onChange={(e) => setInn({ ownership: e.target.value })} /></label>
        </div>
        <label className="block"><span className={labelCls}>Specification</span><textarea rows={2} className={inputCls} value={inn.specification} onChange={(e) => setInn({ specification: e.target.value })} /></label>
        <div className="grid sm:grid-cols-2 gap-3">
          <label className="block"><span className={labelCls}>Materials (comma separated)</span><input className={inputCls} value={inn.materials.join(', ')} onChange={(e) => setInn({ materials: joinList(e.target.value) })} /></label>
          <label className="block"><span className={labelCls}>SDGs (comma separated)</span><input className={inputCls} value={inn.sdgs.join(', ')} onChange={(e) => setInn({ sdgs: joinList(e.target.value) })} /></label>
          <label className="block"><span className={labelCls}>Interests (comma separated)</span><input className={inputCls} value={inn.interests.join(', ')} onChange={(e) => setInn({ interests: joinList(e.target.value) })} /></label>
          <label className="block"><span className={labelCls}>User Groups (comma separated)</span><input className={inputCls} value={inn.userGroups.join(', ')} onChange={(e) => setInn({ userGroups: joinList(e.target.value) })} /></label>
          <label className="block"><span className={labelCls}>Dimensions</span><input className={inputCls} value={inn.dimensions} onChange={(e) => setInn({ dimensions: e.target.value })} /></label>
          <label className="block"><span className={labelCls}>Weight</span><input className={inputCls} value={inn.weight} onChange={(e) => setInn({ weight: e.target.value })} /></label>
        </div>
        <label className="block"><span className={labelCls}>Applications (one per line)</span><textarea rows={2} className={inputCls} value={inn.applications.join('\n')} onChange={(e) => setInn({ applications: joinLines(e.target.value) })} /></label>
        <label className="block"><span className={labelCls}>Impact (one per line)</span><textarea rows={2} className={inputCls} value={inn.impact.join('\n')} onChange={(e) => setInn({ impact: joinLines(e.target.value) })} /></label>
        <label className="block"><span className={labelCls}>Recommendations (one per line)</span><textarea rows={2} className={inputCls} value={inn.recommendations.join('\n')} onChange={(e) => setInn({ recommendations: joinLines(e.target.value) })} /></label>
        <label className="block"><span className={labelCls}>Cautions (one per line)</span><textarea rows={2} className={inputCls} value={inn.cautions.join('\n')} onChange={(e) => setInn({ cautions: joinLines(e.target.value) })} /></label>
      </div>

      <div className={cardCls}>
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
