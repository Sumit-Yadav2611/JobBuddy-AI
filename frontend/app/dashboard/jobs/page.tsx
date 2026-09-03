import { auth } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import {
  ArrowLeft,
  BriefcaseBusiness,
  Database,
  Radio,
  Sparkles,
  Zap,
} from "lucide-react";
import { desc } from "drizzle-orm";

import { db } from "@/lib/db";
import { jobs } from "@/lib/db/schema";

import JobsClient from "./JobsClient";

export default async function JobsPage() {
  await auth.protect();

  const userJobs = await db
    .select()
    .from(jobs)
    .orderBy(desc(jobs.createdAt))
    .limit(50);

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
              Job Discovery
            </h1>
          </div>
        </div>

        <UserButton />
      </header>

      {/* =========================================================
          Main Content
      ========================================================== */}
      <main className="relative z-10 mx-auto max-w-[1440px] px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
        {/* =======================================================
            Hero
        ======================================================== */}
        <section className="group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-[#0a101d] via-[#080d18] to-[#100b20] p-7 shadow-2xl shadow-black/20 backdrop-blur-xl lg:p-9">
          {/* Ambient hero glow */}
          <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-cyan-400/[0.07] blur-[120px]" />

          <div className="pointer-events-none absolute -bottom-40 left-[35%] h-96 w-96 rounded-full bg-violet-500/[0.055] blur-[130px]" />

          <div className="pointer-events-none absolute bottom-0 right-0 h-72 w-72 bg-gradient-to-tl from-blue-500/[0.035] to-transparent" />

          {/* Decorative rings */}
          <div className="pointer-events-none absolute -right-28 top-1/2 hidden h-80 w-80 -translate-y-1/2 rounded-full border border-cyan-400/[0.06] lg:block" />

          <div className="pointer-events-none absolute -right-8 top-1/2 hidden h-60 w-60 -translate-y-1/2 rounded-full border border-violet-400/[0.06] lg:block" />

          <div className="relative z-10">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/[0.05] px-3.5 py-1.5 shadow-lg shadow-cyan-500/[0.03]">
              <Sparkles className="h-3.5 w-3.5 text-cyan-300" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-300">
                AI-powered job discovery
              </span>
            </div>

            {/* Heading */}
            <h2 className="mt-5 max-w-4xl text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Find your next{" "}
              <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent">
                opportunity
              </span>
            </h2>

            <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
              Discover jobs collected by JobBuddy AI and matched against your
              skills, experience, and professional profile.
            </p>

            {/* =================================================
                Stats
            ================================================== */}
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {/* Available Jobs */}
              <div className="group/stat rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4 transition-all duration-200 hover:border-cyan-400/15 hover:bg-white/[0.035]">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-cyan-400/15 bg-cyan-400/[0.06] shadow-lg shadow-cyan-500/[0.03]">
                    <BriefcaseBusiness className="h-4 w-4 text-cyan-300" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-600">
                      Available jobs
                    </p>

                    <p className="mt-0.5 text-xl font-bold text-white">
                      {userJobs.length}
                    </p>
                  </div>
                </div>

                <p className="mt-3 text-[10px] text-slate-600">
                  Opportunities waiting
                </p>
              </div>

              {/* Source */}
              <div className="group/stat rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4 transition-all duration-200 hover:border-violet-400/15 hover:bg-white/[0.035]">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-violet-400/15 bg-violet-400/[0.06] shadow-lg shadow-violet-500/[0.03]">
                    <Database className="h-4 w-4 text-violet-300" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-600">
                      Job source
                    </p>

                    <p className="mt-0.5 text-xl font-bold text-white">
                      Arbeitnow
                    </p>
                  </div>
                </div>

                <p className="mt-3 text-[10px] text-slate-600">
                  Live job board
                </p>
              </div>

              {/* Status */}
              <div className="group/stat rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4 transition-all duration-200 hover:border-emerald-400/15 hover:bg-white/[0.035]">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-emerald-400/15 bg-emerald-400/[0.06] shadow-lg shadow-emerald-500/[0.03]">
                    <Radio className="h-4 w-4 text-emerald-300" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-600">
                      Status
                    </p>

                    <div className="mt-1 flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />

                      <p className="text-xl font-bold text-white">Live</p>
                    </div>
                  </div>
                </div>

                <p className="mt-3 text-[10px] text-slate-600">
                  Real-time updates
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =======================================================
            Discovery Section
        ======================================================== */}
        <section className="mt-10">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />

                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-300">
                  Opportunities
                </p>
              </div>

              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">
                Explore job matches
              </h2>

              <p className="mt-1 text-sm text-slate-600">
                Jobs ranked using your JobBuddy AI profile.
              </p>
            </div>

            {/* Live indicator */}
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/[0.07] bg-white/[0.025] px-3 py-1.5">
              <Zap className="h-3 w-3 text-cyan-300" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-500">
                AI matched
              </span>

              <span className="h-1 w-1 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
            </div>
          </div>

          {/* Jobs Client */}
          <JobsClient initialJobs={userJobs} />
        </section>
      </main>
    </div>
  );
}