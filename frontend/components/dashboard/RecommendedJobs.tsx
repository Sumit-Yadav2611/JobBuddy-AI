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
};

export default function RecommendedJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [savedJobs, setSavedJobs] = useState<string[]>([]);

 useEffect(() => {
  fetch("/api/jobs/recommended")
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        setJobs(data.jobs);
      }
    });

  fetch("/api/saved-jobs")
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        setSavedJobs(data.jobIds);
      }
    });
}, []);

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

 async function toggleSaveJob(jobId: string) {
  const isSaved = savedJobs.includes(jobId);

  try {
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

    if (data.success) {
      if (isSaved) {
        // Remove from saved jobs
        setSavedJobs((prev) =>
          prev.filter((id) => id !== jobId)
        );
      } else {
        // Add to saved jobs
        setSavedJobs((prev) => [...prev, jobId]);
      }
    }
  } catch (error) {
    console.error("Toggle save job error:", error);
  }
}
  return (
    <section className="mt-10">
      <h2 className="text-2xl font-bold">Recommended Jobs For You</h2>

      <div className="space-y-6 mt-6">
        {jobs.map((job, index) => (
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
            {/* Header */}

            <div className="flex justify-between items-start">
              <div>
                {index === 0 && (
                  <span
                    className="
                    inline-block
                    mb-2
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

                <h3 className="text-xl font-bold">{job.title}</h3>

                <p className="text-muted-foreground mt-1">{job.company}</p>

                {job.location && (
                  <p className="text-sm text-gray-500 mt-1">
                    📍 {job.location}
                  </p>
                )}
              </div>

              {/* Score */}

              <div
                className={`
                rounded-xl
                px-4
                py-3
                text-center
                ${getMatchStyle(job.matchLevel)}
                `}
              >
                <div className="text-xl font-bold">{job.matchScore}%</div>

                <div className="text-xs font-medium">{job.matchLevel}</div>
              </div>
            </div>

            {/* Skill Coverage */}

            <div className="mt-6">
              <h4 className="font-semibold mb-2">Skill Coverage</h4>

              <p className="text-sm text-muted-foreground">
                {job.matchedSkillCount} skills matched
              </p>
            </div>

            {/* Matched Skills */}

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

            {/* Missing Skills */}

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

            {/* AI Explanation */}

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

            {/* Improvements */}

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

            {/* Button */}

            <button
              onClick={() => toggleSaveJob(job.id)}
              className="
                mt-6
                rounded-xl
                bg-black
                px-5
                py-2
                text-white
              "
            >
              {savedJobs.includes(job.id) ? "✓ Saved" : "🔖 Save Job"}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
