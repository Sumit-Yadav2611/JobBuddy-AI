"use client";

import {
  Bookmark,
  ExternalLink,
  MapPin,
  BriefcaseBusiness,
} from "lucide-react";

type Job = {
  id: number;
  title: string;
  company: string;
  platform: string;
  location: string;
  type: string;
  match: number;
};

type JobCardProps = {
  job: Job;
};

export default function JobCard({ job }: JobCardProps) {
  return (
    <div className="rounded-xl border bg-card p-5 transition-all hover:-translate-y-0.5 hover:shadow-sm">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

        {/* Job Information */}
        <div className="flex gap-4">

          {/* Company Logo Placeholder */}
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border bg-muted">
            <BriefcaseBusiness className="h-5 w-5 text-muted-foreground" />
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-semibold">
                {job.title}
              </h3>

              <span className="rounded-md border px-2 py-0.5 text-xs text-muted-foreground">
                {job.platform}
              </span>
            </div>

            <p className="mt-1 text-sm font-medium">
              {job.company}
            </p>

            <div className="mt-2 flex flex-wrap gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" />
                {job.location}
              </span>

              <span>
                {job.type}
              </span>
            </div>
          </div>
        </div>

        {/* Match + Actions */}
        <div className="flex items-center gap-4 sm:min-w-[280px]">

          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold">
                {job.match}% Match
              </span>

              <span className="text-xs text-muted-foreground">
                Excellent match
              </span>
            </div>

            <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary"
                style={{ width: `${job.match}%` }}
              />
            </div>
          </div>

          <button
            className="rounded-lg border p-2.5 transition-colors hover:bg-muted"
            title="Save job"
          >
            <Bookmark className="h-4 w-4" />
          </button>

          <button
            className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            Apply
            <ExternalLink className="h-4 w-4" />
          </button>

        </div>
      </div>
    </div>
  );
}