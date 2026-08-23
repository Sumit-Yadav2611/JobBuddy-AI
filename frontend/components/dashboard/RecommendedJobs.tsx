"use client";

import { useEffect, useState } from "react";

type Job = {
  id: string;

  title: string;

  company: string;

  location: string | null;

  matchScore: number;

  matchedSkills: string[];

  missingSkills: string[];
};

export default function RecommendedJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    fetch("/api/jobs/recommended")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setJobs(data.jobs);
        }
      });
  }, []);

  return (
    
    <section className="mt-10">
      <h2 className="text-2xl font-bold">Recommended Jobs For You</h2>
      <h1>
TEST RECOMMENDED JOBS
</h1>
      <div className="grid gap-5 mt-5">
        {jobs.map((job) => (
          <div key={job.id} className="rounded-xl border p-5">
            <h3 className="font-bold text-lg">{job.title}</h3>

            <p>{job.company}</p>

            <p className="mt-3">
              Match Score:
              <span className="font-bold">{job.matchScore}%</span>
            </p>

            <div className="mt-3">
              <p className="font-semibold">Matched Skills</p>

              {job.matchedSkills.map((skill) => (
                <span key={skill} className="mr-2">
                  ✓ {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
