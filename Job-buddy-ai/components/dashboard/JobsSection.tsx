"use client";

import { useEffect, useMemo, useState } from "react";
import {
  BriefcaseBusiness,
  ChevronDown,
  ExternalLink,
  Filter,
  Loader2,
  RefreshCw,
  Search,
  Sparkles,
  X,
} from "lucide-react";
import JobCard from "./JobCard";

type Job = {
  id: string;
  title: string;
  company: string;
  platform: string;
  location: string | null;
  jobType: string | null;
  description?: string | null;
  salary?: string | null;
  url?: string | null;
  matchScore?: number | null;
  matchedSkills?: string[];
  missingSkills?: string[];
};

const PLATFORMS = [
  "All Platforms",
  "Greenhouse",
  "Lever",
  "Workable",
  "Wellfound",
];

export default function JobsSection() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [savedJobs, setSavedJobs] = useState<string[]>([]);
  const [appliedJobs, setAppliedJobs] = useState<string[]>([]);

  const [search, setSearch] = useState("");
  const [platform, setPlatform] = useState("All Platforms");

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const [savingJobId, setSavingJobId] = useState<string | null>(null);
  const [applyingJobId, setApplyingJobId] = useState<string | null>(null);

  /*
   * ---------------------------------------------------------
   * LOAD REAL JOB DATA
   * ---------------------------------------------------------
   */
  async function loadJobs(sync = false) {
    try {
      setError("");

      if (sync) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      /*
       * Sync real jobs first.
       * This prevents this dashboard section from relying on
       * hard-coded/demo job data.
       */
      if (sync) {
        try {
          await fetch("/api/jobs/sync", {
            method: "POST",
          });
        } catch (syncError) {
          console.error("Job sync failed:", syncError);
        }
      }

      const params = new URLSearchParams();

      if (search.trim()) {
        params.set("search", search.trim());
      }

      const response = await fetch(
        `/api/jobs${params.toString() ? `?${params.toString()}` : ""}`,
        {
          cache: "no-store",
        },
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to load jobs");
      }

      setJobs(Array.isArray(data.jobs) ? data.jobs : []);
    } catch (err) {
      console.error("Failed to load jobs:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Unable to load jobs right now.",
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  /*
   * ---------------------------------------------------------
   * LOAD SAVED + APPLICATION DATA
   * ---------------------------------------------------------
   */
  async function loadUserJobState() {
    try {
      const [savedResponse, applicationsResponse] =
        await Promise.all([
          fetch("/api/saved-jobs", {
            cache: "no-store",
          }),
          fetch("/api/applications", {
            cache: "no-store",
          }),
        ]);

      const savedData = await savedResponse.json();
      const applicationsData = await applicationsResponse.json();

      if (savedData.success && Array.isArray(savedData.jobIds)) {
        setSavedJobs(savedData.jobIds);
      }

      if (
        applicationsData.success &&
        Array.isArray(applicationsData.applications)
      ) {
        setAppliedJobs(
          applicationsData.applications
            .map((application: { jobId?: string }) => application.jobId)
            .filter(
              (jobId: string | undefined): jobId is string =>
                Boolean(jobId),
            ),
        );
      }
    } catch (err) {
      console.error("Failed to load saved/application state:", err);
    }
  }

  /*
   * ---------------------------------------------------------
   * INITIAL LOAD
   * ---------------------------------------------------------
   */
  useEffect(() => {
    loadJobs();
    loadUserJobState();
  }, []);

  /*
   * ---------------------------------------------------------
   * SEARCH
   *
   * Wait briefly before requesting the backend so every
   * keystroke does not create a request.
   * ---------------------------------------------------------
   */
  useEffect(() => {
    const timer = window.setTimeout(() => {
      loadJobs();
    }, 400);

    return () => window.clearTimeout(timer);
  }, [search]);

  /*
   * ---------------------------------------------------------
   * PLATFORM FILTER
   * ---------------------------------------------------------
   */
  const filteredJobs = useMemo(() => {
    if (platform === "All Platforms") {
      return jobs;
    }

    return jobs.filter(
      (job) =>
        job.platform?.toLowerCase() ===
        platform.toLowerCase(),
    );
  }, [jobs, platform]);

  /*
   * ---------------------------------------------------------
   * CLEAR FILTERS
   * ---------------------------------------------------------
   */
  function clearFilters() {
    setSearch("");
    setPlatform("All Platforms");
  }

  const hasFilters =
    search.trim().length > 0 ||
    platform !== "All Platforms";

  /*
   * ---------------------------------------------------------
   * SAVE / UNSAVE
   * ---------------------------------------------------------
   */
  async function toggleSaveJob(jobId: string) {
    const isSaved = savedJobs.includes(jobId);

    try {
      setSavingJobId(jobId);

      const response = await fetch("/api/saved-jobs", {
        method: isSaved ? "DELETE" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jobId,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Unable to update saved job.");
      }

      if (isSaved) {
        setSavedJobs((current) =>
          current.filter((id) => id !== jobId),
        );
      } else {
        setSavedJobs((current) => [...current, jobId]);
      }
    } catch (err) {
      console.error("Save job error:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Unable to update saved job.",
      );
    } finally {
      setSavingJobId(null);
    }
  }

  /*
   * ---------------------------------------------------------
   * APPLY
   *
   * 1. Save application in our database.
   * 2. Mark the job as applied locally.
   * 3. Open the REAL external job URL.
   * ---------------------------------------------------------
   */
  async function applyToJob(job: Job) {
    if (!job.url) {
      setError("This job does not have a valid application URL.");
      return;
    }

    if (appliedJobs.includes(job.id)) {
      window.open(job.url, "_blank", "noopener,noreferrer");
      return;
    }

    try {
      setApplyingJobId(job.id);
      setError("");

      const response = await fetch("/api/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jobId: job.id,
        }),
      });

      const data = await response.json();

      /*
       * Some APIs may return an "already applied" response.
       * We still allow the user to open the real job.
       */
      if (!response.ok || !data.success) {
        throw new Error(
          data.error || "Unable to record application.",
        );
      }

      setAppliedJobs((current) => {
        if (current.includes(job.id)) {
          return current;
        }

        return [...current, job.id];
      });

      window.open(job.url, "_blank", "noopener,noreferrer");
    } catch (err) {
      console.error("Apply job error:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Unable to apply to this job.",
      );
    } finally {
      setApplyingJobId(null);
    }
  }

  /*
   * ---------------------------------------------------------
   * LOADING STATE
   * ---------------------------------------------------------
   */
  if (loading) {
    return (
      <section className="relative mt-10 overflow-hidden rounded-3xl border border-white/[0.07] bg-[#050810]/80 p-6 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-7">
        <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-cyan-500/[0.07] blur-3xl" />

        <div className="pointer-events-none absolute -bottom-40 -left-32 h-80 w-80 rounded-full bg-violet-500/[0.07] blur-3xl" />

        <div className="relative">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/[0.08]">
              <Sparkles className="h-4 w-4 text-cyan-300" />
            </div>

            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-300">
              AI Recommendations
            </span>
          </div>

          <h2 className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Top Job Matches
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Finding real opportunities matched to your profile.
          </p>

          <div className="mt-7 flex items-center justify-center rounded-3xl border border-white/[0.07] bg-white/[0.025] py-16">
            <div className="flex items-center gap-3">
              <Loader2 className="h-5 w-5 animate-spin text-cyan-400" />

              <span className="text-sm text-slate-400">
                Loading real job opportunities...
              </span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  /*
   * ---------------------------------------------------------
   * MAIN SECTION
   * ---------------------------------------------------------
   */
  return (
    <section className="relative mt-10 overflow-hidden rounded-3xl border border-white/[0.07] bg-[#050810]/80 p-5 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-6 lg:p-7">
      {/* Ambient lighting */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-cyan-500/[0.07] blur-3xl" />

      <div className="pointer-events-none absolute -bottom-40 -left-32 h-80 w-80 rounded-full bg-violet-500/[0.07] blur-3xl" />

      <div className="pointer-events-none absolute right-1/4 top-0 h-48 w-48 rounded-full bg-blue-500/[0.025] blur-3xl" />

      <div className="relative">
        {/* HEADER */}
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/[0.08] shadow-lg shadow-cyan-500/[0.05]">
                <Sparkles className="h-4 w-4 text-cyan-300" />
              </div>

              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-300">
                AI Recommendations
              </span>
            </div>

            <h2 className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Top Job Matches
            </h2>

            <p className="mt-2 text-sm text-slate-400">
              Real opportunities matched to your skills and profile.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start rounded-full border border-emerald-400/15 bg-emerald-400/[0.06] px-3.5 py-2 lg:self-auto">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />

            <span className="text-xs font-semibold text-emerald-300">
              AI matching active
            </span>
          </div>
        </div>

        {/* FILTER BAR */}
        <div className="mt-7 flex flex-col gap-3 lg:flex-row">
          {/* Search */}
          <div className="group/search relative flex-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-600 transition-colors group-focus-within/search:text-cyan-400" />

            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search jobs or companies..."
              className="h-14 w-full rounded-2xl border border-white/[0.08] bg-[#0a0f1a]/90 pl-12 pr-12 text-sm text-white outline-none transition-all placeholder:text-slate-600 hover:border-white/[0.12] focus:border-cyan-400/30 focus:bg-[#0c1220] focus:ring-4 focus:ring-cyan-400/[0.04]"
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="absolute right-4 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-lg text-slate-500 transition-all hover:bg-white/[0.06] hover:text-white"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Platform */}
          <div className="relative lg:w-64">
            <Filter className="pointer-events-none absolute left-4 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-cyan-400" />

            <select
              value={platform}
              onChange={(event) =>
                setPlatform(event.target.value)
              }
              className="h-14 w-full appearance-none rounded-2xl border border-cyan-400/15 bg-[#101722] pl-11 pr-10 text-sm font-medium text-slate-300 outline-none transition-all hover:border-cyan-400/30 focus:border-cyan-400/40 focus:ring-4 focus:ring-cyan-400/[0.04]"
            >
              {PLATFORMS.map((item) => (
                <option
                  key={item}
                  value={item}
                  className="bg-[#080d18] text-slate-200"
                >
                  {item}
                </option>
              ))}
            </select>

            <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          </div>
        </div>

        {/* RESULT HEADER */}
        <div className="mt-7 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <span>Showing</span>

            <span className="flex h-8 min-w-8 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/[0.07] px-2 font-semibold text-cyan-300">
              {filteredJobs.length}
            </span>

            <span>
              {filteredJobs.length === 1 ? "job" : "jobs"}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {hasFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="text-xs font-medium text-slate-500 transition-colors hover:text-cyan-300"
              >
                Clear filters
              </button>
            )}

            <button
              type="button"
              onClick={() => loadJobs(true)}
              disabled={refreshing}
              className="group/refresh flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.025] px-3 py-2 text-xs font-semibold text-slate-400 transition-all hover:border-cyan-400/20 hover:bg-cyan-400/[0.05] hover:text-cyan-300 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <RefreshCw
                className={`h-3.5 w-3.5 transition-transform ${
                  refreshing
                    ? "animate-spin"
                    : "group-hover/refresh:rotate-180"
                }`}
              />

              Refresh
            </button>
          </div>
        </div>

        {/* ERROR */}
        {error && (
          <div className="mt-5 flex items-center justify-between gap-4 rounded-2xl border border-red-400/15 bg-red-400/[0.04] px-4 py-3">
            <p className="text-xs text-red-300">{error}</p>

            <button
              type="button"
              onClick={() => setError("")}
              className="shrink-0 text-red-400 transition-colors hover:text-red-300"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* JOBS */}
        {filteredJobs.length > 0 ? (
          <div className="mt-6 space-y-4">
            {filteredJobs.map((job, index) => (
              <JobCard
                key={job.id}
                job={job}
                index={index}
                isSaved={savedJobs.includes(job.id)}
                isApplied={appliedJobs.includes(job.id)}
                isSaving={savingJobId === job.id}
                isApplying={applyingJobId === job.id}
                onToggleSave={toggleSaveJob}
                onApply={applyToJob}
              />
            ))}
          </div>
        ) : (
          /* EMPTY */
          <div className="mt-6 rounded-3xl border border-dashed border-white/[0.09] bg-white/[0.02] px-6 py-16 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.035]">
              <BriefcaseBusiness className="h-6 w-6 text-slate-600" />
            </div>

            <h3 className="mt-4 text-base font-semibold text-white">
              No matching jobs found
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              Try another search term, choose a different platform,
              or refresh to load the latest opportunities.
            </p>

            {hasFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="mt-5 rounded-xl border border-cyan-400/20 bg-cyan-400/[0.07] px-4 py-2.5 text-sm font-semibold text-cyan-300 transition-all hover:border-cyan-400/40 hover:bg-cyan-400/[0.12]"
              >
                Clear filters
              </button>
            )}
          </div>
        )}

        {/* FOOTER */}
        {filteredJobs.length > 0 && (
          <div className="mt-6 flex flex-col items-center justify-between gap-3 border-t border-white/[0.06] pt-5 sm:flex-row">
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <BriefcaseBusiness className="h-3.5 w-3.5" />

              <span>
                Jobs are sourced from connected job platforms.
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-600">
              <ExternalLink className="h-3.5 w-3.5" />

              <span>Applications open on the original job site.</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}