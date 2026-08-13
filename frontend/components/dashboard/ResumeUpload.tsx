"use client";

import { useRef, useState } from "react";
import { Upload, FileText, X, CheckCircle2, Loader2 } from "lucide-react";

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

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
        throw new Error(analyzeData.error || "Failed to analyze resume.");
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
    <div>
      {!file ? (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="group w-full rounded-2xl border-2 border-dashed p-10 text-center transition-colors hover:border-primary hover:bg-muted/30"
        >
          <input
            ref={inputRef}
            type="file"
            accept=".pdf,.docx"
            onChange={handleInputChange}
            className="hidden"
          />

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-muted transition-colors group-hover:bg-primary/10">
            <Upload className="h-6 w-6" />
          </div>

          <h3 className="mt-5 font-semibold">Upload your resume</h3>

          <p className="mt-2 text-sm text-muted-foreground">
            Drag and drop your resume here or click to browse
          </p>

          <p className="mt-3 text-xs text-muted-foreground">
            PDF or DOCX · Maximum 5 MB
          </p>
        </button>
      ) : (
        <div className="rounded-2xl border bg-card p-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted">
                <FileText className="h-5 w-5" />
              </div>

              <div>
                <p className="font-medium">{file.name}</p>

                <p className="mt-1 text-xs text-muted-foreground">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={removeFile}
              disabled={loading || analyzing}
              className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground disabled:opacity-50"
              title="Remove file"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="mt-6 rounded-xl border p-4">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-primary" />

              <div>
                <p className="text-sm font-medium">Resume ready</p>

                <p className="text-xs text-muted-foreground">
                  Your file passed the upload validation.
                </p>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={analyzeResume}
            disabled={loading}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Uploading Resume...
              </>
            ) : analyzing ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                AI Analyzing Resume...
              </>
            ) : (
              "Analyze Resume with AI"
            )}
          </button>
        </div>
      )}

      {error && (
        <div className="mt-4 rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {success && (
        <div className="mt-4 rounded-lg border border-primary/30 bg-primary/5 px-4 py-3 text-sm">
          {success}
        </div>
      )}
    </div>
  );
}
