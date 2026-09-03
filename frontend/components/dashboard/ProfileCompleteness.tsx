"use client";

import Link from "next/link";
import {
  CheckCircle2,
  CircleAlert,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const profileItems = [
  {
    name: "Basic Information",
    complete: true,
  },
  {
    name: "Summary",
    complete: true,
  },
  {
    name: "Work Experience",
    complete: true,
  },
  {
    name: "Education",
    complete: false,
    href: "/dashboard/profile/education",
  },
  {
    name: "Skills",
    complete: true,
  },
  {
    name: "Resume",
    complete: false,
    href: "/dashboard/resume",
  },
];

export default function ProfileCompleteness() {
  const completed = profileItems.filter((item) => item.complete).length;

  const percentage = Math.round(
    (completed / profileItems.length) * 100,
  );

  const progressDegrees = percentage * 3.6;

  return (
    <div className="group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-[#080d18]/95 p-6 shadow-2xl shadow-black/20 backdrop-blur-xl">
      {/* =========================================================
          BACKGROUND LIGHTING
      ========================================================= */}

      {/* Cyan glow */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-cyan-400/[0.09] blur-[100px]" />

      {/* Violet glow */}
      <div className="pointer-events-none absolute -bottom-28 -left-24 h-72 w-72 rounded-full bg-violet-500/[0.09] blur-[100px]" />

      {/* Soft blue gradient */}
      <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 bg-gradient-to-bl from-cyan-400/[0.045] via-blue-500/[0.02] to-transparent" />

      {/* Subtle lower gradient */}
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-48 w-72 bg-gradient-to-t from-violet-500/[0.025] to-transparent blur-2xl" />

      {/* Content */}
      <div className="relative z-10">
        {/* =========================================================
            HEADER
        ========================================================= */}

        <div className="flex items-start justify-between">
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-300">
              Profile
            </p>

            <h2 className="mt-1.5 text-xl font-semibold tracking-tight text-white">
              Profile Completion
            </h2>

            <p className="mt-2 max-w-[270px] text-sm leading-5 text-slate-500">
              Complete your profile to improve job matches.
            </p>
          </div>

          {/* Sparkles */}
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/[0.07] shadow-lg shadow-cyan-500/[0.05]">
            <Sparkles className="h-5 w-5 text-cyan-300" />
          </div>
        </div>

        {/* =========================================================
            PROGRESS
        ========================================================= */}

        <div className="mt-8 flex items-center gap-6">
          {/* Progress Ring */}
          <div
            className="relative flex h-32 w-32 shrink-0 items-center justify-center rounded-full"
            style={{
              background: `conic-gradient(
                from -90deg,
                #22d3ee 0deg,
                #8b5cf6 ${progressDegrees}deg,
                rgba(255,255,255,0.07) ${progressDegrees}deg,
                rgba(255,255,255,0.07) 360deg
              )`,
            }}
          >
            {/* Outer glow */}
            <div
              className="pointer-events-none absolute inset-[-3px] rounded-full opacity-20 blur-md"
              style={{
                background: `conic-gradient(
                  from -90deg,
                  #22d3ee 0deg,
                  #8b5cf6 ${progressDegrees}deg,
                  transparent ${progressDegrees}deg,
                  transparent 360deg
                )`,
              }}
            />

            {/* Inner circle */}
            <div className="absolute inset-[7px] flex flex-col items-center justify-center rounded-full border border-white/[0.06] bg-[#080d18]">
              <span className="text-3xl font-bold tracking-tight text-white">
                {percentage}%
              </span>

              <span className="mt-1 text-[10px] font-medium uppercase tracking-[0.16em] text-slate-500">
                Complete
              </span>
            </div>
          </div>

          {/* Progress Text */}
          <div className="min-w-0">
            <p className="text-base font-semibold text-white">
              {percentage >= 80 ? "Great job! 🎉" : "Almost there!"}
            </p>

            <p className="mt-2 text-sm leading-5 text-slate-500">
              {percentage >= 80
                ? "Your profile looks strong."
                : "Complete a few more sections."}
            </p>

            <div className="mt-4 flex items-baseline gap-1.5">
              <span className="text-sm font-semibold text-cyan-300">
                {completed}
              </span>

              <span className="text-xs text-slate-600">
                of {profileItems.length} completed
              </span>
            </div>
          </div>
        </div>

        {/* =========================================================
            DIVIDER
        ========================================================= */}

        <div className="my-7 h-px bg-white/[0.07]" />

        {/* =========================================================
            CHECKLIST
        ========================================================= */}

        <div>
          <div className="space-y-1">
            {profileItems.map((item) => (
              <div
                key={item.name}
                className="flex min-h-[48px] items-center justify-between rounded-xl px-2.5 py-2.5 transition-all duration-200 hover:bg-white/[0.025]"
              >
                <div className="flex min-w-0 items-center gap-3">
                  {/* Completed */}
                  {item.complete ? (
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-cyan-400/25 bg-cyan-400/[0.08] shadow-sm shadow-cyan-500/[0.05]">
                      <CheckCircle2 className="h-4 w-4 text-cyan-300" />
                    </div>
                  ) : (
                    /* Incomplete */
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-slate-600/60 bg-slate-900/60">
                      <CircleAlert className="h-4 w-4 text-slate-500" />
                    </div>
                  )}

                  <span
                    className={`truncate text-sm font-medium ${
                      item.complete
                        ? "text-slate-200"
                        : "text-slate-500"
                    }`}
                  >
                    {item.name}
                  </span>
                </div>

                {/* Update */}
                {!item.complete && item.href ? (
                  <Link
                    href={item.href}
                    className="ml-3 shrink-0 text-xs font-semibold text-violet-400 transition-colors hover:text-violet-300"
                  >
                    Update
                  </Link>
                ) : null}
              </div>
            ))}
          </div>
        </div>

        {/* =========================================================
            CTA
        ========================================================= */}

        <Link
          href="/dashboard/profile"
          className="group/button mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-cyan-400/20 bg-gradient-to-r from-cyan-400/[0.08] via-blue-500/[0.06] to-violet-500/[0.08] px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/[0.03] transition-all duration-200 hover:border-cyan-400/40 hover:from-cyan-400/[0.14] hover:via-blue-500/[0.1] hover:to-violet-500/[0.14]"
        >
          Improve Profile

          <ArrowRight className="h-4 w-4 text-cyan-300 transition-transform duration-200 group-hover/button:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}