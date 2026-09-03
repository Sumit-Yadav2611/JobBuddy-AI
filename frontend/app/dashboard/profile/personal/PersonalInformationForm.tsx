"use client";

import { useState } from "react";
import {
  BriefcaseBusiness,
  CheckCircle2,
  Loader2,
  MapPin,
  Phone,
  Save,
  User,
} from "lucide-react";

type PersonalInformationFormProps = {
  initialData: {
    firstName: string;
    lastName: string;
    headline: string;
    location: string;
    phone: string;
    yearsOfExperience: number | null;
  };
};

export default function PersonalInformationForm({
  initialData,
}: PersonalInformationFormProps) {
  const [formData, setFormData] = useState(initialData);

  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function updateField(
    field: keyof typeof formData,
    value: string | number | null,
  ) {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));

    setSuccessMessage("");
    setErrorMessage("");
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setSaving(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await fetch("/api/profile/personal", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.error || "Failed to update your profile.",
        );
      }

      setSuccessMessage(
        data.message || "Personal information updated successfully.",
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

  return (
    <form onSubmit={handleSubmit}>
      {/* Form Card */}

      <section className="overflow-hidden rounded-3xl border border-cyan-400/15 bg-[#060914]/85 shadow-[0_0_60px_rgba(0,180,255,0.04)] backdrop-blur-xl">
        {/* Top accent */}

        <div className="h-px w-full bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500" />

        <div className="p-6 sm:p-8">
          {/* Section heading */}

          <div className="mb-8 flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/5">
              <User className="h-5 w-5 text-cyan-300" />
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-300">
                Professional identity
              </p>

              <h2 className="mt-1 text-xl font-semibold text-white">
                Personal information
              </h2>

              <p className="mt-1 text-sm leading-6 text-slate-400">
                Keep your professional details accurate so JobBuddy AI
                can generate better job matches.
              </p>
            </div>
          </div>

          {/* Fields */}

          <div className="grid gap-6 md:grid-cols-2">
            {/* First name */}

            <FormField
              label="First name"
              icon={User}
              required
            >
              <input
                type="text"
                value={formData.firstName}
                onChange={(event) =>
                  updateField("firstName", event.target.value)
                }
                placeholder="Enter your first name"
                maxLength={100}
                className={inputClass}
              />
            </FormField>

            {/* Last name */}

            <FormField
              label="Last name"
              icon={User}
            >
              <input
                type="text"
                value={formData.lastName}
                onChange={(event) =>
                  updateField("lastName", event.target.value)
                }
                placeholder="Enter your last name"
                maxLength={100}
                className={inputClass}
              />
            </FormField>

            {/* Headline */}

            <div className="md:col-span-2">
              <FormField
                label="Professional headline"
                icon={BriefcaseBusiness}
              >
                <input
                  type="text"
                  value={formData.headline}
                  onChange={(event) =>
                    updateField("headline", event.target.value)
                  }
                  placeholder="e.g. Full Stack Developer | React & Node.js"
                  maxLength={200}
                  className={inputClass}
                />

                <p className="mt-2 text-xs text-slate-500">
                  A short headline that describes your professional
                  identity.
                </p>
              </FormField>
            </div>

            {/* Location */}

            <FormField
              label="Location"
              icon={MapPin}
            >
              <input
                type="text"
                value={formData.location}
                onChange={(event) =>
                  updateField("location", event.target.value)
                }
                placeholder="e.g. New Delhi, India"
                maxLength={150}
                className={inputClass}
              />
            </FormField>

            {/* Phone */}

            <FormField
              label="Phone number"
              icon={Phone}
            >
              <input
                type="tel"
                value={formData.phone}
                onChange={(event) =>
                  updateField("phone", event.target.value)
                }
                placeholder="e.g. +91 98765 43210"
                maxLength={30}
                className={inputClass}
              />
            </FormField>

            {/* Experience */}

            <FormField
              label="Years of experience"
              icon={BriefcaseBusiness}
            >
              <input
                type="number"
                min="0"
                max="60"
                value={
                  formData.yearsOfExperience ?? ""
                }
                onChange={(event) =>
                  updateField(
                    "yearsOfExperience",
                    event.target.value === ""
                      ? null
                      : Number(event.target.value),
                  )
                }
                placeholder="e.g. 2"
                className={inputClass}
              />

              <p className="mt-2 text-xs text-slate-500">
                Enter 0 if you are a fresher.
              </p>
            </FormField>
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
              Your information is securely stored in your JobBuddy AI
              profile.
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
                  Save Changes
                </>
              )}
            </button>
          </div>
        </div>
      </section>
    </form>
  );
}

function FormField({
  label,
  icon: Icon,
  required = false,
  children,
}: {
  label: string;
  icon: React.ElementType;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-200">
        <Icon className="h-4 w-4 text-cyan-300/80" />

        <span>{label}</span>

        {required && (
          <span className="text-cyan-300">*</span>
        )}
      </label>

      {children}
    </div>
  );
}

const inputClass =
  "w-full rounded-xl border border-white/10 bg-[#090d18] px-4 py-3 text-sm text-white outline-none transition-all placeholder:text-slate-600 focus:border-cyan-400/50 focus:bg-[#0b1020] focus:ring-2 focus:ring-cyan-400/10";