'use client';

import { Info } from 'lucide-react';
import { cn } from '@/lib/utils';

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
    <label className="block text-sm font-medium text-neutral-black mb-1">
      <span className="inline-flex items-center gap-1.5">
        {children}
        {required && <span className="text-brand-red-600">*</span>}
        {info && (
          <span title={info} className="text-neutral-gray-medium cursor-help">
            <Info className="h-3.5 w-3.5" />
          </span>
        )}
      </span>
    </label>
  );
}

export function SectionCard({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn('mb-8 pb-8 border-b border-neutral-gray-light last:border-0 last:mb-0 last:pb-0', className)}>
      <h3 className="text-lg font-bold text-neutral-black mb-4">{title}</h3>
      {children}
    </section>
  );
}

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
          className="text-xs font-bold text-brand-navy-900 hover:underline"
        >
          + Add entry
        </button>
      </div>
    </div>
  );
}

export function SocialHandlesFields({
  value,
  onChange,
}: {
  value: { linkedin: string; instagram: string; twitter: string; facebook: string };
  onChange: (v: typeof value) => void;
}) {
  return (
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
      <p className="sm:col-span-2 text-xs text-neutral-gray-medium">Provide at least one social handle.</p>
    </div>
  );
}
