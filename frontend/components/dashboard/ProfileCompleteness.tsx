"use client";

import Link from "next/link";
import { CheckCircle2, CircleAlert, ArrowRight } from "lucide-react";

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
  },
  {
    name: "Skills",
    complete: true,
  },
  {
    name: "Resume",
    complete: false,
  },
];

export default function ProfileCompleteness() {
  const completed = profileItems.filter((item) => item.complete).length;

  const percentage = Math.round((completed / profileItems.length) * 100);

  return (
    <div className="rounded-2xl border bg-card p-5">
      {/* Header */}
      <div>
        <h2 className="font-semibold">Profile Completeness</h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Complete your profile to improve job matches.
        </p>
      </div>

      {/* Percentage */}
      <div className="mt-6 flex items-center gap-5">
        <div className="relative flex h-24 w-24 shrink-0 items-center justify-center rounded-full border-[7px] border-primary/20">
          <div
            className="absolute inset-[-7px] rounded-full border-[7px] border-primary"
            style={{
              clipPath: `inset(${100 - percentage}% 0 0 0)`,
            }}
          />

          <div className="text-center">
            <p className="text-2xl font-bold">{percentage}%</p>

            <p className="text-[10px] text-muted-foreground">Complete</p>
          </div>
        </div>

        <div>
          <p className="font-semibold">
            {percentage >= 80 ? "Great job! 🎉" : "Almost there!"}
          </p>

          <p className="mt-1 text-sm text-muted-foreground">
            {percentage >= 80
              ? "Your profile looks strong."
              : "Complete a few more sections."}
          </p>
        </div>
      </div>

      {/* Checklist */}
      <div className="mt-6 space-y-3">
        {profileItems.map((item) => (
          <div
            key={item.name}
            className="flex items-center justify-between text-sm"
          >
            <div className="flex items-center gap-2">
              {item.complete ? (
                <CheckCircle2 className="h-4 w-4 text-primary" />
              ) : (
                <CircleAlert className="h-4 w-4 text-muted-foreground" />
              )}

              <span
                className={
                  item.complete ? "text-foreground" : "text-muted-foreground"
                }
              >
                {item.name}
              </span>
            </div>

            {!item.complete && (
              <span className="text-xs text-muted-foreground">Update</span>
            )}
          </div>
        ))}
      </div>

      {/* Button */}
      <Link
        href="/dashboard/profile"
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
      >
        Improve Profile
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
