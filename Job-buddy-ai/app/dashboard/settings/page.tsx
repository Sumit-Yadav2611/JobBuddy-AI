import type { ElementType } from "react";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronRight,
  FileText,
  Mail,
  MapPin,
  Shield,
  Sparkles,
  UserRound,
} from "lucide-react";
import { eq } from "drizzle-orm";

import { db } from "@/lib/db";
import {
  users,
  profiles,
  skills,
  experiences,
  education,
  projects,
  resumes,
} from "@/lib/db/schema";

export default async function SettingsPage() {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  // -------------------------------------------------------------
  // Find the current application user
  // -------------------------------------------------------------

  const [dbUser] = await db
    .select()
    .from(users)
    .where(eq(users.clerkId, userId))
    .limit(1);

  if (!dbUser) {
    return (
      <div className="relative min-h-full overflow-hidden bg-[#02040a] p-8 text-white">
        <div className="relative z-10">
          <h1 className="text-2xl font-bold">Profile not found</h1>

          <p className="mt-2 text-slate-400">
            Please upload and analyze your resume first.
          </p>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // Load real profile data
  // -------------------------------------------------------------

  const [profile] = await db
    .select()
    .from(profiles)
    .where(eq(profiles.userId, dbUser.id))
    .limit(1);

  const userSkills = await db
    .select()
    .from(skills)
    .where(eq(skills.userId, dbUser.id));

  const userExperience = await db
    .select()
    .from(experiences)
    .where(eq(experiences.userId, dbUser.id));

  const userEducation = await db
    .select()
    .from(education)
    .where(eq(education.userId, dbUser.id));

  const userProjects = await db
    .select()
    .from(projects)
    .where(eq(projects.userId, dbUser.id));

  const userResumes = await db
    .select()
    .from(resumes)
    .where(eq(resumes.userId, dbUser.id));

  // -------------------------------------------------------------
  // Calculate real profile completion
  // -------------------------------------------------------------

  const personalComplete =
    Boolean(profile?.firstName || profile?.lastName) &&
    Boolean(profile?.headline || profile?.location);

  const summaryComplete = Boolean(profile?.summary?.trim());

  const skillsComplete = userSkills.length > 0;

  const experienceComplete = userExperience.length > 0;

  const educationComplete = userEducation.length > 0;

  const projectsComplete = userProjects.length > 0;

  const completedSections = [
    personalComplete,
    summaryComplete,
    skillsComplete,
    experienceComplete,
    educationComplete,
    projectsComplete,
  ].filter(Boolean).length;

  const totalSections = 6;

  const completionPercentage = Math.round(
    (completedSections / totalSections) * 100,
  );

  // -------------------------------------------------------------
  // Real user information
  // -------------------------------------------------------------

  const fullName =
    [profile?.firstName, profile?.lastName]
      .filter(Boolean)
      .join(" ") || "Your Profile";

  const initials =
    [profile?.firstName, profile?.lastName]
      .filter(Boolean)
      .map((name) => name!.charAt(0).toUpperCase())
      .join("") || "U";

  const location = profile?.location || "Add your location";

  const headline = profile?.headline || "Job Seeker";

  // -------------------------------------------------------------
  // Resume state
  // -------------------------------------------------------------

  const hasResume = userResumes.length > 0;

  return (
    <div className="relative min-h-full overflow-hidden bg-[#02040a] text-white">
      {/* ========================================================= */}
      {/* FUTURISTIC BACKGROUND                                     */}
      {/* ========================================================= */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_10%,rgba(30,80,255,0.14),transparent_32%),radial-gradient(circle_at_95%_55%,rgba(125,30,255,0.13),transparent_30%),radial-gradient(circle_at_5%_85%,rgba(0,200,255,0.09),transparent_28%)]" />

        <div className="absolute -top-48 left-[45%] h-[600px] w-[900px] rounded-full bg-blue-600/10 blur-[120px]" />

        <div className="absolute right-[-250px] top-[35%] h-[700px] w-[600px] rounded-full bg-violet-700/10 blur-[130px]" />

        <div className="absolute bottom-[-300px] left-[-200px] h-[600px] w-[800px] rounded-full bg-cyan-500/10 blur-[130px]" />

        {/* Light trails */}
        <div className="absolute -right-[220px] -top-[260px] h-[650px] w-[1100px] rotate-[-18deg] rounded-[50%] border border-blue-500/20" />

        <div className="absolute -right-[190px] -top-[230px] h-[600px] w-[1050px] rotate-[-18deg] rounded-[50%] border border-cyan-400/25 shadow-[0_0_45px_rgba(34,211,238,0.12)]" />

        <div className="absolute -right-[160px] -top-[205px] h-[550px] w-[1000px] rotate-[-18deg] rounded-[50%] border border-violet-500/25" />

        <div className="absolute -left-[320px] bottom-[-260px] h-[500px] w-[1050px] rotate-[12deg] rounded-[50%] border border-cyan-400/20" />

        <div className="absolute -left-[280px] bottom-[-230px] h-[450px] w-[1000px] rotate-[12deg] rounded-[50%] border border-blue-500/20" />

        <div className="absolute -left-[250px] bottom-[-200px] h-[400px] w-[950px] rotate-[12deg] rounded-[50%] border border-violet-500/20" />

        {/* Particles */}
        <div className="absolute left-[8%] top-[18%] h-1 w-1 rounded-full bg-cyan-300 shadow-[0_0_12px_4px_rgba(34,211,238,0.45)]" />

        <div className="absolute left-[16%] top-[11%] h-1.5 w-1.5 rounded-full bg-blue-400 shadow-[0_0_15px_5px_rgba(59,130,246,0.35)]" />

        <div className="absolute left-[35%] top-[8%] h-1 w-1 rounded-full bg-violet-400 shadow-[0_0_12px_4px_rgba(139,92,246,0.4)]" />

        <div className="absolute right-[21%] top-[13%] h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_15px_5px_rgba(34,211,238,0.4)]" />

        <div className="absolute right-[9%] top-[26%] h-1 w-1 rounded-full bg-violet-400 shadow-[0_0_14px_4px_rgba(139,92,246,0.5)]" />

        <div className="absolute right-[16%] top-[46%] h-1 w-1 rounded-full bg-blue-400 shadow-[0_0_12px_4px_rgba(59,130,246,0.4)]" />

        <div className="absolute left-[12%] bottom-[19%] h-1 w-1 rounded-full bg-cyan-400 shadow-[0_0_12px_4px_rgba(34,211,238,0.45)]" />

        <div className="absolute left-[28%] bottom-[7%] h-1.5 w-1.5 rounded-full bg-violet-400 shadow-[0_0_15px_5px_rgba(139,92,246,0.4)]" />

        <div className="absolute right-[30%] bottom-[10%] h-1 w-1 rounded-full bg-blue-400 shadow-[0_0_12px_4px_rgba(59,130,246,0.4)]" />

        <div className="absolute right-[7%] bottom-[22%] h-1.5 w-1.5 rounded-full bg-violet-300 shadow-[0_0_15px_5px_rgba(139,92,246,0.45)]" />

        {/* Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)]" />
      </div>

      {/* ========================================================= */}
      {/* CONTENT                                                    */}
      {/* ========================================================= */}

      <div className="relative z-10 space-y-8 p-1 sm:p-2">
        {/* Header */}

        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/5 px-3.5 py-2 text-xs font-medium text-cyan-300">
              <Sparkles className="h-3.5 w-3.5" />
              Account Center
            </div>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Profile{" "}
              <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-500 bg-clip-text text-transparent">
                Settings
              </span>
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
              Manage your professional identity, profile information, and
              account preferences.
            </p>
          </div>

          <div className="flex w-fit items-center gap-2 rounded-xl border border-emerald-400/20 bg-emerald-400/5 px-4 py-2.5">
            <div className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.9)]" />

            <span className="text-xs font-medium text-slate-300">
              Profile active
            </span>
          </div>
        </div>

        {/* ======================================================= */}
        {/* REAL PROFILE HERO                                        */}
        {/* ======================================================= */}

        <div className="group relative overflow-hidden rounded-2xl border border-cyan-400/25 bg-[#070b14]/80 shadow-[0_0_60px_rgba(34,211,238,0.04)] backdrop-blur-2xl">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500" />

          <div className="absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_80%_40%,rgba(124,58,237,0.12),transparent_55%)]" />

          <div className="relative p-6 sm:p-8">
            <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
              {/* User information */}

              <div className="flex items-center gap-5">
                <div className="relative">
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 via-blue-500 to-violet-600 text-2xl font-bold text-white shadow-[0_0_35px_rgba(34,211,238,0.22)]">
                    {initials}
                  </div>

                  <div className="absolute -bottom-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full border-4 border-[#070b14] bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.6)]">
                    <CheckCircle2 className="h-3.5 w-3.5 text-white" />
                  </div>
                </div>

                <div>
                  <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-400">
                    Your professional profile
                  </p>

                  <h2 className="text-2xl font-bold tracking-tight text-white">
                    {fullName}
                  </h2>

                  <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-400">
                    <span className="inline-flex items-center gap-1.5">
                      <BriefcaseBusiness className="h-4 w-4 text-cyan-400" />
                      {headline}
                    </span>

                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="h-4 w-4 text-violet-400" />
                      {location}
                    </span>
                  </div>
                </div>
              </div>

              {/* Real completion */}

              <div className="w-full max-w-sm rounded-xl border border-white/10 bg-black/20 p-5">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-300">
                    Profile completion
                  </span>

                  <span className="text-sm font-bold text-cyan-300">
                    {completionPercentage}%
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-white/5">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 shadow-[0_0_15px_rgba(34,211,238,0.55)] transition-all"
                    style={{
                      width: `${completionPercentage}%`,
                    }}
                  />
                </div>

                <p className="mt-3 text-xs leading-5 text-slate-500">
                  {completedSections} of {totalSections} profile sections
                  completed.
                </p>
              </div>
            </div>

            {/* Profile shortcuts */}

            <div className="mt-8 grid gap-3 border-t border-white/10 pt-6 sm:grid-cols-2 lg:grid-cols-4">
              <ProfileShortcut
                href="/dashboard/profile/personal"
                icon={UserRound}
                title="Personal Info"
                description={
                  personalComplete ? "Information complete" : "Name & contact"
                }
                complete={personalComplete}
              />

              <ProfileShortcut
                href="/dashboard/resume"
                icon={FileText}
                title="Resume"
                description={
                  hasResume ? "Resume uploaded" : "Upload your resume"
                }
                complete={hasResume}
              />

              <ProfileShortcut
                href="/dashboard/profile/experience"
                icon={BriefcaseBusiness}
                title="Experience"
                description={
                  experienceComplete
                    ? `${userExperience.length} experience ${
                        userExperience.length === 1 ? "entry" : "entries"
                      }`
                    : "Add experience"
                }
                complete={experienceComplete}
              />

              <ProfileShortcut
                href="/dashboard/profile/skills"
                icon={Sparkles}
                title="Skills"
                description={
                  skillsComplete
                    ? `${userSkills.length} ${
                        userSkills.length === 1 ? "skill" : "skills"
                      } added`
                    : "Add your skills"
                }
                complete={skillsComplete}
              />
            </div>
          </div>
        </div>

        {/* ======================================================= */}
        {/* MAIN SETTINGS                                            */}
        {/* ======================================================= */}

        <div className="grid gap-5 lg:grid-cols-2">
          <SettingsCard
            icon={UserRound}
            eyebrow="PROFILE"
            title="Professional Profile"
            description="Keep your professional information up to date so JobBuddy AI can find better opportunities for you."
            items={[
              {
                label: "Personal information",
                href: "/dashboard/profile/personal",
                complete: personalComplete,
              },
              {
                label: "Professional summary",
                href: "/dashboard/profile/summary",
                complete: summaryComplete,
              },
              {
                label: "Skills & expertise",
                href: "/dashboard/profile/skills",
                complete: skillsComplete,
              },
              {
                label: "Work experience",
                href: "/dashboard/profile/experience",
                complete: experienceComplete,
              },
              {
                label: "Education",
                href: "/dashboard/profile/education",
                complete: educationComplete,
              },
              {
                label: "Projects",
                href: "/dashboard/profile/projects",
                complete: projectsComplete,
              },
            ]}
          />

          <SettingsCard
            icon={Shield}
            eyebrow="ACCOUNT"
            title="Account & Security"
            description="Manage your account security and communication preferences."
            items={[
              {
                label: "Email address",
                href: "#",
                complete: true,
              },
              {
                label: "Password & security",
                href: "#",
                complete: true,
              },
              {
                label: "Login preferences",
                href: "#",
                complete: false,
              },
              {
                label: "Notifications",
                href: "#",
                complete: false,
              },
              {
                label: "Privacy settings",
                href: "#",
                complete: false,
              },
              {
                label: "Two-factor authentication",
                href: "#",
                complete: false,
              },
            ]}
          />
        </div>

        {/* ======================================================= */}
        {/* AI MATCHING                                              */}
        {/* ======================================================= */}

        <div className="group relative overflow-hidden rounded-2xl border border-violet-400/30 bg-[#080914]/80 p-6 shadow-[0_0_50px_rgba(139,92,246,0.05)] backdrop-blur-2xl sm:p-7">
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500" />

          <div className="absolute right-0 top-0 h-48 w-64 bg-violet-600/10 blur-3xl" />

          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-violet-400/30 bg-violet-500/10">
                <Sparkles className="h-5 w-5 text-violet-300" />
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white">
                  Improve your AI job matches
                </h3>

                <p className="mt-1 max-w-xl text-sm leading-6 text-slate-400">
                  A complete profile gives JobBuddy AI more context to
                  calculate accurate job matches and recommendations.
                </p>
              </div>
            </div>

            <Link
              href="/dashboard/profile/personal"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-cyan-400/30 bg-gradient-to-r from-cyan-400/15 to-violet-500/15 px-5 py-3 text-sm font-semibold text-white transition-all hover:border-cyan-300/60 hover:from-cyan-400/25 hover:to-violet-500/25"
            >
              Complete Your Profile
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* ======================================================= */}
        {/* ACCOUNT EMAIL                                            */}
        {/* ======================================================= */}

        <div className="rounded-2xl border border-white/10 bg-[#070a12]/60 p-5 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5">
              <Mail className="h-4 w-4 text-slate-400" />
            </div>

            <div className="min-w-0">
              <p className="text-sm font-medium text-slate-200">
                Account email
              </p>

              <p className="truncate text-xs text-slate-500">
                {dbUser.email}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =============================================================== */
