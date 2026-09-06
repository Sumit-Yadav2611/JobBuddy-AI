"use client";

import Link from "next/link";
import {
  CheckCircle2,
  CircleAlert,
  ArrowRight,
  Sparkles,
} from "lucide-react";

interface ProfileItem {
  name: string;
  complete: boolean;
  href?: string;
}

interface ProfileCompletenessProps {
  completionPercentage?: number;
  completedSections?: number;
  totalSections?: number;
  profileItems?: ProfileItem[];
}

const defaultProfileItems: ProfileItem[] = [
  {
    name: "Basic Information",
    complete: true,
    href: "/dashboard/profile/personal",
  },
  {
    name: "Summary",
    complete: true,
    href: "/dashboard/profile/summary",
  },
  {
    name: "Work Experience",
    complete: true,
    href: "/dashboard/profile/experience",
  },
  {
    name: "Education",
    complete: true,
    href: "/dashboard/profile/education",
  },
  {
    name: "Skills",
    complete: true,
    href: "/dashboard/profile/skills",
  },
  {
    name: "Projects",
    complete: true,
    href: "/dashboard/profile/projects",
  },
];

export default function ProfileCompleteness({
  completionPercentage,
  completedSections,
  totalSections,
  profileItems = defaultProfileItems,
}: ProfileCompletenessProps) {
  /*
   * The dashboard can now pass the real profile completion values.
   *
   * The fallback values keep this component safe if it is rendered
   * without props somewhere else.
   */
  const completed =
    completedSections ??
    profileItems.filter((item) => item.complete).length;

  const total = totalSections ?? profileItems.length;

  const percentage =
    completionPercentage ??
    Math.round((completed / Math.max(total, 1)) * 100);

  const progressDegrees = Math.min(Math.max(percentage, 0), 100) * 3.6;

  const isComplete = percentage >= 100;
  const isStrong = percentage >= 80;

  return (
    <div
      className="
        group relative h-full min-h-[720px] overflow-hidden rounded-3xl
        border border-white/[0.08]
        bg-gradient-to-br from-[#09111d] via-[#070c17] to-[#100b20]
        p-7
        shadow-2xl shadow-black/25
        backdrop-blur-xl
        transition-all duration-500
        hover:border-cyan-400/20
        hover:shadow-[0_20px_70px_rgba(34,211,238,0.07)]
      "
    >
      {/* =========================================================
          BACKGROUND LIGHTING
      ========================================================= */}

      {/* Cyan glow */}
      <div
        className="
          pointer-events-none absolute -right-28 -top-28
          h-80 w-80 rounded-full
          bg-cyan-400/[0.10]
          blur-[110px]
          transition-transform duration-700
          group-hover:scale-125
        "
      />

      {/* Blue glow */}
      <div
        className="
          pointer-events-none absolute right-1/3 top-1/4
          h-56 w-56 rounded-full
          bg-blue-500/[0.045]
          blur-[100px]
        "
      />

      {/* Violet glow */}
      <div
        className="
          pointer-events-none absolute -bottom-28 -left-24
          h-80 w-80 rounded-full
          bg-violet-500/[0.10]
          blur-[110px]
          transition-transform duration-700
          group-hover:scale-125
        "
      />

      {/* Subtle gradient wash */}
      <div
        className="
          pointer-events-none absolute inset-0
          bg-gradient-to-br
          from-cyan-400/[0.015]
          via-transparent
          to-violet-500/[0.025]
        "
      />

      {/* Decorative grid */}
      <div
        className="
          pointer-events-none absolute inset-0 opacity-[0.025]
          [background-image:linear-gradient(rgba(255,255,255,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.8)_1px,transparent_1px)]
          [background-size:32px_32px]
        "
      />

      {/* Content */}
      <div className="relative z-10">
        {/* =========================================================
            HEADER
        ========================================================= */}

        <div className="flex items-start justify-between gap-5">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.9)]" />

              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-300">
                Profile
              </p>
            </div>

            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">
              Profile Completion
            </h2>

            <p className="mt-2 max-w-[300px] text-sm leading-6 text-slate-500">
              Complete your profile to improve job matches and unlock better
              career recommendations.
            </p>
          </div>

          {/* Sparkles */}
          <div
            className="
              relative flex h-12 w-12 shrink-0 items-center justify-center
              rounded-2xl
              border border-cyan-400/20
              bg-gradient-to-br from-cyan-400/[0.12] to-blue-500/[0.05]
              shadow-lg shadow-cyan-500/[0.08]
              transition-all duration-300
              group-hover:border-cyan-400/35
              group-hover:bg-cyan-400/[0.12]
              group-hover:shadow-[0_0_30px_rgba(34,211,238,0.12)]
            "
          >
            <Sparkles
              className="
                h-5 w-5 text-cyan-300
                transition-transform duration-500
                group-hover:rotate-12 group-hover:scale-110
              "
            />

            <span className="pointer-events-none absolute -right-1 -top-1 h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_8px_rgba(34,211,238,0.9)]" />
          </div>
        </div>

        {/* =========================================================
            PROGRESS
        ========================================================= */}

        <div className="mt-10 flex items-center gap-7">
          {/* Progress Ring */}
          <div
            className="
              relative flex h-36 w-36 shrink-0 items-center justify-center
              rounded-full
              transition-transform duration-500
              group-hover:scale-[1.03]
            "
            style={{
              background: `conic-gradient(
                from -90deg,
                #22d3ee 0deg,
                #3b82f6 ${Math.min(progressDegrees * 0.55, progressDegrees)}deg,
                #8b5cf6 ${progressDegrees}deg,
                rgba(255,255,255,0.07) ${progressDegrees}deg,
                rgba(255,255,255,0.07) 360deg
              )`,
            }}
          >
            {/* Outer glow */}
            <div
              className="
                pointer-events-none absolute -inset-2
                rounded-full opacity-20 blur-xl
              "
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

            {/* Inner dark ring */}
            <div
              className="
                absolute inset-[7px]
                rounded-full
                bg-[#080d18]
                shadow-[inset_0_0_25px_rgba(0,0,0,0.45)]
              "
            />

            {/* Inner content */}
            <div className="relative z-10 flex flex-col items-center justify-center">
              <span className="text-[2.15rem] font-bold tracking-tight text-white">
                {percentage}%
              </span>

              <span className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                Complete
              </span>
            </div>
          </div>

          {/* Progress Text */}
          <div className="min-w-0">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.07] bg-white/[0.025] px-3 py-1.5">
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  isComplete
                    ? "bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]"
                    : "bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]"
                }`}
              />

              <span
                className={`text-[10px] font-semibold uppercase tracking-[0.16em] ${
                  isComplete ? "text-emerald-300" : "text-cyan-300"
                }`}
              >
                {isComplete ? "Fully optimized" : "In progress"}
              </span>
            </div>

            <p className="mt-4 text-lg font-semibold text-white">
              {isComplete
                ? "Profile complete! 🎉"
                : isStrong
                  ? "Great progress!"
                  : "Almost there!"}
            </p>

            <p className="mt-2 max-w-[190px] text-sm leading-5 text-slate-500">
              {isComplete
                ? "Your profile is ready for stronger job matches."
                : isStrong
                  ? "Your profile is looking strong."
                  : "Complete a few more sections to improve your matches."}
            </p>

            <div className="mt-4 flex items-baseline gap-1.5">
              <span className="text-sm font-bold text-cyan-300">
                {completed}
              </span>

              <span className="text-xs text-slate-600">
                of {total} completed
              </span>
            </div>
          </div>
        </div>

        {/* =========================================================
            DIVIDER
        ========================================================= */}

        <div className="my-8 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

        {/* =========================================================
            CHECKLIST
        ========================================================= */}

        <div>
          <div className="mb-3 flex items-center justify-between px-2.5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-600">
              Profile checklist
            </p>

            <span className="text-[10px] font-medium text-slate-600">
              {completed}/{total}
            </span>
          </div>

          <div className="space-y-1">
            {profileItems.map((item) => (
              <div
                key={item.name}
                className="
                  group/item flex min-h-[50px] items-center
                  justify-between rounded-2xl
                  border border-transparent
                  px-3 py-2.5
                  transition-all duration-300
                  hover:border-white/[0.05]
                  hover:bg-white/[0.025]
                "
              >
                <div className="flex min-w-0 items-center gap-3">
                  {/* Status icon */}
                  {item.complete ? (
                    <div
                      className="
                        flex h-7 w-7 shrink-0 items-center justify-center
                        rounded-full
                        border border-cyan-400/25
                        bg-cyan-400/[0.08]
                        shadow-[0_0_16px_rgba(34,211,238,0.04)]
                        transition-all duration-300
                        group-hover/item:border-cyan-400/40
                        group-hover/item:bg-cyan-400/[0.12]
                        group-hover/item:shadow-[0_0_18px_rgba(34,211,238,0.10)]
                      "
                    >
                      <CheckCircle2 className="h-4 w-4 text-cyan-300" />
                    </div>
                  ) : (
                    <div
                      className="
                        flex h-7 w-7 shrink-0 items-center justify-center
                        rounded-full
                        border border-slate-600/60
                        bg-slate-900/70
                        transition-all duration-300
                        group-hover/item:border-violet-400/30
                        group-hover/item:bg-violet-500/[0.05]
                      "
                    >
                      <CircleAlert className="h-4 w-4 text-slate-500 transition-colors group-hover/item:text-violet-400" />
                    </div>
                  )}

                  <span
                    className={`truncate text-sm font-medium transition-colors duration-200 ${
                      item.complete
                        ? "text-slate-200 group-hover/item:text-white"
                        : "text-slate-500 group-hover/item:text-slate-300"
                    }`}
                  >
                    {item.name}
                  </span>
                </div>

                {/* Update */}
                {!item.complete && item.href ? (
                  <Link
                    href={item.href}
                    className="
                      ml-3 shrink-0 rounded-lg
                      px-2.5 py-1.5
                      text-[11px] font-semibold
                      text-violet-400
                      transition-all duration-200
                      hover:bg-violet-400/[0.08]
                      hover:text-violet-300
                    "
                  >
                    Update
                  </Link>
                ) : (
                  <span className="text-[10px] font-medium text-emerald-400/50">
                    Done
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* =========================================================
            CTA
        ========================================================= */}

        <Link
          href="/dashboard/profile"
          className="
            group/button relative mt-7 flex w-full
            items-center justify-center gap-2
            overflow-hidden rounded-2xl
            border border-cyan-400/20
            bg-gradient-to-r
            from-cyan-400/[0.08]
            via-blue-500/[0.06]
            to-violet-500/[0.09]
            px-4 py-3.5
            text-sm font-semibold text-white
            shadow-lg shadow-cyan-500/[0.03]
            transition-all duration-300
            hover:-translate-y-0.5
            hover:border-cyan-400/40
            hover:from-cyan-400/[0.14]
            hover:via-blue-500/[0.10]
            hover:to-violet-500/[0.15]
            hover:shadow-[0_10px_35px_rgba(34,211,238,0.08)]
          "
        >
          {/* Button shine */}
          <span
            className="
              pointer-events-none absolute inset-y-0 -left-24
              w-20 rotate-12
              bg-gradient-to-r from-transparent via-white/[0.08] to-transparent
              transition-all duration-700
              group-hover/button:left-[110%]
            "
          />

          <span className="relative z-10">
            {isComplete ? "View Profile" : "Improve Profile"}
          </span>

          <ArrowRight
            className="
              relative z-10 h-4 w-4 text-cyan-300
              transition-transform duration-300
              group-hover/button:translate-x-1
            "
          />
        </Link>
      </div>
    </div>
  );
}