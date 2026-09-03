"use client";

import { useEffect, useState } from "react";
import {
  AlertCircle,
  ArrowUpRight,
  Building2,
  CheckCircle2,
  Clock3,
  ExternalLink,
  MapPin,
  RefreshCw,
  Sparkles,
} from "lucide-react";

import JobFilters from "./JobFilters";

type Job = {
  id: string;
  title: string;
  company: string;
  platform: string | null;
  location: string | null;
  jobType: string | null;
  description: string | null;
  requirements: string | null;
  salary: string | null;
  url: string | null;
  matchScore: number | null;
  matchedSkills?: string[];
  missingSkills?: string[];
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

function getMatchTone(score: number | null) {
  if (score === null) {
    return {
      text: "text-slate-400",
      border: "border-white/[0.08]",
      bg: "bg-white/[0.03]",
      progress: "from-slate-500 to-slate-400",
    };
  }

  if (score >= 85) {
    return {
      text: "text-emerald-300",
      border: "border-emerald-400/15",
      bg: "bg-emerald-400/[0.05]",
      progress: "from-emerald-400 via-cyan-400 to-cyan-300",
    };
  }

  if (score >= 65) {
    return {
      text: "text-cyan-300",
      border: "border-cyan-400/15",
      bg: "bg-cyan-400/[0.05]",
      progress: "from-cyan-400 via-blue-400 to-violet-400",
    };
  }

  if (score >= 40) {
    return {
      text: "text-violet-300",
      border: "border-violet-400/15",
      bg: "bg-violet-400/[0.05]",
      progress: "from-violet-400 via-blue-400 to-cyan-400",
    };
  }

  return {
    text: "text-amber-300",
    border: "border-amber-400/15",
    bg: "bg-amber-400/[0.04]",
    progress: "from-amber-400 to-orange-400",
  };
}

export default function JobsClient({
  initialJobs,
}: {
  initialJobs: Job[];
}) {
  const [jobs, setJobs] = useState<Job[]>(initialJobs);

  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");

  const [loading, setLoading] = useState(false);

  const [applyingJobId, setApplyingJobId] = useState<string | null>(
    null,
  );

  const [appliedJobIds, setAppliedJobIds] = useState<Set<string>>(
    new Set(),
  );

  async function fetchJobs(
    currentSearch: string,
    currentLocation: string,
    sync = false,
  ) {
    try {
      setLoading(true);

      if (sync) {
        const syncResponse = await fetch("/api/jobs/sync", {
          method: "POST",
        });

        const syncData = await syncResponse.json();

        if (!syncResponse.ok || !syncData.success) {
          throw new Error(
            syncData.error || "Failed to synchronize jobs",
          );
        }
      }

      const params = new URLSearchParams();

      if (currentSearch.trim()) {
        params.set("search", currentSearch.trim());
      }

      if (currentLocation.trim()) {
        params.set("location", currentLocation.trim());
      }

      const query = params.toString();

      const response = await fetch(
        `/api/jobs${query ? `?${query}` : ""}`,
        {
          cache: "no-store",
        },
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to fetch jobs");
      }

      setJobs(data.jobs || []);
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
    } finally {
      setLoading(false);
    }
  }

  async function applyToJob(jobId: string) {
    try {
      setApplyingJobId(jobId);

      const response = await fetch("/api/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jobId,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to apply");
      }

      setAppliedJobIds((previous) => {
        const updated = new Set(previous);

        updated.add(jobId);

        return updated;
      });
    } catch (error) {
      console.error("Failed to apply:", error);

      alert(
        error instanceof Error
          ? error.message
          : "Failed to apply for this job",
      );
    } finally {
      setApplyingJobId(null);
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchJobs(search, location);
    }, 500);

    return () => clearTimeout(timer);
  }, [search, location]);

  return (
    <>
      {/* Search / Filters */}
      <div className="relative mt-8">
        <div className="pointer-events-none absolute -left-20 top-0 h-32 w-32 rounded-full bg-cyan-400/[0.04] blur-[70px]" />

        <div className="relative rounded-2xl border border-white/[0.07] bg-gradient-to-br from-white/[0.035] via-white/[0.02] to-violet-500/[0.025] p-2 shadow-xl shadow-black/10">
          <JobFilters
            search={search}
            location={location}
            onSearchChange={setSearch}
            onLocationChange={setLocation}
            onRefresh={() => fetchJobs(search, location, true)}
          />
        </div>
      </div>

      {/* Results Header */}
      <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-cyan-400/15 bg-cyan-400/[0.06]">
              <Sparkles className="h-3.5 w-3.5 text-cyan-300" />
            </div>

            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-300">
                AI matched
              </p>

              <p className="mt-0.5 text-xs text-slate-600">
                Personalized opportunities
              </p>
            </div>
          </div>

          <p className="mt-4 text-sm text-slate-500">
            {loading ? (
              "Searching your opportunities..."
            ) : (
              <>
                Showing{" "}
                <span className="font-semibold text-slate-300">
                  {jobs.length}
                </span>{" "}
                opportunities matched to your profile
              </>
            )}
          </p>
        </div>

        <div className="inline-flex items-center gap-2 self-start rounded-full border border-emerald-400/10 bg-emerald-400/[0.04] px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-emerald-400 sm:self-auto">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
          Live job data
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="h-[500px] animate-pulse rounded-3xl border border-white/[0.06] bg-gradient-to-br from-white/[0.035] to-white/[0.015]"
            />
          ))}
        </div>
      )}

      {/* Empty */}
      {!loading && jobs.length === 0 && (
        <div className="relative mt-6 overflow-hidden rounded-3xl border border-white/[0.07] bg-gradient-to-br from-[#0a101d] to-[#0d0917] p-14 text-center shadow-2xl shadow-black/20">
          <div className="pointer-events-none absolute left-1/2 top-0 h-48 w-48 -translate-x-1/2 rounded-full bg-cyan-400/[0.06] blur-[80px]" />

          <div className="relative">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-400/15 bg-cyan-400/[0.06] shadow-lg shadow-cyan-500/[0.04]">
              <Building2 className="h-7 w-7 text-cyan-300" />
            </div>

            <h3 className="mt-6 text-xl font-semibold tracking-tight text-white">
              No opportunities found
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              Try a different job title, skill, company, or location.
            </p>
          </div>
        </div>
      )}

      {/* Job Grid */}
      {!loading && jobs.length > 0 && (
        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          {jobs.map((job) => {
            const isApplying = applyingJobId === job.id;
            const hasApplied = appliedJobIds.has(job.id);

            const jobUrl = normalizeJobUrl(job.url);

            const score = job.matchScore ?? 0;

            const matchLabel = getMatchLabel(job.matchScore);

            const matchTone = getMatchTone(job.matchScore);

            const description = cleanDescription(job.description);

            return (
              <article
                key={job.id}
                className="group relative flex min-h-[500px] flex-col overflow-hidden rounded-3xl border border-white/[0.075] bg-gradient-to-br from-[#111824] via-[#0e141e] to-[#121020] p-6 shadow-2xl shadow-black/20 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/[0.18] hover:shadow-cyan-950/20"
              >
                {/* Ambient card glow */}
                <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-cyan-400/[0.045] blur-[100px] transition-all duration-500 group-hover:bg-cyan-400/[0.075]" />

                <div className="pointer-events-none absolute -bottom-32 -left-24 h-72 w-72 rounded-full bg-violet-500/[0.045] blur-[100px] transition-all duration-500 group-hover:bg-violet-500/[0.065]" />

                {/* Top shine */}
                <div className="pointer-events-none absolute left-8 right-8 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/20 to-transparent" />

                <div className="relative flex flex-1 flex-col">
                  {/* Company Header */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-cyan-400/15 bg-gradient-to-br from-cyan-400/[0.09] to-violet-500/[0.09] shadow-lg shadow-cyan-500/[0.025]">
                        <Building2 className="h-5 w-5 text-cyan-300" />

                        <div className="pointer-events-none absolute inset-0 rounded-2xl bg-cyan-400/[0.03] blur-md" />
                      </div>

                      <div className="min-w-0">
                        <h3 className="truncate text-sm font-semibold text-white">
                          {job.company}
                        </h3>

                        <div className="mt-1.5 flex items-center gap-2">
                          <span className="truncate text-[9px] font-semibold uppercase tracking-[0.16em] text-slate-600">
                            {job.platform || "Job board"}
                          </span>

                          <span className="h-1 w-1 shrink-0 rounded-full bg-slate-700" />

                          <span className="flex items-center gap-1 text-[9px] font-semibold text-emerald-400">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_7px_rgba(52,211,153,0.8)]" />
                            Active
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Match Score */}
                    <div
                      className={`shrink-0 rounded-2xl border px-3.5 py-2.5 text-right ${matchTone.border} ${matchTone.bg}`}
                    >
                      <div className="flex items-center justify-end gap-1.5">
                        <Sparkles
                          className={`h-3 w-3 ${matchTone.text}`}
                        />

                        <span className="text-[8px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                          Potential match
                        </span>
                      </div>

                      <div
                        className={`mt-0.5 text-xl font-bold tracking-tight ${matchTone.text}`}
                      >
                        {job.matchScore !== null
                          ? `${job.matchScore}%`
                          : "—"}
                      </div>
                    </div>
                  </div>

                  {/* Job Title */}
                  <h2 className="mt-7 text-xl font-semibold leading-7 tracking-tight text-white transition-colors duration-200 group-hover:text-cyan-50">
                    {job.title}
                  </h2>

                  {/* Job Meta */}
                  <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500">
                    {job.location && (
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 text-cyan-400" />
                        {job.location}
                      </span>
                    )}

                    {job.jobType && (
                      <span className="inline-flex items-center gap-1.5">
                        <span className="h-1 w-1 rounded-full bg-slate-700" />
                        <Clock3 className="h-3.5 w-3.5 text-slate-600" />
                        {job.jobType}
                      </span>
                    )}
                  </div>

                  {/* AI Match Panel */}
                  {job.matchScore !== null && (
                    <div className="mt-6 overflow-hidden rounded-2xl border border-white/[0.06] bg-[#090e17]/90">
                      {/* Panel Header */}
                      <div className="p-4 pb-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-cyan-400/15 bg-cyan-400/[0.06]">
                              <Sparkles className="h-4 w-4 text-cyan-300" />
                            </div>

                            <div>
                              <p className="text-sm font-semibold text-slate-200">
                                AI Job Match
                              </p>

                              <p className="mt-0.5 text-[9px] text-slate-600">
                                Based on your profile
                              </p>
                            </div>
                          </div>

                          <div
                            className={`text-sm font-bold ${matchTone.text}`}
                          >
                            {job.matchScore}%
                          </div>
                        </div>

                        {/* Progress */}
                        <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                          <div
                            className={`h-full rounded-full bg-gradient-to-r ${matchTone.progress} shadow-[0_0_10px_rgba(34,211,238,0.25)] transition-all duration-700`}
                            style={{
                              width: `${Math.max(
                                0,
                                Math.min(100, score),
                              )}%`,
                            }}
                          />
                        </div>

                        {/* Match Label */}
                        <div className="mt-3 flex items-center gap-2">
                          {score >= 65 ? (
                            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                          ) : (
                            <AlertCircle className="h-3.5 w-3.5 text-slate-600" />
                          )}

                          <span className="text-[9px] font-semibold uppercase tracking-[0.16em] text-slate-600">
                            {matchLabel}
                          </span>
                        </div>
                      </div>

                      {/* Skills */}
                      {(job.matchedSkills?.length ?? 0) > 0 && (
                        <div className="border-t border-white/[0.05] px-4 py-3.5">
                          <p className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.18em] text-emerald-400/80">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                            Matching skills
                          </p>

                          <div className="mt-2 flex flex-wrap gap-1.5">
                            {(job.matchedSkills ?? []).map((skill) => (
                              <span
                                key={skill}
                                className="rounded-lg border border-emerald-400/10 bg-emerald-400/[0.04] px-2.5 py-1 text-[10px] font-medium text-emerald-300/80"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {(job.missingSkills?.length ?? 0) > 0 && (
                        <div className="border-t border-white/[0.05] px-4 py-3.5">
                          <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-slate-600">
                            Skills to improve
                          </p>

                          <div className="mt-2 flex flex-wrap gap-1.5">
                            {(job.missingSkills ?? []).map((skill) => (
                              <span
                                key={skill}
                                className="rounded-lg border border-white/[0.06] bg-white/[0.025] px-2.5 py-1 text-[10px] text-slate-500"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Description */}
                  {description && (
                    <p className="mt-5 line-clamp-3 text-xs leading-6 text-slate-500">
                      {description}
                    </p>
                  )}

                  {/* Footer */}
                  <div className="mt-auto pt-6">
                    <div className="border-t border-white/[0.06] pt-5">
                      <div className="flex items-end justify-between gap-4">
                        <div className="min-w-0">
                          {job.salary ? (
                            <div>
                              <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-slate-600">
                                Compensation
                              </p>

                              <p className="mt-1 text-sm font-semibold text-slate-200">
                                {job.salary}
                              </p>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.7)]" />

                              <span className="text-[9px] font-semibold uppercase tracking-[0.16em] text-slate-600">
                                Recommended for you
                              </span>
                            </div>
                          )}
                        </div>

                        <div className="flex shrink-0 items-center gap-2">
                          {/* Apply */}
                          <button
                            type="button"
                            onClick={() => applyToJob(job.id)}
                            disabled={isApplying || hasApplied}
                            className={`group/apply inline-flex h-10 items-center gap-2 rounded-xl px-4 text-xs font-semibold transition-all duration-200 ${
                              hasApplied
                                ? "cursor-default border border-emerald-400/15 bg-emerald-400/[0.06] text-emerald-300"
                                : "border border-cyan-400/20 bg-gradient-to-r from-cyan-400/[0.12] to-violet-500/[0.14] text-white shadow-lg shadow-cyan-500/[0.04] hover:border-cyan-400/35 hover:from-cyan-400/[0.18] hover:to-violet-500/[0.2] hover:shadow-cyan-500/[0.08]"
                            } disabled:cursor-not-allowed disabled:opacity-60`}
                          >
                            {isApplying
                              ? "Applying..."
                              : hasApplied
                                ? "Applied"
                                : "Apply"}

                            {!hasApplied && !isApplying && (
                              <ArrowUpRight className="h-3.5 w-3.5 text-cyan-300 transition-transform group-hover/apply:-translate-y-0.5 group-hover/apply:translate-x-0.5" />
                            )}
                          </button>

                          {/* Original Job */}
                          {jobUrl ? (
                            <a
                              href={jobUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              title="View original job"
                              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.025] text-slate-500 transition-all duration-200 hover:border-cyan-400/20 hover:bg-cyan-400/[0.05] hover:text-cyan-300"
                            >
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          ) : (
                            <span className="inline-flex h-10 w-10 cursor-not-allowed items-center justify-center rounded-xl border border-white/[0.05] bg-white/[0.015] text-slate-700">
                              <ExternalLink className="h-4 w-4" />
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* Bottom Refresh */}
      {!loading && jobs.length > 0 && (
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={() => fetchJobs(search, location, true)}
            className="group inline-flex items-center gap-2 rounded-full border border-white/[0.07] bg-white/[0.02] px-5 py-2.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-slate-600 transition-all duration-200 hover:border-cyan-400/20 hover:bg-cyan-400/[0.04] hover:text-cyan-300"
          >
            <RefreshCw className="h-3.5 w-3.5 transition-transform duration-500 group-hover:rotate-180" />
            Refresh opportunities
          </button>
        </div>
      )}
    </>
  );
}