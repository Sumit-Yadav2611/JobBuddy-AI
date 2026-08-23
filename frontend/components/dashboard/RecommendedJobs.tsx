"use client";

import { useEffect, useState } from "react";

type Job = {
  id: string;

  title: string;

  company: string;

  location: string | null;

  matchScore: number;

  matchLevel: string;

  matchedSkills: string[];

  missingSkills: string[];

  explanation: {
    strengths: string[];
    improvements: string[];
  };
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

      <div className="space-y-6">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="
rounded-2xl
border
bg-white
p-6
shadow-sm
"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold">{job.title}</h3>

                <p className="text-muted-foreground mt-1">{job.company}</p>
              </div>

              <div
                className="
rounded-xl
bg-green-100
px-4
py-3
text-green-700
text-center
"
              >
                <div className="text-xl font-bold">{job.matchScore}%</div>

                <div className="text-xs font-medium">{job.matchLevel}</div>
              </div>
            </div>

            <div className="mt-5">
              <h4 className="font-semibold mb-3">Matched Skills</h4>

              <div className="flex flex-wrap gap-2">
                {job.matchedSkills.map((skill) => (
                  <span
                    key={skill}
                    className="
rounded-full
bg-green-50
border
border-green-200
px-3
py-1
text-sm
text-green-700
"
                  >
                    ✓ {skill}
                  </span>
                ))}
              </div>
            </div>

            {job.missingSkills.length > 0 && (
              <div className="mt-5">
                <h4 className="font-semibold mb-3">Skills to improve</h4>

                <div className="flex flex-wrap gap-2">
                  {job.missingSkills.map((skill) => (
                    <span
                      key={skill}
                      className="
rounded-full
bg-gray-100
px-3
py-1
text-sm
text-gray-700
"
                    >
                      ○ {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
            <div className="mt-6">
              <h4 className="font-semibold mb-3">
                Why this job matches you 🧠
              </h4>

              <div className="space-y-2">
                {job.explanation?.strengths.map((item) => (
                  <p key={item} className="text-sm text-green-700">
                    ✓ {item}
                  </p>
                ))}
              </div>
            </div>

            {job.explanation?.improvements.length > 0 && (
              <div className="mt-5">
                <h4 className="font-semibold mb-3">Improve your chances 🚀</h4>

                <div className="space-y-2">
                  {job.explanation.improvements.map((item) => (
                    <p key={item} className="text-sm text-gray-700">
                      → {item}
                    </p>
                  ))}
                </div>
              </div>
            )}

            <button
              className="
mt-6
rounded-xl
bg-black
px-5
py-2
text-white
"
            >
              View Job
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
