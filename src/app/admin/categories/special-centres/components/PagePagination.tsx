'use client';

interface Props {
  page: number;
  totalPages: number;
  perPage: number;
  /** Total rows before filtering. */
  total: number;
  /** Rows after filtering - used for the "Showing x to y" text. */
  count: number;
  noun: string;
  onPage: (page: number) => void;
}

/** Table footer with the row summary and page buttons. */
export default function PagePagination({ page, totalPages, perPage, total, count, noun, onPage }: Props) {
  const from = count === 0 ? 0 : (page - 1) * perPage + 1;
  const to = Math.min(page * perPage, count);

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 px-4 py-3 border-t border-neutral-gray-light text-xs text-neutral-gray-medium">
      <span>Showing {from} to {to} of {total} {noun}</span>
      <div className="flex items-center gap-1 flex-wrap">
        <button
          disabled={page === 1}
          onClick={() => onPage(page - 1)}
          className="h-7 w-7 rounded border border-neutral-gray-light grid place-items-center disabled:opacity-40 cursor-pointer"
        >
          ‹
        </button>
        {Array.from({ length: totalPages }).slice(0, 5).map((_, i) => (
          <button
            key={i}
            onClick={() => onPage(i + 1)}
            className={`h-7 w-7 rounded text-xs font-semibold cursor-pointer ${page === i + 1 ? 'bg-[#453DD8] text-white' : 'border border-neutral-gray-light bg-white'}`}
          >
            {i + 1}
          </button>
        ))}
        {totalPages > 5 && <span className="px-1">…</span>}
        {totalPages > 5 && (
          <button
            onClick={() => onPage(totalPages)}
            className={`h-7 w-7 rounded text-xs font-semibold cursor-pointer ${page === totalPages ? 'bg-[#453DD8] text-white' : 'border border-neutral-gray-light bg-white'}`}
          >
            {totalPages}
          </button>
        )}
        <button
          disabled={page === totalPages}
          onClick={() => onPage(page + 1)}
          className="h-7 w-7 rounded border border-neutral-gray-light grid place-items-center disabled:opacity-40 cursor-pointer"
        >
          ›
        </button>
        <span className="ml-2 px-2 py-1 rounded border border-neutral-gray-light bg-white">{perPage} / page</span>
      </div>
    </div>
  );
}
