import { auth } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

import {
  ArrowLeft,
  ArrowRight,
  User,
  FileText,
  Code2,
  BriefcaseBusiness,
  GraduationCap,
  FolderGit2,
  Sparkles,
  Check,
  ShieldCheck,
  FileCheck2,
  CircleDot,
  Zap,
} from "lucide-react";

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

export default async function ProfilePage() {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  // Find current application user
  const [dbUser] = await db
    .select()
    .from(users)
    .where(eq(users.clerkId, userId))
    .limit(1);

  if (!dbUser) {
    return (
      <div className="min-h-screen bg-[#02040a] px-6 py-10 text-slate-200">
        <div className="mx-auto max-w-3xl rounded-3xl border border-white/[0.08] bg-white/[0.025] p-8 shadow-2xl shadow-black/30 backdrop-blur-xl">
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/[0.06]">
            <User className="h-5 w-5 text-cyan-300" />
          </div>

          <h1 className="text-2xl font-semibold text-white">
            User profile not found
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-400">
            Please upload and analyze your resume first.
          </p>
        </div>
      </div>
    );
  }

  // Get profile
  const [profile] = await db
    .select()
    .from(profiles)
    .where(eq(profiles.userId, dbUser.id))
    .limit(1);

  // Get counts
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

  // Completion checks
  const personalComplete =
    Boolean(profile?.firstName || profile?.lastName) &&
    Boolean(profile?.headline || profile?.location);

  const summaryComplete = Boolean(profile?.summary?.trim());

  const skillsComplete = userSkills.length > 0;

  const experienceComplete = userExperience.length > 0;

  const educationComplete = userEducation.length > 0;

  const projectsComplete = userProjects.length > 0;

  const completedSections = [
    personalComplete,
    summaryComplete,
    skillsComplete,
    experienceComplete,
    educationComplete,
    projectsComplete,
  ].filter(Boolean).length;

  const totalSections = 6;

  const completionPercentage = Math.round(
    (completedSections / totalSections) * 100,
  );

  const profileSections = [
    {
      icon: User,
      title: "Personal Information",
      shortTitle: "Personal Info",
      description: "Name, location, headline and contact details.",
      href: "/dashboard/profile/personal",
      complete: personalComplete,
      number: "01",
      accent: "cyan",
    },
    {
      icon: FileText,
      title: "Professional Summary",
      shortTitle: "Summary",
      description: "Your professional summary and career objective.",
      href: "/dashboard/profile/summary",
      complete: summaryComplete,
      number: "02",
      accent: "violet",
    },
    {
      icon: Code2,
      title: "Skills",
      shortTitle: "Skills",
      description: "Technical skills, tools, languages and soft skills.",
      href: "/dashboard/profile/skills",
      complete: skillsComplete,
      number: "03",
      accent: "blue",
    },
    {
      icon: BriefcaseBusiness,
      title: "Experience",
      shortTitle: "Experience",
      description: "Work experience, roles and achievements.",
      href: "/dashboard/profile/experience",
      complete: experienceComplete,
      number: "04",
      accent: "emerald",
    },
    {
      icon: GraduationCap,
      title: "Education",
      shortTitle: "Education",
      description: "Degrees, institutions and academic details.",
      href: "/dashboard/profile/education",
      complete: educationComplete,
      number: "05",
      accent: "amber",
    },
    {
      icon: FolderGit2,
      title: "Projects",
      shortTitle: "Projects",
      description: "Projects, GitHub links and achievements.",
      href: "/dashboard/profile/projects",
      complete: projectsComplete,
      number: "06",
      accent: "pink",
    },
  ];

  const displayName =
    [profile?.firstName, profile?.lastName].filter(Boolean).join(" ") ||
    "Your Profile";

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#02040a] text-slate-200">
      {/* =========================================================
          AMBIENT BACKGROUND
      ========================================================== */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        {/* Main cyan glow */}
        <div className="absolute -left-48 -top-40 h-[620px] w-[620px] rounded-full bg-cyan-500/[0.055] blur-[140px]" />

        {/* Violet glow */}
        <div className="absolute -right-48 top-[10%] h-[720px] w-[720px] rounded-full bg-violet-600/[0.07] blur-[160px]" />

        {/* Blue lower glow */}
        <div className="absolute bottom-[-300px] left-[30%] h-[650px] w-[650px] rounded-full bg-blue-600/[0.045] blur-[150px]" />

        {/* Fine grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* Top light trails */}
        <div className="absolute left-[38%] top-[-280px] h-[540px] w-[540px] rounded-full border border-cyan-400/[0.08]" />
        <div className="absolute left-[40%] top-[-260px] h-[500px] w-[500px] rounded-full border border-violet-400/[0.07]" />
      </div>

      {/* =========================================================
          HEADER
      ========================================================== */}
      <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#02040a]/75 backdrop-blur-2xl">
        <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="group relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.025] shadow-lg shadow-black/10 transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-400/30 hover:bg-cyan-400/[0.07] hover:shadow-cyan-500/10"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 to-violet-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <ArrowLeft className="relative h-4 w-4 text-slate-400 transition-all duration-300 group-hover:-translate-x-0.5 group-hover:text-cyan-300" />
            </Link>

            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-slate-500">
                Dashboard
              </p>

              <h1 className="mt-0.5 text-lg font-semibold text-white">
                Profile
              </h1>
            </div>
          </div>

          <div className="rounded-full border border-white/[0.08] bg-white/[0.025] p-0.5 shadow-lg shadow-black/10 transition-all duration-300 hover:border-cyan-400/20">
            <UserButton />
          </div>
        </div>
      </header>

      {/* =========================================================
          MAIN
      ========================================================== */}
      <main className="relative z-10 mx-auto max-w-7xl px-5 py-8 sm:px-6 lg:px-8 lg:py-12">
        {/* =====================================================
            HERO
        ====================================================== */}
        <section className="relative overflow-hidden rounded-[2rem] border border-white/[0.08] bg-white/[0.02] p-6 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-8 lg:p-10">
          {/* Hero glow */}
          <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-cyan-400/[0.07] blur-[90px]" />

          <div className="pointer-events-none absolute -bottom-40 left-[35%] h-72 w-72 rounded-full bg-violet-500/[0.05] blur-[90px]" />

          {/* Decorative line */}
          <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />

          <div className="relative flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <div className="max-w-3xl">
              {/* Eyebrow */}
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/[0.055] px-3.5 py-2 shadow-lg shadow-cyan-500/5">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-cyan-400/10">
                  <Sparkles className="h-3 w-3 text-cyan-300" />
                </div>

                <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-cyan-300">
                  Career Intelligence
                </span>
              </div>

              <h2 className="text-4xl font-semibold tracking-[-0.03em] text-white sm:text-5xl lg:text-6xl">
                Your{" "}
                <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent">
                  Profile
                </span>
              </h2>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
                Build a stronger professional identity and unlock smarter AI
                job matches tailored to your experience, skills and goals.
              </p>

              {/* Mini indicators */}
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.07] bg-white/[0.025] px-3 py-1.5 text-xs text-slate-400">
                  <CircleDot className="h-3.5 w-3.5 text-cyan-400" />
                  AI-powered matching
                </div>

                <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.07] bg-white/[0.025] px-3 py-1.5 text-xs text-slate-400">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                  Profile protected
                </div>
              </div>
            </div>

            {/* Status */}
            <div className="shrink-0 rounded-2xl border border-emerald-400/15 bg-emerald-400/[0.035] p-4 shadow-xl shadow-emerald-500/[0.03]">
              <div className="flex items-center gap-3">
                <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-emerald-400/10 ring-1 ring-emerald-400/20">
                  <Check className="h-4 w-4 text-emerald-400" />

                  <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/60" />
                </div>

                <div>
                  <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Profile status
                  </p>

                  <p className="mt-1 text-sm font-semibold text-emerald-300">
                    {completionPercentage === 100
                      ? "Fully optimized"
                      : `${completedSections}/${totalSections} sections complete`}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            COMPLETION PANEL
        ====================================================== */}
        <section className="group relative mt-6 overflow-hidden rounded-[2rem] border border-white/[0.08] bg-white/[0.025] p-6 shadow-2xl shadow-black/20 backdrop-blur-xl transition-all duration-500 hover:border-white/[0.12] hover:shadow-cyan-500/[0.025] sm:p-8">
          {/* Decorative glows */}
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-cyan-400/[0.06] blur-[90px] transition-all duration-700 group-hover:bg-cyan-400/[0.09]" />

          <div className="pointer-events-none absolute -bottom-28 left-[45%] h-64 w-64 rounded-full bg-violet-500/[0.04] blur-[90px]" />

          {/* Top gradient */}
          <div className="absolute left-8 right-8 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />

          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            {/* Percentage */}
            <div>
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-cyan-400/20 bg-gradient-to-br from-cyan-400/15 to-blue-500/[0.05] shadow-lg shadow-cyan-500/5">
                  <Sparkles className="h-4 w-4 text-cyan-300" />
                </div>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-cyan-300">
                    Profile Completeness
                  </p>

                  <p className="mt-0.5 text-[11px] text-slate-600">
                    Build every section for stronger matches
                  </p>
                </div>
              </div>

              <div className="mt-5 flex items-baseline gap-3">
                <span className="bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-5xl font-semibold tracking-[-0.04em] text-transparent sm:text-6xl">
                  {completionPercentage}%
                </span>

                <span className="text-sm text-slate-500">
                  profile complete
                </span>
              </div>

              <p className="mt-2 text-sm text-slate-500">
                {completedSections} of {totalSections} sections completed
              </p>
            </div>

            {/* Progress */}
            <div className="w-full lg:max-w-lg">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-600">
                  Completion score
                </span>

                <span className="text-sm font-semibold text-cyan-300">
                  {completionPercentage}%
                </span>
              </div>

              <div className="relative h-3 overflow-hidden rounded-full border border-white/[0.06] bg-white/[0.045] p-0.5 shadow-inner shadow-black/30">
                <div
                  className="relative h-full overflow-hidden rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 shadow-lg shadow-cyan-500/20 transition-all duration-700"
                  style={{
                    width: `${completionPercentage}%`,
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/20" />
                </div>
              </div>

              <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                A complete profile improves AI matching accuracy.
              </div>
            </div>
          </div>

          {/* Checklist */}
          <div className="relative mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {profileSections.map((section) => (
              <CompletionItem
                key={section.title}
                label={section.shortTitle}
                complete={section.complete}
              />
            ))}
          </div>
        </section>

        {/* =====================================================
            PROFILE BUILDER HEADING
        ====================================================== */}
        <div className="mt-12 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <div className="flex items-center gap-2">
              <div className="h-px w-7 bg-gradient-to-r from-cyan-400 to-transparent" />

              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-cyan-400">
                Profile Builder
              </p>
            </div>

            <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Build your professional identity
            </h3>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              Keep your profile updated so JobBuddy AI can find opportunities
              that actually fit you.
            </p>
          </div>

          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/[0.07] bg-white/[0.025] px-3.5 py-2 text-xs text-slate-500">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/50" />
            {completedSections}/{totalSections} complete
          </div>
        </div>

        {/* =====================================================
            PROFILE CARDS
        ====================================================== */}
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {profileSections.map((section) => (
            <ProfileSection
              key={section.title}
              icon={section.icon}
              title={section.title}
              description={section.description}
              href={section.href}
              complete={section.complete}
              number={section.number}
              accent={section.accent}
            />
          ))}
        </div>

        {/* =====================================================
            RESUME INTELLIGENCE
        ====================================================== */}
        <section className="group relative mt-6 overflow-hidden rounded-[2rem] border border-white/[0.08] bg-white/[0.025] p-6 shadow-2xl shadow-black/20 backdrop-blur-xl transition-all duration-500 hover:border-violet-400/20 hover:shadow-violet-500/[0.035] sm:p-8">
          <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-violet-500/[0.07] blur-[90px] transition-all duration-700 group-hover:bg-violet-500/[0.11]" />

          <div className="pointer-events-none absolute -bottom-28 left-[40%] h-56 w-56 rounded-full bg-cyan-500/[0.035] blur-[80px]" />

          <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-400/30 to-transparent" />

          <div className="relative flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex gap-4">
              <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-violet-400/20 bg-gradient-to-br from-violet-500/15 via-blue-500/[0.08] to-cyan-500/[0.05] shadow-xl shadow-violet-500/[0.06] transition-all duration-500 group-hover:scale-105 group-hover:border-violet-400/30">
                <FileCheck2 className="h-6 w-6 text-violet-300" />

                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full border border-[#02040a] bg-emerald-400">
                  <Check className="h-2.5 w-2.5 text-[#02040a]" />
                </span>
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2.5">
                  <h3 className="text-lg font-semibold text-white">
                    Resume Intelligence
                  </h3>

                  <span className="rounded-full border border-cyan-400/20 bg-cyan-400/[0.06] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.16em] text-cyan-300">
                    AI Ready
                  </span>
                </div>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                  Manage your resume and let JobBuddy AI understand your
                  experience, skills and career profile.
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  <ResumeBadge text="Resume parsing" />
                  <ResumeBadge text="AI analysis" />
                  <ResumeBadge text="Job matching" />
                </div>
              </div>
            </div>

            <Link
              href="/dashboard/resume"
              className="group/button inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-cyan-400/20 bg-gradient-to-r from-cyan-400/10 via-blue-500/[0.08] to-violet-500/10 px-5 py-3 text-sm font-semibold text-cyan-200 shadow-lg shadow-cyan-500/[0.04] transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-300/40 hover:from-cyan-400/15 hover:via-blue-500/[0.12] hover:to-violet-500/15 hover:shadow-xl hover:shadow-cyan-500/[0.08]"
            >
              Manage Resume
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/button:translate-x-1" />
            </Link>
          </div>
        </section>

        {/* =====================================================
            BOTTOM TRUST STRIP
        ====================================================== */}
        <div className="mt-5 flex flex-col gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.015] px-5 py-4 shadow-lg shadow-black/10 backdrop-blur-xl transition-all duration-300 hover:border-white/[0.09] sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2.5 text-xs text-slate-500">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-400/[0.06] ring-1 ring-emerald-400/10">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
            </div>

            <span>Your profile powers personalized AI job matching.</span>
          </div>

          <Link
            href="/dashboard/jobs"
            className="group inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-300 transition-all duration-300 hover:text-cyan-200"
          >
            Explore matched jobs
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </main>
    </div>
  );
}

