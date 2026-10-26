'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Plus, Upload, FileText, ChevronDown, Info } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

export interface LicenseDoc { title: string; issuer: string; date: string; file: string; fileObj?: File; }

const CURRENT_YEAR = new Date().getFullYear();
const YEAR_OPTIONS = Array.from({ length: CURRENT_YEAR - 1900 + 11 }, (_, i) => 1900 + i);
export function OptionInfo({ text }: { text: string }) {
  const [pos, setPos] = useState<{ left: number; top: number } | null>(null);

  useEffect(() => {
    if (!pos) return;
    const onScroll = () => setPos(null);
    window.addEventListener('scroll', onScroll, true);
    return () => window.removeEventListener('scroll', onScroll, true);
  }, [pos]);

  const toggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (pos) { setPos(null); return; }
    const r = e.currentTarget.getBoundingClientRect();
    setPos({ left: Math.min(r.right + 8, window.innerWidth - 236), top: Math.max(8, r.top - 10) });
  };

  return (
    <span className="inline-flex cursor-pointer items-center"
      onClick={toggle}
      onBlur={() => setPos(null)} tabIndex={0} role="button" aria-label="More info">
      <Info size={14} className="text-blue-400" />
      {pos && createPortal(
        <span className="pointer-events-none fixed z-[9999] w-56 rounded-lg bg-neutral-black px-3 py-2 text-left text-[10px] font-medium leading-4 text-white shadow-lg"
          style={{ left: pos.left, top: pos.top }}>{text}</span>, document.body)}
    </span>
  );
}

