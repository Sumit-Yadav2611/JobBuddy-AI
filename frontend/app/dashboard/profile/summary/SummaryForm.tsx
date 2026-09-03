"use client";

import { useState } from "react";
import {
  CheckCircle2,
  FileText,
  Loader2,
  Save,
} from "lucide-react";

type SummaryFormProps = {
  initialSummary: string;
};

const MAX_LENGTH = 5000;

export default function SummaryForm({
  initialSummary,
}: SummaryFormProps) {
  const [summary, setSummary] = useState(initialSummary);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setSaving(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await fetch(
        "/api/profile/summary",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            summary,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.error ||
            "Failed to update your professional summary.",
        );
      }

      setSuccessMessage(
        data.message ||
          "Professional summary updated successfully.",
      );
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setSaving(false);
    }
  }

  const characterCount = summary.length;

  return (
    <form onSubmit={handleSubmit}>
      <section className="overflow-hidden rounded-3xl border border-cyan-400/15 bg-[#060914]/85 shadow-[0_0_60px_rgba(0,180,255,0.04)] backdrop-blur-xl">
        {/* Accent line */}

        <div className="h-px w-full bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500" />

        <div className="p-6 sm:p-8">
          {/* Heading */}

          <div className="mb-8 flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/5">
              <FileText className="h-5 w-5 text-cyan-300" />
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-300">
                Professional profile
              </p>

              <h2 className="mt-1 text-xl font-semibold text-white">
                Professional Summary
              </h2>

              <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-400">
                Tell employers and JobBuddy AI about your
                professional background, strengths, goals, and
                what you bring to a role.
              </p>
            </div>
          </div>

          {/* Summary editor */}

          <div>
            <label
              htmlFor="professional-summary"
              className="mb-2 block text-sm font-medium text-slate-200"
            >
              Your professional summary
            </label>

            <textarea
              id="professional-summary"
              value={summary}
              onChange={(event) => {
                setSummary(event.target.value);
                setSuccessMessage("");
                setErrorMessage("");
              }}
              maxLength={MAX_LENGTH}
              rows={12}
              placeholder="Write a concise professional summary that highlights your experience, technical skills, achievements, and career goals..."
              className="w-full resize-y rounded-2xl border border-white/10 bg-[#090d18] px-5 py-4 text-sm leading-7 text-white outline-none transition-all placeholder:text-slate-600 focus:border-cyan-400/50 focus:bg-[#0b1020] focus:ring-2 focus:ring-cyan-400/10"
            />

            <div className="mt-2 flex items-center justify-between text-xs">
              <p className="text-slate-500">
                Keep it clear, specific, and focused on your
                professional value.
              </p>

              <span
                className={
                  characterCount > 4500
                    ? "text-amber-300"
                    : "text-slate-500"
                }
              >
                {characterCount.toLocaleString()} /{" "}
                {MAX_LENGTH.toLocaleString()}
              </span>
            </div>
          </div>

          {/* AI guidance */}

          <div className="mt-6 rounded-2xl border border-violet-400/10 bg-violet-400/5 p-5">
            <p className="text-sm font-medium text-violet-200">
              ✦ Tip for better AI job matches
            </p>

            <p className="mt-2 text-xs leading-6 text-slate-400">
              Mention your strongest technical skills, areas of
              expertise, relevant experience, and the types of
              roles you want. This gives JobBuddy AI more useful
              context when evaluating opportunities.
            </p>
          </div>

          {/* Feedback */}

          {successMessage && (
            <div className="mt-6 flex items-center gap-3 rounded-xl border border-emerald-400/20 bg-emerald-400/5 px-4 py-3 text-sm text-emerald-300">
              <CheckCircle2 className="h-5 w-5 shrink-0" />

              <span>{successMessage}</span>
            </div>
          )}

          {errorMessage && (
            <div className="mt-6 rounded-xl border border-red-400/20 bg-red-400/5 px-4 py-3 text-sm text-red-300">
              {errorMessage}
            </div>
          )}

          {/* Save */}

          <div className="mt-8 flex flex-col gap-4 border-t border-white/5 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs leading-5 text-slate-500">
              Your professional summary is securely stored in
              your JobBuddy AI profile.
            </p>

            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-cyan-400/30 bg-gradient-to-r from-cyan-500/15 via-blue-500/15 to-violet-500/15 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_25px_rgba(0,200,255,0.08)] transition-all hover:border-cyan-300/50 hover:from-cyan-500/25 hover:to-violet-500/25 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Save Summary
                </>
              )}
            </button>
          </div>
        </div>
      </section>
    </form>
  );
}