/* =============================================================
   COMPLETION ITEM
============================================================= */

function CompletionItem({
  label,
  complete,
}: {
  label: string;
  complete: boolean;
}) {
  return (
    <div
      className={`group/item relative flex items-center gap-3 overflow-hidden rounded-2xl border px-4 py-3 transition-all duration-300 ${
        complete
          ? "border-emerald-400/10 bg-emerald-400/[0.025] hover:-translate-y-0.5 hover:border-emerald-400/25 hover:bg-emerald-400/[0.045] hover:shadow-lg hover:shadow-emerald-500/[0.04]"
          : "border-white/[0.07] bg-white/[0.015] hover:-translate-y-0.5 hover:border-cyan-400/15 hover:bg-white/[0.025]"
      }`}
    >
      <div
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
          complete
            ? "bg-emerald-400/10 ring-1 ring-emerald-400/20 group-hover/item:scale-105 group-hover/item:bg-emerald-400/15"
            : "bg-white/[0.035] ring-1 ring-white/[0.08]"
        }`}
      >
        {complete ? (
          <Check className="h-3.5 w-3.5 text-emerald-400" />
        ) : (
          <span className="h-1.5 w-1.5 rounded-full bg-slate-600" />
        )}
      </div>

      <span
        className={
          complete
            ? "text-sm font-medium text-slate-200"
            : "text-sm text-slate-500"
        }
      >
        {label}
      </span>

      {complete && (
        <span className="ml-auto text-[9px] font-bold uppercase tracking-[0.16em] text-emerald-400/70">
          Done
        </span>
      )}
    </div>
  );
}

/* =============================================================
   PROFILE SECTION CARD
============================================================= */

function ProfileSection({
  icon: Icon,
  title,
  description,
  href,
  complete,
  number,
  accent,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  href: string;
  complete: boolean;
  number: string;
  accent: string;
}) {
  const accentStyles: Record<
    string,
    {
      icon: string;
      glow: string;
      line: string;
    }
  > = {
    cyan: {
      icon: "border-cyan-400/20 bg-cyan-400/[0.08] text-cyan-300",
      glow: "group-hover:bg-cyan-400/[0.055]",
      line: "group-hover:from-cyan-400/60",
    },
    violet: {
      icon: "border-violet-400/20 bg-violet-400/[0.08] text-violet-300",
      glow: "group-hover:bg-violet-400/[0.055]",
      line: "group-hover:from-violet-400/60",
    },
    blue: {
      icon: "border-blue-400/20 bg-blue-400/[0.08] text-blue-300",
      glow: "group-hover:bg-blue-400/[0.055]",
      line: "group-hover:from-blue-400/60",
    },
    emerald: {
      icon: "border-emerald-400/20 bg-emerald-400/[0.08] text-emerald-300",
      glow: "group-hover:bg-emerald-400/[0.055]",
      line: "group-hover:from-emerald-400/60",
    },
    amber: {
      icon: "border-amber-400/20 bg-amber-400/[0.08] text-amber-300",
      glow: "group-hover:bg-amber-400/[0.055]",
      line: "group-hover:from-amber-400/60",
    },
    pink: {
      icon: "border-pink-400/20 bg-pink-400/[0.08] text-pink-300",
      glow: "group-hover:bg-pink-400/[0.055]",
      line: "group-hover:from-pink-400/60",
    },
  };

  const style = accentStyles[accent];

  return (
    <Link
      href={href}
      className={`group relative overflow-hidden rounded-[1.75rem] border border-white/[0.08] bg-white/[0.025] p-6 shadow-xl shadow-black/10 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1.5 hover:border-white/[0.15] hover:shadow-2xl hover:shadow-black/30 ${style.glow}`}
    >
      {/* Top accent line */}
      <div
        className={`absolute left-6 right-6 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent transition-all duration-500 ${style.line}`}
      />

      {/* Hover glow */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-white/[0.025] blur-3xl transition-all duration-700 group-hover:scale-150 group-hover:bg-white/[0.05]" />

      {/* Hover gradient */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.025] via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      {/* Top row */}
      <div className="relative flex items-start justify-between">
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-2xl border transition-all duration-500 group-hover:scale-105 group-hover:shadow-lg ${style.icon}`}
        >
          <Icon className="h-5 w-5 transition-transform duration-500 group-hover:scale-110" />
        </div>

        <div className="flex items-center gap-2">
          {complete && (
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-400/10 ring-1 ring-emerald-400/20">
              <Check className="h-3 w-3 text-emerald-400" />
            </span>
          )}

          <span className="text-[10px] font-bold tracking-[0.2em] text-slate-700 transition-colors duration-300 group-hover:text-slate-500">
            {number}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="relative mt-6">
        <div className="flex items-center gap-2">
          <h3 className="text-base font-semibold text-white transition-colors duration-300 group-hover:text-cyan-100">
            {title}
          </h3>
        </div>

        <p className="mt-2 min-h-[48px] text-sm leading-6 text-slate-500 transition-colors duration-300 group-hover:text-slate-400">
          {description}
        </p>

        <div className="mt-6 flex items-center justify-between">
          <span
            className={`text-sm font-semibold transition-colors duration-300 ${
              complete
                ? "text-slate-300 group-hover:text-white"
                : "text-cyan-300"
            }`}
          >
            {complete ? "Review profile" : "Complete section"}
          </span>

          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.025] transition-all duration-300 group-hover:border-cyan-400/25 group-hover:bg-cyan-400/[0.07] group-hover:shadow-lg group-hover:shadow-cyan-500/[0.08]">
            <ArrowRight className="h-3.5 w-3.5 text-slate-500 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-cyan-300" />
          </span>
        </div>
      </div>
    </Link>
  );
}

/* =============================================================
   RESUME BADGE
============================================================= */

function ResumeBadge({ text }: { text: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.07] bg-white/[0.02] px-2.5 py-1 text-[10px] text-slate-500">
      <Zap className="h-3 w-3 text-violet-300" />
      {text}
    </span>
  );
}