"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  BriefcaseBusiness,
  ExternalLink,
  Clock,
  CheckCircle2,
  XCircle,
  Trophy,
} from "lucide-react";
import { UserButton } from "@clerk/nextjs";

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

const statuses = ["Applied", "Interview", "Offer", "Rejected"];

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  async function fetchApplications() {
    try {
      setLoading(true);

      const response = await fetch("/api/applications", {
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to fetch applications");
      }

      setApplications(data.applications || []);
    } catch (error) {
      console.error("Failed to fetch applications:", error);
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus(applicationId: string, status: string) {
    try {
      setUpdatingId(applicationId);

      const response = await fetch(`/api/applications/${applicationId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to update status");
      }

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
    } catch (error) {
      console.error("Failed to update application status:", error);

      alert(error instanceof Error ? error.message : "Failed to update status");
    } finally {
      setUpdatingId(null);
    }
  }

  useEffect(() => {
    fetchApplications();
  }, []);

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

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}

      <header className="flex h-16 items-center justify-between border-b px-6">
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard"
            className="rounded-lg p-2 transition-colors hover:bg-muted"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>

          <div>
            <p className="text-sm text-muted-foreground">Dashboard</p>

            <h1 className="text-lg font-semibold">Application Status</h1>
          </div>
        </div>

        <UserButton />
      </header>

      {/* Main */}

      <main className="mx-auto max-w-6xl p-6 lg:p-10">
        {/* Heading */}

        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border bg-muted">
              <BriefcaseBusiness className="h-5 w-5" />
            </div>

            <div>
              <h2 className="text-3xl font-bold tracking-tight">
                Application Status
              </h2>

              <p className="mt-1 text-muted-foreground">
                Track and manage your job applications.
              </p>
            </div>
          </div>
        </div>

        {/* Statistics */}

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Applied" value={appliedCount} icon={Clock} />

          <StatCard
            label="Interviews"
            value={interviewCount}
            icon={CheckCircle2}
          />

          <StatCard label="Offers" value={offerCount} icon={Trophy} />

          <StatCard label="Rejected" value={rejectedCount} icon={XCircle} />
        </div>

        {/* Loading */}

        {loading && (
          <div className="mt-8 rounded-2xl border bg-card p-10 text-center">
            <p className="text-sm text-muted-foreground">
              Loading applications...
            </p>
          </div>
        )}

        {/* Empty */}

        {!loading && applications.length === 0 && (
          <div className="mt-8 rounded-2xl border bg-card p-10 text-center">
            <BriefcaseBusiness className="mx-auto h-10 w-10 text-muted-foreground" />

            <h3 className="mt-4 text-lg font-semibold">No applications yet</h3>

            <p className="mt-2 text-sm text-muted-foreground">
              Apply to jobs and your applications will appear here.
            </p>

            <Link
              href="/dashboard"
              className="mt-6 inline-flex rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90"
            >
              Find Jobs
            </Link>
          </div>
        )}

        {/* Applications */}

        {!loading && applications.length > 0 && (
          <div className="mt-8 space-y-4">
            {applications.map((application) => {
              const updating = updatingId === application.id;

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
                            <span>📍 {application.location}</span>
                          )}

                          {application.jobType && (
                            <span>{application.jobType}</span>
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
                          updateStatus(application.id, event.target.value)
                        }
                        className="rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary disabled:opacity-60"
                      >
                        {statuses.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Footer */}

                  <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t pt-5">
                    <p className="text-sm text-muted-foreground">
                      Applied{" "}
                      {new Date(application.appliedAt).toLocaleDateString()}
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
      </main>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: number;
  icon: React.ElementType;
}) {
  return (
    <div className="rounded-2xl border bg-card p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{label}</p>

        <Icon className="h-5 w-5 text-primary" />
      </div>

      <p className="mt-2 text-3xl font-bold">{value}</p>
    </div>
  );
}
