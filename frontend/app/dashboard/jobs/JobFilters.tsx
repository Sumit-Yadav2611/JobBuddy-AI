"use client";

import { Search, MapPin, RefreshCw } from "lucide-react";

export default function JobFilters({
  search,
  location,
  onSearchChange,
  onLocationChange,
  onRefresh,
}: {
  search: string;
  location: string;
  onSearchChange: (value: string) => void;
  onLocationChange: (value: string) => void;
  onRefresh: () => void;
}) {
  return (
    <div className="mt-8 rounded-2xl border bg-card p-5">
      <div className="grid gap-4 md:grid-cols-[1fr_1fr_auto]">
        {/* Search */}

        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search jobs, skills, companies..."
            className="h-11 w-full rounded-lg border bg-background pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Location */}

        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <input
            type="text"
            value={location}
            onChange={(e) => onLocationChange(e.target.value)}
            placeholder="Location or Remote"
            className="h-11 w-full rounded-lg border bg-background pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Refresh */}

        <button
          type="button"
          onClick={onRefresh}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border px-5 text-sm font-medium hover:bg-muted"
        >
          <RefreshCw className="h-4 w-4" />
          Refresh
        </button>
      </div>
    </div>
  );
}