/* PROFILE SHORTCUT                                               */
/* =============================================================== */

function ProfileShortcut({
  href,
  icon: Icon,
  title,
  description,
  complete,
}: {
  href: string;
  icon: ElementType;
  title: string;
  description: string;
  complete: boolean;
}) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.025] p-3 transition-all duration-200 hover:border-cyan-400/30 hover:bg-cyan-400/[0.04]"
    >
      <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] transition-all group-hover:border-cyan-400/20 group-hover:bg-cyan-400/10">
        <Icon className="h-4 w-4 text-slate-400 transition-colors group-hover:text-cyan-300" />

        {complete && (
          <div className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
        )}
      </div>

      <div className="min-w-0">
        <p className="text-sm font-medium text-slate-200">{title}</p>

        <p className="truncate text-xs text-slate-500">{description}</p>
      </div>

      <ChevronRight className="ml-auto h-4 w-4 shrink-0 text-slate-600 transition-all group-hover:translate-x-0.5 group-hover:text-cyan-300" />
    </Link>
  );
}

/* =============================================================== */
/* SETTINGS CARD                                                   */
/* =============================================================== */

function SettingsCard({
  icon: Icon,
  eyebrow,
  title,
  description,
  items,
}: {
  icon: ElementType;
  eyebrow: string;
  title: string;
  description: string;
  items: {
    label: string;
    href: string;
    complete: boolean;
  }[];
}) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#070b14]/80 p-6 backdrop-blur-2xl transition-all duration-300 hover:border-cyan-400/20">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/5">
          <Icon className="h-5 w-5 text-cyan-300" />
        </div>

        <div className="min-w-0">
          <p className="text-[10px] font-bold tracking-[0.2em] text-cyan-400">
            {eyebrow}
          </p>

          <h3 className="mt-1 text-xl font-semibold text-white">{title}</h3>

          <p className="mt-2 text-sm leading-6 text-slate-400">
            {description}
          </p>
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border border-white/10 bg-black/20">
        {items.map((item, index) => (
          <Link
            key={item.label}
            href={item.href}
            className={`group/item flex items-center gap-3 px-4 py-3.5 text-sm text-slate-400 transition-all hover:bg-white/[0.035] hover:text-white ${
              index !== items.length - 1 ? "border-b border-white/10" : ""
            }`}
          >
            <CheckCircle2
              className={`h-4 w-4 shrink-0 ${
                item.complete ? "text-emerald-400" : "text-slate-600"
              }`}
            />

            <span>{item.label}</span>

            <ChevronRight className="ml-auto h-3.5 w-3.5 text-slate-600 transition-transform group-hover/item:translate-x-0.5 group-hover/item:text-cyan-300" />
          </Link>
        ))}
      </div>
    </div>
  );
}