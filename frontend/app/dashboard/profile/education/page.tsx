import { auth } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { ArrowLeft, GraduationCap } from "lucide-react";
import { eq, desc } from "drizzle-orm";

import { db } from "@/lib/db";
import { users, education } from "@/lib/db/schema";
import EducationForm from "./EducationForm";

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
      <div className="min-h-screen bg-[#02040a] p-10 text-white">
        <h1 className="text-2xl font-bold">User profile not found</h1>

        <p className="mt-2 text-slate-400">
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
    .orderBy(desc(education.startDate));

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#02040a] text-white">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-15%] top-[-15%] h-[550px] w-[550px] rounded-full bg-cyan-500/10 blur-[120px]" />

        <div className="absolute right-[-15%] top-[10%] h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-[120px]" />

        <div className="absolute bottom-[-20%] left-[25%] h-[500px] w-[500px] rounded-full bg-violet-600/10 blur-[130px]" />

        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Header */}
      <header className="relative z-10 flex h-16 items-center justify-between border-b border-white/10 bg-black/20 px-6 backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard/profile"
            className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-white/5 hover:text-white"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>

          <div>
            <p className="text-sm text-slate-500">Profile</p>

            <h1 className="text-lg font-semibold text-white">
              Education
            </h1>
          </div>
        </div>

        <UserButton />
      </header>

      {/* Main */}
      <main className="relative z-10 mx-auto max-w-5xl px-6 py-10 lg:px-10">
        {/* Heading */}
        <div className="mb-8">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-500/10 shadow-[0_0_25px_rgba(34,211,238,0.08)]">
              <GraduationCap className="h-6 w-6 text-cyan-300" />
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400/80">
                Profile
              </p>

              <h2 className="mt-1 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Your Education
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
                Manage your academic background and keep your profile
                ready for intelligent job matching.
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5 shadow-xl backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">
                  Education Entries
                </p>

                <p className="mt-1 text-3xl font-bold text-white">
                  {userEducation.length}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-500/10">
                <GraduationCap className="h-5 w-5 text-cyan-300" />
              </div>
            </div>

            <p className="mt-3 text-xs text-slate-500">
              Academic records in your JobBuddy AI profile
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5 shadow-xl backdrop-blur-xl">
            <p className="text-sm text-slate-500">
              Profile Benefit
            </p>

            <p className="mt-1 text-lg font-semibold text-white">
              Better Job Matching
            </p>

            <p className="mt-2 text-xs leading-5 text-slate-500">
              Education details help JobBuddy AI understand your
              qualifications when evaluating opportunities.
            </p>
          </div>
        </div>

        {/* Education Form */}
        <EducationForm initialEducation={userEducation} />
      </main>
    </div>
  );
}