export function MultiSelectField({ label, placeholder, options, value, onChange, max, required, tooltips, descriptions }: {
  label: string; placeholder: string; options: string[]; value: string[];
  onChange: (v: string[] | ((p: string[]) => string[])) => void; max: number;
  required?: boolean; tooltips?: Record<string, string>; descriptions?: Record<string, string>;
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
        className="flex min-h-10 w-full cursor-pointer items-center justify-between gap-3 rounded-lg border border-neutral-gray-light bg-white px-4 py-2 text-left outline-none focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600">
        <span className={`min-w-0 flex-1 truncate text-xs sm:text-sm ${value.length ? 'text-neutral-black' : 'text-neutral-gray-medium'}`}>{value.length ? value.join(', ') : placeholder}</span>
        <ChevronDown size={15} className={`shrink-0 text-neutral-gray-medium transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      <p className="mt-1 text-[11px] text-neutral-gray-medium sm:text-xs">{value.length}/{max} selected</p>
      {open && (
        <div className="mt-2 max-h-60 overflow-y-auto rounded-lg border border-neutral-gray-light bg-white p-2 shadow-sm">
          {options.map(opt => {
            const checked = value.includes(opt);
            const disabled = !checked && value.length >= max;
            return (
              <label key={opt} className={`flex cursor-pointer items-start justify-between gap-3 rounded-md px-3 py-2 text-sm ${disabled ? 'text-neutral-gray-light' : 'text-neutral-gray-dark hover:bg-brand-red-50'}`}>
                <span className="flex min-w-0 flex-col gap-0.5">
                  <span className="flex items-center gap-2">
                    <input type="checkbox" checked={checked} disabled={disabled} onChange={() => toggle(opt)} className="mt-0.5 h-3.5 w-3.5 rounded accent-brand-red-600" />
                    <span>{opt}</span>
                  </span>
                  {descriptions?.[opt] && <span className="ml-5 text-[10px] text-neutral-gray-medium font-normal">{descriptions[opt]}</span>}
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

export function SingleSelectField({ label, placeholder, options, value, onChange, required, tooltips, descriptions, prices }: {
  label: string; placeholder: string; options: string[]; value: string;
  onChange: (v: string) => void; required?: boolean; tooltips?: Record<string, string>; descriptions?: Record<string, string>;
  /** Price per option, shown at the right end of the row (STAGE options). */
  prices?: Record<string, string>;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => { if (!open) return; const handler = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); }; document.addEventListener('mousedown', handler); return () => document.removeEventListener('mousedown', handler); }, [open]);
  return (
    <div ref={ref}>
      <label className="mb-2 block text-sm font-medium text-neutral-black">{label} {required && <span className="text-red-500">*</span>}</label>
      <button type="button" onClick={() => setOpen(v => !v)}
        className="flex min-h-10 w-full cursor-pointer items-center justify-between gap-3 rounded-lg border border-neutral-gray-light bg-white px-4 py-2 text-left outline-none focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600">
        <span className={`min-w-0 flex-1 truncate text-xs sm:text-sm ${value ? 'text-neutral-black' : 'text-neutral-gray-medium'}`}>{value || placeholder}</span>
        <ChevronDown size={15} className={`shrink-0 text-neutral-gray-medium transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="mt-2 max-h-60 overflow-y-auto rounded-lg border border-neutral-gray-light bg-white p-2 shadow-sm">
          {options.map(opt => (
            <button key={opt} type="button" onClick={() => { onChange(opt); setOpen(false); }}
              className={`flex w-full cursor-pointer flex-col rounded-md px-3 py-2 text-sm text-left hover:bg-brand-red-50 ${value === opt ? 'font-semibold text-brand-red-600' : 'text-neutral-gray-dark'}`}>
              <span className="flex items-center justify-between gap-3">
                <span className="truncate">{opt}</span>
                <span className="flex shrink-0 items-center gap-2">
                  {prices?.[opt] && (
                    <span className="text-xs font-semibold text-brand-navy-900">Price: {formatPrice(prices[opt])}</span>
                  )}
                  {tooltips?.[opt] ? <OptionInfo text={tooltips[opt]} /> : null}
                </span>
              </span>
              {descriptions?.[opt] && <span className="text-[10px] text-neutral-gray-medium font-normal mt-0.5">{descriptions[opt]}</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function BulletInput({ label, items, setItems, placeholder, description, required }: {
  label: string; items: string[]; setItems: (v: string[] | ((p: string[]) => string[])) => void;
  placeholder: string; description?: string; required?: boolean;
}) {
  const [input, setInput] = useState('');
  const hasUnsaved = input.trim().length > 0;
  const add = () => { const t = input.trim(); if (t) { setItems(p => [...p, t]); setInput(''); } };
  return (
    <div className="rounded-lg border border-dashed border-neutral-gray-light p-4">
      <div className="mb-2">
        <label className="block text-sm font-medium text-neutral-black">
          {label}{required && <span className="text-red-500 ml-0.5">*</span>}{description && <span className="ml-1"><OptionInfo text={description} /></span>}
        </label>
      </div>
      {items.length > 0 && (
        <div className="mb-3 space-y-1.5">
          {items.map((item, i) => (
            <div key={i} className="flex items-start gap-2 text-sm text-neutral-black">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-red-600" />
              <span className="shrink-0">{item}</span>
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
        <button type="button" onClick={add} disabled={!input.trim()}
          className="flex cursor-pointer items-center gap-1 rounded-lg bg-brand-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-red-700 disabled:opacity-40 disabled:cursor-not-allowed">
          <Plus className="h-4 w-4" /> Add
        </button>
      </div>
      {hasUnsaved && (
        <p className="mt-1 flex items-center gap-1 text-xs text-blue-600">
          <Info className="h-3.5 w-3.5 flex-shrink-0" /> Press Enter or click Add to save
        </p>
      )}
    </div>
  );
}

export function DocSection({ title, items, setItems, desc }: {
  title: string; items: LicenseDoc[]; setItems: (v: LicenseDoc[] | ((p: LicenseDoc[]) => LicenseDoc[])) => void; desc: string;
}) {
  const [docTitle, setDocTitle] = useState('');
  const [docIssuer, setDocIssuer] = useState('');
  const [docDate, setDocDate] = useState('');
  const [docFile, setDocFile] = useState<File | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  // Files are staged locally — nothing uploads until the form is submitted.
  const handleAdd = () => {
    if (!docTitle.trim() || !docIssuer.trim() || !docDate.trim() || !docFile) return;
    setItems(p => [...p, { title: docTitle.trim(), issuer: docIssuer.trim(), date: docDate.trim(), file: docFile.name, fileObj: docFile }]);
    setDocTitle(''); setDocIssuer(''); setDocDate(''); setDocFile(null);
    if (fileRef.current) fileRef.current.value = '';
  };

  const canAdd = docTitle.trim() && docIssuer.trim() && docDate.trim() && docFile;
  const hasUnsaved = !!(docTitle.trim() || docIssuer.trim() || docDate || docFile);

  return (
    <div>
      <label className="block text-sm font-medium text-neutral-black mb-1">{title}</label>
      <p className="text-xs text-neutral-gray-medium mb-2">{desc}</p>
      {items.length > 0 && (
        <div className="space-y-2 mb-3">
          {items.map((item, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-neutral-gray-light bg-neutral-bg-light">
              <div className="flex items-center gap-2 min-w-0">
                <FileText className="h-4 w-4 text-brand-red-600 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-neutral-black truncate">{item.title}</p>
                  <p className="text-[11px] text-neutral-gray-medium truncate">{item.issuer} &middot; {item.date}</p>
                </div>
              </div>
              <button onClick={() => setItems(p => p.filter((_, j) => j !== i))} className="cursor-pointer text-red-400 hover:text-red-600 flex-shrink-0 ml-2">
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
      <div className="space-y-2 rounded-lg border border-dashed border-neutral-gray-light p-3">
        <input type="text" value={docTitle} onChange={e => setDocTitle(e.target.value)}
          className="w-full rounded-lg border border-neutral-gray-light px-3 py-2 text-sm focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600" placeholder="Document title" />
        <div className="flex gap-2">
          <input type="text" value={docIssuer} onChange={e => setDocIssuer(e.target.value)}
            className="flex-1 rounded-lg border border-neutral-gray-light px-3 py-2 text-sm focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600" placeholder="Issuer" />
          <select value={docDate} onChange={e => setDocDate(e.target.value)}
            className="w-32 cursor-pointer rounded-lg border border-neutral-gray-light px-3 py-2 text-sm focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600">
            <option value="">Year</option>
            {[...YEAR_OPTIONS].reverse().map(y => <option key={y} value={y}>{y}</option>)}
          </select>
        </div>
        <div className="flex gap-2">
          <input ref={fileRef} type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={e => setDocFile(e.target.files?.[0] || null)}
            className="hidden" id={`file-${title.replace(/\s/g, '')}`} />
          <button type="button" onClick={() => document.getElementById(`file-${title.replace(/\s/g, '')}`)?.click()}
            className="flex cursor-pointer items-center gap-1 rounded-lg border border-dashed border-brand-red-300 px-3 py-2 text-xs font-medium text-brand-red-600 hover:bg-brand-red-50 transition-colors flex-1 justify-center">
            <Upload className="h-3.5 w-3.5" /> {docFile ? docFile.name : 'Select file (PDF, JPG, PNG)'}
          </button>
          <button type="button" onClick={handleAdd} disabled={!canAdd}
            className="flex cursor-pointer items-center gap-1 rounded-lg bg-brand-red-600 px-4 py-2 text-xs font-medium text-white hover:bg-brand-red-700 disabled:opacity-40 disabled:cursor-not-allowed">
            <Plus className="h-3.5 w-3.5" /> Add
          </button>
        </div>
        {hasUnsaved && (
          <p className="flex items-center gap-1 text-xs text-blue-600">
            <Info className="h-3.5 w-3.5 flex-shrink-0" /> Click Add to save this document
          </p>
        )}
      </div>
    </div>
  );
}
  