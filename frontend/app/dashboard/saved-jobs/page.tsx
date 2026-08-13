import { auth } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { eq, desc } from "drizzle-orm";
import SavedJobsClient from "./SavedJobsClient";

import {
  ArrowLeft,
  Bookmark,
  ExternalLink,
  MapPin,
  Building2,
} from "lucide-react";

import { db } from "@/lib/db";

import { users, savedJobs, jobs } from "@/lib/db/schema";

export default async function SavedJobsPage() {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  // Find current database user
  const [dbUser] = await db
    .select()
    .from(users)
    .where(eq(users.clerkId, userId))
    .limit(1);

  if (!dbUser) {
    return (
      <div className="min-h-screen bg-background p-10">
        <h1 className="text-2xl font-bold">User not found</h1>

        <p className="mt-2 text-muted-foreground">
          Please upload and analyze your resume first.
        </p>
      </div>
    );
  }

  // Get saved jobs
  const saved = await db
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
            <p className="text-sm text-muted-foreground">Dashboard</p>

            <h1 className="text-lg font-semibold">Saved Jobs</h1>
          </div>
        </div>

        <UserButton />
      </header>

      {/* Main */}

      <main className="mx-auto max-w-6xl p-6 lg:p-10">
        {/* Heading */}

        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl border bg-muted">
            <Bookmark className="h-6 w-6" />
          </div>

          <div>
            <h2 className="text-3xl font-bold tracking-tight">Saved Jobs</h2>

            <p className="mt-1 text-muted-foreground">
              Jobs you saved for later.
            </p>
          </div>
        </div>

        {/* Count */}

        <div className="mt-8">
          <p className="text-sm text-muted-foreground">
            {saved.length === 1 ? "1 saved job" : `${saved.length} saved jobs`}
          </p>
        </div>
        {/* Saved Jobs */}
    <SavedJobsClient initialJobs={saved} />
      </main>
    </div>
  );
}
