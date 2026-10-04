"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import {
  Bell,
  CheckCircle2,
  Clock3,
  Search,
  Sparkles,
  X,
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
};

function getStatusStyle(status: string) {
  switch (status) {
    case "Interview":
      return {
        icon: Clock3,
        iconClass: "text-violet-300",
        bgClass: "bg-violet-400/[0.08]",
        borderClass: "border-violet-400/15",
      };

    case "Offer":
      return {
        icon: Sparkles,
        iconClass: "text-emerald-300",
        bgClass: "bg-emerald-400/[0.08]",
        borderClass: "border-emerald-400/15",
      };

    case "Rejected":
      return {
        icon: X,
        iconClass: "text-rose-300",
        bgClass: "bg-rose-400/[0.08]",
        borderClass: "border-rose-400/15",
      };

    default:
      return {
        icon: CheckCircle2,
        iconClass: "text-cyan-300",
        bgClass: "bg-cyan-400/[0.08]",
        borderClass: "border-cyan-400/15",
      };
  }
}

function formatRelativeDate(dateString: string) {
  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return "Recently";
  }

  const diff = Date.now() - date.getTime();

  if (diff < 0) {
    return "Just now";
  }

  const minutes = Math.floor(diff / (1000 * 60));

  if (minutes < 1) {
    return "Just now";
  }

  if (minutes < 60) {
    return `${minutes}m ago`;
  }

  const hours = Math.floor(minutes / 60);

  if (hours < 24) {
    return `${hours}h ago`;
  }

  const days = Math.floor(hours / 24);

  if (days < 7) {
    return `${days}d ago`;
  }

  return date.toLocaleDateString();
}

