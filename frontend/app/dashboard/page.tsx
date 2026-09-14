import { auth, currentUser } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";
import { eq } from "drizzle-orm";

import { db } from "@/lib/db";
import {
  users,
  profiles,
  skills,
  experiences,
  education,
  projects,
} from "@/lib/db/schema";

import DashboardHeader from "@/components/dashboard/DashboardHeader";

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

  // =======================================================
  // Database user
  // =======================================================

  const [dbUser] = await db
    .select()
    .from(users)
    .where(eq(users.clerkId, user.id))
    .limit(1);

  /*
   * The dashboard greeting should use the first name saved
   * in Personal Information.
   */
  let firstName = user.firstName || "there";

  const totalSections = 6;

  let completionPercentage = 0;
  let completedSections = 0;

  let personalComplete = false;
  let summaryComplete = false;
  let skillsComplete = false;
  let experienceComplete = false;
  let educationComplete = false;
  let projectsComplete = false;

  if (dbUser) {
    const [profile] = await db
      .select()
      .from(profiles)
      .where(eq(profiles.userId, dbUser.id))
      .limit(1);

    /*
     * =======================================================
     * PERSONAL INFORMATION NAME
     * =======================================================
     */

    firstName =
      profile?.firstName?.trim() ||
      user.firstName?.trim() ||
      "there";

    const userSkills = await db
      .select()
      .from(skills)
      .where(eq(skills.userId, dbUser.id));

    const userExperience = await db
      .select()
      .from(experiences)
      .where(eq(experiences.userId, dbUser.id));

    const userEducation = await db
      .select()
      .from(education)
      .where(eq(education.userId, dbUser.id));

    const userProjects = await db
      .select()
      .from(projects)
      .where(eq(projects.userId, dbUser.id));

    // -------------------------------------------------------
    // Same six profile sections used throughout the app
    // -------------------------------------------------------

    personalComplete =
      Boolean(profile?.firstName || profile?.lastName) &&
      Boolean(profile?.headline || profile?.location);

    summaryComplete = Boolean(profile?.summary?.trim());

    skillsComplete = userSkills.length > 0;
    experienceComplete = userExperience.length > 0;
    educationComplete = userEducation.length > 0;
    projectsComplete = userProjects.length > 0;

    completedSections = [
      personalComplete,
      summaryComplete,
      skillsComplete,
      experienceComplete,
      educationComplete,
      projectsComplete,
    ].filter(Boolean).length;

    completionPercentage = Math.round(
      (completedSections / totalSections) * 100,
    );
  }

  // =======================================================
  // Profile checklist
  // =======================================================

  const profileItems = [
    {
      name: "Basic Information",
      complete: personalComplete,
      href: "/dashboard/profile/personal",
    },
    {
      name: "Summary",
      complete: summaryComplete,
      href: "/dashboard/profile/summary",
    },
    {
      name: "Work Experience",
      complete: experienceComplete,
      href: "/dashboard/profile/experience",
    },
    {
      name: "Education",
      complete: educationComplete,
      href: "/dashboard/profile/education",
    },
    {
      name: "Skills",
      complete: skillsComplete,
      href: "/dashboard/profile/skills",
    },
    {
      name: "Projects",
      complete: projectsComplete,
      href: "/dashboard/profile/projects",
    },
  ];

  return (
    <div className="min-h-screen bg-[#050607] text-white">
      {/* =====================================================
          AMBIENT BACKGROUND
      ===================================================== */}

      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        {/* Soft red ambient light */}
        <div className="absolute left-[18%] top-[-12%] h-[500px] w-[500px] rounded-full bg-red-600/[0.045] blur-[150px]" />

        {/* Right red ambient light */}
        <div className="absolute right-[-12%] top-[18%] h-[600px] w-[600px] rounded-full bg-red-700/[0.055] blur-[170px]" />

        {/* Bottom subtle red light */}
        <div className="absolute bottom-[-20%] left-[38%] h-[500px] w-[500px] rounded-full bg-rose-700/[0.035] blur-[160px]" />

        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      {/* Sidebar */}
      <Sidebar />

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <div className="lg:pl-64">
        {/* ===================================================
            TOP HEADER
        =================================================== */}

        <header className="sticky top-0 z-30 border-b border-white/[0.07] bg-[#050607]/80 backdrop-blur-xl">
          <div className="flex h-[76px] items-center justify-between gap-6 px-6 lg:px-8">
            {/* Page title */}
            <div className="min-w-0">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-red-400">
                Dashboard
              </p>

              <h1 className="mt-1 truncate text-xl font-semibold tracking-tight">
                Jobs
              </h1>
            </div>

            {/* Search */}
            <div className="hidden max-w-md flex-1 md:block">
              <div className="group flex h-11 items-center gap-3 rounded-xl border border-white/10 bg-white/[0.025] px-4 transition-all duration-300 hover:border-red-400/30 hover:bg-red-500/[0.025] hover:shadow-[0_0_25px_rgba(239,68,68,0.05)]">
                <SearchIcon />

                <input
                  type="text"
                  placeholder="Search jobs, companies..."
                  className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
                />

                <span className="hidden rounded-md border border-white/10 bg-white/[0.035] px-2 py-1 text-[10px] text-slate-500 lg:block">
                  ⌘ K
                </span>
              </div>
            </div>

            {/* Header actions */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="hidden h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.025] text-slate-300 transition-all duration-300 hover:border-red-400/30 hover:bg-red-500/[0.035] hover:text-red-200 hover:shadow-[0_0_25px_rgba(239,68,68,0.08)] sm:flex"
                aria-label="Notifications"
              >
                <BellIcon />
              </button>

              <div className="rounded-full border border-white/10 bg-white/[0.035] p-0.5 transition-all duration-300 hover:border-red-400/30 hover:shadow-[0_0_20px_rgba(239,68,68,0.08)]">
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

        {/* ===================================================
            DASHBOARD
        =================================================== */}

        <main className="mx-auto max-w-[1600px] p-5 sm:p-6 lg:p-8">
          {/* =================================================
              WELCOME
          ================================================= */}

          <section className="mb-7">
            <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
              <div>
                <p className="text-sm text-slate-400">
                  Here's what's happening with your job search today.
                </p>

                <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                  Welcome back,{" "}
                  <span className="bg-gradient-to-r from-red-300 via-rose-400 to-red-500 bg-clip-text text-transparent">
                    {firstName}!
                  </span>{" "}
                 
                </h2>
              </div>

              <div className="hidden items-center gap-2 rounded-full border border-red-400/20 bg-red-400/[0.045] px-4 py-2 text-xs text-red-300 shadow-[0_0_25px_rgba(239,68,68,0.04)] lg:flex">
                <span className="h-2 w-2 rounded-full bg-red-400 shadow-[0_0_12px_rgba(248,113,113,0.8)]" />
                AI agent ready
              </div>
            </div>
          </section>

          {/* =================================================
              AI HERO
          ================================================= */}

          <section
            className="
              group relative mb-7 overflow-hidden rounded-2xl
              border border-red-500/30
              bg-gradient-to-br from-[#0c080a] via-[#0a0809] to-[#10090b]
              shadow-[0_20px_70px_rgba(0,0,0,0.35)]
              transition-all duration-500
              hover:border-red-400/45
              hover:shadow-[0_24px_90px_rgba(0,0,0,0.45),0_0_45px_rgba(239,68,68,0.055)]
            "
          >
            {/* =================================================
                PREMIUM RED AMBIENT LIGHT
               
                Very subtle red glow.
                No dark overlay is placed over the right side.
            ================================================== */}

            <div className="pointer-events-none absolute -right-28 -top-28 h-[420px] w-[420px] rounded-full bg-red-600/[0.045] blur-[110px] transition-all duration-700 group-hover:bg-red-600/[0.075]" />

            <div className="pointer-events-none absolute -bottom-40 right-[18%] h-[360px] w-[360px] rounded-full bg-rose-600/[0.035] blur-[120px]" />

            {/* Very subtle premium grid inside hero */}
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.035]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.45) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.45) 1px, transparent 1px)",
                backgroundSize: "64px 64px",
              }}
            />

            {/* =================================================
                DECORATIVE RED RINGS
            ================================================== */}

            <div
              className="
                pointer-events-none absolute right-[-55px] top-1/2
                hidden h-[360px] w-[360px] -translate-y-1/2
                rounded-full border border-red-400/[0.10]
                transition-all duration-700
                group-hover:border-red-400/[0.16]
                lg:block
              "
            >
              <div className="absolute inset-9 rounded-full border border-red-400/[0.08]" />

              <div className="absolute inset-[72px] rounded-full border border-red-400/[0.07]" />

              <div className="absolute inset-[105px] rounded-full border border-red-400/[0.05]" />

              {/* Center icon container */}
              <div
                className="
                  absolute left-1/2 top-1/2
                  flex h-28 w-28 -translate-x-1/2 -translate-y-1/2
                  items-center justify-center rounded-3xl
                  border border-red-400/25
                  bg-gradient-to-br from-red-500/[0.10] to-red-950/[0.10]
                  shadow-[0_0_55px_rgba(239,68,68,0.10)]
                  transition-all duration-500
                  group-hover:scale-[1.035]
                  group-hover:border-red-400/35
                  group-hover:bg-red-500/[0.13]
                  group-hover:shadow-[0_0_75px_rgba(239,68,68,0.16)]
                "
              >
                <BriefcaseBusinessIcon />
              </div>
            </div>

            {/* =================================================
                HERO CONTENT
            ================================================== */}

            <div className="relative p-6 sm:p-8">
              <div className="max-w-2xl">
                {/* AI Badge */}
                <div
                  className="
                    inline-flex items-center gap-2 rounded-full
                    border border-red-400/25
                    bg-red-500/[0.055]
                    px-3 py-1.5
                    text-[11px] font-semibold uppercase
                    tracking-[0.18em] text-red-300
                    shadow-[0_0_20px_rgba(239,68,68,0.04)]
                    transition-all duration-300
                    hover:border-red-400/40
                    hover:bg-red-500/[0.08]
                    hover:shadow-[0_0_25px_rgba(239,68,68,0.07)]
                  "
                >
                  <SparklesIcon />
                  AI Job Application Agent
                </div>

                {/* Main title */}
                <h3 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
                  Find better jobs,
                  <br className="hidden sm:block" />
                  <span className="bg-gradient-to-r from-white via-red-100 to-rose-300 bg-clip-text text-transparent">
                    faster with AI
                  </span>
                </h3>

                {/* Description */}
                <p className="mt-4 max-w-xl text-sm leading-6 text-slate-400 sm:text-base">
                  Get personalized job matches, AI-powered insights, and
                  smarter tools to accelerate your job search.
                </p>

                {/* =================================================
                    QUICK STATS
                ================================================== */}

                <div className="mt-7 grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3">
                  <StatCard
                    icon={<ProfileIcon />}
                    label="Profile"
                    value={`${completionPercentage}%`}
                    description={
                      completionPercentage === 100
                        ? "Fully complete"
                        : "Almost there"
                    }
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

          {/* =================================================
              PLATFORMS + PROFILE
          ================================================= */}

          <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_420px]">
            {/* =================================================
                PLATFORMS
            ================================================= */}

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
                  className="
                    rounded-lg border border-white/10
                    bg-white/[0.025]
                    px-4 py-2 text-sm text-slate-300
                    transition-all duration-300
                    hover:border-red-400/30
                    hover:bg-red-500/[0.035]
                    hover:text-white
                    hover:shadow-[0_0_25px_rgba(239,68,68,0.06)]
                  "
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
                    className="
                      group relative overflow-hidden rounded-xl
                      border border-white/[0.08]
                      bg-[#0a0b0d]/80 p-4
                      transition-all duration-300
                      hover:-translate-y-1
                      hover:border-red-400/25
                      hover:bg-[#100a0c]
                      hover:shadow-[0_12px_35px_rgba(0,0,0,0.25),0_0_25px_rgba(239,68,68,0.04)]
                    "
                  >
                    <div className="flex items-center justify-between">
                      <div
                        className="
                          flex h-10 w-10 items-center justify-center
                          rounded-xl border border-white/10
                          bg-white/[0.035]
                          text-lg font-bold text-slate-200
                          transition-all duration-300
                          group-hover:border-red-400/20
                          group-hover:bg-red-500/[0.055]
                          group-hover:text-red-200
                        "
                      >
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

            {/* =================================================
                PROFILE COMPLETENESS
            ================================================= */}

            <ProfileCompleteness
              completionPercentage={completionPercentage}
              completedSections={completedSections}
              totalSections={totalSections}
              profileItems={profileItems}
            />
          </div>

          {/* =================================================
              JOBS
          ================================================= */}

          <div className="mt-6">
            <JobsSection />
          </div>

          {/* =================================================
              RECOMMENDED JOBS
          ================================================= */}

          <div className="mt-6">
            <RecommendedJobs />
          </div>
        </main>
      </div>
    </div>
  );
}

