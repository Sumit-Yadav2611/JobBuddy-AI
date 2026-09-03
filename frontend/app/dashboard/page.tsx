import { auth, currentUser } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";

import Sidebar from "@/components/dashboard/Sidebar";
import JobsSection from "@/components/dashboard/JobsSection";
import ProfileCompleteness from "@/components/dashboard/ProfileCompleteness";
import RecommendedJobs from "@/components/dashboard/RecommendedJobs";

import { syncUser } from "@/lib/db/user-sync";

export default async function DashboardPage() {
  await auth.protect();

  const user = await currentUser();

  if (!user) {
    return null;
  }

  const email = user.emailAddresses[0]?.emailAddress;

  if (!email) {
    throw new Error("Authenticated user does not have an email address.");
  }

  await syncUser({
    id: user.id,
    email,
    firstName: user.firstName,
    lastName: user.lastName,
  });

  const firstName = user.firstName || "there";

  return (
    <div className="min-h-screen bg-[#050812] text-white">
      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[18%] top-[-10%] h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[140px]" />
        <div className="absolute right-[-10%] top-[20%] h-[600px] w-[600px] rounded-full bg-violet-600/10 blur-[160px]" />
        <div className="absolute bottom-[-20%] left-[35%] h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-[150px]" />

        {/* subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      {/* Sidebar — intentionally unchanged */}
      <Sidebar />

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top header */}
        <header className="sticky top-0 z-30 border-b border-white/[0.07] bg-[#050812]/80 backdrop-blur-xl">
          <div className="flex h-[76px] items-center justify-between gap-6 px-6 lg:px-8">
            {/* Page title */}
            <div className="min-w-0">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-cyan-400">
                Dashboard
              </p>

              <h1 className="mt-1 truncate text-xl font-semibold tracking-tight">
                Jobs
              </h1>
            </div>

            {/* Search */}
            <div className="hidden max-w-md flex-1 md:block">
              <div className="group flex h-11 items-center gap-3 rounded-xl border border-white/10 bg-white/[0.035] px-4 transition-all duration-200 hover:border-cyan-400/30 hover:bg-white/[0.05]">
                <SearchIcon />

                <input
                  type="text"
                  placeholder="Search jobs, companies..."
                  className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
                />

                <span className="hidden rounded-md border border-white/10 bg-white/[0.04] px-2 py-1 text-[10px] text-slate-500 lg:block">
                  ⌘ K
                </span>
              </div>
            </div>

            {/* Header actions */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="hidden h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.035] text-slate-300 transition hover:border-cyan-400/30 hover:bg-white/[0.06] hover:text-white sm:flex"
                aria-label="Notifications"
              >
                <BellIcon />
              </button>

              <div className="rounded-full border border-white/10 bg-white/[0.04] p-0.5">
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox: "h-10 w-10",
                    },
                  }}
                />
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard */}
        <main className="mx-auto max-w-[1600px] p-5 sm:p-6 lg:p-8">
          {/* Welcome */}
          <section className="mb-7">
            <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
              <div>
                <p className="text-sm text-slate-400">
                  Here's what's happening with your job search today.
                </p>

                <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                  Welcome back,{" "}
                  <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-500 bg-clip-text text-transparent">
                    {firstName}!
                  </span>{" "}
                  <span className="inline-block">👋</span>
                </h2>
              </div>

              <div className="hidden items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/[0.06] px-4 py-2 text-xs text-emerald-300 lg:flex">
                <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)]" />
                AI agent ready
              </div>
            </div>
          </section>

          {/* AI Hero */}
          <section className="relative mb-7 overflow-hidden rounded-2xl border border-white/10 bg-[#0a1020]/90 shadow-2xl shadow-black/20">
            {/* Hero glow */}
            <div className="pointer-events-none absolute -right-20 -top-32 h-80 w-80 rounded-full bg-cyan-500/15 blur-[100px]" />
            <div className="pointer-events-none absolute -bottom-32 right-24 h-80 w-80 rounded-full bg-violet-600/20 blur-[110px]" />

            {/* Decorative rings */}
            <div className="pointer-events-none absolute right-[-40px] top-1/2 hidden h-[320px] w-[320px] -translate-y-1/2 rounded-full border border-cyan-400/10 lg:block">
              <div className="absolute inset-8 rounded-full border border-blue-400/10" />
              <div className="absolute inset-16 rounded-full border border-violet-400/10" />

              <div className="absolute left-1/2 top-1/2 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-3xl border border-cyan-300/20 bg-gradient-to-br from-cyan-400/20 to-violet-600/20 shadow-[0_0_70px_rgba(34,211,238,0.18)]">
                <BriefcaseBusinessIcon />
              </div>
            </div>

            <div className="relative p-6 sm:p-8">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/[0.06] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-300">
                  <SparklesIcon />
                  AI Job Application Agent
                </div>

                <h3 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
                  Find better jobs,
                  <br className="hidden sm:block" />
                  <span className="bg-gradient-to-r from-white via-cyan-100 to-violet-300 bg-clip-text text-transparent">
                    faster with AI
                  </span>
                </h3>

                <p className="mt-4 max-w-xl text-sm leading-6 text-slate-400 sm:text-base">
                  Get personalized job matches, AI-powered insights, and
                  smarter tools to accelerate your job search.
                </p>

                {/* Quick stats */}
                <div className="mt-7 grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3">
                  <StatCard
                    icon={<ProfileIcon />}
                    label="Profile"
                    value="67%"
                    description="Almost there"
                  />

                  <StatCard
                    icon={<TargetIcon />}
                    label="Top Matches"
                    value="5"
                    description="New matches"
                  />

                  <StatCard
                    icon={<BookmarkIcon />}
                    label="Saved Jobs"
                    value="11"
                    description="Keep tracking"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Platforms + Profile */}
          <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_350px]">
            {/* Platforms */}
            <section>
              <div className="mb-4 flex items-end justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold tracking-tight">
                    Job Platforms
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Connect your preferred job platforms.
                  </p>
                </div>

                <button
                  type="button"
                  className="rounded-lg border border-white/10 bg-white/[0.035] px-4 py-2 text-sm text-slate-300 transition hover:border-cyan-400/30 hover:bg-white/[0.06] hover:text-white"
                >
                  Manage
                </button>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 2xl:grid-cols-4">
                {[
                  { name: "Greenhouse", letter: "g" },
                  { name: "Lever", letter: "L" },
                  { name: "Workable", letter: "w" },
                  { name: "Wellfound", letter: "W" },
                ].map((platform) => (
                  <div
                    key={platform.name}
                    className="group relative overflow-hidden rounded-xl border border-white/[0.08] bg-[#0a0f1b]/80 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan-400/20 hover:bg-[#0d1422]"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.045] text-lg font-bold text-slate-200">
                        {platform.letter}
                      </div>

                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.7)]" />
                    </div>

                    <h3 className="mt-4 text-sm font-semibold">
                      {platform.name}
                    </h3>

                    <p className="mt-1 text-xs text-slate-500">Job board</p>

                    <div className="mt-4 flex items-center gap-2 text-xs text-emerald-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      Connected
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Existing real profile component */}
            <ProfileCompleteness />
          </div>

          {/* Existing real jobs */}
          <div className="mt-6">
            <JobsSection />
          </div>

          <div className="mt-6">
            <RecommendedJobs />
          </div>
        </main>
      </div>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  description,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  description: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-white/[0.08] bg-black/20 px-3 py-3 backdrop-blur-sm">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-cyan-400/15 bg-cyan-400/[0.06] text-cyan-300">
        {icon}
      </div>

      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold">{value}</span>
          <span className="truncate text-xs text-slate-500">{label}</span>
        </div>

        <p className="mt-0.5 truncate text-[11px] text-slate-500">
          {description}
        </p>
      </div>
    </div>
  );
}

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-4 w-4 shrink-0 text-slate-500"
    >
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4 4" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-5 w-5"
    >
      <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
      <path d="M10 21h4" />
    </svg>
  );
}

function BriefcaseBusinessIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="h-12 w-12 text-cyan-300"
    >
      <rect width="18" height="14" x="3" y="7" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <path d="M3 12h18" />
    </svg>
  );
}

function SparklesIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-3.5 w-3.5"
    >
      <path d="m12 3-1.2 4.8L6 9l4.8 1.2L12 15l1.2-4.8L18 9l-4.8-1.2L12 3Z" />
      <path d="m19 14-.7 2.3L16 17l2.3.7L19 20l.7-2.3L22 17l-2.3-.7L19 14Z" />
    </svg>
  );
}

function ProfileIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-4 w-4"
    >
      <circle cx="12" cy="8" r="3" />
      <path d="M5 20c.8-3.2 3.2-5 7-5s6.2 1.8 7 5" />
    </svg>
  );
}

function TargetIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-4 w-4"
    >
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="12" cy="12" r="1" />
    </svg>
  );
}

function BookmarkIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-4 w-4"
    >
      <path d="M6 4.5A2.5 2.5 0 0 1 8.5 2h7A2.5 2.5 0 0 1 18 4.5V21l-6-3-6 3V4.5Z" />
    </svg>
  );
}