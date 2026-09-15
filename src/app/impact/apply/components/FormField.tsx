'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { Plus, CreditCard, ChevronDown, Upload } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ID_CARD_TYPES } from '../data';

export function FieldLabel({
  children,
  required,
  info,
}: {
  children: React.ReactNode;
  required?: boolean;
  info?: string;
}) {
  return (
    <div className="mb-1">
      <label className="block text-sm font-medium text-neutral-black">
        <span className="inline-flex items-center gap-1.5">
          {children}
          {required && <span className="text-brand-red-600">*</span>}
        </span>
      </label>
      {info && (
        <p className="text-xs text-neutral-gray-medium mt-0.5">{info}</p>
      )}
    </div>
  );
}

export { default as SectionCard } from './CollapsibleSection';

export function TextInput({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={cn(
        'w-full px-3 py-2.5 rounded-lg border border-neutral-gray-light text-sm focus:ring-2 focus:ring-brand-red-600 focus:border-brand-red-600 transition-all disabled:bg-neutral-bg-light disabled:text-neutral-gray-medium',
        className
      )}
    />
  );
}

export function TextArea({
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={cn(
        'w-full px-3 py-2.5 rounded-lg border border-neutral-gray-light text-sm focus:ring-2 focus:ring-brand-red-600 focus:border-brand-red-600 transition-all min-h-[100px]',
        className
      )}
    />
  );
}

export function SelectInput({
  className,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={cn(
        'w-full px-3 py-2.5 rounded-lg border border-neutral-gray-light text-sm focus:ring-2 focus:ring-brand-red-600 focus:border-brand-red-600 transition-all bg-white',
        className
      )}
    >
      {children}
    </select>
  );
}

export function FileUpload({
  label,
  accept,
  file,
  onChange,
  onClear,
  hint,
  required,
}: {
  label: string;
  accept: string;
  file: File | null;
  onChange: (f: File | null) => void;
  onClear: () => void;
  hint?: string;
  required?: boolean;
}) {
  return (
    <div>
      <FieldLabel required={required}>{label}</FieldLabel>
      {hint && <p className="text-xs text-neutral-gray-medium mb-2">{hint}</p>}
      {file ? (
        <div className="flex items-center justify-between gap-2 rounded-lg border border-neutral-gray-light bg-neutral-bg-light px-3 py-2 text-sm">
          <span className="truncate">{file.name}</span>
          <button type="button" onClick={onClear} className="text-brand-red-600 text-xs font-semibold shrink-0">
            Remove
          </button>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed border-neutral-gray-light px-4 py-6 cursor-pointer hover:border-brand-red-300 hover:bg-brand-red-50/30 transition-colors">
          <span className="text-sm font-medium text-neutral-gray-dark">Click to upload</span>
          <span className="text-[11px] text-neutral-gray-medium">{accept.replace(/\./g, '').toUpperCase()}</span>
          <input
            type="file"
            accept={accept}
            className="hidden"
            onChange={(e) => onChange(e.target.files?.[0] ?? null)}
          />
        </label>
      )}
    </div>
  );
}

