"use client";

import { useState } from "react";

type Experience = {
  id: string;
  company: string;
  role: string;
  location: string | null;
  startDate: string | Date | null;
  endDate: string | Date | null;
  isCurrent: boolean;
  description: string | null;
};

type ExperienceFormData = {
  id?: string;
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  description: string;
};

type Props = {
  initialExperiences: Experience[];
};

function formatDateForInput(value: string | Date | null) {
  if (!value) return "";

  const date = value instanceof Date ? value : new Date(value);

  if (Number.isNaN(date.getTime())) return "";

  return date.toISOString().slice(0, 10);
}

function createEmptyExperience(): ExperienceFormData {
  return {
    company: "",
    role: "",
    location: "",
    startDate: "",
    endDate: "",
    isCurrent: false,
    description: "",
  };
}

function convertExperience(experience: Experience): ExperienceFormData {
  return {
    id: experience.id,
    company: experience.company,
    role: experience.role,
    location: experience.location ?? "",
    startDate: formatDateForInput(experience.startDate),
    endDate: formatDateForInput(experience.endDate),
    isCurrent: experience.isCurrent,
    description: experience.description ?? "",
  };
}

export default function ExperienceForm({
  initialExperiences,
}: Props) {
  const [experiences, setExperiences] = useState<ExperienceFormData[]>(
    initialExperiences.map(convertExperience),
  );

  const [savingIndex, setSavingIndex] = useState<number | null>(null);
  const [deletingIndex, setDeletingIndex] = useState<number | null>(null);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  function updateExperience(
    index: number,
    field: keyof ExperienceFormData,
    value: string | boolean,
  ) {
    setExperiences((current) =>
      current.map((experience, i) => {
        if (i !== index) return experience;

        return {
          ...experience,
          [field]: value,
          ...(field === "isCurrent" && value === true
            ? { endDate: "" }
            : {}),
        };
      }),
    );

    setMessage("");
    setError("");
  }

  function addExperience() {
    setExperiences((current) => [
      ...current,
      createEmptyExperience(),
    ]);

    setMessage("");
    setError("");
  }

  async function saveExperience(index: number) {
    const experience = experiences[index];

    if (!experience) return;

    setMessage("");
    setError("");

    if (!experience.company.trim()) {
      setError("Company name is required.");
      return;
    }

    if (!experience.role.trim()) {
      setError("Role is required.");
      return;
    }

    if (
      experience.startDate &&
      experience.endDate &&
      !experience.isCurrent &&
      experience.endDate < experience.startDate
    ) {
      setError("End date cannot be before the start date.");
      return;
    }

    setSavingIndex(index);

    try {
      const method = experience.id ? "PUT" : "POST";

      const response = await fetch("/api/profile/experience", {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(experience),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Failed to save experience.",
        );
      }

      const savedExperience = data.experience;

      setExperiences((current) =>
        current.map((item, i) =>
          i === index
            ? convertExperience(savedExperience)
            : item,
        ),
      );

      setMessage(
        experience.id
          ? "Experience updated successfully."
          : "Experience added successfully.",
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to save experience.",
      );
    } finally {
      setSavingIndex(null);
    }
  }

  async function deleteExperience(index: number) {
    const experience = experiences[index];

    if (!experience) return;

    setMessage("");
    setError("");

    if (!experience.id) {
      setExperiences((current) =>
        current.filter((_, i) => i !== index),
      );
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete this experience?",
    );

    if (!confirmed) return;

    setDeletingIndex(index);

    try {
      const response = await fetch(
        "/api/profile/experience",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: experience.id,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Failed to delete experience.",
        );
      }

      setExperiences((current) =>
        current.filter((_, i) => i !== index),
      );

      setMessage("Experience deleted successfully.");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to delete experience.",
      );
    } finally {
      setDeletingIndex(null);
    }
  }

  return (
    <div className="space-y-6">
      {/* Status messages */}

      {message && (
        <div className="rounded-xl border border-emerald-400/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.08)]">
          <div className="flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-400/20 text-emerald-300">
              ✓
            </span>

            <span>{message}</span>
          </div>
        </div>
      )}

      {error && (
        <div className="rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          <div className="flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-400/20">
              !
            </span>

            <span>{error}</span>
          </div>
        </div>
      )}

      {/* Header */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">
            Work Experience
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Add your professional experience to improve your
            profile and job matching.
          </p>
        </div>

        <button
          type="button"
          onClick={addExperience}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-cyan-400/30 bg-cyan-400/10 px-4 py-2.5 text-sm font-medium text-cyan-300 transition hover:border-cyan-300/50 hover:bg-cyan-400/15"
        >
          <span className="text-lg leading-none">+</span>
          Add Experience
        </button>
      </div>

      {/* Empty state */}

      {experiences.length === 0 && (
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-12 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 text-2xl text-cyan-300">
            💼
          </div>

          <h3 className="mt-4 text-base font-semibold text-white">
            No experience added yet
          </h3>

          <p className="mx-auto mt-2 max-w-md text-sm text-slate-400">
            Add your work experience so JobBuddy AI can better
            understand your professional background.
          </p>

          <button
            type="button"
            onClick={addExperience}
            className="mt-5 rounded-xl bg-cyan-400 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
          >
            Add Your First Experience
          </button>
        </div>
      )}

      {/* Experience cards */}

      {experiences.map((experience, index) => (
        <div
          key={experience.id || `new-${index}`}
          className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-6"
        >
          <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-cyan-400/5 blur-3xl" />

          <div className="relative">
            {/* Card heading */}

            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
                    💼
                  </div>

                  <div>
                    <h3 className="text-base font-semibold text-white">
                      {experience.role.trim() ||
                        "New Experience"}
                    </h3>

                    <p className="text-xs text-slate-500">
                      {experience.company.trim() ||
                        "Add company name"}
                    </p>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => deleteExperience(index)}
                disabled={deletingIndex === index}
                className="rounded-lg border border-red-400/20 bg-red-400/5 px-3 py-2 text-xs font-medium text-red-300 transition hover:border-red-400/40 hover:bg-red-400/10 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {deletingIndex === index
                  ? "Deleting..."
                  : "Delete"}
              </button>
            </div>

            {/* Company / Role */}

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-200">
                  Company
                  <span className="ml-1 text-red-400">*</span>
                </label>

                <input
                  type="text"
                  value={experience.company}
                  onChange={(event) =>
                    updateExperience(
                      index,
                      "company",
                      event.target.value,
                    )
                  }
                  placeholder="e.g. Google"
                  maxLength={200}
                  className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/10"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-200">
                  Role
                  <span className="ml-1 text-red-400">*</span>
                </label>

                <input
                  type="text"
                  value={experience.role}
                  onChange={(event) =>
                    updateExperience(
                      index,
                      "role",
                      event.target.value,
                    )
                  }
                  placeholder="e.g. Software Engineer"
                  maxLength={200}
                  className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/10"
                />
              </div>
            </div>

            {/* Location */}

            <div className="mt-5">
              <label className="mb-2 block text-sm font-medium text-slate-200">
                Location
              </label>

              <input
                type="text"
                value={experience.location}
                onChange={(event) =>
                  updateExperience(
                    index,
                    "location",
                    event.target.value,
                  )
                }
                placeholder="e.g. Bengaluru, India / Remote"
                maxLength={200}
                className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/10"
              />
            </div>

            {/* Dates */}

            <div className="mt-5 grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-200">
                  Start Date
                </label>

                <input
                  type="date"
                  value={experience.startDate}
                  onChange={(event) =>
                    updateExperience(
                      index,
                      "startDate",
                      event.target.value,
                    )
                  }
                  className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/10"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-200">
                  End Date
                </label>

                <input
                  type="date"
                  value={experience.endDate}
                  disabled={experience.isCurrent}
                  onChange={(event) =>
                    updateExperience(
                      index,
                      "endDate",
                      event.target.value,
                    )
                  }
                  className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition disabled:cursor-not-allowed disabled:opacity-40 focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/10"
                />
              </div>
            </div>

            {/* Current position */}

            <label className="mt-5 flex cursor-pointer items-center gap-3 rounded-xl border border-white/10 bg-black/10 px-4 py-3 transition hover:border-cyan-400/20">
              <input
                type="checkbox"
                checked={experience.isCurrent}
                onChange={(event) =>
                  updateExperience(
                    index,
                    "isCurrent",
                    event.target.checked,
                  )
                }
                className="h-4 w-4 rounded border-slate-600 bg-slate-900 text-cyan-400 focus:ring-cyan-400"
              />

              <span>
                <span className="block text-sm font-medium text-slate-200">
                  I currently work here
                </span>

                <span className="block text-xs text-slate-500">
                  Your end date will be cleared automatically.
                </span>
              </span>
            </label>

            {/* Description */}

            <div className="mt-5">
              <div className="mb-2 flex items-center justify-between gap-3">
                <label className="block text-sm font-medium text-slate-200">
                  Description
                </label>

                <span className="text-xs text-slate-500">
                  {experience.description.length}/5000
                </span>
              </div>

              <textarea
                value={experience.description}
                onChange={(event) =>
                  updateExperience(
                    index,
                    "description",
                    event.target.value,
                  )
                }
                placeholder="Describe your responsibilities, achievements, technologies, and impact..."
                maxLength={5000}
                rows={6}
                className="w-full resize-y rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/10"
              />
            </div>

            {/* Save */}

            <div className="mt-5 flex justify-end">
              <button
                type="button"
                onClick={() => saveExperience(index)}
                disabled={savingIndex === index}
                className="rounded-xl bg-cyan-400 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-400/10 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {savingIndex === index
                  ? "Saving..."
                  : experience.id
                    ? "Save Changes"
                    : "Add Experience"}
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Bottom helper */}

      {experiences.length > 0 && (
        <div className="rounded-xl border border-cyan-400/10 bg-cyan-400/[0.03] px-4 py-3 text-xs leading-5 text-slate-500">
          <span className="font-medium text-cyan-300">
            Tip:
          </span>{" "}
          Highlight measurable achievements and technologies
          you used. This information helps JobBuddy AI match you
          with relevant opportunities.
        </div>
      )}
    </div>
  );
}