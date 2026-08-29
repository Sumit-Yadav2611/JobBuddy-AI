"use client";

import { useState } from "react";
import {
  Bookmark,
  Building2,
  ExternalLink,
  MapPin,
  Trash2,
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
  createdAt: Date;
};

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
        throw new Error(data.error || "Failed to remove saved job");
      }

      setJobs((currentJobs) =>
        currentJobs.filter((job) => job.id !== jobId)
      );
    } catch (error) {
      console.error("Failed to remove saved job:", error);
    } finally {
      setRemovingJobId(null);
    }
  }

  if (jobs.length === 0) {
    return (
      <div className="mt-6 rounded-2xl border bg-card p-12 text-center">
        <Bookmark className="mx-auto h-10 w-10 text-muted-foreground" />

        <h3 className="mt-4 text-lg font-semibold">
          No saved jobs yet
        </h3>

        <p className="mt-2 text-sm text-muted-foreground">
          Save interesting jobs from the Jobs page and they will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-6 grid gap-5 lg:grid-cols-2">
      {jobs.map((job) => (
        <article
          key={job.savedJobId}
          className="
            flex flex-col
            rounded-2xl
            border
            bg-card
            p-6
            transition-all
            hover:-translate-y-0.5
            hover:shadow-sm
          "
        >
          {/* Top */}

          <div className="flex items-start justify-between gap-4">
            <div
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-xl
                border
                bg-muted
              "
            >
              <Building2 className="h-5 w-5" />
            </div>

            <div className="flex items-center gap-2">
              <span
                className="
                  inline-flex
                  items-center
                  gap-1.5
                  rounded-full
                  border
                  px-3
                  py-1
                  text-xs
                  text-muted-foreground
                "
              >
                <Bookmark className="h-3.5 w-3.5" />
                Saved
              </span>

              <button
                type="button"
                onClick={() => removeSavedJob(job.id)}
                disabled={removingJobId === job.id}
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-lg
                  border
                  transition-colors
                  hover:bg-muted
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
                title="Remove saved job"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Title */}

          <h3 className="mt-5 text-xl font-semibold leading-tight">
            {job.title}
          </h3>

          {/* Company */}

          <p className="mt-2 font-medium text-muted-foreground">
            {job.company}
          </p>

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

            {job.platform && (
              <span className="rounded-full border px-2.5 py-1">
                {job.platform}
              </span>
            )}
          </div>

          {/* Match Score */}

          {job.matchScore !== null && (
            <div className="mt-4">
              <span
                className="
                  inline-flex
                  rounded-full
                  bg-green-100
                  px-3
                  py-1
                  text-sm
                  font-semibold
                  text-green-700
                "
              >
                {job.matchScore}% Match
              </span>
            </div>
          )}

          {/* Description */}

          {job.description && (
            <p className="mt-5 line-clamp-4 text-sm leading-6 text-muted-foreground">
              {job.description
                .replace(/<[^>]*>/g, "")
                .replace(/\u00a0/g, " ")
                .replace(/&amp;/g, "&")
                .replace(/&lt;/g, "<")
                .replace(/&gt;/g, ">")
                .replace(/\s+/g, " ")
                .trim()}
            </p>
          )}

          {/* Footer */}

          <div className="mt-6 flex items-center justify-between gap-3 border-t pt-5">
            <div>
              {job.salary && (
                <p className="text-sm font-medium">
                  {job.salary}
                </p>
              )}
            </div>

            {job.url && (
              <a
                href={job.url}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-lg
                  bg-primary
                  px-4
                  py-2.5
                  text-sm
                  font-semibold
                  text-primary-foreground
                  hover:opacity-90
                "
              >
                View Job
                <ExternalLink className="h-4 w-4" />
              </a>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}