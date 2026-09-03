"use client";

import {
  Search,
  MapPin,
  RefreshCw,
  SlidersHorizontal,
} from "lucide-react";

type JobFiltersProps = {
  search: string;
  location: string;
  onSearchChange: (value: string) => void;
  onLocationChange: (value: string) => void;
  onRefresh: () => void;
};

export default function JobFilters({
  search,
  location,
  onSearchChange,
  onLocationChange,
  onRefresh,
}: JobFiltersProps) {
  return (
    <div className="relative mt-8 overflow-hidden rounded-2xl border border-white/[0.07] bg-[#080d18]/90 p-3 shadow-2xl shadow-black/20 backdrop-blur-xl">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-cyan-400/[0.05] blur-[80px]" />

      <div className="pointer-events-none absolute -bottom-24 left-1/3 h-48 w-48 rounded-full bg-violet-500/[0.04] blur-[80px]" />

      <div className="relative grid gap-3 lg:grid-cols-[1.5fr_1fr_auto]">
        {/* Search */}
        <div className="group relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-slate-600 transition-colors group-focus-within:text-cyan-300" />

          <input
            type="text"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search jobs, skills, companies..."
            className="h-12 w-full rounded-xl border border-white/[0.07] bg-white/[0.025] pl-11 pr-4 text-sm text-slate-200 outline-none transition-all placeholder:text-slate-600 focus:border-cyan-400/30 focus:bg-cyan-400/[0.025] focus:shadow-[0_0_25px_rgba(34,211,238,0.05)]"
          />
        </div>

        {/* Location */}
        <div className="group relative">
          <MapPin className="pointer-events-none absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-slate-600 transition-colors group-focus-within:text-cyan-300" />

          <input
            type="text"
            value={location}
            onChange={(event) => onLocationChange(event.target.value)}
            placeholder="Location or Remote"
            className="h-12 w-full rounded-xl border border-white/[0.07] bg-white/[0.025] pl-11 pr-4 text-sm text-slate-200 outline-none transition-all placeholder:text-slate-600 focus:border-cyan-400/30 focus:bg-cyan-400/[0.025] focus:shadow-[0_0_25px_rgba(34,211,238,0.05)]"
          />
        </div>

        {/* Refresh */}
        <button
          type="button"
          onClick={onRefresh}
          className="group inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-cyan-400/[0.15] bg-gradient-to-r from-cyan-400/[0.07] to-violet-500/[0.07] px-5 text-sm font-semibold text-slate-200 transition-all duration-200 hover:border-cyan-400/30 hover:from-cyan-400/[0.12] hover:to-violet-500/[0.12] hover:text-white"
        >
          <RefreshCw className="h-4 w-4 text-cyan-300 transition-transform duration-500 group-hover:rotate-180" />

          <span>Refresh</span>
        </button>
      </div>

      {/* Filter hint */}
      <div className="relative mt-3 flex items-center gap-2 px-2">
        <SlidersHorizontal className="h-3.5 w-3.5 text-slate-700" />

        <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-slate-700">
          Refine your search
        </span>
      </div>
    </div>
  );
}