export function MultiStringList({
  label,
  values,
  onChange,
  placeholder,
  required,
  info,
}: {
  label: string;
  values: string[];
  onChange: (v: string[]) => void;
  placeholder?: string;
  required?: boolean;
  info?: string;
}) {
  const update = (idx: number, val: string) => {
    const next = [...values];
    next[idx] = val;
    onChange(next);
  };
  const add = () => onChange([...values, '']);
  const remove = (idx: number) => onChange(values.filter((_, i) => i !== idx));

  return (
    <div>
      <FieldLabel required={required} info={info}>
        {label}
      </FieldLabel>
      <div className="space-y-2">
        {values.map((v, idx) => (
          <div key={idx} className="flex gap-2">
            <TextInput
              value={v}
              onChange={(e) => update(idx, e.target.value)}
              placeholder={placeholder}
            />
            {values.length > 1 && (
              <button
                type="button"
                onClick={() => remove(idx)}
                className="text-xs text-brand-red-600 font-semibold shrink-0 px-2"
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={add}
          className="flex items-center gap-1 rounded-lg bg-brand-red-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-brand-red-700 transition-colors"
        >
          <Plus className="h-4 w-4" /> Add entry
        </button>
      </div>
    </div>
  );
}

export function SocialHandlesFields({
  value,
  onChange,
  hintPosition = 'below',
}: {
  value: { linkedin: string; instagram: string; twitter: string; facebook: string };
  onChange: (v: typeof value) => void;
  hintPosition?: 'above' | 'below';
}) {
  return (
    <div>
      {hintPosition === 'above' && (
        <p className="text-xs text-neutral-gray-medium mb-2">Provide at least one social handle.</p>
      )}
      <div className="grid sm:grid-cols-2 gap-3">
        {(['linkedin', 'instagram', 'twitter', 'facebook'] as const).map((key) => (
          <div key={key}>
            <FieldLabel>{key.charAt(0).toUpperCase() + key.slice(1)}</FieldLabel>
            <TextInput
              value={value[key]}
              onChange={(e) => onChange({ ...value, [key]: e.target.value })}
              placeholder={`https://${key}.com/...`}
            />
          </div>
        ))}
      </div>
      {hintPosition === 'below' && (
        <p className="text-xs text-neutral-gray-medium mt-2">Provide at least one social handle.</p>
      )}
    </div>
  );
}

export function GovernmentIdCardUpload({
  idType,
  otherSpecify,
  file,
  onChange,
  required,
}: {
  idType: string;
  otherSpecify: string;
  file: File | null;
  onChange: (patch: { type?: string; otherSpecify?: string; file?: File | null }) => void;
  required?: boolean;
}) {
  const ref = useRef<HTMLInputElement>(null);
  const preview = useMemo(() => (file ? URL.createObjectURL(file) : null), [file]);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f || !f.type.startsWith('image/')) return;
    onChange({ file: f });
  };

  return (
    <div className="border-t border-neutral-gray-light pt-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-4">
        <div>
          <label className="flex items-center gap-1.5 text-xs text-neutral-gray-medium uppercase font-bold mb-1.5">
            <CreditCard className="h-3.5 w-3.5" /> Government ID Card
            {required && <span className="text-brand-red-600">*</span>}
          </label>
          <div className="relative">
            <select
              value={idType}
              onChange={(e) => onChange({ type: e.target.value })}
              className="w-full rounded-lg border border-neutral-gray-light p-3 text-sm appearance-none bg-white focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600"
            >
              <option value="">Select ID card type</option>
              {ID_CARD_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-gray-medium pointer-events-none" />
          </div>
          {idType === 'Other' && (
            <input
              type="text"
              value={otherSpecify}
              onChange={(e) => onChange({ otherSpecify: e.target.value })}
              placeholder="Specify ID card type..."
              className="w-full rounded-lg border border-neutral-gray-light p-3 text-sm mt-2 focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600"
            />
          )}
        </div>
      </div>

      <div
        className="border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors border-neutral-gray-light hover:border-brand-red-300 hover:bg-brand-red-50/30"
        onClick={() => ref.current?.click()}
      >
        <input ref={ref} type="file" accept="image/*" onChange={handleChange} className="hidden" />
        {preview ? (
          <div className="flex flex-col items-center">
            <div className="relative h-28 w-48 rounded-lg overflow-hidden mb-3">
              <Image src={preview} alt="ID preview" fill className="object-cover" sizes="192px" />
            </div>
            <p className="font-bold text-green-800">{file?.name}</p>
            <p className="text-xs text-neutral-gray-medium mt-1">Click to replace</p>
          </div>
        ) : (
          <div>
            <Upload className="h-8 w-8 text-neutral-gray-light mx-auto mb-2" />
            <p className="text-sm text-neutral-gray-dark leading-relaxed">
              To verify your identity, kindly upload a copy of any valid government issued ID card
              of yours (National ID card, Driver&apos;s license, Voter&apos;s card, International
              passport, etc.). Uploaded documents are securely stored and protected from
              unauthorized access.
            </p>
            <p className="text-xs text-neutral-gray-medium mt-2">picture / image file formats only</p>
          </div>
        )}
      </div>
    </div>
  );
}
