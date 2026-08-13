import { auth } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { ArrowLeft, Code2 } from "lucide-react";
import { eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { users, skills } from "@/lib/db/schema";

export default async function SkillsPage() {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  // Find the application user using Clerk ID
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

  // Get skills extracted from the resume
  const userSkills = await db
    .select()
    .from(skills)
    .where(eq(skills.userId, dbUser.id));

  // Group skills by category
  const groupedSkills = userSkills.reduce(
    (groups, skill) => {
      const category = skill.category || "Other";

      if (!groups[category]) {
        groups[category] = [];
      }

      groups[category].push(skill);

      return groups;
    },
    {} as Record<string, typeof userSkills>,
  );

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

            <h1 className="text-lg font-semibold">Skills</h1>
          </div>
        </div>

        <UserButton />
      </header>

      {/* Main */}

      <main className="mx-auto max-w-5xl p-6 lg:p-10">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border bg-muted">
              <Code2 className="h-5 w-5" />
            </div>

            <div>
              <h2 className="text-3xl font-bold tracking-tight">Your Skills</h2>

              <p className="mt-1 text-muted-foreground">
                Skills extracted from your resume by JobBuddy AI.
              </p>
            </div>
          </div>
        </div>

        {/* Skill count */}

        <div className="mt-8 rounded-2xl border bg-card p-6">
          <p className="text-sm text-muted-foreground">Total Skills</p>

          <p className="mt-1 text-3xl font-bold">{userSkills.length}</p>

          <p className="mt-1 text-sm text-muted-foreground">
            Skills found in your resume
          </p>
        </div>

        {/* No skills */}

        {userSkills.length === 0 && (
          <div className="mt-6 rounded-2xl border bg-card p-8 text-center">
            <Code2 className="mx-auto h-10 w-10 text-muted-foreground" />

            <h3 className="mt-4 text-lg font-semibold">No skills found</h3>

            <p className="mt-2 text-sm text-muted-foreground">
              Upload and analyze your resume to extract your skills.
            </p>

            <Link
              href="/dashboard/resume"
              className="mt-5 inline-block rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90"
            >
              Go to Resume
            </Link>
          </div>
        )}

        {/* Skill categories */}

        <div className="mt-6 space-y-6">
          {Object.entries(groupedSkills).map(([category, categorySkills]) => (
            <section key={category} className="rounded-2xl border bg-card p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{category}</h3>

                <span className="rounded-full border px-3 py-1 text-xs text-muted-foreground">
                  {categorySkills.length}{" "}
                  {categorySkills.length === 1 ? "skill" : "skills"}
                </span>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {categorySkills.map((skill) => (
                  <div
                    key={skill.id}
                    className="rounded-xl border p-4 transition-all hover:-translate-y-0.5 hover:shadow-sm"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <h4 className="font-medium">{skill.name}</h4>

                      <Code2 className="h-4 w-4 text-muted-foreground" />
                    </div>

                    {skill.proficiency && (
                      <p className="mt-2 text-xs text-muted-foreground">
                        Proficiency:{" "}
                        <span className="font-medium text-foreground">
                          {skill.proficiency}
                        </span>
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}