export default function DashboardHeader() {
  const router = useRouter();
  const pathname = usePathname();

  const [search, setSearch] = useState("");
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loadingNotifications, setLoadingNotifications] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  const searchRef = useRef<HTMLInputElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);

  // ============================================================
  // Sync search with current URL
  // ============================================================

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    setSearch(params.get("search") || "");
  }, [pathname]);

  // ============================================================
  // Ctrl/Cmd + K
  // ============================================================

  useEffect(() => {
    function handleKeyboard(event: KeyboardEvent) {
      if (
        (event.ctrlKey || event.metaKey) &&
        event.key.toLowerCase() === "k"
      ) {
        event.preventDefault();
        searchRef.current?.focus();
      }

      if (event.key === "Escape") {
        setNotificationsOpen(false);

        if (searchFocused) {
          searchRef.current?.blur();
          setSearchFocused(false);
        }
      }
    }

    window.addEventListener("keydown", handleKeyboard);

    return () => {
      window.removeEventListener("keydown", handleKeyboard);
    };
  }, [searchFocused]);

  // ============================================================
  // Close notification dropdown when clicking outside
  // ============================================================

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setNotificationsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  // ============================================================
  // Load real application notifications
  // ============================================================

  useEffect(() => {
    let cancelled = false;

    async function loadApplications() {
      try {
        setLoadingNotifications(true);

        const response = await fetch("/api/applications", {
          cache: "no-store",
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data.error || "Failed to load notifications");
        }

        if (!cancelled) {
          setApplications(data.applications || []);
        }
      } catch (error) {
        if (!cancelled) {
          console.error("Failed to load notifications:", error);
          setApplications([]);
        }
      } finally {
        if (!cancelled) {
          setLoadingNotifications(false);
        }
      }
    }

    loadApplications();

    return () => {
      cancelled = true;
    };
  }, [pathname]);

  // ============================================================
  // Search
  // ============================================================

  function submitSearch() {
    const query = search.trim();

    if (!query) {
      router.push("/dashboard/jobs");
      return;
    }

    router.push(`/dashboard/jobs?search=${encodeURIComponent(query)}`);
  }

  function handleSearchKeyDown(
    event: React.KeyboardEvent<HTMLInputElement>,
  ) {
    if (event.key === "Enter") {
      event.preventDefault();
      submitSearch();
    }

    if (event.key === "Escape") {
      setSearch("");
      searchRef.current?.blur();
      setSearchFocused(false);
    }
  }

  function clearSearch() {
    setSearch("");
    searchRef.current?.focus();

    if (pathname === "/dashboard/jobs") {
      router.push("/dashboard/jobs");
    }
  }

  // ============================================================
  // Notifications
  // ============================================================

  function toggleNotifications() {
    setNotificationsOpen((previous) => !previous);
  }

  function openApplicationStatus() {
    setNotificationsOpen(false);
    router.push("/dashboard/applications");
  }

  const recentApplications = applications.slice(0, 4);

  return (
    <header className="sticky top-0 z-40 border-b border-white/[0.07] bg-[#050812]/85 backdrop-blur-xl">
      <div className="flex h-[76px] items-center justify-between gap-4 px-5 sm:px-6 lg:px-8">
        {/* ======================================================
            PAGE TITLE
        ====================================================== */}

        <div className="min-w-0 shrink-0">
          <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-cyan-400">
            Dashboard
          </p>

          <h1 className="mt-1 truncate text-xl font-semibold tracking-tight text-white">
            Jobs
          </h1>
        </div>

        {/* ======================================================
            GLOBAL SEARCH
        ====================================================== */}

        <div className="hidden max-w-2xl flex-1 md:block">
          <div
            className={`group flex h-12 items-center gap-3 rounded-2xl border px-4 transition-all duration-300 ${
              searchFocused
                ? "border-cyan-400/40 bg-white/[0.055] shadow-[0_0_30px_rgba(34,211,238,0.08)]"
                : "border-white/10 bg-white/[0.035] hover:border-cyan-400/30 hover:bg-white/[0.05]"
            }`}
          >
            <Search
              className={`h-4 w-4 shrink-0 transition-colors duration-200 ${
                searchFocused ? "text-cyan-300" : "text-slate-500"
              }`}
            />

            <input
              ref={searchRef}
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              onKeyDown={handleSearchKeyDown}
              placeholder="Search jobs, companies..."
              aria-label="Search jobs and companies"
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
            />

            {search && (
              <button
                type="button"
                onMouseDown={(event) => event.preventDefault()}
                onClick={clearSearch}
                aria-label="Clear search"
                className="rounded-md p-1 text-slate-500 transition hover:bg-white/[0.06] hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            )}

            <button
              type="button"
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => searchRef.current?.focus()}
              className="hidden shrink-0 rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1.5 text-[10px] font-medium text-slate-500 transition hover:border-cyan-400/25 hover:bg-cyan-400/[0.04] hover:text-cyan-300 lg:block"
              aria-label="Focus search"
            >
              <span className="tracking-wide">⌘ K</span>
            </button>
          </div>
        </div>

        {/* ======================================================
            HEADER ACTIONS
        ====================================================== */}

        <div className="flex items-center gap-2 sm:gap-3">
          {/* ====================================================
              NOTIFICATIONS
          ==================================================== */}

          <div ref={notificationRef} className="relative">
            <button
              type="button"
              onClick={toggleNotifications}
              className={`relative flex h-11 w-11 items-center justify-center rounded-xl border transition-all duration-300 ${
                notificationsOpen
                  ? "border-cyan-400/40 bg-cyan-400/[0.08] text-cyan-200 shadow-[0_0_24px_rgba(34,211,238,0.10)]"
                  : "border-white/10 bg-white/[0.035] text-slate-300 hover:border-cyan-400/30 hover:bg-white/[0.06] hover:text-white"
              }`}
              aria-label="Notifications"
              aria-expanded={notificationsOpen}
            >
              <Bell className="h-5 w-5" />

              {applications.length > 0 && (
                <>
                  <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.9)]" />

                  <span className="absolute right-[7px] top-[7px] h-2 w-2 animate-ping rounded-full bg-cyan-300/60" />
                </>
              )}
            </button>

            {/* ==================================================
                NOTIFICATION DROPDOWN
            ================================================== */}

            {notificationsOpen && (
              <div className="absolute right-0 top-[calc(100%+12px)] w-[min(360px,calc(100vw-24px))] overflow-hidden rounded-2xl border border-white/10 bg-[#080d18]/95 shadow-2xl shadow-black/50 backdrop-blur-2xl">
                {/* Ambient glow */}
                <div className="pointer-events-none absolute -right-16 -top-16 h-32 w-32 rounded-full bg-cyan-500/10 blur-3xl" />

                <div className="pointer-events-none absolute -bottom-20 -left-10 h-32 w-32 rounded-full bg-violet-600/10 blur-3xl" />

                {/* Header */}
                <div className="relative border-b border-white/[0.07] px-5 py-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-400">
                        Activity
                      </p>

                      <h2 className="mt-1 text-sm font-semibold text-white">
                        Notifications
                      </h2>
                    </div>

                    <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-cyan-400/15 bg-cyan-400/[0.06]">
                      <Sparkles className="h-4 w-4 text-cyan-300" />
                    </div>
                  </div>
                </div>

                {/* Notification list */}
                <div className="relative max-h-[360px] overflow-y-auto">
                  {loadingNotifications ? (
                    <div className="space-y-3 p-4">
                      {[1, 2, 3].map((item) => (
                        <div
                          key={item}
                          className="flex animate-pulse gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3"
                        >
                          <div className="h-10 w-10 shrink-0 rounded-xl bg-white/[0.06]" />

                          <div className="min-w-0 flex-1 space-y-2">
                            <div className="h-3 w-3/4 rounded bg-white/[0.06]" />

                            <div className="h-2.5 w-1/2 rounded bg-white/[0.04]" />

                            <div className="h-2 w-1/4 rounded bg-white/[0.04]" />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : recentApplications.length > 0 ? (
                    <div className="p-3">
                      {recentApplications.map((application) => {
                        const style = getStatusStyle(application.status);
                        const StatusIcon = style.icon;

                        return (
                          <button
                            key={application.id}
                            type="button"
                            onClick={openApplicationStatus}
                            className="group flex w-full gap-3 rounded-xl p-3 text-left transition-all duration-200 hover:bg-white/[0.045]"
                          >
                            <div
                              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${style.borderClass} ${style.bgClass}`}
                            >
                              <StatusIcon
                                className={`h-4 w-4 ${style.iconClass}`}
                              />
                            </div>

                            <div className="min-w-0 flex-1">
                              <div className="flex items-start justify-between gap-2">
                                <p className="truncate text-sm font-medium text-slate-200 transition-colors group-hover:text-white">
                                  {application.title}
                                </p>

                                <span className="shrink-0 text-[10px] text-slate-600">
                                  {formatRelativeDate(application.updatedAt)}
                                </span>
                              </div>

                              <p className="mt-1 truncate text-xs text-slate-500">
                                {application.company}
                              </p>

                              <div className="mt-2 flex items-center gap-2">
                                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_7px_rgba(34,211,238,0.7)]" />

                                <span className="text-[10px] font-medium text-slate-400">
                                  {application.status}
                                </span>
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="px-5 py-10 text-center">
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.035]">
                        <Bell className="h-5 w-5 text-slate-500" />
                      </div>

                      <h3 className="mt-4 text-sm font-semibold text-white">
                        You're all caught up
                      </h3>

                      <p className="mx-auto mt-2 max-w-[240px] text-xs leading-5 text-slate-500">
                        New application activity will appear here.
                      </p>
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="relative border-t border-white/[0.07] p-3">
                  <button
                    type="button"
                    onClick={openApplicationStatus}
                    className="flex w-full items-center justify-center rounded-xl border border-cyan-400/15 bg-cyan-400/[0.05] px-4 py-2.5 text-xs font-semibold text-cyan-300 transition-all hover:border-cyan-400/30 hover:bg-cyan-400/[0.08] hover:text-cyan-200 hover:shadow-[0_0_20px_rgba(34,211,238,0.06)]"
                  >
                    View application activity
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* ====================================================
              USER
          ==================================================== */}

          <div className="rounded-full border border-white/10 bg-white/[0.04] p-0.5 transition-all duration-300 hover:border-cyan-400/25 hover:bg-cyan-400/[0.04]">
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "h-10 w-10",
                },
              }}
            />
          </div>
        </div>
      </div>
    </header>
  );
}