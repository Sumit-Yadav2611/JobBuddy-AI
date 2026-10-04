"use client";

import {
  ArrowUpRight,
  Code2,
  ExternalLink,
  FolderGit2,
  Globe2,
  Sparkles,
} from "lucide-react";

type Project = {
  id: string;
  name: string;
  description: string | null;
  technologies: string | null;
  githubUrl: string | null;
  liveUrl: string | null;
  createdAt: string | Date;
};

type ProjectsFormProps = {
  initialProjects: Project[];
};

function getTechnologies(value: string | null) {
  if (!value) return [];

  return value
    .split(",")
    .map((technology) => technology.trim())
    .filter(Boolean);
}

function getProjectNumber(index: number) {
  return String(index + 1).padStart(2, "0");
}

export default function ProjectsForm({ initialProjects }: ProjectsFormProps) {
  const projects = initialProjects;

  return (
    <section className="relative">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 top-10 h-96 w-96 rounded-full bg-cyan-500/10 blur-[140px]" />
        <div className="absolute -right-40 top-80 h-[28rem] w-[28rem] rounded-full bg-violet-500/10 blur-[160px]" />
        <div className="absolute left-1/2 top-[45%] h-72 w-72 -translate-x-1/2 rounded-full bg-blue-500/[0.06] blur-[130px]" />
      </div>

      <div className="relative">
        {/* Section intro */}
        <div className="mb-8">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-400/15 bg-cyan-400/[0.06] px-3 py-1.5 text-xs font-medium tracking-wide text-cyan-300">
            <Sparkles className="h-3.5 w-3.5" />
            Professional Portfolio
          </div>

          <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Featured Projects
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
            A curated view of the projects and technical work represented in
            your professional profile.
          </p>
        </div>

        {/* Projects */}
        {projects.length > 0 ? (
          <div className="grid gap-6 lg:grid-cols-2">
            {projects.map((project, index) => {
              const technologies = getTechnologies(project.technologies);

              return (
                <article
                  key={project.id}
                  className="group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.035] p-6 shadow-2xl shadow-black/20 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/20 hover:bg-white/[0.05] hover:shadow-cyan-950/20 sm:p-7"
                >
                  {/* Card glow */}
                  <div className="pointer-events-none absolute -right-24 -top-24 h-52 w-52 rounded-full bg-cyan-400/[0.08] blur-3xl transition-opacity duration-300 group-hover:bg-cyan-400/[0.12]" />

                  <div className="pointer-events-none absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-transparent via-cyan-400/70 to-transparent transition-all duration-500 group-hover:w-full" />

                  {/* Top row */}
                  <div className="relative flex items-start justify-between gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-400/15 bg-cyan-400/[0.07] text-cyan-300 shadow-lg shadow-cyan-950/20">
                      <FolderGit2 className="h-5 w-5" />
                    </div>

                    <span className="rounded-full border border-white/[0.08] bg-white/[0.035] px-3 py-1 text-[11px] font-semibold tracking-[0.18em] text-slate-500">
                      PROJECT {getProjectNumber(index)}
                    </span>
                  </div>

                  {/* Project title */}
                  <div className="relative mt-7">
                    <h3 className="text-xl font-semibold tracking-tight text-white transition-colors duration-300 group-hover:text-cyan-100 sm:text-2xl">
                      {project.name}
                    </h3>

                    <div className="mt-3 h-px w-12 bg-gradient-to-r from-cyan-400/70 to-transparent transition-all duration-300 group-hover:w-20" />
                  </div>

                  {/* Description */}
                  <p className="relative mt-5 text-sm leading-7 text-slate-400">
                    {project.description ||
                      "A professional project from your portfolio."}
                  </p>

                  {/* Technologies */}
                  {technologies.length > 0 && (
                    <div className="relative mt-7">
                      <div className="mb-3 flex items-center gap-2">
                        <Code2 className="h-3.5 w-3.5 text-slate-500" />

                        <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                          Technologies
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {technologies.map((technology, technologyIndex) => (
                          <span
                            key={`${technology}-${technologyIndex}`}
                            className="rounded-full border border-white/[0.08] bg-white/[0.035] px-3 py-1.5 text-xs font-medium text-slate-300 transition-colors duration-200 group-hover:border-white/[0.12] group-hover:bg-white/[0.05]"
                          >
                            {technology}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Links */}
                  {(project.githubUrl || project.liveUrl) && (
                    <div className="relative mt-8 flex flex-wrap gap-3 border-t border-white/[0.07] pt-5">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/link inline-flex items-center gap-2 rounded-xl border border-white/[0.09] bg-white/[0.035] px-4 py-2.5 text-sm font-medium text-slate-200 transition-all duration-200 hover:border-cyan-400/25 hover:bg-cyan-400/[0.06] hover:text-cyan-200"
                        >
                          <FolderGit2 className="h-4 w-4 text-slate-400 transition-colors group-hover/link:text-cyan-300" />
                          GitHub
                          <ArrowUpRight className="h-3.5 w-3.5 text-slate-500 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 group-hover/link:text-cyan-300" />
                        </a>
                      )}

                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/link inline-flex items-center gap-2 rounded-xl border border-cyan-400/15 bg-cyan-400/[0.06] px-4 py-2.5 text-sm font-medium text-cyan-200 transition-all duration-200 hover:border-cyan-400/30 hover:bg-cyan-400/[0.1]"
                        >
                          <Globe2 className="h-4 w-4 text-cyan-300" />
                          Live Demo
                          <ExternalLink className="h-3.5 w-3.5 text-cyan-300/70 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                        </a>
                      )}
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        ) : (
          /* Empty state */
          <div className="relative overflow-hidden rounded-3xl border border-dashed border-white/[0.1] bg-white/[0.025] px-6 py-16 text-center backdrop-blur-xl">
            <div className="pointer-events-none absolute left-1/2 top-0 h-48 w-48 -translate-x-1/2 rounded-full bg-cyan-400/[0.07] blur-3xl" />

            <div className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-400/15 bg-cyan-400/[0.06] text-cyan-300">
              <FolderGit2 className="h-6 w-6" />
            </div>

            <h3 className="relative mt-5 text-lg font-semibold text-white">
              No projects available
            </h3>

            <p className="relative mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              Your projects will appear here once they are available in your
              professional profile.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
