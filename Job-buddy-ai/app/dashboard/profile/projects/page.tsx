import { auth } from "@clerk/nextjs/server";
import { desc, eq } from "drizzle-orm";
import { ArrowLeft, FolderKanban, Sparkles } from "lucide-react";
import Link from "next/link";

import { db } from "@/lib/db";
import { projects, users } from "@/lib/db/schema";

import ProjectsForm from "./ProjectsForm";

export default async function ProjectsPage() {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.clerkId, userId))
    .limit(1);

  if (!user) {
    return null;
  }

  const userProjects = await db
    .select()
    .from(projects)
    .where(eq(projects.userId, user.id))
    .orderBy(desc(projects.createdAt));

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#02040a] text-white">
      {/* Global ambient background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-64 -top-64 h-[42rem] w-[42rem] rounded-full bg-cyan-500/[0.08] blur-[160px]" />

        <div className="absolute right-[-18rem] top-[15%] h-[38rem] w-[38rem] rounded-full bg-violet-600/[0.08] blur-[170px]" />

        <div className="absolute bottom-[-20rem] left-[35%] h-[36rem] w-[36rem] rounded-full bg-blue-600/[0.06] blur-[160px]" />

        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.35) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10 lg:py-12">
        {/* Back navigation */}
        <Link
          href="/dashboard/profile"
          className="group mb-10 inline-flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.025] px-3.5 py-2 text-sm text-slate-400 backdrop-blur-xl transition-all duration-200 hover:border-cyan-400/20 hover:bg-cyan-400/[0.05] hover:text-cyan-200"
        >
          <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" />
          Back to Profile
        </Link>

        {/* Hero */}
        <header className="relative mb-10">
          <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-400/15 bg-cyan-400/[0.06] px-3.5 py-1.5 text-xs font-medium text-cyan-300">
                <Sparkles className="h-3.5 w-3.5" />
                Professional Profile
              </div>

              <div className="flex items-start gap-4">
                <div className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-cyan-400/15 bg-cyan-400/[0.07] text-cyan-300 shadow-lg shadow-cyan-950/20 sm:flex">
                  <FolderKanban className="h-6 w-6" />
                </div>

                <div>
                  <p className="mb-1 text-sm font-medium text-slate-500">
                    Profile / Projects
                  </p>

                  <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                    Your Projects
                  </h1>

                  <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
                    Showcase your technical work, products, and experience
                    through a clean professional portfolio.
                  </p>
                </div>
              </div>
            </div>

            {/* Project count */}
            <div className="flex w-fit items-center gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.035] px-5 py-4 shadow-2xl shadow-black/20 backdrop-blur-xl">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/[0.08] text-cyan-300">
                <FolderKanban className="h-4.5 w-4.5" />
              </div>

              <div>
                <p className="text-xs text-slate-500">Portfolio</p>

                <p className="mt-0.5 text-lg font-semibold text-white">
                  {userProjects.length}{" "}
                  {userProjects.length === 1 ? "Project" : "Projects"}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 h-px bg-gradient-to-r from-cyan-400/30 via-white/[0.08] to-transparent" />
        </header>

        {/* Projects */}
        <ProjectsForm
          initialProjects={userProjects.map((project) => ({
            ...project,
            createdAt:
              project.createdAt?.toISOString() ??
              new Date().toISOString(),
          }))}
        />
      </div>
    </main>
  );
}