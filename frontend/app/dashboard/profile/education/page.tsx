import { auth } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { ArrowLeft, GraduationCap } from "lucide-react";
import { eq, desc } from "drizzle-orm";

import { db } from "@/lib/db";
import { users, education } from "@/lib/db/schema";

function formatDate(date: Date | null) {
  if (!date) return null;

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
  }).format(date);
}

function getDateRange(startDate: Date | null, endDate: Date | null) {
  const start = formatDate(startDate);
  const end = formatDate(endDate);

  if (!start && !end) {
    return "Dates not specified";
  }

  if (start && end) {
    return `${start} – ${end}`;
  }

  if (start) {
    return `${start} – Present`;
  }

  return end ?? "Dates not specified";
}

export default async function EducationPage() {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  // Find the current application user
  const [dbUser] = await db
    .select()
    .from(users)
    .where(eq(users.clerkId, userId))
    .limit(1);

  if (!dbUser) {
    return (
      <div className="min-h-screen bg-background p-10">
        <h1 className="text-2xl font-bold">User profile not found</h1>

        <p className="mt-2 text-muted-foreground">
          Please upload and analyze your resume first.
        </p>
      </div>
    );
  }

  // Get education records for this user
  const userEducation = await db
    .select()
    .from(education)
    .where(eq(education.userId, dbUser.id))
    .orderBy(desc(education.endDate));

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}

      <header className="flex h-16 items-center justify-between border-b px-6">
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard/profile"
            className="rounded-lg p-2 transition-colors hover:bg-muted"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>

          <div>
            <p className="text-sm text-muted-foreground">Profile</p>

            <h1 className="text-lg font-semibold">Education</h1>
          </div>
        </div>

        <UserButton />
      </header>

      {/* Main */}

      <main className="mx-auto max-w-5xl p-6 lg:p-10">
        {/* Heading */}

        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border bg-muted">
              <GraduationCap className="h-5 w-5" />
            </div>

            <div>
              <h2 className="text-3xl font-bold tracking-tight">
                Your Education
              </h2>

              <p className="mt-1 text-muted-foreground">
                Academic information extracted from your resume by JobBuddy AI.
              </p>
            </div>
          </div>
        </div>

        {/* Education count */}

        <div className="mt-8 rounded-2xl border bg-card p-6">
          <p className="text-sm text-muted-foreground">Education Entries</p>

          <p className="mt-1 text-3xl font-bold">{userEducation.length}</p>

          <p className="mt-1 text-sm text-muted-foreground">
            Academic records found in your resume
          </p>
        </div>

        {/* Empty state */}

        {userEducation.length === 0 && (
          <div className="mt-6 rounded-2xl border bg-card p-8 text-center">
            <GraduationCap className="mx-auto h-10 w-10 text-muted-foreground" />

            <h3 className="mt-4 text-lg font-semibold">No education found</h3>

            <p className="mt-2 text-sm text-muted-foreground">
              Upload and analyze your resume to extract your education.
            </p>

            <Link
              href="/dashboard/resume"
              className="mt-5 inline-block rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90"
            >
              Go to Resume
            </Link>
          </div>
        )}

        {/* Education cards */}

        {userEducation.length > 0 && (
          <div className="mt-8 space-y-5">
            {userEducation.map((item) => (
              <article key={item.id} className="rounded-2xl border bg-card p-6">
                <div className="flex flex-col gap-5 sm:flex-row">
                  {/* Icon */}

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border bg-muted">
                    <GraduationCap className="h-5 w-5" />
                  </div>

                  {/* Content */}

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col justify-between gap-2 sm:flex-row">
                      <div>
                        <h3 className="text-xl font-semibold">
                          {item.degree || "Degree not specified"}
                        </h3>

                        {item.fieldOfStudy && (
                          <p className="mt-1 font-medium text-muted-foreground">
                            {item.fieldOfStudy}
                          </p>
                        )}
                      </div>

                      <span className="text-sm text-muted-foreground">
                        {getDateRange(item.startDate, item.endDate)}
                      </span>
                    </div>

                    {/* Institution */}

                    <p className="mt-4 text-sm font-medium">
                      {item.institution}
                    </p>

                    {/* Grade */}

                    {item.grade && (
                      <div className="mt-4 inline-flex rounded-full border px-3 py-1 text-xs text-muted-foreground">
                        Grade:{" "}
                        <span className="ml-1 font-medium text-foreground">
                          {item.grade}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
