"use client";

import { useState } from "react";
import {
  ArrowUpRight,
  Bookmark,
  Building2,
  ExternalLink,
  MapPin,
  Sparkles,
  Trash2,
  BriefcaseBusiness,
} from "lucide-react";

type SavedJob = {
  savedJobId: string;
  id: string;
  title: string;
  company: string;
  platform: string | null;
  location: string | null;
  jobType: string | null;
  description: string | null;
  salary: string | null;
  url: string | null;
  matchScore: number | null;
  createdAt: Date | string | null;
};

function cleanDescription(description: string | null) {
  if (!description) return "";

  return description
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeJobUrl(url: string | null) {
  if (!url) return null;

  const trimmedUrl = url.trim();

  if (!trimmedUrl) return null;

  try {
    const normalizedUrl = /^https?:\/\//i.test(trimmedUrl)
      ? trimmedUrl
      : `https://${trimmedUrl}`;

    const parsedUrl = new URL(normalizedUrl);

    if (
      parsedUrl.protocol !== "http:" &&
      parsedUrl.protocol !== "https:"
    ) {
      return null;
    }

    return parsedUrl.toString();
  } catch {
    return null;
  }
}

function getMatchLabel(score: number | null) {
  if (score === null) return "Potential match";
  if (score >= 85) return "Excellent match";
  if (score >= 65) return "Strong match";
  if (score >= 40) return "Potential match";

  return "Low match";
}

function getMatchWidth(score: number | null) {
  if (score === null) return 35;

  return Math.min(Math.max(score, 0), 100);
}

export default function SavedJobsClient({
  initialJobs,
}: {
  initialJobs: SavedJob[];
}) {
  const [jobs, setJobs] = useState<SavedJob[]>(initialJobs);
  const [removingJobId, setRemovingJobId] = useState<string | null>(null);

  async function removeSavedJob(jobId: string) {
    try {
      setRemovingJobId(jobId);

      const response = await fetch("/api/saved-jobs", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jobId,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.error || "Failed to remove saved job",
        );
      }

      setJobs((currentJobs) =>
        currentJobs.filter((job) => job.id !== jobId),
      );
    } catch (error) {
      console.error("Failed to remove saved job:", error);

      alert(
        error instanceof Error
          ? error.message
          : "Failed to remove saved job",
      );
    } finally {
      setRemovingJobId(null);
    }
  }

  return (
    <div>
      {/* =========================================================
          Result Header
      ========================================================== */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />

            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-300">
              Your collection
            </p>
          </div>

          <h2 className="mt-2 text-xl font-semibold tracking-tight text-white">
            Saved opportunities
          </h2>

          <p className="mt-1 text-sm text-slate-600">
            Jobs you want to come back to.
          </p>
        </div>

        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/[0.07] bg-white/[0.025] px-3.5 py-2">
          <Bookmark className="h-3.5 w-3.5 text-cyan-300" />

          <span className="text-xs font-semibold text-slate-300">
            {jobs.length}
          </span>

          <span className="text-[10px] uppercase tracking-[0.12em] text-slate-600">
            saved
          </span>
        </div>
      </div>

      {/* =========================================================
          Empty State
      ========================================================== */}
      {jobs.length === 0 ? (
        <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-[#0a101d] via-[#080d18] to-[#100b20] p-10 text-center shadow-2xl shadow-black/20">
          <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-cyan-400/[0.06] blur-[100px]" />

          <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-violet-500/[0.06] blur-[100px]" />

          <div className="relative z-10 mx-auto max-w-md">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-400/15 bg-cyan-400/[0.06] shadow-lg shadow-cyan-500/[0.04]">
              <Bookmark className="h-7 w-7 text-cyan-300" />
            </div>

            <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-300">
              Nothing saved yet
            </p>

            <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white">
              Build your shortlist
            </h3>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              Save interesting opportunities while exploring jobs and
              come back to them whenever you are ready.
            </p>
          </div>
        </div>
      ) : (
        /* =======================================================
           Saved Jobs Grid
        ======================================================== */
        <div className="grid gap-5 lg:grid-cols-2">
          {jobs.map((job) => {
            const cleanText = cleanDescription(job.description);
            const jobUrl = normalizeJobUrl(job.url);
            const matchWidth = getMatchWidth(job.matchScore);
            const matchLabel = getMatchLabel(job.matchScore);
            const isRemoving = removingJobId === job.id;

            return (
              <article
                key={job.id}
                className="group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-[#0a101d] via-[#080d18] to-[#0b0a16] p-5 shadow-2xl shadow-black/20 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/15 hover:shadow-cyan-500/[0.04] sm:p-6"
              >
                {/* Card glow */}
                <div className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-cyan-400/[0.045] blur-[90px] transition-opacity duration-300 group-hover:bg-cyan-400/[0.07]" />

                <div className="pointer-events-none absolute -bottom-24 -left-24 h-52 w-52 rounded-full bg-violet-500/[0.035] blur-[90px]" />

                {/* Top row */}
                <div className="relative z-10 flex items-start justify-between gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-cyan-400/15 bg-cyan-400/[0.06] shadow-lg shadow-cyan-500/[0.03]">
                    <Building2 className="h-5 w-5 text-cyan-300" />
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Saved badge */}
                    <div className="inline-flex items-center gap-1.5 rounded-full border border-cyan-400/15 bg-cyan-400/[0.05] px-3 py-1.5">
                      <Bookmark className="h-3 w-3 fill-cyan-300 text-cyan-300" />

                      <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-cyan-300">
                        Saved
                      </span>
                    </div>

                    {/* Remove */}
                    <button
                      type="button"
                      onClick={() => removeSavedJob(job.id)}
                      disabled={isRemoving}
                      title="Remove from saved jobs"
                      aria-label={`Remove ${job.title} from saved jobs`}
                      className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.025] text-slate-500 transition-all duration-200 hover:border-rose-400/20 hover:bg-rose-400/[0.06] hover:text-rose-300 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Job information */}
                <div className="relative z-10 mt-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <h3 className="line-clamp-2 text-xl font-semibold tracking-tight text-white transition-colors group-hover:text-cyan-50">
                        {job.title}
                      </h3>

                      <p className="mt-1.5 flex items-center gap-2 text-sm font-medium text-slate-400">
                        <span className="truncate">{job.company}</span>

                        {job.platform ? (
                          <>
                            <span className="h-1 w-1 shrink-0 rounded-full bg-slate-700" />

                            <span className="shrink-0 text-xs text-slate-600">
                              {job.platform}
                            </span>
                          </>
                        ) : null}
                      </p>
                    </div>
                  </div>

                  {/* Metadata */}
                  <div className="mt-5 flex flex-wrap items-center gap-2">
                    {job.location ? (
                      <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.06] bg-white/[0.025] px-2.5 py-1.5 text-xs text-slate-400">
                        <MapPin className="h-3.5 w-3.5 text-slate-600" />
                        {job.location}
                      </span>
                    ) : null}

                    {job.jobType ? (
                      <span className="rounded-lg border border-white/[0.06] bg-white/[0.025] px-2.5 py-1.5 text-xs text-slate-400">
                        {job.jobType}
                      </span>
                    ) : null}
                  </div>

                  {/* AI Match */}
                  {job.matchScore !== null ? (
                    <div className="mt-5 rounded-2xl border border-cyan-400/[0.10] bg-gradient-to-r from-cyan-400/[0.045] via-blue-500/[0.025] to-violet-500/[0.045] p-4">
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                          <Sparkles className="h-3.5 w-3.5 text-cyan-300" />

                          <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-cyan-300">
                            AI Job Match
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-white">
                            {job.matchScore}%
                          </span>

                          <span className="text-[10px] text-slate-600">
                            {matchLabel}
                          </span>
                        </div>
                      </div>

                      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 transition-all duration-500"
                          style={{
                            width: `${matchWidth}%`,
                          }}
                        />
                      </div>
                    </div>
                  ) : null}

                  {/* Description */}
                  {cleanText ? (
                    <p className="mt-5 line-clamp-3 text-sm leading-6 text-slate-500">
                      {cleanText}
                    </p>
                  ) : (
                    <p className="mt-5 text-sm italic text-slate-700">
                      No job description available.
                    </p>
                  )}

                  {/* Salary */}
                  {job.salary ? (
                    <div className="mt-5 inline-flex items-center gap-2 rounded-lg border border-emerald-400/10 bg-emerald-400/[0.035] px-3 py-1.5">
                      <BriefcaseBusiness className="h-3.5 w-3.5 text-emerald-300" />

                      <span className="text-xs font-medium text-emerald-300">
                        {job.salary}
                      </span>
                    </div>
                  ) : null}
                </div>

                {/* Divider */}
                <div className="relative z-10 my-5 h-px bg-white/[0.07]" />

                {/* Actions */}
                <div className="relative z-10 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-600">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_7px_rgba(34,211,238,0.7)]" />
                    Saved for later
                  </div>

                  {jobUrl ? (
                    <a
                      href={jobUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/view inline-flex items-center gap-2 rounded-xl border border-cyan-400/20 bg-gradient-to-r from-cyan-400/[0.08] via-blue-500/[0.06] to-violet-500/[0.08] px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/[0.03] transition-all duration-200 hover:border-cyan-400/40 hover:from-cyan-400/[0.14] hover:via-blue-500/[0.10] hover:to-violet-500/[0.14]"
                    >
                      View Job

                      <ArrowUpRight className="h-4 w-4 text-cyan-300 transition-transform duration-200 group-hover/view:translate-x-0.5 group-hover/view:-translate-y-0.5" />

                      <ExternalLink className="h-3 w-3 text-slate-600" />
                    </a>
                  ) : (
                    <span className="text-xs text-slate-700">
                      Job link unavailable
                    </span>
                  )}
                </div>

                {/* Removing overlay */}
                {isRemoving ? (
                  <div className="absolute inset-0 z-20 flex items-center justify-center rounded-3xl bg-[#02040a]/75 backdrop-blur-sm">
                    <div className="flex items-center gap-3 rounded-xl border border-white/[0.08] bg-[#080d18] px-4 py-3 shadow-2xl">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-cyan-400/20 border-t-cyan-300" />

                      <span className="text-sm font-medium text-slate-300">
                        Removing...
                      </span>
                    </div>
                  </div>
                ) : null}
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}