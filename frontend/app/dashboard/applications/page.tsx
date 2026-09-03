import { auth } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { and, desc, eq } from "drizzle-orm";
import {
  ArrowLeft,
  BriefcaseBusiness,
  Sparkles,
  Activity,
  BarChart3,
} from "lucide-react";

import { db } from "@/lib/db";
import { users, jobs, applications } from "@/lib/db/schema";

import ApplicationsClient from "./ApplicationsClient";

export default async function ApplicationsPage() {
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
    return (
      <div className="min-h-screen bg-[#02040a] p-10 text-slate-200">
        <div className="mx-auto max-w-3xl rounded-3xl border border-white/[0.08] bg-[#080d18] p-8">
          <h1 className="text-2xl font-semibold text-white">
            User not found
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Please upload and analyze your resume first.
          </p>
        </div>
      </div>
    );
  }

  const userApplications = await db
    .select({
      id: applications.id,
      status: applications.status,
      appliedAt: applications.appliedAt,
      createdAt: applications.createdAt,
      updatedAt: applications.updatedAt,

      jobId: jobs.id,
      title: jobs.title,
      company: jobs.company,
      location: jobs.location,
      jobType: jobs.jobType,
      url: jobs.url,
    })
    .from(applications)
    .innerJoin(jobs, eq(applications.jobId, jobs.id))
    .where(eq(applications.userId, dbUser.id))
    .orderBy(desc(applications.createdAt));

  const serializedApplications = userApplications.map((application) => ({
    ...application,
    appliedAt: application.appliedAt.toISOString(),
    createdAt: application.createdAt.toISOString(),
    updatedAt: application.updatedAt.toISOString(),
  }));

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
              Application Status
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
          <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-cyan-400/[0.07] blur-[120px]" />

          <div className="pointer-events-none absolute -bottom-40 left-[35%] h-96 w-96 rounded-full bg-violet-500/[0.055] blur-[130px]" />

          <div className="pointer-events-none absolute -right-28 top-1/2 hidden h-80 w-80 -translate-y-1/2 rounded-full border border-cyan-400/[0.06] lg:block" />

          <div className="pointer-events-none absolute -right-8 top-1/2 hidden h-60 w-60 -translate-y-1/2 rounded-full border border-violet-400/[0.06] lg:block" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/[0.05] px-3.5 py-1.5 shadow-lg shadow-cyan-500/[0.03]">
              <Activity className="h-3.5 w-3.5 text-cyan-300" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-300">
                Application tracking
              </span>
            </div>

            <h2 className="mt-5 max-w-4xl text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Track your{" "}
              <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent">
                career progress
              </span>
            </h2>

            <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
              Keep every application organized, monitor your progress, and
              update each opportunity as it moves through your hiring journey.
            </p>

            {/* Quick summary */}
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4 transition-all duration-200 hover:border-cyan-400/15 hover:bg-white/[0.035]">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/15 bg-cyan-400/[0.06]">
                    <BriefcaseBusiness className="h-4 w-4 text-cyan-300" />
                  </div>

                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-600">
                      Applications
                    </p>

                    <p className="mt-0.5 text-xl font-bold text-white">
                      {serializedApplications.length}
                    </p>
                  </div>
                </div>

                <p className="mt-3 text-[10px] text-slate-600">
                  Opportunities you are currently tracking
                </p>
              </div>

              <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4 transition-all duration-200 hover:border-violet-400/15 hover:bg-white/[0.035]">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-400/15 bg-violet-400/[0.06]">
                    <BarChart3 className="h-4 w-4 text-violet-300" />
                  </div>

                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-600">
                      Tracking
                    </p>

                    <p className="mt-0.5 text-xl font-bold text-white">
                      Live
                    </p>
                  </div>
                </div>

                <p className="mt-3 text-[10px] text-slate-600">
                  Update statuses as your applications progress
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =======================================================
            Applications
        ======================================================== */}
        <section className="mt-12">
  <div className="mb-7 flex items-end justify-between">
    <div>
      <div className="flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />

        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-300">
          Your pipeline
        </p>
      </div>

      <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
        Application pipeline
      </h2>

      <p className="mt-2 text-sm leading-6 text-slate-600">
        Monitor every opportunity from application to outcome.
      </p>
    </div>

    <div className="hidden items-center gap-2 rounded-full border border-white/[0.07] bg-white/[0.025] px-3 py-2 sm:flex">
      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_7px_rgba(52,211,153,0.8)]" />

      <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-500">
        Live tracking
      </span>
    </div>
  </div>

  <ApplicationsClient
    initialApplications={serializedApplications}
  />
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
                  <Sparkles className="h-5 w-5 text-cyan-300" />
                </div>

                <div>
                  <p className="text-sm font-semibold text-white">
                    Ready for your next application?
                  </p>

                  <p className="mt-1 text-xs text-slate-600">
                    Discover fresh opportunities matched to your profile.
                  </p>
                </div>
              </div>

              <div className="text-sm font-semibold text-cyan-300 transition-transform duration-200 group-hover:translate-x-1">
                Explore Jobs →
              </div>
            </div>
          </Link>
        </section>
      </main>
    </div>
  );
}