import { auth } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

import {
  ArrowLeft,
  User,
  FileText,
  Code2,
  BriefcaseBusiness,
  GraduationCap,
  FolderGit2,
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
} from "@/lib/db/schema";

export default async function ProfilePage() {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  // Find current application user
  const [dbUser] = await db
    .select()
    .from(users)
    .where(eq(users.clerkId, userId))
    .limit(1);

  if (!dbUser) {
    return (
      <div className="min-h-screen bg-background p-10">
        <h1 className="text-2xl font-bold">User profile not found</h1>

        <p className="mt-2 text-muted-foreground">
          Please upload and analyze your resume first.
        </p>
      </div>
    );
  }

  // Get profile
  const [profile] = await db
    .select()
    .from(profiles)
    .where(eq(profiles.userId, dbUser.id))
    .limit(1);

  // Get counts
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

  // Completion checks
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

  
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}

      <header className="flex h-16 items-center justify-between border-b px-6">
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard"
            className="rounded-lg p-2 transition-colors hover:bg-muted"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>

          <div>
            <p className="text-sm text-muted-foreground">Dashboard</p>

            <h1 className="text-lg font-semibold">Profile</h1>
          </div>
        </div>

        <UserButton />
      </header>

      {/* Content */}

      <main className="mx-auto max-w-5xl p-6 lg:p-10">
        {/* Heading */}

        <div>
          <h2 className="text-3xl font-bold tracking-tight">Your Profile</h2>

          <p className="mt-2 text-muted-foreground">
            Build your professional profile to get better AI job matches.
          </p>
        </div>

        {/* Profile Completeness */}

        <section className="mt-8 rounded-2xl border bg-card p-6">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Profile Completeness
              </p>

              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-4xl font-bold">
                  {completionPercentage}%
                </span>

                <span className="text-sm text-muted-foreground">complete</span>
              </div>

              <p className="mt-2 text-sm text-muted-foreground">
                {completedSections} of {totalSections} sections completed.
              </p>
            </div>

            <div className="w-full sm:max-w-xs">
              <div className="h-3 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-primary transition-all"
                  style={{
                    width: `${completionPercentage}%`,
                  }}
                />
              </div>
            </div>
          </div>

          {/* Completion checklist */}

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <CompletionItem
              label="Personal Information"
              complete={personalComplete}
            />

            <CompletionItem
              label="Professional Summary"
              complete={summaryComplete}
            />

            <CompletionItem label="Skills" complete={skillsComplete} />

            <CompletionItem label="Experience" complete={experienceComplete} />

            <CompletionItem label="Education" complete={educationComplete} />

            <CompletionItem label="Projects" complete={projectsComplete} />
          </div>
        </section>

        {/* Profile Sections */}

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <ProfileSection
            icon={User}
            title="Personal Information"
            description="Name, location, headline and contact details."
            href="/dashboard/profile/personal"
          />

          <ProfileSection
            icon={FileText}
            title="Summary"
            description="Your professional summary and career objective."
            href="/dashboard/profile/summary"
          />

          <ProfileSection
            icon={Code2}
            title="Skills"
            description="Technical skills, tools, languages and soft skills."
            href="/dashboard/profile/skills"
          />

          <ProfileSection
            icon={BriefcaseBusiness}
            title="Experience"
            description="Work experience, roles and achievements."
            href="/dashboard/profile/experience"
          />

          <ProfileSection
            icon={GraduationCap}
            title="Education"
            description="Degrees, institutions and academic details."
            href="/dashboard/profile/education"
          />

          <ProfileSection
            icon={FolderGit2}
            title="Projects"
            description="Projects, GitHub links and achievements."
            href="/dashboard/profile/projects"
          />
        </div>

        {/* Resume */}

        <div className="mt-8 rounded-2xl border bg-card p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-semibold">Resume</h3>

              <p className="mt-1 text-sm text-muted-foreground">
                Upload your resume so JobBuddy AI can understand your experience
                and skills.
              </p>
            </div>

            <FileText className="h-5 w-5 text-muted-foreground" />
          </div>

          <Link
            href="/dashboard/resume"
            className="mt-5 inline-block rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90"
          >
            Manage Resume
          </Link>
        </div>
      </main>
    </div>
  );
}

function CompletionItem({
  label,
  complete,
}: {
  label: string;
  complete: boolean;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border p-3">
      <div
        className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
          complete
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-muted-foreground"
        }`}
      >
        {complete ? "✓" : "•"}
      </div>

      <span
        className={
          complete ? "text-sm font-medium" : "text-sm text-muted-foreground"
        }
      >
        {label}
      </span>
    </div>
  );
}

function ProfileSection({
  icon: Icon,
  title,
  description,
  href,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group rounded-xl border bg-card p-5 transition-all hover:-translate-y-0.5 hover:shadow-sm"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-lg border bg-muted">
        <Icon className="h-5 w-5" />
      </div>

      <h3 className="mt-4 font-semibold">{title}</h3>

      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        {description}
      </p>

      <p className="mt-4 text-sm font-medium text-primary">Edit →</p>
    </Link>
  );
}
