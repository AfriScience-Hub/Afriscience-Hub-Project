export default function CompetitionsLoading() {
  return (
    <div className="min-h-screen bg-neutral-bg-light py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 animate-pulse">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-8 w-8 rounded bg-slate-200" />
            <div className="h-9 w-64 rounded bg-slate-200" />
          </div>
          <div className="h-5 w-3/4 rounded bg-slate-100 mt-3" />
          <div className="h-12 w-72 rounded-lg bg-slate-100 mt-6" />
        </div>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-72 flex-shrink-0 animate-pulse">
            <div className="rounded-xl border border-neutral-gray-light bg-white p-5 shadow-sm space-y-5">
              <div className="h-5 w-24 rounded bg-slate-200" />
              {[...Array(3)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="h-5 w-20 rounded bg-slate-200" />
                  <div className="h-4 w-full rounded bg-slate-100" />
                  <div className="h-4 w-3/4 rounded bg-slate-100" />
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1 animate-pulse space-y-6">
            <div className="h-12 w-full rounded-xl bg-slate-100" />
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="rounded-xl border border-neutral-gray-light bg-white shadow-sm overflow-hidden">
                  <div className="h-48 bg-slate-200" />
                  <div className="p-5 space-y-3">
                    <div className="h-4 w-full rounded bg-slate-100" />
                    <div className="h-6 w-3/4 rounded bg-slate-200" />
                    <div className="h-4 w-1/2 rounded bg-slate-100" />
                    <div className="h-10 w-full rounded bg-slate-100 mt-4" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
