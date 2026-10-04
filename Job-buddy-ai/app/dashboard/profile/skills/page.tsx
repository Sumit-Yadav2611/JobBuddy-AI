import { auth } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { ArrowLeft, Code2 } from "lucide-react";
import { eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { users, skills } from "@/lib/db/schema";

import SkillsForm from "./SkillsForm";

export default async function SkillsPage() {
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

  const userSkills = await db
    .select()
    .from(skills)
    .where(eq(skills.userId, dbUser.id));

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#02040a] text-white">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[140px]" />

        <div className="absolute -right-40 top-20 h-[500px] w-[500px] rounded-full bg-violet-500/10 blur-[150px]" />

        <div className="absolute bottom-[-250px] left-1/3 h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-[160px]" />

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Header */}
      <header className="relative z-10 flex h-16 items-center justify-between border-b border-white/10 bg-black/20 px-6 backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard/profile"
            className="rounded-lg p-2 text-slate-400 transition hover:bg-white/5 hover:text-white"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>

          <div>
            <p className="text-xs text-slate-500">
              Profile
            </p>

            <h1 className="text-lg font-semibold text-white">
              Skills & Expertise
            </h1>
          </div>
        </div>

        <UserButton />
      </header>

      {/* Main */}
      <main className="relative z-10 mx-auto max-w-6xl px-5 py-8 sm:px-6 lg:px-10 lg:py-12">
        {/* Page heading */}
        <div className="mb-8">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10">
              <Code2 className="h-6 w-6 text-cyan-300" />
            </div>

            <div>
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Skills & Expertise
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
                Manage the technologies, tools, and professional
                skills that represent your experience.
              </p>
            </div>
          </div>
        </div>

        {/* Skills form */}
        <SkillsForm initialSkills={userSkills} />
      </main>
    </div>
  );
}