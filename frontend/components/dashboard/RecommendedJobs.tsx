"use client";

import { useEffect, useState } from "react";

type Job = {
  id: string;

  title: string;

  company: string;

  location: string | null;

  matchScore: number;

  matchLevel: string;

  matchedSkillCount: number;

  matchedSkills: string[];

  missingSkills: string[];

  explanation: {
    strengths: string[];

    improvements: string[];
  };

  url?: string | null;
};

export default function RecommendedJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);

  const [savedJobs, setSavedJobs] = useState<string[]>([]);

  const [loading, setLoading] = useState(true);

  const [savingJobId, setSavingJobId] = useState<string | null>(null);

  /*
  ========================================
  LOAD RECOMMENDED + SAVED JOBS
  ========================================
  */

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);

        const [jobsResponse, savedResponse] = await Promise.all([
          fetch("/api/jobs/recommended"),
          fetch("/api/saved-jobs"),
        ]);

        const jobsData = await jobsResponse.json();

        const savedData = await savedResponse.json();

        if (jobsData.success) {
          setJobs(jobsData.jobs);
        }

        if (savedData.success) {
          setSavedJobs(savedData.jobIds);
        }
      } catch (error) {
        console.error("Failed to load recommended jobs:", error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  /*
  ========================================
  MATCH LEVEL STYLE
  ========================================
  */

  function getMatchStyle(level: string) {
    if (level === "Excellent Match") {
      return "bg-green-100 text-green-700";
    }

    if (level === "Good Match") {
      return "bg-blue-100 text-blue-700";
    }

    if (level === "Average Match") {
      return "bg-yellow-100 text-yellow-700";
    }

    return "bg-gray-100 text-gray-700";
  }

  /*
  ========================================
  SAVE / UNSAVE JOB
  ========================================
  */

  async function toggleSaveJob(jobId: string) {
    const isSaved = savedJobs.includes(jobId);

    try {
      setSavingJobId(jobId);

      const response = await fetch("/api/saved-jobs", {
        method: isSaved ? "DELETE" : "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          jobId,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        console.error("Save job failed:", data.error);

        return;
      }

      if (isSaved) {
        setSavedJobs((prev) =>
          prev.filter((id) => id !== jobId)
        );
      } else {
        setSavedJobs((prev) => [...prev, jobId]);
      }
    } catch (error) {
      console.error("Toggle save job error:", error);
    } finally {
      setSavingJobId(null);
    }
  }

  /*
  ========================================
  VIEW JOB
  ========================================
  */

  function viewJob(job: Job) {
    if (!job.url) {
      return;
    }

    window.open(job.url, "_blank", "noopener,noreferrer");
  }

  /*
  ========================================
  LOADING STATE
  ========================================
  */

  if (loading) {
    return (
      <section className="mt-10">
        <h2 className="text-2xl font-bold">
          Recommended Jobs For You
        </h2>

        <div className="mt-6 rounded-2xl border bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">
            Loading recommended jobs...
          </p>
        </div>
      </section>
    );
  }

  /*
  ========================================
  EMPTY STATE
  ========================================
  */

  if (jobs.length === 0) {
    return (
      <section className="mt-10">
        <h2 className="text-2xl font-bold">
          Recommended Jobs For You
        </h2>

        <div className="mt-6 rounded-2xl border bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">
            No recommended jobs found yet.
          </p>
        </div>
      </section>
    );
  }

  /*
  ========================================
  UI
  ========================================
  */

  return (
    <section className="mt-10">
      <h2 className="text-2xl font-bold">
        Recommended Jobs For You
      </h2>

      <div className="mt-6 space-y-6">
        {jobs.map((job, index) => {
          const isSaved = savedJobs.includes(job.id);

          const isSaving = savingJobId === job.id;

          return (
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
              {/* ================================
                  HEADER
              ================================= */}

              <div className="flex items-start justify-between gap-4">
                <div>
                  {index === 0 && (
                    <span
                      className="
                        mb-2
                        inline-block
                        rounded-full
                        bg-orange-100
                        px-3
                        py-1
                        text-xs
                        font-semibold
                        text-orange-700
                      "
                    >
                      🔥 Top Match
                    </span>
                  )}

                  <h3 className="text-xl font-bold">
                    {job.title}
                  </h3>

                  <p className="mt-1 text-muted-foreground">
                    {job.company}
                  </p>

                  {job.location && (
                    <p className="mt-1 text-sm text-gray-500">
                      📍 {job.location}
                    </p>
                  )}
                </div>

                {/* ================================
                    MATCH SCORE
                ================================= */}

                <div
                  className={`
                    rounded-xl
                    px-4
                    py-3
                    text-center
                    ${getMatchStyle(job.matchLevel)}
                  `}
                >
                  <div className="text-xl font-bold">
                    {job.matchScore}%
                  </div>

                  <div className="text-xs font-medium">
                    {job.matchLevel}
                  </div>
                </div>
              </div>

              {/* ================================
                  SKILL COVERAGE
              ================================= */}

              <div className="mt-6">
                <h4 className="mb-2 font-semibold">
                  Skill Coverage
                </h4>

                <p className="text-sm text-muted-foreground">
                  {job.matchedSkillCount} skills matched
                </p>
              </div>

              {/* ================================
                  MATCHED SKILLS
              ================================= */}

              {job.matchedSkills.length > 0 && (
                <div className="mt-5">
                  <h4 className="mb-3 font-semibold">
                    Matched Skills
                  </h4>

                  <div className="flex flex-wrap gap-2">
                    {job.matchedSkills.map((skill) => (
                      <span
                        key={skill}
                        className="
                          rounded-full
                          border
                          border-green-200
                          bg-green-50
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
              )}

              {/* ================================
                  MISSING SKILLS
              ================================= */}

              {job.missingSkills.length > 0 && (
                <div className="mt-5">
                  <h4 className="mb-3 font-semibold">
                    Skills to improve
                  </h4>

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

              {/* ================================
                  AI EXPLANATION
              ================================= */}

              {job.explanation?.strengths?.length > 0 && (
                <div className="mt-6">
                  <h4 className="mb-3 font-semibold">
                    Why this job matches you 🧠
                  </h4>

                  <div className="space-y-2">
                    {job.explanation.strengths.map((item) => (
                      <p
                        key={item}
                        className="text-sm text-green-700"
                      >
                        ✓ {item}
                      </p>
                    ))}
                  </div>
                </div>
              )}

              {/* ================================
                  IMPROVEMENTS
              ================================= */}

              {job.explanation?.improvements?.length > 0 && (
                <div className="mt-5">
                  <h4 className="mb-3 font-semibold">
                    Improve your chances 🚀
                  </h4>

                  <div className="space-y-2">
                    {job.explanation.improvements.map((item) => (
                      <p
                        key={item}
                        className="text-sm text-gray-700"
                      >
                        → {item}
                      </p>
                    ))}
                  </div>
                </div>
              )}

              {/* ================================
                  ACTION BUTTONS
              ================================= */}

              <div className="mt-6 flex flex-wrap gap-3">
                {/* SAVE BUTTON */}

                <button
                  type="button"
                  onClick={() => toggleSaveJob(job.id)}
                  disabled={isSaving}
                  className={`
                    rounded-xl
                    px-5
                    py-2
                    font-medium
                    transition
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                    ${
                      isSaved
                        ? "border border-green-300 bg-green-50 text-green-700"
                        : "bg-black text-white hover:bg-gray-800"
                    }
                  `}
                >
                  {isSaving
                    ? "Saving..."
                    : isSaved
                      ? "✓ Saved"
                      : "🔖 Save Job"}
                </button>

                {/* VIEW JOB */}

                <button
                  type="button"
                  onClick={() => viewJob(job)}
                  disabled={!job.url}
                  className="
                    rounded-xl
                    border
                    px-5
                    py-2
                    font-medium
                    text-gray-900
                    transition
                    hover:bg-gray-50
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                  "
                >
                  View Job
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}