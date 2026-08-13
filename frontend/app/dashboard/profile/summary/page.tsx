import { auth } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import {
  ArrowLeft,
  FileText,
  Sparkles,
} from "lucide-react";
import { eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { users, profiles } from "@/lib/db/schema";

export default async function SummaryPage() {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  // Find current application user
  const [dbUser] = await db
    .select()
    .from(users)
    .where(eq(users.clerkId, userId))
    .limit(1);

  if (!dbUser) {
    return (
      <div className="min-h-screen bg-background p-10">
        <h1 className="text-2xl font-bold">
          User profile not found
        </h1>

        <p className="mt-2 text-muted-foreground">
          Please upload and analyze your resume first.
        </p>
      </div>
    );
  }

  // Get profile
  const [profile] = await db
    .select()
    .from(profiles)
    .where(eq(profiles.userId, dbUser.id))
    .limit(1);

  const summary = profile?.summary;

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
            <p className="text-sm text-muted-foreground">
              Profile
            </p>

            <h1 className="text-lg font-semibold">
              Summary
            </h1>
          </div>
        </div>

        <UserButton />
      </header>

      {/* Main */}

      <main className="mx-auto max-w-4xl p-6 lg:p-10">
        {/* Heading */}

        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border bg-muted">
              <FileText className="h-5 w-5" />
            </div>

            <div>
              <h2 className="text-3xl font-bold tracking-tight">
                Professional Summary
              </h2>

              <p className="mt-1 text-muted-foreground">
                Your professional summary generated from your resume.
              </p>
            </div>
          </div>
        </div>

        {/* Summary */}

        {summary ? (
          <section className="mt-8 rounded-2xl border bg-card p-6 lg:p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border bg-muted">
                <Sparkles className="h-5 w-5" />
              </div>

              <div>
                <h3 className="font-semibold">
                  AI-Generated Summary
                </h3>

                <p className="text-sm text-muted-foreground">
                  Based on the information found in your resume.
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-xl border bg-muted/30 p-5">
              <p className="whitespace-pre-line text-sm leading-7">
                {summary}
              </p>
            </div>
          </section>
        ) : (
          /* Empty state */

          <section className="mt-8 rounded-2xl border bg-card p-8 text-center">
            <FileText className="mx-auto h-10 w-10 text-muted-foreground" />

            <h3 className="mt-4 text-lg font-semibold">
              No summary available
            </h3>

            <p className="mt-2 text-sm text-muted-foreground">
              Upload and analyze your resume to generate your
              professional summary.
            </p>

            <Link
              href="/dashboard/resume"
              className="mt-5 inline-block rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90"
            >
              Go to Resume
            </Link>
          </section>
        )}
      </main>
    </div>
  );
}