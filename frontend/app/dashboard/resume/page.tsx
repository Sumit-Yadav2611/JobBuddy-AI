import { auth } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import {
  ArrowLeft,
  FileText,
  Sparkles,
  BrainCircuit,
  Layers3,
  BriefcaseBusiness,
  ArrowUpRight,
  ShieldCheck,
} from "lucide-react";

import ResumeUpload from "@/components/dashboard/ResumeUpload";

export default async function ResumePage() {
  await auth.protect();

  return (
    <div className="min-h-screen bg-[#02040a] text-slate-200">
      {/* =========================================================
          Ambient Background
      ========================================================== */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-cyan-400/[0.035] blur-[150px]" />

        <div className="absolute right-[-140px] top-[20%] h-[620px] w-[620px] rounded-full bg-violet-500/[0.03] blur-[170px]" />

        <div className="absolute bottom-[-160px] left-[30%] h-[520px] w-[520px] rounded-full bg-blue-500/[0.025] blur-[150px]" />
      </div>

      {/* =========================================================
          Subtle Grid
      ========================================================== */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.018]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      {/* =========================================================
          Header
      ========================================================== */}
      <header className="relative z-20 flex h-20 items-center justify-between border-b border-white/[0.07] bg-[#02040a]/80 px-5 backdrop-blur-xl sm:px-8 lg:px-10">
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard"
            className="group flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.025] transition-all duration-200 hover:border-cyan-400/20 hover:bg-cyan-400/[0.05]"
          >
            <ArrowLeft className="h-4 w-4 text-slate-500 transition-transform duration-200 group-hover:-translate-x-0.5 group-hover:text-cyan-300" />
          </Link>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-300">
              Workspace
            </p>

            <h1 className="mt-0.5 text-lg font-semibold tracking-tight text-white">
              Resume
            </h1>
          </div>
        </div>

        <UserButton />
      </header>

      {/* =========================================================
          Main
      ========================================================== */}
      <main className="relative z-10 mx-auto max-w-[1200px] px-5 py-8 sm:px-8 lg:px-10 lg:py-12">
        {/* =======================================================
            Hero
        ======================================================== */}
        <section className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-[#0a101d] via-[#080d18] to-[#100b20] p-7 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-9 lg:p-10">
          {/* Ambient glows */}
          <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-cyan-400/[0.07] blur-[120px]" />

          <div className="pointer-events-none absolute -bottom-40 left-[35%] h-96 w-96 rounded-full bg-violet-500/[0.055] blur-[130px]" />

          {/* Decorative rings */}
          <div className="pointer-events-none absolute -right-20 top-1/2 hidden h-80 w-80 -translate-y-1/2 rounded-full border border-cyan-400/[0.055] lg:block" />

          <div className="pointer-events-none absolute right-0 top-1/2 hidden h-56 w-56 -translate-y-1/2 rounded-full border border-violet-400/[0.05] lg:block" />

          <div className="relative z-10">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/[0.05] px-3.5 py-1.5 shadow-lg shadow-cyan-500/[0.03]">
              <Sparkles className="h-3.5 w-3.5 text-cyan-300" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-300">
                AI Resume Intelligence
              </span>
            </div>

            {/* Title */}
            <h2 className="mt-5 max-w-4xl text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Build your{" "}
              <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent">
                career profile
              </span>
            </h2>

            <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
              Upload your resume and let JobBuddy AI understand your
              experience, skills, education, and projects to create a stronger
              profile for job matching.
            </p>

            {/* Feature pills */}
            <div className="mt-7 flex flex-wrap gap-2">
              <FeaturePill
                icon={BrainCircuit}
                label="AI Analysis"
              />

              <FeaturePill
                icon={Layers3}
                label="Profile Extraction"
              />

              <FeaturePill
                icon={BriefcaseBusiness}
                label="Job Matching"
              />
            </div>
          </div>
        </section>

        {/* =======================================================
            Upload Section
        ======================================================== */}
        <section className="mt-8">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />

                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-300">
                  Resume workspace
                </p>
              </div>

              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">
                Upload your resume
              </h2>

              <p className="mt-1 text-sm text-slate-600">
                Your resume powers your personalized JobBuddy AI experience.
              </p>
            </div>
          </div>

          {/* Upload component remains unchanged */}
          <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-[#0a101d] via-[#080d18] to-[#100b20] p-1 shadow-2xl shadow-black/20">
            <div className="pointer-events-none absolute -right-28 -top-28 h-72 w-72 rounded-full bg-cyan-400/[0.055] blur-[100px]" />

            <div className="pointer-events-none absolute -bottom-28 -left-28 h-72 w-72 rounded-full bg-violet-500/[0.045] blur-[100px]" />

            <div className="relative z-10">
              <ResumeUpload />
            </div>
          </div>
        </section>

        {/* =======================================================
            What Happens Next
        ======================================================== */}
        <section className="mt-10">
          <div className="mb-5">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-violet-300 shadow-[0_0_8px_rgba(167,139,250,0.8)]" />

              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-violet-300">
                How it works
              </p>
            </div>

            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">
              From resume to opportunities
            </h2>

            <p className="mt-1 text-sm text-slate-600">
              JobBuddy AI turns your resume into a profile built for better
              job discovery.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            <ResumeStep
              number="01"
              icon={FileText}
              title="Extract"
              description="JobBuddy AI reads your resume and identifies your professional experience, skills, education, and projects."
              accent="cyan"
            />

            <ResumeStep
              number="02"
              icon={BrainCircuit}
              title="Build Profile"
              description="Your information is organized into a structured career profile that can be used throughout the platform."
              accent="blue"
            />

            <ResumeStep
              number="03"
              icon={BriefcaseBusiness}
              title="Match Jobs"
              description="Your profile becomes the foundation for discovering and ranking opportunities that fit your experience."
              accent="violet"
            />
          </div>
        </section>

        {/* =======================================================
            Privacy / Trust
        ======================================================== */}
        <section className="mt-8">
          <div className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 transition-all duration-200 hover:border-cyan-400/15 hover:bg-white/[0.035]">
            <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-cyan-400/[0.035] blur-[70px]" />

            <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-emerald-400/15 bg-emerald-400/[0.06]">
                  <ShieldCheck className="h-4 w-4 text-emerald-300" />
                </div>

                <div>
                  <p className="text-sm font-semibold text-white">
                    Your resume powers your private profile
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-600">
                    Upload a PDF or DOCX file. JobBuddy AI uses the extracted
                    information to personalize your experience.
                  </p>
                </div>
              </div>

              <Link
                href="/dashboard/profile"
                className="group/profile inline-flex shrink-0 items-center gap-2 text-xs font-semibold text-cyan-300 transition-colors hover:text-cyan-200"
              >
                View Profile
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/profile:translate-x-0.5 group-hover/profile:-translate-y-0.5" />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

/* ===============================================================
   FEATURE PILL
================================================================ */

function FeaturePill({
  icon: Icon,
  label,
}: {
  icon: React.ElementType;
  label: string;
}) {
  return (
    <div className="inline-flex items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.025] px-3 py-2 transition-all duration-200 hover:border-cyan-400/15 hover:bg-cyan-400/[0.035]">
      <Icon className="h-3.5 w-3.5 text-cyan-300" />

      <span className="text-xs font-medium text-slate-400">
        {label}
      </span>
    </div>
  );
}

/* ===============================================================
   RESUME STEP
================================================================ */

function ResumeStep({
  number,
  icon: Icon,
  title,
  description,
  accent,
}: {
  number: string;
  icon: React.ElementType;
  title: string;
  description: string;
  accent: "cyan" | "blue" | "violet";
}) {
  const styles = {
    cyan: {
      border: "hover:border-cyan-400/15",
      iconBorder: "border-cyan-400/15",
      iconBg: "bg-cyan-400/[0.06]",
      iconColor: "text-cyan-300",
      numberColor: "text-cyan-300",
      glow: "bg-cyan-400/[0.035]",
    },
    blue: {
      border: "hover:border-blue-400/15",
      iconBorder: "border-blue-400/15",
      iconBg: "bg-blue-400/[0.06]",
      iconColor: "text-blue-300",
      numberColor: "text-blue-300",
      glow: "bg-blue-400/[0.03]",
    },
    violet: {
      border: "hover:border-violet-400/15",
      iconBorder: "border-violet-400/15",
      iconBg: "bg-violet-400/[0.06]",
      iconColor: "text-violet-300",
      numberColor: "text-violet-300",
      glow: "bg-violet-400/[0.03]",
    },
  }[accent];

  return (
    <article
      className={`group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 shadow-xl shadow-black/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/[0.035] ${styles.border}`}
    >
      <div
        className={`pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full blur-[80px] transition-opacity duration-300 ${styles.glow}`}
      />

      <div className="relative z-10">
        <div className="flex items-start justify-between">
          <div
            className={`flex h-11 w-11 items-center justify-center rounded-xl border ${styles.iconBorder} ${styles.iconBg}`}
          >
            <Icon className={`h-5 w-5 ${styles.iconColor}`} />
          </div>

          <span
            className={`text-[10px] font-bold uppercase tracking-[0.18em] ${styles.numberColor}`}
          >
            {number}
          </span>
        </div>

        <h3 className="mt-5 text-lg font-semibold tracking-tight text-white transition-colors group-hover:text-cyan-50">
          {title}
        </h3>

        <p className="mt-2 text-sm leading-6 text-slate-600">
          {description}
        </p>
      </div>
    </article>
  );
}