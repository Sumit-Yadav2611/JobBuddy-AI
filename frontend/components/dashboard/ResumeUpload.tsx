"use client";

import { useRef, useState } from "react";
import {
  Upload,
  FileText,
  X,
  CheckCircle2,
  Loader2,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

export default function ResumeUpload() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);

  const handleFile = (selectedFile: File) => {
    setError("");
    setSuccess("");

    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    const maxSize = 5 * 1024 * 1024;

    if (!allowedTypes.includes(selectedFile.type)) {
      setError("Please upload a PDF or DOCX file.");
      return;
    }

    if (selectedFile.size > maxSize) {
      setError("File size must be less than 5 MB.");
      return;
    }

    setFile(selectedFile);
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      handleFile(selectedFile);
    }
  };

  const removeFile = () => {
    setFile(null);
    setError("");
    setSuccess("");

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const analyzeResume = async () => {
    if (!file) {
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const formData = new FormData();

      formData.append("file", file);

      const uploadResponse = await fetch("/api/resume/upload", {
        method: "POST",
        body: formData,
      });

      const uploadData = await uploadResponse.json();

      if (!uploadResponse.ok) {
        throw new Error(uploadData.error || "Failed to upload resume.");
      }

      setLoading(false);
      setAnalyzing(true);

      const analyzeResponse = await fetch("/api/resume/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resumeId: uploadData.resume.id,
        }),
      });

      const analyzeData = await analyzeResponse.json();

      if (!analyzeResponse.ok) {
        throw new Error(
          analyzeData.error || "Failed to analyze resume.",
        );
      }

      setSuccess(
        `Resume analyzed successfully. Found ${
          analyzeData.analysis.skills.length
        } skills, ${
          analyzeData.analysis.experience.length
        } experience entries, and ${
          analyzeData.analysis.projects.length
        } projects.`,
      );
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Something went wrong.",
      );
    } finally {
      setLoading(false);
      setAnalyzing(false);
    }
  };

  return (
    <div className="w-full">
      {!file ? (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="group relative w-full overflow-hidden rounded-[22px] border border-white/[0.08] bg-[#080d18]/90 text-center shadow-2xl shadow-black/20 transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-400/20 hover:shadow-cyan-500/[0.08]"
        >
          <input
            ref={inputRef}
            type="file"
            accept=".pdf,.docx"
            onChange={handleInputChange}
            className="hidden"
          />

          {/* =====================================================
              Ambient background glows
          ====================================================== */}

          <div className="pointer-events-none absolute -left-24 -bottom-32 h-72 w-72 rounded-full bg-cyan-400/[0.07] blur-[90px] transition-all duration-500 group-hover:bg-cyan-400/[0.11]" />

          <div className="pointer-events-none absolute -right-24 -top-32 h-72 w-72 rounded-full bg-violet-500/[0.07] blur-[90px] transition-all duration-500 group-hover:bg-violet-500/[0.11]" />

          {/* Decorative corner rings */}

          <div className="pointer-events-none absolute -left-28 -bottom-28 h-64 w-64 rounded-full border border-cyan-400/[0.08] transition-transform duration-700 group-hover:scale-110" />

          <div className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full border border-violet-400/[0.08] transition-transform duration-700 group-hover:scale-110" />

          {/* =====================================================
              Gradient dashed border
          ====================================================== */}

          <div className="pointer-events-none absolute inset-3 rounded-[17px] border border-dashed border-cyan-400/40 transition-colors duration-300 group-hover:border-cyan-300/70" />

          <div className="pointer-events-none absolute inset-3 rounded-[17px] bg-gradient-to-r from-cyan-400/[0.015] via-transparent to-violet-500/[0.025]" />

          {/* =====================================================
              Content
          ====================================================== */}

          <div className="relative z-10 flex min-h-[300px] flex-col items-center justify-center px-6 py-12 sm:min-h-[330px]">
            {/* Upload icon */}

            <div className="relative">
              {/* Outer glow */}

              <div className="pointer-events-none absolute inset-[-14px] rounded-full bg-cyan-400/10 blur-xl opacity-70 transition-all duration-500 group-hover:scale-125 group-hover:bg-cyan-400/15" />

              <div className="pointer-events-none absolute inset-[-8px] rounded-full bg-violet-500/10 blur-lg opacity-60 transition-all duration-500 group-hover:scale-110" />

              {/* Gradient ring */}

              <div className="relative flex h-[76px] w-[76px] items-center justify-center rounded-full bg-gradient-to-br from-cyan-300 via-blue-400 to-violet-500 p-[2px] shadow-[0_0_28px_rgba(34,211,238,0.22)] transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_0_38px_rgba(34,211,238,0.35)]">
                <div className="flex h-full w-full items-center justify-center rounded-full bg-[#080d18]">
                  <Upload className="h-8 w-8 text-cyan-300 transition-all duration-300 group-hover:-translate-y-1 group-hover:text-cyan-200" />
                </div>
              </div>

              {/* Decorative sparkles */}

              <Sparkles className="absolute -right-7 -top-1 h-4 w-4 text-cyan-300 opacity-70 transition-all duration-300 group-hover:scale-125 group-hover:opacity-100" />

              <Sparkles className="absolute -left-6 top-7 h-3 w-3 text-violet-400 opacity-60 transition-all duration-300 group-hover:scale-125 group-hover:opacity-100" />

              <span className="absolute -right-4 bottom-1 h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.9)]" />
            </div>

            {/* Title */}

            <h3 className="mt-8 text-xl font-semibold tracking-tight text-white transition-colors duration-200 group-hover:text-cyan-50">
              Upload your resume
            </h3>

            {/* Description */}

            <p className="mt-2 text-sm text-slate-500">
              Drag and drop your resume here or click to{" "}
              <span className="font-medium text-cyan-300 transition-colors group-hover:text-cyan-200">
                browse
              </span>
            </p>

            {/* File types */}

            <div className="mt-4 flex items-center gap-2">
              <span className="rounded-lg border border-white/[0.07] bg-white/[0.025] px-3 py-1.5 text-[11px] font-medium text-slate-500">
                PDF
              </span>

              <span className="text-xs text-slate-700">or</span>

              <span className="rounded-lg border border-white/[0.07] bg-white/[0.025] px-3 py-1.5 text-[11px] font-medium text-slate-500">
                DOCX
              </span>

              <span className="ml-1 text-[11px] text-slate-600">
                · Maximum 5 MB
              </span>
            </div>
          </div>
        </button>
      ) : (
        <div className="group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-[#0a101d] via-[#080d18] to-[#100b20] p-6 shadow-2xl shadow-black/20 transition-all duration-300 hover:border-cyan-400/15 sm:p-7">
          {/* Ambient glow */}

          <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-cyan-400/[0.06] blur-[90px]" />

          <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-violet-500/[0.05] blur-[90px]" />

          <div className="relative z-10">
            {/* File header */}

            <div className="flex items-start justify-between gap-4">
              <div className="flex min-w-0 items-center gap-4">
                <div className="relative shrink-0">
                  <div className="absolute inset-0 rounded-2xl bg-cyan-400/10 blur-lg" />

                  <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-400/15 bg-cyan-400/[0.06]">
                    <FileText className="h-6 w-6 text-cyan-300" />
                  </div>
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-white sm:text-base">
                    {file.name}
                  </p>

                  <p className="mt-1 text-xs text-slate-600">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                    <span className="mx-2 text-slate-700">•</span>
                    Resume file
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={removeFile}
                disabled={loading || analyzing}
                className="group/remove shrink-0 rounded-xl border border-white/[0.06] bg-white/[0.025] p-2.5 text-slate-500 transition-all duration-200 hover:border-red-400/20 hover:bg-red-400/[0.06] hover:text-red-300 disabled:cursor-not-allowed disabled:opacity-40"
                title="Remove file"
              >
                <X className="h-4 w-4 transition-transform duration-200 group-hover/remove:rotate-90" />
              </button>
            </div>

            {/* Ready state */}

            <div className="mt-6 rounded-2xl border border-emerald-400/10 bg-emerald-400/[0.035] p-4 transition-all duration-200 hover:border-emerald-400/20 hover:bg-emerald-400/[0.05]">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-emerald-400/15 bg-emerald-400/[0.06]">
                  <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                </div>

                <div>
                  <p className="text-sm font-semibold text-white">
                    Resume ready
                  </p>

                  <p className="mt-0.5 text-xs text-slate-600">
                    Your file passed the upload validation.
                  </p>
                </div>

                <div className="ml-auto hidden items-center gap-1.5 sm:flex">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-400/70" />

                  <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-emerald-400/70">
                    Valid
                  </span>
                </div>
              </div>
            </div>

            {/* Analyze button */}

            <button
              type="button"
              onClick={analyzeResume}
              disabled={loading || analyzing}
              className="group/analyze relative mt-5 flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl border border-cyan-400/20 bg-gradient-to-r from-cyan-400/[0.12] via-blue-500/[0.1] to-violet-500/[0.12] px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/[0.04] transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-400/40 hover:from-cyan-400/[0.18] hover:via-blue-500/[0.15] hover:to-violet-500/[0.18] hover:shadow-cyan-500/[0.1] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
            >
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent opacity-0 transition-opacity duration-300 group-hover/analyze:opacity-100" />

              {loading ? (
                <>
                  <Loader2 className="relative h-4 w-4 animate-spin text-cyan-300" />
                  <span className="relative">Uploading Resume...</span>
                </>
              ) : analyzing ? (
                <>
                  <Sparkles className="relative h-4 w-4 animate-pulse text-violet-300" />
                  <span className="relative">AI Analyzing Resume...</span>
                </>
              ) : (
                <>
                  <Sparkles className="relative h-4 w-4 text-cyan-300 transition-transform duration-300 group-hover/analyze:rotate-12" />
                  <span className="relative">Analyze Resume with AI</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Error */}

      {error && (
        <div className="mt-4 rounded-2xl border border-red-400/15 bg-red-400/[0.045] px-4 py-3.5 text-sm text-red-300 shadow-lg shadow-red-500/[0.03]">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-red-400 shadow-[0_0_8px_rgba(248,113,113,0.8)]" />

            <p>{error}</p>
          </div>
        </div>
      )}

      {/* Success */}

      {success && (
        <div className="mt-4 rounded-2xl border border-emerald-400/15 bg-emerald-400/[0.045] px-4 py-3.5 text-sm text-emerald-200 shadow-lg shadow-emerald-500/[0.03]">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />

            <p>{success}</p>
          </div>
        </div>
      )}
    </div>
  );
}