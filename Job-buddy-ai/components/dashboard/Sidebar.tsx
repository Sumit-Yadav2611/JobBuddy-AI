"use client";

import Link from "next/link";
import {
  BriefcaseBusiness,
  Bookmark,
  FileText,
  User,
  BarChart3,
  CreditCard,
  Settings,
  LogOut,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { useClerk } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const navigation = [
  {
    name: "Jobs",
    href: "/dashboard/jobs",
    icon: BriefcaseBusiness,
  },
  {
    name: "Saved Jobs",
    href: "/dashboard/saved-jobs",
    icon: Bookmark,
  },
  {
    name: "Resume",
    href: "/dashboard/resume",
    icon: FileText,
  },
  {
    name: "Profile",
    href: "/dashboard/profile",
    icon: User,
  },
  {
    name: "Application Status",
    href: "/dashboard/applications",
    icon: BarChart3,
  },
];

const DAILY_APPLY_LIMIT = 5;

type Application = {
  id: string;
  createdAt: string;
  appliedAt?: string;
  status?: string;
};

export default function Sidebar() {
  const { signOut } = useClerk();
  const pathname = usePathname();

  const [savedJobsCount, setSavedJobsCount] = useState(0);
  const [dailyApplications, setDailyApplications] = useState(0);
  const [applicationsLoading, setApplicationsLoading] = useState(true);

  /*
   * Get saved jobs count
   */
  useEffect(() => {
    async function fetchSavedJobsCount() {
      try {
        const response = await fetch("/api/saved-jobs/count", {
          cache: "no-store",
        });

        const data = await response.json();

        if (response.ok && data.success) {
          setSavedJobsCount(data.count);
        }
      } catch (error) {
        console.error("Failed to fetch saved jobs count:", error);
      }
    }

    fetchSavedJobsCount();
  }, []);

  /*
   * Get today's real application count
   */
  useEffect(() => {
    let cancelled = false;

    async function fetchDailyApplications() {
      try {
        setApplicationsLoading(true);

        const response = await fetch("/api/applications", {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch applications");
        }

        const data = await response.json();

        if (!data.success || !Array.isArray(data.applications)) {
          throw new Error(data.error || "Failed to fetch applications");
        }

        /*
         * Use the user's local calendar day.
         *
         * This is important because "today" should mean today
         * for the person using JobBuddy, not UTC midnight.
         */
        const now = new Date();

        const todayStart = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate(),
        );

        const tomorrowStart = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate() + 1,
        );

        const todayCount = (data.applications as Application[]).filter(
          (application) => {
            const createdAt = new Date(application.createdAt);

            return createdAt >= todayStart && createdAt < tomorrowStart;
          },
        ).length;

        if (!cancelled) {
          setDailyApplications(todayCount);
        }
      } catch (error) {
        console.error(
          "Failed to fetch daily application count:",
          error,
        );

        if (!cancelled) {
          setDailyApplications(0);
        }
      } finally {
        if (!cancelled) {
          setApplicationsLoading(false);
        }
      }
    }

    fetchDailyApplications();

    return () => {
      cancelled = true;
    };
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === "/dashboard/jobs") {
      return (
        pathname === "/dashboard" ||
        pathname === "/dashboard/jobs" ||
        pathname.startsWith("/dashboard/jobs/")
      );
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  /*
   * Daily application progress
   */
  const dailyApplyCount = Math.min(
    dailyApplications,
    DAILY_APPLY_LIMIT,
  );

  const dailyApplyPercentage =
    DAILY_APPLY_LIMIT > 0
      ? Math.min(
          (dailyApplyCount / DAILY_APPLY_LIMIT) * 100,
          100,
        )
      : 0;

  const dailyLimitReached =
    dailyApplications >= DAILY_APPLY_LIMIT;

  const remainingApplications = Math.max(
    DAILY_APPLY_LIMIT - dailyApplications,
    0,
  );

  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-64 overflow-hidden border-r border-red-500/[0.12] bg-[#050303] lg:flex lg:flex-col">
      {/* =========================================================
          Ambient sidebar glow
      ========================================================== */}

      <div className="pointer-events-none absolute -left-32 -top-32 h-72 w-72 rounded-full bg-red-500/[0.08] blur-[100px]" />

      <div className="pointer-events-none absolute -bottom-40 -right-32 h-80 w-80 rounded-full bg-rose-600/[0.07] blur-[110px]" />

      {/* Subtle red grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(239,68,68,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(239,68,68,0.7) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* =========================================================
          Logo
      ========================================================== */}

      <div className="relative flex h-20 shrink-0 items-center border-b border-red-500/[0.10] px-6">
        <Link
          href="/dashboard"
          className="group flex items-center gap-3"
        >
          <div
            className="
              relative
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-xl
              border
              border-red-500/30
              bg-gradient-to-br
              from-red-500/[0.14]
              to-rose-500/[0.10]
              shadow-lg
              shadow-red-500/[0.08]
              transition-all
              duration-300
              group-hover:border-red-400/60
              group-hover:shadow-[0_0_30px_rgba(239,68,68,0.20)]
            "
          >
            <Sparkles
              className="
                h-4
                w-4
                text-red-400
                transition-transform
                duration-300
                group-hover:rotate-12
              "
            />

            <div className="pointer-events-none absolute inset-0 rounded-xl bg-red-500/[0.06] blur-md" />
          </div>

          <div className="leading-none">
            <div className="text-[17px] font-semibold tracking-tight text-white">
              JobBuddy
              <span className="bg-gradient-to-r from-red-400 to-rose-500 bg-clip-text text-transparent">
                {" "}
                AI
              </span>
            </div>

            <p className="mt-1 text-[9px] font-medium uppercase tracking-[0.2em] text-slate-600">
              Career Intelligence
            </p>
          </div>
        </Link>
      </div>

      {/* =========================================================
          Navigation
      ========================================================== */}

      <nav className="relative flex-1 overflow-y-auto px-3 py-6 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {/* Workspace */}
        <div className="mb-3 px-3">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-600">
            Workspace
          </p>
        </div>

        <div className="space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group relative flex items-center gap-3 overflow-hidden rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                  active
                    ? "border border-red-500/[0.25] bg-gradient-to-r from-red-500/[0.12] via-red-500/[0.05] to-rose-500/[0.09] text-white shadow-lg shadow-red-500/[0.04]"
                    : "border border-transparent text-slate-500 hover:border-red-500/[0.10] hover:bg-red-500/[0.035] hover:text-slate-200"
                }`}
              >
                {/* Active indicator */}
                {active && (
                  <div className="absolute left-0 top-1/2 h-6 w-[2px] -translate-y-1/2 rounded-r-full bg-red-400 shadow-[0_0_12px_rgba(248,113,113,0.9)]" />
                )}

                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-all duration-200 ${
                    active
                      ? "border border-red-500/25 bg-red-500/[0.10] shadow-sm shadow-red-500/[0.10]"
                      : "border border-transparent bg-white/[0.02] group-hover:border-red-500/[0.12] group-hover:bg-red-500/[0.04]"
                  }`}
                >
                  <Icon
                    className={`h-[17px] w-[17px] ${
                      active
                        ? "text-red-400"
                        : "text-slate-500 group-hover:text-red-300"
                    }`}
                  />
                </div>

                <span className="min-w-0 flex-1 truncate">
                  {item.name}
                </span>

                {/* Saved Jobs Count */}
                {item.name === "Saved Jobs" &&
                  savedJobsCount > 0 && (
                    <span
                      className={`flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] font-bold ${
                        active
                          ? "border border-red-400/25 bg-red-500/10 text-red-300"
                          : "bg-white/[0.08] text-slate-400"
                      }`}
                    >
                      {savedJobsCount}
                    </span>
                  )}

                {active && (
                  <ChevronRight className="h-3.5 w-3.5 shrink-0 text-red-400/70" />
                )}
              </Link>
            );
          })}
        </div>

        {/* =======================================================
            Account
        ======================================================== */}

        <div className="mb-3 mt-9 px-3">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-600">
            Account
          </p>
        </div>

        <div className="space-y-1">
          {/* Billing */}

          <Link
            href="/dashboard/billing"
            className={`group relative flex items-center gap-3 rounded-xl border px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
              isActive("/dashboard/billing")
                ? "border-red-500/[0.25] bg-gradient-to-r from-red-500/[0.12] to-rose-500/[0.09] text-white"
                : "border-transparent text-slate-500 hover:border-red-500/[0.10] hover:bg-red-500/[0.035] hover:text-slate-200"
            }`}
          >
            {isActive("/dashboard/billing") && (
              <div className="absolute left-0 top-1/2 h-6 w-[2px] -translate-y-1/2 rounded-r-full bg-red-400 shadow-[0_0_12px_rgba(248,113,113,0.9)]" />
            )}

            <div
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                isActive("/dashboard/billing")
                  ? "border border-red-500/25 bg-red-500/[0.10]"
                  : "bg-white/[0.02] group-hover:bg-red-500/[0.04]"
              }`}
            >
              <CreditCard
                className={`h-[17px] w-[17px] ${
                  isActive("/dashboard/billing")
                    ? "text-red-400"
                    : "text-slate-500 group-hover:text-red-300"
                }`}
              />
            </div>

            <span className="flex-1">
              Billing & Subscription
            </span>

            {isActive("/dashboard/billing") && (
              <ChevronRight className="h-3.5 w-3.5 text-red-400/70" />
            )}
          </Link>

          {/* Settings */}

          <Link
            href="/dashboard/settings"
            className={`group relative flex items-center gap-3 rounded-xl border px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
              isActive("/dashboard/settings")
                ? "border-red-500/[0.25] bg-gradient-to-r from-red-500/[0.12] to-rose-500/[0.09] text-white"
                : "border-transparent text-slate-500 hover:border-red-500/[0.10] hover:bg-red-500/[0.035] hover:text-slate-200"
            }`}
          >
            {isActive("/dashboard/settings") && (
              <div className="absolute left-0 top-1/2 h-6 w-[2px] -translate-y-1/2 rounded-r-full bg-red-400 shadow-[0_0_12px_rgba(248,113,113,0.9)]" />
            )}

            <div
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                isActive("/dashboard/settings")
                  ? "border border-red-500/25 bg-red-500/[0.10]"
                  : "bg-white/[0.02] group-hover:bg-red-500/[0.04]"
              }`}
            >
              <Settings
                className={`h-[17px] w-[17px] ${
                  isActive("/dashboard/settings")
                    ? "text-red-400"
                    : "text-slate-500 group-hover:text-red-300"
                }`}
              />
            </div>

            <span className="flex-1">
              Profile Settings
            </span>

            {isActive("/dashboard/settings") && (
              <ChevronRight className="h-3.5 w-3.5 text-red-400/70" />
            )}
          </Link>
        </div>
      </nav>

      {/* =========================================================
          Bottom area
      ========================================================== */}

      <div className="relative shrink-0">
        {/* Daily Apply Counter */}

        <div className="px-3 pb-4">
          <div className="group relative overflow-hidden rounded-2xl border border-red-500/[0.14] bg-gradient-to-br from-white/[0.035] via-white/[0.02] to-red-500/[0.035] p-4 shadow-xl shadow-black/10 transition-all duration-300 hover:border-red-500/[0.25] hover:shadow-red-950/20">
            {/* Card glow */}

            <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-red-500/[0.10] blur-[45px] transition-all duration-500 group-hover:bg-red-500/[0.18]" />

            <div className="relative">
              {/* Header */}

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className={`flex h-7 w-7 items-center justify-center rounded-lg border transition-all duration-300 ${
                      dailyLimitReached
                        ? "border-red-400/25 bg-red-400/[0.08]"
                        : "border-red-500/20 bg-red-500/[0.07]"
                    }`}
                  >
                    <BriefcaseBusiness
                      className={`h-3.5 w-3.5 ${
                        dailyLimitReached
                          ? "text-red-300"
                          : "text-red-400"
                      }`}
                    />
                  </div>

                  <span className="text-xs font-semibold text-slate-300">
                    Daily applies
                  </span>
                </div>

                <span className="rounded-full border border-red-500/[0.10] bg-white/[0.03] px-2 py-0.5 text-[9px] font-medium uppercase tracking-wider text-slate-600">
                  Today
                </span>
              </div>

              {/* Counter */}

              <div className="mt-4 flex items-end justify-between">
                <div>
                  {applicationsLoading ? (
                    <div className="flex items-center gap-1.5">
                      <div className="h-7 w-7 animate-pulse rounded-md bg-white/[0.06]" />

                      <div className="h-3 w-5 animate-pulse rounded bg-white/[0.05]" />
                    </div>
                  ) : (
                    <>
                      <span
                        className={`text-2xl font-bold tracking-tight ${
                          dailyLimitReached
                            ? "text-red-300"
                            : "text-white"
                        }`}
                      >
                        {dailyApplyCount}
                      </span>

                      <span className="ml-1 text-xs text-slate-600">
                        / {DAILY_APPLY_LIMIT}
                      </span>
                    </>
                  )}
                </div>

                {!applicationsLoading && (
                  <span
                    className={`text-[10px] font-medium ${
                      dailyLimitReached
                        ? "text-red-400"
                        : "text-slate-600"
                    }`}
                  >
                    {dailyLimitReached
                      ? "Limit reached"
                      : `${dailyApplications} used`}
                  </span>
                )}
              </div>

              {/* Progress */}

              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-red-500 via-red-500 to-rose-500 shadow-[0_0_10px_rgba(239,68,68,0.45)] transition-all duration-500"
                  style={{
                    width: `${dailyApplyPercentage}%`,
                  }}
                />
              </div>

              {/* Footer */}

              <div className="mt-2 flex items-center justify-between">
                <p className="text-[10px] text-slate-600">
                  {dailyLimitReached
                    ? "Daily free limit used"
                    : `${remainingApplications} ${
                        remainingApplications === 1
                          ? "application"
                          : "applications"
                      } remaining`}
                </p>

                <Link
                  href="/dashboard/billing"
                  className="text-[10px] font-semibold text-red-400 transition-colors hover:text-red-300"
                >
                  Upgrade
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* =======================================================
            Sign Out
        ======================================================== */}

        <div className="border-t border-red-500/[0.10] p-3">
          <button
            onClick={() =>
              signOut({
                redirectUrl: "/",
              })
            }
            className="group flex w-full items-center gap-3 rounded-xl border border-transparent px-3 py-2.5 text-sm font-medium text-slate-500 transition-all duration-200 hover:border-red-400/[0.15] hover:bg-red-400/[0.05] hover:text-slate-300"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.02] transition-colors group-hover:bg-red-400/[0.08]">
              <LogOut className="h-[17px] w-[17px] transition-colors group-hover:text-red-300" />
            </div>

            <span>Sign out</span>
          </button>
        </div>
      </div>
    </aside>
  );
}