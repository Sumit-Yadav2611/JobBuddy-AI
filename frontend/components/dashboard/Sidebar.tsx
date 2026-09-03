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

export default function Sidebar() {
  const { signOut } = useClerk();
  const pathname = usePathname();

  const [savedJobsCount, setSavedJobsCount] = useState(0);

  // Get saved jobs count
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

  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-64 overflow-hidden border-r border-white/[0.07] bg-[#050810] lg:flex lg:flex-col">
      {/* Ambient sidebar glow */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-72 w-72 rounded-full bg-cyan-400/[0.06] blur-[100px]" />

      <div className="pointer-events-none absolute -bottom-40 -right-32 h-80 w-80 rounded-full bg-violet-500/[0.06] blur-[110px]" />

      {/* Subtle vertical grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Logo */}
      <div className="relative flex h-20 shrink-0 items-center border-b border-white/[0.07] px-6">
        <Link
          href="/dashboard"
          className="group flex items-center gap-3"
        >
          <div className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-cyan-400/20 bg-gradient-to-br from-cyan-400/[0.12] to-violet-500/[0.12] shadow-lg shadow-cyan-500/[0.04]">
            <Sparkles className="h-4 w-4 text-cyan-300 transition-transform duration-300 group-hover:rotate-12" />

            <div className="pointer-events-none absolute inset-0 rounded-xl bg-cyan-400/[0.04] blur-md" />
          </div>

          <div className="leading-none">
            <div className="text-[17px] font-semibold tracking-tight text-white">
              JobBuddy
              <span className="bg-gradient-to-r from-cyan-300 to-violet-400 bg-clip-text text-transparent">
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

      {/* Navigation */}
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
                    ? "border border-cyan-400/[0.15] bg-gradient-to-r from-cyan-400/[0.09] via-blue-500/[0.05] to-violet-500/[0.08] text-white shadow-lg shadow-cyan-500/[0.025]"
                    : "border border-transparent text-slate-500 hover:border-white/[0.05] hover:bg-white/[0.025] hover:text-slate-200"
                }`}
              >
                {/* Active indicator */}
                {active && (
                  <div className="absolute left-0 top-1/2 h-5 w-[2px] -translate-y-1/2 rounded-r-full bg-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
                )}

                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-all duration-200 ${
                    active
                      ? "border border-cyan-400/20 bg-cyan-400/[0.08] shadow-sm shadow-cyan-400/[0.08]"
                      : "border border-transparent bg-white/[0.02] group-hover:border-white/[0.06] group-hover:bg-white/[0.04]"
                  }`}
                >
                  <Icon
                    className={`h-[17px] w-[17px] ${
                      active
                        ? "text-cyan-300"
                        : "text-slate-500 group-hover:text-slate-300"
                    }`}
                  />
                </div>

                <span className="min-w-0 flex-1 truncate">
                  {item.name}
                </span>

                {/* Saved Jobs Count */}
                {item.name === "Saved Jobs" && savedJobsCount > 0 && (
                  <span
                    className={`flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] font-bold ${
                      active
                        ? "border border-cyan-300/20 bg-cyan-400/10 text-cyan-300"
                        : "bg-white/[0.08] text-slate-400"
                    }`}
                  >
                    {savedJobsCount}
                  </span>
                )}

                {active && (
                  <ChevronRight className="h-3.5 w-3.5 shrink-0 text-cyan-300/60" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Account */}
        <div className="mb-3 mt-9 px-3">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-600">
            Account
          </p>
        </div>

        <div className="space-y-1">
          <Link
            href="/dashboard/billing"
            className={`group relative flex items-center gap-3 rounded-xl border px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
              isActive("/dashboard/billing")
                ? "border-cyan-400/[0.15] bg-gradient-to-r from-cyan-400/[0.09] to-violet-500/[0.08] text-white"
                : "border-transparent text-slate-500 hover:border-white/[0.05] hover:bg-white/[0.025] hover:text-slate-200"
            }`}
          >
            {isActive("/dashboard/billing") && (
              <div className="absolute left-0 top-1/2 h-5 w-[2px] -translate-y-1/2 rounded-r-full bg-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
            )}

            <div
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                isActive("/dashboard/billing")
                  ? "border border-cyan-400/20 bg-cyan-400/[0.08]"
                  : "bg-white/[0.02] group-hover:bg-white/[0.04]"
              }`}
            >
              <CreditCard
                className={`h-[17px] w-[17px] ${
                  isActive("/dashboard/billing")
                    ? "text-cyan-300"
                    : "text-slate-500 group-hover:text-slate-300"
                }`}
              />
            </div>

            <span className="flex-1">Billing & Subscription</span>

            {isActive("/dashboard/billing") && (
              <ChevronRight className="h-3.5 w-3.5 text-cyan-300/60" />
            )}
          </Link>

          <Link
            href="/dashboard/settings"
            className={`group relative flex items-center gap-3 rounded-xl border px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
              isActive("/dashboard/settings")
                ? "border-cyan-400/[0.15] bg-gradient-to-r from-cyan-400/[0.09] to-violet-500/[0.08] text-white"
                : "border-transparent text-slate-500 hover:border-white/[0.05] hover:bg-white/[0.025] hover:text-slate-200"
            }`}
          >
            {isActive("/dashboard/settings") && (
              <div className="absolute left-0 top-1/2 h-5 w-[2px] -translate-y-1/2 rounded-r-full bg-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
            )}

            <div
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                isActive("/dashboard/settings")
                  ? "border border-cyan-400/20 bg-cyan-400/[0.08]"
                  : "bg-white/[0.02] group-hover:bg-white/[0.04]"
              }`}
            >
              <Settings
                className={`h-[17px] w-[17px] ${
                  isActive("/dashboard/settings")
                    ? "text-cyan-300"
                    : "text-slate-500 group-hover:text-slate-300"
                }`}
              />
            </div>

            <span className="flex-1">Profile Settings</span>

            {isActive("/dashboard/settings") && (
              <ChevronRight className="h-3.5 w-3.5 text-cyan-300/60" />
            )}
          </Link>
        </div>
      </nav>

      {/* Bottom area */}
      <div className="relative shrink-0">
        {/* Daily Apply Counter */}
        <div className="px-3 pb-4">
          <div className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-gradient-to-br from-white/[0.035] via-white/[0.02] to-cyan-400/[0.025] p-4 shadow-xl shadow-black/10">
            {/* Card glow */}
            <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-cyan-400/[0.08] blur-[45px]" />

            <div className="relative">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-cyan-400/15 bg-cyan-400/[0.06]">
                    <BriefcaseBusiness className="h-3.5 w-3.5 text-cyan-300" />
                  </div>

                  <span className="text-xs font-semibold text-slate-300">
                    Daily applies
                  </span>
                </div>

                <span className="rounded-full border border-white/[0.06] bg-white/[0.03] px-2 py-0.5 text-[9px] font-medium uppercase tracking-wider text-slate-600">
                  Today
                </span>
              </div>

              <div className="mt-4 flex items-end justify-between">
                <div>
                  <span className="text-2xl font-bold tracking-tight text-white">
                    0
                  </span>

                  <span className="ml-1 text-xs text-slate-600">
                    / 5
                  </span>
                </div>

                <span className="text-[10px] font-medium text-slate-600">
                  0 used
                </span>
              </div>

              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                <div className="h-full w-0 rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 shadow-[0_0_8px_rgba(34,211,238,0.35)]" />
              </div>

              <div className="mt-2 flex items-center justify-between">
                <p className="text-[10px] text-slate-600">
                  Free plan limit
                </p>

                <Link
                  href="/dashboard/billing"
                  className="text-[10px] font-semibold text-cyan-400 transition-colors hover:text-cyan-300"
                >
                  Upgrade
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Sign Out */}
        <div className="border-t border-white/[0.07] p-3">
          <button
            onClick={() =>
              signOut({
                redirectUrl: "/",
              })
            }
            className="group flex w-full items-center gap-3 rounded-xl border border-transparent px-3 py-2.5 text-sm font-medium text-slate-500 transition-all duration-200 hover:border-red-400/[0.08] hover:bg-red-400/[0.04] hover:text-slate-300"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.02] transition-colors group-hover:bg-red-400/[0.06]">
              <LogOut className="h-[17px] w-[17px] transition-colors group-hover:text-red-300" />
            </div>

            <span>Sign out</span>
          </button>
        </div>
      </div>
    </aside>
  );
}