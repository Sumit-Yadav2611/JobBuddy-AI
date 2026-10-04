export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-[#050812] text-white">
      <div className="lg:pl-64">
        {/* Header skeleton */}
        <header className="h-[76px] border-b border-white/[0.07] bg-[#050812]/90">
          <div className="flex h-full items-center justify-between px-6 lg:px-8">
            <div className="space-y-2">
              <div className="h-3 w-20 animate-pulse rounded bg-white/[0.08]" />
              <div className="h-5 w-16 animate-pulse rounded bg-white/[0.06]" />
            </div>

            <div className="hidden h-11 w-80 animate-pulse rounded-xl bg-white/[0.04] md:block" />

            <div className="h-10 w-10 animate-pulse rounded-full bg-white/[0.06]" />
          </div>
        </header>

        {/* Main loading content */}
        <main className="mx-auto max-w-[1600px] p-5 sm:p-6 lg:p-8">
          {/* Page title */}
          <div className="mb-7 space-y-3">
            <div className="h-4 w-72 animate-pulse rounded bg-white/[0.07]" />
            <div className="h-10 w-96 max-w-full animate-pulse rounded-lg bg-white/[0.08]" />
          </div>

          {/* Hero */}
          <div className="mb-7 overflow-hidden rounded-2xl border border-red-500/10 bg-[#0a0a0d] p-6 sm:p-8">
            <div className="space-y-5">
              <div className="h-7 w-52 animate-pulse rounded-full bg-red-400/[0.06]" />

              <div className="space-y-3">
                <div className="h-10 w-80 max-w-full animate-pulse rounded-lg bg-white/[0.08]" />
                <div className="h-10 w-64 max-w-full animate-pulse rounded-lg bg-white/[0.06]" />
              </div>

              <div className="space-y-2">
                <div className="h-4 w-full max-w-xl animate-pulse rounded bg-white/[0.05]" />
                <div className="h-4 w-4/5 max-w-lg animate-pulse rounded bg-white/[0.04]" />
              </div>

              {/* Stats */}
              <div className="grid max-w-2xl gap-3 pt-3 sm:grid-cols-3">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="h-16 animate-pulse rounded-xl border border-white/[0.06] bg-white/[0.025]"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Content skeleton */}
          <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_420px]">
            <div className="space-y-4">
              <div className="h-6 w-40 animate-pulse rounded bg-white/[0.07]" />

              <div className="grid gap-3 sm:grid-cols-2 2xl:grid-cols-4">
                {[1, 2, 3, 4].map((item) => (
                  <div
                    key={item}
                    className="h-36 animate-pulse rounded-xl border border-white/[0.06] bg-white/[0.025]"
                  />
                ))}
              </div>
            </div>

            <div className="h-60 animate-pulse rounded-xl border border-white/[0.06] bg-white/[0.025]" />
          </div>
        </main>
      </div>
    </div>
  );
}