"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import JobCard from "./JobCard";

const jobs = [
  {
    id: 1,
    title: "Staff Software Engineer",
    company: "UI Platform",
    platform: "Greenhouse",
    location: "Remote",
    type: "Full-time",
    match: 99,
  },
  {
    id: 2,
    title: "Software Engineer",
    company: "Attain Partners",
    platform: "Greenhouse",
    location: "Remote",
    type: "Full-time",
    match: 96,
  },
  {
    id: 3,
    title: "Frontend Engineer",
    company: "TechFlow",
    platform: "Lever",
    location: "New York, NY",
    type: "Full-time",
    match: 94,
  },
  {
    id: 4,
    title: "Full Stack Developer",
    company: "Innovate Labs",
    platform: "Wellfound",
    location: "Remote",
    type: "Full-time",
    match: 91,
  },
  {
    id: 5,
    title: "React Developer",
    company: "Cloud Systems",
    platform: "Workable",
    location: "Bengaluru",
    type: "Full-time",
    match: 88,
  },
];

export default function JobsSection() {
  const [search, setSearch] = useState("");
  const [platform, setPlatform] = useState("All");

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(search.toLowerCase()) ||
        job.company.toLowerCase().includes(search.toLowerCase());

      const matchesPlatform =
        platform === "All" || job.platform === platform;

      return matchesSearch && matchesPlatform;
    });
  }, [search, platform]);

  return (
    <section className="mt-10">

      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold">
          Top Job Matches
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Jobs matched to your skills and profile.
        </p>
      </div>

      {/* Search + Filter */}
      <div className="mt-5 flex flex-col gap-3 sm:flex-row">

        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <input
            type="text"
            placeholder="Search jobs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-11 w-full rounded-lg border bg-background pl-10 pr-4 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
          />
        </div>

        {/* Platform Filter */}
        <div className="relative">
          <SlidersHorizontal className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <select
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            className="h-11 appearance-none rounded-lg border bg-background pl-10 pr-10 text-sm outline-none focus:border-primary"
          >
            <option value="All">
              All Platforms
            </option>

            <option value="Greenhouse">
              Greenhouse
            </option>

            <option value="Lever">
              Lever
            </option>

            <option value="Workable">
              Workable
            </option>

            <option value="Wellfound">
              Wellfound
            </option>
          </select>
        </div>
      </div>

      {/* Job Count */}
      <div className="mt-5 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing{" "}
          <span className="font-medium text-foreground">
            {filteredJobs.length}
          </span>{" "}
          jobs
        </p>
      </div>

      {/* Job Cards */}
      <div className="mt-4 space-y-3">

        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
            />
          ))
        ) : (
          <div className="rounded-xl border border-dashed p-10 text-center">
            <p className="font-medium">
              No jobs found
            </p>

            <p className="mt-2 text-sm text-muted-foreground">
              Try another search or platform.
            </p>
          </div>
        )}

      </div>
    </section>
  );
}