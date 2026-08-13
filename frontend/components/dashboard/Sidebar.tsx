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
} from "lucide-react";
import { useClerk } from "@clerk/nextjs";
import { useEffect, useState } from "react";

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

  return (
    <aside className="fixed left-0 top-0 hidden h-screen w-64 border-r bg-background lg:flex lg:flex-col">
      {/* Logo */}

      <div className="flex h-16 items-center border-b px-6">
        <Link href="/dashboard" className="text-xl font-bold tracking-tight">
          JobBuddy
          <span className="text-primary"> AI</span>
        </Link>
      </div>

      {/* Navigation */}

      <nav className="flex-1 px-4 py-6">
        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Workspace
        </p>

        <div className="space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <Icon className="h-4 w-4" />

                <span className="flex-1">{item.name}</span>

                {/* Saved Jobs Count */}

                {item.name === "Saved Jobs" && savedJobsCount > 0 && (
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-xs font-semibold text-primary-foreground">
                    {savedJobsCount}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        <p className="mb-3 mt-8 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Account
        </p>

        <div className="space-y-1">
          <Link
            href="/dashboard/billing"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <CreditCard className="h-4 w-4" />
            Billing & Subscription
          </Link>

          <Link
            href="/dashboard/settings"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <Settings className="h-4 w-4" />
            Profile Settings
          </Link>
        </div>
      </nav>

      {/* Daily Apply Counter */}

      <div className="px-4 pb-4">
        <div className="rounded-xl border bg-muted/30 p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold">Daily applies</span>

            <BriefcaseBusiness className="h-4 w-4 text-primary" />
          </div>

          <div className="mt-3 flex items-end justify-between">
            <span className="text-2xl font-bold">0</span>

            <span className="text-xs text-muted-foreground">/ 5</span>
          </div>

          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted">
            <div className="h-full w-0 rounded-full bg-primary" />
          </div>

          <p className="mt-2 text-xs text-muted-foreground">0 / 5 used today</p>
        </div>
      </div>

      {/* Sign Out */}

      <div className="border-t p-4">
        <button
          onClick={() =>
            signOut({
              redirectUrl: "/",
            })
          }
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </button>
      </div>
    </aside>
  );
}
