import { auth } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import {
  ArrowLeft,
  FolderGit2,
  GitBranch,
  ExternalLink,
} from "lucide-react";
import { eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { users, projects } from "@/lib/db/schema";

export default async function ProjectsPage() {
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

  // Get projects belonging to current user
  const userProjects = await db
    .select()
    .from(projects)
    .where(eq(projects.userId, dbUser.id));

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
              Projects
            </h1>
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
              <FolderGit2 className="h-5 w-5" />
            </div>

            <div>
              <h2 className="text-3xl font-bold tracking-tight">
                Your Projects
              </h2>

              <p className="mt-1 text-muted-foreground">
                Projects extracted from your resume by JobBuddy AI.
              </p>
            </div>
          </div>
        </div>

        {/* Project count */}

        <div className="mt-8 rounded-2xl border bg-card p-6">
          <p className="text-sm text-muted-foreground">
            Total Projects
          </p>

          <p className="mt-1 text-3xl font-bold">
            {userProjects.length}
          </p>

          <p className="mt-1 text-sm text-muted-foreground">
            Projects found in your resume
          </p>
        </div>

        {/* Empty state */}

        {userProjects.length === 0 && (
          <div className="mt-6 rounded-2xl border bg-card p-8 text-center">
            <FolderGit2 className="mx-auto h-10 w-10 text-muted-foreground" />

            <h3 className="mt-4 text-lg font-semibold">
              No projects found
            </h3>

            <p className="mt-2 text-sm text-muted-foreground">
              Upload and analyze your resume to extract your projects.
            </p>

            <Link
              href="/dashboard/resume"
              className="mt-5 inline-block rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90"
            >
              Go to Resume
            </Link>
          </div>
        )}

        {/* Projects */}

        {userProjects.length > 0 && (
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {userProjects.map((project) => (
              <article
                key={project.id}
                className="flex flex-col rounded-2xl border bg-card p-6 transition-all hover:-translate-y-0.5 hover:shadow-sm"
              >
                {/* Project header */}

                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border bg-muted">
                    <FolderGit2 className="h-5 w-5" />
                  </div>

                  <div className="flex items-center gap-2">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`GitHub for ${project.name}`}
                        className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
                      >
                        <GitBranch className="h-4 w-4" />
                      </a>
                    )}

                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Live project ${project.name}`}
                        className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Name */}

                <h3 className="mt-5 text-xl font-semibold">
                  {project.name}
                </h3>

                {/* Description */}

                {project.description && (
                  <p className="mt-3 flex-1 text-sm leading-6 text-muted-foreground">
                    {project.description}
                  </p>
                )}

                {/* Technologies */}

                {project.technologies && (
                  <div className="mt-5">
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Technologies
                    </p>

                    <div className="mt-2 flex flex-wrap gap-2">
                      {project.technologies
                        .split(",")
                        .map((technology) => (
                          <span
                            key={technology.trim()}
                            className="rounded-full border px-3 py-1 text-xs"
                          >
                            {technology.trim()}
                          </span>
                        ))}
                    </div>
                  </div>
                )}

                {/* Links */}

                {(project.githubUrl || project.liveUrl) && (
                  <div className="mt-6 flex flex-wrap gap-3 border-t pt-5">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium hover:bg-muted"
                      >
                        <GitBranch className="h-4 w-4" />
                        GitHub
                      </a>
                    )}

                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium hover:bg-muted"
                      >
                        <ExternalLink className="h-4 w-4" />
                        Live Demo
                      </a>
                    )}
                  </div>
                )}
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}