import { auth } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { ArrowLeft, BriefcaseBusiness } from "lucide-react";
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
    <div className="min-h-screen bg-background">
      {/* Header */}

      <header className="flex h-16 items-center justify-between border-b px-6">
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard"
            className="rounded-lg p-2 transition-colors hover:bg-muted"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>

          <div>
            <p className="text-sm text-muted-foreground">
              Dashboard
            </p>

            <h1 className="text-lg font-semibold">
              Jobs
            </h1>
          </div>
        </div>

        <UserButton />
      </header>

      {/* Main */}

      <main className="mx-auto max-w-6xl p-6 lg:p-10">
        {/* Heading */}

        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border bg-muted">
              <BriefcaseBusiness className="h-5 w-5" />
            </div>

            <div>
              <h2 className="text-3xl font-bold tracking-tight">
                Find Your Next Job
              </h2>

              <p className="mt-1 text-muted-foreground">
                Discover jobs collected by JobBuddy AI.
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {/* Available Jobs */}

          <div className="rounded-2xl border bg-card p-5">
            <p className="text-sm text-muted-foreground">
              Available Jobs
            </p>

            <p className="mt-1 text-3xl font-bold">
              {userJobs.length}
            </p>
          </div>

          {/* Job Source */}

          <div className="rounded-2xl border bg-card p-5">
            <p className="text-sm text-muted-foreground">
              Job Source
            </p>

            <p className="mt-1 text-xl font-semibold">
              Arbeitnow
            </p>
          </div>

          {/* Status */}

          <div className="rounded-2xl border bg-card p-5">
            <p className="text-sm text-muted-foreground">
              Status
            </p>

            <p className="mt-1 text-xl font-semibold">
              Live
            </p>
          </div>
        </div>

        {/* 
          IMPORTANT:
          JobsClient now handles:
          - Search
          - Location filter
          - Refresh
          - Job cards
          - Result count
        */}

        <JobsClient initialJobs={userJobs} />
      </main>
    </div>
  );
}