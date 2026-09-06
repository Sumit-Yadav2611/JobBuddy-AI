"use client";

import {
  Bookmark,
  BriefcaseBusiness,
  CheckCircle2,
  ExternalLink,
  Loader2,
  MapPin,
  Sparkles,
} from "lucide-react";

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

type JobCardProps = {
  job: Job;
  index: number;
  isSaved: boolean;
  isApplied: boolean;
  isSaving: boolean;
  isApplying: boolean;
  onToggleSave: (jobId: string) => void;
  onApply: (job: Job) => void;
};

function getMatchStyle(score: number) {
  if (score >= 85) {
    return {
      label: "Strong match",
      text: "text-cyan-300",
      border: "border-cyan-400/20",
      background: "bg-cyan-400/[0.06]",
      gradient: "from-cyan-400 via-blue-500 to-violet-500",
    };
  }

  if (score >= 70) {
    return {
      label: "Good match",
      text: "text-emerald-300",
      border: "border-emerald-400/20",
      background: "bg-emerald-400/[0.06]",
      gradient: "from-emerald-400 to-cyan-400",
    };
  }

  if (score >= 50) {
    return {
      label: "Potential match",
      text: "text-amber-300",
      border: "border-amber-400/20",
      background: "bg-amber-400/[0.06]",
      gradient: "from-amber-400 to-orange-500",
    };
  }

  return {
    label: "Basic match",
    text: "text-slate-400",
    border: "border-white/[0.08]",
    background: "bg-white/[0.03]",
    gradient: "from-slate-500 to-slate-400",
  };
}

