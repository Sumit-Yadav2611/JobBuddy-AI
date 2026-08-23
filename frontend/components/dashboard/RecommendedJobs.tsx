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

              <div className="flex flex-wrap gap-2 mt-2">
                {job.matchedSkills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700"
                  >
                    ✓ {skill}
                  </span>
                ))}
                {job.missingSkills.length > 0 && (
                  <div className="mt-4">
                    <p className="font-semibold">Skills to improve</p>

                    <div className="flex flex-wrap gap-2 mt-2">
                      {job.missingSkills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full bg-gray-100 px-3 py-1 text-sm"
                        >
                          ○ {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
