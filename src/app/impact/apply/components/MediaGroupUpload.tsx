'use client';

import { FieldLabel } from './FormField';

const MAX_MEDIA = 5;

export default function MediaGroupUpload({
  label,
  files,
  onChange,
}: {
  label: string;
  files: File[];
  onChange: (f: File[]) => void;
}) {
  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      <p className="text-xs text-neutral-gray-medium mb-2">
        Optional — collected as program progresses. Max {MAX_MEDIA}. Picture and video only.
      </p>
      <label className="flex flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed border-neutral-gray-light px-4 py-5 cursor-pointer hover:border-brand-red-300 transition-colors">
        <span className="text-sm font-medium text-neutral-gray-dark">
          Upload media ({files.length}/{MAX_MEDIA})
        </span>
        <input
          type="file"
          accept="image/*,video/*"
          multiple
          className="hidden"
          onChange={(e) => {
            const incoming = Array.from(e.target.files || []);
            onChange([...files, ...incoming].slice(0, MAX_MEDIA));
            e.target.value = '';
          }}
        />
      </label>
      {files.length > 0 && (
        <ul className="mt-2 space-y-1">
          {files.map((f, i) => (
            <li
              key={`${f.name}-${i}`}
              className="flex items-center justify-between text-xs bg-neutral-bg-light rounded px-2 py-1.5"
            >
              <span className="truncate">{f.name}</span>
              <button
                type="button"
                className="text-brand-red-600 font-semibold shrink-0 ml-2"
                onClick={() => onChange(files.filter((_, idx) => idx !== i))}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
