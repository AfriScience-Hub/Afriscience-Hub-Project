'use client';
export function ScreeningList({ text }: { text: string }) {
  const items = text.split('\n').filter(Boolean);
  const headerIdx = items.findIndex((s) => s.trim().endsWith(':'));
  const bullet = <span className="mt-2 h-2 w-2 rounded-full bg-neutral-black flex-shrink-0" />;
  const childBullet = <span className="mt-2 h-1.5 w-1.5 rounded-full bg-neutral-gray-dark flex-shrink-0" />;
  if (headerIdx !== -1) {
    let childEnd = items.length;
    for (let i = headerIdx + 1; i < items.length; i++) if (/Top 30|Public votes|At the end|When a tie/.test(items[i])) { childEnd = i; break; }
    const children = items.slice(headerIdx + 1, childEnd);
    const rest = items.slice(childEnd);
    const before = items.slice(0, headerIdx);
    return (
      <ul className="space-y-2.5 text-sm text-neutral-gray-dark leading-relaxed">
        {before.map((t, i) => <li key={`b-${i}`} className="flex items-start gap-3">{bullet}<span>{t}</span></li>)}
        <li className="flex items-start gap-3">{bullet}<span>{items[headerIdx]}</span></li>
        {children.length > 0 && (
          <ul className="ml-6 space-y-2 border-l border-neutral-gray-light/60 pl-4">
            {children.map((t, i) => <li key={`c-${i}`} className="flex items-start gap-2.5">{childBullet}<span>{t}</span></li>)}
          </ul>
        )}
        {rest.map((t, i) => <li key={`r-${i}`} className="flex items-start gap-3">{bullet}<span>{t}</span></li>)}
      </ul>
    );
  }
  return (
    <ul className="space-y-2.5 text-sm text-neutral-gray-dark leading-relaxed">
      {items.map((t, i) => <li key={i} className="flex items-start gap-3">{bullet}<span>{t}</span></li>)}
    </ul>
  );
}
