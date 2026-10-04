import { auth } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

import {
  ArrowLeft,
  FileText,
  ShieldCheck,
} from "lucide-react";

import { eq } from "drizzle-orm";

import { db } from "@/lib/db";
import {
  users,
  profiles,
} from "@/lib/db/schema";

import SummaryForm from "./SummaryForm";

export default async function SummaryPage() {
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

  const [profile] = await db
    .select()
    .from(profiles)
    .where(eq(profiles.userId, dbUser.id))
    .limit(1);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#02040a] text-white">
      {/* Background */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-10%] top-[10%] h-[500px] w-[500px] rounded-full bg-cyan-500/8 blur-[120px]" />

        <div className="absolute right-[-10%] top-[20%] h-[600px] w-[600px] rounded-full bg-violet-600/10 blur-[140px]" />

        <div className="absolute bottom-[-20%] left-[30%] h-[500px] w-[500px] rounded-full bg-blue-600/8 blur-[130px]" />

        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      {/* Header */}

      <header className="relative z-10 flex h-16 items-center justify-between border-b border-white/5 bg-[#02040a]/70 px-6 backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard/settings"
            className="rounded-xl border border-white/5 p-2.5 text-slate-400 transition-all hover:border-cyan-400/20 hover:bg-cyan-400/5 hover:text-white"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>

          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-cyan-300/70">
              Profile Settings
            </p>

            <h1 className="text-lg font-semibold">
              Professional Summary
            </h1>
          </div>
        </div>

        <UserButton />
      </header>

      {/* Main */}

      <main className="relative z-10 mx-auto max-w-5xl px-6 py-10 lg:px-10">
        {/* Heading */}

        <div className="mb-8">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-3 py-1.5 text-xs font-medium text-cyan-300">
            <FileText className="h-3.5 w-3.5" />

            Professional Profile
          </div>

          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Professional{" "}
            <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent">
              Summary
            </span>
          </h2>

          <p className="mt-3 max-w-2xl text-base leading-7 text-slate-400">
            Create a strong professional summary that helps
            JobBuddy AI understand your experience, strengths,
            and career direction.
          </p>
        </div>

        {/* Editor */}

        <SummaryForm
          initialSummary={profile?.summary ?? ""}
        />

        {/* Privacy */}

        <div className="mt-6 flex items-start gap-3 rounded-2xl border border-white/5 bg-[#060914]/60 p-5 backdrop-blur-xl">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-emerald-400/20 bg-emerald-400/5">
            <ShieldCheck className="h-4 w-4 text-emerald-300" />
          </div>

          <div>
            <p className="text-sm font-medium text-slate-200">
              Your information is private
            </p>

            <p className="mt-1 text-xs leading-5 text-slate-500">
              Your professional summary is associated with your
              authenticated JobBuddy AI account and is used to
              improve your job-search and matching experience.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}