"use client";

import { useEffect, useState } from "react";
import { ExternalLink, MapPin, Building2 } from "lucide-react";
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
  matchedSkills: string[];
  missingSkills: string[];
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

export default function JobsClient({ initialJobs }: { initialJobs: Job[] }) {
  const [jobs, setJobs] = useState<Job[]>(initialJobs);

  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");

  const [loading, setLoading] = useState(false);

  // Track jobs currently being applied to
  const [applyingJobId, setApplyingJobId] = useState<string | null>(null);

  // Track successfully applied jobs
  const [appliedJobIds, setAppliedJobIds] = useState<Set<string>>(new Set());

  async function fetchJobs(currentSearch: string, currentLocation: string) {
    try {
      setLoading(true);

      const params = new URLSearchParams();

      if (currentSearch.trim()) {
        params.set("search", currentSearch.trim());
      }

      if (currentLocation.trim()) {
        params.set("location", currentLocation.trim());
      }

      const query = params.toString();

      const response = await fetch(`/api/jobs${query ? `?${query}` : ""}`, {
        cache: "no-store",
      });

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
        error instanceof Error ? error.message : "Failed to apply for this job",
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
      {/* Search + Location Filters */}

      <JobFilters
        search={search}
        location={location}
        onSearchChange={setSearch}
        onLocationChange={setLocation}
        onRefresh={() => fetchJobs(search, location)}
      />

      {/* Result Count */}

      <div className="mt-6">
        <p className="text-sm text-muted-foreground">
          {loading ? "Searching jobs..." : `Showing ${jobs.length} jobs`}
        </p>
      </div>

      {/* Empty State */}

      {!loading && jobs.length === 0 && (
        <div className="mt-6 rounded-2xl border bg-card p-10 text-center">
          <h3 className="text-lg font-semibold">No jobs found</h3>

          <p className="mt-2 text-sm text-muted-foreground">
            Try a different job title, skill, or location.
          </p>
        </div>
      )}

      {/* Job Cards */}

      {!loading && jobs.length > 0 && (
        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          {jobs.map((job) => {
            const isApplying = applyingJobId === job.id;
            const hasApplied = appliedJobIds.has(job.id);

            return (
              <article
                key={job.id}
                className="flex flex-col rounded-2xl border bg-card p-6 transition-all hover:-translate-y-0.5 hover:shadow-sm"
              >
                {/* Top */}

                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border bg-muted">
                    <Building2 className="h-5 w-5" />
                  </div>

                  <span className="rounded-full border px-3 py-1 text-xs text-muted-foreground">
                    {job.platform || "Job"}
                  </span>
                </div>

                {/* Title */}

                <h3 className="mt-5 text-xl font-semibold leading-tight">
                  {job.title}
                </h3>

                {/* Company */}

                <p className="mt-2 font-medium text-muted-foreground">
                  {job.company}
                </p>

                {job.matchScore !== null && (
                  <div className="mt-4 rounded-xl border bg-muted/30 p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Job Match</span>

                      <span className="text-lg font-bold text-primary">
                        {job.matchScore}%
                      </span>
                    </div>

                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-primary transition-all"
                        style={{
                          width: `${job.matchScore}%`,
                        }}
                      />
                    </div>

                    {job.matchedSkills.length > 0 && (
                      <div className="mt-3">
                        <p className="text-xs font-medium text-muted-foreground">
                          Matching skills
                        </p>

                        <div className="mt-2 flex flex-wrap gap-2">
                          {job.matchedSkills.map((skill) => (
                            <span
                              key={skill}
                              className="rounded-full border px-2.5 py-1 text-xs"
                            >
                              ✓ {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {job.missingSkills.length > 0 && (
                      <div className="mt-3">
                        <p className="text-xs font-medium text-muted-foreground">
                          Skills to improve
                        </p>

                        <div className="mt-2 flex flex-wrap gap-2">
                          {job.missingSkills.map((skill) => (
                            <span
                              key={skill}
                              className="rounded-full border px-2.5 py-1 text-xs text-muted-foreground"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Details */}

                <div className="mt-4 flex flex-wrap gap-3 text-sm text-muted-foreground">
                  {job.location && (
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="h-4 w-4" />
                      {job.location}
                    </span>
                  )}

                  {job.jobType && (
                    <span className="rounded-full border px-2.5 py-1">
                      {job.jobType}
                    </span>
                  )}
                </div>

                {/* Description */}

                {job.description && (
                  <p className="mt-5 line-clamp-4 text-sm leading-6 text-muted-foreground">
                    {cleanDescription(job.description)}
                  </p>
                )}

                {/* Footer */}

                <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t pt-5">
                  <div>
                    {job.salary && (
                      <p className="text-sm font-medium">{job.salary}</p>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Apply Button */}

                    <button
                      type="button"
                      onClick={() => applyToJob(job.id)}
                      disabled={isApplying || hasApplied}
                      className={`rounded-lg px-4 py-2.5 text-sm font-semibold transition ${
                        hasApplied
                          ? "cursor-default border bg-muted text-muted-foreground"
                          : "bg-primary text-primary-foreground hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                      }`}
                    >
                      {isApplying
                        ? "Applying..."
                        : hasApplied
                          ? "Applied ✓"
                          : "Apply"}
                    </button>

                    {/* View Job */}

                    {job.url && (
                      <a
                        href={job.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-semibold hover:bg-muted"
                      >
                        View Job
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </>
  );
}
