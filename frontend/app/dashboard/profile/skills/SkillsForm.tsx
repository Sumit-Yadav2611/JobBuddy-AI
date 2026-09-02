"use client";

import { useState } from "react";
import { Plus, Trash2, Save, Sparkles, X } from "lucide-react";

type Skill = {
  id: string;
  name: string;
  category: string | null;
  proficiency: string | null;
};

type SkillFormItem = {
  id?: string;
  name: string;
  category: string;
  proficiency: string;
};

type SkillsFormProps = {
  initialSkills: Skill[];
};

const proficiencyOptions = [
  "Beginner",
  "Intermediate",
  "Advanced",
  "Expert",
];

const categoryOptions = [
  "Programming Language",
  "Frontend",
  "Backend",
  "Database",
  "DevOps",
  "Cloud",
  "AI / Machine Learning",
  "Tools",
  "Soft Skill",
  "Other",
];

export default function SkillsForm({
  initialSkills,
}: SkillsFormProps) {
  const [skills, setSkills] = useState<SkillFormItem[]>(
    initialSkills.map((skill) => ({
      id: skill.id,
      name: skill.name,
      category: skill.category ?? "",
      proficiency: skill.proficiency ?? "",
    })),
  );

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  function addSkill() {
    setSkills((current) => [
      ...current,
      {
        name: "",
        category: "",
        proficiency: "",
      },
    ]);

    setMessage("");
    setError("");
  }

  function updateSkill(
    index: number,
    field: keyof SkillFormItem,
    value: string,
  ) {
    setSkills((current) =>
      current.map((skill, skillIndex) =>
        skillIndex === index
          ? {
              ...skill,
              [field]: value,
            }
          : skill,
      ),
    );

    setMessage("");
    setError("");
  }

  function removeSkill(index: number) {
    setSkills((current) =>
      current.filter((_, skillIndex) => skillIndex !== index),
    );

    setMessage("");
    setError("");
  }

  function removeEmptySkills() {
    setSkills((current) =>
      current.filter((skill) => skill.name.trim().length > 0),
    );
  }

  async function handleSave() {
    setSaving(true);
    setMessage("");
    setError("");

    try {
      const cleanedSkills = skills
        .map((skill) => ({
          id: skill.id,
          name: skill.name.trim(),
          category: skill.category.trim(),
          proficiency: skill.proficiency.trim(),
        }))
        .filter((skill) => skill.name.length > 0);

      const names = new Set<string>();

      for (const skill of cleanedSkills) {
        const normalizedName = skill.name.toLowerCase();

        if (names.has(normalizedName)) {
          throw new Error(`Duplicate skill: ${skill.name}`);
        }

        names.add(normalizedName);
      }

      const response = await fetch("/api/profile/skills", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          skills: cleanedSkills,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.error || "Failed to update skills.",
        );
      }

      setSkills(cleanedSkills);

      setMessage("Skills updated successfully.");

      setTimeout(() => {
        setMessage("");
      }, 4000);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong while updating your skills.",
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Header card */}
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 shadow-2xl backdrop-blur-xl">
        <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-violet-500/10 blur-3xl" />

        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10">
              <Sparkles className="h-6 w-6 text-cyan-300" />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-white">
                Skills & Expertise
              </h2>

              <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-400">
                Add the technologies, tools, and professional skills
                that best represent your experience. These skills help
                JobBuddy AI match you with relevant opportunities.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={addSkill}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-2.5 text-sm font-medium text-cyan-200 transition hover:border-cyan-300/40 hover:bg-cyan-400/20"
          >
            <Plus className="h-4 w-4" />
            Add Skill
          </button>
        </div>
      </div>

      {/* Status messages */}
      {message && (
  <div className="mb-6 rounded-xl border border-emerald-400/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.08)]">
    <div className="flex items-center gap-2">
      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-400/20 text-emerald-300">
        ✓
      </span>
      <span>{message}</span>
    </div>
  </div>
)}

      {error && (
        <div className="flex items-start gap-3 rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-300">
          <X className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Skills list */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 shadow-2xl backdrop-blur-xl sm:p-6">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h3 className="text-base font-semibold text-white">
              Your Skills
            </h3>

            <p className="mt-1 text-xs text-slate-500">
              {skills.length}{" "}
              {skills.length === 1 ? "skill" : "skills"} added
            </p>
          </div>

          {skills.length > 0 && (
            <button
              type="button"
              onClick={removeEmptySkills}
              className="text-xs text-slate-500 transition hover:text-slate-300"
            >
              Remove empty rows
            </button>
          )}
        </div>

        {skills.length === 0 ? (
          <div className="rounded-xl border border-dashed border-white/10 bg-black/10 px-6 py-12 text-center">
            <Sparkles className="mx-auto h-8 w-8 text-slate-600" />

            <p className="mt-3 text-sm font-medium text-slate-300">
              No skills added yet
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Add your first skill to improve job matching.
            </p>

            <button
              type="button"
              onClick={addSkill}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-medium text-black transition hover:bg-slate-200"
            >
              <Plus className="h-4 w-4" />
              Add your first skill
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {skills.map((skill, index) => (
              <div
                key={skill.id ?? `new-${index}`}
                className="rounded-xl border border-white/10 bg-black/20 p-4 transition hover:border-white/15"
              >
                <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr_1fr_auto] lg:items-end">
                  {/* Skill name */}
                  <div>
                    <label className="mb-2 block text-xs font-medium text-slate-400">
                      Skill
                    </label>

                    <input
                      type="text"
                      value={skill.name}
                      onChange={(event) =>
                        updateSkill(
                          index,
                          "name",
                          event.target.value,
                        )
                      }
                      placeholder="e.g. React.js"
                      maxLength={100}
                      className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400/40 focus:bg-white/[0.06] focus:ring-2 focus:ring-cyan-400/10"
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label className="mb-2 block text-xs font-medium text-slate-400">
                      Category
                    </label>

                    <select
                      value={skill.category}
                      onChange={(event) =>
                        updateSkill(
                          index,
                          "category",
                          event.target.value,
                        )
                      }
                      className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-sm text-white outline-none transition focus:border-cyan-400/40 focus:bg-white/[0.06] focus:ring-2 focus:ring-cyan-400/10"
                    >
                      <option value="" className="bg-slate-900">
                        Select category
                      </option>

                      {categoryOptions.map((category) => (
                        <option
                          key={category}
                          value={category}
                          className="bg-slate-900"
                        >
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Proficiency */}
                  <div>
                    <label className="mb-2 block text-xs font-medium text-slate-400">
                      Proficiency
                    </label>

                    <select
                      value={skill.proficiency}
                      onChange={(event) =>
                        updateSkill(
                          index,
                          "proficiency",
                          event.target.value,
                        )
                      }
                      className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-sm text-white outline-none transition focus:border-cyan-400/40 focus:bg-white/[0.06] focus:ring-2 focus:ring-cyan-400/10"
                    >
                      <option value="" className="bg-slate-900">
                        Select level
                      </option>

                      {proficiencyOptions.map((level) => (
                        <option
                          key={level}
                          value={level}
                          className="bg-slate-900"
                        >
                          {level}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Delete */}
                  <button
                    type="button"
                    onClick={() => removeSkill(index)}
                    aria-label={`Remove ${skill.name || "skill"}`}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-red-400/10 bg-red-400/5 text-red-400/70 transition hover:border-red-400/20 hover:bg-red-400/10 hover:text-red-300"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Save section */}
      <div className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div>
          <p className="text-sm font-medium text-white">
            Keep your skills up to date
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Your skills are used by the AI matching system to find
            better job opportunities.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Save className="h-4 w-4" />

          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}