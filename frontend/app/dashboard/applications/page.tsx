import { auth } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { desc, eq } from "drizzle-orm";
import { ArrowLeft, BriefcaseBusiness } from "lucide-react";

import { db } from "@/lib/db";
import { users, jobs, applications } from "@/lib/db/schema";

import ApplicationsClient from "./ApplicationsClient";

export default async function ApplicationsPage() {
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

  // Get current user's applications
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

  // Convert Date objects to strings before passing
  // data from Server Component to Client Component.
  const serializedApplications = userApplications.map((application) => ({
    ...application,
    appliedAt: application.appliedAt.toISOString(),
    createdAt: application.createdAt.toISOString(),
    updatedAt: application.updatedAt.toISOString(),
  }));

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

            <h1 className="text-lg font-semibold">
              Application Status
            </h1>
          </div>
        </div>

        <UserButton />
      </header>

      {/* Main */}
      <main className="mx-auto max-w-6xl p-6 lg:p-10">
        {/* Page heading */}
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl border bg-muted">
            <BriefcaseBusiness className="h-5 w-5" />
          </div>

          <div>
            <h2 className="text-3xl font-bold tracking-tight">
              Application Status
            </h2>

            <p className="mt-1 text-muted-foreground">
              Track and manage your job applications.
            </p>
          </div>
        </div>

        {/* Interactive applications section */}
        <ApplicationsClient
          initialApplications={serializedApplications}
        />
      </main>
    </div>
  );
}