"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BriefcaseBusiness,
  ExternalLink,
  Clock3,
  CheckCircle2,
  XCircle,
  Trophy,
  MapPin,
  Sparkles,
  ArrowUpRight,
  BarChart3,
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

const statuses = ["Applied", "Interview", "Offer", "Rejected"] as const;

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
      {/* =========================================================
          Pipeline overview
      ========================================================== */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Applied"
          value={appliedCount}
          icon={Clock3}
          accent="cyan"
        />

        <StatCard
          label="Interviews"
          value={interviewCount}
          icon={CheckCircle2}
          accent="blue"
        />

        <StatCard
          label="Offers"
          value={offerCount}
          icon={Trophy}
          accent="violet"
        />

        <StatCard
          label="Rejected"
          value={rejectedCount}
          icon={XCircle}
          accent="rose"
        />
      </div>

      {/* =========================================================
          Performance metrics
      ========================================================== */}
      <div className="mt-3 grid gap-3 sm:grid-cols-3">
        <MetricCard
          label="Total Applications"
          value={totalApplications}
          description="All tracked opportunities"
          icon={BriefcaseBusiness}
          accent="cyan"
        />

        <MetricCard
          label="Interview Rate"
          value={`${interviewRate}%`}
          description="Applications reaching interview"
          icon={BarChart3}
          accent="blue"
        />

        <MetricCard
          label="Offer Rate"
          value={`${offerRate}%`}
          description="Applications resulting in offers"
          icon={Sparkles}
          accent="violet"
        />
      </div>

      {/* =========================================================
          Empty state
      ========================================================== */}
      {applications.length === 0 && (
        <div className="relative mt-6 overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-[#0a101d] via-[#080d18] to-[#100b20] p-10 shadow-2xl shadow-black/20">
          <div className="pointer-events-none absolute -right-28 -top-28 h-72 w-72 rounded-full bg-cyan-400/[0.06] blur-[110px]" />

          <div className="pointer-events-none absolute -bottom-28 -left-28 h-72 w-72 rounded-full bg-violet-500/[0.05] blur-[110px]" />

          <div className="pointer-events-none absolute right-10 top-10 hidden h-48 w-48 rounded-full border border-cyan-400/[0.05] lg:block" />

          <div className="relative z-10 mx-auto max-w-lg text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-400/15 bg-cyan-400/[0.06] shadow-xl shadow-cyan-500/[0.04]">
              <BriefcaseBusiness className="h-7 w-7 text-cyan-300" />
            </div>

            <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-300">
              Your pipeline is empty
            </p>

            <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white">
              No applications yet
            </h3>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500">
              Start applying to opportunities and your complete
              application journey will appear here.
            </p>

            <Link
              href="/dashboard/jobs"
              className="group mt-7 inline-flex items-center gap-2 rounded-xl border border-cyan-400/20 bg-gradient-to-r from-cyan-400/[0.08] via-blue-500/[0.06] to-violet-500/[0.08] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/[0.03] transition-all duration-200 hover:border-cyan-400/40 hover:from-cyan-400/[0.14] hover:via-blue-500/[0.1] hover:to-violet-500/[0.14]"
            >
              Find Jobs
              <ArrowUpRight className="h-4 w-4 text-cyan-300 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>
      )}

      {/* =========================================================
          Application pipeline
      ========================================================== */}
      {applications.length > 0 && (
        <div className="mt-6 space-y-4">
          {applications.map((application, index) => {
            const updating = updatingId === application.id;
            const statusConfig = getStatusConfig(
              application.status,
            );

            return (
              <article
                key={application.id}
                className="group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-[#0a101d] via-[#080d18] to-[#0b0a16] p-5 shadow-2xl shadow-black/20 transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-400/15 sm:p-6 lg:p-7"
              >
                {/* Status glow */}
                <div
                  className={`pointer-events-none absolute -right-28 -top-28 h-64 w-64 rounded-full blur-[100px] transition-opacity duration-300 ${statusConfig.glow}`}
                />

                {/* Secondary glow */}
                <div className="pointer-events-none absolute -bottom-32 left-1/3 h-56 w-56 rounded-full bg-violet-500/[0.02] blur-[100px]" />

                {/* Application number */}
                <div className="pointer-events-none absolute right-6 top-5 hidden text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-800 sm:block">
                  #{String(index + 1).padStart(2, "0")}
                </div>

                <div className="relative z-10">
                  {/* =================================================
                      Application header
                  ================================================== */}
                  <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                    <div className="flex min-w-0 items-start gap-4">
                      {/* Company icon */}
                      <div
                        className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border ${statusConfig.iconBorder} ${statusConfig.iconBg} shadow-lg`}
                      >
                        <BriefcaseBusiness
                          className={`h-6 w-6 ${statusConfig.iconColor}`}
                        />
                      </div>

                      <div className="min-w-0">
                        <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-600">
                          Opportunity
                        </p>

                        <h3 className="text-lg font-semibold tracking-tight text-white transition-colors duration-200 group-hover:text-cyan-50 sm:text-xl">
                          {application.title}
                        </h3>

                        <p className="mt-1.5 text-sm font-medium text-slate-400">
                          {application.company}
                        </p>

                        {/* Job metadata */}
                        <div className="mt-3 flex flex-wrap items-center gap-2">
                          {application.location && (
                            <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.06] bg-white/[0.025] px-2.5 py-1.5 text-xs text-slate-400">
                              <MapPin className="h-3.5 w-3.5 text-slate-600" />
                              {application.location}
                            </span>
                          )}

                          {application.jobType && (
                            <span className="rounded-lg border border-white/[0.06] bg-white/[0.025] px-2.5 py-1.5 text-xs text-slate-400">
                              {application.jobType}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* =================================================
                        Status area
                    ================================================== */}
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center lg:shrink-0">
                      <div
                        className={`inline-flex items-center gap-2 rounded-xl border px-3.5 py-2.5 ${statusConfig.badge}`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${statusConfig.dot}`}
                        />

                        <span className="text-[10px] font-semibold uppercase tracking-[0.15em]">
                          {application.status}
                        </span>
                      </div>

                      <div className="relative">
                        <select
                          id={`status-${application.id}`}
                          value={application.status}
                          disabled={updating}
                          onChange={(event) =>
                            updateStatus(
                              application.id,
                              event.target.value as ApplicationStatus,
                            )
                          }
                          className="h-11 min-w-[155px] appearance-none rounded-xl border border-white/[0.08] bg-white/[0.025] px-3 pr-8 text-sm font-medium text-slate-200 outline-none transition-all duration-200 hover:border-cyan-400/20 hover:bg-white/[0.04] focus:border-cyan-400/30 focus:ring-2 focus:ring-cyan-400/10 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {statuses.map((status) => (
                            <option
                              key={status}
                              value={status}
                              className="bg-[#080d18] text-white"
                            >
                              {status}
                            </option>
                          ))}
                        </select>
                      </div>

                      {updating && (
                        <span className="text-[10px] font-medium uppercase tracking-[0.12em] text-cyan-300">
                          Saving...
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="my-6 h-px bg-gradient-to-r from-white/[0.08] via-white/[0.05] to-transparent" />

                  {/* =================================================
                      Footer
                  ================================================== */}
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.02]">
                        <Clock3 className="h-3.5 w-3.5 text-slate-600" />
                      </div>

                      <p className="text-xs text-slate-600">
                        Applied{" "}
                        <span className="font-medium text-slate-400">
                          {new Date(
                            application.appliedAt,
                          ).toLocaleDateString()}
                        </span>
                      </p>
                    </div>

                    {application.url ? (
                      <a
                        href={application.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/view inline-flex items-center justify-center gap-2 rounded-xl border border-cyan-400/20 bg-gradient-to-r from-cyan-400/[0.08] via-blue-500/[0.06] to-violet-500/[0.08] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/[0.03] transition-all duration-200 hover:border-cyan-400/40 hover:from-cyan-400/[0.14] hover:via-blue-500/[0.1] hover:to-violet-500/[0.14]"
                      >
                        View Job

                        <ArrowUpRight className="h-4 w-4 text-cyan-300 transition-transform duration-200 group-hover/view:translate-x-0.5 group-hover/view:-translate-y-0.5" />

                        <ExternalLink className="h-3 w-3 text-slate-600 transition-colors group-hover/view:text-slate-400" />
                      </a>
                    ) : (
                      <span className="text-xs text-slate-700">
                        Job link unavailable
                      </span>
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

/* ===============================================================
   STATUS CONFIGURATION
================================================================ */

function getStatusConfig(status: string) {
  switch (status) {
    case "Interview":
      return {
        badge:
          "border-blue-400/15 bg-blue-400/[0.06] text-blue-300",
        dot: "bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.85)]",
        glow: "bg-blue-400/[0.04]",
        iconBorder: "border-blue-400/15",
        iconBg: "bg-blue-400/[0.06]",
        iconColor: "text-blue-300",
      };

    case "Offer":
      return {
        badge:
          "border-violet-400/15 bg-violet-400/[0.06] text-violet-300",
        dot: "bg-violet-400 shadow-[0_0_8px_rgba(167,139,250,0.85)]",
        glow: "bg-violet-400/[0.045]",
        iconBorder: "border-violet-400/15",
        iconBg: "bg-violet-400/[0.06]",
        iconColor: "text-violet-300",
      };

    case "Rejected":
      return {
        badge:
          "border-rose-400/15 bg-rose-400/[0.06] text-rose-300",
        dot: "bg-rose-400 shadow-[0_0_8px_rgba(251,113,133,0.85)]",
        glow: "bg-rose-400/[0.03]",
        iconBorder: "border-rose-400/15",
        iconBg: "bg-rose-400/[0.05]",
        iconColor: "text-rose-300",
      };

    case "Applied":
    default:
      return {
        badge:
          "border-cyan-400/15 bg-cyan-400/[0.06] text-cyan-300",
        dot: "bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.85)]",
        glow: "bg-cyan-400/[0.04]",
        iconBorder: "border-cyan-400/15",
        iconBg: "bg-cyan-400/[0.06]",
        iconColor: "text-cyan-300",
      };
  }
}

/* ===============================================================
   STAT CARD
================================================================ */

function StatCard({
  label,
  value,
  icon: Icon,
  accent,
}: {
  label: string;
  value: number;
  icon: React.ElementType;
  accent: "cyan" | "blue" | "violet" | "rose";
}) {
  const styles = {
    cyan: {
      border: "hover:border-cyan-400/15",
      iconBorder: "border-cyan-400/15",
      iconBg: "bg-cyan-400/[0.06]",
      iconColor: "text-cyan-300",
      bar: "bg-cyan-400/20",
    },
    blue: {
      border: "hover:border-blue-400/15",
      iconBorder: "border-blue-400/15",
      iconBg: "bg-blue-400/[0.06]",
      iconColor: "text-blue-300",
      bar: "bg-blue-400/20",
    },
    violet: {
      border: "hover:border-violet-400/15",
      iconBorder: "border-violet-400/15",
      iconBg: "bg-violet-400/[0.06]",
      iconColor: "text-violet-300",
      bar: "bg-violet-400/20",
    },
    rose: {
      border: "hover:border-rose-400/15",
      iconBorder: "border-rose-400/15",
      iconBg: "bg-rose-400/[0.06]",
      iconColor: "text-rose-300",
      bar: "bg-rose-400/20",
    },
  }[accent];

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4 transition-all duration-200 hover:bg-white/[0.035] ${styles.border}`}
    >
      <div className="relative z-10 flex items-center gap-3">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${styles.iconBorder} ${styles.iconBg}`}
        >
          <Icon className={`h-4 w-4 ${styles.iconColor}`} />
        </div>

        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-600">
            {label}
          </p>

          <p className="mt-0.5 text-2xl font-bold tracking-tight text-white">
            {value}
          </p>
        </div>
      </div>

      <div className="relative mt-4 h-1 overflow-hidden rounded-full bg-white/[0.04]">
        <div
          className={`h-full rounded-full ${styles.bar} transition-all duration-500`}
          style={{
            width: `${Math.min(value * 12, 100)}%`,
          }}
        />
      </div>
    </div>
  );
}

/* ===============================================================
   METRIC CARD
================================================================ */

function MetricCard({
  label,
  value,
  description,
  icon: Icon,
  accent,
}: {
  label: string;
  value: number | string;
  description: string;
  icon: React.ElementType;
  accent: "cyan" | "blue" | "violet";
}) {
  const styles = {
    cyan: {
      border: "hover:border-cyan-400/15",
      icon: "text-cyan-300",
      iconBg: "bg-cyan-400/[0.06]",
      iconBorder: "border-cyan-400/15",
    },
    blue: {
      border: "hover:border-blue-400/15",
      icon: "text-blue-300",
      iconBg: "bg-blue-400/[0.06]",
      iconBorder: "border-blue-400/15",
    },
    violet: {
      border: "hover:border-violet-400/15",
      icon: "text-violet-300",
      iconBg: "bg-violet-400/[0.06]",
      iconBorder: "border-violet-400/15",
    },
  }[accent];

  return (
    <div
      className={`group rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 transition-all duration-200 hover:bg-white/[0.035] ${styles.border}`}
    >
      <div className="flex items-center gap-2">
        <div
          className={`flex h-7 w-7 items-center justify-center rounded-lg border ${styles.iconBorder} ${styles.iconBg}`}
        >
          <Icon className={`h-3.5 w-3.5 ${styles.icon}`} />
        </div>

        <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-600">
          {label}
        </p>
      </div>

      <p className="mt-4 text-3xl font-bold tracking-tight text-white">
        {value}
      </p>

      <p className="mt-1 text-[10px] leading-5 text-slate-600">
        {description}
      </p>
    </div>
  );
}