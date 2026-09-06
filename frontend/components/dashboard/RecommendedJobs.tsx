"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Bookmark,
  Check,
  ExternalLink,
  Loader2,
  MapPin,
  Sparkles,
  Target,
  TrendingUp,
  X,
  Zap,
} from "lucide-react";

type Job = {
  id: string;
  title: string;
  company: string;
  location: string | null;
  matchScore: number;
  matchLevel: string;
  matchedSkillCount: number;
  matchedSkills: string[];
  missingSkills: string[];
  explanation: {
    strengths: string[];
    improvements: string[];
  };
  url?: string | null;
  platform?: string | null;
};

type SaveResponse = {
  success?: boolean;
  saved?: boolean;
  error?: string;
};

type ApplicationResponse = {
  success?: boolean;
  error?: string;
};

export default function RecommendedJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [savedJobs, setSavedJobs] = useState<string[]>([]);
  const [appliedJobs, setAppliedJobs] = useState<string[]>([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [platform, setPlatform] = useState("All Platforms");

  const [savingJobId, setSavingJobId] = useState<string | null>(null);
  const [applyingJobId, setApplyingJobId] = useState<string | null>(null);

  const [actionError, setActionError] = useState<string | null>(null);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  /*
   * ============================================================
   * LOAD DATA
   * ============================================================
   */

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        setActionError(null);

        const [
          jobsResponse,
          savedResponse,
          applicationsResponse,
        ] = await Promise.all([
          fetch("/api/jobs/recommended", {
            cache: "no-store",
          }),
          fetch("/api/saved-jobs", {
            cache: "no-store",
          }),
          fetch("/api/applications", {
            cache: "no-store",
          }),
        ]);

        const jobsData = await jobsResponse.json();

        const savedData: SaveResponse & {
          jobIds?: string[];
        } = await savedResponse.json();

        let applicationsData: {
          success?: boolean;
          applications?: Array<{
            jobId: string;
          }>;
        } = {};

        if (applicationsResponse.ok) {
          applicationsData = await applicationsResponse.json();
        }

        /*
         * Recommended jobs
         */

        if (jobsData.success) {
          setJobs(
            Array.isArray(jobsData.jobs)
              ? jobsData.jobs
              : [],
          );
        } else {
          throw new Error(
            jobsData.error ||
              "Failed to load recommended jobs.",
          );
        }

        /*
         * Saved jobs
         */

        if (
          savedData.success &&
          Array.isArray(savedData.jobIds)
        ) {
          setSavedJobs(savedData.jobIds);
        } else {
          setSavedJobs([]);
        }

        /*
         * Applications
         */

        if (
          applicationsData.success &&
          Array.isArray(applicationsData.applications)
        ) {
          setAppliedJobs(
            applicationsData.applications
              .map(
                (application) => application.jobId,
              )
              .filter(Boolean),
          );
        } else {
          setAppliedJobs([]);
        }
      } catch (error) {
        console.error(
          "Failed to load recommended jobs:",
          error,
        );

        setActionError(
          error instanceof Error
            ? error.message
            : "Unable to load recommendations right now.",
        );
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  /*
   * ============================================================
   * PLATFORM OPTIONS
   * ============================================================
   */

  const platformOptions = useMemo(() => {
    const platforms = jobs
      .map((job) => job.platform?.trim())
      .filter(
        (value): value is string =>
          Boolean(value),
      );

    return [
      "All Platforms",
      ...Array.from(new Set(platforms)),
    ];
  }, [jobs]);

  /*
   * ============================================================
   * FILTER JOBS
   * ============================================================
   */

  const filteredJobs = useMemo(() => {
    const normalizedSearch =
      search.trim().toLowerCase();

    return jobs.filter((job) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        job.title
          .toLowerCase()
          .includes(normalizedSearch) ||
        job.company
          .toLowerCase()
          .includes(normalizedSearch) ||
        Boolean(
          job.location
            ?.toLowerCase()
            .includes(normalizedSearch),
        ) ||
        job.matchedSkills.some((skill) =>
          skill
            .toLowerCase()
            .includes(normalizedSearch),
        ) ||
        job.missingSkills.some((skill) =>
          skill
            .toLowerCase()
            .includes(normalizedSearch),
        );

      const matchesPlatform =
        platform === "All Platforms" ||
        job.platform?.toLowerCase() ===
          platform.toLowerCase();

      return matchesSearch && matchesPlatform;
    });
  }, [jobs, search, platform]);

  /*
   * ============================================================
   * FILTER HELPERS
   * ============================================================
   */

  function clearFilters() {
    setSearch("");
    setPlatform("All Platforms");
  }

  const hasActiveFilters =
    search.trim().length > 0 ||
    platform !== "All Platforms";

  /*
   * ============================================================
   * MATCH STYLE
   * ============================================================
   */

  function getMatchStyle(level: string) {
    if (level === "Excellent Match") {
      return {
        badge:
          "border-emerald-400/20 bg-emerald-400/[0.08] text-emerald-300",
        glow:
          "from-emerald-400 to-cyan-400",
        label: "Excellent match",
      };
    }

    if (level === "Good Match") {
      return {
        badge:
          "border-cyan-400/20 bg-cyan-400/[0.08] text-cyan-300",
        glow:
          "from-cyan-400 to-blue-500",
        label: "Good match",
      };
    }

    if (level === "Average Match") {
      return {
        badge:
          "border-amber-400/20 bg-amber-400/[0.08] text-amber-300",
        glow:
          "from-amber-400 to-orange-500",
        label: "Average match",
      };
    }

    return {
      badge:
        "border-white/[0.08] bg-white/[0.04] text-slate-400",
      glow:
        "from-slate-500 to-slate-400",
      label: "Potential match",
    };
  }

  /*
   * ============================================================
   * SAVE / UNSAVE
   * ============================================================
   */

  async function toggleSaveJob(jobId: string) {
    const isSaved =
      savedJobs.includes(jobId);

    try {
      setSavingJobId(jobId);
      setActionError(null);
      setActionSuccess(null);

      const response = await fetch(
        "/api/saved-jobs",
        {
          method: isSaved
            ? "DELETE"
            : "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            jobId,
          }),
        },
      );

      const data: SaveResponse =
        await response.json();

      if (
        !response.ok ||
        !data.success
      ) {
        throw new Error(
          data.error ||
            "Unable to update saved job.",
        );
      }

      if (isSaved) {
        setSavedJobs((current) =>
          current.filter(
            (id) => id !== jobId,
          ),
        );

        setActionSuccess(
          "Job removed from saved jobs.",
        );
      } else {
        setSavedJobs((current) =>
          current.includes(jobId)
            ? current
            : [...current, jobId],
        );

        setActionSuccess(
          "Job saved successfully.",
        );
      }

      /*
       * Clear success message after a short delay.
       */
      window.setTimeout(() => {
        setActionSuccess(null);
      }, 2500);
    } catch (error) {
      console.error(
        "Toggle save job error:",
        error,
      );

      setActionError(
        error instanceof Error
          ? error.message
          : "Something went wrong while saving this job.",
      );
    } finally {
      setSavingJobId(null);
    }
  }

  /*
   * ============================================================
   * APPLY / UNAPPLY
   * ============================================================
   *
   * Apply:
   *   POST /api/applications
   *
   * Unapply:
   *   DELETE /api/applications
   *
   * The external job is opened separately through
   * the "View Job" button.
   */

  async function toggleApplication(
    job: Job,
  ) {
    const isApplied =
      appliedJobs.includes(job.id);

    try {
      setApplyingJobId(job.id);
      setActionError(null);
      setActionSuccess(null);

      /*
       * --------------------------------------------------------
       * UNAPPLY
       * --------------------------------------------------------
       */

      if (isApplied) {
        const response = await fetch(
          "/api/applications",
          {
            method: "DELETE",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              jobId: job.id,
            }),
          },
        );

        const data: ApplicationResponse =
          await response.json();

        if (
          !response.ok ||
          !data.success
        ) {
          throw new Error(
            data.error ||
              "Unable to remove application.",
          );
        }

        setAppliedJobs((current) =>
          current.filter(
            (id) => id !== job.id,
          ),
        );

        setActionSuccess(
          "Application removed successfully.",
        );

        window.setTimeout(() => {
          setActionSuccess(null);
        }, 2500);

        return;
      }

      /*
       * --------------------------------------------------------
       * APPLY
       * --------------------------------------------------------
       */

      const response = await fetch(
        "/api/applications",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            jobId: job.id,
          }),
        },
      );

      const data: ApplicationResponse =
        await response.json();

      if (
        !response.ok ||
        !data.success
      ) {
        throw new Error(
          data.error ||
            "Unable to record application.",
        );
      }

      setAppliedJobs((current) =>
        current.includes(job.id)
          ? current
          : [...current, job.id],
      );

      setActionSuccess(
        "Application recorded successfully.",
      );

      window.setTimeout(() => {
        setActionSuccess(null);
      }, 2500);

      /*
       * Open the real external job page.
       */
      if (job.url) {
        window.open(
          job.url,
          "_blank",
          "noopener,noreferrer",
        );
      }
    } catch (error) {
      console.error(
        "Toggle application error:",
        error,
      );

      setActionError(
        error instanceof Error
          ? error.message
          : "Unable to update application.",
      );
    } finally {
      setApplyingJobId(null);
    }
  }

  /*
   * ============================================================
   * VIEW REAL JOB
   * ============================================================
   */

  function viewJob(job: Job) {
    if (!job.url) {
      setActionError(
        "This job does not have an external application URL.",
      );
      return;
    }

    window.open(
      job.url,
      "_blank",
      "noopener,noreferrer",
    );
  }

  /*
   * ============================================================
   * LOADING
   * ============================================================
   */

  if (loading) {
    return (
      <section className="relative mt-10 overflow-hidden rounded-3xl border border-white/[0.07] bg-[#050810]/80 p-6 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-7">
        <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-cyan-500/[0.07] blur-3xl" />

        <div className="pointer-events-none absolute -bottom-40 -left-32 h-80 w-80 rounded-full bg-violet-500/[0.07] blur-3xl" />

        <div className="relative">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/[0.08]">
              <Sparkles className="h-4 w-4 text-cyan-300" />
            </div>

            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-300/80">
              AI Recommendations
            </span>
          </div>

          <h2 className="mt-3 text-2xl font-bold tracking-tight text-white">
            Recommended Jobs For You
          </h2>

          <div className="mt-6 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-6">
            <div className="flex items-center gap-3">
              <Loader2 className="h-5 w-5 animate-spin text-cyan-400" />

              <p className="text-sm text-slate-400">
                Finding the best opportunities
                for your profile...
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  /*
   * ============================================================
   * EMPTY
   * ============================================================
   */

  if (jobs.length === 0) {
    return (
      <section className="relative mt-10 overflow-hidden rounded-3xl border border-white/[0.07] bg-[#050810]/80 p-6 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-7">
        <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-violet-500/10 blur-3xl" />

        <div className="relative">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-violet-400/20 bg-violet-400/[0.08]">
              <Target className="h-4 w-4 text-violet-300" />
            </div>

            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-violet-300/80">
              AI Recommendations
            </span>
          </div>

          <h2 className="mt-3 text-2xl font-bold tracking-tight text-white">
            Recommended Jobs For You
          </h2>

          <div className="mt-6 rounded-3xl border border-dashed border-white/[0.1] bg-white/[0.02] px-6 py-14 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.035]">
              <Target className="h-6 w-6 text-slate-600" />
            </div>

            <p className="mt-4 font-semibold text-white">
              No recommended jobs yet
            </p>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              Upload your resume and
              complete your profile to unlock
              personalized job recommendations.
            </p>
          </div>
        </div>
      </section>
    );
  }

  /*
   * ============================================================
   * MAIN
   * ============================================================
   */

  const averageMatch =
    jobs.length > 0
      ? Math.round(
          jobs.reduce(
            (total, job) =>
              total + job.matchScore,
            0,
          ) / jobs.length,
        )
      : 0;

  return (
    <section className="relative mt-10 overflow-hidden rounded-3xl border border-white/[0.07] bg-[#050810]/80 p-5 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-6 lg:p-7">
      {/* Ambient lighting */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-cyan-500/[0.07] blur-3xl" />

      <div className="pointer-events-none absolute -bottom-40 -left-32 h-80 w-80 rounded-full bg-violet-500/[0.07] blur-3xl" />

      <div className="relative">
        {/* HEADER */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/[0.08]">
                <Sparkles className="h-4 w-4 text-cyan-300" />
              </div>

              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-300/80">
                AI Job Intelligence
              </span>
            </div>

            <h2 className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Recommended Jobs For You
            </h2>

            <p className="mt-1.5 text-sm text-slate-400">
              Personalized opportunities ranked
              by your skills and profile.
            </p>
          </div>

          <div className="flex w-fit items-center gap-2 rounded-full border border-emerald-400/15 bg-emerald-400/[0.06] px-3 py-1.5">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />

            <span className="text-xs font-medium text-emerald-300">
              {filteredJobs.length} matches found
            </span>
          </div>
        </div>

        {/* FEEDBACK */}
        {(actionError ||
          actionSuccess) && (
          <div className="mt-5">
            {actionError && (
              <div className="flex items-start justify-between gap-3 rounded-2xl border border-red-400/15 bg-red-400/[0.05] px-4 py-3 text-sm text-red-300">
                <span>{actionError}</span>

                <button
                  type="button"
                  onClick={() =>
                    setActionError(null)
                  }
                  className="shrink-0 text-red-300/70 transition-colors hover:text-red-200"
                  aria-label="Dismiss error"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}

            {actionSuccess && (
              <div className="rounded-2xl border border-emerald-400/15 bg-emerald-400/[0.05] px-4 py-3 text-sm text-emerald-300">
                {actionSuccess}
              </div>
            )}
          </div>
        )}

        {/* SUMMARY */}
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-400/15 hover:bg-white/[0.04]">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-cyan-400" />

              <span className="text-xs text-slate-500">
                Opportunities
              </span>
            </div>

            <p className="mt-2 text-xl font-bold text-white">
              {jobs.length}
            </p>
          </div>

          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-violet-400/15 hover:bg-white/[0.04]">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-violet-400" />

              <span className="text-xs text-slate-500">
                Average Match
              </span>
            </div>

            <p className="mt-2 text-xl font-bold text-white">
              {averageMatch}%
            </p>
          </div>

          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-400/15 hover:bg-white/[0.04]">
            <div className="flex items-center gap-2">
              <Bookmark className="h-4 w-4 text-emerald-400" />

              <span className="text-xs text-slate-500">
                Saved
              </span>
            </div>

            <p className="mt-2 text-xl font-bold text-white">
              {savedJobs.length}
            </p>
          </div>
        </div>

        {/* FILTERS */}
        <div className="mt-6 grid gap-3 lg:grid-cols-[1fr_220px]">
          <div className="relative">
            <input
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search jobs, companies, skills..."
              className="h-11 w-full rounded-xl border border-white/[0.08] bg-black/20 px-4 text-sm text-white outline-none placeholder:text-slate-600 transition-all focus:border-cyan-400/30 focus:bg-white/[0.035] focus:ring-2 focus:ring-cyan-400/10"
            />
          </div>

          <select
            value={platform}
            onChange={(event) =>
              setPlatform(event.target.value)
            }
            className="h-11 rounded-xl border border-white/[0.08] bg-[#0a0f1c] px-4 text-sm text-slate-300 outline-none transition-all focus:border-cyan-400/30 focus:ring-2 focus:ring-cyan-400/10"
          >
            {platformOptions.map(
              (option) => (
                <option
                  key={option}
                  value={option}
                >
                  {option}
                </option>
              ),
            )}
          </select>
        </div>

        {/* RESULT COUNT */}
        <div className="mt-5 flex items-center justify-between">
          <p className="text-sm text-slate-500">
            Showing{" "}
            <span className="font-semibold text-cyan-300">
              {filteredJobs.length}
            </span>{" "}
            jobs
          </p>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="text-xs font-medium text-slate-500 transition-colors hover:text-cyan-300"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* JOBS */}
        {filteredJobs.length === 0 ? (
          <div className="mt-6 rounded-3xl border border-dashed border-white/[0.08] bg-white/[0.02] px-6 py-12 text-center">
            <Target className="mx-auto h-7 w-7 text-slate-600" />

            <p className="mt-3 font-semibold text-white">
              No jobs match your filters
            </p>

            <button
              type="button"
              onClick={clearFilters}
              className="mt-3 text-sm font-semibold text-cyan-300 transition-colors hover:text-cyan-200"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="mt-6 space-y-5">
            {filteredJobs.map(
              (job, index) => {
                const isSaved =
                  savedJobs.includes(
                    job.id,
                  );

                const isApplied =
                  appliedJobs.includes(
                    job.id,
                  );

                const isSaving =
                  savingJobId === job.id;

                const isApplying =
                  applyingJobId === job.id;

                const matchStyle =
                  getMatchStyle(
                    job.matchLevel,
                  );

                return (
                  <div
                    key={job.id}
                    className="group relative overflow-hidden rounded-3xl border border-white/[0.07] bg-white/[0.025] shadow-xl shadow-black/10 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/20 hover:bg-white/[0.04] hover:shadow-2xl hover:shadow-cyan-950/20"
                  >
                    <div className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-cyan-500/[0.04] blur-3xl transition-all duration-500 group-hover:bg-cyan-500/[0.08]" />

                    <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                    <div className="relative p-5 sm:p-6 lg:p-7">
                      {/* HEADER */}
                      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            {index === 0 && (
                              <span className="flex items-center gap-1.5 rounded-lg border border-orange-400/20 bg-orange-400/[0.08] px-2.5 py-1 text-[11px] font-semibold text-orange-300">
                                <Zap className="h-3 w-3" />
                                Top Match
                              </span>
                            )}

                            <span className="rounded-lg border border-white/[0.08] bg-white/[0.035] px-2.5 py-1 text-[11px] font-medium text-slate-400">
                              {job.platform ||
                                "Recommended"}
                            </span>
                          </div>

                          <h3 className="mt-4 text-xl font-bold tracking-tight text-white transition-colors group-hover:text-cyan-200 sm:text-2xl">
                            {job.title}
                          </h3>

                          <p className="mt-1.5 text-sm font-medium text-slate-400">
                            {job.company}
                          </p>

                          {job.location && (
                            <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
                              <MapPin className="h-3.5 w-3.5 text-slate-600" />

                              <span>
                                {job.location}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* MATCH */}
                        <div
                          className={`shrink-0 rounded-2xl border px-5 py-4 text-center backdrop-blur-xl ${matchStyle.badge}`}
                        >
                          <div className="text-3xl font-bold tracking-tight text-white">
                            {job.matchScore}%
                          </div>

                          <div className="mt-0.5 text-xs font-semibold">
                            {matchStyle.label}
                          </div>
                        </div>
                      </div>

                      {/* MATCH BAR */}
                      <div className="mt-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Sparkles className="h-3.5 w-3.5 text-cyan-400" />

                            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                              Profile Match
                            </span>
                          </div>

                          <span className="text-xs font-semibold text-slate-400">
                            {job.matchScore}%
                          </span>
                        </div>

                        <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/[0.06]">
                          <div
                            className={`h-full rounded-full bg-gradient-to-r ${matchStyle.glow} shadow-lg transition-all duration-700`}
                            style={{
                              width: `${Math.min(
                                Math.max(
                                  job.matchScore,
                                  0,
                                ),
                                100,
                              )}%`,
                            }}
                          />
                        </div>
                      </div>

                      {/* SKILL COVERAGE */}
                      <div className="mt-7 rounded-2xl border border-white/[0.06] bg-black/10 p-5">
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                          <div>
                            <p className="text-sm font-semibold text-white">
                              Skill Coverage
                            </p>

                            <p className="mt-1 text-xs text-slate-500">
                              {
                                job.matchedSkillCount
                              }{" "}
                              skills matched
                              to this role
                            </p>
                          </div>

                          <div className="flex items-center gap-2 rounded-lg border border-emerald-400/15 bg-emerald-400/[0.05] px-2.5 py-1.5">
                            <Check className="h-3.5 w-3.5 text-emerald-400" />

                            <span className="text-xs font-semibold text-emerald-300">
                              Strong alignment
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* MATCHED SKILLS */}
                      {job.matchedSkills
                        .length > 0 && (
                        <div className="mt-6">
                          <div className="mb-3 flex items-center gap-2">
                            <Check className="h-4 w-4 text-emerald-400" />

                            <h4 className="text-sm font-semibold text-white">
                              Matched Skills
                            </h4>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            {job.matchedSkills.map(
                              (skill) => (
                                <span
                                  key={skill}
                                  className="rounded-xl border border-emerald-400/15 bg-emerald-400/[0.05] px-3 py-1.5 text-xs font-medium text-emerald-300 transition-all hover:border-emerald-400/30 hover:bg-emerald-400/[0.08] hover:-translate-y-0.5"
                                >
                                  ✓ {skill}
                                </span>
                              ),
                            )}
                          </div>
                        </div>
                      )}

                      {/* MISSING SKILLS */}
                      {job.missingSkills
                        .length > 0 && (
                        <div className="mt-6">
                          <div className="mb-3 flex items-center gap-2">
                            <TrendingUp className="h-4 w-4 text-amber-400" />

                            <h4 className="text-sm font-semibold text-white">
                              Skills to Improve
                            </h4>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            {job.missingSkills.map(
                              (skill) => (
                                <span
                                  key={skill}
                                  className="rounded-xl border border-white/[0.07] bg-white/[0.035] px-3 py-1.5 text-xs font-medium text-slate-400"
                                >
                                  + {skill}
                                </span>
                              ),
                            )}
                          </div>
                        </div>
                      )}

                      {/* AI EXPLANATION */}
                      {job.explanation
                        ?.strengths
                        ?.length > 0 && (
                        <div className="mt-6 rounded-2xl border border-cyan-400/10 bg-cyan-400/[0.025] p-5">
                          <div className="mb-4 flex items-center gap-2">
                            <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-cyan-400/15 bg-cyan-400/[0.06]">
                              <Sparkles className="h-3.5 w-3.5 text-cyan-300" />
                            </div>

                            <h4 className="text-sm font-semibold text-white">
                              Why this job matches you
                            </h4>
                          </div>

                          <div className="space-y-2.5">
                            {job.explanation.strengths.map(
                              (item) => (
                                <p
                                  key={item}
                                  className="flex gap-2 text-sm leading-6 text-slate-400"
                                >
                                  <span className="mt-1 text-emerald-400">
                                    ✓
                                  </span>

                                  <span>
                                    {item}
                                  </span>
                                </p>
                              ),
                            )}
                          </div>
                        </div>
                      )}

                      {/* IMPROVEMENTS */}
                      {job.explanation
                        ?.improvements
                        ?.length > 0 && (
                        <div className="mt-5 rounded-2xl border border-amber-400/10 bg-amber-400/[0.02] p-5">
                          <div className="mb-4 flex items-center gap-2">
                            <TrendingUp className="h-4 w-4 text-amber-400" />

                            <h4 className="text-sm font-semibold text-white">
                              Improve your chances
                            </h4>
                          </div>

                          <div className="space-y-2.5">
                            {job.explanation.improvements.map(
                              (item) => (
                                <p
                                  key={item}
                                  className="flex gap-2 text-sm leading-6 text-slate-400"
                                >
                                  <span className="mt-1 text-amber-400">
                                    →
                                  </span>

                                  <span>
                                    {item}
                                  </span>
                                </p>
                              ),
                            )}
                          </div>
                        </div>
                      )}

                      {/* ACTIONS */}
                      <div className="mt-7 flex flex-wrap items-center gap-3 border-t border-white/[0.06] pt-6">
                        {/* SAVE */}
                        <button
                          type="button"
                          onClick={() =>
                            toggleSaveJob(
                              job.id,
                            )
                          }
                          disabled={isSaving}
                          className={`flex h-10 items-center gap-2 rounded-xl border px-4 text-sm font-semibold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60 ${
                            isSaved
                              ? "border-emerald-400/25 bg-emerald-400/[0.08] text-emerald-300 hover:border-emerald-400/40 hover:bg-emerald-400/[0.12]"
                              : "border-white/[0.08] bg-white/[0.025] text-slate-400 hover:border-cyan-400/25 hover:bg-cyan-400/[0.06] hover:text-cyan-300"
                          }`}
                        >
                          {isSaving ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Bookmark
                              className={`h-4 w-4 ${
                                isSaved
                                  ? "fill-current"
                                  : ""
                              }`}
                            />
                          )}

                          {isSaving
                            ? "Saving..."
                            : isSaved
                              ? "Saved"
                              : "Save Job"}
                        </button>

                        {/* APPLY / UNAPPLY */}
                        <button
                          type="button"
                          onClick={() =>
                            toggleApplication(
                              job,
                            )
                          }
                          disabled={isApplying}
                          className={`flex h-10 items-center gap-2 rounded-xl border px-4 text-sm font-semibold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60 ${
                            isApplied
                              ? "border-emerald-400/25 bg-emerald-400/[0.07] text-emerald-300 hover:border-red-400/25 hover:bg-red-400/[0.06] hover:text-red-300"
                              : "border-cyan-400/20 bg-gradient-to-r from-cyan-400/[0.9] via-blue-500/[0.9] to-violet-500/[0.9] text-white shadow-lg shadow-cyan-500/10 hover:-translate-y-0.5 hover:shadow-cyan-500/20"
                          }`}
                        >
                          {isApplying ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : isApplied ? (
                            <Check className="h-4 w-4" />
                          ) : null}

                          {isApplying
                            ? "Updating..."
                            : isApplied
                              ? "Applied ✓"
                              : "Apply"}
                        </button>

                        {/* VIEW JOB */}
                        <button
                          type="button"
                          onClick={() =>
                            viewJob(job)
                          }
                          disabled={!job.url}
                          className="flex h-10 items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.025] px-4 text-sm font-semibold text-slate-300 transition-all duration-200 hover:border-cyan-400/20 hover:bg-white/[0.05] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          View Job

                          <ExternalLink className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      {/* Small explanation */}
                      {isApplied && (
                        <p className="mt-3 text-xs text-slate-600">
                          Application recorded.
                          Click{" "}
                          <span className="text-slate-400">
                            Applied ✓
                          </span>{" "}
                          to remove it from your
                          application tracker.
                        </p>
                      )}
                    </div>
                  </div>
                );
              },
            )}
          </div>
        )}
      </div>
    </section>
  );
}