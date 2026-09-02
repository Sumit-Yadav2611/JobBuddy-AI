"use client";

import { useState } from "react";

type Education = {
  id: string;
  institution: string;
  degree: string | null;
  fieldOfStudy: string | null;
  startDate: string | Date | null;
  endDate: string | Date | null;
  grade: string | null;
  createdAt?: string | Date;
};

type EducationFormData = {
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  grade: string;
};

type EducationFormProps = {
  initialEducation: Education[];
};

function formatDateForInput(value: string | Date | null | undefined) {
  if (!value) return "";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return date.toISOString().split("T")[0];
}

const emptyForm: EducationFormData = {
  institution: "",
  degree: "",
  fieldOfStudy: "",
  startDate: "",
  endDate: "",
  grade: "",
};

export default function EducationForm({
  initialEducation,
}: EducationFormProps) {
  const [educationList, setEducationList] =
    useState<Education[]>(initialEducation);

  const [form, setForm] = useState<EducationFormData>(emptyForm);

  const [editingId, setEditingId] = useState<string | null>(null);

  const [isFormOpen, setIsFormOpen] = useState(false);

  const [isSaving, setIsSaving] = useState(false);

  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [message, setMessage] = useState("");

  const [error, setError] = useState("");

  function updateField(
    field: keyof EducationFormData,
    value: string
  ) {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  function openAddForm() {
    setEditingId(null);
    setForm(emptyForm);
    setMessage("");
    setError("");
    setIsFormOpen(true);
  }

  function openEditForm(item: Education) {
    setEditingId(item.id);

    setForm({
      institution: item.institution ?? "",
      degree: item.degree ?? "",
      fieldOfStudy: item.fieldOfStudy ?? "",
      startDate: formatDateForInput(item.startDate),
      endDate: formatDateForInput(item.endDate),
      grade: item.grade ?? "",
    });

    setMessage("");
    setError("");
    setIsFormOpen(true);
  }

  function closeForm() {
    if (isSaving) return;

    setIsFormOpen(false);
    setEditingId(null);
    setForm(emptyForm);
  }

  function validateForm() {
    if (!form.institution.trim()) {
      setError("Institution is required.");
      return false;
    }

    if (form.institution.trim().length > 200) {
      setError("Institution must be 200 characters or less.");
      return false;
    }

    if (form.degree.trim().length > 200) {
      setError("Degree must be 200 characters or less.");
      return false;
    }

    if (form.fieldOfStudy.trim().length > 200) {
      setError("Field of study must be 200 characters or less.");
      return false;
    }

    if (form.grade.trim().length > 100) {
      setError("Grade must be 100 characters or less.");
      return false;
    }

    if (form.startDate && form.endDate) {
      const start = new Date(form.startDate);
      const end = new Date(form.endDate);

      if (end < start) {
        setError("End date cannot be before start date.");
        return false;
      }
    }

    return true;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setMessage("");
    setError("");

    if (!validateForm()) {
      return;
    }

    setIsSaving(true);

    try {
      const payload = {
        ...(editingId ? { id: editingId } : {}),
        institution: form.institution.trim(),
        degree: form.degree.trim(),
        fieldOfStudy: form.fieldOfStudy.trim(),
        startDate: form.startDate || null,
        endDate: form.endDate || null,
        grade: form.grade.trim(),
      };

      const response = await fetch("/api/profile/education", {
        method: editingId ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      if (editingId) {
        setEducationList((previous) =>
          previous.map((item) =>
            item.id === editingId ? data.education : item
          )
        );

        setMessage("Education updated successfully.");
      } else {
        setEducationList((previous) => [
          data.education,
          ...previous,
        ]);

        setMessage("Education added successfully.");
      }

      setForm(emptyForm);
      setEditingId(null);
      setIsFormOpen(false);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to save education."
      );
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete(id: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this education record?"
    );

    if (!confirmed) {
      return;
    }

    setMessage("");
    setError("");
    setDeletingId(id);

    try {
      const response = await fetch("/api/profile/education", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to delete education.");
      }

      setEducationList((previous) =>
        previous.filter((item) => item.id !== id)
      );

      setMessage("Education deleted successfully.");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to delete education."
      );
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="space-y-6">
      {/* Notifications */}
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

      {/* Add button */}
      {!isFormOpen && (
        <div className="flex justify-end">
          <button
            type="button"
            onClick={openAddForm}
            className="inline-flex items-center gap-2 rounded-xl border border-cyan-400/30 bg-cyan-500/10 px-5 py-2.5 text-sm font-medium text-cyan-300 transition hover:border-cyan-300/50 hover:bg-cyan-500/20"
          >
            <span className="text-lg">+</span>
            Add Education
          </button>
        </div>
      )}

      {/* Add/Edit Form */}
      {isFormOpen && (
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-white/10 bg-white/[0.035] p-6 shadow-2xl backdrop-blur-xl"
        >
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-white">
              {editingId ? "Edit Education" : "Add Education"}
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Add your academic background to strengthen your profile.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {/* Institution */}
            <div className="md:col-span-2">
              <label
                htmlFor="institution"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Institution <span className="text-cyan-400">*</span>
              </label>

              <input
                id="institution"
                type="text"
                value={form.institution}
                onChange={(event) =>
                  updateField("institution", event.target.value)
                }
                placeholder="e.g. Delhi Technological University"
                maxLength={200}
                className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/20"
              />
            </div>

            {/* Degree */}
            <div>
              <label
                htmlFor="degree"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Degree
              </label>

              <input
                id="degree"
                type="text"
                value={form.degree}
                onChange={(event) =>
                  updateField("degree", event.target.value)
                }
                placeholder="e.g. Bachelor of Technology"
                maxLength={200}
                className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/20"
              />
            </div>

            {/* Field of Study */}
            <div>
              <label
                htmlFor="fieldOfStudy"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Field of Study
              </label>

              <input
                id="fieldOfStudy"
                type="text"
                value={form.fieldOfStudy}
                onChange={(event) =>
                  updateField("fieldOfStudy", event.target.value)
                }
                placeholder="e.g. Computer Science"
                maxLength={200}
                className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/20"
              />
            </div>

            {/* Start Date */}
            <div>
              <label
                htmlFor="startDate"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Start Date
              </label>

              <input
                id="startDate"
                type="date"
                value={form.startDate}
                onChange={(event) =>
                  updateField("startDate", event.target.value)
                }
                className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/20"
              />
            </div>

            {/* End Date */}
            <div>
              <label
                htmlFor="endDate"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                End Date
              </label>

              <input
                id="endDate"
                type="date"
                value={form.endDate}
                min={form.startDate || undefined}
                onChange={(event) =>
                  updateField("endDate", event.target.value)
                }
                className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/20"
              />
            </div>

            {/* Grade */}
            <div className="md:col-span-2">
              <label
                htmlFor="grade"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Grade / CGPA
              </label>

              <input
                id="grade"
                type="text"
                value={form.grade}
                onChange={(event) =>
                  updateField("grade", event.target.value)
                }
                placeholder="e.g. 8.5 CGPA or 85%"
                maxLength={100}
                className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/20"
              />
            </div>
          </div>

          {/* Form actions */}
          <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={closeForm}
              disabled={isSaving}
              className="rounded-xl border border-white/10 bg-white/[0.03] px-5 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-white/[0.07] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSaving}
              className="rounded-xl bg-cyan-500 px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSaving
                ? "Saving..."
                : editingId
                  ? "Save Changes"
                  : "Add Education"}
            </button>
          </div>
        </form>
      )}

      {/* Education List */}
      {educationList.length > 0 ? (
        <div className="space-y-4">
          {educationList.map((item) => (
            <div
              key={item.id}
              className="group rounded-2xl border border-white/10 bg-white/[0.035] p-6 shadow-xl backdrop-blur-xl transition hover:border-cyan-400/20"
            >
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-500/10 text-lg text-cyan-300">
                      🎓
                    </div>

                    <div className="min-w-0">
                      <h3 className="break-words text-lg font-semibold text-white">
                        {item.degree || "Education"}
                      </h3>

                      <p className="mt-1 break-words text-sm font-medium text-cyan-300">
                        {item.institution}
                      </p>

                      {item.fieldOfStudy && (
                        <p className="mt-1 break-words text-sm text-slate-400">
                          {item.fieldOfStudy}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {item.startDate && (
                      <span className="rounded-lg border border-white/10 bg-black/20 px-3 py-1.5 text-xs text-slate-400">
                        {formatDateForInput(item.startDate)}
                        {" — "}
                        {item.endDate
                          ? formatDateForInput(item.endDate)
                          : "Present"}
                      </span>
                    )}

                    {item.grade && (
                      <span className="rounded-lg border border-white/10 bg-black/20 px-3 py-1.5 text-xs text-slate-400">
                        Grade: {item.grade}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex shrink-0 gap-2">
                  <button
                    type="button"
                    onClick={() => openEditForm(item)}
                    className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-xs font-medium text-slate-300 transition hover:border-cyan-400/30 hover:bg-cyan-500/10 hover:text-cyan-300"
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(item.id)}
                    disabled={deletingId === item.id}
                    className="rounded-lg border border-red-400/10 bg-red-500/[0.03] px-3 py-2 text-xs font-medium text-red-300 transition hover:border-red-400/30 hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {deletingId === item.id
                      ? "Deleting..."
                      : "Delete"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.02] px-6 py-14 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-500/10 text-2xl">
            🎓
          </div>

          <h3 className="mt-5 text-lg font-semibold text-white">
            No education added yet
          </h3>

          <p className="mx-auto mt-2 max-w-md text-sm text-slate-400">
            Add your degree, institution, field of study, and academic
            details to complete your profile.
          </p>

          {!isFormOpen && (
            <button
              type="button"
              onClick={openAddForm}
              className="mt-6 rounded-xl border border-cyan-400/30 bg-cyan-500/10 px-5 py-2.5 text-sm font-medium text-cyan-300 transition hover:border-cyan-300/50 hover:bg-cyan-500/20"
            >
              Add Your Education
            </button>
          )}
        </div>
      )}

      {/* Helpful tip */}
      <div className="rounded-2xl border border-cyan-400/10 bg-cyan-500/[0.04] p-5">
        <div className="flex gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-500/10 text-sm text-cyan-300">
            ✦
          </div>

          <div>
            <h4 className="text-sm font-medium text-cyan-300">
              Profile tip
            </h4>

            <p className="mt-1 text-sm leading-6 text-slate-400">
              Keep your education information accurate and complete.
              JobBuddy AI can use this information when matching you
              with relevant opportunities.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}