function cleanDescription(description?: string | null) {
  if (!description) {
    return "";
  }

  return description
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export default function JobCard({
  job,
  index,
  isSaved,
  isApplied,
  isSaving,
  isApplying,
  onToggleSave,
  onApply,
}: JobCardProps) {
  const score = Math.max(
    0,
    Math.min(100, Number(job.matchScore ?? 0)),
  );

  const matchStyle = getMatchStyle(score);

  const description = cleanDescription(job.description);

  return (
    <article className="group relative overflow-hidden rounded-3xl border border-white/[0.07] bg-[#090e18]/90 shadow-xl shadow-black/10 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/20 hover:bg-[#0b111d] hover:shadow-2xl hover:shadow-cyan-950/20">
      {/* Ambient card glow */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-cyan-500/[0.035] blur-3xl transition-all duration-500 group-hover:bg-cyan-500/[0.08]" />

      <div className="pointer-events-none absolute -bottom-24 -left-24 h-56 w-56 rounded-full bg-violet-500/[0.025] blur-3xl transition-all duration-500 group-hover:bg-violet-500/[0.06]" />

      {/* Top hover line */}
      <div className="pointer-events-none absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative p-5 sm:p-6">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(300px,0.75fr)] lg:items-center">
          {/* LEFT */}
          <div className="min-w-0">
            <div className="flex items-start gap-4">
              {/* Company icon */}
              <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.07] to-white/[0.025] shadow-lg transition-all duration-300 group-hover:border-cyan-400/20 group-hover:shadow-cyan-500/[0.08]">
                <BriefcaseBusiness className="h-7 w-7 text-slate-500 transition-colors duration-300 group-hover:text-cyan-300" />

                <span className="absolute -right-1.5 -top-1.5 h-2.5 w-2.5 rounded-full border-2 border-[#090e18] bg-emerald-400 shadow-lg shadow-emerald-400/40" />
              </div>

              <div className="min-w-0 flex-1">
                {/* BADGES */}
                <div className="flex flex-wrap items-center gap-2">
                  {index === 0 && (
                    <span className="inline-flex items-center gap-1.5 rounded-lg border border-violet-400/20 bg-violet-400/[0.07] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-violet-300">
                      <Sparkles className="h-3 w-3" />
                      Top Match
                    </span>
                  )}

                  <span className="rounded-lg border border-white/[0.08] bg-white/[0.035] px-2.5 py-1 text-[11px] font-medium text-slate-400">
                    {job.platform}
                  </span>
                </div>

                {/* TITLE */}
                <h3 className="mt-3 text-xl font-bold tracking-tight text-white transition-colors duration-200 group-hover:text-cyan-200 sm:text-2xl">
                  {job.title}
                </h3>

                {/* COMPANY */}
                <p className="mt-1 text-sm font-medium text-slate-400">
                  {job.company}
                </p>

                {/* META */}
                <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-slate-500">
                  {job.location && (
                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-slate-600" />
                      {job.location}
                    </span>
                  )}

                  {job.location && job.jobType && (
                    <span className="h-1 w-1 rounded-full bg-slate-700" />
                  )}

                  {job.jobType && <span>{job.jobType}</span>}
                </div>
              </div>
            </div>

            {/* DESCRIPTION */}
            {description && (
              <p className="mt-5 line-clamp-2 text-sm leading-6 text-slate-500">
                {description}
              </p>
            )}

            {/* SKILLS */}
            {job.matchedSkills &&
              job.matchedSkills.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {job.matchedSkills
                    .slice(0, 4)
                    .map((skill) => (
                      <span
                        key={skill}
                        className="rounded-lg border border-cyan-400/10 bg-cyan-400/[0.04] px-2.5 py-1 text-[11px] font-medium text-cyan-300/80"
                      >
                        {skill}
                      </span>
                    ))}
                </div>
              )}
          </div>

          {/* RIGHT — MATCH + ACTIONS */}
          <div className="lg:border-l lg:border-white/[0.06] lg:pl-6">
            {/* MATCH HEADER */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold tracking-tight text-white">
                    {score}%
                  </span>

                  <span className="text-xs text-slate-500">
                    match
                  </span>
                </div>

                <p
                  className={`mt-1 text-xs font-semibold ${matchStyle.text}`}
                >
                  {matchStyle.label}
                </p>
              </div>

              <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-600">
                Profile Fit
              </span>
            </div>

            {/* MATCH BAR */}
            <div className="mt-4">
              <div className="h-2 overflow-hidden rounded-full bg-white/[0.06]">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${matchStyle.gradient} shadow-lg transition-all duration-700`}
                  style={{
                    width: `${score}%`,
                  }}
                />
              </div>
            </div>

            {/* SKILL SUMMARY */}
            <div
              className={`mt-4 rounded-2xl border ${matchStyle.border} ${matchStyle.background} p-4`}
            >
              <div className="flex items-center gap-2">
                <Sparkles
                  className={`h-3.5 w-3.5 ${matchStyle.text}`}
                />

                <span className="text-xs font-semibold text-slate-300">
                  AI Job Match
                </span>
              </div>

              {job.matchedSkills &&
              job.matchedSkills.length > 0 ? (
                <p className="mt-2 text-xs leading-5 text-slate-500">
                  {job.matchedSkills.length} skills from your
                  profile match this opportunity.
                </p>
              ) : (
                <p className="mt-2 text-xs leading-5 text-slate-500">
                  Your profile has been evaluated against this
                  opportunity.
                </p>
              )}
            </div>

            {/* SALARY */}
            {job.salary && (
              <p className="mt-4 text-xs font-medium text-slate-500">
                <span className="text-slate-300">
                  {job.salary}
                </span>
              </p>
            )}

            {/* ACTIONS */}
            <div className="mt-5 flex items-center gap-2.5">
              {/* SAVE */}
              <button
                type="button"
                onClick={() => onToggleSave(job.id)}
                disabled={isSaving}
                aria-label={
                  isSaved ? "Remove saved job" : "Save job"
                }
                title={isSaved ? "Saved" : "Save job"}
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 ${
                  isSaved
                    ? "border-emerald-400/25 bg-emerald-400/[0.08] text-emerald-300 hover:bg-emerald-400/[0.13]"
                    : "border-white/[0.08] bg-white/[0.025] text-slate-500 hover:border-cyan-400/25 hover:bg-cyan-400/[0.06] hover:text-cyan-300"
                }`}
              >
                {isSaving ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Bookmark
                    className={`h-4 w-4 ${
                      isSaved ? "fill-current" : ""
                    }`}
                  />
                )}
              </button>

              {/* APPLY */}
              <button
                type="button"
                onClick={() => onApply(job)}
                disabled={isApplying || !job.url}
                className={`flex h-11 flex-1 items-center justify-center gap-2 rounded-xl px-4 text-sm font-bold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 ${
                  isApplied
                    ? "border border-emerald-400/20 bg-emerald-400/[0.08] text-emerald-300 hover:bg-emerald-400/[0.12]"
                    : "bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 text-white shadow-lg shadow-cyan-500/10 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-cyan-500/20"
                }`}
              >
                {isApplying ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Applying...
                  </>
                ) : isApplied ? (
                  <>
                    <CheckCircle2 className="h-4 w-4" />
                    Applied
                    <ExternalLink className="h-3.5 w-3.5" />
                  </>
                ) : (
                  <>
                    Apply
                    <ExternalLink className="h-3.5 w-3.5" />
                  </>
                )}
              </button>
            </div>

            {/* URL WARNING */}
            {!job.url && (
              <p className="mt-2 text-[11px] text-amber-400/70">
                Application link unavailable for this job.
              </p>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}