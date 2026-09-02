"use client";

import { useState, type ElementType } from "react";
import Link from "next/link";

import {
  BriefcaseBusiness,
  ExternalLink,
  Clock,
  CheckCircle2,
  XCircle,
  Trophy,
} from "lucide-react";

type Application = {
  id: string;
  status: string;
  appliedAt: string;
  createdAt: string;
  updatedAt: string;
  jobId: string;
  title: string;
  company: string;
  location: string | null;
  jobType: string | null;
  url: string | null;
};

const statuses = [
  "Applied",
  "Interview",
  "Offer",
  "Rejected",
] as const;

type ApplicationStatus = (typeof statuses)[number];

export default function ApplicationsClient({
  initialApplications,
}: {
  initialApplications: Application[];
}) {
  const [applications, setApplications] =
    useState<Application[]>(initialApplications);

  const [updatingId, setUpdatingId] = useState<string | null>(null);

  async function updateStatus(
    applicationId: string,
    status: ApplicationStatus,
  ) {
    const previousApplications = applications;

    try {
      setUpdatingId(applicationId);

      // Optimistically update UI
      setApplications((previous) =>
        previous.map((application) =>
          application.id === applicationId
            ? {
                ...application,
                status,
              }
            : application,
        ),
      );

      const response = await fetch(
        `/api/applications/${applicationId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.error || "Failed to update status",
        );
      }
    } catch (error) {
      console.error(
        "Failed to update application status:",
        error,
      );

      // Restore previous UI if API request fails
      setApplications(previousApplications);

      alert(
        error instanceof Error
          ? error.message
          : "Failed to update application status",
      );
    } finally {
      setUpdatingId(null);
    }
  }

  // =========================
  // STATISTICS
  // =========================

  const appliedCount = applications.filter(
    (application) => application.status === "Applied",
  ).length;

  const interviewCount = applications.filter(
    (application) => application.status === "Interview",
  ).length;

  const offerCount = applications.filter(
    (application) => application.status === "Offer",
  ).length;

  const rejectedCount = applications.filter(
    (application) => application.status === "Rejected",
  ).length;

  const totalApplications = applications.length;

  const interviewRate =
    totalApplications > 0
      ? Math.round(
          (interviewCount / totalApplications) * 100,
        )
      : 0;

  const offerRate =
    totalApplications > 0
      ? Math.round(
          (offerCount / totalApplications) * 100,
        )
      : 0;

  return (
    <>
      {/* Statistics */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Applied"
          value={appliedCount}
          icon={Clock}
        />

        <StatCard
          label="Interviews"
          value={interviewCount}
          icon={CheckCircle2}
        />

        <StatCard
          label="Offers"
          value={offerCount}
          icon={Trophy}
        />

        <StatCard
          label="Rejected"
          value={rejectedCount}
          icon={XCircle}
        />
      </div>

      {/* Metrics */}
      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        <MetricCard
          label="Total Applications"
          value={totalApplications}
        />

        <MetricCard
          label="Interview Rate"
          value={`${interviewRate}%`}
        />

        <MetricCard
          label="Offer Rate"
          value={`${offerRate}%`}
        />
      </div>

      {/* Empty state */}
      {applications.length === 0 && (
        <div className="mt-8 rounded-2xl border bg-card p-10 text-center">
          <BriefcaseBusiness className="mx-auto h-10 w-10 text-muted-foreground" />

          <h3 className="mt-4 text-lg font-semibold">
            No applications yet
          </h3>

          <p className="mt-2 text-sm text-muted-foreground">
            Apply to jobs and your applications will appear
            here.
          </p>

          <Link
            href="/dashboard/jobs"
            className="mt-6 inline-flex rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90"
          >
            Find Jobs
          </Link>
        </div>
      )}

      {/* Applications */}
      {applications.length > 0 && (
        <div className="mt-8 space-y-4">
          {applications.map((application) => {
            const updating =
              updatingId === application.id;

            return (
              <article
                key={application.id}
                className="rounded-2xl border bg-card p-6"
              >
                <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                  {/* Job information */}
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border bg-muted">
                      <BriefcaseBusiness className="h-5 w-5" />
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold">
                        {application.title}
                      </h3>

                      <p className="mt-1 font-medium text-muted-foreground">
                        {application.company}
                      </p>

                      <div className="mt-2 flex flex-wrap gap-3 text-sm text-muted-foreground">
                        {application.location && (
                          <span className="inline-flex items-center gap-1">
                            📍 {application.location}
                          </span>
                        )}

                        {application.jobType && (
                          <span className="rounded-full border px-2.5 py-1">
                            {application.jobType}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Status */}
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                    <label
                      htmlFor={`status-${application.id}`}
                      className="text-sm font-medium"
                    >
                      Status
                    </label>

                    <select
                      id={`status-${application.id}`}
                      value={application.status}
                      disabled={updating}
                      onChange={(event) =>
                        updateStatus(
                          application.id,
                          event.target
                            .value as ApplicationStatus,
                        )
                      }
                      className="rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {statuses.map((status) => (
                        <option
                          key={status}
                          value={status}
                        >
                          {status}
                        </option>
                      ))}
                    </select>

                    {updating && (
                      <span className="text-xs text-muted-foreground">
                        Saving...
                      </span>
                    )}
                  </div>
                </div>

                {/* Footer */}
                <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t pt-5">
                  <p className="text-sm text-muted-foreground">
                    Applied{" "}
                    {new Date(
                      application.appliedAt,
                    ).toLocaleDateString()}
                  </p>

                  {application.url && (
                    <a
                      href={application.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-semibold hover:bg-muted"
                    >
                      View Job
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </>
  );
}

/* =========================
   STAT CARD
========================= */

function StatCard({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: number;
  icon: ElementType;
}) {
  return (
    <div className="rounded-2xl border bg-card p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {label}
        </p>

        <Icon className="h-5 w-5 text-primary" />
      </div>

      <p className="mt-2 text-3xl font-bold">
        {value}
      </p>
    </div>
  );
}

/* =========================
   METRIC CARD
========================= */

function MetricCard({
  label,
  value,
}: {
  label: string;
  value: number | string;
}) {
  return (
    <div className="rounded-2xl border bg-card p-5">
      <p className="text-sm text-muted-foreground">
        {label}
      </p>

      <p className="mt-2 text-2xl font-bold">
        {value}
      </p>
    </div>
  );
}