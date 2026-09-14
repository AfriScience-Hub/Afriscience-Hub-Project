export function Field({ label, value, required }: { label: string; value?: string | number | null; required?: boolean }) {
  return (
    <div>
      <label className="block text-xs text-neutral-gray-medium mb-1">
        {label}
      </label>
      <p className="text-sm font-medium text-neutral-black">{value || '\u2014'}</p>
    </div>
  );
}

export function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-neutral-gray-light bg-neutral-bg-light p-4 space-y-3">
      <h4 className="text-sm font-bold text-neutral-black">{title}</h4>
      {children}
    </div>
  );
}