/* ============================================================
   STAT CARD
============================================================ */

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
    <div
      className="
        group relative flex items-center gap-3
        overflow-hidden rounded-xl
        border border-white/[0.08]
        bg-black/20
        px-3 py-3
        backdrop-blur-sm
        transition-all duration-300
        hover:-translate-y-0.5
        hover:border-red-400/25
        hover:bg-red-500/[0.025]
        hover:shadow-[0_10px_30px_rgba(0,0,0,0.25),0_0_25px_rgba(239,68,68,0.035)]
      "
    >
      {/* Subtle hover light */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-red-500/[0.025] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div
        className="
          relative flex h-10 w-10 shrink-0 items-center justify-center
          rounded-lg border border-red-400/15
          bg-red-400/[0.045]
          text-red-300
          transition-all duration-300
          group-hover:border-red-400/25
          group-hover:bg-red-400/[0.085]
          group-hover:text-red-200
          group-hover:shadow-[0_0_22px_rgba(239,68,68,0.09)]
        "
      >
        {icon}
      </div>

      <div className="relative min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold">{value}</span>

          <span className="truncate text-xs text-slate-500">
            {label}
          </span>
        </div>

        <p className="mt-0.5 truncate text-[11px] text-slate-500">
          {description}
        </p>
      </div>
    </div>
  );
}

/* ============================================================
   SEARCH ICON
============================================================ */

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-4 w-4 shrink-0 text-slate-500 transition-colors duration-300 group-hover:text-red-300"
    >
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4 4" />
    </svg>
  );
}

/* ============================================================
   BELL ICON
============================================================ */

function BellIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-5 w-5 transition-transform duration-300"
    >
      <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
      <path d="M10 21h4" />
    </svg>
  );
}

/* ============================================================
   BRIEFCASE ICON
============================================================ */

function BriefcaseBusinessIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="h-12 w-12 text-red-300 transition-all duration-500"
    >
      <rect width="18" height="14" x="3" y="7" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <path d="M3 12h18" />
    </svg>
  );
}

/* ============================================================
   SPARKLES ICON
============================================================ */

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

/* ============================================================
   PROFILE ICON
============================================================ */

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

/* ============================================================
   TARGET ICON
============================================================ */

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

/* ============================================================
   BOOKMARK ICON
============================================================ */

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