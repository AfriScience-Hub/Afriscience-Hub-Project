function Shimmer({ className = '' }: { className?: string }) {
  return <div className={`animate-pulse rounded-lg bg-neutral-gray-light/60 ${className}`} />;
}

export function ProfileSkeleton() {
  return (
    <div aria-busy="true" aria-label="Loading profile">
      {/* Header skeleton */}
      <div className="rounded-2xl border border-neutral-gray-light bg-white shadow-sm overflow-hidden mb-6">
        <Shimmer className="h-32 !rounded-none" />
        <div className="px-6 pb-6 -mt-12 lg:-mt-16 relative">
          <div className="flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-6">
            <Shimmer className="h-28 w-28 lg:h-32 lg:w-32 !rounded-full border-4 border-white" />
            <div className="flex-1 space-y-2 pt-2">
              <Shimmer className="h-6 w-48" />
              <Shimmer className="h-5 w-24 !rounded-full" />
            </div>
            <Shimmer className="h-24 w-24 !rounded-2xl" />
          </div>
        </div>
      </div>

      {/* Tabs + form skeleton */}
      <div className="rounded-2xl border border-neutral-gray-light bg-white shadow-sm overflow-hidden">
        <div className="flex gap-2 overflow-hidden border-b border-neutral-gray-light px-4 py-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Shimmer key={i} className="h-9 w-32 shrink-0 !rounded-full" />
          ))}
        </div>
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <Shimmer className="h-3 w-24" />
                <Shimmer className="h-11 w-full" />
              </div>
            ))}
          </div>
          <Shimmer className="h-3 w-40" />
          <Shimmer className="h-24 w-full" />
        </div>
        <div className="px-6 py-4 border-t border-neutral-gray-light bg-neutral-bg-light/50 flex items-center justify-end gap-3">
          <Shimmer className="h-10 w-32" />
          <Shimmer className="h-10 w-24" />
        </div>
      </div>
    </div>
  );
}

export function AdminProfileSkeleton() {
  return (
    <div aria-busy="true" aria-label="Loading admin profile" className="space-y-6 max-w-3xl">
      <Shimmer className="h-4 w-16" />
      <div className="space-y-1">
        <Shimmer className="h-7 w-48" />
        <Shimmer className="h-4 w-72" />
      </div>
      <div className="rounded-2xl border border-neutral-gray-light bg-white shadow-sm overflow-hidden">
        <Shimmer className="h-24 !rounded-none" />
        <div className="px-6 pb-6">
          <div className="flex items-end gap-4 -mt-5">
            <Shimmer className="h-20 w-20 !rounded-full border-4 border-white" />
            <div className="pb-1 space-y-2">
              <Shimmer className="h-5 w-44" />
              <Shimmer className="h-4 w-28" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-xl border border-neutral-gray-light bg-neutral-bg-light p-4 space-y-2">
                <Shimmer className="h-3 w-24" />
                <Shimmer className="h-4 w-3/4" />
              </div>
            ))}
          </div>
          <div className="mt-6 flex gap-3">
            <Shimmer className="h-10 w-28" />
            <Shimmer className="h-10 w-28" />
          </div>
        </div>
      </div>
    </div>
  );
}
