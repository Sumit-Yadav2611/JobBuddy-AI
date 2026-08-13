import { auth } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { ArrowLeft, BriefcaseBusiness, MapPin } from "lucide-react";
import { eq, desc } from "drizzle-orm";

import { db } from "@/lib/db";
import { users, experiences } from "@/lib/db/schema";

function formatDate(date: Date | null) {
  if (!date) return null;

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
  }).format(date);
}

function getDateRange(
  startDate: Date | null,
  endDate: Date | null,
  isCurrent: boolean,
) {
  const start = formatDate(startDate);

  if (!start) {
    return isCurrent ? "Present" : "Date not specified";
  }

  if (isCurrent) {
    return `${start} – Present`;
  }

  const end = formatDate(endDate);

  if (!end) {
    return `${start} – Date not specified`;
  }

  return `${start} – ${end}`;
}

export default async function ExperiencePage() {
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

  // Get experience entries for this user
  const userExperiences = await db
    .select()
    .from(experiences)
    .where(eq(experiences.userId, dbUser.id))
    .orderBy(desc(experiences.startDate));

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

            <h1 className="text-lg font-semibold">Experience</h1>
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
              <BriefcaseBusiness className="h-5 w-5" />
            </div>

            <div>
              <h2 className="text-3xl font-bold tracking-tight">
                Your Experience
              </h2>

              <p className="mt-1 text-muted-foreground">
                Work experience extracted from your resume by JobBuddy AI.
              </p>
            </div>
          </div>
        </div>

        {/* Experience count */}

        <div className="mt-8 rounded-2xl border bg-card p-6">
          <p className="text-sm text-muted-foreground">
            Total Experience Entries
          </p>

          <p className="mt-1 text-3xl font-bold">{userExperiences.length}</p>

          <p className="mt-1 text-sm text-muted-foreground">
            Positions found in your resume
          </p>
        </div>

        {/* Empty state */}

        {userExperiences.length === 0 && (
          <div className="mt-6 rounded-2xl border bg-card p-8 text-center">
            <BriefcaseBusiness className="mx-auto h-10 w-10 text-muted-foreground" />

            <h3 className="mt-4 text-lg font-semibold">No experience found</h3>

            <p className="mt-2 text-sm text-muted-foreground">
              Upload and analyze your resume to extract your experience.
            </p>

            <Link
              href="/dashboard/resume"
              className="mt-5 inline-block rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90"
            >
              Go to Resume
            </Link>
          </div>
        )}

        {/* Experience timeline */}

        {userExperiences.length > 0 && (
          <div className="mt-8 space-y-5">
            {userExperiences.map((experience, index) => (
              <article
                key={experience.id}
                className="relative rounded-2xl border bg-card p-6"
              >
                <div className="flex flex-col gap-5 sm:flex-row">
                  {/* Timeline icon */}

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border bg-muted">
                    <BriefcaseBusiness className="h-5 w-5" />
                  </div>

                  {/* Content */}

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col justify-between gap-2 sm:flex-row">
                      <div>
                        <h3 className="text-xl font-semibold">
                          {experience.role}
                        </h3>

                        <p className="mt-1 font-medium text-muted-foreground">
                          {experience.company}
                        </p>
                      </div>

                      <span className="text-sm text-muted-foreground">
                        {getDateRange(
                          experience.startDate,
                          experience.endDate,
                          experience.isCurrent,
                        )}
                      </span>
                    </div>

                    {/* Location */}

                    {experience.location && (
                      <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />

                        <span>{experience.location}</span>
                      </div>
                    )}

                    {/* Description */}

                    {experience.description && (
                      <div className="mt-5">
                        <p className="whitespace-pre-line text-sm leading-7 text-muted-foreground">
                          {experience.description}
                        </p>
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
