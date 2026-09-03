import { auth } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import {
  ArrowLeft,
  Bookmark,
  BriefcaseBusiness,
  Sparkles,
  Database,
  ShieldCheck,
} from "lucide-react";
import { desc, eq } from "drizzle-orm";

import { db } from "@/lib/db";
import {
  jobs,
  savedJobs,
  users,
} from "@/lib/db/schema";

import SavedJobsClient from "./SavedJobsClient";

export default async function SavedJobsPage() {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  const [dbUser] = await db
    .select()
    .from(users)
    .where(eq(users.clerkId, userId))
    .limit(1);

  if (!dbUser) {
    return null;
  }

  const userSavedJobs = await db
    .select({
      savedJobId: savedJobs.id,
      id: jobs.id,
      title: jobs.title,
      company: jobs.company,
      platform: jobs.platform,
      location: jobs.location,
      jobType: jobs.jobType,
      description: jobs.description,
      salary: jobs.salary,
      url: jobs.url,
      matchScore: jobs.matchScore,
      createdAt: savedJobs.createdAt,
    })
    .from(savedJobs)
    .innerJoin(jobs, eq(savedJobs.jobId, jobs.id))
    .where(eq(savedJobs.userId, dbUser.id))
    .orderBy(desc(savedJobs.createdAt));

  return (
    <div className="min-h-screen bg-[#02040a] text-slate-200">
      {/* =========================================================
          Ambient Background
      ========================================================== */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-cyan-400/[0.035] blur-[150px]" />

        <div className="absolute right-[-120px] top-[25%] h-[620px] w-[620px] rounded-full bg-violet-500/[0.03] blur-[170px]" />

        <div className="absolute bottom-[-150px] left-[30%] h-[500px] w-[500px] rounded-full bg-blue-500/[0.025] blur-[150px]" />
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
              Saved Jobs
            </h1>
          </div>
        </div>

        <UserButton />
      </header>

      {/* =========================================================
          Main
      ========================================================== */}
      <main className="relative z-10 mx-auto max-w-[1440px] px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
        {/* =======================================================
            Hero
        ======================================================== */}
        <section className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-[#0a101d] via-[#080d18] to-[#100b20] p-7 shadow-2xl shadow-black/20 backdrop-blur-xl lg:p-9">
          {/* Glows */}
          <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-cyan-400/[0.07] blur-[120px]" />

          <div className="pointer-events-none absolute -bottom-40 left-[35%] h-96 w-96 rounded-full bg-violet-500/[0.055] blur-[130px]" />

          {/* Decorative rings */}
          <div className="pointer-events-none absolute -right-28 top-1/2 hidden h-80 w-80 -translate-y-1/2 rounded-full border border-cyan-400/[0.06] lg:block" />

          <div className="pointer-events-none absolute -right-8 top-1/2 hidden h-60 w-60 -translate-y-1/2 rounded-full border border-violet-400/[0.06] lg:block" />

          <div className="relative z-10">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/[0.05] px-3.5 py-1.5 shadow-lg shadow-cyan-500/[0.03]">
              <Bookmark className="h-3.5 w-3.5 text-cyan-300" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-300">
                Your saved opportunities
              </span>
            </div>

            {/* Heading */}
            <h2 className="mt-5 max-w-4xl text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Keep your best{" "}
              <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent">
                opportunities close
              </span>
            </h2>

            <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
              Review the jobs you've saved, compare your AI match scores,
              and jump back into an opportunity whenever you're ready.
            </p>

            {/* =================================================
                Stats
            ================================================== */}
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {/* Saved jobs */}
              <div className="group rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4 transition-all duration-200 hover:border-cyan-400/15 hover:bg-white/[0.035]">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-cyan-400/15 bg-cyan-400/[0.06] shadow-lg shadow-cyan-500/[0.03]">
                    <Bookmark className="h-4 w-4 text-cyan-300" />
                  </div>

                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-600">
                      Saved jobs
                    </p>

                    <p className="mt-0.5 text-xl font-bold text-white">
                      {userSavedJobs.length}
                    </p>
                  </div>
                </div>

                <p className="mt-3 text-[10px] text-slate-600">
                  Opportunities you've shortlisted
                </p>
              </div>

              {/* AI */}
              <div className="group rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4 transition-all duration-200 hover:border-violet-400/15 hover:bg-white/[0.035]">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-violet-400/15 bg-violet-400/[0.06] shadow-lg shadow-violet-500/[0.03]">
                    <Sparkles className="h-4 w-4 text-violet-300" />
                  </div>

                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-600">
                      AI matching
                    </p>

                    <p className="mt-0.5 text-xl font-bold text-white">
                      Active
                    </p>
                  </div>
                </div>

                <p className="mt-3 text-[10px] text-slate-600">
                  Match scores stay with your jobs
                </p>
              </div>

              {/* Private */}
              <div className="group rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4 transition-all duration-200 hover:border-emerald-400/15 hover:bg-white/[0.035]">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-emerald-400/15 bg-emerald-400/[0.06] shadow-lg shadow-emerald-500/[0.03]">
                    <ShieldCheck className="h-4 w-4 text-emerald-300" />
                  </div>

                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-600">
                      Collection
                    </p>

                    <p className="mt-0.5 text-xl font-bold text-white">
                      Private
                    </p>
                  </div>
                </div>

                <p className="mt-3 text-[10px] text-slate-600">
                  Saved to your JobBuddy account
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =======================================================
            Saved Jobs
        ======================================================== */}
        <section className="mt-10">
          <SavedJobsClient initialJobs={userSavedJobs} />
        </section>

        {/* =======================================================
            Bottom CTA
        ======================================================== */}
        <section className="mt-8">
          <Link
            href="/dashboard/jobs"
            className="group relative flex overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-r from-[#08121e] via-[#080d18] to-[#100b1e] p-6 shadow-xl shadow-black/10 transition-all duration-200 hover:border-cyan-400/15"
          >
            <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-cyan-400/[0.05] blur-[80px]" />

            <div className="relative z-10 flex w-full flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-cyan-400/15 bg-cyan-400/[0.06]">
                  <BriefcaseBusiness className="h-5 w-5 text-cyan-300" />
                </div>

                <div>
                  <p className="text-sm font-semibold text-white">
                    Looking for more opportunities?
                  </p>

                  <p className="mt-1 text-xs text-slate-600">
                    Explore fresh jobs matched to your profile.
                  </p>
                </div>
              </div>

              <div className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-300">
                Explore Jobs

                <ArrowLeft className="h-4 w-4 rotate-180 transition-transform duration-200 group-hover:translate-x-1" />
              </div>
            </div>
          </Link>
        </section>
      </main>
    </div>
  );
}