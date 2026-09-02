import { auth } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { ArrowLeft, BriefcaseBusiness } from "lucide-react";
import { eq, desc } from "drizzle-orm";

import { db } from "@/lib/db";
import { users, experiences } from "@/lib/db/schema";
import ExperienceForm from "./ExperienceForm";

export default async function ExperiencePage() {
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
      <div className="min-h-screen bg-[#02040a] p-10 text-white">
        <h1 className="text-2xl font-bold">
          User profile not found
        </h1>

        <p className="mt-2 text-slate-400">
          Please upload and analyze your resume first.
        </p>
      </div>
    );
  }

  const userExperiences = await db
    .select()
    .from(experiences)
    .where(eq(experiences.userId, dbUser.id))
    .orderBy(desc(experiences.startDate));

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#02040a] text-white">
      {/* Background glow */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[140px]" />

        <div className="absolute -right-40 top-20 h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-[150px]" />

        <div className="absolute bottom-[-200px] left-1/3 h-[500px] w-[500px] rounded-full bg-violet-600/10 blur-[160px]" />

        <div
          className="absolute inset-0 opacity-[0.025]"
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
            className="rounded-lg border border-white/10 p-2 text-slate-400 transition hover:border-cyan-400/30 hover:bg-white/5 hover:text-white"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>

          <div>
            <p className="text-xs uppercase tracking-wider text-cyan-400/70">
              Profile
            </p>

            <h1 className="text-lg font-semibold">
              Experience
            </h1>
          </div>
        </div>

        <UserButton />
      </header>

      {/* Main */}

      <main className="relative z-10 mx-auto max-w-5xl px-6 py-8 lg:px-10 lg:py-12">
        {/* Heading */}

        <div className="mb-8">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10 shadow-[0_0_25px_rgba(34,211,238,0.08)]">
              <BriefcaseBusiness className="h-5 w-5 text-cyan-300" />
            </div>

            <div>
              <h2 className="text-3xl font-bold tracking-tight text-white">
                Your Experience
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
                Build your professional experience profile. Add
                your roles, responsibilities, achievements, and
                technologies you've worked with.
              </p>
            </div>
          </div>
        </div>

        {/* Experience summary */}

        <div className="mb-8 rounded-2xl border border-white/10 bg-white/[0.03] p-5 shadow-2xl shadow-black/20 backdrop-blur-xl">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                Experience Entries
              </p>

              <p className="mt-1 text-3xl font-bold text-white">
                {userExperiences.length}
              </p>
            </div>

            <div className="hidden h-12 w-12 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10 sm:flex">
              <BriefcaseBusiness className="h-5 w-5 text-cyan-300" />
            </div>
          </div>
        </div>

        {/* Editable experience form */}

        <ExperienceForm
          initialExperiences={userExperiences}
        />
      </main>
    </div>
  );
}